'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { User, Bell } from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getTabsProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'defaultValue',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.tabsComponent.props.defaultValue,
  },
  {
    name: 'value',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.tabsComponent.props.value,
  },
  {
    name: 'onValueChange',
    type: '(value: string) => void',
    default: 'undefined',
    required: false,
    description: t.tabsComponent.props.onValueChange,
  },
]

const installCode = `npm install noorui-rtl`

const basicUsageCode = `import { Tabs, TabsContent, TabsList, TabsTrigger } from 'noorui-rtl'

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
  const { locale } = useDirection()
  const t = content[locale]
  const tabsProps = getTabsProps(t)
  const [activeTab, setActiveTab] = React.useState('account')

  return (
    <div className="min-h-screen">

      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
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
            <li className="text-foreground font-medium">{t.tabsComponent.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.tabsComponent.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.tabsComponent.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.tabsComponent.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <Tabs defaultValue="account" className="w-full max-w-md">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="account">{t.tabsComponent.demo.account}</TabsTrigger>
                <TabsTrigger value="password">{t.tabsComponent.demo.password}</TabsTrigger>
                <TabsTrigger value="settings">{t.tabsComponent.demo.settings}</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground">
                      {t.tabsComponent.demo.accountDesc}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="password" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground">
                      {t.tabsComponent.demo.passwordDesc}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="settings" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground">
                      {t.tabsComponent.demo.settingsDesc}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        <Separator className="my-12" />

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t.tabsComponent.installation}</h2>
          <CodeBlock code={installCode} language="bash" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t.tabsComponent.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.tabsComponent.examples.title}</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.tabsComponent.examples.withIcons}</h3>
              <ComponentShowcase>
                <Tabs defaultValue="profile" className="w-full max-w-md">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="profile" className="gap-2">
                      <User className="h-4 w-4" />
                      {t.tabsComponent.demo.profile}
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="gap-2">
                      <Bell className="h-4 w-4" />
                      {t.tabsComponent.demo.notifications}
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="profile" className="mt-4">
                    <Card>
                      <CardContent className="p-6">
                        <p className="text-sm text-muted-foreground">{t.tabsComponent.demo.profileDesc}</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="notifications" className="mt-4">
                    <Card>
                      <CardContent className="p-6">
                        <p className="text-sm text-muted-foreground">{t.tabsComponent.demo.notificationsDesc}</p>
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
                  <p className="text-sm text-muted-foreground">{t.tabsComponent.demo.activeTab} {activeTab}</p>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="account">{t.tabsComponent.demo.account}</TabsTrigger>
                      <TabsTrigger value="password">{t.tabsComponent.demo.password}</TabsTrigger>
                      <TabsTrigger value="settings">{t.tabsComponent.demo.settings}</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account" className="mt-4">
                      <Card>
                        <CardContent className="p-6">
                          <p className="text-sm text-muted-foreground">{t.tabsComponent.demo.accountTabContent}</p>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="password" className="mt-4">
                      <Card>
                        <CardContent className="p-6">
                          <p className="text-sm text-muted-foreground">{t.tabsComponent.demo.passwordTabContent}</p>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="settings" className="mt-4">
                      <Card>
                        <CardContent className="p-6">
                          <p className="text-sm text-muted-foreground">{t.tabsComponent.demo.settingsTabContent}</p>
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
            {t.tabsComponent.rtlExampleDesc}
          </p>
          <ComponentShowcase.Comparison ltrLabel="LTR (English)" rtlLabel="RTL (العربية)">
            <Tabs defaultValue="overview" className="w-full max-w-md">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">{t.tabsComponent.demo.overview}</TabsTrigger>
                <TabsTrigger value="analytics">{t.tabsComponent.demo.analytics}</TabsTrigger>
                <TabsTrigger value="reports">{t.tabsComponent.demo.reports}</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground">
                      {t.tabsComponent.demo.overviewDesc}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="analytics" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground">
                      {t.tabsComponent.demo.analyticsDesc}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reports" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground">
                      {t.tabsComponent.demo.reportsDesc}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </ComponentShowcase.Comparison>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t.tabsComponent.props.title}</h2>
          <PropsTable props={tabsProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t.tabsComponent.accessibility.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t.tabsComponent.accessibilityDetails.keyboard}</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li><kbd dir="ltr" className="px-1.5 py-0.5 rounded bg-muted">Tab</kbd> - {t.tabsComponent.accessibilityDetails.tab}</li>
                  <li><kbd dir="ltr" className="px-1.5 py-0.5 rounded bg-muted">Arrow Keys</kbd> - {t.tabsComponent.accessibilityDetails.arrowKeys}</li>
                  <li><kbd dir="ltr" className="px-1.5 py-0.5 rounded bg-muted">Home</kbd> - {t.tabsComponent.accessibilityDetails.home}</li>
                  <li><kbd dir="ltr" className="px-1.5 py-0.5 rounded bg-muted">End</kbd> - {t.tabsComponent.accessibilityDetails.end}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t.tabsComponent.accessibilityDetails.ariaAttributes}</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>{t.tabsComponent.accessibilityDetails.roleTablist}</li>
                  <li>{t.tabsComponent.accessibilityDetails.roleTab}</li>
                  <li>{t.tabsComponent.accessibilityDetails.roleTabpanel}</li>
                  <li>{t.tabsComponent.accessibilityDetails.ariaSelected}</li>
                  <li>{t.tabsComponent.accessibilityDetails.ariaControls}</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Support */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t.tabsComponent.rtl.title}</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                {t.tabsComponent.rtl.description}
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>{t.tabsComponent.rtlDetails.tabListLayout}</li>
                <li>{t.tabsComponent.rtlDetails.arrowKeyNav}</li>
                <li>{t.tabsComponent.rtlDetails.focusIndicators}</li>
                <li>{t.tabsComponent.rtlDetails.iconsMirror}</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t.tabsComponent.related.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/accordion">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t.tabsComponent.related.accordion}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.tabsComponent.related.accordionDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/card">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t.tabsComponent.related.card}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.tabsComponent.related.cardDesc}
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
