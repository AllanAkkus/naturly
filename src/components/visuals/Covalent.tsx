import { useState } from 'react'
import type { MoleculeId } from '@/content/types'
import { cn } from '@/lib/utils'

interface MAtom {
  s: string
  x: number
  y: number
  lone: number[] // vinklar (grader) för fria elektronpar
}
interface MBond {
  a: number
  b: number
  order: 1 | 2 | 3
}
interface Molecule {
  name: string
  formula: string
  atoms: MAtom[]
  bonds: MBond[]
  info: string
}

const COLORS: Record<string, string> = {
  H: 'var(--cream)',
  O: 'var(--pink)',
  C: '#6b6878',
  N: 'var(--blue)',
  Cl: 'var(--green)',
}

const ATOM_INFO: Record<string, string> = {
  H: 'Väte har 1 valenselektron. Genom att dela ett elektronpar får det 2 elektroner runt sig – samma som helium.',
  O: 'Syre har 6 valenselektroner. Genom att dela två elektronpar får det 8 runt sig (en oktett).',
  C: 'Kol har 4 valenselektroner och bildar fyra bindningar för att få 8 runt sig.',
  N: 'Kväve har 5 valenselektroner och bildar tre bindningar för att få 8 runt sig.',
  Cl: 'Klor har 7 valenselektroner och delar ett elektronpar för att få 8 runt sig.',
}

const BOND_INFO = {
  1: 'Enkelbindning: ett delat elektronpar (2 elektroner).',
  2: 'Dubbelbindning: två delade elektronpar (4 elektroner).',
  3: 'Trippelbindning: tre delade elektronpar (6 elektroner).',
}

export const MOLECULES: Record<MoleculeId, Molecule> = {
  H2: { name: 'Vätgas', formula: 'H₂', atoms: [{ s: 'H', x: 120, y: 100, lone: [] }, { s: 'H', x: 180, y: 100, lone: [] }], bonds: [{ a: 0, b: 1, order: 1 }], info: 'Två väteatomer delar ett elektronpar.' },
  O2: { name: 'Syrgas', formula: 'O₂', atoms: [{ s: 'O', x: 115, y: 100, lone: [135, 225] }, { s: 'O', x: 185, y: 100, lone: [45, -45] }], bonds: [{ a: 0, b: 1, order: 2 }], info: 'Två syreatomer delar två elektronpar – en dubbelbindning.' },
  N2: { name: 'Kvävgas', formula: 'N₂', atoms: [{ s: 'N', x: 115, y: 100, lone: [180] }, { s: 'N', x: 185, y: 100, lone: [0] }], bonds: [{ a: 0, b: 1, order: 3 }], info: 'Två kväveatomer delar tre elektronpar – en trippelbindning. Därför är kvävgas mycket stabil.' },
  Cl2: { name: 'Klorgas', formula: 'Cl₂', atoms: [{ s: 'Cl', x: 115, y: 100, lone: [90, 180, 270] }, { s: 'Cl', x: 185, y: 100, lone: [90, 0, 270] }], bonds: [{ a: 0, b: 1, order: 1 }], info: 'Två kloratomer delar ett elektronpar.' },
  H2O: {
    name: 'Vatten',
    formula: 'H₂O',
    atoms: [{ s: 'O', x: 150, y: 85, lone: [235, 305] }, { s: 'H', x: 98, y: 135, lone: [] }, { s: 'H', x: 202, y: 135, lone: [] }],
    bonds: [{ a: 0, b: 1, order: 1 }, { a: 0, b: 2, order: 1 }],
    info: 'Syret delar ett elektronpar med vardera väteatomen. De två fria elektronparen gör molekylen vinklad – och polär.',
  },
  CO2: {
    name: 'Koldioxid',
    formula: 'CO₂',
    atoms: [{ s: 'O', x: 80, y: 100, lone: [135, 225] }, { s: 'C', x: 150, y: 100, lone: [] }, { s: 'O', x: 220, y: 100, lone: [45, -45] }],
    bonds: [{ a: 0, b: 1, order: 2 }, { a: 1, b: 2, order: 2 }],
    info: 'Kolet bildar en dubbelbindning med vardera syreatomen. Molekylen är rak.',
  },
  CH4: {
    name: 'Metan',
    formula: 'CH₄',
    atoms: [{ s: 'C', x: 150, y: 100, lone: [] }, { s: 'H', x: 150, y: 40, lone: [] }, { s: 'H', x: 150, y: 160, lone: [] }, { s: 'H', x: 90, y: 100, lone: [] }, { s: 'H', x: 210, y: 100, lone: [] }],
    bonds: [{ a: 0, b: 1, order: 1 }, { a: 0, b: 2, order: 1 }, { a: 0, b: 3, order: 1 }, { a: 0, b: 4, order: 1 }],
    info: 'Kol delar ett elektronpar med var och en av fyra väteatomer. (I verkligheten är metan en tetraeder i 3D.)',
  },
  NH3: {
    name: 'Ammoniak',
    formula: 'NH₃',
    atoms: [{ s: 'N', x: 150, y: 85, lone: [270] }, { s: 'H', x: 95, y: 130, lone: [] }, { s: 'H', x: 205, y: 130, lone: [] }, { s: 'H', x: 150, y: 150, lone: [] }],
    bonds: [{ a: 0, b: 1, order: 1 }, { a: 0, b: 2, order: 1 }, { a: 0, b: 3, order: 1 }],
    info: 'Kväve delar ett elektronpar med var och en av tre väteatomer och har ett fritt elektronpar kvar.',
  },
  HCl: {
    name: 'Väteklorid',
    formula: 'HCl',
    atoms: [{ s: 'H', x: 115, y: 100, lone: [] }, { s: 'Cl', x: 185, y: 100, lone: [90, 0, 270] }],
    bonds: [{ a: 0, b: 1, order: 1 }],
    info: 'Väte och klor delar ett elektronpar. Klor drar hårdare i elektronerna, så bindningen är polär.',
  },
}

export function CovalentDiagram({ molecule }: { molecule: MoleculeId }) {
  const mol = MOLECULES[molecule]
  const [sel, setSel] = useState<string | null>(null)
  const r = (s: string) => (s === 'H' ? 17 : 24)
  return (
    <div className="flex w-full flex-col items-center gap-3">
      <svg viewBox="0 0 300 200" className="w-full max-w-sm" role="img" aria-label={`${mol.name}, ${mol.formula}. ${mol.info}`}>
        {mol.bonds.map((b, i) => {
          const A = mol.atoms[b.a]
          const B = mol.atoms[b.b]
          const dx = B.x - A.x
          const dy = B.y - A.y
          const len = Math.hypot(dx, dy)
          const nx = -dy / len
          const ny = dx / len
          const offsets = b.order === 1 ? [0] : b.order === 2 ? [-5, 5] : [-8, 0, 8]
          const mx = (A.x + B.x) / 2
          const my = (A.y + B.y) / 2
          return (
            <g key={i} className="cursor-pointer" onClick={() => setSel(`bond-${b.order}`)}>
              {offsets.map((o, k) => (
                <line key={k} x1={A.x + nx * o} y1={A.y + ny * o} x2={B.x + nx * o} y2={B.y + ny * o} stroke="var(--muted)" strokeWidth={2.5} />
              ))}
              {offsets.map((o, k) => (
                <g key={`e${k}`}>
                  <circle cx={mx + nx * o * 1.6 - (dx / len) * 4} cy={my + ny * o * 1.6 - (dy / len) * 4} r={3} fill="var(--electron)" />
                  <circle cx={mx + nx * o * 1.6 + (dx / len) * 4} cy={my + ny * o * 1.6 + (dy / len) * 4} r={3} fill="var(--electron)" />
                </g>
              ))}
              <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="transparent" strokeWidth={18} />
            </g>
          )
        })}
        {mol.atoms.map((a, i) => (
          <g key={i} className="cursor-pointer" onClick={() => setSel(`atom-${a.s}`)}>
            <circle cx={a.x} cy={a.y} r={r(a.s)} fill={COLORS[a.s]} stroke={sel === `atom-${a.s}` ? 'var(--foreground)' : 'white'} strokeWidth={2} />
            <text x={a.x} y={a.y + 5} textAnchor="middle" fontSize={a.s === 'H' ? 13 : 15} fontWeight={700} fill={a.s === 'C' ? 'white' : '#2b2a33'}>
              {a.s}
            </text>
            {a.lone.map((deg, k) => {
              const rad = (deg * Math.PI) / 180
              const d = r(a.s) + 8
              const px = a.x + d * Math.cos(rad)
              const py = a.y + d * Math.sin(rad)
              const tx = -Math.sin(rad) * 4
              const ty = Math.cos(rad) * 4
              return (
                <g key={k}>
                  <circle cx={px + tx} cy={py + ty} r={2.6} fill="var(--electron)" opacity={0.7} />
                  <circle cx={px - tx} cy={py - ty} r={2.6} fill="var(--electron)" opacity={0.7} />
                </g>
              )
            })}
          </g>
        ))}
      </svg>
      <div className="flex flex-wrap justify-center gap-2">
        {[...new Set(mol.atoms.map((a) => a.s))].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSel(`atom-${s}`)}
            className={cn('rounded-full border px-3 py-1 text-xs font-medium', sel === `atom-${s}` ? 'border-primary bg-primary-soft text-primary' : 'border-border')}
          >
            Atom: {s}
          </button>
        ))}
        {[...new Set(mol.bonds.map((b) => b.order))].map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => setSel(`bond-${o}`)}
            className={cn('rounded-full border px-3 py-1 text-xs font-medium', sel === `bond-${o}` ? 'border-primary bg-primary-soft text-primary' : 'border-border')}
          >
            {o === 1 ? 'Enkelbindning' : o === 2 ? 'Dubbelbindning' : 'Trippelbindning'}
          </button>
        ))}
      </div>
      <div className="w-full max-w-md rounded-2xl bg-surface-2 p-3 text-sm" aria-live="polite">
        <strong>
          {mol.name} ({mol.formula}):
        </strong>{' '}
        {sel?.startsWith('atom-') ? ATOM_INFO[sel.slice(5)] : sel?.startsWith('bond-') ? BOND_INFO[Number(sel.slice(5)) as 1 | 2 | 3] : mol.info}
      </div>
      <p className="text-[0.7rem] text-muted">Prickarna är elektroner. Par mellan atomerna är delade, par vid sidan är fria elektronpar.</p>
    </div>
  )
}
