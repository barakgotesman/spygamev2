import { Plus, RotateCcw, Trash2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Button } from '../../components/Button'
import { IconButton } from '../../components/IconButton'
import { LocationIcon } from '../../components/LocationIcon'
import { useSettingsStore } from '../../store/useSettingsStore'

const fieldClass =
  'min-h-14 w-full rounded-xl border-[3px] border-ink bg-paper px-4 text-lg font-medium text-ink focus:outline-4 focus:outline-offset-0 focus:outline-ink/40'

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
        <label className="print flex flex-col gap-2 text-sm">
          Location name
          <input className={fieldClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="Library" maxLength={40} />
        </label>
        <label className="print flex flex-col gap-2 text-sm">
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
        <Button type="submit" variant="ink" disabled={!name.trim()}>
          <Plus aria-hidden /> Add location
        </Button>
      </form>

      <section aria-label="Locations" className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="display text-3xl">{locations.length} places</h2>
          <button
            type="button"
            onClick={resetLocations}
            className="print flex min-h-11 items-center gap-2 px-2 text-sm whitespace-nowrap underline decoration-2 underline-offset-4"
          >
            <RotateCcw className="size-4" aria-hidden /> Restore defaults
          </button>
        </div>
        {locations.length === 0 && <p className="rounded-2xl border-[3px] border-ink bg-paper p-5 font-medium">No locations yet. Add one above or restore the defaults.</p>}
        <ul className="flex flex-col gap-2">
          {locations.map((loc) => {
            return (
              <li key={loc.id} className="flex items-center gap-3 rounded-2xl border-[3px] border-ink bg-paper p-2 pl-4">
                {loc.imageUrl ? (
                  <img src={loc.imageUrl} alt="" className="size-10 shrink-0 rounded-lg object-cover" />
                ) : (
                  <LocationIcon name={loc.icon} className="size-6 shrink-0" />
                )}
                <span className="min-w-0 flex-1 truncate text-lg font-semibold">{loc.name}</span>
                <IconButton label={`Delete ${loc.name}`} className="size-11" onClick={() => removeLocation(loc.id)}>
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
