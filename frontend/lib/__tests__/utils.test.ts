import { describe, it, expect } from 'vitest';
import { formatDate, todayString, getLastNDays } from '../utils';

describe('Utils', () => {
  describe('formatDate', () => {
    it('should format date string correctly', () => {
      const formatted = formatDate('2026-04-19');
      expect(formatted).toMatch(/Sun|Mon|Tue|Wed|Thu|Fri|Sat/);
      expect(formatted).toMatch(/Apr/);
      expect(formatted).toMatch(/19/);
    });
  });

  describe('todayString', () => {
    it('should return today as ISO date string', () => {
      const today = todayString();
      expect(today).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe('getLastNDays', () => {
    it('should return last N days', () => {
      const days = getLastNDays(7);
      expect(days).toHaveLength(7);
      expect(days[0]).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('should return dates in ascending order', () => {
      const days = getLastNDays(3);
      const date1 = new Date(days[0]);
      const date2 = new Date(days[1]);
      const date3 = new Date(days[2]);
      expect(date1.getTime()).toBeLessThan(date2.getTime());
      expect(date2.getTime()).toBeLessThan(date3.getTime());
    });
  });
});
