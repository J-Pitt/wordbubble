import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GameOverModal } from './GameOverModal'

describe('GameOverModal', () => {
  it('shows game over message', () => {
    render(<GameOverModal onRestart={vi.fn()} />)
    expect(screen.getByTestId('game-over-title')).toHaveTextContent('Game Over')
    expect(screen.getByTestId('game-over-restart-button')).toHaveTextContent('Play Again')
  })

  it('calls onRestart when Play again clicked', async () => {
    const user = userEvent.setup()
    const onRestart = vi.fn()
    render(<GameOverModal onRestart={onRestart} />)
    await user.click(screen.getByTestId('game-over-restart-button'))
    expect(onRestart).toHaveBeenCalledTimes(1)
  })
})
