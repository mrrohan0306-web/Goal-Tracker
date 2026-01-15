import { MonthName, MONTHS } from '../types';

/**
 * Get the number of days in a given month and year
 */
export function getDaysInMonth(month: number, year: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Get the day of the week (0 = Sunday, 1 = Monday, etc.) for the first day of the month
 */
export function getFirstDayOfMonth(month: number, year: number): number {
  return new Date(year, month, 1).getDay();
}

/**
 * Convert month name (JAN, FEB, etc.) to month index (0-11)
 */
export function monthNameToIndex(monthName: MonthName): number {
  return MONTHS.indexOf(monthName);
}

/**
 * Convert month index (0-11) to month name (JAN, FEB, etc.)
 */
export function indexToMonthName(index: number): MonthName {
  return MONTHS[index];
}

/**
 * Get calendar grid for a given month and year
 * Returns an array of arrays representing weeks, with null for empty cells
 */
export function getCalendarGrid(monthName: MonthName, year: number = 2026): (number | null)[][] {
  const monthIndex = monthNameToIndex(monthName);
  const daysInMonth = getDaysInMonth(monthIndex, year);
  const firstDay = getFirstDayOfMonth(monthIndex, year);
  
  // Convert Sunday (0) to be the last day of the week
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

/**
 * Check if a date has saved data
 */
export function hasDataForDate(
  monthName: MonthName,
  date: number,
  year: number = 2026,
  data: any
): boolean {
  const yearData = data[year.toString()];
  if (!yearData) return false;
  
  const monthData = yearData[monthName];
  if (!monthData) return false;
  
  return !!monthData[date];
}
