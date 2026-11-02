import { Pressable, View } from 'react-native';

import { AppText } from './AppText';
import { useTheme } from '../theme/useTheme';

export type TripSection = 'plan' | 'bookings' | 'money' | 'family';

const SECTIONS: { id: TripSection; label: string }[] = [
  { id: 'plan', label: 'Plan' },
  { id: 'bookings', label: 'Bookings' },
  { id: 'money', label: 'Money' },
  { id: 'family', label: 'Family' },
];

// Underlined text tabs, so they read differently from the yellow day pills below them.
export function SectionTabs({ active, onChange }: { active: TripSection; onChange: (s: TripSection) => void }) {
  const { colors } = useTheme();
  return (
    <View accessibilityRole="tablist" style={{ marginHorizontal: 16, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.line }}>
      {SECTIONS.map((s) => {
        const on = s.id === active;
        return (
          <Pressable
            key={s.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            onPress={() => onChange(s.id)}
            style={{ flex: 1, height: 46, alignItems: 'center', justifyContent: 'center', marginBottom: -1, borderBottomWidth: 3, borderBottomColor: on ? colors.ink : 'transparent' }}
          >
            <AppText size={15} weight={on ? 'bold' : 'medium'} heading color={on ? colors.ink : colors.inkMuted}>{s.label}</AppText>
          </Pressable>
        );
      })}
    </View>
  );
}
