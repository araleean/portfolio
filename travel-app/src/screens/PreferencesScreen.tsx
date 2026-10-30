import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '../components/AppText';
import { Button } from '../components/Button';
import { Chip } from '../components/Chip';
import { PaceOption } from '../components/PaceOption';
import { SectionLabel } from '../components/SectionLabel';
import { StepHeader } from '../components/StepHeader';
import { TextField } from '../components/TextField';
import { ValueChip } from '../components/ValueChip';
import { PACES, TRIP_TYPE_LABELS, TRIP_TYPES } from '../lib/tripOptions';
import { useTheme } from '../theme/useTheme';
import type { DraftPreferences } from '../types';

interface Props {
  prefs: DraftPreferences;
  onChange: (prefs: DraftPreferences) => void;
  onClose: () => void;
  onDraft: () => void;
}

export function PreferencesScreen({ prefs, onChange, onClose, onDraft }: Props) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [mustDo, setMustDo] = useState('');

  const toggleStyle = (id: (typeof TRIP_TYPES)[number]) => {
    const on = prefs.styles.includes(id);
    // Keep the list order so drafts are predictable.
    onChange({ ...prefs, styles: TRIP_TYPES.filter((t) => (t === id ? !on : prefs.styles.includes(t))) });
  };
  const addMustDo = () => {
    const text = mustDo.trim();
    if (text && !prefs.mustDos.includes(text)) onChange({ ...prefs, mustDos: [...prefs.mustDos, text] });
    setMustDo('');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StepHeader step={1} total={2} onBack={onClose} backIsClose />
      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 12, gap: 24 }} keyboardShouldPersistTaps="handled">
        <View style={{ gap: 6 }}>
          <AppText size={28} weight="bold" accessibilityRole="header" style={{ letterSpacing: -0.4 }}>What’s this trip about?</AppText>
          <AppText size={15} lineHeight={21} color={colors.inkMuted}>We’ll use this to suggest plans. You can change anything later.</AppText>
        </View>
        <View style={{ gap: 10 }}>
          <SectionLabel>Trip style · pick any</SectionLabel>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {TRIP_TYPES.map((t) => <Chip key={t} label={TRIP_TYPE_LABELS[t]} selected={prefs.styles.includes(t)} onPress={() => toggleStyle(t)} />)}
          </View>
        </View>
        <View style={{ gap: 10 }}>
          <SectionLabel>How full should days be?</SectionLabel>
          <View accessibilityRole="radiogroup" style={{ flexDirection: 'row', gap: 8 }}>
            {PACES.map((p) => <PaceOption key={p.id} label={p.label} detail={p.detail} selected={prefs.pace === p.id} onPress={() => onChange({ ...prefs, pace: p.id })} />)}
          </View>
        </View>
        <View style={{ gap: 10 }}>
          <TextField label="Any must-dos?" value={mustDo} onChangeText={setMustDo} onSubmitEditing={addMustDo} returnKeyType="done" placeholder="e.g. Snorkeling, then tap Add" />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
            {prefs.mustDos.map((m) => <ValueChip key={m} label={m} onRemove={() => onChange({ ...prefs, mustDos: prefs.mustDos.filter((x) => x !== m) })} />)}
            {mustDo.trim() ? <Button label="Add" icon="plus" variant="outline" small onPress={addMustDo} /> : null}
          </View>
        </View>
      </ScrollView>
      <View style={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: Math.max(insets.bottom, 16), borderTopWidth: 1, borderTopColor: colors.line, gap: 8 }}>
        {prefs.styles.length === 0 ? <AppText size={14} color={colors.inkMuted} style={{ textAlign: 'center' }}>Pick at least one trip style.</AppText> : null}
        <Button label="Make a draft" icon="spark" disabled={prefs.styles.length === 0} onPress={onDraft} />
      </View>
    </View>
  );
}
