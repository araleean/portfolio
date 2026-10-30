import { Pressable, View } from 'react-native';

import { AppText } from './AppText';
import { useTheme } from '../theme/useTheme';

export function Segmented<T extends string>({ options, value, onChange, label }: { options: { id: T; label: string }[]; value: T; onChange: (v: T) => void; label: string }) {
  const { colors } = useTheme();
  return (
    <View accessibilityRole="radiogroup" accessibilityLabel={label} style={{ flexDirection: 'row', gap: 4, padding: 4, borderRadius: 18, backgroundColor: colors.surface }}>
      {options.map((o) => {
        const on = o.id === value;
        return (
          <Pressable
            key={o.id}
            accessibilityRole="radio"
            accessibilityState={{ checked: on }}
            onPress={() => onChange(o.id)}
            style={{ flex: 1, height: 40, borderRadius: 14, backgroundColor: on ? colors.bg : 'transparent', alignItems: 'center', justifyContent: 'center', borderWidth: on ? 1 : 0, borderColor: colors.line }}
          >
            <AppText size={15} weight={on ? 'bold' : 'medium'} color={on ? colors.ink : colors.inkMuted}>{o.label}</AppText>
          </Pressable>
        );
      })}
    </View>
  );
}
