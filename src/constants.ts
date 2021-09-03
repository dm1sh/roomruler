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
