'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Sparkles, User, Settings, Bell } from 'lucide-react'

const tabsProps: PropDefinition[] = [
  {
    name: 'defaultValue',
    type: 'string',
    default: 'undefined',
    required: false,
    description: 'The value of the tab that should be active when initially rendered',
  },
  {
    name: 'value',
    type: 'string',
    default: 'undefined',
    required: false,
    description: 'The controlled value of the active tab',
  },
  {
    name: 'onValueChange',
    type: '(value: string) => void',
    default: 'undefined',
    required: false,
    description: 'Callback when the active tab changes',
  },
]

const installCode = `npm install @rtl-design-system/core`

const basicUsageCode = `import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

<Tabs defaultValue="account" className="w-full">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    Make changes to your account here.
  </TabsContent>
  <TabsContent value="password">
    Change your password here.
  </TabsContent>
</Tabs>`

const withIconsCode = `import { User, Settings } from 'lucide-react'

<Tabs defaultValue="profile">
  <TabsList>
    <TabsTrigger value="profile" className="gap-2">
      <User className="h-4 w-4" />
      Profile
    </TabsTrigger>
    <TabsTrigger value="settings" className="gap-2">
      <Settings className="h-4 w-4" />
      Settings
    </TabsTrigger>
  </TabsList>
  <TabsContent value="profile">Profile content</TabsContent>
  <TabsContent value="settings">Settings content</TabsContent>
</Tabs>`

const controlledCode = `const [activeTab, setActiveTab] = React.useState('overview')

<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="reports">Reports</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="analytics">Analytics content</TabsContent>
  <TabsContent value="reports">Reports content</TabsContent>
</Tabs>`

export default function TabsPage() {
  const [activeTab, setActiveTab] = React.useState('account')

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main id="main-content" className="flex-1 container py-12">
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
            <li className="text-foreground font-medium">Tabs</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Tabs</h1>
          <p className="text-lg text-muted-foreground">
            A set of layered sections of content, displayed one at a time, with keyboard navigation support.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Preview</h2>
          <ComponentShowcase>
            <Tabs defaultValue="account" className="w-full max-w-md">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground">
                      Make changes to your account here. Click save when you&apos;re done.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="password" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground">
                      Change your password here. After saving, you&apos;ll be logged out.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="settings" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground">
                      Manage your account settings and preferences.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </ComponentShowcase>
        </section>

        <Separator className="my-12" />

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Installation</h2>
          <CodeBlock code={installCode} language="bash" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Usage</h2>
          <CodeBlock code={basicUsageCode} language="tsx" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Examples</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">With Icons</h3>
              <ComponentShowcase>
                <Tabs defaultValue="profile" className="w-full max-w-md">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="profile" className="gap-2">
                      <User className="h-4 w-4" />
                      Profile
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="gap-2">
                      <Bell className="h-4 w-4" />
                      Notifications
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="profile" className="mt-4">
                    <Card>
                      <CardContent className="p-6">
                        <p className="text-sm text-muted-foreground">Your profile information</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="notifications" className="mt-4">
                    <Card>
                      <CardContent className="p-6">
                        <p className="text-sm text-muted-foreground">Your notifications settings</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </ComponentShowcase>
              <CodeBlock code={withIconsCode} language="tsx" />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Controlled</h3>
              <ComponentShowcase>
                <div className="space-y-4 w-full max-w-md">
                  <p className="text-sm text-muted-foreground">Active tab: {activeTab}</p>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="account">Account</TabsTrigger>
                      <TabsTrigger value="password">Password</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account" className="mt-4">
                      <Card>
                        <CardContent className="p-6">
                          <p className="text-sm text-muted-foreground">Account tab content</p>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="password" className="mt-4">
                      <Card>
                        <CardContent className="p-6">
                          <p className="text-sm text-muted-foreground">Password tab content</p>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="settings" className="mt-4">
                      <Card>
                        <CardContent className="p-6">
                          <p className="text-sm text-muted-foreground">Settings tab content</p>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </ComponentShowcase>
              <CodeBlock code={controlledCode} language="tsx" />
            </div>
          </div>
        </section>

        {/* RTL Support Example */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">RTL Support Example</h2>
          <p className="text-muted-foreground mb-6">
            The Tabs component automatically adapts to RTL layouts. Tab order and arrow key navigation follow the reading direction.
          </p>
          <ComponentShowcase.Comparison ltrLabel="LTR (English)" rtlLabel="RTL (العربية)">
            <Tabs defaultValue="overview" className="w-full max-w-md">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground">
                      View your account overview and summary information.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="analytics" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground">
                      Analyze your usage patterns and trends.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reports" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground">
                      Generate and download detailed reports.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </ComponentShowcase.Comparison>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Props</h2>
          <PropsTable props={tabsProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Accessibility</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Keyboard Navigation</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Tab</kbd> - Move focus to the active tab</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Arrow Keys</kbd> - Navigate between tabs</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Home</kbd> - Move to first tab</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">End</kbd> - Move to last tab</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">ARIA Attributes</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>role=&quot;tablist&quot; on the tabs list container</li>
                  <li>role=&quot;tab&quot; on each tab trigger</li>
                  <li>role=&quot;tabpanel&quot; on each tab content panel</li>
                  <li>aria-selected indicates the active tab</li>
                  <li>aria-controls links tab to its panel</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Support */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">RTL Support</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                The Tabs component is fully RTL-compatible. Arrow key navigation automatically adapts to the current text direction.
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Tab list layout respects text direction</li>
                <li>Arrow key navigation follows reading direction</li>
                <li>Focus indicators position correctly</li>
                <li>Icons in tabs mirror appropriately if needed</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Related Components</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/accordion">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Accordion</h3>
                  <p className="text-sm text-muted-foreground">
                    Vertically stacked collapsible sections
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/card">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Card</h3>
                  <p className="text-sm text-muted-foreground">
                    Container for tab content
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
