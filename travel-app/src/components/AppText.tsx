import { Text, type TextProps } from 'react-native';

import { FONT_FAMILY, type Weight } from '../theme/fonts';
import { useTheme } from '../theme/useTheme';

interface Props extends TextProps {
  size?: number;
  weight?: Weight;
  color?: string;
  lineHeight?: number;
}

export function AppText({ size = 16, weight = 'regular', color, lineHeight, style, ...rest }: Props) {
  const { colors } = useTheme();
  return (
    <Text
      {...rest}
      style={[{ fontFamily: FONT_FAMILY[weight], fontSize: size, lineHeight, color: color ?? colors.ink }, style]}
    />
  );
}
