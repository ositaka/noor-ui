'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { CodeBlock } from '@/components/docs/code-block'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { Button } from '@/components/ui/button'
import { Sparkles, ArrowRight, CheckCircle2, XCircle, Info, Lightbulb, Book } from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const logicalPropertiesCode = `// ❌ BAD: Directional properties (LTR-biased)
<div className="ml-4 pr-8 text-left">
  <span className="float-left">Content</span>
</div>

// ✅ GOOD: Logical properties (RTL-first)
<div className="ms-4 pe-8 text-start">
  <span className="float-start">Content</span>
</div>`

const logicalMappingCode = `// Logical Property Mapping

// Margin
ml-4  →  ms-4  (margin-inline-start)
mr-4  →  me-4  (margin-inline-end)
mt-4  →  mt-4  (margin-top - unchanged)
mb-4  →  mb-4  (margin-bottom - unchanged)

// Padding
pl-4  →  ps-4  (padding-inline-start)
pr-4  →  pe-4  (padding-inline-end)
pt-4  →  pt-4  (padding-top - unchanged)
pb-4  →  pb-4  (padding-bottom - unchanged)

// Border
border-l  →  border-s  (border-inline-start)
border-r  →  border-e  (border-inline-end)

// Positioning
left-0    →  start-0
right-0   →  end-0

// Rounding
rounded-l  →  rounded-s
rounded-r  →  rounded-e
rounded-tl →  rounded-ss  (top-start)
rounded-tr →  rounded-se  (top-end)
rounded-bl →  rounded-es  (bottom-start)
rounded-br →  rounded-ee  (bottom-end)

// Text Alignment
text-left   →  text-start
text-right  →  text-end

// Floats
float-left   →  float-start
float-right  →  float-end`

const flexLayoutCode = `// ❌ BAD: Manual RTL handling
<div className={cn(
  "flex",
  direction === "rtl" ? "flex-row-reverse" : "flex-row"
)}>
  <div className="ml-4">Content</div>
</div>

// ✅ GOOD: Use logical properties
<div className="flex flex-row">
  <div className="ms-4">Content</div>
</div>`

const iconMirroringCode = `// Icons that should mirror in RTL
import { ArrowRight, ChevronRight, ArrowLeft } from 'lucide-react'

<Button>
  Next
  <ArrowRight className="ms-2" /> {/* Will mirror in RTL */}
</Button>

// Icons that should NOT mirror in RTL
import { Settings, User, Search } from 'lucide-react'

<Button>
  <Settings className="me-2" /> {/* Won't mirror */}
  Settings
</Button>`

const useDirectionCode = `'use client'

import { useDirection } from '@/components/providers/direction-provider'

export function MyComponent() {
  const { direction, setDirection, toggleDirection } = useDirection()

  return (
    <div>
      <p>Current: {direction}</p>
      <button onClick={toggleDirection}>
        Toggle Direction
      </button>
    </div>
  )
}`

const testingCode = `// Visual Testing for RTL
import { test, expect } from '@playwright/test'

test.describe('Component RTL Support', () => {
  test('renders correctly in LTR', async ({ page }) => {
    await page.goto('/components/button')
    await page.evaluate(() => {
      document.documentElement.setAttribute('dir', 'ltr')
    })
    await expect(page).toHaveScreenshot('button-ltr.png')
  })

  test('renders correctly in RTL', async ({ page }) => {
    await page.goto('/components/button')
    await page.evaluate(() => {
      document.documentElement.setAttribute('dir', 'rtl')
    })
    await expect(page).toHaveScreenshot('button-rtl.png')
  })
})`

const migrationCode = `// Migration Example

// Before: LTR-only
<div className="ml-4 mr-8 text-left">
  <img src="/icon.svg" className="float-left" />
  <button className="rounded-l-lg border-l-2">
    Click me
    <ArrowRight className="ml-2" />
  </button>
</div>

// After: RTL-first
<div className="ms-4 me-8 text-start">
  <img src="/icon.svg" className="float-start" />
  <button className="rounded-s-lg border-s-2">
    Click me
    <ArrowRight className="ms-2" />
  </button>
</div>`

const commonPatternsCode = `// Pattern 1: Responsive Spacing
<div className="ps-4 sm:ps-6 md:ps-8 lg:ps-10">
  Content
</div>

// Pattern 2: Flex Layouts with Gap
<div className="flex gap-4">
  {/* gap works in both directions automatically */}
  <Card>Item 1</Card>
  <Card>Item 2</Card>
</div>

// Pattern 3: Grid Layouts
<div className="grid grid-cols-3 gap-4">
  {/* Grid respects RTL automatically */}
  <Card>1</Card>
  <Card>2</Card>
  <Card>3</Card>
</div>

// Pattern 4: Absolute Positioning
<div className="relative">
  <div className="absolute start-4 top-4">
    Badge
  </div>
</div>`

export default function RTLGuidePage() {
  const { locale } = useDirection()
  const t = content[locale].rtlGuidePage

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
            <li className="text-foreground font-medium">{t.breadcrumb.rtlGuide}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.title}</h1>
          <p className="text-xl text-muted-foreground">
            {t.description}
          </p>
        </div>

        {/* Philosophy */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.philosophy.title}</h2>
          <Card className="mb-6">
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  {t.philosophy.whatIsRtlFirst}
                </h3>
                <p className="text-muted-foreground">
                  {t.philosophy.whatIsRtlFirstDesc}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t.philosophy.corePrinciples}</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>{t.philosophy.principle1}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>{t.philosophy.principle2}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>{t.philosophy.principle3}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>{t.philosophy.principle4}</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Logical Properties */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.logicalProperties.title}</h2>
          <p className="text-muted-foreground mb-6">
            {t.logicalProperties.description}
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.logicalProperties.beforeAfter}</h3>
              <CodeBlock code={logicalPropertiesCode} language="tsx" />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{t.logicalProperties.completeMapping}</h3>
              <CodeBlock code={logicalMappingCode} language="tsx" />
            </div>
          </div>

          <Card className="mt-6 border-blue-500/50 bg-blue-50 dark:bg-blue-950/20">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                {t.logicalProperties.whyLogicalTitle}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.logicalProperties.whyLogicalDesc}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Common Patterns */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.commonPatterns.title}</h2>
          <p className="text-muted-foreground mb-6">
            {t.commonPatterns.description}
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.commonPatterns.layoutPatterns}</h3>
              <CodeBlock code={commonPatternsCode} language="tsx" />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{t.commonPatterns.flexLayouts}</h3>
              <CodeBlock code={flexLayoutCode} language="tsx" />
              <Card className="mt-4">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">
                    {t.commonPatterns.flexDesc}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Icon Handling */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.iconMirroring.title}</h2>
          <p className="text-muted-foreground mb-6">
            {t.iconMirroring.description}
          </p>

          <CodeBlock code={iconMirroringCode} language="tsx" />

          <Card className="mt-6">
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  {t.iconMirroring.shouldMirror}
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {t.iconMirroring.shouldMirrorList.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-600" />
                  {t.iconMirroring.shouldNotMirror}
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {t.iconMirroring.shouldNotMirrorList.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Using the Direction Hook */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.directionHook.title}</h2>
          <p className="text-muted-foreground mb-6">
            {t.directionHook.description}
          </p>
          <CodeBlock code={useDirectionCode} language="tsx" />

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">{t.directionHook.whenToUse}</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>{t.directionHook.useCase1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>{t.directionHook.useCase2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>{t.directionHook.useCase3}</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>{t.directionHook.useCase4}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Testing */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.testing.title}</h2>
          <p className="text-muted-foreground mb-6">
            {t.testing.description}
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.testing.visualTesting}</h3>
              <CodeBlock code={testingCode} language="tsx" />
            </div>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">{t.testing.manualTestingChecklist}</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>{t.testing.checklist1}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>{t.testing.checklist2}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>{t.testing.checklist3}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>{t.testing.checklist4}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>{t.testing.checklist5}</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Live Example */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.liveExample.title}</h2>
          <p className="text-muted-foreground mb-6">
            {t.liveExample.description}
          </p>

          <ComponentShowcase.Comparison ltrLabel={t.liveExample.ltrLabel} rtlLabel={t.liveExample.rtlLabel}>
            <Card className="w-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    A
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{t.liveExample.userName}</h3>
                    <p className="text-sm text-muted-foreground">{t.liveExample.userDesc}</p>
                  </div>
                  <Button size="sm">
                    {t.liveExample.nextButton}
                    <ArrowRight className="ms-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </ComponentShowcase.Comparison>
        </section>

        {/* Migration Guide */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.migration.title}</h2>
          <p className="text-muted-foreground mb-6">
            {t.migration.description}
          </p>

          <CodeBlock code={migrationCode} language="tsx" />

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">{t.migration.steps}</h3>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>{t.migration.step1}</li>
                <li>{t.migration.step2}</li>
                <li>{t.migration.step3}</li>
                <li>{t.migration.step4}</li>
                <li>{t.migration.step5}</li>
                <li>{t.migration.step6}</li>
                <li>{t.migration.step7}</li>
              </ol>
            </CardContent>
          </Card>
        </section>

        {/* Best Practices */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Best Practices</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-green-500/50 bg-green-50 dark:bg-green-950/20">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2 text-green-700 dark:text-green-400">
                  <CheckCircle2 className="h-5 w-5" />
                  Do
                </h3>
                <ul className="text-sm space-y-2">
                  <li>✓ Use logical properties everywhere</li>
                  <li>✓ Test in both directions regularly</li>
                  <li>✓ Use the direction toggle during development</li>
                  <li>✓ Mirror directional icons appropriately</li>
                  <li>✓ Keep accessibility in mind</li>
                  <li>✓ Use Flexbox and Grid for layouts</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-red-500/50 bg-red-50 dark:bg-red-950/20">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2 text-red-700 dark:text-red-400">
                  <XCircle className="h-5 w-5" />
                  Don&apos;t
                </h3>
                <ul className="text-sm space-y-2">
                  <li>✗ Use directional properties (ml-, mr-, left-, right-)</li>
                  <li>✗ Add conditional logic for direction</li>
                  <li>✗ Forget to test RTL mode</li>
                  <li>✗ Mirror all icons (some shouldn&apos;t)</li>
                  <li>✗ Rely solely on left/right positioning</li>
                  <li>✗ Use text-left or text-right</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Resources */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Additional Resources</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/getting-started">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Book className="h-5 w-5 text-primary" />
                    Getting Started
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Installation, configuration, and quick start guide
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/components">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Component Library
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Browse all RTL-ready components with examples
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
