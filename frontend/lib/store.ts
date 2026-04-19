import { create } from 'zustand';
import { Habit, HabitStats } from './types';

/** Deterministic 0..1 value from strings so SSR and the browser render identical dummy data. */
function stable01(a: string, b: string): number {
  const s = `${a}|${b}`;
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 1_000_000) / 1_000_000;
}

/** Last N calendar days as YYYY-MM-DD in UTC so server and client agree regardless of local TZ. */
function getPastNDatesUtc(n: number): string[] {
  const days: string[] = [];
  const now = new Date();
  const startUtc = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  );
  for (let i = n - 1; i >= 0; i--) {
    const t = startUtc - i * 24 * 60 * 60 * 1000;
    days.push(new Date(t).toISOString().split('T')[0]);
  }
  return days;
}

interface HabitStore {
  habits: Habit[];
  addHabit: (habit: Habit) => void;
  updateHabit: (id: string, habit: Partial<Habit>) => void;
  deleteHabit: (id: string) => void;
  toggleHabitCompletion: (habitId: string, date: string) => void;
  getHabitStats: (habitId: string) => HabitStats;
}

const generateDummyHabits = (): Habit[] => {
  const now = new Date();
  const past30Days = getPastNDatesUtc(30);

  const daysAgoUtc = (days: number): string => {
    const t =
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) -
      days * 24 * 60 * 60 * 1000;
    return new Date(t).toISOString().split('T')[0];
  };

  return [
    {
      id: '1',
      name: 'Morning Meditation',
      description: 'Start the day with a 10-minute meditation session',
      frequency: 'daily',
      createdAt: daysAgoUtc(60),
      entries: past30Days.map((date) => ({
        date,
        completed: stable01('1', date) > 0.3,
      })),
    },
    {
      id: '2',
      name: 'Exercise',
      description: 'Workout or physical activity for 30 minutes',
      frequency: 'daily',
      createdAt: daysAgoUtc(45),
      entries: past30Days.map((date) => ({
        date,
        completed: stable01('2', date) > 0.4,
      })),
    },
    {
      id: '3',
      name: 'Read',
      description: 'Read for at least 20 minutes',
      frequency: 'daily',
      createdAt: daysAgoUtc(30),
      entries: past30Days.map((date) => ({
        date,
        completed: stable01('3', date) > 0.25,
      })),
    },
    {
      id: '4',
      name: 'Code Review',
      description: 'Review code from team members',
      frequency: 'weekly',
      createdAt: daysAgoUtc(90),
      entries: past30Days.map((date) => ({
        date,
        completed:
          new Date(`${date}T12:00:00Z`).getUTCDay() === 3 &&
          stable01('4', date) > 0.2,
      })),
    },
    {
      id: '5',
      name: 'Journaling',
      description: 'Reflect on the day in a journal',
      frequency: 'daily',
      createdAt: daysAgoUtc(15),
      entries: past30Days.map((date) => ({
        date,
        completed: stable01('5', date) > 0.35,
      })),
    },
  ];
};

export const useHabitStore = create<HabitStore>((set, get) => ({
  habits: generateDummyHabits(),

  addHabit: (habit) => {
    set((state) => ({
      habits: [...state.habits, habit],
    }));
  },

  updateHabit: (id, updates) => {
    set((state) => ({
      habits: state.habits.map((habit) =>
        habit.id === id ? { ...habit, ...updates } : habit
      ),
    }));
  },

  deleteHabit: (id) => {
    set((state) => ({
      habits: state.habits.filter((habit) => habit.id !== id),
    }));
  },

  toggleHabitCompletion: (habitId, date) => {
    set((state) => ({
      habits: state.habits.map((habit) => {
        if (habit.id === habitId) {
          const entryIndex = habit.entries.findIndex((e) => e.date === date);
          if (entryIndex >= 0) {
            const entries = [...habit.entries];
            entries[entryIndex] = {
              ...entries[entryIndex],
              completed: !entries[entryIndex].completed,
            };
            return { ...habit, entries };
          } else {
            return {
              ...habit,
              entries: [
                ...habit.entries,
                { date, completed: true },
              ],
            };
          }
        }
        return habit;
      }),
    }));
  },

  getHabitStats: (habitId) => {
    const habits = get().habits;
    const habit = habits.find((h) => h.id === habitId);

    if (!habit) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        completionRate: 0,
        totalCompleted: 0,
      };
    }

    const sortedEntries = [...habit.entries].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    let totalCompleted = 0;

    const today = new Date().toISOString().split('T')[0];

    for (let i = sortedEntries.length - 1; i >= 0; i--) {
      const entry = sortedEntries[i];
      if (entry.completed) {
        tempStreak++;
        totalCompleted++;
      } else {
        if (tempStreak > longestStreak) {
          longestStreak = tempStreak;
        }
        tempStreak = 0;
      }
    }

    if (tempStreak > 0) {
      longestStreak = Math.max(longestStreak, tempStreak);
    }

    // Walk backward in UTC calendar days so SSR and browser agree (local setDate differs by TZ).
    let streakCount = 0;
    const now = new Date();
    let dayStartUtc = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate()
    );
    while (true) {
      const dateStr = new Date(dayStartUtc).toISOString().split('T')[0];
      const entry = sortedEntries.find((e) => e.date === dateStr);
      if (entry && entry.completed) {
        streakCount++;
        dayStartUtc -= 24 * 60 * 60 * 1000;
      } else if (dateStr === today && !entry) {
        dayStartUtc -= 24 * 60 * 60 * 1000;
      } else {
        break;
      }
    }

    currentStreak = streakCount;

    const completionRate =
      sortedEntries.length > 0
        ? (totalCompleted / sortedEntries.length) * 100
        : 0;

    return {
      currentStreak,
      longestStreak,
      completionRate: Math.round(completionRate),
      totalCompleted,
    };
  },
}));
