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
          {isRTL ? 'بطاقة الإحصائيات' : 'Stats Card'}
        </h1>
        <p className="text-lg text-muted-foreground">
          {isRTL
            ? 'اعرض مقاييس لوحة المعلومات مع مؤشرات الاتجاه'
            : 'Display dashboard metrics with trend indicators'}
        </p>
      </div>

      {/* Basic Example */}
      <ComponentShowcase
        title={isRTL ? 'الاستخدام الأساسي' : 'Basic Usage'}
        description={
          isRTL
            ? 'بطاقة إحصائيات بسيطة مع تسمية وقيمة وأيقونة'
            : 'Simple stats card with label, value, and icon'
        }
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatsCard
            label={isRTL ? 'إجمالي المستخدمين' : 'Total Users'}
            value={1250}
            icon={<Users />}
          />
          <StatsCard
            label={isRTL ? 'المقالات' : 'Articles'}
            value={48}
            icon={<FileText />}
          />
          <StatsCard
            label={isRTL ? 'النشاط' : 'Activity'}
            value={356}
            icon={<Activity />}
          />
        </div>
      </ComponentShowcase>

      <CodeBlock code={basicUsage} language="tsx" title={isRTL ? 'الكود' : 'Code'} />

      {/* With Positive Trend */}
      <ComponentShowcase
        title={isRTL ? 'مع اتجاه إيجابي' : 'With Positive Trend'}
        description={
          isRTL
            ? 'بطاقة إحصائيات مع مؤشر اتجاه إيجابي'
            : 'Stats card with positive trend indicator'
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <StatsCard
            label={isRTL ? 'الإيرادات' : 'Revenue'}
            value={45231}
            format="currency"
            trend={12.5}
            trendLabel={isRTL ? 'مقابل الشهر الماضي' : 'vs last month'}
            icon={<DollarSign />}
          />
          <StatsCard
            label={isRTL ? 'المستخدمون الجدد' : 'New Users'}
            value={234}
            trend={18.2}
            trendLabel={isRTL ? 'مقابل الأسبوع الماضي' : 'vs last week'}
            icon={<Users />}
          />
        </div>
      </ComponentShowcase>

      <CodeBlock code={withTrend} language="tsx" />

      {/* With Negative Trend */}
      <ComponentShowcase
        title={isRTL ? 'مع اتجاه سلبي' : 'With Negative Trend'}
        description={
          isRTL
            ? 'بطاقة إحصائيات مع مؤشر اتجاه سلبي'
            : 'Stats card with negative trend indicator'
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <StatsCard
            label={isRTL ? 'الطلبات' : 'Orders'}
            value={328}
            trend={-5.2}
            trendLabel={isRTL ? 'مقابل الأسبوع الماضي' : 'vs last week'}
            icon={<ShoppingCart />}
          />
          <StatsCard
            label={isRTL ? 'معدل الارتداد' : 'Bounce Rate'}
            value={42.3}
            format="percentage"
            trend={-2.1}
            trendLabel={isRTL ? 'مقابل الشهر الماضي' : 'vs last month'}
            icon={<Activity />}
          />
        </div>
      </ComponentShowcase>

      <CodeBlock code={negativeTrend} language="tsx" />

      {/* Percentage Format */}
      <ComponentShowcase
        title={isRTL ? 'تنسيق النسبة المئوية' : 'Percentage Format'}
        description={
          isRTL
            ? 'بطاقة إحصائيات مع قيم النسبة المئوية'
            : 'Stats card with percentage values'
        }
      >
        <div className="grid gap-4 md:grid-cols-3">
          <StatsCard
            label={isRTL ? 'معدل التحويل' : 'Conversion Rate'}
            value={3.24}
            format="percentage"
            trend={0.8}
            trendLabel={isRTL ? 'مقابل الشهر الماضي' : 'vs last month'}
            icon={<TrendingUp />}
          />
          <StatsCard
            label={isRTL ? 'معدل النمو' : 'Growth Rate'}
            value={24.5}
            format="percentage"
            trend={5.3}
            trendLabel={isRTL ? 'مقابل ربع السنة' : 'vs last quarter'}
            icon={<TrendingUp />}
          />
          <StatsCard
            label={isRTL ? 'نسبة النجاح' : 'Success Rate'}
            value={98.2}
            format="percentage"
            trend={1.2}
            trendLabel={isRTL ? 'مقابل الأسبوع الماضي' : 'vs last week'}
            icon={<Activity />}
          />
        </div>
      </ComponentShowcase>

      <CodeBlock code={percentage} language="tsx" />

      {/* Loading State */}
      <ComponentShowcase
        title={isRTL ? 'حالة التحميل' : 'Loading State'}
        description={
          isRTL
            ? 'بطاقة إحصائيات في حالة التحميل'
            : 'Stats card in loading state'
        }
      >
        <div className="grid gap-4 md:grid-cols-3">
          <StatsCard
            label={isRTL ? 'مشاهدات الصفحة' : 'Page Views'}
            value={0}
            isLoading={true}
            icon={<Activity />}
          />
          <StatsCard
            label={isRTL ? 'الزوار' : 'Visitors'}
            value={0}
            isLoading={true}
            icon={<Users />}
          />
          <StatsCard
            label={isRTL ? 'الإيرادات' : 'Revenue'}
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
              description: isRTL ? 'تسمية المقياس' : 'Label for the metric',
            },
            {
              name: 'value',
              type: 'number | string',
              description: isRTL ? 'القيمة المعروضة' : 'Value to display',
            },
            {
              name: 'trend',
              type: 'number',
              description: isRTL
                ? 'نسبة الاتجاه (موجبة أو سالبة)'
                : 'Trend percentage (positive or negative)',
              required: false,
            },
            {
              name: 'trendLabel',
              type: 'string',
              description: isRTL
                ? 'تسمية الاتجاه (مثل "مقابل الشهر الماضي")'
                : 'Trend label (e.g., "vs last month")',
              required: false,
            },
            {
              name: 'icon',
              type: 'React.ReactNode',
              description: isRTL ? 'الأيقونة المعروضة' : 'Icon to display',
              required: false,
            },
            {
              name: 'isLoading',
              type: 'boolean',
              description: isRTL ? 'حالة التحميل' : 'Loading state',
              default: 'false',
              required: false,
            },
            {
              name: 'format',
              type: "'number' | 'currency' | 'percentage'",
              description: isRTL ? 'تنسيق القيمة' : 'Value format',
              default: "'number'",
              required: false,
            },
            {
              name: 'className',
              type: 'string',
              description: isRTL ? 'فئات CSS إضافية' : 'Additional CSS classes',
              required: false,
            },
            {
              name: 'valueClassName',
              type: 'string',
              description: isRTL
                ? 'فئات CSS لعنصر القيمة'
                : 'CSS classes for value element',
              required: false,
            },
          ]}
        />
      </div>

      {/* Usage Guidelines */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">
          {isRTL ? 'إرشادات الاستخدام' : 'Usage Guidelines'}
        </h2>

        <div className="space-y-3 text-sm">
          <div>
            <h3 className="font-semibold mb-1">
              {isRTL ? 'متى تستخدم' : 'When to use'}
            </h3>
            <ul className="list-disc ps-5 space-y-1 text-muted-foreground">
              <li>
                {isRTL
                  ? 'لعرض المقاييس الرئيسية في لوحات المعلومات'
                  : 'To display key metrics in dashboards'}
              </li>
              <li>
                {isRTL
                  ? 'لإظهار اتجاهات الأداء بمرور الوقت'
                  : 'To show performance trends over time'}
              </li>
              <li>
                {isRTL
                  ? 'لتوفير نظرة عامة سريعة على البيانات المهمة'
                  : 'To provide a quick overview of important data'}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          {isRTL ? 'أفضل الممارسات' : 'Best Practices'}
        </h2>
        <BestPractices
          dos={t.statsCardComponent.bestPractices.doList}
          donts={t.statsCardComponent.bestPractices.dontList}
        />
      </section>
    </div>
  )
}
