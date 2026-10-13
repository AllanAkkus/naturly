import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, Shuffle, Trophy } from 'lucide-react'
import { ELEMENTS, type ElementData } from '@/data/elements'
import { CategoryLegend, PeriodicGrid } from '@/components/visuals/PeriodicGrid'
import { ElementInfoCard } from '@/components/visuals/ElementInfoCard'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { makePeriodicQuestion, QUIZ_KIND_CONCEPT, QUIZ_KIND_LABELS, type PeriodicQuizKind, type PeriodicQuizQuestion } from '@/lib/periodicQuiz'
import { useProgress } from '@/store/progress'
import { cn } from '@/lib/utils'

export default function PeriodicTablePage() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const selectedZ = Number(params.get('z')) || null
  const selected = selectedZ ? ELEMENTS[selectedZ - 1] : null

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return undefined
    return ELEMENTS.filter((e) => e.name.toLowerCase().includes(q) || e.symbol.toLowerCase() === q || String(e.z) === q).map((e) => e.z)
  }, [query])

  const open = (el: ElementData | null) => {
    const next = new URLSearchParams(params)
    if (el) next.set('z', String(el.z))
    else next.delete('z')
    setParams(next, { replace: true })
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-5">
      <header>
        <h1 className="text-3xl font-semibold">Periodiska systemet</h1>
        <p className="mt-1 text-muted">Alla 118 grundämnen. Klicka på ett grundämne för att lära dig mer.</p>
      </header>
      <Tabs defaultValue="utforska">
        <TabsList>
          <TabsTrigger value="utforska">Utforska</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
        </TabsList>
        <TabsContent value="utforska" className="flex flex-col gap-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Sök namn, symbol eller nummer…" className="pl-9" aria-label="Sök grundämne" />
          </div>
          {matches && matches.length === 0 && <p className="text-sm text-muted">Inget grundämne matchar "{query}".</p>}
          <Card className="p-3 sm:p-5">
            <PeriodicGrid onSelect={open} selected={selectedZ} highlight={matches} />
          </Card>
          <CategoryLegend />
          <p className="text-xs text-muted">
            Grupperna (1–18) är kolumnerna, perioderna (1–7) är raderna. Lantaniderna och aktiniderna ligger egentligen i period 6 och 7 men ritas under tabellen för att den
            ska få plats.
          </p>
        </TabsContent>
        <TabsContent value="quiz">
          <PeriodicQuiz />
        </TabsContent>
      </Tabs>

      <Dialog open={!!selected} onOpenChange={(o) => !o && open(null)}>
        <DialogContent side="right" className="max-w-xl">
          <DialogTitle className="sr-only">{selected?.name}</DialogTitle>
          {selected && <ElementInfoCard el={selected} />}
          {selected && (
            <div className="mt-5 flex justify-between">
              <Button variant="ghost" size="sm" disabled={selected.z === 1} onClick={() => open(ELEMENTS[selected.z - 2])}>
                ← {selected.z > 1 ? ELEMENTS[selected.z - 2].name : ''}
              </Button>
              <Button variant="ghost" size="sm" disabled={selected.z === 118} onClick={() => open(ELEMENTS[selected.z])}>
                {selected.z < 118 ? ELEMENTS[selected.z].name : ''} →
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function PeriodicQuiz() {
  const [kinds, setKinds] = useState<PeriodicQuizKind[]>(['protons', 'number', 'symbol'])
  const [q, setQ] = useState<PeriodicQuizQuestion | null>(null)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState({ right: 0, total: 0 })
  const record = useProgress((s) => s.recordAnswer)

  const newQuestion = () => {
    const k = kinds[Math.floor(Math.random() * kinds.length)] ?? 'protons'
    setQ(makePeriodicQuestion(k))
    setPicked(null)
  }
  useEffect(() => {
    newQuestion()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kinds.join()])

  const answer = (el: ElementData) => {
    if (!q || picked !== null) return
    setPicked(el.z)
    const correct = el.z === q.answer
    setScore((s) => ({ right: s.right + (correct ? 1 : 0), total: s.total + 1 }))
    record({ questionId: `pt-${q.kind}`, concepts: [QUIZ_KIND_CONCEPT[q.kind]], correct, difficulty: q.kind === 'config' || q.kind === 'isotope' || q.kind === 'ion' ? 2 : 1, source: 'quiz', given: el.symbol })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium">Frågetyper:</span>
        {(Object.keys(QUIZ_KIND_LABELS) as PeriodicQuizKind[]).map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={kinds.includes(k)}
            onClick={() => setKinds((ks) => (ks.includes(k) ? (ks.length > 1 ? ks.filter((x) => x !== k) : ks) : [...ks, k]))}
            className={cn('rounded-full border px-3 py-1 text-xs font-medium', kinds.includes(k) ? 'border-primary bg-primary-soft text-primary' : 'border-border')}
          >
            {QUIZ_KIND_LABELS[k]}
          </button>
        ))}
        <span className="ml-auto inline-flex items-center gap-1 text-sm text-muted">
          <Trophy className="size-4" /> {score.right} / {score.total}
        </span>
      </div>
      {q && (
        <Card className="p-4 sm:p-5">
          <p className="mb-1 text-xs text-muted">{QUIZ_KIND_LABELS[q.kind]}</p>
          <p className="mb-4 text-lg font-semibold">{q.prompt}</p>
          <PeriodicGrid onSelect={answer} hideNames correctZ={picked !== null ? q.answer : null} wrongZ={picked !== null && picked !== q.answer ? picked : null} selected={picked} />
          {picked !== null && (
            <div className={cn('mt-4 rounded-2xl p-4 text-sm', picked === q.answer ? 'bg-green-soft' : 'bg-amber-soft')} role="status">
              <strong>{picked === q.answer ? 'Rätt! ' : `Inte riktigt – du valde ${ELEMENTS[picked - 1].name.toLowerCase()}. `}</strong>
              {q.explanation}
              <div className="mt-3">
                <Button size="sm" onClick={newQuestion}>
                  <Shuffle /> Nästa fråga
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
