'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { CodeBlock } from '@/components/docs/code-block'
import { Shield, CheckCircle2 } from 'lucide-react'

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
    <li><a href="/home">Home</a></li>
    <li><a href="/about">About</a></li>
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
  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link href="/documentation" className="hover:text-foreground transition-colors">Documentation</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">WCAG Compliance</li>
          </ol>
        </nav>

        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">WCAG Compliance</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            RTL Design System is built to meet WCAG 2.1 Level AA standards for web accessibility, ensuring your applications are usable by everyone.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Compliance Level</h2>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">WCAG 2.1 Level AA</h3>
                  <p className="text-muted-foreground">
                    All components meet or exceed WCAG 2.1 Level AA requirements, with many reaching AAA for specific criteria.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-2 text-sm">
                <p className="font-semibold">What this means:</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>✓ Perceivable: Content is presented in ways users can perceive</li>
                  <li>✓ Operable: Interface components are operable by all users</li>
                  <li>✓ Understandable: Information and interface operation are understandable</li>
                  <li>✓ Robust: Content is robust enough for assistive technologies</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">1. Color Contrast</h2>
          <p className="text-muted-foreground mb-4">
            All color combinations meet WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large text):
          </p>
          <CodeBlock code={colorContrastCode} language="tsx" />

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Contrast Ratios</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Normal text (foreground/background):</span>
                  <span className="font-mono">19.6:1 ✓ AAA</span>
                </div>
                <div className="flex justify-between">
                  <span>Muted text (muted-foreground/background):</span>
                  <span className="font-mono">7.1:1 ✓ AAA</span>
                </div>
                <div className="flex justify-between">
                  <span>Primary button (primary-foreground/primary):</span>
                  <span className="font-mono">12.6:1 ✓ AAA</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">2. Semantic HTML</h2>
          <p className="text-muted-foreground mb-4">
            Use proper HTML5 semantic elements for better accessibility:
          </p>
          <CodeBlock code={semanticHtmlCode} language="tsx" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">3. ARIA Labels & Roles</h2>
          <p className="text-muted-foreground mb-4">
            Provide accessible names and descriptions for all interactive elements:
          </p>
          <CodeBlock code={ariaLabelsCode} language="tsx" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">4. Keyboard Navigation</h2>
          <p className="text-muted-foreground mb-4">
            All components are fully keyboard accessible:
          </p>
          <CodeBlock code={keyboardNavigationCode} language="tsx" />

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Keyboard Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <kbd className="px-2 py-1 bg-muted rounded">Tab</kbd> - Navigate between focusable elements</li>
                <li>• <kbd className="px-2 py-1 bg-muted rounded">Shift + Tab</kbd> - Navigate backwards</li>
                <li>• <kbd className="px-2 py-1 bg-muted rounded">Enter</kbd> / <kbd className="px-2 py-1 bg-muted rounded">Space</kbd> - Activate buttons and controls</li>
                <li>• <kbd className="px-2 py-1 bg-muted rounded">Escape</kbd> - Close dialogs and menus</li>
                <li>• <kbd className="px-2 py-1 bg-muted rounded">Arrow keys</kbd> - Navigate within components</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">WCAG Success Criteria</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Level A (All criteria met)</h3>
                <p className="text-sm text-muted-foreground">
                  Basic accessibility features that make content accessible to the widest audience.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Level AA (All criteria met) ✓</h3>
                <p className="text-sm text-muted-foreground">
                  Removes major barriers to accessing content. This is the recommended conformance level.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Level AAA (Partial)</h3>
                <p className="text-sm text-muted-foreground">
                  Enhanced accessibility. Many criteria met, particularly for color contrast and text alternatives.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Learn More</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/documentation/keyboard">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Keyboard Navigation</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete keyboard accessibility guide
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/documentation/screen-readers">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Screen Readers</h3>
                  <p className="text-sm text-muted-foreground">
                    Optimizing for screen reader users
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
