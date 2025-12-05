'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Terminal, AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getAlertProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'variant',
    type: '"default" | "destructive" | "success" | "warning"',
    default: '"default"',
    required: false,
    description: t.alertComponent.props.variant,
  },
]

const installCode = `npm install noorui-rtl`

const basicUsageCode = `import { Alert, AlertDescription, AlertTitle } from 'noorui-rtl'
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
  const { locale } = useDirection()
  const t = content[locale]
  const alertProps = getAlertProps(t)

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
            <li className="text-foreground font-medium">{t.alertComponent.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.alertComponent.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.alertComponent.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.alertComponent.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <Alert className="w-full max-w-md">
                <Terminal className="h-4 w-4" />
                <AlertTitle>{t.alertComponent.demo.headsUp}</AlertTitle>
                <AlertDescription>
                  {t.alertComponent.demo.headsUpDesc}
                </AlertDescription>
              </Alert>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.alertComponent.installation}</h2>
          <CodeBlock code={installCode} language="bash" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.alertComponent.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.alertComponent.examples.title}</h2>

          <div className="space-y-8">
            {/* Default */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Default</h3>
              <Card>
                <CardContent className="p-6">
                  <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>{t.alertComponent.demo.headsUp}</AlertTitle>
                    <AlertDescription>
                      {t.alertComponent.demo.headsUpDesc}
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
                    <AlertTitle>{t.alertComponent.demo.error}</AlertTitle>
                    <AlertDescription>
                      {t.alertComponent.demo.errorDesc}
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
                    <AlertTitle>{t.alertComponent.demo.success}</AlertTitle>
                    <AlertDescription>
                      {t.alertComponent.demo.successDesc}
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
                    <AlertTitle>{t.alertComponent.demo.warning}</AlertTitle>
                    <AlertDescription>
                      {t.alertComponent.demo.warningDesc}
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
                    <AlertTitle>{t.alertComponent.demo.updateAvailable}</AlertTitle>
                    <AlertDescription>
                      {t.alertComponent.demo.updateDesc}
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.alertComponent.props.title}</h2>
          <PropsTable props={alertProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.alertComponent.accessibility.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t.alertComponent.accessibilityDetails.ariaRoles}</h3>
                <p className="text-muted-foreground">
                  {t.alertComponent.accessibilityDetails.ariaRolesDesc}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t.alertComponent.accessibilityDetails.semanticHtml}</h3>
                <p className="text-muted-foreground">
                  {t.alertComponent.accessibilityDetails.semanticHtmlDesc}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t.alertComponent.accessibilityDetails.colorIndependence}</h3>
                <p className="text-muted-foreground">
                  {t.alertComponent.accessibilityDetails.colorIndependenceDesc}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Support */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.alertComponent.rtl.title}</h2>
          <p className="text-muted-foreground mb-6">
            {t.alertComponent.rtlDetails.description}
          </p>
          <ComponentShowcase.Comparison ltrLabel="LTR (English)" rtlLabel="RTL (العربية)">
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>{t.alertComponent.demo.systemUpdate}</AlertTitle>
              <AlertDescription>
                {t.alertComponent.demo.systemUpdateDesc}
              </AlertDescription>
            </Alert>
          </ComponentShowcase.Comparison>
        </section>

        {/* Related */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.alertComponent.related.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/toast">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t.alertComponent.related.toast}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.alertComponent.related.toastDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/dialog">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t.alertComponent.related.dialog}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.alertComponent.related.dialogDesc}
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
