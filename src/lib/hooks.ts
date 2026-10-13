import { useEffect, useState } from 'react'
import { getHealth } from './ai'

/** Är AI-läraren konfigurerad på servern? */
export function useAiAvailable(): boolean | null {
  const [ok, setOk] = useState<boolean | null>(null)
  useEffect(() => {
    let alive = true
    getHealth().then((h) => alive && setOk(h.ai))
    return () => {
      alive = false
    }
  }, [])
  return ok
}

export function useNow(intervalMs = 30000) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), intervalMs)
    return () => clearInterval(t)
  }, [intervalMs])
  return now
}
