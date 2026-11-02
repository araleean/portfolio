export function countdownText(days: number): string {
  if (days > 1) return `${days} days to go`;
  if (days === 1) return 'Tomorrow!';
  if (days === 0) return 'Today!';
  return 'Trip underway';
}
