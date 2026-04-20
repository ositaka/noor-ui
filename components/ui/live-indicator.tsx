import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const liveIndicatorVariants = cva('inline-flex items-center', {
  variants: {
    size: {
      sm: 'gap-1.5 text-xs',
      md: 'gap-2 text-sm',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})

export interface LiveIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof liveIndicatorVariants> {
  /** Show pulsing animation on the dot */
  pulse?: boolean
  /** Override the display label */
  label?: string
  /** Locale for default label (LIVE / مباشر) */
  locale?: 'en' | 'ar'
}

const dotSizes = {
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
}

function LiveIndicator({
  pulse = true,
  label,
  locale = 'en',
  size = 'sm',
  className,
  ...props
}: LiveIndicatorProps) {
  const dotSize = dotSizes[size ?? 'sm']
  const displayLabel = label ?? (locale === 'ar' ? 'مباشر' : 'LIVE')

  return (
    <span
      className={cn(liveIndicatorVariants({ size }), className)}
      role="status"
      aria-label={displayLabel}
      {...props}
    >
      <span className={cn('relative flex', dotSize)}>
        {pulse && (
          <span
            className={cn(
              'absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75 animate-ping'
            )}
          />
        )}
        <span
          className={cn('relative inline-flex rounded-full bg-destructive', dotSize)}
        />
      </span>
      <span className="font-bold uppercase tracking-wide text-destructive">
        {displayLabel}
      </span>
    </span>
  )
}

export { LiveIndicator, liveIndicatorVariants }
