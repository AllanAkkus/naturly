import { Link } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { Check, Lock, Sparkles } from 'lucide-react'
import { MODULES } from '@/content'
import { useProgress } from '@/store/progress'
import { Progress } from '@/components/ui/progress'
import { TONE_BG } from '@/components/visuals/Generic'
import { cn } from '@/lib/utils'
import type { Module } from '@/content/types'

export function moduleProgress(m: Module, lessons: Record<string, { status: string }>) {
  const done = m.lessons.filter((l) => lessons[l.id]?.status === 'completed').length
  return { done, total: m.lessons.length, pct: Math.round((done / m.lessons.length) * 100) }
}

export function ModuleIcon({ name, className }: { name: string; className?: string }) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[name] ?? Icons.BookOpen
  return <Icon className={className} />
}

/** Kursresan: moduler som en stig. Alla moduler är öppna, men den rekommenderade nästa lyfts fram. */
export function CourseJourney({ compact = false }: { compact?: boolean }) {
  const lessons = useProgress((s) => s.lessons)
  const recommended = MODULES.find((m) => moduleProgress(m, lessons).pct < 100)?.id
  return (
    <ol className={cn('relative grid gap-3', compact ? 'sm:grid-cols-2 xl:grid-cols-3' : 'md:grid-cols-2')}>
      {MODULES.map((m) => {
        const p = moduleProgress(m, lessons)
        const isRec = m.id === recommended
        const prevIdx = MODULES.findIndex((x) => x.id === m.id) - 1
        const prevDone = prevIdx < 0 || moduleProgress(MODULES[prevIdx], lessons).pct === 100
        return (
          <li key={m.id}>
            <Link
              to={`/modul/${m.id}`}
              className={cn(
                'group flex h-full items-start gap-3 rounded-3xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-md',
                isRec ? 'border-primary bg-surface ring-2 ring-primary/20' : 'border-border bg-surface',
              )}
            >
              <span className={cn('flex size-12 shrink-0 items-center justify-center rounded-2xl', TONE_BG[m.tone])}>
                {p.pct === 100 ? <Check className="size-6 text-green" /> : <ModuleIcon name={m.icon} className="size-6 text-foreground/80" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2 text-xs text-muted">
                  Kapitel {m.number}
                  {isRec && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2 py-0.5 font-medium text-primary">
                      <Sparkles className="size-3" /> Rekommenderad
                    </span>
                  )}
                  {!prevDone && !isRec && p.done === 0 && (
                    <span className="inline-flex items-center gap-1" title="Du kan öppna den när du vill – vi rekommenderar bara ordningen">
                      <Lock className="size-3" /> senare
                    </span>
                  )}
                  {m.status === 'in-progress' && <span className="rounded-full bg-amber-soft px-2 py-0.5">under arbete</span>}
                </span>
                <span className="mt-0.5 block font-semibold leading-snug group-hover:text-primary">{m.title}</span>
                {!compact && <span className="mt-1 block text-sm text-muted">{m.subtitle}</span>}
                <span className="mt-2 flex items-center gap-2">
                  <Progress value={p.pct} tone={p.pct === 100 ? 'green' : 'primary'} label={`${m.title}: ${p.pct} %`} />
                  <span className="shrink-0 text-xs tabular-nums text-muted">
                    {p.done}/{p.total}
                  </span>
                </span>
              </span>
            </Link>
          </li>
        )
      })}
    </ol>
  )
}
