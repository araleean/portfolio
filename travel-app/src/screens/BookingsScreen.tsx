import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '../components/AppText';
import { CreditLine } from '../components/CreditLine';
import { SectionLabel } from '../components/SectionLabel';
import { TAB_BAR_SPACE } from '../components/TabBar';
import { TripHeader } from '../components/TripHeader';
import { formatDay, formatTime } from '../lib/dates';
import { radius } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';
import type { Trip } from '../types';

function Detail({ label, value }: { label: string; value: string }) {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, gap: 2 }}>
      <AppText size={12} weight="semibold" color={colors.inkMuted}>{label}</AppText>
      <AppText size={15} weight="semibold">{value}</AppText>
    </View>
  );
}

// Read-only for now: the itinerary flow is the focus of this build.
export function FlightsScreen({ trip, me }: { trip: Trip; me: string }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: TAB_BAR_SPACE + insets.bottom + 24 }}>
      <TripHeader title="Flights" subtitle={`${trip.flights.length} flights`} members={trip.members} />
      <View style={{ paddingHorizontal: 16, gap: 12 }}>
        {trip.flights.map((f) => (
          <View key={f.id} style={{ backgroundColor: colors.tileFlights, borderRadius: radius.lg, padding: 16, gap: 12 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <SectionLabel>{f.label}</SectionLabel>
              <AppText size={14} weight="semibold">{f.flightNumber}</AppText>
            </View>
            <AppText size={26} weight="bold">{`${f.from} → ${f.to}`}</AppText>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Detail label="Departs" value={`${formatDay(f.departDate)}, ${formatTime(f.departTime)}`} />
              <Detail label="Arrives" value={formatTime(f.arriveTime)} />
            </View>
            {f.confirmation ? <Detail label="Confirmation" value={f.confirmation} /> : null}
            <CreditLine members={trip.members} activity={{ id: f.id, title: f.flightNumber, addedBy: f.addedBy }} me={me} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export function StaysScreen({ trip, me }: { trip: Trip; me: string }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: TAB_BAR_SPACE + insets.bottom + 24 }}>
      <TripHeader title="Stays" subtitle={`${trip.stays.length} stay`} members={trip.members} />
      <View style={{ paddingHorizontal: 16, gap: 12 }}>
        {trip.stays.map((s) => (
          <View key={s.id} style={{ backgroundColor: colors.tileStays, borderRadius: radius.lg, padding: 16, gap: 12 }}>
            <View style={{ gap: 4 }}>
              <AppText size={20} weight="bold">{s.name}</AppText>
              {s.address ? <AppText size={15} color={colors.inkMuted}>{s.address}</AppText> : null}
            </View>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Detail label="Check-in" value={`${formatDay(s.checkInDate)}, ${formatTime(s.checkInTime)}`} />
              <Detail label="Check-out" value={`${formatDay(s.checkOutDate)}, ${formatTime(s.checkOutTime)}`} />
            </View>
            {s.confirmation ? <Detail label="Confirmation" value={s.confirmation} /> : null}
            <CreditLine members={trip.members} activity={{ id: s.id, title: s.name, addedBy: s.addedBy }} me={me} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export function ExpensesScreen({ trip }: { trip: Trip }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const total = trip.expenses.reduce((n, e) => n + e.amount, 0);
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: TAB_BAR_SPACE + insets.bottom + 24 }}>
      <TripHeader title="Expenses" subtitle={`$${total.toLocaleString('en-US')} spent · ${trip.expenses.length} expenses`} members={trip.members} />
      <View style={{ paddingHorizontal: 16, gap: 10 }}>
        {trip.expenses.map((e) => (
          <View key={e.id} style={{ backgroundColor: colors.surface, borderRadius: radius.md, padding: 16, flexDirection: 'row', justifyContent: 'space-between', gap: 12 }}>
            <AppText size={16} weight="semibold" style={{ flex: 1 }}>{e.title}</AppText>
            <AppText size={17} weight="bold">{`$${e.amount.toLocaleString('en-US')}`}</AppText>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
