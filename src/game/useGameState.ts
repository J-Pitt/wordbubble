import { useCallback, useEffect, useRef, useState } from 'react'
import {
  getFallDurationMs,
  getLevelDurationMs,
  getLettersPerLevel,
  LIVES,
  TOTAL_LEVELS,
  BALL_COLORS
} from './constants'
import { getWordForLevel } from './words'
import type { FallingLetter, GameState, GamePhase, LevelCompleteReason } from './types'

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('')

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomInRange(min: number, max: number): number {
  return min + Math.random() * (max - min)
}

/** Horizontal bounds (0–1): bubbles stay between these so they don't go off the sides. */
const X_MIN = 0.06
const X_MAX = 0.94

function createFallingLetter(
  letter: string,
  nextId: number,
  color: string
): FallingLetter {
  const startX = randomInRange(X_MIN, X_MAX)
  const maxDriftLeft = startX - X_MIN
  const maxDriftRight = X_MAX - startX
  const drift = randomInRange(-maxDriftLeft, maxDriftRight)
  return {
    id: `letter-${nextId}`,
    letter: letter.toLowerCase(),
    color,
    progress: 0,
    collected: false,
    startX,
    drift
  }
}

function getNextLetterToSpawn(
  _level: number,
  targetWord: string,
  collectedLetters: string[],
  _lettersSpawned: number,
  _lettersToSpawn: number
): string | null {
  const wordLetters = targetWord.split('')
  const needed = wordLetters.filter(
    (_, i) => wordLetters.slice(0, i + 1).filter((l) => l === wordLetters[i]).length >
      collectedLetters.filter((c) => c === wordLetters[i]).length
  )
  // Prefer letters still needed for the word, with some randomness for distractors
  if (needed.length && Math.random() < 0.6) {
    return needed[Math.floor(Math.random() * needed.length)]
  }
  return randomChoice(ALPHABET)
}

const SAVE_KEY = 'wordbubble-save'

export interface SavedState {
  version: number
  phase: GamePhase
  level: number
  lives: number
  levelCompleteReason?: LevelCompleteReason
}

export function hasSavedGame(): boolean {
  return loadSavedState() !== null
}

export function clearSavedGame(): void {
  try {
    localStorage.removeItem(SAVE_KEY)
  } catch {
    /* ignore */
  }
}

function loadSavedState(): SavedState | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as SavedState
    if (data.version !== 1 || !data.phase || typeof data.level !== 'number' || typeof data.lives !== 'number') return null
    return data
  } catch {
    return null
  }
}

function saveState(state: SavedState) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state))
  } catch {
    /* ignore */
  }
}

function restoredModalState(saved: SavedState): GameState {
  const targetWord = getWordForLevel(saved.level)
  return {
    phase: saved.phase,
    level: saved.level,
    lives: saved.lives,
    levelCompleteReason: saved.levelCompleteReason,
    targetWord,
    collectedLetters: [],
    fallingLetters: [],
    levelStartTime: Date.now(),
    lettersToSpawn: getLettersPerLevel(saved.level, targetWord.length),
    lettersSpawned: 0
  }
}

export function useGameState() {
  const [state, setState] = useState<GameState>(() => initLevel(1))
  const nextIdRef = useRef(0)
  const levelStartRef = useRef(Date.now())
  const levelEndTimeRef = useRef(0)
  const spawnIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const fallAnimationRef = useRef<number | null>(null)
  const lastTickRef = useRef(0)
  const hasInitializedRef = useRef(false)

  const startLevel = useCallback((level: number, options?: { lives?: number }) => {
    nextIdRef.current = 0
    levelStartRef.current = Date.now()
    const duration = getLevelDurationMs(level)
    levelEndTimeRef.current = Date.now() + duration
    const newState = initLevel(level, options?.lives)
    setState(newState)
    saveState({ version: 1, phase: 'playing', level, lives: newState.lives })
  }, [])

  // Spawn letters when playing and not paused
  useEffect(() => {
    if (state.phase !== 'playing' || state.paused) {
      if (spawnIntervalRef.current) {
        clearInterval(spawnIntervalRef.current)
        spawnIntervalRef.current = null
      }
      return
    }
    const lettersToSpawn = getLettersPerLevel(state.level, state.targetWord.length)
    const levelDuration = getLevelDurationMs(state.level)
    const spawnIntervalMs = Math.max(200, levelDuration / lettersToSpawn - 50)
    spawnIntervalRef.current = setInterval(() => {
      setState((prev) => {
        if (prev.phase !== 'playing' || prev.paused) return prev
        if (prev.lettersSpawned >= prev.lettersToSpawn) return prev
        const nextLetter = getNextLetterToSpawn(
          prev.level,
          prev.targetWord,
          prev.collectedLetters,
          prev.lettersSpawned,
          prev.lettersToSpawn
        )
        if (!nextLetter) return prev
        const letter = createFallingLetter(
          nextLetter,
          nextIdRef.current++,
          randomChoice(BALL_COLORS)
        )
        return {
          ...prev,
          fallingLetters: [...prev.fallingLetters, letter],
          lettersSpawned: prev.lettersSpawned + 1
        }
      })
    }, spawnIntervalMs)
    return () => {
      if (spawnIntervalRef.current) {
        clearInterval(spawnIntervalRef.current)
        spawnIntervalRef.current = null
      }
    }
  }, [state.phase, state.paused, state.level])

  // Fall animation (paused = frozen)
  useEffect(() => {
    if (state.phase !== 'playing' || state.paused) return
    const fallDuration = getFallDurationMs(state.level)

    const POP_DURATION_MS = 500
    const tick = (now: number) => {
      const dt = lastTickRef.current ? (now - lastTickRef.current) / 1000 : 0
      lastTickRef.current = now
      const nowMs = Date.now()
      setState((prev) => {
        if (prev.phase !== 'playing') return prev
        const fallRate = 1 / (fallDuration / 1000)
        const updated = prev.fallingLetters
          .filter((f) => {
            if (f.collected && f.collectedAt != null) {
              if (nowMs - f.collectedAt > POP_DURATION_MS) return false
            }
            return true
          })
          .map((f) => {
            if (f.collected) return f
            if (f.progress >= 1) return f
            return {
              ...f,
              progress: Math.min(1, f.progress + dt * fallRate)
            }
          })
        return { ...prev, fallingLetters: updated }
      })
      fallAnimationRef.current = requestAnimationFrame(tick)
    }
    lastTickRef.current = performance.now()
    fallAnimationRef.current = requestAnimationFrame(tick)
    return () => {
      if (fallAnimationRef.current) cancelAnimationFrame(fallAnimationRef.current)
    }
  }, [state.phase, state.level, state.paused])

  // Level timer: time's up without completing word → lose life (respects pause)
  useEffect(() => {
    if (state.phase !== 'playing' || state.paused) return
    const remaining = Math.max(0, levelEndTimeRef.current - Date.now())
    const timeout = setTimeout(() => {
      setState((prev) => {
        if (prev.phase !== 'playing') return prev
        const targetWord = prev.targetWord
        const wordComplete = [...new Set(targetWord)].every(
          (l) => (targetWord.match(new RegExp(l, 'g')) || []).length <= prev.collectedLetters.filter((c) => c === l).length
        )
        if (wordComplete) return prev
        const newLives = prev.lives - 1
        if (newLives <= 0) {
          return { ...prev, phase: 'gameOver', lives: 0 }
        }
        return {
          ...prev,
          lives: newLives,
          phase: 'levelComplete',
          levelCompleteReason: 'outOfTime',
          collectedLetters: []
        }
      })
    }, remaining)
    return () => clearTimeout(timeout)
  }, [state.phase, state.level, state.levelStartTime, state.paused])

  // Cleanup spawn interval when phase changes
  useEffect(() => {
    if (state.phase !== 'playing' && spawnIntervalRef.current) {
      clearInterval(spawnIntervalRef.current)
      spawnIntervalRef.current = null
    }
  }, [state.phase])

  const collectLetter = useCallback((id: string) => {
    setState((prev) => {
      if (prev.phase !== 'playing') return prev
      const letter = prev.fallingLetters.find((f) => f.id === id)
      if (!letter || letter.collected) return prev
      const targetWord = prev.targetWord
      const countInWord = (l: string) => (targetWord.match(new RegExp(l, 'g')) || []).length
      const countCollected = (l: string) => prev.collectedLetters.filter((c) => c === l).length
      if (countCollected(letter.letter) >= countInWord(letter.letter)) return prev
      const newCollected = [...prev.collectedLetters, letter.letter]
      const wordComplete = [...new Set(targetWord)].every(
        (l) => countInWord(l) <= newCollected.filter((c) => c === l).length
      )
      const now = Date.now()
      const newFalling = prev.fallingLetters.map((f) =>
        f.id === id ? { ...f, collected: true, collectedAt: now } : f
      )
      return {
        ...prev,
        collectedLetters: newCollected,
        fallingLetters: newFalling,
        phase: wordComplete ? 'levelComplete' : prev.phase,
        levelCompleteReason: wordComplete ? 'wordComplete' : prev.levelCompleteReason
      }
    })
  }, [])

  const restart = useCallback(() => {
    startLevel(1)
  }, [startLevel])

  // When transitioning to levelComplete, stop spawn
  useEffect(() => {
    if (state.phase === 'levelComplete' && spawnIntervalRef.current) {
      clearInterval(spawnIntervalRef.current)
      spawnIntervalRef.current = null
    }
  }, [state.phase])

  /** Call after level complete modal: advance to next level or retry same level (out of time). */
  const startNextLevel = useCallback(() => {
    if (state.phase !== 'levelComplete') return
    if (state.levelCompleteReason === 'outOfTime') {
      startLevel(state.level, { lives: state.lives })
      return
    }
    const nextLevel = state.level + 1
    if (nextLevel > TOTAL_LEVELS) {
      startLevel(1)
    } else {
      startLevel(nextLevel)
    }
  }, [state.phase, state.level, state.levelCompleteReason, state.lives, startLevel])

  const setPaused = useCallback((paused: boolean) => {
    setState((prev) => (prev.phase === 'playing' ? { ...prev, paused } : prev))
  }, [])

  // Save when modal is shown (between levels or game over)
  useEffect(() => {
    if (state.phase === 'levelComplete' || state.phase === 'gameOver') {
      saveState({
        version: 1,
        phase: state.phase,
        level: state.level,
        lives: state.lives,
        levelCompleteReason: state.levelCompleteReason
      })
    }
  }, [state.phase, state.level, state.lives, state.levelCompleteReason])

  // Restore from localStorage or start fresh on first mount
  useEffect(() => {
    if (hasInitializedRef.current) return
    hasInitializedRef.current = true
    const saved = loadSavedState()
    if (saved && (saved.phase === 'levelComplete' || saved.phase === 'gameOver')) {
      setState(restoredModalState(saved))
      return
    }
    if (saved && saved.phase === 'playing') {
      startLevel(saved.level, { lives: saved.lives })
      return
    }
    startLevel(1)
  }, [startLevel])

  return {
    state,
    collectLetter,
    goNextLevel: startNextLevel,
    restart,
    setPaused
  }
}

function initLevel(level: number, lives?: number): GameState {
  const targetWord = getWordForLevel(level)
  return {
    phase: 'playing',
    level,
    lives: lives ?? LIVES,
    targetWord,
    collectedLetters: [],
    fallingLetters: [],
    levelStartTime: Date.now(),
    lettersToSpawn: getLettersPerLevel(level, targetWord.length),
    lettersSpawned: 0
  }
}
