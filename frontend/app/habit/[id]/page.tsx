'use client';

import { useHabitStore } from '@/lib/store';
import HabitDetail from '@/components/HabitDetail';
import Header from '@/components/Header';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function HabitPage() {
  const params = useParams();
  const habitId = params.id as string;
  const habits = useHabitStore((state) => state.habits);
  const habit = habits.find((h) => h.id === habitId);

  if (!habit) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">Habit not found</h1>
            <Link href="/" className="mt-4 inline-block text-blue-400 hover:underline">
              Back to habits
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-slate-400 hover:text-white">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
        <HabitDetail habit={habit} />
      </main>
    </div>
  );
}
