import type { VisualSpec } from '@/content/types'

export interface GlossaryTerm {
  id: string
  term: string
  /** Vetenskaplig definition. */
  definition: string
  /** Förklaring för nybörjare. */
  simple: string
  analogy: string
  related: string[]
  question: { prompt: string; answer: string }
  visual?: VisualSpec
  moduleId: string
}

export const t = (
  id: string,
  term: string,
  moduleId: string,
  definition: string,
  simple: string,
  analogy: string,
  related: string[],
  question: [string, string],
  visual?: VisualSpec,
): GlossaryTerm => ({ id, term, moduleId, definition, simple, analogy, related, question: { prompt: question[0], answer: question[1] }, visual })
