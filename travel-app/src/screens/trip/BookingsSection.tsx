import { View } from 'react-native';

import { AppText } from '../../components/AppText';
import { Button } from '../../components/Button';
import { CreditLine } from '../../components/CreditLine';
import { Icon } from '../../components/Icon';
import { SectionLabel } from '../../components/SectionLabel';
import { bookingTimeline } from '../../lib/bookings';
import { formatDay } from '../../lib/dates';
import { radius } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import type { Trip } from '../../types';

// Flights and stays in one timeline by date.
export function BookingsSection({ trip, me, onAdd }: { trip: Trip; me: string; onAdd: () => void }) {
  const { colors } = useTheme();
  const items = bookingTimeline(trip);
  const dates = [...new Set(items.map((i) => i.date))];
  return (
    <View style={{ paddingHorizontal: 16, gap: 14 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Button label="Add booking" icon="plus" variant="outline" small onPress={onAdd} />
      </View>
      {dates.map((date) => (
        <View key={date} style={{ gap: 10 }}>
          <AppText size={17} weight="bold">{formatDay(date)}</AppText>
          {items.filter((i) => i.date === date).map((b) => (
            <View key={b.id} style={{ backgroundColor: b.kind === 'flight' ? colors.tileFlights : colors.tileStays, borderRadius: radius.md, padding: 16, flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
              <View style={{ width: 40, height: 40, borderRadius: 14, backgroundColor: colors.tileIcon, alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={b.kind === 'flight' ? 'plane' : 'bed'} color={colors.ink} />
              </View>
              <View style={{ flex: 1, gap: 3 }}>
                <SectionLabel>{b.label}</SectionLabel>
                <AppText size={16} weight="bold" heading={false}>{b.title}</AppText>
                {b.detail ? <AppText size={14} color={colors.inkMuted}>{b.detail}</AppText> : null}
                <CreditLine members={trip.members} activity={{ id: b.id, title: b.title, addedBy: b.addedBy }} me={me} />
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
