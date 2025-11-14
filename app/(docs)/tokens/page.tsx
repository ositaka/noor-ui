'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CodeBlock } from '@/components/docs/code-block'
import { tokens } from '@/lib/tokens'
import { copyToClipboard } from '@/lib/utils'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

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

const TypographyExample = ({ size, config }: { size: string; config: readonly [string, { readonly lineHeight: string }] }) => {
  return (
    <div className="space-y-1">
      <div className="flex items-baseline gap-3">
        <span className="text-sm font-medium w-20">{size}</span>
        <span style={{ fontSize: config[0], lineHeight: config[1].lineHeight }}>
          The quick brown fox jumps over the lazy dog
        </span>
      </div>
      <div className="text-xs text-muted-foreground font-mono ps-23">
        {config[0]} / {config[1].lineHeight}
      </div>
    </div>
  )
}

export default function TokensPage() {
  const { locale } = useDirection()
  const t = content[locale].tokens

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
        </div>

        {/* Colors */}
        <section className="mb-16" id="colors">
          <h2 className="text-3xl font-bold tracking-tight mb-6">{t.colors.sectionTitle}</h2>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Primary */}
            <Card>
              <CardHeader>
                <CardTitle>{t.colors.primary.title}</CardTitle>
                <CardDescription>{t.colors.primary.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                {Object.entries(tokens.colors.primary).map(([shade, value]) => (
                  <ColorSwatch key={shade} name={shade} value={value} />
                ))}
              </CardContent>
            </Card>

            {/* Secondary */}
            <Card>
              <CardHeader>
                <CardTitle>{t.colors.secondary.title}</CardTitle>
                <CardDescription>{t.colors.secondary.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                {Object.entries(tokens.colors.secondary).map(([shade, value]) => (
                  <ColorSwatch key={shade} name={shade} value={value} />
                ))}
              </CardContent>
            </Card>

            {/* Neutral */}
            <Card>
              <CardHeader>
                <CardTitle>{t.colors.neutral.title}</CardTitle>
                <CardDescription>{t.colors.neutral.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                {Object.entries(tokens.colors.neutral).map(([shade, value]) => (
                  <ColorSwatch key={shade} name={shade} value={value} />
                ))}
              </CardContent>
            </Card>

            {/* Semantic Colors */}
            <Card>
              <CardHeader>
                <CardTitle>{t.colors.semantic.title}</CardTitle>
                <CardDescription>{t.colors.semantic.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-sm font-medium mb-2">{t.colors.semantic.success}</div>
                  <div className="grid grid-cols-2 gap-1">
                    {Object.entries(tokens.colors.success).slice(3, 7).map(([shade, value]) => (
                      <ColorSwatch key={shade} name={shade} value={value} />
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">{t.colors.semantic.error}</div>
                  <div className="grid grid-cols-2 gap-1">
                    {Object.entries(tokens.colors.error).slice(3, 7).map(([shade, value]) => (
                      <ColorSwatch key={shade} name={shade} value={value} />
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">{t.colors.semantic.warning}</div>
                  <div className="grid grid-cols-2 gap-1">
                    {Object.entries(tokens.colors.warning).slice(3, 7).map(([shade, value]) => (
                      <ColorSwatch key={shade} name={shade} value={value} />
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">{t.colors.semantic.info}</div>
                  <div className="grid grid-cols-2 gap-1">
                    {Object.entries(tokens.colors.info).slice(3, 7).map(([shade, value]) => (
                      <ColorSwatch key={shade} name={shade} value={value} />
                    ))}
                  </div>
                </div>
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

          <div className="grid gap-6 lg:grid-cols-2">
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
                  <TypographyExample key={size} size={size} config={config} />
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
