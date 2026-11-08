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
          initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          <Screen />
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  )
}
