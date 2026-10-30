import { Pressable } from 'react-native';

import { AppText } from './AppText';
import { CreditLine } from './CreditLine';
import { radius } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';
import type { Activity, Member } from '../types';

export function ActivityCard({ activity, members, me, onPress }: { activity: Activity; members: Member[]; me: string; onPress: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Edit ${activity.title}`}
      onPress={onPress}
      style={({ pressed }) => ({ backgroundColor: colors.surface, borderRadius: radius.md, paddingVertical: 14, paddingHorizontal: 16, gap: 6, opacity: pressed ? 0.85 : 1 })}
    >
      <AppText size={16} weight="semibold" lineHeight={22}>{activity.title}</AppText>
      {activity.notes ? <AppText size={14} lineHeight={20} color={colors.inkMuted}>{activity.notes}</AppText> : null}
      <CreditLine members={members} activity={activity} me={me} />
    </Pressable>
  );
}
