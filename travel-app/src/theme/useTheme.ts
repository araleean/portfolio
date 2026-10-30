import { useColorScheme } from 'react-native';

import { darkColors, lightColors, type Colors } from './tokens';

// Follows the phone's light/dark setting.
export function useTheme(): { colors: Colors; dark: boolean } {
  const dark = useColorScheme() === 'dark';
  return { colors: dark ? darkColors : lightColors, dark };
}
