import type { Slot } from '../types';

const DAY_MS = 86_400_000;

// Dates are plain YYYY-MM-DD strings handled in UTC so a phone's time zone never shifts a day.
export function parseIsoDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

export function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function addDays(iso: string, n: number): string {
  return toIsoDate(new Date(parseIsoDate(iso).getTime() + n * DAY_MS));
}

// Position of `iso` in a trip starting on `startIso` (0 = first day; negative = before).
export function dayIndex(startIso: string, iso: string): number {
  return Math.round((parseIsoDate(iso).getTime() - parseIsoDate(startIso).getTime()) / DAY_MS);
}

// Inclusive: the same start and end date is a 1-day trip.
export function tripLength(startIso: string, endIso: string): number {
  return dayIndex(startIso, endIso) + 1;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function weekday(iso: string): string {
  return WEEKDAYS[parseIsoDate(iso).getUTCDay()];
}

// "Fri, Dec 18"
export function formatDay(iso: string): string {
  const d = parseIsoDate(iso);
  return `${WEEKDAYS[d.getUTCDay()]}, ${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}`;
}

// "Dec 18 – 24, 2026", or "Dec 30 – Jan 2, 2027" across months.
export function formatRange(startIso: string, endIso: string): string {
  const s = parseIsoDate(startIso);
  const e = parseIsoDate(endIso);
  const start = `${MONTHS[s.getUTCMonth()]} ${s.getUTCDate()}`;
  const end = s.getUTCMonth() === e.getUTCMonth() && s.getUTCFullYear() === e.getUTCFullYear()
    ? `${e.getUTCDate()}`
    : `${MONTHS[e.getUTCMonth()]} ${e.getUTCDate()}`;
  return `${start} – ${end}, ${e.getUTCFullYear()}`;
}

// "13:30" -> "1:30 PM"
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h < 12 ? 'AM' : 'PM';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, '0')} ${suffix}`;
}

export function slotForTime(hhmm: string): Slot {
  const h = Number(hhmm.split(':')[0]);
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}

// Whole days from `fromIso` until `startIso`.
export function daysUntil(fromIso: string, startIso: string): number {
  return dayIndex(fromIso, startIso);
}

// Today's date on the phone, as YYYY-MM-DD.
export function todayIso(now: Date = new Date()): string {
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${m}-${d}`;
}
