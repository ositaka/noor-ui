'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { CodeBlock } from '@/components/docs/code-block'
import { FeatureCard } from '@/components/ui/feature-card'
import { Sparkles, Package, Settings, Zap, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'
const installationCode = `npm install @noorui/components
# or
yarn add @noorui/components
# or
pnpm add @noorui/components`

const tailwindConfigCode = `// tailwind.config.ts
import type { Config } from "tailwindcss"
import { rtlPlugin } from "@noorui/components/plugin"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@noorui/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    rtlPlugin(),
    require("tailwindcss-logical"),
  ],
}

export default config`

const providersCode = `// app/providers.tsx
'use client'

import * as React from 'react'
import { DirectionProvider } from '@noorui/components/providers'
import { DesignSystemProvider } from '@noorui/components/providers'
import { TooltipProvider } from '@noorui/components'
import { Toaster } from '@noorui/components'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DirectionProvider>
      <DesignSystemProvider>
        <TooltipProvider>
          {children}
          <Toaster />
        </TooltipProvider>
      </DesignSystemProvider>
    </DirectionProvider>
  )
}`

const layoutCode = `// app/layout.tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Providers } from "./providers"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "My Noor UI App",
  description: "Built with Noor UI",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}`

const globalsCssCode = `/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`

const quickStartCode = `// app/page.tsx
import { Button } from '@noorui/components'
import { Card, CardContent, CardHeader, CardTitle } from '@noorui/components'

export default function Home() {
  return (
    <main className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Welcome to Noor UI</h1>

      <Card>
        <CardHeader>
          <CardTitle>Your First Component</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            This card works perfectly in both LTR and RTL layouts.
          </p>
          <Button>Get Started</Button>
        </CardContent>
      </Card>
    </main>
  )
}`

const rtlUsageCode = `// Using RTL direction
'use client'

import { useDirection } from '@noorui/components/hooks'

export function MyComponent() {
  const { direction, setDirection } = useDirection()

  return (
    <div>
      <p>Current direction: {direction}</p>
      <button onClick={() => setDirection(direction === 'ltr' ? 'rtl' : 'ltr')}>
        Toggle Direction
      </button>
    </div>
  )
}`

export default function GettingStartedPage() {
  const { locale } = useDirection()
  const t = content[locale]

  return (
    <div className="min-h-screen">

      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {t.common.home}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">{t.gettingStarted.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.gettingStarted.title}</h1>
          <p className="text-xl text-muted-foreground">
            {t.gettingStarted.description}
          </p>
        </div>

        {/* Quick Links */}
        <section className="mb-16">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={Package}
              title={t.gettingStarted.quickLinks.installation}
              description={t.gettingStarted.quickLinks.installationDesc}
              href="#installation"
            />
            <FeatureCard
              icon={Settings}
              title={t.gettingStarted.quickLinks.configuration}
              description={t.gettingStarted.quickLinks.configurationDesc}
              href="#configuration"
            />
            <FeatureCard
              icon={Zap}
              title={t.gettingStarted.quickLinks.quickStart}
              description={t.gettingStarted.quickLinks.quickStartDesc}
              href="#quick-start"
            />
            <FeatureCard
              icon={CheckCircle2}
              title={t.gettingStarted.quickLinks.bestPractices}
              description={t.gettingStarted.quickLinks.bestPracticesDesc}
              href="#rtl-usage"
            />
          </div>
        </section>

        {/* Installation */}
        <section className="mb-16" id="installation">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.gettingStarted.installation}</h2>
          <p className="text-muted-foreground mb-4">
            {t.gettingStarted.installDesc}
          </p>
          <CodeBlock code={installationCode} language="bash" />

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">{t.gettingStarted.prerequisites}</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Next.js 14+ (App Router)</li>
                <li>React 18+</li>
                <li>Tailwind CSS 3.4+</li>
                <li>TypeScript 5+ (recommended)</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Tailwind Configuration */}
        <section className="mb-16" id="configuration">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.gettingStarted.tailwindConfig}</h2>
          <p className="text-muted-foreground mb-4">
            {t.gettingStarted.tailwindConfigDesc}
          </p>
          <CodeBlock code={tailwindConfigCode} language="tsx" />

          <Card className="mt-6 border-yellow-500/50 bg-yellow-50 dark:bg-yellow-950/20">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-yellow-600 dark:text-yellow-400">⚠️</span>
                {t.gettingStarted.important}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.gettingStarted.tailwindImportantNote}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Provider Setup */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.gettingStarted.providerSetup}</h2>
          <p className="text-muted-foreground mb-4">
            {t.gettingStarted.providerSetupDesc}
          </p>

          <div className="space-y-4 mb-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">{t.gettingStarted.createProvidersComponent}</h3>
              <CodeBlock code={providersCode} language="tsx" />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">{t.gettingStarted.updateRootLayout}</h3>
              <CodeBlock code={layoutCode} language="tsx" />
            </div>
          </div>

          <Card className="mt-6">
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t.gettingStarted.providerResponsibilities}</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span><strong>DirectionProvider:</strong> {t.gettingStarted.directionProviderDesc}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span><strong>DesignSystemProvider:</strong> {t.gettingStarted.designSystemProviderDesc}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span><strong>TooltipProvider:</strong> {t.gettingStarted.tooltipProviderDesc}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span><strong>Toaster:</strong> {t.gettingStarted.toasterDesc}</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Global Styles */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.gettingStarted.globalStyles}</h2>
          <p className="text-muted-foreground mb-4">
            {t.gettingStarted.globalStylesDesc}
          </p>
          <CodeBlock code={globalsCssCode} language="css" />
        </section>

        {/* Quick Start */}
        <section className="mb-16" id="quick-start">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.gettingStarted.quickStart}</h2>
          <p className="text-muted-foreground mb-4">
            {t.gettingStarted.quickStartDesc}
          </p>
          <CodeBlock code={quickStartCode} language="tsx" />
        </section>

        {/* RTL Usage */}
        <section className="mb-16" id="rtl-usage">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.gettingStarted.workingWithRTL}</h2>
          <p className="text-muted-foreground mb-4">
            {t.gettingStarted.workingWithRTLDesc}
          </p>
          <CodeBlock code={rtlUsageCode} language="tsx" />

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">{t.gettingStarted.rtlBestPractices}</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0 rtl:rotate-180" />
                  <span>{t.gettingStarted.rtlBestPractice1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0 rtl:rotate-180" />
                  <span>{t.gettingStarted.rtlBestPractice2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0 rtl:rotate-180" />
                  <span>{t.gettingStarted.rtlBestPractice3}</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0 rtl:rotate-180" />
                  <span>{t.gettingStarted.rtlBestPractice4}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Next Steps */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.gettingStarted.nextSteps}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/components">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    {t.gettingStarted.browseComponents}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t.gettingStarted.browseComponentsDesc}
                  </p>
                  <Button variant="ghost" size="sm" className="gap-2">
                    {t.gettingStarted.viewComponents}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/rtl-guide">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    {t.gettingStarted.rtlDevGuide}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t.gettingStarted.rtlDevGuideDesc}
                  </p>
                  <Button variant="ghost" size="sm" className="gap-2">
                    {t.gettingStarted.readGuide}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
