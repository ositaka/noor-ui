'use client'

import * as React from 'react'
import Link from 'next/link'
import { Calendar, type DateRange } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Sparkles } from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getCalendarProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'mode',
    type: "'single' | 'range'",
    default: "'single'",
    required: false,
    description: t.calendarComponent.props.mode,
  },
  {
    name: 'selected',
    type: 'Date',
    default: 'undefined',
    required: false,
    description: t.calendarComponent.props.selected,
  },
  {
    name: 'selectedRange',
    type: 'DateRange',
    default: 'undefined',
    required: false,
    description: t.calendarComponent.props.selectedRange,
  },
  {
    name: 'onSelect',
    type: '(date: Date | DateRange | undefined) => void',
    default: 'undefined',
    required: false,
    description: t.calendarComponent.props.onSelect,
  },
  {
    name: 'showHijri',
    type: 'boolean',
    default: 'false',
    required: false,
    description: t.calendarComponent.props.showHijri,
  },
  {
    name: 'events',
    type: 'CalendarEvent[]',
    default: '[]',
    required: false,
    description: t.calendarComponent.props.events,
  },
  {
    name: 'disabled',
    type: 'Date[] | ((date: Date) => boolean)',
    default: 'undefined',
    required: false,
    description: t.calendarComponent.props.disabled,
  },
  {
    name: 'minDate',
    type: 'Date',
    default: 'undefined',
    required: false,
    description: t.calendarComponent.props.minDate,
  },
  {
    name: 'maxDate',
    type: 'Date',
    default: 'undefined',
    required: false,
    description: t.calendarComponent.props.maxDate,
  },
  {
    name: 'locale',
    type: "'en' | 'ar'",
    default: "'en'",
    required: false,
    description: t.calendarComponent.props.locale,
  },
  {
    name: 'getHijriDate',
    type: '(date: Date) => { hijri: string; hijriDay: string }',
    default: 'undefined',
    required: false,
    description: t.calendarComponent.props.getHijriDate,
  },
]

const installCode = `npm install noorui-rtl`

const basicUsageCode = `import { Calendar } from 'noorui-rtl'
import { useState } from 'react'

export function DatePicker() {
  const [date, setDate] = useState<Date>()

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
    />
  )
}`

const rangeCode = `import { Calendar, type DateRange } from 'noorui-rtl'
import { useState } from 'react'

export function DateRangePicker() {
  const [range, setRange] = useState<DateRange>()

  return (
    <Calendar
      mode="range"
      selectedRange={range}
      onSelect={setRange}
    />
  )
}`

const hijriCode = `<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  showHijri={true}
  locale="ar"
/>`

const eventsCode = `const events = [
  {
    date: new Date(2025, 10, 15),
    title: 'Team Meeting',
    variant: 'primary' as const,
  },
  {
    date: new Date(2025, 10, 20),
    title: 'Project Deadline',
    variant: 'destructive' as const,
  },
  {
    date: new Date(2025, 10, 25),
    title: 'Holiday',
    variant: 'secondary' as const,
  },
]

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  events={events}
/>`

const disabledCode = `// Disable weekends
const isWeekend = (date: Date) => {
  const day = date.getDay()
  return day === 0 || day === 6
}

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  disabled={isWeekend}
/>

// Or disable specific dates
const disabledDates = [
  new Date(2025, 10, 15),
  new Date(2025, 10, 20),
]

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  disabled={disabledDates}
/>`

export default function CalendarPage() {
  const { locale } = useDirection()
  const t = content[locale]
  const calendarProps = getCalendarProps(t)

  const [singleDate, setSingleDate] = React.useState<Date>()
  const [rangeDate, setRangeDate] = React.useState<DateRange>()
  const [hijriDate, setHijriDate] = React.useState<Date>()
  const [eventDate, setEventDate] = React.useState<Date>()

  const sampleEvents = [
    {
      date: new Date(2025, 10, 15),
      title: 'Team Meeting',
      variant: 'primary' as const,
    },
    {
      date: new Date(2025, 10, 20),
      title: 'Project Deadline',
      variant: 'destructive' as const,
    },
    {
      date: new Date(2025, 10, 25),
      title: 'Eid Celebration',
      variant: 'secondary' as const,
    },
  ]

  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-12">
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
            <li className="text-foreground font-medium">{t.calendarComponent.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold tracking-tight">{t.calendarComponent.title}</h1>
            <Badge variant="outline" className="gap-1">
              <Sparkles className="h-3 w-3" />
              GCC
            </Badge>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.calendarComponent.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.calendarComponent.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="max-w-md mx-auto">
                <Calendar
                  mode="single"
                  selected={singleDate}
                  onSelect={(date) => {
                    if (date instanceof Date || date === undefined) {
                      setSingleDate(date)
                    }
                  }}
                />
              </div>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.calendarComponent.installation}</h2>
          <CodeBlock code={installCode} language="bash" title="Terminal" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.calendarComponent.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.calendarComponent.features.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{t.calendarComponent.features.dualCalendar}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.calendarComponent.features.dualCalendarDesc}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{t.calendarComponent.features.rangeSelection}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.calendarComponent.features.rangeSelectionDesc}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{t.calendarComponent.features.eventMarkers}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.calendarComponent.features.eventMarkersDesc}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{t.calendarComponent.features.disabledDates}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.calendarComponent.features.disabledDatesDesc}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{t.calendarComponent.features.navigation}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.calendarComponent.features.navigationDesc}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{t.calendarComponent.features.bilingual}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.calendarComponent.features.bilingualDesc}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.calendarComponent.examples.title}</h2>

          <div className="space-y-12">
            {/* Range Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.calendarComponent.examples.rangeSelection}</h3>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    {t.calendarComponent.examples.rangeSelectionDesc}
                  </p>
                  <div className="max-w-md mx-auto">
                    <Calendar
                      mode="range"
                      selectedRange={rangeDate}
                      onSelect={(date) => {
                        if (date && 'from' in date) {
                          setRangeDate(date as DateRange)
                        } else if (date === undefined) {
                          setRangeDate(undefined)
                        }
                      }}
                    />
                  </div>
                  {rangeDate?.from && (
                    <div className="mt-4 text-sm text-center">
                      <span className="font-medium">{t.calendarComponent.examples.selected}: </span>
                      {rangeDate.from.toLocaleDateString()}
                      {rangeDate.to && ` - ${rangeDate.to.toLocaleDateString()}`}
                    </div>
                  )}
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={rangeCode} language="tsx" collapsible />
              </div>
            </div>

            {/* With Hijri Dates */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.calendarComponent.examples.withHijri}</h3>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    {t.calendarComponent.examples.withHijriDesc}
                  </p>
                  <div className="max-w-md mx-auto">
                    <Calendar
                      mode="single"
                      selected={hijriDate}
                      onSelect={(date) => {
                        if (date instanceof Date || date === undefined) {
                          setHijriDate(date)
                        }
                      }}
                      showHijri={true}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={hijriCode} language="tsx" collapsible />
              </div>
            </div>

            {/* With Events */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.calendarComponent.examples.withEvents}</h3>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    {t.calendarComponent.examples.withEventsDesc}
                  </p>
                  <div className="max-w-md mx-auto">
                    <Calendar
                      mode="single"
                      selected={eventDate}
                      onSelect={(date) => {
                        if (date instanceof Date || date === undefined) {
                          setEventDate(date)
                        }
                      }}
                      events={sampleEvents}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={eventsCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Disabled Dates */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.calendarComponent.examples.disabledDates}</h3>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    {t.calendarComponent.examples.disabledDatesDesc}
                  </p>
                  <div className="max-w-md mx-auto">
                    <Calendar
                      mode="single"
                      disabled={(date) => {
                        const day = date.getDay()
                        return day === 0 || day === 6 // Disable weekends
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={disabledCode} language="tsx" collapsible />
              </div>
            </div>
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Props</h2>
          <PropsTable props={calendarProps} />

          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">CalendarEvent Type</h3>
              <CodeBlock
                code={`interface CalendarEvent {
  /** Event date */
  date: Date
  /** Event title */
  title: string
  /** Event color variant */
  variant?: 'default' | 'primary' | 'secondary' | 'destructive'
}`}
                language="typescript"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">DateRange Type</h3>
              <CodeBlock
                code={`interface DateRange {
  from: Date | undefined
  to: Date | undefined
}`}
                language="typescript"
              />
            </div>
          </div>
        </section>

        {/* Hijri Integration */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.calendarComponent.hijriIntegration.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                {t.calendarComponent.hijriIntegration.description}
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">{t.calendarComponent.hijriIntegration.usingFormkit}</h4>
                  <CodeBlock
                    code={`import { toHijri } from '@formkit/hijri'
import { Calendar } from 'noorui-rtl'

const getAccurateHijri = (date: Date) => {
  const hijri = toHijri(date)
  return {
    hijri: \`\${hijri.hy}-\${hijri.hm}-\${hijri.hd}\`,
    hijriDay: String(hijri.hd)
  }
}

<Calendar
  showHijri={true}
  getHijriDate={getAccurateHijri}
/>`}
                    language="tsx"
                  />
                </div>

                <Separator />

                <div>
                  <p className="text-sm text-muted-foreground">
                    {t.calendarComponent.hijriIntegration.installLibrary} <code className="bg-muted px-2 py-1 rounded">npm install @formkit/hijri</code>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.calendarComponent.accessibility.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t.calendarComponent.accessibility.keyboardNavigation}</h3>
                <p className="text-muted-foreground">
                  {t.calendarComponent.accessibility.keyboardNavigationDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.calendarComponent.accessibility.focusManagement}</h3>
                <p className="text-muted-foreground">
                  {t.calendarComponent.accessibility.focusManagementDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.calendarComponent.accessibility.screenReaders}</h3>
                <p className="text-muted-foreground">
                  {t.calendarComponent.accessibility.screenReadersDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.calendarComponent.accessibility.visualFeedback}</h3>
                <p className="text-muted-foreground">
                  {t.calendarComponent.accessibility.visualFeedbackDesc}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Considerations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.calendarComponent.rtl.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t.calendarComponent.rtl.automaticLayout}</h3>
                <p className="text-muted-foreground">
                  {t.calendarComponent.rtl.automaticLayoutDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.calendarComponent.rtl.localizedMonths}</h3>
                <p className="text-muted-foreground">
                  {t.calendarComponent.rtl.localizedMonthsDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.calendarComponent.rtl.hijriDisplay}</h3>
                <p className="text-muted-foreground">
                  {t.calendarComponent.rtl.hijriDisplayDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.calendarComponent.rtl.eventLegend}</h3>
                <p className="text-muted-foreground">
                  {t.calendarComponent.rtl.eventLegendDesc}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.calendarComponent.related.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/hijri-date">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.calendarComponent.related.hijriDate}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.calendarComponent.related.hijriDateDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/button">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.calendarComponent.related.button}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.calendarComponent.related.buttonDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/badge">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.calendarComponent.related.badge}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.calendarComponent.related.badgeDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
