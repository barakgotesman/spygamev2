import { Minus, Plus } from 'lucide-react'
import { IconButton } from '../../components/IconButton'
import { Ticket } from '../../components/Ticket'
import { MAX_MINUTES, MIN_MINUTES, useSettingsStore } from '../../store/useSettingsStore'

export function TimerTab(): React.JSX.Element {
  const minutes = useSettingsStore((s) => s.minutes)
  const setMinutes = useSettingsStore((s) => s.setMinutes)

  return (
    <Ticket className="bg-bubblegum text-ink -rotate-1 [--stub:5rem]">
      <section aria-label="Round length" className="flex flex-col gap-5 px-6 pt-6 pb-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="print text-sm">Valid for</p>
            <p className="display text-7xl">
              {String(minutes).padStart(2, '0')}
              <span className="ml-2 text-2xl">min</span>
            </p>
          </div>
          <div className="flex gap-3">
            <IconButton label="Shorter round" className="size-16" disabled={minutes <= MIN_MINUTES} onClick={() => setMinutes(minutes - 1)}>
              <Minus className="size-7" strokeWidth={3} aria-hidden />
            </IconButton>
            <IconButton label="Longer round" tone="ink" className="size-16" disabled={minutes >= MAX_MINUTES} onClick={() => setMinutes(minutes + 1)}>
              <Plus className="size-7" strokeWidth={3} aria-hidden />
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
          className="h-11 w-full accent-ink"
        />
      </section>
      <p className="print grid h-[var(--stub)] place-items-center bg-ink px-6 text-center text-sm text-paper">
        Applies to the next round
      </p>
    </Ticket>
  )
}
