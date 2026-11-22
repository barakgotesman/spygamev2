import { motion } from 'motion/react'
import { Button } from '../../components/Button'
import { Postcard } from '../../components/Postcard'
import { Scene } from '../../components/Scene'
import { seatInk } from '../../lib/seatColors'
import { useGameStore } from '../../store/useGameStore'

/** End-of-round reveal: the real postcard turns up, and the spy's seat is stamped on it. */
export function Verdict(): React.JSX.Element | null {
  const round = useGameStore((s) => s.round)
  const reset = useGameStore((s) => s.reset)
  if (!round) return null
  const plural = round.spySeats.length > 1

  return (
    <section className="flex flex-col gap-6" aria-label="Round result">
      <motion.div initial={{ y: 60, rotate: 4, opacity: 0 }} animate={{ y: 0, rotate: -1.5, opacity: 1 }} transition={{ type: 'spring', stiffness: 220, damping: 20 }}>
        <Postcard>
          <div className="relative border-b-[3px] border-ink">
            <Scene location={round.location} className="aspect-[4/3] w-full" />
            <motion.p
              initial={{ scale: 2.6, rotate: 0, opacity: 0 }}
              animate={{ scale: 1, rotate: 9, opacity: 0.95 }}
              transition={{ type: 'spring', stiffness: 380, damping: 18, delay: 0.35 }}
              className="display absolute right-3 bottom-3 rounded-lg border-[4px] border-double border-pink bg-card/85 px-3 py-1 text-3xl text-pink"
              aria-hidden
            >
              Caught
            </motion.p>
          </div>
          <div className="flex flex-col gap-3 px-4 py-4">
            <div>
              <p className="print text-[0.7rem]">Wish you were here</p>
              <p className="display text-3xl [overflow-wrap:anywhere]">{round.location.name}</p>
            </div>
            <hr className="border-t-[3px] border-dashed border-ink/30" />
            <div>
              <p className="print text-[0.7rem]">{plural ? 'The spies were' : 'The spy was'}</p>
              <ul className="mt-1 flex flex-wrap gap-2">
                {round.spySeats.map((s) => {
                  const ink = seatInk(s)
                  return (
                    <li key={s} className={`display rounded-lg border-[3px] border-dashed border-ink px-3 py-1 text-3xl ${ink.bg} ${ink.fg}`}>
                      Player {s + 1}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </Postcard>
      </motion.div>
      <Button variant="pink" className="min-h-16 text-lg" onClick={reset}>
        New game
      </Button>
    </section>
  )
}
