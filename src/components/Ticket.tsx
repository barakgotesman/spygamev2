import type { ReactNode } from 'react'

type TicketProps = {
  children: ReactNode
  /** Tailwind classes for stock color, size and tilt, e.g. `bg-canary -rotate-1`. */
  className?: string
  /** Show the dotted perforation above the stub. */
  perforated?: boolean
}

/** A notched ticket with a soft shadow. The stub is the bottom `--stub` of its box. */
export function Ticket({ children, className = '', perforated = true }: TicketProps): React.JSX.Element {
  return (
    <div className="h-full drop-shadow-[0_14px_14px_oklch(0.2_0.1_285/0.3)]">
      <div className={`ticket relative h-full ${className}`}>
        {children}
        {perforated && <span className="perforation" aria-hidden />}
      </div>
    </div>
  )
}
