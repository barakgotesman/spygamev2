import { Minus, Plus } from 'lucide-react'
import { IconButton } from '../../components/IconButton'
import { useGameStore } from '../../store/useGameStore'

export function Votes(): React.JSX.Element {
  const votes = useGameStore((s) => s.votes)
  const players = useGameStore((s) => s.config.players)
  const vote = useGameStore((s) => s.vote)
  const left = players - votes.reduce((a, b) => a + b, 0)

  return (
    <section aria-label="Votes" className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <h2 className="display text-4xl">Votes</h2>
        <p className="text-base text-muted tabular">{left} left to cast</p>
      </div>
      <ul className="flex flex-col gap-2">
        {votes.map((count, seat) => (
          <li key={seat} className="flex items-center gap-3 rounded-2xl bg-surface p-3 pl-5">
            <span className="flex-1 text-lg">Player {seat + 1}</span>
            <IconButton label={`Remove vote from player ${seat + 1}`} onClick={() => vote(seat, -1)} disabled={count === 0}>
              <Minus aria-hidden />
            </IconButton>
            <span className="display tabular w-8 text-center text-4xl" aria-live="polite">
              {count}
            </span>
            <IconButton label={`Add vote to player ${seat + 1}`} onClick={() => vote(seat, 1)} disabled={left === 0}>
              <Plus aria-hidden />
            </IconButton>
          </li>
        ))}
      </ul>
    </section>
  )
}
