import { roundOutcome } from './outcome'

describe('roundOutcome', () => {
  it('is closed when nobody voted', () => {
    expect(roundOutcome([0, 0, 0, 0], [2])).toBe('closed')
  })
  it('catches a single spy who got the most votes', () => {
    expect(roundOutcome([1, 0, 3, 0], [2])).toBe('caught')
  })
  it('lets the spy escape when someone else got the most votes', () => {
    expect(roundOutcome([3, 0, 1, 0], [2])).toBe('escaped')
  })
  it('treats a tie at the top as an escape', () => {
    expect(roundOutcome([2, 0, 2, 0], [2])).toBe('escaped')
  })
  it('lets the spy escape when they got no votes but others did', () => {
    expect(roundOutcome([2, 1, 0, 0], [3])).toBe('escaped')
  })
  it('catches several spies only when all of them are the most voted', () => {
    expect(roundOutcome([3, 2, 1, 0], [0, 1])).toBe('caught')
    expect(roundOutcome([3, 1, 2, 0], [0, 1])).toBe('escaped')
  })
  it('treats a tie across the cut-off of several spies as an escape', () => {
    expect(roundOutcome([3, 1, 1, 0], [0, 1])).toBe('escaped')
  })
})
