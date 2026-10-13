import { ELEMENT_BY_SYMBOL, ELEMENT_BY_Z, type ElementData } from '@/data/elements'

/* ───────────────────────── Grundläggande räkning ───────────────────────── */

/** Masstal = antal protoner + antal neutroner. */
export function massNumber(protons: number, neutrons: number): number {
  return protons + neutrons
}

/** Nettoladdning = protoner − elektroner. */
export function netCharge(protons: number, electrons: number): number {
  return protons - electrons
}

/** Antal neutroner i en isotop = masstal − atomnummer. */
export function neutronCount(massNumberA: number, atomicNumber: number): number {
  return massNumberA - atomicNumber
}

/** Antal elektroner i en jon med en viss laddning. */
export function electronsInIon(atomicNumber: number, charge: number): number {
  return atomicNumber - charge
}

export function getElement(z: number): ElementData | undefined {
  return ELEMENT_BY_Z.get(z)
}

export function elementBySymbol(symbol: string): ElementData | undefined {
  return ELEMENT_BY_SYMBOL.get(symbol.trim().toLowerCase())
}

/* ───────────────────────── Notation ───────────────────────── */

const SUP: Record<string, string> = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '+': '⁺', '-': '⁻',
}
const SUB: Record<string, string> = {
  '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
}

export const toSuperscript = (s: string | number) => String(s).split('').map((c) => SUP[c] ?? c).join('')
export const toSubscript = (s: string | number) => String(s).split('').map((c) => SUB[c] ?? c).join('')

/** "2+" / "−" / "3−" — laddning skriven som i kemin (siffran före tecknet, 1 skrivs inte ut). */
export function chargeLabel(charge: number): string {
  if (charge === 0) return ''
  const sign = charge > 0 ? '+' : '−'
  const size = Math.abs(charge)
  return `${size === 1 ? '' : size}${sign}`
}

/** Laddning med upphöjda tecken, t.ex. "²⁺". */
export function chargeSuperscript(charge: number): string {
  if (charge === 0) return ''
  const size = Math.abs(charge)
  return `${size === 1 ? '' : toSuperscript(size)}${charge > 0 ? '⁺' : '⁻'}`
}

/** Jonbeteckning, t.ex. ionNotation('Be', 2) → "Be²⁺". */
export function ionNotation(symbol: string, charge: number): string {
  return `${symbol}${chargeSuperscript(charge)}`
}

/** Isotopbeteckning med upphöjt masstal, t.ex. "⁹Be". */
export function isotopeNotation(symbol: string, massNumberA: number): string {
  return `${toSuperscript(massNumberA)}${symbol}`
}

/** Fullständig beteckning i KaTeX med masstal uppe och atomnummer nere: ^{9}_{4}\mathrm{Be}^{2+} */
export function nuclideTex(symbol: string, massNumberA: number, atomicNumber: number, charge = 0): string {
  const c = charge === 0 ? '' : `^{${chargeLabel(charge).replace('−', '-')}}`
  return `{}^{${massNumberA}}_{${atomicNumber}}\\mathrm{${symbol}}${c}`
}

/** Läser t.ex. "9Be", "Be-9", "beryllium-9", "⁹Be". */
export function parseIsotope(input: string): { z: number; massNumber: number } | null {
  const normalized = input
    .trim()
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, (c) => String('⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c)))
    .replace(/\s+/g, '')
  let m = normalized.match(/^(\d+)([A-Za-z]{1,2})$/)
  if (m) {
    const el = elementBySymbol(m[2])
    return el ? { z: el.z, massNumber: Number(m[1]) } : null
  }
  m = normalized.match(/^([A-Za-zÅÄÖåäö]+)-?(\d+)$/)
  if (m) {
    const el = elementBySymbol(m[1]) ?? [...ELEMENT_BY_Z.values()].find((e) => e.name.toLowerCase() === m![1].toLowerCase())
    return el ? { z: el.z, massNumber: Number(m[2]) } : null
  }
  return null
}

/* ───────────────────────── Elektronkonfiguration ───────────────────────── */

export interface Orbital {
  n: number
  l: 0 | 1 | 2 | 3
  count: number
}

const L_LETTER = ['s', 'p', 'd', 'f'] as const
const CAPACITY = [2, 6, 10, 14]

/** Uppfyllnadsordning enligt Madelungs regel (n + l, sedan n). */
export const FILL_ORDER: Array<{ n: number; l: 0 | 1 | 2 | 3 }> = (() => {
  const list: Array<{ n: number; l: 0 | 1 | 2 | 3 }> = []
  for (let n = 1; n <= 7; n++) for (let l = 0; l <= Math.min(3, n - 1); l++) list.push({ n, l: l as 0 | 1 | 2 | 3 })
  return list.sort((a, b) => a.n + a.l - (b.n + b.l) || a.n - b.n)
})()

const NOBLE_GASES = [2, 10, 18, 36, 54, 86, 118]

/**
 * Kända undantag från Madelungs regel i grundtillståndet (neutrala atomer).
 * Anges relativt närmast föregående ädelgas.
 */
const EXCEPTIONS: Record<number, string> = {
  24: '3d5 4s1',
  29: '3d10 4s1',
  41: '4d4 5s1',
  42: '4d5 5s1',
  44: '4d7 5s1',
  45: '4d8 5s1',
  46: '4d10',
  47: '4d10 5s1',
  57: '5d1 6s2',
  58: '4f1 5d1 6s2',
  64: '4f7 5d1 6s2',
  78: '4f14 5d9 6s1',
  79: '4f14 5d10 6s1',
  89: '6d1 7s2',
  90: '6d2 7s2',
  91: '5f2 6d1 7s2',
  92: '5f3 6d1 7s2',
  93: '5f4 6d1 7s2',
  96: '5f7 6d1 7s2',
  103: '5f14 7s2 7p1',
}

function fillByMadelung(electrons: number): Orbital[] {
  const result: Orbital[] = []
  let left = electrons
  for (const { n, l } of FILL_ORDER) {
    if (left <= 0) break
    const count = Math.min(left, CAPACITY[l])
    result.push({ n, l, count })
    left -= count
  }
  return result
}

function sortOrbitals(orbitals: Orbital[]): Orbital[] {
  return [...orbitals].sort((a, b) => a.n + a.l - (b.n + b.l) || a.n - b.n)
}

/** Elektronkonfiguration för en neutral atom (inklusive kända undantag). */
export function neutralConfiguration(z: number): Orbital[] {
  if (z <= 0) return []
  const exception = EXCEPTIONS[z]
  if (!exception) return fillByMadelung(z)
  const core = [...NOBLE_GASES].reverse().find((g) => g < z) ?? 0
  const orbitals = fillByMadelung(core)
  for (const part of exception.split(' ')) {
    const m = part.match(/^(\d)([spdf])(\d+)$/)!
    orbitals.push({ n: Number(m[1]), l: L_LETTER.indexOf(m[2] as never) as 0 | 1 | 2 | 3, count: Number(m[3]) })
  }
  return sortOrbitals(orbitals)
}

/**
 * Konfiguration för en atom eller jon med `electrons` elektroner och `z` protoner.
 * Positiva joner tappar först elektroner från det yttersta skalet (högst n),
 * negativa joner fyller på enligt uppfyllnadsordningen.
 */
export function configuration(z: number, electrons: number = z): Orbital[] {
  if (electrons <= 0) return []
  if (z <= 0) return fillByMadelung(electrons)
  const orbitals = neutralConfiguration(z).map((o) => ({ ...o }))
  let diff = electrons - z
  while (diff < 0) {
    // ta bort från högsta n, och inom samma n från högsta l
    const target = orbitals
      .filter((o) => o.count > 0)
      .sort((a, b) => b.n - a.n || b.l - a.l)[0]
    if (!target) break
    target.count--
    diff++
  }
  while (diff > 0) {
    const slot = FILL_ORDER.find(({ n, l }) => {
      const o = orbitals.find((x) => x.n === n && x.l === l)
      return !o || o.count < CAPACITY[l]
    })
    if (!slot) break
    const existing = orbitals.find((x) => x.n === slot.n && x.l === slot.l)
    if (existing) existing.count++
    else orbitals.push({ ...slot, count: 1 })
    diff--
  }
  return sortOrbitals(orbitals.filter((o) => o.count > 0))
}

export function orbitalLabel(o: Orbital): string {
  return `${o.n}${L_LETTER[o.l]}${toSuperscript(o.count)}`
}

/** Full konfiguration, t.ex. "1s² 2s² 2p⁶ 3s¹". */
export function configurationString(z: number, electrons: number = z): string {
  return configuration(z, electrons).map(orbitalLabel).join(' ')
}

/** Kortform med ädelgaskärna, t.ex. "[Ne] 3s¹". */
export function shortConfigurationString(z: number, electrons: number = z): string {
  const full = configuration(z, electrons)
  const core = [...NOBLE_GASES].reverse().find((g) => g < electrons)
  if (!core) return full.map(orbitalLabel).join(' ')
  const coreOrbitals = fillByMadelung(core)
  const isCore = (o: Orbital) => coreOrbitals.some((c) => c.n === o.n && c.l === o.l && c.count === o.count)
  // Kärnan måste finnas helt i konfigurationen för att kortformen ska vara korrekt
  const coreComplete = coreOrbitals.every((c) => full.some((o) => o.n === c.n && o.l === c.l && o.count === c.count))
  if (!coreComplete) return full.map(orbitalLabel).join(' ')
  const symbol = ELEMENT_BY_Z.get(core)?.symbol ?? ''
  const rest = full.filter((o) => !isCore(o))
  return [`[${symbol}]`, ...rest.map(orbitalLabel)].join(' ')
}

/** Antal elektroner per skal (K, L, M, N …), t.ex. natrium → [2, 8, 1]. */
export function shellDistribution(z: number, electrons: number = z): number[] {
  const orbitals = configuration(z, electrons)
  if (orbitals.length === 0) return []
  const maxN = Math.max(...orbitals.map((o) => o.n))
  const shells = Array.from({ length: maxN }, () => 0)
  for (const o of orbitals) shells[o.n - 1] += o.count
  return shells
}

export const SHELL_NAMES = ['K', 'L', 'M', 'N', 'O', 'P', 'Q']

/* ───────────────────────── Periodiska systemet ───────────────────────── */

const PERIOD_STARTS = [1, 3, 11, 19, 37, 55, 87]

export function periodOf(z: number): number {
  let period = 1
  PERIOD_STARTS.forEach((start, i) => {
    if (z >= start) period = i + 1
  })
  return period
}

/** Grupp 1–18, eller null för lantanider och aktinider (f-blocket). */
export function groupOf(z: number): number | null {
  if (z === 1) return 1
  if (z === 2) return 18
  const period = periodOf(z)
  const idx = z - PERIOD_STARTS[period - 1] + 1
  if (period <= 3) return idx <= 2 ? idx : idx + 10
  if (period <= 5) return idx
  if (idx <= 2) return idx
  if (idx <= 17) return null
  return idx - 14
}

/** Placering i rutnätet för ritning. Rad 9–10 är lantanider och aktinider. */
export function gridPosition(z: number): { row: number; col: number } {
  if (z >= 57 && z <= 71) return { row: 9, col: z - 57 + 3 }
  if (z >= 89 && z <= 103) return { row: 10, col: z - 89 + 3 }
  return { row: periodOf(z), col: groupOf(z)! }
}

export function isMainGroup(z: number): boolean {
  const g = groupOf(z)
  return g !== null && (g <= 2 || g >= 13)
}

/**
 * Valenselektroner för huvudgruppsämnen (= elektroner i yttersta skalet).
 * För övergångsmetaller och f-blocket är begreppet mer komplicerat → null.
 */
export function valenceElectrons(z: number): number | null {
  if (!isMainGroup(z)) return null
  const shells = shellDistribution(z)
  return shells[shells.length - 1]
}

/** Den jonladdning som huvudgruppsämnen typiskt får för att nå ädelgasstruktur. */
export function typicalIonCharge(z: number): number | null {
  const g = groupOf(z)
  if (g === null || !isMainGroup(z) || z === 1) return z === 1 ? 1 : null
  if (g === 1) return 1
  if (g === 2) return 2
  if (g === 13) return 3
  if (g === 15) return -3
  if (g === 16) return -2
  if (g === 17) return -1
  return null // grupp 14 och 18 bildar normalt inte enkla joner
}

/** True om elektronerna har samma uppställning som en ädelgas (ädelgasstruktur). */
export function hasNobleGasConfiguration(z: number, electrons: number = z): boolean {
  if (!NOBLE_GASES.includes(electrons)) return false
  const a = configuration(z, electrons)
  const b = neutralConfiguration(electrons)
  return a.length === b.length && a.every((o, i) => o.n === b[i].n && o.l === b[i].l && o.count === b[i].count)
}

/* ───────────────────────── Atomsimulatorn ───────────────────────── */

export type ParticleKind = 'tom' | 'neutral atom' | 'positiv jon' | 'negativ jon' | 'bara elektroner'

export interface AtomDescription {
  protons: number
  neutrons: number
  electrons: number
  element: ElementData | undefined
  massNumber: number
  charge: number
  kind: ParticleKind
  knownIsotope: boolean
  isotopeLabel: string
  notation: string
  tex: string
  shells: number[]
  configuration: string
  nobleGas: boolean
}

export function describeAtom(protons: number, neutrons: number, electrons: number): AtomDescription {
  const element = getElement(protons)
  const A = massNumber(protons, neutrons)
  const charge = netCharge(protons, electrons)
  const kind: ParticleKind =
    protons === 0 ? (electrons > 0 ? 'bara elektroner' : 'tom') : charge === 0 ? 'neutral atom' : charge > 0 ? 'positiv jon' : 'negativ jon'
  const knownIsotope = !!element?.isotopes.some((i) => i.massNumber === A)
  const symbol = element?.symbol ?? '?'
  return {
    protons,
    neutrons,
    electrons,
    element,
    massNumber: A,
    charge,
    kind,
    knownIsotope,
    isotopeLabel: element ? `${element.name.toLowerCase()}-${A}` : '',
    notation: element ? `${isotopeNotation(symbol, A)}${chargeSuperscript(charge)}` : '',
    tex: element ? nuclideTex(symbol, A, protons, charge) : '',
    shells: element ? shellDistribution(protons, electrons) : [],
    configuration: element && electrons > 0 ? configurationString(protons, electrons) : '',
    nobleGas: !!element && electrons > 0 && hasNobleGasConfiguration(protons, electrons),
  }
}

/** Förklarar på enkel svenska vad som hände när en partikel lades till eller togs bort. */
export function explainChange(prev: AtomDescription, next: AtomDescription): string {
  if (next.protons !== prev.protons) {
    if (!next.element) return 'Nu finns inga protoner kvar. Utan protoner finns ingen atomkärna som bestämmer något grundämne.'
    const from = prev.element ? `${prev.element.name.toLowerCase()} (${prev.protons} protoner)` : 'ingenting'
    return `Antalet protoner ändrades från ${prev.protons} till ${next.protons}. Protonerna bestämmer vilket grundämne det är – därför är det inte längre ${from} utan ${next.element.name.toLowerCase()}, atomnummer ${next.protons}. Laddningen ändras också, eftersom protoner är positiva.`
  }
  if (next.neutrons !== prev.neutrons && next.element) {
    const base = `Neutroner har ingen laddning. De ändrar bara massan. Grundämnet är fortfarande ${next.element.name.toLowerCase()}, men masstalet blev ${next.massNumber}. Det är en annan isotop: ${next.isotopeLabel}.`
    return next.knownIsotope
      ? base
      : `${base} Den här isotopen finns inte i naturen – kärnan skulle vara mycket instabil eller inte kunna bildas alls.`
  }
  if (next.electrons !== prev.electrons && next.element) {
    const added = next.electrons > prev.electrons
    const verb = added ? 'lade till' : 'tog bort'
    const state =
      next.charge === 0
        ? `Nu är antalet elektroner lika med antalet protoner, så atomen är neutral.`
        : next.charge > 0
          ? `Nu finns det fler protoner (+) än elektroner (−), så partikeln är en positiv jon: ${ionNotation(next.element.symbol, next.charge)}.`
          : `Nu finns det fler elektroner (−) än protoner (+), så partikeln är en negativ jon: ${ionNotation(next.element.symbol, next.charge)}.`
    return `Du ${verb} en elektron. Elektroner är negativa, så laddningen ändras men grundämnet är detsamma. ${state}`
  }
  return ''
}

/* ───────────────────────── Hjälptexter ───────────────────────── */

export const CATEGORY_INFO: Record<string, { short: string; color: string }> = {
  alkalimetall: { short: 'Grupp 1: mjuka, mycket reaktiva metaller som bildar +1-joner.', color: 'cat-alkali' },
  'alkalisk jordartsmetall': { short: 'Grupp 2: reaktiva metaller som bildar +2-joner.', color: 'cat-alkaline' },
  övergångsmetall: { short: 'Grupp 3–12: de flesta bruksmetaller, som järn och koppar.', color: 'cat-transition' },
  'övrig metall': { short: 'Metaller till höger om övergångsmetallerna, t.ex. aluminium och bly.', color: 'cat-post' },
  halvmetall: { short: 'Har egenskaper mittemellan metaller och ickemetaller.', color: 'cat-metalloid' },
  ickemetall: { short: 'Leder oftast inte el. Bildar ofta molekyler eller negativa joner.', color: 'cat-nonmetal' },
  halogen: { short: 'Grupp 17: mycket reaktiva, bildar ofta −1-joner.', color: 'cat-halogen' },
  ädelgas: { short: 'Grupp 18: har fullt yttersta skal och reagerar nästan aldrig.', color: 'cat-noble' },
  lantanid: { short: 'Sällsynta jordartsmetaller (f-blocket), ofta i magneter och elektronik.', color: 'cat-lanthanide' },
  aktinid: { short: 'Tunga, radioaktiva metaller (f-blocket), t.ex. uran.', color: 'cat-actinide' },
  'okända egenskaper': { short: 'Supertunga konstgjorda ämnen. Bara några få atomer har tillverkats.', color: 'cat-unknown' },
}

/** Nybörjarförklaring av ett grundämne, byggd av riktiga data. */
export function beginnerExplanation(el: ElementData): string[] {
  const shells = shellDistribution(el.z)
  const lines = [
    `${el.name} har atomnummer ${el.z}. Det betyder att varje ${el.name.toLowerCase()}atom har exakt ${el.z} ${el.z === 1 ? 'proton' : 'protoner'} i kärnan. Har den ett annat antal protoner är det inte ${el.name.toLowerCase()} längre.`,
    `En neutral ${el.name.toLowerCase()}atom har också ${el.z} ${el.z === 1 ? 'elektron' : 'elektroner'}, eftersom plus och minus då tar ut varandra.`,
  ]
  if (el.z <= 36) {
    lines.push(`I skalmodellen ligger elektronerna så här: ${shells.join(', ')} (inifrån och ut).`)
  }
  const main = el.isotopes[0]
  if (main) {
    lines.push(
      `Antalet neutroner kan variera. Den vanligaste isotopen är ${el.name.toLowerCase()}-${main.massNumber}, som har ${main.massNumber} − ${el.z} = ${main.massNumber - el.z} neutroner.`,
    )
  }
  const v = valenceElectrons(el.z)
  const ion = typicalIonCharge(el.z)
  if (v !== null && el.category !== 'ädelgas' && ion !== null) {
    lines.push(
      `Den har ${v} ${v === 1 ? 'valenselektron' : 'valenselektroner'} och bildar ofta jonen ${ionNotation(el.symbol, ion)}, eftersom den då får samma elektronuppställning som en ädelgas.`,
    )
  } else if (el.category === 'ädelgas') {
    lines.push('Det yttersta skalet är fullt, och därför reagerar ädelgaser nästan aldrig.')
  }
  lines.push(el.description)
  return lines
}
