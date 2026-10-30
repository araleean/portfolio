import { addDays, dayIndex, formatDay, formatRange, formatTime, slotForTime, tripLength } from '../dates';

describe('dates', () => {
  it('counts trip days inclusively', () => {
    expect(tripLength('2026-12-18', '2026-12-24')).toBe(7);
    expect(tripLength('2026-12-18', '2026-12-18')).toBe(1);
  });

  it('finds a date within a trip, across a month end', () => {
    expect(dayIndex('2026-12-30', '2027-01-02')).toBe(3);
    expect(addDays('2026-12-30', 3)).toBe('2027-01-02');
  });

  it('formats days, ranges and times', () => {
    expect(formatDay('2026-12-18')).toBe('Fri, Dec 18');
    expect(formatRange('2026-12-18', '2026-12-24')).toBe('Dec 18 – 24, 2026');
    expect(formatRange('2026-12-30', '2027-01-02')).toBe('Dec 30 – Jan 2, 2027');
    expect(formatTime('13:30')).toBe('1:30 PM');
    expect(formatTime('00:05')).toBe('12:05 AM');
    expect(formatTime('12:00')).toBe('12:00 PM');
  });

  it('puts times into a time of day', () => {
    expect(slotForTime('11:10')).toBe('morning');
    expect(slotForTime('12:00')).toBe('afternoon');
    expect(slotForTime('16:59')).toBe('afternoon');
    expect(slotForTime('17:00')).toBe('evening');
  });
});
