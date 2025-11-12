'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { useToast } from '@/hooks/use-toast'
const toastProps: PropDefinition[] = [
  {
    name: 'title',
    type: 'ReactNode',
    default: 'undefined',
    required: false,
    description: 'The title of the toast',
  },
  {
    name: 'description',
    type: 'ReactNode',
    default: 'undefined',
    required: false,
    description: 'The description/message of the toast',
  },
  {
    name: 'variant',
    type: '"default" | "destructive" | "success"',
    default: '"default"',
    required: false,
    description: 'The visual style of the toast',
  },
  {
    name: 'action',
    type: 'ToastActionElement',
    default: 'undefined',
    required: false,
    description: 'An action button for the toast',
  },
]

const installCode = `npm install @noorui/components`

const setupCode = `// app/layout.tsx
import { Toaster } from '@/components/ui/toaster'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}`

const basicUsageCode = `import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'

function MyComponent() {
  const { toast } = useToast()

  return (
    <Button
      onClick={() => {
        toast({
          title: 'Scheduled: Catch up',
          description: 'Friday, February 10, 2023 at 5:57 PM',
        })
      }}
    >
      Show Toast
    </Button>
  )
}`

const simpleCode = `toast({
  description: 'Your message has been sent.',
})`

const destructiveCode = `toast({
  variant: 'destructive',
  title: 'Uh oh! Something went wrong.',
  description: 'There was a problem with your request.',
})`

const successCode = `toast({
  variant: 'success',
  title: 'Success!',
  description: 'Your changes have been saved.',
})`

export default function ToastPage() {
  const { toast } = useToast()

  return (
    <div className="min-h-screen">

      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-12">
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
            <li className="text-foreground font-medium">Toast</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Toast</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            A succinct message that is displayed temporarily. Perfect for notifications and feedback messages.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Preview</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <Button
                onClick={() => {
                  toast({
                    title: 'Scheduled: Catch up',
                    description: 'Friday, February 10, 2023 at 5:57 PM',
                  })
                }}
              >
                Show Toast
              </Button>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Installation</h2>
          <CodeBlock code={installCode} language="bash" />
        </section>

        {/* Setup */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Setup</h2>
          <p className="text-muted-foreground mb-4">
            Add the Toaster component to your root layout:
          </p>
          <CodeBlock code={setupCode} language="tsx" />
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
            {/* Simple */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Simple</h3>
              <Card>
                <CardContent className="p-6">
                  <Button
                    onClick={() => {
                      toast({
                        description: 'Your message has been sent.',
                      })
                    }}
                  >
                    Show Simple Toast
                  </Button>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={simpleCode} language="tsx" collapsible />
              </div>
            </div>

            {/* With Title */}
            <div>
              <h3 className="text-lg font-semibold mb-4">With Title</h3>
              <Card>
                <CardContent className="p-6">
                  <Button
                    onClick={() => {
                      toast({
                        title: 'Scheduled: Catch up',
                        description: 'Friday, February 10, 2023 at 5:57 PM',
                      })
                    }}
                  >
                    Show Toast
                  </Button>
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
                  <Button
                    variant="destructive"
                    onClick={() => {
                      toast({
                        variant: 'destructive',
                        title: 'Uh oh! Something went wrong.',
                        description: 'There was a problem with your request.',
                      })
                    }}
                  >
                    Show Error Toast
                  </Button>
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
                  <Button
                    onClick={() => {
                      toast({
                        variant: 'success',
                        title: 'Success!',
                        description: 'Your changes have been saved.',
                      })
                    }}
                  >
                    Show Success Toast
                  </Button>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={successCode} language="tsx" collapsible />
              </div>
            </div>
          </div>
        </section>

        {/* RTL Support Example */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">RTL Support Example</h2>
          <p className="text-muted-foreground mb-6">
            The Toast component automatically adapts to RTL layouts. Toasts appear from the correct corner and content flows naturally.
          </p>
          <ComponentShowcase.Comparison ltrLabel="LTR (English)" rtlLabel="RTL (العربية)">
            <Button
              onClick={() => {
                toast({
                  title: 'Message sent',
                  description: 'Your message has been delivered successfully.',
                })
              }}
            >
              Show Notification
            </Button>
          </ComponentShowcase.Comparison>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Props</h2>
          <PropsTable props={toastProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Accessibility</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">ARIA Roles</h3>
                <p className="text-muted-foreground">
                  Uses <code className="px-1.5 py-0.5 rounded bg-muted">role=&quot;status&quot;</code> to announce non-critical messages to screen readers.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Keyboard Navigation</h3>
                <p className="text-muted-foreground">
                  Close button is keyboard accessible and can be activated with Enter or Space.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Focus Management</h3>
                <p className="text-muted-foreground">
                  Toasts don&apos;t steal focus from the current element.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Support */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">RTL Support</h2>
          <p className="text-muted-foreground mb-6">
            The Toast component is fully RTL-compatible. Toasts appear from the correct corner and content flows naturally.
          </p>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-semibold mb-2">Key RTL Features:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Toast appears from the correct corner (bottom-start)</li>
                <li>Close button positions on the correct side (end)</li>
                <li>Swipe gestures work in the natural direction</li>
                <li>Content flows naturally in both directions</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Related */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Related Components</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/alert">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Alert</h3>
                  <p className="text-sm text-muted-foreground">
                    Important messages
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
