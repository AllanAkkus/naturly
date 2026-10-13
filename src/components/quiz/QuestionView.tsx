import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowUp, Check, Lightbulb, Loader2, RotateCcw, Sparkles, X } from 'lucide-react'
import type { AtomPart, ExplainQuestion, Question } from '@/content/types'
import { gradeExplainOffline, gradeFill, questionTypeLabel, seededShuffle } from '@/lib/grading'
import { describeAtom, getElement } from '@/lib/chemistry'
import { evaluateExplanation, type Evaluation } from '@/lib/ai'
import { useAiAvailable } from '@/lib/hooks'
import { Button } from '@/components/ui/button'
import { Input, Textarea } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { RichText } from '@/components/RichText'
import { ReadAloud } from '@/components/ReadAloud'
import { VisualRenderer } from '@/components/visuals/VisualRenderer'
import { AtomDiagram, NucleusDiagram } from '@/components/visuals/AtomDiagram'
import { DiagramView } from '@/components/visuals/Diagrams'
import { PeriodicGrid } from '@/components/visuals/PeriodicGrid'
import { ParticleCounter } from '@/components/ParticleControls'
import { useSettings } from '@/store/settings'
import { useTutor } from '@/store/tutor'
import { cn } from '@/lib/utils'

export interface AnswerResult {
  correct: boolean
  given: string
}

interface Props {
  question: Question
  /** Anropas en gång, vid första svaret. */
  onAnswered?: (r: AnswerResult) => void
  /** Anropas när eleven går vidare. */
  onContinue?: () => void
  continueLabel?: string
  /** 'immediate' visar förklaring direkt. 'silent' (prov) visar bara att svaret är sparat. */
  feedback?: 'immediate' | 'silent'
  allowRetry?: boolean
  showTypeBadge?: boolean
  compact?: boolean
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

export function QuestionView({ question: q, onAnswered, onContinue, continueLabel = 'Fortsätt', feedback = 'immediate', allowRetry = true, showTypeBadge = true }: Props) {
  const [result, setResult] = useState<AnswerResult | null>(null)
  const [attempt, setAttempt] = useState(0)
  const [reported, setReported] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [extra, setExtra] = useState<{ selectedWrong?: number; evaluation?: Evaluation | null; offline?: ReturnType<typeof gradeExplainOffline> }>({})
  const ask = useTutor((s) => s.ask)

  useEffect(() => {
    setResult(null)
    setAttempt(0)
    setReported(false)
    setShowHint(false)
    setExtra({})
  }, [q.id])

  const submit = (r: AnswerResult, more: typeof extra = {}) => {
    setResult(r)
    setExtra(more)
    if (!reported) {
      setReported(true)
      onAnswered?.(r)
    }
  }

  const retry = () => {
    setResult(null)
    setExtra({})
    setAttempt((a) => a + 1)
  }

  const silent = feedback === 'silent'
  const answered = result !== null

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        {showTypeBadge && <Badge tone="gray">{questionTypeLabel(q)}</Badge>}
        <Badge tone={q.difficulty === 1 ? 'green' : q.difficulty === 2 ? 'blue' : 'pink'}>{q.difficulty === 1 ? 'Grund' : q.difficulty === 2 ? 'Mellan' : 'Utmaning'}</Badge>
        <ReadAloud text={[q.context ?? '', q.prompt, ...(q.type === 'mcq' ? q.options.map((o, i) => `${LETTERS[i]}: ${o}`) : [])]} className="ml-auto" />
      </div>

      {q.context && <p className="rounded-2xl bg-cream-soft p-3 text-sm text-muted">{q.context}</p>}
      <h3 className="text-lg font-semibold leading-snug">
        <RichText text={q.prompt} />
      </h3>

      {q.table && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                {q.table.headers.map((h) => (
                  <th key={h} className="border-b border-border px-2 py-1 text-left font-medium text-muted">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {q.table.rows.map((r, i) => (
                <tr key={i}>
                  {r.map((c, j) => (
                    <td key={j} className="border-b border-border px-2 py-1">
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {q.visual && q.type !== 'hotspot' && (
        <div className="rounded-3xl bg-surface-2/60 p-4">
          {q.visual.kind === 'nucleus' ? <NucleusDiagram protons={q.visual.protons} neutrons={q.visual.neutrons} interactive={false} /> : <VisualRenderer spec={q.visual} />}
        </div>
      )}

      <div key={attempt}>
        <AnswerInput q={q} disabled={answered} onSubmit={submit} />
      </div>

      {!answered && q.hint && (
        <div>
          {showHint ? (
            <p className="flex gap-2 rounded-2xl bg-amber-soft p-3 text-sm">
              <Lightbulb className="mt-0.5 size-4 shrink-0" /> {q.hint}
            </p>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => setShowHint(true)}>
              <Lightbulb /> Visa en ledtråd
            </Button>
          )}
        </div>
      )}

      {answered && silent && (
        <p className="rounded-2xl bg-surface-2 p-3 text-sm text-muted" aria-live="polite">
          Svaret är sparat. Du får se rätt svar och förklaringar när provet är klart.
        </p>
      )}

      {answered && !silent && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn('rounded-3xl p-4', result.correct ? 'bg-green-soft' : 'bg-amber-soft')}
          role="status"
          aria-live="polite"
        >
          <div className="mb-1 flex items-center gap-2 font-semibold">
            {result.correct ? <Check className="size-5 text-green" /> : <Sparkles className="size-5 text-amber" />}
            {result.correct ? 'Rätt! Bra jobbat.' : q.type === 'explain' ? 'Bra försök – här är lite feedback.' : 'Ingen fara! Vi tittar på det tillsammans.'}
          </div>
          {!result.correct && q.type === 'mcq' && extra.selectedWrong !== undefined && q.wrong?.[extra.selectedWrong] && (
            <p className="mb-2 text-sm">{q.wrong[extra.selectedWrong]}</p>
          )}
          {q.type === 'explain' ? <ExplainFeedback q={q} evaluation={extra.evaluation} offline={extra.offline} /> : <p className="text-sm"><RichText text={q.explanation} /></p>}
          {!result.correct && q.type !== 'explain' && <CorrectAnswer q={q} />}
          <div className="mt-3 flex flex-wrap gap-2">
            {!result.correct && allowRetry && (
              <Button variant="outline" size="sm" onClick={retry}>
                <RotateCcw /> Försök igen
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                ask(
                  `Jag jobbar med frågan: "${q.prompt}". ${result.correct ? 'Jag svarade rätt men vill förstå bättre.' : `Jag svarade "${result.given}", vilket var fel.`} Kan du förklara på ett annat sätt?`,
                )
              }
            >
              <Sparkles /> Förklara på ett annat sätt
            </Button>
            {onContinue && (
              <Button size="sm" onClick={onContinue} className="ml-auto">
                {continueLabel}
              </Button>
            )}
          </div>
        </motion.div>
      )}
      {answered && silent && onContinue && (
        <Button onClick={onContinue} className="self-end">
          {continueLabel}
        </Button>
      )}
    </div>
  )
}

function CorrectAnswer({ q }: { q: Question }) {
  let text: string | null = null
  if (q.type === 'mcq') text = `Rätt svar: ${LETTERS[q.correct]}. ${q.options[q.correct]}`
  if (q.type === 'tf') text = `Rätt svar: ${q.correct ? 'Sant' : 'Falskt'}`
  if (q.type === 'fill') text = `Rätt svar: ${q.accept[0]}`
  if (q.type === 'element') text = `Rätt svar: ${getElement(q.answer)?.name} (${getElement(q.answer)?.symbol})`
  if (q.type === 'order') text = `Rätt ordning: ${q.items.join(' → ')}`
  if (q.type === 'match') text = `Rätt par: ${q.pairs.map(([a, b]) => `${a} – ${b}`).join(', ')}`
  if (q.type === 'atom') {
    const t = q.target
    text = `Rätt: ${t.protons} protoner${t.neutrons !== undefined ? `, ${t.neutrons} neutroner` : ''}${t.electrons !== undefined ? `, ${t.electrons} elektroner` : ''}.`
  }
  return text ? <p className="mt-2 text-sm font-medium">{text}</p> : null
}

function ExplainFeedback({ q, evaluation, offline }: { q: ExplainQuestion; evaluation?: Evaluation | null; offline?: ReturnType<typeof gradeExplainOffline> }) {
  return (
    <div className="space-y-2 text-sm">
      {evaluation ? (
        <>
          <p>{evaluation.feedback}</p>
          {evaluation.strengths.length > 0 && (
            <p>
              <strong>Det här var bra:</strong> {evaluation.strengths.join(' ')}
            </p>
          )}
          {evaluation.missing.length > 0 && (
            <p>
              <strong>Lägg gärna till:</strong> {evaluation.missing.join(' ')}
            </p>
          )}
          {evaluation.misconceptions.length > 0 && (
            <p>
              <strong>Tänk på:</strong> {evaluation.misconceptions.join(' ')}
            </p>
          )}
        </>
      ) : offline ? (
        <>
          {offline.matched.length > 0 && (
            <p>
              <strong>Du nämnde:</strong> {offline.matched.join(', ')}.
            </p>
          )}
          {offline.missing.length > 0 && (
            <p>
              <strong>Försök också få med:</strong> {offline.missing.join(', ')}.
            </p>
          )}
          <p className="text-xs text-muted">Snabbkoll av nyckelord (AI-bedömning är inte tillgänglig just nu). Jämför med exemplet nedan.</p>
        </>
      ) : null}
      <div className="rounded-2xl bg-surface/70 p-3">
        <strong>Exempel på ett bra svar:</strong> <RichText text={q.reference} />
      </div>
    </div>
  )
}

/* ─────────────── Svarsinmatning per frågetyp ─────────────── */

function AnswerInput({ q, disabled, onSubmit }: { q: Question; disabled: boolean; onSubmit: (r: AnswerResult, extra?: Record<string, unknown>) => void }) {
  switch (q.type) {
    case 'mcq':
      return <McqInput q={q} disabled={disabled} onSubmit={onSubmit} />
    case 'tf':
      return (
        <div className="grid grid-cols-2 gap-2">
          {[true, false].map((v) => (
            <Button key={String(v)} variant="outline" size="lg" disabled={disabled} onClick={() => onSubmit({ correct: v === q.correct, given: v ? 'Sant' : 'Falskt' })}>
              {v ? 'Sant' : 'Falskt'}
            </Button>
          ))}
        </div>
      )
    case 'fill':
      return <FillInput q={q} disabled={disabled} onSubmit={onSubmit} />
    case 'match':
      return <MatchInput q={q} disabled={disabled} onSubmit={onSubmit} />
    case 'order':
      return <OrderInput q={q} disabled={disabled} onSubmit={onSubmit} />
    case 'explain':
      return <ExplainInput q={q} disabled={disabled} onSubmit={onSubmit} />
    case 'atom':
      return <AtomInput q={q} disabled={disabled} onSubmit={onSubmit} />
    case 'element':
      return <ElementInput q={q} disabled={disabled} onSubmit={onSubmit} />
    case 'hotspot':
      return <HotspotInput q={q} disabled={disabled} onSubmit={onSubmit} />
  }
}

type InputProps<T extends Question['type']> = { q: Extract<Question, { type: T }>; disabled: boolean; onSubmit: (r: AnswerResult, extra?: Record<string, unknown>) => void }

function McqInput({ q, disabled, onSubmit }: InputProps<'mcq'>) {
  const [picked, setPicked] = useState<number | null>(null)
  return (
    <div className="grid gap-2" role="radiogroup" aria-label="Svarsalternativ">
      {q.options.map((opt, i) => {
        const isPicked = picked === i
        const showCorrect = disabled && i === q.correct && isPicked
        const showWrong = disabled && isPicked && i !== q.correct
        return (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={isPicked}
            disabled={disabled}
            onClick={() => {
              setPicked(i)
              onSubmit({ correct: i === q.correct, given: opt }, { selectedWrong: i === q.correct ? undefined : i })
            }}
            className={cn(
              'flex items-center gap-3 rounded-2xl border px-4 py-3 text-left text-[0.95rem] transition-colors',
              !disabled && 'hover:border-primary hover:bg-primary-soft/50',
              showCorrect && 'border-green bg-green-soft',
              showWrong && 'border-amber bg-amber-soft',
              !showCorrect && !showWrong && 'border-border bg-surface',
            )}
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-surface-2 text-sm font-semibold">{LETTERS[i]}</span>
            <RichText text={opt} />
            {showCorrect && <Check className="ml-auto size-5 text-green" />}
            {showWrong && <X className="ml-auto size-5 text-amber" />}
          </button>
        )
      })}
    </div>
  )
}

function FillInput({ q, disabled, onSubmit }: InputProps<'fill'>) {
  const [v, setV] = useState('')
  const go = () => v.trim() && onSubmit({ correct: gradeFill(q, v), given: v })
  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => {
        e.preventDefault()
        go()
      }}
    >
      <Input value={v} onChange={(e) => setV(e.target.value)} disabled={disabled} placeholder="Skriv ditt svar…" aria-label="Ditt svar" inputMode={q.numeric ? 'decimal' : 'text'} autoComplete="off" />
      <Button type="submit" disabled={disabled || !v.trim()}>
        Kontrollera
      </Button>
    </form>
  )
}

function MatchInput({ q, disabled, onSubmit }: InputProps<'match'>) {
  // Högerledet kan innehålla samma text flera gånger (t.ex. sortera i kategorier), så vi spårar position.
  const rights = useMemo(() => seededShuffle(q.pairs.map((p, i) => ({ text: p[1], key: i })), q.id), [q])
  const [left, setLeft] = useState<number | null>(null)
  const [pairs, setPairs] = useState<Record<number, number>>({})
  const used = new Set(Object.values(pairs))
  const done = Object.keys(pairs).length === q.pairs.length
  const textOf = (k: number) => q.pairs[k][1]
  const check = () => {
    const correct = q.pairs.every(([, r], i) => pairs[i] !== undefined && textOf(pairs[i]) === r)
    onSubmit({ correct, given: q.pairs.map(([l], i) => `${l} – ${pairs[i] !== undefined ? textOf(pairs[i]) : '?'}`).join(', ') })
  }
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted">Klicka först på något i vänster kolumn och sedan på det som hör ihop i höger kolumn.</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          {q.pairs.map(([l], i) => (
            <button
              key={i}
              type="button"
              disabled={disabled}
              aria-pressed={left === i}
              onClick={() => setLeft(i)}
              className={cn('rounded-2xl border px-3 py-2.5 text-left text-sm', left === i ? 'border-primary bg-primary-soft' : pairs[i] !== undefined ? 'border-green bg-green-soft/60' : 'border-border bg-surface')}
            >
              <RichText text={l} />
              {pairs[i] !== undefined && <span className="mt-0.5 block text-xs text-muted">→ {textOf(pairs[i])}</span>}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {rights.map((r) => (
            <button
              key={r.key}
              type="button"
              disabled={disabled || left === null}
              onClick={() => {
                if (left === null) return
                setPairs((p) => {
                  const next = Object.fromEntries(Object.entries(p).filter(([, v]) => v !== r.key)) as Record<number, number>
                  return { ...next, [left]: r.key }
                })
                setLeft(null)
              }}
              className={cn('rounded-2xl border px-3 py-2.5 text-left text-sm', used.has(r.key) ? 'border-green/50 bg-green-soft/40' : 'border-border bg-surface', left !== null && 'hover:border-primary')}
            >
              <RichText text={r.text} />
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={check} disabled={disabled || !done}>
          Kontrollera
        </Button>
        <Button variant="ghost" onClick={() => setPairs({})} disabled={disabled}>
          Rensa
        </Button>
      </div>
    </div>
  )
}

function OrderInput({ q, disabled, onSubmit }: InputProps<'order'>) {
  const [items, setItems] = useState(() => {
    let s = seededShuffle(q.items, q.id)
    if (s.every((x, i) => x === q.items[i])) s = [...s.slice(1), s[0]]
    return s
  })
  const move = (i: number, d: -1 | 1) =>
    setItems((arr) => {
      const j = i + d
      if (j < 0 || j >= arr.length) return arr
      const copy = [...arr]
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
      return copy
    })
  return (
    <div className="flex flex-col gap-3">
      <ol className="flex flex-col gap-2">
        {items.map((it, i) => (
          <li key={it} className="flex items-center gap-2 rounded-2xl border border-border bg-surface px-3 py-2 text-sm">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-surface-2 text-xs font-semibold">{i + 1}</span>
            <span className="flex-1">
              <RichText text={it} />
            </span>
            <button type="button" onClick={() => move(i, -1)} disabled={disabled || i === 0} className="rounded-lg p-1.5 hover:bg-surface-2 disabled:opacity-30" aria-label={`Flytta "${it}" uppåt`}>
              <ArrowUp className="size-4" />
            </button>
            <button type="button" onClick={() => move(i, 1)} disabled={disabled || i === items.length - 1} className="rounded-lg p-1.5 hover:bg-surface-2 disabled:opacity-30" aria-label={`Flytta "${it}" nedåt`}>
              <ArrowDown className="size-4" />
            </button>
          </li>
        ))}
      </ol>
      <Button className="self-start" disabled={disabled} onClick={() => onSubmit({ correct: items.every((x, i) => x === q.items[i]), given: items.join(' → ') })}>
        Kontrollera ordningen
      </Button>
    </div>
  )
}

function ExplainInput({ q, disabled, onSubmit }: InputProps<'explain'>) {
  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)
  const ai = useAiAvailable()
  const level = useSettings((s) => s.level)
  const go = async () => {
    const offline = gradeExplainOffline(q, text)
    if (ai) {
      setBusy(true)
      try {
        const evaluation = await evaluateExplanation({ concept: q.concepts[0], question: q.prompt, reference: q.reference, answer: text, level })
        onSubmit({ correct: evaluation.verdict === 'korrekt', given: text }, { evaluation, offline })
        return
      } catch {
        /* faller tillbaka på nyckelordskoll */
      } finally {
        setBusy(false)
      }
    }
    onSubmit({ correct: offline.passed, given: text }, { offline, evaluation: null })
  }
  return (
    <div className="flex flex-col gap-2">
      <Textarea value={text} onChange={(e) => setText(e.target.value)} disabled={disabled || busy} placeholder="Förklara med dina egna ord. Det gör inget om det inte blir perfekt!" aria-label="Din förklaring" rows={4} />
      <div className="flex items-center gap-2">
        <Button onClick={go} disabled={disabled || busy || text.trim().length < 5}>
          {busy ? <Loader2 className="animate-spin" /> : <Check />} Bedöm mitt svar
        </Button>
        <span className="text-xs text-muted">{ai ? 'AI-läraren ger personlig feedback.' : ai === false ? 'Snabbkoll av nyckelord.' : ''}</span>
      </div>
    </div>
  )
}

function AtomInput({ q, disabled, onSubmit }: InputProps<'atom'>) {
  const [p, setP] = useState(0)
  const [n, setN] = useState(0)
  const [e, setE] = useState(0)
  const d = describeAtom(p, n, e)
  const t = q.target
  const check = () => {
    const ok = p === t.protons && (t.neutrons === undefined || n === t.neutrons) && (t.electrons === undefined || e === t.electrons)
    onSubmit({ correct: ok, given: `${p} p, ${n} n, ${e} e` })
  }
  return (
    <div className="grid gap-4 md:grid-cols-[1fr_auto]">
      <div className="flex flex-col gap-2">
        <ParticleCounter label="Protoner" value={p} onChange={setP} max={36} color="var(--proton)" />
        <ParticleCounter label="Neutroner" value={n} onChange={setN} max={50} color="var(--neutron)" />
        <ParticleCounter label="Elektroner" value={e} onChange={setE} max={40} color="var(--electron)" />
        <div className="rounded-2xl bg-surface-2 p-3 text-sm" aria-live="polite">
          {d.element ? (
            <>
              <strong>{d.element.name}</strong> · masstal {d.massNumber} · laddning {d.charge > 0 ? `+${d.charge}` : d.charge} · {d.kind}
            </>
          ) : (
            'Lägg till protoner för att välja grundämne.'
          )}
        </div>
        <Button onClick={check} disabled={disabled || p === 0} className="self-start">
          Kontrollera min atom
        </Button>
      </div>
      <AtomDiagram protons={p} neutrons={n} electrons={e} size={200} interactive={false} />
    </div>
  )
}

function ElementInput({ q, disabled, onSubmit }: InputProps<'element'>) {
  const [picked, setPicked] = useState<number | null>(null)
  return (
    <div className="flex flex-col gap-2">
      <PeriodicGrid
        compact
        selected={picked}
        correctZ={disabled ? q.answer : null}
        wrongZ={disabled && picked !== q.answer ? picked : null}
        onSelect={(el) => {
          if (disabled) return
          setPicked(el.z)
          onSubmit({ correct: el.z === q.answer, given: `${el.name} (${el.symbol})` })
        }}
      />
      <p className="text-xs text-muted">Tips: på en liten skärm kan du scrolla tabellen i sidled.</p>
    </div>
  )
}

function HotspotInput({ q, disabled, onSubmit }: InputProps<'hotspot'>) {
  const [picked, setPicked] = useState<string | null>(null)
  const handle = (part: string) => {
    if (disabled) return
    setPicked(part)
    onSubmit({ correct: part === q.answer, given: part })
  }
  const v = q.visual
  return (
    <div className="flex flex-col items-center gap-2 rounded-3xl bg-surface-2/60 p-4">
      {v.kind === 'atom' ? (
        <AtomDiagram protons={v.protons} neutrons={v.neutrons} electrons={v.electrons} showInfo={false} showButtons={false} onPartClick={(p: AtomPart) => handle(p)} selectedPart={picked as AtomPart | null} />
      ) : v.kind === 'nucleus' ? (
        <NucleusDiagram protons={v.protons} neutrons={v.neutrons} onPartClick={(p) => handle(p)} />
      ) : v.kind === 'diagram' ? (
        <DiagramView id={v.id} quiz onPartClick={handle} selectedPart={picked} />
      ) : (
        <VisualRenderer spec={v} />
      )}
    </div>
  )
}
