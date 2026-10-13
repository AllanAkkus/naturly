import type { AtomPart, VisualSpec } from '@/content/types'
import { SIMULATIONS } from '@/components/lab/registry'
import { AtomDiagram, NucleusDiagram } from './AtomDiagram'
import { ElectronTransfer } from './ElectronTransfer'
import { CovalentDiagram } from './Covalent'
import { PeriodicGrid, CategoryLegend } from './PeriodicGrid'
import { ChartVisual, CompareColumns, FlowDiagram } from './Generic'
import { DiagramView } from './Diagrams'
import { useState } from 'react'
import { ElementInfoCard } from './ElementInfoCard'
import type { ElementData } from '@/data/elements'

export function VisualRenderer({ spec, onPartClick }: { spec: VisualSpec; onPartClick?: (part: AtomPart | string) => void }) {
  const body = (() => {
    switch (spec.kind) {
      case 'atom':
        return <AtomDiagram protons={spec.protons} neutrons={spec.neutrons} electrons={spec.electrons} highlight={spec.highlight} onPartClick={onPartClick} />
      case 'nucleus':
        return <NucleusDiagram protons={spec.protons} neutrons={spec.neutrons} onPartClick={onPartClick} />
      case 'electron-transfer':
        return <ElectronTransfer metal={spec.metal} nonmetal={spec.nonmetal} />
      case 'covalent':
        return <CovalentDiagram molecule={spec.molecule} />
      case 'periodic':
        return <PeriodicVisual spec={spec} />
      case 'flow':
        return <FlowDiagram nodes={spec.nodes} layout={spec.layout} />
      case 'compare':
        return <CompareColumns columns={spec.columns} />
      case 'chart':
        return <ChartVisual spec={spec} />
      case 'diagram':
        return <DiagramView id={spec.id} />
      case 'sim': {
        const Sim = SIMULATIONS[spec.id].Component
        return (
          <div className="w-full">
            <p className="mb-3 text-center text-xs text-muted">Förenklad simulering – inte ett riktigt labbförsök.</p>
            <Sim />
          </div>
        )
      }
    }
  })()
  return (
    <figure className="flex w-full flex-col items-center gap-3">
      {body}
      {spec.caption && <figcaption className="text-center text-sm text-muted">{spec.caption}</figcaption>}
    </figure>
  )
}

function PeriodicVisual({ spec }: { spec: Extract<VisualSpec, { kind: 'periodic' }> }) {
  const [sel, setSel] = useState<ElementData | null>(null)
  return (
    <div className="flex w-full flex-col gap-3">
      <PeriodicGrid compact highlight={spec.highlight} groups={spec.groups} periods={spec.periods} onSelect={setSel} selected={sel?.z} />
      <CategoryLegend className="justify-center" />
      {sel && <ElementInfoCard el={sel} compact />}
    </div>
  )
}
