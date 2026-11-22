export type Outcome = 'caught' | 'escaped' | 'closed'

/**
 * How the vote went. `caught` only when the most-voted seats are exactly the spies and the
 * group did not tie at the cut-off; any other vote means the spy got away; no votes at all
 * means the table never decided, so the round is simply `closed`.
 */
export function roundOutcome(votes: readonly number[], spySeats: readonly number[]): Outcome {
  if (votes.every((v) => v === 0)) return 'closed'

  const ranked = votes.map((count, seat) => ({ count, seat })).sort((a, b) => b.count - a.count)
  const cut = spySeats.length
  const lastIn = ranked[cut - 1]?.count ?? 0
  const firstOut = ranked[cut]?.count
  if (lastIn === 0 || firstOut === lastIn) return 'escaped'

  const accused = new Set(ranked.slice(0, cut).map((r) => r.seat))
  return spySeats.every((seat) => accused.has(seat)) ? 'caught' : 'escaped'
}
