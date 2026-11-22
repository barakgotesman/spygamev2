import { Link } from 'react-router'
import { useI18n } from '../i18n/useI18n'
import { CreditStamp } from './CreditStamp'

const link = 'inline-flex min-h-11 items-center text-lg font-bold underline decoration-[3px] underline-offset-8 hover:decoration-pink'

/** Closing band for the site pages: airmail edge, the wordmark, a way around, and the credit stamp. */
export function SiteFooter(): React.JSX.Element {
  const { m } = useI18n()
  return (
    <footer className="mt-16">
      <div aria-hidden className="airmail h-3 border-y-[3px] border-ink" />
      <div className="halftone border-b-[3px] border-ink bg-yellow">
        <div className="safe-x mx-auto grid max-w-5xl gap-10 py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:grid-cols-[1.3fr_1fr_auto] sm:items-start">
          <div className="flex flex-col items-start gap-3">
            <Link to="/" aria-label={m.nav.homeAria} className="display -rotate-2 rounded-lg border-[3px] border-ink bg-pink px-3 py-1.5 text-3xl text-paper shadow-hard">
              {m.nav.brand}
            </Link>
            <p className="max-w-[26ch] text-lg leading-snug font-semibold">{m.site.tagline}</p>
            <p className="print text-xs opacity-70">{m.common.wishYouWereHere}</p>
          </div>
          <nav aria-label={m.footer.navAria}>
            <p className="print mb-1 text-xs opacity-70">{m.site.explore}</p>
            <ul className="flex flex-col">
              <li><Link to="/" className={link}>{m.nav.home}</Link></li>
              <li><Link to="/how-to-play" className={link}>{m.nav.howToPlay}</Link></li>
              <li><Link to="/locations" className={link}>{m.nav.locations}</Link></li>
              <li><Link to="/play" className={link}>{m.nav.play}</Link></li>
            </ul>
          </nav>
          <CreditStamp className="sm:pt-2" />
        </div>
      </div>
    </footer>
  )
}
