'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  CheckCircle2,
  Circle,
  Clock,
  Target,
  TrendingUp,
  Users,
  Package,
  Sparkles,
  Calendar,
} from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

export default function RoadmapPage() {
  const { locale } = useDirection()
  const t = content[locale].roadmapPage

  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {t.breadcrumb.home}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">{t.breadcrumb.roadmap}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.pageHeader.title}</h1>
          <p className="text-xl text-muted-foreground">
            {t.pageHeader.description}
          </p>
        </div>

        {/* Vision */}
        <section className="mb-16">
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{t.vision.title}</CardTitle>
                  <CardDescription className="text-base mt-1">
                    {t.vision.subtitle}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">
                {t.vision.description}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-sm">{t.vision.principles.rtlFirst}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-sm">{t.vision.principles.realExamples}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-sm">{t.vision.principles.quality}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-sm">{t.vision.principles.production}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Current Status */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight mb-2">{t.currentStatus.title}</h2>
            <p className="text-muted-foreground">
              {t.currentStatus.description}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">{t.currentStatus.stats.components}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{t.currentStatus.stats.componentsCount}</div>
                <p className="text-xs text-muted-foreground mt-1">{t.currentStatus.stats.componentsDesc}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">{t.currentStatus.stats.examples}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{t.currentStatus.stats.examplesCount}</div>
                <p className="text-xs text-muted-foreground mt-1">{t.currentStatus.stats.examplesDesc}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">{t.currentStatus.stats.phase}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{t.currentStatus.stats.phaseCount}</div>
                <p className="text-xs text-muted-foreground mt-1">{t.currentStatus.stats.phaseDesc}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t.currentStatus.recentWins.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-sm">{t.currentStatus.recentWins.performance}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-sm">{t.currentStatus.recentWins.skeletons}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-sm">{t.currentStatus.recentWins.components}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <span className="text-sm">{t.currentStatus.recentWins.rebranding}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-12" />

        {/* Phases */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight mb-2">{t.phasedApproach.title}</h2>
            <p className="text-muted-foreground">
              {t.phasedApproach.description}
            </p>
          </div>

          <div className="space-y-6">
            {/* Phase 1 */}
            <Card className="border-primary">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{t.phasedApproach.phase1.title}</CardTitle>
                      <CardDescription>{t.phasedApproach.phase1.timeline}</CardDescription>
                    </div>
                  </div>
                  <Badge>{t.phasedApproach.phase1.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  {t.phasedApproach.phase1.description}
                </p>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-2">{t.phasedApproach.phase1.week1.title}</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground ms-4">
                      <li className="flex items-start gap-2">
                        <Circle className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>{t.phasedApproach.phase1.week1.task1}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Circle className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>{t.phasedApproach.phase1.week1.task2}</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{t.phasedApproach.phase1.week3.title}</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground ms-4">
                      <li className="flex items-start gap-2">
                        <Circle className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>{t.phasedApproach.phase1.week3.task1}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Circle className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>{t.phasedApproach.phase1.week3.task2}</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{t.phasedApproach.phase1.week5.title}</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground ms-4">
                      <li className="flex items-start gap-2">
                        <Circle className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>{t.phasedApproach.phase1.week5.task1}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Circle className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>{t.phasedApproach.phase1.week5.task2}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Phase 2 */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-muted p-2">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle>{t.phasedApproach.phase2.title}</CardTitle>
                      <CardDescription>{t.phasedApproach.phase2.timeline}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary">{t.phasedApproach.phase2.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  {t.phasedApproach.phase2.description}
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{t.phasedApproach.phase2.task1}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{t.phasedApproach.phase2.task2}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{t.phasedApproach.phase2.task3}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Phase 3 */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-muted p-2">
                      <Package className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle>{t.phasedApproach.phase3.title}</CardTitle>
                      <CardDescription>{t.phasedApproach.phase3.timeline}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary">{t.phasedApproach.phase3.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  {t.phasedApproach.phase3.description}
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{t.phasedApproach.phase3.task1}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{t.phasedApproach.phase3.task2}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{t.phasedApproach.phase3.task3}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Phase 4 */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-muted p-2">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle>{t.phasedApproach.phase4.title}</CardTitle>
                      <CardDescription>{t.phasedApproach.phase4.timeline}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary">{t.phasedApproach.phase4.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  {t.phasedApproach.phase4.description}
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{t.phasedApproach.phase4.task1}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{t.phasedApproach.phase4.task2}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{t.phasedApproach.phase4.task3}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Success Metrics */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight mb-2">{t.successMetrics.title}</h2>
            <p className="text-muted-foreground">
              {t.successMetrics.description}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.successMetrics.phase1.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <span>{t.successMetrics.phase1.metric1}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <span>{t.successMetrics.phase1.metric2}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <span>{t.successMetrics.phase1.metric3}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.successMetrics.phase2.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <span>{t.successMetrics.phase2.metric1}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <span>{t.successMetrics.phase2.metric2}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <span>{t.successMetrics.phase2.metric3}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.successMetrics.phase3.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <span>{t.successMetrics.phase3.metric1}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <span>{t.successMetrics.phase3.metric2}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <span>{t.successMetrics.phase3.metric3}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.successMetrics.phase4.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <span>{t.successMetrics.phase4.metric1}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <span>{t.successMetrics.phase4.metric2}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <span>{t.successMetrics.phase4.metric3}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* North Star */}
        <section className="mb-16">
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{t.northStar.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold mb-2">
                &quot;{t.northStar.metric}&quot;
              </p>
              <p className="text-muted-foreground">
                {t.northStar.description}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Timeline */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight mb-2">{t.timeline.title}</h2>
            <p className="text-muted-foreground">
              {t.timeline.description}
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 w-48">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{t.timeline.phase1}</span>
                  </div>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-1/4 bg-primary rounded-full" />
                  </div>
                  <span className="text-sm text-muted-foreground w-24 text-end">{t.timeline.phase1Timeline}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 w-48">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{t.timeline.phase2}</span>
                  </div>
                  <div className="flex-1 h-2 bg-muted rounded-full" />
                  <span className="text-sm text-muted-foreground w-24 text-end">{t.timeline.phase2Timeline}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 w-48">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{t.timeline.phase3}</span>
                  </div>
                  <div className="flex-1 h-2 bg-muted rounded-full" />
                  <span className="text-sm text-muted-foreground w-24 text-end">{t.timeline.phase3Timeline}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 w-48">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{t.timeline.phase4}</span>
                  </div>
                  <div className="flex-1 h-2 bg-muted rounded-full" />
                  <span className="text-sm text-muted-foreground w-24 text-end">{t.timeline.phase4Timeline}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                <strong>{t.timeline.totalNpm}</strong> {t.timeline.totalNpmTime}<br />
                <strong>{t.timeline.totalDemos}</strong> {t.timeline.totalDemosTime}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <section>
          <Card className="border-primary">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold">{t.cta.title}</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t.cta.description}
                </p>
                <div className="flex gap-3 justify-center pt-2">
                  <Link
                    href="/examples"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  >
                    {t.cta.viewExamples}
                  </Link>
                  <Link
                    href="/components"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                  >
                    {t.cta.browseComponents}
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
