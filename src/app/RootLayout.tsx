import { MotionConfig } from 'motion/react'
import { useEffect } from 'react'
import { Outlet, ScrollRestoration } from 'react-router'
import { useI18n } from '../i18n/useI18n'

/** Everything that applies to every route: reduced-motion, document language and direction, scroll reset. */
export function RootLayout(): React.JSX.Element {
  const { lang, dir } = useI18n()

  // The whole document flips direction with the language; index.html is the English fallback.
  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = dir
  }, [lang, dir])

  return (
    <MotionConfig reducedMotion="user">
      <Outlet />
      <ScrollRestoration />
    </MotionConfig>
  )
}
