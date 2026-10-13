import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Eye,
  HelpCircle,
  Lightbulb,
  ListChecks,
  MapPin,
  MessageCircleQuestion,
  Play,
  Settings2,
  Sparkles,
  TriangleAlert,
  Utensils,
  X,
} from 'lucide-react'
import type { Lesson, Question } from '@/content/types'
import { getLesson, getModule, nextLessonAfter, previousLessonBefore } from '@/content'
import { BOOK_PART_BY_ID } from '@/content/book'
import { useProgress } from '@/store/progress'
import { useTutor } from '@/store/tutor'
import { useLearningContext } from '@/store/context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { RichText } from '@/components/RichText'
import { ReadAloud } from '@/components/ReadAloud'
import { VisualRenderer } from '@/components/visuals/VisualRenderer'
import { QuestionView, type AnswerResult } from '@/components/quiz/QuestionView'
import { cn } from '@/lib/utils'

/** Lärobokssidan: en lugn sida som förklarar EN sak, uppifrån och ned. */
export function TextbookPage({ lesson }: { lesson: Lesson }) {
  const module = getModule(lesson.moduleId)!
  const part = BOOK_PART_BY_ID.get(module.part)
  const progress = useProgress()
  const read = progress.lessons[lesson.id]?.status === 'completed'
  const setCtx = useLearningContext((s) => s.set)
  const ask = useTutor((s) => s.ask)
  const prev = previousLessonBefore(lesson.id)
  const next = nextLessonAfter(lesson.id)

  useEffect(() => {
    progress.startLesson(lesson.id)
    progress.setLastVisited(`/lektion/${lesson.id}`, lesson.title)
    setCtx({
      moduleTitle: module.title,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      lessonGoal: lesson.goal,
      summary: lesson.summary,
      simple: [...lesson.what, ...lesson.why],
      currentQuestion: undefined,
      page: 'lärobokssida',
    })
    window.scrollTo({ top: 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson.id])

  const record = (q: Question, r: AnswerResult) =>
    progress.recordAnswer({ questionId: q.id, concepts: q.concepts, correct: r.correct, difficulty: q.difficulty, source: 'lesson', given: r.given.slice(0, 120) })

  const questions = [lesson.check, lesson.apply, ...lesson.practice]

  return (
    <article className="mx-auto flex max-w-3xl flex-col gap-6">
      <header className="flex flex-col gap-3">
        <nav aria-label="Var i boken" className="flex flex-wrap items-center gap-1 text-sm text-muted">
          <Link to="/kurs" className="hover:text-foreground">
            {part?.title ?? 'Läroboken'}
          </Link>
          <span aria-hidden>›</span>
          <Link to={`/modul/${module.id}`} className="hover:text-foreground">
            Kapitel {module.number}: {module.title}
          </Link>
          {lesson.section && (
            <>
              <span aria-hidden>›</span>
              <span>{lesson.section}</span>
            </>
          )}
        </nav>
        <h1 className="text-3xl font-semibold sm:text-4xl">{lesson.title}</h1>
        <p className="text-sm text-muted">
          ca {lesson.minutes} min att läsa{read && ' · ✓ läst'}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button variant="soft" size="sm" onClick={() => ask(`Jag läser sidan "${lesson.title}". Kan du förklara den för mig från början, väldigt enkelt?`)}>
            <MessageCircleQuestion /> Fråga AI-läraren
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to={`/lektion/${lesson.id}/steg`}>
              <Play /> Träna steg för steg
            </Link>
          </Button>
        </div>
      </header>

      <Prerequisites lesson={lesson} />

      <Section n={1} icon={BookOpen} title="Vad är det?" read={lesson.what}>
        <Paragraphs items={lesson.what} large />
      </Section>

      <Section n={2} icon={HelpCircle} title="Varför?" read={lesson.why}>
        <Paragraphs items={lesson.why} />
      </Section>

      <Section n={3} icon={Settings2} title="Hur fungerar det?" read={lesson.how}>
        <Paragraphs items={lesson.how} />
      </Section>

      <Section n={4} icon={Eye} title="Titta på bilden">
        {lesson.visualPrompt && <p className="mb-3 rounded-2xl bg-primary-soft px-4 py-3 text-sm font-medium">👉 {lesson.visualPrompt}</p>}
        <VisualRenderer spec={lesson.visual} />
      </Section>

      <Section n={5} icon={MapPin} title="Var möter vi det?" read={lesson.where}>
        <ul className="space-y-2">
          {lesson.where.map((w) => (
            <li key={w} className="flex gap-3 rounded-2xl bg-green-soft/60 px-4 py-3">
              <span aria-hidden>🌍</span>
              <span>
                <RichText text={w} />
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section n={6} icon={Utensils} title="Tänk på det så här" read={lesson.analogy.text}>
        <p className="text-lg leading-relaxed">{lesson.analogy.text}</p>
        <p className="mt-3 rounded-2xl bg-amber-soft p-4 text-sm">
          <strong>Här slutar liknelsen att stämma:</strong> {lesson.analogy.limits}
        </p>
      </Section>

      <Section n={7} icon={TriangleAlert} title="Vanliga missförstånd">
        <ul className="space-y-3">
          {lesson.misconceptions.map((m) => (
            <li key={m.myth} className="overflow-hidden rounded-2xl border border-border">
              <p className="flex gap-2 bg-danger-soft/60 px-4 py-2.5 text-[0.95rem]">
                <X className="mt-0.5 size-4 shrink-0 text-danger" aria-label="Fel" />
                <span>
                  <span className="sr-only">Missförstånd: </span>
                  <RichText text={m.myth} />
                </span>
              </p>
              <p className="flex gap-2 px-4 py-2.5 text-[0.95rem]">
                <Check className="mt-0.5 size-4 shrink-0 text-green" aria-label="Rätt" />
                <RichText text={m.truth} />
              </p>
            </li>
          ))}
        </ul>
        {lesson.caveats.length > 0 && (
          <div className="mt-3 rounded-2xl bg-surface-2 p-4 text-sm">
            <strong>Bra att veta:</strong>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              {lesson.caveats.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      <Section n={8} icon={Sparkles} title="Det viktigaste" read={lesson.summary}>
        <ul className="space-y-2">
          {lesson.summary.map((s) => (
            <li key={s} className="flex gap-3 rounded-2xl bg-primary-soft/60 px-4 py-3">
              <Check className="mt-0.5 size-5 shrink-0 text-primary" />
              <RichText text={s} />
            </li>
          ))}
        </ul>
        <Deeper lesson={lesson} />
      </Section>

      <Section n={9} icon={ListChecks} title="Testa dig själv">
        <p className="mb-4 text-sm text-muted">Några korta frågor. Det gör inget att svara fel – förklaringen kommer direkt.</p>
        <div className="flex flex-col gap-8">
          {questions.map((q, i) => (
            <div key={q.id} className="border-b border-border pb-6 last:border-0 last:pb-0">
              <p className="mb-2 text-xs text-muted">
                Fråga {i + 1} av {questions.length}
              </p>
              <QuestionView question={q} onAnswered={(r) => record(q, r)} />
            </div>
          ))}
        </div>
      </Section>

      <AskTeacher lesson={lesson} />

      <Card className="flex flex-col gap-4 p-5 sm:p-6">
        {read ? (
          <p className="flex items-center gap-2 font-medium text-green">
            <Check className="size-5" /> Du har läst den här sidan.
          </p>
        ) : (
          <Button
            size="lg"
            className="self-start"
            onClick={() =>
              progress.completeLesson(
                lesson.id,
                lesson.flashcards.map((f) => f.id),
              )
            }
          >
            <Check /> Jag har förstått – markera som läst
          </Button>
        )}
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
          {prev ? (
            <Link to={`/lektion/${prev.id}`} className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground">
              <ArrowLeft className="size-4" /> {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Button asChild>
              <Link to={`/lektion/${next.id}`}>
                Nästa: {next.title} <ArrowRight />
              </Link>
            </Button>
          )}
        </div>
      </Card>
    </article>
  )
}

function Section({ n, icon: Icon, title, read, children }: { n: number; icon: typeof BookOpen; title: string; read?: string | string[]; children: ReactNode }) {
  return (
    <section aria-labelledby={`s${n}`} className="scroll-mt-20">
      <Card className="p-5 sm:p-7">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 id={`s${n}`} className="flex items-center gap-2.5 text-xl font-semibold">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
              <Icon className="size-4" />
            </span>
            {title}
          </h2>
          {read && <ReadAloud text={read} />}
        </div>
        {children}
      </Card>
    </section>
  )
}

function Paragraphs({ items, large = false }: { items: string[]; large?: boolean }) {
  return (
    <div className="space-y-3">
      {items.map((p) => (
        <p key={p} className={cn('leading-relaxed', large ? 'text-lg' : 'text-[1.05rem]')}>
          <RichText text={p} />
        </p>
      ))}
    </div>
  )
}

function Prerequisites({ lesson }: { lesson: Lesson }) {
  const read = useProgress((s) => s.lessons)
  const prereqs = lesson.prerequisites.map((id) => getLesson(id)).filter((l): l is NonNullable<typeof l> => !!l)
  if (prereqs.length === 0)
    return <p className="rounded-2xl bg-green-soft/60 px-4 py-3 text-sm">🌱 Du behöver inte kunna något innan – vi börjar från noll.</p>
  return (
    <div className="rounded-2xl bg-surface-2 p-4">
      <p className="text-sm font-semibold">Kom ihåg först</p>
      <p className="mb-2 text-xs text-muted">Den här sidan bygger på det här. Känns något okänt? Läs den sidan först.</p>
      <ul className="space-y-2">
        {prereqs.map((p) => (
          <li key={p.id} className="text-sm">
            <Link to={`/lektion/${p.id}`} className="font-medium text-primary underline-offset-2 hover:underline">
              {p.title}
            </Link>
            {read[p.id]?.status === 'completed' && ' ✓'}
            {p.kind === 'lesson' && (
              <span className="block text-muted">
                <RichText text={p.summary[0]} />
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Deeper({ lesson }: { lesson: Lesson }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="mt-4 rounded-2xl border border-border">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium">
        Vill du veta mer? Fördjupning
        <ChevronDown className={cn('size-4 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="space-y-3 border-t border-border px-4 py-4 text-[0.95rem]">
          {lesson.detailed.map((d) => (
            <p key={d}>
              <RichText text={d} />
            </p>
          ))}
          {lesson.alternatives.map((a) => (
            <p key={a} className="rounded-xl bg-surface-2 p-3">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-primary">Ett annat sätt att se det</span>
              <RichText text={a} />
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

function AskTeacher({ lesson }: { lesson: Lesson }) {
  const ask = useTutor((s) => s.ask)
  const setOpen = useTutor((s) => s.setOpen)
  const prompts = [
    `Förklara "${lesson.title}" ännu enklare, som om jag var tio år.`,
    `Ge mig ett annat vardagsexempel på "${lesson.title}".`,
    `Varför är "${lesson.title}" viktigt att förstå?`,
    `Ställ en lätt fråga till mig om "${lesson.title}" och rätta mitt svar.`,
  ]
  return (
    <section aria-labelledby="ask">
      <Card className="bg-primary-soft/40 p-5 sm:p-7">
        <h2 id="ask" className="mb-1 flex items-center gap-2.5 text-xl font-semibold">
          <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Lightbulb className="size-4" />
          </span>
          Fråga AI-läraren
        </h2>
        <p className="mb-4 text-sm text-muted">Är något fortfarande oklart? Det finns inga dumma frågor.</p>
        <div className="flex flex-wrap gap-2">
          {prompts.map((p) => (
            <Button key={p} variant="outline" size="sm" className="h-auto whitespace-normal py-2 text-left" onClick={() => ask(p)}>
              {p}
            </Button>
          ))}
          <Button size="sm" onClick={() => setOpen(true)}>
            <MessageCircleQuestion /> Skriv en egen fråga
          </Button>
        </div>
      </Card>
    </section>
  )
}
