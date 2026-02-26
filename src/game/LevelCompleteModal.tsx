import type { LevelCompleteReason } from './types'

interface LevelCompleteModalProps {
  reason: LevelCompleteReason
  level: number
  onNext: () => void
  onGoHome?: () => void
}

export function LevelCompleteModal({ reason, level, onNext, onGoHome }: LevelCompleteModalProps) {
  const isWordComplete = reason === 'wordComplete'

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" data-testid="level-complete-modal">
      <div className="modal">
        <span className="modal-emoji">{isWordComplete ? '🎉' : '⏱️'}</span>
        <h2 className="modal-title" data-testid="modal-title">
          {isWordComplete ? 'Nice!' : 'Time\'s Up!'}
        </h2>
        <p className="modal-message">
          {isWordComplete
            ? `Level ${level} cleared — keep it going!`
            : 'You lost a life. Give it another shot!'}
        </p>
        <button
          type="button"
          className="modal-button"
          onClick={onNext}
          data-testid="modal-next-button"
        >
          {isWordComplete ? 'Next Level' : 'Try Again'}
        </button>
        {!isWordComplete && onGoHome && (
          <button
            type="button"
            className="modal-button modal-button-secondary"
            onClick={onGoHome}
            data-testid="modal-home-button"
          >
            Home
          </button>
        )}
      </div>
    </div>
  )
}
