import { Text, type TextProps } from 'react-native';

import { BODY_FAMILY, HEADING_FAMILY, type Weight } from '../theme/fonts';
import { useTheme } from '../theme/useTheme';

interface Props extends TextProps {
  size?: number;
  weight?: Weight;
  color?: string;
  lineHeight?: number;
  heading?: boolean; // titles use the heading face; defaults to bold text at 17px and up
}

export function AppText({ size = 16, weight = 'regular', color, lineHeight, heading, style, ...rest }: Props) {
  const { colors } = useTheme();
  const isHeading = heading ?? (weight === 'bold' && size >= 17);
  const family = (isHeading ? HEADING_FAMILY : BODY_FAMILY)[weight];
  return (
    <Text
      {...rest}
      style={[{ fontFamily: family, fontSize: size, lineHeight, color: color ?? colors.ink }, style]}
    />
  );
}
