import { Minus, Plus } from 'lucide-react'
import { IconButton } from '../../components/IconButton'
import { useI18n } from '../../i18n/useI18n'
import { MAX_MINUTES, MIN_MINUTES, useSettingsStore } from '../../store/useSettingsStore'

export function TimerTab(): React.JSX.Element {
  const { m } = useI18n()
  const minutes = useSettingsStore((s) => s.minutes)
  const setMinutes = useSettingsStore((s) => s.setMinutes)

  return (
    <section aria-label={m.settings.roundLength} className="flex flex-col gap-5 rounded-2xl border-[3px] border-ink bg-blue p-5 text-paper shadow-hard-lg">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="print text-sm">{m.settings.roundLength}</p>
          <p className="display text-7xl [text-shadow:4px_4px_0_var(--color-ink)]">
            {minutes}
            <span className="ms-2 text-2xl">{m.settings.minutes}</span>
          </p>
        </div>
        <div dir="ltr" className="flex gap-3">
          <IconButton label={m.settings.shorter} className="size-16" disabled={minutes <= MIN_MINUTES} onClick={() => setMinutes(minutes - 1)}>
            <Minus className="size-7" strokeWidth={3} aria-hidden />
          </IconButton>
          <IconButton label={m.settings.longer} tone="pink" className="size-16" disabled={minutes >= MAX_MINUTES} onClick={() => setMinutes(minutes + 1)}>
            <Plus className="size-7" strokeWidth={3} aria-hidden />
          </IconButton>
        </div>
      </div>
      <input
        type="range"
        aria-label={m.settings.sliderAria}
        min={MIN_MINUTES}
        max={MAX_MINUTES}
        value={minutes}
        onChange={(e) => setMinutes(Number(e.target.value))}
        className="h-11 w-full accent-pink"
      />
      <p className="print text-center text-xs opacity-80">{m.settings.appliesNext}</p>
    </section>
  )
}
