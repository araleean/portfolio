import { ACTIVITY_TEMPLATES } from '../data/activityTemplates';
import type { Day, Trip, TripInput } from '../types';
import { createId } from './id';
import { SLOTS } from './tripOptions';

export interface GenerateOptions {
  makeId?: () => string;
  now?: Date;
}

function fillTemplate(template: string, destination: string): string {
  return template.split('{destination}').join(destination);
}

// Day i gets template i of each slot's list, so nothing repeats until the
// list runs out, then it starts over.
export function generateDays(
  input: TripInput,
  makeId: () => string = createId,
): Day[] {
  const templates = ACTIVITY_TEMPLATES[input.tripType];
  const destination = input.destination.trim();

  return Array.from({ length: input.dayCount }, (_, dayIndex) => {
    const slots = {} as Day['slots'];
    for (const slot of SLOTS) {
      const options = templates[slot];
      const template = options[dayIndex % options.length];
      slots[slot] = [{ id: makeId(), title: fillTemplate(template, destination) }];
    }
    return { id: makeId(), slots };
  });
}

export function createTrip(input: TripInput, options: GenerateOptions = {}): Trip {
  const makeId = options.makeId ?? createId;
  const timestamp = (options.now ?? new Date()).toISOString();

  return {
    id: makeId(),
    destination: input.destination.trim(),
    tripType: input.tripType,
    days: generateDays(input, makeId),
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}
