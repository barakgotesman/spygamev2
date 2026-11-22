import { Minus, Plus } from 'lucide-react'
import { IconButton } from '../../components/IconButton'

type StepperProps = {
  label: string
  hint: string
  value: number
  onChange: (delta: -1 | 1) => void
  canDecrease: boolean
  canIncrease: boolean
}

export function Stepper({ label, hint, value, onChange, canDecrease, canIncrease }: StepperProps): React.JSX.Element {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-4">
        <p className="display w-[2ch] text-6xl tabular-nums" aria-live="polite" aria-label={`${value} ${label}`}>
          {value}
        </p>
        <div>
          <p className="text-xl leading-tight font-bold">{label}</p>
          <p className="print text-[0.7rem] opacity-70">{hint}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <IconButton label={`Fewer ${label.toLowerCase()}`} onClick={() => onChange(-1)} disabled={!canDecrease} className="size-14">
          <Minus className="size-6" strokeWidth={3} aria-hidden />
        </IconButton>
        <IconButton label={`More ${label.toLowerCase()}`} onClick={() => onChange(1)} disabled={!canIncrease} tone="ink" className="size-14">
          <Plus className="size-6" strokeWidth={3} aria-hidden />
        </IconButton>
      </div>
    </div>
  )
}
