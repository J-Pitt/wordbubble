import type { LevelCompleteReason } from './types'

interface LevelCompleteModalProps {
  reason: LevelCompleteReason
  level: number
  onNext: () => void
}

export function LevelCompleteModal({ reason, level, onNext }: LevelCompleteModalProps) {
  const isWordComplete = reason === 'wordComplete'

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" data-testid="level-complete-modal">
      <div className="modal">
        <h2 className="modal-title" data-testid="modal-title">
          {isWordComplete ? 'Word completed!' : 'Out of time!'}
        </h2>
        <p className="modal-message">
          {isWordComplete
            ? `Level ${level} complete. Ready for the next?`
            : 'You lost a life. Try again!'}
        </p>
        <button
          type="button"
          className="modal-button"
          onClick={onNext}
          data-testid="modal-next-button"
        >
          {isWordComplete ? 'Next level' : 'Continue'}
        </button>
      </div>
    </div>
  )
}
