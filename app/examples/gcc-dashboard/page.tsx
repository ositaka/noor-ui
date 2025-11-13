'use client'

import * as React from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PrayerTimes } from '@/components/ui/prayer-times'
import { HijriDate } from '@/components/ui/hijri-date'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { Badge } from '@/components/ui/badge'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

// Lazy load heavy components that aren't immediately visible
const ZakatCalculator = dynamic(
  () => import('@/components/ui/zakat-calculator').then(mod => ({ default: mod.ZakatCalculator })),
  {
    loading: () => <LoadingSpinner size="lg" text="Loading calculator..." />,
    ssr: false,
  }
)
import {
  ArrowUpRight,
  TrendingUp,
  Users,
  Heart,
  BookOpen,
  Calendar,
  Home,
  DollarSign,
} from 'lucide-react'

export default function GCCDashboardPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const t = content[locale]

  // Sample prayer times data
  const prayerTimes = [
    { name: 'Fajr', nameAr: 'الفجر', time: '04:45' },
    { name: 'Dhuhr', nameAr: 'الظهر', time: '12:15' },
    { name: 'Asr', nameAr: 'العصر', time: '15:30' },
    { name: 'Maghrib', nameAr: 'المغرب', time: '18:05' },
    { name: 'Isha', nameAr: 'العشاء', time: '19:35' },
  ]

  // Sample statistics
  const stats = [
    {
      title: t.gccDashboard.stats.totalDonations,
      value: 2456789,
      format: 'currency' as const,
      change: 0.12,
      icon: Heart,
    },
    {
      title: t.gccDashboard.stats.beneficiaries,
      value: 15234,
      format: 'number' as const,
      change: 0.08,
      icon: Users,
    },
    {
      title: t.gccDashboard.stats.completionRate,
      value: 0.945,
      format: 'percentage' as const,
      change: 0.05,
      icon: TrendingUp,
    },
    {
      title: t.gccDashboard.stats.activeProjects,
      value: 87,
      format: 'number' as const,
      change: 0.15,
      icon: BookOpen,
    },
  ]

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Home className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl hidden sm:inline">
                {t.gccDashboard.title}
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* Hijri Date in Header */}
            <HijriDate
              gregorianDate="Nov 7, 2025"
              gregorianDateAr="٧ نوفمبر ٢٠٢٥"
              hijriDate="6 Jumada I, 1447"
              hijriDateAr="٦ جمادى الأولى ١٤٤٧"
              variant="badge"
              showIcon
            />

            <Button variant="outline" size="sm" asChild>
              <Link href="/examples">{t.nav.examples}</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="border-b bg-background">
        <div className="container py-3">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  {t.common.home}
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/examples" className="hover:text-foreground transition-colors">
                  {t.nav.examples}
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground font-medium">
                {t.gccDashboard.subtitle}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          {/* Main Column */}
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">
                {t.gccDashboard.welcome}
              </h1>
              <p className="text-muted-foreground text-lg">
                {t.gccDashboard.description}
              </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                const isPositive = stat.change > 0

                return (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardDescription className="text-sm font-medium">
                        {stat.title}
                      </CardDescription>
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <ArabicNumber
                          value={stat.value}
                          format={stat.format}
                          locale={locale}
                          useArabicNumerals={isRTL}
                          className="text-3xl font-bold"
                          decimals={stat.format === 'number' ? 0 : undefined}
                        />
                        <div className="flex items-center gap-1 text-sm">
                          <ArrowUpRight
                            className={`h-4 w-4 ${isPositive ? 'text-green-600' : 'text-red-600'}`}
                          />
                          <ArabicNumber
                            value={Math.abs(stat.change)}
                            format="percentage"
                            locale={locale}
                            useArabicNumerals={isRTL}
                            className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}
                          />
                          <span className="text-muted-foreground text-xs">
                            {t.gccDashboard.fromLastMonth}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="zakat" className="space-y-4">
              <TabsList>
                <TabsTrigger value="zakat">
                  <DollarSign className="h-4 w-4 me-2" />
                  {t.gccDashboard.tabs.zakatCalculator}
                </TabsTrigger>
                <TabsTrigger value="events">
                  <Calendar className="h-4 w-4 me-2" />
                  {t.gccDashboard.tabs.events}
                </TabsTrigger>
              </TabsList>

              {/* Zakat Calculator Tab */}
              <TabsContent value="zakat" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.gccDashboard.zakat.title}</CardTitle>
                    <CardDescription>
                      {t.gccDashboard.zakat.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ZakatCalculator
                      goldPricePerGram={250}
                      silverPricePerGram={3}
                      locale={locale}
                      useArabicNumerals={isRTL}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Events Tab */}
              <TabsContent value="events" className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          {t.gccDashboard.events.communityIftar}
                        </CardTitle>
                        <Badge>{t.gccDashboard.events.upcoming}</Badge>
                      </div>
                      <CardDescription>
                        <HijriDate
                          gregorianDate="Nov 15, 2025"
                          hijriDate="14 Jumada I, 1447"
                          hijriDateAr="١٤ جمادى الأولى ١٤٤٧"
                          variant="compact"
                        />
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {t.gccDashboard.events.iftarDescription}
                      </p>
                      <Button size="sm" className="w-full">
                        {t.gccDashboard.events.registerNow}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          {t.gccDashboard.events.religiousLecture}
                        </CardTitle>
                        <Badge variant="secondary">{t.gccDashboard.events.weekly}</Badge>
                      </div>
                      <CardDescription>
                        <HijriDate
                          gregorianDate="Nov 10, 2025"
                          hijriDate="9 Jumada I, 1447"
                          hijriDateAr="٩ جمادى الأولى ١٤٤٧"
                          variant="compact"
                        />
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {t.gccDashboard.events.lectureDescription}
                      </p>
                      <Button size="sm" variant="outline" className="w-full">
                        {t.gccDashboard.events.learnMore}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>{t.gccDashboard.activity.title}</CardTitle>
                <CardDescription>
                  {t.gccDashboard.activity.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: t.gccDashboard.activity.donors.ahmed,
                      amount: 5000,
                      cause: t.gccDashboard.activity.causes.familySupport,
                    },
                    {
                      name: t.gccDashboard.activity.donors.fatima,
                      amount: 2500,
                      cause: t.gccDashboard.activity.causes.education,
                    },
                    {
                      name: t.gccDashboard.activity.donors.omar,
                      amount: 10000,
                      cause: t.gccDashboard.activity.causes.mosqueConstruction,
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
                    >
                      <div>
                        <p className="font-medium">{activity.name}</p>
                        <p className="text-sm text-muted-foreground">{activity.cause}</p>
                      </div>
                      <ArabicNumber
                        value={activity.amount}
                        format="currency"
                        locale={locale}
                        useArabicNumerals={isRTL}
                        className="font-semibold text-green-600"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Prayer Times */}
            <PrayerTimes
              prayers={prayerTimes}
              nextPrayer="Dhuhr"
              countdown="2:15:30"
              location="Riyadh"
              locationAr="الرياض"
              date="November 7, 2025"
              dateAr="٧ نوفمبر ٢٠٢٥"
            />

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {t.gccDashboard.quickActions.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" size="sm">
                  <Heart className="me-2 h-4 w-4" />
                  {t.gccDashboard.quickActions.donateNow}
                </Button>
                <Button className="w-full" variant="outline" size="sm">
                  <Users className="me-2 h-4 w-4" />
                  {t.gccDashboard.quickActions.joinEvent}
                </Button>
                <Button className="w-full" variant="outline" size="sm">
                  <BookOpen className="me-2 h-4 w-4" />
                  {t.gccDashboard.quickActions.browseProjects}
                </Button>
              </CardContent>
            </Card>

            {/* Impact Summary */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">
                  {t.gccDashboard.impact.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {t.gccDashboard.impact.contributions}
                    </span>
                    <ArabicNumber
                      value={3}
                      locale={locale}
                      useArabicNumerals={isRTL}
                      className="font-semibold"
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {t.gccDashboard.impact.totalAmount}
                    </span>
                    <ArabicNumber
                      value={17500}
                      format="currency"
                      locale={locale}
                      useArabicNumerals={isRTL}
                      className="font-semibold"
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {t.gccDashboard.impact.peopleHelped}
                    </span>
                    <ArabicNumber
                      value={45}
                      locale={locale}
                      useArabicNumerals={isRTL}
                      className="font-semibold"
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground pt-2 border-t">
                  {t.gccDashboard.impact.thankYou}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
