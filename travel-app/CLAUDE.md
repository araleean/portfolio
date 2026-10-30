# flock

The app is named **flock**, always written in lower case. A shared trip planner
for families: one place for flights, stays, the itinerary and spending, where
everyone can edit and every change shows who made it. Runs in Expo Go on a
phone and in the browser.

## Stack
- Expo SDK 58 (React Native) + TypeScript
- Styling with inline React Native styles from the theme (src/theme)
- Font: Figtree via @expo-google-fonts; chosen in one place, src/theme/fonts.ts
- Icons drawn with react-native-svg (src/components/Icon.tsx)
- State in React, starting from sample data (src/data/sampleTrip.ts); no
  saving or sharing backend yet
- Jest (`jest-expo` preset) for tests
- No Expo Router yet: App.tsx switches screens with state

## Design
- Style B ("Sunny") from the flock design system: sunflower highlight,
  sky / mint / peach tiles for flights / stays / spending, floating tab bar
- Colour tokens in src/theme/tokens.ts, light and dark; the app follows the
  phone's setting
- Every plan shows who added it ("Added by Mom", "Sample suggestion")

## Conventions
- Small components, one per file, in src/components; screens in src/screens
- Data types live in src/types.ts
- Logic lives in src/lib/ and is pure (easy to test): dates, draftItinerary,
  tripActions, people
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
