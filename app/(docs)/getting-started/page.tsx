'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { CodeBlock } from '@/components/docs/code-block'
import { Sparkles, Package, Settings, Zap, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
const installationCode = `npm install @rtl-design-system/core
# or
yarn add @rtl-design-system/core
# or
pnpm add @rtl-design-system/core`

const tailwindConfigCode = `// tailwind.config.ts
import type { Config } from "tailwindcss"
import { rtlPlugin } from "@rtl-design-system/core/plugin"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@rtl-design-system/core/**/*.{js,ts,jsx,tsx}",
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
import { DirectionProvider } from '@rtl-design-system/core/providers'
import { DesignSystemProvider } from '@rtl-design-system/core/providers'
import { TooltipProvider } from '@rtl-design-system/core/components'
import { Toaster } from '@rtl-design-system/core/components'

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
  title: "My RTL-First App",
  description: "Built with RTL Design System",
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
import { Button } from '@rtl-design-system/core/components'
import { Card, CardContent, CardHeader, CardTitle } from '@rtl-design-system/core/components'

export default function Home() {
  return (
    <main className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Welcome to RTL Design System</h1>

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

import { useDirection } from '@rtl-design-system/core/hooks'

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
  return (
    <div className="min-h-screen">

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
            <li className="text-foreground font-medium">Getting Started</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Getting Started</h1>
          <p className="text-xl text-muted-foreground">
            Learn how to install and configure RTL Design System in your Next.js project. Built with RTL-first principles for seamless bidirectional support.
          </p>
        </div>

        {/* Quick Links */}
        <section className="mb-16">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="hover:border-primary transition-colors">
              <CardContent className="p-6">
                <Package className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Installation</h3>
                <p className="text-sm text-muted-foreground">
                  Add the package to your project
                </p>
              </CardContent>
            </Card>
            <Card className="hover:border-primary transition-colors">
              <CardContent className="p-6">
                <Settings className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Configuration</h3>
                <p className="text-sm text-muted-foreground">
                  Set up Tailwind and providers
                </p>
              </CardContent>
            </Card>
            <Card className="hover:border-primary transition-colors">
              <CardContent className="p-6">
                <Zap className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Quick Start</h3>
                <p className="text-sm text-muted-foreground">
                  Build your first component
                </p>
              </CardContent>
            </Card>
            <Card className="hover:border-primary transition-colors">
              <CardContent className="p-6">
                <CheckCircle2 className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Best Practices</h3>
                <p className="text-sm text-muted-foreground">
                  RTL-first development tips
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Installation</h2>
          <p className="text-muted-foreground mb-4">
            Install the RTL Design System package using your preferred package manager:
          </p>
          <CodeBlock code={installationCode} language="bash" />

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Prerequisites</h3>
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
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Tailwind Configuration</h2>
          <p className="text-muted-foreground mb-4">
            Configure Tailwind CSS to work with the RTL Design System. This includes adding the RTL plugin and tailwindcss-logical for bidirectional support.
          </p>
          <CodeBlock code={tailwindConfigCode} language="tsx" />

          <Card className="mt-6 border-yellow-500/50 bg-yellow-50 dark:bg-yellow-950/20">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-yellow-600 dark:text-yellow-400">⚠️</span>
                Important
              </h3>
              <p className="text-sm text-muted-foreground">
                Make sure to include the RTL Design System package in your content array so Tailwind can detect and compile the component styles.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Provider Setup */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Provider Setup</h2>
          <p className="text-muted-foreground mb-4">
            Wrap your application with the required providers. This enables RTL direction switching, theming, tooltips, and toast notifications.
          </p>

          <div className="space-y-4 mb-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">1. Create Providers Component</h3>
              <CodeBlock code={providersCode} language="tsx" />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">2. Update Root Layout</h3>
              <CodeBlock code={layoutCode} language="tsx" />
            </div>
          </div>

          <Card className="mt-6">
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Provider Responsibilities</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span><strong>DirectionProvider:</strong> Manages LTR/RTL direction state globally</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span><strong>DesignSystemProvider:</strong> Handles theme (light/dark) state</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span><strong>TooltipProvider:</strong> Required for all Tooltip components</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span><strong>Toaster:</strong> Required for toast notifications to appear</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Global Styles */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Global Styles</h2>
          <p className="text-muted-foreground mb-4">
            Add the design system CSS variables to your global stylesheet:
          </p>
          <CodeBlock code={globalsCssCode} language="css" />
        </section>

        {/* Quick Start */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Quick Start</h2>
          <p className="text-muted-foreground mb-4">
            You&apos;re all set! Start using components in your application:
          </p>
          <CodeBlock code={quickStartCode} language="tsx" />
        </section>

        {/* RTL Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Working with RTL</h2>
          <p className="text-muted-foreground mb-4">
            Use the direction hook to programmatically control or respond to direction changes:
          </p>
          <CodeBlock code={rtlUsageCode} language="tsx" />

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">RTL Best Practices</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>Use logical properties (ms-, me-, ps-, pe-) instead of directional ones (ml-, mr-, pl-, pr-)</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>Test all components in both LTR and RTL modes</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>Use the direction toggle during development to verify layouts</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>Icons and images should mirror appropriately for RTL</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Next Steps */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Next Steps</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/components">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    Browse Components
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Explore the full library of RTL-ready components with live examples and code snippets.
                  </p>
                  <Button variant="ghost" size="sm" className="gap-2">
                    View Components
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
                    RTL Development Guide
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Learn RTL-first development principles, patterns, and best practices for building bidirectional interfaces.
                  </p>
                  <Button variant="ghost" size="sm" className="gap-2">
                    Read Guide
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
