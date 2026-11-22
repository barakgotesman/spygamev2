import { en } from '../i18n/en'
import { he } from '../i18n/he'
import { detectLang } from './detectLang'
import { plural, pluralForm } from './plural'

describe('pluralForm', () => {
  it('English distinguishes one and other', () => {
    expect(pluralForm('en', 1)).toBe('one')
    expect(pluralForm('en', 2)).toBe('other')
    expect(pluralForm('en', 0)).toBe('other')
  })
  it('Hebrew has a dual', () => {
    expect(pluralForm('he', 1)).toBe('one')
    expect(pluralForm('he', 2)).toBe('two')
    expect(pluralForm('he', 5)).toBe('other')
  })
})

describe('plural', () => {
  const forms = { one: 'a', two: 'b', other: 'c' }
  it('picks the matching form', () => {
    expect(plural('he', 1, forms)).toBe('a')
    expect(plural('he', 2, forms)).toBe('b')
    expect(plural('he', 9, forms)).toBe('c')
  })
  it('falls back to other when two is not given', () => {
    expect(plural('he', 2, { one: 'a', other: 'c' })).toBe('c')
  })
})

describe('detectLang', () => {
  it('picks Hebrew for he and the legacy iw code', () => {
    expect(detectLang(['he-IL'])).toBe('he')
    expect(detectLang(['iw'])).toBe('he')
  })
  it('respects preference order', () => {
    expect(detectLang(['en-US', 'he'])).toBe('en')
    expect(detectLang(['fr-FR', 'he-IL'])).toBe('he')
  })
  it('falls back to English', () => {
    expect(detectLang([])).toBe('en')
    expect(detectLang(['fr-FR'])).toBe('en')
  })
})

describe('messages', () => {
  it('Hebrew counted strings use the dual and plural forms', () => {
    expect(he.round.votes(1)).toBe('קול אחד')
    expect(he.round.votes(2)).toBe('שני קולות')
    expect(he.round.votes(7)).toBe('7 קולות')
    expect(he.settings.postcards(2)).toBe('שתי גלויות')
  })
  it('English counted strings pluralise', () => {
    expect(en.round.votes(1)).toBe('1 vote')
    expect(en.round.votes(3)).toBe('3 votes')
    expect(en.setup.spies(1)).toBe('Spy')
    expect(en.setup.spies(2)).toBe('Spies')
  })
})
