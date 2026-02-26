import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { GameOverModal } from './GameOverModal'

describe('GameOverModal', () => {
  it('shows game over content', () => {
    render(<GameOverModal level={5} onRestart={vi.fn()} onGoHome={vi.fn()} />)
    expect(screen.getByTestId('game-over-title')).toBeInTheDocument()
  })

  it('shows level reached', () => {
    render(<GameOverModal level={12} onRestart={vi.fn()} onGoHome={vi.fn()} />)
    expect(screen.getByText(/word 12 of 50/i)).toBeInTheDocument()
  })
})
