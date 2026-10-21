let counter = 0;

// Unique enough for local data; avoids relying on crypto.randomUUID,
// which isn't available on every React Native runtime.
export function createId(): string {
  counter += 1;
  return `${Date.now().toString(36)}-${counter.toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
