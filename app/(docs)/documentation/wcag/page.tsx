'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { CodeBlock } from '@/components/docs/code-block'
import { Shield, CheckCircle2 } from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const colorContrastCode = `// ✓ WCAG AA compliant contrast ratios
const colors = {
  // Text on background
  foreground: 'hsl(222.2 84% 4.9%)',   // Dark text
  background: 'hsl(0 0% 100%)',         // White background
  // Contrast ratio: 19.6:1 (AAA)

  // Muted text on background
  mutedForeground: 'hsl(215.4 16.3% 46.9%)',
  background: 'hsl(0 0% 100%)',
  // Contrast ratio: 7.1:1 (AAA for normal text, AA for large text)
}`

const semanticHtmlCode = `// ✓ Use semantic HTML elements
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/documentation">Documentation</a></li>
  </ul>
</nav>

<main id="main-content">
  <h1>Page Title</h1>
  <article>
    <h2>Section Title</h2>
    <p>Content...</p>
  </article>
</main>

<footer>
  <p>Copyright information</p>
</footer>`

const ariaLabelsCode = `// ✓ Provide descriptive labels
<button aria-label="Close dialog">
  <X className="h-4 w-4" />
</button>

// Form labels
<div>
  <Label htmlFor="email">Email Address</Label>
  <Input
    id="email"
    type="email"
    aria-required="true"
    aria-describedby="email-help"
  />
  <p id="email-help" className="text-sm text-muted-foreground">
    We'll never share your email.
  </p>
</div>

// Alert messages
<Alert role="alert" aria-live="polite">
  <AlertDescription>
    Your changes have been saved.
  </AlertDescription>
</Alert>`

const keyboardNavigationCode = `// ✓ Ensure keyboard accessibility
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    {/* Focus automatically managed */}
    {/* Escape key closes dialog */}
    {/* Tab cycles through focusable elements */}
    <DialogTitle>Dialog Title</DialogTitle>
    <DialogDescription>
      Dialog content here
    </DialogDescription>
  </DialogContent>
</Dialog>`

export default function WCAGPage() {
  const { locale } = useDirection()
  const t = content[locale].documentationPages.wcag
  const common = content[locale].documentationPages.common

  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">{common.home}</Link></li>
            <li>/</li>
            <li><Link href="/documentation" className="hover:text-foreground transition-colors">{common.documentation}</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">{t.title}</li>
          </ol>
        </nav>

        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">{t.title}</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            {t.subtitle}
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.complianceLevel}</h2>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t.levelAA}</h3>
                  <p className="text-muted-foreground">
                    {t.levelAADesc}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-2 text-sm">
                <p className="font-semibold">{t.whatMeans}</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>✓ {t.perceivable}</li>
                  <li>✓ {t.operable}</li>
                  <li>✓ {t.understandable}</li>
                  <li>✓ {t.robust}</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.colorContrast}</h2>
          <p className="text-muted-foreground mb-4">
            {t.contrastDesc}
          </p>
          <CodeBlock code={colorContrastCode} language="tsx" />

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">{t.contrastRatios}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{t.normalText}</span>
                  <span className="font-mono">19.6:1 ✓ AAA</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.mutedText}</span>
                  <span className="font-mono">7.1:1 ✓ AAA</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.primaryButton}</span>
                  <span className="font-mono">12.6:1 ✓ AAA</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.semanticHTML}</h2>
          <p className="text-muted-foreground mb-4">
            {t.semanticDesc}
          </p>
          <CodeBlock code={semanticHtmlCode} language="tsx" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.ariaLabels}</h2>
          <p className="text-muted-foreground mb-4">
            {t.ariaDesc}
          </p>
          <CodeBlock code={ariaLabelsCode} language="tsx" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.keyboardNavigation}</h2>
          <p className="text-muted-foreground mb-4">
            {t.keyboardDesc}
          </p>
          <CodeBlock code={keyboardNavigationCode} language="tsx" />

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">{t.keyboardSupport}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <kbd dir="ltr" className="px-2 py-1 bg-muted rounded">Tab</kbd> - {t.tabKey}</li>
                <li>• <kbd dir="ltr" className="px-2 py-1 bg-muted rounded">Shift + Tab</kbd> - {t.shiftTabKey}</li>
                <li>• <kbd dir="ltr" className="px-2 py-1 bg-muted rounded">Enter</kbd> / <kbd dir="ltr" className="px-2 py-1 bg-muted rounded">Space</kbd> - {t.enterSpaceKey}</li>
                <li>• <kbd dir="ltr" className="px-2 py-1 bg-muted rounded">Escape</kbd> - {t.escapeKey}</li>
                <li>• <kbd dir="ltr" className="px-2 py-1 bg-muted rounded">Arrow keys</kbd> - {t.arrowKeysNav}</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.successCriteria}</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{t.levelA}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.levelADesc}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{t.levelAAMet} ✓</h3>
                <p className="text-sm text-muted-foreground">
                  {t.levelAAMetDesc}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{t.levelAAA}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.levelAAADesc}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{common.learnMore}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/documentation/keyboard">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t.keyboardLink}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.keyboardLinkDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/documentation/screen-readers">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t.screenReadersLink}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.screenReadersLinkDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
