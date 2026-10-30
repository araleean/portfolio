import { View } from 'react-native';

import { AppText } from './AppText';
import { Icon } from './Icon';
import { useTheme } from '../theme/useTheme';

export function Toast({ message, bottom }: { message: string; bottom: number }) {
  const { colors } = useTheme();
  return (
    <View
      accessibilityLiveRegion="polite"
      accessibilityRole="alert"
      style={{ position: 'absolute', left: 16, right: 16, bottom, backgroundColor: colors.toast, borderRadius: 18, paddingVertical: 12, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 10 }}
    >
      <Icon name="check" size={18} color={colors.onToast} strokeWidth={2.4} />
      <AppText size={14} color={colors.onToast} style={{ flex: 1 }}>{message}</AppText>
    </View>
  );
}
