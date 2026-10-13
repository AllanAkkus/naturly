import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Clock, RotateCcw, Sparkles, X } from 'lucide-react'
import type { Question } from '@/content/types'
import { conceptLabel } from '@/content'
import { useProgress } from '@/store/progress'
import { useLearningContext } from '@/store/context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { RichText } from '@/components/RichText'
import { QuestionView, type AnswerResult } from './QuestionView'
import { nextLevel, pickNext } from '@/lib/adaptive'
import type { Difficulty } from '@/content/types'
import { cn } from '@/lib/utils'

export interface QuizRunnerProps {
  questions: Question[]
  title: string
  /** practice = förklaring direkt efter varje fråga. exam = förklaringar i slutet. */
  mode: 'practice' | 'exam'
  source: 'quiz' | 'exam' | 'review' | 'lesson' | 'lab'
  examId?: string
  onRestart?: () => void
  timeLimitMin?: number
  /** Adaptivt läge: frågorna väljs en i taget ur poolen utifrån hur det går. */
  adaptive?: { pool: Question[]; count: number; startLevel: Difficulty }
  onFinish?: (score: number, total: number) => void
}

export function QuizRunner({ questions: staticQuestions, title, mode, source, examId, onRestart, timeLimitMin, adaptive, onFinish }: QuizRunnerProps) {
  const [level, setLevel] = useState<Difficulty>(adaptive?.startLevel ?? 1)
  const [questions, setQuestions] = useState<Question[]>(() => {
    if (!adaptive) return staticQuestions
    const p = useProgress.getState()
    const mistakes = new Set(p.answers.filter((a) => !a.correct).map((a) => a.questionId))
    const first = pickNext(adaptive.pool, { asked: [], results: {}, level: adaptive.startLevel }, p.concepts, mistakes)
    return first ? [first] : []
  })
  const total = adaptive ? Math.min(adaptive.count, adaptive.pool.length) : questions.length
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, AnswerResult>>({})
  const [finished, setFinished] = useState(false)
  const start = useRef(Date.now())
  const [elapsed, setElapsed] = useState(0)
  const { recordAnswer, addExam } = useProgress()
  const setCtx = useLearningContext((s) => s.set)
  const q = questions[index]

  useEffect(() => {
    if (finished) return
    const t = setInterval(() => setElapsed(Math.round((Date.now() - start.current) / 1000)), 1000)
    return () => clearInterval(t)
  }, [finished])

  useEffect(() => {
    if (q && !finished) setCtx({ currentQuestion: mode === 'practice' ? q.prompt : undefined, page: title })
  }, [q, finished, mode, title, setCtx])

  useEffect(() => {
    if (timeLimitMin && elapsed >= timeLimitMin * 60 && !finished) finish()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elapsed])

  const answer = (r: AnswerResult) => {
    setAnswers((a) => ({ ...a, [q.id]: r }))
    recordAnswer({ questionId: q.id, concepts: q.concepts, correct: r.correct, difficulty: q.difficulty, source, given: r.given.slice(0, 120) })
  }

  const finish = () => {
    setFinished(true)
    onFinish?.(questions.filter((qq) => answers[qq.id]?.correct).length, questions.length)
    const byConcept: Record<string, { correct: number; total: number }> = {}
    for (const qq of questions) {
      for (const c of qq.concepts) {
        byConcept[c] ??= { correct: 0, total: 0 }
        byConcept[c].total++
        if (answers[qq.id]?.correct) byConcept[c].correct++
      }
    }
    if (source === 'exam' || source === 'quiz') {
      addExam({
        id: examId ?? source,
        title,
        t: Date.now(),
        score: questions.filter((qq) => answers[qq.id]?.correct).length,
        total: questions.length,
        durationSec: Math.round((Date.now() - start.current) / 1000),
        byConcept,
      })
    }
  }

  const goNext = () => {
    if (adaptive && index + 1 < total) {
      const p = useProgress.getState()
      const results = Object.fromEntries(Object.entries(answers).map(([k, v]) => [k, v.correct]))
      const recent = questions.map((qq) => answers[qq.id]?.correct ?? false)
      const lvl = nextLevel(level, recent)
      setLevel(lvl)
      const mistakes = new Set(p.answers.filter((a) => !a.correct).map((a) => a.questionId))
      const nq = pickNext(adaptive.pool, { asked: questions.map((x) => x.id), results, level: lvl }, p.concepts, mistakes)
      if (!nq) return finish()
      setQuestions((list) => [...list, nq])
      setIndex(index + 1)
      return
    }
    if (index + 1 < questions.length) setIndex(index + 1)
    else finish()
  }

  if (questions.length === 0)
    return (
      <Card className="p-6 text-center">
        <p>Det finns inga frågor här ännu.</p>
      </Card>
    )

  if (finished) return <QuizResults questions={questions} answers={answers} title={title} elapsed={elapsed} onRestart={onRestart} />

  const remaining = timeLimitMin ? Math.max(0, timeLimitMin * 60 - elapsed) : null
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 text-sm text-muted">
        <span>
          Fråga {index + 1} av {total}
          {adaptive && <span className="ml-2 rounded-full bg-surface-2 px-2 py-0.5 text-xs">Nivå: {level === 1 ? 'grund' : level === 2 ? 'mellan' : 'utmaning'}</span>}
        </span>
        <span className="inline-flex items-center gap-1 tabular-nums" aria-label="Tid">
          <Clock className="size-4" />
          {remaining !== null ? `${Math.floor(remaining / 60)}:${String(remaining % 60).padStart(2, '0')} kvar` : `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, '0')}`}
        </span>
      </div>
      <Progress value={(index / total) * 100} label="Hur långt du har kommit" />
      <Card className="p-5 sm:p-7">
        <QuestionView
          key={q.id}
          question={q}
          feedback={mode === 'exam' ? 'silent' : 'immediate'}
          allowRetry={false}
          onAnswered={answer}
          onContinue={goNext}
          continueLabel={index + 1 < total ? 'Nästa fråga' : 'Visa resultat'}
        />
      </Card>
      {!answers[q.id] && (
        <Button variant="ghost" size="sm" className="self-end" onClick={goNext}>
          Hoppa över
        </Button>
      )}
    </div>
  )
}

function QuizResults({ questions, answers, title, elapsed, onRestart }: { questions: Question[]; answers: Record<string, AnswerResult>; title: string; elapsed: number; onRestart?: () => void }) {
  const correct = questions.filter((q) => answers[q.id]?.correct).length
  const pct = Math.round((correct / questions.length) * 100)
  const byConcept = useMemo(() => {
    const m = new Map<string, { correct: number; total: number }>()
    for (const q of questions)
      for (const c of q.concepts) {
        const e = m.get(c) ?? { correct: 0, total: 0 }
        e.total++
        if (answers[q.id]?.correct) e.correct++
        m.set(c, e)
      }
    return [...m.entries()].sort((a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total)
  }, [questions, answers])
  const weak = byConcept.filter(([, v]) => v.correct / v.total < 0.6)
  const message =
    pct >= 85 ? 'Fantastiskt! Du har riktigt bra koll.' : pct >= 60 ? 'Bra jobbat! Du är på god väg.' : pct >= 30 ? 'Bra att du testade! Nu vet vi vad vi ska öva mer på.' : 'Modigt att testa! Varje fråga visar oss vad nästa steg är.'

  return (
    <div className="flex flex-col gap-5">
      <Card className="p-6 text-center">
        <p className="text-sm text-muted">{title}</p>
        <p className="mt-2 font-display text-5xl font-semibold">
          {correct} / {questions.length}
        </p>
        <p className="mt-2 text-lg">{message}</p>
        <p className="mt-1 text-sm text-muted">
          Tid: {Math.floor(elapsed / 60)} min {elapsed % 60} s
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {onRestart && (
            <Button variant="outline" onClick={onRestart}>
              <RotateCcw /> Gör ett nytt
            </Button>
          )}
          <Button asChild variant="soft">
            <Link to="/framsteg">Se dina framsteg</Link>
          </Button>
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="mb-3 font-semibold">Kunskapsanalys per begrepp</h3>
        <div className="space-y-2">
          {byConcept.map(([c, v]) => (
            <div key={c} className="flex items-center gap-3 text-sm">
              <Link to={`/lektion/${c}`} className="w-48 shrink-0 truncate hover:text-primary sm:w-64">
                {conceptLabel(c)}
              </Link>
              <Progress value={(v.correct / v.total) * 100} tone={v.correct / v.total >= 0.6 ? 'green' : 'pink'} />
              <span className="w-10 shrink-0 text-right tabular-nums text-muted">
                {v.correct}/{v.total}
              </span>
            </div>
          ))}
        </div>
        {weak.length > 0 && (
          <div className="mt-4 rounded-2xl bg-amber-soft p-3 text-sm">
            <Sparkles className="mr-1 inline size-4" /> Förslag: repetera{' '}
            {weak.slice(0, 3).map(([c], i) => (
              <span key={c}>
                {i > 0 && ', '}
                <Link className="font-medium underline-offset-2 hover:underline" to={`/lektion/${c}`}>
                  {conceptLabel(c)}
                </Link>
              </span>
            ))}
            .
          </div>
        )}
      </Card>

      <Card className="p-5">
        <h3 className="mb-3 font-semibold">Genomgång av frågorna</h3>
        <ol className="space-y-3">
          {questions.map((q, i) => {
            const a = answers[q.id]
            return (
              <li key={q.id} className={cn('rounded-2xl p-3 text-sm', a?.correct ? 'bg-green-soft/60' : 'bg-amber-soft/60')}>
                <div className="flex items-start gap-2">
                  {a?.correct ? <Check className="mt-0.5 size-4 shrink-0 text-green" /> : <X className="mt-0.5 size-4 shrink-0 text-amber" />}
                  <div>
                    <p className="font-medium">
                      {i + 1}. <RichText text={q.prompt} />
                    </p>
                    <p className="mt-1 text-muted">Ditt svar: {a ? a.given : 'inget svar'}</p>
                    <p className="mt-1">
                      <RichText text={q.explanation} />
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </Card>
    </div>
  )
}
