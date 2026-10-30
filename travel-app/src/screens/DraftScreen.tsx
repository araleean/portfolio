import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '../components/AppText';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { StepHeader } from '../components/StepHeader';
import { TagPill } from '../components/TagPill';
import { addDays, formatDay } from '../lib/dates';
import { countPlans } from '../lib/draftItinerary';
import { PACES, SLOT_LABELS, SLOTS, TRIP_TYPE_LABELS } from '../lib/tripOptions';
import { radius } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';
import type { Day, DraftPreferences } from '../types';

interface Props {
  days: Day[];
  startDate: string;
  prefs: DraftPreferences;
  onBack: () => void;
  onShuffle: () => void;
  onAdd: () => void;
}

function DayCard({ day, index, date, open, onToggle }: { day: Day; index: number; date: string; open: boolean; onToggle: () => void }) {
  const { colors } = useTheme();
  const plans = SLOTS.flatMap((s) => day.slots[s].map((a) => ({ slot: s, a })));
  return (
    <View style={{ backgroundColor: colors.surface, borderRadius: radius.md, paddingHorizontal: 16, paddingVertical: 4 }}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        onPress={onToggle}
        style={{ minHeight: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
          <AppText size={17} weight="bold">{`Day ${index + 1}`}</AppText>
          <AppText size={14} color={colors.inkMuted}>{date}</AppText>
        </View>
        <Icon name={open ? 'up' : 'down'} size={20} color={colors.inkMuted} />
      </Pressable>
      {open ? (
        <View style={{ gap: 10, paddingBottom: 14 }}>
          {plans.map(({ slot, a }) => (
            <View key={a.id} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
              <AppText size={12} weight="bold" color={colors.inkMuted} numberOfLines={1} style={{ width: 92, paddingTop: 2, letterSpacing: 0.6, textTransform: 'uppercase' }}>{SLOT_LABELS[slot]}</AppText>
              <AppText size={15} lineHeight={21} style={{ flex: 1 }}>{a.title}</AppText>
              {a.tag ? <TagPill tag={a.tag} /> : null}
            </View>
          ))}
        </View>
      ) : (
        <AppText size={14} color={colors.inkMuted} style={{ paddingBottom: 12 }}>
          {plans.length === 0 ? 'Free day' : `${plans[0].a.title}${plans.length > 1 ? ` and ${plans.length - 1} more` : ''}`}
        </AppText>
      )}
    </View>
  );
}

export function DraftScreen({ days, startDate, prefs, onBack, onShuffle, onAdd }: Props) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState<Set<number>>(new Set([0, 1]));
  const pace = PACES.find((p) => p.id === prefs.pace)!;
  const styles = prefs.styles.map((s) => TRIP_TYPE_LABELS[s]).join(' and ');

  const toggle = (i: number) => {
    const next = new Set(open);
    if (next.has(i)) next.delete(i);
    else next.add(i);
    setOpen(next);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StepHeader step={2} total={2} onBack={onBack} />
      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 12, gap: 12 }}>
        <View style={{ gap: 6, marginBottom: 4 }}>
          <AppText size={28} weight="bold" accessibilityRole="header" style={{ letterSpacing: -0.4 }}>{`Here’s a draft for ${days.length} days`}</AppText>
          <AppText size={15} lineHeight={21} color={colors.inkMuted}>
            {`${styles}, about ${pace.plansPerDay} plans a day · ${countPlans(days)} plans in all. Your flights and check-in are already in.`}
          </AppText>
        </View>
        {days.map((day, i) => (
          <DayCard key={day.id} day={day} index={i} date={formatDay(addDays(startDate, i))} open={open.has(i)} onToggle={() => toggle(i)} />
        ))}
      </ScrollView>
      <View style={{ flexDirection: 'row', gap: 10, paddingHorizontal: 20, paddingTop: 12, paddingBottom: Math.max(insets.bottom, 16), borderTopWidth: 1, borderTopColor: colors.line }}>
        <View style={{ flex: 1 }}><Button label="Shuffle" icon="shuffle" variant="outline" onPress={onShuffle} /></View>
        <View style={{ flex: 1.4 }}><Button label="Add to trip" onPress={onAdd} /></View>
      </View>
    </View>
  );
}
