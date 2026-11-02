import { Figtree_500Medium, Figtree_600SemiBold, Figtree_700Bold } from '@expo-google-fonts/figtree';
import { Nunito_400Regular, Nunito_500Medium, Nunito_600SemiBold, Nunito_700Bold } from '@expo-google-fonts/nunito';

// The one place the typefaces are chosen: Figtree for titles, Nunito for everything you read.
export const FONT_FILES = {
  Figtree_500Medium,
  Figtree_600SemiBold,
  Figtree_700Bold,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
};

export type Weight = 'regular' | 'medium' | 'semibold' | 'bold';

// Custom fonts ignore fontWeight on Android, so each weight is its own family.
export const BODY_FAMILY: Record<Weight, string> = {
  regular: 'Nunito_400Regular',
  medium: 'Nunito_500Medium',
  semibold: 'Nunito_600SemiBold',
  bold: 'Nunito_700Bold',
};

export const HEADING_FAMILY: Record<Weight, string> = {
  regular: 'Figtree_500Medium',
  medium: 'Figtree_500Medium',
  semibold: 'Figtree_600SemiBold',
  bold: 'Figtree_700Bold',
};

// Kept for inputs, which always use the body face.
export const FONT_FAMILY = BODY_FAMILY;
