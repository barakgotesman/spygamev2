import { useState } from 'react'
import { Button } from '../../components/Button'
import { ConfirmDialog } from '../../components/ConfirmDialog'
import { ScreenShell } from '../../components/ScreenShell'
import { useWakeLock } from '../../hooks/useWakeLock'
import { useI18n } from '../../i18n/useI18n'
import { useGameStore } from '../../store/useGameStore'
import { Timer } from './Timer'
import { Verdict } from './Verdict'
import { Votes } from './Votes'

export function RoundScreen(): React.JSX.Element {
  const { m } = useI18n()
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
    <ScreenShell>
      <header className="pt-2">
        <h1 className="display text-4xl">{spies > 1 ? m.round.findSpies(spies) : m.round.findSpy}</h1>
        <p className="mt-2 text-lg font-medium opacity-80">{m.round.subtitle}</p>
      </header>
      <Timer />
      <Votes />
      <div className="flex flex-col gap-2 pt-2">
        <Button variant="pink" className="min-h-16 text-lg" onClick={revealVerdict}>
          {m.round.revealSpies(spies)}
        </Button>
        <Button variant="ghost" onClick={() => setConfirmCancel(true)}>
          {m.common.cancelGame}
        </Button>
      </div>
      <ConfirmDialog
        open={confirmCancel}
        title={m.reveal.cancelTitle}
        body={m.round.cancelBody}
        cancelLabel={m.common.keepPlaying}
        confirmLabel={m.common.cancelGame}
        onCancel={() => setConfirmCancel(false)}
        onConfirm={reset}
      />
    </ScreenShell>
  )
}
