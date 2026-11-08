import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

const variants: Record<Variant, string> = {
  primary: 'bg-signal text-signal-ink hover:brightness-110',
  secondary: 'bg-raised text-paper hover:bg-line',
  ghost: 'text-muted hover:text-paper hover:bg-raised',
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }

export function Button({ variant = 'secondary', className = '', type = 'button', ...props }: ButtonProps): React.JSX.Element {
  return (
    <button
      type={type}
      className={`inline-flex min-h-14 items-center justify-center gap-2 rounded-xl px-6 text-lg font-semibold transition-[transform,background-color,filter] duration-150 ease-out active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40 ${variants[variant]} ${className}`}
      {...props}
    />
  )
}
