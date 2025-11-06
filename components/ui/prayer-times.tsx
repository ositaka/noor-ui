import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, MapPin } from 'lucide-react'

// ============================================================================
// Types
// ============================================================================

export interface Prayer {
  /** Prayer name in English */
  name: string
  /** Prayer name in Arabic */
  nameAr: string
  /** Prayer time (e.g., "04:45 AM" or "04:45") */
  time: string
}

export interface PrayerTimesProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of prayer times */
  prayers: Prayer[]
  /** Name of the next prayer to highlight */
  nextPrayer?: string
  /** Countdown to next prayer (e.g., "2:30:15") */
  countdown?: string
  /** Location name in English */
  location?: string
  /** Location name in Arabic */
  locationAr?: string
  /** Date in English */
  date?: string
  /** Date in Arabic */
  dateAr?: string
  /** Visual variant */
  variant?: 'default' | 'compact' | 'detailed'
}

// ============================================================================
// Component
// ============================================================================

const prayerTimesVariants = cva('w-full', {
  variants: {
    variant: {
      default: 'space-y-4',
      compact: 'space-y-2',
      detailed: 'space-y-6',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export const PrayerTimes = React.forwardRef<HTMLDivElement, PrayerTimesProps>(
  (
    {
      prayers,
      nextPrayer,
      countdown,
      location,
      locationAr,
      date,
      dateAr,
      variant = 'default',
      className,
      ...props
    },
    ref
  ) => {
    const isRTL = typeof document !== 'undefined' && document.documentElement.dir === 'rtl'

    return (
      <Card ref={ref} className={cn('p-8', className)} {...props}>
        <div className={cn(prayerTimesVariants({ variant }))}>
          {/* Header with location and date */}
          <div className="flex items-end justify-between border-b pb-5 mb-1 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-1">
                {isRTL ? 'مواقيت الصلاة' : 'Prayer Times'}
              </h3>
              {(location || locationAr) && (
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{isRTL ? locationAr || location : location || locationAr}</span>
                </div>
              )}
            </div>
            {(date || dateAr) && (
              <div className="text-sm text-muted-foreground text-end">
                {isRTL ? dateAr || date : date || dateAr}
              </div>
            )}
          </div>

          {/* Next Prayer Countdown */}
          {countdown && nextPrayer && (
            <div className="bg-primary/10 rounded-lg p-5">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-base font-medium">
                    {isRTL ? 'الصلاة القادمة' : 'Next Prayer'}
                  </span>
                </div>
                <div className="text-end">
                  <div className="text-sm text-muted-foreground mb-1">
                    {prayers.find((p) => p.name === nextPrayer)?.[isRTL ? 'nameAr' : 'name']}
                  </div>
                  <div className="text-3xl font-bold text-primary tabular-nums">
                    {countdown}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Prayer Times List */}
          <div className="space-y-2.5">
            {prayers.map((prayer) => {
              const isNext = nextPrayer === prayer.name
              const displayName = isRTL ? prayer.nameAr : prayer.name

              return (
                <div
                  key={prayer.name}
                  className={cn(
                    'flex items-center justify-between rounded-lg p-4 transition-colors gap-6',
                    isNext
                      ? 'bg-primary/5 border border-primary/20'
                      : 'hover:bg-muted/50',
                    variant === 'detailed' && 'p-5'
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        'h-2.5 w-2.5 rounded-full',
                        isNext ? 'bg-primary' : 'bg-muted-foreground/30'
                      )}
                    />
                    <span
                      className={cn(
                        'text-base font-medium',
                        isNext && 'text-primary',
                        variant === 'detailed' && 'text-lg'
                      )}
                    >
                      {displayName}
                    </span>
                    {isNext && (
                      <Badge variant="default" className="ms-2">
                        {isRTL ? 'الآن' : 'Next'}
                      </Badge>
                    )}
                  </div>
                  <div
                    className={cn(
                      'text-end text-base font-semibold tabular-nums',
                      isNext && 'text-primary',
                      variant === 'compact' && 'text-sm',
                      variant === 'detailed' && 'text-xl'
                    )}
                  >
                    {prayer.time}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Card>
    )
  }
)

PrayerTimes.displayName = 'PrayerTimes'
