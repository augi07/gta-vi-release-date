import { describe, it, expect } from 'vitest';
import { calculateTimeRemaining, formatTimeValue, RELEASE_DATE, EXTENDED_LOOK_DATE } from '../src/utils/countdown';

describe('Countdown logic unit tests', () => {
  it('should format values with padding correctly', () => {
    expect(formatTimeValue(5)).toBe('05');
    expect(formatTimeValue(12)).toBe('12');
    expect(formatTimeValue(0)).toBe('00');
  });

  it('should return 0 for past dates', () => {
    const past = new Date('2025-01-01T00:00:00Z');
    const now = new Date('2025-01-02T00:00:00Z');
    const result = calculateTimeRemaining(past, now);

    expect(result).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });

  it('should correctly calculate days, hours, minutes, and seconds remaining', () => {
    const target = new Date('2026-11-19T00:00:00Z');
    // 1 day, 2 hours, 3 minutes, 4 seconds before target
    const now = new Date(target.getTime() - (1 * 86400 + 2 * 3600 + 3 * 60 + 4) * 1000);

    const result = calculateTimeRemaining(target, now);
    expect(result).toEqual({
      days: 1,
      hours: 2,
      minutes: 3,
      seconds: 4,
    });
  });

  it('should verify defined launch dates', () => {
    expect(RELEASE_DATE.getFullYear()).toBe(2026);
    expect(RELEASE_DATE.getMonth()).toBe(10); // November is month 10 (0-indexed)
    expect(EXTENDED_LOOK_DATE.getUTCMonth()).toBe(7); // August is month 7 (0-indexed)
  });
});
