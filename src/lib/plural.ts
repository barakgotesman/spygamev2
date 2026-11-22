import type { Lang } from '../i18n/lang'

type PluralForm = 'one' | 'two' | 'other'

/** CLDR plural category, folded to the three forms our copy distinguishes (Hebrew has a dual). */
export function pluralForm(lang: Lang, n: number): PluralForm {
  const form = new Intl.PluralRules(lang).select(n)
  return form === 'one' || form === 'two' ? form : 'other'
}

type PluralForms = { one: string; two?: string; other: string }

/** Picks the right wording for a count; a missing `two` falls back to `other`. */
export function plural(lang: Lang, n: number, forms: PluralForms): string {
  const form = pluralForm(lang, n)
  return (form === 'two' ? forms.two : forms[form]) ?? forms.other
}
