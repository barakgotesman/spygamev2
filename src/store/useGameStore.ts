import { create } from 'zustand'
import { createRound } from '../lib/assignRoles'
import { setPlayers, setSpies } from '../lib/clampCounts'
import type { Location, Phase, Round, RoundConfig } from '../types/game'

export type TimerState =
  | { status: 'idle' }
  | { status: 'running'; endsAt: number }
  | { status: 'paused'; remainingMs: number }
  | { status: 'finished' }

type GameState = {
  phase: Phase
  config: RoundConfig
  round: Round | null
  /** 0-based seat currently looking at their role. */
  revealSeat: number
  timer: TimerState
  votes: number[]

  changePlayers: (delta: number) => void
  changeSpies: (delta: number) => void
  startGame: (locations: readonly Location[]) => boolean
  nextReveal: () => void
  startTimer: (durationMs: number) => void
  pauseTimer: () => void
  resumeTimer: () => void
  finishTimer: () => void
  vote: (seat: number, delta: 1 | -1) => void
  openSettings: () => void
  closeSettings: () => void
  reset: () => void
}

const initialConfig: RoundConfig = { players: 4, spies: 1 }

export const useGameStore = create<GameState>()((set, get) => ({
  phase: 'setup',
  config: initialConfig,
  round: null,
  revealSeat: 0,
  timer: { status: 'idle' },
  votes: [],

  changePlayers: (delta) => set((s) => ({ config: setPlayers(s.config, s.config.players + delta) })),
  changeSpies: (delta) => set((s) => ({ config: setSpies(s.config, s.config.spies + delta) })),

  startGame: (locations) => {
    if (locations.length === 0) return false
    const round = createRound(get().config, locations)
    set({
      round,
      phase: 'reveal',
      revealSeat: 0,
      timer: { status: 'idle' },
      votes: Array.from({ length: round.players }, () => 0),
    })
    return true
  },

  nextReveal: () => {
    const { round, revealSeat } = get()
    if (!round) return
    if (revealSeat + 1 < round.players) set({ revealSeat: revealSeat + 1 })
    else set({ phase: 'round' })
  },

  startTimer: (durationMs) => set({ timer: { status: 'running', endsAt: Date.now() + durationMs } }),
  pauseTimer: () => {
    const { timer } = get()
    if (timer.status === 'running') set({ timer: { status: 'paused', remainingMs: Math.max(0, timer.endsAt - Date.now()) } })
  },
  resumeTimer: () => {
    const { timer } = get()
    if (timer.status === 'paused') set({ timer: { status: 'running', endsAt: Date.now() + timer.remainingMs } })
  },
  finishTimer: () => set({ timer: { status: 'finished' } }),

  vote: (seat, delta) =>
    set((s) => {
      const used = s.votes.reduce((a, b) => a + b, 0)
      const current = s.votes[seat] ?? 0
      if (delta === 1 && used >= s.config.players) return s
      if (delta === -1 && current === 0) return s
      return { votes: s.votes.map((v, i) => (i === seat ? v + delta : v)) }
    }),

  openSettings: () => set({ phase: 'settings' }),
  closeSettings: () => set({ phase: 'setup' }),
  reset: () => set({ phase: 'setup', round: null, revealSeat: 0, timer: { status: 'idle' }, votes: [] }),
}))
