'use client'

import { Button } from '@/components/ui/button'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { useToast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'

export default function ToastPage() {
  const { toast } = useToast()

  // Example code strings
  const installCode = `npx shadcn-ui@latest add toast`

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

  const basicCode = `import { useToast } from '@/hooks/use-toast'
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

  const titleCode = `toast({
  title: 'Uh oh! Something went wrong.',
  description: 'There was a problem with your request.',
})`

  const actionCode = `import { ToastAction } from '@/components/ui/toast'

toast({
  title: 'Uh oh! Something went wrong.',
  description: 'There was a problem with your request.',
  action: <ToastAction altText="Try again">Try again</ToastAction>,
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

  return (
    <div className="space-y-8">
      <Toaster />

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Toast</h1>
        <p className="text-lg text-muted-foreground">
          A succinct message that is displayed temporarily.
        </p>
      </div>

      {/* Preview */}
      <ComponentShowcase
      >
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
      </ComponentShowcase>

      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <div className="bg-muted p-4 rounded-lg">
          <code className="text-sm">{installCode}</code>
        </div>
      </div>

      {/* Setup */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Setup</h2>
        <p className="text-muted-foreground">
          Add the <code className="text-sm bg-muted px-1 py-0.5 rounded">Toaster</code> component to your root layout:
        </p>
        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
          <pre className="text-sm">
            <code>{setupCode}</code>
          </pre>
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

        {/* Simple */}
        <ComponentShowcase
          title="Simple"
          description="A simple toast with just a description."
          code={simpleCode}
        >
          <Button
            onClick={() => {
              toast({
                description: 'Your message has been sent.',
              })
            }}
          >
            Show Simple Toast
          </Button>
        </ComponentShowcase>

        {/* With Title */}
        <ComponentShowcase
          title="With Title"
          description="A toast with a title and description."
          code={titleCode}
        >
          <Button
            onClick={() => {
              toast({
                title: 'Uh oh! Something went wrong.',
                description: 'There was a problem with your request.',
              })
            }}
          >
            Show Toast
          </Button>
        </ComponentShowcase>

        {/* With Action */}
        <ComponentShowcase
          title="With Action"
          description="A toast with an action button."
          code={actionCode}
        >
          <Button
            onClick={() => {
              toast({
                title: 'Uh oh! Something went wrong.',
                description: 'There was a problem with your request.',
                action: (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => console.log('Retry clicked')}
                  >
                    Try again
                  </Button>
                ),
              })
            }}
          >
            Show Toast
          </Button>
        </ComponentShowcase>

        {/* Destructive */}
        <ComponentShowcase
          title="Destructive"
          description="A toast for errors and critical messages."
          code={destructiveCode}
        >
          <Button
            onClick={() => {
              toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'There was a problem with your request.',
              })
            }}
          >
            Show Destructive Toast
          </Button>
        </ComponentShowcase>

        {/* Success */}
        <ComponentShowcase
          title="Success"
          description="A toast for success messages."
          code={successCode}
        >
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
        </ComponentShowcase>
      </div>

      {/* API Reference */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>

        <div className="space-y-6">
          {/* toast() function */}
          <div>
            <h3 className="text-lg font-semibold mb-3">toast()</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-2 text-start font-semibold">Property</th>
                    <th className="px-4 py-2 text-start font-semibold">Type</th>
                    <th className="px-4 py-2 text-start font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-4 py-2 font-mono">title</td>
                    <td className="px-4 py-2 font-mono text-xs">ReactNode</td>
                    <td className="px-4 py-2">The title of the toast</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono">description</td>
                    <td className="px-4 py-2 font-mono text-xs">ReactNode</td>
                    <td className="px-4 py-2">The description/message of the toast</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono">action</td>
                    <td className="px-4 py-2 font-mono text-xs">ToastActionElement</td>
                    <td className="px-4 py-2">An action button for the toast</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono">variant</td>
                    <td className="px-4 py-2 font-mono text-xs">
                      &quot;default&quot; | &quot;destructive&quot; | &quot;success&quot;
                    </td>
                    <td className="px-4 py-2">The visual style of the toast</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Accessibility</h2>
        <div className="space-y-2 text-muted-foreground">
          <p>
            <strong>ARIA Roles:</strong> The Toast component uses <code>role=&quot;status&quot;</code> to
            announce non-critical messages to screen readers.
          </p>
          <p>
            <strong>Keyboard Navigation:</strong> Close button is keyboard accessible and can be activated with Enter or Space.
          </p>
          <p>
            <strong>Auto-dismiss:</strong> Toasts automatically dismiss after a timeout, but users can dismiss them manually.
          </p>
          <p>
            <strong>Focus Management:</strong> Toasts don&apos;t steal focus from the current element.
          </p>
        </div>
      </div>

      {/* RTL Support */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">RTL Support</h2>
        <p className="text-muted-foreground mb-4">
          The Toast component is fully RTL-compatible using logical properties:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* LTR */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">LTR (Left-to-Right)</h3>
            <div dir="ltr">
              <Button
                onClick={() => {
                  toast({
                    title: 'Message sent',
                    description: 'Your message was sent successfully.',
                  })
                }}
              >
                Show Toast (LTR)
              </Button>
            </div>
          </div>

          {/* RTL */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">RTL (Right-to-Left)</h3>
            <div dir="rtl">
              <Button
                onClick={() => {
                  toast({
                    title: 'تم إرسال الرسالة',
                    description: 'تم إرسال رسالتك بنجاح.',
                  })
                }}
              >
                عرض الإشعار (RTL)
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-muted p-4 rounded-lg mt-4">
          <p className="text-sm">
            <strong>Key RTL Features:</strong>
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
            <li>Toast appears from the correct corner (bottom-start)</li>
            <li>Close button positions on the correct side (end)</li>
            <li>Swipe gestures work in the natural direction</li>
            <li>Content flows naturally in both directions</li>
          </ul>
        </div>
      </div>

      {/* Related Components */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Related Components</h2>
        <div className="flex gap-2">
          <a
            href="/components/alert"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Alert
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
