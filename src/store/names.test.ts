import { MAX_NAME_LENGTH, useGameStore } from './useGameStore'

describe('player names', () => {
  beforeEach(() => useGameStore.setState({ names: [] }))

  it('stores a name by seat, padding the seats before it', () => {
    useGameStore.getState().setName(2, 'Dana')
    expect(useGameStore.getState().names).toEqual(['', '', 'Dana'])
  })
  it('caps the length so a name always fits its card', () => {
    useGameStore.getState().setName(0, 'x'.repeat(MAX_NAME_LENGTH + 10))
    expect(useGameStore.getState().names[0]).toHaveLength(MAX_NAME_LENGTH)
  })
  it('keeps names when a game is reset', () => {
    useGameStore.getState().setName(0, 'Dana')
    useGameStore.getState().reset()
    expect(useGameStore.getState().names[0]).toBe('Dana')
  })
})
