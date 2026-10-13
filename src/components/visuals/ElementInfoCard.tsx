import { useState } from 'react'
import { GraduationCap, ShieldAlert, Wrench } from 'lucide-react'
import type { ElementData } from '@/data/elements'
import {
  beginnerExplanation,
  CATEGORY_INFO,
  groupOf,
  ionNotation,
  periodOf,
  shellDistribution,
  shortConfigurationString,
  valenceElectrons,
} from '@/lib/chemistry'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tex } from '@/components/RichText'
import { ReadAloud } from '@/components/ReadAloud'
import { AtomDiagram } from './AtomDiagram'
import { categoryColor } from './PeriodicGrid'

export const fmtMass = (m: number) => m.toLocaleString('sv-SE', { maximumFractionDigits: 4 })

export function ElementInfoCard({ el, compact = false }: { el: ElementData; compact?: boolean }) {
  const [beginner, setBeginner] = useState(false)
  const shells = shellDistribution(el.z)
  const valence = valenceElectrons(el.z)
  const g = groupOf(el.z)
  const main = el.isotopes[0]
  const facts: Array<[string, string]> = [
    ['Atomnummer', String(el.z)],
    ['Protoner', String(el.z)],
    ['Elektroner (neutral atom)', String(el.z)],
    ['Atommassa', `${fmtMass(el.mass)} u${el.massIsEstimate ? ' (mest långlivade isotopen)' : ''}`],
    ['Grupp', g === null ? (el.category === 'lantanid' ? 'Lantanid (f-blocket)' : 'Aktinid (f-blocket)') : String(g)],
    ['Period', String(periodOf(el.z))],
    ['Elektronskal', shells.join(', ')],
    ['Elektronkonfiguration', shortConfigurationString(el.z)],
    ['Valenselektroner', valence === null ? 'Komplicerat för övergångsmetaller/f-blocket' : String(valence)],
    ['Vanliga joner', el.ions.length ? el.ions.map((c) => ionNotation(el.symbol, c)).join(', ') : 'Bildar sällan enkla joner'],
  ]
  const beginnerLines = beginnerExplanation(el)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <div className="flex size-20 shrink-0 flex-col items-center justify-center rounded-2xl" style={{ background: categoryColor(el) }}>
          <span className="text-xs text-muted">{el.z}</span>
          <span className="text-3xl font-semibold leading-none">{el.symbol}</span>
          <span className="text-[0.65rem] text-muted">{fmtMass(el.mass)}</span>
        </div>
        <div className="min-w-0">
          <h3 className="text-2xl font-semibold">{el.name}</h3>
          <div className="mt-1 flex flex-wrap gap-1.5">
            <Badge tone="lavender">{el.category}</Badge>
            {el.radioactive && <Badge tone="amber">radioaktiv</Badge>}
          </div>
          <p className="mt-2 text-sm text-muted">{CATEGORY_INFO[el.category].short}</p>
        </div>
      </div>

      <p className="text-[0.95rem]">{el.description}</p>

      <div className="flex flex-wrap gap-2">
        <Button variant={beginner ? 'default' : 'soft'} size="sm" onClick={() => setBeginner((b) => !b)} aria-expanded={beginner}>
          <GraduationCap /> Förklara som nybörjare
        </Button>
        <ReadAloud text={beginner ? beginnerLines : [el.name, el.description]} />
      </div>

      {beginner && (
        <div className="space-y-2 rounded-2xl bg-primary-soft p-4 text-sm">
          {beginnerLines.map((l, i) => (
            <p key={i}>{l}</p>
          ))}
        </div>
      )}

      <div className={compact ? 'grid gap-4' : 'grid gap-4 md:grid-cols-[1fr_auto]'}>
        <dl className="grid grid-cols-1 gap-x-4 gap-y-1.5 text-sm sm:grid-cols-2">
          {facts.map(([k, v]) => (
            <div key={k} className="flex flex-col border-b border-border py-1">
              <dt className="text-xs text-muted">{k}</dt>
              <dd className="font-medium">{v}</dd>
            </div>
          ))}
        </dl>
        {!compact && el.z <= 54 && main && (
          <AtomDiagram protons={el.z} neutrons={main.massNumber - el.z} electrons={el.z} size={220} interactive={false} />
        )}
      </div>

      <div>
        <h4 className="mb-2 text-sm font-semibold">Isotoper – antal neutroner varierar</h4>
        <div className="flex flex-wrap gap-2">
          {el.isotopes.map((iso) => (
            <div key={iso.massNumber} className="rounded-xl bg-surface-2 px-3 py-2 text-sm">
              <Tex tex={`{}^{${iso.massNumber}}_{${el.z}}\\mathrm{${el.symbol}}`} />{' '}
              <span className="ml-1 font-medium">
                {iso.massNumber} − {el.z} = {iso.massNumber - el.z} neutroner
              </span>
              <div className="text-xs text-muted">{iso.note}</div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted">Atommassan ({fmtMass(el.mass)} u) är ett medelvärde av isotoperna och är därför inte samma sak som masstalet.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-blue-soft p-3 text-sm">
          <div className="mb-1 flex items-center gap-1.5 font-semibold">
            <Wrench className="size-4" /> Användning
          </div>
          {el.uses}
        </div>
        <div className="rounded-2xl bg-amber-soft p-3 text-sm">
          <div className="mb-1 flex items-center gap-1.5 font-semibold">
            <ShieldAlert className="size-4" /> Säkerhet
          </div>
          {el.safety}
        </div>
      </div>
      <p className="text-xs text-muted">Oktettregeln och "atomer vill ha fullt skal" är förenklingar. Kemisk stabilitet beror på energi och omgivning.</p>
    </div>
  )
}
