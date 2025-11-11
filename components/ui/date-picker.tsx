'use client'

import * as React from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useDirection } from '@/components/providers/direction-provider'

export interface DatePickerProps {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  placeholderAr?: string
  disabled?: boolean
  className?: string
  /**
   * Format function for displaying the selected date
   */
  formatDate?: (date: Date | undefined, locale: 'en' | 'ar') => string
  /**
   * Minimum selectable date
   */
  minDate?: Date
  /**
   * Maximum selectable date
   */
  maxDate?: Date
  /**
   * Dates that should be disabled
   */
  disabledDates?: Date[]
  /**
   * Show Hijri date alongside Gregorian
   */
  showHijri?: boolean
}

const defaultFormatDate = (date: Date | undefined, locale: 'en' | 'ar'): string => {
  if (!date) return ''

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  const formatted = new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-US', options).format(
    date
  )

  return formatted
}

export function DatePicker({
  date,
  onDateChange,
  placeholder,
  placeholderAr,
  disabled = false,
  className,
  formatDate = defaultFormatDate,
  minDate,
  maxDate,
  disabledDates = [],
  showHijri = false,
}: DatePickerProps) {
  const { locale, direction } = useDirection()
  const [open, setOpen] = React.useState(false)
  const isRTL = direction === 'rtl'

  const displayText = date
    ? formatDate(date, locale)
    : locale === 'ar' && placeholderAr
    ? placeholderAr
    : placeholder || (isRTL ? 'اختر تاريخ' : 'Pick a date')

  const isDateDisabled = (checkDate: Date): boolean => {
    if (minDate && checkDate < minDate) return true
    if (maxDate && checkDate > maxDate) return true
    return disabledDates.some((d) => d.toDateString() === checkDate.toDateString())
  }

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate && !isDateDisabled(selectedDate)) {
      onDateChange?.(selectedDate)
      setOpen(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'justify-start text-start font-normal',
            !date && 'text-muted-foreground',
            className
          )}
          disabled={disabled}
          dir={direction}
        >
          <CalendarIcon className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
          {displayText}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align={isRTL ? 'end' : 'start'}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => handleSelect(selectedDate as Date | undefined)}
          disabled={isDateDisabled}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

// Date Range Picker
export interface DateRange {
  from: Date | undefined
  to: Date | undefined
}

export interface DateRangePickerProps {
  dateRange?: DateRange
  onDateRangeChange?: (range: DateRange | undefined) => void
  placeholder?: string
  placeholderAr?: string
  disabled?: boolean
  className?: string
  /**
   * Format function for displaying the selected date range
   */
  formatDateRange?: (range: DateRange | undefined, locale: 'en' | 'ar') => string
  /**
   * Minimum selectable date
   */
  minDate?: Date
  /**
   * Maximum selectable date
   */
  maxDate?: Date
  /**
   * Dates that should be disabled
   */
  disabledDates?: Date[]
}

const defaultFormatDateRange = (range: DateRange | undefined, locale: 'en' | 'ar'): string => {
  if (!range?.from) return ''

  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }

  const formatter = new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-US', options)

  if (!range.to) {
    return formatter.format(range.from)
  }

  return `${formatter.format(range.from)} ${locale === 'ar' ? '–' : '-'} ${formatter.format(range.to)}`
}

export function DateRangePicker({
  dateRange,
  onDateRangeChange,
  placeholder,
  placeholderAr,
  disabled = false,
  className,
  formatDateRange = defaultFormatDateRange,
  minDate,
  maxDate,
  disabledDates = [],
}: DateRangePickerProps) {
  const { locale, direction } = useDirection()
  const [open, setOpen] = React.useState(false)
  const isRTL = direction === 'rtl'

  const displayText = dateRange?.from
    ? formatDateRange(dateRange, locale)
    : locale === 'ar' && placeholderAr
    ? placeholderAr
    : placeholder || (isRTL ? 'اختر نطاق التاريخ' : 'Pick a date range')

  const isDateDisabled = (checkDate: Date): boolean => {
    if (minDate && checkDate < minDate) return true
    if (maxDate && checkDate > maxDate) return true
    return disabledDates.some((d) => d.toDateString() === checkDate.toDateString())
  }

  const handleSelect = (range: DateRange | undefined) => {
    onDateRangeChange?.(range)
    // Close when both dates are selected
    if (range?.from && range?.to) {
      setOpen(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'justify-start text-start font-normal',
            !dateRange?.from && 'text-muted-foreground',
            className
          )}
          disabled={disabled}
          dir={direction}
        >
          <CalendarIcon className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
          {displayText}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align={isRTL ? 'end' : 'start'}>
        <Calendar
          mode="range"
          selectedRange={dateRange}
          onSelect={(selection) => handleSelect(selection as DateRange | undefined)}
          disabled={isDateDisabled}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
