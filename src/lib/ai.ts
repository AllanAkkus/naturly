/* Klient för Naturlys egen backend (/api). API-nyckeln finns bara på servern. */
import type { ExplanationMode, Level } from '@/store/settings'

export interface TutorContext {
  page?: string
  moduleTitle?: string
  lessonTitle?: string
  lessonGoal?: string
  lessonSummary?: string[]
  currentQuestion?: string
  level?: Level
  struggling?: string[]
  recentAnswers?: Array<{ concept: string; correct: boolean }>
  nickname?: string
}

export interface ApiMessage {
  role: 'user' | 'assistant'
  content: string
  images?: string[]
}

export class AiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

async function errorFrom(res: Response): Promise<AiError> {
  let msg = 'Något gick fel. Försök igen om en liten stund.'
  try {
    const data = await res.json()
    if (data?.error) msg = data.error
  } catch {
    /* ignorera */
  }
  if (res.status === 429) msg = 'Du har ställt många frågor på kort tid. Ta en liten paus och försök igen om några minuter. 🌿'
  return new AiError(msg, res.status)
}

let healthCache: { ai: boolean; model?: string } | null = null

export async function getHealth(force = false): Promise<{ ai: boolean; model?: string }> {
  if (healthCache && !force) return healthCache
  try {
    const res = await fetch('/api/health')
    if (!res.ok) throw new Error()
    healthCache = await res.json()
  } catch {
    healthCache = { ai: false }
  }
  return healthCache!
}

/** Strömmar svaret från AI-läraren. Anropar onDelta för varje textbit. */
export async function streamChat(
  body: { kind: 'tutor' | 'assignment'; mode: ExplanationMode; messages: ApiMessage[]; context: TutorContext; documentText?: string },
  onDelta: (text: string) => void,
  signal?: AbortSignal,
): Promise<string> {
  let res: Response
  try {
    res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal })
  } catch (e) {
    if ((e as Error).name === 'AbortError') throw e
    throw new AiError('Kunde inte nå Naturlys server. Är backend igång? (npm run dev startar både webb och server.)', 0)
  }
  if (!res.ok || !res.body) throw await errorFrom(res)
  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let full = ''
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    const chunk = decoder.decode(value, { stream: true })
    full += chunk
    onDelta(chunk)
  }
  return full
}

export interface Evaluation {
  verdict: 'korrekt' | 'delvis' | 'inte-annu'
  score: number
  strengths: string[]
  missing: string[]
  misconceptions: string[]
  feedback: string
}

export async function evaluateExplanation(input: { concept: string; question: string; reference: string; answer: string; level: Level }): Promise<Evaluation> {
  const res = await fetch('/api/evaluate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input) })
  if (!res.ok) throw await errorFrom(res)
  return res.json()
}

export async function extractPdf(file: File): Promise<{ text: string; pages: number }> {
  const form = new FormData()
  form.append('file', file)
  const res = await fetch('/api/pdf', { method: 'POST', body: form })
  if (!res.ok) throw await errorFrom(res)
  return res.json()
}

export interface GeneratedQuestion {
  prompt: string
  options: string[]
  correct: number
  explanation: string
}

export async function generateQuestions(input: { topic: string; summary: string[]; level: Level; count: number }): Promise<GeneratedQuestion[]> {
  const res = await fetch('/api/generate-quiz', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input) })
  if (!res.ok) throw await errorFrom(res)
  const data = await res.json()
  return data.questions
}
