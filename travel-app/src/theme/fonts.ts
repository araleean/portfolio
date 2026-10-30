import {
  Figtree_400Regular,
  Figtree_500Medium,
  Figtree_600SemiBold,
  Figtree_700Bold,
} from '@expo-google-fonts/figtree';

// The one place the typeface is chosen. To try Nunito: install @expo-google-fonts/nunito
// and swap the imports and names below.
export const FONT_FILES = {
  Figtree_400Regular,
  Figtree_500Medium,
  Figtree_600SemiBold,
  Figtree_700Bold,
};

export type Weight = 'regular' | 'medium' | 'semibold' | 'bold';

// Custom fonts ignore fontWeight on Android, so each weight is its own family.
export const FONT_FAMILY: Record<Weight, string> = {
  regular: 'Figtree_400Regular',
  medium: 'Figtree_500Medium',
  semibold: 'Figtree_600SemiBold',
  bold: 'Figtree_700Bold',
};
