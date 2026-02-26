import { useState } from 'react'
import { Landing } from './Landing'
import { GameScreen } from './GameScreen'
import { clearSavedGame } from './game/useGameState'
import './App.css'

export default function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [freshStart, setFreshStart] = useState(false)

  const handleContinue = () => {
    setFreshStart(false)
    setHasStarted(true)
  }

  const handleNewGame = () => {
    clearSavedGame()
    setFreshStart(true)
    setHasStarted(true)
  }

  const handleGoHome = () => {
    setHasStarted(false)
    setFreshStart(false)
  }

  return (
    <main className="app">
      {!hasStarted ? (
        <Landing onContinue={handleContinue} onNewGame={handleNewGame} />
      ) : (
        <GameScreen key={freshStart ? 'fresh' : 'continue'} onGoHome={handleGoHome} />
      )}
    </main>
  )
}
