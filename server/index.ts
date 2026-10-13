import 'dotenv/config'
import path from 'node:path'
import OpenAI from 'openai'
import { createApp } from './app'

const apiKey = process.env.OPENAI_API_KEY?.trim()
const hasKey = !!apiKey && apiKey !== 'sk-...'
const port = Number(process.env.PORT) || 8787
const model = process.env.OPENAI_MODEL?.trim() || 'gpt-4o-mini'
const temperature = process.env.OPENAI_TEMPERATURE ? Number(process.env.OPENAI_TEMPERATURE) : undefined

const app = createApp({
  openai: hasKey ? new OpenAI({ apiKey, maxRetries: 2, timeout: 60_000 }) : null,
  model,
  maxUploadMb: Number(process.env.MAX_UPLOAD_MB) || 8,
  rateLimit: Number(process.env.AI_RATE_LIMIT) || 60,
  temperature: Number.isFinite(temperature) ? temperature : undefined,
  staticDir: process.env.NODE_ENV === 'production' ? path.resolve(import.meta.dirname, '..', 'dist') : undefined,
})

app.listen(port, () => {
  console.log(`\n  Naturly API lyssnar på http://localhost:${port}`)
  console.log(hasKey ? `  AI-läraren: på (modell ${model})` : '  AI-läraren: AV – lägg in OPENAI_API_KEY i .env för att aktivera den')
  if (process.env.NODE_ENV === 'production') console.log(`  Webbappen: http://localhost:${port}\n`)
})
