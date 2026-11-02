import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '../components/AppText';
import { Avatar, AvatarStack } from '../components/Avatar';
import { TabBarSpacer } from '../components/AppTabBar';
import { Icon } from '../components/Icon';
import { IconButton } from '../components/IconButton';
import { EmptyItineraryCard } from '../components/ItineraryCard';
import { SectionLabel } from '../components/SectionLabel';
import { EXPLORE_IDEAS, type ExploreIdea } from '../data/exploreIdeas';
import { OTHER_TRIPS } from '../data/sampleTrip';
import { bookingTimeline } from '../lib/bookings';
import { countdownText } from '../lib/countdown';
import { daysUntil, formatDay, tripLength } from '../lib/dates';
import { countPlans } from '../lib/draftItinerary';
import { displayName, timeAgo } from '../lib/people';
import { SLOT_LABELS, SLOTS } from '../lib/tripOptions';
import { radius } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';
import type { Trip } from '../types';

interface Props {
  trip: Trip;
  me: string;
  today: string;
  now: number;
  onScroll: (e: { nativeEvent: { contentOffset: { y: number } } }) => void;
  onOpenTrip: () => void;
  onPlan: () => void;
  onOpenIdea: (idea: ExploreIdea) => void;
  onOpenTrips: () => void;
  onOpenExplore: () => void;
  onNotify: () => void;
}

function greeting(now: number): string {
  const h = new Date(now).getHours();
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
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

export function HomeScreen({ trip, me, today, now, onScroll, onOpenTrip, onPlan, onOpenIdea, onOpenTrips, onOpenExplore, onNotify }: Props) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const planned = trip.days.length > 0;
  const days = tripLength(trip.startDate, trip.endDate);
  const meName = trip.members.find((m) => m.id === me)?.name ?? '';

  // First day: the itinerary once there is one, otherwise the bookings on day one.
  const firstUp = planned
    ? SLOTS.flatMap((s) => trip.days[0].slots[s].map((a) => ({ key: a.id, time: SLOT_LABELS[s], title: a.title, sub: a.tag === 'idea' ? 'Sample suggestion' : undefined, tint: a.tag === 'flight' ? colors.tileFlights : a.tag === 'stay' ? colors.tileStays : colors.soft })))
    : bookingTimeline(trip).filter((b) => b.date === trip.startDate).map((b) => ({ key: b.id, time: b.label.split(' · ')[1] ?? '', title: b.title, sub: b.detail, tint: b.kind === 'flight' ? colors.tileFlights : colors.tileStays }));

  return (
    <ScrollView onScroll={onScroll} scrollEventThrottle={16} contentContainerStyle={{ paddingTop: insets.top + 12 }}>
      <View style={{ paddingLeft: 20, paddingRight: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ gap: 2 }}>
          <AppText size={26} weight="bold" accessibilityRole="header">Outbound</AppText>
          <AppText size={14} color={colors.inkMuted}>{`${greeting(now)}, ${meName}`}</AppText>
        </View>
        <IconButton icon="bell" label="Notifications, 2 new" dot onPress={onNotify} />
      </View>

      <View style={{ padding: 16, gap: 22 }}>
        <Pressable accessibilityRole="button" accessibilityLabel={`Open ${trip.destination} trip`} onPress={onOpenTrip} style={{ backgroundColor: colors.highlight, borderRadius: radius.xl, padding: 20, paddingTop: 18, gap: 14 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <SectionLabel>Next trip</SectionLabel>
            <AvatarStack members={trip.members} size={28} />
          </View>
          <View style={{ gap: 2 }}>
            <AppText size={36} weight="bold" color={colors.onHighlight}>{trip.destination}</AppText>
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

        {!planned ? <EmptyItineraryCard destination={trip.destination} onPlan={onPlan} /> : null}

        <View style={{ gap: 12 }}>
          <SectionHeading title="First up" action="See all" onAction={onOpenTrip} />
          <View style={{ backgroundColor: colors.surface, borderRadius: 22, padding: 16, gap: 14 }}>
            <SectionLabel>{formatDay(trip.startDate)}</SectionLabel>
            {firstUp.map((item) => (
              <View key={item.key} style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
                <View style={{ width: 12, height: 12, borderRadius: 6, marginTop: 5, backgroundColor: item.tint, borderWidth: 1.5, borderColor: colors.line }} />
                <View style={{ flex: 1, gap: 1 }}>
                  <AppText size={13} weight="bold" color={colors.inkMuted}>{item.time}</AppText>
                  <AppText size={15} weight="semibold" lineHeight={21}>{item.title}</AppText>
                  {item.sub ? <AppText size={13} color={colors.inkMuted}>{item.sub}</AppText> : null}
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={{ gap: 10 }}>
          <SectionHeading title="From the family" />
          {trip.feed.slice(0, 3).map((f) => (
            <View key={f.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Avatar members={trip.members} id={f.who} size={30} />
              <AppText size={15} lineHeight={21} style={{ flex: 1 }}>
                <AppText size={15} weight="bold">{displayName(trip.members, f.who, me)}</AppText>
                {` ${f.text} `}
                <AppText size={15} color={colors.inkMuted}>{`· ${timeAgo(f.at, now)}`}</AppText>
              </AppText>
            </View>
          ))}
        </View>

        <View style={{ gap: 12 }}>
          <SectionHeading title={`Ideas for ${trip.destination}`} action="Explore" onAction={onOpenExplore} />
          <View style={{ flexDirection: 'row', gap: 12 }}>
            {EXPLORE_IDEAS.map((idea) => (
              <Pressable key={idea.id} accessibilityRole="button" onPress={() => onOpenIdea(idea)} style={{ flex: 1, minHeight: 110, borderRadius: 22, padding: 14, backgroundColor: colors[idea.tint], justifyContent: 'space-between', gap: 10 }}>
                <Icon name="spark" size={24} color={colors.ink} />
                <View>
                  <AppText size={16} weight="bold" heading>{idea.title}</AppText>
                  <AppText size={13} color={colors.inkMuted}>{`${idea.planCount} plans`}</AppText>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={{ gap: 12 }}>
          <SectionHeading title="Other trips" action="All trips" onAction={onOpenTrips} />
          {OTHER_TRIPS.map((t) => (
            <Pressable key={t.id} accessibilityRole="button" onPress={onOpenTrips} style={{ backgroundColor: colors.surface, borderRadius: 22, paddingVertical: 14, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flex: 1 }}>
                <AppText size={17} weight="bold">{t.name}</AppText>
                <AppText size={13} color={colors.inkMuted}>{t.dates}</AppText>
              </View>
              <Icon name="chevron" size={20} color={colors.inkMuted} />
            </Pressable>
          ))}
        </View>
      </View>
      <TabBarSpacer />
    </ScrollView>
  );
}
