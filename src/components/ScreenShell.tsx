import type { ReactNode } from 'react'

type ScreenShellProps = { children: ReactNode; footer?: ReactNode }

export function ScreenShell({ children, footer }: ScreenShellProps): React.JSX.Element {
  return (
    <main className="safe-x mx-auto flex min-h-dvh w-full max-w-md flex-col gap-6 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.25rem,env(safe-area-inset-bottom))]">
      {children}
      {footer}
    </main>
  )
}
