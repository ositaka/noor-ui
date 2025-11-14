'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { useToast } from '@/hooks/use-toast'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getToastProps = (locale: 'en' | 'ar'): PropDefinition[] => [
  {
    name: 'title',
    type: 'ReactNode',
    default: 'undefined',
    required: false,
    description: content[locale].toastComponent.props.title,
  },
  {
    name: 'description',
    type: 'ReactNode',
    default: 'undefined',
    required: false,
    description: content[locale].toastComponent.props.description,
  },
  {
    name: 'variant',
    type: '"default" | "destructive" | "success"',
    default: '"default"',
    required: false,
    description: content[locale].toastComponent.props.variant,
  },
  {
    name: 'action',
    type: 'ToastActionElement',
    default: 'undefined',
    required: false,
    description: content[locale].toastComponent.props.action,
  },
]

const installCode = `npm install noorui-rtl`

const setupCode = `// app/layout.tsx
import { Toaster } from '@/components/ui/toaster'

export default function RootLayout({ children }) {
  const { locale } = useDirection()
  const t = content[locale]
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
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

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
  const { locale } = useDirection()
  const t = content[locale]
  const tc = content[locale].toastComponent
  const { toast } = useToast()

  return (
    <div className="min-h-screen">

      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-12">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {t.common.home}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/components" className="hover:text-foreground transition-colors">
                {t.nav.components}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">{tc.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{tc.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {tc.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <Button
                onClick={() => {
                  toast({
                    title: tc.messages.scheduled,
                    description: tc.messages.scheduledDesc,
                  })
                }}
              >
                {tc.buttons.showToast}
              </Button>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.installation}</h2>
          <CodeBlock code={installCode} language="bash" />
        </section>

        {/* Setup */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{tc.setup}</h2>
          <p className="text-muted-foreground mb-4">
            {tc.setupDesc}
          </p>
          <CodeBlock code={setupCode} language="tsx" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.examples}</h2>

          <div className="space-y-8">
            {/* Simple */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{tc.examples.simple}</h3>
              <Card>
                <CardContent className="p-6">
                  <Button
                    onClick={() => {
                      toast({
                        description: tc.messages.messageSent,
                      })
                    }}
                  >
                    {tc.buttons.showSimpleToast}
                  </Button>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={simpleCode} language="tsx" collapsible />
              </div>
            </div>

            {/* With Title */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{tc.examples.withTitle}</h3>
              <Card>
                <CardContent className="p-6">
                  <Button
                    onClick={() => {
                      toast({
                        title: tc.messages.scheduled,
                        description: tc.messages.scheduledDesc,
                      })
                    }}
                  >
                    {tc.buttons.showToast}
                  </Button>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={basicUsageCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Destructive */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{tc.examples.destructive}</h3>
              <Card>
                <CardContent className="p-6">
                  <Button
                    variant="destructive"
                    onClick={() => {
                      toast({
                        variant: 'destructive',
                        title: tc.messages.errorTitle,
                        description: tc.messages.errorDesc,
                      })
                    }}
                  >
                    {tc.buttons.showErrorToast}
                  </Button>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={destructiveCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Success */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{tc.examples.success}</h3>
              <Card>
                <CardContent className="p-6">
                  <Button
                    onClick={() => {
                      toast({
                        variant: 'success',
                        title: tc.messages.successTitle,
                        description: tc.messages.successDesc,
                      })
                    }}
                  >
                    {tc.buttons.showSuccessToast}
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">{tc.rtl.exampleTitle}</h2>
          <p className="text-muted-foreground mb-6">
            {tc.rtl.exampleDesc}
          </p>
          <ComponentShowcase.Comparison ltrLabel={tc.rtl.ltr} rtlLabel={tc.rtl.rtlLabel}>
            <Button
              onClick={() => {
                toast({
                  title: tc.messages.messageTitle,
                  description: tc.messages.messageDesc,
                })
              }}
            >
              {tc.rtl.showNotification}
            </Button>
          </ComponentShowcase.Comparison>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.props}</h2>
          <PropsTable props={getToastProps(locale)} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.accessibility}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{tc.accessibility.ariaRoles}</h3>
                <p className="text-muted-foreground">
                  {tc.accessibility.ariaRolesDesc}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{tc.accessibility.keyboardNavigation}</h3>
                <p className="text-muted-foreground">
                  {tc.accessibility.keyboardNavigationDesc}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{tc.accessibility.focusManagement}</h3>
                <p className="text-muted-foreground">
                  {tc.accessibility.focusManagementDesc}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Support */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.rtlConsiderations}</h2>
          <p className="text-muted-foreground mb-6">
            {tc.rtl.description}
          </p>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-semibold mb-2">{tc.rtl.features.title}</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>{tc.rtl.features.cornerPosition}</li>
                <li>{tc.rtl.features.closeButton}</li>
                <li>{tc.rtl.features.swipeGestures}</li>
                <li>{tc.rtl.features.contentFlow}</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Related */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{tc.related.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/alert">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{tc.related.alert}</h3>
                  <p className="text-sm text-muted-foreground">
                    {tc.related.alertDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/dialog">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{tc.related.dialog}</h3>
                  <p className="text-sm text-muted-foreground">
                    {tc.related.dialogDesc}
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
