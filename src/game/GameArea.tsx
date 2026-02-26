import { useRef, useEffect, useState } from 'react'
import { WordDisplay } from './WordDisplay'
import { FallingLetterBall } from './FallingLetterBall'
import { Countdown } from './Countdown'
import type { GameState } from './types'

interface GameAreaProps {
  state: GameState
  onCollectLetter: (id: string) => void
  onPause: (paused: boolean) => void
  onGoHome: () => void
}

export function GameArea({ state, onCollectLetter, onPause, onGoHome }: GameAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(400)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setHeight(el.clientHeight))
    ro.observe(el)
    setHeight(el.clientHeight)
    return () => ro.disconnect()
  }, [])

  return (
    <div className="game-area" ref={containerRef} data-testid="game-area">
      <header className="game-header">
        <div className="lives" data-testid="lives">
          {'♥'.repeat(state.lives)}
        </div>
        <Countdown
          levelStartTime={state.levelStartTime}
          level={state.level}
          isPlaying={state.phase === 'playing' && !state.paused}
        />
        <span className="level-label" data-testid="level">
          Lv.{state.level}
        </span>
      </header>
      <WordDisplay state={state} />
      <div className="falling-zone">
        {state.fallingLetters.map((f) => (
          <FallingLetterBall
            key={f.id}
            letter={f}
            onCollect={onCollectLetter}
            containerHeight={height}
          />
        ))}
      </div>
      <div className="game-footer">
        {state.phase === 'playing' && (
          <button
            type="button"
            className="pause-button"
            onClick={() => onPause(true)}
            data-testid="pause-button"
            aria-label="Pause game"
          >
            ⏸ Pause
          </button>
        )}
        <button
          type="button"
          className="home-button"
          onClick={onGoHome}
          data-testid="home-button"
          aria-label="Back to home"
        >
          ← Home
        </button>
      </div>
      {state.paused && (
        <div className="pause-overlay" data-testid="pause-overlay">
          <div className="pause-card">
            <span className="modal-emoji">⏸</span>
            <h2 className="pause-title">Paused</h2>
            <button
              type="button"
              className="modal-button"
              onClick={() => onPause(false)}
              data-testid="resume-button"
            >
              Resume
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
