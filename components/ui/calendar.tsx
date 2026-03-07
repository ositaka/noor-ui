'use client'

import * as React from 'react'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { cn } from '../../lib/utils'
import { Button } from './button'
import { useDirection } from '../providers/direction-provider'
import { content } from '../../lib/i18n'
import { ISLAMIC_HOLIDAYS, getIslamicHoliday } from './hijri-date'

// ============================================================================
// Types
// ============================================================================

export interface CalendarDate {
  /** Gregorian date */
  gregorian: Date
  /** Hijri date string (e.g., "15 Ramadan 1446") */
  hijri?: string
  /** Short Hijri day (e.g., "15") */
  hijriDay?: string
}

export interface CalendarEvent {
  /** Event date */
  date: Date
  /** Event title */
  title: string
  /** Event color/variant */
  variant?: 'default' | 'primary' | 'secondary' | 'destructive'
}

export type SelectionMode = 'single' | 'range'

export interface DateRange {
  from: Date | undefined
  to: Date | undefined
}

export interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Selection mode */
  mode?: SelectionMode
  /** Selected date (single mode) */
  selected?: Date
  /** Selected date range (range mode) */
  selectedRange?: DateRange
  /** Callback when date is selected */
  onSelect?: (date: Date | DateRange | undefined) => void
  /** Show Hijri dates */
  showHijri?: boolean
  /** Show Islamic holidays (requires showHijri) */
  showIslamicHolidays?: boolean
  /** Calendar events to display */
  events?: CalendarEvent[]
  /** Disabled dates */
  disabled?: Date[] | ((date: Date) => boolean)
  /** Minimum selectable date */
  minDate?: Date
  /** Maximum selectable date */
  maxDate?: Date
  /** Locale */
  locale?: 'en' | 'ar'
  /** Custom Hijri date provider */
  getHijriDate?: (date: Date) => { hijri: string; hijriDay: string; hijriMonthIndex?: number; hijriYear?: number }
}

// ============================================================================
// Utilities
// ============================================================================

/** Format a number using locale-appropriate numerals (e.g. Eastern Arabic ٧ for 'ar') */
function formatNumber(num: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    numberingSystem: locale === 'ar' ? 'arab' : undefined,
    useGrouping: false,
  }).format(num)
}

function isSameDay(date1: Date | undefined, date2: Date | undefined): boolean {
  if (!date1 || !date2) return false
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

function isInRange(date: Date, range: DateRange | undefined): boolean {
  if (!range?.from || !range?.to) return false
  const time = date.getTime()
  return time >= range.from.getTime() && time <= range.to.getTime()
}

function isRangeStart(date: Date, range: DateRange | undefined): boolean {
  return range?.from ? isSameDay(date, range.from) : false
}

function isRangeEnd(date: Date, range: DateRange | undefined): boolean {
  return range?.to ? isSameDay(date, range.to) : false
}

// Hijri conversion using Julian Day Number algorithm
// Based on "Calendrical Calculations" by Reingold & Dershowitz
function getApproximateHijri(date: Date): { hijri: string; hijriDay: string; hijriMonthIndex: number; hijriYear: number } {
  // Convert Gregorian to Julian Day Number
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  let a = Math.floor((14 - month) / 12)
  let y = year + 4800 - a
  let m = month + 12 * a - 3

  let jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y +
            Math.floor(y / 4) - Math.floor(y / 100) +
            Math.floor(y / 400) - 32045

  // Convert Julian Day Number to Hijri
  // Islamic calendar epoch: July 16, 622 CE (Julian Day 1948440)
  const islamicEpoch = 1948440
  const islamicDate = jdn - islamicEpoch

  const hijriYear = Math.floor((30 * islamicDate + 10646) / 10631)
  const hijriMonth = Math.min(12, Math.ceil((islamicDate - 29 - (Math.floor((hijriYear - 1) * 10631 / 30))) / 29.5) + 1)
  const hijriDay = islamicDate - Math.floor((hijriYear - 1) * 10631 / 30) - Math.floor((hijriMonth - 1) * 29.5) + 1

  const months = [
    'Muharram', 'Safar', 'Rabi\' al-Awwal', 'Rabi\' al-Thani',
    'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban',
    'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'
  ]

  const monthName = months[hijriMonth - 1] || months[0]
  const dayNum = Math.floor(hijriDay)

  return {
    hijri: `${dayNum} ${monthName} ${hijriYear}`,
    hijriDay: String(dayNum),
    hijriMonthIndex: hijriMonth - 1,
    hijriYear,
  }
}

const HIJRI_MONTHS_AR = [
  'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني',
  'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان',
  'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
]

const HIJRI_MONTHS_EN = [
  'Muharram', 'Safar', 'Rabi\' al-Awwal', 'Rabi\' al-Thani',
  'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban',
  'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'
]

// ============================================================================
// Component
// ============================================================================

export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      mode = 'single',
      selected,
      selectedRange,
      onSelect,
      showHijri = false,
      showIslamicHolidays = false,
      events = [],
      disabled,
      minDate,
      maxDate,
      locale = 'en',
      getHijriDate = getApproximateHijri,
      className,
      ...props
    },
    ref
  ) => {
    const { direction } = useDirection()
    const isRTL = direction === 'rtl'
    const t = content[locale]
    const [currentMonth, setCurrentMonth] = React.useState(selected || new Date())

    // Generate calendar days
    const days = React.useMemo<CalendarDate[]>(() => {
      const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
      const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
      const startDate = new Date(monthStart)
      startDate.setDate(startDate.getDate() - startDate.getDay())
      const endDate = new Date(monthEnd)
      endDate.setDate(endDate.getDate() + (6 - monthEnd.getDay()))

      const daysArray: CalendarDate[] = []
      const current = new Date(startDate)
      while (current <= endDate) {
        const hijriData = showHijri ? getHijriDate(current) : undefined
        daysArray.push({
          gregorian: new Date(current),
          hijri: hijriData?.hijri,
          hijriDay: hijriData?.hijriDay,
        })
        current.setDate(current.getDate() + 1)
      }
      return daysArray
    }, [currentMonth, showHijri, getHijriDate])

    // Generate Islamic holiday events
    const islamicHolidayEvents = React.useMemo<CalendarEvent[]>(() => {
      if (!showIslamicHolidays || !showHijri) return []

      const holidayEvents: CalendarEvent[] = []

      // Check each day in the calendar for holidays
      days.forEach(dayData => {
        if (dayData.hijri) {
          const holiday = getIslamicHoliday(dayData.hijri)
          if (holiday) {
            holidayEvents.push({
              date: dayData.gregorian,
              title: locale === 'ar' ? holiday.nameAr : holiday.nameEn,
              variant: 'primary',
            })
          }
        }
      })

      return holidayEvents
    }, [showIslamicHolidays, showHijri, days, locale])

    // Merge user events with Islamic holiday events
    const allEvents = React.useMemo(() => {
      return [...events, ...islamicHolidayEvents]
    }, [events, islamicHolidayEvents])

    // Check if date is disabled
    const isDateDisabled = (date: Date): boolean => {
      if (minDate && date < minDate) return true
      if (maxDate && date > maxDate) return true
      if (!disabled) return false
      if (Array.isArray(disabled)) {
        return disabled.some(d => isSameDay(d, date))
      }
      return disabled(date)
    }

    // Get events for a date
    const getEventsForDate = (date: Date): CalendarEvent[] => {
      return allEvents.filter(event => isSameDay(event.date, date))
    }

    // Handle date selection
    const handleDateClick = (date: Date) => {
      if (isDateDisabled(date)) return

      if (mode === 'single') {
        onSelect?.(date)
      } else if (mode === 'range') {
        if (!selectedRange?.from || (selectedRange.from && selectedRange.to)) {
          // Start new range
          onSelect?.({ from: date, to: undefined })
        } else if (selectedRange.from) {
          // Complete range
          if (date < selectedRange.from) {
            onSelect?.({ from: date, to: selectedRange.from })
          } else {
            onSelect?.({ from: selectedRange.from, to: date })
          }
        }
      }
    }

    // Navigation
    const goToPreviousMonth = () => {
      setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))
    }

    const goToNextMonth = () => {
      setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))
    }

    const goToToday = () => {
      setCurrentMonth(new Date())
    }

    const headingId = React.useId()

    // Month/Year display — force Eastern Arabic numerals for 'ar'
    const monthName = new Intl.DateTimeFormat(locale, {
      month: 'long',
      year: 'numeric',
      numberingSystem: locale === 'ar' ? 'arab' : undefined,
    }).format(currentMonth)

    // Get Hijri month/year for header
    const hijriMonthYear = React.useMemo(() => {
      if (!showHijri) return null
      const hijriData = getHijriDate(currentMonth) as { hijri: string; hijriDay: string; hijriMonthIndex?: number; hijriYear?: number }
      const monthNames = locale === 'ar' ? HIJRI_MONTHS_AR : HIJRI_MONTHS_EN
      if (hijriData.hijriMonthIndex != null && hijriData.hijriYear != null) {
        const monthStr = monthNames[hijriData.hijriMonthIndex] || monthNames[0]
        const yearStr = formatNumber(hijriData.hijriYear, locale)
        return `${monthStr} ${yearStr}`
      }
      // Fallback for custom getHijriDate without hijriMonthIndex
      const parts = hijriData.hijri.split(' ')
      const month = parts.slice(1, -1).join(' ')
      const year = parts[parts.length - 1]
      return `${month} ${year}`
    }, [showHijri, currentMonth, getHijriDate, locale])

    // When Arabic + Hijri, Hijri is the primary calendar display
    const hijriPrimary = locale === 'ar' && showHijri

    const weekDays = React.useMemo(() => {
      const days = []
      const baseDate = new Date(2024, 0, 7) // Sunday
      const loc = locale
      for (let i = 0; i < 7; i++) {
        const date = new Date(baseDate)
        date.setDate(baseDate.getDate() + i)
        days.push({
          narrow: date.toLocaleDateString(loc, { weekday: 'narrow' }),
          full: date.toLocaleDateString(loc, { weekday: 'long' }),
        })
      }
      return days
    }, [locale])

    return (
      <div ref={ref} className={cn('@container w-full p-4', className)} aria-labelledby={headingId} {...props}>
        {/* Header — stacked at narrow, single row at ≥20rem */}
        <div className="mb-4 space-y-2 @[20rem]:space-y-0">
          <div className="text-center @[20rem]:hidden">
            <h2 id={headingId} className="text-lg font-semibold">
              {hijriPrimary ? hijriMonthYear : monthName}
            </h2>
            {showHijri && (
              <p className="text-sm text-muted-foreground">
                {hijriPrimary ? monthName : hijriMonthYear}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={isRTL ? goToNextMonth : goToPreviousMonth}
                aria-label={t.ui.components.previousMonth}
                className="h-8 w-8"
              >
                <CaretLeft className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={isRTL ? goToPreviousMonth : goToNextMonth}
                aria-label={t.ui.components.nextMonth}
                className="h-8 w-8"
              >
                <CaretRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>

            {/* Inline heading for wide layout */}
            <div className="hidden @[20rem]:block text-center flex-1" aria-hidden="true">
              <div className="text-lg font-semibold">
                {hijriPrimary ? hijriMonthYear : monthName}
              </div>
              {showHijri && (
                <p className="text-sm text-muted-foreground">
                  {hijriPrimary ? monthName : hijriMonthYear}
                </p>
              )}
            </div>

            <Button type="button" variant="outline" size="sm" onClick={goToToday}>
              {t.ui.components.today}
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="space-y-2">
          {/* Week days header */}
          <div className="grid grid-cols-7 gap-1">
            {weekDays.map((day, index) => (
              <div
                key={index}
                className="text-center text-sm font-medium text-muted-foreground py-2"
                role="columnheader"
                aria-label={day.full}
              >
                <abbr title={day.full} className="no-underline">
                  {day.narrow}
                </abbr>
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((dayData, index) => {
              const { gregorian, hijriDay } = dayData
              const isToday = isSameDay(gregorian, new Date())
              const isSelected = mode === 'single' && isSameDay(gregorian, selected)
              const inRange = mode === 'range' && isInRange(gregorian, selectedRange)
              const rangeStart = mode === 'range' && isRangeStart(gregorian, selectedRange)
              const rangeEnd = mode === 'range' && isRangeEnd(gregorian, selectedRange)
              const isOutsideMonth = gregorian.getMonth() !== currentMonth.getMonth()
              const isDisabled = isDateDisabled(gregorian)
              const dayEvents = getEventsForDate(gregorian)

              return (
                <button
                  type="button"
                  key={index}
                  onClick={() => handleDateClick(gregorian)}
                  disabled={isDisabled}
                  className={cn(
                    'relative rounded-md text-sm p-2 cursor-pointer transition-colors',
                    showHijri ? 'h-14' : 'h-9',
                    'hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    isOutsideMonth && 'text-muted-foreground opacity-50',
                    isToday && !isSelected && 'font-bold ring-2',
                    isToday && !isSelected && (selected || selectedRange?.from ? 'ring-muted-foreground/30' : 'ring-primary'),
                    isSelected && 'bg-primary text-primary-foreground hover:bg-primary/90',
                    inRange && !isSelected && 'bg-primary/20',
                    (rangeStart || rangeEnd) && 'bg-primary text-primary-foreground',
                    isDisabled && 'hover:bg-transparent'
                  )}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <span className={cn(locale === 'ar' ? 'text-base' : 'text-sm', isToday && (isSelected || (!selected && !selectedRange?.from)) && 'font-bold')}>
                      {formatNumber(hijriPrimary && hijriDay ? Number(hijriDay) : gregorian.getDate(), locale)}
                    </span>
                    {showHijri && hijriDay && (
                      <span className={cn(locale === 'ar' ? 'text-[11px]' : 'text-[10px]', (isSelected || rangeStart || rangeEnd) ? 'text-primary-foreground/70' : 'text-muted-foreground')}>
                        {formatNumber(hijriPrimary ? gregorian.getDate() : Number(hijriDay), locale)}
                      </span>
                    )}
                  </div>

                  {/* Event indicators */}
                  {dayEvents.length > 0 && (
                    <div className="absolute bottom-1 inset-x-0 flex justify-center gap-0.5">
                      {dayEvents.slice(0, 3).map((event, i) => (
                        <div
                          key={i}
                          className={cn(
                            'h-1 w-1 rounded-full',
                            event.variant === 'primary' && 'bg-primary',
                            event.variant === 'secondary' && 'bg-secondary',
                            event.variant === 'destructive' && 'bg-destructive',
                            !event.variant && 'bg-primary'
                          )}
                        />
                      ))}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        {allEvents.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm font-medium mb-2">
              {t.ui.components.events}
            </p>
            <div className="space-y-1">
              {allEvents
                .filter(event => {
                  const eventDate = event.date
                  return (
                    eventDate.getMonth() === currentMonth.getMonth() &&
                    eventDate.getFullYear() === currentMonth.getFullYear()
                  )
                })
                .slice(0, 5)
                .map((event, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div
                      className={cn(
                        'h-2 w-2 rounded-full flex-shrink-0',
                        event.variant === 'primary' && 'bg-primary',
                        event.variant === 'secondary' && 'bg-secondary',
                        event.variant === 'destructive' && 'bg-destructive',
                        !event.variant && 'bg-primary'
                      )}
                    />
                    <span className="text-muted-foreground">
                      {formatNumber(event.date.getDate(), locale)} - {event.title}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    )
  }
)

Calendar.displayName = 'Calendar'
