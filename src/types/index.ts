export type MoodStatus = 'BLUE' | 'GOLD' | 'GREY' | 'GREEN';

export interface DayEntry {
  date: number;
  goal: string;
  achievement: string;
  mood: MoodStatus;
}

export interface MonthData {
  [date: number]: DayEntry;
}

export interface YearData {
  [month: string]: MonthData;
}

export interface AppData {
  [year: string]: YearData;
}

export type MonthName = 
  | 'JAN' | 'FEB' | 'MAR' | 'APR' | 'MAY' | 'JUN'
  | 'JUL' | 'AUG' | 'SEP' | 'OCT' | 'NOV' | 'DEC';

export const MONTHS: MonthName[] = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
];

export const MONTH_HOVER_COLORS: Record<MonthName, string> = {
  JAN: 'hover:bg-month-jan',
  FEB: 'hover:bg-month-feb',
  MAR: 'hover:bg-month-mar',
  APR: 'hover:bg-month-apr',
  MAY: 'hover:bg-month-may',
  JUN: 'hover:bg-month-jun',
  JUL: 'hover:bg-month-jul',
  AUG: 'hover:bg-month-aug',
  SEP: 'hover:bg-month-sep',
  OCT: 'hover:bg-month-oct',
  NOV: 'hover:bg-month-nov',
  DEC: 'hover:bg-month-dec',
};
