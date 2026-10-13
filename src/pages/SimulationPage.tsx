import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, FlaskConical, Lightbulb, ListOrdered, Target } from 'lucide-react'
import { SIMULATIONS } from '@/components/lab/registry'
import type { SimulationId } from '@/content/types'
import { getLesson } from '@/content'
import { useProgress } from '@/store/progress'
import { useLearningContext } from '@/store/context'
import { Card } from '@/components/ui/card'
import { QuestionView } from '@/components/quiz/QuestionView'
import NotFound from './NotFound'

export default function SimulationPage() {
  const { simId } = useParams()
  const sim = SIMULATIONS[simId as SimulationId]
  const { markLabDone, recordAnswer } = useProgress()
  const setCtx = useLearningContext((s) => s.set)
  const [qi, setQi] = useState(0)
  useEffect(() => {
    if (sim) setCtx({ page: `Labbet: ${sim.title}`, lessonGoal: sim.goal })
  }, [sim, setCtx])
  if (!sim) return <NotFound />
  const { Component } = sim
  const lesson = getLesson(sim.conceptId)
  const q = sim.questions[qi]
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-5">
      <Link to="/labb" className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground">
        <ArrowLeft className="size-4" /> Labbet
      </Link>
      <header>
        <h1 className="text-3xl font-semibold">
          <span aria-hidden>{sim.icon}</span> {sim.title}
        </h1>
      </header>
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="p-4">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <Target className="size-4 text-primary" /> Mål
          </h2>
          <p className="mt-1 text-sm">{sim.goal}</p>
        </Card>
        <Card className="p-4">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <ListOrdered className="size-4 text-primary" /> Gör så här
          </h2>
          <ol className="mt-1 list-decimal space-y-0.5 pl-5 text-sm">
            {sim.instructions.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ol>
        </Card>
      </div>
      <Card className="p-4 sm:p-6" onPointerDown={() => markLabDone(sim.id)}>
        <p className="mb-4 flex items-center gap-1.5 text-xs text-muted">
          <FlaskConical className="size-3.5" /> Förenklad simulering – inte ett riktigt labbförsök.
        </p>
        <Component />
      </Card>
      <Card className="p-5">
        <h2 className="flex items-center gap-2 font-semibold">
          <Lightbulb className="size-5 text-amber" /> Vad visar simuleringen?
        </h2>
        <ul className="mt-2 space-y-1.5 text-[0.95rem]">
          {sim.explanation.map((e) => (
            <li key={e} className="flex gap-2">
              <span aria-hidden>•</span>
              {e}
            </li>
          ))}
        </ul>
        <p className="mt-3 rounded-2xl bg-blue-soft p-3 text-sm">
          <strong>Simulering och verklighet:</strong> {sim.realWorld}
        </p>
        {lesson && (
          <p className="mt-3 text-sm">
            Läs mer i lektionen{' '}
            <Link className="text-primary hover:underline" to={`/lektion/${lesson.id}`}>
              {lesson.title}
            </Link>
            .
          </p>
        )}
      </Card>
      {q && (
        <Card className="p-5 sm:p-6">
          <p className="mb-3 text-xs text-muted">
            Följdfråga {qi + 1} av {sim.questions.length}
          </p>
          <QuestionView
            key={q.id}
            question={q}
            onAnswered={(r) => recordAnswer({ questionId: q.id, concepts: q.concepts, correct: r.correct, difficulty: q.difficulty, source: 'lab', given: r.given })}
            onContinue={qi + 1 < sim.questions.length ? () => setQi(qi + 1) : undefined}
            continueLabel="Nästa fråga"
          />
        </Card>
      )}
    </div>
  )
}
