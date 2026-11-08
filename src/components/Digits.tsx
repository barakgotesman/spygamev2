/** Fixed-width digit cells so the clock never jitters as digits change. */
export function Digits({ text, className = '' }: { text: string; className?: string }): React.JSX.Element {
  return (
    <span className={`display inline-flex items-baseline justify-center ${className}`} aria-label={text}>
      {[...text].map((ch, i) => (
        <span key={i} aria-hidden className={ch === ':' ? 'w-[0.4em] text-center' : 'w-[0.72em] text-center'}>
          {ch}
        </span>
      ))}
    </span>
  )
}
