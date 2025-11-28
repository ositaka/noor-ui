'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { StatsCard } from '@/components/ui/stats-card'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { BestPractices } from '@/components/docs/best-practices'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'
import { Users, TrendingUp, DollarSign, ShoppingCart } from 'lucide-react'

const getStatsCardProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'icon',
    type: 'React.ReactNode',
    default: 'undefined',
    required: true,
    description: t.statsCardComponent.props.icon,
  },
  {
    name: 'label',
    type: 'string',
    default: 'undefined',
    required: true,
    description: t.statsCardComponent.props.label,
  },
  {
    name: 'value',
    type: 'string | number',
    default: 'undefined',
    required: true,
    description: t.statsCardComponent.props.value,
  },
  {
    name: 'trend',
    type: 'number',
    default: 'undefined',
    required: false,
    description: t.statsCardComponent.props.trend,
  },
  {
    name: 'trendLabel',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.statsCardComponent.props.trendLabel,
  },
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.statsCardComponent.props.className,
  },
]

export default function StatsCardPage() {
  const { locale } = useDirection()
  const t = content[locale]
  const statsCardProps = getStatsCardProps(t)

  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">{t.common.home}</Link></li>
            <li>/</li>
            <li><Link href="/components" className="hover:text-foreground transition-colors">Components</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">StatsCard</li>
          </ol>
        </nav>

        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold tracking-tight">{t.statsCardComponent.title}</h1>
            <Badge>v0.4.0</Badge>
          </div>
          <p className="text-xl text-muted-foreground mb-6">
            {t.statsCardComponent.description}
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.statsCardComponent.liveDemo}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              icon={<Users className="h-4 w-4" />}
              label="Total Users"
              value="2,543"
              trend={12}
              trendLabel="from last month"
            />
            <StatsCard
              icon={<TrendingUp className="h-4 w-4" />}
              label="Revenue"
              value="$45,231"
              trend={8}
              trendLabel="from last month"
            />
            <StatsCard
              icon={<DollarSign className="h-4 w-4" />}
              label="Sales"
              value="$12,234"
              trend={-3}
              trendLabel="from last month"
            />
            <StatsCard
              icon={<ShoppingCart className="h-4 w-4" />}
              label="Active Orders"
              value="573"
            />
          </div>
        </section>

        <Separator className="my-12" />

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.statsCardComponent.installation}</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm"><code>npm install noorui-rtl</code></pre>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.statsCardComponent.usage}</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
                  <code>{`import { StatsCard } from 'noorui-rtl'
import { Users } from 'lucide-react'

<StatsCard
  icon={<Users className="h-4 w-4" />}
  label="Total Users"
  value="2,543"
  trend={12}
  trendLabel="from last month"
/>

// Without trend
<StatsCard
  icon={<Icon />}
  label="Metric Name"
  value="1,234"
/>`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-12" />

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.statsCardComponent.props.title}</h2>
          <PropsTable props={statsCardProps} />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.componentPage.sections.bestPractices}</h2>
          <BestPractices
            dos={t.statsCardComponent.bestPractices.doList}
            donts={t.statsCardComponent.bestPractices.dontList}
          />
        </section>
      </main>
    </div>
  )
}
