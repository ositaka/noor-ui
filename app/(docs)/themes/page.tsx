'use client'

import * as React from 'react'
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

const ThemeCardInner = ({ theme }: { theme: Theme }) => {
  const { designTheme, setDesignTheme } = useDesignSystem()
  const config = themeConfig[theme]
  const isActive = designTheme === theme

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
            <CardTitle className="text-2xl">{config.name}</CardTitle>
            <CardDescription className="mt-2">{config.description}</CardDescription>
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
            {config.features.map((feature, i) => (
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

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card className="cursor-pointer transition-all hover:shadow-lg">
        <CardHeader>
          <div>
            <CardTitle className="text-2xl">{themeConfig[theme].name}</CardTitle>
            <CardDescription className="mt-2">{themeConfig[theme].description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="text-sm font-medium mb-2">Features</div>
            <ul className="space-y-1">
              {themeConfig[theme].features.map((feature, i) => (
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
  const themes: Theme[] = ['minimal', 'futuristic', 'cozy', 'artistic']

  return (
    <div className="min-h-screen">

      <main id="main-content" className="container py-12">
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Themes</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Four distinct visual themes, all powered by the same design tokens.
            Each theme has unique typography, spacing, and personality while maintaining
            accessibility and consistency.
          </p>
          <div className="flex items-center gap-2 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <Sparkles className="h-5 w-5 text-primary flex-shrink-0" />
            <p className="text-sm">
              Try the floating theme switcher in the bottom-right corner to see changes
              instantly across the entire site!
            </p>
          </div>
        </div>

        {/* Theme Cards */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Available Themes</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            {themes.map((theme) => (
              <ThemeCard key={theme} theme={theme} />
            ))}
          </div>
        </section>

        {/* Theme Details */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Theme Specifications</h2>

          <div className="space-y-6">
            {/* Minimal */}
            <Card>
              <CardHeader>
                <CardTitle>Minimal Theme</CardTitle>
                <CardDescription>Clean, professional, and focused</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="text-sm font-medium mb-1">Typography</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Font: Inter (sans-serif)</li>
                      <li>• Line-height: 1.6</li>
                      <li>• Letter-spacing: -0.02em (headings)</li>
                      <li>• Font-weight: 600 (headings)</li>
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">Visual Style</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Border-radius: 0.25rem</li>
                      <li>• Colors: Neutral grays</li>
                      <li>• Spacing: Balanced</li>
                      <li>• Borders: Subtle</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Best For</div>
                  <p className="text-sm text-muted-foreground">
                    Enterprise applications, dashboards, data-heavy interfaces, professional tools
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Futuristic */}
            <Card>
              <CardHeader>
                <CardTitle>Futuristic Theme</CardTitle>
                <CardDescription>Dark, modern, and compact</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="text-sm font-medium mb-1">Typography</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Font: Inter (sans-serif)</li>
                      <li>• Line-height: 1.5 (compact)</li>
                      <li>• Letter-spacing: -0.025em</li>
                      <li>• Font-weight: 600 (strong)</li>
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">Visual Style</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Border-radius: 0.75rem</li>
                      <li>• Colors: Purples, cyans</li>
                      <li>• Spacing: Tighter</li>
                      <li>• Style: Glassmorphism</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Best For</div>
                  <p className="text-sm text-muted-foreground">
                    Tech products, developer tools, gaming interfaces, dark-mode-first applications
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Cozy */}
            <Card>
              <CardHeader>
                <CardTitle>Cozy Theme</CardTitle>
                <CardDescription>Warm, spacious, and comfortable</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="text-sm font-medium mb-1">Typography</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Font: Inter (sans-serif)</li>
                      <li>• Line-height: 1.7 (relaxed)</li>
                      <li>• Letter-spacing: 0.015em</li>
                      <li>• Headings: 1.5rem margin</li>
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">Visual Style</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Border-radius: 1.25rem (very rounded)</li>
                      <li>• Colors: Warm oranges, ambers</li>
                      <li>• Spacing: Very generous</li>
                      <li>• Padding: 2rem cards, 0.75rem buttons</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Best For</div>
                  <p className="text-sm text-muted-foreground">
                    Personal blogs, community platforms, lifestyle apps, content-focused sites
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Artistic */}
            <Card>
              <CardHeader>
                <CardTitle>Artistic Theme</CardTitle>
                <CardDescription>Elegant, typography-focused, serif fonts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="text-sm font-medium mb-1">Typography</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Font: Georgia (serif)</li>
                      <li>• Arabic: Noto Naskh Arabic (serif)</li>
                      <li>• Line-height: 1.8-1.9</li>
                      <li>• Letter-spacing: 0.01-0.02em</li>
                      <li>• Font-weight: 400 (elegant)</li>
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">Visual Style</div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Border-radius: 0.125rem (minimal)</li>
                      <li>• Colors: Violets, golds</li>
                      <li>• Spacing: Generous paragraphs</li>
                      <li>• Style: Editorial</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Best For</div>
                  <p className="text-sm text-muted-foreground">
                    Poetry, literature, magazines, portfolios, creative writing platforms
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Live Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Live Preview</h2>
          <Card>
            <CardHeader>
              <CardTitle>Sample Content</CardTitle>
              <CardDescription>
                See how the current theme affects real content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Heading Example</h3>
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
                  <Label htmlFor="theme-preview">Input Field</Label>
                  <Input id="theme-preview" placeholder="Type something..." />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button>Primary Action</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>

                <div className="flex gap-2">
                  <Badge>Status</Badge>
                  <Badge variant="secondary">Label</Badge>
                  <Badge variant="outline">Tag</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Implementation */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-6">Implementation</h2>
          <Card>
            <CardHeader>
              <CardTitle>Using Themes</CardTitle>
              <CardDescription>
                Themes can be changed via URL, UI, or programmatically
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium mb-2">Via URL Parameter</div>
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
                <div className="text-sm font-medium mb-2">Via Theme Switcher</div>
                <p className="text-sm text-muted-foreground">
                  Use the floating button in the bottom-right corner (palette icon) to switch
                  themes. The URL will update automatically and the theme persists across pages.
                </p>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Programmatically</div>
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
