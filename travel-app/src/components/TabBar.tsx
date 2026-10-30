import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from './AppText';
import { Icon, type IconName } from './Icon';
import { radius } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';

export type TabId = 'overview' | 'flights' | 'stays' | 'itinerary' | 'expenses';

const TABS: { id: TabId; label: string; icon: IconName }[] = [
  { id: 'overview', label: 'Overview', icon: 'home' },
  { id: 'flights', label: 'Flights', icon: 'plane' },
  { id: 'stays', label: 'Stays', icon: 'bed' },
  { id: 'itinerary', label: 'Itinerary', icon: 'calendar' },
  { id: 'expenses', label: 'Expenses', icon: 'wallet' },
];

export const TAB_BAR_SPACE = 68 + 16; // bar height plus the gap above it

// The floating bar: the same on iOS and Android, with the current tab in a yellow pill.
export function TabBar({ active, onChange }: { active: TabId; onChange: (tab: TabId) => void }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View
      accessibilityRole="tablist"
      style={{
        position: 'absolute', left: 16, right: 16, bottom: Math.max(insets.bottom, 12) + 4, height: 68,
        borderRadius: radius.pill, backgroundColor: colors.nav, borderWidth: 1, borderColor: colors.navLine,
        flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6,
      }}
    >
      {TABS.map((t) => {
        const on = t.id === active;
        const fg = on ? colors.onHighlight : colors.navInk;
        return (
          <Pressable
            key={t.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            accessibilityLabel={t.label}
            onPress={() => onChange(t.id)}
            style={{ flex: 1, height: 54, borderRadius: radius.pill, backgroundColor: on ? colors.highlight : 'transparent', alignItems: 'center', justifyContent: 'center', gap: 2 }}
          >
            <Icon name={t.icon} size={22} color={fg} strokeWidth={on ? 2.2 : 2} />
            <AppText size={11} weight={on ? 'bold' : 'medium'} color={fg}>{t.label}</AppText>
          </Pressable>
        );
      })}
    </View>
  );
}
