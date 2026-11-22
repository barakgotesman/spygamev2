import { Minus, Plus } from 'lucide-react'
import { IconButton } from '../../components/IconButton'

type StepperProps = {
  label: string
  hint: string
  /** Spoken value, e.g. "4 players", since the visible digit has no unit. */
  valueLabel: string
  fewerLabel: string
  moreLabel: string
  value: number
  onChange: (delta: -1 | 1) => void
  canDecrease: boolean
  canIncrease: boolean
}

export function Stepper({ label, hint, valueLabel, fewerLabel, moreLabel, value, onChange, canDecrease, canIncrease }: StepperProps): React.JSX.Element {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-4">
        <p className="display w-[2ch] text-6xl tabular-nums" aria-live="polite" aria-label={valueLabel}>
          {value}
        </p>
        <div>
          <p className="text-xl leading-tight font-bold">{label}</p>
          <p className="print text-[0.7rem] opacity-70">{hint}</p>
        </div>
      </div>
      {/* Minus on the left, plus on the right in both languages, like a keypad. */}
      <div dir="ltr" className="flex gap-3">
        <IconButton label={fewerLabel} onClick={() => onChange(-1)} disabled={!canDecrease} className="size-14">
          <Minus className="size-6" strokeWidth={3} aria-hidden />
        </IconButton>
        <IconButton label={moreLabel} onClick={() => onChange(1)} disabled={!canIncrease} tone="ink" className="size-14">
          <Plus className="size-6" strokeWidth={3} aria-hidden />
        </IconButton>
      </div>
    </div>
  )
}
