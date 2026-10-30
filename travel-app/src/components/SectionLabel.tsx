import { AppText } from './AppText';
import { useTheme } from '../theme/useTheme';

export function SectionLabel({ children }: { children: string }) {
  const { colors } = useTheme();
  return (
    <AppText size={13} weight="bold" color={colors.inkMuted} style={{ letterSpacing: 0.8, textTransform: 'uppercase' }}>
      {children}
    </AppText>
  );
}
