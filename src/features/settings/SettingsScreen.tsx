import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { IconButton } from '../../components/IconButton'
import { ScreenShell } from '../../components/ScreenShell'
import { useI18n } from '../../i18n/useI18n'
import { useGameStore } from '../../store/useGameStore'
import { LocationsTab } from './LocationsTab'
import { TimerTab } from './TimerTab'

type Tab = 'locations' | 'timer'

export function SettingsScreen(): React.JSX.Element {
  const { m } = useI18n()
  const tabs: { id: Tab; label: string }[] = [
    { id: 'locations', label: m.settings.tabLocations },
    { id: 'timer', label: m.settings.tabTimer },
  ]
  const closeSettings = useGameStore((s) => s.closeSettings)
  const [tab, setTab] = useState<Tab>('locations')

  return (
    <ScreenShell>
      <header className="flex items-center gap-4 pt-2">
        <IconButton label={m.settings.back} onClick={closeSettings}>
          <ArrowLeft className="rtl:-scale-x-100" aria-hidden strokeWidth={3} />
        </IconButton>
        <h1 className="display text-4xl">{m.settings.title}</h1>
      </header>

      <div role="tablist" aria-label={m.settings.sectionsAria} className="grid grid-cols-2 gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`display min-h-14 rounded-xl border-[3px] border-ink text-2xl shadow-hard transition-[translate,box-shadow] duration-100 active:translate-x-1 active:translate-y-1 active:shadow-none ${
              tab === t.id ? 'bg-pink text-ink' : 'bg-card text-ink'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div role="tabpanel">{tab === 'locations' ? <LocationsTab /> : <TimerTab />}</div>
    </ScreenShell>
  )
}
