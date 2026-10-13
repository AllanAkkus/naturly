import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft, HeartHandshake } from 'lucide-react'
import { getLesson, getModule } from '@/content'
import type { TestLesson } from '@/content/types'
import { LessonPlayer } from '@/components/lesson/LessonPlayer'
import { TextbookPage } from '@/components/lesson/TextbookPage'
import { QuizRunner } from '@/components/quiz/QuizRunner'
import { useProgress } from '@/store/progress'
import { useLearningContext } from '@/store/context'
import { Card } from '@/components/ui/card'
import NotFound from './NotFound'

/** /lektion/:id visar lärobokssidan, /lektion/:id/steg den stegvisa träningen. */
export default function LessonPage({ mode = 'book' }: { mode?: 'book' | 'steps' }) {
  const { lessonId } = useParams()
  const [params] = useSearchParams()
  const lesson = getLesson(lessonId ?? '')
  if (!lesson) return <NotFound />
  return (
    <>
      {params.get('franborjan') && (
        <div className="mx-auto mb-4 flex max-w-3xl items-center gap-3 rounded-3xl bg-pink-soft px-5 py-4">
          <HeartHandshake className="size-6 shrink-0 text-pink" />
          <p className="text-lg font-medium">Ingen fara. Vi börjar från början. 💜</p>
        </div>
      )}
      {lesson.kind === 'test' ? (
        <TestView key={lesson.id} test={lesson} />
      ) : mode === 'steps' ? (
        <LessonPlayer key={lesson.id} lesson={lesson} />
      ) : (
        <TextbookPage key={lesson.id} lesson={lesson} />
      )}
    </>
  )
}

function TestView({ test }: { test: TestLesson }) {
  const module = getModule(test.moduleId)!
  const [run, setRun] = useState(0)
  const [mode, setMode] = useState<'practice' | 'exam' | null>(null)
  const { startLesson, completeLesson, setLastVisited } = useProgress()
  const setCtx = useLearningContext((s) => s.set)
  useEffect(() => {
    startLesson(test.id)
    setLastVisited(`/lektion/${test.id}`, test.title)
    setCtx({ moduleTitle: module.title, lessonId: test.id, lessonTitle: test.title, lessonGoal: test.goal })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [test.id])

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-5">
      <Link to={`/modul/${module.id}`} className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground">
        <ArrowLeft className="size-4" /> Kapitel {module.number}: {module.title}
      </Link>
      <header>
        <h1 className="text-3xl font-semibold">{test.title}</h1>
        <p className="mt-2 text-muted">{test.description}</p>
      </header>
      {mode === null ? (
        <Card className="flex flex-col gap-4 p-6">
          <p>
            {test.questions.length} frågor · ca {test.minutes} min. Välj hur du vill göra provet:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={() => setMode('practice')} className="rounded-2xl border border-border p-4 text-left hover:border-primary hover:bg-primary-soft/40">
              <span className="font-semibold">Övningsläge 🌱</span>
              <span className="mt-1 block text-sm text-muted">Du ser förklaringen direkt efter varje fråga.</span>
            </button>
            <button type="button" onClick={() => setMode('exam')} className="rounded-2xl border border-border p-4 text-left hover:border-primary hover:bg-primary-soft/40">
              <span className="font-semibold">Provläge 📝</span>
              <span className="mt-1 block text-sm text-muted">Som ett riktigt prov – förklaringarna kommer i slutet.</span>
            </button>
          </div>
        </Card>
      ) : (
        <QuizRunner
          key={run}
          questions={test.questions}
          title={test.title}
          mode={mode}
          source="exam"
          examId={test.id}
          onFinish={() => completeLesson(test.id, [])}
          onRestart={() => {
            setRun((r) => r + 1)
            setMode(null)
          }}
        />
      )}
    </div>
  )
}
