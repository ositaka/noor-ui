'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { CodeBlock } from '@/components/docs/code-block'
import { Gear, CheckCircle, Warning } from '@phosphor-icons/react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const tailwindConfig = `/* globals.css — CSS-first Tailwind v4 configuration */
@import "tailwindcss";

/* Dark mode: class-based toggle */
@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));
  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));
  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
}`

const providersSetup = `// app/providers.tsx
'use client'

import * as React from 'react'
import { DirectionProvider } from 'noorui-rtl/providers'
import { ThemeProvider } from 'next-themes'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { Toaster } from 'noorui-rtl/components'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DirectionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          {children}
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </DirectionProvider>
  )
}`

const rootLayoutSetup = `// app/layout.tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Providers } from "./providers"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "My RTL-First App",
  description: "Built with Noor UI",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}`

const cssVariables = `/* app/globals.css — CSS variables for the design system */
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
  /* ... other dark mode variables ... */
}`

const envConfig = `# .env.local
# Optional: Configure default direction
NEXT_PUBLIC_DEFAULT_DIRECTION=ltr

# Optional: Configure default theme
NEXT_PUBLIC_DEFAULT_THEME=light`

export default function ConfigurationPage() {
  const { locale } = useDirection()
  const t = content[locale].documentationPages.configuration
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
            <Gear className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">{t.title}</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            {t.subtitle}
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.tailwindConfig}</h2>
          <p className="text-muted-foreground mb-4">
            {t.tailwindDesc}
          </p>
          <CodeBlock code={tailwindConfig} language="css" />

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                {t.keyPoints}
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• {t.contentArray}</li>
                <li>• {t.logicalPlugin}</li>
                <li>• {t.darkMode}</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.providerSetup}</h2>
          <p className="text-muted-foreground mb-4">
            {t.providerDesc}
          </p>
          <CodeBlock code={providersSetup} language="tsx" />

          <div className="mt-4 mb-4">
            <h3 className="text-lg font-semibold mb-2">{t.updateLayout}</h3>
            <CodeBlock code={rootLayoutSetup} language="tsx" />
          </div>

          <Card className="border-yellow-500/50 bg-yellow-50 dark:bg-yellow-950/20">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Warning className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                {t.important}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.hydrationNote}
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.cssVariables}</h2>
          <p className="text-muted-foreground mb-4">
            {t.cssDesc}
          </p>
          <CodeBlock code={cssVariables} language="css" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.envVariables}</h2>
          <p className="text-muted-foreground mb-4">
            {t.envDesc}
          </p>
          <CodeBlock code={envConfig} language="bash" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.nextStepsTitle}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/documentation/quick-start">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t.quickStartGuide}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.quickStartDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t.browseComponents}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.browseComponentsDesc}
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
