import { Pressable, View } from 'react-native';

import { AppText } from './AppText';
import { Icon } from './Icon';
import { radius } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';

// A chosen value (a must-do) with its own remove button.
export function ValueChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  const { colors } = useTheme();
  return (
    <View style={{ height: 44, paddingLeft: 14, borderRadius: radius.pill, backgroundColor: colors.soft, flexDirection: 'row', alignItems: 'center' }}>
      <AppText size={15} weight="semibold" color={colors.onSoft}>{label}</AppText>
      <Pressable accessibilityRole="button" accessibilityLabel={`Remove ${label}`} onPress={onRemove} style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="close" size={14} color={colors.onSoft} strokeWidth={2.4} />
      </Pressable>
    </View>
  );
}
