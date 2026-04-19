'use client';

import { Habit } from '@/lib/types';
import { useHabitStore } from '@/lib/store';
import { todayString, getLastNDays, formatDate } from '@/lib/utils';
import { useState } from 'react';

interface HabitDetailProps {
  habit: Habit;
}

export default function HabitDetail({ habit }: HabitDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(habit.name);
  const [editDescription, setEditDescription] = useState(habit.description);

  const updateHabit = useHabitStore((state) => state.updateHabit);
  const deleteHabit = useHabitStore((state) => state.deleteHabit);
  const toggleCompletion = useHabitStore((state) => state.toggleHabitCompletion);
  const getHabitStats = useHabitStore((state) => state.getHabitStats);

  const stats = getHabitStats(habit.id);
  const today = todayString();

  const handleSave = () => {
    updateHabit(habit.id, {
      name: editName,
      description: editDescription,
    });
    setIsEditing(false);
  };

  const last7Days = getLastNDays(7);
  const last30Days = getLastNDays(30);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-4">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-2xl font-bold text-white focus:border-blue-500 focus:outline-none"
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-slate-300 focus:border-blue-500 focus:outline-none"
                rows={2}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="rounded-lg bg-slate-600 px-4 py-2 font-semibold text-white hover:bg-slate-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-4xl font-bold text-white">{habit.name}</h1>
              <p className="mt-2 text-lg text-slate-400">{habit.description}</p>
            </>
          )}
        </div>
        {!isEditing && (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-lg bg-slate-600 px-4 py-2 font-semibold text-white hover:bg-slate-700"
            >
              Edit
            </button>
            <button
              onClick={() => {
                if (confirm('Delete this habit?')) {
                  deleteHabit(habit.id);
                  window.location.href = '/';
                }
              }}
              className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border border-slate-600 bg-slate-800 p-6">
          <p className="text-sm font-semibold uppercase text-slate-400">Current Streak</p>
          <p className="mt-2 text-3xl font-bold text-orange-400">{stats.currentStreak}</p>
          <p className="mt-1 text-xs text-slate-500">days</p>
        </div>
        <div className="rounded-lg border border-slate-600 bg-slate-800 p-6">
          <p className="text-sm font-semibold uppercase text-slate-400">Best Streak</p>
          <p className="mt-2 text-3xl font-bold text-blue-400">{stats.longestStreak}</p>
          <p className="mt-1 text-xs text-slate-500">days</p>
        </div>
        <div className="rounded-lg border border-slate-600 bg-slate-800 p-6">
          <p className="text-sm font-semibold uppercase text-slate-400">Completion</p>
          <p className="mt-2 text-3xl font-bold text-green-400">{stats.completionRate}%</p>
          <p className="mt-1 text-xs text-slate-500">rate</p>
        </div>
        <div className="rounded-lg border border-slate-600 bg-slate-800 p-6">
          <p className="text-sm font-semibold uppercase text-slate-400">Total</p>
          <p className="mt-2 text-3xl font-bold text-purple-400">{stats.totalCompleted}</p>
          <p className="mt-1 text-xs text-slate-500">completed</p>
        </div>
      </div>

      {/* Last 7 Days */}
      <div className="rounded-lg border border-slate-600 bg-slate-800 p-6">
        <h2 className="mb-4 text-xl font-bold text-white">Last 7 Days</h2>
        <div className="flex gap-2">
          {last7Days.map((date) => {
            const entry = habit.entries.find((e) => e.date === date);
            const isCompleted = entry?.completed ?? false;
            const isToday = date === today;

            return (
              <button
                key={date}
                onClick={() => toggleCompletion(habit.id, date)}
                className={`flex flex-1 flex-col items-center rounded-lg py-3 transition-all ${
                  isCompleted
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-slate-700 text-slate-400'
                } ${isToday ? 'ring-2 ring-blue-500' : ''} hover:scale-105`}
                title={formatDate(date)}
              >
                <span className="text-xs font-semibold uppercase">
                  {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
                <span className="mt-1 text-lg font-bold">
                  {isCompleted ? '✓' : '-'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Calendar View - 30 Day History */}
      <div className="rounded-lg border border-slate-600 bg-slate-800 p-6">
        <h2 className="mb-4 text-xl font-bold text-white">30 Day History</h2>
        <div className="grid grid-cols-7 gap-1">
          {last30Days.map((date) => {
            const entry = habit.entries.find((e) => e.date === date);
            const isCompleted = entry?.completed ?? false;

            return (
              <button
                key={date}
                onClick={() => toggleCompletion(habit.id, date)}
                className={`aspect-square rounded-md transition-all hover:scale-110 ${
                  isCompleted
                    ? 'bg-green-500/40 hover:bg-green-500/60'
                    : 'bg-slate-700 hover:bg-slate-600'
                }`}
                title={formatDate(date)}
              />
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="rounded-lg border border-slate-600 bg-slate-800 p-4">
        <p className="text-sm text-slate-400">
          <span className="inline-block mr-4">
            <span className="mr-2 inline-block h-3 w-3 rounded-md bg-green-500/40"></span>
            Completed
          </span>
          <span className="inline-block">
            <span className="mr-2 inline-block h-3 w-3 rounded-md bg-slate-700"></span>
            Not Completed
          </span>
        </p>
      </div>
    </div>
  );
}
