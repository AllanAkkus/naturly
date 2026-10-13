/* Behärskning per begrepp – inte bara antal rätt.
 * Varje svar uppdaterar ett glidande medelvärde (EMA) där nya svar väger tyngst
 * och svårare frågor väger lite mer.
 */

export type MasteryStatus = 'not-started' | 'learning' | 'needs-review' | 'can-explain'

export const MASTERY_LABELS: Record<MasteryStatus, string> = {
  'not-started': 'Inte påbörjat',
  learning: 'Håller på att lära mig',
  'needs-review': 'Behöver repetera',
  'can-explain': 'Kan förklara själv',
}

export interface ConceptStats {
  attempts: number
  correct: number
  ema: number
  lastSeen: number
  streak: number
  /** Senaste godkända "Förklara med egna ord". */
  explainedAt?: number
}

const DAY = 24 * 60 * 60 * 1000

export function emptyStats(): ConceptStats {
  return { attempts: 0, correct: 0, ema: 0, lastSeen: 0, streak: 0 }
}

export function updateStats(s: ConceptStats, correct: boolean, difficulty: 1 | 2 | 3, now = Date.now()): ConceptStats {
  const alpha = 0.3 + 0.05 * (difficulty - 1)
  const value = correct ? 1 : 0
  const ema = s.attempts === 0 ? (correct ? 0.6 : 0) : s.ema + alpha * (value - s.ema)
  return {
    ...s,
    attempts: s.attempts + 1,
    correct: s.correct + (correct ? 1 : 0),
    ema,
    lastSeen: now,
    streak: correct ? s.streak + 1 : 0,
  }
}

/** Hur länge kunskapen "håller" innan den bör repeteras, växer med säkerheten. */
function retentionDays(s: ConceptStats): number {
  if (s.ema >= 0.85) return 14
  if (s.ema >= 0.7) return 7
  return 3
}

export function masteryStatus(s: ConceptStats | undefined, now = Date.now()): MasteryStatus {
  if (!s || s.attempts === 0) return 'not-started'
  const stale = now - s.lastSeen > retentionDays(s) * DAY
  if (s.attempts >= 2 && s.ema < 0.5) return 'needs-review'
  if (stale && s.ema < 0.85) return 'needs-review'
  if (s.explainedAt && s.ema >= 0.75 && s.attempts >= 3) return 'can-explain'
  return 'learning'
}

/** 0–100 för diagram. */
export function masteryPercent(s: ConceptStats | undefined): number {
  if (!s || s.attempts === 0) return 0
  const confidence = Math.min(1, s.attempts / 5)
  return Math.round(100 * s.ema * (0.6 + 0.4 * confidence))
}
