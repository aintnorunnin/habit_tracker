import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useHabitStore } from '../store';
import { Habit, HabitStats } from '../types';

describe('Habit Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    const store = useHabitStore.getState();
    store.habits = [];
  });

  describe('addHabit', () => {
    it('should add a new habit', () => {
      const { result } = renderHook(() => useHabitStore());

      const newHabit: Habit = {
        id: '1',
        name: 'Test Habit',
        description: 'Test Description',
        frequency: 'daily',
        createdAt: '2026-04-19',
        entries: [],
      };

      act(() => {
        result.current.addHabit(newHabit);
      });

      expect(result.current.habits).toHaveLength(1);
      expect(result.current.habits[0]).toEqual(newHabit);
    });
  });

  describe('updateHabit', () => {
    it('should update an existing habit', () => {
      const { result } = renderHook(() => useHabitStore());

      const habit: Habit = {
        id: '1',
        name: 'Original',
        description: 'Original Desc',
        frequency: 'daily',
        createdAt: '2026-04-19',
        entries: [],
      };

      act(() => {
        result.current.addHabit(habit);
      });

      act(() => {
        result.current.updateHabit('1', { name: 'Updated' });
      });

      expect(result.current.habits[0].name).toBe('Updated');
    });
  });

  describe('deleteHabit', () => {
    it('should delete a habit', () => {
      const { result } = renderHook(() => useHabitStore());

      const habit: Habit = {
        id: '1',
        name: 'Test',
        description: 'Test',
        frequency: 'daily',
        createdAt: '2026-04-19',
        entries: [],
      };

      act(() => {
        result.current.addHabit(habit);
      });

      act(() => {
        result.current.deleteHabit('1');
      });

      expect(result.current.habits).toHaveLength(0);
    });
  });

  describe('toggleHabitCompletion', () => {
    it('should toggle habit completion for a date', () => {
      const { result } = renderHook(() => useHabitStore());

      const habit: Habit = {
        id: '1',
        name: 'Test',
        description: 'Test',
        frequency: 'daily',
        createdAt: '2026-04-19',
        entries: [{ date: '2026-04-19', completed: false }],
      };

      act(() => {
        result.current.addHabit(habit);
      });

      act(() => {
        result.current.toggleHabitCompletion('1', '2026-04-19');
      });

      expect(result.current.habits[0].entries[0].completed).toBe(true);
    });

    it('should add a new entry if it does not exist', () => {
      const { result } = renderHook(() => useHabitStore());

      const habit: Habit = {
        id: '1',
        name: 'Test',
        description: 'Test',
        frequency: 'daily',
        createdAt: '2026-04-19',
        entries: [],
      };

      act(() => {
        result.current.addHabit(habit);
      });

      act(() => {
        result.current.toggleHabitCompletion('1', '2026-04-19');
      });

      expect(result.current.habits[0].entries).toHaveLength(1);
      expect(result.current.habits[0].entries[0].completed).toBe(true);
    });
  });

  describe('getHabitStats', () => {
    it('should calculate stats correctly', () => {
      const { result } = renderHook(() => useHabitStore());

      const habit: Habit = {
        id: '1',
        name: 'Test',
        description: 'Test',
        frequency: 'daily',
        createdAt: '2026-04-19',
        entries: [
          { date: '2026-04-17', completed: true },
          { date: '2026-04-18', completed: true },
          { date: '2026-04-19', completed: true },
          { date: '2026-04-20', completed: false },
        ],
      };

      act(() => {
        result.current.addHabit(habit);
      });

      const stats = result.current.getHabitStats('1');

      expect(stats.totalCompleted).toBe(3);
      expect(stats.completionRate).toBe(75);
      expect(stats.longestStreak).toBe(3);
    });

    it('should return zero stats for non-existent habit', () => {
      const { result } = renderHook(() => useHabitStore());

      const stats = result.current.getHabitStats('non-existent');

      expect(stats.currentStreak).toBe(0);
      expect(stats.longestStreak).toBe(0);
      expect(stats.completionRate).toBe(0);
      expect(stats.totalCompleted).toBe(0);
    });
  });
});
