import type { RoundConfig } from '../types/game'

export const MIN_PLAYERS = 2
export const MAX_PLAYERS = 20

/** Spies must stay below the player count so at least one civilian remains. */
export function maxSpies(players: number): number {
  return Math.max(1, players - 1)
}

export function setPlayers(config: RoundConfig, players: number): RoundConfig {
  const next = Math.min(MAX_PLAYERS, Math.max(MIN_PLAYERS, players))
  return { players: next, spies: Math.min(config.spies, maxSpies(next)) }
}

export function setSpies(config: RoundConfig, spies: number): RoundConfig {
  return { ...config, spies: Math.min(maxSpies(config.players), Math.max(1, spies)) }
}
