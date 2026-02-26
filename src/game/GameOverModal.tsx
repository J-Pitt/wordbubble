interface GameOverModalProps {
  onRestart: () => void
}

export function GameOverModal({ onRestart }: GameOverModalProps) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" data-testid="game-over-modal">
      <div className="modal">
        <h2 className="modal-title" data-testid="game-over-title">
          Game over
        </h2>
        <p className="modal-message">You ran out of lives. Start again from level 1?</p>
        <button
          type="button"
          className="modal-button"
          onClick={onRestart}
          data-testid="game-over-restart-button"
        >
          Play again
        </button>
      </div>
    </div>
  )
}
