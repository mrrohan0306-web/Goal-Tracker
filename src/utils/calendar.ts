import { MonthName, MONTHS } from '../types';

export function getDaysInMonth(month: number, year: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(month: number, year: number): number {
  return new Date(year, month, 1).getDay();
}

export function monthNameToIndex(monthName: MonthName): number {
  return MONTHS.indexOf(monthName);
}

export function indexToMonthName(index: number): MonthName {
  return MONTHS[index];
}

export function getCalendarGrid(monthName: MonthName, year: number = 2026): (number | null)[][] {
  const monthIndex = monthNameToIndex(monthName);
  const daysInMonth = getDaysInMonth(monthIndex, year);
  const firstDay = getFirstDayOfMonth(monthIndex, year);
  
  // Convert Sunday (0) to be the last day of the week (Monday-first)
  const startDay = firstDay === 0 ? 6 : firstDay - 1;
  
  const grid: (number | null)[][] = [];
  let currentWeek: (number | null)[] = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startDay; i++) {
    currentWeek.push(null);
  }
  
  // Add all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(day);
    
    // Start a new week every 7 days
    if (currentWeek.length === 7) {
      grid.push(currentWeek);
      currentWeek = [];
    }
  }
  
  // Fill the last week with null if needed
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    grid.push(currentWeek);
  }
  
  return grid;
}

export function formatDateKey(year: number, month: MonthName, date: number): string {
  return `${year}-${month}-${date}`;
}

export function getTodayDateKey(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = indexToMonthName(today.getMonth());
  const date = today.getDate();
  return formatDateKey(year, month, date);
}
