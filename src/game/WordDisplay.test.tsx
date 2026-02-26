import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { WordDisplay } from './WordDisplay'
import type { GameState } from './types'

function makeState(overrides: Partial<GameState> = {}): GameState {
  return {
    phase: 'playing',
    level: 1,
    lives: 3,
    targetWord: 'cat',
    collectedLetters: [],
    fallingLetters: [],
    levelStartTime: Date.now(),
    lettersToSpawn: 10,
    lettersSpawned: 0,
    streak: 0,
    ...overrides
  }
}

describe('WordDisplay', () => {
  it('shows the target word so you can see what to spell', () => {
    render(<WordDisplay state={makeState({ targetWord: 'cat' })} />)
    expect(screen.getByTestId('word-display')).toBeInTheDocument()
    expect(screen.getByTestId('word-char-0')).toHaveTextContent('C')
    expect(screen.getByTestId('word-char-1')).toHaveTextContent('A')
    expect(screen.getByTestId('word-char-2')).toHaveTextContent('T')
  })

  it('highlights letters as you collect them', () => {
    render(
      <WordDisplay
        state={makeState({ targetWord: 'cat', collectedLetters: ['c', 'a'] })}
      />
    )
    expect(screen.getByTestId('word-char-0')).toHaveTextContent('C')
    expect(screen.getByTestId('word-char-1')).toHaveTextContent('A')
    expect(screen.getByTestId('word-char-2')).toHaveTextContent('T')
    expect(screen.getByTestId('word-char-0')).toHaveClass('filled')
    expect(screen.getByTestId('word-char-1')).toHaveClass('filled')
    expect(screen.getByTestId('word-char-2')).not.toHaveClass('filled')
  })

  it('shows full word when all collected', () => {
    render(
      <WordDisplay
        state={makeState({ targetWord: 'cat', collectedLetters: ['c', 'a', 't'] })}
      />
    )
    expect(screen.getByTestId('word-char-0')).toHaveTextContent('C')
    expect(screen.getByTestId('word-char-1')).toHaveTextContent('A')
    expect(screen.getByTestId('word-char-2')).toHaveTextContent('T')
  })
})
