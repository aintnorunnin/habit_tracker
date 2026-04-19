# Habit Tracker

This repository contains a small Habit Tracker MVP built as a client-rendered Next.js application in the `frontend/` directory.

## Project structure

- `frontend/` — Next.js app with TypeScript, Tailwind CSS, ESLint, Prettier, and Zustand state management.
- `frontend/lib/` — shared types, store, and utility helpers.
- `frontend/components/` — UI components for dashboard, habits, and detail views.

## Features

- Create, edit, and delete habits
- Track habit completion with daily history
- View current streak, longest streak, and completion rate
- Responsive, polished dashboard UI
- No persistence: data is stored in-memory and resets on refresh

## Setup

```bash
cd frontend
npm install
```

## Run locally

```bash
cd frontend
npm run dev
```

Open `http://localhost:3000` in the browser.

## Build

```bash
cd frontend
npm run build
```

## Tests

```bash
cd frontend
npx vitest run
```

## Notes

- The app is intentionally simple for MVP use.
- The current implementation uses dummy data populated on load.
- No backend or persistence is included.
