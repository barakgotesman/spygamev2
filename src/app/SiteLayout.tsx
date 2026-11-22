import { NavLink, Link, Outlet } from 'react-router'
import { ButtonLink } from '../components/ButtonLink'
import { Footer } from '../components/Footer'
import { LanguageToggle } from '../components/LanguageToggle'
import { useI18n } from '../i18n/useI18n'

const navLink =
  'min-h-11 inline-flex items-center rounded-lg px-2 text-lg font-bold underline-offset-8 hover:underline decoration-[3px] aria-[current=page]:underline'

/** Header and footer for the marketing and info pages. The game at /play deliberately has neither. */
export function SiteLayout(): React.JSX.Element {
  const { m } = useI18n()

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="safe-x mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-2 pt-[max(1rem,env(safe-area-inset-top))] pb-2">
        <Link to="/" aria-label={m.nav.homeAria} className="display -rotate-1 rounded-lg border-[3px] border-ink bg-pink px-3 py-1.5 text-2xl shadow-hard">
          {m.nav.brand}
        </Link>
        <nav aria-label={m.nav.label} className="order-last flex w-full items-center gap-2 sm:order-none sm:w-auto">
          <NavLink to="/how-to-play" className={navLink}>
            {m.nav.howToPlay}
          </NavLink>
          <NavLink to="/locations" className={navLink}>
            {m.nav.locations}
          </NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ButtonLink to="/play" variant="ink" className="min-h-12 px-4">
            {m.nav.play}
          </ButtonLink>
        </div>
      </header>

      <main className="safe-x mx-auto flex w-full max-w-5xl flex-1 flex-col gap-16 py-8 sm:gap-24 sm:py-12">
        <Outlet />
      </main>

      <div className="safe-x mx-auto w-full max-w-5xl pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <p className="print text-center text-xs opacity-70">{m.site.tagline}</p>
        <Footer className="opacity-70" />
      </div>
    </div>
  )
}
