import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from './AppText';
import { AvatarStack } from './Avatar';
import { useTheme } from '../theme/useTheme';
import type { Member } from '../types';

export function TripHeader({ title, subtitle, members }: { title: string; subtitle: string; members: Member[] }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top + 12, paddingHorizontal: 16, paddingBottom: 12, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <View style={{ flex: 1, gap: 2 }}>
        <AppText size={28} weight="bold" accessibilityRole="header" style={{ letterSpacing: -0.4 }}>{title}</AppText>
        <AppText size={14} color={colors.inkMuted}>{subtitle}</AppText>
      </View>
      <AvatarStack members={members} />
    </View>
  );
}
