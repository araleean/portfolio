import { sampleTrip } from '../../data/sampleTrip';
import { draftItinerary } from '../draftItinerary';
import { creditLine, timeAgo } from '../people';
import { deletePlan, savePlan, setItinerary } from '../tripActions';

const NOW = 1_000_000_000_000;

function plannedTrip() {
  const trip = sampleTrip(NOW);
  const days = draftItinerary({
    destination: trip.destination, startDate: trip.startDate, dayCount: 7, flights: trip.flights, stays: trip.stays,
    author: 'sam', styles: ['relaxed'], pace: 'balanced', mustDos: ['Snorkeling'],
  });
  return setItinerary(trip, days, 'sam', NOW);
}

describe('trip actions', () => {
  it('records who added the itinerary', () => {
    const trip = plannedTrip();
    expect(trip.days).toHaveLength(7);
    expect(trip.feed[0]).toMatchObject({ who: 'sam', text: 'added the itinerary' });
  });

  it('edits a plan in place and credits the editor', () => {
    const trip = plannedTrip();
    const ref = { dayIndex: 1, slot: 'morning' as const, index: 0 };
    const next = savePlan(trip, ref, { title: ' Snorkeling at Hanauma Bay ', notes: 'Book ahead', slot: 'morning' }, 'mom', NOW);
    const plan = next.days[1].slots.morning[0];
    expect(plan).toMatchObject({ title: 'Snorkeling at Hanauma Bay', notes: 'Book ahead', addedBy: 'sam', editedBy: 'mom' });
    expect(next.feed[0].text).toBe('edited “Snorkeling at Hanauma Bay”');
    expect(trip.days[1].slots.morning[0].title).toBe('Snorkeling'); // original untouched
  });

  it('moves a plan to another time of day', () => {
    const trip = plannedTrip();
    const next = savePlan(trip, { dayIndex: 1, slot: 'morning', index: 0 }, { title: 'Snorkeling', notes: '', slot: 'evening' }, 'sam', NOW);
    expect(next.days[1].slots.morning).toHaveLength(0);
    expect(next.days[1].slots.evening.map((a) => a.title)).toContain('Snorkeling');
  });

  it('adds and deletes plans', () => {
    const trip = plannedTrip();
    const added = savePlan(trip, { dayIndex: 2, slot: 'evening', index: -1 }, { title: 'Pizza night', notes: '', slot: 'evening' }, 'alex', NOW);
    const plans = added.days[2].slots.evening;
    expect(plans[plans.length - 1]).toMatchObject({ title: 'Pizza night', addedBy: 'alex' });
    const removed = deletePlan(added, { dayIndex: 2, slot: 'evening', index: plans.length - 1 }, 'alex', NOW);
    expect(removed.days[2].slots.evening).toHaveLength(plans.length - 1);
    expect(removed.feed[0].text).toBe('removed “Pizza night”');
  });
});

describe('people', () => {
  const { members } = sampleTrip(NOW);
  it('writes credit lines from the reader’s point of view', () => {
    expect(creditLine(members, { id: 'a', title: 'x', addedBy: 'mom' }, 'sam')).toBe('Added by Mom');
    expect(creditLine(members, { id: 'a', title: 'x', addedBy: 'sample', editedBy: 'sam' }, 'sam')).toBe('Sample suggestion · edited by you');
  });

  it('describes how long ago something happened', () => {
    expect(timeAgo(NOW - 30_000, NOW)).toBe('Just now');
    expect(timeAgo(NOW - 5 * 3_600_000, NOW)).toBe('5h ago');
    expect(timeAgo(NOW - 26 * 3_600_000, NOW)).toBe('Yesterday');
  });
});
