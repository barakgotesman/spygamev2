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
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-surface p-4">
      <div>
        <p className="text-base text-muted">{label}</p>
        <p className="display tabular text-7xl" aria-live="polite">
          {value}
        </p>
      </div>
      <div className="flex gap-3">
        <IconButton label={`Fewer ${label.toLowerCase()}`} onClick={() => onChange(-1)} disabled={!canDecrease} className="size-16">
          <Minus aria-hidden />
        </IconButton>
        <IconButton label={`More ${label.toLowerCase()}`} onClick={() => onChange(1)} disabled={!canIncrease} className="size-16">
          <Plus aria-hidden />
        </IconButton>
      </div>
    </div>
  )
}
