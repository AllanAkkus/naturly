import { useMemo, useState } from 'react'
import type { AtomPart } from '@/content/types'
import { SHELL_NAMES, shellDistribution } from '@/lib/chemistry'
import { useSettings } from '@/store/settings'
import { cn } from '@/lib/utils'

export const PART_INFO: Record<AtomPart, { title: string; text: string }> = {
  proton: { title: 'Proton', text: 'Positiv laddning (+1). Finns i kärnan. Antalet protoner bestämmer vilket grundämne atomen är.' },
  neutron: { title: 'Neutron', text: 'Ingen laddning (0). Finns i kärnan. Påverkar atomens massa och vilken isotop det är.' },
  electron: { title: 'Elektron', text: 'Negativ laddning (−1). Rör sig runt kärnan. Väger nästan ingenting. Styr hur atomen reagerar.' },
  nucleus: { title: 'Atomkärnan', text: 'Atomens mitt. Innehåller protoner och neutroner – nästan all atomens massa.' },
  shell: { title: 'Elektronskal', text: 'I skalmodellen ligger elektronerna i skal. K-skalet (innerst) rymmer 2, L-skalet 8 och M-skalet upp till 18.' },
}

/** Fördelar protoner och neutroner jämnt så att färgerna blandas. */
function nucleonOrder(protons: number, neutrons: number): Array<'p' | 'n'> {
  const total = protons + neutrons
  const out: Array<'p' | 'n'> = []
  let p = 0
  for (let i = 0; i < total; i++) {
    const wantP = Math.round(((i + 1) * protons) / total)
    if (wantP > p) {
      out.push('p')
      p++
    } else out.push('n')
  }
  return out
}

interface NucleusProps {
  protons: number
  neutrons: number
  cx: number
  cy: number
  radius: number
  highlight?: AtomPart
  onPart: (part: AtomPart) => void
  selected?: AtomPart | null
}

function Nucleus({ protons, neutrons, cx, cy, radius, highlight, onPart, selected }: NucleusProps) {
  const total = protons + neutrons
  const order = useMemo(() => nucleonOrder(protons, neutrons), [protons, neutrons])
  if (total === 0) return null
  if (total > 60) {
    // För stora kärnor: rita en klump med antal
    return (
      <g>
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          className="cursor-pointer"
          fill="url(#nucleusGrad)"
          stroke={selected === 'nucleus' ? 'var(--foreground)' : 'none'}
          strokeWidth={2}
          onClick={() => onPart('nucleus')}
        />
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize={11} fontWeight={700} fill="white">
          {protons} p⁺
        </text>
        <text x={cx} y={cy + 11} textAnchor="middle" fontSize={11} fontWeight={700} fill="white">
          {neutrons} n
        </text>
      </g>
    )
  }
  const r = Math.max(3.2, Math.min(9, radius / Math.sqrt(total) / 1.05))
  const spacing = r * 1.75
  return (
    <g>
      <circle cx={cx} cy={cy} r={radius + 4} fill="transparent" className="cursor-pointer" onClick={() => onPart('nucleus')} />
      {order
        .map((kind, i) => {
          const dist = spacing * Math.sqrt(i) * 0.7
          const angle = i * 2.39996
          return { kind, i, x: cx + dist * Math.cos(angle), y: cy + dist * Math.sin(angle) }
        })
        .reverse()
        .map(({ kind, i, x, y }) => {
          const part: AtomPart = kind === 'p' ? 'proton' : 'neutron'
          const dim = highlight && highlight !== part && highlight !== 'nucleus'
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={r}
              fill={kind === 'p' ? 'var(--proton)' : 'var(--neutron)'}
              stroke={selected === part ? 'var(--foreground)' : 'rgba(255,255,255,0.6)'}
              strokeWidth={selected === part ? 1.6 : 0.8}
              opacity={dim ? 0.45 : 1}
              className="cursor-pointer transition-opacity"
              onClick={(e) => {
                e.stopPropagation()
                onPart(part)
              }}
            >
              <title>{kind === 'p' ? 'Proton (+)' : 'Neutron (0)'}</title>
            </circle>
          )
        })}
    </g>
  )
}

export interface AtomDiagramProps {
  protons: number
  neutrons: number
  electrons: number
  highlight?: AtomPart
  size?: number
  interactive?: boolean
  showInfo?: boolean
  onPartClick?: (part: AtomPart) => void
  selectedPart?: AtomPart | null
  className?: string
  animate?: boolean
  label?: string
  /** Dölj knapparna med namn (används i klickfrågor så att svaret inte avslöjas). */
  showButtons?: boolean
}

export function AtomDiagram({
  protons,
  neutrons,
  electrons,
  highlight,
  size = 300,
  interactive = true,
  showInfo = true,
  onPartClick,
  selectedPart,
  className,
  animate = true,
  label,
  showButtons = true,
}: AtomDiagramProps) {
  const reducedMotion = useSettings((s) => s.reducedMotion)
  const [selected, setSelected] = useState<AtomPart | null>(null)
  const current = selectedPart !== undefined ? selectedPart : selected
  const shells = useMemo(() => {
    if (electrons <= 0) return []
    return shellDistribution(protons > 0 ? protons : 0, electrons)
  }, [protons, electrons])

  const total = protons + neutrons
  const nucleusR = total === 0 ? 0 : Math.min(44, 10 + Math.sqrt(total) * 5)
  const outer = 140
  const gap = shells.length ? Math.max(14, (outer - nucleusR - 8) / shells.length) : 0
  const c = 150

  const handle = (part: AtomPart) => {
    if (!interactive) return
    setSelected(part)
    onPartClick?.(part)
  }

  const desc =
    label ??
    `Skalmodell av en atom med ${protons} protoner, ${neutrons} neutroner och ${electrons} elektroner${shells.length ? ` fördelade ${shells.join(', ')}` : ''}.`

  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      <svg
        viewBox="0 0 300 300"
        width={size}
        height={size}
        role="img"
        aria-label={desc}
        className={cn('max-w-full', (reducedMotion || !animate) && 'paused')}
      >
        <defs>
          <radialGradient id="nucleusGrad">
            <stop offset="0%" stopColor="var(--proton)" />
            <stop offset="100%" stopColor="var(--neutron)" />
          </radialGradient>
        </defs>
        {shells.map((count, k) => {
          const R = nucleusR + gap * (k + 1)
          const dimShell = highlight && highlight !== 'shell' && highlight !== 'electron'
          return (
            <g key={k}>
              <circle
                cx={c}
                cy={c}
                r={R}
                fill="none"
                stroke={current === 'shell' ? 'var(--primary)' : 'var(--border)'}
                strokeWidth={current === 'shell' || highlight === 'shell' ? 3 : 1.5}
                strokeDasharray={highlight === 'shell' ? undefined : '0'}
                opacity={dimShell ? 0.6 : 1}
              />
              {/* bredare osynlig ring för att det ska vara lätt att klicka */}
              <circle cx={c} cy={c} r={R} fill="none" stroke="transparent" strokeWidth={10} className="cursor-pointer" onClick={() => handle('shell')} />
              <text x={c + R * 0.707 + 4} y={c - R * 0.707 - 2} fontSize={10} fill="var(--muted)" aria-hidden>
                {SHELL_NAMES[k]}
              </text>
              <g className="orbit" style={{ ['--orbit-duration' as string]: `${30 + k * 12}s` }}>
                {Array.from({ length: count }).map((_, j) => {
                  const a = (j / count) * Math.PI * 2 + k * 0.4
                  const dimE = highlight && highlight !== 'electron' && highlight !== 'shell'
                  return (
                    <circle
                      key={j}
                      cx={c + R * Math.cos(a)}
                      cy={c + R * Math.sin(a)}
                      r={5.2}
                      fill="var(--electron)"
                      stroke={current === 'electron' ? 'var(--foreground)' : 'white'}
                      strokeWidth={current === 'electron' ? 1.8 : 1}
                      opacity={dimE ? 0.5 : 1}
                      className="cursor-pointer"
                      onClick={() => handle('electron')}
                    >
                      <title>Elektron (−)</title>
                    </circle>
                  )
                })}
              </g>
            </g>
          )
        })}
        <Nucleus protons={protons} neutrons={neutrons} cx={c} cy={c} radius={nucleusR} highlight={highlight} onPart={handle} selected={current} />
        {total === 0 && electrons === 0 && (
          <text x={c} y={c} textAnchor="middle" fill="var(--muted)" fontSize={13}>
            Tomt – lägg till partiklar
          </text>
        )}
      </svg>

      {interactive && showButtons && (
        <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Välj en del av atomen">
          {(['proton', 'neutron', 'electron', 'nucleus', 'shell'] as AtomPart[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => handle(p)}
              aria-pressed={current === p}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                current === p ? 'border-primary bg-primary-soft text-primary' : 'border-border hover:bg-surface-2',
              )}
            >
              <span
                className="size-2.5 rounded-full"
                style={{
                  background:
                    p === 'proton' ? 'var(--proton)' : p === 'neutron' ? 'var(--neutron)' : p === 'electron' ? 'var(--electron)' : 'var(--border)',
                }}
              />
              {PART_INFO[p].title}
            </button>
          ))}
        </div>
      )}

      {interactive && showInfo && current && (
        <div className="w-full max-w-md rounded-2xl bg-surface-2 p-3 text-sm" aria-live="polite">
          <strong>{PART_INFO[current].title}:</strong> {PART_INFO[current].text}
        </div>
      )}
      <p className="text-center text-[0.7rem] text-muted">Förenklad skalmodell (Bohrs modell) – inte skalenlig.</p>
    </div>
  )
}

/** Bara kärnan, större – som i uppgifter med röda och blå kulor. */
export function NucleusDiagram({
  protons,
  neutrons,
  size = 220,
  interactive = true,
  onPartClick,
}: {
  protons: number
  neutrons: number
  size?: number
  interactive?: boolean
  onPartClick?: (p: AtomPart) => void
}) {
  const [selected, setSelected] = useState<AtomPart | null>(null)
  const handle = (p: AtomPart) => {
    if (!interactive) return
    setSelected(p)
    onPartClick?.(p)
  }
  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 160 160" width={size} height={size} role="img" aria-label={`Atomkärna med ${protons} protoner och ${neutrons} neutroner`}>
        <Nucleus protons={protons} neutrons={neutrons} cx={80} cy={80} radius={Math.min(66, 14 + Math.sqrt(protons + neutrons) * 11)} onPart={handle} selected={selected} />
      </svg>
      <div className="flex gap-4 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-3 rounded-full bg-proton" /> Proton
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-3 rounded-full bg-neutron" /> Neutron
        </span>
      </div>
      {interactive && selected && (
        <div className="max-w-sm rounded-2xl bg-surface-2 p-3 text-sm" aria-live="polite">
          <strong>{PART_INFO[selected].title}:</strong> {PART_INFO[selected].text}
        </div>
      )}
    </div>
  )
}
