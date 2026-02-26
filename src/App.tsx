import { useState } from 'react'
import { Landing } from './Landing'
import { GameScreen } from './GameScreen'
import './App.css'

export default function App() {
  const [hasStarted, setHasStarted] = useState(false)

  return (
    <main className="app">
      {!hasStarted ? (
        <Landing onStart={() => setHasStarted(true)} />
      ) : (
        <GameScreen onGoHome={() => setHasStarted(false)} />
      )}
    </main>
  )
}
