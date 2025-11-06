import { Metadata } from 'next'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const metadata: Metadata = {
  title: 'Skeleton - RTL Design System',
  description: 'Animated loading placeholder component for better user experience during content loading.',
}

export default function SkeletonPage() {
  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Skeleton</h1>
        <p className="text-lg text-muted-foreground">
          Display placeholder content while data is loading to improve perceived performance.
        </p>
      </div>

      {/* Preview Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Preview</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-full max-w-sm" />
                <Skeleton className="h-4 w-3/4 max-w-xs" />
              </div>
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
              <code className="text-sm">npx rtl-design-system add skeleton</code>
            </div>
          </TabsContent>
          <TabsContent value="manual" className="space-y-4">
            <p className="text-muted-foreground">
              Copy and paste the component code into your project:
            </p>
            <div className="rounded-lg bg-muted p-4">
              <code className="text-sm whitespace-pre">
{`// components/ui/skeleton.tsx
import { cn } from "@/lib/utils"

const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }`}
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
{`import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return <Skeleton className="h-4 w-full" />
}`}
          </code>
        </div>
      </section>

      {/* Examples Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>

        {/* Example 1: Card Skeleton */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Card Skeleton</h3>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <Skeleton className="h-48 w-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="rounded-lg bg-muted p-4">
            <code className="text-sm whitespace-pre">
{`<Card>
  <CardContent className="pt-6">
    <div className="space-y-4">
      <Skeleton className="h-48 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  </CardContent>
</Card>`}
            </code>
          </div>
        </div>

        {/* Example 2: Profile Skeleton */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Profile Skeleton</h3>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4 space-x-reverse">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="rounded-lg bg-muted p-4">
            <code className="text-sm whitespace-pre">
{`<div className="flex items-center space-x-4 space-x-reverse">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2 flex-1">
    <Skeleton className="h-4 w-32" />
    <Skeleton className="h-3 w-24" />
  </div>
</div>`}
            </code>
          </div>
        </div>

        {/* Example 3: List Skeleton */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">List Skeleton</h3>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center space-x-4 space-x-reverse">
                    <Skeleton className="h-10 w-10 rounded" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="rounded-lg bg-muted p-4">
            <code className="text-sm whitespace-pre">
{`<div className="space-y-4">
  {[1, 2, 3].map((i) => (
    <div key={i} className="flex items-center space-x-4 space-x-reverse">
      <Skeleton className="h-10 w-10 rounded" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  ))}
</div>`}
            </code>
          </div>
        </div>

        {/* Example 4: Table Skeleton */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Table Skeleton</h3>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <Skeleton className="h-10 w-full" />
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="rounded-lg bg-muted p-4">
            <code className="text-sm whitespace-pre">
{`<div className="space-y-3">
  <Skeleton className="h-10 w-full" />
  {[1, 2, 3, 4].map((i) => (
    <Skeleton key={i} className="h-16 w-full" />
  ))}
</div>`}
            </code>
          </div>
        </div>

        {/* Example 5: Dashboard Skeleton */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Dashboard Grid Skeleton</h3>
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="rounded-lg bg-muted p-4">
            <code className="text-sm whitespace-pre">
{`<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
  {[1, 2, 3, 4].map((i) => (
    <div key={i} className="space-y-2">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-3 w-16" />
    </div>
  ))}
</div>`}
            </code>
          </div>
        </div>
      </section>

      {/* Props Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Props</h2>
        <Card>
          <CardContent className="pt-6">
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
                    <td className="p-2 font-mono text-xs">className</td>
                    <td className="p-2 font-mono text-xs">string</td>
                    <td className="p-2 font-mono text-xs">-</td>
                    <td className="p-2">Additional CSS classes for size and shape</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              The Skeleton component accepts all standard HTML div attributes.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Best Practices */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Best Practices</h2>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">When to Use</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ms-4">
                <li>Loading initial page content</li>
                <li>Fetching data from an API</li>
                <li>Loading images or media</li>
                <li>Processing user actions</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Design Tips</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ms-4">
                <li>Match skeleton shapes to actual content dimensions</li>
                <li>Use multiple skeletons to represent complex layouts</li>
                <li>Keep skeleton patterns simple and recognizable</li>
                <li>Combine with cards to show content boundaries</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Common Dimensions</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ms-4">
                <li><code className="text-xs bg-muted px-1 py-0.5 rounded">h-4</code> - Text line (16px)</li>
                <li><code className="text-xs bg-muted px-1 py-0.5 rounded">h-8</code> - Button/Input (32px)</li>
                <li><code className="text-xs bg-muted px-1 py-0.5 rounded">h-12</code> - Avatar (48px)</li>
                <li><code className="text-xs bg-muted px-1 py-0.5 rounded">h-48</code> - Image/Card (192px)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Accessibility Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Accessibility</h2>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <p className="text-sm text-muted-foreground">
              Skeleton components improve perceived performance but should be used thoughtfully:
            </p>
            <div className="space-y-2">
              <h3 className="font-semibold">Recommendations</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ms-4">
                <li>Add <code className="text-xs bg-muted px-1 py-0.5 rounded">aria-busy="true"</code> to container during loading</li>
                <li>Use <code className="text-xs bg-muted px-1 py-0.5 rounded">aria-live="polite"</code> to announce when content loads</li>
                <li>Provide loading text for screen readers: <code className="text-xs bg-muted px-1 py-0.5 rounded">aria-label="Loading content"</code></li>
                <li>Don't rely solely on visual loading indicators</li>
              </ul>
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
              The Skeleton component is fully RTL-compatible.
            </p>
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">RTL Features:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ms-4">
                <li>Layout automatically mirrors in RTL mode</li>
                <li>Use <code className="text-xs bg-muted px-1 py-0.5 rounded">space-x-reverse</code> for horizontal spacing in RTL</li>
                <li>Skeleton shapes remain the same in both directions</li>
                <li>Animation direction adapts automatically</li>
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
              <a href="/components/card" className="space-y-2 block">
                <h3 className="font-semibold">Card</h3>
                <p className="text-sm text-muted-foreground">
                  Container for grouping content
                </p>
              </a>
            </CardContent>
          </Card>
          <Card className="hover:bg-accent transition-colors">
            <CardContent className="pt-6">
              <a href="/components/progress" className="space-y-2 block">
                <h3 className="font-semibold">Progress</h3>
                <p className="text-sm text-muted-foreground">
                  Progress bar for determinate loading
                </p>
              </a>
            </CardContent>
          </Card>
          <Card className="hover:bg-accent transition-colors">
            <CardContent className="pt-6">
              <a href="/components/avatar" className="space-y-2 block">
                <h3 className="font-semibold">Avatar</h3>
                <p className="text-sm text-muted-foreground">
                  User avatar component
                </p>
              </a>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
