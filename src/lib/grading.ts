import type { ExplainQuestion, FillQuestion, Question } from '@/content/types'

/** Gör om text så att "Ca²⁺", "ca2+" och " Ca 2 + " jämförs lika. */
export function normalizeAnswer(s: string): string {
  return s
    .toLowerCase()
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, (c) => String('⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c)))
    .replace(/[₀₁₂₃₄₅₆₇₈₉]/g, (c) => String('₀₁₂₃₄₅₆₇₈₉'.indexOf(c)))
    .replace(/⁺/g, '+')
    .replace(/[⁻−–]/g, '-')
    .replace(/,/g, ',')
    .replace(/\s+/g, '')
    .replace(/[.!]$/, '')
}

export function gradeFill(q: FillQuestion, answer: string): boolean {
  const a = normalizeAnswer(answer)
  if (!a) return false
  if (q.numeric) {
    const num = Number(a.replace(',', '.'))
    return q.accept.some((x) => Number(normalizeAnswer(x).replace(',', '.')) === num)
  }
  return q.accept.some((x) => normalizeAnswer(x) === a)
}

export interface KeywordResult {
  matched: string[]
  missing: string[]
  passed: boolean
}

/** Enkel offline-bedömning: hittar nyckelbegrepp i elevens text. */
export function gradeExplainOffline(q: ExplainQuestion, text: string): KeywordResult {
  const t = text.toLowerCase()
  const matched: string[] = []
  const missing: string[] = []
  for (const group of q.keywords) {
    const hit = group.find((k) => t.includes(k.toLowerCase()))
    if (hit) matched.push(group[0])
    else missing.push(group[0])
  }
  const needed = q.minKeywords ?? Math.ceil(q.keywords.length / 2)
  return { matched, missing, passed: matched.length >= needed && text.trim().length >= 15 }
}

/** Blandar en lista på ett förutsägbart sätt (samma frö → samma ordning). */
export function seededShuffle<T>(items: T[], seed: string): T[] {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619)
  const rand = () => {
    h += 0x6d2b79f5
    let t = h
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  const arr = [...items]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function questionTypeLabel(q: Question): string {
  switch (q.type) {
    case 'mcq':
      return 'Flerval'
    case 'tf':
      return 'Sant eller falskt'
    case 'fill':
      return 'Fyll i'
    case 'match':
      return 'Para ihop'
    case 'order':
      return 'Sätt i ordning'
    case 'explain':
      return 'Förklara med egna ord'
    case 'atom':
      return 'Bygg en atom'
    case 'element':
      return 'Periodiska systemet'
    case 'hotspot':
      return 'Klicka i bilden'
  }
}
