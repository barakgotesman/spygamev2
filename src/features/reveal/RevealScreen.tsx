import { Scissors, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Button } from '../../components/Button'
import { ConfirmDialog } from '../../components/ConfirmDialog'
import { IconButton } from '../../components/IconButton'
import { ScreenShell } from '../../components/ScreenShell'
import { seatStock } from '../../lib/seatColors'
import { useGameStore } from '../../store/useGameStore'
import { RoleCard } from './RoleCard'

export function RevealScreen(): React.JSX.Element | null {
  const round = useGameStore((s) => s.round)
  const seat = useGameStore((s) => s.revealSeat)
  const nextReveal = useGameStore((s) => s.nextReveal)
  const reset = useGameStore((s) => s.reset)
  const [seenSeat, setSeenSeat] = useState(-1)
  const [confirmCancel, setConfirmCancel] = useState(false)

  // Each player's turn floods the screen with their own ticket color.
  const stock = seatStock(seat).name
  useEffect(() => {
    document.documentElement.style.setProperty('--seat', `var(--color-${stock})`)
  }, [stock])

  if (!round) return null
  const isLast = seat === round.players - 1
  const seen = seenSeat === seat

  return (
    <ScreenShell>
      <header className="flex items-center justify-between gap-4 pt-2">
        <h1 className="display text-4xl">Player {seat + 1}</h1>
        <IconButton label="Cancel game" onClick={() => setConfirmCancel(true)}>
          <X aria-hidden />
        </IconButton>
      </header>

      <div className="relative flex flex-1 flex-col">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={seat}
            className="flex flex-1 flex-col"
            initial={{ y: 90, rotate: -5, opacity: 0 }}
            animate={{ y: 0, rotate: seat % 2 ? 1 : -1, opacity: 1 }}
            exit={{ x: '115%', rotate: 14, opacity: 0, transition: { duration: 0.32, ease: [0.5, 0, 0.9, 0.4] } }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          >
            <RoleCard
              seat={seat}
              total={round.players}
              isSpy={round.spySeats.includes(seat)}
              location={round.location}
              onSeen={() => setSeenSeat(seat)}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <Button variant="ink" className="min-h-16 text-lg" disabled={!seen} onClick={nextReveal}>
        <Scissors className="size-5 -rotate-90" strokeWidth={2.5} aria-hidden />
        {isLast ? 'Start the round' : `Pass to player ${seat + 2}`}
      </Button>
      <ConfirmDialog
        open={confirmCancel}
        title="Cancel this game?"
        body="Everyone's tickets are thrown away and you start over."
        cancelLabel="Keep playing"
        confirmLabel="Cancel game"
        onCancel={() => setConfirmCancel(false)}
        onConfirm={reset}
      />
    </ScreenShell>
  )
}
