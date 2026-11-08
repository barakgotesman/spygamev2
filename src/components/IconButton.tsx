import type { ButtonHTMLAttributes } from 'react'

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { label: string }

export function IconButton({ label, className = '', type = 'button', ...props }: IconButtonProps): React.JSX.Element {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={`inline-flex size-12 items-center justify-center rounded-xl bg-raised text-paper transition-[transform,background-color] duration-150 ease-out hover:bg-line active:scale-[0.92] disabled:pointer-events-none disabled:opacity-30 ${className}`}
      {...props}
    />
  )
}
