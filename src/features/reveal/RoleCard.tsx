import { Fingerprint, VenetianMask } from 'lucide-react'
import { motion } from 'motion/react'
import { useState, type KeyboardEvent } from 'react'
import { LocationIcon } from '../../components/LocationIcon'
import { vibrate } from '../../lib/vibrate'
import type { Location } from '../../types/game'

type RoleCardProps = {
  seat: number
  isSpy: boolean
  location: Location
  onSeen: () => void
}

/** Hold to reveal, release to hide. Hiding is instant (no exit animation) so a role never lingers for the next player. */
export function RoleCard({ seat, isSpy, location, onSeen }: RoleCardProps): React.JSX.Element {
  const [shown, setShown] = useState(false)

  const show = (): void => {
    setShown(true)
    onSeen()
    vibrate(15)
  }
  const hide = (): void => setShown(false)
  const onKeyDown = (e: KeyboardEvent): void => {
    if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) {
      e.preventDefault()
      show()
    }
  }
  const onKeyUp = (e: KeyboardEvent): void => {
    if (e.key === ' ' || e.key === 'Enter') hide()
  }

  return (
    <button
      type="button"
      aria-label={`Hold to reveal the role of player ${seat + 1}`}
      onPointerDown={show}
      onPointerUp={hide}
      onPointerCancel={hide}
      onPointerLeave={hide}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onBlur={hide}
      onContextMenu={(e) => e.preventDefault()}
      className={`relative grid min-h-[22rem] flex-1 touch-none place-items-center overflow-hidden rounded-3xl p-6 text-center transition-colors duration-200 select-none ${
        shown ? (isSpy ? 'bg-signal text-signal-ink' : 'bg-paper text-ink') : 'bg-surface text-paper'
      }`}
    >
        {shown ? (
          <motion.div
            key="role"
            initial={{ opacity: 0, scale: 0.92, filter: 'blur(6px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-5"
          >
            {isSpy ? (
              <>
                <VenetianMask className="size-24" aria-hidden />
                <p className="display text-7xl">You are the spy</p>
                <p className="max-w-[24ch] text-lg">Blend in. Work out the location from what they say.</p>
              </>
            ) : (
              <>
                {location.imageUrl ? (
                  <img src={location.imageUrl} alt="" className="size-40 rounded-2xl object-cover" />
                ) : (
                  <LocationIcon name={location.icon} className="size-24" />
                )}
                <p className="display text-6xl">{location.name}</p>
                <p className="text-lg">Don't say it out loud.</p>
              </>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-5"
          >
            <p className="display tabular text-[9rem] leading-none text-paper">{seat + 1}</p>
            <Fingerprint className="size-12 text-signal" aria-hidden />
            <p className="text-lg text-muted">Hold to see your role</p>
          </motion.div>
        )}
    </button>
  )
}
