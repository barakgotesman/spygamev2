import { motion } from 'motion/react'

/** Tally marks in groups of five (four strokes and a slash), drawn on as they are added. */
export function Tally({ count }: { count: number }): React.JSX.Element {
  const groups = Math.floor(count / 5)
  const rest = count % 5

  return (
    <span className="flex min-h-9 flex-wrap items-center gap-x-2" role="img" aria-label={`${count} votes`}>
      {Array.from({ length: groups }, (_, g) => (
        <svg key={g} viewBox="0 0 30 30" className="size-9 overflow-visible" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round">
          {[5, 12, 19, 26].map((x) => (
            <line key={x} x1={x} y1="3" x2={x} y2="27" />
          ))}
          <line x1="0" y1="24" x2="30" y2="6" />
        </svg>
      ))}
      {rest > 0 && (
        <svg viewBox={`0 0 ${rest * 7 + 2} 30`} width={(rest * 7 + 2) * 1.2} height={36} className="overflow-visible" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round">
          {Array.from({ length: rest }, (_, i) => (
            <motion.line
              key={i}
              x1={i * 7 + 2}
              y1="3"
              x2={i * 7 + 2}
              y2="27"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            />
          ))}
        </svg>
      )}
    </span>
  )
}
