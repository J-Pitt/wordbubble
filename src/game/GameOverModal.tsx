interface GameOverModalProps {
  onRestart: () => void
}

export function GameOverModal({ onRestart }: GameOverModalProps) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" data-testid="game-over-modal">
      <div className="modal">
        <span className="modal-emoji">💔</span>
        <h2 className="modal-title" data-testid="game-over-title">
          Game Over
        </h2>
        <p className="modal-message">No lives left. Ready to try again from the start?</p>
        <button
          type="button"
          className="modal-button"
          onClick={onRestart}
          data-testid="game-over-restart-button"
        >
          Play Again
        </button>
      </div>
    </div>
  )
}
