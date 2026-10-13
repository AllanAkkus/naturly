import type { AnyLesson, Lesson, Module, Question, TestLesson } from './types'
import { module1 } from './modules/m01'
import { module2 } from './modules/m02'
import { module3 } from './modules/m03'

export const MODULES: Module[] = [module1, module2, module3]

export const ALL_LESSONS: AnyLesson[] = MODULES.flatMap((m) => m.lessons)

const LESSON_BY_ID = new Map(ALL_LESSONS.map((l) => [l.id, l]))
const MODULE_BY_ID = new Map(MODULES.map((m) => [m.id, m]))

export function getModule(id: string): Module | undefined {
  return MODULE_BY_ID.get(id)
}

export function getLesson(id: string): AnyLesson | undefined {
  return LESSON_BY_ID.get(id)
}

export function isLesson(l: AnyLesson | undefined): l is Lesson {
  return l?.kind === 'lesson'
}

export function isTest(l: AnyLesson | undefined): l is TestLesson {
  return l?.kind === 'test'
}

/** Begreppen är lektionerna – varje lektion lär ut ett begrepp. */
export function conceptLabel(conceptId: string): string {
  return LESSON_BY_ID.get(conceptId)?.title ?? conceptId
}

export function moduleOfConcept(conceptId: string): Module | undefined {
  const l = LESSON_BY_ID.get(conceptId)
  return l ? MODULE_BY_ID.get(l.moduleId) : undefined
}

/** Alla frågor i en lektion. */
export function lessonQuestions(l: AnyLesson): Question[] {
  if (l.kind === 'test') return l.questions
  return [l.check, l.followUp, l.apply, ...l.practice]
}

/** Hela frågebanken, med modul-id. */
export const QUESTION_BANK: Array<{ q: Question; moduleId: string; lessonId: string }> = ALL_LESSONS.flatMap((l) =>
  lessonQuestions(l).map((q) => ({ q, moduleId: l.moduleId, lessonId: l.id })),
)

const QUESTION_BY_ID = new Map(QUESTION_BANK.map((e) => [e.q.id, e]))
export function getQuestion(id: string) {
  return QUESTION_BY_ID.get(id)
}

export const ALL_FLASHCARDS = ALL_LESSONS.flatMap((l) =>
  l.kind === 'lesson' ? l.flashcards.map((f) => ({ ...f, lessonId: l.id, moduleId: l.moduleId })) : [],
)
const FLASHCARD_BY_ID = new Map(ALL_FLASHCARDS.map((f) => [f.id, f]))
export function getFlashcard(id: string) {
  return FLASHCARD_BY_ID.get(id)
}

/** Nästa lektion i kursordning. */
export function nextLessonAfter(id: string): AnyLesson | undefined {
  const i = ALL_LESSONS.findIndex((l) => l.id === id)
  return i >= 0 ? ALL_LESSONS[i + 1] : undefined
}

export function previousLessonBefore(id: string): AnyLesson | undefined {
  const i = ALL_LESSONS.findIndex((l) => l.id === id)
  return i > 0 ? ALL_LESSONS[i - 1] : undefined
}
