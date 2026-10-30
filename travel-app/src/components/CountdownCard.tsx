import { View } from 'react-native';

import { AppText } from './AppText';
import { radius } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';

export function countdownText(days: number): string {
  if (days > 1) return `${days} days to go`;
  if (days === 1) return 'Tomorrow!';
  if (days === 0) return 'Today!';
  return 'Trip underway';
}

export function CountdownCard({ days, dates, compact }: { days: number; dates: string; compact?: boolean }) {
  const { colors } = useTheme();
  if (compact) {
    return (
      <View style={{ backgroundColor: colors.highlight, borderRadius: radius.lg, paddingVertical: 14, paddingHorizontal: 18, flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <AppText size={22} weight="bold" color={colors.onHighlight}>{countdownText(days)}</AppText>
        <AppText size={14} weight="medium" color={colors.onHighlight}>{dates}</AppText>
      </View>
    );
  }
  return (
    <View style={{ backgroundColor: colors.highlight, borderRadius: radius.xl, paddingVertical: 20, paddingHorizontal: 22, gap: 4 }}>
      <AppText size={34} weight="bold" color={colors.onHighlight} style={{ letterSpacing: -0.6 }}>{countdownText(days)}</AppText>
      <AppText size={15} weight="medium" color={colors.onHighlight}>{dates}</AppText>
    </View>
  );
}
