import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader2, Send, Sparkles, Trash2, X, AlertCircle } from 'lucide-react'
import { useTutor } from '@/store/tutor'
import { EXPLANATION_MODES, useSettings, type ExplanationMode } from '@/store/settings'
import { useLearningContext } from '@/store/context'
import { streamChat, AiError } from '@/lib/ai'
import { useAiAvailable } from '@/lib/hooks'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/input'
import { Markdown } from './Markdown'
import { useTutorContext } from './useTutorContext'
import { ReadAloud } from '@/components/ReadAloud'
import { cn } from '@/lib/utils'

const QUICK = ['Jag fattar fortfarande inte.', 'Förklara på ett annat sätt.', 'Kan du förklara med köttbullar?', 'Kan du visa en bild?', 'Förhör mig.']

export function TutorWidget() {
  const { open, setOpen, messages, add, update, clear, consumePending, pendingPrompt } = useTutor()
  const { explanationMode, set: setSettings, focusMode } = useSettings()
  const lessonTitle = useLearningContext((s) => s.lessonTitle)
  const buildContext = useTutorContext()
  const ai = useAiAvailable()
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [messages, open])

  useEffect(() => {
    if (open && pendingPrompt && !busy) {
      const p = consumePending()
      if (p) send(p)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, pendingPrompt])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, setOpen])

  const send = async (text: string, mode: ExplanationMode = explanationMode) => {
    const content = text.trim()
    if (!content || busy) return
    setInput('')
    const history = useTutor.getState().messages.filter((m) => !m.error)
    add({ role: 'user', content })
    const id = add({ role: 'assistant', content: '' })
    setBusy(true)
    abortRef.current = new AbortController()
    let acc = ''
    try {
      await streamChat(
        {
          kind: 'tutor',
          mode,
          context: buildContext(),
          messages: [...history.slice(-16).map((m) => ({ role: m.role, content: m.content })), { role: 'user' as const, content }],
        },
        (d) => {
          acc += d
          update(id, { content: acc })
        },
        abortRef.current.signal,
      )
    } catch (e) {
      if ((e as Error).name !== 'AbortError') update(id, { content: e instanceof AiError ? e.message : 'Något gick fel. Försök igen.', error: true })
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            type="button"
            onClick={() => setOpen(true)}
            className={cn(
              'fixed right-4 z-40 flex items-center gap-2 rounded-full bg-primary px-4 py-3 font-medium text-primary-foreground shadow-lg hover:opacity-95 sm:right-6',
              focusMode ? 'bottom-4' : 'bottom-20 lg:bottom-6',
            )}
            aria-label="Öppna AI-läraren Fråga Naturly"
          >
            <Sparkles className="size-5" />
            <span className="hidden sm:inline">Fråga Naturly ✨</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog"
            aria-label="Fråga Naturly – AI-lärare"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 z-50 flex h-[88vh] flex-col rounded-t-3xl border border-border bg-surface shadow-2xl sm:inset-x-auto sm:bottom-6 sm:right-6 sm:h-[min(720px,85vh)] sm:w-[420px] sm:rounded-3xl"
          >
            <header className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-primary-soft text-primary">
                <Sparkles className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-lg font-semibold leading-tight">Fråga Naturly ✨</h2>
                <p className="truncate text-xs text-muted">{lessonTitle ? `Vi pratar om: ${lessonTitle}` : 'Ingen fråga är för enkel.'}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={clear} aria-label="Rensa konversationen" title="Rensa konversationen" disabled={busy || messages.length === 0}>
                <Trash2 />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Stäng">
                <X />
              </Button>
            </header>

            <div className="flex gap-1.5 overflow-x-auto border-b border-border px-3 py-2 scrollbar-thin" role="radiogroup" aria-label="Förklaringsläge">
              {(Object.keys(EXPLANATION_MODES) as ExplanationMode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  role="radio"
                  aria-checked={explanationMode === m}
                  title={EXPLANATION_MODES[m].description}
                  onClick={() => setSettings({ explanationMode: m })}
                  className={cn(
                    'shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium',
                    explanationMode === m ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:bg-surface-2',
                  )}
                >
                  {EXPLANATION_MODES[m].emoji} {EXPLANATION_MODES[m].label}
                </button>
              ))}
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
              {ai === false && (
                <div className="flex gap-2 rounded-2xl bg-amber-soft p-3 text-sm">
                  <AlertCircle className="mt-0.5 size-4 shrink-0" />
                  <div>
                    AI-läraren är inte igång än. Den som har satt upp Naturly behöver lägga in en OpenAI-nyckel i filen <code>.env</code> (se README). Allt annat i appen fungerar
                    ändå – lektioner, övningar och labb.
                  </div>
                </div>
              )}
              {messages.length === 0 && (
                <div className="rounded-2xl bg-primary-soft/60 p-4 text-sm">
                  <p className="font-medium">Hej! Jag är din AI-lärare. 💜</p>
                  <p className="mt-1">Fråga vad du vill – inga frågor är för enkla. Du kan välja hur jag ska förklara ovanför.</p>
                  <p className="mt-2 text-xs text-muted">
                    Jag är en AI och kan ibland ha fel. Om något verkar konstigt, fråga gärna din lärare också. Lämna inte ut personuppgifter i chatten.
                  </p>
                </div>
              )}
              {messages.map((m) => (
                <div key={m.id} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
                  <div
                    className={cn(
                      'max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[0.93rem]',
                      m.role === 'user' ? 'bg-primary text-primary-foreground' : m.error ? 'bg-amber-soft' : 'bg-surface-2',
                    )}
                  >
                    {m.role === 'assistant' && !m.content && busy ? (
                      <Loader2 className="size-4 animate-spin" aria-label="Läraren skriver" />
                    ) : m.role === 'assistant' ? (
                      <>
                        <Markdown text={m.content} />
                        {!busy && !m.error && <ReadAloud text={m.content.replace(/\[\[[^\]]+\]\]/g, '')} className="-ml-2 mt-1" />}
                      </>
                    ) : (
                      m.content
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border p-3">
              <div className="mb-2 flex gap-1.5 overflow-x-auto scrollbar-thin">
                {QUICK.map((q) => (
                  <button
                    key={q}
                    type="button"
                    disabled={busy}
                    onClick={() => send(q, q === 'Förhör mig.' ? 'forhor' : q.includes('bild') ? 'visa' : q.includes('köttbullar') ? 'mat' : explanationMode)}
                    className="shrink-0 rounded-full bg-surface-2 px-2.5 py-1 text-xs hover:bg-primary-soft disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
              <form
                className="flex items-end gap-2"
                onSubmit={(e) => {
                  e.preventDefault()
                  send(input)
                }}
              >
                <Textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      send(input)
                    }
                  }}
                  rows={1}
                  maxLength={2000}
                  placeholder="Skriv din fråga…"
                  aria-label="Din fråga"
                  className="max-h-32 min-h-11 resize-none"
                />
                {busy ? (
                  <Button type="button" variant="outline" size="icon" onClick={() => abortRef.current?.abort()} aria-label="Avbryt">
                    <X />
                  </Button>
                ) : (
                  <Button type="submit" size="icon" disabled={!input.trim()} aria-label="Skicka">
                    <Send />
                  </Button>
                )}
              </form>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  )
}
