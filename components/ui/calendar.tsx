'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

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

export interface CalendarProps extends React.HTMLAttributes<HTMLDivElement> {
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
  getHijriDate?: (date: Date) => { hijri: string; hijriDay: string }
}

// ============================================================================
// Utilities
// ============================================================================

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

// Simple Hijri approximation (for demo - in production use a proper library)
function getApproximateHijri(date: Date): { hijri: string; hijriDay: string } {
  // Approximate conversion: Hijri year ≈ (Gregorian year - 579)
  // This is a simplified demo - use @formkit/hijri or similar for accuracy
  const gregorianYear = date.getFullYear()
  const hijriYear = gregorianYear - 579
  const day = date.getDate()

  const months = [
    'Muharram', 'Safar', 'Rabi\' al-Awwal', 'Rabi\' al-Thani',
    'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban',
    'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'
  ]

  const month = months[date.getMonth() % 12]

  return {
    hijri: `${day} ${month} ${hijriYear}`,
    hijriDay: String(day)
  }
}

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
    const isRTL = locale === 'ar'
    const [currentMonth, setCurrentMonth] = React.useState(selected || new Date())

    const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
    const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
    const startDate = new Date(monthStart)
    startDate.setDate(startDate.getDate() - startDate.getDay())
    const endDate = new Date(monthEnd)
    endDate.setDate(endDate.getDate() + (6 - monthEnd.getDay()))

    // Generate calendar days
    const days: CalendarDate[] = []
    const current = new Date(startDate)
    while (current <= endDate) {
      const hijriData = showHijri ? getHijriDate(current) : undefined
      days.push({
        gregorian: new Date(current),
        hijri: hijriData?.hijri,
        hijriDay: hijriData?.hijriDay,
      })
      current.setDate(current.getDate() + 1)
    }

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
      return events.filter(event => isSameDay(event.date, date))
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

    // Month/Year display
    const monthName = currentMonth.toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
      month: 'long',
      year: 'numeric',
    })

    const weekDays = React.useMemo(() => {
      const days = []
      const baseDate = new Date(2024, 0, 7) // Sunday
      for (let i = 0; i < 7; i++) {
        const date = new Date(baseDate)
        date.setDate(baseDate.getDate() + i)
        days.push(
          date.toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', { weekday: 'short' })
        )
      }
      return days
    }, [locale])

    return (
      <div ref={ref} className={cn('w-full p-4', className)} {...props}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={isRTL ? goToNextMonth : goToPreviousMonth}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={isRTL ? goToPreviousMonth : goToNextMonth}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <h2 className="text-lg font-semibold">{monthName}</h2>

          <Button variant="outline" size="sm" onClick={goToToday}>
            {isRTL ? 'اليوم' : 'Today'}
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="space-y-2">
          {/* Week days header */}
          <div className="grid grid-cols-7 gap-1">
            {weekDays.map((day, index) => (
              <div
                key={index}
                className="text-center text-sm font-medium text-muted-foreground py-2"
              >
                {day}
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
                  key={index}
                  onClick={() => handleDateClick(gregorian)}
                  disabled={isDisabled}
                  className={cn(
                    'relative h-14 rounded-md text-sm transition-colors',
                    'hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    isOutsideMonth && 'text-muted-foreground opacity-50',
                    isToday && 'font-bold ring-2 ring-primary',
                    isSelected && 'bg-primary text-primary-foreground hover:bg-primary',
                    inRange && !isSelected && 'bg-primary/20',
                    (rangeStart || rangeEnd) && 'bg-primary text-primary-foreground',
                    isDisabled && 'hover:bg-transparent'
                  )}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <span className={cn('text-sm', isToday && 'font-bold')}>
                      {gregorian.getDate()}
                    </span>
                    {showHijri && hijriDay && (
                      <span className="text-[10px] text-muted-foreground">{hijriDay}</span>
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
        {events.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm font-medium mb-2">
              {isRTL ? 'الأحداث' : 'Events'}
            </p>
            <div className="space-y-1">
              {events
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
                      {event.date.getDate()} - {event.title}
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
