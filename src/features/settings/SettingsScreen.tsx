import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { IconButton } from '../../components/IconButton'
import { ScreenShell } from '../../components/ScreenShell'
import { useGameStore } from '../../store/useGameStore'
import { LocationsTab } from './LocationsTab'
import { TimerTab } from './TimerTab'

type Tab = 'locations' | 'timer'
const tabs: { id: Tab; label: string }[] = [
  { id: 'locations', label: 'Locations' },
  { id: 'timer', label: 'Timer' },
]

export function SettingsScreen(): React.JSX.Element {
  const closeSettings = useGameStore((s) => s.closeSettings)
  const [tab, setTab] = useState<Tab>('locations')

  return (
    <ScreenShell>
      <header className="flex items-center gap-4 pt-2">
        <IconButton label="Back" onClick={closeSettings}>
          <ArrowLeft aria-hidden />
        </IconButton>
        <h1 className="display text-5xl">Settings</h1>
      </header>

      <div role="tablist" aria-label="Settings sections" className="grid grid-cols-2 gap-1 rounded-xl bg-surface p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`min-h-12 rounded-lg text-lg font-semibold transition-colors duration-150 ${
              tab === t.id ? 'bg-raised text-paper' : 'text-muted hover:text-paper'
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
