'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { Terminal, AlertCircle, CheckCircle2, AlertTriangle, Info } from 'lucide-react'

export default function AlertPage() {
  // Example code strings
  const basicCode = `import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Terminal } from 'lucide-react'

<Alert>
  <Terminal className="h-4 w-4" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the cli.
  </AlertDescription>
</Alert>`

  const destructiveCode = `import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Your session has expired. Please log in again.
  </AlertDescription>
</Alert>`

  const successCode = `import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2 } from 'lucide-react'

<Alert variant="success">
  <CheckCircle2 className="h-4 w-4" />
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>
    Your changes have been saved successfully.
  </AlertDescription>
</Alert>`

  const warningCode = `import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'

<Alert variant="warning">
  <AlertTriangle className="h-4 w-4" />
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>
    Your free trial will expire in 3 days.
  </AlertDescription>
</Alert>`

  const withoutIconCode = `import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

<Alert>
  <AlertTitle>Update Available</AlertTitle>
  <AlertDescription>
    A new version of the application is available. Please refresh to update.
  </AlertDescription>
</Alert>`

  const descriptionOnlyCode = `import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info } from 'lucide-react'

<Alert>
  <Info className="h-4 w-4" />
  <AlertDescription>
    This is a simple alert with just a description and an icon.
  </AlertDescription>
</Alert>`

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Alert</h1>
        <p className="text-lg text-muted-foreground">
          Displays a callout for user attention.
        </p>
      </div>

      {/* Preview */}
      <ComponentShowcase
      >
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components to your app using the cli.
          </AlertDescription>
        </Alert>
      </ComponentShowcase>

      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <div className="bg-muted p-4 rounded-lg">
          <code className="text-sm">npx shadcn-ui@latest add alert</code>
        </div>
      </div>

      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
          <pre className="text-sm">
            <code>{basicCode}</code>
          </pre>
        </div>
      </div>

      {/* Examples */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Examples</h2>

        {/* Default */}
        <ComponentShowcase
          title="Default"
          description="The default style for alerts."
          code={basicCode}
        >
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components to your app using the cli.
            </AlertDescription>
          </Alert>
        </ComponentShowcase>

        {/* Destructive */}
        <ComponentShowcase
          title="Destructive"
          description="Use for error messages and critical alerts."
          code={destructiveCode}
        >
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Your session has expired. Please log in again.
            </AlertDescription>
          </Alert>
        </ComponentShowcase>

        {/* Success */}
        <ComponentShowcase
          title="Success"
          description="Use for success messages and confirmations."
          code={successCode}
        >
          <Alert variant="success">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Your changes have been saved successfully.
            </AlertDescription>
          </Alert>
        </ComponentShowcase>

        {/* Warning */}
        <ComponentShowcase
          title="Warning"
          description="Use for warnings and cautions."
          code={warningCode}
        >
          <Alert variant="warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              Your free trial will expire in 3 days.
            </AlertDescription>
          </Alert>
        </ComponentShowcase>

        {/* Without Icon */}
        <ComponentShowcase
          title="Without Icon"
          description="An alert without an icon."
          code={withoutIconCode}
        >
          <Alert>
            <AlertTitle>Update Available</AlertTitle>
            <AlertDescription>
              A new version of the application is available. Please refresh to update.
            </AlertDescription>
          </Alert>
        </ComponentShowcase>

        {/* Description Only */}
        <ComponentShowcase
          title="Description Only"
          description="An alert with just a description."
          code={descriptionOnlyCode}
        >
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              This is a simple alert with just a description and an icon.
            </AlertDescription>
          </Alert>
        </ComponentShowcase>
      </div>

      {/* API Reference */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>

        <div className="space-y-6">
          {/* Alert Props */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Alert</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-2 text-start font-semibold">Prop</th>
                    <th className="px-4 py-2 text-start font-semibold">Type</th>
                    <th className="px-4 py-2 text-start font-semibold">Default</th>
                    <th className="px-4 py-2 text-start font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-4 py-2 font-mono">variant</td>
                    <td className="px-4 py-2 font-mono text-xs">
                      &quot;default&quot; | &quot;destructive&quot; | &quot;success&quot; | &quot;warning&quot;
                    </td>
                    <td className="px-4 py-2 font-mono">&quot;default&quot;</td>
                    <td className="px-4 py-2">The visual style of the alert</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* AlertTitle Props */}
          <div>
            <h3 className="text-lg font-semibold mb-3">AlertTitle</h3>
            <p className="text-sm text-muted-foreground">
              Extends standard HTML heading attributes. No additional props.
            </p>
          </div>

          {/* AlertDescription Props */}
          <div>
            <h3 className="text-lg font-semibold mb-3">AlertDescription</h3>
            <p className="text-sm text-muted-foreground">
              Extends standard HTML div attributes. No additional props.
            </p>
          </div>
        </div>
      </div>

      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Accessibility</h2>
        <div className="space-y-2 text-muted-foreground">
          <p>
            <strong>ARIA Roles:</strong> The Alert component uses <code>role=&quot;alert&quot;</code> to announce
            important messages to screen readers.
          </p>
          <p>
            <strong>Semantic HTML:</strong> Uses semantic heading elements for titles to maintain proper document structure.
          </p>
          <p>
            <strong>Color Independence:</strong> Icons and text provide information redundancy, not relying solely on color.
          </p>
          <p>
            <strong>Screen Readers:</strong> Alert content is automatically announced to screen reader users.
          </p>
        </div>
      </div>

      {/* RTL Support */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">RTL Support</h2>
        <p className="text-muted-foreground mb-4">
          The Alert component is fully RTL-compatible using logical properties:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* LTR */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">LTR (Left-to-Right)</h3>
            <div dir="ltr">
              <Alert>
                <Terminal className="h-4 w-4" />
                <AlertTitle>System Update</AlertTitle>
                <AlertDescription>
                  A new system update is available.
                </AlertDescription>
              </Alert>
            </div>
          </div>

          {/* RTL */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">RTL (Right-to-Left)</h3>
            <div dir="rtl">
              <Alert>
                <Terminal className="h-4 w-4" />
                <AlertTitle>تحديث النظام</AlertTitle>
                <AlertDescription>
                  يتوفر تحديث جديد للنظام.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </div>

        <div className="bg-muted p-4 rounded-lg mt-4">
          <p className="text-sm">
            <strong>Key RTL Features:</strong>
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
            <li>Icon automatically positions on the correct side (start)</li>
            <li>Content flows naturally in both directions</li>
            <li>Padding uses logical properties (ps/pe instead of pl/pr)</li>
          </ul>
        </div>
      </div>

      {/* Related Components */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Related Components</h2>
        <div className="flex gap-2">
          <a
            href="/components/toast"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Toast
          </a>
          <a
            href="/components/dialog"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Dialog
          </a>
        </div>
      </div>
    </div>
  )
}
