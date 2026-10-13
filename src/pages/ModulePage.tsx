import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check, ClipboardCheck, Clock, PlayCircle } from 'lucide-react'
import { getModule } from '@/content'
import { AREA_LABELS } from '@/content/curriculum'
import { useProgress } from '@/store/progress'
import { masteryStatus, MASTERY_LABELS } from '@/lib/mastery'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ModuleIcon, moduleProgress } from '@/components/CourseJourney'
import { TONE_BG } from '@/components/visuals/Generic'
import { SIMULATION_LIST } from '@/components/lab/registry'
import { cn } from '@/lib/utils'
import NotFound from './NotFound'

const STATUS_TONE = { 'not-started': 'gray', learning: 'blue', 'needs-review': 'pink', 'can-explain': 'green' } as const

export default function ModulePage() {
  const { moduleId } = useParams()
  const m = getModule(moduleId ?? '')
  const { lessons, concepts } = useProgress()
  if (!m) return <NotFound />
  const p = moduleProgress(m, lessons)
  const sims = SIMULATION_LIST.filter((s) => s.moduleId === m.id)
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <Link to="/kurs" className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground">
        <ArrowLeft className="size-4" /> Alla moduler
      </Link>
      <header className={cn('rounded-3xl p-6', TONE_BG[m.tone])}>
        <div className="flex items-start gap-4">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-surface/70">
            <ModuleIcon name={m.icon} className="size-7" />
          </span>
          <div>
            <p className="text-sm text-muted">Modul {m.number}</p>
            <h1 className="text-3xl font-semibold">{m.title}</h1>
            <p className="mt-2 max-w-2xl">{m.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {m.areas.map((a) => (
                <Badge key={a} tone="cream">
                  {AREA_LABELS[a]}
                </Badge>
              ))}
              {m.status === 'in-progress' && <Badge tone="amber">Under arbete</Badge>}
            </div>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-3">
          <Progress value={p.pct} />
          <span className="shrink-0 text-sm tabular-nums">
            {p.done}/{p.total} klara
          </span>
        </div>
      </header>

      <ol className="flex flex-col gap-2">
        {m.lessons.map((l, i) => {
          const lp = lessons[l.id]
          const status = masteryStatus(concepts[l.id])
          const done = lp?.status === 'completed'
          return (
            <li key={l.id}>
              <Link to={`/lektion/${l.id}`} className="flex items-center gap-4 rounded-2xl border border-border bg-surface px-4 py-3.5 transition-colors hover:border-primary hover:bg-primary-soft/30">
                <span
                  className={cn(
                    'flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold',
                    done ? 'bg-green-soft text-green' : lp ? 'bg-primary-soft text-primary' : 'bg-surface-2 text-muted',
                  )}
                >
                  {done ? <Check className="size-4" /> : l.kind === 'test' ? <ClipboardCheck className="size-4" /> : i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{l.title}</span>
                  <span className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3" /> {l.minutes} min
                    </span>
                    <span>{l.core ? 'Centralt innehåll' : 'Stödkunskap'}</span>
                    {l.kind === 'lesson' && <Badge tone={STATUS_TONE[status]}>{MASTERY_LABELS[status]}</Badge>}
                  </span>
                </span>
                <PlayCircle className="size-5 shrink-0 text-muted" />
              </Link>
            </li>
          )
        })}
      </ol>

      {sims.length > 0 && (
        <Card className="p-5">
          <h2 className="mb-3 font-semibold">Simuleringar i den här modulen</h2>
          <div className="flex flex-wrap gap-2">
            {sims.map((s) => (
              <Link key={s.id} to={`/labb/${s.id}`} className="rounded-2xl border border-border px-3 py-2 text-sm hover:bg-surface-2">
                {s.icon} {s.title}
              </Link>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
