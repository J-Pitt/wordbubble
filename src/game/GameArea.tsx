import { useRef, useEffect, useState } from 'react'
import { WordDisplay } from './WordDisplay'
import { FallingLetterBall } from './FallingLetterBall'
import type { GameState } from './types'

interface GameAreaProps {
  state: GameState
  onCollectLetter: (id: string) => void
}

export function GameArea({ state, onCollectLetter }: GameAreaProps) {
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
        <span className="level-label" data-testid="level">
          Level {state.level}
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
    </div>
  )
}
