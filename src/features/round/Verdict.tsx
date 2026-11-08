import { motion } from 'motion/react'
import { Button } from '../../components/Button'
import { LocationIcon } from '../../components/LocationIcon'
import { Ticket } from '../../components/Ticket'
import { seatNumber } from '../../lib/seatColors'
import { useGameStore } from '../../store/useGameStore'

/** End-of-round reveal: the spy's ticket gets stamped VOID, and the real location is shown. */
export function Verdict(): React.JSX.Element | null {
  const round = useGameStore((s) => s.round)
  const reset = useGameStore((s) => s.reset)
  if (!round) return null
  const plural = round.spySeats.length > 1

  return (
    <section className="flex flex-col gap-6" aria-label="Round result">
      <Ticket className="bg-paper text-ink rotate-1 [--stub:5.5rem]">
        <div className="relative flex flex-col gap-3 px-6 pt-6 pb-8">
          <p className="print text-base">{plural ? 'Void tickets' : 'Void ticket'}</p>
          <p className="display text-4xl">{plural ? 'The spies were' : 'The spy was'}</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {round.spySeats.map((s) => (
              <li key={s} className="display text-6xl">
                No.{seatNumber(s)}
              </li>
            ))}
          </ul>
          <motion.p
            initial={{ scale: 2.6, rotate: -2, opacity: 0 }}
            animate={{ scale: 1, rotate: -12, opacity: 0.92 }}
            transition={{ type: 'spring', stiffness: 380, damping: 18, delay: 0.25 }}
            className="display pointer-events-none absolute top-4 right-3 rounded-xl border-[5px] border-double border-raffle px-3 py-1 text-5xl text-raffle"
            aria-hidden
          >
            Void
          </motion.p>
        </div>
        <div className="flex h-[var(--stub)] items-center gap-4 px-6">
          <LocationIcon name={round.location.icon} className="size-10 shrink-0" strokeWidth={1.75} />
          <div className="min-w-0">
            <p className="print text-xs">The ticket was to</p>
            <p className="display text-2xl [overflow-wrap:anywhere]">{round.location.name}</p>
          </div>
        </div>
      </Ticket>
      <Button variant="ink" className="min-h-16 text-lg" onClick={reset}>
        New game
      </Button>
    </section>
  )
}
