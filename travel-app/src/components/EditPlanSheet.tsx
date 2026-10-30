import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { AppText } from './AppText';
import { BottomSheet } from './BottomSheet';
import { Button } from './Button';
import { CreditLine } from './CreditLine';
import { Segmented } from './Segmented';
import { TextField } from './TextField';
import { SLOT_LABELS, SLOTS } from '../lib/tripOptions';
import type { PlanChanges } from '../lib/tripActions';
import type { Activity, Member, Slot } from '../types';

interface Props {
  visible: boolean;
  dayLabel: string;
  slot: Slot;
  activity: Activity | null; // null when adding
  members: Member[];
  me: string;
  onClose: () => void;
  onSave: (changes: PlanChanges) => void;
  onDelete: () => void;
}

export function EditPlanSheet({ visible, dayLabel, slot, activity, members, me, onClose, onSave, onDelete }: Props) {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [when, setWhen] = useState<Slot>(slot);

  // Load the plan each time the sheet opens.
  useEffect(() => {
    if (!visible) return;
    setTitle(activity?.title ?? '');
    setNotes(activity?.notes ?? '');
    setWhen(slot);
  }, [visible, activity, slot]);

  const canSave = title.trim() !== '';
  return (
    <BottomSheet
      visible={visible}
      title={activity ? 'Edit plan' : 'Add a plan'}
      subtitle={`${dayLabel} · shared with everyone on the trip`}
      onClose={onClose}
      footer={
        <>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <View style={{ flex: 1 }}><Button label="Cancel" variant="outline" onPress={onClose} /></View>
            <View style={{ flex: 1 }}><Button label="Save" disabled={!canSave} onPress={() => onSave({ title, notes, slot: when })} /></View>
          </View>
          {activity ? <Button label="Delete plan" variant="danger" small onPress={onDelete} /> : null}
        </>
      }
    >
      <TextField label="What" value={title} onChangeText={setTitle} placeholder="e.g. Snorkeling at the bay" autoFocus={!activity} />
      <View style={{ gap: 6 }}>
        <AppText size={15} weight="semibold">When</AppText>
        <Segmented label="Time of day" options={SLOTS.map((s) => ({ id: s, label: SLOT_LABELS[s] }))} value={when} onChange={setWhen} />
      </View>
      <TextField label="Notes" hint="(optional)" value={notes} onChangeText={setNotes} placeholder="Address, booking reference, reminders" multiline />
      {activity ? <CreditLine members={members} activity={activity} me={me} /> : null}
    </BottomSheet>
  );
}
