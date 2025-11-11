'use client'

import * as React from 'react'
import { TimePicker, TimeRangePicker, type Time, type TimeRange } from '@/components/ui/time-picker'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { useDirection } from '@/components/providers/direction-provider'
import { Label } from '@/components/ui/label'

const timePickerProps: PropDefinition[] = [
  {
    name: 'time',
    type: 'Time',
    required: false,
    description: 'Controlled time value ({ hours: number, minutes: number })',
  },
  {
    name: 'onTimeChange',
    type: '(time: Time | undefined) => void',
    required: false,
    description: 'Callback when time changes',
  },
  {
    name: 'placeholder',
    type: 'string',
    required: false,
    description: 'Placeholder text in English',
  },
  {
    name: 'placeholderAr',
    type: 'string',
    required: false,
    description: 'Placeholder text in Arabic',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Disable the picker',
  },
  {
    name: 'format',
    type: "'12h' | '24h'",
    default: "'24h'",
    required: false,
    description: '12-hour or 24-hour time format',
  },
  {
    name: 'minuteStep',
    type: 'number',
    default: '1',
    required: false,
    description: 'Minutes increment step',
  },
  {
    name: 'formatTime',
    type: '(time: Time | undefined, format: "12h" | "24h", locale: "en" | "ar") => string',
    required: false,
    description: 'Custom time formatter',
  },
]

const timeRangePickerProps: PropDefinition[] = [
  {
    name: 'timeRange',
    type: 'TimeRange',
    required: false,
    description: 'Controlled time range ({ from: Time, to: Time })',
  },
  {
    name: 'onTimeRangeChange',
    type: '(range: TimeRange | undefined) => void',
    required: false,
    description: 'Callback when range changes',
  },
  {
    name: 'placeholder',
    type: 'string',
    required: false,
    description: 'Placeholder text in English',
  },
  {
    name: 'placeholderAr',
    type: 'string',
    required: false,
    description: 'Placeholder text in Arabic',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Disable the picker',
  },
  {
    name: 'format',
    type: "'12h' | '24h'",
    default: "'24h'",
    required: false,
    description: '12-hour or 24-hour time format',
  },
  {
    name: 'minuteStep',
    type: 'number',
    default: '1',
    required: false,
    description: 'Minutes increment step',
  },
  {
    name: 'formatTimeRange',
    type: '(range: TimeRange | undefined, format: "12h" | "24h", locale: "en" | "ar") => string',
    required: false,
    description: 'Custom range formatter',
  },
]

const basicCode = `import { TimePicker, type Time } from '@/components/ui/time-picker'

const [time, setTime] = useState<Time>({ hours: 9, minutes: 0 })

<TimePicker
  time={time}
  onTimeChange={setTime}
  placeholder="Pick a time"
  placeholderAr="اختر الوقت"
/>`

const format12hCode = `<TimePicker
  time={time}
  onTimeChange={setTime}
  format="12h"
  placeholder="Pick a time"
/>`

const rangeCode = `import { TimeRangePicker, type TimeRange } from '@/components/ui/time-picker'

const [timeRange, setTimeRange] = useState<TimeRange>({
  from: { hours: 9, minutes: 0 },
  to: { hours: 17, minutes: 0 }
})

<TimeRangePicker
  timeRange={timeRange}
  onTimeRangeChange={setTimeRange}
  placeholder="Pick a time range"
  placeholderAr="اختر نطاق الوقت"
/>`

const minuteStepCode = `<TimePicker
  time={time}
  onTimeChange={setTime}
  minuteStep={15}
  placeholder="15-minute intervals"
/>`

const typeDefinition = `interface Time {
  hours: number
  minutes: number
}

interface TimeRange {
  from: Time | undefined
  to: Time | undefined
}

interface TimePickerProps {
  time?: Time
  onTimeChange?: (time: Time | undefined) => void
  placeholder?: string
  placeholderAr?: string
  disabled?: boolean
  format?: '12h' | '24h'
  minuteStep?: number
  formatTime?: (time: Time | undefined, format: '12h' | '24h', locale: 'en' | 'ar') => string
}`

export default function TimePickerPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'

  const [time1, setTime1] = React.useState<Time>({ hours: 9, minutes: 30 })
  const [time2, setTime2] = React.useState<Time>({ hours: 14, minutes: 0 })
  const [time3, setTime3] = React.useState<Time | undefined>(undefined)
  const [time4, setTime4] = React.useState<Time>({ hours: 9, minutes: 0 })
  const [timeRange1, setTimeRange1] = React.useState<TimeRange>({
    from: { hours: 9, minutes: 0 },
    to: { hours: 17, minutes: 0 },
  })
  const [timeRange2, setTimeRange2] = React.useState<TimeRange | undefined>(undefined)

  const formatTime = (time: Time | undefined): string => {
    if (!time) return isRTL ? 'لم يتم اختيار وقت' : 'No time selected'
    const hours = time.hours.toString().padStart(2, '0')
    const minutes = time.minutes.toString().padStart(2, '0')
    return `${hours}:${minutes}`
  }

  const formatTimeRange = (range: TimeRange | undefined): string => {
    if (!range?.from) return isRTL ? 'لم يتم اختيار نطاق' : 'No range selected'
    if (!range.to) return formatTime(range.from)
    return `${formatTime(range.from)} - ${formatTime(range.to)}`
  }

  const calculateDuration = (range: TimeRange | undefined): string => {
    if (!range?.from || !range?.to) return '0'
    const fromMinutes = range.from.hours * 60 + range.from.minutes
    const toMinutes = range.to.hours * 60 + range.to.minutes
    const diff = toMinutes - fromMinutes
    const hours = Math.floor(diff / 60)
    const minutes = diff % 60
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
  }

  return (
    <div className="container mx-auto py-8 space-y-12" dir={direction}>
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-4xl font-bold">{isRTL ? 'منتقي الوقت' : 'Time Picker'}</h1>
        <p className="text-lg text-muted-foreground">
          {isRTL
            ? 'اختيار الوقت والنطاق بتنسيقات 12 و 24 ساعة'
            : 'Single time and range selection with 12h/24h formats'}
        </p>
      </div>

      {/* Basic Example - 24h */}
      <ComponentShowcase
        title={isRTL ? 'الاستخدام الأساسي (24 ساعة)' : 'Basic Usage (24h)'}
        description={isRTL ? 'منتقي وقت بسيط بتنسيق 24 ساعة' : 'Simple time picker with 24-hour format'}
      >
        <div className="w-full max-w-xs mx-auto space-y-2">
          <Label>{isRTL ? 'وقت البداية' : 'Start Time'}</Label>
          <TimePicker
            time={time1}
            onTimeChange={(t) => t && setTime1(t)}
            placeholder="Pick a time"
            placeholderAr="اختر الوقت"
          />
          <p className="text-sm text-muted-foreground">{formatTime(time1)}</p>
        </div>
      </ComponentShowcase>

      <CodeBlock code={basicCode} language="tsx" title={isRTL ? 'الكود' : 'Code'} />

      {/* 12-hour Format */}
      <ComponentShowcase
        title={isRTL ? 'تنسيق 12 ساعة' : '12-Hour Format'}
        description={isRTL ? 'منتقي وقت مع AM/PM' : 'Time picker with AM/PM'}
      >
        <div className="w-full max-w-xs mx-auto space-y-2">
          <Label>{isRTL ? 'وقت الموعد' : 'Appointment Time'}</Label>
          <TimePicker
            time={time2}
            onTimeChange={(t) => t && setTime2(t)}
            format="12h"
            placeholder="Pick a time"
            placeholderAr="اختر الوقت"
          />
          <p className="text-sm text-muted-foreground">
            {time2
              ? `${((time2.hours % 12) || 12).toString().padStart(2, '0')}:${time2.minutes.toString().padStart(2, '0')} ${time2.hours >= 12 ? (locale === 'ar' ? 'م' : 'PM') : locale === 'ar' ? 'ص' : 'AM'}`
              : isRTL
              ? 'لم يتم اختيار وقت'
              : 'No time selected'}
          </p>
        </div>
      </ComponentShowcase>

      <CodeBlock code={format12hCode} language="tsx" />

      {/* Time Range */}
      <ComponentShowcase
        title={isRTL ? 'نطاق الوقت' : 'Time Range'}
        description={isRTL ? 'اختيار نطاق زمني بوقت بداية ونهاية' : 'Select a time range with start and end'}
      >
        <div className="w-full max-w-md mx-auto space-y-2">
          <Label>{isRTL ? 'ساعات العمل' : 'Working Hours'}</Label>
          <TimeRangePicker
            timeRange={timeRange1}
            onTimeRangeChange={setTimeRange1}
            placeholder="Pick working hours"
            placeholderAr="اختر ساعات العمل"
          />
          <p className="text-sm text-muted-foreground">
            {formatTimeRange(timeRange1)} ({calculateDuration(timeRange1)})
          </p>
        </div>
      </ComponentShowcase>

      <CodeBlock code={rangeCode} language="tsx" />

      {/* Minute Step */}
      <ComponentShowcase
        title={isRTL ? 'فترات الدقائق' : 'Minute Intervals'}
        description={isRTL ? 'تحديد فترات الدقائق (15 دقيقة)' : 'Set minute intervals (15 minutes)'}
      >
        <div className="w-full max-w-xs mx-auto space-y-2">
          <Label>{isRTL ? 'الوقت' : 'Time'}</Label>
          <TimePicker
            time={time4}
            onTimeChange={(t) => t && setTime4(t)}
            minuteStep={15}
            placeholder="15-minute intervals"
            placeholderAr="فترات 15 دقيقة"
          />
          <p className="text-xs text-muted-foreground">
            {isRTL ? 'الدقائق تزيد بمقدار 15' : 'Minutes increment by 15'}
          </p>
        </div>
      </ComponentShowcase>

      <CodeBlock code={minuteStepCode} language="tsx" />

      {/* Real-World Example */}
      <ComponentShowcase
        title={isRTL ? 'مثال عملي' : 'Real-World Example'}
        description={isRTL ? 'نموذج حجز موعد' : 'Appointment booking form'}
      >
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>{isRTL ? 'حجز موعد طبي' : 'Medical Appointment'}</CardTitle>
            <CardDescription>
              {isRTL ? 'اختر الوقت المفضل للموعد' : 'Select your preferred appointment time'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>{isRTL ? 'الوقت المفضل' : 'Preferred Time'}</Label>
              <TimePicker
                time={time3}
                onTimeChange={setTime3}
                format="12h"
                minuteStep={15}
                placeholder="Select appointment time"
                placeholderAr="اختر وقت الموعد"
              />
            </div>

            {time3 && (
              <>
                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-sm text-muted-foreground">
                    {isRTL ? 'الوقت المحدد:' : 'Selected Time:'}
                  </span>
                  <span className="font-semibold">
                    {`${((time3.hours % 12) || 12).toString().padStart(2, '0')}:${time3.minutes.toString().padStart(2, '0')} ${time3.hours >= 12 ? (locale === 'ar' ? 'م' : 'PM') : locale === 'ar' ? 'ص' : 'AM'}`}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {isRTL ? 'مدة الموعد:' : 'Duration:'}
                  </span>
                  <span className="font-semibold">{isRTL ? '30 دقيقة' : '30 minutes'}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {isRTL ? 'نهاية الموعد:' : 'End Time:'}
                  </span>
                  <span className="font-semibold">
                    {(() => {
                      const endMinutes = time3.minutes + 30
                      const endHours = time3.hours + Math.floor(endMinutes / 60)
                      const finalMinutes = endMinutes % 60
                      return `${((endHours % 12) || 12).toString().padStart(2, '0')}:${finalMinutes.toString().padStart(2, '0')} ${endHours >= 12 ? (locale === 'ar' ? 'م' : 'PM') : locale === 'ar' ? 'ص' : 'AM'}`
                    })()}
                  </span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </ComponentShowcase>

      {/* Real-World Example - Schedule */}
      <ComponentShowcase
        title={isRTL ? 'مثال جدول العمل' : 'Work Schedule Example'}
        description={isRTL ? 'تحديد نطاق ساعات العمل' : 'Set working hours range'}
      >
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>{isRTL ? 'جدول العمل' : 'Work Schedule'}</CardTitle>
            <CardDescription>
              {isRTL ? 'حدد ساعات عملك اليومية' : 'Set your daily working hours'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>{isRTL ? 'ساعات العمل' : 'Working Hours'}</Label>
              <TimeRangePicker
                timeRange={timeRange2}
                onTimeRangeChange={setTimeRange2}
                format="12h"
                placeholder="Set working hours"
                placeholderAr="حدد ساعات العمل"
              />
            </div>

            {timeRange2?.from && timeRange2?.to && (
              <>
                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-sm text-muted-foreground">
                    {isRTL ? 'إجمالي الساعات:' : 'Total Hours:'}
                  </span>
                  <span className="font-semibold text-primary">
                    {calculateDuration(timeRange2)}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {isRTL ? 'وقت البداية:' : 'Start:'}
                    </span>
                    <span>{formatTime(timeRange2.from)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {isRTL ? 'وقت النهاية:' : 'End:'}
                    </span>
                    <span>{formatTime(timeRange2.to)}</span>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </ComponentShowcase>

      {/* Use Cases */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{isRTL ? 'حالات الاستخدام' : 'Use Cases'}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { title: isRTL ? 'حجز المواعيد' : 'Appointment Booking', icon: '📅' },
            { title: isRTL ? 'جداول العمل' : 'Work Schedules', icon: '⏰' },
            { title: isRTL ? 'مؤقتات الأحداث' : 'Event Timers', icon: '⏱️' },
            { title: isRTL ? 'مرشحات الوقت' : 'Time Filters', icon: '🔍' },
          ].map((useCase, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{useCase.icon}</span>
                  {useCase.title}
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Type Definition */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{isRTL ? 'تعريف النوع' : 'Type Definition'}</h2>
        <CodeBlock code={typeDefinition} language="typescript" />
      </div>

      {/* API Reference - TimePicker */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{isRTL ? 'مرجع API - TimePicker' : 'API Reference - TimePicker'}</h2>
        <PropsTable props={timePickerProps} />
      </div>

      {/* API Reference - TimeRangePicker */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{isRTL ? 'مرجع API - TimeRangePicker' : 'API Reference - TimeRangePicker'}</h2>
        <PropsTable props={timeRangePickerProps} />
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{isRTL ? 'الميزات' : 'Features'}</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>{isRTL ? 'تنسيقات 12 و 24 ساعة' : '12-hour and 24-hour formats'}</li>
          <li>{isRTL ? 'مبدل AM/PM' : 'AM/PM toggle'}</li>
          <li>{isRTL ? 'اختيار نطاق الوقت' : 'Time range selection'}</li>
          <li>{isRTL ? 'فترات الدقائق القابلة للتخصيص' : 'Customizable minute intervals'}</li>
          <li>{isRTL ? 'أزرار الإجراءات السريعة (الآن، مسح)' : 'Quick action buttons (Now, Clear)'}</li>
          <li>{isRTL ? 'عناصر تحكم الأرقام المتكاملة' : 'Integrated number controls'}</li>
          <li>{isRTL ? 'تنسيق قابل للتخصيص' : 'Customizable formatting'}</li>
          <li>{isRTL ? 'دعم ثنائي اللغة' : 'Bilingual support'}</li>
          <li>{isRTL ? 'دعم RTL/LTR' : 'RTL/LTR support'}</li>
          <li>{isRTL ? 'إمكانية الوصول الكاملة' : 'Full accessibility'}</li>
        </ul>
      </div>
    </div>
  )
}
