export type HabitFrequency = 'daily' | 'weekly' | 'monthly';

export interface HabitEntry {
  date: string; // ISO date string (YYYY-MM-DD)
  completed: boolean;
}

export interface Habit {
  id: string;
  name: string;
  description: string;
  frequency: HabitFrequency;
  createdAt: string; // ISO date string
  entries: HabitEntry[];
}

export interface HabitStats {
  currentStreak: number;
  longestStreak: number;
  completionRate: number; // 0-100
  totalCompleted: number;
}
