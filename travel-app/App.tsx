import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import { APP_TAB_BAR_SPACE, AppTabBar, type AppTab, useCollapsingTabBar } from './src/components/AppTabBar';
import { EditPlanSheet } from './src/components/EditPlanSheet';
import { PlanStartSheet, type StartMode } from './src/components/PlanStartSheet';
import type { TripSection } from './src/components/SectionTabs';
import { Toast } from './src/components/Toast';
import { EXPLORE_IDEAS, type ExploreIdea } from './src/data/exploreIdeas';
import { ME, OTHER_TRIPS, sampleTrip } from './src/data/sampleTrip';
import { addDays, formatDay, formatRange, todayIso, tripLength } from './src/lib/dates';
import { draftItinerary } from './src/lib/draftItinerary';
import { displayName } from './src/lib/people';
import { deletePlan, savePlan, setItinerary, type PlanRef } from './src/lib/tripActions';
import { DraftScreen } from './src/screens/DraftScreen';
import { ExploreIdeaScreen } from './src/screens/ExploreIdeaScreen';
import { ExploreScreen } from './src/screens/ExploreScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { PreferencesScreen } from './src/screens/PreferencesScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { TripScreen } from './src/screens/TripScreen';
import { TripsScreen } from './src/screens/TripsScreen';
import { FONT_FILES } from './src/theme/fonts';
import { useTheme } from './src/theme/useTheme';
import type { DraftPreferences, Trip } from './src/types';

// Screens shown over the tabs. 'trip' keeps the tab bar (on Trips); the rest are full screen.
type Route = { name: 'tabs' } | { name: 'trip' } | { name: 'idea'; id: string } | { name: 'preferences' } | { name: 'draft' };

export default function App() {
  const [fontsLoaded] = useFonts(FONT_FILES);
  return (
    <SafeAreaProvider>
      {fontsLoaded ? <Outbound /> : null}
    </SafeAreaProvider>
  );
}

function Outbound() {
  const { colors, dark } = useTheme();
  const insets = useSafeAreaInsets();
  const tabBar = useCollapsingTabBar();
  const [trip, setTrip] = useState<Trip>(() => sampleTrip());
  const [tab, setTab] = useState<AppTab>('home');
  const [route, setRoute] = useState<Route>({ name: 'tabs' });
  const [section, setSection] = useState<TripSection>('plan');
  const [dayIndex, setDayIndex] = useState(0);
  const [startSheet, setStartSheet] = useState(false);
  const [prefs, setPrefs] = useState<DraftPreferences>({ styles: ['relaxed', 'family'], pace: 'balanced', mustDos: [] });
  const [shuffle, setShuffle] = useState(0);
  const [editing, setEditing] = useState<PlanRef | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const today = todayIso();
  const now = Date.now();
  const dayCount = tripLength(trip.startDate, trip.endDate);
  const draftFor = (p: DraftPreferences, s: number) => draftItinerary({
    ...p, destination: trip.destination, startDate: trip.startDate, dayCount,
    flights: trip.flights, stays: trip.stays, author: ME, shuffle: s,
  });
  const draft = useMemo(() => (route.name === 'draft' ? draftFor(prefs, shuffle) : []), [route, prefs, shuffle, trip]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const go = (next: Route) => {
    tabBar.reset();
    setRoute(next);
  };
  const switchTab = (next: AppTab) => {
    setTab(next);
    go({ name: 'tabs' });
  };
  const openTrip = (s: TripSection = 'plan') => {
    setTab('trips');
    setSection(s);
    go({ name: 'trip' });
  };
  const soon = (what: string) => setToast(`${what} ${what.endsWith('s') ? 'come' : 'comes'} in a later version.`);

  const others = trip.members.filter((m) => m.id !== ME).map((m) => displayName(trip.members, m.id, ME));
  const shareNote = `${others.slice(0, -1).join(', ')} and ${others[others.length - 1]} can see it.`;

  const addItinerary = (days: typeof draft) => {
    setTrip(setItinerary(trip, days, ME, Date.now()));
    setDayIndex(days.length > 1 ? 1 : 0);
    openTrip('plan');
    setToast(`Itinerary added. ${shareNote}`);
  };

  const startPlanning = (mode: StartMode) => {
    setStartSheet(false);
    if (mode === 'blank') addItinerary(draftFor({ styles: [], pace: 'balanced', mustDos: [] }, 0));
    else go({ name: 'preferences' });
  };

  const useIdea = (idea: ExploreIdea) => {
    setPrefs({ ...prefs, styles: idea.styles, pace: idea.pace });
    setShuffle(0);
    go({ name: 'draft' });
  };

  const editingDay = editing ? trip.days[editing.dayIndex] : null;
  const editingPlan = editing && editingDay && editing.index >= 0 ? editingDay.slots[editing.slot][editing.index] : null;
  const showTabBar = route.name === 'tabs' || route.name === 'trip';
  const idea = route.name === 'idea' ? EXPLORE_IDEAS.find((i) => i.id === route.id) : undefined;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar style={dark ? 'light' : 'dark'} />

      {route.name === 'tabs' && tab === 'home' ? (
        <HomeScreen
          trip={trip} me={ME} today={today} now={now} onScroll={tabBar.onScroll}
          onOpenTrip={() => openTrip('plan')} onPlan={() => setStartSheet(true)}
          onOpenIdea={(i) => go({ name: 'idea', id: i.id })} onOpenTrips={() => switchTab('trips')}
          onOpenExplore={() => switchTab('explore')} onNotify={() => soon('Notifications')}
        />
      ) : null}
      {route.name === 'tabs' && tab === 'explore' ? (
        <ExploreScreen destination={trip.destination} onScroll={tabBar.onScroll} onOpenIdea={(i) => go({ name: 'idea', id: i.id })} onSoon={soon} />
      ) : null}
      {route.name === 'tabs' && tab === 'trips' ? (
        <TripsScreen trip={trip} today={today} onScroll={tabBar.onScroll} onOpenTrip={() => openTrip('plan')} onSoon={soon} />
      ) : null}
      {route.name === 'tabs' && tab === 'profile' ? (
        <ProfileScreen trip={trip} me={ME} tripCount={1 + OTHER_TRIPS.length} onScroll={tabBar.onScroll} onSoon={soon} />
      ) : null}

      {route.name === 'trip' ? (
        <TripScreen
          trip={trip} me={ME} today={today} now={now} section={section} dayIndex={dayIndex}
          onScroll={tabBar.onScroll} onBack={() => switchTab('trips')} onSection={setSection} onSelectDay={setDayIndex}
          onPlan={() => setStartSheet(true)} onOpenPlan={setEditing} onSoon={soon}
        />
      ) : null}

      {idea ? (
        <ExploreIdeaScreen
          idea={idea} tripName={trip.destination} onBack={() => switchTab('explore')}
          onSave={() => setToast('Saved to your ideas.')} onUse={() => useIdea(idea)}
        />
      ) : null}

      {route.name === 'preferences' ? (
        <PreferencesScreen prefs={prefs} onChange={setPrefs} onClose={() => go({ name: 'tabs' })} onDraft={() => { setShuffle(0); go({ name: 'draft' }); }} />
      ) : null}

      {route.name === 'draft' ? (
        <DraftScreen days={draft} startDate={trip.startDate} prefs={prefs} onBack={() => go({ name: 'preferences' })} onShuffle={() => setShuffle(shuffle + 1)} onAdd={() => addItinerary(draft)} />
      ) : null}

      {toast ? <Toast message={toast} bottom={(showTabBar ? APP_TAB_BAR_SPACE : 16) + Math.max(insets.bottom, 12) + 8} /> : null}
      {showTabBar ? <AppTabBar active={route.name === 'trip' ? 'trips' : tab} compact={tabBar.compact} onChange={switchTab} /> : null}

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
