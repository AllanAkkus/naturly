import express, { type NextFunction, type Request, type Response } from 'express'
import rateLimit from 'express-rate-limit'
import multer from 'multer'
import path from 'node:path'
import fs from 'node:fs'
import type OpenAI from 'openai'
import { buildSystemPrompt, EVALUATE_PROMPT, QUIZ_PROMPT, type Context, type Mode } from './prompts'
import { clean, cleanList, isPdf, LEVELS, MODES, validateImage, wrapDocument } from './security'

type ChatClient = Pick<OpenAI, 'chat'>

export interface AppOptions {
  openai: ChatClient | null
  model: string
  maxUploadMb: number
  rateLimit: number
  staticDir?: string
  temperature?: number
  log?: (...args: unknown[]) => void
}

const FRIENDLY = {
  noKey: 'AI-läraren är inte konfigurerad ännu. Lägg in OPENAI_API_KEY i filen .env och starta om servern.',
  generic: 'AI-läraren kunde inte svara just nu. Försök igen om en liten stund. 🌿',
  busy: 'AI-tjänsten har mycket att göra just nu. Vänta en minut och försök igen.',
  badInput: 'Frågan kunde inte skickas. Kontrollera texten eller bilden och försök igen.',
  image: 'Bilden kunde inte läsas. Använd PNG, JPG, WEBP eller GIF som är mindre än gränsen.',
}

function friendlyError(err: unknown): { status: number; message: string } {
  const status = (err as { status?: number })?.status
  if (status === 429) return { status: 503, message: FRIENDLY.busy }
  if (status === 401 || status === 403) return { status: 503, message: 'AI-läraren kunde inte logga in hos OpenAI. Kontrollera API-nyckeln i .env.' }
  if (status === 400) return { status: 400, message: FRIENDLY.badInput }
  return { status: 502, message: FRIENDLY.generic }
}

function parseContext(raw: unknown): Context {
  const c = (raw ?? {}) as Record<string, unknown>
  const answers = Array.isArray(c.recentAnswers)
    ? c.recentAnswers.slice(0, 10).map((a) => ({ concept: clean((a as { concept?: unknown }).concept, 80), correct: Boolean((a as { correct?: unknown }).correct) }))
    : []
  const level = clean(c.level, 20)
  return {
    page: clean(c.page, 80) || undefined,
    moduleTitle: clean(c.moduleTitle, 120) || undefined,
    lessonTitle: clean(c.lessonTitle, 120) || undefined,
    lessonGoal: clean(c.lessonGoal, 200) || undefined,
    lessonSummary: cleanList(c.lessonSummary, 6, 200),
    currentQuestion: clean(c.currentQuestion, 500) || undefined,
    level: (LEVELS as readonly string[]).includes(level) ? level : undefined,
    struggling: cleanList(c.struggling, 8, 80),
    recentAnswers: answers,
    nickname: clean(c.nickname, 30) || undefined,
  }
}

function extractJson(text: string): unknown {
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  if (start < 0 || end < start) throw new Error('No JSON')
  return JSON.parse(text.slice(start, end + 1))
}

export function createApp(opts: AppOptions) {
  const app = express()
  const log = opts.log ?? console.error
  const maxBytes = opts.maxUploadMb * 1024 * 1024
  app.disable('x-powered-by')

  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('Referrer-Policy', 'no-referrer')
    res.setHeader('X-Frame-Options', 'DENY')
    res.setHeader('Permissions-Policy', 'camera=(self), microphone=()')
    next()
  })
  app.use('/api', express.json({ limit: `${Math.ceil(opts.maxUploadMb * 1.4 * 4)}mb` }))

  const aiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: opts.rateLimit,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { error: 'Du har ställt många frågor på kort tid. Ta en liten paus och försök igen om några minuter. 🌿' },
  })

  const extraParams = () => (opts.temperature !== undefined ? { temperature: opts.temperature } : {})

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, ai: !!opts.openai, model: opts.openai ? opts.model : undefined })
  })

  /* ─────────── Chatt (AI-läraren och uppgiftshjälpen) ─────────── */
  app.post('/api/chat', aiLimiter, async (req: Request, res: Response) => {
    if (!opts.openai) return res.status(503).json({ error: FRIENDLY.noKey })
    const body = req.body ?? {}
    const kind = body.kind === 'assignment' ? 'assignment' : 'tutor'
    const mode: Mode = (MODES as readonly string[]).includes(body.mode) ? body.mode : 'vanlig'
    if (!Array.isArray(body.messages) || body.messages.length === 0 || body.messages.length > 40) return res.status(400).json({ error: FRIENDLY.badInput })

    let imageCount = 0
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = []
    for (const m of body.messages.slice(-24)) {
      const role = m?.role === 'assistant' ? 'assistant' : 'user'
      const text = clean(m?.content, role === 'user' ? 4000 : 6000)
      const rawImages: unknown[] = role === 'user' && Array.isArray(m?.images) ? m.images : []
      if (rawImages.length) {
        const parts: OpenAI.Chat.Completions.ChatCompletionContentPart[] = []
        if (text) parts.push({ type: 'text', text })
        for (const img of rawImages) {
          if (++imageCount > 4) return res.status(400).json({ error: 'Max 4 bilder per uppgift.' })
          const valid = validateImage(img, maxBytes)
          if (!valid) return res.status(400).json({ error: FRIENDLY.image })
          parts.push({ type: 'image_url', image_url: { url: valid, detail: 'high' } })
        }
        messages.push({ role: 'user', content: parts })
      } else if (text) {
        messages.push(role === 'assistant' ? { role: 'assistant', content: text } : { role: 'user', content: text })
      }
    }
    if (!messages.length || messages[messages.length - 1].role !== 'user') return res.status(400).json({ error: FRIENDLY.badInput })

    const docText = clean(body.documentText, 15000)
    const system = buildSystemPrompt(kind, mode, parseContext(body.context))
    const full: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [{ role: 'system', content: system }]
    if (docText) full.push({ role: 'user', content: wrapDocument(docText) })
    full.push(...messages)

    const controller = new AbortController()
    res.on('close', () => {
      if (!res.writableEnded) controller.abort()
    })

    try {
      const stream = await opts.openai.chat.completions.create(
        { model: opts.model, messages: full, stream: true, max_completion_tokens: 1200, ...extraParams() },
        { signal: controller.signal },
      )
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      res.setHeader('Cache-Control', 'no-store')
      res.setHeader('X-Accel-Buffering', 'no')
      for await (const chunk of stream) {
        const delta = chunk.choices?.[0]?.delta?.content
        if (delta) res.write(delta)
      }
      res.end()
    } catch (err) {
      if (controller.signal.aborted) return
      log('[chat]', (err as Error)?.message)
      const { status, message } = friendlyError(err)
      if (!res.headersSent) res.status(status).json({ error: message })
      else {
        res.write(`\n\n_(${message})_`)
        res.end()
      }
    }
  })

  /* ─────────── Bedöm "Förklara med egna ord" ─────────── */
  app.post('/api/evaluate', aiLimiter, async (req, res) => {
    if (!opts.openai) return res.status(503).json({ error: FRIENDLY.noKey })
    const question = clean(req.body?.question, 600)
    const reference = clean(req.body?.reference, 1500)
    const answer = clean(req.body?.answer, 3000)
    const concept = clean(req.body?.concept, 120)
    const level = clean(req.body?.level, 20)
    if (!answer || !question) return res.status(400).json({ error: FRIENDLY.badInput })
    try {
      const out = await opts.openai.chat.completions.create({
        model: opts.model,
        response_format: { type: 'json_object' },
        max_completion_tokens: 600,
        ...extraParams(),
        messages: [
          { role: 'system', content: EVALUATE_PROMPT },
          {
            role: 'user',
            content: `Begrepp: ${concept}\nNivå: ${level}\nFråga: ${question}\nExempel på korrekt svar (facit): ${reference}\n\n<elevens_svar>\n${answer}\n</elevens_svar>`,
          },
        ],
      })
      const data = extractJson(out.choices[0]?.message?.content ?? '') as Record<string, unknown>
      const verdict = ['korrekt', 'delvis', 'inte-annu'].includes(data.verdict as string) ? data.verdict : 'delvis'
      res.json({
        verdict,
        score: Math.max(0, Math.min(1, Number(data.score) || 0)),
        strengths: cleanList(data.strengths, 3, 300),
        missing: cleanList(data.missing, 3, 300),
        misconceptions: cleanList(data.misconceptions, 3, 300),
        feedback: clean(data.feedback, 800) || 'Tack för ditt svar!',
      })
    } catch (err) {
      log('[evaluate]', (err as Error)?.message)
      const { status, message } = friendlyError(err)
      res.status(status).json({ error: message })
    }
  })

  /* ─────────── Skapa extra övningsfrågor ─────────── */
  app.post('/api/generate-quiz', aiLimiter, async (req, res) => {
    if (!opts.openai) return res.status(503).json({ error: FRIENDLY.noKey })
    const topic = clean(req.body?.topic, 160)
    const summary = cleanList(req.body?.summary, 8, 240)
    const level = clean(req.body?.level, 20)
    const count = Math.max(1, Math.min(8, Number(req.body?.count) || 5))
    if (!topic) return res.status(400).json({ error: FRIENDLY.badInput })
    try {
      const out = await opts.openai.chat.completions.create({
        model: opts.model,
        response_format: { type: 'json_object' },
        max_completion_tokens: 1800,
        ...extraParams(),
        messages: [
          { role: 'system', content: QUIZ_PROMPT },
          { role: 'user', content: `Ämne: ${topic}\nNivå: ${level}\nViktiga punkter: ${summary.join(' | ')}\nAntal frågor: ${count}` },
        ],
      })
      const data = extractJson(out.choices[0]?.message?.content ?? '') as { questions?: unknown[] }
      const questions = (data.questions ?? [])
        .map((q) => {
          const x = q as Record<string, unknown>
          const options = cleanList(x.options, 4, 200)
          const correct = Number(x.correct)
          return { prompt: clean(x.prompt, 400), options, correct, explanation: clean(x.explanation, 600) }
        })
        .filter((q) => q.prompt && q.options.length >= 3 && Number.isInteger(q.correct) && q.correct >= 0 && q.correct < q.options.length)
        .slice(0, count)
      if (!questions.length) throw new Error('No valid questions')
      res.json({ questions })
    } catch (err) {
      log('[generate-quiz]', (err as Error)?.message)
      const { status, message } = friendlyError(err)
      res.status(status).json({ error: message })
    }
  })

  /* ─────────── PDF → text ─────────── */
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: maxBytes, files: 1 },
    fileFilter: (_req, file, cb) => cb(null, file.mimetype === 'application/pdf'),
  })
  app.post('/api/pdf', aiLimiter, upload.single('file'), async (req, res) => {
    const file = req.file
    if (!file || !isPdf(file.buffer)) return res.status(400).json({ error: 'Filen måste vara en PDF.' })
    try {
      const { extractText, getDocumentProxy } = await import('unpdf')
      const pdf = await getDocumentProxy(new Uint8Array(file.buffer))
      const { text, totalPages } = await extractText(pdf, { mergePages: true })
      const merged = Array.isArray(text) ? text.join('\n') : text
      res.json({ text: clean(merged, 15000), pages: totalPages })
    } catch (err) {
      log('[pdf]', (err as Error)?.message)
      res.status(400).json({ error: 'PDF-filen kunde inte läsas. Prova att ta en skärmbild i stället.' })
    }
  })

  app.use('/api', (_req, res) => res.status(404).json({ error: 'Okänd adress.' }))

  // Fel från multer (t.ex. för stor fil) och JSON-tolkning
  app.use((err: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (!err) return next()
    const code = (err as { code?: string; type?: string }).code ?? (err as { type?: string }).type
    if (code === 'LIMIT_FILE_SIZE' || code === 'entity.too.large') return res.status(413).json({ error: `Filen är för stor. Max ${opts.maxUploadMb} MB.` })
    if (code === 'entity.parse.failed') return res.status(400).json({ error: FRIENDLY.badInput })
    log('[error]', (err as Error)?.message)
    res.status(500).json({ error: FRIENDLY.generic })
  })

  /* ─────────── Produktionsläge: servera den byggda appen ─────────── */
  if (opts.staticDir && fs.existsSync(opts.staticDir)) {
    const dir = opts.staticDir
    app.use(express.static(dir, { index: false, maxAge: '1h' }))
    app.use((req, res, next) => {
      if (req.method !== 'GET' || req.path.startsWith('/api')) return next()
      res.sendFile(path.join(dir, 'index.html'))
    })
  }

  return app
}
