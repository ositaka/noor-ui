'use client'

import * as React from 'react'
import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useDirection } from '@/components/providers/direction-provider'
import { NumberInput } from '@/components/ui/number-input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export interface Time {
  hours: number
  minutes: number
}

export interface TimePickerProps {
  time?: Time
  onTimeChange?: (time: Time | undefined) => void
  placeholder?: string
  placeholderAr?: string
  disabled?: boolean
  className?: string
  /**
   * 12-hour or 24-hour format
   */
  format?: '12h' | '24h'
  /**
   * Minutes step interval
   */
  minuteStep?: number
  /**
   * Format function for displaying the selected time
   */
  formatTime?: (time: Time | undefined, format: '12h' | '24h', locale: 'en' | 'ar') => string
}

const defaultFormatTime = (
  time: Time | undefined,
  format: '12h' | '24h',
  locale: 'en' | 'ar'
): string => {
  if (!time) return ''

  let { hours, minutes } = time
  let period = ''

  if (format === '12h') {
    period = hours >= 12 ? (locale === 'ar' ? 'م' : 'PM') : locale === 'ar' ? 'ص' : 'AM'
    hours = hours % 12 || 12
  }

  const formattedHours = hours.toString().padStart(2, '0')
  const formattedMinutes = minutes.toString().padStart(2, '0')

  if (locale === 'ar') {
    return period
      ? `${period} ${formattedMinutes}:${formattedHours}`
      : `${formattedMinutes}:${formattedHours}`
  }

  return period
    ? `${formattedHours}:${formattedMinutes} ${period}`
    : `${formattedHours}:${formattedMinutes}`
}

export function TimePicker({
  time,
  onTimeChange,
  placeholder,
  placeholderAr,
  disabled = false,
  className,
  format = '24h',
  minuteStep = 1,
  formatTime = defaultFormatTime,
}: TimePickerProps) {
  const { locale, direction } = useDirection()
  const [open, setOpen] = React.useState(false)
  const [hours, setHours] = React.useState(time?.hours ?? 0)
  const [minutes, setMinutes] = React.useState(time?.minutes ?? 0)
  const [period, setPeriod] = React.useState<'AM' | 'PM'>(
    time && time.hours >= 12 ? 'PM' : 'AM'
  )
  const isRTL = direction === 'rtl'

  React.useEffect(() => {
    if (time) {
      setHours(time.hours)
      setMinutes(time.minutes)
      setPeriod(time.hours >= 12 ? 'PM' : 'AM')
    }
  }, [time])

  const displayText = time
    ? formatTime(time, format, locale)
    : locale === 'ar' && placeholderAr
    ? placeholderAr
    : placeholder || (isRTL ? 'اختر الوقت' : 'Pick a time')

  const handleApply = () => {
    let finalHours = hours

    if (format === '12h') {
      if (period === 'PM' && hours < 12) {
        finalHours = hours + 12
      } else if (period === 'AM' && hours === 12) {
        finalHours = 0
      }
    }

    onTimeChange?.({ hours: finalHours, minutes })
    setOpen(false)
  }

  const handleNow = () => {
    const now = new Date()
    const currentHours = now.getHours()
    const currentMinutes = now.getMinutes()

    setHours(format === '12h' ? (currentHours % 12 || 12) : currentHours)
    setMinutes(currentMinutes)
    setPeriod(currentHours >= 12 ? 'PM' : 'AM')
  }

  const handleClear = () => {
    onTimeChange?.(undefined)
    setHours(0)
    setMinutes(0)
    setPeriod('AM')
    setOpen(false)
  }

  const maxHours = format === '12h' ? 12 : 23
  const minHours = format === '12h' ? 1 : 0

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'justify-start text-start font-normal',
            !time && 'text-muted-foreground',
            className
          )}
          disabled={disabled}
          dir={direction}
        >
          <Clock className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
          {displayText}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align={isRTL ? 'end' : 'start'}>
        <div className="space-y-4">
          <div className="text-sm font-medium">
            {isRTL ? 'اختر الوقت' : 'Select Time'}
          </div>

          {/* Time Inputs */}
          <div className="flex items-center gap-2">
            <div className="flex-1 space-y-2">
              <Label htmlFor="hours" className="text-xs">
                {isRTL ? 'الساعات' : 'Hours'}
              </Label>
              <NumberInput
                id="hours"
                value={hours}
                onChange={(val) => setHours(val ?? 0)}
                min={minHours}
                max={maxHours}
                step={1}
                showControls
                className="w-full"
              />
            </div>

            <div className="pt-6 text-xl font-bold">:</div>

            <div className="flex-1 space-y-2">
              <Label htmlFor="minutes" className="text-xs">
                {isRTL ? 'الدقائق' : 'Minutes'}
              </Label>
              <NumberInput
                id="minutes"
                value={minutes}
                onChange={(val) => setMinutes(val ?? 0)}
                min={0}
                max={59}
                step={minuteStep}
                showControls
                className="w-full"
              />
            </div>

            {format === '12h' && (
              <div className="flex-1 space-y-2">
                <Label className="text-xs">&nbsp;</Label>
                <Tabs value={period} onValueChange={(val) => setPeriod(val as 'AM' | 'PM')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="AM">{locale === 'ar' ? 'ص' : 'AM'}</TabsTrigger>
                    <TabsTrigger value="PM">{locale === 'ar' ? 'م' : 'PM'}</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleNow} className="flex-1">
              {isRTL ? 'الآن' : 'Now'}
            </Button>
            <Button variant="outline" size="sm" onClick={handleClear} className="flex-1">
              {isRTL ? 'مسح' : 'Clear'}
            </Button>
          </div>

          {/* Apply Button */}
          <Button onClick={handleApply} className="w-full">
            {isRTL ? 'تطبيق' : 'Apply'}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// Time Range Picker
export interface TimeRange {
  from: Time | undefined
  to: Time | undefined
}

export interface TimeRangePickerProps {
  timeRange?: TimeRange
  onTimeRangeChange?: (range: TimeRange | undefined) => void
  placeholder?: string
  placeholderAr?: string
  disabled?: boolean
  className?: string
  format?: '12h' | '24h'
  minuteStep?: number
  formatTimeRange?: (range: TimeRange | undefined, format: '12h' | '24h', locale: 'en' | 'ar') => string
}

const defaultFormatTimeRange = (
  range: TimeRange | undefined,
  format: '12h' | '24h',
  locale: 'en' | 'ar'
): string => {
  if (!range?.from) return ''

  const fromText = defaultFormatTime(range.from, format, locale)
  const toText = range.to ? defaultFormatTime(range.to, format, locale) : ''

  if (!toText) return fromText

  return locale === 'ar' ? `${toText} – ${fromText}` : `${fromText} - ${toText}`
}

export function TimeRangePicker({
  timeRange,
  onTimeRangeChange,
  placeholder,
  placeholderAr,
  disabled = false,
  className,
  format = '24h',
  minuteStep = 1,
  formatTimeRange = defaultFormatTimeRange,
}: TimeRangePickerProps) {
  const { locale, direction } = useDirection()
  const [open, setOpen] = React.useState(false)
  const isRTL = direction === 'rtl'

  const displayText = timeRange?.from
    ? formatTimeRange(timeRange, format, locale)
    : locale === 'ar' && placeholderAr
    ? placeholderAr
    : placeholder || (isRTL ? 'اختر نطاق الوقت' : 'Pick a time range')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'justify-start text-start font-normal',
            !timeRange?.from && 'text-muted-foreground',
            className
          )}
          disabled={disabled}
          dir={direction}
        >
          <Clock className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
          {displayText}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align={isRTL ? 'end' : 'start'}>
        <div className="space-y-4">
          <div className="text-sm font-medium">
            {isRTL ? 'اختر نطاق الوقت' : 'Select Time Range'}
          </div>

          {/* From Time */}
          <div className="space-y-2">
            <Label className="text-xs">{isRTL ? 'من' : 'From'}</Label>
            <TimePicker
              time={timeRange?.from}
              onTimeChange={(time) =>
                onTimeRangeChange?.({ from: time, to: timeRange?.to })
              }
              format={format}
              minuteStep={minuteStep}
              className="w-full"
            />
          </div>

          {/* To Time */}
          <div className="space-y-2">
            <Label className="text-xs">{isRTL ? 'إلى' : 'To'}</Label>
            <TimePicker
              time={timeRange?.to}
              onTimeChange={(time) =>
                onTimeRangeChange?.({ from: timeRange?.from, to: time })
              }
              format={format}
              minuteStep={minuteStep}
              className="w-full"
            />
          </div>

          {/* Clear Button */}
          <Button
            variant="outline"
            onClick={() => {
              onTimeRangeChange?.(undefined)
              setOpen(false)
            }}
            className="w-full"
          >
            {isRTL ? 'مسح' : 'Clear'}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
