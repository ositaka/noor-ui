import { Metadata } from 'next'
import {
  ComponentName,
  ComponentNameHeader,
  ComponentNameTitle,
  ComponentNameDescription,
  ComponentNameContent,
  ComponentNameFooter,
} from '@/components/ui/component-name'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const metadata: Metadata = {
  title: 'ComponentName - RTL Design System',
  description: 'Brief description of what this component does and its primary use cases.',
}

export default function ComponentNamePage() {
  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">ComponentName</h1>
        <p className="text-lg text-muted-foreground">
          One-sentence description of the component and its purpose.
        </p>
      </div>

      {/* Preview Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Preview</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center p-8">
              {/* Interactive Demo - Show the component in action */}
              <ComponentName>
                <ComponentNameHeader>
                  <ComponentNameTitle>مثال على العنوان</ComponentNameTitle>
                  <ComponentNameDescription>
                    وصف قصير بالعربية لتوضيح المحتوى
                  </ComponentNameDescription>
                </ComponentNameHeader>
                <ComponentNameContent>
                  <p>محتوى المكون هنا</p>
                </ComponentNameContent>
                <ComponentNameFooter>
                  <Button>إجراء</Button>
                </ComponentNameFooter>
              </ComponentName>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Installation Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
        <Tabs defaultValue="cli" dir="ltr">
          <TabsList>
            <TabsTrigger value="cli">CLI</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
          </TabsList>
          <TabsContent value="cli" className="space-y-4">
            <p className="text-muted-foreground">
              Install the component using our CLI tool:
            </p>
            <div className="rounded-lg bg-muted p-4">
              <code className="text-sm">npx rtl-design-system add component-name</code>
            </div>
          </TabsContent>
          <TabsContent value="manual" className="space-y-4">
            <p className="text-muted-foreground">
              Copy and paste the component code into your project:
            </p>
            <div className="rounded-lg bg-muted p-4">
              <code className="text-sm whitespace-pre">
{`// components/ui/component-name.tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

const ComponentName = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-lg border bg-card", className)}
    {...props}
  />
))
ComponentName.displayName = "ComponentName"

export { ComponentName }`}
              </code>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Usage Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
        <div className="rounded-lg bg-muted p-4">
          <code className="text-sm whitespace-pre">
{`import { ComponentName } from '@/components/ui/component-name'

export default function Example() {
  return (
    <ComponentName>
      Your content here
    </ComponentName>
  )
}`}
          </code>
        </div>
      </section>

      {/* Examples Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>

        {/* Example 1: Default */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Default</h3>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center p-8">
                <ComponentName>
                  <ComponentNameContent>
                    <p>المحتوى الافتراضي</p>
                  </ComponentNameContent>
                </ComponentName>
              </div>
            </CardContent>
          </Card>
          <div className="rounded-lg bg-muted p-4">
            <code className="text-sm whitespace-pre">
{`<ComponentName>
  <ComponentNameContent>
    <p>المحتوى الافتراضي</p>
  </ComponentNameContent>
</ComponentName>`}
            </code>
          </div>
        </div>

        {/* Example 2: With Variants */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Variants</h3>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 p-8">
                <ComponentName variant="default">
                  <ComponentNameContent>متغير افتراضي</ComponentNameContent>
                </ComponentName>
                <ComponentName variant="secondary">
                  <ComponentNameContent>متغير ثانوي</ComponentNameContent>
                </ComponentName>
                <ComponentName variant="outline">
                  <ComponentNameContent>متغير محدد</ComponentNameContent>
                </ComponentName>
              </div>
            </CardContent>
          </Card>
          <div className="rounded-lg bg-muted p-4">
            <code className="text-sm whitespace-pre">
{`<ComponentName variant="default">
  <ComponentNameContent>متغير افتراضي</ComponentNameContent>
</ComponentName>

<ComponentName variant="secondary">
  <ComponentNameContent>متغير ثانوي</ComponentNameContent>
</ComponentName>

<ComponentName variant="outline">
  <ComponentNameContent>متغير محدد</ComponentNameContent>
</ComponentName>`}
            </code>
          </div>
        </div>

        {/* Example 3: Complex Composition */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Full Composition</h3>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center p-8">
                <ComponentName>
                  <ComponentNameHeader>
                    <ComponentNameTitle>نموذج تسجيل الدخول</ComponentNameTitle>
                    <ComponentNameDescription>
                      أدخل بياناتك للوصول إلى حسابك
                    </ComponentNameDescription>
                  </ComponentNameHeader>
                  <ComponentNameContent>
                    <div className="space-y-4">
                      <p>محتوى المكون الكامل مع جميع العناصر</p>
                    </div>
                  </ComponentNameContent>
                  <ComponentNameFooter>
                    <Button className="w-full">دخول</Button>
                  </ComponentNameFooter>
                </ComponentName>
              </div>
            </CardContent>
          </Card>
          <div className="rounded-lg bg-muted p-4">
            <code className="text-sm whitespace-pre">
{`<ComponentName>
  <ComponentNameHeader>
    <ComponentNameTitle>نموذج تسجيل الدخول</ComponentNameTitle>
    <ComponentNameDescription>
      أدخل بياناتك للوصول إلى حسابك
    </ComponentNameDescription>
  </ComponentNameHeader>
  <ComponentNameContent>
    {/* Your form or content */}
  </ComponentNameContent>
  <ComponentNameFooter>
    <Button className="w-full">دخول</Button>
  </ComponentNameFooter>
</ComponentName>`}
            </code>
          </div>
        </div>
      </section>

      {/* Props Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Props</h2>

        <div className="space-y-6">
          {/* Main Component Props */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">ComponentName</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-start p-2 font-semibold">Prop</th>
                    <th className="text-start p-2 font-semibold">Type</th>
                    <th className="text-start p-2 font-semibold">Default</th>
                    <th className="text-start p-2 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2 font-mono">variant</td>
                    <td className="p-2 font-mono text-xs">
                      &quot;default&quot; | &quot;secondary&quot; | &quot;outline&quot;
                    </td>
                    <td className="p-2 font-mono text-xs">&quot;default&quot;</td>
                    <td className="p-2">Visual variant of the component</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-mono">size</td>
                    <td className="p-2 font-mono text-xs">
                      &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;
                    </td>
                    <td className="p-2 font-mono text-xs">&quot;md&quot;</td>
                    <td className="p-2">Size of the component</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-mono">className</td>
                    <td className="p-2 font-mono text-xs">string</td>
                    <td className="p-2 font-mono text-xs">-</td>
                    <td className="p-2">Additional CSS classes</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-mono">asChild</td>
                    <td className="p-2 font-mono text-xs">boolean</td>
                    <td className="p-2 font-mono text-xs">false</td>
                    <td className="p-2">Merge props with child element</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Sub-Component Props (if applicable) */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">ComponentNameHeader / Title / Description / Content / Footer</h3>
            <p className="text-sm text-muted-foreground">
              All sub-components accept standard HTML div/heading/p attributes and can be styled with className.
            </p>
          </div>
        </div>
      </section>

      {/* Accessibility Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Accessibility</h2>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Keyboard Navigation</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ms-4">
                <li><kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">Tab</kbd> - Focus next interactive element</li>
                <li><kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">Shift + Tab</kbd> - Focus previous element</li>
                <li><kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">Enter/Space</kbd> - Activate focused element</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">ARIA Attributes</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ms-4">
                <li><code>aria-label</code> - Add descriptive labels for screen readers</li>
                <li><code>aria-describedby</code> - Link to helper text or descriptions</li>
                <li><code>role</code> - Proper semantic roles are automatically applied</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Screen Reader Support</h3>
              <p className="text-sm text-muted-foreground">
                This component is fully compatible with screen readers including NVDA, JAWS, and VoiceOver.
                All interactive elements are properly announced with context.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* RTL Considerations */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">RTL Considerations</h2>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <p className="text-sm text-muted-foreground">
              This component is fully RTL-compatible and automatically adjusts for right-to-left languages.
            </p>
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">RTL Features:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ms-4">
                <li>Layout direction automatically reverses in RTL mode</li>
                <li>Spacing uses logical properties (margin-start, padding-end, etc.)</li>
                <li>Icons and interactive elements mirror appropriately</li>
                <li>Text alignment follows natural direction</li>
                <li>Focus indicators respect directional flow</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Best Practices:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ms-4">
                <li>Use the component without modifications - RTL is built-in</li>
                <li>If customizing with className, use logical properties (ms-, me-, ps-, pe-)</li>
                <li>Test with real Arabic/Hebrew content, not placeholder text</li>
                <li>Icons that indicate direction should be mirrored (use transform scale)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Related Components */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Related Components</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:bg-accent transition-colors">
            <CardContent className="pt-6">
              <a href="/components/button" className="space-y-2 block">
                <h3 className="font-semibold">Button</h3>
                <p className="text-sm text-muted-foreground">
                  Interactive button for actions
                </p>
              </a>
            </CardContent>
          </Card>
          <Card className="hover:bg-accent transition-colors">
            <CardContent className="pt-6">
              <a href="/components/dialog" className="space-y-2 block">
                <h3 className="font-semibold">Dialog</h3>
                <p className="text-sm text-muted-foreground">
                  Modal dialog for important messages
                </p>
              </a>
            </CardContent>
          </Card>
          <Card className="hover:bg-accent transition-colors">
            <CardContent className="pt-6">
              <a href="/components/form" className="space-y-2 block">
                <h3 className="font-semibold">Form</h3>
                <p className="text-sm text-muted-foreground">
                  Form components with validation
                </p>
              </a>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

/**
 * DOCUMENTATION CHECKLIST:
 *
 * ✅ All sections included:
 *    - Header with title and description
 *    - Preview with interactive demo
 *    - Installation (CLI + Manual)
 *    - Usage example
 *    - Multiple examples (minimum 3 variants)
 *    - Props table
 *    - Accessibility notes
 *    - RTL considerations
 *    - Related components
 *
 * ✅ Real Arabic content (not Lorem Ipsum)
 * ✅ Interactive demos in preview cards
 * ✅ Code examples with proper imports
 * ✅ Proper metadata for SEO
 * ✅ Responsive layout
 *
 * REMEMBER TO:
 * 1. Replace "ComponentName" with actual component name (PascalCase)
 * 2. Replace "component-name" with kebab-case version
 * 3. Update all imports to match actual component exports
 * 4. Add component to /app/components/page.tsx
 * 5. Add component to /lib/search-data.ts
 * 6. Use real Arabic content that makes sense for the component
 * 7. Test all examples actually work
 * 8. Test in both LTR and RTL modes
 * 9. Test on mobile viewport
 */
