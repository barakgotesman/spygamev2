import { Link } from 'react-router'
import { ButtonLink } from '../components/ButtonLink'
import { PostcardFan } from '../components/PostcardFan'
import { PlacesCarousel } from '../components/PlacesCarousel'
import { Scene } from '../components/Scene'
import { Section } from '../components/Section'
import { defaultLocation, defaultLocations } from '../data/defaultLocations'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useI18n } from '../i18n/useI18n'

/** Which postcard illustrates each of the three steps. */
const stepScenes = ['casino', 'airplane', 'pub'] as const
const whyInks = ['bg-pink', 'bg-yellow', 'bg-teal', 'bg-orange', 'bg-violet'] as const

export function HomePage(): React.JSX.Element {
  const { m } = useI18n()
  useDocumentMeta(m.meta.home)

  return (
    <>
      <section className="grid items-center gap-10 md:grid-cols-2" aria-labelledby="hero-heading">
        <div className="flex flex-col items-start gap-6">
          <p className="print text-sm">{m.home.eyebrow}</p>
          <h1 id="hero-heading" className="display text-5xl sm:text-6xl lg:text-7xl">
            {m.home.titleLead}{' '}
            <span className="relative inline-block -rotate-2 text-paper">
              <span aria-hidden className="absolute -inset-x-2 inset-y-0.5 -z-10 -skew-x-6 rounded-md border-[3px] border-ink bg-pink shadow-hard" />
              {m.home.titleMark}
            </span>
          </h1>
          <p className="max-w-prose text-xl leading-snug">{m.home.lede}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <ButtonLink to="/play" variant="pink" className="display min-h-16 px-8 text-2xl font-normal">
              {m.common.dealCta}
            </ButtonLink>
            <ButtonLink to="/how-to-play" variant="paper" className="min-h-16">
              {m.home.seeRules}
            </ButtonLink>
          </div>
        </div>
        <PostcardFan locations={defaultLocations} size="lg" />
      </section>

      <Section title={m.home.stepsTitle} id="steps">
        <ol className="grid gap-8 md:grid-cols-3">
          {m.home.steps.map((step, i) => {
            const scene = defaultLocation(stepScenes[i] ?? 'casino')
            return (
              <li
                key={step.title}
                className={`flex flex-col gap-3 rounded-2xl border-[3px] border-ink bg-card p-3 shadow-hard-lg ${i % 2 ? 'md:rotate-1' : 'md:-rotate-1'}`}
              >
                {scene && <Scene location={scene} className="aspect-[4/3] w-full rounded-lg border-[3px] border-ink" />}
                <div className="flex items-start gap-3 px-1 pb-2">
                  <span dir="ltr" aria-hidden className="display grid size-10 shrink-0 place-items-center rounded-lg border-[3px] border-dashed border-ink bg-yellow text-xl">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="display text-2xl">{step.title}</h3>
                    <p className="mt-1 leading-snug">{step.body}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </Section>

      <Section title={m.home.placesTitle} id="places">
        <p className="max-w-prose text-lg">{m.home.placesBody}</p>
        <PlacesCarousel locations={defaultLocations} />
        <Link to="/locations" className="text-lg font-bold underline decoration-[3px] underline-offset-8 self-start">
          {m.home.placesLink}
        </Link>
      </Section>

      <Section title={m.home.whyTitle} id="why">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {m.home.why.map((item, i) => (
            <li key={item.title} className="flex gap-3 rounded-xl border-[3px] border-ink bg-card p-4 shadow-hard">
              <span aria-hidden className={`mt-1 size-4 shrink-0 rounded-full border-[3px] border-ink ${whyInks[i % whyInks.length]}`} />
              <div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-1 leading-snug">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <section className="flex flex-col items-center gap-5 rounded-2xl border-[3px] border-ink bg-blue p-8 text-center text-paper shadow-hard-lg sm:p-12">
        <h2 className="display text-4xl sm:text-5xl">{m.home.ctaTitle}</h2>
        <p className="text-xl">{m.home.ctaBody}</p>
        <ButtonLink to="/play" variant="pink" className="display min-h-16 px-8 text-2xl font-normal">
          {m.common.dealCta}
        </ButtonLink>
      </section>
    </>
  )
}
