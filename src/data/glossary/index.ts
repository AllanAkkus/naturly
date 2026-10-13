import { BIOLOGY_TERMS } from './biology'
import { BIOTECH_TERMS } from './biotech'
import { CHEMISTRY_TERMS } from './chemistry'
import { EVOLUTION_TERMS } from './evolution'
import { HEALTH_TERMS } from './health'
import { HORMONE_TERMS } from './hormones'
import { IMMUNE_TERMS } from './immune'
import { METHOD_TERMS } from './methods'
import { NERVOUS_TERMS } from './nervous'
import { SOCIETY_TERMS } from './society'
import { SUSTAINABILITY_TERMS } from './sustainability'
import type { GlossaryTerm } from './types'

export type { GlossaryTerm }

export const GLOSSARY: GlossaryTerm[] = [...CHEMISTRY_TERMS, ...BIOLOGY_TERMS, ...SUSTAINABILITY_TERMS, ...NERVOUS_TERMS, ...HORMONE_TERMS, ...IMMUNE_TERMS, ...HEALTH_TERMS, ...EVOLUTION_TERMS, ...BIOTECH_TERMS, ...SOCIETY_TERMS, ...METHOD_TERMS].sort((a, b) => a.term.localeCompare(b.term, 'sv'))

export const TERM_BY_ID = new Map(GLOSSARY.map((t) => [t.id, t]))
