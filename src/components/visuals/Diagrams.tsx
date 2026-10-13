import { useState, type ReactNode } from 'react'
import type { DiagramId } from '@/content/types'
import { cn } from '@/lib/utils'

export interface DiagramPart {
  id: string
  label: string
  detail: string
}

type Render = (ctx: { sel: string | null; pick: (id: string) => void; labels: boolean }) => ReactNode

interface DiagramDef {
  title: string
  viewBox: string
  parts: DiagramPart[]
  render: Render
  note?: string
}

/** Gemensam stil för klickbara delar. */
const hit = (id: string, sel: string | null): { className: string; stroke?: string; strokeWidth?: number } => ({
  className: cn('cursor-pointer transition-opacity', sel && sel !== id && 'opacity-55'),
  ...(sel === id ? { stroke: 'var(--foreground)', strokeWidth: 2.5 } : {}),
})

function Label({ x, y, children, show, anchor = 'start' }: { x: number; y: number; children: ReactNode; show: boolean; anchor?: 'start' | 'middle' | 'end' }) {
  if (!show) return null
  return (
    <text x={x} y={y} fontSize={10.5} fill="var(--foreground)" textAnchor={anchor} style={{ pointerEvents: 'none', fontWeight: 500 }}>
      {children}
    </text>
  )
}

/* Enkel kroppssiluett som används av flera diagram */
function Body() {
  return (
    <g fill="var(--surface-2)" stroke="var(--border)" strokeWidth={1.5}>
      <circle cx={100} cy={38} r={24} />
      <rect x={70} y={66} width={60} height={110} rx={22} />
      <rect x={42} y={72} width={22} height={100} rx={11} transform="rotate(10 53 72)" />
      <rect x={136} y={72} width={22} height={100} rx={11} transform="rotate(-10 147 72)" />
      <rect x={74} y={168} width={22} height={104} rx={11} />
      <rect x={104} y={168} width={22} height={104} rx={11} />
    </g>
  )
}

export const DIAGRAMS: Record<DiagramId, DiagramDef> = {
  'animal-cell': {
    title: 'Djurcell',
    viewBox: '0 0 320 230',
    parts: [
      { id: 'cellmembran', label: 'Cellmembran', detail: 'Ett tunt hölje av fetter (fosfolipider) och proteiner. Det bestämmer vad som får komma in i och ut ur cellen.' },
      { id: 'cytoplasma', label: 'Cytoplasma', detail: 'Den geléartade vätskan inne i cellen där organellerna finns och många reaktioner sker.' },
      { id: 'cellkarna', label: 'Cellkärna', detail: 'Innehåller DNA – cellens "receptsamling". Styr cellens arbete.' },
      { id: 'mitokondrie', label: 'Mitokondrie', detail: 'Cellens kraftverk. Här sker cellandningen som frigör energi från glukos och bildar ATP.' },
      { id: 'ribosomer', label: 'Ribosomer', detail: 'Små "fabriker" som bygger proteiner enligt instruktioner från DNA (via mRNA).' },
      { id: 'er', label: 'Endoplasmatiskt nätverk', detail: 'Ett system av membran där proteiner och fetter tillverkas och transporteras.' },
      { id: 'golgi', label: 'Golgiapparat', detail: 'Packar och sorterar proteiner och skickar dem dit de ska.' },
      { id: 'lysosom', label: 'Lysosom', detail: 'Små blåsor med enzymer som bryter ned avfall och gamla celldelar.' },
    ],
    render: ({ sel, pick, labels }) => (
      <>
        <ellipse cx={160} cy={115} rx={140} ry={95} fill="var(--pink-soft)" {...hit('cytoplasma', sel)} onClick={() => pick('cytoplasma')} />
        <ellipse cx={160} cy={115} rx={140} ry={95} fill="none" stroke={sel === 'cellmembran' ? 'var(--foreground)' : 'var(--pink)'} strokeWidth={sel === 'cellmembran' ? 7 : 5} className="cursor-pointer" onClick={() => pick('cellmembran')} />
        <g onClick={() => pick('er')} {...hit('er', sel)}>
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M ${95 + i * 6} ${70 + i * 12} q 15 -12 30 0 t 30 0 t 30 0`} fill="none" stroke="var(--blue)" strokeWidth={4} strokeLinecap="round" />
          ))}
        </g>
        <g onClick={() => pick('cellkarna')}>
          <circle cx={160} cy={118} r={36} fill="var(--primary-soft)" stroke="var(--primary)" strokeWidth={3} {...hit('cellkarna', sel)} />
          <circle cx={168} cy={112} r={10} fill="var(--primary)" opacity={0.5} />
        </g>
        <g onClick={() => pick('mitokondrie')} {...hit('mitokondrie', sel)}>
          {[
            [70, 140, -20],
            [245, 90, 25],
          ].map(([x, y, r], i) => (
            <g key={i} transform={`rotate(${r} ${x} ${y})`}>
              <ellipse cx={x} cy={y} rx={24} ry={12} fill="var(--amber-soft)" stroke="var(--amber)" strokeWidth={2.5} />
              <path d={`M ${x - 16} ${y} q 4 -8 8 0 t 8 0 t 8 0 t 8 0`} fill="none" stroke="var(--amber)" strokeWidth={1.5} />
            </g>
          ))}
        </g>
        <g onClick={() => pick('golgi')} {...hit('golgi', sel)}>
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M ${215} ${150 + i * 7} q 22 -10 44 0`} fill="none" stroke="var(--green)" strokeWidth={4} strokeLinecap="round" />
          ))}
        </g>
        <circle cx={110} cy={180} r={9} fill="var(--danger-soft)" stroke="var(--danger)" strokeWidth={2} {...hit('lysosom', sel)} onClick={() => pick('lysosom')} />
        <g onClick={() => pick('ribosomer')} {...hit('ribosomer', sel)}>
          {[
            [120, 60],
            [200, 60],
            [210, 190],
            [80, 105],
            [240, 125],
            [140, 185],
            [190, 175],
            [100, 160],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={3.2} fill="var(--foreground)" opacity={0.7} />
          ))}
        </g>
        <Label x={160} y={162} show={labels} anchor="middle">Cellkärna</Label>
        <Label x={60} y={124} show={labels}>Mitokondrie</Label>
        <Label x={216} y={146} show={labels}>Golgi</Label>
        <Label x={96} y={56} show={labels}>ER</Label>
        <Label x={98} y={204} show={labels}>Lysosom</Label>
      </>
    ),
  },

  'plant-cell': {
    title: 'Växtcell',
    viewBox: '0 0 320 230',
    parts: [
      { id: 'cellvagg', label: 'Cellvägg', detail: 'Ett stadigt skal av cellulosa utanför cellmembranet. Ger växtcellen form och stöd. Djurceller har ingen cellvägg.' },
      { id: 'cellmembran', label: 'Cellmembran', detail: 'Finns innanför cellväggen och styr vad som passerar in och ut.' },
      { id: 'vakuol', label: 'Vakuol', detail: 'En stor blåsa fylld med cellsaft. Den trycker ut mot cellväggen så att växten står upprätt (turgor).' },
      { id: 'kloroplast', label: 'Kloroplast', detail: 'Här sker fotosyntesen. Innehåller det gröna färgämnet klorofyll som fångar solljus.' },
      { id: 'cellkarna', label: 'Cellkärna', detail: 'Innehåller cellens DNA och styr cellens arbete.' },
      { id: 'mitokondrie', label: 'Mitokondrie', detail: 'Växter har också mitokondrier och cellandas – dygnet runt.' },
      { id: 'cytoplasma', label: 'Cytoplasma', detail: 'Vätskan där organellerna finns.' },
    ],
    render: ({ sel, pick, labels }) => (
      <>
        <rect x={20} y={20} width={280} height={190} rx={14} fill="var(--green-soft)" stroke={sel === 'cellvagg' ? 'var(--foreground)' : 'var(--green)'} strokeWidth={10} className="cursor-pointer" onClick={() => pick('cellvagg')} />
        <rect x={32} y={32} width={256} height={166} rx={10} fill="var(--cream-soft)" {...hit('cytoplasma', sel)} onClick={() => pick('cytoplasma')} />
        <rect x={32} y={32} width={256} height={166} rx={10} fill="none" stroke={sel === 'cellmembran' ? 'var(--foreground)' : 'var(--pink)'} strokeWidth={3} className="cursor-pointer" onClick={() => pick('cellmembran')} />
        <rect x={110} y={55} width={140} height={110} rx={40} fill="var(--blue-soft)" stroke="var(--blue)" strokeWidth={2.5} {...hit('vakuol', sel)} onClick={() => pick('vakuol')} />
        <g onClick={() => pick('cellkarna')}>
          <circle cx={70} cy={70} r={22} fill="var(--primary-soft)" stroke="var(--primary)" strokeWidth={2.5} {...hit('cellkarna', sel)} />
        </g>
        <g onClick={() => pick('kloroplast')} {...hit('kloroplast', sel)}>
          {[
            [60, 130],
            [85, 175],
            [270, 60],
            [270, 175],
            [175, 182],
          ].map(([x, y], i) => (
            <g key={i}>
              <ellipse cx={x} cy={y} rx={16} ry={9} fill="var(--green)" />
              <line x1={x - 9} y1={y} x2={x + 9} y2={y} stroke="white" strokeWidth={1.2} opacity={0.6} />
            </g>
          ))}
        </g>
        <ellipse cx={270} cy={118} rx={10} ry={17} fill="var(--amber-soft)" stroke="var(--amber)" strokeWidth={2} {...hit('mitokondrie', sel)} onClick={() => pick('mitokondrie')} />
        <Label x={180} y={115} show={labels} anchor="middle">Vakuol</Label>
        <Label x={70} y={104} show={labels} anchor="middle">Cellkärna</Label>
        <Label x={46} y={152} show={labels}>Kloroplast</Label>
        <Label x={160} y={14} show={labels} anchor="middle">Cellvägg</Label>
      </>
    ),
  },

  neuron: {
    title: 'Nervcell (neuron)',
    viewBox: '0 0 340 180',
    parts: [
      { id: 'dendrit', label: 'Dendriter', detail: 'Korta utskott som tar emot signaler från andra nervceller.' },
      { id: 'cellkropp', label: 'Cellkropp', detail: 'Nervcellens centrum med cellkärna. Här vägs inkommande signaler samman.' },
      { id: 'axon', label: 'Axon (nervtråd)', detail: 'Ett långt utskott som leder nervimpulsen bort från cellkroppen. Kan vara över en meter långt!' },
      { id: 'myelin', label: 'Myelinskida', detail: 'Ett isolerande fettlager runt axonet. Gör att impulsen hoppar mellan luckorna och går mycket snabbare.' },
      { id: 'terminal', label: 'Axonterminaler', detail: 'Ändarna på axonet. Här skickas signalen vidare till nästa cell via synapser med signalsubstanser.' },
    ],
    render: ({ sel, pick, labels }) => (
      <>
        <g onClick={() => pick('dendrit')} {...hit('dendrit', sel)}>
          {[
            'M 60 90 L 20 50 M 35 65 L 20 70',
            'M 60 90 L 15 100 M 30 97 L 18 120',
            'M 60 90 L 30 145 M 42 125 L 20 135',
            'M 60 90 L 55 30 M 57 50 L 40 35',
            'M 60 90 L 70 150',
          ].map((d, i) => (
            <path key={i} d={d} stroke="var(--primary)" strokeWidth={4} strokeLinecap="round" fill="none" />
          ))}
        </g>
        <g onClick={() => pick('cellkropp')}>
          <circle cx={65} cy={90} r={24} fill="var(--primary-soft)" stroke="var(--primary)" strokeWidth={3} {...hit('cellkropp', sel)} />
          <circle cx={65} cy={90} r={8} fill="var(--primary)" opacity={0.6} />
        </g>
        <line x1={88} y1={90} x2={280} y2={90} stroke="var(--primary)" strokeWidth={5} {...hit('axon', sel)} onClick={() => pick('axon')} />
        <g onClick={() => pick('myelin')} {...hit('myelin', sel)}>
          {[100, 145, 190, 235].map((x) => (
            <rect key={x} x={x} y={80} width={36} height={20} rx={10} fill="var(--amber-soft)" stroke="var(--amber)" strokeWidth={2} />
          ))}
        </g>
        <g onClick={() => pick('terminal')} {...hit('terminal', sel)}>
          {[
            [310, 60],
            [318, 90],
            [310, 120],
          ].map(([x, y], i) => (
            <g key={i}>
              <line x1={280} y1={90} x2={x} y2={y} stroke="var(--primary)" strokeWidth={3} />
              <circle cx={x} cy={y} r={7} fill="var(--pink)" />
            </g>
          ))}
        </g>
        <Label x={65} y={128} show={labels} anchor="middle">Cellkropp</Label>
        <Label x={170} y={72} show={labels} anchor="middle">Myelinskida</Label>
        <Label x={170} y={116} show={labels} anchor="middle">Axon →</Label>
        <Label x={300} y={145} show={labels} anchor="middle">Terminaler</Label>
        <Label x={8} y={40} show={labels}>Dendriter</Label>
      </>
    ),
  },

  synapse: {
    title: 'Synaps',
    viewBox: '0 0 300 220',
    parts: [
      { id: 'pre', label: 'Axonterminal (före synapsen)', detail: 'Slutet på den sändande nervcellen. När nervimpulsen kommer hit frisätts signalsubstans.' },
      { id: 'vesikel', label: 'Vesiklar', detail: 'Små blåsor som innehåller signalsubstans, t.ex. dopamin eller serotonin.' },
      { id: 'signal', label: 'Signalsubstans', detail: 'Kemiska budbärarmolekyler som korsar synapsklyftan och fäster på receptorer.' },
      { id: 'klyfta', label: 'Synapsklyfta', detail: 'Den lilla springan mellan cellerna. Signalen korsar den kemiskt, inte elektriskt.' },
      { id: 'receptor', label: 'Receptorer', detail: 'Proteiner på mottagarcellen. Signalsubstansen passar som en nyckel i ett lås och kan starta en ny impuls.' },
      { id: 'post', label: 'Mottagande cell', detail: 'Nästa nervcell (eller en muskelcell). Den kan aktiveras eller hämmas av signalen.' },
    ],
    render: ({ sel, pick, labels }) => (
      <>
        <path d="M 60 10 L 60 70 Q 60 110 150 110 Q 240 110 240 70 L 240 10 Z" fill="var(--primary-soft)" stroke="var(--primary)" strokeWidth={3} {...hit('pre', sel)} onClick={() => pick('pre')} />
        <g onClick={() => pick('vesikel')} {...hit('vesikel', sel)}>
          {[
            [110, 60],
            [150, 50],
            [190, 62],
            [130, 85],
            [175, 88],
          ].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r={12} fill="var(--surface)" stroke="var(--pink)" strokeWidth={2} />
              <circle cx={x - 3} cy={y - 2} r={2.2} fill="var(--pink)" />
              <circle cx={x + 3} cy={y + 3} r={2.2} fill="var(--pink)" />
            </g>
          ))}
        </g>
        <rect x={40} y={113} width={220} height={26} fill="var(--cream-soft)" {...hit('klyfta', sel)} onClick={() => pick('klyfta')} />
        <g onClick={() => pick('signal')} {...hit('signal', sel)}>
          {[
            [110, 120],
            [140, 128],
            [165, 118],
            [190, 130],
            [125, 133],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={3.5} fill="var(--pink)" />
          ))}
        </g>
        <path d="M 40 142 L 260 142 L 260 215 L 40 215 Z" fill="var(--blue-soft)" stroke="var(--blue)" strokeWidth={3} {...hit('post', sel)} onClick={() => pick('post')} />
        <g onClick={() => pick('receptor')} {...hit('receptor', sel)}>
          {[90, 125, 160, 195, 230].map((x) => (
            <path key={x} d={`M ${x - 7} 142 L ${x - 7} 152 L ${x + 7} 152 L ${x + 7} 142`} fill="var(--blue)" stroke="var(--blue)" strokeWidth={2} />
          ))}
        </g>
        <Label x={150} y={25} show={labels} anchor="middle">Axonterminal</Label>
        <Label x={268} y={130} show={labels}>Klyfta</Label>
        <Label x={150} y={190} show={labels} anchor="middle">Mottagande cell</Label>
      </>
    ),
  },

  dna: {
    title: 'DNA-molekylen',
    viewBox: '0 0 340 180',
    parts: [
      { id: 'ryggrad', label: 'Socker-fosfat-ryggrad', detail: 'DNA:s "räcken" består av omväxlande socker (deoxiribos) och fosfat.' },
      { id: 'at', label: 'Baspar A–T', detail: 'Adenin (A) parar alltid ihop sig med tymin (T).' },
      { id: 'gc', label: 'Baspar G–C', detail: 'Guanin (G) parar alltid ihop sig med cytosin (C).' },
      { id: 'vatebindning', label: 'Vätebindningar', detail: 'Svaga bindningar mellan baserna håller ihop de två strängarna. De kan öppnas när DNA kopieras.' },
      { id: 'gen', label: 'Gen', detail: 'En bit av DNA som innehåller instruktionen för ett protein. Ordningen på baserna är koden.' },
    ],
    render: ({ sel, pick, labels }) => {
      const pairs = ['AT', 'GC', 'TA', 'CG', 'AT', 'GC', 'GC', 'TA', 'AT', 'CG']
      const xs = pairs.map((_, i) => 30 + i * 30)
      const top = (x: number) => 90 - 45 * Math.sin((x - 30) / 45)
      const bot = (x: number) => 90 + 45 * Math.sin((x - 30) / 45)
      const path = (f: (x: number) => number) => xs.reduce((d, x, i) => d + `${i ? 'L' : 'M'} ${x} ${f(x)} `, '')
      return (
        <>
          <path d="M 85 6 L 85 14 L 205 14 L 205 6" fill="none" stroke="var(--amber)" strokeWidth={3} {...hit('gen', sel)} onClick={() => pick('gen')} />
          <Label x={145} y={10} show={labels} anchor="middle">gen</Label>
          {pairs.map((p, i) => {
            const x = xs[i]
            const y1 = top(x)
            const y2 = bot(x)
            const id = p === 'AT' || p === 'TA' ? 'at' : 'gc'
            const mid = (y1 + y2) / 2
            return (
              <g key={i} onClick={() => pick(id)} {...hit(id, sel)}>
                <line x1={x} y1={y1} x2={x} y2={mid - 2} stroke={id === 'at' ? 'var(--pink)' : 'var(--blue)'} strokeWidth={6} />
                <line x1={x} y1={mid + 2} x2={x} y2={y2} stroke={id === 'at' ? 'var(--green)' : 'var(--primary)'} strokeWidth={6} />
                {labels && Math.abs(y2 - y1) > 30 && (
                  <>
                    <text x={x + 5} y={y1 + 12} fontSize={9} fill="var(--foreground)">
                      {p[0]}
                    </text>
                    <text x={x + 5} y={y2 - 5} fontSize={9} fill="var(--foreground)">
                      {p[1]}
                    </text>
                  </>
                )}
              </g>
            )
          })}
          <g onClick={() => pick('vatebindning')} {...hit('vatebindning', sel)}>
            {xs.map((x, i) => {
              const mid = (top(x) + bot(x)) / 2
              return <line key={i} x1={x - 4} y1={mid} x2={x + 4} y2={mid} stroke="var(--foreground)" strokeWidth={1.5} strokeDasharray="2 2" />
            })}
          </g>
          <path d={path(top)} fill="none" stroke="var(--muted)" strokeWidth={5} strokeLinecap="round" className="cursor-pointer" onClick={() => pick('ryggrad')} opacity={sel && sel !== 'ryggrad' ? 0.55 : 1} />
          <path d={path(bot)} fill="none" stroke="var(--muted)" strokeWidth={5} strokeLinecap="round" className="cursor-pointer" onClick={() => pick('ryggrad')} opacity={sel && sel !== 'ryggrad' ? 0.55 : 1} />
        </>
      )
    },
    note: 'Förenklad, "utplattad" bild. I verkligheten är DNA en dubbelspiral (dubbelhelix).',
  },

  brain: {
    title: 'Hjärnan (från sidan)',
    viewBox: '0 0 300 220',
    parts: [
      { id: 'storhjarna', label: 'Storhjärnan', detail: 'Den största delen. Tänkande, minne, språk, sinnesintryck och viljestyrda rörelser.' },
      { id: 'pannlob', label: 'Pannloben', detail: 'Längst fram i storhjärnan. Planering, impulskontroll, fokus och beslut.' },
      { id: 'lillhjarna', label: 'Lillhjärnan', detail: 'Samordnar rörelser och balans. Gör att du kan cykla utan att tänka på det.' },
      { id: 'hjarnstam', label: 'Hjärnstammen', detail: 'Styr livsviktiga funktioner som andning, puls och blodtryck. Förbinder hjärnan med ryggmärgen.' },
      { id: 'hypotalamus', label: 'Hypotalamus', detail: 'Ett litet område som styr kroppstemperatur, hunger, törst och hormonsystemet via hypofysen.' },
      { id: 'hypofys', label: 'Hypofysen', detail: 'En hormonkörtel stor som en ärta. Styr många andra hormonkörtlar.' },
    ],
    render: ({ sel, pick, labels }) => (
      <>
        <path d="M 40 120 C 30 50, 120 10, 190 25 C 260 35, 285 90, 260 135 C 240 160, 120 165, 60 150 Z" fill="var(--pink-soft)" stroke="var(--pink)" strokeWidth={3} {...hit('storhjarna', sel)} onClick={() => pick('storhjarna')} />
        <path d="M 40 120 C 30 50, 90 18, 120 22 L 115 140 C 90 150, 65 150, 60 150 Z" fill="var(--primary-soft)" stroke="var(--primary)" strokeWidth={2} {...hit('pannlob', sel)} onClick={() => pick('pannlob')} />
        <ellipse cx={225} cy={160} rx={42} ry={24} fill="var(--blue-soft)" stroke="var(--blue)" strokeWidth={3} {...hit('lillhjarna', sel)} onClick={() => pick('lillhjarna')} />
        <path d="M 165 140 L 185 140 L 190 210 L 172 210 Z" fill="var(--amber-soft)" stroke="var(--amber)" strokeWidth={3} {...hit('hjarnstam', sel)} onClick={() => pick('hjarnstam')} />
        <circle cx={150} cy={128} r={9} fill="var(--green)" {...hit('hypotalamus', sel)} onClick={() => pick('hypotalamus')} />
        <circle cx={143} cy={150} r={7} fill="var(--danger)" {...hit('hypofys', sel)} onClick={() => pick('hypofys')} />
        <Label x={80} y={80} show={labels} anchor="middle">Pannlob</Label>
        <Label x={190} y={75} show={labels} anchor="middle">Storhjärna</Label>
        <Label x={225} y={164} show={labels} anchor="middle">Lillhjärna</Label>
        <Label x={196} y={200} show={labels}>Hjärnstam</Label>
        <Label x={100} y={170} show={labels}>Hypofys</Label>
      </>
    ),
  },

  'nervous-system': {
    title: 'Nervsystemet',
    viewBox: '0 0 200 280',
    parts: [
      { id: 'hjarna', label: 'Hjärnan', detail: 'Del av centrala nervsystemet (CNS). Tar emot, tolkar och skickar signaler.' },
      { id: 'ryggmarg', label: 'Ryggmärgen', detail: 'Del av CNS. En kabel genom ryggraden som leder signaler mellan hjärnan och kroppen, och styr reflexer.' },
      { id: 'perifera', label: 'Perifera nerver', detail: 'Det perifera nervsystemet (PNS): alla nerver utanför hjärna och ryggmärg. Sensoriska nerver leder in, motoriska nerver leder ut.' },
    ],
    render: ({ sel, pick }) => (
      <>
        <Body />
        <circle cx={100} cy={36} r={16} fill="var(--primary)" {...hit('hjarna', sel)} onClick={() => pick('hjarna')} />
        <rect x={96} y={52} width={8} height={110} rx={4} fill="var(--primary)" {...hit('ryggmarg', sel)} onClick={() => pick('ryggmarg')} />
        <g onClick={() => pick('perifera')} {...hit('perifera', sel)} stroke="var(--blue)" strokeWidth={2.4} fill="none" strokeLinecap="round">
          <path d="M 100 80 L 58 100 L 45 165" />
          <path d="M 100 80 L 142 100 L 155 165" />
          <path d="M 100 160 L 85 210 L 84 268" />
          <path d="M 100 160 L 115 210 L 116 268" />
          <path d="M 100 110 L 78 120 M 100 110 L 122 120 M 100 135 L 80 145 M 100 135 L 120 145" />
        </g>
      </>
    ),
    note: 'Lila = centrala nervsystemet (CNS). Blått = perifera nervsystemet (PNS).',
  },

  glands: {
    title: 'Hormonkörtlar',
    viewBox: '0 0 200 280',
    parts: [
      { id: 'hypotalamus', label: 'Hypotalamus', detail: 'Del av hjärnan som kopplar ihop nervsystemet och hormonsystemet. Styr hypofysen.' },
      { id: 'hypofys', label: 'Hypofysen', detail: '"Överkörteln". Bildar t.ex. tillväxthormon och hormoner som styr sköldkörteln, binjurarna och könskörtlarna.' },
      { id: 'skoldkortel', label: 'Sköldkörteln', detail: 'Sitter på halsen. Bildar tyroxin, som styr ämnesomsättningen. Behöver jod.' },
      { id: 'binjurar', label: 'Binjurarna', detail: 'Sitter ovanpå njurarna. Bildar adrenalin och kortisol – stresshormoner.' },
      { id: 'bukspott', label: 'Bukspottkörteln', detail: 'Bildar insulin och glukagon som reglerar blodsockret.' },
      { id: 'konskortlar', label: 'Könskörtlar', detail: 'Äggstockar (östrogen, progesteron) och testiklar (testosteron).' },
    ],
    render: ({ sel, pick }) => (
      <>
        <Body />
        <circle cx={100} cy={30} r={7} fill="var(--green)" {...hit('hypotalamus', sel)} onClick={() => pick('hypotalamus')} />
        <circle cx={100} cy={45} r={6} fill="var(--danger)" {...hit('hypofys', sel)} onClick={() => pick('hypofys')} />
        <path d="M 88 72 Q 100 84 112 72 Q 100 78 88 72 Z" fill="var(--primary)" strokeWidth={6} stroke="var(--primary)" {...hit('skoldkortel', sel)} onClick={() => pick('skoldkortel')} />
        <g onClick={() => pick('binjurar')} {...hit('binjurar', sel)}>
          <path d="M 80 128 l 8 -10 l 8 10 z" fill="var(--amber)" />
          <path d="M 104 128 l 8 -10 l 8 10 z" fill="var(--amber)" />
          <ellipse cx={88} cy={138} rx={7} ry={10} fill="var(--surface)" stroke="var(--border)" />
          <ellipse cx={112} cy={138} rx={7} ry={10} fill="var(--surface)" stroke="var(--border)" />
        </g>
        <path d="M 82 152 Q 100 142 122 150 Q 104 160 82 152 Z" fill="var(--pink)" {...hit('bukspott', sel)} onClick={() => pick('bukspott')} />
        <g onClick={() => pick('konskortlar')} {...hit('konskortlar', sel)}>
          <circle cx={88} cy={176} r={6} fill="var(--blue)" />
          <circle cx={112} cy={176} r={6} fill="var(--blue)" />
        </g>
      </>
    ),
  },

  limbs: {
    title: 'Homologa strukturer – framben',
    viewBox: '0 0 340 210',
    parts: [
      { id: 'overarm', label: 'Överarmsben', detail: 'Ett enda långt ben närmast kroppen – finns hos alla fyra djuren.' },
      { id: 'underarm', label: 'Strålben och armbågsben', detail: 'Två ben i underarmen. Samma grundplan hos människa, katt, val och fladdermus.' },
      { id: 'handlov', label: 'Handlovsben', detail: 'Små ben i handleden/fotleden.' },
      { id: 'fingrar', label: 'Mellanhand och fingrar', detail: 'Fingrarna är korta hos katten, långa i fladdermusens vinge och bildar fenan hos valen.' },
    ],
    render: ({ sel, pick, labels }) => {
      const colors = { overarm: 'var(--pink)', underarm: 'var(--blue)', handlov: 'var(--green)', fingrar: 'var(--amber)' }
      const limb = (x: number, name: string, scale: { up: number; low: number; fing: number; spread: number }) => (
        <g key={name}>
          <rect x={x - 5} y={15} width={10} height={40 * scale.up} rx={5} fill={colors.overarm} {...hit('overarm', sel)} onClick={() => pick('overarm')} />
          <g onClick={() => pick('underarm')} {...hit('underarm', sel)}>
            <rect x={x - 9} y={18 + 40 * scale.up} width={7} height={38 * scale.low} rx={3.5} fill={colors.underarm} />
            <rect x={x + 2} y={18 + 40 * scale.up} width={7} height={38 * scale.low} rx={3.5} fill={colors.underarm} />
          </g>
          <g onClick={() => pick('handlov')} {...hit('handlov', sel)}>
            {[-8, 0, 8].map((dx) => (
              <circle key={dx} cx={x + dx} cy={24 + 40 * scale.up + 38 * scale.low} r={4} fill={colors.handlov} />
            ))}
          </g>
          <g onClick={() => pick('fingrar')} {...hit('fingrar', sel)}>
            {[-2, -1, 0, 1, 2].map((k) => {
              const y0 = 30 + 40 * scale.up + 38 * scale.low
              return (
                <line
                  key={k}
                  x1={x + k * 3}
                  y1={y0}
                  x2={x + k * scale.spread}
                  y2={y0 + 34 * scale.fing}
                  stroke={colors.fingrar}
                  strokeWidth={4}
                  strokeLinecap="round"
                />
              )
            })}
          </g>
          {labels && (
            <text x={x} y={205} textAnchor="middle" fontSize={11} fill="var(--foreground)" fontWeight={500}>
              {name}
            </text>
          )}
        </g>
      )
      return (
        <>
          {limb(45, 'Människa', { up: 1, low: 0.9, fing: 0.8, spread: 5 })}
          {limb(125, 'Katt', { up: 0.9, low: 0.9, fing: 0.4, spread: 3 })}
          {limb(205, 'Val', { up: 0.45, low: 0.45, fing: 1.4, spread: 6 })}
          {limb(290, 'Fladdermus', { up: 0.8, low: 1.1, fing: 1.5, spread: 14 })}
        </>
      )
    },
    note: 'Samma ben i samma ordning – men olika form och funktion. Det tyder på ett gemensamt ursprung.',
  },

  'ph-scale': {
    title: 'pH-skalan',
    viewBox: '0 0 340 120',
    parts: [
      { id: 'magsyra', label: 'Magsyra (pH 1–2)', detail: 'Mycket surt. Saltsyran i magen bryter ned mat och dödar bakterier.' },
      { id: 'citron', label: 'Citronsaft (pH ≈ 2)', detail: 'Surt på grund av citronsyra.' },
      { id: 'kaffe', label: 'Kaffe (pH ≈ 5)', detail: 'Svagt surt.' },
      { id: 'vatten', label: 'Rent vatten (pH 7)', detail: 'Neutralt – varken surt eller basiskt.' },
      { id: 'blod', label: 'Blod (pH 7,35–7,45)', detail: 'Svagt basiskt. Kroppen håller pH mycket noga – det är ett exempel på homeostas.' },
      { id: 'tval', label: 'Tvål (pH 9–10)', detail: 'Basiskt.' },
      { id: 'ammoniak', label: 'Ammoniak (pH ≈ 11)', detail: 'Basiskt och frätande i koncentrerad form.' },
      { id: 'lut', label: 'Natriumhydroxid (pH 14)', detail: 'Mycket basiskt och frätande, t.ex. avloppsrensare. Kräver skyddsglasögon.' },
    ],
    render: ({ sel, pick, labels }) => {
      const colors = ['#d9363e', '#e8573a', '#f07c2f', '#f6a623', '#f2c81d', '#c5d22a', '#8cc63f', '#4caf50', '#2aa889', '#1f9ebd', '#2f80c9', '#4060c4', '#5547b8', '#5f36a8', '#5b2a8e']
      const items: Array<[string, number]> = [
        ['magsyra', 1.5],
        ['citron', 2.2],
        ['kaffe', 5],
        ['vatten', 7],
        ['blod', 7.4],
        ['tval', 9.5],
        ['ammoniak', 11],
        ['lut', 14],
      ]
      const x = (ph: number) => 20 + ph * 21.4
      return (
        <>
          {colors.map((c, i) => (
            <rect key={i} x={20 + i * 20} y={50} width={20.5} height={22} fill={c} />
          ))}
          {Array.from({ length: 15 }).map((_, i) => (
            <text key={i} x={x(i) + 0.5} y={88} fontSize={9} textAnchor="middle" fill="var(--muted)">
              {i}
            </text>
          ))}
          <text x={20} y={104} fontSize={10} fill="var(--danger)">
            Surt
          </text>
          <text x={170} y={104} fontSize={10} textAnchor="middle" fill="var(--muted)">
            Neutralt
          </text>
          <text x={320} y={104} fontSize={10} textAnchor="end" fill="var(--primary)">
            Basiskt
          </text>
          {items.map(([id, ph], i) => (
            <g key={id} className="cursor-pointer" onClick={() => pick(id)} opacity={sel && sel !== id ? 0.5 : 1}>
              <line x1={x(ph)} y1={i % 2 ? 26 : 36} x2={x(ph)} y2={50} stroke="var(--foreground)" strokeWidth={1.2} />
              <circle cx={x(ph)} cy={i % 2 ? 22 : 32} r={sel === id ? 7 : 5.5} fill="var(--surface)" stroke="var(--foreground)" strokeWidth={1.5} />
              {labels && sel === id && (
                <text x={x(ph)} y={12} fontSize={9} textAnchor="middle" fill="var(--foreground)">
                  {id === 'lut' ? 'NaOH' : id}
                </text>
              )}
            </g>
          ))}
        </>
      )
    },
    note: 'Varje steg på skalan betyder tio gånger surare eller basiskare.',
  },

  particles: {
    title: 'Partikelmodellen',
    viewBox: '0 0 330 130',
    parts: [
      { id: 'fast', label: 'Fast form', detail: 'Partiklarna sitter tätt i ett ordnat mönster och vibrerar på sina platser. Ämnet har bestämd form och volym.' },
      { id: 'flytande', label: 'Flytande form', detail: 'Partiklarna sitter tätt men kan glida förbi varandra. Ämnet har bestämd volym men tar kärlets form.' },
      { id: 'gas', label: 'Gasform', detail: 'Partiklarna rör sig snabbt och fritt med stora avstånd emellan. En gas fyller hela utrymmet.' },
    ],
    render: ({ sel, pick, labels }) => {
      const box = (x: number, id: string, title: string, dots: Array<[number, number]>) => (
        <g key={id} className="cursor-pointer" onClick={() => pick(id)} opacity={sel && sel !== id ? 0.5 : 1}>
          <rect x={x} y={10} width={95} height={95} rx={12} fill="var(--blue-soft)" stroke={sel === id ? 'var(--foreground)' : 'var(--blue)'} strokeWidth={sel === id ? 3 : 2} />
          {dots.map(([dx, dy], i) => (
            <circle key={i} cx={x + dx} cy={10 + dy} r={6} fill="var(--primary)" />
          ))}
          {labels && (
            <text x={x + 47} y={124} textAnchor="middle" fontSize={11} fontWeight={500} fill="var(--foreground)">
              {title}
            </text>
          )}
        </g>
      )
      const solid: Array<[number, number]> = []
      for (let r = 0; r < 5; r++) for (let c = 0; c < 6; c++) solid.push([15 + c * 13, 30 + r * 13])
      const liquid: Array<[number, number]> = [
        [14, 60], [27, 66], [40, 58], [54, 64], [68, 59], [81, 66], [20, 74], [34, 80], [47, 72], [61, 78], [75, 73], [16, 88], [29, 92], [44, 86], [58, 91], [72, 87], [84, 82],
      ]
      const gas: Array<[number, number]> = [
        [18, 20], [70, 18], [45, 45], [80, 60], [20, 75], [55, 85], [35, 30],
      ]
      return (
        <>
          {box(10, 'fast', 'Fast', solid)}
          {box(118, 'flytande', 'Flytande', liquid)}
          {box(226, 'gas', 'Gas', gas)}
        </>
      )
    },
  },
}

export function DiagramView({
  id,
  quiz = false,
  onPartClick,
  selectedPart,
}: {
  id: DiagramId
  quiz?: boolean
  onPartClick?: (part: string) => void
  selectedPart?: string | null
}) {
  const def = DIAGRAMS[id]
  const [selLocal, setSelLocal] = useState<string | null>(null)
  const sel = selectedPart !== undefined ? selectedPart : selLocal
  const pick = (p: string) => {
    setSelLocal(p)
    onPartClick?.(p)
  }
  const part = def.parts.find((p) => p.id === sel)
  return (
    <div className="flex w-full flex-col items-center gap-3">
      <svg viewBox={def.viewBox} className="w-full max-w-md" role="img" aria-label={def.title}>
        {def.render({ sel, pick, labels: !quiz })}
      </svg>
      {quiz ? (
        <details className="text-xs text-muted">
          <summary className="cursor-pointer">Svara med tangentbordet i stället</summary>
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {def.parts.map((p) => (
              <button key={p.id} type="button" onClick={() => pick(p.id)} className="rounded-full border border-border px-3 py-1">
                {p.label}
              </button>
            ))}
          </div>
        </details>
      ) : (
        <>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label={`Delar: ${def.title}`}>
            {def.parts.map((p) => (
              <button
                key={p.id}
                type="button"
                aria-pressed={sel === p.id}
                onClick={() => pick(p.id)}
                className={cn('rounded-full border px-3 py-1 text-xs font-medium', sel === p.id ? 'border-primary bg-primary-soft text-primary' : 'border-border hover:bg-surface-2')}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="w-full max-w-md rounded-2xl bg-surface-2 p-3 text-sm" aria-live="polite">
            {part ? (
              <>
                <strong>{part.label}:</strong> {part.detail}
              </>
            ) : (
              <span className="text-muted">Klicka på en del av bilden eller en knapp för att läsa om den.</span>
            )}
          </div>
          {def.note && <p className="text-center text-[0.7rem] text-muted">{def.note}</p>}
        </>
      )}
    </div>
  )
}
