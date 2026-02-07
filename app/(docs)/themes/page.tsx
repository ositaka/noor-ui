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
import { Check, Sparkles, ChevronDown, Lightbulb } from 'lucide-react'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { type BuiltInTheme, themeConfig } from '@/lib/tokens'
import { cn } from '@/lib/utils'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'
import { useTheme } from 'next-themes'

const ThemeCardInner = ({ theme }: { theme: BuiltInTheme }) => {
  const { designTheme, setDesignTheme } = useDesignSystem()
  const { locale } = useDirection()
  const { theme: colorMode } = useTheme()
  const t = content[locale]
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
          <div className="text-sm font-medium mb-2">{t.themesPage.features}</div>
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
          <div className="text-sm font-medium">{t.themesPage.themePreview.preview}</div>
          {/* Isolated preview container with theme-specific styles */}
          <div className={cn(
            'p-3 rounded-[var(--radius)] border bg-card',
            `theme-${theme}`,
            colorMode === 'dark' && 'dark'
          )}>
            <div className="space-y-2 rounded-[var(--radius)] bg-muted/30 p-2">
              <div className="flex gap-2">
                <Button size="sm" variant="primary">{t.themesPage.themePreview.primary}</Button>
                <Button size="sm" variant="secondary">{t.themesPage.themePreview.secondary}</Button>
                <Button size="sm" variant="outline">{t.themesPage.themePreview.outline}</Button>
              </div>
              <div className="flex gap-2">
                <Badge>{t.themesPage.themePreview.new}</Badge>
                <Badge variant="secondary">{t.themesPage.themePreview.beta}</Badge>
                <Badge variant="outline">{t.themesPage.themePreview.soon}</Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const ThemeCard = ({ theme }: { theme: BuiltInTheme }) => {
  const [mounted, setMounted] = React.useState(false)
  const { locale } = useDirection()
  const t = content[locale]

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
            <div className="text-sm font-medium mb-2">{t.themesPage.features}</div>
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
  const themes: BuiltInTheme[] = ['minimal', 'futuristic', 'cozy', 'artistic']

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

        {/* Using Themes in Your App */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.themesPage.usingThemes.title}</h2>
          <Card>
            <CardHeader>
              <CardTitle>{t.themesPage.usingThemes.setupTitle}</CardTitle>
              <CardDescription>
                {t.themesPage.usingThemes.setupDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">{t.themesPage.usingThemes.step1Label}</Label>
                <CodeBlock
                  language="tsx"
                  code={`import 'noorui-rtl/dist/styles.css'
import { ThemeProvider } from 'next-themes'
import { DirectionProvider, DesignSystemProvider } from 'noorui-rtl'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider attribute="class" enableSystem={true}>
          <DirectionProvider>
            <DesignSystemProvider defaultTheme="cozy">
              {children}
            </DesignSystemProvider>
          </DirectionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

// Available themes: "minimal" | "futuristic" | "cozy" | "artistic"
// Defaults to "minimal" if not specified`}
                />
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">{t.themesPage.usingThemes.step2Label}</Label>
                <CodeBlock
                  language="tsx"
                  code={`import { useDesignSystem } from 'noorui-rtl'
import { useTheme } from 'next-themes'
import { useDirection } from 'noorui-rtl'

function ThemeControls() {
  const { designTheme, setDesignTheme } = useDesignSystem()
  const { theme, setTheme } = useTheme()
  const { direction, setDirection } = useDirection()

  return (
    <div>
      {/* Design theme (minimal/futuristic/cozy/artistic) */}
      <select value={designTheme} onChange={(e) => setDesignTheme(e.target.value)}>
        <option value="minimal">Minimal</option>
        <option value="futuristic">Futuristic</option>
        <option value="cozy">Cozy</option>
        <option value="artistic">Artistic</option>
      </select>

      {/* Light/Dark mode */}
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        {theme === 'dark' ? 'Light' : 'Dark'} Mode
      </button>

      {/* RTL/LTR direction */}
      <button onClick={() => setDirection(direction === 'rtl' ? 'ltr' : 'rtl')}>
        {direction === 'rtl' ? 'LTR' : 'RTL'}
      </button>
    </div>
  )
}`}
                />
              </div>

              <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-500/50">
                <Check className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                <p className="text-sm">
                  {t.themesPage.usingThemes.successCallout}
                </p>
              </div>
            </CardContent>
          </Card>
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
                  {t.themesPage.preview.sampleParagraph1}
                </p>
                <p className="text-muted-foreground">
                  {t.themesPage.preview.sampleParagraph2}
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
                  <Button variant="destructive">{t.themesPage.preview.destructive}</Button>
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
        <section className="mb-16">
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

        {/* Custom Themes */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t.themesPage.customThemes.title}</h2>
          <p className="text-muted-foreground mb-6">{t.themesPage.customThemes.description}</p>

          <div className="space-y-6">
            {/* Step 1 */}
            <Card>
              <CardHeader>
                <CardTitle>{t.themesPage.customThemes.step1Title}</CardTitle>
                <CardDescription>{t.themesPage.customThemes.step1Description}</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="css"
                  code={`/* Light mode */
.theme-ocean {
  --color-background: hsl(200 20% 98%);
  --color-foreground: hsl(210 40% 10%);
  --color-primary: hsl(200 80% 50%);
  --color-primary-foreground: hsl(0 0% 100%);
  --color-secondary: hsl(180 60% 45%);
  --color-secondary-foreground: hsl(180 100% 10%);
  --color-muted: hsl(200 20% 94%);
  --color-muted-foreground: hsl(200 10% 40%);
  --color-accent: hsl(200 20% 94%);
  --color-accent-foreground: hsl(210 40% 10%);
  --color-card: hsl(0 0% 100%);
  --color-card-foreground: hsl(210 40% 10%);
  --color-popover: hsl(0 0% 100%);
  --color-popover-foreground: hsl(210 40% 10%);
  --color-border: hsl(200 20% 88%);
  --color-input: hsl(200 20% 88%);
  --color-ring: hsl(200 80% 50%);
  --color-destructive: hsl(0 84% 60%);
  --color-destructive-foreground: hsl(0 0% 100%);
  --radius: 0.75rem;
}

/* Dark mode */
.dark .theme-ocean,
.theme-ocean.dark {
  --color-background: hsl(210 40% 8%);
  --color-foreground: hsl(200 20% 95%);
  --color-primary: hsl(200 80% 60%);
  --color-primary-foreground: hsl(210 40% 8%);
  --color-card: hsl(210 35% 12%);
  --color-card-foreground: hsl(200 20% 95%);
  --color-border: hsl(210 30% 20%);
  --color-input: hsl(210 30% 20%);
}`}
                  showLineNumbers={false}
                />
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card>
              <CardHeader>
                <CardTitle>{t.themesPage.customThemes.step2Title}</CardTitle>
                <CardDescription>{t.themesPage.customThemes.step2Description}</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="tsx"
                  code={`import { DesignSystemProvider } from 'noorui-rtl'

<DesignSystemProvider defaultTheme="ocean">
  {children}
</DesignSystemProvider>`}
                  showLineNumbers={false}
                />
              </CardContent>
            </Card>

            {/* CSS Variables Reference */}
            <Collapsible>
              <Card>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{t.themesPage.customThemes.variablesTitle}</CardTitle>
                        <CardDescription>{t.themesPage.customThemes.variablesDescription}</CardDescription>
                      </div>
                      <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform" />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold mb-2">{t.themesPage.customThemes.required}</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-start py-2 pe-4 font-medium">{t.themesPage.customThemes.variableHeader}</th>
                                <th className="text-start py-2 font-medium">{t.themesPage.customThemes.descriptionHeader}</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y">
                              <tr><td className="py-2 pe-4 font-mono text-xs"><code>--color-background</code> / <code>--color-foreground</code></td><td className="py-2 text-muted-foreground">{t.themesPage.customThemes.descBackground}</td></tr>
                              <tr><td className="py-2 pe-4 font-mono text-xs"><code>--color-primary</code> / <code>--color-primary-foreground</code></td><td className="py-2 text-muted-foreground">{t.themesPage.customThemes.descPrimary}</td></tr>
                              <tr><td className="py-2 pe-4 font-mono text-xs"><code>--color-secondary</code> / <code>--color-secondary-foreground</code></td><td className="py-2 text-muted-foreground">{t.themesPage.customThemes.descSecondary}</td></tr>
                              <tr><td className="py-2 pe-4 font-mono text-xs"><code>--color-muted</code> / <code>--color-muted-foreground</code></td><td className="py-2 text-muted-foreground">{t.themesPage.customThemes.descMuted}</td></tr>
                              <tr><td className="py-2 pe-4 font-mono text-xs"><code>--color-accent</code> / <code>--color-accent-foreground</code></td><td className="py-2 text-muted-foreground">{t.themesPage.customThemes.descAccent}</td></tr>
                              <tr><td className="py-2 pe-4 font-mono text-xs"><code>--color-card</code> / <code>--color-card-foreground</code></td><td className="py-2 text-muted-foreground">{t.themesPage.customThemes.descCard}</td></tr>
                              <tr><td className="py-2 pe-4 font-mono text-xs"><code>--color-popover</code> / <code>--color-popover-foreground</code></td><td className="py-2 text-muted-foreground">{t.themesPage.customThemes.descPopover}</td></tr>
                              <tr><td className="py-2 pe-4 font-mono text-xs"><code>--color-border</code> / <code>--color-input</code> / <code>--color-ring</code></td><td className="py-2 text-muted-foreground">{t.themesPage.customThemes.descBorder}</td></tr>
                              <tr><td className="py-2 pe-4 font-mono text-xs"><code>--color-destructive</code> / <code>--color-destructive-foreground</code></td><td className="py-2 text-muted-foreground">{t.themesPage.customThemes.descDestructive}</td></tr>
                              <tr><td className="py-2 pe-4 font-mono text-xs"><code>--radius</code></td><td className="py-2 text-muted-foreground">{t.themesPage.customThemes.descRadius}</td></tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="text-sm font-semibold mb-2">{t.themesPage.customThemes.optional}</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-start py-2 pe-4 font-medium">{t.themesPage.customThemes.variableHeader}</th>
                                <th className="text-start py-2 font-medium">{t.themesPage.customThemes.descriptionHeader}</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y">
                              <tr><td className="py-2 pe-4 font-mono text-xs"><code>--color-success</code> / <code>--color-success-foreground</code></td><td className="py-2 text-muted-foreground">{t.themesPage.customThemes.descSuccess}</td></tr>
                              <tr><td className="py-2 pe-4 font-mono text-xs"><code>--color-warning</code> / <code>--color-warning-foreground</code></td><td className="py-2 text-muted-foreground">{t.themesPage.customThemes.descWarning}</td></tr>
                              <tr><td className="py-2 pe-4 font-mono text-xs"><code>--color-info</code> / <code>--color-info-foreground</code></td><td className="py-2 text-muted-foreground">{t.themesPage.customThemes.descInfo}</td></tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Tip */}
            <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/10">
              <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                {t.themesPage.customThemes.tip}{' '}
                <Link href="/tokens" className="text-primary hover:underline">
                  {t.tokens.header.title} →
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
