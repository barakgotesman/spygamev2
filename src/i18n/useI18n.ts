import { useLocaleStore } from '../store/useLocaleStore'
import type { Location } from '../types/game'
import { en, type Messages } from './en'
import { he } from './he'
import { langDir, type Dir, type Lang } from './lang'

const messages: Record<Lang, Messages> = { en, he }

/** Hebrew names for the built-in locations, keyed by location id. Custom locations keep what was typed. */
const hebrewLocationNames: Readonly<Record<string, string>> = {
  spa: 'ספא',
  casino: 'קזינו',
  wedding: 'חתונה',
  airplane: 'מטוס',
  'amusement-park': 'לונה פארק',
  'night-club': 'מועדון לילה',
  pub: 'פאב',
  restaurant: 'מסעדה',
  supermarket: 'סופרמרקט',
}

type I18n = {
  m: Messages
  lang: Lang
  dir: Dir
  locationName: (location: Location) => string
}

export function useI18n(): I18n {
  const lang = useLocaleStore((s) => s.lang)
  return {
    m: messages[lang],
    lang,
    dir: langDir(lang),
    locationName: (location) => (lang === 'he' ? (hebrewLocationNames[location.id] ?? location.name) : location.name),
  }
}
