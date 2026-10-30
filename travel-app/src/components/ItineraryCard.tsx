import { Pressable, View } from 'react-native';

import { AppText } from './AppText';
import { Button } from './Button';
import { Icon } from './Icon';
import { SectionLabel } from './SectionLabel';
import { radius } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';

function Heading({ detail, chevron }: { detail: string; chevron?: boolean }) {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <View style={{ width: 44, height: 44, borderRadius: radius.sm, backgroundColor: colors.soft, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="calendar" color={colors.onSoft} />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <AppText size={18} weight="bold">Itinerary</AppText>
        <AppText size={14} color={colors.inkMuted}>{detail}</AppText>
      </View>
      {chevron ? <Icon name="chevron" size={20} color={colors.inkMuted} /> : null}
    </View>
  );
}

export function EmptyItineraryCard({ destination, onPlan }: { destination: string; onPlan: () => void }) {
  const { colors } = useTheme();
  return (
    <View style={{ backgroundColor: colors.surface, borderRadius: radius.lg, padding: 18, gap: 14 }}>
      <Heading detail="No plans yet" />
      <AppText size={15} lineHeight={22} color={colors.inkMuted}>{`Start with ideas for ${destination}, or add your own plans day by day.`}</AppText>
      <Button label="Plan your days" icon="spark" onPress={onPlan} />
    </View>
  );
}

export function ItineraryCard({ summary, firstUpLabel, firstUp, onOpen }: { summary: string; firstUpLabel: string; firstUp: string; onOpen: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`Itinerary, ${summary}. Open`} onPress={onOpen} style={{ backgroundColor: colors.surface, borderRadius: radius.lg, padding: 18, gap: 12 }}>
      <Heading detail={summary} chevron />
      <View style={{ gap: 4, paddingTop: 12, borderTopWidth: 1, borderTopColor: colors.line }}>
        <SectionLabel>{firstUpLabel}</SectionLabel>
        <AppText size={15} lineHeight={21}>{firstUp}</AppText>
      </View>
    </Pressable>
  );
}
