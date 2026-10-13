import { useMemo, useState } from 'react'
import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts'
import { Beaker, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Var = 'temperatur' | 'omrorning' | 'sockermangd' | 'koppfarg'

const VARS: Record<Var, string> = {
  temperatur: 'Vattnets temperatur',
  omrorning: 'Om man rör om eller inte',
  sockermangd: 'Mängden socker',
  koppfarg: 'Koppens färg',
}

/** Tid (s) för en sockerbit att lösas, med slumpvis mätfel. */
export function dissolveTime(tempC: number, stir: boolean, sugarG: number, noise = 0) {
  const base = 240 * Math.exp(-(tempC - 20) / 30) * (sugarG / 4)
  return Math.max(5, base * (stir ? 0.45 : 1) + noise)
}

export function VariablesSim() {
  const [independent, setIndependent] = useState<Var | null>(null)
  const [controlled, setControlled] = useState<Var[]>([])
  const [trials, setTrials] = useState<Array<{ temp: number; tid: number }>>([])
  const [repeats, setRepeats] = useState(1)

  const fair = independent === 'temperatur' && controlled.includes('omrorning') && controlled.includes('sockermangd')

  const run = () => {
    const temps = [10, 30, 50, 70, 90]
    const out: Array<{ temp: number; tid: number }> = []
    for (const temp of temps) {
      for (let r = 0; r < repeats; r++) {
        // Om omrörning inte hålls konstant varierar den slumpvis
        const stir = controlled.includes('omrorning') ? false : Math.random() < 0.5
        const sugar = controlled.includes('sockermangd') ? 4 : 2 + Math.random() * 6
        out.push({ temp, tid: Math.round(dissolveTime(temp, stir, sugar, (Math.random() - 0.5) * 20)) })
      }
    }
    setTrials(out)
  }

  const averages = useMemo(() => {
    const groups = new Map<number, number[]>()
    for (const t of trials) groups.set(t.temp, [...(groups.get(t.temp) ?? []), t.tid])
    return [...groups.entries()].map(([temp, v]) => ({ temp, medel: Math.round(v.reduce((a, b) => a + b, 0) / v.length), spridning: Math.max(...v) - Math.min(...v) }))
  }, [trials])

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl bg-primary-soft p-4 text-sm">
        <strong>Frågeställning:</strong> Hur påverkar vattnets temperatur hur snabbt en sockerbit löses upp?
        <br />
        <strong>Hypotes (exempel):</strong> Ju varmare vatten, desto snabbare löses sockret, eftersom partiklarna rör sig snabbare.
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">1. Vilken variabel ändrar du med flit? (oberoende variabel)</p>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(VARS) as Var[]).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => {
                setIndependent(v)
                setControlled((c) => c.filter((x) => x !== v))
              }}
              className={cn('rounded-full border px-3 py-1.5 text-sm', independent === v ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:bg-surface-2')}
            >
              {VARS[v]}
            </button>
          ))}
        </div>
      </div>
      {independent && (
        <div>
          <p className="mb-2 text-sm font-medium">2. Vilka variabler håller du konstanta? (kontrollerade variabler)</p>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(VARS) as Var[])
              .filter((v) => v !== independent)
              .map((v) => (
                <label key={v} className={cn('flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-sm', controlled.includes(v) ? 'border-green bg-green-soft' : 'border-border')}>
                  <input
                    type="checkbox"
                    className="size-4"
                    checked={controlled.includes(v)}
                    onChange={(e) => setControlled((c) => (e.target.checked ? [...c, v] : c.filter((x) => x !== v)))}
                  />
                  {VARS[v]}
                </label>
              ))}
          </div>
          <p className="mt-2 text-xs text-muted">Beroende variabel (det du mäter): tiden tills sockret har löst sig.</p>
        </div>
      )}
      {independent === 'temperatur' && (
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-sm">
            Upprepningar per temperatur:{' '}
            <select value={repeats} onChange={(e) => setRepeats(Number(e.target.value))} className="rounded-lg border border-border bg-surface px-2 py-1">
              {[1, 3, 5].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </label>
          <Button onClick={run}>
            <Beaker /> Genomför försöket
          </Button>
          <Button variant="ghost" onClick={() => setTrials([])}>
            <RotateCcw /> Rensa
          </Button>
        </div>
      )}
      {independent && independent !== 'temperatur' && (
        <div className="rounded-2xl bg-amber-soft p-4 text-sm">
          Frågeställningen handlar om temperaturen. Då måste temperaturen vara den variabel du ändrar med flit. Testa igen!
        </div>
      )}
      {trials.length > 0 && (
        <>
          <div className="h-56 w-full">
            <ResponsiveContainer>
              <ScatterChart margin={{ top: 8, right: 12, left: -6, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="temp" name="Temperatur" unit=" °C" type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: 'var(--muted)' }} />
                <YAxis dataKey="tid" name="Tid" unit=" s" tick={{ fontSize: 11, fill: 'var(--muted)' }} />
                <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12 }} />
                <Scatter data={trials} fill="var(--chart-1)" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted">
                <th className="py-1">Temperatur</th>
                <th>Medeltid</th>
                <th>Spridning</th>
              </tr>
            </thead>
            <tbody>
              {averages.map((a) => (
                <tr key={a.temp} className="border-t border-border">
                  <td className="py-1">{a.temp} °C</td>
                  <td>{a.medel} s</td>
                  <td>{repeats > 1 ? `${a.spridning} s` : '–'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="rounded-2xl bg-surface-2 p-4 text-sm" aria-live="polite">
            {fair
              ? `Bra planering! Eftersom du bara ändrade temperaturen och höll omrörning och sockermängd konstanta kan du dra slutsatsen att högre temperatur ger snabbare upplösning. ${repeats > 1 ? 'Upprepningarna visar spridningen – mätfelet. Medelvärdet blir säkrare.' : 'Testa att upprepa försöket flera gånger för att se hur stort mätfelet är.'}`
              : 'Titta på punkterna: de är spridda och mönstret är otydligt. Eftersom du inte höll alla andra variabler konstanta (omrörning och sockermängd) vet du inte om skillnaderna beror på temperaturen eller på något annat. Det är en felkälla i planeringen. Koppens färg spelar troligen ingen roll – men det är bra att tänka igenom!'}
          </div>
        </>
      )}
    </div>
  )
}
