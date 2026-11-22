export type Lang = 'en' | 'he'

export const langs: readonly Lang[] = ['en', 'he']

export type Dir = 'ltr' | 'rtl'

export function langDir(lang: Lang): Dir {
  return lang === 'he' ? 'rtl' : 'ltr'
}
