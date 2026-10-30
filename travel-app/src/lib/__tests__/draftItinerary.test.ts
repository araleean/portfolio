import { sampleTrip } from '../../data/sampleTrip';
import type { Day, Slot } from '../../types';
import { SAMPLE_AUTHOR } from '../../types';
import { countPlans, draftItinerary, type DraftInput } from '../draftItinerary';
import { SLOTS } from '../tripOptions';

function sequentialIds() {
  let n = 0;
  return () => `id-${++n}`;
}

const trip = sampleTrip(0);
const base: DraftInput = {
  destination: trip.destination,
  startDate: trip.startDate,
  dayCount: 7,
  flights: trip.flights,
  stays: trip.stays,
  author: 'sam',
  styles: ['relaxed', 'family'],
  pace: 'balanced',
  mustDos: ['Snorkeling', 'Luau'],
};

const titles = (day: Day, slot: Slot) => day.slots[slot].map((a) => a.title);
const all = (day: Day) => SLOTS.flatMap((s) => day.slots[s]);

describe('draftItinerary', () => {
  const days = draftItinerary(base, sequentialIds());

  it('makes one day per trip day', () => {
    expect(days).toHaveLength(7);
  });

  it('places the arrival flight and check-in on day 1 by time of day', () => {
    expect(titles(days[0], 'morning')).toEqual(['Land at HNL 11:10 AM (HA 11)']);
    expect(titles(days[0], 'afternoon')).toContain('Check in at the beachfront condo, 3:00 PM');
  });

  it('does not suggest ideas before landing', () => {
    expect(days[0].slots.morning.every((a) => a.tag === 'flight')).toBe(true);
  });

  it('places check-out and the flight home on the last day, with nothing planned after leaving', () => {
    const last = days[6];
    expect(titles(last, 'morning')).toContain('Check out by 11:00 AM');
    expect(titles(last, 'afternoon')).toContain('HA 10 leaves HNL at 1:30 PM');
    expect(last.slots.evening).toHaveLength(0);
  });

  it('puts must-dos on the first free days, credited to the person asking', () => {
    expect(titles(days[1], 'morning')).toEqual(['Snorkeling']);
    expect(titles(days[2], 'morning')).toEqual(['Luau']);
    expect(days[1].slots.morning[0]).toMatchObject({ tag: 'must-do', addedBy: 'sam' });
  });

  it('fills free days to the pace with sample ideas', () => {
    for (const day of days.slice(1, 6)) {
      expect(all(day)).toHaveLength(3);
    }
    const idea = days[3].slots.morning[0];
    expect(idea).toMatchObject({ tag: 'idea', addedBy: SAMPLE_AUTHOR });
  });

  it('never repeats an idea within a day and fills in the destination', () => {
    for (const day of days) {
      const t = all(day).map((a) => a.title);
      expect(new Set(t).size).toBe(t.length);
      expect(t.some((x) => x.includes('{destination}'))).toBe(false);
    }
  });

  it('follows the pace', () => {
    const easy = draftItinerary({ ...base, pace: 'easy', mustDos: [] }, sequentialIds());
    const full = draftItinerary({ ...base, pace: 'full', mustDos: [] }, sequentialIds());
    expect(all(easy[3])).toHaveLength(2);
    expect(easy[3].slots.afternoon).toHaveLength(0);
    expect(all(full[3])).toHaveLength(4);
    expect(full[3].slots.afternoon).toHaveLength(2);
  });

  it('starts blank apart from bookings and must-dos when no styles are chosen', () => {
    const blank = draftItinerary({ ...base, styles: [] }, sequentialIds());
    // 2 flights, check-in and check-out, 2 must-dos.
    expect(countPlans(blank)).toBe(6);
    expect(blank.flatMap(all).some((a) => a.tag === 'idea')).toBe(false);
  });

  it('gives different ideas when shuffled', () => {
    const shuffled = draftItinerary({ ...base, shuffle: 1 }, sequentialIds());
    expect(titles(shuffled[3], 'morning')).not.toEqual(titles(days[3], 'morning'));
  });

  it('gives every day and plan a unique id', () => {
    const ids = days.flatMap((d) => [d.id, ...all(d).map((a) => a.id)]);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
