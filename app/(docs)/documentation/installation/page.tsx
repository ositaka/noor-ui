'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { CodeBlock } from '@/components/docs/code-block'
import { Package, Terminal, CheckCircle2, AlertCircle } from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const npmInstall = `npm install @noorui/components`
const yarnInstall = `yarn add @noorui/components`
const pnpmInstall = `pnpm add @noorui/components`
const bunInstall = `bun add @noorui/components`

const dependenciesCode = `{
  "dependencies": {
    "@noorui/components": "^1.0.0",
    "next": "^14.0.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "tailwindcss": "^3.4.0",
    "tailwindcss-logical": "^0.9.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.0",
    "typescript": "^5.0.0"
  }
}`

const verifyInstallCode = `import { Button } from '@noorui/components/components'

export default function TestPage() {
  return <Button>Test Installation</Button>
}`

export default function InstallationPage() {
  const { locale } = useDirection()
  const t = content[locale].documentationPages.installation
  const common = content[locale].documentationPages.common

  return (
    <div className="min-h-screen">

      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {common.home}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/documentation" className="hover:text-foreground transition-colors">
                {common.documentation}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">{t.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.title}</h1>
          <p className="text-xl text-muted-foreground">
            {t.subtitle}
          </p>
        </div>

        {/* Prerequisites */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.prerequisites}</h2>
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-foreground">{t.nextjs}</strong>
                    <p className="text-sm text-muted-foreground">{t.nextjsDesc}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-foreground">{t.react}</strong>
                    <p className="text-sm text-muted-foreground">{t.reactDesc}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-foreground">{t.tailwind}</strong>
                    <p className="text-sm text-muted-foreground">{t.tailwindDesc}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-foreground">{t.typescript}</strong>
                    <p className="text-sm text-muted-foreground">{t.typescriptDesc}</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Package Manager Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.packageManager}</h2>
          <p className="text-muted-foreground mb-6">
            {t.packageManagerDesc}
          </p>

          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Package className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">npm</h3>
              </div>
              <CodeBlock code={npmInstall} language="bash" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Package className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Yarn</h3>
              </div>
              <CodeBlock code={yarnInstall} language="bash" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Package className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">pnpm</h3>
              </div>
              <CodeBlock code={pnpmInstall} language="bash" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Package className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Bun</h3>
              </div>
              <CodeBlock code={bunInstall} language="bash" />
            </div>
          </div>
        </section>

        {/* Dependencies */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.dependencies}</h2>
          <p className="text-muted-foreground mb-4">
            {t.dependenciesDesc}
          </p>
          <CodeBlock code={dependenciesCode} language="json" />

          <Card className="mt-6 border-blue-500/50 bg-blue-50 dark:bg-blue-950/20">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                {t.note}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.tailwindNote}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Verify Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.verifyInstallation}</h2>
          <p className="text-muted-foreground mb-4">
            {t.verifyDesc}
          </p>
          <CodeBlock code={verifyInstallCode} language="tsx" />

          <Card className="mt-6">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Terminal className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">{t.installationSuccessful}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.successDesc}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Next Steps */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.nextSteps}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/documentation/configuration">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t.configurationLink}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.configurationDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/documentation/quick-start">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t.quickStartLink}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.quickStartDesc}
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
