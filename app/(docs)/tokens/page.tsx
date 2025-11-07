import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Design Tokens | RTL Design System',
  description: 'Complete design token reference for colors, typography, spacing, and shadows. Consistent styling across your RTL applications.',
  keywords: ['design tokens', 'colors', 'typography', 'spacing', 'theme', 'css variables', 'rtl', 'tailwind', 'nextjs'],
}

'use client'

import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CodeBlock } from '@/components/docs/code-block'
import { tokens } from '@/lib/tokens'
import { copyToClipboard } from '@/lib/utils'

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
  return (
    <div className="min-h-screen">

      <main id="main-content" className="container py-12">
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Design Tokens</h1>
          <p className="text-xl text-muted-foreground">
            The foundation of our design system. All visual decisions are defined through
            tokens, enabling consistent theming and easy customization.
          </p>
        </div>

        {/* Colors */}
        <section className="mb-16" id="colors">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Colors</h2>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Primary */}
            <Card>
              <CardHeader>
                <CardTitle>Primary</CardTitle>
                <CardDescription>Brand color - Indigo shades</CardDescription>
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
                <CardTitle>Secondary</CardTitle>
                <CardDescription>Accent color - Teal shades</CardDescription>
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
                <CardTitle>Neutral</CardTitle>
                <CardDescription>Gray scale for backgrounds and text</CardDescription>
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
                <CardTitle>Semantic Colors</CardTitle>
                <CardDescription>Status and feedback colors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-sm font-medium mb-2">Success</div>
                  <div className="grid grid-cols-2 gap-1">
                    {Object.entries(tokens.colors.success).slice(3, 7).map(([shade, value]) => (
                      <ColorSwatch key={shade} name={shade} value={value} />
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Error</div>
                  <div className="grid grid-cols-2 gap-1">
                    {Object.entries(tokens.colors.error).slice(3, 7).map(([shade, value]) => (
                      <ColorSwatch key={shade} name={shade} value={value} />
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Warning</div>
                  <div className="grid grid-cols-2 gap-1">
                    {Object.entries(tokens.colors.warning).slice(3, 7).map(([shade, value]) => (
                      <ColorSwatch key={shade} name={shade} value={value} />
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Info</div>
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
          <h2 className="text-3xl font-bold tracking-tight mb-6">Spacing</h2>
          <Card>
            <CardHeader>
              <CardTitle>Spacing Scale</CardTitle>
              <CardDescription>
                Consistent spacing values for margins, padding, and gaps
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
          <h2 className="text-3xl font-bold tracking-tight mb-6">Typography</h2>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Font Families */}
            <Card>
              <CardHeader>
                <CardTitle>Font Families</CardTitle>
                <CardDescription>Typefaces used across the system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium mb-2">Sans (Default)</div>
                  <div className="text-lg" style={{ fontFamily: tokens.typography.fontFamily.sans.join(', ') }}>
                    The quick brown fox jumps over the lazy dog
                  </div>
                  <div className="text-xs text-muted-foreground font-mono mt-1">
                    {tokens.typography.fontFamily.sans.join(', ')}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Arabic</div>
                  <div className="text-lg" style={{ fontFamily: tokens.typography.fontFamily.arabic.join(', ') }} dir="rtl">
                    الحمد لله رب العالمين
                  </div>
                  <div className="text-xs text-muted-foreground font-mono mt-1">
                    {tokens.typography.fontFamily.arabic.join(', ')}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Mono</div>
                  <div className="text-lg" style={{ fontFamily: tokens.typography.fontFamily.mono.join(', ') }}>
                    const hello = &quot;world&quot;;
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
                <CardTitle>Font Sizes</CardTitle>
                <CardDescription>Type scale with line heights</CardDescription>
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
          <h2 className="text-3xl font-bold tracking-tight mb-6">Shadows</h2>
          <Card>
            <CardHeader>
              <CardTitle>Shadow Scale</CardTitle>
              <CardDescription>Elevation levels for depth perception</CardDescription>
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
                      <span className="text-xs text-muted-foreground">Elevation</span>
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
          <h2 className="text-3xl font-bold tracking-tight mb-6">Border Radius</h2>
          <Card>
            <CardHeader>
              <CardTitle>Radius Scale</CardTitle>
              <CardDescription>Corner rounding for components</CardDescription>
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
          <h2 className="text-3xl font-bold tracking-tight mb-6">Usage in Code</h2>
          <Card>
            <CardHeader>
              <CardTitle>Tailwind CSS Integration</CardTitle>
              <CardDescription>
                All tokens are available as Tailwind utilities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium mb-2">Colors</div>
                <CodeBlock
                  code={`<div className="bg-primary-500 text-primary-50">
  Primary color with shades
</div>

<div className="text-success-600">
  Success text
</div>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Spacing</div>
                <CodeBlock
                  code={`<div className="p-lg m-xl gap-md">
  Semantic spacing names
</div>

<div className="space-y-md">
  Vertical spacing
</div>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Typography</div>
                <CodeBlock
                  code={`<h1 className="text-4xl font-bold">
  Heading with scale
</h1>

<div className="font-arabic" dir="rtl">
  Arabic text
</div>`}
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
