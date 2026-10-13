import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Droplet, FlaskConical, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { useSettings } from '@/store/settings'
import { cn } from '@/lib/utils'

/* ───────────── pH-simulering ─────────────
 * Förenklad modell: 100 ml vatten. Varje droppe syra/bas är 0,05 ml av en
 * 1 mol/dm³ stark syra (HCl) eller stark bas (NaOH). pH räknas från överskottet.
 */
export function phFromDrops(acid: number, base: number, volumeMl = 100): number {
  const molPerDrop = 0.05e-3 // 0,05 ml · 1 mol/dm³
  const totalVolumeL = (volumeMl + (acid + base) * 0.05) / 1000
  const excess = (acid - base) * molPerDrop
  if (Math.abs(excess) < 1e-12) return 7
  if (excess > 0) {
    const h = excess / totalVolumeL + 1e-7
    return Math.max(0, -Math.log10(h))
  }
  const oh = -excess / totalVolumeL + 1e-7
  return Math.min(14, 14 + Math.log10(oh))
}

/** Rödkålsindikatorns ungefärliga färger. */
function indicatorColor(ph: number) {
  const stops: Array<[number, string]> = [
    [1, '#e0245e'],
    [3, '#e85a8a'],
    [5, '#b06bb5'],
    [7, '#7b6fd0'],
    [8, '#4f86d6'],
    [10, '#2fa88f'],
    [12, '#9cc93a'],
    [14, '#e6d32b'],
  ]
  for (let i = 0; i < stops.length - 1; i++) if (ph <= stops[i + 1][0]) return stops[i][1]
  return stops.at(-1)![1]
}

export function PhSim() {
  const [acid, setAcid] = useState(0)
  const [base, setBase] = useState(0)
  const ph = phFromDrops(acid, base)
  const label = ph < 6.5 ? 'surt' : ph > 7.5 ? 'basiskt' : 'neutralt'
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-end gap-6">
        <div className="relative h-48 w-36 overflow-hidden rounded-b-[2.5rem] rounded-t-lg border-4 border-t-0 border-border bg-surface">
          <motion.div className="absolute inset-x-0 bottom-0 h-[78%]" animate={{ backgroundColor: indicatorColor(ph) }} transition={{ duration: 0.6 }} />
          <div className="absolute inset-x-0 top-3 text-center text-xs text-muted">100 ml vatten + rödkålsindikator</div>
        </div>
        <div className="text-center">
          <div className="font-display text-5xl font-semibold">{ph.toFixed(1)}</div>
          <div className="text-sm text-muted">pH – {label}</div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <Button variant="pink" onClick={() => setAcid((a) => a + 1)}>
          <Droplet /> 1 droppe saltsyra
        </Button>
        <Button variant="soft" onClick={() => setBase((b) => b + 1)}>
          <Droplet /> 1 droppe natriumhydroxid
        </Button>
        <Button variant="outline" onClick={() => (setAcid(0), setBase(0))}>
          <RotateCcw /> Börja om
        </Button>
      </div>
      <p className="text-sm text-muted">
        Droppar syra: {acid} · droppar bas: {base}
      </p>
      <div className="w-full max-w-xl rounded-2xl bg-surface-2 p-4 text-sm" aria-live="polite">
        {acid === 0 && base === 0
          ? 'Rent vatten har pH 7. Prova att droppa i syra eller bas.'
          : acid === base
            ? 'Lika många droppar syra och bas: de har neutraliserat varandra. H⁺ + OH⁻ → H₂O. pH är tillbaka på 7.'
            : acid > base
              ? `Det finns ett överskott av H⁺-joner, så lösningen är sur. Lägg märke till att pH sjunker snabbt de första dropparna – varje steg på skalan betyder tio gånger fler H⁺-joner.`
              : `Det finns ett överskott av OH⁻-joner, så lösningen är basisk. Om du droppar i syra igen neutraliseras OH⁻-jonerna.`}
      </div>
    </div>
  )
}

/* ───────────── Osmos ───────────── */
export function osmosisResult(outsideSalt: number) {
  // cellens insida ≈ 0,9 % salt
  const inside = 0.9
  if (Math.abs(outsideSalt - inside) < 0.15) return { size: 1, flow: 'ingen' as const }
  const size = Math.max(0.55, Math.min(1.35, 1 + (inside - outsideSalt) * 0.18))
  return { size, flow: outsideSalt < inside ? ('in' as const) : ('ut' as const) }
}

export function OsmosisSim() {
  const [salt, setSalt] = useState(0.9)
  const [cell, setCell] = useState<'djur' | 'vaxt'>('djur')
  const { size, flow } = osmosisResult(salt)
  const burst = cell === 'djur' && salt < 0.2
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <Button size="sm" variant={cell === 'djur' ? 'default' : 'outline'} onClick={() => setCell('djur')}>
          Röd blodkropp
        </Button>
        <Button size="sm" variant={cell === 'vaxt' ? 'default' : 'outline'} onClick={() => setCell('vaxt')}>
          Växtcell
        </Button>
      </div>
      <div className="relative flex h-56 w-full max-w-md items-center justify-center overflow-hidden rounded-3xl" style={{ background: `color-mix(in srgb, var(--blue-soft), var(--cream) ${Math.min(100, salt * 12)}%)` }}>
        {cell === 'vaxt' && <div className="absolute size-36 rounded-xl border-[6px] border-green" aria-hidden />}
        {!burst ? (
          <motion.div
            animate={{ scale: cell === 'vaxt' ? Math.min(1, size) : size }}
            transition={{ type: 'spring', stiffness: 60 }}
            className={cn('flex size-32 items-center justify-center border-4 text-xs font-medium', cell === 'djur' ? 'rounded-full border-danger bg-danger-soft' : 'rounded-lg border-pink bg-green-soft')}
          >
            {cell === 'djur' ? 'blodkropp' : 'cellinnehåll'}
          </motion.div>
        ) : (
          <div className="text-sm font-medium text-danger">💥 Cellen har spruckit (hemolys)</div>
        )}
        <div className="absolute bottom-2 left-3 text-xs text-muted">Salthalt utanför: {salt.toFixed(1)} %</div>
        {flow !== 'ingen' && !burst && (
          <div className="absolute right-3 top-3 rounded-full bg-surface/80 px-2 py-0.5 text-xs">Vatten {flow === 'in' ? 'in i cellen →' : '← ut ur cellen'}</div>
        )}
      </div>
      <div className="w-full max-w-md">
        <Slider value={salt} min={0} max={5} step={0.1} onChange={setSalt} label="Salthalt utanför cellen" />
        <div className="mt-1 flex justify-between text-xs text-muted">
          <span>Destillerat vatten</span>
          <span>0,9 % (som i kroppen)</span>
          <span>Mycket salt</span>
        </div>
      </div>
      <div className="w-full max-w-xl rounded-2xl bg-surface-2 p-4 text-sm" aria-live="polite">
        {flow === 'ingen'
          ? 'Lika salthalt inne och ute (isoton lösning). Vatten rör sig lika mycket åt båda hållen, så cellen behåller sin storlek. Därför har koksaltlösning i dropp 0,9 % salt.'
          : flow === 'in'
            ? cell === 'djur'
              ? 'Lägre salthalt utanför (hypoton lösning). Vatten går genom membranet in i cellen genom osmos. En djurcell saknar cellvägg och kan svälla tills den spricker.'
              : 'Lägre salthalt utanför. Vatten går in i växtcellen, men cellväggen hindrar den från att spricka. Cellen blir spänd – det kallas turgor och gör att växten står upprätt.'
            : 'Högre salthalt utanför (hyperton lösning). Vatten lämnar cellen genom osmos och cellen skrumpnar. Därför vissnar växter i saltad jord, och därför blir du törstig av salt mat.'}
      </div>
    </div>
  )
}

/* ───────────── Nervimpuls ───────────── */
export function NerveSim() {
  const reduced = useSettings((s) => s.reducedMotion)
  const [strength, setStrength] = useState(10)
  const [myelin, setMyelin] = useState(true)
  const [fired, setFired] = useState<null | boolean>(null)
  const [run, setRun] = useState(0)
  const threshold = 15 // mV över vilopotentialen (−70 → −55)
  const fire = () => {
    setFired(strength >= threshold)
    setRun((r) => r + 1)
  }
  const duration = myelin ? 0.8 : 2.6
  const potential = useMemo(() => {
    if (!fired) return [-70, -70 + strength, -70, -70, -70]
    return [-70, -55, 30, -80, -70]
  }, [fired, strength])
  return (
    <div className="flex flex-col items-center gap-4">
      <svg viewBox="0 0 320 70" className="w-full max-w-lg" role="img" aria-label="Axon där en nervimpuls kan färdas">
        <line x1={20} y1={35} x2={300} y2={35} stroke="var(--primary)" strokeWidth={6} />
        {myelin && [40, 90, 140, 190, 240].map((x) => <rect key={x} x={x} y={25} width={38} height={20} rx={10} fill="var(--amber-soft)" stroke="var(--amber)" strokeWidth={2} />)}
        <circle cx={20} cy={35} r={14} fill="var(--primary-soft)" stroke="var(--primary)" strokeWidth={3} />
        {fired && (
          <motion.circle
            key={run}
            r={7}
            cy={35}
            fill="var(--pink)"
            initial={{ cx: 20, opacity: 1 }}
            animate={{ cx: 300, opacity: [1, 1, 0] }}
            transition={{ duration: reduced ? 0.01 : duration, ease: 'linear' }}
          />
        )}
      </svg>
      <div className="grid w-full max-w-lg gap-3">
        <label className="text-sm">
          Retningens styrka: <strong>{strength} mV</strong> (tröskeln är {threshold} mV)
          <Slider value={strength} min={0} max={40} onChange={setStrength} label="Retningens styrka" />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={myelin} onChange={(e) => setMyelin(e.target.checked)} className="size-4 accent-[var(--primary)]" />
          Axonet har myelinskida
        </label>
        <Button onClick={fire} className="justify-self-center">
          ⚡ Reta nervcellen
        </Button>
      </div>
      <div className="flex w-full max-w-lg items-end justify-between gap-1 rounded-2xl bg-surface-2 p-3" aria-label="Membranpotential över tid">
        {potential.map((v, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <div className="flex h-24 w-full items-end justify-center">
              <div className={cn('w-6 rounded-t-md', v > -55 ? 'bg-pink' : 'bg-primary')} style={{ height: `${((v + 90) / 125) * 100}%` }} />
            </div>
            <span className="text-[0.65rem] text-muted">{v} mV</span>
          </div>
        ))}
      </div>
      <div className="w-full max-w-xl rounded-2xl bg-surface-2 p-4 text-sm" aria-live="polite">
        {fired === null
          ? 'En vilande nervcell har en spänning (vilopotential) på ungefär −70 mV över membranet. Välj styrka och reta nervcellen.'
          : fired
            ? `Retningen nådde tröskeln. Natriumkanaler öppnas, Na⁺ strömmar in och spänningen blir positiv (+30 mV). Sedan strömmar K⁺ ut och spänningen återställs. Impulsen gick ${myelin ? 'snabbt, eftersom den hoppar mellan luckorna i myelinskidan' : 'långsamt, eftersom axonet saknar myelin'}. Allt-eller-inget: en starkare retning ger inte en större impuls – bara fler impulser per sekund.`
            : 'Retningen var för svag för att nå tröskeln. Spänningen ändrades lite men ingen nervimpuls skickades. Det kallas allt-eller-inget-principen.'}
      </div>
    </div>
  )
}

/* ───────────── Halveringstid ───────────── */
export function HalfLifeSim() {
  const [halfLives, setHalfLives] = useState(0)
  const [atoms, setAtoms] = useState<boolean[]>(() => Array.from({ length: 100 }, () => true))
  const [seed, setSeed] = useState(1)
  useEffect(() => {
    setAtoms(Array.from({ length: 100 }, () => true))
    setHalfLives(0)
  }, [seed])
  const step = () => {
    setAtoms((a) => a.map((alive) => alive && Math.random() >= 0.5))
    setHalfLives((h) => h + 1)
  }
  const left = atoms.filter(Boolean).length
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-10 gap-1.5" role="img" aria-label={`${left} av 100 kol-14-atomer finns kvar`}>
        {atoms.map((alive, i) => (
          <div key={i} className={cn('size-5 rounded-full transition-colors', alive ? 'bg-pink' : 'bg-blue-soft')} />
        ))}
      </div>
      <div className="flex gap-6 text-center">
        <div>
          <div className="font-display text-3xl font-semibold">{left}</div>
          <div className="text-xs text-muted">kol-14 kvar</div>
        </div>
        <div>
          <div className="font-display text-3xl font-semibold">{(halfLives * 5730).toLocaleString('sv-SE')}</div>
          <div className="text-xs text-muted">år har gått</div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={step} disabled={left === 0}>
          <FlaskConical /> Låt 5 730 år gå
        </Button>
        <Button variant="outline" onClick={() => setSeed((s) => s + 1)}>
          <RotateCcw /> Börja om
        </Button>
      </div>
      <div className="w-full max-w-xl rounded-2xl bg-surface-2 p-4 text-sm" aria-live="polite">
        Rosa = kol-14 som finns kvar, blå = har sönderfallit till kväve-14. Efter varje halveringstid (5 730 år för kol-14) har ungefär hälften sönderfallit. Det är slumpen
        som avgör vilken atom som sönderfaller – därför blir det inte exakt hälften varje gång, men med många atomer blir det mycket nära. Förväntat nu: ca{' '}
        {Math.round(100 / 2 ** halfLives)} st.
      </div>
    </div>
  )
}
