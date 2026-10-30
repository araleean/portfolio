import { Pressable } from 'react-native';

import { AppText } from './AppText';
import { useTheme } from '../theme/useTheme';

export function PaceOption({ label, detail, selected, onPress }: { label: string; detail: string; selected: boolean; onPress: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      onPress={onPress}
      style={{
        flex: 1, minHeight: 72, borderRadius: 18, borderWidth: selected ? 2 : 1.5,
        borderColor: selected ? colors.ink : colors.lineStrong, backgroundColor: selected ? colors.soft : colors.bg,
        alignItems: 'center', justifyContent: 'center', gap: 2, paddingHorizontal: 4, paddingVertical: 8,
      }}
    >
      <AppText size={15} weight={selected ? 'bold' : 'semibold'} color={selected ? colors.onSoft : colors.ink}>{label}</AppText>
      <AppText size={12} color={colors.inkMuted}>{detail}</AppText>
    </Pressable>
  );
}
