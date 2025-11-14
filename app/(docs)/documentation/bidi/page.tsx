'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { CodeBlock } from '@/components/docs/code-block'
import { ArrowLeftRight, Info } from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

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
  التاريخ: 2025-01-15
</p>

// Phone numbers
<p dir="ltr" className="text-start">
  +966 50 123 4567
</p>`

export default function BidiPage() {
  const { locale } = useDirection()
  const t = content[locale].documentationPages.bidi
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
            <ArrowLeftRight className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">{t.title}</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            {t.subtitle}
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.whatIsBidi}</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground mb-4">
                {t.bidiDesc}
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• {t.arabicEnglish}</li>
                <li>• {t.hebrewNumbers}</li>
                <li>• {t.mixedUI}</li>
                <li>• {t.emailsUrls}</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.handlingMixed}</h2>
          <p className="text-muted-foreground mb-4">
            {t.dirAutoDesc}
          </p>
          <CodeBlock code={bidiTextCode} language="tsx" />

          <Card className="mt-6 border-blue-500/50 bg-blue-50 dark:bg-blue-950/20">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                {t.browserDetection}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.browserNote}
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.formInputs}</h2>
          <p className="text-muted-foreground mb-4">
            {t.formInputsDesc}
          </p>
          <CodeBlock code={bidiInputCode} language="tsx" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.numbersDates}</h2>
          <p className="text-muted-foreground mb-4">
            {t.numbersDesc}
          </p>
          <CodeBlock code={numberHandlingCode} language="tsx" />

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">{t.bidiPractices}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• {t.numbersLTR}</li>
                <li>• {t.datesISO}</li>
                <li>• {t.phoneNumbers}</li>
                <li>• {t.emailsStayLTR}</li>
                <li>• {t.unicodeSparingly}</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentSupport}</h2>
          <p className="text-muted-foreground mb-4">
            {t.componentSupportDesc}
          </p>
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-2 text-sm">
                <li>✓ {t.inputAutoDetect}</li>
                <li>✓ {t.textareaSupport}</li>
                <li>✓ {t.labelsAlign}</li>
                <li>✓ {t.tooltipsPosition}</li>
                <li>✓ {t.dialogsHandle}</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{common.relatedResources}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/documentation/rtl">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t.rtlGuidelinesLink}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.rtlGuidelinesDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/documentation/arabic">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t.arabicTypographyLink}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.arabicTypographyDesc}
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
