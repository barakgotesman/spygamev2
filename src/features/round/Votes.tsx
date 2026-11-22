import { Minus, Plus } from 'lucide-react'
import { IconButton } from '../../components/IconButton'
import { usePlayerName } from '../../hooks/usePlayerName'
import { useI18n } from '../../i18n/useI18n'
import { seatInk, seatNumber } from '../../lib/seatColors'
import { useGameStore } from '../../store/useGameStore'
import { Tally } from './Tally'

export function Votes(): React.JSX.Element {
  const { m } = useI18n()
  const label = usePlayerName()
  const votes = useGameStore((s) => s.votes)
  const players = useGameStore((s) => s.config.players)
  const vote = useGameStore((s) => s.vote)
  const left = players - votes.reduce((a, b) => a + b, 0)

  return (
    <section aria-label={m.round.votesAria} className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <h2 className="display text-3xl">{m.round.theVote}</h2>
        <p className="print text-sm">{m.round.ballotsLeft(left)}</p>
      </div>
      <ul className="flex flex-col gap-2.5">
        {votes.map((count, seat) => {
          const ink = seatInk(seat)
          return (
            <li key={seat} className="flex items-center gap-3 rounded-xl border-[3px] border-ink bg-card p-2 pe-3 shadow-hard">
              <span dir="ltr" className={`display grid size-14 shrink-0 place-items-center rounded-lg border-[3px] border-dashed border-ink text-2xl ${ink.bg} ${ink.fg}`}>
                {seatNumber(seat)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold">
                  <bdi>{label(seat)}</bdi>
                </p>
                <Tally count={count} />
              </div>
              <div dir="ltr" className="flex items-center gap-3">
                <IconButton label={m.round.removeVote(label(seat))} onClick={() => vote(seat, -1)} disabled={count === 0} className="size-11">
                  <Minus className="size-5" strokeWidth={3} aria-hidden />
                </IconButton>
                <IconButton label={m.round.addVote(label(seat))} onClick={() => vote(seat, 1)} disabled={left === 0} tone="ink" className="size-14">
                  <Plus className="size-6" strokeWidth={3} aria-hidden />
                </IconButton>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
