import { CourseJourney } from '@/components/CourseJourney'
import { CURRICULUM, AREA_LABELS } from '@/content/curriculum'
import { ALL_LESSONS, MODULES } from '@/content'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { CurriculumArea } from '@/content/types'

export default function CoursePage() {
  const covered = new Set(ALL_LESSONS.flatMap((l) => l.curriculum))
  const inProgress = MODULES.filter((m) => m.status === 'in-progress')
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <header>
        <h1 className="text-3xl font-semibold">Naturkunskap nivå 2</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Kursen är uppdelad i {MODULES.length} moduler. Vi rekommenderar att du går i ordning, men du kan öppna vilken modul du vill. Modulerna är Naturlys egen indelning – de
          följer inte nödvändigtvis NTI-skolans kapitel.
        </p>
        {inProgress.length > 0 && (
          <p className="mt-2 text-sm text-amber">
            Under arbete: {inProgress.map((m) => `modul ${m.number}`).join(', ')}. De är märkta i listan.
          </p>
        )}
      </header>
      <CourseJourney />
      <Card className="p-5 sm:p-6">
        <h2 className="text-xl font-semibold">Centralt innehåll i kursen</h2>
        <p className="mt-1 text-sm text-muted">Så här täcker Naturly det centrala innehållet för Naturkunskap nivå 2.</p>
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          {(Object.keys(AREA_LABELS) as CurriculumArea[]).map((area) => (
            <div key={area}>
              <h3 className="mb-2 font-semibold">{AREA_LABELS[area]}</h3>
              <ul className="space-y-1.5 text-sm">
                {CURRICULUM.filter((c) => c.area === area).map((c) => {
                  const lessons = ALL_LESSONS.filter((l) => l.curriculum.includes(c.id))
                  const modules = [...new Set(lessons.map((l) => l.moduleId))].map((id) => MODULES.find((m) => m.id === id)!.number)
                  return (
                    <li key={c.id} className="flex items-start justify-between gap-2">
                      <span>{c.text}</span>
                      {covered.has(c.id) ? (
                        <Badge tone="green" className="shrink-0">
                          Modul {modules.join(', ')}
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
