import type { ButtonHTMLAttributes } from 'react'

type Tone = 'paper' | 'ink'

const tones: Record<Tone, string> = {
  paper: 'bg-paper text-ink',
  ink: 'bg-ink text-paper',
}

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { label: string; tone?: Tone }

export function IconButton({ label, tone = 'paper', className = '', type = 'button', ...props }: IconButtonProps): React.JSX.Element {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={`inline-flex size-12 shrink-0 items-center justify-center rounded-full border-[3px] border-ink transition-[transform,filter] duration-150 ease-out hover:brightness-95 active:scale-90 disabled:pointer-events-none disabled:opacity-30 ${tones[tone]} ${className}`}
      {...props}
    />
  )
}
