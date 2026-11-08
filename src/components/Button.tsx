import type { ButtonHTMLAttributes } from 'react'

type Variant = 'ink' | 'paper' | 'ghost'

const variants: Record<Variant, string> = {
  ink: 'bg-ink text-paper border-ink hover:brightness-125',
  paper: 'bg-paper text-ink border-ink hover:brightness-95',
  ghost: 'border-transparent text-current underline decoration-2 underline-offset-4 hover:opacity-80',
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }

export function Button({ variant = 'paper', className = '', type = 'button', ...props }: ButtonProps): React.JSX.Element {
  return (
    <button
      type={type}
      className={`inline-flex min-h-14 items-center justify-center gap-2 rounded-full border-[3px] px-7 text-lg font-extrabold tracking-wide uppercase transition-[transform,filter,opacity] duration-150 ease-out active:scale-[0.96] disabled:pointer-events-none disabled:opacity-40 ${variants[variant]} ${className}`}
      {...props}
    />
  )
}
