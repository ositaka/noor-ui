'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StatsCard } from '@/components/ui/stats-card'
import { Callout } from '@/components/ui/callout'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { Chart } from '@/components/ui/chart'
import { useDirection } from '@/components/providers/direction-provider'
import {
  ChartPie,
  Quotes,
  Books,
  Heart,
  Sparkle,
  ArrowRight,
  ArrowLeft,
} from '@phosphor-icons/react'

const gt = {
  en: {
    title: 'Dashboard',
    subtitle: 'Your spiritual journey at a glance',
    quotesSaved: 'Quotes Saved',
    collections: 'Collections',
    favorites: 'Favorites',
    mantrasGenerated: 'Mantras Generated',
    sets: 'sets',
    fromLastMonth: 'from last month',
    weeklyActivity: 'Weekly Activity',
    quotesViewed: 'Quotes viewed per day',
    recentQuotes: 'Recent Quotes',
    viewAll: 'View All',
    topicsDistribution: 'Topics Distribution',
    completeProfile: 'Complete your HD Profile',
    completeProfileDesc: 'Add your Human Design chart data to unlock personalized mantras tailored to your unique design.',
    goToSettings: 'Go to Settings',
    mon: 'Mon',
    tue: 'Tue',
    wed: 'Wed',
    thu: 'Thu',
    fri: 'Fri',
    sat: 'Sat',
    sun: 'Sun',
    relationships: 'Relationships',
    selfWorth: 'Self-Worth',
    decisions: 'Decisions',
    creativity: 'Creativity',
    rest: 'Rest',
  },
  ar: {
    title: 'لوحة التحكم',
    subtitle: 'رحلتك الروحية في لمحة',
    quotesSaved: 'اقتباسات محفوظة',
    collections: 'المجموعات',
    favorites: 'المفضلة',
    mantrasGenerated: 'تأملات مُنشأة',
    sets: 'مجموعات',
    fromLastMonth: 'عن الشهر الماضي',
    weeklyActivity: 'النشاط الأسبوعي',
    quotesViewed: 'الاقتباسات المعروضة يومياً',
    recentQuotes: 'اقتباسات حديثة',
    viewAll: 'عرض الكل',
    topicsDistribution: 'توزيع المواضيع',
    completeProfile: 'أكمل ملف التصميم البشري',
    completeProfileDesc: 'أضف بيانات مخطط التصميم البشري لفتح تأملات مخصصة لتصميمك الفريد.',
    goToSettings: 'الذهاب إلى الإعدادات',
    mon: 'الإثنين',
    tue: 'الثلاثاء',
    wed: 'الأربعاء',
    thu: 'الخميس',
    fri: 'الجمعة',
    sat: 'السبت',
    sun: 'الأحد',
    relationships: 'العلاقات',
    selfWorth: 'تقدير الذات',
    decisions: 'القرارات',
    creativity: 'الإبداع',
    rest: 'الراحة',
  },
}

const recentQuotes = [
  { id: '1', text: 'The wound is the place where the Light enters you.', textAr: 'الجرح هو المكان الذي يدخل منه النور إليك.', author: 'Rumi', authorAr: 'الرومي', date: 'Mar 27', dateAr: '٢٧ مارس', isFav: true },
  { id: '2', text: 'Knowing yourself is the beginning of all wisdom.', textAr: 'معرفة نفسك هي بداية كل حكمة.', author: 'Aristotle', authorAr: 'أرسطو', date: 'Mar 26', dateAr: '٢٦ مارس', isFav: false },
  { id: '3', text: 'What you seek is seeking you.', textAr: 'ما تبحث عنه يبحث عنك.', author: 'Rumi', authorAr: 'الرومي', date: 'Mar 25', dateAr: '٢٥ مارس', isFav: true },
  { id: '4', text: 'Be patient with yourself. Nothing in nature blooms all year.', textAr: 'كن صبوراً مع نفسك. لا شيء في الطبيعة يزهر طوال العام.', author: 'Karen Salmansohn', authorAr: 'كارين سالمانسون', date: 'Mar 24', dateAr: '٢٤ مارس', isFav: false },
  { id: '5', text: 'The self is an ocean without a shore.', textAr: 'الذات بحر بلا شاطئ.', author: 'Ibn Arabi', authorAr: 'ابن عربي', date: 'Mar 23', dateAr: '٢٣ مارس', isFav: true },
]

export default function MyMantrasDashboardPage() {
  const { locale, direction } = useDirection()
  const isRTL = direction === 'rtl'
  const h = gt[locale]

  const fmt = new Intl.NumberFormat(isRTL ? 'ar' : 'en', { numberingSystem: isRTL ? 'arab' : 'latn' })

  const weeklyData = [
    { day: h.mon, views: 5 },
    { day: h.tue, views: 8 },
    { day: h.wed, views: 3 },
    { day: h.thu, views: 12 },
    { day: h.fri, views: 7 },
    { day: h.sat, views: 15 },
    { day: h.sun, views: 10 },
  ]

  const topicsData = [
    { topic: h.relationships, count: 3 },
    { topic: h.selfWorth, count: 2 },
    { topic: h.decisions, count: 2 },
    { topic: h.creativity, count: 1 },
    { topic: h.rest, count: 1 },
  ]

  return (
    <div className="container py-8">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-4 bg-primary/10 rounded-xl">
          <ChartPie className="h-10 w-10 text-primary" weight="duotone" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{h.title}</h1>
          <p className="text-muted-foreground">{h.subtitle}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard
          icon={<Quotes className="h-4 w-4" />}
          label={h.quotesSaved}
          value={fmt.format(47)}
          trend={12}
          trendLabel={h.fromLastMonth}
        />
        <StatsCard
          icon={<Books className="h-4 w-4" />}
          label={h.collections}
          value={fmt.format(6)}
          trend={2}
          trendLabel={h.fromLastMonth}
        />
        <StatsCard
          icon={<Heart className="h-4 w-4" />}
          label={h.favorites}
          value={fmt.format(23)}
          trend={8}
          trendLabel={h.fromLastMonth}
        />
        <StatsCard
          icon={<Sparkle className="h-4 w-4" />}
          label={h.mantrasGenerated}
          value={`${fmt.format(4)} ${h.sets}`}
        />
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Weekly Activity — Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>{h.weeklyActivity}</CardTitle>
              <p className="text-sm text-muted-foreground">{h.quotesViewed}</p>
            </CardHeader>
            <CardContent>
              <Chart
                type="bar"
                data={weeklyData}
                categoryKey="day"
                valueKey="views"
                colors={['var(--color-primary)']}
                size="md"
                showXAxis
                showYAxis
                aria-label={h.weeklyActivity}
              />
            </CardContent>
          </Card>

          {/* Recent Quotes */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{h.recentQuotes}</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/examples/mymantras/collections">
                    {h.viewAll}
                    {isRTL ? <ArrowLeft className="h-4 w-4 ms-1" /> : <ArrowRight className="h-4 w-4 ms-1" />}
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentQuotes.map((q) => (
                <div key={q.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <Heart
                    className={`h-4 w-4 mt-1 shrink-0 ${q.isFav ? 'text-destructive' : 'text-muted-foreground'}`}
                    weight={q.isFav ? 'fill' : 'regular'}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm line-clamp-1">{isRTL ? q.textAr : q.text}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {isRTL ? q.authorAr : q.author} · {isRTL ? q.dateAr : q.date}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Topics Distribution — Donut Chart */}
          <Card>
            <CardHeader>
              <CardTitle>{h.topicsDistribution}</CardTitle>
            </CardHeader>
            <CardContent>
              <Chart
                type="donut"
                data={topicsData}
                categoryKey="topic"
                valueKey="count"
                colors={[
                  'var(--color-primary)',
                  'var(--color-warning)',
                  'var(--color-success)',
                  'var(--color-info)',
                  'var(--color-destructive)',
                ]}
                size="sm"
                aria-label={h.topicsDistribution}
              />
            </CardContent>
          </Card>

          {/* Complete Profile Callout */}
          <Callout type="info" title={h.completeProfile}>
            <p className="text-sm mb-3">{h.completeProfileDesc}</p>
            <Button size="sm" variant="outline" asChild>
              <Link href="/examples/mymantras/settings">{h.goToSettings}</Link>
            </Button>
          </Callout>
        </div>
      </div>
    </div>
  )
}
