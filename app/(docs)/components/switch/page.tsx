'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getSwitchProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'checked',
    type: 'boolean',
    default: 'false',
    required: false,
    description: t.switchComponent.props.checked,
  },
  {
    name: 'defaultChecked',
    type: 'boolean',
    default: 'false',
    required: false,
    description: t.switchComponent.props.defaultChecked,
  },
  {
    name: 'onCheckedChange',
    type: '(checked: boolean) => void',
    default: 'undefined',
    required: false,
    description: t.switchComponent.props.onCheckedChange,
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    required: false,
    description: t.switchComponent.props.disabled,
  },
  {
    name: 'required',
    type: 'boolean',
    default: 'false',
    required: false,
    description: t.switchComponent.props.required,
  },
  {
    name: 'name',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.switchComponent.props.name,
  },
]

const installCode = `npm install noorui-rtl`

const basicUsageCode = `import { Switch } from 'noorui-rtl'
import { Label } from 'noorui-rtl'

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
  const { locale } = useDirection()
  const t = content[locale]
  const switchProps = getSwitchProps(t)

  const [checked, setChecked] = React.useState(false)

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
            <li className="text-foreground font-medium">{t.switchComponent.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.switchComponent.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.switchComponent.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.switchComponent.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="flex items-center gap-2">
                <Switch id="preview" />
                <Label htmlFor="preview">{t.switchComponent.labels.airplane}</Label>
              </div>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.switchComponent.installation}</h2>
          <CodeBlock code={installCode} language="bash" title="Terminal" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.switchComponent.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.switchComponent.examples.title}</h2>

          <div className="space-y-8">
            {/* With Label */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.switchComponent.examples.withLabel}</h3>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <Switch id="notifications" />
                    <Label htmlFor="notifications">{t.switchComponent.labels.notifications}</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="dark-mode" defaultChecked />
                    <Label htmlFor="dark-mode">{t.switchComponent.labels.darkMode}</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="auto-play" />
                    <Label htmlFor="auto-play">{t.switchComponent.labels.autoPlay}</Label>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withLabelCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Settings Panel */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.switchComponent.examples.settingsPanel}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="marketing">{t.switchComponent.labels.marketing}</Label>
                        <p className="text-sm text-muted-foreground">
                          {t.switchComponent.descriptions.marketingDesc}
                        </p>
                      </div>
                      <Switch id="marketing" />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="security">{t.switchComponent.sections.security}</Label>
                        <p className="text-sm text-muted-foreground">
                          {t.switchComponent.descriptions.securityDesc}
                        </p>
                      </div>
                      <Switch id="security" defaultChecked />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="updates">{t.switchComponent.sections.updates}</Label>
                        <p className="text-sm text-muted-foreground">
                          {t.switchComponent.descriptions.updatesDesc}
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
              <h3 className="text-lg font-semibold mb-4">{t.switchComponent.examples.disabledState}</h3>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <Switch id="enabled" defaultChecked />
                    <Label htmlFor="enabled">{t.switchComponent.labels.enabled}</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="disabled" disabled />
                    <Label htmlFor="disabled">{t.switchComponent.labels.disabledSwitchOff}</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="disabled-on" disabled defaultChecked />
                    <Label htmlFor="disabled-on">{t.switchComponent.labels.disabledSwitchOn}</Label>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={disabledCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Controlled */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.switchComponent.examples.controlled}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Switch id="controlled" checked={checked} onCheckedChange={setChecked} />
                      <Label htmlFor="controlled">{t.switchComponent.labels.notifications}</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Status: {checked ? t.switchComponent.status.on : t.switchComponent.status.off}
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
              <h3 className="text-lg font-semibold mb-4">{t.switchComponent.examples.inForms}</h3>
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
                      <h3 className="text-base font-semibold">{t.switchComponent.sections.privacySettings}</h3>

                      <div className="flex items-center gap-2">
                        <Switch id="profile-public" name="profilePublic" />
                        <Label htmlFor="profile-public">{t.switchComponent.labels.makeProfilePublic}</Label>
                      </div>

                      <div className="flex items-center gap-2">
                        <Switch id="show-email" name="showEmail" />
                        <Label htmlFor="show-email">{t.switchComponent.labels.showEmail}</Label>
                      </div>

                      <div className="flex items-center gap-2">
                        <Switch id="allow-messages" name="allowMessages" defaultChecked />
                        <Label htmlFor="allow-messages">{t.switchComponent.labels.allowMessages}</Label>
                      </div>
                    </div>

                    <Button type="submit">{t.switchComponent.buttons.saveSettings}</Button>
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.switchComponent.props.title}</h2>
          <PropsTable props={switchProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.switchComponent.accessibility.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t.switchComponent.accessibility.keyboardNavigation}</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">Tab</kbd>: {t.switchComponent.accessibility.keyboardTab}
                  </li>
                  <li>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">Space</kbd>: {t.switchComponent.accessibility.keyboardSpace}
                  </li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.switchComponent.accessibility.alwaysUseLabels}</h3>
                <p className="text-muted-foreground">
                  {t.switchComponent.accessibility.alwaysUseLabelsDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.switchComponent.accessibility.screenReaders}</h3>
                <p className="text-muted-foreground">
                  {t.switchComponent.accessibility.screenReadersDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.switchComponent.accessibility.visualFeedback}</h3>
                <p className="text-muted-foreground">
                  {t.switchComponent.accessibility.visualFeedbackDesc}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Considerations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.switchComponent.rtl.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                {t.switchComponent.rtl.description}
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
            </CardContent>
          </Card>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.switchComponent.related.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/checkbox">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.switchComponent.related.checkbox}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.switchComponent.related.checkboxDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/radio-group">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.switchComponent.related.radioGroup}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.switchComponent.related.radioGroupDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/label">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.switchComponent.related.label}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t.switchComponent.related.labelDesc}</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
