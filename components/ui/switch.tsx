'use client'

import * as React from 'react'
import * as SwitchPrimitives from '@radix-ui/react-switch'

import { cn } from '@/lib/utils'

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'peer inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-0 transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--sage))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--bg-neutral))] disabled:cursor-not-allowed disabled:opacity-50 hover:shadow-lg',
      'data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[hsl(var(--seaweed))] data-[state=checked]:to-[hsl(var(--sage))]',
      'data-[state=unchecked]:bg-[hsl(var(--warm-beige))]',
      className,
    )}
    {...props}
    ref={ref}
    style={{
      boxShadow: `
        0 2px 8px hsl(var(--seaweed) / 0.1),
        inset 0 1px 0 hsl(255 255% 255% / 0.2)
      `,
      ...props.style
    }}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'pointer-events-none block h-6 w-6 rounded-full bg-white shadow-lg ring-0 transition-all duration-300 ease-out',
        'data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5',
        'data-[state=checked]:shadow-[0_4px_12px_hsl(var(--seaweed)_/_0.2)]',
        'data-[state=unchecked]:shadow-[0_2px_8px_hsl(var(--seaweed)_/_0.1)]'
      )}
      style={{
        background: `
          radial-gradient(circle at 30% 30%, 
            hsl(255 255% 255%) 0%, 
            hsl(var(--wheat) / 0.95) 100%
          )
        `
      }}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
