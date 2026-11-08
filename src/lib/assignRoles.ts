import type { Location, Round, RoundConfig } from '../types/game'
import { shuffle } from './shuffle'

/** Picks a random location and `spies` distinct random seats. Throws if there are no locations. */
export function createRound(
  config: RoundConfig,
  locations: readonly Location[],
  random: () => number = Math.random,
): Round {
  const location = locations[Math.floor(random() * locations.length)]
  if (!location) throw new Error('Cannot start a round without locations')

  const seats = Array.from({ length: config.players }, (_, seat) => seat)
  const spySeats = shuffle(seats, random)
    .slice(0, config.spies)
    .sort((a, b) => a - b)

  return { ...config, location, spySeats }
}
