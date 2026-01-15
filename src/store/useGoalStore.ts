import { create } from 'zustand';
import { AppData, DayEntry, MonthName } from '../types';

interface GoalStore {
  data: AppData;
  saveEntry: (year: number, month: MonthName, date: number, entry: DayEntry) => void;
  getEntry: (year: number, month: MonthName, date: number) => DayEntry | null;
  hasMonthData: (year: number, month: MonthName) => boolean;
  loadData: () => void;
}

const STORAGE_KEY = 'goal-2026-data';

// Load data from LocalStorage
function loadFromStorage(): AppData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

// Save data to LocalStorage
function saveToStorage(data: AppData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

export const useGoalStore = create<GoalStore>((set, get) => ({
  data: loadFromStorage(),
  
  loadData: () => {
    set({ data: loadFromStorage() });
  },
  
  saveEntry: (year, month, date, entry) => {
    set((state) => {
      const yearStr = year.toString();
      const newData = { ...state.data };
      
      if (!newData[yearStr]) {
        newData[yearStr] = {};
      }
      
      if (!newData[yearStr][month]) {
        newData[yearStr][month] = {};
      }
      
      newData[yearStr][month] = {
        ...newData[yearStr][month],
        [date]: entry,
      };
      
      // Persist to LocalStorage
      saveToStorage(newData);
      
      return { data: newData };
    });
  },
  
  getEntry: (year, month, date) => {
    const state = get();
    const yearStr = year.toString();
    return state.data[yearStr]?.[month]?.[date] || null;
  },
  
  hasMonthData: (year, month) => {
    const state = get();
    const yearStr = year.toString();
    const monthData = state.data[yearStr]?.[month];
    return monthData ? Object.keys(monthData).length > 0 : false;
  },
}));
