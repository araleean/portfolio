import type { Activity, Member } from '../types';
import { SAMPLE_AUTHOR } from '../types';

export function findMember(members: Member[], id: string): Member | undefined {
  return members.find((m) => m.id === id);
}

// The person using the app is "You" (or "you" mid-sentence); everyone else by name.
export function displayName(members: Member[], id: string, me: string, midSentence = false): string {
  if (id === me) return midSentence ? 'you' : 'You';
  return findMember(members, id)?.name ?? 'Someone';
}

// "Added by Mom", "Sample suggestion · edited by you"
export function creditLine(members: Member[], a: Activity, me: string): string {
  const added = a.addedBy === SAMPLE_AUTHOR ? 'Sample suggestion' : `Added by ${displayName(members, a.addedBy, me, true)}`;
  if (a.editedBy && a.editedBy !== a.addedBy) return `${added} · edited by ${displayName(members, a.editedBy, me, true)}`;
  return added;
}

export function timeAgo(at: number, now: number): string {
  const min = Math.floor((now - at) / 60_000);
  if (min < 1) return 'Just now';
  if (min < 60) return `${min}m ago`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return d === 1 ? 'Yesterday' : `${d} days ago`;
}
