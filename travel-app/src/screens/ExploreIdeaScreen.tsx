import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '../components/AppText';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { IconButton } from '../components/IconButton';
import type { ExploreIdea } from '../data/exploreIdeas';
import { SLOT_LABELS, SLOTS } from '../lib/tripOptions';
import { radius } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';

interface Props {
  idea: ExploreIdea;
  tripName: string;
  onBack: () => void;
  onSave: () => void;
  onUse: () => void;
}

export function ExploreIdeaScreen({ idea, tripName, onBack, onSave, onUse }: Props) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={{ backgroundColor: colors[idea.tint], paddingTop: insets.top + 4, paddingHorizontal: 8, paddingBottom: 18, gap: 28 }}>
          <Pressable accessibilityRole="button" accessibilityLabel="Back to Explore" onPress={onBack} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: colors.tileIcon, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="back" color={colors.ink} />
          </Pressable>
          <View style={{ paddingHorizontal: 12, gap: 6 }}>
            <View style={{ flexDirection: 'row', gap: 6 }}>
              {idea.tags.map((t) => (
                <View key={t} style={{ height: 24, paddingHorizontal: 10, borderRadius: 12, backgroundColor: colors.tileIcon, justifyContent: 'center' }}>
                  <AppText size={12} weight="bold">{t}</AppText>
                </View>
              ))}
            </View>
            <AppText size={28} weight="bold" accessibilityRole="header">{idea.title}</AppText>
            <AppText size={14} weight="semibold" color={colors.inkMuted}>{`${idea.destination} · sample itinerary · ${idea.planCount} plans`}</AppText>
          </View>
        </View>
        <View style={{ padding: 20, paddingTop: 16, gap: 12 }}>
          <AppText size={15} lineHeight={22} color={colors.inkMuted}>{idea.summary}</AppText>
          {idea.preview.map((day, i) => (
            <View key={i} style={{ backgroundColor: colors.surface, borderRadius: radius.md, padding: 16, gap: 10 }}>
              <AppText size={16} weight="bold" heading>{`Day ${i + 1}`}</AppText>
              {SLOTS.map((s) => (
                <View key={s} style={{ flexDirection: 'row', gap: 10 }}>
                  <AppText size={12} weight="bold" color={colors.inkMuted} style={{ width: 84, paddingTop: 2, letterSpacing: 0.6, textTransform: 'uppercase' }}>{SLOT_LABELS[s]}</AppText>
                  <AppText size={15} lineHeight={21} style={{ flex: 1 }}>{day[s]}</AppText>
                </View>
              ))}
            </View>
          ))}
          {idea.totalDays > idea.preview.length ? (
            <AppText size={14} weight="semibold" color={colors.inkMuted} style={{ textAlign: 'center' }}>{`+ ${idea.totalDays - idea.preview.length} more days`}</AppText>
          ) : null}
        </View>
      </ScrollView>
      <View style={{ flexDirection: 'row', gap: 10, paddingHorizontal: 20, paddingTop: 12, paddingBottom: Math.max(insets.bottom, 16), borderTopWidth: 1, borderTopColor: colors.line }}>
        <IconButton icon="bookmark" label="Save idea" onPress={onSave} />
        <View style={{ flex: 1 }}><Button label={`Use for my ${tripName} trip`} icon="plus" onPress={onUse} /></View>
      </View>
    </View>
  );
}
