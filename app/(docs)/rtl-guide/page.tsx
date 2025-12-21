'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CodeBlock } from '@/components/docs/code-block'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { BestPractices } from '@/components/docs/best-practices'
import { ButtonArrow } from '@/components/ui/button-arrow'
import { Sparkles, ArrowRight, Info, Lightbulb, Book, CheckCircle2 } from 'lucide-react'
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
left-0    →  start-0   (inset-inline-start)
right-0   →  end-0     (inset-inline-end)
top-0     →  top-0     (inset-block-start - unchanged)
bottom-0  →  bottom-0  (inset-block-end - unchanged)

// Thanks to Mazin Musleh for this addition.

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

const keyboardShortcutsCode = `// ✅ CORRECT: Shortcuts stay at physical end, text flows naturally
<button className="flex items-center gap-2">
  <Search className="h-4 w-4" />
  <span>بحث</span>
  {/* ms-auto pushes to end, rtl:flex-row-reverse keeps ⌘K order */}
  <kbd className="ms-auto inline-flex gap-1 rtl:flex-row-reverse">
    <span>⌘</span>K
  </kbd>
</button>

// LTR Result:  [🔍 Search...        ⌘K]
// RTL Result:  [⌘K        ...بحث 🔍]

// ❌ WRONG: Without rtl:flex-row-reverse, kbd content reverses
<kbd className="ms-auto inline-flex gap-1">
  <span>⌘</span>K  {/* Shows as K⌘ in RTL! */}
</kbd>

// ❌ WRONG: Don't manually reverse the whole structure
{isRTL ? (
  <><kbd>⌘K</kbd><span>بحث</span></>
) : (
  <><span>Search</span><kbd>⌘K</kbd></>
)}`

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

const lessonsLearnedCode1 = `// ❌ WRONG: Shortcut reverses to K⌘ in RTL
<span dir="ltr" className="ms-auto">⌘K</span>

// ✅ CORRECT: Nested structure
<span className="ms-auto">
  <span dir="ltr">⌘K</span>
</span>

// Real-world example from Noor UI
const ContextMenuShortcut = ({ children, ...props }) => {
  return (
    <span className="ms-auto text-xs" {...props}>
      <span dir="ltr">{children}</span>
    </span>
  )
}`

const lessonsLearnedCode2 = `// Problem: dir="ltr" breaks logical properties
<span dir="ltr" className="ms-auto">
  Content  {/* ms-auto doesn't work as expected */}
</span>

// Solution: Separate positioning from text direction
<span className="ms-auto">        {/* Handles position */}
  <span dir="ltr">Content</span>  {/* Handles text flow */}
</span>`

const lessonsLearnedCode3 = `// ❌ WRONG: Switch slides right in both LTR and RTL
<SwitchThumb className="translate-x-4" />

// ✅ CORRECT: Add RTL variant
<SwitchThumb className={cn(
  "translate-x-4",
  "rtl:-translate-x-4"  // Negative transform in RTL
)} />

// Full example
<SwitchPrimitives.Thumb
  className={cn(
    'transition-transform',
    'data-[state=checked]:translate-x-4',
    'rtl:data-[state=checked]:-translate-x-4'
  )}
/>`

const lessonsLearnedCode4 = `// ❌ WRONG: Only works for Arabic
const { locale } = useDirection()
if (locale === 'ar') {
  return \`\${max} - \${min}\`  // Breaks for Hebrew, Urdu, Farsi!
}

// ✅ CORRECT: Works for ALL RTL languages
const { direction } = useDirection()
if (direction === 'rtl') {
  return \`\${max} - \${min}\`  // Works for Arabic, Hebrew, Urdu, Farsi, etc.
}

// Real-world example: Formatting range values
const formatRange = (min: number, max: number) => {
  const { direction } = useDirection()

  // RTL: show max first (high value on right), then min
  // LTR: show min first (low value on left), then max
  return direction === 'rtl'
    ? \`\${max} - \${min}\`
    : \`\${min} - \${max}\`
}`

export default function RTLGuidePage() {
  const { locale, direction } = useDirection()
  const isRTL = direction === 'rtl'
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

          <BestPractices
            dos={t.iconMirroring.shouldMirrorList}
            donts={t.iconMirroring.shouldNotMirrorList}
            className="mt-6"
          />
        </section>

        {/* Keyboard Shortcuts */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.keyboardShortcuts.title}</h2>
          <p className="text-muted-foreground mb-6">
            {t.keyboardShortcuts.description}
          </p>

          <CodeBlock code={keyboardShortcutsCode} language="tsx" />

          <Card className="mt-6 border-blue-500/50 bg-blue-50 dark:bg-blue-950/20">
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  {t.keyboardShortcuts.principle}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t.keyboardShortcuts.principleDesc}
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">{t.keyboardShortcuts.examples}</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {t.keyboardShortcuts.ltrExample}</li>
                  <li>• {t.keyboardShortcuts.rtlExample}</li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">{t.keyboardShortcuts.visualNote}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.keyboardShortcuts.visualNoteDesc}
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  {t.keyboardShortcuts.bestPractice}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t.keyboardShortcuts.bestPracticeDesc}
                </p>
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
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0 rtl:rotate-180" />
                  <span>{t.directionHook.useCase1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0 rtl:rotate-180" />
                  <span>{t.directionHook.useCase2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0 rtl:rotate-180" />
                  <span>{t.directionHook.useCase3}</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0 rtl:rotate-180" />
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
                  <ButtonArrow direction="forward" size="sm">
                    {t.liveExample.nextButton}
                  </ButtonArrow>
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.bestPractices.title}</h2>
          <BestPractices dos={t.bestPractices.doList} donts={t.bestPractices.dontList} />
        </section>

        {/* Lessons Learned */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-primary" />
            {t.lessonsLearned.title}
          </h2>
          <p className="text-muted-foreground mb-8">
            {t.lessonsLearned.description}
          </p>

          {/* Lesson 1: Keyboard Shortcuts */}
          <div className="mb-12">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">1</span>
                    {t.lessonsLearned.lesson1Title}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-destructive">{t.lessonsLearned.lesson1Problem}</h4>
                      <p className="text-sm text-muted-foreground">{t.lessonsLearned.lesson1ProblemDesc}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-green-600 dark:text-green-500">{t.lessonsLearned.lesson1Solution}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{t.lessonsLearned.lesson1SolutionDesc}</p>
                      <CodeBlock code={lessonsLearnedCode1} language="tsx" />
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-sm font-medium text-primary">{t.lessonsLearned.lesson1Impact}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lesson 2: Positioning vs Text Direction */}
          <div className="mb-12">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">2</span>
                    {t.lessonsLearned.lesson2Title}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-destructive">{t.lessonsLearned.lesson2Problem}</h4>
                      <p className="text-sm text-muted-foreground">{t.lessonsLearned.lesson2ProblemDesc}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-green-600 dark:text-green-500">{t.lessonsLearned.lesson2Solution}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{t.lessonsLearned.lesson2SolutionDesc}</p>
                      <CodeBlock code={lessonsLearnedCode2} language="tsx" />
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-sm font-medium text-primary">{t.lessonsLearned.lesson2Impact}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lesson 3: Transform Animations */}
          <div className="mb-12">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">3</span>
                    {t.lessonsLearned.lesson3Title}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-destructive">{t.lessonsLearned.lesson3Problem}</h4>
                      <p className="text-sm text-muted-foreground">{t.lessonsLearned.lesson3ProblemDesc}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-green-600 dark:text-green-500">{t.lessonsLearned.lesson3Solution}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{t.lessonsLearned.lesson3SolutionDesc}</p>
                      <CodeBlock code={lessonsLearnedCode3} language="tsx" />
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-sm font-medium text-primary">{t.lessonsLearned.lesson3Impact}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lesson 4: Direction Check vs Locale Check */}
          <div className="mb-8">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">4</span>
                    {t.lessonsLearned.lesson4Title}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-destructive">{t.lessonsLearned.lesson4Problem}</h4>
                      <p className="text-sm text-muted-foreground">{t.lessonsLearned.lesson4ProblemDesc}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-green-600 dark:text-green-500">{t.lessonsLearned.lesson4Solution}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{t.lessonsLearned.lesson4SolutionDesc}</p>
                      <CodeBlock code={lessonsLearnedCode4} language="tsx" />
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-sm font-medium text-primary">{t.lessonsLearned.lesson4Impact}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium mb-1">{t.lessonsLearned.updatedDate}</p>
                  <p className="text-sm text-muted-foreground">{t.lessonsLearned.contributionNote}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Resources */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.resources.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/getting-started">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Book className="h-5 w-5 text-primary" />
                    {t.resources.gettingStarted}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t.resources.gettingStartedDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/components">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    {t.resources.componentLibrary}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t.resources.componentLibraryDesc}
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
