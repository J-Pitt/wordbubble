export const LIVES = 3
export const TOTAL_LEVELS = 20

/** Base duration (ms) that letters fall per level; decreases as level increases (faster). */
export function getLevelDurationMs(level: number): number {
  const base = 22000
  const perLevel = -600
  return Math.max(8000, base + perLevel * (level - 1))
}

/** Number of falling letter "waves" or total letters to show per level (scales with word length). */
export function getLettersPerLevel(level: number, wordLength: number): number {
  return Math.max(wordLength + 4, 10 + level * 2)
}

/** Fall animation duration in ms (how long one letter takes to cross the screen). */
export function getFallDurationMs(level: number): number {
  const base = 6000
  const perLevel = -200
  return Math.max(2500, base + perLevel * (level - 1))
}

export const BALL_COLORS = [
  '#e94560',
  '#0f3460',
  '#533483',
  '#16c79a',
  '#ffc93c'
] as const
