'use client';

import { useHabitStore } from '@/lib/store';
import HabitList from '@/components/HabitList';
import Header from '@/components/Header';

export default function Home() {
  const habits = useHabitStore((state) => state.habits);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <HabitList habits={habits} />
      </main>
    </div>
  );
}
