import { VenetianMask } from 'lucide-react'
import { Button } from '../../components/Button'
import { LocationIcon } from '../../components/LocationIcon'
import { useGameStore } from '../../store/useGameStore'

/** End-of-round reveal: who the spies were and what the location was. */
export function Verdict(): React.JSX.Element | null {
  const round = useGameStore((s) => s.round)
  const reset = useGameStore((s) => s.reset)
  if (!round) return null

  return (
    <section className="flex flex-col gap-5" aria-label="Round result">
      <div className="flex flex-col gap-4 rounded-3xl bg-signal p-6 text-signal-ink">
        <VenetianMask className="size-12" aria-hidden />
        <p className="display text-6xl">
          {round.spySeats.length > 1 ? 'The spies were' : 'The spy was'}
        </p>
        <p className="display tabular text-5xl">{round.spySeats.map((s) => `Player ${s + 1}`).join(' · ')}</p>
      </div>
      <div className="flex items-center gap-4 rounded-2xl bg-surface p-5">
        <LocationIcon name={round.location.icon} className="size-10 shrink-0 text-signal" />
        <div>
          <p className="text-base text-muted">The location was</p>
          <p className="display text-4xl">{round.location.name}</p>
        </div>
      </div>
      <Button variant="primary" className="min-h-16 text-xl" onClick={reset}>
        New game
      </Button>
    </section>
  )
}
