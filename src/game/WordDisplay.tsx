import type { GameState } from './types'

interface WordDisplayProps {
  state: GameState
}

export function WordDisplay({ state }: WordDisplayProps) {
  const { targetWord, collectedLetters } = state
  const letters = targetWord.split('')

  const countInCollected = (char: string) =>
    collectedLetters.filter((c) => c === char).length
  const countNeededUpTo = (index: number) => {
    const char = letters[index]
    return letters.slice(0, index + 1).filter((c) => c === char).length
  }

  return (
    <div className="word-display" data-testid="word-display">
      <div className="word-letters">
        {letters.map((char, i) => {
          const collected = countInCollected(char) >= countNeededUpTo(i)
          return (
            <span
              key={`${char}-${i}`}
              className={`word-char ${collected ? 'filled' : ''}`}
              data-testid={`word-char-${i}`}
            >
              {char.toUpperCase()}
            </span>
          )
        })}
      </div>
    </div>
  )
}
