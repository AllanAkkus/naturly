import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { emptyStats, updateStats, type ConceptStats } from '@/lib/mastery'
import { newCard, review, type CardState, type ReviewGrade } from '@/lib/srs'

export interface LessonProgress {
  status: 'started' | 'completed'
  step: number
  startedAt: number
  completedAt?: number
  visits: number
}

export interface AnswerRecord {
  questionId: string
  concepts: string[]
  correct: boolean
  difficulty: 1 | 2 | 3
  t: number
  source: 'lesson' | 'quiz' | 'exam' | 'review' | 'lab'
  /** Kort text om vad eleven svarade, för att hitta vanliga misstag. */
  given?: string
}

export interface ExamResult {
  id: string
  title: string
  t: number
  score: number
  total: number
  durationSec: number
  byConcept: Record<string, { correct: number; total: number }>
}

export interface ProgressState {
  lessons: Record<string, LessonProgress>
  concepts: Record<string, ConceptStats>
  answers: AnswerRecord[]
  cards: Record<string, CardState>
  exams: ExamResult[]
  studyLog: Record<string, number>
  savedTerms: string[]
  labsDone: string[]
  lastVisited?: { path: string; title: string; t: number }

  startLesson: (id: string) => void
  setLessonStep: (id: string, step: number) => void
  completeLesson: (id: string, flashcardIds: string[]) => void
  recordAnswer: (a: Omit<AnswerRecord, 't'>) => void
  markExplained: (conceptId: string) => void
  scheduleCards: (ids: string[]) => void
  reviewCard: (id: string, grade: ReviewGrade) => void
  addExam: (r: ExamResult) => void
  addStudyMinutes: (minutes: number) => void
  toggleSavedTerm: (termId: string) => void
  markLabDone: (id: string) => void
  setLastVisited: (path: string, title: string) => void
  importData: (data: Partial<ProgressState>) => void
  resetAll: () => void
}

export const todayKey = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

const empty = {
  lessons: {},
  concepts: {},
  answers: [],
  cards: {},
  exams: [],
  studyLog: {},
  savedTerms: [],
  labsDone: [],
  lastVisited: undefined,
}

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      ...empty,

      startLesson: (id) =>
        set((s) => {
          const existing = s.lessons[id]
          return {
            lessons: {
              ...s.lessons,
              [id]: existing
                ? { ...existing, visits: existing.visits + 1 }
                : { status: 'started', step: 0, startedAt: Date.now(), visits: 1 },
            },
          }
        }),

      setLessonStep: (id, step) =>
        set((s) => {
          const l = s.lessons[id] ?? { status: 'started' as const, step: 0, startedAt: Date.now(), visits: 1 }
          return { lessons: { ...s.lessons, [id]: { ...l, step } } }
        }),

      completeLesson: (id, flashcardIds) =>
        set((s) => {
          const l = s.lessons[id] ?? { status: 'started' as const, step: 0, startedAt: Date.now(), visits: 1 }
          const cards = { ...s.cards }
          for (const fid of flashcardIds) if (!cards[fid]) cards[fid] = newCard()
          return {
            lessons: { ...s.lessons, [id]: { ...l, status: 'completed', completedAt: l.completedAt ?? Date.now() } },
            cards,
          }
        }),

      recordAnswer: (a) =>
        set((s) => {
          const concepts = { ...s.concepts }
          for (const c of a.concepts) concepts[c] = updateStats(concepts[c] ?? emptyStats(), a.correct, a.difficulty)
          const answers = [...s.answers, { ...a, t: Date.now() }].slice(-3000)
          return { concepts, answers }
        }),

      markExplained: (conceptId) =>
        set((s) => ({
          concepts: { ...s.concepts, [conceptId]: { ...(s.concepts[conceptId] ?? emptyStats()), explainedAt: Date.now() } },
        })),

      scheduleCards: (ids) =>
        set((s) => {
          const cards = { ...s.cards }
          for (const id of ids) if (!cards[id]) cards[id] = newCard()
          return { cards }
        }),

      reviewCard: (id, grade) =>
        set((s) => ({ cards: { ...s.cards, [id]: review(s.cards[id] ?? newCard(), grade) } })),

      addExam: (r) => set((s) => ({ exams: [...s.exams, r].slice(-100) })),

      addStudyMinutes: (minutes) =>
        set((s) => {
          const k = todayKey()
          return { studyLog: { ...s.studyLog, [k]: (s.studyLog[k] ?? 0) + minutes } }
        }),

      toggleSavedTerm: (termId) =>
        set((s) => {
          const saved = s.savedTerms.includes(termId)
          const cards = { ...s.cards }
          const cardId = `term-${termId}`
          if (!saved && !cards[cardId]) cards[cardId] = newCard()
          if (saved) delete cards[cardId]
          return { savedTerms: saved ? s.savedTerms.filter((t) => t !== termId) : [...s.savedTerms, termId], cards }
        }),

      markLabDone: (id) => set((s) => (s.labsDone.includes(id) ? s : { labsDone: [...s.labsDone, id] })),

      setLastVisited: (path, title) => set({ lastVisited: { path, title, t: Date.now() } }),

      importData: (data) => set({ ...empty, ...data }),

      resetAll: () => set({ ...empty }),
    }),
    { name: 'naturly-progress', version: 1 },
  ),
)
