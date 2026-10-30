import { ACTIVITY_TEMPLATES } from '../data/activityTemplates';
import type { Activity, Day, DraftPreferences, Flight, Slot, Stay } from '../types';
import { SAMPLE_AUTHOR } from '../types';
import { dayIndex, formatTime, slotForTime } from './dates';
import { createId } from './id';
import { PACES, SLOTS } from './tripOptions';

export interface DraftInput extends DraftPreferences {
  destination: string;
  startDate: string;
  dayCount: number;
  flights: Flight[];
  stays: Stay[];
  author: string; // who is asking; must-dos are credited to them
  shuffle?: number; // bump to get different ideas
}

// Slots ideas fill first. Easy days keep the afternoon free for rest.
const FILL_ORDER: Record<DraftInput['pace'], Slot[]> = {
  easy: ['morning', 'evening', 'afternoon'],
  balanced: ['morning', 'afternoon', 'evening'],
  full: ['morning', 'afternoon', 'evening'],
};

function emptyDay(makeId: () => string): Day {
  return { id: makeId(), slots: { morning: [], afternoon: [], evening: [] } };
}

function count(day: Day): number {
  return SLOTS.reduce((n, s) => n + day.slots[s].length, 0);
}

function hasBooking(day: Day): boolean {
  return SLOTS.some((s) => day.slots[s].some((a) => a.tag === 'flight' || a.tag === 'stay'));
}

/**
 * Builds a day-by-day draft: bookings first (flights land or leave, check-in and check-out),
 * then must-dos on the first free days, then ideas from the chosen styles up to the pace.
 * Pure apart from ids, so it is easy to test.
 */
export function draftItinerary(input: DraftInput, makeId: () => string = createId): Day[] {
  const days = Array.from({ length: input.dayCount }, () => emptyDay(makeId));
  const inTrip = (i: number) => i >= 0 && i < input.dayCount;
  // Per day, the first and last slot ideas may use (arrival and departure narrow the day).
  const open = days.map(() => ({ from: 0, to: SLOTS.length - 1 }));

  const add = (i: number, slot: Slot, a: Omit<Activity, 'id'>) => {
    days[i].slots[slot].push({ id: makeId(), ...a });
  };

  for (const f of input.flights) {
    const leave = dayIndex(input.startDate, f.departDate);
    const land = dayIndex(input.startDate, f.arriveDate);
    if (inTrip(leave) && leave > 0) {
      const slot = slotForTime(f.departTime);
      add(leave, slot, { title: `${f.flightNumber} leaves ${f.from} at ${formatTime(f.departTime)}`, tag: 'flight', addedBy: f.addedBy });
      open[leave].to = Math.min(open[leave].to, SLOTS.indexOf(slot) - 1);
    } else if (inTrip(land)) {
      const slot = slotForTime(f.arriveTime);
      add(land, slot, { title: `Land at ${f.to} ${formatTime(f.arriveTime)} (${f.flightNumber})`, tag: 'flight', addedBy: f.addedBy });
      open[land].from = Math.max(open[land].from, SLOTS.indexOf(slot) + 1);
    }
  }

  for (const s of input.stays) {
    const inDay = dayIndex(input.startDate, s.checkInDate);
    const outDay = dayIndex(input.startDate, s.checkOutDate);
    if (inTrip(inDay)) {
      add(inDay, slotForTime(s.checkInTime), { title: `Check in at the ${s.name.toLowerCase()}, ${formatTime(s.checkInTime)}`, tag: 'stay', addedBy: s.addedBy });
    }
    if (inTrip(outDay)) {
      add(outDay, slotForTime(s.checkOutTime), { title: `Check out by ${formatTime(s.checkOutTime)}`, tag: 'stay', addedBy: s.addedBy });
    }
  }

  const slotsFor = (i: number) => SLOTS.filter((_, k) => k >= open[i].from && k <= open[i].to);

  // Must-dos go on free days, one a day, in the first open slot.
  let mustDo = 0;
  for (let i = 0; i < input.dayCount && mustDo < input.mustDos.length; i++) {
    if (hasBooking(days[i])) continue;
    const slot = FILL_ORDER[input.pace].find((s) => slotsFor(i).includes(s) && days[i].slots[s].length === 0);
    if (!slot) continue;
    add(i, slot, { title: input.mustDos[mustDo], tag: 'must-do', addedBy: input.author });
    mustDo += 1;
  }

  if (input.styles.length === 0) return days;

  const target = PACES.find((p) => p.id === input.pace)!.plansPerDay;
  const shuffle = input.shuffle ?? 0;
  const addIdea = (i: number, slot: Slot) => {
    const day = days[i];
    const style = input.styles[(i + SLOTS.indexOf(slot) + day.slots[slot].length + shuffle) % input.styles.length];
    const options = ACTIVITY_TEMPLATES[style][slot];
    const taken = new Set(SLOTS.flatMap((s) => day.slots[s].map((a) => a.title)));
    for (let k = 0; k < options.length; k++) {
      const title = options[(i + shuffle + k) % options.length].split('{destination}').join(input.destination);
      if (!taken.has(title)) {
        add(i, slot, { title, tag: 'idea', addedBy: SAMPLE_AUTHOR });
        return;
      }
    }
  };

  days.forEach((day, i) => {
    const allowed = FILL_ORDER[input.pace].filter((s) => slotsFor(i).includes(s));
    for (const slot of allowed) {
      if (count(day) >= target) break;
      if (day.slots[slot].length === 0) addIdea(i, slot);
    }
    // A full pace doubles up the afternoon.
    if (input.pace === 'full' && allowed.includes('afternoon') && count(day) < target) addIdea(i, 'afternoon');
  });

  return days;
}

export function countPlans(days: Day[]): number {
  return days.reduce((n, d) => n + count(d), 0);
}
