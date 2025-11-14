'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SiteHeader } from '@/components/layout/site-header'
import { ThemeSwitcher } from '@/components/docs/theme-switcher'
import { FeatureCard } from '@/components/ui/feature-card'
import {
  Palette,
  Globe,
  Accessibility,
  Zap,
  Code2,
  Sunrise,
  ArrowRight,
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
              <Button size="lg" asChild>
                <Link href="/components" className='inline-flex items-center'>
                  {t.home.hero.cta.primary}
                  <ArrowRight className="ms-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/getting-started">
                  {t.home.hero.cta.secondary}
                </Link>
              </Button>
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

          <ThemeSwitcher locale={locale} />
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
                    <pre className="overflow-x-auto rounded-lg bg-muted p-4">
                      <code className="text-sm">npm install @noorui/components</code>
                    </pre>
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
                    <pre className="overflow-x-auto rounded-lg bg-muted p-4">
                      <code className="text-sm">
{`import { Button } from '@noorui/components'

<Button variant="primary">
  ${t.ui.button.submit}
</Button>`}
                      </code>
                    </pre>
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

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sunrise className="h-5 w-5 text-primary" />
                <span className="font-bold">Noor UI</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {t.common.tagline}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t.nav.documentation}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/getting-started" className="hover:text-foreground transition-colors">{t.nav.getStarted}</Link></li>
                <li><Link href="/components" className="hover:text-foreground transition-colors">{t.nav.components}</Link></li>
                <li><Link href="/tokens" className="hover:text-foreground transition-colors">{t.nav.tokens}</Link></li>
                <li><Link href="/themes" className="hover:text-foreground transition-colors">{t.nav.themes}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t.common.resources}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/examples" className="hover:text-foreground transition-colors">{t.nav.examples}</Link></li>
                <li><Link href="/documentation/wcag" className="hover:text-foreground transition-colors">{t.docs.accessibility}</Link></li>
                <li><Link href="/rtl-guide" className="hover:text-foreground transition-colors">{t.nav.rtlGuide}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t.common.community}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><span className="cursor-default">GitHub</span></li>
                <li><span className="cursor-default">Discord</span></li>
                <li><span className="cursor-default">Twitter</span></li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="text-center text-sm text-muted-foreground">
            {t.common.copyright}
          </div>
        </div>
      </footer>
    </div>
  )
}
