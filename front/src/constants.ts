import { ContextData } from "./types/context";
import { PeriodFormat } from "./types/time";

export const lessonPeriods: readonly PeriodFormat[] = [
  "8:30-9:10",
  "9:20-10:00",
  "10:15-10:55",
  "11:10-11:50",
  "12:00-12:40",
  "12:50-13:30",
] as const;

export const WeekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

// It will look like Windows 11 logo, lol
export const defaultState: ContextData = {
  map: [
    { x: 5, y: 5 },
    { x: 110, y: 5 },
    { x: 5, y: 110 },
    { x: 110, y: 110 },
  ].map((coordinates, index) => ({
    coordinates,
    size: { w: 100, h: 100 },
    title: index + 1,
  })),
  char: Array(4)
    .fill(0)
    .map(() => ({
      free: true,
    })),
};
