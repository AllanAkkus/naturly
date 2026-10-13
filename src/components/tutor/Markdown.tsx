import { Fragment, type ReactNode } from 'react'
import { RichText } from '@/components/RichText'
import { AtomDiagram, NucleusDiagram } from '@/components/visuals/AtomDiagram'
import { CovalentDiagram, MOLECULES } from '@/components/visuals/Covalent'
import { DiagramView, DIAGRAMS } from '@/components/visuals/Diagrams'
import { PeriodicGrid } from '@/components/visuals/PeriodicGrid'
import { ElectronTransfer } from '@/components/visuals/ElectronTransfer'
import type { DiagramId, MoleculeId } from '@/content/types'

/**
 * Minimal och säker markdown-tolkning för AI-svar (ingen rå HTML).
 * Stöder stycken, listor, rubriker, **fetstil**, $KaTeX$ och visuella taggar:
 *   [[atom p=4 n=5 e=4]]  [[karna p=4 n=5]]  [[molekyl H2O]]  [[diagram neuron]]
 *   [[periodiska 1,2,3]]  [[jonbindning 11 17]]
 */
export function Markdown({ text }: { text: string }) {
  const blocks = text.replace(/\r/g, '').split(/\n{2,}/)
  return (
    <div className="space-y-2.5">
      {blocks.map((b, i) => (
        <Fragment key={i}>{renderBlock(b.trim())}</Fragment>
      ))}
    </div>
  )
}

const TAG = /\[\[([^\]]+)\]\]/

function renderBlock(block: string): ReactNode {
  if (!block) return null
  if (TAG.test(block)) {
    const parts = block.split(/(\[\[[^\]]+\]\])/g).filter(Boolean)
    return (
      <>
        {parts.map((p, i) => {
          const m = p.match(/^\[\[([^\]]+)\]\]$/)
          return m ? <VisualTag key={i} spec={m[1]} /> : <Fragment key={i}>{renderBlock(p.trim())}</Fragment>
        })}
      </>
    )
  }
  const lines = block.split('\n')
  if (lines.every((l) => /^\s*[-*•]\s+/.test(l)))
    return (
      <ul className="list-disc space-y-1 pl-5">
        {lines.map((l, i) => (
          <li key={i}>
            <RichText text={l.replace(/^\s*[-*•]\s+/, '')} />
          </li>
        ))}
      </ul>
    )
  if (lines.every((l) => /^\s*\d+[.)]\s+/.test(l)))
    return (
      <ol className="list-decimal space-y-1 pl-5">
        {lines.map((l, i) => (
          <li key={i}>
            <RichText text={l.replace(/^\s*\d+[.)]\s+/, '')} />
          </li>
        ))}
      </ol>
    )
  const h = block.match(/^#{1,4}\s+(.*)$/)
  if (h && lines.length === 1) return <p className="font-semibold">{h[1]}</p>
  return (
    <p>
      {lines.map((l, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          <RichText text={l.replace(/^#{1,4}\s+/, '')} />
        </Fragment>
      ))}
    </p>
  )
}

function num(spec: string, key: string): number | undefined {
  const m = spec.match(new RegExp(`${key}\\s*=\\s*(\\d+)`))
  return m ? Math.min(118, Number(m[1])) : undefined
}

function VisualTag({ spec }: { spec: string }) {
  const [kind, ...rest] = spec.trim().split(/\s+/)
  const arg = rest.join(' ')
  const wrap = (node: ReactNode) => <div className="my-2 rounded-2xl bg-surface p-3">{node}</div>
  switch (kind.toLowerCase()) {
    case 'atom': {
      const p = num(arg, 'p') ?? 1
      return wrap(<AtomDiagram protons={p} neutrons={Math.min(160, num(arg, 'n') ?? p)} electrons={Math.min(120, num(arg, 'e') ?? p)} size={220} />)
    }
    case 'karna':
    case 'kärna':
      return wrap(<NucleusDiagram protons={num(arg, 'p') ?? 1} neutrons={num(arg, 'n') ?? 0} size={160} />)
    case 'molekyl': {
      const id = rest[0] as MoleculeId
      return id in MOLECULES ? wrap(<CovalentDiagram molecule={id} />) : null
    }
    case 'diagram': {
      const id = rest[0] as DiagramId
      return id in DIAGRAMS ? wrap(<DiagramView id={id} />) : null
    }
    case 'periodiska': {
      const highlight = arg
        .split(/[,\s]+/)
        .map(Number)
        .filter((n) => n >= 1 && n <= 118)
      return wrap(<PeriodicGrid compact highlight={highlight} />)
    }
    case 'jonbindning': {
      const [m, n] = rest.map(Number)
      const metals = [3, 11, 19, 12, 20, 13]
      const nonmetals = [9, 17, 35, 8, 16, 7]
      return metals.includes(m) && nonmetals.includes(n) ? wrap(<ElectronTransfer metal={m} nonmetal={n} />) : null
    }
    default:
      return null
  }
}
