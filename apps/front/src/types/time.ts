import { WeekDays } from "../constants";

export type PeriodFormat = `${number}:${number}-${number}:${number}`;

export type WeekDay = typeof WeekDays[number];
