import { useMemo, useState } from 'react'
import { Bell, CalendarPlus, Check, ChevronDown, Focus, ListPlus, Plus, Trash2, Undo2, X } from 'lucide-react'
import { usePlanner, type Task } from '@/store/planner'
import { todayKey } from '@/store/progress'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input, Label } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { FocusTimer } from '@/components/planner/FocusTimer'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { cn, pluralize } from '@/lib/utils'

const STEP_TEMPLATE = ['Läs uppgiften och stryk under det viktiga', 'Ta reda på vilka begrepp som behövs', 'Skriv ett första utkast', 'Läs igenom och förbättra', 'Lämna in']

export default function PlannerPage() {
  const planner = usePlanner()
  const today = todayKey()
  const [focusTask, setFocusTask] = useState<Task | null>(null)
  const todays = planner.tasks.filter((t) => t.date === today)
  const earlier = planner.tasks.filter((t) => t.date < today && !t.done)
  const later = planner.tasks.filter((t) => t.date > today).sort((a, b) => (a.date < b.date ? -1 : 1))
  const doneToday = planner.tasks.filter((t) => t.doneAt && todayKey(new Date(t.doneAt)) === today).length
  const minutesLeft = todays.filter((t) => !t.done).reduce((s, t) => s + t.minutes, 0)
  const tomorrow = todayKey(new Date(Date.now() + 86400000))
  const dueSoon = planner.tasks.filter((t) => !t.done && t.deadline && t.deadline <= tomorrow)

  const encouragement =
    doneToday === 0
      ? todays.length
        ? 'Börja med den minsta uppgiften. Ett litet steg räcker.'
        : 'Inga uppgifter inlagda för idag ännu.'
      : doneToday >= todays.length && todays.length > 0
        ? `Allt klart för idag! Du har gjort ${pluralize(doneToday, 'uppgift', 'uppgifter')}. Fantastiskt! 💜`
        : `Du har gjort ${pluralize(doneToday, 'uppgift', 'uppgifter')} idag. Bra jobbat!`

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-5">
      <header>
        <h1 className="text-3xl font-semibold">Planering</h1>
        <p className="mt-1 text-muted">{encouragement}</p>
      </header>

      {dueSoon.length > 0 && planner.remindersEnabled && (
        <Card className="flex items-start gap-3 bg-blue-soft p-4 text-sm">
          <Bell className="mt-0.5 size-4 shrink-0" />
          <div>
            <strong>Påminnelse:</strong> {dueSoon.map((t) => t.title).join(', ')} – deadline idag eller i morgon. Du fixar det, ett steg i taget.
          </div>
        </Card>
      )}

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-5">
          <AddTask />
          <section>
            <div className="mb-2 flex items-end justify-between">
              <h2 className="text-lg font-semibold">Idag</h2>
              <span className="text-sm text-muted">{minutesLeft > 0 ? `ca ${minutesLeft} min kvar` : ''}</span>
            </div>
            {todays.length > 0 && <Progress value={(todays.filter((t) => t.done).length / todays.length) * 100} tone="green" className="mb-3" label="Dagens uppgifter" />}
            <TaskList tasks={todays} onFocus={setFocusTask} />
            {todays.length === 0 && <p className="rounded-2xl border border-dashed border-border p-4 text-sm text-muted">Lägg till dagens skoluppgifter ovanför. Du får ungefär fyra om dagen – det är okej att ta dem en i taget.</p>}
          </section>
          {earlier.length > 0 && (
            <section>
              <h2 className="mb-2 text-lg font-semibold">Påbörjat tidigare</h2>
              <p className="mb-2 text-sm text-muted">De här blev inte klara – inget konstigt med det. Flytta dem till idag när du vill.</p>
              <TaskList tasks={earlier} onFocus={setFocusTask} showMove />
            </section>
          )}
          {later.length > 0 && (
            <section>
              <h2 className="mb-2 text-lg font-semibold">Kommande</h2>
              <TaskList tasks={later} onFocus={setFocusTask} showDate />
            </section>
          )}
        </div>
        <aside className="flex flex-col gap-4">
          <Card className="p-5">
            <h2 className="mb-3 font-semibold">Fokustimer</h2>
            <FocusTimer />
          </Card>
          <Card className="flex flex-col gap-3 p-5">
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="reminders">Påminnelser</Label>
              <Switch
                id="reminders"
                checked={planner.remindersEnabled}
                onCheckedChange={async (on) => {
                  if (on && 'Notification' in window && Notification.permission === 'default') await Notification.requestPermission()
                  planner.setReminders(on)
                }}
              />
            </div>
            <p className="text-xs text-muted">Visar påminnelser om deadlines här i appen och en notis när fokustimern är klar (medan Naturly är öppen).</p>
          </Card>
        </aside>
      </div>

      <Dialog open={!!focusTask} onOpenChange={(o) => !o && setFocusTask(null)}>
        <DialogContent className="max-w-md">
          <DialogTitle>Fokusläge</DialogTitle>
          {focusTask && <FocusView taskId={focusTask.id} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function FocusView({ taskId }: { taskId: string }) {
  const task = usePlanner((s) => s.tasks.find((t) => t.id === taskId))
  const toggleStep = usePlanner((s) => s.toggleStep)
  if (!task) return null
  const nextStep = task.steps.find((s) => !s.done)
  return (
    <div className="mt-4 flex flex-col items-center gap-5">
      <FocusTimer taskTitle={task.title} large />
      {nextStep ? (
        <div className="w-full rounded-2xl bg-primary-soft p-4 text-center">
          <p className="text-xs text-muted">Nästa lilla steg</p>
          <p className="mt-1 text-lg font-medium">{nextStep.text}</p>
          <Button size="sm" className="mt-3" onClick={() => toggleStep(task.id, nextStep.id)}>
            <Check /> Klart!
          </Button>
        </div>
      ) : (
        <p className="text-center text-sm text-muted">{task.steps.length ? 'Alla steg är klara! 🎉' : 'Tips: dela upp uppgiften i små steg i listan.'}</p>
      )}
    </div>
  )
}

function AddTask() {
  const addTask = usePlanner((s) => s.addTask)
  const [title, setTitle] = useState('')
  const [minutes, setMinutes] = useState(30)
  const [deadline, setDeadline] = useState('')
  const [date, setDate] = useState(todayKey())
  const [more, setMore] = useState(false)
  const submit = () => {
    if (!title.trim()) return
    addTask({ title: title.trim().slice(0, 140), minutes, deadline: deadline || undefined, date })
    setTitle('')
    setDeadline('')
  }
  return (
    <Card className="p-4">
      <form
        className="flex flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
      >
        <div className="flex gap-2">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ny uppgift, t.ex. 'Uppgift 3: isotoper'" aria-label="Uppgiftens namn" maxLength={140} />
          <Button type="submit" disabled={!title.trim()}>
            <Plus /> Lägg till
          </Button>
        </div>
        <button type="button" onClick={() => setMore((m) => !m)} className="flex items-center gap-1 self-start text-xs text-muted" aria-expanded={more}>
          <ChevronDown className={cn('size-3.5 transition-transform', more && 'rotate-180')} /> Tid, dag och deadline
        </button>
        {more && (
          <div className="grid gap-3 sm:grid-cols-3">
            <label className="text-sm">
              <span className="mb-1 block text-muted">Uppskattad tid</span>
              <select value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} className="h-11 w-full rounded-xl border border-border bg-surface px-3">
                {[5, 10, 15, 20, 30, 45, 60, 90].map((m) => (
                  <option key={m} value={m}>
                    {m} min
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm">
              <span className="mb-1 block text-muted">Planerad dag</span>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </label>
            <label className="text-sm">
              <span className="mb-1 block text-muted">Deadline (valfritt)</span>
              <Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            </label>
          </div>
        )}
      </form>
    </Card>
  )
}

function TaskList({ tasks, onFocus, showMove, showDate }: { tasks: Task[]; onFocus: (t: Task) => void; showMove?: boolean; showDate?: boolean }) {
  return (
    <ul className="flex flex-col gap-2">
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onFocus={onFocus} showMove={showMove} showDate={showDate} />
      ))}
    </ul>
  )
}

function TaskItem({ task, onFocus, showMove, showDate }: { task: Task; onFocus: (t: Task) => void; showMove?: boolean; showDate?: boolean }) {
  const { toggleTask, removeTask, addStep, toggleStep, removeStep, moveToToday, updateTask } = usePlanner()
  const [open, setOpen] = useState(false)
  const [stepText, setStepText] = useState('')
  const stepsDone = task.steps.filter((s) => s.done).length
  const deadlineText = useMemo(() => (task.deadline ? new Date(task.deadline).toLocaleDateString('sv-SE', { weekday: 'short', day: 'numeric', month: 'short' }) : null), [task.deadline])
  return (
    <li>
      <Card className={cn('p-3', task.done && 'opacity-70')}>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => toggleTask(task.id)}
            aria-pressed={task.done}
            aria-label={task.done ? `Markera ${task.title} som ej klar` : `Markera ${task.title} som klar`}
            className={cn('flex size-7 shrink-0 items-center justify-center rounded-full border-2', task.done ? 'border-green bg-green text-white' : 'border-border hover:border-primary')}
          >
            {task.done && <Check className="size-4" />}
          </button>
          <button type="button" onClick={() => setOpen((o) => !o)} className="min-w-0 flex-1 text-left" aria-expanded={open}>
            <span className={cn('block font-medium', task.done && 'line-through')}>{task.title}</span>
            <span className="flex flex-wrap gap-x-3 text-xs text-muted">
              <span>{task.minutes} min</span>
              {task.steps.length > 0 && (
                <span>
                  {stepsDone}/{task.steps.length} steg
                </span>
              )}
              {deadlineText && <span>Deadline {deadlineText}</span>}
              {showDate && <span>Planerad {new Date(task.date).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })}</span>}
            </span>
          </button>
          {showMove && (
            <Button variant="ghost" size="sm" onClick={() => moveToToday(task.id)}>
              <Undo2 /> Till idag
            </Button>
          )}
          {!task.done && (
            <Button variant="ghost" size="icon" onClick={() => onFocus(task)} aria-label={`Fokusera på ${task.title}`} title="Fokusläge">
              <Focus />
            </Button>
          )}
        </div>
        {open && (
          <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
            {task.steps.map((s) => (
              <div key={s.id} className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={s.done} onChange={() => toggleStep(task.id, s.id)} className="size-4" aria-label={s.text} />
                <span className={cn('flex-1', s.done && 'text-muted line-through')}>{s.text}</span>
                <button type="button" onClick={() => removeStep(task.id, s.id)} className="text-muted hover:text-danger" aria-label={`Ta bort steget ${s.text}`}>
                  <X className="size-3.5" />
                </button>
              </div>
            ))}
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault()
                if (stepText.trim()) addStep(task.id, stepText.trim().slice(0, 140))
                setStepText('')
              }}
            >
              <Input value={stepText} onChange={(e) => setStepText(e.target.value)} placeholder="Lägg till ett litet steg…" className="h-9" aria-label="Nytt steg" />
              <Button type="submit" size="sm" variant="soft" disabled={!stepText.trim()}>
                <ListPlus />
              </Button>
            </form>
            <div className="flex flex-wrap gap-2">
              {task.steps.length === 0 && (
                <Button size="sm" variant="outline" onClick={() => STEP_TEMPLATE.forEach((s) => addStep(task.id, s))}>
                  Dela upp i små steg
                </Button>
              )}
              <label className="flex items-center gap-1.5 text-xs text-muted">
                <CalendarPlus className="size-3.5" />
                <input type="date" value={task.deadline ?? ''} onChange={(e) => updateTask(task.id, { deadline: e.target.value || undefined })} className="rounded-lg border border-border bg-surface px-2 py-1" aria-label="Deadline" />
              </label>
              <Button size="sm" variant="ghost" className="ml-auto text-danger" onClick={() => removeTask(task.id)}>
                <Trash2 /> Ta bort
              </Button>
            </div>
          </div>
        )}
      </Card>
    </li>
  )
}
