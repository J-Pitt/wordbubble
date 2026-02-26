import './Landing.css'

interface LandingProps {
  onStart: () => void
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
]

export function Landing({ onStart }: LandingProps) {
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
        <button
          type="button"
          className="landing-start"
          onClick={onStart}
          data-testid="start-game-button"
        >
          <span className="landing-start-text">Play</span>
        </button>
      </section>

      <footer className="landing-footer">
        <p className="landing-hint">Tap bubbles to spell words before time runs out</p>
      </footer>
    </div>
  )
}
