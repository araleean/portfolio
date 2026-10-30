import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from './AppText';
import { Icon } from './Icon';
import { useTheme } from '../theme/useTheme';

// Top bar for the two planning steps: close or back, progress dots, "1 of 2".
export function StepHeader({ step, total, onBack, backIsClose }: { step: number; total: number; onBack: () => void; backIsClose?: boolean }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top + 4, paddingHorizontal: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Pressable accessibilityRole="button" accessibilityLabel={backIsClose ? 'Close' : 'Back'} onPress={onBack} style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={backIsClose ? 'close' : 'back'} color={colors.ink} />
      </Pressable>
      <View accessibilityLabel={`Step ${step} of ${total}`} style={{ flexDirection: 'row', gap: 6 }}>
        {Array.from({ length: total }, (_, i) => (
          <View key={i} style={{ width: i + 1 === step ? 24 : 8, height: 8, borderRadius: 4, backgroundColor: i + 1 <= step ? colors.ink : colors.line }} />
        ))}
      </View>
      <AppText size={14} color={colors.inkMuted} style={{ width: 44, textAlign: 'right', marginRight: 8 }}>{`${step} of ${total}`}</AppText>
    </View>
  );
}
