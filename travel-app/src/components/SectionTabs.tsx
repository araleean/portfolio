import { Pressable, ScrollView } from 'react-native';

import { AppText } from './AppText';
import { radius } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';

export type TripSection = 'plan' | 'bookings' | 'money' | 'family';

const SECTIONS: { id: TripSection; label: string }[] = [
  { id: 'plan', label: 'Plan' },
  { id: 'bookings', label: 'Bookings' },
  { id: 'money', label: 'Money' },
  { id: 'family', label: 'Family' },
];

export function SectionTabs({ active, onChange }: { active: TripSection; onChange: (s: TripSection) => void }) {
  const { colors } = useTheme();
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} accessibilityRole="tablist" contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}>
      {SECTIONS.map((s) => {
        const on = s.id === active;
        return (
          <Pressable
            key={s.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            onPress={() => onChange(s.id)}
            style={{ height: 40, paddingHorizontal: 16, borderRadius: radius.pill, backgroundColor: on ? colors.highlight : colors.surface, justifyContent: 'center' }}
          >
            <AppText size={15} weight={on ? 'bold' : 'medium'} heading color={on ? colors.onHighlight : colors.ink}>{s.label}</AppText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
