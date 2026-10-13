import { Link } from 'react-router-dom'
import { Check, ChevronDown, Clock } from 'lucide-react'
import { CURRICULUM, AREA_LABELS } from '@/content/curriculum'
import { ALL_LESSONS, MODULES, moduleSections } from '@/content'
import { BOOK_PARTS, PLANNED_CHAPTERS } from '@/content/book'
import { useProgress } from '@/store/progress'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ModuleIcon, moduleProgress } from '@/components/CourseJourney'
import { TONE_BG } from '@/components/visuals/Generic'
import type { CurriculumArea, Module } from '@/content/types'
import { cn } from '@/lib/utils'

/** Lärobokens innehållsförteckning: del → kapitel → avsnitt → sida. */
export default function CoursePage() {
  const lessons = useProgress((s) => s.lessons)
  const written = new Set(MODULES.map((m) => m.id))
  const nextUnread = ALL_LESSONS.find((l) => lessons[l.id]?.status !== 'completed')
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8">
      <header>
        <h1 className="text-3xl font-semibold">Läroboken</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Hela Naturkunskap 2, en sak i taget. Varje sida förklarar ett enda begrepp: vad det är, varför det finns, hur det fungerar och var du möter det. Börja
          från början eller hoppa direkt till det du behöver.
        </p>
        {nextUnread && (
          <Link
            to={`/lektion/${nextUnread.id}`}
            className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-2.5 font-medium text-primary-foreground hover:opacity-90"
          >
            Fortsätt läsa: {nextUnread.title}
          </Link>
        )}
      </header>

      {BOOK_PARTS.map((part) => {
        const chapters = [
          ...MODULES.filter((m) => m.part === part.id).map((m) => ({ number: m.number, module: m as Module | undefined, planned: undefined })),
          ...PLANNED_CHAPTERS.filter((c) => c.part === part.id && !written.has(c.id)).map((c) => ({ number: c.number, module: undefined, planned: c })),
        ].sort((a, b) => a.number - b.number)
        return (
          <section key={part.id} aria-labelledby={`del-${part.id}`} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className={cn('flex size-11 shrink-0 items-center justify-center rounded-2xl', TONE_BG[part.tone])}>
                <ModuleIcon name={part.icon} className="size-5" />
              </span>
              <div>
                <h2 id={`del-${part.id}`} className="text-xl font-semibold">
                  {part.title}
                </h2>
                <p className="text-sm text-muted">{part.description}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {chapters.map((c) =>
                c.module ? (
                  <ChapterCard key={c.module.id} m={c.module} open={nextUnread?.moduleId === c.module.id} />
                ) : (
                  <div key={c.planned!.id} className="rounded-2xl border border-dashed border-border px-4 py-3.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm text-muted">Kapitel {c.number}</span>
                      <span className="font-medium">{c.planned!.title}</span>
                      <Badge tone="amber">Skrivs snart</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted">{c.planned!.description}</p>
                    <p className="mt-2 flex flex-wrap gap-1.5">
                      {c.planned!.topics.map((t) => (
                        <span key={t} className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-muted">
                          {t}
                        </span>
                      ))}
                    </p>
                  </div>
                ),
              )}
            </div>
          </section>
        )
      })}

      <Card className="p-5 sm:p-6">
        <h2 className="text-xl font-semibold">Centralt innehåll i kursen</h2>
        <p className="mt-1 text-sm text-muted">Så här täcker läroboken det centrala innehållet för Naturkunskap nivå 2.</p>
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          {(Object.keys(AREA_LABELS) as CurriculumArea[]).map((area) => (
            <div key={area}>
              <h3 className="mb-2 font-semibold">{AREA_LABELS[area]}</h3>
              <ul className="space-y-1.5 text-sm">
                {CURRICULUM.filter((c) => c.area === area).map((c) => {
                  const covering = ALL_LESSONS.filter((l) => l.curriculum.includes(c.id))
                  const chapters = [...new Set(covering.map((l) => l.moduleId))].map((id) => MODULES.find((m) => m.id === id)!.number)
                  return (
                    <li key={c.id} className="flex items-start justify-between gap-2">
                      <span>{c.text}</span>
                      {chapters.length > 0 ? (
                        <Badge tone="green" className="shrink-0">
                          Kapitel {chapters.join(', ')}
                        </Badge>
                      ) : (
                        <Badge tone="amber" className="shrink-0">
                          Kommer
                        </Badge>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

function ChapterCard({ m, open }: { m: Module; open: boolean }) {
  const lessons = useProgress((s) => s.lessons)
  const p = moduleProgress(m, lessons)
  return (
    <details open={open} className="group rounded-2xl border border-border bg-surface">
      <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3.5 [&::-webkit-details-marker]:hidden">
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted">Kapitel {m.number}</span>
            <span className="font-semibold">{m.title}</span>
            {m.status === 'in-progress' && <Badge tone="amber">Under arbete</Badge>}
          </span>
          <span className="mt-2 flex items-center gap-2">
            <Progress value={p.pct} tone={p.pct === 100 ? 'green' : 'primary'} label={`${m.title}: ${p.pct} %`} />
            <span className="shrink-0 text-xs tabular-nums text-muted">
              {p.done}/{p.total} lästa
            </span>
          </span>
        </span>
        <ChevronDown className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180" />
      </summary>
      <div className="flex flex-col gap-4 border-t border-border px-4 py-4">
        {moduleSections(m).map((s) => (
          <div key={s.title}>
            <h3 className="mb-1.5 text-sm font-semibold text-muted">{s.title}</h3>
            <ul className="flex flex-col">
              {s.lessons.map((l) => {
                const done = lessons[l.id]?.status === 'completed'
                return (
                  <li key={l.id}>
                    <Link to={`/lektion/${l.id}`} className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 hover:bg-surface-2">
                      <span className={cn('flex size-5 shrink-0 items-center justify-center rounded-full border', done ? 'border-green bg-green-soft text-green' : 'border-border')}>
                        {done && <Check className="size-3" />}
                      </span>
                      <span className="flex-1">{l.title}</span>
                      <span className="inline-flex items-center gap-1 text-xs text-muted">
                        <Clock className="size-3" /> {l.minutes} min
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
        <Link to={`/modul/${m.id}`} className="self-start text-sm text-primary hover:underline">
          Om kapitlet →
        </Link>
      </div>
    </details>
  )
}
