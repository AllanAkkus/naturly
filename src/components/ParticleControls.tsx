import { Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ParticleCounter({
  label,
  value,
  onChange,
  min = 0,
  max,
  color,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min?: number
  max: number
  color: string
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface px-3 py-2">
      <div className="flex items-center gap-2">
        <span className="size-3.5 rounded-full" style={{ background: color }} aria-hidden />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="flex size-9 items-center justify-center rounded-xl bg-surface-2 hover:bg-primary-soft disabled:opacity-40"
          aria-label={`Ta bort en ${label.toLowerCase().replace(/er$/, '')}`}
        >
          <Minus className="size-4" />
        </button>
        <output className={cn('w-8 text-center text-lg font-semibold tabular-nums')} aria-live="polite" aria-label={`${label}: ${value}`}>
          {value}
        </output>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="flex size-9 items-center justify-center rounded-xl bg-surface-2 hover:bg-primary-soft disabled:opacity-40"
          aria-label={`Lägg till en ${label.toLowerCase().replace(/er$/, '')}`}
        >
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  )
}
