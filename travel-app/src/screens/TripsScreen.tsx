import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '../components/AppText';
import { AvatarStack } from '../components/Avatar';
import { TabBarSpacer } from '../components/AppTabBar';
import { Button } from '../components/Button';
import { Segmented } from '../components/Segmented';
import { OTHER_TRIPS } from '../data/sampleTrip';
import { countdownText } from '../lib/countdown';
import { daysUntil, formatRange, tripLength } from '../lib/dates';
import { countPlans } from '../lib/draftItinerary';
import { radius } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';
import type { Member, Trip } from '../types';

interface Props {
  trip: Trip;
  today: string;
  onScroll: (e: { nativeEvent: { contentOffset: { y: number } } }) => void;
  onOpenTrip: () => void;
  onSoon: (what: string) => void;
}

function TripCard({ name, dates, chip, chipBg, detail, members, onPress }: { name: string; dates: string; chip: string; chipBg: string; detail: string; members: Member[]; onPress: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`${name}, ${dates}, ${chip}`} onPress={onPress} style={{ backgroundColor: colors.surface, borderRadius: radius.lg, paddingVertical: 16, paddingHorizontal: 18, gap: 12 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
        <View style={{ flex: 1, gap: 2 }}>
          <AppText size={20} weight="bold">{name}</AppText>
          <AppText size={14} color={colors.inkMuted}>{dates}</AppText>
        </View>
        <View style={{ height: 28, paddingHorizontal: 12, borderRadius: 14, backgroundColor: chipBg, justifyContent: 'center' }}>
          <AppText size={13} weight="bold" heading color={colors.ink}>{chip}</AppText>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <AppText size={14} weight="semibold" color={colors.inkMuted}>{detail}</AppText>
        <AvatarStack members={members} size={26} />
      </View>
    </Pressable>
  );
}

export function TripsScreen({ trip, today, onScroll, onOpenTrip, onSoon }: Props) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<'upcoming' | 'past'>('upcoming');
  const memberFor = (ids: string[]) => trip.members.filter((m) => ids.includes(m.id));
  const days = tripLength(trip.startDate, trip.endDate);
  const away = daysUntil(today, trip.startDate);

  return (
    <ScrollView onScroll={onScroll} scrollEventThrottle={16} contentContainerStyle={{ paddingTop: insets.top + 12, paddingHorizontal: 20, gap: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <AppText size={30} weight="bold" accessibilityRole="header">Trips</AppText>
        <Button label="New trip" icon="plus" small onPress={() => onSoon('New trips')} />
      </View>
      <Segmented label="Which trips" options={[{ id: 'upcoming', label: `Upcoming · ${1 + OTHER_TRIPS.length}` }, { id: 'past', label: 'Past' }]} value={filter} onChange={setFilter} />
      {filter === 'upcoming' ? (
        <View style={{ gap: 12 }}>
          <TripCard
            name={trip.destination}
            dates={`${formatRange(trip.startDate, trip.endDate)} · ${days} days`}
            chip={away > 0 ? `${away} days` : countdownText(away)}
            chipBg={colors.highlight}
            detail={`${trip.days.length ? `${countPlans(trip.days)} plans` : 'No plans yet'} · ${trip.flights.length} flights · ${trip.stays.length} stay`}
            members={trip.members}
            onPress={onOpenTrip}
          />
          {OTHER_TRIPS.map((t) => (
            <TripCard key={t.id} name={t.name} dates={t.dates} chip={t.status} chipBg={t.status === 'Planning' ? colors.soft : colors.line} detail={t.detail} members={memberFor(t.memberIds)} onPress={() => onSoon('Other sample trips')} />
          ))}
        </View>
      ) : (
        <AppText size={15} color={colors.inkMuted}>Trips you’ve finished will show here.</AppText>
      )}
      <TabBarSpacer />
    </ScrollView>
  );
}
