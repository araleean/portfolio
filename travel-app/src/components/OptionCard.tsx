import { Pressable, View } from 'react-native';

import { AppText } from './AppText';
import { Icon, type IconName } from './Icon';
import { radius } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';

// A large single-choice card: icon, title, explanation and a radio mark.
export function OptionCard({ title, detail, icon, selected, onPress }: { title: string; detail: string; icon: IconName; selected: boolean; onPress: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      onPress={onPress}
      style={{
        borderWidth: selected ? 2 : 1.5, borderColor: selected ? colors.ink : colors.lineStrong, borderRadius: radius.md,
        backgroundColor: selected ? colors.soft : colors.bg, padding: 16, flexDirection: 'row', alignItems: 'flex-start', gap: 12,
      }}
    >
      <View style={{ width: 40, height: 40, borderRadius: 14, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={icon} color={colors.ink} />
      </View>
      <View style={{ flex: 1, gap: 4 }}>
        <AppText size={17} weight="bold" color={selected ? colors.onSoft : colors.ink}>{title}</AppText>
        <AppText size={14} lineHeight={20} color={colors.inkMuted}>{detail}</AppText>
      </View>
      <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: selected ? 0 : 1.5, borderColor: colors.lineStrong, backgroundColor: selected ? colors.ink : 'transparent', alignItems: 'center', justifyContent: 'center' }}>
        {selected ? <Icon name="check" size={14} color={colors.bg} strokeWidth={3} /> : null}
      </View>
    </Pressable>
  );
}
