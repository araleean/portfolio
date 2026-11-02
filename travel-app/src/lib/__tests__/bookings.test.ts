import { sampleTrip } from '../../data/sampleTrip';
import { bookingTimeline, contributions } from '../bookings';

describe('bookingTimeline', () => {
  const items = bookingTimeline(sampleTrip(0));

  it('lists flights and stays in date and time order', () => {
    expect(items.map((i) => `${i.date} ${i.time} ${i.kind}`)).toEqual([
      '2026-12-18 08:05 flight',
      '2026-12-18 15:00 stay',
      '2026-12-24 11:00 stay',
      '2026-12-24 13:30 flight',
    ]);
  });

  it('describes each booking for the card', () => {
    expect(items[0]).toMatchObject({ label: 'Flight there · 8:05 AM', title: 'HA 11 · LAX → HNL', detail: 'Lands 11:10 AM · Confirmation K7PQ2M', addedBy: 'sam' });
    expect(items[1]).toMatchObject({ label: 'Check-in · 3:00 PM', title: 'Beachfront condo', addedBy: 'mom' });
  });
});

describe('contributions', () => {
  it('counts bookings per person before any plans exist', () => {
    expect(contributions(sampleTrip(0))).toEqual({ sam: 2, mom: 1 });
  });
});
