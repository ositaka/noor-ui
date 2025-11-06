'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Card, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
const switchProps: PropDefinition[] = [
  {
    name: 'checked',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'The controlled checked state of the switch',
  },
  {
    name: 'defaultChecked',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'The default checked state (uncontrolled)',
  },
  {
    name: 'onCheckedChange',
    type: '(checked: boolean) => void',
    default: 'undefined',
    required: false,
    description: 'Event handler called when the checked state changes',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Disables the switch',
  },
  {
    name: 'required',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Marks the switch as required',
  },
  {
    name: 'name',
    type: 'string',
    default: 'undefined',
    required: false,
    description: 'The name of the switch for form submission',
  },
]

const installCode = `npm install @rtl-design-system/core`

const basicUsageCode = `import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

<div className="flex items-center gap-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>`

const withLabelCode = `<div className="flex items-center gap-2">
  <Switch id="notifications" />
  <Label htmlFor="notifications">Enable notifications</Label>
</div>`

const settingsCode = `<div className="space-y-4">
  <div className="flex items-center justify-between">
    <div className="space-y-0.5">
      <Label htmlFor="marketing">Marketing emails</Label>
      <p className="text-sm text-muted-foreground">
        Receive emails about new products and features
      </p>
    </div>
    <Switch id="marketing" />
  </div>

  <Separator />

  <div className="flex items-center justify-between">
    <div className="space-y-0.5">
      <Label htmlFor="security">Security emails</Label>
      <p className="text-sm text-muted-foreground">
        Receive emails about your account security
      </p>
    </div>
    <Switch id="security" defaultChecked />
  </div>

  <Separator />

  <div className="flex items-center justify-between">
    <div className="space-y-0.5">
      <Label htmlFor="updates">Product updates</Label>
      <p className="text-sm text-muted-foreground">
        Receive emails about product updates and announcements
      </p>
    </div>
    <Switch id="updates" />
  </div>
</div>`

const disabledCode = `<div className="space-y-3">
  <div className="flex items-center gap-2">
    <Switch id="enabled" defaultChecked />
    <Label htmlFor="enabled">Enabled switch</Label>
  </div>
  <div className="flex items-center gap-2">
    <Switch id="disabled" disabled />
    <Label htmlFor="disabled">Disabled switch (off)</Label>
  </div>
  <div className="flex items-center gap-2">
    <Switch id="disabled-on" disabled defaultChecked />
    <Label htmlFor="disabled-on">Disabled switch (on)</Label>
  </div>
</div>`

const controlledCode = `const [checked, setChecked] = React.useState(false)

return (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <Switch
        id="controlled"
        checked={checked}
        onCheckedChange={setChecked}
      />
      <Label htmlFor="controlled">Controlled switch</Label>
    </div>
    <p className="text-sm text-muted-foreground">
      Status: {checked ? 'On' : 'Off'}
    </p>
    <Button size="sm" onClick={() => setChecked(!checked)}>
      Toggle
    </Button>
  </div>
)`

const formCode = `<form className="space-y-6">
  <div className="space-y-4">
    <h3 className="text-base font-semibold">Privacy Settings</h3>

    <div className="flex items-center gap-2">
      <Switch id="profile-public" name="profilePublic" />
      <Label htmlFor="profile-public">Make profile public</Label>
    </div>

    <div className="flex items-center gap-2">
      <Switch id="show-email" name="showEmail" />
      <Label htmlFor="show-email">Show email address</Label>
    </div>

    <div className="flex items-center gap-2">
      <Switch id="allow-messages" name="allowMessages" defaultChecked />
      <Label htmlFor="allow-messages">Allow direct messages</Label>
    </div>
  </div>

  <Button type="submit">Save Settings</Button>
</form>`

const rtlCode = `// RTL support is automatic!
// Switch thumb animation adapts for RTL direction

<div className="flex items-center gap-2">
  <Switch id="rtl-switch" />
  <Label htmlFor="rtl-switch">تفعيل الإشعارات</Label>
</div>`

export default function SwitchPage() {
  const [checked, setChecked] = React.useState(false)

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
            <li className="text-foreground font-medium">Switch</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Switch</h1>
          <p className="text-xl text-muted-foreground">
            Toggle switch for on/off states. Perfect for settings and preferences with full keyboard
            navigation and RTL support.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Preview</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="flex items-center gap-2">
                <Switch id="preview" />
                <Label htmlFor="preview">Airplane Mode</Label>
              </div>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Installation</h2>
          <CodeBlock code={installCode} language="bash" title="Terminal" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Usage</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Examples</h2>

          <div className="space-y-8">
            {/* With Label */}
            <div>
              <h3 className="text-lg font-semibold mb-4">With Label</h3>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <Switch id="notifications" />
                    <Label htmlFor="notifications">Enable notifications</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="dark-mode" defaultChecked />
                    <Label htmlFor="dark-mode">Dark mode</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="auto-play" />
                    <Label htmlFor="auto-play">Auto-play videos</Label>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withLabelCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Settings Panel */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Settings Panel</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="marketing">Marketing emails</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive emails about new products and features
                        </p>
                      </div>
                      <Switch id="marketing" />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="security">Security emails</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive emails about your account security
                        </p>
                      </div>
                      <Switch id="security" defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="updates">Product updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive emails about product updates and announcements
                        </p>
                      </div>
                      <Switch id="updates" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={settingsCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Disabled State */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Disabled State</h3>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <Switch id="enabled" defaultChecked />
                    <Label htmlFor="enabled">Enabled switch</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="disabled" disabled />
                    <Label htmlFor="disabled">Disabled switch (off)</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="disabled-on" disabled defaultChecked />
                    <Label htmlFor="disabled-on">Disabled switch (on)</Label>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={disabledCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Controlled */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Controlled Component</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Switch id="controlled" checked={checked} onCheckedChange={setChecked} />
                      <Label htmlFor="controlled">Controlled switch</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Status: {checked ? 'On' : 'Off'}
                    </p>
                    <Button size="sm" onClick={() => setChecked(!checked)}>
                      Toggle
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={controlledCode} language="tsx" collapsible />
              </div>
            </div>

            {/* In Forms */}
            <div>
              <h3 className="text-lg font-semibold mb-4">In Forms</h3>
              <Card>
                <CardContent className="p-6">
                  <form
                    className="space-y-6"
                    onSubmit={(e) => {
                      e.preventDefault()
                      alert('Form submitted!')
                    }}
                  >
                    <div className="space-y-4">
                      <h3 className="text-base font-semibold">Privacy Settings</h3>

                      <div className="flex items-center gap-2">
                        <Switch id="profile-public" name="profilePublic" />
                        <Label htmlFor="profile-public">Make profile public</Label>
                      </div>

                      <div className="flex items-center gap-2">
                        <Switch id="show-email" name="showEmail" />
                        <Label htmlFor="show-email">Show email address</Label>
                      </div>

                      <div className="flex items-center gap-2">
                        <Switch id="allow-messages" name="allowMessages" defaultChecked />
                        <Label htmlFor="allow-messages">Allow direct messages</Label>
                      </div>
                    </div>

                    <Button type="submit">Save Settings</Button>
                  </form>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={formCode} language="tsx" collapsible />
              </div>
            </div>
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Props</h2>
          <PropsTable props={switchProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Accessibility</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Keyboard Navigation</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">Tab</kbd>: Move focus to/from
                    switch
                  </li>
                  <li>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">Space</kbd>: Toggle switch state
                  </li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Always Use Labels</h3>
                <p className="text-muted-foreground">
                  Always pair switches with labels using the{' '}
                  <code className="bg-muted px-1 rounded">htmlFor</code> and{' '}
                  <code className="bg-muted px-1 rounded">id</code> attributes. Clicking the label
                  toggles the switch.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Screen Readers</h3>
                <p className="text-muted-foreground">
                  The switch role is automatically announced. Screen readers will say something like
                  &quot;Airplane Mode, switch, off&quot; or &quot;Airplane Mode, switch, on&quot;.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">When to Use Switch vs Checkbox</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Use Switch:</strong> For settings that take immediate effect (e.g.,
                      &quot;Enable dark mode&quot;)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Use Checkbox:</strong> For selections that require confirmation (e.g.,
                      form submissions)
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Considerations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">RTL Considerations</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                Switches automatically support RTL layout. The thumb animation direction is mirrored
                for right-to-left languages, maintaining the natural flow.
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">LTR (English)</h4>
                  <div dir="ltr">
                    <div className="space-y-3 p-4 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Switch id="ltr-1" />
                        <Label htmlFor="ltr-1">Notifications</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch id="ltr-2" defaultChecked />
                        <Label htmlFor="ltr-2">Dark Mode</Label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">RTL (العربية)</h4>
                  <div dir="rtl">
                    <div className="space-y-3 p-4 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Switch id="rtl-1" />
                        <Label htmlFor="rtl-1">الإشعارات</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch id="rtl-2" defaultChecked />
                        <Label htmlFor="rtl-2">الوضع الداكن</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Related Components</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/checkbox">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Checkbox</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    For form selections
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/radio-group">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Radio Group</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Mutually exclusive options
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/label">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Label</h3>
                  <p className="text-sm text-muted-foreground mt-1">Labels for form inputs</p>
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
