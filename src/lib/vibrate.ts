/** Haptic feedback where supported (Android Chrome); silently ignored elsewhere. */
export function vibrate(pattern: number | number[]): void {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) navigator.vibrate(pattern)
}
