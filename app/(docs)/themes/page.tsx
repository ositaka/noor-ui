'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/docs/code-block'
import { useDesignSystem } from '@/components/providers/design-system-provider'
import { Check, Sparkles } from 'lucide-react'
import { type Theme, themeConfig } from '@/lib/tokens'
import { cn } from '@/lib/utils'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const ThemeCardInner = ({ theme }: { theme: Theme }) => {
  const { designTheme, setDesignTheme } = useDesignSystem()
  const { locale } = useDirection()
  const config = themeConfig[theme]
  const isActive = designTheme === theme

  const name = locale === 'ar' ? config.nameAr : config.name
  const description = locale === 'ar' ? config.descriptionAr : config.description
  const features = locale === 'ar' ? config.featuresAr : config.features

  return (
    <Card
      className={cn(
        'cursor-pointer transition-all hover:shadow-lg',
        isActive && 'ring-2 ring-primary ring-offset-2'
      )}
      onClick={() => setDesignTheme(theme)}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl">{name}</CardTitle>
            <CardDescription className="mt-2">{description}</CardDescription>
          </div>
          {isActive && (
            <Check className="h-6 w-6 text-primary" />
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-sm font-medium mb-2">Features</div>
          <ul className="space-y-1">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-0.5">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="text-sm font-medium">Preview</div>
          <div className="space-y-2">
            <div className="flex gap-2">
              <Button size="sm" variant="primary">Primary</Button>
              <Button size="sm" variant="secondary">Secondary</Button>
              <Button size="sm" variant="outline">Outline</Button>
            </div>
            <div className="flex gap-2">
              <Badge>New</Badge>
              <Badge variant="secondary">Beta</Badge>
              <Badge variant="outline">Soon</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const ThemeCard = ({ theme }: { theme: Theme }) => {
  const [mounted, setMounted] = React.useState(false)
  const { locale } = useDirection()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const config = themeConfig[theme]
  const name = locale === 'ar' ? config.nameAr : config.name
  const description = locale === 'ar' ? config.descriptionAr : config.description
  const features = locale === 'ar' ? config.featuresAr : config.features

  if (!mounted) {
    return (
      <Card className="cursor-pointer transition-all hover:shadow-lg">
        <CardHeader>
          <div>
            <CardTitle className="text-2xl">{name}</CardTitle>
            <CardDescription className="mt-2">{description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="text-sm font-medium mb-2">Features</div>
            <ul className="space-y-1">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    )
  }

  return <ThemeCardInner theme={theme} />
}

export default function ThemesPage() {
  const { locale } = useDirection()
  const t = content[locale]
  const themes: Theme[] = ['minimal', 'futuristic', 'cozy', 'artistic']

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
            <li className="text-foreground font-medium">{t.themesPage.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.themesPage.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">
            {t.themesPage.subtitle}
          </p>
          <div className="flex items-center gap-2 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <Sparkles className="h-5 w-5 text-primary flex-shrink-0" />
            <p className="text-sm">
              {t.themesPage.switcherNotice}
            </p>
          </div>
        </div>

        {/* Theme Cards */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.themesPage.availableThemes}</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            {themes.map((theme) => (
              <ThemeCard key={theme} theme={theme} />
            ))}
          </div>
        </section>

        {/* Theme Details */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.themesPage.themeSpecs}</h2>

          <div className="space-y-6">
            {/* Minimal */}
            <Card>
              <CardHeader>
                <CardTitle>{t.themesPage.minimal.name}</CardTitle>
                <CardDescription>{t.themesPage.minimal.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="text-sm font-medium mb-1">{t.themesPage.minimal.typography}</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {t.themesPage.minimal.typographyDetails.map((detail, i) => (
                        <li key={i}>• {detail}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">{t.themesPage.minimal.visualStyle}</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {t.themesPage.minimal.visualStyleDetails.map((detail, i) => (
                        <li key={i}>• {detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">{t.themesPage.minimal.bestFor}</div>
                  <p className="text-sm text-muted-foreground">
                    {t.themesPage.minimal.bestForText}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Futuristic */}
            <Card>
              <CardHeader>
                <CardTitle>{t.themesPage.futuristic.name}</CardTitle>
                <CardDescription>{t.themesPage.futuristic.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="text-sm font-medium mb-1">{t.themesPage.minimal.typography}</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {t.themesPage.futuristic.typographyDetails.map((detail, i) => (
                        <li key={i}>• {detail}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">{t.themesPage.minimal.visualStyle}</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {t.themesPage.futuristic.visualStyleDetails.map((detail, i) => (
                        <li key={i}>• {detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">{t.themesPage.minimal.bestFor}</div>
                  <p className="text-sm text-muted-foreground">
                    {t.themesPage.futuristic.bestForText}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Cozy */}
            <Card>
              <CardHeader>
                <CardTitle>{t.themesPage.cozy.name}</CardTitle>
                <CardDescription>{t.themesPage.cozy.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="text-sm font-medium mb-1">{t.themesPage.minimal.typography}</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {t.themesPage.cozy.typographyDetails.map((detail, i) => (
                        <li key={i}>• {detail}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">{t.themesPage.minimal.visualStyle}</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {t.themesPage.cozy.visualStyleDetails.map((detail, i) => (
                        <li key={i}>• {detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">{t.themesPage.minimal.bestFor}</div>
                  <p className="text-sm text-muted-foreground">
                    {t.themesPage.cozy.bestForText}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Artistic */}
            <Card>
              <CardHeader>
                <CardTitle>{t.themesPage.artistic.name}</CardTitle>
                <CardDescription>{t.themesPage.artistic.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="text-sm font-medium mb-1">{t.themesPage.minimal.typography}</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {t.themesPage.artistic.typographyDetails.map((detail, i) => (
                        <li key={i}>• {detail}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">{t.themesPage.minimal.visualStyle}</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {t.themesPage.artistic.visualStyleDetails.map((detail, i) => (
                        <li key={i}>• {detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">{t.themesPage.minimal.bestFor}</div>
                  <p className="text-sm text-muted-foreground">
                    {t.themesPage.artistic.bestForText}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Live Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.themesPage.livePreview}</h2>
          <Card>
            <CardHeader>
              <CardTitle>{t.themesPage.preview.title}</CardTitle>
              <CardDescription>
                {t.themesPage.preview.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">{t.themesPage.preview.headingExample}</h3>
                <p className="text-muted-foreground mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris.
                </p>
                <p className="text-muted-foreground">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                  eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
                </p>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="theme-preview">{t.themesPage.preview.inputLabel}</Label>
                  <Input id="theme-preview" placeholder={t.themesPage.preview.inputPlaceholder} />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button>{t.themesPage.preview.primaryAction}</Button>
                  <Button variant="secondary">{t.themesPage.preview.secondary}</Button>
                  <Button variant="outline">{t.themesPage.preview.outline}</Button>
                  <Button variant="ghost">{t.themesPage.preview.ghost}</Button>
                </div>

                <div className="flex gap-2">
                  <Badge>{t.themesPage.preview.status}</Badge>
                  <Badge variant="secondary">{t.themesPage.preview.label}</Badge>
                  <Badge variant="outline">{t.themesPage.preview.tag}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Implementation */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.themesPage.implementation}</h2>
          <Card>
            <CardHeader>
              <CardTitle>{t.themesPage.impl.title}</CardTitle>
              <CardDescription>
                {t.themesPage.impl.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium mb-2">{t.themesPage.impl.viaUrl}</div>
                <CodeBlock
                  code={`// Add to any URL
?theme=minimal
?theme=futuristic
?theme=cozy
?theme=artistic

// Example
https://yoursite.com/components?theme=cozy`}
                  language="bash"
                  showLineNumbers={false}
                />
              </div>

              <div>
                <div className="text-sm font-medium mb-2">{t.themesPage.impl.viaSwitcher}</div>
                <p className="text-sm text-muted-foreground">
                  {t.themesPage.impl.switcherText}
                </p>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">{t.themesPage.impl.programmatically}</div>
                <CodeBlock
                  code={`import { useDesignSystem } from '@/components/providers/design-system-provider'

function MyComponent() {
  const { designTheme, setDesignTheme } = useDesignSystem()

  return (
    <button onClick={() => setDesignTheme('cozy')}>
      Use Cozy Theme
    </button>
  )
}`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
