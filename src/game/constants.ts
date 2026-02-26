export const LIVES = 3
export const TOTAL_LEVELS = 20

/** Base duration (ms) that letters fall per level; decreases as level increases (faster). */
export function getLevelDurationMs(level: number): number {
  const base = 22000
  const perLevel = -600
  return Math.max(8000, base + perLevel * (level - 1))
}

/** Number of falling letters per level; more = harder to pick out the right ones. */
export function getLettersPerLevel(level: number, wordLength: number): number {
  return Math.max(wordLength + 16, 28 + level * 4)
}

/** Fall animation duration in ms (how long one letter takes to cross the screen). */
export function getFallDurationMs(_level: number): number {
  return 6000
}

export const BALL_COLORS = [
  '#ff6b7a',
  '#4a6fa5',
  '#7b5cbf',
  '#2dd4a0',
  '#ffc93c'
] as const
