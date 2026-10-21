import { ACTIVITY_TEMPLATES } from '../../data/activityTemplates';
import type { TripInput } from '../../types';
import { createTrip, generateDays } from '../generateItinerary';
import { SLOTS, TRIP_TYPES } from '../tripOptions';

function sequentialIds() {
  let n = 0;
  return () => `id-${++n}`;
}

const input: TripInput = { destination: 'Lisbon', dayCount: 3, tripType: 'foodie' };

describe('generateDays', () => {
  it('creates one day per requested day with one activity in each slot', () => {
    const days = generateDays(input, sequentialIds());

    expect(days).toHaveLength(3);
    for (const day of days) {
      for (const slot of SLOTS) {
        expect(day.slots[slot]).toHaveLength(1);
      }
    }
  });

  it('fills in the destination', () => {
    const days = generateDays({ ...input, tripType: 'foodie' }, sequentialIds());

    expect(days[0].slots.morning[0].title).toBe('Bakery crawl in Lisbon');
    const titles = days.flatMap((d) => SLOTS.flatMap((s) => d.slots[s].map((a) => a.title)));
    expect(titles.some((t) => t.includes('{destination}'))).toBe(false);
  });

  it('trims whitespace around the destination', () => {
    const days = generateDays({ ...input, destination: '  Lisbon  ' }, sequentialIds());

    expect(days[0].slots.morning[0].title).toBe('Bakery crawl in Lisbon');
  });

  it('does not repeat an activity in a slot until the list runs out', () => {
    const listLength = ACTIVITY_TEMPLATES.culture.morning.length;
    const days = generateDays(
      { ...input, tripType: 'culture', dayCount: listLength + 1 },
      sequentialIds(),
    );
    const mornings = days.map((d) => d.slots.morning[0].title);

    expect(new Set(mornings.slice(0, listLength)).size).toBe(listLength);
    expect(mornings[listLength]).toBe(mornings[0]);
  });

  it('gives every day and activity a unique id', () => {
    const days = generateDays({ ...input, dayCount: 14 }, sequentialIds());
    const ids = days.flatMap((d) => [d.id, ...SLOTS.flatMap((s) => d.slots[s].map((a) => a.id))]);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(TRIP_TYPES)('has activities for every slot of the %s trip type', (tripType) => {
    const days = generateDays({ ...input, tripType, dayCount: 1 }, sequentialIds());

    for (const slot of SLOTS) {
      expect(days[0].slots[slot][0].title.length).toBeGreaterThan(0);
    }
  });
});

describe('createTrip', () => {
  it('builds a trip with the input, timestamps and generated days', () => {
    const now = new Date('2026-10-21T12:00:00.000Z');
    const trip = createTrip({ ...input, destination: ' Lisbon ' }, { makeId: sequentialIds(), now });

    expect(trip.id).toBe('id-1');
    expect(trip.destination).toBe('Lisbon');
    expect(trip.tripType).toBe('foodie');
    expect(trip.days).toHaveLength(3);
    expect(trip.createdAt).toBe('2026-10-21T12:00:00.000Z');
    expect(trip.updatedAt).toBe(trip.createdAt);
  });
});
