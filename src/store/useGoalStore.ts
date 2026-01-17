import { create } from 'zustand';
import { AppData, DayEntry, MonthName, TasksData, Task } from '../types';
import { loadEntries, saveEntries, loadTasks, saveTasks } from '../utils/storage';
import { getTodayDateKey } from '../utils/calendar';

interface GoalStore {
  entries: AppData;
  tasks: TasksData;
  loadData: () => void;
  saveDayEntry: (year: number, month: MonthName, date: number, entry: DayEntry) => void;
  getDayEntry: (year: number, month: MonthName, date: number) => DayEntry | null;
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  getTodayTasks: () => Task[];
}

export const useGoalStore = create<GoalStore>((set, get) => ({
  entries: loadEntries(),
  tasks: loadTasks(),
  
  loadData: () => {
    set({ entries: loadEntries(), tasks: loadTasks() });
  },
  
  saveDayEntry: (year, month, date, entry) => {
    set((state) => {
      const yearStr = year.toString();
      const newEntries = { ...state.entries };
      
      if (!newEntries[yearStr]) {
        newEntries[yearStr] = {};
      }
      
      if (!newEntries[yearStr][month]) {
        newEntries[yearStr][month] = {};
      }
      
      newEntries[yearStr][month][date.toString()] = entry;
      saveEntries(newEntries);
      
      return { entries: newEntries };
    });
  },
  
  getDayEntry: (year, month, date) => {
    const state = get();
    const yearStr = year.toString();
    return state.entries[yearStr]?.[month]?.[date.toString()] || null;
  },
  
  addTask: (task) => {
    set((state) => {
      const dateKey = getTodayDateKey();
      const newTasks = { ...state.tasks };
      
      if (!newTasks[dateKey]) {
        newTasks[dateKey] = [];
      }
      
      newTasks[dateKey] = [...newTasks[dateKey], task];
      saveTasks(newTasks);
      
      return { tasks: newTasks };
    });
  },
  
  updateTask: (taskId, updates) => {
    set((state) => {
      const dateKey = getTodayDateKey();
      const newTasks = { ...state.tasks };
      
      if (newTasks[dateKey]) {
        newTasks[dateKey] = newTasks[dateKey].map(task =>
          task.id === taskId ? { ...task, ...updates } : task
        );
        saveTasks(newTasks);
      }
      
      return { tasks: newTasks };
    });
  },
  
  deleteTask: (taskId) => {
    set((state) => {
      const dateKey = getTodayDateKey();
      const newTasks = { ...state.tasks };
      
      if (newTasks[dateKey]) {
        newTasks[dateKey] = newTasks[dateKey].filter(task => task.id !== taskId);
        saveTasks(newTasks);
      }
      
      return { tasks: newTasks };
    });
  },
  
  getTodayTasks: () => {
    const state = get();
    const dateKey = getTodayDateKey();
    return state.tasks[dateKey] || [];
  },
}));
