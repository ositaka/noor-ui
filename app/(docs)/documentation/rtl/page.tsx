'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { DirectionToggle } from '@/components/docs/direction-toggle'
import { ThemeToggle } from '@/components/docs/theme-toggle'
import { CodeBlock } from '@/components/docs/code-block'
import { Sparkles, Globe2, CheckCircle2, XCircle } from 'lucide-react'

const logicalPropertiesCode = `// ❌ Don't use directional properties
<div className="ml-4 pr-8">...</div>

// ✅ Use logical properties
<div className="ms-4 pe-8">...</div>

// ms = margin-inline-start (left in LTR, right in RTL)
// me = margin-inline-end (right in LTR, left in RTL)
// ps = padding-inline-start
// pe = padding-inline-end`

const flexboxRTLCode = `// Flexbox works automatically with direction
<div className="flex gap-4">
  <div>First</div>
  <div>Second</div>
  <div>Third</div>
</div>

// Use justify-start/justify-end (they flip with direction)
<div className="flex justify-start">...</div>
<div className="flex justify-end">...</div>`

const iconMirroringCode = `// Icons that should mirror in RTL
const forwardIcon = direction === 'rtl' ? <ArrowLeft /> : <ArrowRight />

// Icons that should NOT mirror
<Settings /> // Always the same
<Search />   // Always the same
<User />     // Always the same`

const textAlignmentCode = `// Text alignment that respects direction
<p className="text-start">Aligns to start (left in LTR, right in RTL)</p>
<p className="text-end">Aligns to end (right in LTR, left in RTL)</p>
<p className="text-center">Always centered</p>`

export default function RTLPage() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">RTL Design</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <DirectionToggle />
          </div>
        </div>
      </header>

      <main id="main-content" className="container py-12">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link href="/documentation" className="hover:text-foreground transition-colors">Documentation</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">RTL Guidelines</li>
          </ol>
        </nav>

        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Globe2 className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">RTL Guidelines</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Best practices for building RTL-first interfaces that work seamlessly in both left-to-right and right-to-left languages.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Core Principles</h2>
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-foreground">Use Logical Properties:</strong>
                    <p className="text-sm text-muted-foreground">Always use start/end instead of left/right for margins, padding, and positioning</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-foreground">Test Both Directions:</strong>
                    <p className="text-sm text-muted-foreground">Always test your UI in both LTR and RTL modes during development</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-foreground">Mirror Directional Icons:</strong>
                    <p className="text-sm text-muted-foreground">Navigation and directional icons should flip in RTL</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-foreground">Respect Language Direction:</strong>
                    <p className="text-sm text-muted-foreground">Content flow should follow the natural reading direction</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">1. Logical Properties</h2>
          <p className="text-muted-foreground mb-4">
            The foundation of RTL-first development is using logical CSS properties:
          </p>
          <CodeBlock code={logicalPropertiesCode} language="tsx" />

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Card className="border-red-500/50 bg-red-50 dark:bg-red-950/20">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  Avoid
                </h3>
                <code className="text-sm">ml-, mr-, pl-, pr-, left-, right-</code>
              </CardContent>
            </Card>

            <Card className="border-green-500/50 bg-green-50 dark:bg-green-950/20">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                  Use
                </h3>
                <code className="text-sm">ms-, me-, ps-, pe-, start-, end-</code>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">2. Flexbox & Grid</h2>
          <p className="text-muted-foreground mb-4">
            Flexbox and Grid automatically respect direction changes:
          </p>
          <CodeBlock code={flexboxRTLCode} language="tsx" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">3. Icon Mirroring</h2>
          <p className="text-muted-foreground mb-4">
            Directional icons should mirror in RTL, but symbols should not:
          </p>
          <CodeBlock code={iconMirroringCode} language="tsx" />

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Icons to Mirror</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Arrows (forward, back, next, previous)</li>
                <li>• Navigation icons</li>
                <li>• Directional indicators</li>
                <li>• Chevrons in sequential contexts</li>
              </ul>
              <h3 className="font-semibold mt-4 mb-3">Icons to NOT Mirror</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Symbols (settings, search, user, etc.)</li>
                <li>• Media controls (play, pause)</li>
                <li>• Brand logos</li>
                <li>• Universal symbols</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">4. Text Alignment</h2>
          <p className="text-muted-foreground mb-4">
            Use logical text alignment classes:
          </p>
          <CodeBlock code={textAlignmentCode} language="tsx" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Related Resources</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/documentation/bidi">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Bidirectional Components</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn how components handle bidirectional text
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/documentation/arabic">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Arabic Typography</h3>
                  <p className="text-sm text-muted-foreground">
                    Best practices for Arabic text rendering
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
