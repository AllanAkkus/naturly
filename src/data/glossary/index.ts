import { CHEMISTRY_TERMS } from './chemistry'
import type { GlossaryTerm } from './types'

export type { GlossaryTerm }

export const GLOSSARY: GlossaryTerm[] = [...CHEMISTRY_TERMS].sort((a, b) => a.term.localeCompare(b.term, 'sv'))

export const TERM_BY_ID = new Map(GLOSSARY.map((t) => [t.id, t]))
