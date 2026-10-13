import { useState } from 'react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { FlowNode, Tone, VisualSpec } from '@/content/types'
import { RichText } from '@/components/RichText'
import { cn } from '@/lib/utils'

export const TONE_BG: Record<Tone, string> = {
  lavender: 'bg-primary-soft',
  pink: 'bg-pink-soft',
  blue: 'bg-blue-soft',
  cream: 'bg-cream-soft',
  green: 'bg-green-soft',
}

export function FlowDiagram({ nodes, layout }: { nodes: FlowNode[]; layout: 'cycle' | 'line' }) {
  const [sel, setSel] = useState<number | null>(0)
  const n = nodes.length

  return (
    <div className="flex w-full flex-col items-center gap-4">
      {layout === 'cycle' ? (
        <div className="relative mx-auto aspect-square w-full max-w-[360px]">
          <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden>
            <defs>
              <marker id="arrowhead" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted)" />
              </marker>
            </defs>
            {nodes.map((_, i) => {
              const a1 = (i / n) * Math.PI * 2 - Math.PI / 2 + 0.32
              const a2 = ((i + 1) / n) * Math.PI * 2 - Math.PI / 2 - 0.32
              const R = 72
              const x1 = 100 + R * Math.cos(a1)
              const y1 = 100 + R * Math.sin(a1)
              const x2 = 100 + R * Math.cos(a2)
              const y2 = 100 + R * Math.sin(a2)
              return <path key={i} d={`M ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2}`} fill="none" stroke="var(--muted)" strokeWidth={1.2} markerEnd="url(#arrowhead)" opacity={0.6} />
            })}
          </svg>
          {nodes.map((node, i) => {
            const a = (i / n) * Math.PI * 2 - Math.PI / 2
            const x = 50 + 36 * Math.cos(a)
            const y = 50 + 36 * Math.sin(a)
            return (
              <button
                key={i}
                type="button"
                onClick={() => setSel(i)}
                aria-pressed={sel === i}
                className={cn(
                  'absolute flex w-[34%] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-2xl border px-1.5 py-2 text-center text-[0.72rem] font-medium leading-tight shadow-sm transition-all sm:text-xs',
                  sel === i ? 'z-10 scale-105 border-primary bg-primary-soft' : 'border-border bg-surface hover:bg-surface-2',
                )}
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                {node.icon && <span className="text-lg leading-none">{node.icon}</span>}
                <span className="mt-0.5">{node.label}</span>
              </button>
            )
          })}
        </div>
      ) : (
        <div className="flex w-full flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-center">
          {nodes.map((node, i) => (
            <div key={i} className="flex flex-col items-center gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => setSel(i)}
                aria-pressed={sel === i}
                className={cn(
                  'flex w-full min-w-28 flex-col items-center rounded-2xl border px-3 py-3 text-center text-sm font-medium shadow-sm transition-all sm:w-auto',
                  sel === i ? 'border-primary bg-primary-soft' : 'border-border bg-surface hover:bg-surface-2',
                )}
              >
                {node.icon && <span className="text-2xl leading-none">{node.icon}</span>}
                <span className="mt-1">{node.label}</span>
              </button>
              {i < nodes.length - 1 && (
                <>
                  <ArrowRight className="hidden size-5 shrink-0 text-muted sm:block" aria-hidden />
                  <ArrowDown className="size-5 shrink-0 text-muted sm:hidden" aria-hidden />
                </>
              )}
            </div>
          ))}
        </div>
      )}
      {sel !== null && (
        <div className="w-full max-w-xl rounded-2xl bg-surface-2 p-4 text-sm" aria-live="polite">
          <strong>
            {sel + 1}. {nodes[sel].label}:
          </strong>{' '}
          <RichText text={nodes[sel].detail} />
        </div>
      )}
      <p className="text-[0.7rem] text-muted">Klicka på rutorna för att läsa mer.</p>
    </div>
  )
}

export function CompareColumns({ columns }: { columns: Array<{ title: string; points: string[]; tone?: Tone }> }) {
  return (
    <div className={cn('grid w-full gap-3', columns.length === 2 ? 'sm:grid-cols-2' : columns.length >= 3 ? 'sm:grid-cols-3' : '')}>
      {columns.map((c, i) => (
        <div key={i} className={cn('rounded-2xl p-4', TONE_BG[c.tone ?? 'lavender'])}>
          <h4 className="mb-2 font-semibold">
            <RichText text={c.title} />
          </h4>
          <ul className="space-y-1.5 text-sm">
            {c.points.map((p, j) => (
              <li key={j} className="flex gap-2">
                <span aria-hidden>•</span>
                <RichText text={p} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

const SERIES_COLORS = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)']

export function ChartVisual({ spec }: { spec: Extract<VisualSpec, { kind: 'chart' }> }) {
  const Chart = spec.chart === 'bar' ? BarChart : LineChart
  return (
    <div className="h-64 w-full" role="img" aria-label={`Diagram: ${spec.caption ?? ''}`}>
      <ResponsiveContainer width="100%" height="100%">
        <Chart data={spec.data} margin={{ top: 8, right: 12, left: 0, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey={spec.x} tick={{ fontSize: 12, fill: 'var(--muted)' }} />
          <YAxis tick={{ fontSize: 12, fill: 'var(--muted)' }} label={spec.yLabel ? { value: spec.yLabel, angle: -90, position: 'insideLeft', fill: 'var(--muted)', fontSize: 12 } : undefined} />
          <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12 }} />
          {spec.series.length > 1 && <Legend />}
          {spec.series.map((s, i) =>
            spec.chart === 'bar' ? (
              <Bar key={s.key} dataKey={s.key} name={s.label} fill={SERIES_COLORS[i % SERIES_COLORS.length]} radius={[4, 4, 0, 0]} />
            ) : (
              <Line key={s.key} dataKey={s.key} name={s.label} stroke={SERIES_COLORS[i % SERIES_COLORS.length]} strokeWidth={2.5} dot={{ r: 3 }} type="monotone" />
            ),
          )}
        </Chart>
      </ResponsiveContainer>
    </div>
  )
}
