import { motion } from 'motion/react'
import { Button } from '../../components/Button'
import { Postcard } from '../../components/Postcard'
import { Scene } from '../../components/Scene'
import { useI18n } from '../../i18n/useI18n'
import { roundOutcome, type Outcome } from '../../lib/outcome'
import { seatInk } from '../../lib/seatColors'
import { useGameStore } from '../../store/useGameStore'

/** Stamp colors per outcome; class names written out so Tailwind keeps them. */
const stampStyles: Record<Outcome, string> = {
  caught: 'border-pink text-pink',
  escaped: 'border-blue text-blue',
  closed: 'border-ink text-ink',
}

/** End-of-round reveal: the real postcard turns up, and the spy's seat is stamped on it. */
export function Verdict(): React.JSX.Element | null {
  const { m, locationName } = useI18n()
  const round = useGameStore((s) => s.round)
  const votes = useGameStore((s) => s.votes)
  const reset = useGameStore((s) => s.reset)
  if (!round) return null
  const spyCount = round.spySeats.length
  const outcome = roundOutcome(votes, round.spySeats)

  return (
    <section className="flex flex-col gap-6" aria-label={m.verdict.resultAria}>
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
                    <li key={s} className={`display rounded-lg border-[3px] border-dashed border-ink px-3 py-1 text-3xl ${ink.bg} ${ink.fg}`}>
                      {m.common.player(s + 1)}
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
