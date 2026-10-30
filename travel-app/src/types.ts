export type TripType = 'relaxed' | 'adventure' | 'family' | 'foodie' | 'culture';

export type Slot = 'morning' | 'afternoon' | 'evening';

export type Pace = 'easy' | 'balanced' | 'full';

// Where a plan came from: a booking, a generated idea, or something the family asked for.
export type ActivityTag = 'flight' | 'stay' | 'idea' | 'must-do';

// 'sample' marks plans the app suggested rather than a person.
export const SAMPLE_AUTHOR = 'sample';

export interface Activity {
  id: string;
  title: string;
  notes?: string;
  tag?: ActivityTag;
  addedBy: string; // a Member id or SAMPLE_AUTHOR
  editedBy?: string;
}

export interface Day {
  id: string;
  // The day number and date come from the day's position in Trip.days.
  slots: Record<Slot, Activity[]>;
}

export interface Member {
  id: string;
  name: string;
  color: string; // avatar fill; the initial is drawn in white
}

export interface Flight {
  id: string;
  label: string; // e.g. "Outbound"
  flightNumber: string;
  from: string;
  to: string;
  departDate: string; // YYYY-MM-DD
  departTime: string; // HH:MM, 24-hour
  arriveDate: string;
  arriveTime: string;
  confirmation?: string;
  addedBy: string;
}

export interface Stay {
  id: string;
  name: string;
  address?: string;
  checkInDate: string; // YYYY-MM-DD
  checkInTime: string; // HH:MM, 24-hour
  checkOutDate: string;
  checkOutTime: string;
  confirmation?: string;
  addedBy: string;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  paidBy: string;
}

export interface FeedEntry {
  id: string;
  who: string;
  text: string;
  at: number; // epoch ms
}

export interface Trip {
  id: string;
  destination: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD, inclusive
  members: Member[];
  flights: Flight[];
  stays: Stay[];
  expenses: Expense[];
  days: Day[]; // empty until someone plans the itinerary
  feed: FeedEntry[]; // newest first
}

export interface DraftPreferences {
  styles: TripType[];
  pace: Pace;
  mustDos: string[];
}
