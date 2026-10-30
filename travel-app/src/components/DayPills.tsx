import { Pressable, ScrollView } from 'react-native';

import { AppText } from './AppText';
import { parseIsoDate, weekday } from '../lib/dates';
import { useTheme } from '../theme/useTheme';

export function DayPills({ dates, selected, onSelect }: { dates: string[]; selected: number; onSelect: (i: number) => void }) {
  const { colors } = useTheme();
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}>
      {dates.map((iso, i) => {
        const on = i === selected;
        return (
          <Pressable
            key={iso}
            accessibilityRole="button"
            accessibilityState={{ selected: on }}
            accessibilityLabel={`Day ${i + 1}, ${weekday(iso)} ${parseIsoDate(iso).getUTCDate()}`}
            onPress={() => onSelect(i)}
            style={{ width: 56, height: 64, borderRadius: 20, backgroundColor: on ? colors.highlight : colors.surface, alignItems: 'center', justifyContent: 'center', gap: 2 }}
          >
            <AppText size={12} weight={on ? 'semibold' : 'regular'} color={on ? colors.onHighlight : colors.inkMuted}>{weekday(iso)}</AppText>
            <AppText size={20} weight={on ? 'bold' : 'semibold'} color={on ? colors.onHighlight : colors.ink}>{String(parseIsoDate(iso).getUTCDate())}</AppText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
