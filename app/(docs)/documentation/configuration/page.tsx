'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { DirectionToggle } from '@/components/docs/direction-toggle'
import { ThemeToggle } from '@/components/docs/theme-toggle'
import { CodeBlock } from '@/components/docs/code-block'
import { Sparkles, Settings, CheckCircle2, AlertTriangle } from 'lucide-react'

const tailwindConfig = `// tailwind.config.ts
import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // Include RTL Design System components
    "./node_modules/@rtl-design-system/core/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Your custom theme extensions
    },
  },
  plugins: [
    require("tailwindcss-logical"),
  ],
}

export default config`

const providersSetup = `// app/providers.tsx
'use client'

import * as React from 'react'
import { DirectionProvider } from '@rtl-design-system/core/providers'
import { ThemeProvider } from 'next-themes'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { Toaster } from '@rtl-design-system/core/components'

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
  description: "Built with RTL Design System",
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

const cssVariables = `/* app/globals.css */
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
    /* ... other dark mode variables ... */
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

const envConfig = `# .env.local
# Optional: Configure default direction
NEXT_PUBLIC_DEFAULT_DIRECTION=ltr

# Optional: Configure default theme
NEXT_PUBLIC_DEFAULT_THEME=light`

export default function ConfigurationPage() {
  return (
    <div className="min-h-screen">
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
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link href="/documentation" className="hover:text-foreground transition-colors">Documentation</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">Configuration</li>
          </ol>
        </nav>

        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">Configuration</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Complete configuration guide for integrating RTL Design System into your Next.js application.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">1. Tailwind CSS Configuration</h2>
          <p className="text-muted-foreground mb-4">
            Update your Tailwind config to include the design system components and enable logical properties:
          </p>
          <CodeBlock code={tailwindConfig} language="tsx" />

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                Key Configuration Points
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Include the design system package path in <code className="px-1.5 py-0.5 rounded bg-muted text-foreground">content</code> array</li>
                <li>• Add <code className="px-1.5 py-0.5 rounded bg-muted text-foreground">tailwindcss-logical</code> plugin for RTL support</li>
                <li>• Enable <code className="px-1.5 py-0.5 rounded bg-muted text-foreground">darkMode: ["class"]</code> for theme switching</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">2. Provider Setup</h2>
          <p className="text-muted-foreground mb-4">
            Create a providers file to wrap your app with necessary context providers:
          </p>
          <CodeBlock code={providersSetup} language="tsx" />

          <div className="mt-4 mb-4">
            <h3 className="text-lg font-semibold mb-2">Update Root Layout</h3>
            <CodeBlock code={rootLayoutSetup} language="tsx" />
          </div>

          <Card className="border-yellow-500/50 bg-yellow-50 dark:bg-yellow-950/20">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                Important
              </h3>
              <p className="text-sm text-muted-foreground">
                The <code className="px-1.5 py-0.5 rounded bg-muted text-foreground">suppressHydrationWarning</code> prop on the HTML tag prevents hydration warnings when using theme and direction providers.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">3. CSS Variables</h2>
          <p className="text-muted-foreground mb-4">
            Add design token CSS variables to your global stylesheet:
          </p>
          <CodeBlock code={cssVariables} language="css" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">4. Environment Variables (Optional)</h2>
          <p className="text-muted-foreground mb-4">
            Configure default settings using environment variables:
          </p>
          <CodeBlock code={envConfig} language="bash" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Next Steps</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/documentation/quick-start">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Quick Start Guide</h3>
                  <p className="text-sm text-muted-foreground">
                    Start building your first component now that configuration is complete.
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Browse Components</h3>
                  <p className="text-sm text-muted-foreground">
                    Explore the full component library with examples and code snippets.
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
