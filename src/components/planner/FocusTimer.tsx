import { useEffect, useRef, useState } from 'react'
import { Pause, Play, RotateCcw, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePlanner } from '@/store/planner'
import { cn } from '@/lib/utils'

export function notify(title: string, body: string) {
  try {
    if ('Notification' in window && Notification.permission === 'granted') new Notification(title, { body, icon: '/favicon.svg' })
  } catch {
    /* vissa webbläsare tillåter inte notiser */
  }
}

/** Pomodoro-timer. Ingen stress: tiden är en hjälp, inte ett krav. */
export function FocusTimer({ taskTitle, large = false }: { taskTitle?: string; large?: boolean }) {
  const { pomodoroMinutes, breakMinutes, setPomodoro, remindersEnabled } = usePlanner()
  const [phase, setPhase] = useState<'work' | 'break'>('work')
  const [left, setLeft] = useState(pomodoroMinutes * 60)
  const [running, setRunning] = useState(false)
  const endRef = useRef<number | null>(null)

  useEffect(() => {
    if (!running) setLeft((phase === 'work' ? pomodoroMinutes : breakMinutes) * 60)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pomodoroMinutes, breakMinutes, phase])

  useEffect(() => {
    if (!running) return
    endRef.current = Date.now() + left * 1000
    const t = setInterval(() => {
      const remaining = Math.max(0, Math.round((endRef.current! - Date.now()) / 1000))
      setLeft(remaining)
      if (remaining === 0) {
        setRunning(false)
        if (remindersEnabled) notify(phase === 'work' ? 'Dags för paus 🌿' : 'Pausen är slut', phase === 'work' ? 'Bra jobbat! Ta några minuter och sträck på dig.' : 'Redo för nästa lilla steg?')
        setPhase((p) => (p === 'work' ? 'break' : 'work'))
      }
    }, 500)
    return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running])

  const total = (phase === 'work' ? pomodoroMinutes : breakMinutes) * 60
  const pct = 1 - left / total
  const R = large ? 110 : 64
  const C = 2 * Math.PI * R

  return (
    <div className="flex flex-col items-center gap-3">
      {taskTitle && <p className="text-center text-sm text-muted">Jobbar med: {taskTitle}</p>}
      <div className="relative" style={{ width: R * 2 + 20, height: R * 2 + 20 }}>
        <svg width={R * 2 + 20} height={R * 2 + 20} className="-rotate-90" aria-hidden>
          <circle cx={R + 10} cy={R + 10} r={R} fill="none" stroke="var(--surface-2)" strokeWidth={10} />
          <circle cx={R + 10} cy={R + 10} r={R} fill="none" stroke={phase === 'work' ? 'var(--primary)' : 'var(--green)'} strokeWidth={10} strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - pct)} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn('font-display font-semibold tabular-nums', large ? 'text-5xl' : 'text-3xl')} role="timer" aria-live="off">
            {Math.floor(left / 60)}:{String(left % 60).padStart(2, '0')}
          </span>
          <span className="text-xs text-muted">{phase === 'work' ? 'Fokus' : 'Paus'}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => setRunning((r) => !r)}>{running ? <><Pause /> Pausa</> : <><Play /> {left < total ? 'Fortsätt' : 'Starta'}</>}</Button>
        <Button
          variant="outline"
          size="icon"
          aria-label="Börja om"
          onClick={() => {
            setRunning(false)
            setLeft(total)
          }}
        >
          <RotateCcw />
        </Button>
      </div>
      {!running && (
        <div className="flex flex-wrap justify-center gap-1.5">
          {[5, 10, 20, 25].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setPomodoro(m, m >= 20 ? 5 : 2)}
              aria-pressed={pomodoroMinutes === m}
              className={cn('rounded-full border px-2.5 py-1 text-xs', pomodoroMinutes === m ? 'border-primary bg-primary-soft text-primary' : 'border-border')}
            >
              {m} min
            </button>
          ))}
        </div>
      )}
      {remindersEnabled && (
        <p className="flex items-center gap-1 text-xs text-muted">
          <Bell className="size-3" /> Du får en notis när tiden är slut (om fliken är öppen).
        </p>
      )}
    </div>
  )
}
