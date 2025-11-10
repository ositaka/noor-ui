'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { SiteHeader } from '@/components/layout/site-header'
import { ThemeSwitcher } from '@/components/docs/theme-switcher'
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
import { getCurrentLocale, content } from '@/lib/i18n'

export default function HomePage() {
  const [locale, setLocale] = React.useState<'en' | 'ar'>('en')

  React.useEffect(() => {
    setLocale(getCurrentLocale())
  }, [])

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

            {/* Live Demo */}
            <Card className="mt-12">
              <CardHeader>
                <CardTitle>{t.ui.button.tryIt}</CardTitle>
                <CardDescription>
                  Interactive components that work perfectly in both directions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="demo-name">{t.ui.form.firstName}</Label>
                    <Input id="demo-name" placeholder={t.ui.form.placeholder} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="demo-email">{t.ui.form.email}</Label>
                    <Input id="demo-email" type="email" placeholder={t.ui.form.placeholder} />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button>{t.ui.button.submit}</Button>
                  <Button variant="outline">{t.ui.button.cancel}</Button>
                </div>
              </CardContent>
            </Card>
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
                const Icon = icons[index]

                return (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-primary/10 p-3">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle>{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
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
                    <h3 className="text-lg font-semibold">Ready to go!</h3>
                    <p className="text-muted-foreground">
                      Your components will automatically support RTL when the direction changes.
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
                Bringing light to multilingual interface design.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Documentation</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/getting-started" className="hover:text-foreground transition-colors">Getting Started</Link></li>
                <li><Link href="/components" className="hover:text-foreground transition-colors">Components</Link></li>
                <li><Link href="/tokens" className="hover:text-foreground transition-colors">Design Tokens</Link></li>
                <li><Link href="/themes" className="hover:text-foreground transition-colors">Themes</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/examples" className="hover:text-foreground transition-colors">Examples</Link></li>
                <li><Link href="/accessibility" className="hover:text-foreground transition-colors">Accessibility</Link></li>
                <li><Link href="/rtl-guide" className="hover:text-foreground transition-colors">RTL Guide</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/github" className="hover:text-foreground transition-colors">GitHub</Link></li>
                <li><Link href="/discord" className="hover:text-foreground transition-colors">Discord</Link></li>
                <li><Link href="/twitter" className="hover:text-foreground transition-colors">Twitter</Link></li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="text-center text-sm text-muted-foreground">
            © 2025 Noor UI. Built with Next.js, TypeScript, and Tailwind CSS.
          </div>
        </div>
      </footer>
    </div>
  )
}
