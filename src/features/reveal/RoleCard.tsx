import { Fingerprint } from 'lucide-react'
import { motion } from 'motion/react'
import { useState, type KeyboardEvent } from 'react'
import { useFitText } from '../../hooks/useFitText'
import { LocationIcon } from '../../components/LocationIcon'
import { Ticket } from '../../components/Ticket'
import { seatNumber } from '../../lib/seatColors'
import { vibrate } from '../../lib/vibrate'
import type { Location } from '../../types/game'

type RoleCardProps = {
  seat: number
  total: number
  isSpy: boolean
  location: Location
  onSeen: () => void
}

/**
 * The player's ticket. Hold the foil to read it; letting go covers it again instantly.
 * The role is only in the DOM while held, so it can never linger for the next player.
 */
export function RoleCard({ seat, total, isSpy, location, onSeen }: RoleCardProps): React.JSX.Element {
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
    <Ticket className="flex h-full min-h-[max(21rem,min(34rem,calc(100dvh-13rem)))] flex-col bg-paper text-ink [--stub:6rem]">
      <div className="flex items-center justify-between px-6 pt-5">
        <p className="print text-base">Admit one</p>
        <p className="print text-base">
          {seat + 1}/{total}
        </p>
      </div>

      <button
        type="button"
        aria-label={`Hold to read the ticket of player ${seat + 1}`}
        onPointerDown={show}
        onPointerUp={hide}
        onPointerCancel={hide}
        onPointerLeave={hide}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onBlur={hide}
        onContextMenu={(e) => e.preventDefault()}
        className="relative mx-5 mt-4 mb-6 flex-1 touch-none overflow-hidden rounded-2xl border-[3px] border-ink select-none"
      >
        {shown && <RoleFace isSpy={isSpy} location={location} />}

        <motion.div
          initial={false}
          animate={{ clipPath: shown ? 'inset(0 0 100% 0)' : 'inset(0 0 0% 0)' }}
          transition={shown ? { duration: 0.28, ease: [0.16, 1, 0.3, 1] } : { duration: 0 }}
          className="foil absolute inset-0 grid place-items-center"
          aria-hidden
        >
          <div className="flex flex-col items-center gap-3 text-ink">
            <Fingerprint className="size-14" strokeWidth={1.5} />
            <p className="display text-3xl">Hold to scratch</p>
          </div>
        </motion.div>
      </button>

      <div className="flex items-end justify-between px-6 pb-4">
        <div>
          <p className="print text-xs">No.</p>
          <p className="display text-6xl">{seatNumber(seat)}</p>
        </div>
        <div className="flex flex-col items-end gap-1" aria-hidden>
          <div className="h-10 w-36 bg-[repeating-linear-gradient(90deg,var(--color-ink)_0_3px,transparent_3px_5px,var(--color-ink)_5px_6px,transparent_6px_10px)]" />
          <p className="print text-[0.65rem]">
            SPY-{seatNumber(seat)}-{String(total).padStart(2, '0')}
          </p>
        </div>
      </div>
    </Ticket>
  )
}

/** The printed role. Fitted to the panel so no name or language ever gets cut off. */
function RoleFace({ isSpy, location }: { isSpy: boolean; location: Location }): React.JSX.Element {
  const { box, content, headline, optional } = useFitText(
    isSpy ? { max: 64, min: 24 } : { max: 52, min: 18, hasOptional: true },
    [isSpy, location.name],
  )

  return (
    <div ref={box} className="absolute inset-0 flex items-center-safe justify-center-safe overflow-hidden bg-paper p-3">
      {isSpy ? (
        <div ref={content} className="flex max-w-full -rotate-6 flex-col items-center gap-2 text-center">
          <p ref={headline} className="display rounded-xl border-[6px] border-double border-raffle px-4 py-1 text-raffle">
            Void
          </p>
          <p className="max-w-[24ch] text-base leading-tight font-semibold">You're the spy. Fake it until you hear where everyone is.</p>
        </div>
      ) : (
        <div ref={content} className="flex w-full min-w-0 flex-col items-center gap-2 text-center">
          <div ref={optional}>
            {location.imageUrl ? (
              <img src={location.imageUrl} alt="" className="size-24 rounded-xl border-[3px] border-ink object-cover" />
            ) : (
              <LocationIcon name={location.icon} className="size-16" strokeWidth={1.75} />
            )}
          </div>
          <p className="print text-sm">Admit one to</p>
          <p ref={headline} className="display [overflow-wrap:anywhere]">
            {location.name}
          </p>
        </div>
      )}
    </div>
  )
}
