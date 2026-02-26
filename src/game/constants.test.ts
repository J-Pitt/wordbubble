import { describe, it, expect } from 'vitest'
import {
  getLevelDurationMs,
  getLettersPerLevel,
  getFallDurationMs,
  LIVES,
  TOTAL_LEVELS
} from './constants'

describe('constants', () => {
  it('LIVES is 3', () => {
    expect(LIVES).toBe(3)
  })

  it('TOTAL_LEVELS is 20', () => {
    expect(TOTAL_LEVELS).toBe(20)
  })

  it('getLevelDurationMs decreases as level increases', () => {
    const d1 = getLevelDurationMs(1)
    const d10 = getLevelDurationMs(10)
    const d20 = getLevelDurationMs(20)
    expect(d1).toBeGreaterThan(d10)
    expect(d10).toBeGreaterThan(d20)
    expect(d20).toBeGreaterThanOrEqual(8000)
  })

  it('getLettersPerLevel scales with level and word length', () => {
    expect(getLettersPerLevel(1, 3)).toBeGreaterThanOrEqual(7)
    expect(getLettersPerLevel(20, 6)).toBeGreaterThan(getLettersPerLevel(1, 3))
  })

  it('getFallDurationMs decreases as level increases (faster fall)', () => {
    const f1 = getFallDurationMs(1)
    const f20 = getFallDurationMs(20)
    expect(f1).toBeGreaterThan(f20)
    expect(f20).toBeGreaterThanOrEqual(2500)
  })
})
