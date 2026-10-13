import type { AnyLesson, Lesson, Module, Question, TestLesson } from './types'
import { module1 } from './modules/m01'
import { module2 } from './modules/m02'
import { module3 } from './modules/m03'
import { module4 } from './modules/m04'
import { module5 } from './modules/m05'
import { module6 } from './modules/m06'
import { module7 } from './modules/m07'
import { module8 } from './modules/m08'
import { module9 } from './modules/m09'
import { module10 } from './modules/m10'
import { module11 } from './modules/m11'
import { module12 } from './modules/m12'
import { module13 } from './modules/m13'

export const MODULES: Module[] = [module1, module2, module3, module4, module5, module6, module7, module8, module9, module10, module11, module12, module13]

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

/** Kapitlets sidor grupperade i avsnitt, i kursordning. Prov hamnar i ett eget avsnitt sist. */
export function moduleSections(m: Module): Array<{ title: string; lessons: AnyLesson[] }> {
  const out: Array<{ title: string; lessons: AnyLesson[] }> = []
  for (const l of m.lessons) {
    const title = l.kind === 'test' ? 'Testa dig själv' : (l.section ?? m.title)
    const last = out.at(-1)
    if (last?.title === title) last.lessons.push(l)
    else out.push({ title, lessons: [l] })
  }
  return out
}

/** Sidans plats i boken: kapitel och avsnitt. */
export function lessonLocation(l: AnyLesson) {
  const module = MODULE_BY_ID.get(l.moduleId)!
  return { module, section: l.kind === 'lesson' ? l.section : undefined }
}
