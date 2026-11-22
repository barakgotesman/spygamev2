import { Send, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Button } from '../../components/Button'
import { ConfirmDialog } from '../../components/ConfirmDialog'
import { IconButton } from '../../components/IconButton'
import { ScreenShell } from '../../components/ScreenShell'
import { useI18n } from '../../i18n/useI18n'
import { seatInk } from '../../lib/seatColors'
import { useGameStore } from '../../store/useGameStore'
import { RoleCard } from './RoleCard'

export function RevealScreen(): React.JSX.Element | null {
  const { m } = useI18n()
  const round = useGameStore((s) => s.round)
  const seat = useGameStore((s) => s.revealSeat)
  const nextReveal = useGameStore((s) => s.nextReveal)
  const reset = useGameStore((s) => s.reset)
  const [seenSeat, setSeenSeat] = useState(-1)
  const [confirmCancel, setConfirmCancel] = useState(false)

  if (!round) return null
  const isLast = seat === round.players - 1
  const seen = seenSeat === seat
  const ink = seatInk(seat)

  return (
    <ScreenShell>
      <header className="flex items-center justify-between gap-4 pt-2">
        <h1 className={`display -rotate-1 rounded-lg border-[3px] border-ink px-4 py-2 text-3xl shadow-hard ${ink.bg} ${ink.fg}`}>{m.common.player(seat + 1)}</h1>
        <IconButton label={m.common.cancelGame} onClick={() => setConfirmCancel(true)}>
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
        <Send className="size-5 rtl:-scale-x-100" strokeWidth={2.5} aria-hidden />
        {isLast ? m.reveal.startRound : m.reveal.pass(seat + 2)}
      </Button>
      <ConfirmDialog
        open={confirmCancel}
        title={m.reveal.cancelTitle}
        body={m.reveal.cancelBody}
        cancelLabel={m.common.keepPlaying}
        confirmLabel={m.common.cancelGame}
        onCancel={() => setConfirmCancel(false)}
        onConfirm={reset}
      />
    </ScreenShell>
  )
}
