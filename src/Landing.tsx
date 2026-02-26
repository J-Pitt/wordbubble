import { hasSavedGame } from './game/useGameState'
import './Landing.css'

interface LandingProps {
  onContinue: () => void
  onNewGame: () => void
}

const DECOR_BUBBLES = [
  { letter: 'W', color: '#ff6b7a', x: 12, y: 18, size: 52, delay: 0 },
  { letter: 'O', color: '#4a6fa5', x: 78, y: 14, size: 46, delay: 0.3 },
  { letter: 'R', color: '#7b5cbf', x: 24, y: 40, size: 40, delay: 0.6 },
  { letter: 'D', color: '#2dd4a0', x: 85, y: 38, size: 44, delay: 0.9 },
  { letter: 'B', color: '#ffc93c', x: 8, y: 65, size: 38, delay: 1.2 },
  { letter: 'U', color: '#ff6b7a', x: 72, y: 58, size: 50, delay: 1.5 },
  { letter: 'B', color: '#4a6fa5', x: 35, y: 72, size: 42, delay: 1.8 },
  { letter: 'L', color: '#7b5cbf', x: 90, y: 76, size: 36, delay: 2.1 },
  { letter: 'E', color: '#2dd4a0', x: 55, y: 84, size: 48, delay: 2.4 },
  { letter: 'A', color: '#ffc93c', x: 48, y: 8, size: 34, delay: 0.5 },
  { letter: 'G', color: '#ff6b7a', x: 65, y: 30, size: 36, delay: 1.1 },
  { letter: 'P', color: '#2dd4a0', x: 5, y: 88, size: 42, delay: 2.7 },
  { letter: 'T', color: '#4a6fa5', x: 92, y: 55, size: 34, delay: 0.8 },
  { letter: 'S', color: '#7b5cbf', x: 18, y: 52, size: 30, delay: 1.9 },
  { letter: 'M', color: '#ffc93c', x: 60, y: 68, size: 38, delay: 2.2 },
  { letter: 'K', color: '#ff6b7a', x: 40, y: 92, size: 32, delay: 3.0 },
  { letter: 'F', color: '#2dd4a0', x: 82, y: 88, size: 36, delay: 2.6 },
  { letter: 'N', color: '#4a6fa5', x: 50, y: 28, size: 30, delay: 1.4 },
  { letter: 'H', color: '#7b5cbf', x: 30, y: 10, size: 32, delay: 0.2 },
  { letter: 'Z', color: '#ffc93c', x: 42, y: 48, size: 34, delay: 1.6 },
  { letter: 'J', color: '#2dd4a0', x: 62, y: 44, size: 30, delay: 2.0 },
]

export function Landing({ onContinue, onNewGame }: LandingProps) {
  const savedGame = hasSavedGame()

  return (
    <div className="landing" data-testid="landing">
      <div className="landing-bg" aria-hidden>
        <div className="landing-glow landing-glow--top" />
        <div className="landing-glow landing-glow--bottom" />
        {DECOR_BUBBLES.map((b, i) => (
          <span
            key={i}
            className="landing-decor-bubble"
            style={{
              '--b-color': b.color,
              '--b-x': `${b.x}%`,
              '--b-y': `${b.y}%`,
              '--b-size': `${b.size}px`,
              '--b-delay': `${b.delay}s`,
            } as React.CSSProperties}
          >
            {b.letter}
          </span>
        ))}
      </div>

      <header className="landing-header">
        <h1 className="landing-title">
          <span className="landing-title-top">Word</span>
          <span className="landing-title-bottom">Bubble</span>
        </h1>
        <p className="landing-tagline">
          Catch the letters. Spell the word.<br />
          20 levels. 3 lives. How far can you go?
        </p>
      </header>

      <section className="landing-middle">
        {savedGame ? (
          <div className="landing-buttons">
            <button
              type="button"
              className="landing-bubble-btn landing-bubble-btn--continue"
              onClick={onContinue}
              data-testid="start-game-button"
            >
              <span className="landing-bubble-btn-text">Continue</span>
            </button>
            <button
              type="button"
              className="landing-bubble-btn landing-bubble-btn--new"
              onClick={onNewGame}
              data-testid="new-game-button"
            >
              <span className="landing-bubble-btn-text">New Game</span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="landing-bubble-btn landing-bubble-btn--play"
            onClick={onNewGame}
            data-testid="start-game-button"
          >
            <span className="landing-bubble-btn-text">Play</span>
          </button>
        )}
      </section>

      <footer className="landing-footer">
        <p className="landing-hint">Tap bubbles to spell words before time runs out</p>
      </footer>
    </div>
  )
}
