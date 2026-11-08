/** Each seat gets its own ticket stock. Class names are written out so Tailwind keeps them. */
const seatStocks = [
  { name: 'tangerine', bg: 'bg-tangerine' },
  { name: 'sky', bg: 'bg-sky' },
  { name: 'bubblegum', bg: 'bg-bubblegum' },
  { name: 'mint', bg: 'bg-mint' },
  { name: 'canary', bg: 'bg-canary' },
  { name: 'lilac', bg: 'bg-lilac' },
] as const

export function seatStock(seat: number): (typeof seatStocks)[number] {
  return seatStocks[seat % seatStocks.length] ?? seatStocks[0]
}

/** "03" style serial for a seat. */
export function seatNumber(seat: number): string {
  return String(seat + 1).padStart(2, '0')
}
