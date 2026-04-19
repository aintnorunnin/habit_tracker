# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: habit.spec.ts >> habit dashboard shows default habits and allows create/edit/delete flow
- Location: tests/habit.spec.ts:3:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByLabel('Habit Name')

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - banner [ref=e3]:
    - generic [ref=e6]:
      - img [ref=e8]
      - generic [ref=e10]:
        - heading "Habit Tracker" [level=1] [ref=e11]
        - paragraph [ref=e12]: Build your best self
  - main [ref=e13]:
    - generic [ref=e14]:
      - generic [ref=e15]:
        - generic [ref=e16]:
          - heading "Your Habits" [level=2] [ref=e17]
          - paragraph [ref=e18]: 5 habits tracked
        - button "New Habit" [active] [ref=e19]:
          - img [ref=e20]
          - text: New Habit
      - generic [ref=e22]:
        - link "Morning Meditation Start the day with a 10-minute meditation session daily Streak 2 days Best 4 days Rate 63% complete ✓ Completed Today" [ref=e23] [cursor=pointer]:
          - /url: /habit/1
          - generic [ref=e24]:
            - generic [ref=e25]:
              - generic [ref=e26]:
                - heading "Morning Meditation" [level=3] [ref=e27]
                - paragraph [ref=e28]: Start the day with a 10-minute meditation session
              - generic [ref=e29]: daily
            - generic [ref=e30]:
              - generic [ref=e31]:
                - paragraph [ref=e32]: Streak
                - paragraph [ref=e33]: "2"
                - paragraph [ref=e34]: days
              - generic [ref=e35]:
                - paragraph [ref=e36]: Best
                - paragraph [ref=e37]: "4"
                - paragraph [ref=e38]: days
              - generic [ref=e39]:
                - paragraph [ref=e40]: Rate
                - paragraph [ref=e41]: 63%
                - paragraph [ref=e42]: complete
            - button "✓ Completed Today" [ref=e43]
        - link "Exercise Workout or physical activity for 30 minutes daily Streak 2 days Best 2 days Rate 47% complete ✓ Completed Today" [ref=e44] [cursor=pointer]:
          - /url: /habit/2
          - generic [ref=e45]:
            - generic [ref=e46]:
              - generic [ref=e47]:
                - heading "Exercise" [level=3] [ref=e48]
                - paragraph [ref=e49]: Workout or physical activity for 30 minutes
              - generic [ref=e50]: daily
            - generic [ref=e51]:
              - generic [ref=e52]:
                - paragraph [ref=e53]: Streak
                - paragraph [ref=e54]: "2"
                - paragraph [ref=e55]: days
              - generic [ref=e56]:
                - paragraph [ref=e57]: Best
                - paragraph [ref=e58]: "2"
                - paragraph [ref=e59]: days
              - generic [ref=e60]:
                - paragraph [ref=e61]: Rate
                - paragraph [ref=e62]: 47%
                - paragraph [ref=e63]: complete
            - button "✓ Completed Today" [ref=e64]
        - link "Read Read for at least 20 minutes daily Streak 3 days Best 8 days Rate 70% complete ✓ Completed Today" [ref=e65] [cursor=pointer]:
          - /url: /habit/3
          - generic [ref=e66]:
            - generic [ref=e67]:
              - generic [ref=e68]:
                - heading "Read" [level=3] [ref=e69]
                - paragraph [ref=e70]: Read for at least 20 minutes
              - generic [ref=e71]: daily
            - generic [ref=e72]:
              - generic [ref=e73]:
                - paragraph [ref=e74]: Streak
                - paragraph [ref=e75]: "3"
                - paragraph [ref=e76]: days
              - generic [ref=e77]:
                - paragraph [ref=e78]: Best
                - paragraph [ref=e79]: "8"
                - paragraph [ref=e80]: days
              - generic [ref=e81]:
                - paragraph [ref=e82]: Rate
                - paragraph [ref=e83]: 70%
                - paragraph [ref=e84]: complete
            - button "✓ Completed Today" [ref=e85]
        - link "Code Review Review code from team members weekly Streak 0 days Best 1 days Rate 10% complete Mark Complete" [ref=e86] [cursor=pointer]:
          - /url: /habit/4
          - generic [ref=e87]:
            - generic [ref=e88]:
              - generic [ref=e89]:
                - heading "Code Review" [level=3] [ref=e90]
                - paragraph [ref=e91]: Review code from team members
              - generic [ref=e92]: weekly
            - generic [ref=e93]:
              - generic [ref=e94]:
                - paragraph [ref=e95]: Streak
                - paragraph [ref=e96]: "0"
                - paragraph [ref=e97]: days
              - generic [ref=e98]:
                - paragraph [ref=e99]: Best
                - paragraph [ref=e100]: "1"
                - paragraph [ref=e101]: days
              - generic [ref=e102]:
                - paragraph [ref=e103]: Rate
                - paragraph [ref=e104]: 10%
                - paragraph [ref=e105]: complete
            - button "Mark Complete" [ref=e106]
        - link "Journaling Reflect on the day in a journal daily Streak 0 days Best 5 days Rate 50% complete Mark Complete" [ref=e107] [cursor=pointer]:
          - /url: /habit/5
          - generic [ref=e108]:
            - generic [ref=e109]:
              - generic [ref=e110]:
                - heading "Journaling" [level=3] [ref=e111]
                - paragraph [ref=e112]: Reflect on the day in a journal
              - generic [ref=e113]: daily
            - generic [ref=e114]:
              - generic [ref=e115]:
                - paragraph [ref=e116]: Streak
                - paragraph [ref=e117]: "0"
                - paragraph [ref=e118]: days
              - generic [ref=e119]:
                - paragraph [ref=e120]: Best
                - paragraph [ref=e121]: "5"
                - paragraph [ref=e122]: days
              - generic [ref=e123]:
                - paragraph [ref=e124]: Rate
                - paragraph [ref=e125]: 50%
                - paragraph [ref=e126]: complete
            - button "Mark Complete" [ref=e127]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('habit dashboard shows default habits and allows create/edit/delete flow', async ({ page }) => {
  4  |   await page.goto('/');
  5  | 
  6  |   await expect(page.getByRole('heading', { name: 'Your Habits' })).toBeVisible();
  7  |   await expect(page.getByText('Morning Meditation')).toBeVisible();
  8  | 
  9  |   await page.getByRole('button', { name: 'New Habit' }).click();
> 10 |   await page.getByLabel('Habit Name').fill('Stretch');
     |                                       ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  11 |   await page.getByLabel('Description (optional)').fill('Do a 5-minute stretch session');
  12 |   await page.getByRole('button', { name: 'Create' }).click();
  13 | 
  14 |   await expect(page.getByText('Stretch')).toBeVisible();
  15 | 
  16 |   await page.getByText('Stretch').click();
  17 |   await expect(page.getByRole('heading', { name: 'Stretch' })).toBeVisible();
  18 | 
  19 |   await page.getByRole('button', { name: 'Edit' }).click();
  20 |   await page.getByLabel('Habit Name').fill('Stretch Daily');
  21 |   await page.getByRole('button', { name: 'Save' }).click();
  22 | 
  23 |   await expect(page.getByRole('heading', { name: 'Stretch Daily' })).toBeVisible();
  24 | 
  25 |   await page.getByRole('button', { name: 'Delete' }).click();
  26 |   await page.getByText('Back to habits').click();
  27 | 
  28 |   await expect(page.getByText('Stretch Daily')).not.toBeVisible();
  29 | });
  30 | 
```