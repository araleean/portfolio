import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '../components/AppText';
import { AvatarStack } from '../components/Avatar';
import { TabBarSpacer } from '../components/AppTabBar';
import { Icon } from '../components/Icon';
import { IconButton } from '../components/IconButton';
import { SectionLabel } from '../components/SectionLabel';
import { POPULAR_PLACES } from '../data/exploreIdeas';
import { OTHER_TRIPS } from '../data/sampleTrip';
import { bookingTimeline } from '../lib/bookings';
import { countdownText } from '../lib/countdown';
import { daysUntil, formatDay, tripLength } from '../lib/dates';
import { countPlans } from '../lib/draftItinerary';
import { radius } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';
import type { Trip } from '../types';

interface Props {
  trip: Trip;
  today: string;
  onScroll: (e: { nativeEvent: { contentOffset: { y: number } } }) => void;
  onOpenTrip: () => void;
  onOpenTrips: () => void;
  onOpenExplore: () => void;
  onNewTrip: () => void;
  onNotify: () => void;
}

function SectionHeading({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <AppText size={19} weight="bold" accessibilityRole="header">{title}</AppText>
      {action ? (
        <Pressable accessibilityRole="button" onPress={onAction} style={{ minHeight: 44, justifyContent: 'center', paddingLeft: 12 }}>
          <AppText size={14} weight="bold">{action}</AppText>
        </Pressable>
      ) : null}
    </View>
  );
}

// Home covers every trip: the next one first, the others below, then what's coming up and ideas for a new one.
export function HomeScreen({ trip, today, onScroll, onOpenTrip, onOpenTrips, onOpenExplore, onNewTrip, onNotify }: Props) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const planned = trip.days.length > 0;
  const days = tripLength(trip.startDate, trip.endDate);
  const comingUp = bookingTimeline(trip).slice(0, 2);

  return (
    <ScrollView onScroll={onScroll} scrollEventThrottle={16} contentContainerStyle={{ paddingTop: insets.top + 12 }}>
      <View style={{ paddingLeft: 20, paddingRight: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <AppText size={26} weight="bold" accessibilityRole="header" style={{ flex: 1 }}>Outbound</AppText>
        <Pressable accessibilityRole="button" onPress={onNewTrip} style={{ height: 44, paddingLeft: 12, paddingRight: 16, borderRadius: 22, backgroundColor: colors.primary, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Icon name="plus" size={18} color={colors.onPrimary} strokeWidth={2.4} />
          <AppText size={15} weight="semibold" heading color={colors.onPrimary}>New trip</AppText>
        </Pressable>
        <IconButton icon="bell" label="Notifications, 2 new" dot onPress={onNotify} />
      </View>

      <View style={{ padding: 16, gap: 22 }}>
        <View style={{ gap: 12 }}>
          <SectionHeading title="Your trips" action="All trips" onAction={onOpenTrips} />

          <Pressable accessibilityRole="button" accessibilityLabel={`Open ${trip.destination} trip`} onPress={onOpenTrip} style={{ backgroundColor: colors.highlight, borderRadius: radius.xl, padding: 20, paddingTop: 18, gap: 14 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <SectionLabel>Next trip</SectionLabel>
              <AvatarStack members={trip.members} size={28} />
            </View>
            <View style={{ gap: 2 }}>
              <AppText size={32} weight="bold" color={colors.onHighlight}>{trip.destination}</AppText>
              <AppText size={15} weight="medium" color={colors.onHighlight}>{`${formatDay(trip.startDate)} – ${formatDay(trip.endDate)} · ${days} days`}</AppText>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              <View style={{ height: 34, paddingHorizontal: 14, borderRadius: 17, backgroundColor: '#FFFFFF', justifyContent: 'center' }}>
                <AppText size={15} weight="bold" heading color="#1B1B1F">{countdownText(daysUntil(today, trip.startDate))}</AppText>
              </View>
              <View style={{ height: 34, paddingHorizontal: 14, borderRadius: 17, backgroundColor: 'rgba(255,255,255,0.55)', justifyContent: 'center' }}>
                <AppText size={14} weight="semibold" color="#1B1B1F">{`${planned ? `${countPlans(trip.days)} plans` : 'No plans yet'} · ${trip.flights.length} flights · ${trip.stays.length} stay`}</AppText>
              </View>
            </View>
          </Pressable>

          {OTHER_TRIPS.map((t) => (
            <Pressable key={t.id} accessibilityRole="button" onPress={onOpenTrips} style={{ backgroundColor: colors.surface, borderRadius: 22, paddingVertical: 14, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={{ flex: 1, gap: 2 }}>
                <AppText size={17} weight="bold">{t.name}</AppText>
                <AppText size={13} color={colors.inkMuted}>{`${t.dates} · ${t.status}`}</AppText>
              </View>
              <Icon name="chevron" size={20} color={colors.inkMuted} />
            </Pressable>
          ))}

          <Pressable accessibilityRole="button" onPress={onNewTrip} style={{ minHeight: 60, borderRadius: 22, borderWidth: 1.5, borderStyle: 'dashed', borderColor: colors.lineStrong, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <Icon name="plus" size={18} color={colors.ink} strokeWidth={2.4} />
            <AppText size={16} weight="bold" heading>Plan a new trip</AppText>
          </Pressable>
        </View>

        <View style={{ gap: 12 }}>
          <SectionHeading title="Coming up" />
          <View style={{ backgroundColor: colors.surface, borderRadius: 22, padding: 16, gap: 14 }}>
            {comingUp.map((b) => (
              <View key={b.id} style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
                <View style={{ width: 12, height: 12, borderRadius: 6, marginTop: 5, backgroundColor: b.kind === 'flight' ? colors.tileFlights : colors.tileStays, borderWidth: 1.5, borderColor: colors.line }} />
                <View style={{ flex: 1, gap: 1 }}>
                  <AppText size={13} weight="bold" color={colors.inkMuted}>{`${trip.destination} · ${formatDay(b.date)}`}</AppText>
                  <AppText size={15} weight="semibold" lineHeight={21}>{b.title}</AppText>
                  <AppText size={13} color={colors.inkMuted}>{b.label}</AppText>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={{ gap: 12 }}>
          <SectionHeading title="Ideas for your next trip" action="Explore" onAction={onOpenExplore} />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            {POPULAR_PLACES.map((p) => (
              <Pressable key={p.name} accessibilityRole="button" onPress={onOpenExplore} style={{ flex: 1, minHeight: 84, borderRadius: radius.md, backgroundColor: colors[p.tint], padding: 14, justifyContent: 'flex-end', gap: 2 }}>
                <AppText size={17} weight="bold">{p.name}</AppText>
                <AppText size={13} color={colors.inkMuted}>{p.detail}</AppText>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
      <TabBarSpacer />
    </ScrollView>
  );
}
