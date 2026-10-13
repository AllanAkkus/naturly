import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cn } from '@/lib/utils'

export function Switch({
  checked,
  onCheckedChange,
  id,
  label,
}: {
  checked: boolean
  onCheckedChange: (v: boolean) => void
  id?: string
  label?: string
}) {
  return (
    <SwitchPrimitive.Root
      id={id}
      aria-label={label}
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={cn('relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors', checked ? 'bg-primary' : 'bg-border')}
    >
      <SwitchPrimitive.Thumb
        className={cn('block size-5 rounded-full bg-white shadow transition-transform', checked ? 'translate-x-5' : 'translate-x-0.5')}
      />
    </SwitchPrimitive.Root>
  )
}
