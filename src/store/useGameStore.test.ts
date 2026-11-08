import { defaultLocations } from '../data/defaultLocations'
import { useGameStore } from './useGameStore'

const get = () => useGameStore.getState()

beforeEach(() => {
  get().reset()
  useGameStore.setState({ config: { players: 3, spies: 1 } })
})

describe('useGameStore', () => {
  it('refuses to start without locations', () => {
    expect(get().startGame([])).toBe(false)
    expect(get().phase).toBe('setup')
  })

  it('walks every seat through reveal, then starts the round', () => {
    get().startGame(defaultLocations)
    expect(get().phase).toBe('reveal')
    get().nextReveal()
    get().nextReveal()
    expect(get().phase).toBe('reveal')
    get().nextReveal()
    expect(get().phase).toBe('round')
  })

  it('caps total votes at the player count and floors at zero', () => {
    get().startGame(defaultLocations)
    for (let i = 0; i < 10; i++) get().vote(0, 1)
    expect(get().votes).toEqual([3, 0, 0])
    get().vote(1, -1)
    expect(get().votes[1]).toBe(0)
  })

  it('pauses and resumes the timer with remaining time', () => {
    get().startTimer(60_000)
    get().pauseTimer()
    const t = get().timer
    expect(t.status).toBe('paused')
    get().resumeTimer()
    expect(get().timer.status).toBe('running')
  })
})
