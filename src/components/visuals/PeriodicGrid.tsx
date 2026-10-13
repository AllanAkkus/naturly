import { ELEMENTS, type ElementData } from '@/data/elements'
import { CATEGORY_INFO, gridPosition, groupOf, periodOf } from '@/lib/chemistry'
import { cn } from '@/lib/utils'

export interface PeriodicGridProps {
  onSelect?: (el: ElementData) => void
  selected?: number | null
  highlight?: number[]
  groups?: number[]
  periods?: number[]
  /** Dölj symboler (för quiz). */
  hideSymbols?: boolean
  hideNames?: boolean
  dimOthers?: boolean
  compact?: boolean
  showMass?: boolean
  className?: string
  correctZ?: number | null
  wrongZ?: number | null
}

export function categoryColor(el: ElementData) {
  return `var(--${CATEGORY_INFO[el.category].color})`
}

export function PeriodicGrid({
  onSelect,
  selected,
  highlight,
  groups,
  periods,
  hideSymbols,
  hideNames,
  dimOthers = true,
  compact = false,
  showMass = false,
  className,
  correctZ,
  wrongZ,
}: PeriodicGridProps) {
  const hasHighlight = !!(highlight?.length || groups?.length || periods?.length)
  const isHighlighted = (el: ElementData) =>
    !!highlight?.includes(el.z) || (groups?.length ? groups.includes(groupOf(el.z) ?? -1) : false) || (periods?.length ? periods.includes(periodOf(el.z)) && el.z !== 0 : false)

  return (
    <div className={cn('w-full overflow-x-auto scrollbar-thin', className)}>
      <div
        role="grid"
        aria-label="Periodiska systemet"
        className={cn('grid gap-[3px]', compact ? 'min-w-[620px]' : 'min-w-[860px]')}
        style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))', gridTemplateRows: `repeat(7, auto) ${compact ? '6px' : '12px'} auto auto` }}
      >
        {ELEMENTS.map((el) => {
          const pos = gridPosition(el.z)
          const row = pos.row
          const hl = isHighlighted(el)
          const dim = hasHighlight && dimOthers && !hl
          const isSel = selected === el.z
          return (
            <button
              key={el.z}
              type="button"
              role="gridcell"
              onClick={() => onSelect?.(el)}
              disabled={!onSelect}
              aria-label={hideSymbols ? `Grundämne nummer ${el.z}` : hideNames ? `${el.symbol}, atomnummer ${el.z}` : `${el.name}, ${el.symbol}, atomnummer ${el.z}`}
              aria-selected={isSel}
              className={cn(
                'relative flex aspect-square flex-col items-center justify-center rounded-md border text-center leading-none transition-all',
                onSelect && 'cursor-pointer hover:z-10 hover:scale-110 hover:shadow-md',
                isSel ? 'border-foreground ring-2 ring-primary' : 'border-transparent',
                correctZ === el.z && 'ring-4 ring-green',
                wrongZ === el.z && 'ring-4 ring-danger',
                dim && 'opacity-25',
              )}
              style={{ gridColumn: pos.col, gridRow: row, background: categoryColor(el) }}
            >
              <span className={cn('absolute left-1 top-0.5 text-muted', compact ? 'text-[7px]' : 'text-[9px]')}>{el.z}</span>
              {!hideSymbols && <span className={cn('font-semibold', compact ? 'text-[11px]' : 'text-[15px]')}>{el.symbol}</span>}
              {!compact && !hideSymbols && !hideNames && <span className="mt-0.5 hidden max-w-full truncate px-0.5 text-[7.5px] text-muted xl:block">{el.name}</span>}
              {showMass && !compact && <span className="text-[7px] text-muted">{el.mass.toLocaleString('sv-SE', { maximumFractionDigits: 3 })}</span>}
            </button>
          )
        })}
        <div className="flex items-center justify-center rounded-md border border-dashed border-border text-[9px] text-muted" style={{ gridColumn: 3, gridRow: 6 }}>
          57–71
        </div>
        <div className="flex items-center justify-center rounded-md border border-dashed border-border text-[9px] text-muted" style={{ gridColumn: 3, gridRow: 7 }}>
          89–103
        </div>
      </div>
    </div>
  )
}

export function CategoryLegend({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-wrap gap-x-3 gap-y-1.5 text-xs', className)}>
      {Object.entries(CATEGORY_INFO).map(([name, info]) => (
        <span key={name} className="inline-flex items-center gap-1.5" title={info.short}>
          <span className="size-3 rounded" style={{ background: `var(--${info.color})` }} />
          {name}
        </span>
      ))}
    </div>
  )
}
