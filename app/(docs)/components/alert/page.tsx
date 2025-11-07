'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Terminal, AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react'

const alertProps: PropDefinition[] = [
  {
    name: 'variant',
    type: '"default" | "destructive" | "success" | "warning"',
    default: '"default"',
    required: false,
    description: 'The visual style of the alert',
  },
]

const installCode = `npm install @rtl-design-system/core`

const basicUsageCode = `import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Terminal } from 'lucide-react'

<Alert>
  <Terminal className="h-4 w-4" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the cli.
  </AlertDescription>
</Alert>`

const destructiveCode = `<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Your session has expired. Please log in again.
  </AlertDescription>
</Alert>`

const successCode = `<Alert variant="success">
  <CheckCircle2 className="h-4 w-4" />
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>
    Your changes have been saved successfully.
  </AlertDescription>
</Alert>`

const warningCode = `<Alert variant="warning">
  <AlertTriangle className="h-4 w-4" />
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>
    Your free trial will expire in 3 days.
  </AlertDescription>
</Alert>`

const withoutIconCode = `<Alert>
  <AlertTitle>Update Available</AlertTitle>
  <AlertDescription>
    A new version of the application is available.
  </AlertDescription>
</Alert>`

export default function AlertPage() {
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
              <Link href="/components" className="hover:text-foreground transition-colors">
                Components
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">Alert</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Alert</h1>
          <p className="text-xl text-muted-foreground">
            Displays a callout for user attention. Available in multiple variants to indicate different types of information.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Preview</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <Alert className="w-full max-w-md">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                  You can add components to your app using the cli.
                </AlertDescription>
              </Alert>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Installation</h2>
          <CodeBlock code={installCode} language="bash" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Usage</h2>
          <CodeBlock code={basicUsageCode} language="tsx" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Examples</h2>

          <div className="space-y-8">
            {/* Default */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Default</h3>
              <Card>
                <CardContent className="p-6">
                  <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                      You can add components to your app using the cli.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={basicUsageCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Destructive */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Destructive</h3>
              <Card>
                <CardContent className="p-6">
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      Your session has expired. Please log in again.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={destructiveCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Success */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Success</h3>
              <Card>
                <CardContent className="p-6">
                  <Alert variant="success">
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>
                      Your changes have been saved successfully.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={successCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Warning */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Warning</h3>
              <Card>
                <CardContent className="p-6">
                  <Alert variant="warning">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Warning</AlertTitle>
                    <AlertDescription>
                      Your free trial will expire in 3 days.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={warningCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Without Icon */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Without Icon</h3>
              <Card>
                <CardContent className="p-6">
                  <Alert>
                    <AlertTitle>Update Available</AlertTitle>
                    <AlertDescription>
                      A new version of the application is available.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withoutIconCode} language="tsx" collapsible />
              </div>
            </div>
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Props</h2>
          <PropsTable props={alertProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Accessibility</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">ARIA Roles</h3>
                <p className="text-muted-foreground">
                  The Alert component uses <code className="px-1.5 py-0.5 rounded bg-muted">role=&quot;alert&quot;</code> to announce important messages to screen readers.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Semantic HTML</h3>
                <p className="text-muted-foreground">
                  Uses semantic heading elements for titles to maintain proper document structure.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Color Independence</h3>
                <p className="text-muted-foreground">
                  Icons and text provide information redundancy, not relying solely on color.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Support */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">RTL Support</h2>
          <p className="text-muted-foreground mb-6">
            The Alert component is fully RTL-compatible using logical properties.
          </p>
          <ComponentShowcase.Comparison ltrLabel="LTR (English)" rtlLabel="RTL (العربية)">
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>System Update</AlertTitle>
              <AlertDescription>
                A new system update is available.
              </AlertDescription>
            </Alert>
          </ComponentShowcase.Comparison>
        </section>

        {/* Related */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Related Components</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/toast">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Toast</h3>
                  <p className="text-sm text-muted-foreground">
                    Temporary notifications
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/dialog">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Dialog</h3>
                  <p className="text-sm text-muted-foreground">
                    Modal dialogs
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
