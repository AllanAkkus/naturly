/* Lärobokens innehållsförteckning: delar → kapitel → avsnitt → sidor.
 * Kapitlen som redan är skrivna är moduler i ./modules. Kapitel som inte är skrivna än
 * listas i PLANNED_CHAPTERS så att eleven ser hela kursen och vi ser vad som återstår.
 */
import type { BookPart, Tone } from './types'

export interface BookPartInfo {
  id: BookPart
  title: string
  description: string
  icon: string
  tone: Tone
}

export const BOOK_PARTS: BookPartInfo[] = [
  { id: 'kemi', title: 'Kemi och materia', description: 'Vad allt är gjort av: atomer, grundämnen, bindningar och ämnen omkring oss.', icon: 'Atom', tone: 'lavender' },
  { id: 'hallbarhet', title: 'Kretslopp och hållbar utveckling', description: 'Hur atomer vandrar runt i naturen och hur vi människor påverkar det.', icon: 'Recycle', tone: 'green' },
  { id: 'cell', title: 'Cellen – livets byggsten', description: 'Vad en cell är, vad som finns i den och hur den arbetar.', icon: 'Microscope', tone: 'pink' },
  { id: 'kropp', title: 'Människokroppen och hälsa', description: 'Hur kroppen styrs, skyddar sig och håller sig frisk – och hur vi kan hjälpa den.', icon: 'HeartPulse', tone: 'pink' },
  { id: 'evolution', title: 'Evolution och bioteknik', description: 'Hur arter förändras och uppstår, och hur människan använder levande organismer.', icon: 'Dna', tone: 'blue' },
  { id: 'samhalle', title: 'Naturvetenskap i samhället', description: 'Hur naturvetenskap påverkar oss, historiska händelser och etiska frågor.', icon: 'Globe', tone: 'cream' },
  { id: 'metod', title: 'Naturvetenskapliga arbetsmetoder', description: 'Hur forskare tar reda på saker: frågor, hypoteser, experiment och källkritik.', icon: 'FlaskConical', tone: 'blue' },
]

export const BOOK_PART_BY_ID = new Map(BOOK_PARTS.map((p) => [p.id, p]))

export interface PlannedChapter {
  id: string
  number: number
  part: BookPart
  title: string
  description: string
  /** Sidor som kapitlet kommer att innehålla. */
  topics: string[]
}

/** Kapitel som ännu inte är skrivna. Tas bort härifrån när modulen läggs in i ./index.ts. */
export const PLANNED_CHAPTERS: PlannedChapter[] = [
]
