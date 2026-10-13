import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Info, RotateCcw, Sparkles, Target } from 'lucide-react'
import { describeAtom, explainChange, ionNotation, SHELL_NAMES, type AtomDescription } from '@/lib/chemistry'
import { AtomDiagram } from '@/components/visuals/AtomDiagram'
import { ParticleCounter } from '@/components/ParticleControls'
import { Tex } from '@/components/RichText'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useProgress } from '@/store/progress'
import { useTutor } from '@/store/tutor'
import { useLearningContext } from '@/store/context'
import { cn } from '@/lib/utils'

interface Challenge {
  id: string
  title: string
  concept: string
  hint: string
  check: (d: AtomDescription, prev: AtomDescription | null, start: AtomDescription) => boolean
  success: (d: AtomDescription) => string
}

export const CHALLENGES: Challenge[] = [
  {
    id: 'neutral-o',
    title: 'Bygg en neutral syreatom.',
    concept: 'm1-l08',
    hint: 'Syre har atomnummer 8. Hur många protoner och elektroner behövs för att laddningen ska bli 0? Den vanligaste isotopen har 8 neutroner.',
    check: (d) => d.protons === 8 && d.electrons === 8 && d.knownIsotope,
    success: (d) => `Snyggt! 8 protoner gör det till syre, och 8 elektroner tar ut laddningen. Det här är ${d.isotopeLabel}.`,
  },
  {
    id: 'be9',
    title: 'Bygg isotopen beryllium-9.',
    concept: 'm1-l10',
    hint: 'Beryllium har 4 protoner. Masstalet 9 = protoner + neutroner. Glöm inte elektronerna för en neutral atom!',
    check: (d) => d.protons === 4 && d.neutrons === 5 && d.electrons === 4,
    success: () => '4 protoner + 5 neutroner = masstal 9. Med 4 elektroner är atomen neutral: ⁹Be.',
  },
  {
    id: 'positive',
    title: 'Gör en positiv jon.',
    concept: 'm1-l18',
    hint: 'En positiv jon har fler protoner än elektroner. Börja med en neutral atom och ta bort en elektron.',
    check: (d) => d.protons > 0 && d.charge > 0 && d.electrons > 0,
    success: (d) => `Det här är ${ionNotation(d.element!.symbol, d.charge)}: ${d.protons} protoner men bara ${d.electrons} elektroner, alltså laddningen +${d.charge}.`,
  },
  {
    id: 'negative',
    title: 'Gör en negativ jon.',
    concept: 'm1-l19',
    hint: 'En negativ jon har fler elektroner än protoner. Prova med klor (17 protoner) och lägg till en elektron.',
    check: (d) => d.protons > 0 && d.charge < 0,
    success: (d) => `Det här är ${ionNotation(d.element!.symbol, d.charge)}: fler elektroner (${d.electrons}) än protoner (${d.protons}).`,
  },
  {
    id: 'add-proton',
    title: 'Vad händer om du lägger till en proton?',
    concept: 'm1-l04',
    hint: 'Bygg först valfri atom. Tryck sedan på + vid protoner och titta på namnet.',
    check: (d, prev) => !!prev && prev.protons > 0 && d.protons === prev.protons + 1,
    success: (d) => `Atomen blev ett nytt grundämne: ${d.element?.name.toLowerCase()}! Antalet protoner bestämmer grundämnet. Laddningen ökade också med +1.`,
  },
  {
    id: 'c14',
    title: 'Bygg kol-14 (neutral).',
    concept: 'm1-l11',
    hint: 'Kol har 6 protoner. 14 − 6 = ? neutroner.',
    check: (d) => d.protons === 6 && d.neutrons === 8 && d.electrons === 6,
    success: () => 'Kol-14 har 8 neutroner. Det är en radioaktiv isotop som används för åldersbestämning.',
  },
  {
    id: 'na-plus',
    title: 'Bygg natriumjonen Na⁺ (natrium-23).',
    concept: 'm1-l18',
    hint: 'Natrium har 11 protoner och natrium-23 har 12 neutroner. En plusladdning betyder en elektron för lite.',
    check: (d) => d.protons === 11 && d.neutrons === 12 && d.electrons === 10,
    success: () => 'Na⁺ har 10 elektroner, fördelade 2, 8 – samma som neon. Det är ädelgasstruktur.',
  },
  {
    id: 's2',
    title: 'Bygg sulfidjonen S²⁻ (svavel-32).',
    concept: 'm1-l19',
    hint: 'Svavel har 16 protoner och 6 valenselektroner. Den tar upp 2 elektroner.',
    check: (d) => d.protons === 16 && d.neutrons === 16 && d.electrons === 18,
    success: () => '16 protoner och 18 elektroner ger −2. Elektronerna fördelas 2, 8, 8 – samma som argon.',
  },
  {
    id: 'noble-ion',
    title: 'Bygg en jon med ädelgasstruktur (inte en ädelgas).',
    concept: 'm1-l15',
    hint: 'Prova Mg²⁺, Cl⁻ eller O²⁻. Titta på raden "Ädelgasstruktur".',
    check: (d) => d.nobleGas && d.charge !== 0 && d.element?.category !== 'ädelgas',
    success: (d) => `${ionNotation(d.element!.symbol, d.charge)} har samma elektronuppställning som en ädelgas (${d.shells.join(', ')}).`,
  },
  {
    id: 'three-valence',
    title: 'Bygg en neutral atom med 3 valenselektroner.',
    concept: 'm1-l14',
    hint: 'Titta i grupp 13 i periodiska systemet. Bor och aluminium finns där.',
    check: (d) => d.charge === 0 && d.protons > 0 && d.protons <= 20 && d.shells.at(-1) === 3,
    success: (d) => `${d.element?.name} har ${d.shells.join(', ')} – tre elektroner i yttersta skalet.`,
  },
]

const PRESETS: Array<[string, number, number]> = [
  ['Väte', 1, 0],
  ['Helium', 2, 2],
  ['Litium', 3, 4],
  ['Kol', 6, 6],
  ['Kväve', 7, 7],
  ['Syre', 8, 8],
  ['Neon', 10, 10],
  ['Natrium', 11, 12],
  ['Magnesium', 12, 12],
  ['Klor', 17, 18],
  ['Kalcium', 20, 20],
]

export default function AtomBuilderPage() {
  const [p, setP] = useState(4)
  const [n, setN] = useState(5)
  const [e, setE] = useState(4)
  const [why, setWhy] = useState<string>('Det här är beryllium-9. Prova att lägga till och ta bort partiklar – här förklaras varför saker ändras.')
  const [challengeId, setChallengeId] = useState<string | null>(null)
  const [solved, setSolved] = useState<string[]>([])
  const [showHint, setShowHint] = useState(false)
  const prevRef = useRef<AtomDescription | null>(null)
  const startRef = useRef<AtomDescription>(describeAtom(4, 5, 4))
  const { recordAnswer, markLabDone } = useProgress()
  const ask = useTutor((s) => s.ask)
  const setCtx = useLearningContext((s) => s.set)
  const d = useMemo(() => describeAtom(p, n, e), [p, n, e])
  const challenge = CHALLENGES.find((c) => c.id === challengeId) ?? null

  useEffect(() => {
    setCtx({ page: 'Atombyggaren', currentQuestion: challenge?.title })
  }, [challenge, setCtx])

  const change = (np: number, nn: number, ne: number) => {
    const before = describeAtom(p, n, e)
    const after = describeAtom(np, nn, ne)
    prevRef.current = before
    setP(np)
    setN(nn)
    setE(ne)
    const text = explainChange(before, after)
    if (text) setWhy(text)
    if (challenge && !solved.includes(challenge.id) && challenge.check(after, before, startRef.current)) {
      setSolved((s) => [...s, challenge.id])
      setWhy(`🎉 ${challenge.success(after)}`)
      recordAnswer({ questionId: `atom-${challenge.id}`, concepts: [challenge.concept], correct: true, difficulty: 2, source: 'lab' })
      markLabDone('atom-builder')
    }
  }

  const startChallenge = (c: Challenge) => {
    setChallengeId(c.id)
    setShowHint(false)
    startRef.current = describeAtom(p, n, e)
    setWhy(`Utmaning: ${c.title}`)
  }

  const kindTone = d.kind === 'neutral atom' ? 'green' : d.kind === 'positiv jon' ? 'pink' : d.kind === 'negativ jon' ? 'blue' : 'gray'

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-5">
      <header>
        <h1 className="text-3xl font-semibold">Atombyggaren</h1>
        <p className="mt-1 max-w-2xl text-muted">Bygg din egen atom eller jon. Allt uppdateras direkt – och du får veta varför.</p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[300px_1fr_340px]">
        {/* Kontroller */}
        <Card className="flex flex-col gap-3 p-4">
          <h2 className="font-semibold">Partiklar</h2>
          <ParticleCounter label="Protoner" value={p} onChange={(v) => change(v, n, e)} max={36} color="var(--proton)" />
          <ParticleCounter label="Neutroner" value={n} onChange={(v) => change(p, v, e)} max={50} color="var(--neutron)" />
          <ParticleCounter label="Elektroner" value={e} onChange={(v) => change(p, n, v)} max={40} color="var(--electron)" />
          <div className="flex flex-wrap gap-1.5 pt-1">
            <Button size="sm" variant="ghost" onClick={() => change(0, 0, 0)}>
              <RotateCcw /> Töm
            </Button>
            <Button size="sm" variant="ghost" onClick={() => d.element && change(p, n, p)} disabled={!d.element || d.charge === 0}>
              Gör neutral
            </Button>
          </div>
          <h3 className="mt-2 text-sm font-semibold">Snabbval (neutrala atomer)</h3>
          <div className="flex flex-wrap gap-1.5">
            {PRESETS.map(([name, z, neutrons]) => (
              <button key={name} type="button" onClick={() => change(z, neutrons, z)} className="rounded-full border border-border px-2.5 py-1 text-xs hover:bg-surface-2">
                {name}
              </button>
            ))}
          </div>
        </Card>

        {/* Atomen */}
        <Card className="flex flex-col items-center gap-3 p-4">
          <AtomDiagram protons={p} neutrons={n} electrons={e} size={340} />
          <div className="w-full rounded-2xl bg-primary-soft/60 p-4 text-sm" aria-live="polite">
            <div className="mb-1 flex items-center gap-1.5 font-semibold text-primary">
              <Info className="size-4" /> Varför?
            </div>
            <AnimatePresence mode="wait">
              <motion.p key={why} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {why}
              </motion.p>
            </AnimatePresence>
          </div>
        </Card>

        {/* Resultat */}
        <Card className="flex flex-col gap-3 p-4">
          <h2 className="font-semibold">Resultat</h2>
          {d.element ? (
            <>
              <div className="flex items-center gap-3">
                <div className="flex size-16 flex-col items-center justify-center rounded-2xl bg-surface-2">
                  <span className="text-2xl font-semibold leading-none">{d.element.symbol}</span>
                </div>
                <div>
                  <p className="text-xl font-semibold">{d.element.name}</p>
                  <Badge tone={kindTone}>{d.kind}</Badge>
                </div>
              </div>
              <dl className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
                <Fact k="Atomnummer" v={String(d.protons)} note="= antal protoner" />
                <Fact k="Masstal" v={String(d.massNumber)} note={`${d.protons} + ${d.neutrons}`} />
                <Fact k="Nettoladdning" v={d.charge === 0 ? '0' : d.charge > 0 ? `+${d.charge}` : `−${-d.charge}`} note={`${d.protons} − ${d.electrons}`} />
                <Fact k="Jonbeteckning" v={d.charge === 0 ? '– (neutral)' : ionNotation(d.element.symbol, d.charge)} />
              </dl>
              <div className="rounded-2xl bg-surface-2 p-3">
                <p className="text-xs text-muted">Isotopbeteckning</p>
                <p className="text-2xl">
                  <Tex tex={d.tex} />
                </p>
                <p className="text-sm">
                  {d.isotopeLabel} · {d.notation}
                </p>
                <p className={cn('mt-1 text-xs', d.knownIsotope ? 'text-green' : 'text-amber')}>
                  {d.knownIsotope ? '✓ Den här isotopen finns i naturen eller är känd.' : '⚠ Den här isotopen finns inte naturligt – kärnan vore mycket instabil.'}
                </p>
              </div>
              <div className="text-sm">
                <p className="text-xs text-muted">Elektroner per skal</p>
                <p className="font-medium">{d.shells.length ? d.shells.map((c, i) => `${SHELL_NAMES[i]}: ${c}`).join('  ·  ') : 'Inga elektroner'}</p>
                {d.configuration && <p className="mt-1 text-xs text-muted">Konfiguration: {d.configuration}</p>}
                <p className={cn('mt-1 text-xs', d.nobleGas ? 'text-green' : 'text-muted')}>{d.nobleGas ? '✓ Ädelgasstruktur' : 'Ingen ädelgasstruktur'}</p>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted">Lägg till minst en proton för att få ett grundämne. Utan protoner finns ingen atomkärna som bestämmer vad det är.</p>
          )}
          <Button variant="soft" size="sm" onClick={() => ask(`I atombyggaren har jag ${p} protoner, ${n} neutroner och ${e} elektroner. Kan du förklara vad jag har byggt?`)}>
            <Sparkles /> Fråga Naturly om min atom
          </Button>
        </Card>
      </div>

      <Card className="p-5">
        <h2 className="flex items-center gap-2 font-semibold">
          <Target className="size-5 text-primary" /> Utmaningar
        </h2>
        <p className="mb-3 text-sm text-muted">
          {solved.length} av {CHALLENGES.length} klara
        </p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {CHALLENGES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => startChallenge(c)}
              aria-pressed={challengeId === c.id}
              className={cn(
                'flex items-start gap-2 rounded-2xl border p-3 text-left text-sm transition-colors',
                challengeId === c.id ? 'border-primary bg-primary-soft' : 'border-border hover:bg-surface-2',
              )}
            >
              {solved.includes(c.id) ? <Check className="mt-0.5 size-4 shrink-0 text-green" /> : <Target className="mt-0.5 size-4 shrink-0 text-muted" />}
              {c.title}
            </button>
          ))}
        </div>
        {challenge && !solved.includes(challenge.id) && (
          <div className="mt-3">
            {showHint ? (
              <p className="rounded-2xl bg-amber-soft p-3 text-sm">💡 {challenge.hint}</p>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => setShowHint(true)}>
                💡 Visa ledtråd
              </Button>
            )}
          </div>
        )}
      </Card>
      <p className="text-xs text-muted">
        Skalmodellen (Bohrs modell) är en förenklad modell. Riktiga elektroner rör sig inte i cirkelbanor. För övergångsmetaller fylls skalen i en mer komplicerad ordning –
        konfigurationen ovan tar hänsyn till det.
      </p>
    </div>
  )
}

function Fact({ k, v, note }: { k: string; v: string; note?: string }) {
  return (
    <div className="rounded-xl bg-surface-2/70 px-2.5 py-2">
      <dt className="text-xs text-muted">{k}</dt>
      <dd className="text-lg font-semibold leading-tight">{v}</dd>
      {note && <dd className="text-xs text-muted">{note}</dd>}
    </div>
  )
}
