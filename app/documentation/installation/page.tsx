'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { DirectionToggle } from '@/components/docs/direction-toggle'
import { ThemeToggle } from '@/components/docs/theme-toggle'
import { CodeBlock } from '@/components/docs/code-block'
import { Sparkles, Package, Terminal, CheckCircle2, AlertCircle } from 'lucide-react'

const npmInstall = `npm install @rtl-design-system/core`
const yarnInstall = `yarn add @rtl-design-system/core`
const pnpmInstall = `pnpm add @rtl-design-system/core`
const bunInstall = `bun add @rtl-design-system/core`

const dependenciesCode = `{
  "dependencies": {
    "@rtl-design-system/core": "^1.0.0",
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

const verifyInstallCode = `import { Button } from '@rtl-design-system/core/components'

export default function TestPage() {
  return <Button>Test Installation</Button>
}`

export default function InstallationPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
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
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/documentation" className="hover:text-foreground transition-colors">
                Documentation
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">Installation</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Installation</h1>
          <p className="text-xl text-muted-foreground">
            Get started with RTL Design System in minutes. Follow these simple steps to add the package to your Next.js project.
          </p>
        </div>

        {/* Prerequisites */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Prerequisites</h2>
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-foreground">Next.js 14+</strong>
                    <p className="text-sm text-muted-foreground">App Router required for full functionality</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-foreground">React 18.3+</strong>
                    <p className="text-sm text-muted-foreground">For client components and hooks</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-foreground">Tailwind CSS 3.4+</strong>
                    <p className="text-sm text-muted-foreground">Required for styling and logical properties</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-foreground">TypeScript 5+</strong>
                    <p className="text-sm text-muted-foreground">Recommended for type safety</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Package Manager Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Choose Your Package Manager</h2>
          <p className="text-muted-foreground mb-6">
            Select your preferred package manager to install RTL Design System:
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">Package Dependencies</h2>
          <p className="text-muted-foreground mb-4">
            The design system will automatically install the following peer dependencies:
          </p>
          <CodeBlock code={dependenciesCode} language="json" />

          <Card className="mt-6 border-blue-500/50 bg-blue-50 dark:bg-blue-950/20">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Note
              </h3>
              <p className="text-sm text-muted-foreground">
                The package includes <code className="px-1.5 py-0.5 rounded bg-muted text-foreground">tailwindcss-logical</code> for RTL support. Make sure your project is configured to use logical CSS properties.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Verify Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Verify Installation</h2>
          <p className="text-muted-foreground mb-4">
            Test that the package is installed correctly by importing a component:
          </p>
          <CodeBlock code={verifyInstallCode} language="tsx" />

          <Card className="mt-6">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Terminal className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Installation Successful!</h3>
                  <p className="text-sm text-muted-foreground">
                    If there are no import errors, the package is installed correctly. Next, configure Tailwind and set up providers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Next Steps */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Next Steps</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/documentation/configuration">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Configuration</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure Tailwind CSS and set up the required providers for your application.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/documentation/quick-start">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Quick Start</h3>
                  <p className="text-sm text-muted-foreground">
                    Jump straight into building your first component with RTL Design System.
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
