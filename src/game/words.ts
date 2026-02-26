/**
 * 50 words: 1–10 are 3-letter, 11–20 are 4-letter, 21–50 are 5-letter.
 */
export const LEVEL_WORDS: readonly string[] = [
  // 3-letter (1–10)
  'cat',   'run',   'dog',   'sun',   'hat',
  'fox',   'pen',   'map',   'jar',   'web',
  // 4-letter (11–20)
  'fish',  'bird',  'moon',  'star',  'tree',
  'frog',  'kite',  'drum',  'lamp',  'ship',
  // 5-letter (21–50)
  'water', 'light', 'cloud', 'heart', 'music',
  'happy', 'dream', 'river', 'spark', 'grape',
  'flame', 'storm', 'beach', 'magic', 'ocean',
  'plant', 'tiger', 'frost', 'candy', 'vivid',
  'youth', 'blaze', 'crane', 'dwarf', 'globe',
  'jewel', 'pixel', 'quilt', 'swing', 'whirl',
]

export const TOTAL_WORDS = LEVEL_WORDS.length

export function getWordForLevel(level: number): string {
  const index = Math.max(0, Math.min(level - 1, LEVEL_WORDS.length - 1))
  return LEVEL_WORDS[index].toLowerCase()
}
