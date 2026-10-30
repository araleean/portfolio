import { useState } from 'react';
import { View } from 'react-native';

import { BottomSheet } from './BottomSheet';
import { Button } from './Button';
import { OptionCard } from './OptionCard';

export type StartMode = 'ideas' | 'blank';

interface Props {
  visible: boolean;
  subtitle: string;
  onClose: () => void;
  onContinue: (mode: StartMode) => void;
}

export function PlanStartSheet({ visible, subtitle, onClose, onContinue }: Props) {
  const [mode, setMode] = useState<StartMode>('ideas');
  return (
    <BottomSheet
      visible={visible}
      title="Plan your days"
      subtitle={subtitle}
      onClose={onClose}
      footer={<Button label="Continue" onPress={() => onContinue(mode)} />}
    >
      <View accessibilityRole="radiogroup" style={{ gap: 10 }}>
        <OptionCard
          icon="spark"
          title="Start with ideas"
          detail="A draft for each morning, afternoon and evening, based on what your family likes. Good for somewhere new."
          selected={mode === 'ideas'}
          onPress={() => setMode('ideas')}
        />
        <OptionCard
          icon="pencil"
          title="Start blank"
          detail="You know the place. Your flights and check-in go in, and you add the rest day by day."
          selected={mode === 'blank'}
          onPress={() => setMode('blank')}
        />
      </View>
    </BottomSheet>
  );
}
