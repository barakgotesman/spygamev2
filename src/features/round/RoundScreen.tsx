import { useState } from 'react'
import { Button } from '../../components/Button'
import { ConfirmDialog } from '../../components/ConfirmDialog'
import { ScreenShell } from '../../components/ScreenShell'
import { useWakeLock } from '../../hooks/useWakeLock'
import { useGameStore } from '../../store/useGameStore'
import { Timer } from './Timer'
import { Verdict } from './Verdict'
import { Votes } from './Votes'

export function RoundScreen(): React.JSX.Element {
  const spies = useGameStore((s) => s.config.spies)
  const verdict = useGameStore((s) => s.verdict)
  const revealVerdict = useGameStore((s) => s.revealVerdict)
  const reset = useGameStore((s) => s.reset)
  const [confirmCancel, setConfirmCancel] = useState(false)
  useWakeLock(!verdict)

  if (verdict) {
    return (
      <ScreenShell className="justify-center">
        <Verdict />
      </ScreenShell>
    )
  }

  return (
    <ScreenShell className="text-paper">
      <header className="pt-2">
        <h1 className="display text-5xl">{spies > 1 ? `Find the ${spies} spies` : 'Find the spy'}</h1>
        <p className="mt-2 text-lg font-medium">Ask each other questions. Vote when you're ready.</p>
      </header>
      <Timer />
      <Votes />
      <div className="flex flex-col gap-2 pt-2">
        <Button variant="paper" className="min-h-16 text-lg" onClick={revealVerdict}>
          Reveal the {spies > 1 ? 'spies' : 'spy'}
        </Button>
        <Button variant="ghost" onClick={() => setConfirmCancel(true)}>
          Cancel game
        </Button>
      </div>
      <ConfirmDialog
        open={confirmCancel}
        title="Cancel this game?"
        body="The timer and all votes are thrown away and you start over."
        cancelLabel="Keep playing"
        confirmLabel="Cancel game"
        onCancel={() => setConfirmCancel(false)}
        onConfirm={reset}
      />
    </ScreenShell>
  )
}
