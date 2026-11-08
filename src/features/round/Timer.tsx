import { Pause, Play } from 'lucide-react'
import { useEffect } from 'react'
import { Button } from '../../components/Button'
import { useNow } from '../../hooks/useNow'
import { formatTime } from '../../lib/formatTime'
import { vibrate } from '../../lib/vibrate'
import { useGameStore } from '../../store/useGameStore'
import { useSettingsStore } from '../../store/useSettingsStore'

export function Timer(): React.JSX.Element {
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

  const urgent = timer.status === 'running' && remainingMs <= 30_000
  const finished = timer.status === 'finished'

  return (
    <section className="flex flex-col items-center gap-5 rounded-3xl bg-surface p-6" aria-label="Timer">
      <p
        role="timer"
        aria-live="off"
        className={`display tabular text-[7.5rem] leading-none transition-colors duration-300 ${
          finished || urgent ? 'text-signal' : 'text-paper'
        } ${urgent && !finished ? 'motion-safe:animate-pulse' : ''}`}
      >
        {formatTime(remainingMs)}
      </p>
      {finished ? (
        <p className="display text-4xl text-signal" role="status">
          Time's up
        </p>
      ) : timer.status === 'idle' ? (
        <Button variant="primary" className="w-full" onClick={() => startTimer(durationMs)}>
          <Play aria-hidden /> Start timer
        </Button>
      ) : timer.status === 'running' ? (
        <Button className="w-full" onClick={pauseTimer}>
          <Pause aria-hidden /> Pause
        </Button>
      ) : (
        <Button variant="primary" className="w-full" onClick={resumeTimer}>
          <Play aria-hidden /> Resume
        </Button>
      )}
    </section>
  )
}
