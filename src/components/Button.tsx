import type { ButtonHTMLAttributes } from 'react'

type Variant = 'pink' | 'ink' | 'paper' | 'ghost'

const variants: Record<Variant, string> = {
  pink: 'bg-pink text-ink border-ink shadow-hard',
  ink: 'bg-ink text-paper border-ink shadow-hard',
  paper: 'bg-card text-ink border-ink shadow-hard',
  ghost: 'border-transparent text-current underline decoration-2 underline-offset-4',
}

/** Shared by `Button` and `ButtonLink`: a printed button that sits on a hard shadow and presses into it. */
export function buttonStyles(variant: Variant = 'paper', className = ''): string {
  const press = variant === 'ghost' ? 'active:opacity-60' : 'active:translate-x-1 active:translate-y-1 active:shadow-none'
  return `inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border-[3px] px-6 text-lg font-bold transition-[translate,box-shadow,opacity] duration-100 ease-out disabled:pointer-events-none disabled:opacity-40 ${press} ${variants[variant]} ${className}`
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }

export function Button({ variant = 'paper', className = '', type = 'button', ...props }: ButtonProps): React.JSX.Element {
  return <button type={type} className={buttonStyles(variant, className)} {...props} />
}
