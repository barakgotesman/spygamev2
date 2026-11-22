import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { useEffect } from 'react'
import { RevealScreen } from './features/reveal/RevealScreen'
import { RoundScreen } from './features/round/RoundScreen'
import { SettingsScreen } from './features/settings/SettingsScreen'
import { SetupScreen } from './features/setup/SetupScreen'
import { useI18n } from './i18n/useI18n'
import { useGameStore } from './store/useGameStore'
import type { Phase } from './types/game'

const screens: Record<Phase, () => React.JSX.Element | null> = {
  setup: SetupScreen,
  reveal: RevealScreen,
  round: RoundScreen,
  settings: SettingsScreen,
}

export function App(): React.JSX.Element {
  const phase = useGameStore((s) => s.phase)
  const { m, lang, dir } = useI18n()
  const Screen = screens[phase]

  // The whole document flips direction with the language; index.html is the English fallback.
  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = dir
    document.title = m.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', m.meta.description)
  }, [lang, dir, m])

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={phase}
          initial={{ opacity: 0, y: 40, rotate: 1.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, y: -24, transition: { duration: 0.12 } }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        >
          <Screen />
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  )
}
