import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { GraduationCap, Loader2, Send } from 'lucide-react'
import { ALL_LESSONS, getLesson, MODULES } from '@/content'
import type { Lesson } from '@/content/types'
import { evaluateExplanation, type Evaluation } from '@/lib/ai'
import { useAiAvailable } from '@/lib/hooks'
import { useProgress } from '@/store/progress'
import { useSettings } from '@/store/settings'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { RichText } from '@/components/RichText'

/** "Förklara med egna ord": eleven lär ut begreppet till AI:n och får mild, specifik feedback. */
export default function ExplainPage() {
  const [params, setParams] = useSearchParams()
  const lessons = ALL_LESSONS.filter((l): l is Lesson => l.kind === 'lesson')
  const lesson = (getLesson(params.get('begrepp') ?? '') as Lesson | undefined) ?? lessons[0]
  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState<Evaluation | null>(null)
  const [error, setError] = useState<string | null>(null)
  const ai = useAiAvailable()
  const level = useSettings((s) => s.level)
  const { markExplained, recordAnswer } = useProgress()

  const submit = async () => {
    setBusy(true)
    setError(null)
    setResult(null)
    try {
      const r = await evaluateExplanation({
        concept: lesson.title,
        question: `Förklara med egna ord: ${lesson.title}`,
        reference: `${lesson.simple.join(' ')} ${lesson.summary.join(' ')}`,
        answer: text,
        level,
      })
      setResult(r)
      recordAnswer({ questionId: `explain-${lesson.id}`, concepts: [lesson.id], correct: r.verdict === 'korrekt', difficulty: 3, source: 'review', given: text.slice(0, 120) })
      if (r.verdict === 'korrekt') markExplained(lesson.id)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setBusy(false)
    }
  }

  const selfCheck = () => {
    markExplained(lesson.id)
    setResult({ verdict: 'korrekt', score: 1, strengths: [], missing: [], misconceptions: [], feedback: 'Du har jämfört din förklaring med sammanfattningen och tycker att du fick med det viktigaste. Snyggt!' })
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-5">
      <header>
        <h1 className="flex items-center gap-2 text-3xl font-semibold">
          <GraduationCap className="size-8 text-primary" /> Förklara med egna ord
        </h1>
        <p className="mt-1 text-muted">Det bästa sättet att lära sig är att lära ut. Förklara begreppet som om du pratade med en kompis.</p>
      </header>
      <label className="text-sm">
        <span className="mb-1 block font-medium">Begrepp</span>
        <select
          value={lesson.id}
          onChange={(e) => {
            setParams({ begrepp: e.target.value })
            setResult(null)
            setText('')
          }}
          className="h-11 w-full rounded-xl border border-border bg-surface px-3"
        >
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
      <Card className="flex flex-col gap-3 p-5">
        <p className="font-medium">Förklara: {lesson.title.replace(/\?$/, '')}</p>
        <p className="text-sm text-muted">Tips: Vad är det? Varför är det så? Ge gärna ett exempel.</p>
        <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={6} placeholder="Skriv din förklaring här…" aria-label="Din förklaring" maxLength={3000} />
        <div className="flex flex-wrap gap-2">
          {ai !== false ? (
            <Button onClick={submit} disabled={busy || text.trim().length < 15 || ai === null}>
              {busy ? <Loader2 className="animate-spin" /> : <Send />} Låt Naturly bedöma
            </Button>
          ) : (
            <Button onClick={selfCheck} disabled={text.trim().length < 15}>
              Jämför själv med sammanfattningen
            </Button>
          )}
        </div>
        {ai === false && <p className="text-xs text-muted">AI-bedömning är inte påslagen. Du kan jämföra din förklaring med sammanfattningen nedan.</p>}
        {error && <p className="rounded-2xl bg-amber-soft p-3 text-sm">{error}</p>}
      </Card>

      {(result || ai === false) && (
        <Card className="flex flex-col gap-3 p-5">
          {result && (
            <>
              <Badge tone={result.verdict === 'korrekt' ? 'green' : result.verdict === 'delvis' ? 'blue' : 'amber'} className="self-start">
                {result.verdict === 'korrekt' ? 'Du kan förklara det själv!' : result.verdict === 'delvis' ? 'På god väg' : 'Inte riktigt än – och det är okej'}
              </Badge>
              <p>{result.feedback}</p>
              {result.strengths.length > 0 && <List title="Det här var bra" items={result.strengths} />}
              {result.missing.length > 0 && <List title="Lägg gärna till" items={result.missing} />}
              {result.misconceptions.length > 0 && <List title="Tänk på" items={result.misconceptions} />}
            </>
          )}
          <div className="rounded-2xl bg-surface-2 p-3 text-sm">
            <p className="mb-1 font-semibold">Sammanfattning från lektionen</p>
            <ul className="list-disc space-y-0.5 pl-5">
              {lesson.summary.map((s) => (
                <li key={s}>
                  <RichText text={s} />
                </li>
              ))}
            </ul>
          </div>
        </Card>
      )}
    </div>
  )
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="text-sm">
      <p className="font-semibold">{title}</p>
      <ul className="list-disc pl-5">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  )
}
