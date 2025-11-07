import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Calendar } from 'lucide-react'

// ============================================================================
// Types
// ============================================================================

export interface HijriDateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof hijriDateVariants> {
  /** Gregorian date in English (e.g., "November 6, 2025") */
  gregorianDate: string
  /** Gregorian date in Arabic (optional, for RTL display) */
  gregorianDateAr?: string
  /** Hijri date in English (e.g., "5 Jumada al-Awwal 1447") */
  hijriDate: string
  /** Hijri date in Arabic (e.g., "٥ جمادى الأولى ١٤٤٧") */
  hijriDateAr: string
  /** Show calendar icon */
  showIcon?: boolean
  /** Visual variant */
  variant?: 'default' | 'badge' | 'compact' | 'detailed'
}

// ============================================================================
// Variants
// ============================================================================

const hijriDateVariants = cva('inline-flex items-center gap-2', {
  variants: {
    variant: {
      default: 'flex-col items-start gap-1 p-4 border rounded-lg',
      badge: 'flex-row gap-2 px-3 py-1.5 rounded-full border bg-muted/50',
      compact: 'flex-row gap-1.5 text-sm',
      detailed: 'flex-col items-start gap-2 p-6 border rounded-xl bg-muted/30',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

// ============================================================================
// Component
// ============================================================================

export const HijriDate = React.forwardRef<HTMLDivElement, HijriDateProps>(
  (
    {
      gregorianDate,
      gregorianDateAr,
      hijriDate,
      hijriDateAr,
      showIcon = false,
      variant = 'default',
      className,
      ...props
    },
    ref
  ) => {
    const isRTL = typeof document !== 'undefined' && document.documentElement.dir === 'rtl'
    const displayGregorian = isRTL && gregorianDateAr ? gregorianDateAr : gregorianDate
    const displayHijri = isRTL ? hijriDateAr : hijriDate

    // Determine layout based on variant
    const isInline = variant === 'badge' || variant === 'compact'
    const showLabels = variant === 'default' || variant === 'detailed'

    return (
      <div ref={ref} className={cn(hijriDateVariants({ variant }), className)} {...props}>
        {showIcon && variant !== 'compact' && (
          <Calendar
            className={cn(
              'text-muted-foreground',
              variant === 'badge' ? 'h-4 w-4' : 'h-5 w-5',
              variant === 'detailed' && 'h-6 w-6'
            )}
          />
        )}

        <div
          className={cn(
            'flex gap-2',
            isInline ? 'flex-row items-center' : 'flex-col gap-1',
            variant === 'detailed' && 'gap-2'
          )}
        >
          {/* Gregorian Date */}
          <div className={cn('flex items-center gap-1.5', variant === 'compact' && 'gap-1')}>
            {showLabels && (
              <span
                className={cn(
                  'text-xs font-medium text-muted-foreground uppercase tracking-wide',
                  variant === 'detailed' && 'text-sm'
                )}
              >
                {isRTL ? 'ميلادي' : 'Gregorian'}
              </span>
            )}
            <span
              className={cn(
                'font-medium',
                variant === 'badge' && 'text-sm',
                variant === 'compact' && 'text-sm',
                variant === 'detailed' && 'text-lg font-semibold'
              )}
            >
              {displayGregorian}
            </span>
          </div>

          {/* Separator for inline variants */}
          {isInline && (
            <span className="text-muted-foreground" aria-hidden="true">
              •
            </span>
          )}

          {/* Hijri Date */}
          <div className={cn('flex items-center gap-1.5', variant === 'compact' && 'gap-1')}>
            {showLabels && (
              <span
                className={cn(
                  'text-xs font-medium text-muted-foreground uppercase tracking-wide',
                  variant === 'detailed' && 'text-sm'
                )}
              >
                {isRTL ? 'هجري' : 'Hijri'}
              </span>
            )}
            <span
              className={cn(
                'font-medium text-primary',
                variant === 'badge' && 'text-sm',
                variant === 'compact' && 'text-sm',
                variant === 'detailed' && 'text-lg font-semibold'
              )}
            >
              {displayHijri}
            </span>
          </div>
        </div>
      </div>
    )
  }
)

HijriDate.displayName = 'HijriDate'
