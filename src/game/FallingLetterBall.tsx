import type { FallingLetter } from './types'

interface FallingLetterBallProps {
  letter: FallingLetter
  onCollect: (id: string) => void
  containerHeight: number
}

export function FallingLetterBall({ letter, onCollect }: FallingLetterBallProps) {
  if (letter.collected) return null

  const topPercent = letter.progress * 100
  const num = parseInt(letter.id.replace(/\D/g, ''), 10) || 0
  const leftPercent = 10 + (num % 80)

  return (
    <button
      type="button"
      className="falling-ball"
      style={{
        '--ball-color': letter.color,
        top: `${topPercent}%`,
        left: `${leftPercent}%`
      } as React.CSSProperties}
      onClick={() => onCollect(letter.id)}
      data-testid={`falling-letter-${letter.letter}-${letter.id}`}
      aria-label={`Letter ${letter.letter.toUpperCase()}`}
    >
      <span className="falling-ball-letter">{letter.letter.toUpperCase()}</span>
    </button>
  )
}
