import { Scissors, Settings } from 'lucide-react'
import { motion } from 'motion/react'
import { Footer } from '../../components/Footer'
import { IconButton } from '../../components/IconButton'
import { ScreenShell } from '../../components/ScreenShell'
import { Ticket } from '../../components/Ticket'
import { MAX_PLAYERS, MIN_PLAYERS, maxSpies } from '../../lib/clampCounts'
import { seatNumber, seatStock } from '../../lib/seatColors'
import { useGameStore } from '../../store/useGameStore'
import { useSettingsStore } from '../../store/useSettingsStore'
import { Stepper } from './Stepper'

export function SetupScreen(): React.JSX.Element {
  const config = useGameStore((s) => s.config)
  const changePlayers = useGameStore((s) => s.changePlayers)
  const changeSpies = useGameStore((s) => s.changeSpies)
  const startGame = useGameStore((s) => s.startGame)
  const openSettings = useGameStore((s) => s.openSettings)
  const locations = useSettingsStore((s) => s.locations)
  const noLocations = locations.length === 0

  return (
    <ScreenShell className="text-paper" footer={<Footer className="text-paper/80" />}>
      <header className="flex items-start justify-between gap-4 pt-2">
        <h1 className="display -rotate-2 text-[3.4rem]">
          Who's the
          <br />
          spy?
        </h1>
        <IconButton label="Settings" onClick={openSettings}>
          <Settings aria-hidden />
        </IconButton>
      </header>

      <div className="mt-auto flex flex-col gap-5">
      <ul className="flex flex-wrap gap-1.5" aria-label={`${config.players} tickets on the roll`}>
        {Array.from({ length: config.players }, (_, seat) => (
          <motion.li
            key={seat}
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: seat % 2 ? 3 : -3 }}
            transition={{ type: 'spring', stiffness: 500, damping: 22 }}
            className={`display grid h-9 w-8 place-items-center rounded-[5px] text-sm text-ink ${seatStock(seat).bg}`}
          >
            {seatNumber(seat)}
          </motion.li>
        ))}
      </ul>

      <Ticket className="bg-canary text-ink rotate-1">
        <section aria-label="Round setup" className="flex flex-col gap-5 px-6 pt-6 pb-8">
          <Stepper
            label="Players"
            value={config.players}
            onChange={(d) => changePlayers(d)}
            canDecrease={config.players > MIN_PLAYERS}
            canIncrease={config.players < MAX_PLAYERS}
          />
          <Stepper
            label="Spies"
            value={config.spies}
            onChange={(d) => changeSpies(d)}
            canDecrease={config.spies > 1}
            canIncrease={config.spies < maxSpies(config.players)}
          />
        </section>
        <button
          type="button"
          disabled={noLocations}
          onClick={() => startGame(locations)}
          className="display flex h-[var(--stub)] w-full items-center justify-center gap-3 bg-ink text-3xl text-canary transition-[filter] duration-150 hover:brightness-125 active:brightness-90 disabled:opacity-40"
        >
          <Scissors className="size-7 -rotate-90" strokeWidth={2.5} aria-hidden />
          Tear to start
        </button>
      </Ticket>
      </div>

      {noLocations && (
        <p className="rounded-xl bg-ink p-3 text-center text-paper" role="alert">
          No locations left. Add one in settings to play.
        </p>
      )}
    </ScreenShell>
  )
}
