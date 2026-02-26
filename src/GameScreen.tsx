import { useGameState } from './game/useGameState'
import { GameArea } from './game/GameArea'
import { LevelCompleteModal } from './game/LevelCompleteModal'
import { GameOverModal } from './game/GameOverModal'

interface GameScreenProps {
  onGoHome: () => void
}

export function GameScreen({ onGoHome }: GameScreenProps) {
  const { state, collectLetter, goNextLevel, restart, setPaused } = useGameState()

  return (
    <>
      <GameArea state={state} onCollectLetter={collectLetter} onPause={setPaused} onGoHome={onGoHome} />
      {state.phase === 'levelComplete' && state.levelCompleteReason && (
        <LevelCompleteModal
          reason={state.levelCompleteReason}
          level={state.level}
          onNext={goNextLevel}
          onGoHome={onGoHome}
        />
      )}
      {state.phase === 'gameOver' && (
        <GameOverModal level={state.level} onRestart={restart} onGoHome={onGoHome} />
      )}
    </>
  )
}
