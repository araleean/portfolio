import { ScrollView, Share, View } from 'react-native';

import { TabBarSpacer } from '../components/AppTabBar';
import { SectionTabs, type TripSection } from '../components/SectionTabs';
import { TripDetailHeader } from '../components/TripDetailHeader';
import { countdownText } from '../lib/countdown';
import { daysUntil, formatRange } from '../lib/dates';
import type { PlanRef } from '../lib/tripActions';
import { useTheme } from '../theme/useTheme';
import type { Trip } from '../types';
import { BookingsSection } from './trip/BookingsSection';
import { FamilySection } from './trip/FamilySection';
import { MoneySection } from './trip/MoneySection';
import { PlanSection } from './trip/PlanSection';

interface Props {
  trip: Trip;
  me: string;
  today: string;
  now: number;
  section: TripSection;
  dayIndex: number;
  onScroll: (e: { nativeEvent: { contentOffset: { y: number } } }) => void;
  onBack: () => void;
  onSection: (s: TripSection) => void;
  onSelectDay: (i: number) => void;
  onPlan: () => void;
  onOpenPlan: (ref: PlanRef) => void;
  onSoon: (what: string) => void;
}

// Opens the phone's share sheet with an invite to the trip. Browsers without it get the coming-later note.
async function shareTrip(destination: string, onSoon: (what: string) => void) {
  try {
    await Share.share({ message: `Join our ${destination} trip on Outbound so you can see the plans and add your own.` });
  } catch {
    onSoon('Sharing from the browser');
  }
}

export function TripScreen({ trip, me, today, now, section, dayIndex, onScroll, onBack, onSection, onSelectDay, onPlan, onOpenPlan, onSoon }: Props) {
  const { colors } = useTheme();
  return (
    <ScrollView onScroll={onScroll} scrollEventThrottle={16} stickyHeaderIndices={[1]}>
      <TripDetailHeader
        title={trip.destination}
        subtitle={`${formatRange(trip.startDate, trip.endDate)} · ${countdownText(daysUntil(today, trip.startDate))}`}
        onBack={onBack}
        onShare={() => shareTrip(trip.destination, onSoon)}
      />
      <View style={{ paddingTop: 8, paddingBottom: 14, backgroundColor: colors.bg }}>
        <SectionTabs active={section} onChange={onSection} />
      </View>
      <View style={{ paddingTop: 4 }}>
        {section === 'plan' ? <PlanSection trip={trip} me={me} dayIndex={dayIndex} onSelectDay={onSelectDay} onPlan={onPlan} onOpenPlan={onOpenPlan} /> : null}
        {section === 'bookings' ? <BookingsSection trip={trip} me={me} onAdd={() => onSoon('Adding bookings')} /> : null}
        {section === 'money' ? <MoneySection trip={trip} me={me} onAdd={() => onSoon('Adding expenses')} /> : null}
        {section === 'family' ? <FamilySection trip={trip} me={me} now={now} onInvite={() => onSoon('Invites')} /> : null}
      </View>
      <TabBarSpacer />
    </ScrollView>
  );
}
