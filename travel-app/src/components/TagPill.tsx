import { View } from 'react-native';

import { AppText } from './AppText';
import { useTheme } from '../theme/useTheme';
import type { ActivityTag } from '../types';

const LABELS: Record<ActivityTag, string> = { flight: 'Flight', stay: 'Stay', idea: 'Idea', 'must-do': 'Must-do' };

export function TagPill({ tag }: { tag: ActivityTag }) {
  const { colors } = useTheme();
  const bg = { flight: colors.tileFlights, stay: colors.tileStays, idea: colors.soft, 'must-do': colors.highlight }[tag];
  const fg = tag === 'must-do' ? colors.onHighlight : tag === 'idea' ? colors.onSoft : colors.ink;
  return (
    <View style={{ height: 22, paddingHorizontal: 8, borderRadius: 11, backgroundColor: bg, justifyContent: 'center' }}>
      <AppText size={12} weight="semibold" color={fg}>{LABELS[tag]}</AppText>
    </View>
  );
}
