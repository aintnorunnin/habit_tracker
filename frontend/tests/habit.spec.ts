import { test, expect } from '@playwright/test';

test('habit dashboard shows default habits and allows create/edit/delete flow', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Your Habits' })).toBeVisible();
  await expect(page.getByText('Morning Meditation')).toBeVisible();

  await page.getByRole('button', { name: 'New Habit' }).click();
  await page.getByLabel('Habit Name').fill('Stretch');
  await page.getByLabel('Description (optional)').fill('Do a 5-minute stretch session');
  await page.getByRole('button', { name: 'Create' }).click();

  await expect(page.getByText('Stretch')).toBeVisible();

  await page.getByText('Stretch').click();
  await expect(page.getByRole('heading', { name: 'Stretch' })).toBeVisible();

  await page.getByRole('button', { name: 'Edit' }).click();
  await page.getByLabel('Habit Name').fill('Stretch Daily');
  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.getByRole('heading', { name: 'Stretch Daily' })).toBeVisible();

  await page.getByRole('button', { name: 'Delete' }).click();
  await page.getByText('Back to habits').click();

  await expect(page.getByText('Stretch Daily')).not.toBeVisible();
});
