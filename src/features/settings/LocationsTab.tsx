import { Plus, RotateCcw, Trash2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { Scene } from '../../components/Scene'
import { useI18n } from '../../i18n/useI18n'
import { useSettingsStore } from '../../store/useSettingsStore'

const fieldClass =
  'min-h-14 w-full rounded-xl border-[3px] border-ink bg-card px-4 text-lg font-medium text-ink shadow-[inset_3px_3px_0_oklch(0.25_0.07_285/0.12)] focus:outline-4 focus:outline-offset-0 focus:outline-blue/50'

export function LocationsTab(): React.JSX.Element {
  const { m, locationName } = useI18n()
  const locations = useSettingsStore((s) => s.locations)
  const addLocation = useSettingsStore((s) => s.addLocation)
  const removeLocation = useSettingsStore((s) => s.removeLocation)
  const resetLocations = useSettingsStore((s) => s.resetLocations)
  const [name, setName] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const submit = (e: FormEvent): void => {
    e.preventDefault()
    addLocation(name, imageUrl)
    setName('')
    setImageUrl('')
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={submit} className="flex flex-col gap-3 rounded-2xl border-[3px] border-ink bg-yellow p-4 shadow-hard-lg">
        <label className="print flex flex-col gap-2 text-sm">
          {m.settings.newLocation}
          <input className={fieldClass} value={name} onChange={(e) => setName(e.target.value)} placeholder={m.settings.namePlaceholder} maxLength={40} />
        </label>
        <label className="print flex flex-col gap-2 text-sm">
          {m.settings.pictureUrl}
          <input
            className={fieldClass}
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://…"
            inputMode="url"
            type="url"
            dir="ltr"
          />
        </label>
        <Button type="submit" variant="ink" disabled={!name.trim()}>
          <Plus aria-hidden /> {m.settings.addLocation}
        </Button>
      </form>

      <section aria-label={m.settings.tabLocations} className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="display text-3xl">{m.settings.postcards(locations.length)}</h2>
          <button
            type="button"
            onClick={resetLocations}
            className="print flex min-h-11 items-center gap-2 px-2 text-sm whitespace-nowrap underline decoration-2 underline-offset-4"
          >
            <RotateCcw className="size-4" aria-hidden /> {m.settings.restore}
          </button>
        </div>
        {locations.length === 0 && (
          <p className="rounded-xl border-[3px] border-ink bg-card p-5 font-medium">{m.settings.empty}</p>
        )}
        <ul className="grid grid-cols-2 gap-3">
          {locations.map((loc, i) => (
            <li
              key={loc.id}
              className={`relative overflow-hidden rounded-lg border-[3px] border-ink bg-card p-1.5 shadow-hard ${i % 2 ? 'rotate-1' : '-rotate-1'}`}
            >
              <Scene location={loc} className="aspect-[4/3] w-full rounded-sm" />
              <div className="flex items-center gap-1 pt-1.5 ps-1">
                <bdi className="min-w-0 flex-1 truncate font-bold">{locationName(loc)}</bdi>
                <IconButton label={m.settings.deleteLocation(locationName(loc))} className="size-11 border-2 shadow-none" onClick={() => removeLocation(loc.id)}>
                  <Trash2 className="size-5" aria-hidden />
                </IconButton>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
