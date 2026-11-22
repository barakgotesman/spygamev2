import type { Lang } from '../i18n/lang'
import { useI18n } from '../i18n/useI18n'
import { useLocaleStore } from '../store/useLocaleStore'

const labels: Record<Lang, string> = { en: 'EN', he: 'עברית' }

/** One-tap switch: it shows the language you would switch *to*, written in that language. */
export function LanguageToggle(): React.JSX.Element {
  const { m, lang } = useI18n()
  const setLang = useLocaleStore((s) => s.setLang)
  const target: Lang = lang === 'he' ? 'en' : 'he'

  return (
    <button
      type="button"
      lang={target}
      aria-label={m.setup.switchLanguage}
      onClick={() => setLang(target)}
      className="display inline-flex size-12 shrink-0 items-center justify-center rounded-xl border-[3px] border-ink bg-card px-2 text-base shadow-hard transition-[translate,box-shadow] duration-100 ease-out active:translate-x-1 active:translate-y-1 active:shadow-none"
    >
      {labels[target]}
    </button>
  )
}
