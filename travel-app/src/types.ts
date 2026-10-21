export type TripType = 'relaxed' | 'adventure' | 'family' | 'foodie' | 'culture';

export type Slot = 'morning' | 'afternoon' | 'evening';

export interface Activity {
  id: string;
  title: string;
  notes?: string;
}

export interface Day {
  id: string;
  // The day number comes from the day's position in Trip.days.
  slots: Record<Slot, Activity[]>;
}

export interface Trip {
  id: string;
  destination: string;
  tripType: TripType;
  days: Day[];
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}

export interface TripInput {
  destination: string;
  dayCount: number;
  tripType: TripType;
}
