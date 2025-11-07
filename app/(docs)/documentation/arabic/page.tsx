import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Arabic Typography | RTL Design System',
  description: 'Complete guide to Arabic typography, font selection, text rendering, and bilingual design best practices for GCC applications.',
  keywords: ['arabic', 'typography', 'fonts', 'text rendering', 'bilingual', 'gcc', 'rtl', 'design', 'nextjs'],
}

'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { CodeBlock } from '@/components/docs/code-block'
import { Type, Check } from 'lucide-react'

const fontSetupCode = `// Import Arabic-supporting font
import { Cairo, Tajawal } from 'next/font/google'

const cairo = Cairo({
  subsets: ['latin', 'arabic'],
  variable: '--font-cairo',
})

const tajawal = Tajawal({
  subsets: ['latin', 'arabic'],
  weight: ['400', '500', '700'],
  variable: '--font-tajawal',
})

// In layout
<html lang="ar" dir="rtl" className={cairo.variable}>
  ...
</html>`

const arabicTextCode = `// Proper Arabic text rendering
<h1 className="text-4xl font-bold">
  مرحباً بك في نظام التصميم
</h1>

<p className="text-lg leading-relaxed">
  نظام تصميم متكامل يدعم اللغة العربية بشكل كامل مع جميع
  المكونات والأنماط اللازمة لبناء واجهات مستخدم احترافية.
</p>`

const numberFormattingCode = `// Arabic (Eastern) vs Latin numbers
const price = 1234.56

// Latin numerals (default)
<p>السعر: {price.toLocaleString('en')} ريال</p>
// Output: السعر: 1,234.56 ريال

// Eastern Arabic numerals
<p>السعر: {price.toLocaleString('ar-SA')} ريال</p>
// Output: السعر: ١٬٢٣٤٫٥٦ ريال`

export default function ArabicPage() {
  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link href="/documentation" className="hover:text-foreground transition-colors">Documentation</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">Arabic Typography</li>
          </ol>
        </nav>

        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Type className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">Arabic Typography</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Best practices for beautiful, readable Arabic typography in web applications.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Font Selection</h2>
          <p className="text-muted-foreground mb-4">
            Choose fonts that support Arabic script with proper glyph rendering:
          </p>
          <CodeBlock code={fontSetupCode} language="tsx" />

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Recommended Arabic Fonts</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <strong>Cairo:</strong> Modern, clean, great for UI
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <strong>Tajawal:</strong> Professional, highly readable
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <strong>Noto Sans Arabic:</strong> Excellent glyph coverage
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <strong>IBM Plex Sans Arabic:</strong> Corporate, professional
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Text Rendering</h2>
          <p className="text-muted-foreground mb-4">
            Proper Arabic text requires attention to spacing and line height:
          </p>
          <CodeBlock code={arabicTextCode} language="tsx" />

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Typography Guidelines</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Use 1.6-1.8 line-height for better readability</li>
                <li>• Increase letter-spacing slightly (0.01em - 0.02em)</li>
                <li>• Minimum font size: 16px for body text</li>
                <li>• Ensure proper diacritical mark rendering</li>
                <li>• Test with real Arabic content, not placeholder text</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Number Formatting</h2>
          <p className="text-muted-foreground mb-4">
            Handle both Latin and Eastern Arabic numerals appropriately:
          </p>
          <CodeBlock code={numberFormattingCode} language="tsx" />

          <div className="mt-6 p-6 border rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground mb-4">Examples:</p>
            <div className="space-y-2">
              <p>السعر: {(1234.56).toLocaleString('en')} ريال (Latin numerals)</p>
              <p>السعر: {(1234.56).toLocaleString('ar-SA')} ريال (Eastern Arabic)</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Common Mistakes</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-red-500/50 bg-red-50 dark:bg-red-950/20">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-red-600 dark:text-red-400">❌ Avoid</h3>
                <ul className="text-sm space-y-1">
                  <li>• Using fonts without Arabic glyphs</li>
                  <li>• Too tight line-height (&lt; 1.4)</li>
                  <li>• Mixing Latin and Arabic fonts</li>
                  <li>• Ignoring diacritical marks</li>
                  <li>• Copy-pasting from design tools</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-500/50 bg-green-50 dark:bg-green-950/20">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-green-600 dark:text-green-400">✓ Do</h3>
                <ul className="text-sm space-y-1">
                  <li>• Test with native speakers</li>
                  <li>• Use proper Arabic fonts</li>
                  <li>• Increase line-height for clarity</li>
                  <li>• Support diacritical marks</li>
                  <li>• Use real Arabic content in tests</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Learn More</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/documentation/rtl">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">RTL Guidelines</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete RTL development guide
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/documentation/bidi">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Bidirectional Text</h3>
                  <p className="text-sm text-muted-foreground">
                    Handling mixed-direction content
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
