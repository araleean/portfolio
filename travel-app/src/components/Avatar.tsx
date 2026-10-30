import { View } from 'react-native';

import { AppText } from './AppText';
import { findMember } from '../lib/people';
import { useTheme } from '../theme/useTheme';
import type { Member } from '../types';
import { SAMPLE_AUTHOR } from '../types';

interface Props {
  members: Member[];
  id: string;
  size?: number;
  ring?: string; // ring colour when avatars overlap
}

// A white initial on the person's colour; app suggestions get a grey "S".
export function Avatar({ members, id, size = 32, ring }: Props) {
  const { colors } = useTheme();
  const member = findMember(members, id);
  const bg = id === SAMPLE_AUTHOR || !member ? colors.sample : member.color;
  const initial = id === SAMPLE_AUTHOR || !member ? 'S' : member.name.charAt(0);
  return (
    <View
      style={{
        width: size, height: size, borderRadius: size / 2, backgroundColor: bg,
        alignItems: 'center', justifyContent: 'center',
        borderWidth: ring ? 2 : 0, borderColor: ring,
      }}
    >
      <AppText size={Math.round(size * 0.4)} weight="bold" color="#FFFFFF">{initial}</AppText>
    </View>
  );
}

export function AvatarStack({ members, size = 30 }: { members: Member[]; size?: number }) {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: 'row' }} accessibilityLabel={`${members.length} people: ${members.map((m) => m.name).join(', ')}`}>
      {members.map((m, i) => (
        <View key={m.id} style={{ marginLeft: i === 0 ? 0 : -10 }}>
          <Avatar members={members} id={m.id} size={size} ring={colors.bg} />
        </View>
      ))}
    </View>
  );
}
