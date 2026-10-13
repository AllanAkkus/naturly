import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium', {
  variants: {
    tone: {
      lavender: 'bg-primary-soft text-primary',
      pink: 'bg-pink-soft text-foreground',
      blue: 'bg-blue-soft text-foreground',
      cream: 'bg-cream text-foreground',
      green: 'bg-green-soft text-foreground',
      amber: 'bg-amber-soft text-foreground',
      gray: 'bg-surface-2 text-muted',
      danger: 'bg-danger-soft text-danger',
    },
  },
  defaultVariants: { tone: 'lavender' },
})

export function Badge({ className, tone, ...props }: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />
}
