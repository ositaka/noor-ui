'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { CodeBlock } from '@/components/docs/code-block'
import { Zap, Rocket, Code2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const simpleButtonCode = `import { Button } from '@noorui/components/components'

export default function MyPage() {
  return (
    <Button>Click me</Button>
  )
}`

const cardExampleCode = `import { Card, CardContent, CardHeader, CardTitle } from '@noorui/components/components'

export default function MyPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This card works in both LTR and RTL!</p>
      </CardContent>
    </Card>
  )
}`

const formExampleCode = `'use client'

import { Button } from '@noorui/components/components'
import { Input } from '@noorui/components/components'
import { Label } from '@noorui/components/components'
import { useState } from 'react'

export default function LoginForm() {
  const [email, setEmail] = useState('')

  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>
      <Button type="submit">Sign In</Button>
    </form>
  )
}`

const directionToggleCode = `'use client'

import { useDirection } from '@noorui/components/hooks'
import { Button } from '@noorui/components/components'

export default function MyComponent() {
  const { direction, setDirection } = useDirection()

  const toggleDirection = () => {
    setDirection(direction === 'ltr' ? 'rtl' : 'ltr')
  }

  return (
    <div>
      <p>Current: {direction.toUpperCase()}</p>
      <Button onClick={toggleDirection}>
        Switch to {direction === 'ltr' ? 'RTL' : 'LTR'}
      </Button>
    </div>
  )
}`

const fullPageExampleCode = `import { Button } from '@noorui/components/components'
import { Card, CardContent, CardHeader, CardTitle } from '@noorui/components/components'

export default function DashboardPage() {
  return (
    <main className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1,234</p>
            <p className="text-sm text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$45,678</p>
            <p className="text-sm text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">23</p>
            <p className="text-sm text-muted-foreground">3 completed this week</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Button>View All Analytics</Button>
      </div>
    </main>
  )
}`

export default function QuickStartPage() {
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
            <li>
              <Link href="/documentation" className="hover:text-foreground transition-colors">
                Documentation
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">Quick Start</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">Quick Start</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Start building with Noor UI in under 5 minutes. This guide will get you from zero to your first component.
          </p>
        </div>

        {/* Your First Button */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Your First Component</h2>
          <p className="text-muted-foreground mb-4">
            Let&apos;s start with the simplest component - a Button:
          </p>
          <CodeBlock code={simpleButtonCode} language="tsx" />

          <div className="mt-6 p-6 border rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground mb-4">Preview:</p>
            <Button>Click me</Button>
          </div>
        </section>

        {/* Card Component */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Building a Card</h2>
          <p className="text-muted-foreground mb-4">
            Cards are perfect for displaying grouped content:
          </p>
          <CodeBlock code={cardExampleCode} language="tsx" />

          <div className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Rocket className="h-5 w-5 text-green-600" />
                  <p className="text-sm">
                    This card automatically adjusts padding, borders, and shadows for both LTR and RTL layouts!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Form Example */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Creating Forms</h2>
          <p className="text-muted-foreground mb-4">
            Combine multiple components to create interactive forms:
          </p>
          <CodeBlock code={formExampleCode} language="tsx" />

          <Card className="mt-6 border-blue-500/50 bg-blue-50 dark:bg-blue-950/20">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Code2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Note
              </h3>
              <p className="text-sm text-muted-foreground">
                Form components automatically handle RTL text input direction and placeholder alignment.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Direction Toggle */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Working with Direction</h2>
          <p className="text-muted-foreground mb-4">
            Add direction switching to your components using the <code className="px-1.5 py-0.5 rounded bg-muted text-foreground">useDirection</code> hook:
          </p>
          <CodeBlock code={directionToggleCode} language="tsx" />
        </section>

        {/* Full Page Example */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Complete Page Example</h2>
          <p className="text-muted-foreground mb-4">
            Here&apos;s a complete dashboard page using multiple components:
          </p>
          <CodeBlock code={fullPageExampleCode} language="tsx" />
        </section>

        {/* Next Steps */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">What&apos;s Next?</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Link href="/components">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Explore Components</h3>
                  <p className="text-sm text-muted-foreground">
                    Browse the complete component library with live examples.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/documentation/rtl">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">RTL Guidelines</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn RTL best practices and patterns.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/tokens">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Design Tokens</h3>
                  <p className="text-sm text-muted-foreground">
                    Customize colors, spacing, and typography.
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
