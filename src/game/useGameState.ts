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
import type { FallingLetter, GameState } from './types'

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('')

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function createFallingLetter(
  letter: string,
  nextId: number,
  color: string
): FallingLetter {
  return {
    id: `letter-${nextId}`,
    letter: letter.toLowerCase(),
    color,
    progress: 0,
    collected: false
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

export function useGameState() {
  const [state, setState] = useState<GameState>(() => initLevel(1))
  const nextIdRef = useRef(0)
  const levelStartRef = useRef(Date.now())
  const spawnIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const fallAnimationRef = useRef<number | null>(null)
  const lastTickRef = useRef(0)

  const startLevel = useCallback((level: number, options?: { lives?: number }) => {
    nextIdRef.current = 0
    levelStartRef.current = Date.now()
    const newState = initLevel(level, options?.lives)
    setState(newState)

    // Spawn letters at intervals
    const lettersToSpawn = getLettersPerLevel(level, newState.targetWord.length)
    const levelDuration = getLevelDurationMs(level)
    const spawnInterval = Math.max(
      200,
      levelDuration / lettersToSpawn - 50
    )

    if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current)
    spawnIntervalRef.current = setInterval(() => {
      setState((prev) => {
        if (prev.phase !== 'playing') return prev
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
    }, spawnInterval)

    return () => {
      if (spawnIntervalRef.current) {
        clearInterval(spawnIntervalRef.current)
        spawnIntervalRef.current = null
      }
    }
  }, [])

  // Fall animation
  useEffect(() => {
    if (state.phase !== 'playing') return
    const fallDuration = getFallDurationMs(state.level)

    const tick = (now: number) => {
      const dt = lastTickRef.current ? (now - lastTickRef.current) / 1000 : 0
      lastTickRef.current = now
      setState((prev) => {
        if (prev.phase !== 'playing') return prev
        const updated = prev.fallingLetters
          .filter((f) => !f.collected && f.progress < 1)
          .map((f) => ({
            ...f,
            progress: Math.min(1, f.progress + dt * (1 / (fallDuration / 1000)))
          }))
        if (updated.length === prev.fallingLetters.length && updated.every((a, i) => a.progress === prev.fallingLetters[i].progress)) {
          return prev
        }
        return { ...prev, fallingLetters: updated }
      })
      fallAnimationRef.current = requestAnimationFrame(tick)
    }
    lastTickRef.current = performance.now()
    fallAnimationRef.current = requestAnimationFrame(tick)
    return () => {
      if (fallAnimationRef.current) cancelAnimationFrame(fallAnimationRef.current)
    }
  }, [state.phase, state.level])

  // Level timer: time's up without completing word → lose life
  useEffect(() => {
    if (state.phase !== 'playing') return
    const levelDuration = getLevelDurationMs(state.level)
    const timeout = setTimeout(() => {
      setState((prev) => {
        if (prev.phase !== 'playing') return prev
        if (prev.collectedLetters.join('') === prev.targetWord) return prev
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
    }, levelDuration)
    return () => clearTimeout(timeout)
  }, [state.phase, state.level, state.levelStartTime])

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
      const nextIndex = prev.collectedLetters.length
      const nextNeeded = prev.targetWord[nextIndex]
      if (nextNeeded !== letter.letter) return prev
      const newCollected = [...prev.collectedLetters, letter.letter]
      const wordComplete = newCollected.join('') === prev.targetWord
      const newFalling = prev.fallingLetters.map((f) =>
        f.id === id ? { ...f, collected: true } : f
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

  // Start first level on mount
  useEffect(() => {
    startLevel(1)
  }, [])

  return {
    state,
    collectLetter,
    goNextLevel: startNextLevel,
    restart
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
