import { Plus, RotateCcw, Trash2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { LocationIcon } from '../../components/LocationIcon'
import { useSettingsStore } from '../../store/useSettingsStore'

const fieldClass =
  'min-h-14 w-full rounded-xl border border-line bg-surface px-4 text-lg text-paper focus:border-signal focus:outline-none'

export function LocationsTab(): React.JSX.Element {
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
      <form onSubmit={submit} className="flex flex-col gap-3">
        <label className="flex flex-col gap-2 text-base text-muted">
          Location name
          <input className={fieldClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="Library" maxLength={40} />
        </label>
        <label className="flex flex-col gap-2 text-base text-muted">
          Image URL (optional)
          <input
            className={fieldClass}
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://…"
            inputMode="url"
            type="url"
          />
        </label>
        <Button type="submit" variant="primary" disabled={!name.trim()}>
          <Plus aria-hidden /> Add location
        </Button>
      </form>

      <section aria-label="Locations" className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <h2 className="display text-4xl">{locations.length} locations</h2>
          <button
            type="button"
            onClick={resetLocations}
            className="flex min-h-11 items-center gap-2 px-2 text-base text-muted hover:text-paper"
          >
            <RotateCcw className="size-4" aria-hidden /> Restore defaults
          </button>
        </div>
        {locations.length === 0 && <p className="rounded-2xl bg-surface p-5 text-muted">No locations yet. Add one above or restore the defaults.</p>}
        <ul className="flex flex-col gap-2">
          {locations.map((loc) => {
            return (
              <li key={loc.id} className="flex items-center gap-3 rounded-2xl bg-surface p-3 pl-4">
                {loc.imageUrl ? (
                  <img src={loc.imageUrl} alt="" className="size-10 shrink-0 rounded-lg object-cover" />
                ) : (
                  <LocationIcon name={loc.icon} className="size-6 shrink-0 text-signal" />
                )}
                <span className="min-w-0 flex-1 truncate text-lg">{loc.name}</span>
                <IconButton label={`Delete ${loc.name}`} onClick={() => removeLocation(loc.id)}>
                  <Trash2 aria-hidden />
                </IconButton>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
