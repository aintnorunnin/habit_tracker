# Habit Tracker

A small Habit Tracker MVP built with Next.js, TypeScript, Tailwind CSS, and Zustand.

## Overview

This app supports:

- creating, editing, and deleting habits
- marking habits as completed
- viewing completion history and streaks
- a polished, client-side dashboard UI

The app currently uses in-memory state only, so habit data resets on reload.

## Getting started

```bash
cd frontend
npm install
npm run dev
```

Then open `http://localhost:3000`.

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

- The application is intentionally simple for an MVP.
- No backend or persistence is included.
- The working app is located in `frontend/`.
