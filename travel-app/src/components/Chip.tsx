import { Pressable } from 'react-native';

import { AppText } from './AppText';
import { Icon } from './Icon';
import { radius } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';

// Selected chips get a check as well as the yellow fill, so selection isn't colour alone.
export function Chip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      onPress={onPress}
      style={{
        height: 44, paddingHorizontal: 16, borderRadius: radius.pill, borderWidth: 1.5,
        borderColor: selected ? colors.highlight : colors.lineStrong,
        backgroundColor: selected ? colors.highlight : colors.bg,
        flexDirection: 'row', alignItems: 'center', gap: 6,
      }}
    >
      {selected ? <Icon name="check" size={16} color={colors.onHighlight} strokeWidth={2.4} /> : null}
      <AppText size={15} weight={selected ? 'semibold' : 'medium'} color={selected ? colors.onHighlight : colors.ink}>{label}</AppText>
    </Pressable>
  );
}
