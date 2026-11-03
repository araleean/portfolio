import { Pressable, View } from 'react-native';

import { AppText } from '../../components/AppText';
import { Avatar } from '../../components/Avatar';
import { Icon } from '../../components/Icon';
import { contributions } from '../../lib/bookings';
import { displayName, timeAgo } from '../../lib/people';
import { radius } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import type { Trip } from '../../types';

export function FamilySection({ trip, me, now, onInvite }: { trip: Trip; me: string; now: number; onInvite: () => void }) {
  const { colors } = useTheme();
  const counts = contributions(trip);
  return (
    <View style={{ paddingHorizontal: 16, gap: 14 }}>
      <Pressable accessibilityRole="button" onPress={onInvite} style={{ borderWidth: 1, borderColor: colors.ink, borderRadius: 22, paddingVertical: 14, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View style={{ width: 40, height: 40, borderRadius: 14, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="invite" color={colors.ink} />
        </View>
        <View style={{ flex: 1 }}>
          <AppText size={17} weight="bold" color={colors.ink}>Invite family</AppText>
          <AppText size={13} color={colors.ink}>Everyone you invite can view and edit</AppText>
        </View>
        <Icon name="chevron" size={20} color={colors.ink} />
      </Pressable>
      <View>
        {trip.members.map((m) => {
          const n = counts[m.id] ?? 0;
          const role = m.id === me ? 'Planner' : 'Can edit';
          return (
            <View key={m.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10 }}>
              <Avatar members={trip.members} id={m.id} size={40} />
              <View style={{ flex: 1 }}>
                <AppText size={16} weight="bold" heading={false}>{m.id === me ? `${m.name} (you)` : m.name}</AppText>
                <AppText size={13} color={colors.inkMuted}>{`${role} · added ${n} ${n === 1 ? 'thing' : 'things'}`}</AppText>
              </View>
            </View>
          );
        })}
      </View>
      <View style={{ gap: 10 }}>
        <AppText size={17} weight="bold">Recent changes</AppText>
        {trip.feed.slice(0, 6).map((f) => (
          <View key={f.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Avatar members={trip.members} id={f.who} size={28} />
            <AppText size={14} lineHeight={20} style={{ flex: 1 }}>
              <AppText size={14} weight="bold">{displayName(trip.members, f.who, me)}</AppText>
              {` ${f.text} `}
              <AppText size={14} color={colors.inkMuted}>{`· ${timeAgo(f.at, now)}`}</AppText>
            </AppText>
          </View>
        ))}
      </View>
    </View>
  );
}
