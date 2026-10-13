import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Clock, PartyPopper } from 'lucide-react'
import { ALL_LESSONS, QUESTION_BANK } from '@/content'
import { useProgress } from '@/store/progress'
import { isDue } from '@/lib/srs'
import { ReviewDeck } from './ReviewPage'
import { QuizRunner } from '@/components/quiz/QuizRunner'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Difficulty } from '@/content/types'

export default function StudySessionPage() {
  const { minutes } = useParams()
  const progress = useProgress()
  const [phase, setPhase] = useState<'cards' | 'quiz' | 'done'>('cards')
  const [left, setLeft] = useState(() => (minutes === '10' ? 600 : 300))
  const nextLesson = ALL_LESSONS.find((l) => progress.lessons[l.id]?.status !== 'completed') ?? ALL_LESSONS[0]
  const started = ALL_LESSONS.find((l) => progress.lessons[l.id]?.status === 'started')

  const dueCount = Object.values(progress.cards).filter((c) => isDue(c)).length
  const moduleId = (started ?? nextLesson).moduleId
  const pool = useMemo(() => {
    const seen = new Set(Object.keys(progress.concepts))
    const inModule = QUESTION_BANK.filter((e) => e.moduleId === moduleId && (seen.has(e.q.concepts[0]) || seen.size === 0)).map((e) => e.q)
    return inModule.length ? inModule : QUESTION_BANK.filter((e) => e.moduleId === moduleId).map((e) => e.q)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleId])

  useEffect(() => {
    if (phase === 'done') return
    const t = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(t)
  }, [phase])

  useEffect(() => {
    if (phase === 'cards' && dueCount === 0) setPhase('quiz')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (minutes === '20' || minutes === 'hel') return <Navigate to={`/lektion/${(started ?? nextLesson).id}`} replace />
  if (minutes !== '5' && minutes !== '10') return <Navigate to="/" replace />

  const questionCount = minutes === '5' ? 3 : 5
  const startLevel: Difficulty = 1

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-5">
      <header className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">{minutes} minuter</h1>
          <p className="text-sm text-muted">{phase === 'cards' ? 'Först några repetitionskort' : phase === 'quiz' ? 'Några korta frågor' : 'Klart!'}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3 py-1.5 text-sm tabular-nums" aria-label="Tid kvar">
          <Clock className="size-4" />
          {Math.floor(left / 60)}:{String(left % 60).padStart(2, '0')}
        </span>
      </header>
      {left === 0 && phase !== 'done' && (
        <Card className="flex flex-wrap items-center justify-between gap-3 bg-primary-soft p-4">
          <p className="text-sm">Tiden är ute – bra jobbat! Vill du fortsätta en stund till eller ta en paus?</p>
          <Button size="sm" variant="outline" onClick={() => setPhase('done')}>
            Ta paus
          </Button>
        </Card>
      )}
      {phase === 'cards' && <ReviewDeck limit={5} onDone={() => setPhase(minutes === '10' ? 'quiz' : 'done')} />}
      {phase === 'quiz' && (
        <QuizRunner questions={[]} adaptive={{ pool, count: questionCount, startLevel }} title={`${minutes}-minuterspass`} mode="practice" source="review" onFinish={() => undefined} />
      )}
      {phase === 'done' && (
        <Card className="flex flex-col items-center gap-3 p-8 text-center">
          <PartyPopper className="size-10 text-primary" />
          <p className="text-xl font-semibold">Snyggt jobbat! 💜</p>
          <p className="text-muted">Korta pass är ett riktigt bra sätt att lära sig. Hjärnan behöver pauser.</p>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link to="/">Till startsidan</Link>
            </Button>
            <Button asChild>
              <Link to={`/lektion/${(started ?? nextLesson).id}`}>Fortsätt med en lektion</Link>
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
