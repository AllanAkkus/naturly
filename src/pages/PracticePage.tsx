import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Loader2, Play, Sparkles, Timer } from 'lucide-react'
import { ALL_LESSONS, MODULES, QUESTION_BANK, conceptLabel } from '@/content'
import type { Difficulty, Question } from '@/content/types'
import { QuizRunner } from '@/components/quiz/QuizRunner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useProgress } from '@/store/progress'
import { useSettings } from '@/store/settings'
import { buildExam } from '@/lib/adaptive'
import { generateQuestions } from '@/lib/ai'
import { useAiAvailable } from '@/lib/hooks'
import { cn } from '@/lib/utils'

const LEVEL_START: Record<string, Difficulty> = { nyborjare: 1, mellan: 2, avancerad: 3 }

export default function PracticePage() {
  const [params, setParams] = useSearchParams()
  const tab = params.get('flik') ?? 'quiz'
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-5">
      <header>
        <h1 className="text-3xl font-semibold">Öva och prov</h1>
        <p className="mt-1 text-muted">Alla frågor är Naturlys egna övningsfrågor – inte officiella frågor från NTI-skolan.</p>
      </header>
      <Tabs value={tab} onValueChange={(v) => setParams({ flik: v }, { replace: true })}>
        <TabsList>
          <TabsTrigger value="quiz">Anpassad quiz</TabsTrigger>
          <TabsTrigger value="misstag">Mina missar</TabsTrigger>
          <TabsTrigger value="prov">Övningsprov</TabsTrigger>
          <TabsTrigger value="ai">Fler frågor (AI)</TabsTrigger>
        </TabsList>
        <TabsContent value="quiz">
          <AdaptiveQuiz />
        </TabsContent>
        <TabsContent value="misstag">
          <MistakesQuiz />
        </TabsContent>
        <TabsContent value="prov">
          <ExamSetup />
        </TabsContent>
        <TabsContent value="ai">
          <AiQuiz />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ModulePicker({ selected, onChange }: { selected: string[]; onChange: (s: string[]) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {MODULES.map((m) => (
        <button
          key={m.id}
          type="button"
          aria-pressed={selected.includes(m.id)}
          onClick={() => onChange(selected.includes(m.id) ? selected.filter((x) => x !== m.id) : [...selected, m.id])}
          className={cn('rounded-full border px-3 py-1 text-xs font-medium', selected.includes(m.id) ? 'border-primary bg-primary-soft text-primary' : 'border-border hover:bg-surface-2')}
        >
          {m.number}. {m.title}
        </button>
      ))}
    </div>
  )
}

function AdaptiveQuiz() {
  const level = useSettings((s) => s.level)
  const [modules, setModules] = useState<string[]>(['m1'])
  const [start, setStart] = useState<Difficulty>(LEVEL_START[level])
  const [run, setRun] = useState(0)
  const [active, setActive] = useState(false)
  const pool = useMemo(() => QUESTION_BANK.filter((e) => modules.includes(e.moduleId)).map((e) => e.q), [modules])
  if (active)
    return (
      <QuizRunner
        key={run}
        questions={[]}
        adaptive={{ pool, count: 10, startLevel: start }}
        title="Anpassad quiz"
        mode="practice"
        source="quiz"
        examId="adaptiv"
        onRestart={() => {
          setRun((r) => r + 1)
          setActive(false)
        }}
      />
    )
  return (
    <Card className="flex flex-col gap-4 p-5">
      <p className="text-sm">Quizen anpassar sig efter dig: två rätt i rad ger en svårare fråga, ett fel ger en enklare. Begrepp du behöver repetera kommer oftare.</p>
      <div>
        <p className="mb-2 text-sm font-medium">Vilka moduler?</p>
        <ModulePicker selected={modules} onChange={setModules} />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Börja på nivå</p>
        <div className="flex gap-2">
          {([1, 2, 3] as Difficulty[]).map((d) => (
            <Button key={d} size="sm" variant={start === d ? 'default' : 'outline'} onClick={() => setStart(d)}>
              {d === 1 ? 'Nybörjare' : d === 2 ? 'Mellan' : 'Avancerad'}
            </Button>
          ))}
        </div>
      </div>
      <Button className="self-start" disabled={pool.length === 0} onClick={() => setActive(true)}>
        <Play /> Starta (10 frågor)
      </Button>
      <p className="text-xs text-muted">{pool.length} frågor finns i de valda modulerna.</p>
    </Card>
  )
}

function MistakesQuiz() {
  const answers = useProgress((s) => s.answers)
  const [active, setActive] = useState(false)
  const [run, setRun] = useState(0)
  const questions = useMemo(() => {
    const lastResult = new Map<string, boolean>()
    for (const a of answers) lastResult.set(a.questionId, a.correct)
    const wrongIds = [...lastResult.entries()].filter(([, ok]) => !ok).map(([id]) => id)
    return QUESTION_BANK.filter((e) => wrongIds.includes(e.q.id))
      .map((e) => e.q)
      .slice(0, 15)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run])
  if (questions.length === 0)
    return (
      <Card className="p-6 text-center">
        <p className="text-lg">Inga missar att öva på just nu 🌟</p>
        <p className="mt-1 text-sm text-muted">Frågor du svarar fel på hamnar här, så att du kan prova dem igen.</p>
      </Card>
    )
  if (active) return <QuizRunner key={run} questions={questions} title="Mina missar" mode="practice" source="review" onRestart={() => (setRun((r) => r + 1), setActive(false))} />
  return (
    <Card className="flex flex-col gap-3 p-5">
      <p>Du har {questions.length} frågor att prova igen. Det är helt normalt att svara fel – det är så man lär sig!</p>
      <ul className="text-sm text-muted">
        {[...new Set(questions.map((q) => q.concepts[0]))].slice(0, 6).map((c) => (
          <li key={c}>• {conceptLabel(c)}</li>
        ))}
      </ul>
      <Button className="self-start" onClick={() => setActive(true)}>
        <Play /> Öva på missarna
      </Button>
    </Card>
  )
}

function ExamSetup() {
  const exams = useProgress((s) => s.exams)
  const [modules, setModules] = useState<string[]>(MODULES.map((m) => m.id))
  const [count, setCount] = useState(20)
  const [timed, setTimed] = useState(false)
  const [questions, setQuestions] = useState<Question[] | null>(null)
  const [run, setRun] = useState(0)
  const start = () => {
    const pool = QUESTION_BANK.filter((e) => modules.includes(e.moduleId))
    setQuestions(buildExam(pool, count))
    setRun((r) => r + 1)
  }
  if (questions)
    return (
      <QuizRunner
        key={run}
        questions={questions}
        title="Simulerat prov"
        mode="exam"
        source="exam"
        examId="slutprov"
        timeLimitMin={timed ? Math.round(count * 2.5) : undefined}
        onRestart={() => setQuestions(null)}
      />
    )
  const past = exams.filter((e) => e.id === 'slutprov').slice(-5).reverse()
  return (
    <div className="flex flex-col gap-4">
      <Card className="flex flex-col gap-4 p-5">
        <p className="text-sm">Ett simulerat prov med blandade frågor från hela kursen. Förklaringarna kommer i slutet, precis som på ett riktigt prov.</p>
        <div>
          <p className="mb-2 text-sm font-medium">Moduler</p>
          <ModulePicker selected={modules} onChange={setModules} />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium">Antal frågor:</span>
          {[10, 20, 30].map((n) => (
            <Button key={n} size="sm" variant={count === n ? 'default' : 'outline'} onClick={() => setCount(n)}>
              {n}
            </Button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={timed} onChange={(e) => setTimed(e.target.checked)} className="size-4" />
          <Timer className="size-4" /> Tidsgräns ({Math.round(count * 2.5)} min) – valfritt
        </label>
        <Button className="self-start" onClick={start} disabled={modules.length === 0}>
          <Play /> Starta provet
        </Button>
      </Card>
      {past.length > 0 && (
        <Card className="p-5">
          <h3 className="mb-2 font-semibold">Tidigare övningsprov</h3>
          <ul className="space-y-1 text-sm">
            {past.map((e) => (
              <li key={e.t} className="flex justify-between">
                <span>{new Date(e.t).toLocaleDateString('sv-SE')}</span>
                <span>
                  {e.score}/{e.total} ({Math.round((e.score / e.total) * 100)} %)
                </span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  )
}

function AiQuiz() {
  const ai = useAiAvailable()
  const level = useSettings((s) => s.level)
  const lessons = ALL_LESSONS.filter((l) => l.kind === 'lesson')
  const [lessonId, setLessonId] = useState(lessons[0]?.id ?? '')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [questions, setQuestions] = useState<Question[] | null>(null)
  const go = async () => {
    const l = lessons.find((x) => x.id === lessonId)
    if (!l || l.kind !== 'lesson') return
    setBusy(true)
    setError(null)
    try {
      const qs = await generateQuestions({ topic: l.title, summary: l.summary, level, count: 5 })
      setQuestions(
        qs.map((g, i) => ({
          type: 'mcq',
          id: `ai-${l.id}-${Date.now()}-${i}`,
          prompt: g.prompt,
          options: g.options,
          correct: g.correct,
          explanation: g.explanation,
          concepts: [l.id],
          difficulty: level === 'nyborjare' ? 1 : level === 'mellan' ? 2 : 3,
        })),
      )
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setBusy(false)
    }
  }
  if (questions) return <QuizRunner questions={questions} title="AI-genererade frågor" mode="practice" source="quiz" examId="ai" onRestart={() => setQuestions(null)} />
  return (
    <Card className="flex flex-col gap-4 p-5">
      <p className="text-sm">AI-läraren skapar nya övningsfrågor om en lektion, anpassade efter din nivå. AI kan ibland göra fel – säg till om en fråga verkar konstig.</p>
      {ai === false && <p className="rounded-2xl bg-amber-soft p-3 text-sm">AI-läraren är inte konfigurerad. Lägg in en OpenAI-nyckel i .env (se README).</p>}
      <label className="text-sm">
        <span className="mb-1 block font-medium">Lektion</span>
        <select value={lessonId} onChange={(e) => setLessonId(e.target.value)} className="h-11 w-full rounded-xl border border-border bg-surface px-3">
          {MODULES.map((m) => (
            <optgroup key={m.id} label={`${m.number}. ${m.title}`}>
              {m.lessons
                .filter((l) => l.kind === 'lesson')
                .map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.title}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
      </label>
      {error && <p className="rounded-2xl bg-amber-soft p-3 text-sm">{error}</p>}
      <Button className="self-start" onClick={go} disabled={!ai || busy}>
        {busy ? <Loader2 className="animate-spin" /> : <Sparkles />} Skapa 5 frågor
      </Button>
    </Card>
  )
}
