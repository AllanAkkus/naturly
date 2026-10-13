import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Download, Table2, Trash2, Upload } from 'lucide-react'
import { MODULES, conceptLabel, getQuestion } from '@/content'
import { CURRICULUM } from '@/content/curriculum'
import { ALL_LESSONS } from '@/content'
import { useProgress, todayKey } from '@/store/progress'
import { usePlanner } from '@/store/planner'
import { useSettings } from '@/store/settings'
import { useTutor } from '@/store/tutor'
import { masteryStatus, MASTERY_LABELS, type MasteryStatus } from '@/lib/mastery'
import { exportData, importData } from '@/lib/backup'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RichText } from '@/components/RichText'
import { cn } from '@/lib/utils'

const STATUS_STYLE: Record<MasteryStatus, string> = {
  'not-started': 'bg-surface-2 text-muted',
  learning: 'bg-blue-soft',
  'needs-review': 'bg-pink-soft',
  'can-explain': 'bg-green-soft',
}
const STATUS_ICON: Record<MasteryStatus, string> = { 'not-started': '○', learning: '◐', 'needs-review': '↻', 'can-explain': '★' }

const tooltipStyle = { contentStyle: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, color: 'var(--foreground)' } }

export default function ProgressPage() {
  const progress = useProgress()
  const tasks = usePlanner((s) => s.tasks)
  const [showTable, setShowTable] = useState(false)
  const now = Date.now()

  const completed = Object.values(progress.lessons).filter((l) => l.status === 'completed').length
  const totalMinutes = Object.values(progress.studyLog).reduce((a, b) => a + b, 0)
  const correctPct = progress.answers.length ? Math.round((progress.answers.filter((a) => a.correct).length / progress.answers.length) * 100) : 0

  const days = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => {
      const d = new Date(now - (13 - i) * 86400000)
      return { dag: d.toLocaleDateString('sv-SE', { weekday: 'short', day: 'numeric' }), minuter: progress.studyLog[todayKey(d)] ?? 0 }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress.studyLog])

  const examData = progress.exams.slice(-12).map((e, i) => ({ nr: i + 1, procent: Math.round((e.score / e.total) * 100), titel: e.title }))

  const mistakes = useMemo(() => {
    const m = new Map<string, number>()
    for (const a of progress.answers) if (!a.correct) m.set(a.questionId, (m.get(a.questionId) ?? 0) + 1)
    return [...m.entries()]
      .filter(([id]) => getQuestion(id))
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
  }, [progress.answers])

  const covered = new Set(ALL_LESSONS.filter((l) => progress.lessons[l.id]?.status === 'completed').flatMap((l) => l.curriculum))

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-5">
      <header>
        <h1 className="text-3xl font-semibold">Dina framsteg</h1>
        <p className="mt-1 text-muted">Att ha läst en lektion är inte samma sak som att kunna den. Här ser du hur säker du är på varje begrepp.</p>
      </header>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Lektioner klara" value={`${completed}/${ALL_LESSONS.length}`} />
        <Stat label="Studietid" value={totalMinutes >= 60 ? `${Math.floor(totalMinutes / 60)} h ${totalMinutes % 60} min` : `${totalMinutes} min`} />
        <Stat label="Andel rätt svar" value={progress.answers.length ? `${correctPct} %` : '–'} sub={`${progress.answers.length} svar`} />
        <Stat label="Uppgifter klara" value={String(tasks.filter((t) => t.done).length)} sub={`${progress.exams.length} övningsprov`} />
      </div>

      <Card className="p-5">
        <h2 className="mb-1 text-lg font-semibold">Kunskapskarta</h2>
        <div className="mb-4 flex flex-wrap gap-3 text-xs">
          {(Object.keys(MASTERY_LABELS) as MasteryStatus[]).map((s) => (
            <span key={s} className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-1', STATUS_STYLE[s])}>
              <span aria-hidden>{STATUS_ICON[s]}</span> {MASTERY_LABELS[s]}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {MODULES.map((m) => (
            <div key={m.id}>
              <p className="mb-1.5 text-sm font-medium">
                {m.number}. {m.title}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {m.lessons
                  .filter((l) => l.kind === 'lesson')
                  .map((l) => {
                    const st = masteryStatus(progress.concepts[l.id], now)
                    return (
                      <Link key={l.id} to={`/lektion/${l.id}`} title={`${l.title}: ${MASTERY_LABELS[st]}`} className={cn('rounded-xl px-2.5 py-1 text-xs hover:ring-2 hover:ring-primary/30', STATUS_STYLE[st])}>
                        <span aria-hidden>{STATUS_ICON[st]} </span>
                        {l.title}
                        <span className="sr-only"> – {MASTERY_LABELS[st]}</span>
                      </Link>
                    )
                  })}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted">"Kan förklara själv" kräver att du har svarat säkert flera gånger och klarat en "Förklara med egna ord"-övning.</p>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold">Studietid, senaste 14 dagarna (minuter)</h2>
            <Button variant="ghost" size="sm" onClick={() => setShowTable((t) => !t)} aria-pressed={showTable}>
              <Table2 /> {showTable ? 'Diagram' : 'Tabell'}
            </Button>
          </div>
          {showTable ? (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted">
                  <th className="py-1 font-medium">Dag</th>
                  <th className="font-medium">Minuter</th>
                </tr>
              </thead>
              <tbody>
                {days.map((d) => (
                  <tr key={d.dag} className="border-t border-border">
                    <td className="py-1">{d.dag}</td>
                    <td className="tabular-nums">{d.minuter}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="h-56" role="img" aria-label={`Studietid per dag. Totalt ${days.reduce((a, d) => a + d.minuter, 0)} minuter de senaste 14 dagarna.`}>
              <ResponsiveContainer>
                <BarChart data={days} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="dag" tick={{ fontSize: 10, fill: 'var(--muted)' }} interval={1} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: 'var(--muted)' }} allowDecimals={false} tickLine={false} axisLine={false} />
                  <Tooltip {...tooltipStyle} cursor={{ fill: 'var(--surface-2)' }} formatter={(v) => [`${v} min`, 'Studietid']} />
                  <Bar dataKey="minuter" fill="var(--chart-1)" radius={[4, 4, 0, 0]} maxBarSize={22} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>

        <Card className="p-5">
          <h2 className="mb-3 font-semibold">Resultat på prov och quiz (% rätt)</h2>
          {examData.length === 0 ? (
            <p className="text-sm text-muted">Gör ett repetitionsprov eller en quiz så visas resultaten här.</p>
          ) : (
            <div className="h-56" role="img" aria-label={`Provresultat. Senaste: ${examData.at(-1)!.procent} procent.`}>
              <ResponsiveContainer>
                <LineChart data={examData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="nr" tick={{ fontSize: 11, fill: 'var(--muted)' }} tickLine={false} axisLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: 'var(--muted)' }} tickLine={false} axisLine={false} />
                  <Tooltip {...tooltipStyle} formatter={(v) => [`${v} %`, 'Rätt']} labelFormatter={(_, p) => p?.[0]?.payload?.titel ?? ''} />
                  <Line dataKey="procent" stroke="var(--chart-2)" strokeWidth={2} dot={{ r: 4, strokeWidth: 2, stroke: 'var(--surface)' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="p-5">
          <h2 className="mb-3 font-semibold">Vanliga misstag</h2>
          {mistakes.length === 0 ? (
            <p className="text-sm text-muted">Inga upprepade misstag än. Misstag är helt normala – de visar vad vi ska öva på.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {mistakes.map(([id, n]) => {
                const e = getQuestion(id)!
                return (
                  <li key={id} className="rounded-2xl bg-surface-2/70 p-3">
                    <p>
                      <RichText text={e.q.prompt} />
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      {n} {n === 1 ? 'gång' : 'gånger'} ·{' '}
                      <Link className="text-primary hover:underline" to={`/lektion/${e.lessonId}`}>
                        {conceptLabel(e.lessonId)}
                      </Link>
                    </p>
                  </li>
                )
              })}
            </ul>
          )}
          <Button asChild variant="soft" size="sm" className="mt-3">
            <Link to="/ova?flik=misstag">Öva på missarna</Link>
          </Button>
        </Card>

        <Card className="p-5">
          <h2 className="mb-1 font-semibold">Centralt innehåll du har gått igenom</h2>
          <p className="mb-3 text-sm text-muted">
            {covered.size} av {CURRICULUM.length} punkter
          </p>
          <ul className="max-h-72 space-y-1 overflow-y-auto pr-2 text-sm scrollbar-thin">
            {CURRICULUM.map((c) => (
              <li key={c.id} className="flex gap-2">
                <span aria-hidden className={covered.has(c.id) ? 'text-green' : 'text-muted'}>
                  {covered.has(c.id) ? '✓' : '○'}
                </span>
                <span className={covered.has(c.id) ? '' : 'text-muted'}>{c.text}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <DataControls />
    </div>
  )
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <Card className="p-4">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold">{value}</p>
      {sub && <p className="text-xs text-muted">{sub}</p>}
    </Card>
  )
}

function DataControls() {
  const fileRef = useRef<HTMLInputElement>(null)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const clearChat = useTutor((s) => s.clear)
  return (
    <Card className="flex flex-col gap-3 p-5">
      <h2 className="font-semibold">Dina data</h2>
      <p className="text-sm text-muted">All din data sparas bara i den här webbläsaren. Du kan spara en kopia, flytta den till en annan dator eller radera allt.</p>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={exportData}>
          <Download /> Exportera framsteg
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={async (e) => {
            const f = e.target.files?.[0]
            e.target.value = ''
            if (!f) return
            setMessage(await importData(f))
          }}
        />
        <Button variant="outline" onClick={() => fileRef.current?.click()}>
          <Upload /> Importera
        </Button>
        <Button variant="outline" onClick={() => (clearChat(), setMessage('AI-konversationen är rensad.'))}>
          Rensa AI-konversationen
        </Button>
        {!confirmDelete ? (
          <Button variant="danger" onClick={() => setConfirmDelete(true)}>
            <Trash2 /> Radera alla framsteg
          </Button>
        ) : (
          <span className="flex flex-wrap items-center gap-2 rounded-2xl bg-danger-soft px-3 py-1.5 text-sm">
            Är du säker? Det går inte att ångra.
            <Button
              size="sm"
              variant="danger"
              onClick={() => {
                useProgress.getState().resetAll()
                usePlanner.getState().resetAll()
                clearChat()
                setConfirmDelete(false)
                setMessage('Alla framsteg är raderade.')
              }}
            >
              Ja, radera
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setConfirmDelete(false)}>
              Avbryt
            </Button>
          </span>
        )}
      </div>
      {message && (
        <p className="text-sm" role="status">
          {message}
        </p>
      )}
      <p className="text-xs text-muted">Inställningarna ({useSettings.getState().nickname ? 'smeknamn, utseende' : 'utseende'}) raderas inte – de ändras under Inställningar.</p>
    </Card>
  )
}
