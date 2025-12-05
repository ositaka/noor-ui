'use client'

import * as React from 'react'
import Link from 'next/link'
import { TimePicker, TimeRangePicker, type Time, type TimeRange } from '@/components/ui/time-picker'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'
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

const basicCode = `import { TimePicker, type Time } from 'noorui-rtl'

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

const rangeCode = `import { TimeRangePicker, type TimeRange } from 'noorui-rtl'

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
  const t = content[locale]

  const [time1, setTime1] = React.useState<Time>({ hours: 9, minutes: 30 })
  const [time2, setTime2] = React.useState<Time>({ hours: 14, minutes: 0 })
  const [time3, setTime3] = React.useState<Time | undefined>(undefined)
  const [time4, setTime4] = React.useState<Time>({ hours: 9, minutes: 0 })
  const [timeRange1, setTimeRange1] = React.useState<TimeRange | undefined>({
    from: { hours: 9, minutes: 0 },
    to: { hours: 17, minutes: 0 },
  })
  const [timeRange2, setTimeRange2] = React.useState<TimeRange | undefined>(undefined)

  const formatTime = (time: Time | undefined): string => {
    if (!time) return t.timePickerComponent.descriptions.noTimeSelected
    const hours = time.hours.toString().padStart(2, '0')
    const minutes = time.minutes.toString().padStart(2, '0')
    return `${hours}:${minutes}`
  }

  const formatTimeRange = (range: TimeRange | undefined): string => {
    if (!range?.from) return t.timePickerComponent.descriptions.noRangeSelected
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
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {t.common.home}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/components" className="hover:text-foreground transition-colors">
                {t.nav.components}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">{t.timePickerComponent.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">{t.timePickerComponent.title}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          {t.timePickerComponent.description}
        </p>
      </div>

      {/* Basic Example - 24h */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          {t.timePickerComponent.examples.basicUsage24h}
        </h2>
        <ComponentShowcase>
          <ComponentShowcase.Demo>
            <div className="w-full max-w-xs mx-auto space-y-2">
              <Label>{t.timePickerComponent.labels.startTime}</Label>
              <TimePicker
                time={time1}
                onTimeChange={(t) => t && setTime1(t)}
                placeholder="Pick a time"
                placeholderAr="اختر الوقت"
              />
              <p className="text-sm text-muted-foreground">{formatTime(time1)}</p>
            </div>
          </ComponentShowcase.Demo>
        </ComponentShowcase>
        <div className="mt-6">
          <CodeBlock code={basicCode} language="tsx" />
        </div>
      </section>

      {/* 12-hour Format */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          {t.timePickerComponent.examples.format12h}
        </h2>
        <ComponentShowcase>
          <ComponentShowcase.Demo>
            <div className="w-full max-w-xs mx-auto space-y-2">
              <Label>{t.timePickerComponent.labels.appointmentTime}</Label>
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
                  : t.timePickerComponentPage.noTimeSelected}
              </p>
            </div>
          </ComponentShowcase.Demo>
        </ComponentShowcase>
        <div className="mt-6">
          <CodeBlock code={format12hCode} language="tsx" />
        </div>
      </section>

      {/* Time Range */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          {t.timePickerComponent.examples.timeRange}
        </h2>
        <ComponentShowcase>
          <ComponentShowcase.Demo>
            <div className="w-full max-w-md mx-auto space-y-2">
              <Label>{t.timePickerComponent.labels.workingHours}</Label>
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
          </ComponentShowcase.Demo>
        </ComponentShowcase>
        <div className="mt-6">
          <CodeBlock code={rangeCode} language="tsx" />
        </div>
      </section>

      {/* Minute Step */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          {t.timePickerComponent.examples.minuteIntervals}
        </h2>
        <ComponentShowcase>
          <ComponentShowcase.Demo>
            <div className="w-full max-w-xs mx-auto space-y-2">
              <Label>{t.timePickerComponent.labels.time}</Label>
              <TimePicker
                time={time4}
                onTimeChange={(t) => t && setTime4(t)}
                minuteStep={15}
                placeholder="15-minute intervals"
                placeholderAr="فترات 15 دقيقة"
              />
              <p className="text-xs text-muted-foreground">
                {t.timePickerComponent.descriptions.minutesIncrement}
              </p>
            </div>
          </ComponentShowcase.Demo>
        </ComponentShowcase>
        <div className="mt-6">
          <CodeBlock code={minuteStepCode} language="tsx" />
        </div>
      </section>

      {/* Real-World Example */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          {t.timePickerComponent.examples.realWorld}
        </h2>
        <ComponentShowcase>
          <ComponentShowcase.Demo>
            <Card className="w-full max-w-md mx-auto">
              <CardHeader>
                <CardTitle>{t.timePickerComponent.realWorldExample.medicalAppointment}</CardTitle>
                <CardDescription>
                  {t.timePickerComponent.realWorldExample.selectPreferred}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>{t.timePickerComponent.labels.preferredTime}</Label>
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
                        {t.timePickerComponent.realWorldExample.selectedTime}:
                      </span>
                      <span className="font-semibold">
                        {`${((time3.hours % 12) || 12).toString().padStart(2, '0')}:${time3.minutes.toString().padStart(2, '0')} ${time3.hours >= 12 ? (locale === 'ar' ? 'م' : 'PM') : locale === 'ar' ? 'ص' : 'AM'}`}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {t.timePickerComponent.realWorldExample.duration}:
                      </span>
                      <span className="font-semibold">{t.timePickerComponent.realWorldExample.minutes30}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {t.timePickerComponent.realWorldExample.endTime}:
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
          </ComponentShowcase.Demo>
        </ComponentShowcase>
        <div className="mt-6">
          <CodeBlock code={`const [time, setTime] = useState<Time>()

<Card>
  <CardHeader>
    <CardTitle>Medical Appointment</CardTitle>
    <CardDescription>Select your preferred appointment time</CardDescription>
  </CardHeader>
  <CardContent className="space-y-6">
    <TimePicker
      time={time}
      onTimeChange={setTime}
      format="12h"
      minuteStep={15}
      placeholder="Select appointment time"
    />
    {time && (
      <div className="space-y-2">
        <div>Selected: {formatTime(time)}</div>
        <div>Duration: 30 minutes</div>
        <div>End Time: {calculateEndTime(time, 30)}</div>
      </div>
    )}
  </CardContent>
</Card>`} language="tsx" />
        </div>
      </section>

      {/* Real-World Example - Schedule */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          {t.timePickerComponent.examples.workSchedule}
        </h2>
        <ComponentShowcase>
          <ComponentShowcase.Demo>
            <Card className="w-full max-w-md mx-auto">
              <CardHeader>
                <CardTitle>{t.timePickerComponent.realWorldExample.workSchedule}</CardTitle>
                <CardDescription>
                  {t.timePickerComponent.realWorldExample.setDailyHours}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>{t.timePickerComponent.labels.workingHours}</Label>
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
                        {t.timePickerComponent.realWorldExample.totalHours}:
                      </span>
                      <span className="font-semibold text-primary">
                        {calculateDuration(timeRange2)}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {t.timePickerComponent.realWorldExample.start}:
                        </span>
                        <span>{formatTime(timeRange2.from)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {t.timePickerComponent.realWorldExample.end}:
                        </span>
                        <span>{formatTime(timeRange2.to)}</span>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </ComponentShowcase.Demo>
        </ComponentShowcase>
        <div className="mt-6">
          <CodeBlock code={`const [timeRange, setTimeRange] = useState<TimeRange>()

<Card>
  <CardHeader>
    <CardTitle>Work Schedule</CardTitle>
    <CardDescription>Set your daily working hours</CardDescription>
  </CardHeader>
  <CardContent className="space-y-6">
    <TimeRangePicker
      timeRange={timeRange}
      onTimeRangeChange={setTimeRange}
      format="12h"
      placeholder="Set working hours"
    />
    {timeRange?.from && timeRange?.to && (
      <div className="space-y-2">
        <div>Total Hours: {calculateDuration(timeRange)}</div>
        <div>Start: {formatTime(timeRange.from)}</div>
        <div>End: {formatTime(timeRange.to)}</div>
      </div>
    )}
  </CardContent>
</Card>`} language="tsx" />
        </div>
      </section>

      {/* Use Cases */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{t.componentPage.sections.useCases}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { title: t.timePickerComponent.useCases.appointmentBooking, icon: '📅' },
            { title: t.timePickerComponent.useCases.workSchedules, icon: '⏰' },
            { title: t.timePickerComponent.useCases.eventTimers, icon: '⏱️' },
            { title: t.timePickerComponent.useCases.timeFilters, icon: '🔍' },
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
        <h2 className="text-2xl font-bold">{t.componentPage.sections.typeDefinitions}</h2>
        <CodeBlock code={typeDefinition} language="typescript" />
      </div>

      {/* API Reference - TimePicker */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{t.timePickerComponentPage.apiReferenceTimePicker}</h2>
        <PropsTable props={timePickerProps} />
      </div>

      {/* API Reference - TimeRangePicker */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{t.timePickerComponentPage.apiReferenceTimeRangePicker}</h2>
        <PropsTable props={timeRangePickerProps} />
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{t.componentPage.sections.features}</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>{t.timePickerComponent.features.formats12And24}</li>
          <li>{t.timePickerComponent.features.amPmToggle}</li>
          <li>{t.timePickerComponent.features.rangeSelection}</li>
          <li>{t.timePickerComponent.features.customIntervals}</li>
          <li>{t.timePickerComponent.features.quickActions}</li>
          <li>{t.timePickerComponent.features.integratedControls}</li>
          <li>{t.timePickerComponent.features.customFormatting}</li>
          <li>{t.timePickerComponent.features.bilingualSupport}</li>
          <li>{t.timePickerComponent.features.rtlSupport}</li>
          <li>{t.timePickerComponent.features.fullAccessibility}</li>
        </ul>
      </div>
      </main>
    </div>
  )
}
