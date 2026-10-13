import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '@/lib/utils'

export function Progress({
  value,
  className,
  label,
  tone = 'primary',
}: {
  value: number
  className?: string
  label?: string
  tone?: 'primary' | 'green' | 'pink' | 'blue'
}) {
  const color = { primary: 'bg-primary', green: 'bg-green', pink: 'bg-pink', blue: 'bg-blue' }[tone]
  return (
    <ProgressPrimitive.Root value={value} aria-label={label} className={cn('relative h-2.5 w-full overflow-hidden rounded-full bg-surface-2', className)}>
      <ProgressPrimitive.Indicator
        className={cn('h-full rounded-full transition-all', color)}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </ProgressPrimitive.Root>
  )
}
