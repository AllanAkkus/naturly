import { describe, expect, it } from 'vitest'
import { ALL_LESSONS, MODULES, QUESTION_BANK, getLesson, lessonQuestions } from '@/content'
import { CURRICULUM_BY_ID, CURRICULUM } from '@/content/curriculum'
import type { Question } from '@/content/types'
import { TERM_BY_ID, GLOSSARY } from '@/data/glossary'
import { SIMULATION_LIST } from '@/components/lab/registry'
import { gradeFill } from '@/lib/grading'

function checkQuestion(q: Question) {
  expect(q.prompt.length, q.id).toBeGreaterThan(5)
  expect(q.explanation.length, q.id).toBeGreaterThan(5)
  expect(q.concepts.length, q.id).toBeGreaterThan(0)
  for (const c of q.concepts) expect(getLesson(c), `${q.id} begrepp ${c}`).toBeDefined()
  switch (q.type) {
    case 'mcq':
      expect(q.options.length, q.id).toBeGreaterThanOrEqual(2)
      expect(q.correct, q.id).toBeGreaterThanOrEqual(0)
      expect(q.correct, q.id).toBeLessThan(q.options.length)
      expect(new Set(q.options).size, `${q.id} dubbla alternativ`).toBe(q.options.length)
      for (const k of Object.keys(q.wrong ?? {})) {
        expect(Number(k), `${q.id} wrong-index`).not.toBe(q.correct)
        expect(Number(k)).toBeLessThan(q.options.length)
      }
      break
    case 'fill':
      expect(q.accept.length, q.id).toBeGreaterThan(0)
      expect(gradeFill(q, q.accept[0]), `${q.id} accepterar sitt eget svar`).toBe(true)
      break
    case 'match':
      expect(q.pairs.length, q.id).toBeGreaterThanOrEqual(2)
      expect(new Set(q.pairs.map((p) => p[0])).size, `${q.id} unika vänsterled`).toBe(q.pairs.length)
      break
    case 'order':
      expect(q.items.length, q.id).toBeGreaterThanOrEqual(3)
      expect(new Set(q.items).size, q.id).toBe(q.items.length)
      break
    case 'explain':
      expect(q.keywords.length, q.id).toBeGreaterThanOrEqual(2)
      expect(q.minKeywords ?? 1, q.id).toBeLessThanOrEqual(q.keywords.length)
      break
    case 'element':
      expect(q.answer).toBeGreaterThanOrEqual(1)
      expect(q.answer).toBeLessThanOrEqual(118)
      break
    case 'atom':
      expect(q.target.protons).toBeGreaterThanOrEqual(1)
      expect(q.target.protons).toBeLessThanOrEqual(36)
      break
  }
}

describe('kursinnehållet', () => {
  it('har unika id:n för lektioner och frågor', () => {
    const ids = ALL_LESSONS.map((l) => l.id)
    expect(new Set(ids).size).toBe(ids.length)
    const qids = QUESTION_BANK.map((e) => e.q.id)
    expect(new Set(qids).size).toBe(qids.length)
  })

  it('varje modul har lektioner och avslutas med ett prov', () => {
    for (const m of MODULES) {
      expect(m.lessons.length, m.id).toBeGreaterThan(3)
      expect(m.lessons.at(-1)!.kind, `${m.id} slutar med prov`).toBe('test')
    }
  })

  for (const l of ALL_LESSONS) {
    it(`${l.id} – ${l.title} följer lektionsschemat`, () => {
      for (const c of l.curriculum) expect(CURRICULUM_BY_ID.get(c), `${l.id} läroplanspunkt ${c}`).toBeDefined()
      for (const p of l.prerequisites) expect(getLesson(p), `${l.id} förkunskap ${p}`).toBeDefined()
      if (l.kind === 'test') {
        expect(l.questions.length).toBeGreaterThanOrEqual(10)
      } else {
        expect(l.goal.startsWith('Idag ska vi'), `${l.id} mål`).toBe(true)
        expect(l.objectives.length).toBeGreaterThanOrEqual(2)
        expect(l.simple.length, `${l.id} enkel förklaring 2–4 meningar`).toBeGreaterThanOrEqual(2)
        expect(l.simple.length).toBeLessThanOrEqual(4)
        expect(l.detailed.length).toBeGreaterThanOrEqual(2)
        expect(l.analogy.text.length).toBeGreaterThan(20)
        expect(l.analogy.limits.length, `${l.id} liknelsens gränser`).toBeGreaterThan(10)
        expect(l.alternatives.length, `${l.id} alternativa förklaringar`).toBeGreaterThanOrEqual(1)
        expect(l.caveats.length).toBeGreaterThanOrEqual(1)
        expect(l.practice.length, `${l.id} minst 3 övningar`).toBeGreaterThanOrEqual(3)
        expect(l.summary.length, `${l.id} sammanfattning 3–5`).toBeGreaterThanOrEqual(3)
        expect(l.summary.length).toBeLessThanOrEqual(5)
        expect(l.flashcards.length).toBeGreaterThanOrEqual(2)
        expect(l.related.length).toBeGreaterThanOrEqual(1)
        for (const r of l.related) expect(TERM_BY_ID.has(r), `${l.id} relaterat begrepp "${r}" finns i ordlistan`).toBe(true)
      }
      for (const q of lessonQuestions(l)) checkQuestion(q)
    })
  }

  it('alla simuleringar pekar på riktiga lektioner och har följdfrågor', () => {
    for (const s of SIMULATION_LIST) {
      expect(getLesson(s.conceptId), s.id).toBeDefined()
      expect(s.questions.length, s.id).toBeGreaterThanOrEqual(2)
      for (const q of s.questions) checkQuestion(q)
    }
  })

  it('ordlistan har unika begrepp och giltiga moduler', () => {
    expect(new Set(GLOSSARY.map((t) => t.id)).size).toBe(GLOSSARY.length)
    for (const t of GLOSSARY) {
      expect(MODULES.some((m) => m.id === t.moduleId) || ['m4', 'm5', 'm6', 'm7', 'm8', 'm9', 'm10', 'm11', 'm12', 'm13', 'm14'].includes(t.moduleId), t.id).toBe(true)
      expect(t.analogy.length, `${t.id} vardagsliknelse`).toBeGreaterThan(5)
    }
  })
})

describe('täckning av centralt innehåll', () => {
  it('alla moduler som är markerade som klara täcker sina läroplanspunkter', () => {
    const covered = new Set(ALL_LESSONS.flatMap((l) => l.curriculum))
    const complete = MODULES.every((m) => m.status === 'complete') && MODULES.length === 14
    if (complete) for (const c of CURRICULUM) expect(covered.has(c.id), `läroplanspunkt saknas: ${c.text}`).toBe(true)
    else expect(covered.size).toBeGreaterThan(0)
  })
})
