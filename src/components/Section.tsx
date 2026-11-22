import type { ReactNode } from 'react'

type SectionProps = { title: string; children: ReactNode; className?: string; id?: string }

/** A titled block on the content pages; the heading id labels the region for screen readers. */
export function Section({ title, children, className = '', id }: SectionProps): React.JSX.Element {
  const headingId = `${id ?? title.replace(/\W+/gu, '-')}-heading`
  return (
    <section aria-labelledby={headingId} className={`flex flex-col gap-6 ${className}`}>
      <h2 id={headingId} className="display text-3xl sm:text-4xl">
        {title}
      </h2>
      {children}
    </section>
  )
}
