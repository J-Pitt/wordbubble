export type GamePhase = 'playing' | 'levelComplete' | 'gameOver'
export type LevelCompleteReason = 'wordComplete' | 'outOfTime'

export interface FallingLetter {
  id: string
  letter: string
  color: string
  /** 0–1 progress down the screen */
  progress: number
  /** Whether this letter was the next correct one and has been clicked */
  collected: boolean
  /** When the letter was collected (for keeping in list until pop animation finishes) */
  collectedAt?: number
  /** 0–1: horizontal start position (random across top) */
  startX: number
  /** Horizontal drift over the fall: added to startX as progress goes 0→1 (e.g. -0.2 to 0.2) */
  drift: number
}

export interface GameState {
  phase: GamePhase
  paused?: boolean
  /** Set when phase is levelComplete: why the level ended */
  levelCompleteReason?: LevelCompleteReason
  level: number
  lives: number
  targetWord: string
  /** Letters the user has collected so far (in order) */
  collectedLetters: string[]
  /** Letters currently falling */
  fallingLetters: FallingLetter[]
  /** When the current level started (timestamp) */
  levelStartTime: number
  /** Total letters to spawn this level */
  lettersToSpawn: number
  /** Letters spawned so far */
  lettersSpawned: number
}
