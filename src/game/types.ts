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
}

export interface GameState {
  phase: GamePhase
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
