import { useState } from 'react'
import { loadHighScore, saveHighScore } from './useGameState'

interface GameOverModalProps {
  level: number
  onRestart: () => void
  onGoHome: () => void
}

export function GameOverModal({ level, onRestart, onGoHome }: GameOverModalProps) {
  const existing = loadHighScore()
  const isNewHigh = !existing || level > existing.level
  const [name, setName] = useState('')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    const trimmed = name.trim() || 'Anonymous'
    saveHighScore({ name: trimmed, level })
    setSaved(true)
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" data-testid="game-over-modal">
      <div className="modal">
        <span className="modal-emoji">{isNewHigh && !saved ? '🏆' : '💔'}</span>
        <h2 className="modal-title" data-testid="game-over-title">
          {isNewHigh && !saved ? 'New High Score!' : 'Game Over'}
        </h2>
        <p className="modal-message">
          {isNewHigh && !saved
            ? `You reached word ${level} of 50! Enter your name:`
            : `You reached word ${level} of 50.`}
        </p>
        {isNewHigh && !saved ? (
          <div className="highscore-entry">
            <input
              type="text"
              className="highscore-input"
              placeholder="Your name"
              maxLength={20}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSave() }}
              autoFocus
              data-testid="highscore-input"
            />
            <button
              type="button"
              className="modal-button"
              onClick={handleSave}
              data-testid="highscore-save"
            >
              Save Score
            </button>
          </div>
        ) : (
          <>
            <button
              type="button"
              className="modal-button"
              onClick={onRestart}
              data-testid="game-over-restart-button"
            >
              Play Again
            </button>
            <button
              type="button"
              className="modal-button modal-button-secondary"
              onClick={onGoHome}
              data-testid="game-over-home-button"
            >
              Home
            </button>
          </>
        )}
      </div>
    </div>
  )
}
