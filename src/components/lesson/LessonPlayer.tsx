import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarClock,
  Check,
  ChevronDown,
  Eye,
  Lightbulb,
  ListChecks,
  MessageCircleQuestion,
  RefreshCw,
  Sparkles,
  Target,
  Utensils,
} from 'lucide-react'
import type { Lesson, Question } from '@/content/types'
import { getLesson, getModule, nextLessonAfter } from '@/content'
import { useProgress } from '@/store/progress'
import { useTutor } from '@/store/tutor'
import { useLearningContext } from '@/store/context'
import { useSettings } from '@/store/settings'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { RichText } from '@/components/RichText'
import { ReadAloud } from '@/components/ReadAloud'
import { VisualRenderer } from '@/components/visuals/VisualRenderer'
import { QuestionView, type AnswerResult } from '@/components/quiz/QuestionView'
import { INTERVALS_DAYS } from '@/lib/srs'
import { cn } from '@/lib/utils'

const STEPS = [
  { key: 'goal', label: 'Vad ska vi lära oss?', icon: Target },
  { key: 'simple', label: 'Förklara från noll', icon: BookOpen },
  { key: 'visual', label: 'Visa mig', icon: Eye },
  { key: 'analogy', label: 'Vardagsexempel', icon: Utensils },
  { key: 'check', label: 'Kolla förståelsen', icon: MessageCircleQuestion },
  { key: 'apply', label: 'Använd kunskapen', icon: Lightbulb },
  { key: 'practice', label: 'Öva mer', icon: ListChecks },
  { key: 'summary', label: 'Det viktigaste', icon: Sparkles },
] as const

export function LessonPlayer({ lesson }: { lesson: Lesson }) {
  const navigate = useNavigate()
  const module = getModule(lesson.moduleId)!
  const progress = useProgress()
  const saved = progress.lessons[lesson.id]
  const [step, setStep] = useState(() => Math.min(saved?.step ?? 0, STEPS.length - 1))
  const [essentials, setEssentials] = useState(false)
  const setCtx = useLearningContext((s) => s.set)
  const ask = useTutor((s) => s.ask)
  const reducedMotion = useSettings((s) => s.reducedMotion)

  useEffect(() => {
    progress.startLesson(lesson.id)
    progress.setLastVisited(`/lektion/${lesson.id}`, lesson.title)
    setCtx({
      moduleTitle: module.title,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      lessonGoal: lesson.goal,
      summary: lesson.summary,
      simple: lesson.simple,
      currentQuestion: undefined,
      page: 'lektion',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson.id])

  useEffect(() => {
    progress.setLessonStep(lesson.id, step)
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, lesson.id])

  const record = (q: Question, r: AnswerResult) =>
    progress.recordAnswer({ questionId: q.id, concepts: q.concepts, correct: r.correct, difficulty: q.difficulty, source: 'lesson', given: r.given.slice(0, 120) })

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1))
  const prev = () => setStep((s) => Math.max(s - 1, 0))
  const nextLesson = nextLessonAfter(lesson.id)
  const completed = saved?.status === 'completed'

  const finish = () => {
    progress.completeLesson(
      lesson.id,
      lesson.flashcards.map((f) => f.id),
    )
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-5">
      <div className="flex flex-col gap-3">
        <Link to={`/lektion/${lesson.id}`} className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground">
          <ArrowLeft className="size-4" /> Tillbaka till lärobokssidan
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold sm:text-3xl">{lesson.title}</h1>
            <p className="mt-1 text-sm text-muted">
              ca {lesson.minutes} min · {lesson.core ? 'Centralt innehåll' : 'Stödkunskap'}
              {completed && ' · ✓ genomförd'}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant={essentials ? 'default' : 'outline'} size="sm" onClick={() => setEssentials((e) => !e)} aria-pressed={essentials}>
              <Sparkles /> Visa bara det viktiga
            </Button>
            <Button variant="soft" size="sm" onClick={() => ask(`Jag läser lektionen "${lesson.title}". Kan du hjälpa mig förstå den?`)}>
              <MessageCircleQuestion /> Fråga Naturly
            </Button>
          </div>
        </div>
        {!essentials && (
          <>
            <Progress value={((step + 1) / STEPS.length) * 100} label={`Steg ${step + 1} av ${STEPS.length}`} />
            <nav aria-label="Lektionens steg" className="flex gap-1 overflow-x-auto pb-1 scrollbar-thin">
              {STEPS.map((s, i) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setStep(i)}
                  aria-current={i === step ? 'step' : undefined}
                  className={cn(
                    'flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
                    i === step ? 'bg-primary text-primary-foreground' : i < step ? 'bg-primary-soft text-primary' : 'text-muted hover:bg-surface-2',
                  )}
                >
                  <s.icon className="size-3.5" />
                  <span className={cn(i !== step && 'hidden sm:inline')}>{s.label}</span>
                </button>
              ))}
            </nav>
          </>
        )}
      </div>

      {essentials ? (
        <EssentialsView lesson={lesson} onBack={() => setEssentials(false)} />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
            <Card className="p-5 sm:p-7">
              <StepHeader index={step} />
              {step === 0 && <GoalStep lesson={lesson} />}
              {step === 1 && <SimpleStep lesson={lesson} />}
              {step === 2 && <VisualStep lesson={lesson} />}
              {step === 3 && <AnalogyStep lesson={lesson} />}
              {step === 4 && <CheckStep lesson={lesson} record={record} onDone={next} />}
              {step === 5 && <QuestionView question={lesson.apply} onAnswered={(r) => record(lesson.apply, r)} onContinue={next} />}
              {step === 6 && <PracticeStep lesson={lesson} record={record} onDone={next} />}
              {step === 7 && <SummaryStep lesson={lesson} completed={completed} onComplete={finish} />}
            </Card>
          </motion.div>
        </AnimatePresence>
      )}

      {!essentials && (
        <div className="flex items-center justify-between gap-2 pr-16 sm:pr-0">
          <Button variant="ghost" onClick={prev} disabled={step === 0}>
            <ArrowLeft /> Tillbaka
          </Button>
          {step < STEPS.length - 1 && ![4, 5, 6].includes(step) && (
            <Button onClick={next}>
              Nästa steg <ArrowRight />
            </Button>
          )}
          {[4, 5, 6].includes(step) && (
            <Button variant="ghost" onClick={next}>
              Hoppa över <ArrowRight />
            </Button>
          )}
          {step === STEPS.length - 1 && nextLesson && completed && (
            <Button onClick={() => navigate(`/lektion/${nextLesson.id}`)}>
              Nästa lektion: {nextLesson.title} <ArrowRight />
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

function StepHeader({ index }: { index: number }) {
  const s = STEPS[index]
  return (
    <div className="mb-4 flex items-center gap-2 text-sm font-medium text-primary">
      <span className="flex size-7 items-center justify-center rounded-full bg-primary-soft">
        <s.icon className="size-4" />
      </span>
      Steg {index + 1}: {s.label}
    </div>
  )
}

function GoalStep({ lesson }: { lesson: Lesson }) {
  const prereqs = lesson.prerequisites.map((id) => getLesson(id)).filter(Boolean)
  const progress = useProgress((s) => s.lessons)
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start gap-3">
        <p className="font-display text-2xl leading-snug sm:text-3xl">{lesson.goal}</p>
        <ReadAloud text={lesson.goal} />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold text-muted">När du är klar kan du:</h3>
        <ul className="space-y-1.5">
          {lesson.objectives.map((o) => (
            <li key={o} className="flex gap-2 text-[0.95rem]">
              <Check className="mt-1 size-4 shrink-0 text-green" /> {o}
            </li>
          ))}
        </ul>
      </div>
      {prereqs.length > 0 && (
        <div className="rounded-2xl bg-surface-2 p-4 text-sm">
          <span className="font-medium">Bra att kunna först: </span>
          {prereqs.map((p, i) => (
            <span key={p!.id}>
              {i > 0 && ', '}
              <Link className="text-primary underline-offset-2 hover:underline" to={`/lektion/${p!.id}`}>
                {p!.title}
              </Link>
              {progress[p!.id]?.status === 'completed' && ' ✓'}
            </span>
          ))}
          <p className="mt-1 text-xs text-muted">Du kan ändå börja här – vi förklarar från början.</p>
        </div>
      )}
    </div>
  )
}

function SimpleStep({ lesson }: { lesson: Lesson }) {
  const [variant, setVariant] = useState(0)
  const [deep, setDeep] = useState(false)
  const ask = useTutor((s) => s.ask)
  const versions = useMemo(() => [lesson.simple.join(' '), ...lesson.alternatives], [lesson])
  const isOriginal = variant === 0
  return (
    <div className="flex flex-col gap-5">
      <AnimatePresence mode="wait">
        <motion.div key={variant} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
          {isOriginal ? (
            lesson.simple.map((s, i) => (
              <p key={i} className="text-lg leading-relaxed">
                <RichText text={s} />
              </p>
            ))
          ) : (
            <p className="text-lg leading-relaxed">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-primary">Ett annat sätt att se det</span>
              <RichText text={versions[variant]} />
            </p>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="flex flex-wrap gap-2">
        <ReadAloud text={isOriginal ? lesson.simple : versions[variant]} />
        <Button variant="soft" size="sm" onClick={() => setVariant((v) => (v + 1) % versions.length)}>
          <RefreshCw /> Förklara igen
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => ask(`Kan du förklara "${lesson.title}" på ett helt nytt sätt? Jag har redan läst: "${versions.join(' ')}"`)}
        >
          <Sparkles /> Be AI om en ny förklaring
        </Button>
      </div>
      <div className="rounded-2xl border border-border">
        <button type="button" onClick={() => setDeep((d) => !d)} aria-expanded={deep} className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium">
          Vill du veta mer? Fördjupning
          <ChevronDown className={cn('size-4 transition-transform', deep && 'rotate-180')} />
        </button>
        {deep && (
          <div className="space-y-3 border-t border-border px-4 py-4 text-[0.95rem]">
            {lesson.detailed.map((d, i) => (
              <p key={i}>
                <RichText text={d} />
              </p>
            ))}
            {lesson.caveats.length > 0 && (
              <div className="rounded-xl bg-amber-soft p-3 text-sm">
                <strong>Vetenskaplig noggrannhet:</strong>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  {lesson.caveats.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
            <ReadAloud text={lesson.detailed} />
          </div>
        )}
      </div>
    </div>
  )
}

function VisualStep({ lesson }: { lesson: Lesson }) {
  return (
    <div className="flex flex-col gap-4">
      {lesson.visualPrompt && <p className="rounded-2xl bg-primary-soft px-4 py-3 text-sm font-medium">👉 {lesson.visualPrompt}</p>}
      <VisualRenderer spec={lesson.visual} />
    </div>
  )
}

function AnalogyStep({ lesson }: { lesson: Lesson }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg leading-relaxed">{lesson.analogy.text}</p>
      <ReadAloud text={lesson.analogy.text} />
      <div className="rounded-2xl bg-amber-soft p-4 text-sm">
        <strong>Här slutar liknelsen att stämma:</strong> {lesson.analogy.limits}
      </div>
    </div>
  )
}

function CheckStep({ lesson, record, onDone }: { lesson: Lesson; record: (q: Question, r: AnswerResult) => void; onDone: () => void }) {
  const [phase, setPhase] = useState<'check' | 'support' | 'follow'>('check')
  const [firstCorrect, setFirstCorrect] = useState<boolean | null>(null)
  const setCtx = useLearningContext((s) => s.set)
  useEffect(() => setCtx({ currentQuestion: phase === 'follow' ? lesson.followUp.prompt : lesson.check.prompt }), [phase, lesson, setCtx])
  if (phase === 'check')
    return (
      <QuestionView
        question={lesson.check}
        allowRetry={false}
        onAnswered={(r) => {
          record(lesson.check, r)
          setFirstCorrect(r.correct)
        }}
        onContinue={() => (firstCorrect ? onDone() : setPhase('support'))}
        continueLabel={firstCorrect ? 'Fortsätt' : 'Vi testar ett annat sätt'}
      />
    )
  if (phase === 'support')
    return (
      <div className="flex flex-col gap-4">
        <p className="font-medium">Ingen fara! Vi testar ett annat sätt.</p>
        <p className="text-lg leading-relaxed">
          <RichText text={lesson.alternatives[0] ?? lesson.simple.join(' ')} />
        </p>
        <p className="rounded-2xl bg-surface-2 p-4 text-sm">{lesson.analogy.text}</p>
        <Button className="self-start" onClick={() => setPhase('follow')}>
          Prova en enklare fråga <ArrowRight />
        </Button>
      </div>
    )
  return <QuestionView question={lesson.followUp} onAnswered={(r) => record(lesson.followUp, r)} onContinue={onDone} />
}

function PracticeStep({ lesson, record, onDone }: { lesson: Lesson; record: (q: Question, r: AnswerResult) => void; onDone: () => void }) {
  const [i, setI] = useState(0)
  const oneAtATime = useSettings((s) => s.oneQuestionAtATime)
  const setCtx = useLearningContext((s) => s.set)
  const q = lesson.practice[i]
  useEffect(() => setCtx({ currentQuestion: q?.prompt }), [q, setCtx])
  if (!oneAtATime)
    return (
      <div className="flex flex-col gap-8">
        {lesson.practice.map((pq, k) => (
          <div key={pq.id} className="border-b border-border pb-6 last:border-0">
            <p className="mb-2 text-xs text-muted">Övning {k + 1}</p>
            <QuestionView question={pq} onAnswered={(r) => record(pq, r)} />
          </div>
        ))}
        <Button onClick={onDone} className="self-end">
          Till sammanfattningen <ArrowRight />
        </Button>
      </div>
    )
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-muted">
        Övning {i + 1} av {lesson.practice.length}
      </p>
      <QuestionView
        question={q}
        onAnswered={(r) => record(q, r)}
        onContinue={() => (i + 1 < lesson.practice.length ? setI(i + 1) : onDone())}
        continueLabel={i + 1 < lesson.practice.length ? 'Nästa övning' : 'Till sammanfattningen'}
      />
    </div>
  )
}

function SummaryStep({ lesson, completed, onComplete }: { lesson: Lesson; completed: boolean; onComplete: () => void }) {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({})
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-semibold">Det viktigaste att komma ihåg</h2>
      <ul className="space-y-2">
        {lesson.summary.map((s) => (
          <li key={s} className="flex gap-3 rounded-2xl bg-primary-soft/60 px-4 py-3 text-[0.98rem]">
            <Check className="mt-0.5 size-5 shrink-0 text-primary" />
            <RichText text={s} />
          </li>
        ))}
      </ul>
      <ReadAloud text={lesson.summary} />

      <div>
        <h3 className="mb-2 text-sm font-semibold">Repetitionskort</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {lesson.flashcards.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFlipped((x) => ({ ...x, [f.id]: !x[f.id] }))}
              className="min-h-20 rounded-2xl border border-border bg-surface p-3 text-left text-sm hover:bg-surface-2"
              aria-label={flipped[f.id] ? `Svar: ${f.back}` : `Fråga: ${f.front}. Tryck för att vända.`}
            >
              <span className="block text-xs text-muted">{flipped[f.id] ? 'Svar' : 'Fråga – tryck för att vända'}</span>
              {flipped[f.id] ? f.back : f.front}
            </button>
          ))}
        </div>
      </div>

      {completed ? (
        <div className="flex items-start gap-3 rounded-2xl bg-green-soft p-4 text-sm">
          <CalendarClock className="mt-0.5 size-5 shrink-0 text-green" />
          <div>
            <strong>Lektionen är klar!</strong> Korten har lagts in för repetition: idag, och sedan efter {INTERVALS_DAYS.slice(1, 5).join(', ')} dagar om det går bra. Att
            ha läst en lektion betyder inte att man kan allt – repetitionen hjälper kunskapen att stanna kvar.
            <div className="mt-2 flex flex-wrap gap-2">
              <Button asChild size="sm" variant="outline">
                <Link to={`/egna-ord?begrepp=${lesson.id}`}>Förklara med egna ord</Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link to="/repetera">Repetera nu</Link>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Button size="lg" onClick={onComplete} className="self-start">
          <Check /> Markera lektionen som klar
        </Button>
      )}
    </div>
  )
}

function EssentialsView({ lesson, onBack }: { lesson: Lesson; onBack: () => void }) {
  return (
    <Card className="p-6">
      <p className="mb-3 text-sm text-muted">Bara det viktiga:</p>
      <p className="mb-4 font-display text-xl">{lesson.goal}</p>
      <ul className="space-y-2">
        {lesson.summary.map((s) => (
          <li key={s} className="flex gap-3 text-lg">
            <Check className="mt-1 size-5 shrink-0 text-primary" />
            <RichText text={s} />
          </li>
        ))}
      </ul>
      <div className="mt-5 flex gap-2">
        <ReadAloud text={lesson.summary} />
        <Button variant="outline" size="sm" onClick={onBack}>
          Tillbaka till hela lektionen
        </Button>
      </div>
    </Card>
  )
}
