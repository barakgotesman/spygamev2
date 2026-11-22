import { ButtonLink } from '../components/ButtonLink'
import { Scene } from '../components/Scene'
import { defaultLocations } from '../data/defaultLocations'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useI18n } from '../i18n/useI18n'

export function LocationsPage(): React.JSX.Element {
  const { m, locationName } = useI18n()
  const g = m.gallery
  useDocumentMeta(m.meta.gallery)

  return (
    <>
      <header className="flex max-w-3xl flex-col gap-4">
        <h1 className="display text-5xl sm:text-6xl">{g.title}</h1>
        <p className="text-xl leading-snug">{g.intro}</p>
      </header>

      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {defaultLocations.map((loc, i) => (
          <li
            key={loc.id}
            className={`flex flex-col overflow-hidden rounded-2xl border-[3px] border-ink bg-card p-2.5 shadow-hard-lg ${i % 2 ? 'sm:rotate-1' : 'sm:-rotate-1'}`}
          >
            <Scene location={loc} className="aspect-[4/3] w-full rounded-lg border-[3px] border-ink" />
            <div className="px-1.5 pt-3 pb-2">
              <h2 className="display text-2xl">
                <bdi>{locationName(loc)}</bdi>
              </h2>
              <p className="mt-1 leading-snug">{g.captions[loc.id]}</p>
            </div>
          </li>
        ))}
      </ul>

      <section className="flex flex-col items-center gap-4 rounded-2xl border-[3px] border-ink bg-yellow p-8 text-center shadow-hard-lg">
        <h2 className="display text-3xl sm:text-4xl">{g.addTitle}</h2>
        <p className="max-w-prose text-lg">{g.addBody}</p>
        <ButtonLink to="/play" variant="ink" className="min-h-16">
          {g.addCta}
        </ButtonLink>
      </section>
    </>
  )
}
