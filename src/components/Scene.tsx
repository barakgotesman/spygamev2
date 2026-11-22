import type { Location } from '../types/game'

/** Illustrated postcards that ship in `public/scenes`; the location's `icon` is the file name. */
const sceneIds = new Set(['spa', 'casino', 'wedding', 'airplane', 'amusement', 'club', 'pub', 'restaurant', 'supermarket'])

const fallbackInks = ['bg-pink', 'bg-blue', 'bg-yellow', 'bg-teal', 'bg-orange', 'bg-violet'] as const

function hash(text: string): number {
  let h = 0
  for (const ch of text) h = (h * 31 + (ch.codePointAt(0) ?? 0)) | 0
  return Math.abs(h)
}

/** The picture for a location: its own postcard, the user's image, or a printed initial. */
export function Scene({ location, className = '' }: { location: Location; className?: string }): React.JSX.Element {
  if (location.imageUrl) {
    return <img src={location.imageUrl} alt="" draggable={false} className={`object-cover ${className}`} />
  }
  if (sceneIds.has(location.icon)) {
    return <img src={`${import.meta.env.BASE_URL}scenes/${location.icon}.svg`} alt="" draggable={false} className={`object-cover ${className}`} />
  }
  const ink = fallbackInks[hash(location.name) % fallbackInks.length] ?? fallbackInks[0]
  const initial = [...location.name.trim()][0]?.toUpperCase() ?? '?'
  return (
    <div aria-hidden className={`halftone relative grid place-items-center overflow-hidden ${ink} ${className}`}>
      <span className="display text-[8rem] leading-none text-paper [text-shadow:5px_5px_0_var(--color-ink)]">{initial}</span>
    </div>
  )
}
