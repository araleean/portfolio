# flock

The app is named **flock**, always written in lower case. Small practice app: generate and edit a day-by-day itinerary from
destination, number of days, and trip type. Runs in Expo Go on a phone
and in the browser.

## Stack
- Expo SDK 58 (React Native) + TypeScript
- Styling with React Native `StyleSheet`, colocated with each component
- State in React; persistence with AsyncStorage (Phase 3)
- Jest (`jest-expo` preset) for tests
- No Expo Router yet: App.tsx switches screens with state

## Conventions
- Small components, one per file, in src/components
- Data types live in src/types.ts
- Itinerary generation logic lives in src/lib/ and is pure (easy to test)
- Mobile-first layout; large tap targets (min 44pt)
- Commit after each working step with a clear message

## Expo notes
- Expo ships breaking changes each SDK; check the docs for the installed
  version (https://docs.expo.dev/versions/v58.0.0/) instead of memory
- Add packages with `npx expo install <pkg>` so versions match the SDK
- Expo Go only includes its bundled native modules; avoid libraries that
  need a development build

## Commands
- npx expo start   (scan the QR code with Expo Go; press w for web)
- npm test
- npm run typecheck
