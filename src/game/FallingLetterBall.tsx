import { useEffect, useState } from 'react'
import type { FallingLetter } from './types'

interface FallingLetterBallProps {
  letter: FallingLetter
  onCollect: (id: string) => void
  containerHeight: number
}

export function FallingLetterBall({ letter, onCollect }: FallingLetterBallProps) {
  const [showPop, setShowPop] = useState(false)

  const topPercent = -6 + letter.progress * 112
  const leftPercent = (letter.startX + letter.drift * letter.progress) * 100
  const positionStyle = { top: `${topPercent}%`, left: `${leftPercent}%` }

  useEffect(() => {
    if (!letter.collected) return
    setShowPop(true)
    const t = setTimeout(() => setShowPop(false), 400)
    return () => clearTimeout(t)
  }, [letter.collected])

  if (letter.collected) {
    if (!showPop) return null
    return (
      <div
        className="ball-pop"
        style={{
          '--pop-color': letter.color,
          ...positionStyle
        } as React.CSSProperties}
        data-testid={`ball-pop-${letter.id}`}
      >
        <span className="ball-pop-core" />
        <span className="ball-pop-pieces" aria-hidden />
      </div>
    )
  }

  return (
    <button
      type="button"
      className="falling-ball"
      style={{
        '--ball-color': letter.color,
        ...positionStyle
      } as React.CSSProperties}
      onClick={() => onCollect(letter.id)}
      data-testid={`falling-letter-${letter.letter}-${letter.id}`}
      aria-label={`Letter ${letter.letter.toUpperCase()}`}
    >
      <span className="falling-ball-letter">{letter.letter.toUpperCase()}</span>
    </button>
  )
}
