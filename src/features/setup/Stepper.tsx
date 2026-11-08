import { Minus, Plus } from 'lucide-react'
import { IconButton } from '../../components/IconButton'

type StepperProps = {
  label: string
  value: number
  onChange: (delta: -1 | 1) => void
  canDecrease: boolean
  canIncrease: boolean
}

export function Stepper({ label, value, onChange, canDecrease, canIncrease }: StepperProps): React.JSX.Element {
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="print text-sm">{label}</p>
        <p className="display text-7xl" aria-live="polite">
          {String(value).padStart(2, '0')}
        </p>
      </div>
      <div className="flex gap-3">
        <IconButton label={`Fewer ${label.toLowerCase()}`} onClick={() => onChange(-1)} disabled={!canDecrease} className="size-16">
          <Minus className="size-7" strokeWidth={3} aria-hidden />
        </IconButton>
        <IconButton label={`More ${label.toLowerCase()}`} onClick={() => onChange(1)} disabled={!canIncrease} tone="ink" className="size-16">
          <Plus className="size-7" strokeWidth={3} aria-hidden />
        </IconButton>
      </div>
    </div>
  )
}
