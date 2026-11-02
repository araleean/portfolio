import { Pressable, ScrollView, View, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '../components/AppText';
import { Avatar, AvatarStack } from '../components/Avatar';
import { TabBarSpacer } from '../components/AppTabBar';
import { Icon, type IconName } from '../components/Icon';
import { radius } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';
import type { Trip } from '../types';

interface Props {
  trip: Trip;
  me: string;
  tripCount: number;
  onScroll: (e: { nativeEvent: { contentOffset: { y: number } } }) => void;
  onSoon: (what: string) => void;
}

function Row({ icon, title, value, onPress }: { icon: IconName; title: string; value?: string; onPress: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={value ? `${title}, ${value}` : title} onPress={onPress} style={{ minHeight: 56, borderBottomWidth: 1, borderBottomColor: colors.line, flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 4 }}>
      <Icon name={icon} color={colors.ink} />
      <AppText size={16} weight="semibold" style={{ flex: 1 }}>{title}</AppText>
      {value ? <AppText size={15} color={colors.inkMuted}>{value}</AppText> : null}
      <Icon name="chevron" size={18} color={colors.inkMuted} />
    </Pressable>
  );
}

export function ProfileScreen({ trip, me, tripCount, onScroll, onSoon }: Props) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const scheme = useColorScheme();
  const meMember = trip.members.find((m) => m.id === me);
  const family = trip.members.filter((m) => m.id !== me);

  return (
    <ScrollView onScroll={onScroll} scrollEventThrottle={16} contentContainerStyle={{ paddingTop: insets.top + 12, paddingHorizontal: 20, gap: 20 }}>
      <AppText size={30} weight="bold" accessibilityRole="header">Profile</AppText>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
        <Avatar members={trip.members} id={me} size={64} />
        <View style={{ gap: 2 }}>
          <AppText size={22} weight="bold" heading>{meMember?.name ?? 'You'}</AppText>
          <AppText size={14} color={colors.inkMuted}>{`Planner for ${tripCount} trips`}</AppText>
        </View>
      </View>
      <View style={{ backgroundColor: colors.surface, borderRadius: radius.md, padding: 16, gap: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <AppText size={17} weight="bold">Your family</AppText>
          <Pressable accessibilityRole="button" onPress={() => onSoon('Managing family')} style={{ minHeight: 44, justifyContent: 'center', paddingLeft: 12 }}>
            <AppText size={14} weight="bold">Manage</AppText>
          </Pressable>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <AvatarStack members={family} size={34} />
          <AppText size={14} color={colors.inkMuted}>{family.map((m) => m.name).join(', ')}</AppText>
        </View>
        <AppText size={13} color={colors.inkMuted}>Saved people you can add to any trip in one tap.</AppText>
      </View>
      <View>
        <Row icon="bell" title="Notifications" value="On" onPress={() => onSoon('Notification settings')} />
        <Row icon="moon" title="Appearance" value={scheme === 'dark' ? 'Dark (from phone)' : 'Light (from phone)'} onPress={() => onSoon('Choosing light or dark')} />
        <Row icon="globe" title="Currency" value="USD" onPress={() => onSoon('Currency settings')} />
        <Row icon="bookmark" title="Saved ideas" onPress={() => onSoon('Saved ideas')} />
        <Row icon="help" title="Help and feedback" onPress={() => onSoon('Help')} />
      </View>
      <TabBarSpacer />
    </ScrollView>
  );
}
