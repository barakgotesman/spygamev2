import { defaultLocations } from '../data/defaultLocations'
import { createRound } from './assignRoles'
import { MAX_PLAYERS, setPlayers, setSpies } from './clampCounts'
import { formatTime } from './formatTime'
import { shuffle } from './shuffle'

describe('formatTime', () => {
  it('pads seconds', () => {
    expect(formatTime(7 * 60 * 1000)).toBe('7:00')
    expect(formatTime(65_000)).toBe('1:05')
  })
  it('never goes negative', () => {
    expect(formatTime(-500)).toBe('0:00')
  })
  it('rounds partial seconds up', () => {
    expect(formatTime(59_001)).toBe('1:00')
  })
})

describe('shuffle', () => {
  it('keeps all items and does not mutate input', () => {
    const input = [1, 2, 3, 4, 5]
    const out = shuffle(input)
    expect(out).toHaveLength(5)
    expect([...out].sort()).toEqual(input)
    expect(input).toEqual([1, 2, 3, 4, 5])
  })
})

describe('clampCounts', () => {
  it('lowers spies when players drop', () => {
    expect(setPlayers({ players: 5, spies: 4 }, 3)).toEqual({ players: 3, spies: 2 })
  })
  it('bounds players', () => {
    expect(setPlayers({ players: 2, spies: 1 }, 1).players).toBe(2)
    expect(setPlayers({ players: 2, spies: 1 }, 99).players).toBe(MAX_PLAYERS)
  })
  it('keeps at least one civilian and one spy', () => {
    expect(setSpies({ players: 4, spies: 1 }, 9).spies).toBe(3)
    expect(setSpies({ players: 4, spies: 2 }, 0).spies).toBe(1)
  })
})

describe('createRound', () => {
  it('assigns exactly N distinct valid spy seats', () => {
    for (let i = 0; i < 200; i++) {
      const round = createRound({ players: 6, spies: 2 }, defaultLocations)
      expect(new Set(round.spySeats).size).toBe(2)
      expect(round.spySeats.every((s) => s >= 0 && s < 6)).toBe(true)
    }
  })
  it('throws without locations', () => {
    expect(() => createRound({ players: 3, spies: 1 }, [])).toThrow()
  })
})
