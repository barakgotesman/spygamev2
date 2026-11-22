import type { ButtonHTMLAttributes } from 'react'

type Tone = 'paper' | 'ink' | 'pink'

const tones: Record<Tone, string> = {
  paper: 'bg-card text-ink',
  ink: 'bg-ink text-paper',
  pink: 'bg-pink text-ink',
}

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { label: string; tone?: Tone }

export function IconButton({ label, tone = 'paper', className = '', type = 'button', ...props }: IconButtonProps): React.JSX.Element {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={`inline-flex size-12 shrink-0 items-center justify-center rounded-xl border-[3px] border-ink shadow-hard transition-[translate,box-shadow] duration-100 ease-out active:translate-x-1 active:translate-y-1 active:shadow-none disabled:pointer-events-none disabled:opacity-30 ${tones[tone]} ${className}`}
      {...props}
    />
  )
}
