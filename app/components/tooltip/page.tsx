'use client'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { Info, Plus, Settings, Trash2 } from 'lucide-react'

export default function TooltipPage() {
  // Example code strings
  const setupCode = `// app/layout.tsx
import { TooltipProvider } from '@/components/ui/tooltip'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  )
}`

  const basicCode = `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Add to library</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`

  const sideCode = `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'

<TooltipProvider>
  <div className="flex gap-4">
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Top</Button>
      </TooltipTrigger>
      <TooltipContent side="top">
        <p>Tooltip on top</p>
      </TooltipContent>
    </Tooltip>

    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Bottom</Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>Tooltip on bottom</p>
      </TooltipContent>
    </Tooltip>

    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Left</Button>
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>Tooltip on left</p>
      </TooltipContent>
    </Tooltip>

    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Right</Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>Tooltip on right</p>
      </TooltipContent>
    </Tooltip>
  </div>
</TooltipProvider>`

  const iconCode = `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Info } from 'lucide-react'

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon">
        <Info className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>More information</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`

  const delayCode = `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'

<TooltipProvider delayDuration={100}>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Fast tooltip</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>This tooltip appears quickly</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Tooltip</h1>
        <p className="text-lg text-muted-foreground">
          A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.
        </p>
      </div>

      {/* Preview */}
      <ComponentShowcase
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add to library</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </ComponentShowcase>

      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <div className="bg-muted p-4 rounded-lg">
          <code className="text-sm">npx shadcn-ui@latest add tooltip</code>
        </div>
      </div>

      {/* Setup */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Setup</h2>
        <p className="text-muted-foreground">
          Wrap your app with <code className="text-sm bg-muted px-1 py-0.5 rounded">TooltipProvider</code> in your root layout:
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

        {/* Basic */}
        <ComponentShowcase
          title="Basic Tooltip"
          description="A simple tooltip that appears on hover."
          code={basicCode}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </ComponentShowcase>

        {/* Sides */}
        <ComponentShowcase
          title="Different Sides"
          description="Control which side the tooltip appears on."
          code={sideCode}
        >
          <TooltipProvider>
            <div className="flex gap-4 flex-wrap">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Top</Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Tooltip on top</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Bottom</Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Tooltip on bottom</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Left</Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Tooltip on left</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Right</Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Tooltip on right</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </ComponentShowcase>

        {/* Icon Buttons */}
        <ComponentShowcase
          title="With Icon Buttons"
          description="Tooltips work great with icon-only buttons."
          code={iconCode}
        >
          <TooltipProvider>
            <div className="flex gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>More information</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add item</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Settings</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </ComponentShowcase>

        {/* Custom Delay */}
        <ComponentShowcase
          title="Custom Delay"
          description="Control how quickly the tooltip appears."
          code={delayCode}
        >
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Fast tooltip (100ms)</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>This tooltip appears quickly</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </ComponentShowcase>
      </div>

      {/* API Reference */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>

        <div className="space-y-6">
          {/* TooltipProvider Props */}
          <div>
            <h3 className="text-lg font-semibold mb-3">TooltipProvider</h3>
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
                    <td className="px-4 py-2 font-mono">delayDuration</td>
                    <td className="px-4 py-2 font-mono text-xs">number</td>
                    <td className="px-4 py-2 font-mono">700</td>
                    <td className="px-4 py-2">Delay in ms before tooltip appears</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono">skipDelayDuration</td>
                    <td className="px-4 py-2 font-mono text-xs">number</td>
                    <td className="px-4 py-2 font-mono">300</td>
                    <td className="px-4 py-2">Skip delay when moving between triggers</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* TooltipContent Props */}
          <div>
            <h3 className="text-lg font-semibold mb-3">TooltipContent</h3>
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
                    <td className="px-4 py-2 font-mono">side</td>
                    <td className="px-4 py-2 font-mono text-xs">
                      &quot;top&quot; | &quot;right&quot; | &quot;bottom&quot; | &quot;left&quot;
                    </td>
                    <td className="px-4 py-2 font-mono">&quot;top&quot;</td>
                    <td className="px-4 py-2">Which side to display the tooltip</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono">sideOffset</td>
                    <td className="px-4 py-2 font-mono text-xs">number</td>
                    <td className="px-4 py-2 font-mono">4</td>
                    <td className="px-4 py-2">Distance from the trigger in pixels</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono">align</td>
                    <td className="px-4 py-2 font-mono text-xs">
                      &quot;start&quot; | &quot;center&quot; | &quot;end&quot;
                    </td>
                    <td className="px-4 py-2 font-mono">&quot;center&quot;</td>
                    <td className="px-4 py-2">Alignment relative to the trigger</td>
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
            <strong>Keyboard Navigation:</strong> Tooltip appears on focus and hover.
          </p>
          <p>
            <strong>Screen Readers:</strong> Tooltip content is announced when the trigger receives focus.
          </p>
          <p>
            <strong>ARIA:</strong> Uses <code>aria-describedby</code> to link the trigger to the tooltip content.
          </p>
          <p>
            <strong>Best Practice:</strong> Always use tooltips for supplementary information, not critical content.
          </p>
        </div>
      </div>

      {/* RTL Support */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">RTL Support</h2>
        <p className="text-muted-foreground mb-4">
          The Tooltip component automatically adapts to RTL layouts:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* LTR */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">LTR (Left-to-Right)</h3>
            <div dir="ltr">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Hover me</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This is a tooltip</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* RTL */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">RTL (Right-to-Left)</h3>
            <div dir="rtl">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">مرر فوقي</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>هذه تلميح</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        <div className="bg-muted p-4 rounded-lg mt-4">
          <p className="text-sm">
            <strong>Key RTL Features:</strong>
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
            <li>Tooltip positioning mirrors automatically (left ↔ right)</li>
            <li>Text alignment follows the direction</li>
            <li>Animations work correctly in both directions</li>
          </ul>
        </div>
      </div>

      {/* Related Components */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Related Components</h2>
        <div className="flex gap-2">
          <a
            href="/components/button"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Button
          </a>
        </div>
      </div>
    </div>
  )
}
