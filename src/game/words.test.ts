import { describe, it, expect } from 'vitest'
import { getWordForLevel, LEVEL_WORDS, TOTAL_LEVELS } from './words'

describe('words', () => {
  it('has 20 levels', () => {
    expect(TOTAL_LEVELS).toBe(20)
    expect(LEVEL_WORDS).toHaveLength(20)
  })

  it('getWordForLevel returns word for valid level', () => {
    expect(getWordForLevel(1)).toBe('cat')
    expect(getWordForLevel(20)).toBe('bubble')
    expect(getWordForLevel(10)).toBe('tree')
  })

  it('getWordForLevel clamps level to valid range', () => {
    expect(getWordForLevel(0)).toBe('cat')
    expect(getWordForLevel(100)).toBe('bubble')
  })

  it('returns lowercase words', () => {
    LEVEL_WORDS.forEach((word, i) => {
      expect(getWordForLevel(i + 1)).toBe(word.toLowerCase())
    })
  })
})
