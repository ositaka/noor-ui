'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { CodeBlock } from '@/components/docs/code-block'
import { Globe2, CheckCircle2, XCircle } from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

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
  const { locale } = useDirection()
  const t = content[locale].documentationPages.rtl
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
            <Globe2 className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">{t.title}</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            {t.subtitle}
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.corePrinciples}</h2>
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-foreground">{t.useLogical}</strong>
                    <p className="text-sm text-muted-foreground">{t.useLogicalDesc}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-foreground">{t.testBoth}</strong>
                    <p className="text-sm text-muted-foreground">{t.testBothDesc}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-foreground">{t.mirrorIcons}</strong>
                    <p className="text-sm text-muted-foreground">{t.mirrorIconsDesc}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-foreground">{t.respectLang}</strong>
                    <p className="text-sm text-muted-foreground">{t.respectLangDesc}</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.logicalProperties}</h2>
          <p className="text-muted-foreground mb-4">
            {t.logicalPropertiesDesc}
          </p>
          <CodeBlock code={logicalPropertiesCode} language="tsx" />

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Card className="border-red-500/50 bg-red-50 dark:bg-red-950/20">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  {t.avoid}
                </h3>
                <code className="text-sm">ml-, mr-, pl-, pr-, left-, right-</code>
              </CardContent>
            </Card>

            <Card className="border-green-500/50 bg-green-50 dark:bg-green-950/20">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                  {t.use}
                </h3>
                <code className="text-sm">ms-, me-, ps-, pe-, start-, end-</code>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.flexboxGrid}</h2>
          <p className="text-muted-foreground mb-4">
            {t.flexboxDesc}
          </p>
          <CodeBlock code={flexboxRTLCode} language="tsx" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.iconMirroring}</h2>
          <p className="text-muted-foreground mb-4">
            {t.iconMirroringDesc}
          </p>
          <CodeBlock code={iconMirroringCode} language="tsx" />

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">{t.iconsToMirror}</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• {t.arrows}</li>
                <li>• {t.navigation}</li>
                <li>• {t.directional}</li>
                <li>• {t.chevrons}</li>
              </ul>
              <h3 className="font-semibold mt-4 mb-3">{t.iconsNotMirror}</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• {t.symbols}</li>
                <li>• {t.media}</li>
                <li>• {t.brands}</li>
                <li>• {t.universal}</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.textAlignment}</h2>
          <p className="text-muted-foreground mb-4">
            {t.textAlignmentDesc}
          </p>
          <CodeBlock code={textAlignmentCode} language="tsx" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.relatedResources}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/documentation/bidi">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t.bidiComponents}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.bidiDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/documentation/arabic">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t.arabicTypography}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.arabicDesc}
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
