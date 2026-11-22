import { useI18n } from '../i18n/useI18n'
import { useGameStore } from '../store/useGameStore'

/** Label for a 0-based seat: the typed name, or "Player N" when none was given. */
export function usePlayerName(): (seat: number) => string {
  const { m } = useI18n()
  const names = useGameStore((s) => s.names)
  return (seat) => names[seat]?.trim() || m.common.player(seat + 1)
}
