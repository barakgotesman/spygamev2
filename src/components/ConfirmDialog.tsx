import { useEffect, useRef } from 'react'
import { Button } from './Button'

type ConfirmDialogProps = {
  open: boolean
  title: string
  body: string
  confirmLabel: string
  cancelLabel: string
  onConfirm: () => void
  onCancel: () => void
}

/** Modal confirmation on the native <dialog>: focus trap, Escape and backdrop come for free. */
export function ConfirmDialog({ open, title, body, confirmLabel, cancelLabel, onConfirm, onCancel }: ConfirmDialogProps): React.JSX.Element {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby="confirm-title"
      onCancel={(e) => {
        e.preventDefault()
        onCancel()
      }}
      onClick={(e) => {
        if (e.target === ref.current) onCancel()
      }}
      className="m-auto w-[min(24rem,calc(100%-2.5rem))] rounded-3xl border-[3px] border-ink bg-paper p-6 text-ink backdrop:bg-ink/70"
    >
      <h2 id="confirm-title" className="display text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-lg font-medium">{body}</p>
      <div className="mt-6 flex flex-col gap-3">
        <Button variant="paper" className="min-h-14" autoFocus onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button variant="ink" className="min-h-14" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </dialog>
  )
}
