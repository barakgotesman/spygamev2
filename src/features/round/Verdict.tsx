import { motion } from 'motion/react'
import { Button } from '../../components/Button'
import { Postcard } from '../../components/Postcard'
import { Scene } from '../../components/Scene'
import { usePlayerName } from '../../hooks/usePlayerName'
import { useI18n } from '../../i18n/useI18n'
import { accusedSeats, roundOutcome, type Outcome } from '../../lib/outcome'
import { seatInk } from '../../lib/seatColors'
import { useGameStore } from '../../store/useGameStore'

/** Stamp colors per outcome; class names written out so Tailwind keeps them. */
const stampStyles: Record<Outcome, string> = {
  caught: 'border-pink text-pink',
  escaped: 'border-blue text-blue',
  closed: 'border-ink text-ink',
}

const callStyles: Record<Outcome, string> = {
  caught: 'bg-teal',
  escaped: 'bg-pink text-paper',
  closed: 'bg-card',
}

/** End-of-round reveal: the real postcard turns up, and the spy's seat is stamped on it. */
export function Verdict(): React.JSX.Element | null {
  const { m, locationName } = useI18n()
  const label = usePlayerName()
  const round = useGameStore((s) => s.round)
  const votes = useGameStore((s) => s.votes)
  const reset = useGameStore((s) => s.reset)
  if (!round) return null
  const spyCount = round.spySeats.length
  const outcome = roundOutcome(votes, round.spySeats)
  const names = (seats: readonly number[]): string => seats.map((s) => label(s)).join(', ')
  const accused = names(accusedSeats(votes, spyCount))
  const body =
    outcome === 'caught'
      ? m.verdict.caughtBody(accused)
      : outcome === 'escaped'
        ? m.verdict.escapedBody(accused, names(round.spySeats), spyCount)
        : m.verdict.closedBody

  return (
    <section className="flex flex-col gap-6" aria-label={m.verdict.resultAria}>
      <div role="status" className={`rounded-2xl border-[3px] border-ink p-4 shadow-hard ${callStyles[outcome]}`}>
        <h2 className="display text-3xl">{m.verdict.call[outcome]}</h2>
        <p className="mt-1 text-lg leading-snug">{body}</p>
      </div>
      <motion.div initial={{ y: 60, rotate: 4, opacity: 0 }} animate={{ y: 0, rotate: -1.5, opacity: 1 }} transition={{ type: 'spring', stiffness: 220, damping: 20 }}>
        <Postcard>
          <div className="relative border-b-[3px] border-ink">
            <Scene location={round.location} className="aspect-[4/3] w-full" />
            <motion.p
              initial={{ scale: 2.6, rotate: 0, opacity: 0 }}
              animate={{ scale: 1, rotate: 9, opacity: 0.95 }}
              transition={{ type: 'spring', stiffness: 380, damping: 18, delay: 0.35 }}
              className={`display absolute end-3 bottom-3 rounded-lg border-[4px] border-double ${stampStyles[outcome]} bg-card/85 px-3 py-1 text-3xl`}
              aria-hidden
            >
              {m.verdict.stamps[outcome]}
            </motion.p>
          </div>
          <div className="flex flex-col gap-3 px-4 py-4">
            <div>
              <p className="print text-[0.7rem]">{m.common.wishYouWereHere}</p>
              <p className="display text-3xl [overflow-wrap:anywhere]"><bdi>{locationName(round.location)}</bdi></p>
            </div>
            <hr className="border-t-[3px] border-dashed border-ink/30" />
            <div>
              <p className="print text-[0.7rem]">{m.verdict.spiesAre(spyCount)}</p>
              <ul className="mt-1 flex flex-wrap gap-2">
                {round.spySeats.map((s) => {
                  const ink = seatInk(s)
                  return (
                    <li key={s} className={`display rounded-lg border-[3px] border-dashed border-ink px-3 py-1 text-3xl [overflow-wrap:anywhere] ${ink.bg} ${ink.fg}`}>
                      <bdi>{label(s)}</bdi>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </Postcard>
      </motion.div>
      <Button variant="pink" className="min-h-16 text-lg" onClick={reset}>
        {m.verdict.newGame}
      </Button>
    </section>
  )
}
