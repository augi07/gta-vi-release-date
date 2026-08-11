export const RELEASE_DATE = new Date("2026-11-19T00:00:00");
export const EXTENDED_LOOK_DATE = new Date("2026-08-27T19:00:00Z");

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function calculateTimeRemaining(targetDate: Date, now: Date = new Date()): TimeRemaining {
  const difference = Math.max(0, targetDate.getTime() - now.getTime());
  const totalSeconds = Math.floor(difference / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export function formatTimeValue(value: number, size = 2): string {
  return String(value).padStart(size, "0");
}
