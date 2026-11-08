import { useEffect, useState } from 'react'

/** Current timestamp, refreshed every `intervalMs` while `active`. */
export function useNow(active: boolean, intervalMs = 250): number {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    if (!active) return
    const id = setInterval(() => setNow(Date.now()), intervalMs)
    return () => clearInterval(id)
  }, [active, intervalMs])
  // Fresh read when inactive so the first running frame never uses a stale timestamp.
  // eslint-disable-next-line react-hooks/purity
  return active ? now : Date.now()
}
