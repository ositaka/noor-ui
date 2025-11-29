import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { Calendar, Sparkles } from 'lucide-react'
import { Badge } from './badge'
import { useDirection } from '../providers/direction-provider'
import { content } from '../../lib/i18n'

// ============================================================================
// Islamic Holidays Database
// ============================================================================

export interface IslamicHoliday {
  day: number
  month: string
  nameEn: string
  nameAr: string
  description?: string
}

export const ISLAMIC_HOLIDAYS: IslamicHoliday[] = [
  { day: 1, month: 'muharram', nameEn: 'Islamic New Year', nameAr: 'رأس السنة الهجرية' },
  { day: 10, month: 'muharram', nameEn: 'Day of Ashura', nameAr: 'يوم عاشوراء' },
  { day: 12, month: 'rabi al-awwal', nameEn: "Prophet's Birthday", nameAr: 'المولد النبوي' },
  { day: 27, month: 'rajab', nameEn: 'Isra and Mi\'raj', nameAr: 'الإسراء والمعراج' },
  { day: 15, month: 'shaban', nameEn: 'Laylat al-Bara\'ah', nameAr: 'ليلة البراءة' },
  { day: 1, month: 'ramadan', nameEn: 'Start of Ramadan', nameAr: 'بداية رمضان' },
  { day: 27, month: 'ramadan', nameEn: 'Laylat al-Qadr', nameAr: 'ليلة القدر' },
  { day: 1, month: 'shawwal', nameEn: 'Eid al-Fitr', nameAr: 'عيد الفطر' },
  { day: 9, month: 'dhul hijjah', nameEn: 'Day of Arafah', nameAr: 'يوم عرفة' },
  { day: 10, month: 'dhul hijjah', nameEn: 'Eid al-Adha', nameAr: 'عيد الأضحى' },
]

export function getIslamicHoliday(hijriDate: string): IslamicHoliday | null {
  // Parse format: "5 Jumada al-Awwal 1447" or "٥ جمادى الأولى ١٤٤٧"
  const parts = hijriDate.toLowerCase().split(/\s+/)
  if (parts.length < 2) return null

  const day = parseInt(parts[0].replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString())) || parseInt(parts[0])
  const monthStr = parts[1]

  return ISLAMIC_HOLIDAYS.find(holiday => {
    const monthMatch = monthStr.includes(holiday.month.split(' ')[0].toLowerCase())
    return holiday.day === day && monthMatch
  }) || null
}

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
  /** Show Islamic holiday badge if applicable */
  showHoliday?: boolean
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
      showHoliday = true,
      variant = 'default',
      className,
      ...props
    },
    ref
  ) => {
    const { locale, direction } = useDirection()
    const t = content[locale]
    const isRTL = direction === 'rtl'
    const displayGregorian = isRTL && gregorianDateAr ? gregorianDateAr : gregorianDate
    const displayHijri = isRTL ? hijriDateAr : hijriDate

    // Check for Islamic holiday
    const holiday = showHoliday ? getIslamicHoliday(hijriDate) : null
    const holidayName = holiday ? (isRTL ? holiday.nameAr : holiday.nameEn) : null

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
                suppressHydrationWarning
              >
                {t.ui.components.gregorianLabel}
              </span>
            )}
            <span
              className={cn(
                'font-medium',
                variant === 'badge' && 'text-sm',
                variant === 'compact' && 'text-sm',
                variant === 'detailed' && 'text-lg font-semibold'
              )}
              suppressHydrationWarning
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
                suppressHydrationWarning
              >
                {t.ui.components.hijriLabel}
              </span>
            )}
            <span
              className={cn(
                'font-medium text-primary',
                variant === 'badge' && 'text-sm',
                variant === 'compact' && 'text-sm',
                variant === 'detailed' && 'text-lg font-semibold'
              )}
              suppressHydrationWarning
            >
              {displayHijri}
            </span>
          </div>
        </div>

        {/* Islamic Holiday Badge */}
        {holidayName && (
          <Badge
            variant="secondary"
            className={cn(
              'gap-1.5 border-primary/20 bg-primary/10 text-primary',
              variant === 'compact' && 'text-xs px-2 py-0.5',
              variant === 'badge' && 'text-xs',
              variant === 'detailed' && 'text-sm px-3 py-1'
            )}
            suppressHydrationWarning
          >
            <Sparkles className={cn('h-3 w-3', variant === 'detailed' && 'h-3.5 w-3.5')} />
            <span suppressHydrationWarning>{holidayName}</span>
          </Badge>
        )}
      </div>
    )
  }
)

HijriDate.displayName = 'HijriDate'
