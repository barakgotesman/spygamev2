import { useState } from 'react'
import { Button } from '../../components/Button'
import { ScreenShell } from '../../components/ScreenShell'
import { useWakeLock } from '../../hooks/useWakeLock'
import { useGameStore } from '../../store/useGameStore'
import { Timer } from './Timer'
import { Verdict } from './Verdict'
import { Votes } from './Votes'

export function RoundScreen(): React.JSX.Element {
  const spies = useGameStore((s) => s.config.spies)
  const reset = useGameStore((s) => s.reset)
  const [revealed, setRevealed] = useState(false)
  useWakeLock(!revealed)

  if (revealed) {
    return (
      <ScreenShell>
        <Verdict />
      </ScreenShell>
    )
  }

  return (
    <ScreenShell>
      <header className="pt-2">
        <h1 className="display text-6xl">{spies > 1 ? `Find the ${spies} spies` : 'Find the spy'}</h1>
        <p className="mt-2 text-lg text-muted">Ask each other questions. Vote when you're ready.</p>
      </header>
      <Timer />
      <Votes />
      <div className="flex flex-col gap-3">
        <Button variant="primary" className="min-h-16 text-xl" onClick={() => setRevealed(true)}>
          Reveal the {spies > 1 ? 'spies' : 'spy'}
        </Button>
        <Button variant="ghost" onClick={reset}>
          Cancel game
        </Button>
      </div>
    </ScreenShell>
  )
}
