import { describe, it, expect } from 'vitest'
import { getWordForLevel, LEVEL_WORDS, TOTAL_WORDS } from './words'

describe('words', () => {
  it('has 50 words', () => {
    expect(TOTAL_WORDS).toBe(50)
    expect(LEVEL_WORDS).toHaveLength(50)
  })

  it('getWordForLevel returns word for valid level', () => {
    expect(getWordForLevel(1)).toBe('cat')
    expect(getWordForLevel(50)).toBe('whirl')
    expect(getWordForLevel(10)).toBe('web')
  })

  it('getWordForLevel clamps level to valid range', () => {
    expect(getWordForLevel(0)).toBe('cat')
    expect(getWordForLevel(100)).toBe('whirl')
  })

  it('returns lowercase words', () => {
    LEVEL_WORDS.forEach((word, i) => {
      expect(getWordForLevel(i + 1)).toBe(word.toLowerCase())
    })
  })
})
