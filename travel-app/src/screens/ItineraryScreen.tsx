import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActivityCard } from '../components/ActivityCard';
import { AppText } from '../components/AppText';
import { DayPills } from '../components/DayPills';
import { EmptyItineraryCard } from '../components/ItineraryCard';
import { Icon } from '../components/Icon';
import { SectionLabel } from '../components/SectionLabel';
import { TAB_BAR_SPACE } from '../components/TabBar';
import { TripHeader } from '../components/TripHeader';
import { addDays, formatDay } from '../lib/dates';
import { countPlans } from '../lib/draftItinerary';
import type { PlanRef } from '../lib/tripActions';
import { SLOT_LABELS, SLOTS } from '../lib/tripOptions';
import { radius } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';
import type { Trip } from '../types';

interface Props {
  trip: Trip;
  me: string;
  dayIndex: number;
  onSelectDay: (i: number) => void;
  onPlan: () => void;
  onOpenPlan: (ref: PlanRef) => void;
}

export function ItineraryScreen({ trip, me, dayIndex, onSelectDay, onPlan, onOpenPlan }: Props) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const day = trip.days[dayIndex];
  const dates = trip.days.map((_, i) => addDays(trip.startDate, i));

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: TAB_BAR_SPACE + insets.bottom + 24 }}>
      <TripHeader
        title="Itinerary"
        subtitle={trip.days.length ? `${trip.destination} · ${trip.days.length} days · ${countPlans(trip.days)} plans` : trip.destination}
        members={trip.members}
      />
      {!day ? (
        <View style={{ paddingHorizontal: 16 }}>
          <EmptyItineraryCard destination={trip.destination} onPlan={onPlan} />
        </View>
      ) : (
        <View style={{ gap: 16 }}>
          <DayPills dates={dates} selected={dayIndex} onSelect={onSelectDay} />
          <View style={{ paddingHorizontal: 16, gap: 16 }}>
            <AppText size={18} weight="bold">{`Day ${dayIndex + 1} · ${formatDay(dates[dayIndex])}`}</AppText>
            {SLOTS.map((slot) => (
              <View key={slot} style={{ gap: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <SectionLabel>{SLOT_LABELS[slot]}</SectionLabel>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`Add a ${SLOT_LABELS[slot].toLowerCase()} plan`}
                    onPress={() => onOpenPlan({ dayIndex, slot, index: -1 })}
                    style={{ height: 44, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', gap: 4 }}
                  >
                    <Icon name="plus" size={18} color={colors.ink} strokeWidth={2.2} />
                    <AppText size={15} weight="semibold">Add</AppText>
                  </Pressable>
                </View>
                {day.slots[slot].length === 0 ? (
                  <View style={{ borderWidth: 1.5, borderStyle: 'dashed', borderColor: colors.lineStrong, borderRadius: radius.md, padding: 16 }}>
                    <AppText size={15} color={colors.inkMuted}>Nothing planned. Free time.</AppText>
                  </View>
                ) : (
                  day.slots[slot].map((a, i) => (
                    <ActivityCard key={a.id} activity={a} members={trip.members} me={me} onPress={() => onOpenPlan({ dayIndex, slot, index: i })} />
                  ))
                )}
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}
