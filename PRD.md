# HABIT TRACKER

# Business Goals
- [ ] An MVP of a Habit Tracker application as a web app 
- [ ] Allow users to personalize what they want to track.
- [ ] Track user progress over time.
- [ ] Encourage motivation through visual progress.

## Functionality

- Users can create a habit. 
- Users can edit an existing habit.
- Users can delete a habit.
- Users can set habit frequency (daily, weekly, etc.).
- Users can add a description or notes.
- Users can mark a habit as completed.
- Users can view a list of their habits.
- Users can see completion history.
- Users can view streaks (consecutive days completed).
- Users can see statistics or charts.
- No more functionality: no archive, no search/filter. Keep it simple.
- The priority is a slick, professional, gorgeous UI/UX with very simple features
- The app should open with dummy data populated for the single board

## Technical Details

- Implemented as a modern NextJS app, client rendered
- The NextJS app should be created in a subdirectory `frontend`
- No persistence
- No user management for the MVP
- Use popular libraries
- As simple as possible but with an elegant UI

## Strategy

1. Write plan with success criteria for each phase to be checked off. Include project scaffolding, including .gitignore, and rigorous unit testing.
2. Execute the plan ensuring all critiera are met
3. Carry out extensive integration testing with Playwright or similar, fixing defects
4. Only complete when the MVP is finished and tested, with the server running and ready for the user

## Coding standards

1. Use latest versions of libraries and idiomatic approaches as of today
2. Keep it simple - NEVER over-engineer, ALWAYS simplify, NO unnecessary defensive programming. No extra features - focus on simplicity.
3. Be concise. Keep README minimal. IMPORTANT: no emojis ever
4. Build iteratively and refactor. 
5. Organize code in logical functional parts. No long bloated functions. 
