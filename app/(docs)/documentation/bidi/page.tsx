'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { CodeBlock } from '@/components/docs/code-block'
import { ArrowLeftRight, Info } from 'lucide-react'

const bidiTextCode = `// Mixed direction text handling
<p dir="auto">
  This text contains both English and عربي text
</p>

// Unicode BiDi control characters
const text = "Hello \\u202B"مرحبا"\\u202C World"

// Using CSS for BiDi isolation
<span className="isolate">مرحبا</span>`

const bidiInputCode = `// Input fields automatically detect direction
<Input
  type="text"
  placeholder="Enter text / أدخل النص"
  dir="auto"
/>

// Force specific direction
<Input dir="rtl" placeholder="أدخل النص" />
<Input dir="ltr" placeholder="Enter text" />`

const numberHandlingCode = `// Numbers in RTL text
<p dir="rtl">
  السعر: 1,234.56 دولار
</p>

// Dates in mixed context
<p dir="auto">
  التاريخ: 2024-01-15
</p>

// Phone numbers
<p dir="ltr" className="text-start">
  +966 50 123 4567
</p>`

export default function BidiPage() {
  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link href="/documentation" className="hover:text-foreground transition-colors">Documentation</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">Bidirectional Text</li>
          </ol>
        </nav>

        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <ArrowLeftRight className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">Bidirectional Components</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Understanding and handling mixed-direction text (BiDi) in your applications for proper rendering of multilingual content.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">What is BiDi?</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground mb-4">
                BiDi (Bidirectional) text refers to content that contains both left-to-right (LTR) and right-to-left (RTL) scripts in the same context. Common scenarios include:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Arabic text with English brand names or technical terms</li>
                <li>• Hebrew content with numbers and Latin characters</li>
                <li>• Mixed language user interfaces</li>
                <li>• Email addresses and URLs in RTL text</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Handling Mixed Text</h2>
          <p className="text-muted-foreground mb-4">
            Use the <code className="px-1.5 py-0.5 rounded bg-muted text-foreground">dir="auto"</code> attribute for automatic direction detection:
          </p>
          <CodeBlock code={bidiTextCode} language="tsx" />

          <Card className="mt-6 border-blue-500/50 bg-blue-50 dark:bg-blue-950/20">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Browser Auto-Detection
              </h3>
              <p className="text-sm text-muted-foreground">
                Modern browsers automatically detect text direction with <code className="px-1.5 py-0.5 rounded bg-muted text-foreground">dir="auto"</code>, analyzing the first strong directional character.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Form Inputs with BiDi</h2>
          <p className="text-muted-foreground mb-4">
            Input fields should adapt to content direction:
          </p>
          <CodeBlock code={bidiInputCode} language="tsx" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Numbers and Dates</h2>
          <p className="text-muted-foreground mb-4">
            Special handling for numeric content in RTL text:
          </p>
          <CodeBlock code={numberHandlingCode} language="tsx" />

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">BiDi Best Practices</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Numbers remain LTR even in RTL text (1234, not 4321)</li>
                <li>• Dates in ISO format should stay LTR (2024-01-15)</li>
                <li>• Phone numbers should always be LTR with proper alignment</li>
                <li>• Email addresses and URLs remain LTR</li>
                <li>• Use Unicode BiDi controls sparingly and only when necessary</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Component Support</h2>
          <p className="text-muted-foreground mb-4">
            All RTL Design System components handle BiDi text automatically:
          </p>
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-2 text-sm">
                <li>✓ Input fields auto-detect direction</li>
                <li>✓ Text areas support mixed content</li>
                <li>✓ Labels align correctly with inputs</li>
                <li>✓ Tooltips position based on direction</li>
                <li>✓ Dialogs and modals handle mixed text</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Learn More</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/documentation/rtl">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">RTL Guidelines</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete guide to RTL-first development
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/documentation/arabic">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Arabic Typography</h3>
                  <p className="text-sm text-muted-foreground">
                    Arabic-specific typography guidelines
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
