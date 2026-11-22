import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Lang } from '../i18n/lang'
import { detectLang } from '../lib/detectLang'

type LocaleState = {
  lang: Lang
  setLang: (lang: Lang) => void
}

function browserLang(): Lang {
  if (typeof navigator === 'undefined') return 'en'
  return detectLang(navigator.languages?.length ? navigator.languages : [navigator.language])
}

/** Persisted choice wins; on first launch the browser language decides. */
export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      lang: browserLang(),
      setLang: (lang) => set({ lang }),
    }),
    { name: 'spygame-locale', version: 1 },
  ),
)
