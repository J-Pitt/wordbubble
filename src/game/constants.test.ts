import { describe, it, expect } from 'vitest'
import {
  getLevelDurationMs,
  getLettersPerLevel,
  getFallDurationMs,
  LIVES
} from './constants'

describe('constants', () => {
  it('LIVES is 3', () => {
    expect(LIVES).toBe(3)
  })

  it('getLevelDurationMs decreases as level increases', () => {
    const d1 = getLevelDurationMs(1)
    const d25 = getLevelDurationMs(25)
    const d50 = getLevelDurationMs(50)
    expect(d1).toBeGreaterThan(d25)
    expect(d25).toBeGreaterThan(d50)
    expect(d50).toBeGreaterThanOrEqual(8000)
  })

  it('getLettersPerLevel follows tier distribution', () => {
    expect(getLettersPerLevel(1, 3)).toBe(25)
    expect(getLettersPerLevel(10, 3)).toBe(25)
    expect(getLettersPerLevel(11, 4)).toBe(30)
    expect(getLettersPerLevel(20, 4)).toBe(30)
    expect(getLettersPerLevel(21, 5)).toBe(35)
    expect(getLettersPerLevel(50, 5)).toBe(35)
  })

  it('getFallDurationMs is constant across all levels', () => {
    expect(getFallDurationMs(1)).toBe(6000)
    expect(getFallDurationMs(50)).toBe(6000)
  })
})
