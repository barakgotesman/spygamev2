import { motion } from 'motion/react'
import type { Location } from '../types/game'
import { Scene } from './Scene'

/** Where each postcard in the fan sits: rotation, offset (as a fraction of the card width) and resting z-order. */
const fan = [
  { rotate: -9, x: -0.6, y: 14, z: 'z-10' },
  { rotate: 2, x: 0, y: 0, z: 'z-30' },
  { rotate: 10, x: 0.6, y: 18, z: 'z-20' },
] as const

const sizes = {
  sm: { box: 'h-40 max-w-72', card: 'w-32 -ms-16' },
  lg: { box: 'h-64 max-w-md', card: 'w-32 -ms-16 sm:w-48 sm:-ms-24' },
} as const

type PostcardFanProps = { locations: readonly (Location | undefined)[]; size?: keyof typeof sizes }

/** Three postcards fanned out like a dealt hand. Decorative, so hidden from assistive tech. */
export function PostcardFan({ locations, size = 'sm' }: PostcardFanProps): React.JSX.Element {
  const s = sizes[size]
  const picks = [0, Math.floor(locations.length / 2), locations.length - 1]
    .map((i) => locations[i])
    .filter((l, i, all) => l !== undefined && all.indexOf(l) === i)

  return (
    <div className={`relative mx-auto flex w-full items-center overflow-x-clip justify-center ${s.box}`} aria-hidden>
      {picks.map((loc, i) => {
        const f = fan[i] ?? fan[0]
        // Percent of the card's own width, so the spread shrinks with the card on narrow screens.
        const x = `${f.x * 100}%`
        return (
          <motion.div
            key={loc?.id}
            initial={{ y: 60, x, rotate: 0, opacity: 0 }}
            animate={{ y: f.y, x, rotate: f.rotate, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 20, delay: 0.08 * i }}
            className={`absolute start-1/2 ${s.card} ${f.z}`}
          >
            <div className="overflow-hidden rounded-md border-[3px] border-ink bg-card p-1.5 shadow-hard">
              {loc && <Scene location={loc} className="aspect-[4/3] w-full rounded-sm" />}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
