import type { Activity, Day, Slot, Trip } from '../types';
import { createId } from './id';
import { SLOTS } from './tripOptions';

// Every change returns a new Trip and records who made it in the feed.
function withFeed(trip: Trip, who: string, text: string, now: number): Trip {
  return { ...trip, feed: [{ id: createId(), who, text, at: now }, ...trip.feed] };
}

function cloneDay(day: Day): Day {
  const slots = {} as Day['slots'];
  for (const s of SLOTS) slots[s] = [...day.slots[s]];
  return { ...day, slots };
}

export function setItinerary(trip: Trip, days: Day[], who: string, now: number): Trip {
  return withFeed({ ...trip, days }, who, 'added the itinerary', now);
}

export interface PlanChanges {
  title: string;
  notes: string;
  slot: Slot;
}

export interface PlanRef {
  dayIndex: number;
  slot: Slot;
  index: number; // position in the slot; -1 for a new plan
}

export function savePlan(trip: Trip, ref: PlanRef, changes: PlanChanges, who: string, now: number): Trip {
  const day = cloneDay(trip.days[ref.dayIndex]);
  const title = changes.title.trim();
  const notes = changes.notes.trim() || undefined;
  let text: string;
  if (ref.index < 0) {
    const plan: Activity = { id: createId(), title, notes, tag: 'idea', addedBy: who };
    day.slots[changes.slot].push(plan);
    text = `added “${title}” to Day ${ref.dayIndex + 1}`;
  } else {
    const [old] = day.slots[ref.slot].splice(ref.index, 1);
    const updated: Activity = { ...old, title, notes, editedBy: who };
    if (changes.slot === ref.slot) day.slots[ref.slot].splice(ref.index, 0, updated);
    else day.slots[changes.slot].push(updated);
    text = `edited “${title}”`;
  }
  const days = [...trip.days];
  days[ref.dayIndex] = day;
  return withFeed({ ...trip, days }, who, text, now);
}

export function deletePlan(trip: Trip, ref: PlanRef, who: string, now: number): Trip {
  const day = cloneDay(trip.days[ref.dayIndex]);
  const [removed] = day.slots[ref.slot].splice(ref.index, 1);
  const days = [...trip.days];
  days[ref.dayIndex] = day;
  return withFeed({ ...trip, days }, who, `removed “${removed.title}”`, now);
}
