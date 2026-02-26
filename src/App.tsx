import { useGameState } from './game/useGameState'
import { GameArea } from './game/GameArea'
import { LevelCompleteModal } from './game/LevelCompleteModal'
import { GameOverModal } from './game/GameOverModal'
import './App.css'

export default function App() {
  const { state, collectLetter, goNextLevel, restart } = useGameState()

  return (
    <main className="app">
      <GameArea state={state} onCollectLetter={collectLetter} />
      {state.phase === 'levelComplete' && state.levelCompleteReason && (
        <LevelCompleteModal
          reason={state.levelCompleteReason}
          level={state.level}
          onNext={goNextLevel}
        />
      )}
      {state.phase === 'gameOver' && (
        <GameOverModal onRestart={restart} />
      )}
    </main>
  )
}
