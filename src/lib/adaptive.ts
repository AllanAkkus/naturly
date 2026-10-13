import type { Difficulty, Question } from '@/content/types'
import { masteryStatus, type ConceptStats } from './mastery'

/** Lämplig svårighetsgrad för ett begrepp utifrån hur säker eleven är. */
export function targetDifficulty(s?: ConceptStats): Difficulty {
  if (!s || s.attempts < 2) return 1
  if (s.ema < 0.55) return 1
  if (s.ema < 0.82) return 2
  return 3
}

export interface PickerState {
  asked: string[]
  results: Record<string, boolean>
  level: Difficulty
}

/**
 * Väljer nästa fråga adaptivt:
 * - två rätt i rad → svårare, ett fel → enklare
 * - prioriterar begrepp som behöver repeteras och frågor eleven svarat fel på förut
 * - undviker samma begrepp många gånger i rad
 */
export function pickNext(
  pool: Question[],
  state: PickerState,
  concepts: Record<string, ConceptStats>,
  pastMistakes: Set<string>,
  rand: () => number = Math.random,
): Question | null {
  const remaining = pool.filter((q) => !state.asked.includes(q.id))
  if (!remaining.length) return null
  const lastConcepts = state.asked.slice(-2).flatMap((id) => pool.find((q) => q.id === id)?.concepts ?? [])
  let best: Question | null = null
  let bestScore = -Infinity
  for (const q of remaining) {
    const c = q.concepts[0]
    const s = concepts[c]
    let score = 10 - 3 * Math.abs(q.difficulty - state.level)
    const status = masteryStatus(s)
    if (status === 'needs-review') score += 4
    if (status === 'not-started') score += 1
    if (status === 'can-explain') score -= 2
    if (pastMistakes.has(q.id)) score += 3
    if (lastConcepts.includes(c)) score -= 4
    score += rand() * 2.5
    if (score > bestScore) {
      bestScore = score
      best = q
    }
  }
  return best
}

export function nextLevel(level: Difficulty, recent: boolean[]): Difficulty {
  const last = recent.at(-1)
  if (last === false) return Math.max(1, level - 1) as Difficulty
  if (recent.length >= 2 && recent.slice(-2).every(Boolean)) return Math.min(3, level + 1) as Difficulty
  return level
}

/** Ett blandat urval för simulerade prov: jämn fördelning mellan moduler och svårigheter. */
export function buildExam(pool: Array<{ q: Question; moduleId: string }>, count: number, rand: () => number = Math.random): Question[] {
  const byModule = new Map<string, Question[]>()
  for (const { q, moduleId } of pool) byModule.set(moduleId, [...(byModule.get(moduleId) ?? []), q])
  for (const list of byModule.values()) list.sort(() => rand() - 0.5)
  const out: Question[] = []
  const modules = [...byModule.keys()]
  let i = 0
  while (out.length < count && modules.some((m) => byModule.get(m)!.length)) {
    const m = modules[i % modules.length]
    const q = byModule.get(m)!.pop()
    if (q) out.push(q)
    i++
  }
  // lättare frågor först, så att provet börjar lugnt
  return out.sort((a, b) => a.difficulty - b.difficulty)
}
