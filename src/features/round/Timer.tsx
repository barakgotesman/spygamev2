import { Pause, Play } from 'lucide-react'
import { useEffect } from 'react'
import { Button } from '../../components/Button'
import { Digits } from '../../components/Digits'
import { useNow } from '../../hooks/useNow'
import { useI18n } from '../../i18n/useI18n'
import { formatTime } from '../../lib/formatTime'
import { vibrate } from '../../lib/vibrate'
import { useGameStore } from '../../store/useGameStore'
import { useSettingsStore } from '../../store/useSettingsStore'

export function Timer(): React.JSX.Element {
  const { m } = useI18n()
  const timer = useGameStore((s) => s.timer)
  const startTimer = useGameStore((s) => s.startTimer)
  const pauseTimer = useGameStore((s) => s.pauseTimer)
  const resumeTimer = useGameStore((s) => s.resumeTimer)
  const finishTimer = useGameStore((s) => s.finishTimer)
  const minutes = useSettingsStore((s) => s.minutes)
  const now = useNow(timer.status === 'running')

  const durationMs = minutes * 60_000
  const remainingMs =
    timer.status === 'running'
      ? timer.endsAt - now
      : timer.status === 'paused'
        ? timer.remainingMs
        : timer.status === 'finished'
          ? 0
          : durationMs

  const expired = timer.status === 'running' && remainingMs <= 0
  useEffect(() => {
    if (!expired) return
    finishTimer()
    vibrate([300, 120, 300, 120, 600])
  }, [expired, finishTimer])

  const finished = timer.status === 'finished'
  const urgent = timer.status === 'running' && remainingMs <= 30_000
  const left = Math.max(0, Math.min(1, remainingMs / durationMs))

  const action =
    timer.status === 'idle'
      ? { label: m.round.startClock, icon: <Play className="size-6" strokeWidth={2.5} aria-hidden />, run: () => startTimer(durationMs) }
      : timer.status === 'running'
        ? { label: m.round.pause, icon: <Pause className="size-6" strokeWidth={2.5} aria-hidden />, run: pauseTimer }
        : timer.status === 'paused'
          ? { label: m.round.resume, icon: <Play className="size-6" strokeWidth={2.5} aria-hidden />, run: resumeTimer }
          : null

  return (
    <section
      aria-label={m.round.timerAria}
      className={`flex flex-col gap-4 rounded-2xl border-[3px] border-ink p-4 shadow-hard-lg transition-colors duration-300 ${
        finished || urgent ? 'bg-pink text-ink' : 'bg-blue text-paper'
      } ${urgent ? 'motion-safe:animate-wiggle' : ''}`}
    >
      <div className="flex flex-col items-center gap-1 pt-1">
        <p className="print text-sm">{finished ? m.round.timeUp : m.round.timeLeft}</p>
        <div role="timer" aria-live="off" dir="ltr">
          <Digits text={formatTime(remainingMs)} className="text-[6rem] leading-none [text-shadow:4px_4px_0_var(--color-ink)]" />
        </div>
      </div>

      {/* The airmail stripe drains as the round runs out. */}
      <div className="h-4 overflow-hidden rounded-full border-[3px] border-ink bg-card" aria-hidden>
        <div className="airmail h-full w-full origin-left transition-transform rtl:origin-right duration-1000 ease-linear" style={{ transform: `scaleX(${left})` }} />
      </div>

      {action ? (
        <Button variant="paper" className="min-h-16 text-xl" onClick={action.run}>
          {action.icon}
          {action.label}
        </Button>
      ) : (
        <p role="status" className="display grid min-h-16 place-items-center rounded-xl border-[3px] border-ink bg-card text-3xl">
          {m.round.voteNow}
        </p>
      )}
    </section>
  )
}
