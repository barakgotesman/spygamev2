import { Settings, VenetianMask } from 'lucide-react'
import { Button } from '../../components/Button'
import { Footer } from '../../components/Footer'
import { IconButton } from '../../components/IconButton'
import { ScreenShell } from '../../components/ScreenShell'
import { MAX_PLAYERS, MIN_PLAYERS, maxSpies } from '../../lib/clampCounts'
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
    <ScreenShell footer={<Footer />}>
      <header className="flex items-start justify-between pt-2">
        <div>
          <VenetianMask className="mb-4 size-10 text-signal" aria-hidden />
          <h1 className="display text-7xl">
            Find the
            <br />
            spy
          </h1>
        </div>
        <IconButton label="Settings" onClick={openSettings}>
          <Settings aria-hidden />
        </IconButton>
      </header>

      <p className="max-w-[32ch] text-lg text-muted">Pass the phone. Everyone learns the location, except the spy.</p>

      <section className="flex flex-col gap-3" aria-label="Round setup">
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

      <div className="flex flex-col gap-2">
        <Button variant="primary" className="min-h-16 text-xl" disabled={noLocations} onClick={() => startGame(locations)}>
          Start round
        </Button>
        {noLocations && (
          <p className="text-center text-sm text-signal" role="alert">
            No locations left. Add one in settings to play.
          </p>
        )}
      </div>
    </ScreenShell>
  )
}
