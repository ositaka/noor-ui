'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { CodeBlock } from '@/components/docs/code-block'
import { Volume2, AlertCircle } from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

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
  const { locale } = useDirection()
  const t = content[locale].documentationPages.screenReaders
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
            <Volume2 className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">{t.title}</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            {t.subtitle}
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.testedScreenReaders}</h2>
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <div>
                    <strong>{t.nvda}</strong>
                    <p className="text-sm text-muted-foreground">{t.nvdaDesc}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <div>
                    <strong>{t.jaws}</strong>
                    <p className="text-sm text-muted-foreground">{t.jawsDesc}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <div>
                    <strong>{t.voiceover}</strong>
                    <p className="text-sm text-muted-foreground">{t.voiceoverDesc}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <div>
                    <strong>{t.talkback}</strong>
                    <p className="text-sm text-muted-foreground">{t.talkbackDesc}</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.descriptiveLabels}</h2>
          <p className="text-muted-foreground mb-4">
            {t.labelsDesc}
          </p>
          <CodeBlock code={ariaLabelsCode} language="tsx" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.semanticLandmarks}</h2>
          <p className="text-muted-foreground mb-4">
            {t.landmarksDesc}
          </p>
          <CodeBlock code={landmarksCode} language="tsx" />

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">{t.landmarkBenefits}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• {t.quickJump}</li>
                <li>• {t.announceRegions}</li>
                <li>• {t.improveNav}</li>
                <li>• {t.structureContext}</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.liveRegions}</h2>
          <p className="text-muted-foreground mb-4">
            {t.liveRegionsDesc}
          </p>
          <CodeBlock code={liveRegionsCode} language="tsx" />

          <Card className="mt-6 border-blue-500/50 bg-blue-50 dark:bg-blue-950/20">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                {t.politeness}
              </h3>
              <div className="text-sm text-muted-foreground space-y-2">
                <p><strong>{t.assertive}</strong> {t.assertiveDesc}</p>
                <p><strong>{t.polite}</strong> {t.politeDesc}</p>
                <p><strong>{t.off}</strong> {t.offDesc}</p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.associatedDesc}</h2>
          <p className="text-muted-foreground mb-4">
            {t.associatedDescDesc}
          </p>
          <CodeBlock code={ariaDescribedByCode} language="tsx" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.skipLinks}</h2>
          <p className="text-muted-foreground mb-4">
            {t.skipLinksDesc}
          </p>
          <CodeBlock code={skipLinksCode} language="tsx" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.rtlConsiderations}</h2>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">{t.screenReadersRTL}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• {t.arabicSR}</li>
                <li>• {t.navCommands}</li>
                <li>• {t.langDir}</li>
                <li>• {t.testNativeSpeakers}</li>
                <li>• {t.numbersEnglish}</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.testingTips}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{t.testingChecklist}</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ {t.altText}</li>
                  <li>✓ {t.formLabels}</li>
                  <li>✓ {t.descriptiveLinks}</li>
                  <li>✓ {t.hierarchicalHeadings}</li>
                  <li>✓ {t.properTables}</li>
                  <li>✓ {t.liveRegionsWork}</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{t.quickTest}</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>1. {t.turnOnSR}</li>
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">{common.learnMore}</h2>
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
