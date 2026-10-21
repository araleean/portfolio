import type { TripInput } from '../types';
import { MAX_DAYS, MIN_DAYS } from './tripOptions';

export interface TripInputErrors {
  destination?: string;
  dayCount?: string;
}

export function validateTripInput(input: TripInput): TripInputErrors {
  const errors: TripInputErrors = {};

  if (input.destination.trim() === '') {
    errors.destination = 'Enter a destination.';
  }
  if (!Number.isInteger(input.dayCount) || input.dayCount < MIN_DAYS || input.dayCount > MAX_DAYS) {
    errors.dayCount = `Choose between ${MIN_DAYS} and ${MAX_DAYS} days.`;
  }

  return errors;
}

export function isValidTripInput(input: TripInput): boolean {
  return Object.keys(validateTripInput(input)).length === 0;
}
