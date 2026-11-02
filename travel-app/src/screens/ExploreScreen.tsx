import { useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '../components/AppText';
import { TabBarSpacer } from '../components/AppTabBar';
import { Icon } from '../components/Icon';
import { EXPLORE_IDEAS, POPULAR_PLACES, type ExploreIdea } from '../data/exploreIdeas';
import { FONT_FAMILY } from '../theme/fonts';
import { radius } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';

interface Props {
  destination: string;
  onScroll: (e: { nativeEvent: { contentOffset: { y: number } } }) => void;
  onOpenIdea: (idea: ExploreIdea) => void;
  onSoon: (what: string) => void;
}

const FILTERS = ['Family', 'Relaxed', 'Foodie', 'Adventure'];

export function ExploreScreen({ destination, onScroll, onOpenIdea, onSoon }: Props) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const ideas = EXPLORE_IDEAS.filter((i) => !q || `${i.title} ${i.meta} ${i.tags.join(' ')}`.toLowerCase().includes(q));

  return (
    <ScrollView onScroll={onScroll} scrollEventThrottle={16} keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingTop: insets.top + 12, paddingHorizontal: 20, gap: 14 }}>
      <AppText size={30} weight="bold" accessibilityRole="header">Explore</AppText>
      <View style={{ height: 50, borderRadius: 25, backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.line, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16 }}>
        <Icon name="search" size={20} color={colors.inkMuted} />
        <TextInput
          accessibilityLabel="Search a place or idea"
          value={query}
          onChangeText={setQuery}
          placeholder="Search a place or idea"
          placeholderTextColor={colors.inkMuted}
          style={{ flex: 1, fontSize: 16, fontFamily: FONT_FAMILY.regular, color: colors.ink }}
        />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
        <View style={{ height: 38, paddingHorizontal: 14, borderRadius: 19, backgroundColor: colors.highlight, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Icon name="check" size={14} color={colors.onHighlight} strokeWidth={2.6} />
          <AppText size={14} weight="bold" color={colors.onHighlight}>{`For ${destination}`}</AppText>
        </View>
        {FILTERS.map((f) => (
          <Pressable key={f} accessibilityRole="button" onPress={() => onSoon('Filters')} style={{ height: 38, paddingHorizontal: 14, borderRadius: 19, borderWidth: 1.5, borderColor: colors.lineStrong, justifyContent: 'center' }}>
            <AppText size={14}>{f}</AppText>
          </Pressable>
        ))}
      </ScrollView>

      <View style={{ gap: 2, paddingTop: 8 }}>
        <AppText size={19} weight="bold" accessibilityRole="header">{`Ideas for your ${destination} trip`}</AppText>
        <AppText size={14} color={colors.inkMuted}>Sample itineraries you can copy into your plan</AppText>
      </View>
      <View style={{ flexDirection: 'row', gap: 14 }}>
        {ideas.length === 0 ? <AppText size={15} color={colors.inkMuted}>No ideas match that search yet.</AppText> : null}
        {ideas.map((idea) => (
          <Pressable key={idea.id} accessibilityRole="button" accessibilityLabel={`${idea.title}, ${idea.meta}`} onPress={() => onOpenIdea(idea)} style={{ flex: 1, gap: 10 }}>
            <View style={{ height: 92, borderRadius: 18, backgroundColor: colors[idea.tint], padding: 12, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <View style={{ height: 24, paddingHorizontal: 10, borderRadius: 12, backgroundColor: colors.tileIcon, justifyContent: 'center' }}>
                <AppText size={12} weight="bold">{idea.tags[0]}</AppText>
              </View>
              <Icon name="spark" size={28} color={colors.ink} />
            </View>
            <View style={{ paddingHorizontal: 4, gap: 2 }}>
              <AppText size={17} weight="bold">{idea.title}</AppText>
              <AppText size={13} color={colors.inkMuted}>{idea.meta}</AppText>
            </View>
          </Pressable>
        ))}
      </View>

      <View style={{ gap: 2, paddingTop: 8 }}>
        <AppText size={19} weight="bold" accessibilityRole="header">Popular this winter</AppText>
        <AppText size={14} color={colors.inkMuted}>Where families are heading</AppText>
      </View>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        {POPULAR_PLACES.map((p) => (
          <Pressable key={p.name} accessibilityRole="button" onPress={() => onSoon(`Ideas for ${p.name}`)} style={{ flex: 1, minHeight: 84, borderRadius: radius.md, backgroundColor: colors[p.tint], padding: 14, justifyContent: 'flex-end', gap: 2 }}>
            <AppText size={17} weight="bold">{p.name}</AppText>
            <AppText size={13} color={colors.inkMuted}>{p.detail}</AppText>
          </Pressable>
        ))}
      </View>
      <TabBarSpacer />
    </ScrollView>
  );
}
