import { useEffect, useState } from 'react'
import { getLevelDurationMs } from './constants'

interface CountdownProps {
  levelStartTime: number
  level: number
  isPlaying: boolean
}

function formatSeconds(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.max(0, Math.floor(seconds % 60))
  if (m > 0) return `${m}:${s.toString().padStart(2, '0')}`
  return `${s}s`
}

export function Countdown({ levelStartTime, level, isPlaying }: CountdownProps) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(interval)
  }, [isPlaying, levelStartTime, level])

  if (!isPlaying) return null

  const durationMs = getLevelDurationMs(level)
  const elapsed = now - levelStartTime
  const remainingMs = Math.max(0, durationMs - elapsed)
  const remainingSec = remainingMs / 1000

  return (
    <span
      className="countdown"
      data-testid="countdown"
      data-low={remainingSec <= 10 ? 'true' : undefined}
      aria-live="polite"
    >
      {formatSeconds(remainingSec)}
    </span>
  )
}
