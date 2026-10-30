import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '../components/AppText';
import { Avatar } from '../components/Avatar';
import { CountdownCard } from '../components/CountdownCard';
import { EmptyItineraryCard, ItineraryCard } from '../components/ItineraryCard';
import { SectionLabel } from '../components/SectionLabel';
import { SummaryTile } from '../components/SummaryTile';
import { TAB_BAR_SPACE, type TabId } from '../components/TabBar';
import { TripHeader } from '../components/TripHeader';
import { daysUntil, formatDay, formatRange, formatTime } from '../lib/dates';
import { countPlans } from '../lib/draftItinerary';
import { displayName, timeAgo } from '../lib/people';
import { SLOTS } from '../lib/tripOptions';
import { useTheme } from '../theme/useTheme';
import type { Trip } from '../types';

interface Props {
  trip: Trip;
  me: string;
  today: string;
  now: number;
  onPlan: () => void;
  onOpenTab: (tab: TabId) => void;
}

function firstUp(trip: Trip): string {
  const day = trip.days[0];
  const plans = day ? SLOTS.flatMap((s) => day.slots[s]) : [];
  if (plans.length === 0) return 'Nothing planned yet';
  if (plans.length === 1) return plans[0].title;
  const next = plans[1].title;
  return `${plans[0].title}, then ${next.charAt(0).toLowerCase()}${next.slice(1)}`;
}

export function OverviewScreen({ trip, me, today, now, onPlan, onOpenTab }: Props) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const planned = trip.days.length > 0;
  const nextFlight = trip.flights[0];
  const stay = trip.stays[0];
  const spent = trip.expenses.reduce((n, e) => n + e.amount, 0);

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: TAB_BAR_SPACE + insets.bottom + 24 }}>
      <TripHeader title={trip.destination} subtitle={`${formatRange(trip.startDate, trip.endDate)} · ${trip.members.length} people`} members={trip.members} />
      <View style={{ paddingHorizontal: 16, gap: 14 }}>
        <CountdownCard
          days={daysUntil(today, trip.startDate)}
          dates={planned ? formatDay(trip.startDate) : `${formatDay(trip.startDate)} – ${formatDay(trip.endDate)}`}
          compact={planned}
        />
        {planned ? (
          <ItineraryCard
            summary={`${trip.days.length} days · ${countPlans(trip.days)} plans`}
            firstUpLabel={`First up · ${formatDay(trip.startDate)}`}
            firstUp={firstUp(trip)}
            onOpen={() => onOpenTab('itinerary')}
          />
        ) : (
          <EmptyItineraryCard destination={trip.destination} onPlan={onPlan} />
        )}
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <SummaryTile icon="plane" title="Flights" detail={nextFlight ? `${nextFlight.flightNumber}, ${formatTime(nextFlight.departTime)}` : 'None yet'} background={colors.tileFlights} onPress={() => onOpenTab('flights')} />
          <SummaryTile icon="bed" title="Stay" detail={stay ? stay.name : 'None yet'} background={colors.tileStays} onPress={() => onOpenTab('stays')} />
          <SummaryTile icon="wallet" title="Spent" detail={`$${spent.toLocaleString('en-US')}`} background={colors.tileExpenses} onPress={() => onOpenTab('expenses')} />
        </View>
        <View style={{ gap: 10, paddingTop: 4 }}>
          <SectionLabel>Recent changes</SectionLabel>
          {trip.feed.slice(0, 4).map((f) => (
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
    </ScrollView>
  );
}
