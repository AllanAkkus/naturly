import { useProgress } from '@/store/progress'
import { usePlanner } from '@/store/planner'
import { useSettings } from '@/store/settings'

const FORMAT = 'naturly-backup'

/** Laddar ned framsteg, planering och inställningar som en JSON-fil. */
export function exportData() {
  const p = useProgress.getState()
  const pl = usePlanner.getState()
  const s = useSettings.getState()
  const data = {
    format: FORMAT,
    version: 1,
    exportedAt: new Date().toISOString(),
    progress: {
      lessons: p.lessons,
      concepts: p.concepts,
      answers: p.answers,
      cards: p.cards,
      exams: p.exams,
      studyLog: p.studyLog,
      savedTerms: p.savedTerms,
      labsDone: p.labsDone,
    },
    planner: { tasks: pl.tasks, pomodoroMinutes: pl.pomodoroMinutes, breakMinutes: pl.breakMinutes },
    settings: Object.fromEntries(Object.entries(s).filter(([, v]) => typeof v !== 'function')),
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `naturly-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

const isObj = (x: unknown): x is Record<string, unknown> => typeof x === 'object' && x !== null && !Array.isArray(x)

/** Läser in en exporterad fil. Returnerar ett meddelande till eleven. */
export async function importData(file: File): Promise<string> {
  if (file.size > 5 * 1024 * 1024) return 'Filen är för stor för att vara en Naturly-säkerhetskopia.'
  try {
    const data = JSON.parse(await file.text())
    if (!isObj(data) || data.format !== FORMAT || !isObj(data.progress)) return 'Det här verkar inte vara en Naturly-fil.'
    const p = data.progress
    useProgress.getState().importData({
      lessons: isObj(p.lessons) ? (p.lessons as never) : {},
      concepts: isObj(p.concepts) ? (p.concepts as never) : {},
      answers: Array.isArray(p.answers) ? (p.answers as never) : [],
      cards: isObj(p.cards) ? (p.cards as never) : {},
      exams: Array.isArray(p.exams) ? (p.exams as never) : [],
      studyLog: isObj(p.studyLog) ? (p.studyLog as never) : {},
      savedTerms: Array.isArray(p.savedTerms) ? (p.savedTerms as string[]).filter((x) => typeof x === 'string') : [],
      labsDone: Array.isArray(p.labsDone) ? (p.labsDone as string[]).filter((x) => typeof x === 'string') : [],
    })
    if (isObj(data.planner) && Array.isArray(data.planner.tasks)) usePlanner.getState().importData({ tasks: data.planner.tasks as never })
    return 'Klart! Dina framsteg är inlästa.'
  } catch {
    return 'Filen kunde inte läsas.'
  }
}
