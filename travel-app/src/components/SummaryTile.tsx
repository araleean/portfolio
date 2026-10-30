import { Pressable, View } from 'react-native';

import { AppText } from './AppText';
import { Icon, type IconName } from './Icon';
import { radius } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';

// A coloured tile that jumps to a section: sky for flights, mint for stays, peach for spending.
export function SummaryTile({ icon, title, detail, background, onPress }: { icon: IconName; title: string; detail: string; background: string; onPress: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${detail}`}
      onPress={onPress}
      style={{ flex: 1, minHeight: 104, borderRadius: radius.lg, backgroundColor: background, padding: 14, justifyContent: 'space-between', gap: 10 }}
    >
      <Icon name={icon} size={24} color={colors.ink} />
      <View style={{ gap: 2 }}>
        <AppText size={16} weight="bold">{title}</AppText>
        <AppText size={13} lineHeight={18} color={colors.inkMuted} numberOfLines={2}>{detail}</AppText>
      </View>
    </Pressable>
  );
}
