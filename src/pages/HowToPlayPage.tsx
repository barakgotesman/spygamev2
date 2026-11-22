import { Eye, EyeOff, Hand, MessageCircleQuestion, SlidersHorizontal, Drama, Check, X, type LucideIcon } from 'lucide-react'
import { ButtonLink } from '../components/ButtonLink'
import { Postcard } from '../components/Postcard'
import { Scene } from '../components/Scene'
import { Section } from '../components/Section'
import { defaultLocation } from '../data/defaultLocations'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useI18n } from '../i18n/useI18n'

const stepIcons: LucideIcon[] = [SlidersHorizontal, Eye, MessageCircleQuestion, Hand, Drama]
const stepInks = ['bg-yellow', 'bg-pink text-paper', 'bg-teal', 'bg-blue text-paper', 'bg-orange']
const noteInks = ['bg-yellow', 'bg-teal', 'bg-pink text-paper', 'bg-orange', 'bg-yellow', 'bg-teal']

/** Speech bubble; the tail is a rotated square tucked under the edge nearest the speaker. */
function Bubble({ text, tone, flip }: { text: string; tone: 'good' | 'bad'; flip: boolean }): React.JSX.Element {
  const good = tone === 'good'
  return (
    <li className={`flex ${flip ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`relative max-w-[92%] rounded-2xl border-[3px] border-ink px-4 py-3 text-lg leading-snug shadow-hard sm:max-w-[80%] ${flip ? 'rotate-[0.6deg]' : '-rotate-[0.6deg]'}`}
      >
        <span
          aria-hidden
          className={`absolute -bottom-[9px] size-4 rotate-45 border-b-[3px] border-ink bg-card ${flip ? 'end-6 border-e-[3px]' : 'start-6 border-s-[3px]'}`}
        />
        <span className={`flex items-start gap-3 `}>
          <span
            aria-hidden
            className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border-[3px] border-ink ${good ? 'bg-teal' : 'bg-pink text-paper'}`}
          >
            {good ? <Check className="size-3.5" strokeWidth={4} /> : <X className="size-3.5" strokeWidth={4} />}
          </span>
          <span>{text}</span>
        </span>
      </div>
    </li>
  )
}

function Notes({ title, items, offset }: { title: string; items: readonly string[]; offset: number }): React.JSX.Element {
  return (
    <div>
      <h3 className="print mb-4 text-sm">{title}</h3>
      <ul className="grid gap-4 sm:grid-cols-3">
        {items.map((item, i) => (
          <li
            key={item}
            className={`relative min-h-32 rounded-sm border-[3px] border-ink p-4 pt-6 text-lg leading-snug font-semibold shadow-hard ${noteInks[(i + offset) % noteInks.length]} ${(i + offset) % 2 ? 'rotate-2' : '-rotate-2'}`}
          >
            <span aria-hidden className="absolute -top-3 start-1/2 h-5 w-14 -translate-x-1/2 rotate-2 border-[3px] border-ink bg-paper/80 rtl:translate-x-1/2" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function HowToPlayPage(): React.JSX.Element {
  const { m, locationName } = useI18n()
  const h = m.howTo
  const sample = defaultLocation('casino')
  useDocumentMeta(m.meta.howTo)

  return (
    <>
      <header className="flex max-w-3xl flex-col gap-4">
        <h1 className="display text-5xl sm:text-6xl">{h.title}</h1>
        <p className="text-xl leading-snug">{h.intro}</p>
      </header>

      <Section title={h.stepsTitle} id="steps">
        <div className="relative">
          {/* The airmail route the round travels along; cards hang off it, alternating sides. */}
          <span aria-hidden className="absolute inset-y-4 start-1/2 hidden w-0 border-s-[3px] border-dashed border-ink/40 md:block" />
          <ol className="relative flex flex-col gap-8 md:gap-6">
            {h.steps.map((step, i) => {
              const Icon = stepIcons[i % stepIcons.length] ?? Eye
              return (
                <li key={step.title} className={`md:w-[62%] ${i % 2 ? 'md:ms-auto' : ''}`}>
                  <div
                    className={`relative rounded-xl border-[3px] border-ink p-5 ps-24 shadow-hard-lg ${stepInks[i % stepInks.length]} ${i % 2 ? 'rotate-1' : '-rotate-1'}`}
                  >
                    <span
                      aria-hidden
                      className="absolute start-4 top-4 grid size-16 -rotate-6 place-items-center rounded-full border-[3px] border-ink bg-paper text-ink outline-2 -outline-offset-[9px] outline-ink/40 outline-dashed"
                    >
                      <Icon className="size-7" strokeWidth={2.5} />
                    </span>
                    <h3 className="display text-2xl sm:text-3xl">{step.title}</h3>
                    <p className="mt-1 max-w-prose text-lg leading-snug">{step.body}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </Section>

      <Section title={h.rolesTitle} id="roles">
        <div className="grid items-start gap-8 sm:grid-cols-2">
          <div>
            <Postcard className="-rotate-2">
              {sample && <Scene location={sample} className="aspect-[4/3] w-full" />}
              <p className="display px-4 py-3 text-2xl">
                <Eye aria-hidden className="me-2 inline size-6 align-[-3px]" />
                <bdi>{sample ? locationName(sample) : ''}</bdi>
              </p>
            </Postcard>
            <h3 className="display mt-5 text-3xl">{h.restRole.title}</h3>
            <p className="mt-1 text-lg leading-snug">{h.restRole.body}</p>
          </div>
          <div>
            <Postcard className="rotate-2">
              <div className="halftone grid aspect-[4/3] w-full place-items-center bg-yellow">
                <span aria-hidden className="display text-[7rem] leading-none text-pink [text-shadow:4px_4px_0_var(--color-ink)]">
                  ?
                </span>
              </div>
              <p className="display px-4 py-3 text-2xl">
                <EyeOff aria-hidden className="me-2 inline size-6 align-[-3px]" />
                {m.reveal.lostInMail}
              </p>
            </Postcard>
            <h3 className="display mt-5 text-3xl">{h.spyRole.title}</h3>
            <p className="mt-1 text-lg leading-snug">{h.spyRole.body}</p>
          </div>
        </div>
      </Section>

      <Section title={h.questionsTitle} id="questions">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="print mb-4 text-sm">{h.goodTitle}</h3>
            <ul className="flex flex-col gap-5 pb-2">
              {h.good.map((q, i) => (
                <Bubble key={q} text={q} tone="good" flip={i % 2 === 1} />
              ))}
            </ul>
          </div>
          <div>
            <h3 className="print mb-4 text-sm">{h.badTitle}</h3>
            <ul className="flex flex-col gap-5 pb-2">
              {h.bad.map((q, i) => (
                <Bubble key={q} text={q} tone="bad" flip={i % 2 === 0} />
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section title={h.tipsTitle} id="tips">
        <Notes title={h.spyTipsTitle} items={h.spyTips} offset={0} />
        <Notes title={h.restTipsTitle} items={h.restTips} offset={3} />
        <aside className="-rotate-1 self-start rounded-xl border-[3px] border-dashed border-ink bg-card p-5 shadow-hard">
          <h3 className="print text-sm">{h.houseRuleTitle}</h3>
          <p className="mt-2 max-w-prose text-lg leading-snug">{h.houseRule}</p>
        </aside>
      </Section>

      <Section title={h.faqTitle} id="faq">
        <div className="flex flex-col gap-3">
          {h.faq.map((item) => (
            <details key={item.q} className="group rounded-xl border-[3px] border-ink bg-card shadow-hard">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
                {item.q}
                <span aria-hidden className="display text-2xl transition-transform duration-150 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="max-w-prose px-4 pb-4 text-lg leading-snug">{item.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <section className="flex flex-col items-center gap-5 rounded-2xl border-[3px] border-ink bg-blue p-8 text-center text-paper shadow-hard-lg">
        <h2 className="display text-4xl">{h.ctaTitle}</h2>
        <ButtonLink to="/play" variant="pink" className="display min-h-16 px-8 text-2xl font-normal">
          {m.common.dealCta}
        </ButtonLink>
      </section>
    </>
  )
}
