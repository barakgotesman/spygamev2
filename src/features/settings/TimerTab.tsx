import { Minus, Plus } from 'lucide-react'
import { IconButton } from '../../components/IconButton'
import { MAX_MINUTES, MIN_MINUTES, useSettingsStore } from '../../store/useSettingsStore'

export function TimerTab(): React.JSX.Element {
  const minutes = useSettingsStore((s) => s.minutes)
  const setMinutes = useSettingsStore((s) => s.setMinutes)

  return (
    <section aria-label="Round length" className="flex flex-col gap-6 rounded-2xl bg-surface p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-base text-muted">Round length</p>
          <p className="display tabular text-7xl">
            {minutes}
            <span className="ml-2 text-3xl text-muted">min</span>
          </p>
        </div>
        <div className="flex gap-3">
          <IconButton label="Shorter round" className="size-16" disabled={minutes <= MIN_MINUTES} onClick={() => setMinutes(minutes - 1)}>
            <Minus aria-hidden />
          </IconButton>
          <IconButton label="Longer round" className="size-16" disabled={minutes >= MAX_MINUTES} onClick={() => setMinutes(minutes + 1)}>
            <Plus aria-hidden />
          </IconButton>
        </div>
      </div>
      <input
        type="range"
        aria-label="Round length in minutes"
        min={MIN_MINUTES}
        max={MAX_MINUTES}
        value={minutes}
        onChange={(e) => setMinutes(Number(e.target.value))}
        className="h-11 w-full accent-signal"
      />
    </section>
  )
}
