import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, RotateCcw, Zap } from 'lucide-react'
import { getElement, ionNotation, shellDistribution, typicalIonCharge, toSubscript } from '@/lib/chemistry'
import { Button } from '@/components/ui/button'
import { useSettings } from '@/store/settings'

const METALS = [3, 11, 19, 12, 20, 13]
const NONMETALS = [9, 17, 35, 8, 16, 7]

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

/** Formel för en jonförening, t.ex. (12, 17) → "MgCl₂". */
export function ionicFormula(metalZ: number, nonmetalZ: number): { formula: string; metalCount: number; nonmetalCount: number } {
  const m = getElement(metalZ)!
  const n = getElement(nonmetalZ)!
  const cp = typicalIonCharge(metalZ)!
  const cn = Math.abs(typicalIonCharge(nonmetalZ)!)
  const l = (cp * cn) / gcd(cp, cn)
  const metalCount = l / cp
  const nonmetalCount = l / cn
  const formula = `${m.symbol}${metalCount > 1 ? toSubscript(metalCount) : ''}${n.symbol}${nonmetalCount > 1 ? toSubscript(nonmetalCount) : ''}`
  return { formula, metalCount, nonmetalCount }
}

function MiniAtom({ z, electrons, label, highlightOuter }: { z: number; electrons: number; label: string; highlightOuter: boolean }) {
  const shells = shellDistribution(z, electrons)
  const base = 16
  const gap = 15
  return (
    <svg viewBox="0 0 120 120" className="h-32 w-32" role="img" aria-label={`${label}: ${shells.join(', ')}`}>
      <circle cx={60} cy={60} r={base} fill="url(#ntGrad)" />
      <defs>
        <radialGradient id="ntGrad">
          <stop offset="0%" stopColor="var(--proton)" />
          <stop offset="100%" stopColor="var(--neutron)" />
        </radialGradient>
      </defs>
      <text x={60} y={64} textAnchor="middle" fontSize={11} fontWeight={700} fill="white">
        {getElement(z)!.symbol}
      </text>
      {shells.map((count, k) => {
        const R = base + gap * (k + 1) - 6
        const outer = k === shells.length - 1
        return (
          <g key={k}>
            <circle cx={60} cy={60} r={R} fill="none" stroke="var(--border)" strokeWidth={1.2} />
            {Array.from({ length: count }).map((_, j) => {
              const a = (j / count) * Math.PI * 2 - Math.PI / 2
              return (
                <circle
                  key={j}
                  cx={60 + R * Math.cos(a)}
                  cy={60 + R * Math.sin(a)}
                  r={3.4}
                  fill={outer && highlightOuter ? 'var(--amber)' : 'var(--electron)'}
                  stroke="white"
                  strokeWidth={0.8}
                />
              )
            })}
          </g>
        )
      })}
    </svg>
  )
}

export function ElectronTransfer({ metal = 11, nonmetal = 17, chooser = false }: { metal?: number; nonmetal?: number; chooser?: boolean }) {
  const reduced = useSettings((s) => s.reducedMotion)
  const [m, setM] = useState(metal)
  const [n, setN] = useState(nonmetal)
  const [done, setDone] = useState(false)
  useEffect(() => setDone(false), [m, n])

  const me = getElement(m)!
  const ne = getElement(n)!
  const metalCharge = typicalIonCharge(m)!
  const nonCharge = typicalIonCharge(n)!
  const { formula, metalCount, nonmetalCount } = useMemo(() => ionicFormula(m, n), [m, n])
  const moved = metalCharge * metalCount

  return (
    <div className="flex w-full flex-col items-center gap-4">
      {chooser && (
        <div className="grid w-full max-w-xl gap-3 sm:grid-cols-2">
          <label className="text-sm">
            <span className="mb-1 block font-medium">Metall (avger elektroner)</span>
            <select className="h-10 w-full rounded-xl border border-border bg-surface px-3" value={m} onChange={(e) => setM(Number(e.target.value))}>
              {METALS.map((z) => (
                <option key={z} value={z}>
                  {getElement(z)!.name} ({getElement(z)!.symbol})
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-1 block font-medium">Ickemetall (tar upp elektroner)</span>
            <select className="h-10 w-full rounded-xl border border-border bg-surface px-3" value={n} onChange={(e) => setN(Number(e.target.value))}>
              {NONMETALS.map((z) => (
                <option key={z} value={z}>
                  {getElement(z)!.name} ({getElement(z)!.symbol})
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-6">
        <div className="flex flex-col items-center">
          <MiniAtom z={m} electrons={done ? m - metalCharge : m} label={me.name} highlightOuter={!done} />
          <span className="text-sm font-semibold">{done ? ionNotation(me.symbol, metalCharge) : me.name}</span>
          <span className="text-xs text-muted">{shellDistribution(m, done ? m - metalCharge : m).join(', ')}</span>
          {metalCount > 1 && <span className="text-xs text-muted">× {metalCount}</span>}
        </div>
        <div className="flex flex-col items-center gap-1 text-muted">
          {done ? (
            <motion.div initial={reduced ? false : { scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-1 text-pink">
              <Zap className="size-5" /> <span className="text-xs font-medium">+ och − dras ihop</span>
            </motion.div>
          ) : (
            <>
              <motion.div animate={reduced ? undefined : { x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
                <ArrowRight className="size-6 text-amber" />
              </motion.div>
              <span className="text-xs">{moved} e⁻</span>
            </>
          )}
        </div>
        <div className="flex flex-col items-center">
          <MiniAtom z={n} electrons={done ? n - nonCharge : n} label={ne.name} highlightOuter={false} />
          <span className="text-sm font-semibold">{done ? ionNotation(ne.symbol, nonCharge) : ne.name}</span>
          <span className="text-xs text-muted">{shellDistribution(n, done ? n - nonCharge : n).join(', ')}</span>
          {nonmetalCount > 1 && <span className="text-xs text-muted">× {nonmetalCount}</span>}
        </div>
      </div>

      <div className="flex gap-2">
        {!done ? (
          <Button onClick={() => setDone(true)}>
            <Zap /> Flytta elektronerna
          </Button>
        ) : (
          <Button variant="outline" onClick={() => setDone(false)}>
            <RotateCcw /> Börja om
          </Button>
        )}
      </div>

      <div className="w-full max-w-xl rounded-2xl bg-surface-2 p-4 text-sm" aria-live="polite">
        {!done ? (
          <p>
            {me.name} har {shellDistribution(m).at(-1)} valenselektron{shellDistribution(m).at(-1) === 1 ? '' : 'er'} (gula). {ne.name} har{' '}
            {shellDistribution(n).at(-1)} och saknar {Math.abs(nonCharge)} för att få fullt yttersta skal. Tryck på knappen för att se vad som händer.
          </p>
        ) : (
          <p>
            {metalCount > 1 ? `${metalCount} ${me.name.toLowerCase()}atomer` : me.name} avger totalt {moved} elektron{moved === 1 ? '' : 'er'} till{' '}
            {nonmetalCount > 1 ? `${nonmetalCount} ${ne.name.toLowerCase()}atomer` : ne.name.toLowerCase()}. Nu har båda jonerna ädelgasstruktur. De
            positiva och negativa jonerna attraherar varandra – det är en <strong>jonbindning</strong>. Formeln blir <strong>{formula}</strong>, eftersom
            laddningarna måste ta ut varandra: {metalCount} · (+{metalCharge}) + {nonmetalCount} · (−{Math.abs(nonCharge)}) = 0.
          </p>
        )}
      </div>
    </div>
  )
}
