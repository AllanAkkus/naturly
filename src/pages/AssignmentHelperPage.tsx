import { useEffect, useRef, useState } from 'react'
import { BookOpenCheck, FileText, ImagePlus, Lightbulb, Loader2, PenLine, Send, ShieldCheck, Sparkles, Trash2, X } from 'lucide-react'
import { streamChat, extractPdf, AiError, type ApiMessage } from '@/lib/ai'
import { useAiAvailable } from '@/lib/hooks'
import { prepareImage, validateFile } from '@/lib/images'
import { useSettings, EXPLANATION_MODES, type ExplanationMode } from '@/store/settings'
import { useLearningContext } from '@/store/context'
import { useTutorContext } from '@/components/tutor/useTutorContext'
import { Markdown } from '@/components/tutor/Markdown'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/input'
import { ReadAloud } from '@/components/ReadAloud'
import { cn } from '@/lib/utils'

interface Msg {
  role: 'user' | 'assistant'
  content: string
  error?: boolean
}

const EXAMPLE = `Vilken isotop symboliserar denna atomkärna?
(Bilden visar en atomkärna med 4 röda protoner och 5 blå neutroner.)
Alternativ: ⁵F, ⁵Be, ⁹Be, ⁴B, ⁹F`

export default function AssignmentHelperPage() {
  const ai = useAiAvailable()
  const mode = useSettings((s) => s.explanationMode)
  const [taskMode, setTaskMode] = useState<ExplanationMode>(mode === 'forhor' ? 'steg' : mode)
  const buildContext = useTutorContext()
  const setCtx = useLearningContext((s) => s.set)
  const [images, setImages] = useState<string[]>([])
  const [docText, setDocText] = useState('')
  const [docName, setDocName] = useState('')
  const [taskText, setTaskText] = useState('')
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [ownAnswer, setOwnAnswer] = useState('')
  const [busy, setBusy] = useState(false)
  const [fileError, setFileError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const started = messages.length > 0

  useEffect(() => setCtx({ page: 'Hjälp med uppgift' }), [setCtx])
  useEffect(() => endRef.current?.scrollIntoView({ block: 'end' }), [messages])

  const addFiles = async (files: FileList | File[]) => {
    setFileError(null)
    for (const file of Array.from(files)) {
      const err = validateFile(file)
      if (err) {
        setFileError(err)
        continue
      }
      if (file.type === 'application/pdf') {
        try {
          setBusy(true)
          const { text, pages } = await extractPdf(file)
          if (!text.trim()) setFileError('PDF:en innehåller ingen läsbar text (den kan vara inskannad). Ta en skärmbild i stället.')
          else {
            setDocText(text)
            setDocName(`${file.name} (${pages} sidor)`)
          }
        } catch (e) {
          setFileError((e as Error).message)
        } finally {
          setBusy(false)
        }
      } else {
        if (images.length >= 4) {
          setFileError('Max 4 bilder per uppgift.')
          break
        }
        try {
          const url = await prepareImage(file)
          setImages((im) => [...im, url].slice(0, 4))
        } catch (e) {
          setFileError((e as Error).message)
        }
      }
    }
  }

  const send = async (text: string, history = messages) => {
    const content = text.trim()
    if (!content || busy) return
    const next: Msg[] = [...history, { role: 'user', content }, { role: 'assistant', content: '' }]
    setMessages(next)
    setInput('')
    setBusy(true)
    const api: ApiMessage[] = next.slice(0, -1).filter((m) => !m.error).map((m, i) => ({ role: m.role, content: m.content, images: i === 0 && images.length ? images : undefined }))
    let acc = ''
    try {
      await streamChat({ kind: 'assignment', mode: taskMode, messages: api, context: buildContext(), documentText: docText || undefined }, (d) => {
        acc += d
        setMessages((ms) => ms.map((m, i) => (i === ms.length - 1 ? { ...m, content: acc } : m)))
      })
    } catch (e) {
      setMessages((ms) => ms.map((m, i) => (i === ms.length - 1 ? { ...m, content: e instanceof AiError ? e.message : 'Något gick fel.', error: true } : m)))
    } finally {
      setBusy(false)
    }
  }

  const start = () => {
    const parts = ['Hjälp mig med den här uppgiften. Guida mig steg för steg och låt mig försöka själv.']
    if (taskText.trim()) parts.push(`Uppgiften:\n${taskText.trim()}`)
    if (images.length) parts.push(`(Jag har bifogat ${images.length === 1 ? 'en bild' : `${images.length} bilder`} av uppgiften.)`)
    if (docName) parts.push(`(Jag har bifogat dokumentet ${docName}.)`)
    send(parts.join('\n\n'), [])
  }

  const reset = () => {
    setMessages([])
    setImages([])
    setDocText('')
    setDocName('')
    setTaskText('')
    setOwnAnswer('')
    setFileError(null)
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-5">
      <header>
        <h1 className="text-3xl font-semibold">Hjälp mig med min uppgift</h1>
        <p className="mt-1 text-muted">Ladda upp en skärmbild, ett foto eller en PDF – eller klistra in texten. Naturly hjälper dig förstå och lösa uppgiften själv.</p>
      </header>

      {ai === false && (
        <Card className="bg-amber-soft p-4 text-sm">
          AI-läraren är inte konfigurerad ännu. Lägg in <code>OPENAI_API_KEY</code> i filen <code>.env</code> och starta om servern (se README). Utan AI kan uppgiftshjälpen inte
          läsa bilder.
        </Card>
      )}

      {!started && (
        <Card
          className="flex flex-col gap-4 p-5"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
            addFiles(e.dataTransfer.files)
          }}
        >
          <div>
            <label htmlFor="task-text" className="mb-1 block text-sm font-medium">
              Uppgiftens text (valfritt om du laddar upp en bild)
            </label>
            <Textarea
              id="task-text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              onPaste={(e) => {
                const files = Array.from(e.clipboardData.files)
                if (files.length) {
                  e.preventDefault()
                  addFiles(files)
                }
              }}
              rows={4}
              maxLength={4000}
              placeholder="Klistra in uppgiften här… (du kan också klistra in en skärmbild)"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif,application/pdf"
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files) addFiles(e.target.files)
                e.target.value = ''
              }}
            />
            <Button variant="outline" onClick={() => fileRef.current?.click()} disabled={busy}>
              <ImagePlus /> Ladda upp bild eller PDF
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setTaskText(EXAMPLE)}>
              Prova med ett exempel
            </Button>
          </div>
          <p className="text-xs text-muted">Bilder: PNG, JPG, WEBP eller GIF, max 8 MB, högst 4 st. PDF: max 8 MB. Du kan också dra och släppa filer här.</p>
          {fileError && <p className="rounded-2xl bg-amber-soft p-3 text-sm">{fileError}</p>}
          {(images.length > 0 || docName) && (
            <div className="flex flex-wrap gap-2">
              {images.map((src, i) => (
                <div key={i} className="relative">
                  <img src={src} alt={`Uppladdad bild ${i + 1}`} className="h-24 w-24 rounded-xl border border-border object-cover" />
                  <button type="button" onClick={() => setImages((im) => im.filter((_, j) => j !== i))} className="absolute -right-2 -top-2 rounded-full bg-surface p-1 shadow" aria-label={`Ta bort bild ${i + 1}`}>
                    <X className="size-3.5" />
                  </button>
                </div>
              ))}
              {docName && (
                <span className="inline-flex items-center gap-2 rounded-xl bg-surface-2 px-3 py-2 text-sm">
                  <FileText className="size-4" /> {docName}
                  <button type="button" onClick={() => (setDocText(''), setDocName(''))} aria-label="Ta bort dokumentet">
                    <X className="size-3.5" />
                  </button>
                </span>
              )}
            </div>
          )}
          <div>
            <p className="mb-1.5 text-sm font-medium">Hur vill du ha förklaringarna?</p>
            <div className="flex flex-wrap gap-1.5">
              {(['superenkelt', 'steg', 'mat', 'visa', 'vanlig', 'provsvar'] as ExplanationMode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  aria-pressed={taskMode === m}
                  onClick={() => setTaskMode(m)}
                  className={cn('rounded-full border px-2.5 py-1 text-xs font-medium', taskMode === m ? 'border-primary bg-primary text-primary-foreground' : 'border-border')}
                >
                  {EXPLANATION_MODES[m].emoji} {EXPLANATION_MODES[m].label}
                </button>
              ))}
            </div>
          </div>
          <Button size="lg" onClick={start} disabled={!ai || busy || (!taskText.trim() && images.length === 0 && !docText)} className="self-start">
            {busy ? <Loader2 className="animate-spin" /> : <Sparkles />} Hjälp mig
          </Button>
          <p className="flex gap-2 text-xs text-muted">
            <ShieldCheck className="size-4 shrink-0" /> Bilder och text skickas till OpenAI för att kunna läsas, men sparas inte i Naturly. Undvik att ladda upp namn, personnummer
            eller annat personligt.
          </p>
        </Card>
      )}

      {started && (
        <>
          <Card className="flex flex-col gap-3 p-4 sm:p-5" aria-live="polite">
            {images.length > 0 && (
              <div className="flex gap-2">
                {images.map((src, i) => (
                  <img key={i} src={src} alt={`Uppgiftsbild ${i + 1}`} className="h-16 w-16 rounded-lg border border-border object-cover" />
                ))}
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
                <div className={cn('max-w-[90%] rounded-2xl px-4 py-3 text-[0.95rem]', m.role === 'user' ? 'bg-primary text-primary-foreground' : m.error ? 'bg-amber-soft' : 'bg-surface-2')}>
                  {m.role === 'assistant' && !m.content && busy ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : m.role === 'assistant' ? (
                    <div className={cn(m.content.startsWith('📘') && 'rounded-xl border-2 border-dashed border-blue p-3')}>
                      <Markdown text={m.content} />
                      {!busy && <ReadAloud text={m.content.replace(/\[\[[^\]]+\]\]/g, '')} className="-ml-2 mt-1" />}
                    </div>
                  ) : (
                    <span className="whitespace-pre-wrap">{m.content}</span>
                  )}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </Card>

          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="soft" disabled={busy} onClick={() => send('Kan jag få en ledtråd?')}>
              <Lightbulb /> Ge mig en ledtråd
            </Button>
            <Button size="sm" variant="soft" disabled={busy} onClick={() => send('Jag förstår inte. Kan du förklara på ett annat sätt?')}>
              Förklara på ett annat sätt
            </Button>
            <Button size="sm" variant="outline" disabled={busy} onClick={() => send('Visa hela lösningen, så att jag kan öva och repetera.')}>
              <BookOpenCheck /> Visa hela lösningen (för övning)
            </Button>
          </div>

          <form
            className="flex items-end gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
          >
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  send(input)
                }
              }}
              rows={2}
              maxLength={2000}
              placeholder="Skriv ditt svar eller din fråga…"
              aria-label="Ditt svar eller din fråga"
            />
            <Button type="submit" size="icon" disabled={busy || !input.trim()} aria-label="Skicka">
              <Send />
            </Button>
          </form>

          <Card className="flex flex-col gap-3 p-5">
            <h2 className="flex items-center gap-2 font-semibold">
              <PenLine className="size-5 text-primary" /> Ditt eget svar
            </h2>
            <p className="text-sm text-muted">Skriv ditt svar med egna ord här. Det är ditt – skilt från AI:ns lösning. Du kan be om feedback innan du lämnar in.</p>
            <Textarea value={ownAnswer} onChange={(e) => setOwnAnswer(e.target.value)} rows={5} maxLength={3000} aria-label="Ditt eget svar" />
            <Button
              variant="soft"
              className="self-start"
              disabled={busy || ownAnswer.trim().length < 5}
              onClick={() => send(`Här är mitt eget svar. Ge mig feedback: vad är bra, vad är fel eller saknas? Skriv inte om det åt mig.\n\n"${ownAnswer.trim()}"`)}
            >
              Få feedback på mitt svar
            </Button>
          </Card>

          <Button variant="ghost" className="self-start" onClick={reset}>
            <Trash2 /> Ny uppgift (rensar allt)
          </Button>
        </>
      )}
    </div>
  )
}
