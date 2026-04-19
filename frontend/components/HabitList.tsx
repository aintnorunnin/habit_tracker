'use client';

import { Habit } from '@/lib/types';
import HabitCard from './HabitCard';
import AddHabitButton from './AddHabitButton';

interface HabitListProps {
  habits: Habit[];
}

export default function HabitList({ habits }: HabitListProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Your Habits</h2>
          <p className="mt-2 text-slate-400">
            {habits.length} habit{habits.length !== 1 ? 's' : ''} tracked
          </p>
        </div>
        <AddHabitButton />
      </div>

      {habits.length === 0 ? (
        <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-slate-600 bg-slate-800/30">
          <div className="text-center">
            <p className="text-lg text-slate-400">No habits yet</p>
            <p className="mt-2 text-sm text-slate-500">Create one to get started</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} />
          ))}
        </div>
      )}
    </div>
  );
}
