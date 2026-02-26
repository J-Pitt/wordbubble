import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LevelCompleteModal } from './LevelCompleteModal'

describe('LevelCompleteModal', () => {
  it('shows "Word completed!" when reason is wordComplete', () => {
    render(
      <LevelCompleteModal
        reason="wordComplete"
        level={3}
        onNext={vi.fn()}
      />
    )
    expect(screen.getByTestId('modal-title')).toHaveTextContent('Nice!')
    expect(screen.getByTestId('modal-next-button')).toHaveTextContent('Next Word')
  })

  it('shows "Out of time!" when reason is outOfTime', () => {
    render(
      <LevelCompleteModal
        reason="outOfTime"
        level={2}
        onNext={vi.fn()}
      />
    )
    expect(screen.getByTestId('modal-title')).toHaveTextContent("Time's Up!")
    expect(screen.getByTestId('modal-next-button')).toHaveTextContent('Try Again')
  })

  it('calls onNext when button clicked', async () => {
    const user = userEvent.setup()
    const onNext = vi.fn()
    render(
      <LevelCompleteModal
        reason="wordComplete"
        level={1}
        onNext={onNext}
      />
    )
    await user.click(screen.getByTestId('modal-next-button'))
    expect(onNext).toHaveBeenCalledTimes(1)
  })
})
