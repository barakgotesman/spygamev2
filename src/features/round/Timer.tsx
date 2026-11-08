import { Pause, Play } from 'lucide-react'
import { useEffect } from 'react'
import { Digits } from '../../components/Digits'
import { Ticket } from '../../components/Ticket'
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

  const finished = timer.status === 'finished'
  const urgent = timer.status === 'running' && remainingMs <= 30_000

  const action =
    timer.status === 'idle'
      ? { label: 'Punch in', icon: <Play className="size-7" strokeWidth={2.5} aria-hidden />, run: () => startTimer(durationMs) }
      : timer.status === 'running'
        ? { label: 'Pause', icon: <Pause className="size-7" strokeWidth={2.5} aria-hidden />, run: pauseTimer }
        : timer.status === 'paused'
          ? { label: 'Resume', icon: <Play className="size-7" strokeWidth={2.5} aria-hidden />, run: resumeTimer }
          : null

  return (
    <Ticket
      className={`${finished || urgent ? 'bg-raffle text-paper' : 'bg-bubblegum text-ink'} ${urgent ? 'motion-safe:animate-wiggle' : '-rotate-1'} transition-colors duration-300 [--stub:5rem]`}
    >
      <div className="flex flex-col items-center gap-1 px-4 pt-5 pb-6">
        <p className="print text-sm">{finished ? 'Expired' : 'Valid for'}</p>
        <div role="timer" aria-live="off">
          <Digits text={formatTime(remainingMs)} className="text-[6.5rem] leading-none" />
        </div>
      </div>
      {action ? (
        <button
          type="button"
          onClick={action.run}
          className="display flex h-[var(--stub)] w-full items-center justify-center gap-3 bg-ink text-3xl text-paper transition-[filter] duration-150 hover:brightness-125 active:brightness-90"
        >
          {action.icon}
          {action.label}
        </button>
      ) : (
        <p role="status" className="display grid h-[var(--stub)] place-items-center bg-ink text-3xl text-paper">
          Time's up
        </p>
      )}
    </Ticket>
  )
}
