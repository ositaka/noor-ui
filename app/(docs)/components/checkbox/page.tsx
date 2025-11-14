'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getCheckboxProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'checked',
    type: "boolean | 'indeterminate'",
    default: 'false',
    required: false,
    description: t.checkboxComponent.props.checked,
  },
  {
    name: 'defaultChecked',
    type: 'boolean',
    default: 'false',
    required: false,
    description: t.checkboxComponent.props.defaultChecked,
  },
  {
    name: 'onCheckedChange',
    type: '(checked: boolean | "indeterminate") => void',
    default: 'undefined',
    required: false,
    description: t.checkboxComponent.props.onCheckedChange,
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    required: false,
    description: t.checkboxComponent.props.disabled,
  },
  {
    name: 'required',
    type: 'boolean',
    default: 'false',
    required: false,
    description: t.checkboxComponent.props.required,
  },
  {
    name: 'name',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.checkboxComponent.props.name,
  },
  {
    name: 'value',
    type: 'string',
    default: 'on',
    required: false,
    description: t.checkboxComponent.props.value,
  },
]

const installCode = `npm install noorui-rtl`

const basicUsageCode = `import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>`

const withLabelCode = `<div className="flex items-center gap-2">
  <Checkbox id="marketing" />
  <Label htmlFor="marketing">
    Send me marketing emails
  </Label>
</div>`

const indeterminateCode = `const [checkedItems, setCheckedItems] = React.useState({
  item1: false,
  item2: false,
  item3: false,
})

const allChecked = Object.values(checkedItems).every(Boolean)
const someChecked = Object.values(checkedItems).some(Boolean)
const indeterminate = someChecked && !allChecked

return (
  <div className="space-y-3">
    <div className="flex items-center gap-2">
      <Checkbox
        id="all"
        checked={allChecked ? true : indeterminate ? 'indeterminate' : false}
        onCheckedChange={(checked) => {
          const newValue = checked === true
          setCheckedItems({
            item1: newValue,
            item2: newValue,
            item3: newValue,
          })
        }}
      />
      <Label htmlFor="all" className="font-semibold">
        Select All
      </Label>
    </div>
    <Separator />
    <div className="space-y-2 ps-6">
      <div className="flex items-center gap-2">
        <Checkbox
          id="item1"
          checked={checkedItems.item1}
          onCheckedChange={(checked) =>
            setCheckedItems({ ...checkedItems, item1: checked === true })
          }
        />
        <Label htmlFor="item1">Item 1</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id="item2"
          checked={checkedItems.item2}
          onCheckedChange={(checked) =>
            setCheckedItems({ ...checkedItems, item2: checked === true })
          }
        />
        <Label htmlFor="item2">Item 2</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id="item3"
          checked={checkedItems.item3}
          onCheckedChange={(checked) =>
            setCheckedItems({ ...checkedItems, item3: checked === true })
          }
        />
        <Label htmlFor="item3">Item 3</Label>
      </div>
    </div>
  </div>
)`

const disabledCode = `<div className="space-y-2">
  <div className="flex items-center gap-2">
    <Checkbox id="disabled" disabled />
    <Label htmlFor="disabled">Disabled checkbox</Label>
  </div>
  <div className="flex items-center gap-2">
    <Checkbox id="disabled-checked" disabled checked />
    <Label htmlFor="disabled-checked">Disabled and checked</Label>
  </div>
</div>`

const controlledCode = `const [checked, setChecked] = React.useState(false)

return (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <Checkbox
        id="controlled"
        checked={checked}
        onCheckedChange={(value) => setChecked(value === true)}
      />
      <Label htmlFor="controlled">Controlled checkbox</Label>
    </div>
    <p className="text-sm text-muted-foreground">
      Status: {checked ? 'Checked' : 'Unchecked'}
    </p>
    <Button size="sm" onClick={() => setChecked(!checked)}>
      Toggle
    </Button>
  </div>
)`

const formCode = `<form className="space-y-4">
  <div className="space-y-3">
    <div className="flex items-center gap-2">
      <Checkbox id="newsletter" name="newsletter" value="yes" />
      <Label htmlFor="newsletter">Subscribe to newsletter</Label>
    </div>
    <div className="flex items-center gap-2">
      <Checkbox id="updates" name="updates" value="yes" />
      <Label htmlFor="updates">Receive product updates</Label>
    </div>
    <div className="flex items-center gap-2">
      <Checkbox id="terms" name="terms" value="yes" required />
      <Label htmlFor="terms">
        I agree to the terms and conditions <span className="text-destructive">*</span>
      </Label>
    </div>
  </div>
  <Button type="submit">Submit</Button>
</form>`

const rtlCode = `// RTL support is automatic!
// Checkboxes and labels align correctly in RTL

<div className="flex items-center gap-2">
  <Checkbox id="rtl-example" />
  <Label htmlFor="rtl-example">أوافق على الشروط والأحكام</Label>
</div>`

export default function CheckboxPage() {
  const { locale } = useDirection()
  const t = content[locale]
  const checkboxProps = getCheckboxProps(t)

  const [checked, setChecked] = React.useState(false)
  const [checkedItems, setCheckedItems] = React.useState({
    item1: false,
    item2: false,
    item3: false,
  })

  const allChecked = Object.values(checkedItems).every(Boolean)
  const someChecked = Object.values(checkedItems).some(Boolean)
  const indeterminate = someChecked && !allChecked

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
            <li className="text-foreground font-medium">{t.checkboxComponent.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.checkboxComponent.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.checkboxComponent.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.checkboxComponent.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="flex items-center gap-2">
                <Checkbox id="preview" />
                <Label htmlFor="preview">Accept terms and conditions</Label>
              </div>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.checkboxComponent.installation}</h2>
          <CodeBlock code={installCode} language="bash" title="Terminal" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.checkboxComponent.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.checkboxComponent.examples.title}</h2>

          <div className="space-y-8">
            {/* With Label */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.checkboxComponent.examples.withLabel}</h3>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <Checkbox id="marketing" />
                    <Label htmlFor="marketing">Send me marketing emails</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="analytics" />
                    <Label htmlFor="analytics">Share analytics data</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="social" />
                    <Label htmlFor="social">Allow social media integration</Label>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withLabelCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Indeterminate State */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.checkboxComponent.examples.indeterminateState}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="all"
                        checked={allChecked ? true : indeterminate ? 'indeterminate' : false}
                        onCheckedChange={(checked) => {
                          const newValue = checked === true
                          setCheckedItems({
                            item1: newValue,
                            item2: newValue,
                            item3: newValue,
                          })
                        }}
                      />
                      <Label htmlFor="all" className="font-semibold">
                        Select All
                      </Label>
                    </div>
                    <Separator />
                    <div className="space-y-2 ps-6">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="item1"
                          checked={checkedItems.item1}
                          onCheckedChange={(checked) =>
                            setCheckedItems({ ...checkedItems, item1: checked === true })
                          }
                        />
                        <Label htmlFor="item1">Item 1</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="item2"
                          checked={checkedItems.item2}
                          onCheckedChange={(checked) =>
                            setCheckedItems({ ...checkedItems, item2: checked === true })
                          }
                        />
                        <Label htmlFor="item2">Item 2</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="item3"
                          checked={checkedItems.item3}
                          onCheckedChange={(checked) =>
                            setCheckedItems({ ...checkedItems, item3: checked === true })
                          }
                        />
                        <Label htmlFor="item3">Item 3</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={indeterminateCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Disabled */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.checkboxComponent.examples.disabledState}</h3>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <Checkbox id="disabled" disabled />
                    <Label htmlFor="disabled">Disabled checkbox</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="disabled-checked" disabled checked />
                    <Label htmlFor="disabled-checked">Disabled and checked</Label>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={disabledCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Controlled */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.checkboxComponent.examples.controlled}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="controlled"
                        checked={checked}
                        onCheckedChange={(value) => setChecked(value === true)}
                      />
                      <Label htmlFor="controlled">Controlled checkbox</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Status: {checked ? 'Checked' : 'Unchecked'}
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
              <h3 className="text-lg font-semibold mb-4">{t.checkboxComponent.examples.inForms}</h3>
              <Card>
                <CardContent className="p-6">
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault()
                      alert('Form submitted!')
                    }}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Checkbox id="newsletter" name="newsletter" value="yes" />
                        <Label htmlFor="newsletter">{t.checkboxComponent.labels.newsletter}</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="updates" name="updates" value="yes" />
                        <Label htmlFor="updates">{t.checkboxComponent.labels.updates}</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="form-terms" name="terms" value="yes" required />
                        <Label htmlFor="form-terms">
                          {t.checkboxComponent.labels.terms}{' '}
                          <span className="text-destructive">{t.checkboxComponent.labels.required}</span>
                        </Label>
                      </div>
                    </div>
                    <Button type="submit">{t.ui.button.submit}</Button>
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.checkboxComponent.props.title}</h2>
          <PropsTable props={checkboxProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.checkboxComponent.accessibility.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t.checkboxComponent.accessibility.keyboardNavigation}</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">Tab</kbd>: {t.checkboxComponent.accessibility.keyboardTab}
                  </li>
                  <li>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">Space</kbd>: {t.checkboxComponent.accessibility.keyboardSpace}
                  </li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.checkboxComponent.accessibility.alwaysUseLabels}</h3>
                <p className="text-muted-foreground">
                  {t.checkboxComponent.accessibility.alwaysUseLabelsDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.checkboxComponent.accessibility.screenReaders}</h3>
                <p className="text-muted-foreground">
                  {t.checkboxComponent.accessibility.screenReadersDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.checkboxComponent.accessibility.indeterminateState}</h3>
                <p className="text-muted-foreground">
                  {t.checkboxComponent.accessibility.indeterminateStateDesc}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Considerations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.checkboxComponent.rtl.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                {t.checkboxComponent.rtl.description}
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{t.checkboxComponent.rtl.ltr}</h4>
                  <div dir="ltr">
                    <div className="space-y-2 p-4 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Checkbox id="ltr-1" />
                        <Label htmlFor="ltr-1">{t.checkboxComponent.rtl.acceptTermsAr}</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="ltr-2" />
                        <Label htmlFor="ltr-2">{t.checkboxComponent.rtl.subscribeAr}</Label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{t.checkboxComponent.rtl.rtlLabel}</h4>
                  <div dir="rtl">
                    <div className="space-y-2 p-4 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Checkbox id="rtl-1" />
                        <Label htmlFor="rtl-1">أوافق على الشروط</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="rtl-2" />
                        <Label htmlFor="rtl-2">الاشتراك في النشرة</Label>
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.checkboxComponent.related.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/radio-group">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.checkboxComponent.related.radioGroup}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t.checkboxComponent.related.radioGroupDesc}</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/label">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.checkboxComponent.related.label}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t.checkboxComponent.related.labelDesc}</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/switch">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.checkboxComponent.related.switch}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t.checkboxComponent.related.switchDesc}</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
