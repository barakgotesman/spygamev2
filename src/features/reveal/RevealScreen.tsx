import { X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { ScreenShell } from '../../components/ScreenShell'
import { useGameStore } from '../../store/useGameStore'
import { RoleCard } from './RoleCard'

export function RevealScreen(): React.JSX.Element | null {
  const round = useGameStore((s) => s.round)
  const seat = useGameStore((s) => s.revealSeat)
  const nextReveal = useGameStore((s) => s.nextReveal)
  const reset = useGameStore((s) => s.reset)
  const [seenSeat, setSeenSeat] = useState(-1)

  if (!round) return null
  const isLast = seat === round.players - 1
  const seen = seenSeat === seat

  return (
    <ScreenShell>
      <header className="flex items-center justify-between gap-4 pt-2">
        <p className="text-lg text-muted tabular">
          Player {seat + 1} of {round.players}
        </p>
        <IconButton label="Cancel game" onClick={reset}>
          <X aria-hidden />
        </IconButton>
      </header>

      <RoleCard
        key={seat}
        seat={seat}
        isSpy={round.spySeats.includes(seat)}
        location={round.location}
        onSeen={() => setSeenSeat(seat)}
      />

      <Button variant="primary" className="min-h-16 text-xl" disabled={!seen} onClick={nextReveal}>
        {isLast ? 'Start the round' : `Hide and pass to player ${seat + 2}`}
      </Button>
    </ScreenShell>
  )
}
