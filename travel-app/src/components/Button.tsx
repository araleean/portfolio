import { Pressable, View } from 'react-native';

import { AppText } from './AppText';
import { Icon, type IconName } from './Icon';
import { radius } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';

interface Props {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'danger';
  icon?: IconName;
  disabled?: boolean;
  small?: boolean;
}

export function Button({ label, onPress, variant = 'primary', icon, disabled, small }: Props) {
  const { colors } = useTheme();
  const height = small ? 44 : 56;
  const look = {
    primary: { bg: disabled ? colors.disabled : colors.primary, fg: colors.onPrimary, border: 'transparent' },
    outline: { bg: colors.bg, fg: colors.ink, border: colors.lineStrong },
    danger: { bg: 'transparent', fg: colors.danger, border: 'transparent' },
  }[variant];
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => ({
        height, borderRadius: radius.md, backgroundColor: look.bg, borderWidth: variant === 'outline' ? 1.5 : 0,
        borderColor: look.border, paddingHorizontal: 16, opacity: pressed ? 0.85 : 1,
        alignItems: 'center', justifyContent: 'center',
      })}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        {icon ? <Icon name={icon} size={small ? 18 : 20} color={look.fg} strokeWidth={2.2} /> : null}
        <AppText size={small ? 15 : 17} weight="semibold" color={look.fg}>{label}</AppText>
      </View>
    </Pressable>
  );
}
