import { Mail, Settings } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '../../components/Button'
import { CreditStamp } from '../../components/CreditStamp'
import { IconButton } from '../../components/IconButton'
import { LanguageToggle } from '../../components/LanguageToggle'
import { PostcardFan } from '../../components/PostcardFan'
import { ScreenShell } from '../../components/ScreenShell'
import { useI18n } from '../../i18n/useI18n'
import { MAX_PLAYERS, MIN_PLAYERS, maxSpies } from '../../lib/clampCounts'
import { useGameStore } from '../../store/useGameStore'
import { useSettingsStore } from '../../store/useSettingsStore'
import { PlayerNames } from './PlayerNames'
import { Stepper } from './Stepper'

export function SetupScreen(): React.JSX.Element {
  const { m } = useI18n()
  const config = useGameStore((s) => s.config)
  const changePlayers = useGameStore((s) => s.changePlayers)
  const changeSpies = useGameStore((s) => s.changeSpies)
  const startGame = useGameStore((s) => s.startGame)
  const openSettings = useGameStore((s) => s.openSettings)
  const locations = useSettingsStore((s) => s.locations)
  const noLocations = locations.length === 0

  return (
    <ScreenShell
      footer={
        <>
          <nav aria-label={m.nav.label} className="flex justify-center gap-5 text-base font-bold">
            <Link to="/" className="inline-flex min-h-11 items-center underline decoration-2 underline-offset-4">
              {m.nav.home}
            </Link>
            <Link to="/how-to-play" className="inline-flex min-h-11 items-center underline decoration-2 underline-offset-4">
              {m.setup.howToPlayLink}
            </Link>
          </nav>
          <CreditStamp className="pb-3" />
        </>
      }
    >
      <header className="flex items-start justify-between gap-4 pt-2">
        <h1 className="display text-[3.1rem]">
          {m.setup.titleLead}{' '}
          <span className="relative inline-block -rotate-2 text-paper">
            <span aria-hidden className="absolute -inset-x-2 inset-y-0.5 -z-10 -skew-x-6 rounded-md border-[3px] border-ink bg-pink shadow-hard" />
            {m.setup.titleMark}
          </span>
        </h1>
        <div className="flex gap-2">
          <LanguageToggle />
          <IconButton label={m.setup.settings} onClick={openSettings}>
            <Settings aria-hidden />
          </IconButton>
        </div>
      </header>

      <div className="mt-3">
        <PostcardFan locations={locations} />
      </div>

      <div className="mt-auto flex flex-col gap-6">
        <section aria-label={m.setup.sectionAria} className="flex flex-col gap-5 rounded-2xl border-[3px] border-ink bg-card p-5 shadow-hard-lg">
          <Stepper
            label={m.setup.players}
            hint={m.setup.playersHint}
            valueLabel={m.setup.playersAria(config.players)}
            fewerLabel={m.setup.fewerPlayers}
            moreLabel={m.setup.morePlayers}
            value={config.players}
            onChange={(d) => changePlayers(d)}
            canDecrease={config.players > MIN_PLAYERS}
            canIncrease={config.players < MAX_PLAYERS}
          />
          <hr className="border-t-[3px] border-dashed border-ink/30" />
          <Stepper
            label={m.setup.spies(config.spies)}
            hint={m.setup.spiesHint}
            valueLabel={m.setup.spiesAria(config.spies)}
            fewerLabel={m.setup.fewerSpies}
            moreLabel={m.setup.moreSpies}
            value={config.spies}
            onChange={(d) => changeSpies(d)}
            canDecrease={config.spies > 1}
            canIncrease={config.spies < maxSpies(config.players)}
          />
          <hr className="border-t-[3px] border-dashed border-ink/30" />
          <PlayerNames />
        </section>

        <Button variant="pink" disabled={noLocations} onClick={() => startGame(locations)} className="display min-h-[4.5rem] text-2xl font-normal">
          <Mail className="size-7" strokeWidth={2.5} aria-hidden />
          {m.common.dealCta}
        </Button>
      </div>

      {noLocations && (
        <p className="rounded-xl border-[3px] border-ink bg-yellow p-3 text-center font-semibold" role="alert">
          {m.setup.noLocations}
        </p>
      )}
    </ScreenShell>
  )
}
