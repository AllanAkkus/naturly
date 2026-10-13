/* Spaced repetition (utspridd repetition).
 * Grundschema: samma dag → 1 dag → 3 dagar → 7 dagar → 14 dagar → 30 dagar.
 * Rätt svar flyttar kortet ett steg fram, "svårt" stannar kvar, fel svar
 * flyttar tillbaka till början (men tidigast om 10 minuter).
 */

export const INTERVALS_DAYS = [0, 1, 3, 7, 14, 30, 60]
const DAY = 24 * 60 * 60 * 1000
const SAME_DAY_DELAY = 10 * 60 * 1000

export type ReviewGrade = 'again' | 'hard' | 'good' | 'easy'

export interface CardState {
  step: number
  due: number
  reps: number
  lapses: number
  lastReviewed?: number
}

export function newCard(now = Date.now()): CardState {
  return { step: 0, due: now, reps: 0, lapses: 0 }
}

export function intervalMs(step: number): number {
  const days = INTERVALS_DAYS[Math.min(step, INTERVALS_DAYS.length - 1)]
  return days === 0 ? SAME_DAY_DELAY : days * DAY
}

export function review(card: CardState, grade: ReviewGrade, now = Date.now()): CardState {
  let step = card.step
  let lapses = card.lapses
  if (grade === 'again') {
    step = 0
    lapses += 1
  } else if (grade === 'good') {
    step = step + 1
  } else if (grade === 'easy') {
    step = step + 2
  }
  // 'hard' behåller steget men ger ändå ett nytt intervall
  step = Math.min(step, INTERVALS_DAYS.length - 1)
  const wait = grade === 'again' ? SAME_DAY_DELAY : grade === 'hard' ? Math.max(SAME_DAY_DELAY, intervalMs(step) / 2) : intervalMs(step)
  return { step, due: now + wait, reps: card.reps + 1, lapses, lastReviewed: now }
}

export function isDue(card: CardState, now = Date.now()): boolean {
  return card.due <= now
}

/** Människovänlig text, t.ex. "om 3 dagar". */
export function dueLabel(card: CardState, now = Date.now()): string {
  const diff = card.due - now
  if (diff <= 0) return 'nu'
  const minutes = Math.round(diff / 60000)
  if (minutes < 60) return `om ${minutes} min`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `om ${hours} h`
  const days = Math.round(hours / 24)
  return days === 1 ? 'i morgon' : `om ${days} dagar`
}
