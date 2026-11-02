import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from './AppText';
import { Icon } from './Icon';
import { IconButton } from './IconButton';
import { useTheme } from '../theme/useTheme';

export function TripDetailHeader({ title, subtitle, onBack, onInvite }: { title: string; subtitle: string; onBack: () => void; onInvite: () => void }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top + 4, paddingLeft: 4, paddingRight: 16, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
      <Pressable accessibilityRole="button" accessibilityLabel="Back to Trips" onPress={onBack} style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="back" color={colors.ink} />
      </Pressable>
      <View style={{ flex: 1, gap: 1 }}>
        <AppText size={24} weight="bold" accessibilityRole="header">{title}</AppText>
        <AppText size={14} color={colors.inkMuted}>{subtitle}</AppText>
      </View>
      <IconButton icon="invite" label="Invite family" onPress={onInvite} />
    </View>
  );
}
