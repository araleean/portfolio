import { View } from 'react-native';

import { AppText } from '../../components/AppText';
import { Avatar } from '../../components/Avatar';
import { Button } from '../../components/Button';
import { SectionLabel } from '../../components/SectionLabel';
import { displayName } from '../../lib/people';
import { radius } from '../../theme/tokens';
import { useTheme } from '../../theme/useTheme';
import type { Trip } from '../../types';

const money = (n: number) => `$${n.toLocaleString('en-US')}`;

export function MoneySection({ trip, me, onAdd }: { trip: Trip; me: string; onAdd: () => void }) {
  const { colors } = useTheme();
  const total = trip.expenses.reduce((n, e) => n + e.amount, 0);
  return (
    <View style={{ paddingHorizontal: 16, gap: 14 }}>
      <View style={{ backgroundColor: colors.tileExpenses, borderRadius: radius.lg, paddingVertical: 18, paddingHorizontal: 20, gap: 4 }}>
        <SectionLabel>Spent so far</SectionLabel>
        <AppText size={34} weight="bold">{money(total)}</AppText>
        <AppText size={14} color={colors.inkMuted}>{`${trip.expenses.length} expenses · amounts in USD`}</AppText>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <AppText size={17} weight="bold">Expenses</AppText>
        <Button label="Add" icon="plus" variant="outline" small onPress={onAdd} />
      </View>
      <View>
        {trip.expenses.map((e) => (
          <View key={e.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.line }}>
            <Avatar members={trip.members} id={e.paidBy} size={32} />
            <View style={{ flex: 1 }}>
              <AppText size={15} weight="semibold">{e.title}</AppText>
              <AppText size={13} color={colors.inkMuted}>{`Paid by ${displayName(trip.members, e.paidBy, me, true)}`}</AppText>
            </View>
            <AppText size={16} weight="bold" heading>{money(e.amount)}</AppText>
          </View>
        ))}
      </View>
    </View>
  );
}
