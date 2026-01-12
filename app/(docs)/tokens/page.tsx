'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Copy, Check, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CodeBlock } from '@/components/docs/code-block'
import { tokens } from '@/lib/tokens'
import { copyToClipboard } from '@/lib/utils'
import { useDirection } from '@/components/providers/direction-provider'
import { useThemeTokens } from '@/hooks/use-theme-tokens'
import { useDesignSystem } from '@/components/providers/design-system-provider'
import { content } from '@/lib/i18n'
import { Alert, AlertDescription } from '@/components/ui/alert'

const ColorSwatch = ({ name, value }: { name: string; value: string }) => {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    await copyToClipboard(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors group">
      <div
        className="w-12 h-12 rounded-lg border shadow-sm flex-shrink-0"
        style={{ backgroundColor: value }}
      />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium">{name}</div>
        <div className="text-xs text-muted-foreground font-mono">{value}</div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={handleCopy}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  )
}

const SpacingBox = ({ name, value }: { name: string; value: string }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground font-mono text-xs">{value}</span>
      </div>
      <div
        className="bg-primary/20 border-2 border-primary"
        style={{ height: value, width: '100%' }}
      />
    </div>
  )
}

const TypographyExample = ({ size, config, sampleText }: { size: string; config: readonly [string, { readonly lineHeight: string }]; sampleText: string }) => {
  return (
    <div className="space-y-1">
      <div className="flex items-baseline gap-3">
        <span className="text-sm font-medium w-20">{size}</span>
        <span className='line-clamp-1' style={{ fontSize: config[0], lineHeight: config[1].lineHeight }}>
          {sampleText}
        </span>
      </div>
      <div className="text-xs text-muted-foreground font-mono ps-23">
        {config[0]} / {config[1].lineHeight}
      </div>
    </div>
  )
}

// Helper function to get CSS variable value in HSL format
function getCSSVarHSL(name: string): string {
  if (typeof window === 'undefined') return '0 0% 0%'
  const style = getComputedStyle(document.documentElement)
  return style.getPropertyValue(name).trim() || '0 0% 0%'
}

// Generate CSS code for current theme
function generateThemeCSS(themeName: string, isDark: boolean): string {
  const className = isDark ? `.theme-${themeName}.dark` : `.theme-${themeName}`

  return `/* ${themeName.charAt(0).toUpperCase() + themeName.slice(1)} theme${isDark ? ' - Dark mode' : ''} */
${className} {
  --background: ${getCSSVarHSL('--background')};
  --foreground: ${getCSSVarHSL('--foreground')};
  --card: ${getCSSVarHSL('--card')};
  --card-foreground: ${getCSSVarHSL('--card-foreground')};
  --popover: ${getCSSVarHSL('--popover')};
  --popover-foreground: ${getCSSVarHSL('--popover-foreground')};
  --primary: ${getCSSVarHSL('--primary')};
  --primary-foreground: ${getCSSVarHSL('--primary-foreground')};
  --secondary: ${getCSSVarHSL('--secondary')};
  --secondary-foreground: ${getCSSVarHSL('--secondary-foreground')};
  --muted: ${getCSSVarHSL('--muted')};
  --muted-foreground: ${getCSSVarHSL('--muted-foreground')};
  --accent: ${getCSSVarHSL('--accent')};
  --accent-foreground: ${getCSSVarHSL('--accent-foreground')};
  --destructive: ${getCSSVarHSL('--destructive')};
  --destructive-foreground: ${getCSSVarHSL('--destructive-foreground')};
  --border: ${getCSSVarHSL('--border')};
  --input: ${getCSSVarHSL('--input')};
  --ring: ${getCSSVarHSL('--ring')};
  --radius: ${typeof window !== 'undefined' ? getComputedStyle(document.documentElement).getPropertyValue('--radius').trim() : '0.5rem'};
}`
}

export default function TokensPage() {
  const { locale } = useDirection()
  const t = content[locale].tokens
  const liveTokens = useThemeTokens()
  const { designTheme } = useDesignSystem()
  const [isDarkMode, setIsDarkMode] = React.useState(false)

  React.useEffect(() => {
    // Check if dark mode is active
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'))
    }

    checkDarkMode()

    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  const themeCSS = React.useMemo(() => generateThemeCSS(designTheme, isDarkMode), [designTheme, isDarkMode])

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
            <li className="text-foreground font-medium">{t.breadcrumb.tokens}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.header.title}</h1>
          <p className="text-xl text-muted-foreground">
            {t.header.description}
          </p>
          <Alert className="mt-6">
            <Info className="h-4 w-4" />
            <AlertDescription>
              These values reflect the currently selected theme and update in real-time when you switch themes or toggle dark mode.
            </AlertDescription>
          </Alert>
        </div>

        {/* Colors */}
        <section className="mb-16" id="colors">
          <h2 className="text-3xl font-bold tracking-tight mb-6">{t.colors.sectionTitle}</h2>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Brand Colors */}
            <Card>
              <CardHeader>
                <CardTitle>Brand Colors</CardTitle>
                <CardDescription>Primary and secondary brand colors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                <ColorSwatch name="primary" value={liveTokens.colors.primary} />
                <ColorSwatch name="primary-foreground" value={liveTokens.colors.primaryForeground} />
                <ColorSwatch name="secondary" value={liveTokens.colors.secondary} />
                <ColorSwatch name="secondary-foreground" value={liveTokens.colors.secondaryForeground} />
              </CardContent>
            </Card>

            {/* UI Colors */}
            <Card>
              <CardHeader>
                <CardTitle>UI Colors</CardTitle>
                <CardDescription>Interface background and text colors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                <ColorSwatch name="background" value={liveTokens.colors.background} />
                <ColorSwatch name="foreground" value={liveTokens.colors.foreground} />
                <ColorSwatch name="card" value={liveTokens.colors.card} />
                <ColorSwatch name="card-foreground" value={liveTokens.colors.cardForeground} />
                <ColorSwatch name="popover" value={liveTokens.colors.popover} />
                <ColorSwatch name="popover-foreground" value={liveTokens.colors.popoverForeground} />
              </CardContent>
            </Card>

            {/* Accent Colors */}
            <Card>
              <CardHeader>
                <CardTitle>Accent Colors</CardTitle>
                <CardDescription>Muted and accent colors for subtle UI elements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                <ColorSwatch name="muted" value={liveTokens.colors.muted} />
                <ColorSwatch name="muted-foreground" value={liveTokens.colors.mutedForeground} />
                <ColorSwatch name="accent" value={liveTokens.colors.accent} />
                <ColorSwatch name="accent-foreground" value={liveTokens.colors.accentForeground} />
              </CardContent>
            </Card>

            {/* State Colors */}
            <Card>
              <CardHeader>
                <CardTitle>State & Border Colors</CardTitle>
                <CardDescription>Destructive state, borders, and focus rings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                <ColorSwatch name="destructive" value={liveTokens.colors.destructive} />
                <ColorSwatch name="destructive-foreground" value={liveTokens.colors.destructiveForeground} />
                <ColorSwatch name="border" value={liveTokens.colors.border} />
                <ColorSwatch name="input" value={liveTokens.colors.input} />
                <ColorSwatch name="ring" value={liveTokens.colors.ring} />
              </CardContent>
            </Card>
          </div>

          {/* CSS Setup */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>CSS Setup</CardTitle>
                <CardDescription>
                  Copy and paste this CSS into your <code className="text-xs">globals.css</code> file to use this theme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code={themeCSS}
                  language="css"
                  showLineNumbers={false}
                />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Spacing */}
        <section className="mb-16" id="spacings">
          <h2 className="text-3xl font-bold tracking-tight mb-6">{t.spacing.sectionTitle}</h2>
          <Card>
            <CardHeader>
              <CardTitle>{t.spacing.title}</CardTitle>
              <CardDescription>
                {t.spacing.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(tokens.spacing).map(([name, value]) => (
                <SpacingBox key={name} name={name} value={value} />
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Typography */}
        <section className="mb-16" id="typography">
          <h2 className="text-3xl font-bold tracking-tight mb-6">{t.typography.sectionTitle}</h2>

          <div className="grid gap-6">
            {/* Font Families */}
            <Card>
              <CardHeader>
                <CardTitle>{t.typography.fontFamilies.title}</CardTitle>
                <CardDescription>{t.typography.fontFamilies.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium mb-2">{t.typography.fontFamilies.sansLabel}</div>
                  <div className="text-lg" style={{ fontFamily: tokens.typography.fontFamily.sans.join(', ') }}>
                    {t.typography.fontFamilies.sampleText}
                  </div>
                  <div className="text-xs text-muted-foreground font-mono mt-1">
                    {tokens.typography.fontFamily.sans.join(', ')}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">{t.typography.fontFamilies.arabicLabel}</div>
                  <div className="text-lg" style={{ fontFamily: tokens.typography.fontFamily.arabic.join(', ') }} dir="rtl">
                    {t.typography.fontFamilies.arabicSampleText}
                  </div>
                  <div className="text-xs text-muted-foreground font-mono mt-1">
                    {tokens.typography.fontFamily.arabic.join(', ')}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">{t.typography.fontFamilies.monoLabel}</div>
                  <div className="text-lg" style={{ fontFamily: tokens.typography.fontFamily.mono.join(', ') }}>
                    {t.typography.fontFamilies.monoSampleText}
                  </div>
                  <div className="text-xs text-muted-foreground font-mono mt-1">
                    {tokens.typography.fontFamily.mono.join(', ')}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Font Sizes */}
            <Card>
              <CardHeader>
                <CardTitle>{t.typography.fontSizes.title}</CardTitle>
                <CardDescription>{t.typography.fontSizes.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(tokens.typography.fontSize).map(([size, config]) => (
                  <TypographyExample key={size} size={size} config={config} sampleText={t.typography.fontSizes.exampleText} />
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Shadows */}
        <section className="mb-16" id="shadows">
          <h2 className="text-3xl font-bold tracking-tight mb-6">{t.shadows.sectionTitle}</h2>
          <Card>
            <CardHeader>
              <CardTitle>{t.shadows.title}</CardTitle>
              <CardDescription>{t.shadows.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Object.entries(tokens.shadows).filter(([name]) => name !== 'inner' && name !== 'none').map(([name, value]) => (
                  <div key={name} className="space-y-2">
                    <div className="text-sm font-medium">{name}</div>
                    <div
                      className="h-24 bg-card rounded-lg flex items-center justify-center"
                      style={{ boxShadow: value }}
                    >
                      <span className="text-xs text-muted-foreground">{t.shadows.elevationLabel}</span>
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">{value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Border Radius */}
        <section className="mb-16" id="border-radius">
          <h2 className="text-3xl font-bold tracking-tight mb-6">{t.radius.sectionTitle}</h2>

          {/* Current Theme Radius */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Current Theme Radius</CardTitle>
              <CardDescription>
                The border radius for the currently selected theme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm font-medium">--radius</div>
                <div
                  className="h-32 w-full bg-primary/20 border-2 border-primary"
                  style={{ borderRadius: liveTokens.radius }}
                />
                <div className="text-xs text-muted-foreground font-mono">{liveTokens.radius}</div>
              </div>
            </CardContent>
          </Card>

          {/* Base Radius Scale */}
          <Card>
            <CardHeader>
              <CardTitle>{t.radius.title}</CardTitle>
              <CardDescription>{t.radius.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {Object.entries(tokens.radius).filter(([name]) => name !== 'full').map(([name, value]) => (
                  <div key={name} className="space-y-2">
                    <div className="text-sm font-medium">{name}</div>
                    <div
                      className="h-20 bg-primary/20 border-2 border-primary"
                      style={{ borderRadius: value }}
                    />
                    <div className="text-xs text-muted-foreground font-mono">{value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Usage */}
        <section id="usage-in-code">
          <h2 className="text-3xl font-bold tracking-tight mb-6">{t.usage.sectionTitle}</h2>
          <Card>
            <CardHeader>
              <CardTitle>{t.usage.title}</CardTitle>
              <CardDescription>
                {t.usage.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium mb-2">{t.usage.colorsLabel}</div>
                <CodeBlock
                  code={t.usage.colorsCode}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>

              <div>
                <div className="text-sm font-medium mb-2">{t.usage.spacingLabel}</div>
                <CodeBlock
                  code={t.usage.spacingCode}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>

              <div>
                <div className="text-sm font-medium mb-2">{t.usage.typographyLabel}</div>
                <CodeBlock
                  code={t.usage.typographyCode}
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
