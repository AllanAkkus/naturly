import { useMemo, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Atom, CalendarDays, Camera, ClipboardList, Clock, Grid3x3, Play, Repeat, Sparkles, Trophy } from 'lucide-react'
import { ALL_LESSONS, conceptLabel, getModule, MODULES } from '@/content'
import { useProgress, todayKey } from '@/store/progress'
import { usePlanner } from '@/store/planner'
import { useSettings } from '@/store/settings'
import { useTutor } from '@/store/tutor'
import { masteryStatus } from '@/lib/mastery'
import { isDue } from '@/lib/srs'
import { computeAchievements } from '@/lib/achievements'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { CourseJourney, moduleProgress } from '@/components/CourseJourney'
import { PeriodicGrid } from '@/components/visuals/PeriodicGrid'
import { pluralize } from '@/lib/utils'

const INTENTS = [
  { label: 'Jag förstår inte atomer', to: '/lektion/m1-l02?franborjan=1', emoji: '⚛️' },
  { label: 'Jag har en uppgift', to: '/uppgiftshjalp', emoji: '📸' },
  { label: 'Jag vill öva inför prov', to: '/ova', emoji: '📝' },
  { label: 'Jag vill repetera', to: '/repetera', emoji: '🔁' },
]

export function Dashboard() {
  const navigate = useNavigate()
  const progress = useProgress()
  const tasks = usePlanner((s) => s.tasks)
  const { nickname, focusMode } = useSettings()
  const ask = useTutor((s) => s.ask)
  const now = Date.now()

  const completedCount = Object.values(progress.lessons).filter((l) => l.status === 'completed').length
  const coursePct = Math.round((completedCount / ALL_LESSONS.length) * 100)
  const nextLesson = ALL_LESSONS.find((l) => progress.lessons[l.id]?.status !== 'completed')
  const currentModule = nextLesson ? getModule(nextLesson.moduleId) : MODULES.at(-1)
  const continueTarget = progress.lastVisited ?? (nextLesson ? { path: `/lektion/${nextLesson.id}`, title: nextLesson.title, t: 0 } : undefined)
  const dueCards = Object.values(progress.cards).filter((c) => isDue(c, now)).length
  const review = Object.entries(progress.concepts)
    .filter(([, s]) => masteryStatus(s, now) === 'needs-review')
    .slice(0, 5)
  const today = todayKey()
  const todayTasks = tasks.filter((t) => t.date === today)
  const doneToday = tasks.filter((t) => t.doneAt && todayKey(new Date(t.doneAt)) === today).length
  const lessonsToday = Object.values(progress.lessons).filter((l) => l.completedAt && todayKey(new Date(l.completedAt)) === today).length
  const upcoming = tasks
    .filter((t) => !t.done && t.deadline)
    .sort((a, b) => (a.deadline! < b.deadline! ? -1 : 1))
    .slice(0, 4)
  const achievements = useMemo(() => computeAchievements(progress, tasks), [progress, tasks])
  const earned = achievements.filter((a) => a.earned)
  const firstVisit = completedCount === 0 && progress.answers.length === 0

  const encouragement =
    doneToday + lessonsToday > 0
      ? `Du har gjort ${pluralize(doneToday + lessonsToday, 'sak', 'saker')} idag. Bra jobbat!`
      : progress.studyLog[today]
        ? `Du har pluggat ${progress.studyLog[today]} min idag. Varje minut räknas.`
        : 'Små steg räcker. Välj något litet att börja med.'

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-gradient-to-br from-primary-soft via-pink-soft to-blue-soft p-6 sm:p-8">
        <h1 className="text-3xl font-semibold sm:text-4xl">{firstVisit ? `Hej ${nickname || 'du'} ❤️` : 'Välkommen tillbaka ❤️'}</h1>
        <p className="mt-2 text-lg text-foreground/80">{firstVisit ? 'Redo att lära dig något nytt?' : 'Vad vill du lära dig idag?'}</p>
        <p className="mt-1 text-sm text-muted">{encouragement}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {INTENTS.map((i) => (
            <Button key={i.label} variant="outline" className="bg-surface/80" onClick={() => navigate(i.to)}>
              <span aria-hidden>{i.emoji}</span> {i.label}
            </Button>
          ))}
        </div>
        <div className="mt-5">
          <p className="mb-2 text-sm font-medium">Hur mycket tid har du?</p>
          <div className="flex flex-wrap gap-2">
            {[
              ['5', '5 minuter'],
              ['10', '10 minuter'],
              ['20', '20 minuter'],
              ['hel', 'En hel lektion'],
            ].map(([m, label]) => (
              <Button key={m} size="sm" variant="soft" onClick={() => navigate(`/studera/${m}`)}>
                <Clock /> {label}
              </Button>
            ))}
          </div>
        </div>
      </motion.section>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Fortsätt */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardDescription>Fortsätt där du slutade</CardDescription>
            <CardTitle className="text-xl">{continueTarget?.title ?? 'Börja kursen'}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center gap-3">
            <Button onClick={() => navigate(continueTarget?.path ?? '/lektion/m1-l01')}>
              <Play /> Fortsätt
            </Button>
            {nextLesson && continueTarget?.path !== `/lektion/${nextLesson.id}` && (
              <Button variant="ghost" onClick={() => navigate(`/lektion/${nextLesson.id}`)}>
                Nästa nya lektion: {nextLesson.title} <ArrowRight />
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Kursen */}
        <Card>
          <CardHeader>
            <CardDescription>Hela kursen</CardDescription>
            <CardTitle className="text-3xl">{coursePct} %</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={coursePct} label="Kursens genomförande" />
            <p className="mt-2 text-sm text-muted">
              {completedCount} av {ALL_LESSONS.length} lektioner klara. Att ha läst en lektion är början – repetitionen gör att du kan den.
            </p>
          </CardContent>
        </Card>
      </div>

      {!focusMode && (
        <>
          <div className="grid gap-4 lg:grid-cols-3">
            {/* Dagens plan */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="size-5 text-primary" /> Dagens plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {dueCards > 0 && (
                  <PlanRow to="/repetera" label={`Repetera ${pluralize(dueCards, 'kort', 'kort')}`} meta="ca 5 min" />
                )}
                {nextLesson && <PlanRow to={`/lektion/${nextLesson.id}`} label={`Lektion: ${nextLesson.title}`} meta={`ca ${nextLesson.minutes} min`} />}
                {todayTasks.slice(0, 4).map((t) => (
                  <PlanRow key={t.id} to="/planering" label={t.title} meta={t.done ? '✓ klar' : `${t.minutes} min`} done={t.done} />
                ))}
                {todayTasks.length === 0 && (
                  <Link to="/planering" className="block rounded-2xl border border-dashed border-border p-3 text-muted hover:bg-surface-2">
                    + Lägg in dagens skoluppgifter
                  </Link>
                )}
              </CardContent>
            </Card>

            {/* Nuvarande kapitel */}
            {currentModule && (
              <Card>
                <CardHeader>
                  <CardDescription>Nuvarande kapitel</CardDescription>
                  <CardTitle>
                    Kapitel {currentModule.number}: {currentModule.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={moduleProgress(currentModule, progress.lessons).pct} />
                  <p className="mt-2 text-sm text-muted">
                    {moduleProgress(currentModule, progress.lessons).done} av {currentModule.lessons.length} lektioner
                  </p>
                  <Button asChild variant="soft" size="sm" className="mt-3">
                    <Link to={`/modul/${currentModule.id}`}>Öppna modulen</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Behöver repetition */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Repeat className="size-5 text-pink" /> Bra att repetera
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1.5 text-sm">
                {review.length === 0 ? (
                  <p className="text-muted">Inget just nu. När du övar visar vi här vad som är bra att titta på igen.</p>
                ) : (
                  review.map(([c]) => (
                    <Link key={c} to={`/lektion/${c}`} className="block rounded-xl px-2 py-1.5 hover:bg-surface-2">
                      {conceptLabel(c)}
                    </Link>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {/* Kommande uppgifter */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="size-5 text-blue" /> Kommande uppgifter
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1.5 text-sm">
                {upcoming.length === 0 ? (
                  <p className="text-muted">
                    Inga deadlines inlagda. <Link className="text-primary" to="/planering">Lägg till i planeringen</Link>
                  </p>
                ) : (
                  upcoming.map((t) => (
                    <div key={t.id} className="flex justify-between gap-2 rounded-xl px-2 py-1.5">
                      <span className="truncate">{t.title}</span>
                      <span className="shrink-0 text-muted">{new Date(t.deadline!).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })}</span>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Genvägar */}
            <Card>
              <CardHeader>
                <CardTitle>Genvägar</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2">
                <Shortcut onClick={() => ask('Hej! Kan du hjälpa mig med det jag pluggar just nu?')} icon={<Sparkles />} label="Fråga Naturly" />
                <Shortcut onClick={() => navigate('/uppgiftshjalp')} icon={<Camera />} label="Hjälp med uppgift" />
                <Shortcut onClick={() => navigate('/atombyggaren')} icon={<Atom />} label="Atombyggaren" />
                <Shortcut onClick={() => navigate('/ova?flik=prov')} icon={<ClipboardList />} label="Övningsprov" />
              </CardContent>
            </Card>

            {/* Prestationer */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="size-5 text-amber" /> Dina prestationer
                </CardTitle>
                <CardDescription>
                  {earned.length} av {achievements.length}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {achievements.map((a) => (
                  <span
                    key={a.id}
                    title={`${a.title}: ${a.description}`}
                    aria-label={`${a.title}${a.earned ? ' (klar)' : ' (inte än)'}`}
                    className={a.earned ? 'flex size-11 items-center justify-center rounded-2xl bg-amber-soft text-xl' : 'flex size-11 items-center justify-center rounded-2xl bg-surface-2 text-xl opacity-35 grayscale'}
                  >
                    {a.emoji}
                  </span>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Grid3x3 className="size-5 text-primary" /> Periodiska systemet
                </CardTitle>
                <CardDescription>Klicka på ett grundämne för att lära dig mer.</CardDescription>
              </div>
              <Button asChild variant="soft" size="sm">
                <Link to="/periodiska-systemet">Öppna</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <PeriodicGrid compact onSelect={(el) => navigate(`/periodiska-systemet?z=${el.z}`)} />
            </CardContent>
          </Card>

          <section>
            <div className="mb-3 flex items-end justify-between">
              <h2 className="text-xl font-semibold">Din kursresa</h2>
              <Link to="/kurs" className="text-sm text-primary">
                Se hela kursen
              </Link>
            </div>
            <CourseJourney compact />
          </section>
        </>
      )}
    </div>
  )
}

function PlanRow({ to, label, meta, done }: { to: string; label: string; meta: string; done?: boolean }) {
  return (
    <Link to={to} className="flex items-center justify-between gap-2 rounded-2xl bg-surface-2/70 px-3 py-2.5 hover:bg-surface-2">
      <span className={done ? 'truncate text-muted line-through' : 'truncate'}>{label}</span>
      <span className="shrink-0 text-xs text-muted">{meta}</span>
    </Link>
  )
}

function Shortcut({ onClick, icon, label }: { onClick: () => void; icon: ReactNode; label: string }) {
  return (
    <button type="button" onClick={onClick} className="flex flex-col items-center gap-1.5 rounded-2xl bg-surface-2/70 p-3 text-center text-xs font-medium hover:bg-primary-soft [&_svg]:size-5 [&_svg]:text-primary">
      {icon}
      {label}
    </button>
  )
}
