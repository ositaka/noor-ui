'use client'

import * as React from 'react'
import Link from 'next/link'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { CodeBlock } from '@/components/docs/code-block'
import { PropsTable } from '@/components/docs/props-table'
import { StatsCard } from '@/components/dashboard/stats-card'
import { useDirection } from '@/components/providers/direction-provider'
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
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {isRTL ? 'الرئيسية' : 'Home'}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/components" className="hover:text-foreground transition-colors">
                {isRTL ? 'المكونات' : 'Components'}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">{isRTL ? 'بطاقة الإحصائيات' : 'Stats Card'}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {isRTL ? 'بطاقة الإحصائيات' : 'Stats Card'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {isRTL
              ? 'اعرض مقاييس لوحة المعلومات مع مؤشرات الاتجاه'
              : 'Display dashboard metrics with trend indicators'}
          </p>
        </div>

      {/* Basic Example */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          {isRTL ? 'الاستخدام الأساسي' : 'Basic Usage'}
        </h2>
        <ComponentShowcase code={basicUsage}>
          <ComponentShowcase.Demo>
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
          </ComponentShowcase.Demo>
        </ComponentShowcase>
      </section>

      {/* With Positive Trend */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          {isRTL ? 'مع اتجاه إيجابي' : 'With Positive Trend'}
        </h2>
        <ComponentShowcase code={withTrend}>
          <ComponentShowcase.Demo>
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
          </ComponentShowcase.Demo>
        </ComponentShowcase>
      </section>

      {/* With Negative Trend */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          {isRTL ? 'مع اتجاه سلبي' : 'With Negative Trend'}
        </h2>
        <ComponentShowcase code={negativeTrend}>
          <ComponentShowcase.Demo>
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
          </ComponentShowcase.Demo>
        </ComponentShowcase>
      </section>

      {/* Percentage Format */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          {isRTL ? 'تنسيق النسبة المئوية' : 'Percentage Format'}
        </h2>
        <ComponentShowcase code={percentage}>
          <ComponentShowcase.Demo>
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
          </ComponentShowcase.Demo>
        </ComponentShowcase>
      </section>

      {/* Loading State */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          {isRTL ? 'حالة التحميل' : 'Loading State'}
        </h2>
        <ComponentShowcase code={loading}>
          <ComponentShowcase.Demo>
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
          </ComponentShowcase.Demo>
        </ComponentShowcase>
      </section>

      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{isRTL ? 'الخصائص' : 'Props'}</h2>

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

          <div>
            <h3 className="font-semibold mb-1">
              {isRTL ? 'أفضل الممارسات' : 'Best practices'}
            </h3>
            <ul className="list-disc ps-5 space-y-1 text-muted-foreground">
              <li>
                {isRTL
                  ? 'استخدم أيقونات متسقة عبر لوحة المعلومات'
                  : 'Use consistent icons across the dashboard'}
              </li>
              <li>
                {isRTL
                  ? 'قدم سياقًا لمؤشرات الاتجاه (مثل "مقابل الشهر الماضي")'
                  : 'Provide context for trend indicators (e.g., "vs last month")'}
              </li>
              <li>
                {isRTL
                  ? 'استخدم الألوان المناسبة للاتجاهات (أخضر للإيجابي، أحمر للسلبي)'
                  : 'Use appropriate colors for trends (green for positive, red for negative)'}
              </li>
              <li>
                {isRTL
                  ? 'احتفظ بالتسميات قصيرة ووصفية'
                  : 'Keep labels short and descriptive'}
              </li>
              <li>
                {isRTL
                  ? 'اعرض حالة التحميل أثناء جلب البيانات'
                  : 'Show loading state while fetching data'}
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
