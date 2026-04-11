'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Chart, type ChartProps } from '@/components/ui/chart'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { ChartBar, ArrowsLeftRight } from '@phosphor-icons/react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'
import { StorybookLink } from '@/components/docs/storybook-link'
import { ComponentDocSections } from '@/components/docs/component-doc-sections'

// ---------------------------------------------------------------------------
// Sample data — quarterly sales by region (line/area/multi-series)
// ---------------------------------------------------------------------------

const quarterlySales = [
  { quarter: 'Q1', dubai: 128, riyadh: 95, doha: 64 },
  { quarter: 'Q2', dubai: 145, riyadh: 112, doha: 78 },
  { quarter: 'Q3', dubai: 162, riyadh: 130, doha: 85 },
  { quarter: 'Q4', dubai: 189, riyadh: 148, doha: 102 },
]

const quarterlySalesAr = [
  { quarter: 'الربع ١', dubai: 128, riyadh: 95, doha: 64 },
  { quarter: 'الربع ٢', dubai: 145, riyadh: 112, doha: 78 },
  { quarter: 'الربع ٣', dubai: 162, riyadh: 130, doha: 85 },
  { quarter: 'الربع ٤', dubai: 189, riyadh: 148, doha: 102 },
]

// Department budgets (bar chart)
const departmentBudgets = [
  { dept: 'Eng', budget: 420 },
  { dept: 'Design', budget: 280 },
  { dept: 'Marketing', budget: 350 },
  { dept: 'Sales', budget: 310 },
  { dept: 'Support', budget: 190 },
]

const departmentBudgetsAr = [
  { dept: 'الهندسة', budget: 420 },
  { dept: 'التصميم', budget: 280 },
  { dept: 'التسويق', budget: 350 },
  { dept: 'المبيعات', budget: 310 },
  { dept: 'الدعم', budget: 190 },
]

// Monthly users (area chart)
const monthlyUsers = [
  { month: 'Jan', users: 1200 },
  { month: 'Feb', users: 1450 },
  { month: 'Mar', users: 1380 },
  { month: 'Apr', users: 1720 },
  { month: 'May', users: 1890 },
  { month: 'Jun', users: 2150 },
]

const monthlyUsersAr = [
  { month: 'يناير', users: 1200 },
  { month: 'فبراير', users: 1450 },
  { month: 'مارس', users: 1380 },
  { month: 'أبريل', users: 1720 },
  { month: 'مايو', users: 1890 },
  { month: 'يونيو', users: 2150 },
]

// ---------------------------------------------------------------------------
// Props definitions
// ---------------------------------------------------------------------------

const getChartProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'type',
    type: "'line' | 'bar' | 'area' | 'donut'",
    required: true,
    description: t.chartComponent.props.type,
  },
  {
    name: 'data',
    type: 'ChartDataItem[]',
    required: true,
    description: t.chartComponent.props.data,
  },
  {
    name: 'categoryKey',
    type: 'string',
    default: "'name'",
    description: t.chartComponent.props.categoryKey,
  },
  {
    name: 'valueKey',
    type: 'string | string[]',
    default: "'value'",
    description: t.chartComponent.props.valueKey,
  },
  {
    name: 'colors',
    type: 'string[]',
    default: 'semantic theme colors',
    description: t.chartComponent.props.colors,
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: t.chartComponent.props.size,
  },
  {
    name: 'locale',
    type: "'en' | 'ar'",
    default: 'auto (from direction provider)',
    description: t.chartComponent.props.locale,
  },
  {
    name: 'showGrid',
    type: 'boolean',
    default: 'true',
    description: t.chartComponent.props.showGrid,
  },
  {
    name: 'showXAxis',
    type: 'boolean',
    default: 'true',
    description: t.chartComponent.props.showXAxis,
  },
  {
    name: 'showYAxis',
    type: 'boolean',
    default: 'true',
    description: t.chartComponent.props.showYAxis,
  },
  {
    name: 'yAxisFormatter',
    type: '(value: number) => string',
    description: t.chartComponent.props.yAxisFormatter,
  },
  {
    name: 'xAxisFormatter',
    type: '(value: string) => string',
    description: t.chartComponent.props.xAxisFormatter,
  },
  {
    name: 'strokeWidth',
    type: 'number',
    default: '2.5',
    description: t.chartComponent.props.strokeWidth,
  },
  {
    name: 'fontSize',
    type: 'number',
    default: '14',
    description: t.chartComponent.props.fontSize,
  },
  {
    name: 'className',
    type: 'string',
    description: t.chartComponent.props.className,
  },
]

const getDonutProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'value',
    type: 'number',
    description: t.chartComponent.donutProps.value,
  },
  {
    name: 'innerLabel',
    type: 'string',
    description: t.chartComponent.donutProps.innerLabel,
  },
  {
    name: 'innerSubLabel',
    type: 'string',
    description: t.chartComponent.donutProps.innerSubLabel,
  },
  {
    name: 'thickness',
    type: "'thin' | 'default' | 'thick'",
    default: "'default'",
    description: t.chartComponent.donutProps.thickness,
  },
]

// ---------------------------------------------------------------------------
// Code snippets
// ---------------------------------------------------------------------------

const installCode = `npm install noorui-rtl`

const basicUsageCode = `import { Chart } from 'noorui-rtl'

const data = [
  { quarter: 'Q1', sales: 128 },
  { quarter: 'Q2', sales: 145 },
  { quarter: 'Q3', sales: 162 },
]

<Chart
  type="line"
  data={data}
  categoryKey="quarter"
  valueKey="sales"
/>`

const lineChartCode = `<Chart
  type="line"
  data={quarterlySales}
  categoryKey="quarter"
  valueKey={['dubai', 'riyadh']}
  colors={['var(--color-primary)', 'var(--color-info)']}
/>`

const barChartCode = `<Chart
  type="bar"
  data={departmentBudgets}
  categoryKey="dept"
  valueKey="budget"
/>`

const areaChartCode = `<Chart
  type="area"
  data={monthlyUsers}
  categoryKey="month"
  valueKey="users"
/>`

const donutChartCode = `<Chart
  type="donut"
  data={[]}
  value={73}
  innerLabel="73%"
  innerSubLabel="Completed"
  size="sm"
/>`

const rtlCode = `// RTL support is automatic!
// X-axis reverses, Y-axis moves to the right,
// and numbers use Arabic-Indic numerals.

<Chart
  type="bar"
  data={arabicData}
  categoryKey="dept"
  valueKey="budget"
  locale="ar"
/>`

const multiSeriesCode = `// Pass an array to valueKey for multi-series
<Chart
  type="line"
  data={quarterlySales}
  categoryKey="quarter"
  valueKey={['dubai', 'riyadh', 'doha']}
  colors={[
    'var(--color-primary)',
    'var(--color-info)',
    'var(--color-success)',
  ]}
/>`

const sizeVariantsCode = `// Small (180px)
<Chart type="area" data={data} size="sm" />

// Medium (260px, default)
<Chart type="area" data={data} size="md" />

// Large (360px)
<Chart type="area" data={data} size="lg" />`

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function ChartPage() {
  const { locale, direction } = useDirection()
  const t = content[locale]
  const chartProps = getChartProps(t)
  const donutProps = getDonutProps(t)
  const isRTL = direction === 'rtl'

  const salesData = isRTL ? quarterlySalesAr : quarterlySales
  const budgetData = isRTL ? departmentBudgetsAr : departmentBudgets
  const usersData = isRTL ? monthlyUsersAr : monthlyUsers

  return (
    <div className="min-h-screen">
      <div className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-12">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {t.common.home}
              </Link>
            </li>
            <li><span aria-hidden="true">/</span></li>
            <li>
              <Link href="/components" className="hover:text-foreground transition-colors">
                {t.nav.components}
              </Link>
            </li>
            <li><span aria-hidden="true">/</span></li>
            <li className="text-foreground font-medium" aria-current="page">{t.chartComponent.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-4 bg-primary/10 rounded-xl">
              <ChartBar className="h-10 w-10 text-primary" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold tracking-tight">{t.chartComponent.title}</h1>
                <Badge variant="secondary">{t.chartComponent.badge}</Badge>
              </div>
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.chartComponent.description}
          </p>
        
        <div className="mt-4">
          <StorybookLink />
        </div>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.chartComponent.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo className="block">
              <div className="w-full max-w-2xl mx-auto">
                <Chart
                  type="line"
                  data={salesData}
                  categoryKey="quarter"
                  valueKey={['dubai', 'riyadh']}
                  colors={['var(--color-primary)', 'var(--color-info)']}
                  aria-label={t.chartComponent.ariaLabels.previewLine}
                />
              </div>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.chartComponent.installation}</h2>
          <CodeBlock code={installCode} language="bash" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.chartComponent.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.chartComponent.examples.title}</h2>

          <div className="space-y-12">
            {/* Line Chart */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.chartComponent.examples.lineChart}</h3>
              <p className="text-muted-foreground mb-4">{t.chartComponent.examples.lineChartDesc}</p>
              <Card>
                <CardContent className="p-6">
                  <Chart
                    type="line"
                    data={salesData}
                    categoryKey="quarter"
                    valueKey={['dubai', 'riyadh']}
                    colors={['var(--color-primary)', 'var(--color-info)']}
                    aria-label={t.chartComponent.ariaLabels.lineDubaiRiyadh}
                  />
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={lineChartCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Bar Chart */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.chartComponent.examples.barChart}</h3>
              <p className="text-muted-foreground mb-4">{t.chartComponent.examples.barChartDesc}</p>
              <Card>
                <CardContent className="p-6">
                  <Chart
                    type="bar"
                    data={budgetData}
                    categoryKey="dept"
                    valueKey="budget"
                    aria-label={t.chartComponent.ariaLabels.barBudgets}
                  />
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={barChartCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Area Chart */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.chartComponent.examples.areaChart}</h3>
              <p className="text-muted-foreground mb-4">{t.chartComponent.examples.areaChartDesc}</p>
              <Card>
                <CardContent className="p-6">
                  <Chart
                    type="area"
                    data={usersData}
                    categoryKey="month"
                    valueKey="users"
                    aria-label={t.chartComponent.ariaLabels.areaUsers}
                  />
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={areaChartCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Donut Chart */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.chartComponent.examples.donutChart}</h3>
              <p className="text-muted-foreground mb-4">{t.chartComponent.examples.donutChartDesc}</p>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-center justify-center gap-12 py-4">
                    <Chart
                      type="donut"
                      data={[]}
                      value={73}
                      innerLabel={isRTL ? '٧٣٪' : '73%'}
                      innerSubLabel={t.chartComponent.demo.completed}
                      size="sm"
                      aria-label={t.chartComponent.ariaLabels.donutCompleted}
                    />
                    <Chart
                      type="donut"
                      data={[]}
                      value={45}
                      innerLabel={isRTL ? '٤٥٪' : '45%'}
                      innerSubLabel={t.chartComponent.demo.inProgress}
                      size="sm"
                      colors={['var(--color-warning)']}
                      aria-label={t.chartComponent.ariaLabels.donutInProgress}
                    />
                    <Chart
                      type="donut"
                      data={[]}
                      value={92}
                      innerLabel={isRTL ? '٩٢٪' : '92%'}
                      innerSubLabel={t.chartComponent.demo.target}
                      size="sm"
                      colors={['var(--color-success)']}
                      aria-label={t.chartComponent.ariaLabels.donutTarget}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={donutChartCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Multi-series */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.chartComponent.examples.multiSeries}</h3>
              <p className="text-muted-foreground mb-4">{t.chartComponent.examples.multiSeriesDesc}</p>
              <Card>
                <CardContent className="p-6">
                  <Chart
                    type="line"
                    data={salesData}
                    categoryKey="quarter"
                    valueKey={['dubai', 'riyadh', 'doha']}
                    colors={['var(--color-primary)', 'var(--color-info)', 'var(--color-success)']}
                    aria-label={t.chartComponent.ariaLabels.multiSeries}
                  />
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={multiSeriesCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Size variants */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.chartComponent.examples.sizeVariants}</h3>
              <p className="text-muted-foreground mb-4">{t.chartComponent.examples.sizeVariantsDesc}</p>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">{t.chartComponent.examples.small} (sm) — fontSize={'{11}'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Chart
                      type="area"
                      data={usersData}
                      categoryKey="month"
                      valueKey="users"
                      size="sm"
                      fontSize={11}
                      showGrid={false}
                      showYAxis={false}
                      aria-label={t.chartComponent.ariaLabels.sizeSmall}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">{t.chartComponent.examples.large} (lg) — fontSize={'{16}'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Chart
                      type="area"
                      data={usersData}
                      categoryKey="month"
                      valueKey="users"
                      size="lg"
                      fontSize={16}
                      aria-label={t.chartComponent.ariaLabels.sizeLarge}
                    />
                  </CardContent>
                </Card>
              </div>
              <div className="mt-4">
                <CodeBlock code={sizeVariantsCode} language="tsx" collapsible />
              </div>
            </div>
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.chartComponent.propsSection.title}</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.chartComponent.propsSection.chartProps}</h3>
              <PropsTable props={chartProps} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{t.chartComponent.propsSection.donutProps}</h3>
              <PropsTable props={donutProps} />
              <Card className="mt-4">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">
                    {t.chartComponent.propsSection.donutNote}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.chartComponent.accessibility.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t.chartComponent.accessibility.screenReaderTable}</h3>
                <p className="text-muted-foreground">{t.chartComponent.accessibility.screenReaderTableDesc}</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.chartComponent.accessibility.theming}</h3>
                <p className="text-muted-foreground">{t.chartComponent.accessibility.themingDesc}</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.chartComponent.accessibility.tooltips}</h3>
                <p className="text-muted-foreground">{t.chartComponent.accessibility.tooltipsDesc}</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.chartComponent.accessibility.numberFormatting}</h3>
                <p className="text-muted-foreground">{t.chartComponent.accessibility.numberFormattingDesc}</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.chartComponent.rtl.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-6">
              <p className="text-muted-foreground">{t.chartComponent.rtl.description}</p>
              <CodeBlock code={rtlCode} language="tsx" />

              <div className="grid gap-8 md:grid-cols-2 mt-8">
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm">{t.chartComponent.rtl.ltr}</h3>
                  <div dir="ltr" lang="en">
                    <Chart
                      type="bar"
                      data={departmentBudgets}
                      categoryKey="dept"
                      valueKey="budget"
                      size="sm"
                      fontSize={11}
                      locale="en"
                      direction="ltr"
                      aria-label={t.chartComponent.ariaLabels.rtlLtr}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm">{t.chartComponent.rtl.rtlLabel}</h3>
                  <div dir="rtl" lang="ar">
                    <Chart
                      type="bar"
                      data={departmentBudgetsAr}
                      categoryKey="dept"
                      valueKey="budget"
                      size="sm"
                      fontSize={16}
                      locale="ar"
                      direction="rtl"
                      aria-label={t.chartComponent.ariaLabels.rtlAr}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3 mt-4">
                <h3 className="font-semibold">{t.chartComponent.rtl.features}</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{t.chartComponent.rtl.xAxisReversed}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{t.chartComponent.rtl.yAxisFlipped}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{t.chartComponent.rtl.arabicNumerals}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{t.chartComponent.rtl.tooltipLocalized}</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>
        <ComponentDocSections />
      </div>
    </div>
  )
}
