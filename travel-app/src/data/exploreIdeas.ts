import type { Pace, Slot, TripType } from '../types';

// Sample itineraries shown in Explore. Using one fills the draft with these styles and pace.
export interface ExploreIdea {
  id: string;
  title: string;
  destination: string;
  meta: string;
  tags: string[];
  tint: 'tileFlights' | 'tileStays' | 'tileExpenses';
  styles: TripType[];
  pace: Pace;
  summary: string;
  preview: Record<Slot, string>[];
  totalDays: number;
  planCount: number;
}

export const EXPLORE_IDEAS: ExploreIdea[] = [
  {
    id: 'easy-kids',
    title: '5 easy days with kids',
    destination: 'Honolulu',
    meta: '15 plans · beaches, naps, early dinners',
    tags: ['Family', 'Relaxed'],
    tint: 'tileFlights',
    styles: ['relaxed', 'family'],
    pace: 'balanced',
    summary: 'Slow mornings, beach afternoons and early dinners, with a rest break built into every day.',
    preview: [
      { morning: 'Pancake breakfast, then a beach walk', afternoon: 'Nap or downtime', evening: 'Early family dinner' },
      { morning: 'Snorkeling at a calm beach', afternoon: 'Ice cream and a stroll', evening: 'Sunset at the beach' },
    ],
    totalDays: 5,
    planCount: 15,
  },
  {
    id: 'foodie-weekend',
    title: 'A foodie long weekend',
    destination: 'Honolulu',
    meta: '9 plans · markets, poke, shave ice',
    tags: ['Foodie'],
    tint: 'tileExpenses',
    styles: ['foodie'],
    pace: 'balanced',
    summary: 'Three days built around markets, long lunches and casual dinners.',
    preview: [
      { morning: 'Farmers market breakfast', afternoon: 'Poke and a long lunch', evening: 'Food truck dinner' },
      { morning: 'Coffee farm visit', afternoon: 'Shave ice crawl', evening: 'Dinner at a neighbourhood favourite' },
    ],
    totalDays: 3,
    planCount: 9,
  },
];

export const POPULAR_PLACES: { name: string; detail: string; tint: 'tileStays' | 'tileFlights' | 'soft' }[] = [
  { name: 'Tokyo', detail: '7-day ideas', tint: 'tileStays' },
  { name: 'Lisbon', detail: '5-day ideas', tint: 'soft' },
  { name: 'Cancún', detail: '6-day ideas', tint: 'tileFlights' },
];
