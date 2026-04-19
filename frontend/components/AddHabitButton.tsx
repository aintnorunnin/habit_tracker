'use client';

import { useState } from 'react';
import { useHabitStore } from '@/lib/store';
import { HabitFrequency } from '@/lib/types';

export default function AddHabitButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState<HabitFrequency>('daily');

  const addHabit = useHabitStore((state) => state.addHabit);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newHabit = {
      id: Date.now().toString(),
      name,
      description,
      frequency,
      createdAt: new Date().toISOString().split('T')[0],
      entries: [],
    };

    addHabit(newHabit);
    setName('');
    setDescription('');
    setFrequency('daily');
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 font-semibold text-white transition-all hover:shadow-lg hover:shadow-blue-500/20"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        New Habit
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-slate-800 p-6 shadow-xl">
            <h2 className="mb-6 text-2xl font-bold text-white">Create New Habit</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300">
                  Habit Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Morning Run"
                  className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300">
                  Description (optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Why do you want to build this habit?"
                  className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300">
                  Frequency
                </label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value as HabitFrequency)}
                  className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 rounded-lg border border-slate-600 bg-slate-700 py-2 font-semibold text-slate-300 transition-colors hover:bg-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 py-2 font-semibold text-white transition-all hover:shadow-lg"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
