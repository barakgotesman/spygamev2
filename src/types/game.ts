export type Phase = 'setup' | 'reveal' | 'round' | 'settings'

export type Location = {
  id: string
  name: string
  /** Key into `locationIcons`; unknown keys fall back to a map pin. */
  icon: string
  /** Optional user-provided image URL. */
  imageUrl?: string
}

export type RoundConfig = {
  players: number
  spies: number
}

export type Round = RoundConfig & {
  location: Location
  /** 0-based seat indexes that are spies. */
  spySeats: number[]
}
