/* ─────────────── Innehållsschema för Naturly ───────────────
 * All kursdata följer dessa typer. Lektioner skrivs i src/content/modules/*
 * med hjälpfunktionerna i ./builders.ts.
 */

export type Difficulty = 1 | 2 | 3

export type AtomPart = 'proton' | 'neutron' | 'electron' | 'nucleus' | 'shell'

export type DiagramId =
  | 'animal-cell'
  | 'plant-cell'
  | 'neuron'
  | 'synapse'
  | 'dna'
  | 'brain'
  | 'nervous-system'
  | 'glands'
  | 'limbs'
  | 'ph-scale'
  | 'particles'

export type SimulationId =
  | 'electron-transfer'
  | 'ph'
  | 'osmosis'
  | 'nerve-signal'
  | 'blood-sugar'
  | 'immune'
  | 'natural-selection'
  | 'carbon-cycle'
  | 'variables'
  | 'half-life'

export type Tone = 'lavender' | 'pink' | 'blue' | 'cream' | 'green'

export type VisualSpec =
  | { kind: 'atom'; protons: number; neutrons: number; electrons: number; highlight?: AtomPart; caption?: string }
  | { kind: 'nucleus'; protons: number; neutrons: number; caption?: string }
  | { kind: 'electron-transfer'; metal: number; nonmetal: number; caption?: string }
  | { kind: 'covalent'; molecule: MoleculeId; caption?: string }
  | { kind: 'periodic'; highlight?: number[]; groups?: number[]; periods?: number[]; caption?: string }
  | { kind: 'flow'; layout: 'cycle' | 'line'; nodes: FlowNode[]; caption?: string }
  | { kind: 'compare'; columns: Array<{ title: string; points: string[]; tone?: Tone }>; caption?: string }
  | { kind: 'chart'; chart: 'bar' | 'line'; data: Array<Record<string, string | number>>; x: string; series: Array<{ key: string; label: string }>; yLabel?: string; caption?: string }
  | { kind: 'diagram'; id: DiagramId; caption?: string }
  | { kind: 'sim'; id: SimulationId; caption?: string }

export type MoleculeId = 'H2' | 'O2' | 'N2' | 'Cl2' | 'H2O' | 'CO2' | 'CH4' | 'NH3' | 'HCl'

export interface FlowNode {
  label: string
  detail: string
  icon?: string
}

/* ─────────────── Frågor ─────────────── */

export interface QuestionBase {
  id: string
  prompt: string
  explanation: string
  concepts: string[]
  difficulty: Difficulty
  hint?: string
  context?: string
  table?: { headers: string[]; rows: Array<Array<string | number>> }
  visual?: VisualSpec
}

export interface MCQuestion extends QuestionBase {
  type: 'mcq'
  options: string[]
  correct: number
  /** Förklaring av varför ett visst felaktigt alternativ är fel. */
  wrong?: Partial<Record<number, string>>
}
export interface TrueFalseQuestion extends QuestionBase {
  type: 'tf'
  correct: boolean
}
export interface FillQuestion extends QuestionBase {
  type: 'fill'
  /** Godkända svar (jämförs utan hänsyn till versaler, mellanslag och upphöjda tecken). */
  accept: string[]
  numeric?: boolean
}
export interface MatchQuestion extends QuestionBase {
  type: 'match'
  pairs: Array<[string, string]>
}
export interface OrderQuestion extends QuestionBase {
  type: 'order'
  /** I rätt ordning. Blandas i gränssnittet. */
  items: string[]
}
export interface ExplainQuestion extends QuestionBase {
  type: 'explain'
  reference: string
  /** Grupper av synonymer. Ett bra svar nämner minst `minKeywords` av grupperna. */
  keywords: string[][]
  minKeywords?: number
}
export interface AtomQuestion extends QuestionBase {
  type: 'atom'
  target: { protons: number; neutrons?: number; electrons?: number }
}
export interface ElementQuestion extends QuestionBase {
  type: 'element'
  answer: number
}
export interface HotspotQuestion extends QuestionBase {
  type: 'hotspot'
  visual: VisualSpec
  answer: string
}

export type Question =
  | MCQuestion
  | TrueFalseQuestion
  | FillQuestion
  | MatchQuestion
  | OrderQuestion
  | ExplainQuestion
  | AtomQuestion
  | ElementQuestion
  | HotspotQuestion

export type QuestionType = Question['type']

/* ─────────────── Lektioner och moduler ─────────────── */

export type CurriculumArea = 'natur' | 'kropp' | 'omvarld' | 'metod'

/** Lärobokens delar (de stora ämnena), t.ex. Kemi eller Biologi. */
export type BookPart = 'kemi' | 'hallbarhet' | 'cell' | 'kropp' | 'evolution' | 'samhalle' | 'metod'

export interface Flashcard {
  id: string
  front: string
  back: string
}

export interface Misconception {
  /** Det många tror. */
  myth: string
  /** Hur det egentligen är – och varför. */
  truth: string
}

export interface Lesson {
  kind: 'lesson'
  id: string
  moduleId: string
  title: string
  /** Avsnitt inom kapitlet, t.ex. "Atomens delar". Lektioner med samma avsnitt ska ligga i följd. */
  section?: string
  minutes: number
  /* ── Lärobokssidan: en patient lärare som förklarar EN sak ── */
  /** 1. Vad är det? Förklaras från noll – inga oförklarade ord. */
  what: string[]
  /** 2. Varför finns det / varför händer det? */
  why: string[]
  /** 3. Hur fungerar det? */
  how: string[]
  /** 4. Var möter vi det – i vardagen, kroppen, naturen, samhället. */
  where: string[]
  /** Vanliga missförstånd. */
  misconceptions: Misconception[]
  /** Steg 1 – ett enkelt lärandemål. */
  goal: string
  objectives: string[]
  prerequisites: string[]
  /** Centralt innehåll (true) eller stödkunskap (false). */
  core: boolean
  curriculum: string[]
  /** Steg 2 – förklaring från noll, 2–4 korta meningar. */
  simple: string[]
  /** Fördjupning för den som vill veta mer. */
  detailed: string[]
  /** Steg 3 – interaktiv bild. */
  visual: VisualSpec
  visualPrompt?: string
  /** Steg 4 – vardagsexempel och var liknelsen slutar stämma. */
  analogy: { text: string; limits: string }
  /** Andra förklaringsvinklar för knappen "Förklara igen". */
  alternatives: string[]
  caveats: string[]
  /** Steg 5 och 6. */
  check: Question
  followUp: Question
  /** Steg 7. */
  apply: Question
  practice: Question[]
  /** Steg 8. */
  summary: string[]
  flashcards: Flashcard[]
  related: string[]
}

export interface TestLesson {
  kind: 'test'
  id: string
  moduleId: string
  title: string
  minutes: number
  goal: string
  description: string
  questions: Question[]
  core: boolean
  curriculum: string[]
  prerequisites: string[]
}

export type AnyLesson = Lesson | TestLesson

export interface Module {
  id: string
  number: number
  title: string
  subtitle: string
  description: string
  icon: string
  tone: Tone
  part: BookPart
  areas: CurriculumArea[]
  status: 'complete' | 'in-progress'
  lessons: AnyLesson[]
}
