import { TextInput, View, type TextInputProps } from 'react-native';

import { AppText } from './AppText';
import { FONT_FAMILY } from '../theme/fonts';
import { radius } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';

interface Props extends TextInputProps {
  label: string;
  hint?: string; // shown after the label, e.g. "(optional)"
}

export function TextField({ label, hint, multiline, style, ...rest }: Props) {
  const { colors } = useTheme();
  return (
    <View style={{ gap: 6 }}>
      <AppText size={15} weight="semibold">
        {label}
        {hint ? <AppText size={15} color={colors.inkMuted}>{` ${hint}`}</AppText> : null}
      </AppText>
      <TextInput
        {...rest}
        accessibilityLabel={label}
        multiline={multiline}
        placeholderTextColor={colors.inkMuted}
        style={[{
          minHeight: multiline ? 76 : 50, borderWidth: 1.5, borderColor: colors.lineStrong, borderRadius: radius.sm,
          backgroundColor: colors.surface, paddingHorizontal: 14, paddingVertical: multiline ? 12 : 0, fontSize: 16,
          fontFamily: FONT_FAMILY.regular, color: colors.ink, textAlignVertical: multiline ? 'top' : 'center',
        }, style]}
      />
    </View>
  );
}
