'use client';

import { Habit } from '@/lib/types';
import { useHabitStore } from '@/lib/store';
import { todayString } from '@/lib/utils';
import Link from 'next/link';
import { useMemo } from 'react';

interface HabitCardProps {
  habit: Habit;
}

export default function HabitCard({ habit }: HabitCardProps) {
  const toggleCompletion = useHabitStore((state) => state.toggleHabitCompletion);
  const getHabitStats = useHabitStore((state) => state.getHabitStats);

  const today = useMemo(() => todayString(), []);
  const stats = useMemo(() => getHabitStats(habit.id), [habit.id, getHabitStats]);
  const todayEntry = useMemo(
    () => habit.entries.find((e) => e.date === today),
    [habit.entries, today]
  );
  const isCompletedToday = useMemo(() => todayEntry?.completed ?? false, [todayEntry]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleCompletion(habit.id, today);
  };

  return (
    <Link href={`/habit/${habit.id}`}>
      <div className="group cursor-pointer rounded-lg border border-slate-600 bg-slate-800 p-6 transition-all hover:border-slate-500 hover:bg-slate-700 hover:shadow-lg">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
              {habit.name}
            </h3>
            <p className="mt-1 text-sm text-slate-400">{habit.description}</p>
          </div>
          <span className="inline-block rounded-full bg-slate-700 px-3 py-1 text-xs font-medium text-slate-300">
            {habit.frequency}
          </span>
        </div>

        <div className="mb-4 flex gap-4">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase text-slate-500">Streak</p>
            <p className="mt-1 text-2xl font-bold text-orange-400">
              {stats.currentStreak}
            </p>
            <p className="text-xs text-slate-400">days</p>
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase text-slate-500">Best</p>
            <p className="mt-1 text-2xl font-bold text-blue-400">
              {stats.longestStreak}
            </p>
            <p className="text-xs text-slate-400">days</p>
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase text-slate-500">Rate</p>
            <p className="mt-1 text-2xl font-bold text-green-400">
              {stats.completionRate}%
            </p>
            <p className="text-xs text-slate-400">complete</p>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className={`w-full rounded-lg py-2 px-3 font-semibold transition-colors ${
            isCompletedToday
              ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
              : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
          }`}
        >
          {isCompletedToday ? '✓ Completed Today' : 'Mark Complete'}
        </button>
      </div>
    </Link>
  );
}
