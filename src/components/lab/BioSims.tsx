import { useMemo, useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ReferenceArea, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Apple, Bike, Clock, RotateCcw, Syringe, Bug } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

const chartTooltip = { contentStyle: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12 } }

/* ───────────── Blodsockerreglering ─────────────
 * Förenklad modell i timmar. Normal fastevärde ≈ 5 mmol/l.
 */
export interface SugarState {
  t: number
  glucose: number
  insulin: number
  glucagon: number
}

export function sugarStep(s: SugarState, event: 'meal' | 'exercise' | 'wait', diabetes: boolean): SugarState[] {
  const out: SugarState[] = []
  let g = s.glucose
  let t = s.t
  if (event === 'meal') g += 4.5
  if (event === 'exercise') g -= 1.6
  for (let i = 0; i < 4; i++) {
    t += 0.5
    const insulin = diabetes ? 0 : Math.max(0, (g - 5) * 1.2)
    const glucagon = Math.max(0, (5 - g) * 1.5)
    g += -insulin * 0.35 + glucagon * 0.3 - (diabetes ? 0.05 : 0)
    if (!diabetes) g = Math.max(3.2, g)
    out.push({ t, glucose: Number(g.toFixed(2)), insulin: Number(insulin.toFixed(2)), glucagon: Number(glucagon.toFixed(2)) })
  }
  return out
}

export function BloodSugarSim() {
  const [diabetes, setDiabetes] = useState(false)
  const [data, setData] = useState<SugarState[]>([{ t: 0, glucose: 5, insulin: 0, glucagon: 0 }])
  const last = data.at(-1)!
  const act = (e: 'meal' | 'exercise' | 'wait') => setData((d) => [...d, ...sugarStep(d.at(-1)!, e, diabetes)].slice(-40))
  const status = last.glucose > 7 ? 'högt' : last.glucose < 4 ? 'lågt' : 'normalt'
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap justify-center gap-2">
        <Button variant="pink" onClick={() => act('meal')}>
          <Apple /> Ät en måltid
        </Button>
        <Button variant="soft" onClick={() => act('exercise')}>
          <Bike /> Träna
        </Button>
        <Button variant="outline" onClick={() => act('wait')}>
          <Clock /> Vänta 2 timmar
        </Button>
        <Button variant="ghost" onClick={() => setData([{ t: 0, glucose: 5, insulin: 0, glucagon: 0 }])}>
          <RotateCcw /> Börja om
        </Button>
      </div>
      <label className="flex items-center justify-center gap-2 text-sm">
        <input type="checkbox" checked={diabetes} onChange={(e) => setDiabetes(e.target.checked)} className="size-4" />
        Simulera typ 1-diabetes (bukspottkörteln bildar inget insulin)
      </label>
      <div className="h-60 w-full">
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 8, right: 12, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <ReferenceArea y1={4} y2={7} fill="var(--green-soft)" fillOpacity={0.6} />
            <XAxis dataKey="t" tick={{ fontSize: 11, fill: 'var(--muted)' }} unit=" h" />
            <YAxis tick={{ fontSize: 11, fill: 'var(--muted)' }} domain={[0, 'auto']} />
            <Tooltip {...chartTooltip} />
            <Legend />
            <Line dataKey="glucose" name="Blodsocker (mmol/l)" stroke="var(--chart-2)" strokeWidth={2} dot={false} isAnimationActive={false} />
            <Line dataKey="insulin" name="Insulin" stroke="var(--chart-1)" strokeWidth={2} dot={false} isAnimationActive={false} />
            <Line dataKey="glucagon" name="Glukagon" stroke="var(--chart-5)" strokeWidth={2} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="rounded-2xl bg-surface-2 p-4 text-sm" aria-live="polite">
        Blodsockret är nu <strong>{last.glucose.toFixed(1)} mmol/l ({status})</strong>. Det gröna fältet är normalområdet.{' '}
        {diabetes
          ? 'Utan insulin kan cellerna inte ta upp glukos ordentligt, och blodsockret stannar högt efter måltider. Därför behöver personer med typ 1-diabetes tillföra insulin.'
          : last.glucose > 6
            ? 'Bukspottkörteln känner av det höga värdet och frisätter insulin. Insulin får celler att ta upp glukos och levern att lagra den som glykogen – blodsockret sjunker. Det är negativ återkoppling.'
            : last.glucose < 4.6
              ? 'Blodsockret är lågt, så bukspottkörteln frisätter glukagon. Glukagon får levern att bryta ned glykogen till glukos – blodsockret stiger igen.'
              : 'Kroppen håller blodsockret stabilt. Det är ett exempel på homeostas.'}
      </div>
    </div>
  )
}

/* ───────────── Immunsvar ───────────── */
export function antibodyCurve(firstDay: number | null, secondDay: number | null, days = 60) {
  const points = []
  for (let d = 0; d <= days; d++) {
    let ab = 0
    if (firstDay !== null && d >= firstDay) {
      const x = d - firstDay
      ab += x < 5 ? 0 : 10 * Math.exp(-((x - 12) ** 2) / 30)
      ab += x >= 12 ? 1.2 : 0 // minnesceller ger kvarvarande låg nivå
    }
    if (secondDay !== null && firstDay !== null && d >= secondDay) {
      const x = d - secondDay
      ab += x < 1 ? 0 : 70 * Math.exp(-((x - 6) ** 2) / 26)
    }
    points.push({ dag: d, antikroppar: Number(ab.toFixed(2)) })
  }
  return points
}

export function ImmuneSim() {
  const [first, setFirst] = useState<number | null>(null)
  const [second, setSecond] = useState<number | null>(null)
  const [vaccine, setVaccine] = useState(false)
  const data = useMemo(() => antibodyCurve(first, second), [first, second])
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          variant="soft"
          disabled={first !== null}
          onClick={() => {
            setVaccine(true)
            setFirst(2)
          }}
        >
          <Syringe /> Vaccinera (dag 2)
        </Button>
        <Button
          variant="pink"
          disabled={first !== null}
          onClick={() => {
            setVaccine(false)
            setFirst(2)
          }}
        >
          <Bug /> Första infektionen (dag 2)
        </Button>
        <Button variant="pink" disabled={first === null || second !== null} onClick={() => setSecond(35)}>
          <Bug /> Samma virus igen (dag 35)
        </Button>
        <Button variant="ghost" onClick={() => (setFirst(null), setSecond(null))}>
          <RotateCcw /> Börja om
        </Button>
      </div>
      <div className="h-60 w-full">
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 8, right: 12, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="dag" tick={{ fontSize: 11, fill: 'var(--muted)' }} />
            <YAxis tick={{ fontSize: 11, fill: 'var(--muted)' }} />
            <Tooltip {...chartTooltip} />
            <Line dataKey="antikroppar" name="Antikroppar (relativ mängd)" stroke="var(--chart-1)" strokeWidth={2} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="rounded-2xl bg-surface-2 p-4 text-sm" aria-live="polite">
        {first === null
          ? 'Välj vaccination eller infektion. Kurvan visar hur mycket antikroppar som finns i blodet.'
          : second === null
            ? `${vaccine ? 'Vaccinet innehåller ofarliga delar av viruset (antigener).' : 'Viruset tar sig in i kroppen.'} Det tar ungefär en vecka innan B-cellerna har bildat mycket antikroppar – det primära immunsvaret är långsamt. ${vaccine ? 'Men du blev inte sjuk!' : 'Under tiden hinner du bli sjuk.'} Kvar finns minnesceller.`
            : `Minnescellerna känner igen viruset direkt. Det sekundära immunsvaret kommer snabbare, blir mycket starkare och håller i sig längre. ${vaccine ? 'Tack vare vaccinet blir du troligen inte sjuk alls.' : 'Därför blir man sällan sjuk i samma sjukdom två gånger.'}`}
      </div>
    </div>
  )
}

/* ───────────── Naturligt urval ───────────── */
export function selectionGeneration(dark: number, total: number, background: 'ljus' | 'mörk', rand = Math.random): number {
  // Andel som äts upp: synliga individer äts oftare
  const pDarkEaten = background === 'ljus' ? 0.5 : 0.15
  const pLightEaten = background === 'ljus' ? 0.15 : 0.5
  let survDark = 0
  let survLight = 0
  for (let i = 0; i < dark; i++) if (rand() > pDarkEaten) survDark++
  for (let i = 0; i < total - dark; i++) if (rand() > pLightEaten) survLight++
  const survivors = survDark + survLight
  if (survivors === 0) return 0
  // De överlevande får avkomma; populationen återställs till samma storlek. Små mutationer.
  let newDark = Math.round((survDark / survivors) * total)
  if (rand() < 0.3) newDark += rand() < 0.5 ? 1 : -1
  return Math.max(0, Math.min(total, newDark))
}

export function SelectionSim() {
  const total = 40
  const [bg, setBg] = useState<'ljus' | 'mörk'>('ljus')
  const [history, setHistory] = useState([{ generation: 0, mörka: 8 }])
  const dark = history.at(-1)!.mörka
  const step = () => setHistory((h) => [...h, { generation: h.length, mörka: selectionGeneration(h.at(-1)!.mörka, total, bg) }].slice(-30))
  const moths = useMemo(() => Array.from({ length: total }, (_, i) => ({ dark: i < dark, x: (i * 37) % 100, y: (i * 53) % 100 })), [dark])
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap justify-center gap-2">
        <Button size="sm" variant={bg === 'ljus' ? 'default' : 'outline'} onClick={() => setBg('ljus')}>
          Ljus björkbark
        </Button>
        <Button size="sm" variant={bg === 'mörk' ? 'default' : 'outline'} onClick={() => setBg('mörk')}>
          Sotig bark (industri)
        </Button>
      </div>
      <div className={cn('relative h-40 w-full overflow-hidden rounded-3xl transition-colors', bg === 'ljus' ? 'bg-[#ece7dc]' : 'bg-[#4a4540]')} role="img" aria-label={`${dark} mörka och ${total - dark} ljusa fjärilar på ${bg} bark`}>
        {moths.map((m, i) => (
          <span key={i} className={cn('absolute h-3 w-5 rounded-full', m.dark ? 'bg-[#2f2b28]' : 'bg-[#f3efe6] ring-1 ring-black/10')} style={{ left: `${4 + m.x * 0.9}%`, top: `${6 + m.y * 0.8}%` }} />
        ))}
      </div>
      <div className="flex justify-center gap-2">
        <Button onClick={step}>Nästa generation →</Button>
        <Button variant="ghost" onClick={() => setHistory([{ generation: 0, mörka: 8 }])}>
          <RotateCcw /> Börja om
        </Button>
      </div>
      <div className="h-48 w-full">
        <ResponsiveContainer>
          <LineChart data={history} margin={{ top: 8, right: 12, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="generation" tick={{ fontSize: 11, fill: 'var(--muted)' }} />
            <YAxis domain={[0, total]} tick={{ fontSize: 11, fill: 'var(--muted)' }} />
            <Tooltip {...chartTooltip} />
            <Line dataKey="mörka" name="Antal mörka fjärilar" stroke="var(--chart-1)" strokeWidth={2} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="rounded-2xl bg-surface-2 p-4 text-sm" aria-live="polite">
        Fåglar äter fler av de fjärilar som syns mot barken. De som överlever får ungar som liknar dem. Efter flera generationer ändras andelen mörka och ljusa fjärilar i
        populationen – det är <strong>naturligt urval</strong>. Ingen fjäril ändrar färg för att den vill; variationen fanns redan (från mutationer), och miljön avgör vilka som
        överlever. Detta hände på riktigt med björkmätare i England under industrialiseringen.
      </div>
    </div>
  )
}

/* ───────────── Kolets kretslopp ───────────── */
export function carbonStep(atm: number, fossil: number, deforest: number) {
  // Gigaton kol per år, mycket förenklat. Hav och växter tar upp en del av överskottet.
  const emissions = fossil + deforest
  const sinks = 0.45 * emissions
  return atm + (emissions - sinks)
}

export function CarbonSim() {
  const [fossil, setFossil] = useState(10)
  const [deforest, setDeforest] = useState(1)
  const data = useMemo(() => {
    const out = [{ år: 2025, atmosfär: 900 }]
    let atm = 900
    for (let y = 1; y <= 50; y++) {
      atm = carbonStep(atm, fossil, deforest)
      if (y % 5 === 0) out.push({ år: 2025 + y, atmosfär: Math.round(atm) })
    }
    return out
  }, [fossil, deforest])
  const ppm = (gt: number) => Math.round(gt / 2.13)
  const end = data.at(-1)!.atmosfär
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          Fossila bränslen: <strong>{fossil} Gt kol/år</strong>
          <Slider value={fossil} min={0} max={20} onChange={setFossil} label="Utsläpp från fossila bränslen" />
        </label>
        <label className="text-sm">
          Avskogning: <strong>{deforest} Gt kol/år</strong>
          <Slider value={deforest} min={0} max={5} step={0.5} onChange={setDeforest} label="Utsläpp från avskogning" />
        </label>
      </div>
      <div className="h-56 w-full">
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="år" tick={{ fontSize: 11, fill: 'var(--muted)' }} />
            <YAxis domain={['auto', 'auto']} tick={{ fontSize: 11, fill: 'var(--muted)' }} />
            <Tooltip {...chartTooltip} />
            <Line dataKey="atmosfär" name="Kol i atmosfären (Gt)" stroke="var(--chart-2)" strokeWidth={2} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="rounded-2xl bg-surface-2 p-4 text-sm" aria-live="polite">
        Om 50 år: ca <strong>{end} Gt kol</strong> i atmosfären, vilket motsvarar ungefär <strong>{ppm(end)} ppm CO₂</strong> (i dag ca {ppm(900)} ppm). Hav och växter tar upp
        ungefär hälften av utsläppen, resten stannar i luften. Kol som legat lagrat i fossila bränslen i miljontals år tillförs nu snabbt det snabba kretsloppet. Prova att sätta
        utsläppen till noll!
      </div>
    </div>
  )
}
