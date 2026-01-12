'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'
import {
  FileText,
  CheckSquare,
  LayoutDashboard,
  ShoppingCart,
  Calendar,
  Sparkles,
  Table,
  Landmark,
  PenTool,
  Home,
  Store,
  FileEdit,
  TrendingUp,
  MessageSquare,
  Code2,
  BookOpen,
  Users,
  Bot,
  GitBranch,
  Workflow,
  Activity,
  type LucideIcon,
} from 'lucide-react'

// Icon mapping for example cards
const iconMap: Record<string, LucideIcon> = {
  '/examples/gcc-dashboard': Sparkles,
  '/examples/islamic-finance-dashboard': Landmark,
  '/examples/datatable-showcase': Table,
  '/examples/registration': FileText,
  '/examples/dashboard': LayoutDashboard,
  '/examples/calendar': Calendar,
  '/examples/real-estate': Home,
  '/examples/portfolio': LayoutDashboard,
  '/examples/marketplace': Store,
  '/examples/b2b-marketplace': ShoppingCart,
  '/examples/cms': FileEdit,
  '/examples/ai-chat-simple': MessageSquare,
  '/examples/ai-playground': Bot,
  '/examples/ai-code-assistant': Code2,
  '/examples/ai-document-qa': BookOpen,
  '/examples/ai-multi-agent': Users,
  '/examples/workflow-basic': GitBranch,
  '/examples/ai-workflow': Workflow,
  '/examples/ai-agent-evals': Activity,
  '/examples/analytics': TrendingUp,
}

interface Example {
  title: string
  description: string
  href: string
  tags: string[]
  status: string
  featured?: boolean
}

export default function ExamplesPage() {
  const { locale } = useDirection()
  const t = content[locale]

  // Get examples from i18n
  const examples: Example[] = t.exampleCards

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
            <li className="text-foreground font-medium">
              {t.nav.examples}
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {t.examples.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t.examples.subtitle}
          </p>
        </div>

        {/* Examples Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {examples.map((example) => (
            <Link
              key={example.href}
              href={example.status === 'ready' ? example.href : '#'}
              className={example.status === 'ready' ? '' : 'pointer-events-none'}
            >
              <Card className={`h-full transition-all hover:shadow-lg ${
                example.status === 'ready'
                  ? 'hover:border-primary/50 cursor-pointer'
                  : 'opacity-60'
              }`}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {(() => {
                        const Icon = iconMap[example.href]
                        return Icon ? <Icon className="h-6 w-6 text-primary" /> : null
                      })()}
                    </div>
                    {example.status === 'coming-soon' && (
                      <Badge variant="outline" className="text-xs">
                        {t.examples.comingSoon}
                      </Badge>
                    )}
                    {example.status === 'ready' && (
                      <Badge className="text-xs">
                        {t.examples.ready}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{example.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {example.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {example.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-12 max-w-3xl">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-muted rounded-lg">
                  <CheckSquare className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold">
                    {t.examples.moreSoon}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t.examples.moreSoonDesc}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Link to Starters */}
        <div className="mt-12 max-w-3xl space-y-4">
          <Card className="border-primary/50 bg-primary/5">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="font-semibold">
                  {t.examples.lookingForApps}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t.examples.lookingForAppsDesc}
                </p>
                <Link href="/starters">
                  <Badge className="cursor-pointer hover:bg-primary/90">
                    {t.examples.viewStarters}
                  </Badge>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/50">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="font-semibold">
                  {t.examples.lookingForComponents}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t.examples.lookingForComponentsDesc}
                </p>
                <Link href="/components">
                  <Badge className="cursor-pointer hover:bg-primary/90">
                    {t.examples.viewAllComponents}
                  </Badge>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
