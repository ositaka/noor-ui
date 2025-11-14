'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { CodeBlock } from '@/components/docs/code-block'
import { Type, Check } from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

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
  const { locale } = useDirection()
  const t = content[locale].documentationPages.arabic
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
            <Type className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">{t.title}</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            {t.subtitle}
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.fontSelection}</h2>
          <p className="text-muted-foreground mb-4">
            {t.fontDesc}
          </p>
          <CodeBlock code={fontSetupCode} language="tsx" />

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">{t.recommended}</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <strong>{t.cairo}</strong> {t.cairoDesc}
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <strong>{t.tajawal}</strong> {t.tajawalDesc}
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <strong>{t.noto}</strong> {t.notoDesc}
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <strong>{t.ibm}</strong> {t.ibmDesc}
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.textRendering}</h2>
          <p className="text-muted-foreground mb-4">
            {t.renderingDesc}
          </p>
          <CodeBlock code={arabicTextCode} language="tsx" />

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">{t.typographyGuidelines}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• {t.lineHeight}</li>
                <li>• {t.letterSpacing}</li>
                <li>• {t.minFontSize}</li>
                <li>• {t.diacriticals}</li>
                <li>• {t.testReal}</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.numberFormatting}</h2>
          <p className="text-muted-foreground mb-4">
            {t.numberDesc}
          </p>
          <CodeBlock code={numberFormattingCode} language="tsx" />

          <div className="mt-6 p-6 border rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground mb-4">{t.examples}</p>
            <div className="space-y-2">
              <p>السعر: {(1234.56).toLocaleString('en')} ريال ({t.latinNumerals})</p>
              <p>السعر: {(1234.56).toLocaleString('ar-SA')} ريال ({t.easternArabic})</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.commonMistakes}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-red-500/50 bg-red-50 dark:bg-red-950/20">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-red-600 dark:text-red-400">❌ {t.avoidTitle}</h3>
                <ul className="text-sm space-y-1">
                  <li>• {t.noArabicFonts}</li>
                  <li>• {t.tightLineHeight}</li>
                  <li>• {t.mixingFonts}</li>
                  <li>• {t.ignoringDiacriticals}</li>
                  <li>• {t.copyPasting}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-500/50 bg-green-50 dark:bg-green-950/20">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-green-600 dark:text-green-400">✓ {t.doTitle}</h3>
                <ul className="text-sm space-y-1">
                  <li>• {t.testNative}</li>
                  <li>• {t.properFonts}</li>
                  <li>• {t.increaseLineHeight}</li>
                  <li>• {t.supportDiacriticals}</li>
                  <li>• {t.useRealContent}</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{common.relatedResources}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/documentation/rtl">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t.rtlGuide}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.rtlGuideDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/documentation/bidi">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t.bidiText}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.bidiTextDesc}
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
