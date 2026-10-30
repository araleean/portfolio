import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import { EditPlanSheet } from './src/components/EditPlanSheet';
import { PlanStartSheet, type StartMode } from './src/components/PlanStartSheet';
import { TAB_BAR_SPACE, TabBar, type TabId } from './src/components/TabBar';
import { Toast } from './src/components/Toast';
import { ME, sampleTrip } from './src/data/sampleTrip';
import { addDays, formatDay, formatRange, todayIso, tripLength } from './src/lib/dates';
import { draftItinerary } from './src/lib/draftItinerary';
import { displayName } from './src/lib/people';
import { deletePlan, savePlan, setItinerary, type PlanRef } from './src/lib/tripActions';
import { DraftScreen } from './src/screens/DraftScreen';
import { ExpensesScreen, FlightsScreen, StaysScreen } from './src/screens/BookingsScreen';
import { ItineraryScreen } from './src/screens/ItineraryScreen';
import { OverviewScreen } from './src/screens/OverviewScreen';
import { PreferencesScreen } from './src/screens/PreferencesScreen';
import { FONT_FILES } from './src/theme/fonts';
import { useTheme } from './src/theme/useTheme';
import type { DraftPreferences, Trip } from './src/types';

type Route = 'tabs' | 'preferences' | 'draft';

export default function App() {
  const [fontsLoaded] = useFonts(FONT_FILES);
  return (
    <SafeAreaProvider>
      {fontsLoaded ? <Flock /> : null}
    </SafeAreaProvider>
  );
}

function Flock() {
  const { colors, dark } = useTheme();
  const insets = useSafeAreaInsets();
  const [trip, setTrip] = useState<Trip>(() => sampleTrip());
  const [route, setRoute] = useState<Route>('tabs');
  const [tab, setTab] = useState<TabId>('overview');
  const [dayIndex, setDayIndex] = useState(0);
  const [startSheet, setStartSheet] = useState(false);
  const [prefs, setPrefs] = useState<DraftPreferences>({ styles: ['relaxed', 'family'], pace: 'balanced', mustDos: [] });
  const [shuffle, setShuffle] = useState(0);
  const [editing, setEditing] = useState<PlanRef | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const dayCount = tripLength(trip.startDate, trip.endDate);
  const draftFor = (p: DraftPreferences, s: number) => draftItinerary({
    ...p, destination: trip.destination, startDate: trip.startDate, dayCount,
    flights: trip.flights, stays: trip.stays, author: ME, shuffle: s,
  });
  const draft = useMemo(() => (route === 'draft' ? draftFor(prefs, shuffle) : []), [route, prefs, shuffle, trip]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const others = trip.members.filter((m) => m.id !== ME).map((m) => displayName(trip.members, m.id, ME));
  const shareNote = `${others.slice(0, -1).join(', ')} and ${others[others.length - 1]} can see it.`;

  const addItinerary = (days: typeof draft) => {
    setTrip(setItinerary(trip, days, ME, Date.now()));
    setRoute('tabs');
    setTab('itinerary');
    setDayIndex(days.length > 1 ? 1 : 0);
    setToast(`Itinerary added. ${shareNote}`);
  };

  const startPlanning = (mode: StartMode) => {
    setStartSheet(false);
    if (mode === 'blank') addItinerary(draftFor({ styles: [], pace: 'balanced', mustDos: [] }, 0));
    else setRoute('preferences');
  };

  const editingDay = editing ? trip.days[editing.dayIndex] : null;
  const editingPlan = editing && editingDay && editing.index >= 0 ? editingDay.slots[editing.slot][editing.index] : null;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar style={dark ? 'light' : 'dark'} />

      {route === 'preferences' ? (
        <PreferencesScreen prefs={prefs} onChange={setPrefs} onClose={() => setRoute('tabs')} onDraft={() => { setShuffle(0); setRoute('draft'); }} />
      ) : null}

      {route === 'draft' ? (
        <DraftScreen days={draft} startDate={trip.startDate} prefs={prefs} onBack={() => setRoute('preferences')} onShuffle={() => setShuffle(shuffle + 1)} onAdd={() => addItinerary(draft)} />
      ) : null}

      {route === 'tabs' ? (
        <>
          {tab === 'overview' ? (
            <OverviewScreen trip={trip} me={ME} today={todayIso()} now={Date.now()} onPlan={() => setStartSheet(true)} onOpenTab={setTab} />
          ) : null}
          {tab === 'flights' ? <FlightsScreen trip={trip} me={ME} /> : null}
          {tab === 'stays' ? <StaysScreen trip={trip} me={ME} /> : null}
          {tab === 'itinerary' ? (
            <ItineraryScreen trip={trip} me={ME} dayIndex={dayIndex} onSelectDay={setDayIndex} onPlan={() => setStartSheet(true)} onOpenPlan={setEditing} />
          ) : null}
          {tab === 'expenses' ? <ExpensesScreen trip={trip} /> : null}
          {toast ? <Toast message={toast} bottom={TAB_BAR_SPACE + Math.max(insets.bottom, 12) + 12} /> : null}
          <TabBar active={tab} onChange={setTab} />
        </>
      ) : null}

      <PlanStartSheet
        visible={startSheet}
        subtitle={`${dayCount} days in ${trip.destination} · ${formatRange(trip.startDate, trip.endDate)}`}
        onClose={() => setStartSheet(false)}
        onContinue={startPlanning}
      />

      <EditPlanSheet
        visible={!!editing}
        dayLabel={editing ? formatDay(addDays(trip.startDate, editing.dayIndex)) : ''}
        slot={editing?.slot ?? 'morning'}
        activity={editingPlan}
        members={trip.members}
        me={ME}
        onClose={() => setEditing(null)}
        onSave={(changes) => {
          if (!editing) return;
          setTrip(savePlan(trip, editing, changes, ME, Date.now()));
          setEditing(null);
        }}
        onDelete={() => {
          if (!editing) return;
          setTrip(deletePlan(trip, editing, ME, Date.now()));
          setEditing(null);
        }}
      />
    </View>
  );
}
