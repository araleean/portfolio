import { Pressable, View } from 'react-native';

import { Icon, type IconName } from './Icon';
import { useTheme } from '../theme/useTheme';

export function IconButton({ icon, label, onPress, dot }: { icon: IconName; label: string; onPress: () => void; dot?: boolean }) {
  const { colors } = useTheme();
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' }}>
      <Icon name={icon} color={colors.ink} />
      {dot ? <View style={{ position: 'absolute', top: 9, right: 10, width: 9, height: 9, borderRadius: 5, backgroundColor: colors.danger, borderWidth: 2, borderColor: colors.surface }} /> : null}
    </Pressable>
  );
}
