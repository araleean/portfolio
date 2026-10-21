import type { Slot, TripType } from '../types';

export const MIN_DAYS = 1;
export const MAX_DAYS = 14;

export const SLOTS: Slot[] = ['morning', 'afternoon', 'evening'];

export const SLOT_LABELS: Record<Slot, string> = {
  morning: 'Morning',
  afternoon: 'Afternoon',
  evening: 'Evening',
};

export const TRIP_TYPES: TripType[] = ['relaxed', 'adventure', 'family', 'foodie', 'culture'];

export const TRIP_TYPE_LABELS: Record<TripType, string> = {
  relaxed: 'Relaxed',
  adventure: 'Adventure',
  family: 'Family with kids',
  foodie: 'Foodie',
  culture: 'Culture',
};
