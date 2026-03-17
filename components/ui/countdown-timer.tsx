'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { LiveIndicator } from './live-indicator'

const countdownVariants = cva('inline-flex items-center', {
  variants: {
    size: {
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const digitBoxVariants = cva(
  'flex flex-col items-center justify-center rounded-lg bg-muted/50 border border-border',
  {
    variants: {
      size: {
        sm: 'px-2 py-1 min-w-[2.5rem]',
        md: 'px-3 py-2 min-w-[3.5rem]',
        lg: 'px-4 py-3 min-w-[4.5rem]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const digitTextVariants = cva('font-bold tabular-nums', {
  variants: {
    size: {
      sm: 'text-lg',
      md: 'text-2xl',
      lg: 'text-4xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const labelTextVariants = cva('text-muted-foreground uppercase tracking-wider', {
  variants: {
    size: {
      sm: 'text-[10px]',
      md: 'text-xs',
      lg: 'text-sm',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface CountdownTimerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof countdownVariants> {
  /** Target date for the countdown */
  targetDate: Date | string
  /** Locale for labels and number formatting */
  locale?: 'en' | 'ar'
  /** Custom label when countdown reaches zero */
  liveLabel?: string
}

const labels = {
  en: { days: 'Days', hours: 'Hours', min: 'Min', sec: 'Sec' },
  ar: { days: 'يوم', hours: 'ساعة', min: 'دقيقة', sec: 'ثانية' },
}

function computeTimeLeft(target: Date) {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  }
}

function formatDigit(value: number, locale: 'en' | 'ar'): string {
  if (locale === 'ar') {
    return new Intl.NumberFormat('ar-SA', { numberingSystem: 'arab', useGrouping: false }).format(
      value
    )
  }
  return String(value).padStart(2, '0')
}

function CountdownTimer({
  targetDate,
  locale = 'en',
  size = 'md',
  liveLabel,
  className,
  ...props
}: CountdownTimerProps) {
  const target = React.useMemo(
    () => (targetDate instanceof Date ? targetDate : new Date(targetDate)),
    [targetDate]
  )

  const [timeLeft, setTimeLeft] = React.useState(() => computeTimeLeft(target))

  React.useEffect(() => {
    if (timeLeft.expired) return

    const interval = setInterval(() => {
      const next = computeTimeLeft(target)
      setTimeLeft(next)
      if (next.expired) clearInterval(interval)
    }, 1000)

    return () => clearInterval(interval)
  }, [target, timeLeft.expired])

  if (timeLeft.expired) {
    return <LiveIndicator locale={locale} label={liveLabel} size={size === 'lg' ? 'md' : 'sm'} />
  }

  const l = labels[locale]
  const units = [
    { value: timeLeft.days, label: l.days },
    { value: timeLeft.hours, label: l.hours },
    { value: timeLeft.minutes, label: l.min },
    { value: timeLeft.seconds, label: l.sec },
  ]

  return (
    <div
      className={cn(countdownVariants({ size }), className)}
      role="timer"
      aria-label={
        locale === 'ar'
          ? `${timeLeft.days} يوم ${timeLeft.hours} ساعة ${timeLeft.minutes} دقيقة ${timeLeft.seconds} ثانية`
          : `${timeLeft.days} days ${timeLeft.hours} hours ${timeLeft.minutes} minutes ${timeLeft.seconds} seconds`
      }
      {...props}
    >
      {units.map((unit, i) => (
        <React.Fragment key={unit.label}>
          <div className={digitBoxVariants({ size })}>
            <span className={digitTextVariants({ size })}>
              {formatDigit(unit.value, locale)}
            </span>
            <span className={labelTextVariants({ size })}>{unit.label}</span>
          </div>
          {i < units.length - 1 && (
            <span className={cn('font-bold text-muted-foreground', {
              'text-lg': size === 'sm',
              'text-2xl': size === 'md',
              'text-4xl': size === 'lg',
            })}>
              :
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

CountdownTimer.displayName = 'CountdownTimer'

export { CountdownTimer, countdownVariants }
