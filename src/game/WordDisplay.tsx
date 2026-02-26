import type { GameState } from './types'

interface WordDisplayProps {
  state: GameState
}

export function WordDisplay({ state }: WordDisplayProps) {
  const { targetWord, collectedLetters } = state
  const letters = targetWord.split('')

  return (
    <div className="word-display" data-testid="word-display">
      <div className="word-letters">
        {letters.map((char, i) => {
          const filled = i < collectedLetters.length && collectedLetters[i] === char
          return (
            <span
              key={`${char}-${i}`}
              className={`word-char ${filled ? 'filled' : ''}`}
              data-testid={`word-char-${i}`}
            >
              {filled ? char.toUpperCase() : '?'}
            </span>
          )
        })}
      </div>
    </div>
  )
}
