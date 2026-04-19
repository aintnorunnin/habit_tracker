import { create } from 'zustand';
import { Habit, HabitStats } from './types';

interface HabitStore {
  habits: Habit[];
  addHabit: (habit: Habit) => void;
  updateHabit: (id: string, habit: Partial<Habit>) => void;
  deleteHabit: (id: string) => void;
  toggleHabitCompletion: (habitId: string, date: string) => void;
  getHabitStats: (habitId: string) => HabitStats;
}

const generateDummyHabits = (): Habit[] => {
  const today = new Date();
  const past30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  return [
    {
      id: '1',
      name: 'Morning Meditation',
      description: 'Start the day with a 10-minute meditation session',
      frequency: 'daily',
      createdAt: new Date(today.getTime() - 60 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      entries: past30Days.map((date) => ({
        date,
        completed: Math.random() > 0.3,
      })),
    },
    {
      id: '2',
      name: 'Exercise',
      description: 'Workout or physical activity for 30 minutes',
      frequency: 'daily',
      createdAt: new Date(today.getTime() - 45 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      entries: past30Days.map((date) => ({
        date,
        completed: Math.random() > 0.4,
      })),
    },
    {
      id: '3',
      name: 'Read',
      description: 'Read for at least 20 minutes',
      frequency: 'daily',
      createdAt: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      entries: past30Days.map((date) => ({
        date,
        completed: Math.random() > 0.25,
      })),
    },
    {
      id: '4',
      name: 'Code Review',
      description: 'Review code from team members',
      frequency: 'weekly',
      createdAt: new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      entries: [
        ...past30Days.map((date) => ({
          date,
          completed:
            new Date(date).getDay() === 3 && Math.random() > 0.2, // Wednesday
        })),
      ],
    },
    {
      id: '5',
      name: 'Journaling',
      description: 'Reflect on the day in a journal',
      frequency: 'daily',
      createdAt: new Date(today.getTime() - 15 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      entries: past30Days.map((date) => ({
        date,
        completed: Math.random() > 0.35,
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

    // Calculate current streak (must be consecutive from today or yesterday)
    let streakCount = 0;
    const checkDate = new Date();
    while (true) {
      const dateStr = checkDate.toISOString().split('T')[0];
      const entry = sortedEntries.find((e) => e.date === dateStr);
      if (entry && entry.completed) {
        streakCount++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else if (dateStr === today && !entry) {
        // Today not filled yet, continue to yesterday
        checkDate.setDate(checkDate.getDate() - 1);
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
