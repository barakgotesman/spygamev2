import { useLayoutEffect, useRef } from 'react'

type FitOptions = {
  /** Largest and smallest font size in px for the headline. */
  max: number
  min: number
  /** Whether an optional element may be hidden if the content still overflows at `min`. */
  hasOptional?: boolean
}

/**
 * Shrinks the headline's font size until the content fits inside the box, so text is never cut
 * off whatever the screen height or the location name. Returns refs to attach; runs before paint
 * on mount and whenever the box is resized.
 */
export function useFitText({ max, min, hasOptional = false }: FitOptions, deps: readonly unknown[]) {
  const box = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const headline = useRef<HTMLParagraphElement>(null)
  const optional = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const boxEl = box.current
    const contentEl = content.current
    const headlineEl = headline.current
    if (!boxEl || !contentEl || !headlineEl) return

    const fits = (): boolean => contentEl.scrollHeight <= boxEl.clientHeight && contentEl.scrollWidth <= boxEl.clientWidth
    const shrink = (): void => {
      let size = max
      headlineEl.style.fontSize = `${size}px`
      while (!fits() && size > min) {
        size -= 2
        headlineEl.style.fontSize = `${size}px`
      }
    }

    const fit = (): void => {
      const extra = hasOptional ? optional.current : null
      if (extra) extra.style.display = ''
      shrink()
      if (!fits() && extra) {
        extra.style.display = 'none'
        shrink()
      }
    }

    fit()
    // The display font loads after first paint; re-fit once real glyph metrics are known.
    let active = true
    void document.fonts.ready.then(() => {
      if (active) fit()
    })
    const onFontLoad = (): void => fit()
    document.fonts.addEventListener('loadingdone', onFontLoad)
    const observer = new ResizeObserver(fit)
    observer.observe(boxEl)
    return () => {
      active = false
      document.fonts.removeEventListener('loadingdone', onFontLoad)
      observer.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { box, content, headline, optional }
}
