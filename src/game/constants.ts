export const LIVES = 3

/** Base duration (ms) players have to complete each word; decreases as level increases. */
export function getLevelDurationMs(level: number): number {
  const base = 22000
  const perLevel = -200
  return Math.max(8000, base + perLevel * (level - 1))
}

/** Number of falling letters per level tier. */
export function getLettersPerLevel(level: number, _wordLength: number): number {
  if (level <= 10) return 25
  if (level <= 20) return 30
  return 35
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
