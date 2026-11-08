import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { defaultLocations } from '../data/defaultLocations'
import type { Location } from '../types/game'

export const MIN_MINUTES = 1
export const MAX_MINUTES = 60
export const DEFAULT_MINUTES = 7

type SettingsState = {
  locations: Location[]
  minutes: number
  addLocation: (name: string, imageUrl?: string) => void
  removeLocation: (id: string) => void
  resetLocations: () => void
  setMinutes: (minutes: number) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      locations: [...defaultLocations],
      minutes: DEFAULT_MINUTES,
      addLocation: (name, imageUrl) => {
        const trimmed = name.trim()
        if (!trimmed) return
        const url = imageUrl?.trim()
        const location: Location = {
          id: crypto.randomUUID(),
          name: trimmed,
          icon: 'pin',
          ...(url ? { imageUrl: url } : {}),
        }
        set((s) => ({ locations: [...s.locations, location] }))
      },
      removeLocation: (id) => set((s) => ({ locations: s.locations.filter((l) => l.id !== id) })),
      resetLocations: () => set({ locations: [...defaultLocations] }),
      setMinutes: (minutes) =>
        set({ minutes: Math.min(MAX_MINUTES, Math.max(MIN_MINUTES, Math.round(minutes) || DEFAULT_MINUTES)) }),
    }),
    { name: 'spygame-settings', version: 1 },
  ),
)
