import { Hand } from 'lucide-react'
import { motion } from 'motion/react'
import { useState, type KeyboardEvent } from 'react'
import { Postcard } from '../../components/Postcard'
import { Scene } from '../../components/Scene'
import { useFitText } from '../../hooks/useFitText'
import { seatInk, seatNumber } from '../../lib/seatColors'
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
 * The player's postcard. Hold the sealed flap to read it; letting go seals it again instantly.
 * The role is only in the DOM while held, so it can never linger for the next player.
 */
export function RoleCard({ seat, total, isSpy, location, onSeen }: RoleCardProps): React.JSX.Element {
  const [shown, setShown] = useState(false)
  const ink = seatInk(seat)

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
    <Postcard className="h-full min-h-[max(21rem,min(36rem,calc(100dvh-13rem)))]">
      <div className="flex items-start justify-between gap-3 px-4 pt-3">
        <div>
          <p className="print text-sm">Post card</p>
          <p className="print text-[0.7rem] opacity-60">
            {seat + 1} of {total}
          </p>
        </div>
        <p
          className={`display grid size-14 place-items-center border-[3px] border-dashed border-ink text-2xl ${ink.bg} ${ink.fg}`}
          aria-hidden
        >
          {seatNumber(seat)}
        </p>
      </div>

      <button
        type="button"
        aria-label={`Hold to read the postcard of player ${seat + 1}`}
        onPointerDown={show}
        onPointerUp={hide}
        onPointerCancel={hide}
        onPointerLeave={hide}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onBlur={hide}
        onContextMenu={(e) => e.preventDefault()}
        className="relative mx-3 mt-3 mb-3 flex-1 touch-none overflow-hidden rounded-sm border-[3px] border-ink select-none"
      >
        {shown && <RoleFace isSpy={isSpy} location={location} />}

        <motion.div
          initial={false}
          animate={{ clipPath: shown ? 'inset(0 0 100% 0)' : 'inset(0 0 0% 0)' }}
          transition={shown ? { duration: 0.26, ease: [0.16, 1, 0.3, 1] } : { duration: 0 }}
          className="halftone absolute inset-0 grid place-items-center bg-yellow"
          aria-hidden
        >
          <div className="flex flex-col items-center gap-3 text-ink">
            <span className={`grid size-20 -rotate-6 place-items-center rounded-full border-[3px] border-ink shadow-hard ${ink.bg} ${ink.fg}`}>
              <Hand className="size-9" strokeWidth={2.25} />
            </span>
            <p className="display text-center text-2xl">Hold to read it</p>
            <p className="print text-[0.65rem]">sealed · eyes only</p>
          </div>
        </motion.div>
      </button>

      <div className="mx-4 mb-4 flex flex-col gap-2.5" aria-hidden>
        <p className="print text-[0.7rem]">To: player {seatNumber(seat)}</p>
        <div className="h-px bg-ink/40" />
        <div className="h-px bg-ink/40" />
      </div>
    </Postcard>
  )
}

/** The printed role. Fitted to the panel so no name or language ever gets cut off. */
function RoleFace({ isSpy, location }: { isSpy: boolean; location: Location }): React.JSX.Element {
  const { box, content, headline, optional } = useFitText(
    isSpy ? { max: 40, min: 20, hasOptional: true } : { max: 36, min: 14 },
    [isSpy, location.name],
  )

  if (isSpy) {
    return (
      <div ref={box} className="halftone absolute inset-0 flex items-center-safe justify-center-safe overflow-hidden bg-yellow p-4">
        <div ref={content} className="flex max-w-full flex-col items-center gap-3 text-center">
          <div ref={optional}>
            <p className="display -rotate-3 text-[7rem] leading-[0.8] text-pink [text-shadow:4px_4px_0_var(--color-ink)]">?</p>
          </div>
          <p ref={headline} className="display">
            Lost in the mail
          </p>
          <p className="max-w-[22ch] text-lg leading-tight font-semibold">You're the spy. Bluff until you work out where everyone is.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 flex flex-col bg-card">
      <div className="min-h-0 flex-1 border-b-[3px] border-ink">
        <Scene location={location} className="size-full" />
      </div>
      {/* Fixed-height caption: the name shrinks to fit it, so the picture always keeps the rest. */}
      <div ref={box} className="flex h-24 shrink-0 items-center-safe justify-center-safe overflow-hidden px-3">
        <div ref={content} className="flex w-full min-w-0 flex-col items-center gap-0.5 text-center">
          <p className="print text-[0.65rem]">Wish you were here</p>
          <p ref={headline} className="display [overflow-wrap:anywhere]">
            {location.name}
          </p>
        </div>
      </div>
    </div>
  )
}
