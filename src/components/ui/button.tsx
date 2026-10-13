import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:opacity-90 shadow-sm',
        soft: 'bg-primary-soft text-primary hover:bg-primary-soft/70',
        outline: 'border border-border bg-surface hover:bg-surface-2',
        ghost: 'hover:bg-surface-2',
        pink: 'bg-pink-soft text-foreground hover:bg-pink-soft/70',
        danger: 'bg-danger-soft text-danger hover:bg-danger-soft/70',
        link: 'text-primary underline-offset-4 hover:underline px-0',
      },
      size: {
        default: 'h-11 px-5 text-[0.95rem]',
        sm: 'h-9 px-3.5 text-sm',
        lg: 'h-13 px-7 text-base',
        icon: 'size-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
})
Button.displayName = 'Button'
