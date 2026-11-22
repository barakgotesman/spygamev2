import { Mail, Settings } from 'lucide-react'
import { motion } from 'motion/react'
import { Button } from '../../components/Button'
import { Footer } from '../../components/Footer'
import { IconButton } from '../../components/IconButton'
import { Scene } from '../../components/Scene'
import { ScreenShell } from '../../components/ScreenShell'
import { MAX_PLAYERS, MIN_PLAYERS, maxSpies } from '../../lib/clampCounts'
import { useGameStore } from '../../store/useGameStore'
import { useSettingsStore } from '../../store/useSettingsStore'
import { Stepper } from './Stepper'

/** Where the three teaser postcards sit in the fan: rotation, offset and resting z-order. */
const fan = [
  { rotate: -9, x: -78, y: 14, z: 'z-10' },
  { rotate: 2, x: 0, y: 0, z: 'z-30' },
  { rotate: 10, x: 78, y: 18, z: 'z-20' },
] as const

export function SetupScreen(): React.JSX.Element {
  const config = useGameStore((s) => s.config)
  const changePlayers = useGameStore((s) => s.changePlayers)
  const changeSpies = useGameStore((s) => s.changeSpies)
  const startGame = useGameStore((s) => s.startGame)
  const openSettings = useGameStore((s) => s.openSettings)
  const locations = useSettingsStore((s) => s.locations)
  const noLocations = locations.length === 0

  // Spread the picks across the list so the teaser shows three different worlds.
  const teaser = [0, Math.floor(locations.length / 2), locations.length - 1]
    .map((i) => locations[i])
    .filter((l, i, all) => l !== undefined && all.indexOf(l) === i)

  return (
    <ScreenShell footer={<Footer className="opacity-70" />}>
      <header className="flex items-start justify-between gap-4 pt-2">
        <h1 className="display text-[3.1rem]">
          Who's the{' '}
          <span className="relative inline-block -rotate-2 text-paper">
            <span aria-hidden className="absolute -inset-x-2 inset-y-0.5 -z-10 -skew-x-6 rounded-md border-[3px] border-ink bg-pink shadow-hard" />
            spy?
          </span>
        </h1>
        <IconButton label="Settings" onClick={openSettings}>
          <Settings aria-hidden />
        </IconButton>
      </header>

      <div className="relative mx-auto mt-3 flex h-40 w-full max-w-72 items-center justify-center" aria-hidden>
        {teaser.map((loc, i) => {
          const f = fan[i] ?? fan[0]
          return (
            <motion.div
              key={loc?.id}
              initial={{ y: 60, x: f.x, rotate: 0, opacity: 0 }}
              animate={{ y: f.y, x: f.x, rotate: f.rotate, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 20, delay: 0.08 * i }}
                            className={`absolute left-1/2 -ml-16 w-32 ${f.z}`}
            >
              <div className="overflow-hidden rounded-md border-[3px] border-ink bg-card p-1.5 shadow-hard">
                {loc && <Scene location={loc} className="aspect-[4/3] w-full rounded-sm" />}
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-auto flex flex-col gap-6">
        <section aria-label="Round setup" className="flex flex-col gap-5 rounded-2xl border-[3px] border-ink bg-card p-5 shadow-hard-lg">
          <Stepper
            label="Players"
            hint="pass the phone"
            value={config.players}
            onChange={(d) => changePlayers(d)}
            canDecrease={config.players > MIN_PLAYERS}
            canIncrease={config.players < MAX_PLAYERS}
          />
          <hr className="border-t-[3px] border-dashed border-ink/30" />
          <Stepper
            label={config.spies === 1 ? 'Spy' : 'Spies'}
            hint="in the dark"
            value={config.spies}
            onChange={(d) => changeSpies(d)}
            canDecrease={config.spies > 1}
            canIncrease={config.spies < maxSpies(config.players)}
          />
        </section>

        <Button variant="pink" disabled={noLocations} onClick={() => startGame(locations)} className="display min-h-[4.5rem] text-2xl font-normal">
          <Mail className="size-7" strokeWidth={2.5} aria-hidden />
          Deal the postcards
        </Button>
      </div>

      {noLocations && (
        <p className="rounded-xl border-[3px] border-ink bg-yellow p-3 text-center font-semibold" role="alert">
          No locations left. Add one in settings to play.
        </p>
      )}
    </ScreenShell>
  )
}
