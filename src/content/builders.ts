/* Hjälpfunktioner för att skriva lektioner kompakt.
 * Frågor skapas utan id – id och begrepp sätts av `lesson()` och `test()`.
 */
import type {
  AtomQuestion,
  Difficulty,
  ElementQuestion,
  ExplainQuestion,
  FillQuestion,
  HotspotQuestion,
  Lesson,
  MatchQuestion,
  MCQuestion,
  Module,
  OrderQuestion,
  Question,
  TestLesson,
  TrueFalseQuestion,
  VisualSpec,
} from './types'

type Draft<T extends Question> = Omit<T, 'id' | 'concepts' | 'difficulty'> & { concepts?: string[]; difficulty?: Difficulty }
type Extra = {
  d?: Difficulty
  hint?: string
  context?: string
  c?: string[]
  table?: Question['table']
  visual?: VisualSpec
}

const base = (prompt: string, explanation: string, x: Extra = {}) => ({
  prompt,
  explanation,
  difficulty: x.d,
  hint: x.hint,
  context: x.context,
  concepts: x.c,
  table: x.table,
  visual: x.visual,
})

export const mcq = (
  prompt: string,
  options: string[],
  correct: number,
  explanation: string,
  x: Extra & { wrong?: MCQuestion['wrong'] } = {},
): Draft<MCQuestion> => ({ type: 'mcq', options, correct, wrong: x.wrong, ...base(prompt, explanation, x) })

export const tf = (prompt: string, correct: boolean, explanation: string, x: Extra = {}): Draft<TrueFalseQuestion> => ({
  type: 'tf',
  correct,
  ...base(prompt, explanation, x),
})

export const fill = (
  prompt: string,
  accept: string[],
  explanation: string,
  x: Extra & { numeric?: boolean } = {},
): Draft<FillQuestion> => ({ type: 'fill', accept, numeric: x.numeric, ...base(prompt, explanation, x) })

export const match = (prompt: string, pairs: Array<[string, string]>, explanation: string, x: Extra = {}): Draft<MatchQuestion> => ({
  type: 'match',
  pairs,
  ...base(prompt, explanation, x),
})

export const order = (prompt: string, items: string[], explanation: string, x: Extra = {}): Draft<OrderQuestion> => ({
  type: 'order',
  items,
  ...base(prompt, explanation, x),
})

export const explain = (
  prompt: string,
  reference: string,
  keywords: string[][],
  x: Extra & { min?: number } = {},
): Draft<ExplainQuestion> => ({
  type: 'explain',
  reference,
  keywords,
  minKeywords: x.min,
  ...base(prompt, reference, x),
})

export const atomQ = (prompt: string, target: AtomQuestion['target'], explanation: string, x: Extra = {}): Draft<AtomQuestion> => ({
  type: 'atom',
  target,
  ...base(prompt, explanation, x),
})

export const elementQ = (prompt: string, answer: number, explanation: string, x: Extra = {}): Draft<ElementQuestion> => ({
  type: 'element',
  answer,
  ...base(prompt, explanation, x),
})

export const hotspot = (
  prompt: string,
  visual: VisualSpec,
  answer: string,
  explanation: string,
  x: Extra = {},
): Draft<HotspotQuestion> => ({ type: 'hotspot', answer, ...base(prompt, explanation, x), visual })

type AnyDraft = Draft<Question>

function finalize(q: AnyDraft, id: string, concepts: string[], fallback: Difficulty): Question {
  const clean = Object.fromEntries(Object.entries(q).filter(([, v]) => v !== undefined))
  return {
    ...clean,
    id,
    concepts: q.concepts && q.concepts.length ? q.concepts : concepts,
    difficulty: q.difficulty ?? fallback,
  } as Question
}

export interface LessonDraft
  extends Omit<Lesson, 'kind' | 'moduleId' | 'check' | 'followUp' | 'apply' | 'practice' | 'flashcards' | 'core' | 'curriculum'> {
  core?: boolean
  curriculum?: string[]
  check: AnyDraft
  followUp: AnyDraft
  apply: AnyDraft
  practice: AnyDraft[]
  flashcards: Array<[string, string]>
}

export function lesson(d: LessonDraft): Omit<Lesson, 'moduleId' | 'core' | 'curriculum'> & { core?: boolean; curriculum?: string[] } {
  const concepts = [d.id]
  return {
    ...d,
    kind: 'lesson',
    check: finalize(d.check, `${d.id}-check`, concepts, 1),
    followUp: finalize(d.followUp, `${d.id}-follow`, concepts, 1),
    apply: finalize(d.apply, `${d.id}-apply`, concepts, 2),
    practice: d.practice.map((q, i) => finalize(q, `${d.id}-p${i + 1}`, concepts, i === 0 ? 1 : i === 1 ? 2 : 2)),
    flashcards: d.flashcards.map(([front, back], i) => ({ id: `${d.id}-fc${i + 1}`, front, back })),
  }
}

export interface TestDraft extends Omit<TestLesson, 'kind' | 'moduleId' | 'questions' | 'core' | 'curriculum'> {
  core?: boolean
  curriculum?: string[]
  questions: AnyDraft[]
}

export function test(d: TestDraft): Omit<TestLesson, 'moduleId' | 'core' | 'curriculum'> & { core?: boolean; curriculum?: string[] } {
  return {
    ...d,
    kind: 'test',
    questions: d.questions.map((q, i) => finalize(q, `${d.id}-q${i + 1}`, [d.id], 2)),
  }
}

type LessonLike = ReturnType<typeof lesson> | ReturnType<typeof test>

export function defineModule(
  m: Omit<Module, 'lessons'> & { core: boolean; curriculum: string[] },
  lessons: LessonLike[],
): Module {
  const { core, curriculum, ...rest } = m
  return {
    ...rest,
    lessons: lessons.map((l) => ({
      ...l,
      moduleId: m.id,
      core: l.core ?? core,
      curriculum: l.curriculum ?? curriculum,
    })) as Module['lessons'],
  }
}
