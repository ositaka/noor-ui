'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ButtonArrow } from '@/components/ui/button-arrow'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { ThemeSwitcher } from '@/components/docs/theme-switcher'
import { FeatureCard } from '@/components/ui/feature-card'
import { CodeBlock } from '@/components/docs/code-block'
import {
  Palette,
  Globe,
  Accessibility,
  Zap,
  Code2,
  Sunrise,
  CheckCircle2,
} from 'lucide-react'
import { content } from '@/lib/i18n'
import { useDirection } from '@/components/providers/direction-provider'

export default function HomePage() {
  const { locale } = useDirection()
  const t = content[locale]

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main id="main-content">
        {/* Hero Section */}
        <section className="container py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              {t.nav.documentation}
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              {t.home.hero.title}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t.home.hero.subtitle}
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.home.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonArrow size="lg" direction="forward" icon="arrow" asChild>
                <Link href="/components">
                  {t.home.hero.cta.primary}
                </Link>
              </ButtonArrow>
              <Button size="lg" variant="outline" asChild>
                <Link href="/getting-started">
                  {t.home.hero.cta.secondary}
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Installation Section */}
        <section className="container py-16">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-lg border bg-card p-8 md:p-12">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Quick Start</h2>
                  <p className="text-muted-foreground">
                    Install via npm and start building in minutes
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    v0.4.5
                  </span>
                  <span className="inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-600 dark:text-green-400">
                    Published
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <CodeBlock code="npm install noorui-rtl" language="bash" />

                <CodeBlock
                  code={`import { Button, Card, Input } from 'noorui-rtl'

export default function App() {
  return (
    <Card>
      <Button>Get Started</Button>
    </Card>
  )
}`}
                  language="tsx"
                />

                <div className="flex gap-2 pt-2">
                  <ButtonArrow variant="outline" size="sm" direction="forward" iconSize="sm" asChild>
                    <Link href="/getting-started">
                      Installation Guide
                    </Link>
                  </ButtonArrow>
                  <ButtonArrow variant="outline" size="sm" direction="forward" iconSize="sm" asChild>
                    <a href="https://www.npmjs.com/package/noorui-rtl" target="_blank" rel="noopener noreferrer">
                      View on npm
                    </a>
                  </ButtonArrow>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-y bg-muted/30 py-24">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {t.home.features.title}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {t.home.features.subtitle}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {t.home.features.items.map((feature, index) => {
                const icons = [Zap, Globe, Accessibility, Palette, Code2, Sunrise]
                const hrefs = ['/components', '/rtl-guide', '/documentation/wcag', '/themes', '/tokens', '/getting-started']
                const Icon = icons[index]
                const href = hrefs[index]

                return (
                  <FeatureCard
                    key={index}
                    title={feature.title}
                    description={feature.description}
                    icon={Icon}
                    href={href}
                  />
                )
              })}
            </div>
          </div>
        </section>

        {/* Theme Showcase */}
        <section className="container py-24">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t.themes.title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t.themes.description}
            </p>
          </div>

          <ThemeSwitcher />
        </section>

        {/* Getting Started */}
        <section className="border-y bg-muted/30 py-24">
          <div className="container">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-8">
                {t.nav.getStarted}
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                      1
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{t.docs.installation}</h3>
                    <CodeBlock code="npm install noorui-rtl" language="bash" />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                      2
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{t.docs.usage}</h3>
                    <CodeBlock
                      code={`import { Button } from 'noorui-rtl'

<Button variant="primary">
  ${t.ui.button.submit}
</Button>`}
                      language="tsx"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{t.common.readyToGo}</h3>
                    <p className="text-muted-foreground">
                      {t.common.autoRTL}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
