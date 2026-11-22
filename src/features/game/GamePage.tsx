import { AnimatePresence, motion } from 'motion/react'
import { useBlocker } from 'react-router'
import { ConfirmDialog } from '../../components/ConfirmDialog'
import { useDocumentMeta } from '../../hooks/useDocumentMeta'
import { useI18n } from '../../i18n/useI18n'
import { useGameStore } from '../../store/useGameStore'
import type { Phase } from '../../types/game'
import { RevealScreen } from '../reveal/RevealScreen'
import { RoundScreen } from '../round/RoundScreen'
import { SettingsScreen } from '../settings/SettingsScreen'
import { SetupScreen } from '../setup/SetupScreen'

const screens: Record<Phase, () => React.JSX.Element | null> = {
  setup: SetupScreen,
  reveal: RevealScreen,
  round: RoundScreen,
  settings: SettingsScreen,
}

/**
 * The game. Phases live in the store, never in the URL, so a role screen can't be linked to or
 * reached by Back; this is the only route that mounts them.
 */
export function GamePage(): React.JSX.Element {
  const { m } = useI18n()
  const phase = useGameStore((s) => s.phase)
  const verdict = useGameStore((s) => s.verdict)
  const Screen = screens[phase]
  useDocumentMeta(m.meta.play)

  const midRound = (phase === 'reveal' || phase === 'round') && !verdict
  const blocker = useBlocker(midRound)

  return (
    <>
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
      <ConfirmDialog
        open={blocker.state === 'blocked'}
        title={m.leave.title}
        body={m.leave.body}
        cancelLabel={m.leave.stay}
        confirmLabel={m.leave.leave}
        onCancel={() => blocker.reset?.()}
        onConfirm={() => blocker.proceed?.()}
      />
    </>
  )
}
