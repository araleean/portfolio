# Travel App

Small practice app: generate and edit a day-by-day itinerary from
destination, number of days, and trip type.

## Stack
- Vite, React, TypeScript, plain CSS
- State in React; persistence in localStorage
- Vitest for tests

## Conventions
- Small components, one per file, in src/components
- Data types live in src/types.ts
- Itinerary generation logic lives in src/lib/ and is pure (easy to test)
- Mobile-first layout; large tap targets
- Commit after each working step with a clear message

## Commands
- npm run dev
- npm test
