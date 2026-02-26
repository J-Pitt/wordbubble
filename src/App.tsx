import { useState, useEffect } from 'react'
import { Landing } from './Landing'
import { GameScreen } from './GameScreen'
import { clearSavedGame } from './game/useGameState'
import './App.css'

type Screen = 'landing' | 'game'

export default function App() {
  const [screen, setScreen] = useState<Screen>('landing')
  const [freshStart, setFreshStart] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const [visible, setVisible] = useState(true)

  const transitionTo = (next: Screen, fresh?: boolean) => {
    setVisible(false)
    setTransitioning(true)
    setTimeout(() => {
      if (fresh !== undefined) setFreshStart(fresh)
      setScreen(next)
      setTimeout(() => {
        setVisible(true)
        setTransitioning(false)
      }, 50)
    }, 250)
  }

  const handleContinue = () => transitionTo('game', false)
  const handleNewGame = () => { clearSavedGame(); transitionTo('game', true) }
  const handleGoHome = () => transitionTo('landing')

  // Fade in on mount
  useEffect(() => { setVisible(true) }, [])

  return (
    <main className={`app ${visible ? 'app--visible' : 'app--hidden'} ${transitioning ? 'app--transitioning' : ''}`}>
      {screen === 'landing' ? (
        <Landing onContinue={handleContinue} onNewGame={handleNewGame} />
      ) : (
        <GameScreen key={freshStart ? 'fresh' : 'continue'} onGoHome={handleGoHome} />
      )}
    </main>
  )
}
