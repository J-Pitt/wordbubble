/**
 * 20 levels: word length grows from 3 to ~8 letters.
 * Each level has one target word; falling letters include the word's letters plus distractors.
 */
export const LEVEL_WORDS: readonly string[] = [
  'cat',    // 1
  'run',    // 2
  'dog',    // 3
  'sun',    // 4
  'hat',    // 5
  'fish',   // 6
  'bird',   // 7
  'moon',   // 8
  'star',   // 9
  'tree',   // 10
  'water',  // 11
  'light',  // 12
  'cloud',  // 13
  'heart',  // 14
  'music',  // 15
  'happy',  // 16
  'dream',  // 17
  'river',  // 18
  'spark',  // 19
  'bubble'  // 20
]

export const TOTAL_LEVELS = LEVEL_WORDS.length

export function getWordForLevel(level: number): string {
  const index = Math.max(0, Math.min(level - 1, LEVEL_WORDS.length - 1))
  return LEVEL_WORDS[index].toLowerCase()
}
