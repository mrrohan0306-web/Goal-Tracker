export type MoodType = 'happy' | 'neutral' | 'sad' | 'very-sad' | 'angry';

export interface DayEntry {
  mood?: MoodType;
  text?: string;
  content?: string; // HTML content for rich text
}

export interface MonthData {
  [date: string]: DayEntry;
}

export interface YearData {
  [month: string]: MonthData;
}

export interface AppData {
  [year: string]: YearData;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  time?: string;
  createdAt: number;
}

export interface TasksData {
  [date: string]: Task[];
}

export const MONTHS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december'
] as const;

export type MonthName = typeof MONTHS[number];

export const MONTH_COLORS: Record<MonthName, string> = {
  january: 'bg-month-jan border-month-jan',
  february: 'bg-month-feb border-month-feb',
  march: 'bg-month-mar border-month-mar',
  april: 'bg-month-apr border-month-apr',
  may: 'bg-month-may border-month-may',
  june: 'bg-month-jun border-month-jun',
  july: 'bg-month-jul border-month-jul',
  august: 'bg-month-aug border-month-aug',
  september: 'bg-month-sep border-month-sep',
  october: 'bg-month-oct border-month-oct',
  november: 'bg-month-nov border-month-nov',
  december: 'bg-month-dec border-month-dec',
};
