import type { CurriculumArea } from './types'

/** Centralt innehåll för Naturkunskap nivå 2 (enligt underlaget från eleven). */
export interface CurriculumPoint {
  id: string
  area: CurriculumArea
  text: string
}

export const AREA_LABELS: Record<CurriculumArea, string> = {
  natur: 'Natur och hållbar utveckling',
  kropp: 'Människokroppen och hälsa',
  omvarld: 'Naturvetenskap i omvärlden',
  metod: 'Naturvetenskapliga arbetsmetoder',
}

export const CURRICULUM: CurriculumPoint[] = [
  { id: 'materia', area: 'natur', text: 'Materians uppkomst och kretslopp.' },
  { id: 'org-oorg', area: 'natur', text: 'Organiska och oorganiska ämnen i naturen och industrin.' },
  { id: 'amnen-miljo', area: 'natur', text: 'Hur ämnen används och påverkar miljön.' },

  { id: 'reglering', area: 'kropp', text: 'Kroppens reglering.' },
  { id: 'nerv', area: 'kropp', text: 'Nervsystemet.' },
  { id: 'hormon', area: 'kropp', text: 'Hormonsystemet.' },
  { id: 'immun', area: 'kropp', text: 'Immunsystemet.' },
  { id: 'halsa', area: 'kropp', text: 'Fysisk och psykisk hälsa.' },
  { id: 'forebygg', area: 'kropp', text: 'Förebyggande åtgärder.' },
  { id: 'behandling', area: 'kropp', text: 'Behandlingar och läkemedel.' },
  { id: 'artbildning', area: 'kropp', text: 'Artbildning.' },
  { id: 'anatomi', area: 'kropp', text: 'Jämförande anatomi ur evolutionärt perspektiv.' },
  { id: 'cell', area: 'kropp', text: 'Cellbiologi.' },
  { id: 'bioteknik', area: 'kropp', text: 'Bioteknik.' },
  { id: 'mikro', area: 'kropp', text: 'Användning av alger, bakterier och svampar.' },

  { id: 'handelser', area: 'omvarld', text: 'Naturvetenskap bakom historiska och aktuella händelser.' },
  { id: 'samhalle', area: 'omvarld', text: 'Naturvetenskapens betydelse för individ och samhälle.' },
  { id: 'etik', area: 'omvarld', text: 'Etiska frågor inom exempelvis bioteknik.' },

  { id: 'falt', area: 'metod', text: 'Fältstudier.' },
  { id: 'lab', area: 'metod', text: 'Laborationer.' },
  { id: 'simulering', area: 'metod', text: 'Simuleringar.' },
  { id: 'fraga', area: 'metod', text: 'Vetenskapliga frågeställningar.' },
  { id: 'hypotes', area: 'metod', text: 'Hypoteser.' },
  { id: 'planering', area: 'metod', text: 'Planering.' },
  { id: 'risk', area: 'metod', text: 'Riskbedömning.' },
  { id: 'genomforande', area: 'metod', text: 'Genomförande.' },
  { id: 'analys', area: 'metod', text: 'Resultat och analys.' },
  { id: 'slutsats', area: 'metod', text: 'Slutsatser.' },
  { id: 'felkallor', area: 'metod', text: 'Felkällor.' },
  { id: 'kallkritik', area: 'metod', text: 'Källkritik.' },
  { id: 'pastaenden', area: 'metod', text: 'Vetenskapliga och icke-vetenskapliga påståenden.' },
]

export const CURRICULUM_BY_ID = new Map(CURRICULUM.map((c) => [c.id, c]))
