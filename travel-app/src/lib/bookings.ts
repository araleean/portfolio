import type { Trip } from '../types';
import { formatTime } from './dates';

export interface BookingItem {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM, for sorting
  kind: 'flight' | 'stay';
  label: string; // "Flight there · 8:05 AM"
  title: string;
  detail: string;
  addedBy: string;
}

// Flights and stays as one list in date and time order, the way Bookings shows them.
export function bookingTimeline(trip: Trip): BookingItem[] {
  const items: BookingItem[] = [];
  for (const f of trip.flights) {
    items.push({
      id: f.id, date: f.departDate, time: f.departTime, kind: 'flight',
      label: `${f.label} · ${formatTime(f.departTime)}`,
      title: `${f.flightNumber} · ${f.from} → ${f.to}`,
      detail: [`Lands ${formatTime(f.arriveTime)}`, f.confirmation && `Confirmation ${f.confirmation}`].filter(Boolean).join(' · '),
      addedBy: f.addedBy,
    });
  }
  for (const s of trip.stays) {
    items.push({
      id: `${s.id}-in`, date: s.checkInDate, time: s.checkInTime, kind: 'stay',
      label: `Check-in · ${formatTime(s.checkInTime)}`, title: s.name,
      detail: [s.address, s.confirmation && `Confirmation ${s.confirmation}`].filter(Boolean).join(' · '),
      addedBy: s.addedBy,
    });
    items.push({
      id: `${s.id}-out`, date: s.checkOutDate, time: s.checkOutTime, kind: 'stay',
      label: `Check-out · ${formatTime(s.checkOutTime)}`, title: s.name, detail: '',
      addedBy: s.addedBy,
    });
  }
  return items.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
}

// How many plans and bookings each person has added, for the Family section.
export function contributions(trip: Trip): Record<string, number> {
  const counts: Record<string, number> = {};
  const bump = (id: string) => { counts[id] = (counts[id] ?? 0) + 1; };
  for (const d of trip.days) for (const slot of Object.values(d.slots)) for (const a of slot) bump(a.addedBy);
  trip.flights.forEach((f) => bump(f.addedBy));
  trip.stays.forEach((s) => bump(s.addedBy));
  return counts;
}
