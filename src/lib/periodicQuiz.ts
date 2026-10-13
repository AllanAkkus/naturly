import { ELEMENTS } from '@/data/elements'
import { configurationString, ionNotation, isotopeNotation, typicalIonCharge, electronsInIon } from './chemistry'

export type PeriodicQuizKind = 'protons' | 'number' | 'symbol' | 'config' | 'ion' | 'isotope'

export const QUIZ_KIND_LABELS: Record<PeriodicQuizKind, string> = {
  protons: 'Antal protoner',
  number: 'Atomnummer',
  symbol: 'Kemisk symbol',
  config: 'Elektronkonfiguration',
  ion: 'Jonladdning',
  isotope: 'Isotopbeteckning',
}

/** Vilket begrepp (lektion) varje frågetyp tränar. */
export const QUIZ_KIND_CONCEPT: Record<PeriodicQuizKind, string> = {
  protons: 'm2-l11',
  number: 'm2-l03',
  symbol: 'm2-l03',
  config: 'm2-l08',
  ion: 'm2-l09',
  isotope: 'm2-l10',
}

export interface PeriodicQuizQuestion {
  kind: PeriodicQuizKind
  prompt: string
  answer: number
  explanation: string
}

const WELL_KNOWN = [1, 2, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 26, 29, 30, 35, 47, 53, 79, 80, 82, 92]

export function makePeriodicQuestion(kind: PeriodicQuizKind, rand: () => number = Math.random): PeriodicQuizQuestion {
  const pick = (list: number[]) => list[Math.floor(rand() * list.length)]
  switch (kind) {
    case 'protons': {
      const z = pick(WELL_KNOWN.filter((x) => x <= 36))
      const el = ELEMENTS[z - 1]
      return { kind, prompt: `Vilket grundämne har ${z} protoner i kärnan?`, answer: z, explanation: `Antalet protoner är atomnumret. Atomnummer ${z} är ${el.name.toLowerCase()} (${el.symbol}).` }
    }
    case 'number': {
      const z = pick(WELL_KNOWN)
      const el = ELEMENTS[z - 1]
      return { kind, prompt: `Klicka på grundämnet med atomnummer ${z}.`, answer: z, explanation: `Atomnummer ${z} är ${el.name.toLowerCase()} (${el.symbol}).` }
    }
    case 'symbol': {
      const z = pick(WELL_KNOWN)
      const el = ELEMENTS[z - 1]
      const hint = el.symbol[0] !== el.name[0] ? ` Symbolen kommer från det latinska namnet, därför börjar den inte på samma bokstav.` : ''
      return { kind, prompt: `Vilken symbol har ${el.name.toLowerCase()}? Klicka på rätt ruta.`, answer: z, explanation: `${el.name} har symbolen ${el.symbol} och atomnummer ${z}.${hint}` }
    }
    case 'config': {
      const z = pick(Array.from({ length: 20 }, (_, i) => i + 1))
      const el = ELEMENTS[z - 1]
      return {
        kind,
        prompt: `Vilket grundämne har elektronkonfigurationen ${configurationString(z)}?`,
        answer: z,
        explanation: `Räkna ihop de upphöjda siffrorna: det blir ${z} elektroner. En neutral atom med ${z} elektroner har ${z} protoner – det är ${el.name.toLowerCase()}.`,
      }
    }
    case 'ion': {
      const candidates = [3, 4, 7, 8, 9, 11, 12, 13, 15, 16, 17, 19, 20, 35, 38, 53]
      const z = pick(candidates)
      const el = ELEMENTS[z - 1]
      const charge = typicalIonCharge(z)!
      const e = electronsInIon(z, charge)
      return {
        kind,
        prompt: `En jon har laddningen ${charge > 0 ? '+' : '−'}${Math.abs(charge)} och ${e} elektroner. Vilket grundämne är det?`,
        answer: z,
        explanation: `Protoner = elektroner + laddning = ${e} ${charge > 0 ? '+' : '−'} ${Math.abs(charge)} = ${z}. Det är ${el.name.toLowerCase()}, som bildar ${ionNotation(el.symbol, charge)}.`,
      }
    }
    case 'isotope': {
      const z = pick(WELL_KNOWN.filter((x) => x <= 30))
      const el = ELEMENTS[z - 1]
      const iso = el.isotopes[Math.floor(rand() * el.isotopes.length)]
      const n = iso.massNumber - z
      return {
        kind,
        prompt: `En isotop har masstalet ${iso.massNumber} och ${n} neutroner. Vilket grundämne är det? (Skrivs ${toQuestionMark(iso.massNumber)})`,
        answer: z,
        explanation: `Protoner = masstal − neutroner = ${iso.massNumber} − ${n} = ${z}. Det är ${el.name.toLowerCase()}, alltså ${isotopeNotation(el.symbol, iso.massNumber)}.`,
      }
    }
  }
}

function toQuestionMark(a: number) {
  return isotopeNotation('?', a)
}
