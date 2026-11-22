/** Each seat gets its own ink. Class names are written out so Tailwind keeps them. */
const seatInks = [
  { bg: 'bg-pink', fg: 'text-ink' },
  { bg: 'bg-blue', fg: 'text-paper' },
  { bg: 'bg-yellow', fg: 'text-ink' },
  { bg: 'bg-teal', fg: 'text-ink' },
  { bg: 'bg-orange', fg: 'text-ink' },
  { bg: 'bg-violet', fg: 'text-ink' },
] as const

export function seatInk(seat: number): (typeof seatInks)[number] {
  return seatInks[seat % seatInks.length] ?? seatInks[0]
}

/** "03" style serial for a seat. */
export function seatNumber(seat: number): string {
  return String(seat + 1).padStart(2, '0')
}
