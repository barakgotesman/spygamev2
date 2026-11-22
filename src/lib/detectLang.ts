import type { Lang } from '../i18n/lang'

/** First supported language in the browser's preference order; English when none match. */
export function detectLang(preferred: readonly string[]): Lang {
  for (const tag of preferred) {
    const base = tag.toLowerCase().split('-')[0]
    // Old ISO 639 code "iw" is still reported by some Android browsers.
    if (base === 'he' || base === 'iw') return 'he'
    if (base === 'en') return 'en'
  }
  return 'en'
}
