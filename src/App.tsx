import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { RevealScreen } from './features/reveal/RevealScreen'
import { RoundScreen } from './features/round/RoundScreen'
import { SettingsScreen } from './features/settings/SettingsScreen'
import { SetupScreen } from './features/setup/SetupScreen'
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
  const Screen = screens[phase]

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
