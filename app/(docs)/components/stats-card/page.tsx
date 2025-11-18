'use client'

import * as React from 'react'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'
import { BestPractices } from '@/components/docs/best-practices'
import { StatsCard } from '@/components/dashboard/stats-card'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'
import {
  Users,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  FileText,
  Activity,
} from 'lucide-react'

export default function StatsCardPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const t = content[locale]

  const basicUsage = `import { StatsCard } from '@/components/dashboard/stats-card'
import { Users } from 'lucide-react'

export function Example() {
  return (
    <StatsCard
      label="Total Users"
      value={1250}
      icon={<Users />}
    />
  )
}`

  const withTrend = `<StatsCard
  label="Revenue"
  value={45231}
  format="currency"
  trend={12.5}
  trendLabel="vs last month"
  icon={<DollarSign />}
/>`

  const negativeTrend = `<StatsCard
  label="Orders"
  value={328}
  trend={-5.2}
  trendLabel="vs last week"
  icon={<ShoppingCart />}
/>`

  const percentage = `<StatsCard
  label="Conversion Rate"
  value={3.24}
  format="percentage"
  trend={0.8}
  trendLabel="vs last month"
  icon={<TrendingUp />}
/>`

  const loading = `<StatsCard
  label="Page Views"
  value={0}
  isLoading={true}
  icon={<Activity />}
/>`

  return (
    <div className="container mx-auto py-8 space-y-12" dir={direction}>
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-4xl font-bold">
          {t.statsCardPage.title}
        </h1>
        <p className="text-lg text-muted-foreground">
          {t.statsCardPage.description}
        </p>
      </div>

      {/* Basic Example */}
      <ComponentShowcase
        title={t.statsCardPage.examples.basicUsage}
        description={t.statsCardPage.examples.basicUsageDesc}
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatsCard
            label={t.statsCardPage.examples.totalUsers}
            value={1250}
            icon={<Users />}
          />
          <StatsCard
            label={t.statsCardPage.examples.articles}
            value={48}
            icon={<FileText />}
          />
          <StatsCard
            label={t.statsCardPage.examples.activity}
            value={356}
            icon={<Activity />}
          />
        </div>
      </ComponentShowcase>

      <CodeBlock code={basicUsage} language="tsx" title={t.statsCardPage.examples.code} />

      {/* With Positive Trend */}
      <ComponentShowcase
        title={t.statsCardPage.examples.positiveTrend}
        description={t.statsCardPage.examples.positiveTrendDesc}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <StatsCard
            label={t.statsCardPage.examples.revenue}
            value={45231}
            format="currency"
            trend={12.5}
            trendLabel={t.statsCardPage.examples.vsLastMonth}
            icon={<DollarSign />}
          />
          <StatsCard
            label={t.statsCardPage.examples.newUsers}
            value={234}
            trend={18.2}
            trendLabel={t.statsCardPage.examples.vsLastWeek}
            icon={<Users />}
          />
        </div>
      </ComponentShowcase>

      <CodeBlock code={withTrend} language="tsx" />

      {/* With Negative Trend */}
      <ComponentShowcase
        title={t.statsCardPage.examples.negativeTrend}
        description={t.statsCardPage.examples.negativeTrendDesc}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <StatsCard
            label={t.statsCardPage.examples.orders}
            value={328}
            trend={-5.2}
            trendLabel={t.statsCardPage.examples.vsLastWeek}
            icon={<ShoppingCart />}
          />
          <StatsCard
            label={t.statsCardPage.examples.bounceRate}
            value={42.3}
            format="percentage"
            trend={-2.1}
            trendLabel={t.statsCardPage.examples.vsLastMonth}
            icon={<Activity />}
          />
        </div>
      </ComponentShowcase>

      <CodeBlock code={negativeTrend} language="tsx" />

      {/* Percentage Format */}
      <ComponentShowcase
        title={t.statsCardPage.examples.percentageFormat}
        description={t.statsCardPage.examples.percentageFormatDesc}
      >
        <div className="grid gap-4 md:grid-cols-3">
          <StatsCard
            label={t.statsCardPage.examples.conversionRate}
            value={3.24}
            format="percentage"
            trend={0.8}
            trendLabel={t.statsCardPage.examples.vsLastMonth}
            icon={<TrendingUp />}
          />
          <StatsCard
            label={t.statsCardPage.examples.growthRate}
            value={24.5}
            format="percentage"
            trend={5.3}
            trendLabel={t.statsCardPage.examples.vsLastQuarter}
            icon={<TrendingUp />}
          />
          <StatsCard
            label={t.statsCardPage.examples.successRate}
            value={98.2}
            format="percentage"
            trend={1.2}
            trendLabel={t.statsCardPage.examples.vsLastWeek}
            icon={<Activity />}
          />
        </div>
      </ComponentShowcase>

      <CodeBlock code={percentage} language="tsx" />

      {/* Loading State */}
      <ComponentShowcase
        title={t.statsCardPage.examples.loadingState}
        description={t.statsCardPage.examples.loadingStateDesc}
      >
        <div className="grid gap-4 md:grid-cols-3">
          <StatsCard
            label={t.statsCardPage.examples.pageViews}
            value={0}
            isLoading={true}
            icon={<Activity />}
          />
          <StatsCard
            label={t.statsCardPage.examples.visitors}
            value={0}
            isLoading={true}
            icon={<Users />}
          />
          <StatsCard
            label={t.statsCardPage.examples.revenue}
            value={0}
            isLoading={true}
            icon={<DollarSign />}
          />
        </div>
      </ComponentShowcase>

      <CodeBlock code={loading} language="tsx" />

      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{t.componentPage.sections.props}</h2>

        <PropsTable
          props={[
            {
              name: 'label',
              type: 'string',
              description: t.statsCardPage.props.label,
            },
            {
              name: 'value',
              type: 'number | string',
              description: t.statsCardPage.props.value,
            },
            {
              name: 'trend',
              type: 'number',
              description: t.statsCardPage.props.trend,
              required: false,
            },
            {
              name: 'trendLabel',
              type: 'string',
              description: t.statsCardPage.props.trendLabel,
              required: false,
            },
            {
              name: 'icon',
              type: 'React.ReactNode',
              description: t.statsCardPage.props.icon,
              required: false,
            },
            {
              name: 'isLoading',
              type: 'boolean',
              description: t.statsCardPage.props.isLoading,
              default: 'false',
              required: false,
            },
            {
              name: 'format',
              type: "'number' | 'currency' | 'percentage'",
              description: t.statsCardPage.props.format,
              default: "'number'",
              required: false,
            },
            {
              name: 'className',
              type: 'string',
              description: t.statsCardPage.props.className,
              required: false,
            },
            {
              name: 'valueClassName',
              type: 'string',
              description: t.statsCardPage.props.valueClassName,
              required: false,
            },
          ]}
        />
      </div>

      {/* Usage Guidelines */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">
          {t.statsCardPage.usageGuidelines.title}
        </h2>

        <div className="space-y-3 text-sm">
          <div>
            <h3 className="font-semibold mb-1">
              {t.statsCardPage.usageGuidelines.whenToUse}
            </h3>
            <ul className="list-disc ps-5 space-y-1 text-muted-foreground">
              <li>
                {t.statsCardPage.usageGuidelines.displayMetrics}
              </li>
              <li>
                {t.statsCardPage.usageGuidelines.showTrends}
              </li>
              <li>
                {t.statsCardPage.usageGuidelines.quickOverview}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          {t.componentPage.sections.bestPractices}
        </h2>
        <BestPractices
          dos={t.statsCardComponent.bestPractices.doList}
          donts={t.statsCardComponent.bestPractices.dontList}
        />
      </section>
    </div>
  )
}
