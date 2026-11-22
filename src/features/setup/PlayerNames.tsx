import { ChevronDown } from 'lucide-react'
import { useI18n } from '../../i18n/useI18n'
import { seatInk } from '../../lib/seatColors'
import { MAX_NAME_LENGTH, useGameStore } from '../../store/useGameStore'

/** Optional names, folded away by default so the common "just play" path stays two taps. */
export function PlayerNames(): React.JSX.Element {
  const { m, dir } = useI18n()
  const players = useGameStore((s) => s.config.players)
  const names = useGameStore((s) => s.names)
  const setName = useGameStore((s) => s.setName)
  // Only seats still in play; unnamed ones read "Player N", as they will in the game.
  const seats = Array.from({ length: players }, (_, seat) => names[seat]?.trim() || m.common.player(seat + 1))
  const anyTyped = names.slice(0, players).some((n) => n.trim())

  return (
    <details className="group">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
        <span className="min-w-0">
          <span className="block text-xl leading-tight font-bold">{m.setup.namesTitle}</span>
          <span className="print block truncate text-[0.7rem] opacity-70">
            <bdi>{anyTyped ? seats.join(', ') : m.setup.namesHint}</bdi>
          </span>
        </span>
        <ChevronDown aria-hidden className="size-6 shrink-0 transition-transform duration-150 group-open:rotate-180" strokeWidth={3} />
      </summary>
      <ul className="mt-3 flex max-h-64 flex-col gap-2 overflow-y-auto pe-1 pb-1">
        {Array.from({ length: players }, (_, seat) => {
          const ink = seatInk(seat)
          return (
            <li key={seat} className="flex items-center gap-3">
              <span aria-hidden dir="ltr" className={`display grid size-11 shrink-0 place-items-center rounded-lg border-[3px] border-dashed border-ink text-lg ${ink.bg} ${ink.fg}`}>
                {seat + 1}
              </span>
              <input
                type="text"
                // An empty field has no text to detect from, so it follows the page; typed text picks its own direction.
                dir={names[seat] ? 'auto' : dir}
                enterKeyHint="next"
                autoComplete="off"
                maxLength={MAX_NAME_LENGTH}
                aria-label={m.setup.nameLabel(seat + 1)}
                placeholder={m.common.player(seat + 1)}
                value={names[seat] ?? ''}
                onChange={(e) => setName(seat, e.target.value)}
                className="min-h-11 min-w-0 flex-1 rounded-lg border-[3px] border-ink bg-paper px-3 text-base font-semibold placeholder:font-normal placeholder:text-ink/45"
              />
            </li>
          )
        })}
      </ul>
    </details>
  )
}
