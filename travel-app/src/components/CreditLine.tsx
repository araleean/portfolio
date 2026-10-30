import { View } from 'react-native';

import { AppText } from './AppText';
import { Avatar } from './Avatar';
import { creditLine } from '../lib/people';
import { useTheme } from '../theme/useTheme';
import type { Activity, Member } from '../types';

export function CreditLine({ members, activity, me }: { members: Member[]; activity: Activity; me: string }) {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      <Avatar members={members} id={activity.addedBy} size={20} />
      <AppText size={13} color={colors.inkMuted}>{creditLine(members, activity, me)}</AppText>
    </View>
  );
}
