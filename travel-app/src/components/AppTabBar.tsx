import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Pressable, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon, type IconName } from './Icon';
import { HEADING_FAMILY } from '../theme/fonts';
import { radius } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';

export type AppTab = 'home' | 'explore' | 'trips' | 'profile';

const TABS: { id: AppTab; label: string; icon: IconName }[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'explore', label: 'Explore', icon: 'explore' },
  { id: 'trips', label: 'Trips', icon: 'trips' },
  { id: 'profile', label: 'Profile', icon: 'profile' },
];

export const APP_TAB_BAR_SPACE = 68 + 24;
const COMPACT_WIDTH = 4 * 52 + 14;

// White floating bar. While the page scrolls down it shrinks to an icon-only pill; scrolling up restores it.
export function AppTabBar({ active, compact, onChange }: { active: AppTab; compact: boolean; onChange: (tab: AppTab) => void }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const progress = useRef(new Animated.Value(0)).current;
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion).catch(() => {});
  }, []);

  useEffect(() => {
    Animated.timing(progress, { toValue: compact ? 1 : 0, duration: reduceMotion ? 0 : 260, useNativeDriver: false }).start();
  }, [compact, reduceMotion, progress]);

  const inset = progress.interpolate({ inputRange: [0, 1], outputRange: [16, Math.max(16, (width - COMPACT_WIDTH) / 2)] });
  const height = progress.interpolate({ inputRange: [0, 1], outputRange: [68, 56] });
  const itemHeight = progress.interpolate({ inputRange: [0, 1], outputRange: [54, 42] });
  const labelHeight = progress.interpolate({ inputRange: [0, 1], outputRange: [14, 0] });
  const labelOpacity = progress.interpolate({ inputRange: [0, 0.5], outputRange: [1, 0], extrapolate: 'clamp' });

  return (
    <Animated.View
      accessibilityRole="tablist"
      style={{
        position: 'absolute', left: inset, right: inset, bottom: Math.max(insets.bottom, 12) + 6, height,
        borderRadius: radius.pill, backgroundColor: colors.bg, borderWidth: 1, borderColor: colors.line,
        shadowColor: '#1B1B1F', shadowOpacity: 0.1, shadowRadius: 12, shadowOffset: { width: 0, height: 8 }, elevation: 8,
        flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6, gap: 2,
      }}
    >
      {TABS.map((t) => {
        const on = t.id === active;
        const fg = on ? colors.onHighlight : colors.inkMuted;
        return (
          <Pressable
            key={t.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            accessibilityLabel={t.label}
            onPress={() => onChange(t.id)}
            style={{ flex: 1 }}
          >
            <Animated.View style={{ height: itemHeight, borderRadius: radius.pill, backgroundColor: on ? colors.highlight : 'transparent', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={t.icon} size={22} color={fg} strokeWidth={on ? 2.2 : 2} />
              <Animated.Text
                numberOfLines={1}
                style={{ height: labelHeight, opacity: labelOpacity, marginTop: 2, fontSize: 11, fontFamily: HEADING_FAMILY[on ? 'bold' : 'medium'], color: fg }}
              >
                {t.label}
              </Animated.Text>
            </Animated.View>
          </Pressable>
        );
      })}
    </Animated.View>
  );
}

// Tracks scroll direction for the tab bar: down past the top collapses it, any upward scroll expands it.
export function useCollapsingTabBar() {
  const [compact, setCompact] = useState(false);
  const lastY = useRef(0);
  const onScroll = (e: { nativeEvent: { contentOffset: { y: number } } }) => {
    const y = e.nativeEvent.contentOffset.y;
    const dy = y - lastY.current;
    if (Math.abs(dy) < 6) return;
    lastY.current = y;
    const next = y > 40 && dy > 0;
    setCompact((prev) => (prev === next ? prev : next));
  };
  const reset = () => {
    lastY.current = 0;
    setCompact(false);
  };
  return { compact, onScroll, reset };
}

export function TabBarSpacer() {
  const insets = useSafeAreaInsets();
  return <View style={{ height: APP_TAB_BAR_SPACE + insets.bottom }} />;
}
