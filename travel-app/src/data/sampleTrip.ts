import type { Member, Trip } from '../types';

// Sample people and bookings so the app opens on something real-looking.
// Sam is the planner and the person using the app.
export const ME = 'sam';

export const MEMBERS: Member[] = [
  { id: 'sam', name: 'Sam', color: '#0E6B63' },
  { id: 'mom', name: 'Mom', color: '#B54708' },
  { id: 'dad', name: 'Dad', color: '#1D4ED8' },
  { id: 'alex', name: 'Alex', color: '#6D28D9' },
];

const HOUR = 3_600_000;

export function sampleTrip(now: number = Date.now()): Trip {
  return {
    id: 'honolulu',
    destination: 'Honolulu',
    startDate: '2026-12-18',
    endDate: '2026-12-24',
    members: MEMBERS,
    flights: [
      { id: 'f1', label: 'Flight there', flightNumber: 'HA 11', from: 'LAX', to: 'HNL', departDate: '2026-12-18', departTime: '08:05', arriveDate: '2026-12-18', arriveTime: '11:10', confirmation: 'K7PQ2M', addedBy: 'sam' },
      { id: 'f2', label: 'Flight home', flightNumber: 'HA 10', from: 'HNL', to: 'LAX', departDate: '2026-12-24', departTime: '13:30', arriveDate: '2026-12-24', arriveTime: '21:45', confirmation: 'K7PQ2M', addedBy: 'sam' },
    ],
    stays: [
      { id: 's1', name: 'Beachfront condo', address: '[Address from booking]', checkInDate: '2026-12-18', checkInTime: '15:00', checkOutDate: '2026-12-24', checkOutTime: '11:00', confirmation: '88213', addedBy: 'mom' },
    ],
    expenses: [
      { id: 'e1', title: 'Flights for 4', amount: 2480, paidBy: 'sam' },
      { id: 'e2', title: 'Beachfront condo, 6 nights', amount: 1950, paidBy: 'mom' },
      { id: 'e3', title: 'Rental car', amount: 420, paidBy: 'dad' },
      { id: 'e4', title: 'Luau tickets', amount: 480, paidBy: 'alex' },
    ],
    days: [],
    feed: [
      { id: 'n1', who: 'alex', text: 'added an expense: Luau tickets', at: now - 5 * HOUR },
      { id: 'n2', who: 'mom', text: 'added a stay: Beachfront condo', at: now - 26 * HOUR },
      { id: 'n3', who: 'sam', text: 'added 2 flights', at: now - 50 * HOUR },
    ],
  };
}
