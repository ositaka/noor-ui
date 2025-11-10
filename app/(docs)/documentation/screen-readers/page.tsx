'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { CodeBlock } from '@/components/docs/code-block'
import { Volume2, AlertCircle } from 'lucide-react'

const ariaLabelsCode = `// Descriptive labels for icon buttons
<button aria-label="Close dialog">
  <X className="h-4 w-4" />
</button>

<button aria-label="Delete item">
  <Trash className="h-4 w-4" />
</button>

// Buttons with visible text don't need aria-label
<button>
  <Plus className="h-4 w-4 me-2" />
  Add Item
</button>`

const landmarksCode = `// Use semantic landmarks
<header>
  <nav aria-label="Main navigation">...</nav>
</header>

<main id="main-content">
  <h1>Page Title</h1>
  <article aria-labelledby="article-title">
    <h2 id="article-title">Article Title</h2>
    ...
  </article>
</main>

<aside aria-label="Related content">
  ...
</aside>

<footer>
  ...
</footer>`

const liveRegionsCode = `// Announce dynamic content changes
<Alert role="alert" aria-live="assertive">
  <AlertCircle className="h-4 w-4" />
  <AlertDescription>
    Critical error: Please save your work
  </AlertDescription>
</Alert>

<div role="status" aria-live="polite" aria-atomic="true">
  {loading ? 'Loading...' : 'Content loaded'}
</div>

// Toast notifications
<Toast>
  <ToastDescription>
    File uploaded successfully
  </ToastDescription>
</Toast>`

const ariaDescribedByCode = `// Link labels with descriptions
<div>
  <Label htmlFor="password">Password</Label>
  <Input
    id="password"
    type="password"
    aria-describedby="password-requirements"
  />
  <p id="password-requirements" className="text-sm text-muted-foreground">
    Must be at least 8 characters with 1 number
  </p>
</div>

// Error messages
<div>
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    aria-invalid={hasError}
    aria-describedby="email-error"
  />
  {hasError && (
    <p id="email-error" className="text-sm text-destructive">
      Please enter a valid email address
    </p>
  )}
</div>`

const skipLinksCode = `// Skip to main content link
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:border"
>
  Skip to main content
</a>

<main id="main-content">
  {/* Main content */}
</main>`

export default function ScreenReadersPage() {
  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link href="/documentation" className="hover:text-foreground transition-colors">Documentation</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">Screen Readers</li>
          </ol>
        </nav>

        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Volume2 className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">Screen Reader Support</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Optimizing Noor UI components for screen reader users. Learn how to make your applications fully accessible to users who rely on assistive technologies.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Tested Screen Readers</h2>
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <div>
                    <strong>NVDA (Windows)</strong>
                    <p className="text-sm text-muted-foreground">Free, open-source screen reader</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <div>
                    <strong>JAWS (Windows)</strong>
                    <p className="text-sm text-muted-foreground">Professional screen reader</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <div>
                    <strong>VoiceOver (macOS, iOS)</strong>
                    <p className="text-sm text-muted-foreground">Built-in Apple screen reader</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <div>
                    <strong>TalkBack (Android)</strong>
                    <p className="text-sm text-muted-foreground">Android accessibility service</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">1. Descriptive Labels</h2>
          <p className="text-muted-foreground mb-4">
            Provide clear, descriptive labels for all interactive elements:
          </p>
          <CodeBlock code={ariaLabelsCode} language="tsx" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">2. Semantic Landmarks</h2>
          <p className="text-muted-foreground mb-4">
            Use HTML5 landmarks to help users navigate your page:
          </p>
          <CodeBlock code={landmarksCode} language="tsx" />

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Landmark Benefits</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Users can quickly jump between major sections</li>
                <li>• Screen readers announce landmark regions</li>
                <li>• Improves navigation efficiency</li>
                <li>• Provides document structure context</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">3. Live Regions</h2>
          <p className="text-muted-foreground mb-4">
            Announce dynamic content changes to screen reader users:
          </p>
          <CodeBlock code={liveRegionsCode} language="tsx" />

          <Card className="mt-6 border-blue-500/50 bg-blue-50 dark:bg-blue-950/20">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Live Region Politeness
              </h3>
              <div className="text-sm text-muted-foreground space-y-2">
                <p><strong>assertive:</strong> Interrupts current announcement (use for errors)</p>
                <p><strong>polite:</strong> Waits for current announcement to finish (use for status updates)</p>
                <p><strong>off:</strong> Not announced (default)</p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">4. Associated Descriptions</h2>
          <p className="text-muted-foreground mb-4">
            Link form fields with their descriptions and error messages:
          </p>
          <CodeBlock code={ariaDescribedByCode} language="tsx" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">5. Skip Links</h2>
          <p className="text-muted-foreground mb-4">
            Allow keyboard and screen reader users to skip repetitive content:
          </p>
          <CodeBlock code={skipLinksCode} language="tsx" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">RTL Considerations</h2>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Screen Readers in RTL</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Arabic screen readers (e.g., NVDA with Arabic voice) read RTL text naturally</li>
                <li>• Navigation commands work the same way in RTL layouts</li>
                <li>• Ensure proper <code className="px-1.5 py-0.5 rounded bg-muted text-foreground">lang</code> and <code className="px-1.5 py-0.5 rounded bg-muted text-foreground">dir</code> attributes</li>
                <li>• Test with native RTL language users when possible</li>
                <li>• Numbers and English text are announced correctly in Arabic context</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Testing Tips</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Testing Checklist</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ All images have alt text</li>
                  <li>✓ Form fields have labels</li>
                  <li>✓ Links are descriptive</li>
                  <li>✓ Headings are hierarchical</li>
                  <li>✓ Tables have proper markup</li>
                  <li>✓ Live regions work correctly</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Quick Test</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>1. Turn on your screen reader</li>
                  <li>2. Navigate using only keyboard</li>
                  <li>3. Close your eyes and listen</li>
                  <li>4. Can you complete all tasks?</li>
                  <li>5. Is the content understandable?</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Learn More</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/documentation/wcag">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">WCAG Compliance</h3>
                  <p className="text-sm text-muted-foreground">
                    Accessibility standards and guidelines
                  </p>
                </CardContent>
              </Card>
            </Link>

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
          </div>
        </section>
      </main>
    </div>
  )
}
