import { Minus, Plus } from 'lucide-react'
import { IconButton } from '../../components/IconButton'
import { seatInk, seatNumber } from '../../lib/seatColors'
import { useGameStore } from '../../store/useGameStore'
import { Tally } from './Tally'

export function Votes(): React.JSX.Element {
  const votes = useGameStore((s) => s.votes)
  const players = useGameStore((s) => s.config.players)
  const vote = useGameStore((s) => s.vote)
  const left = players - votes.reduce((a, b) => a + b, 0)

  return (
    <section aria-label="Votes" className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <h2 className="display text-3xl">The vote</h2>
        <p className="print text-sm">{left} ballots left</p>
      </div>
      <ul className="flex flex-col gap-2.5">
        {votes.map((count, seat) => {
          const ink = seatInk(seat)
          return (
            <li key={seat} className="flex items-center gap-3 rounded-xl border-[3px] border-ink bg-card p-2 pr-3 shadow-hard">
              <span className={`display grid size-14 shrink-0 place-items-center rounded-lg border-[3px] border-dashed border-ink text-2xl ${ink.bg} ${ink.fg}`}>
                {seatNumber(seat)}
              </span>
              <div className="min-w-0 flex-1">
                <Tally count={count} />
              </div>
              <IconButton label={`Remove vote from player ${seat + 1}`} onClick={() => vote(seat, -1)} disabled={count === 0} className="size-11">
                <Minus className="size-5" strokeWidth={3} aria-hidden />
              </IconButton>
              <IconButton label={`Add vote to player ${seat + 1}`} onClick={() => vote(seat, 1)} disabled={left === 0} tone="ink" className="size-14">
                <Plus className="size-6" strokeWidth={3} aria-hidden />
              </IconButton>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
