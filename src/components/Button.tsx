import type { ButtonHTMLAttributes } from 'react'

type Variant = 'pink' | 'ink' | 'paper' | 'ghost'

const variants: Record<Variant, string> = {
  pink: 'bg-pink text-ink border-ink shadow-hard',
  ink: 'bg-ink text-paper border-ink shadow-hard',
  paper: 'bg-card text-ink border-ink shadow-hard',
  ghost: 'border-transparent text-current underline decoration-2 underline-offset-4',
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }

/** A printed button: it sits on a hard shadow and presses down into it. */
export function Button({ variant = 'paper', className = '', type = 'button', ...props }: ButtonProps): React.JSX.Element {
  const press = variant === 'ghost' ? 'active:opacity-60' : 'active:translate-x-1 active:translate-y-1 active:shadow-none'
  return (
    <button
      type={type}
      className={`inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border-[3px] px-6 text-lg font-bold transition-[translate,box-shadow,opacity] duration-100 ease-out disabled:pointer-events-none disabled:opacity-40 ${press} ${variants[variant]} ${className}`}
      {...props}
    />
  )
}
