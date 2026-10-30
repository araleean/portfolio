import type { Pace, Slot, TripType } from '../types';

export const SLOTS: Slot[] = ['morning', 'afternoon', 'evening'];

export const SLOT_LABELS: Record<Slot, string> = {
  morning: 'Morning',
  afternoon: 'Afternoon',
  evening: 'Evening',
};

export const TRIP_TYPES: TripType[] = ['relaxed', 'family', 'foodie', 'adventure', 'culture'];

export const TRIP_TYPE_LABELS: Record<TripType, string> = {
  relaxed: 'Relaxed',
  adventure: 'Adventure',
  family: 'Family with kids',
  foodie: 'Foodie',
  culture: 'Culture',
};

export const PACES: { id: Pace; label: string; detail: string; plansPerDay: number }[] = [
  { id: 'easy', label: 'Easy', detail: '1–2 plans a day', plansPerDay: 2 },
  { id: 'balanced', label: 'Balanced', detail: '3 plans a day', plansPerDay: 3 },
  { id: 'full', label: 'Full', detail: '4+ plans a day', plansPerDay: 4 },
];
