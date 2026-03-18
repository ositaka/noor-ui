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
  SquaresFour,
  Calendar,
  Sparkle,
  Bank,
  House,
  Storefront,
  Robot,
  FirstAid,
  GraduationCap,
  type Icon as PhosphorIcon,
} from '@phosphor-icons/react'

// Icon mapping for example cards
const iconMap: Record<string, PhosphorIcon> = {
  '/examples/education': GraduationCap,
  '/examples/healthcare': FirstAid,
  '/examples/islamic-finance-dashboard': Bank,
  '/examples/registration': FileText,
  '/examples/calendar': Calendar,
  '/examples/real-estate': House,
  '/examples/portfolio': SquaresFour,
  '/examples/marketplace': Storefront,
  '/examples/ai-playground': Robot,
  '/examples/government': Sparkle,
  '/examples/hotel': House,
  '/examples/banking': Bank,
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
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
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

        {/* Link to Email Templates */}
        <div className="mt-12 max-w-3xl">
          <Card className="border-primary/50">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="font-semibold">
                  {t.examples.lookingForEmails}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t.examples.lookingForEmailsDesc}
                </p>
                <Link href="/email-templates" className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  {t.examples.viewEmailTemplates}
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Link to Components */}
        <div className="mt-12 max-w-3xl">
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
