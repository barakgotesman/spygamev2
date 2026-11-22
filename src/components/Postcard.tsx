import type { ReactNode } from 'react'

type PostcardProps = { children: ReactNode; className?: string }

/** A postcard: airmail-striped rim, paper back, hard shadow. Children fill the inside. */
export function Postcard({ children, className = '' }: PostcardProps): React.JSX.Element {
  return (
    <div className={`airmail flex flex-col rounded-lg border-[3px] border-ink p-2.5 shadow-hard-lg ${className}`}>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-sm border-[3px] border-ink bg-card">{children}</div>
    </div>
  )
}
