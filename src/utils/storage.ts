import { AppData, TasksData } from '../types';

const ENTRIES_KEY = 'goalnote-entries';
const TASKS_KEY = 'goalnote-tasks';

export function loadEntries(): AppData {
  try {
    const stored = localStorage.getItem(ENTRIES_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function saveEntries(data: AppData): void {
  try {
    localStorage.setItem(ENTRIES_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save entries:', error);
  }
}

export function loadTasks(): TasksData {
  try {
    const stored = localStorage.getItem(TASKS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function saveTasks(data: TasksData): void {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save tasks:', error);
  }
}

export function exportAllData(): string {
  const entries = loadEntries();
  const tasks = loadTasks();
  return JSON.stringify({ entries, tasks }, null, 2);
}

export function downloadData(): void {
  const data = exportAllData();
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'goalnote-backup.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
