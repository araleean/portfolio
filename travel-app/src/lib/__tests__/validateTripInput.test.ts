import type { TripInput } from '../../types';
import { isValidTripInput, validateTripInput } from '../validateTripInput';

const valid: TripInput = { destination: 'Kyoto', dayCount: 5, tripType: 'culture' };

describe('validateTripInput', () => {
  it('accepts a valid input', () => {
    expect(validateTripInput(valid)).toEqual({});
    expect(isValidTripInput(valid)).toBe(true);
  });

  it('rejects a blank destination', () => {
    expect(validateTripInput({ ...valid, destination: '   ' }).destination).toBeDefined();
  });

  it.each([0, 15, 2.5, Number.NaN])('rejects %p days', (dayCount) => {
    expect(validateTripInput({ ...valid, dayCount }).dayCount).toBeDefined();
  });

  it.each([1, 14])('accepts %p days', (dayCount) => {
    expect(isValidTripInput({ ...valid, dayCount })).toBe(true);
  });
});
