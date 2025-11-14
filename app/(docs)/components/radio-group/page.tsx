'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

// Helper function to get prop descriptions based on locale
const getRadioGroupProps = (locale: 'en' | 'ar'): PropDefinition[] => {
  const rg = content[locale].radioGroupComponent
  return [
    {
      name: 'value',
      type: 'string',
      default: 'undefined',
      required: false,
      description: rg.props.radioGroup.value,
    },
    {
      name: 'defaultValue',
      type: 'string',
      default: 'undefined',
      required: false,
      description: rg.props.radioGroup.defaultValue,
    },
    {
      name: 'onValueChange',
      type: '(value: string) => void',
      default: 'undefined',
      required: false,
      description: rg.props.radioGroup.onValueChange,
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      required: false,
      description: rg.props.radioGroup.disabled,
    },
    {
      name: 'name',
      type: 'string',
      default: 'undefined',
      required: false,
      description: rg.props.radioGroup.name,
    },
    {
      name: 'required',
      type: 'boolean',
      default: 'false',
      required: false,
      description: rg.props.radioGroup.required,
    },
  ]
}

const getRadioGroupItemProps = (locale: 'en' | 'ar'): PropDefinition[] => {
  const rg = content[locale].radioGroupComponent
  return [
    {
      name: 'value',
      type: 'string',
      default: 'undefined',
      required: true,
      description: rg.props.radioGroupItem.value,
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      required: false,
      description: rg.props.radioGroupItem.disabled,
    },
  ]
}

const installCode = `npm install @noorui/components`

const basicUsageCode = `import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

<RadioGroup defaultValue="option1">
  <div className="flex items-center gap-2 rtl:flex-row-reverse">
    <RadioGroupItem value="option1" id="option1" />
    <Label htmlFor="option1">Option 1</Label>
  </div>
  <div className="flex items-center gap-2 rtl:flex-row-reverse">
    <RadioGroupItem value="option2" id="option2" />
    <Label htmlFor="option2">Option 2</Label>
  </div>
</RadioGroup>`

const verticalCode = `<RadioGroup defaultValue="comfortable">
  <div className="flex items-center gap-2 rtl:flex-row-reverse">
    <RadioGroupItem value="default" id="default" />
    <Label htmlFor="default">Default</Label>
  </div>
  <div className="flex items-center gap-2 rtl:flex-row-reverse">
    <RadioGroupItem value="comfortable" id="comfortable" />
    <Label htmlFor="comfortable">Comfortable</Label>
  </div>
  <div className="flex items-center gap-2 rtl:flex-row-reverse">
    <RadioGroupItem value="compact" id="compact" />
    <Label htmlFor="compact">Compact</Label>
  </div>
</RadioGroup>`

const horizontalCode = `<RadioGroup defaultValue="card" className="flex gap-4">
  <div className="flex items-center gap-2 rtl:flex-row-reverse">
    <RadioGroupItem value="card" id="card" />
    <Label htmlFor="card">Card</Label>
  </div>
  <div className="flex items-center gap-2 rtl:flex-row-reverse">
    <RadioGroupItem value="paypal" id="paypal" />
    <Label htmlFor="paypal">PayPal</Label>
  </div>
  <div className="flex items-center gap-2 rtl:flex-row-reverse">
    <RadioGroupItem value="apple" id="apple" />
    <Label htmlFor="apple">Apple Pay</Label>
  </div>
</RadioGroup>`

const withDescriptionCode = `<RadioGroup defaultValue="starter">
  <div className="space-y-1">
    <div className="flex items-center gap-2 rtl:flex-row-reverse">
      <RadioGroupItem value="starter" id="starter" />
      <Label htmlFor="starter">Starter Plan</Label>
    </div>
    <p className="text-sm text-muted-foreground ps-6">
      Perfect for individuals. $9/month.
    </p>
  </div>

  <div className="space-y-1">
    <div className="flex items-center gap-2 rtl:flex-row-reverse">
      <RadioGroupItem value="pro" id="pro" />
      <Label htmlFor="pro">Pro Plan</Label>
    </div>
    <p className="text-sm text-muted-foreground ps-6">
      For small teams. $29/month.
    </p>
  </div>

  <div className="space-y-1">
    <div className="flex items-center gap-2 rtl:flex-row-reverse">
      <RadioGroupItem value="enterprise" id="enterprise" />
      <Label htmlFor="enterprise">Enterprise Plan</Label>
    </div>
    <p className="text-sm text-muted-foreground ps-6">
      Custom solutions. Contact sales.
    </p>
  </div>
</RadioGroup>`

const disabledCode = `<RadioGroup defaultValue="option1">
  <div className="flex items-center gap-2 rtl:flex-row-reverse">
    <RadioGroupItem value="option1" id="r1" />
    <Label htmlFor="r1">Enabled option</Label>
  </div>
  <div className="flex items-center gap-2 rtl:flex-row-reverse">
    <RadioGroupItem value="option2" id="r2" disabled />
    <Label htmlFor="r2">Disabled option</Label>
  </div>
  <div className="flex items-center gap-2 rtl:flex-row-reverse">
    <RadioGroupItem value="option3" id="r3" />
    <Label htmlFor="r3">Another enabled option</Label>
  </div>
</RadioGroup>`

const controlledCode = `const [value, setValue] = React.useState('option1')

return (
  <div className="space-y-4">
    <RadioGroup value={value} onValueChange={setValue}>
      <div className="flex items-center gap-2 rtl:flex-row-reverse">
        <RadioGroupItem value="option1" id="c1" />
        <Label htmlFor="c1">Option 1</Label>
      </div>
      <div className="flex items-center gap-2 rtl:flex-row-reverse">
        <RadioGroupItem value="option2" id="c2" />
        <Label htmlFor="c2">Option 2</Label>
      </div>
      <div className="flex items-center gap-2 rtl:flex-row-reverse">
        <RadioGroupItem value="option3" id="c3" />
        <Label htmlFor="c3">Option 3</Label>
      </div>
    </RadioGroup>
    <p className="text-sm text-muted-foreground">
      Selected: {value}
    </p>
    <div className="flex gap-2">
      <Button size="sm" onClick={() => setValue('option1')}>
        Select Option 1
      </Button>
      <Button size="sm" onClick={() => setValue('option2')}>
        Select Option 2
      </Button>
    </div>
  </div>
)`

const formCode = `<form className="space-y-6">
  <div className="space-y-3">
    <Label className="text-base font-semibold">Select your plan</Label>
    <RadioGroup defaultValue="pro" name="plan">
      <div className="flex items-center gap-2 rtl:flex-row-reverse">
        <RadioGroupItem value="free" id="free" />
        <Label htmlFor="free">Free</Label>
      </div>
      <div className="flex items-center gap-2 rtl:flex-row-reverse">
        <RadioGroupItem value="pro" id="pro" />
        <Label htmlFor="pro">Pro</Label>
      </div>
      <div className="flex items-center gap-2 rtl:flex-row-reverse">
        <RadioGroupItem value="enterprise" id="enterprise" />
        <Label htmlFor="enterprise">Enterprise</Label>
      </div>
    </RadioGroup>
  </div>
  <Button type="submit">Continue</Button>
</form>`

const rtlCode = `// RTL support with flex-row-reverse!
// Radio buttons appear on the right in RTL

<RadioGroup defaultValue="option1">
  <div className="flex items-center gap-2 rtl:flex-row-reverse">
    <RadioGroupItem value="option1" id="rtl1" />
    <Label htmlFor="rtl1">الخيار الأول</Label>
  </div>
  <div className="flex items-center gap-2 rtl:flex-row-reverse">
    <RadioGroupItem value="option2" id="rtl2" />
    <Label htmlFor="rtl2">الخيار الثاني</Label>
  </div>
</RadioGroup>`

export default function RadioGroupPage() {
  const { locale } = useDirection()
  const t = content[locale]
  const rg = content[locale].radioGroupComponent
  const [value, setValue] = React.useState('option1')

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
            <li className="text-foreground font-medium">{rg.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{rg.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {rg.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <RadioGroup defaultValue="option1">
                <div className="flex items-center gap-2 rtl:flex-row-reverse">
                  <RadioGroupItem value="option1" id="preview1" />
                  <Label htmlFor="preview1">{rg.options.option1}</Label>
                </div>
                <div className="flex items-center gap-2 rtl:flex-row-reverse">
                  <RadioGroupItem value="option2" id="preview2" />
                  <Label htmlFor="preview2">{rg.options.option2}</Label>
                </div>
                <div className="flex items-center gap-2 rtl:flex-row-reverse">
                  <RadioGroupItem value="option3" id="preview3" />
                  <Label htmlFor="preview3">{rg.options.option3}</Label>
                </div>
              </RadioGroup>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.installation}</h2>
          <CodeBlock code={installCode} language="bash" title="Terminal" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{rg.examples.title}</h2>

          <div className="space-y-8">
            {/* Vertical Layout */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{rg.examples.verticalLayout}</h3>
              <Card>
                <CardContent className="p-6">
                  <RadioGroup defaultValue="comfortable">
                    <div className="flex items-center gap-2 rtl:flex-row-reverse">
                      <RadioGroupItem value="default" id="default" />
                      <Label htmlFor="default">{rg.options.default}</Label>
                    </div>
                    <div className="flex items-center gap-2 rtl:flex-row-reverse">
                      <RadioGroupItem value="comfortable" id="comfortable" />
                      <Label htmlFor="comfortable">{rg.options.comfortable}</Label>
                    </div>
                    <div className="flex items-center gap-2 rtl:flex-row-reverse">
                      <RadioGroupItem value="compact" id="compact" />
                      <Label htmlFor="compact">{rg.options.compact}</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={verticalCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Horizontal Layout */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{rg.examples.horizontalLayout}</h3>
              <Card>
                <CardContent className="p-6">
                  <RadioGroup defaultValue="card" className="flex gap-4">
                    <div className="flex items-center gap-2 rtl:flex-row-reverse">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card">{rg.options.card}</Label>
                    </div>
                    <div className="flex items-center gap-2 rtl:flex-row-reverse">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal">{rg.options.paypal}</Label>
                    </div>
                    <div className="flex items-center gap-2 rtl:flex-row-reverse">
                      <RadioGroupItem value="apple" id="apple" />
                      <Label htmlFor="apple">{rg.options.applePay}</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={horizontalCode} language="tsx" collapsible />
              </div>
            </div>

            {/* With Description */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{rg.examples.withDescription}</h3>
              <Card>
                <CardContent className="p-6">
                  <RadioGroup defaultValue="starter">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 rtl:flex-row-reverse">
                        <RadioGroupItem value="starter" id="starter" />
                        <Label htmlFor="starter">{rg.plans.starter}</Label>
                      </div>
                      <p className="text-sm text-muted-foreground ps-6">
                        {rg.plans.starterDesc}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 rtl:flex-row-reverse">
                        <RadioGroupItem value="pro" id="pro" />
                        <Label htmlFor="pro">{rg.plans.pro}</Label>
                      </div>
                      <p className="text-sm text-muted-foreground ps-6">
                        {rg.plans.proDesc}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 rtl:flex-row-reverse">
                        <RadioGroupItem value="enterprise" id="enterprise" />
                        <Label htmlFor="enterprise">{rg.plans.enterprise}</Label>
                      </div>
                      <p className="text-sm text-muted-foreground ps-6">
                        {rg.plans.enterpriseDesc}
                      </p>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withDescriptionCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Disabled Options */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{rg.examples.disabledOptions}</h3>
              <Card>
                <CardContent className="p-6">
                  <RadioGroup defaultValue="option1">
                    <div className="flex items-center gap-2 rtl:flex-row-reverse">
                      <RadioGroupItem value="option1" id="r1" />
                      <Label htmlFor="r1">{rg.options.enabled}</Label>
                    </div>
                    <div className="flex items-center gap-2 rtl:flex-row-reverse">
                      <RadioGroupItem value="option2" id="r2" disabled />
                      <Label htmlFor="r2">{rg.options.disabled}</Label>
                    </div>
                    <div className="flex items-center gap-2 rtl:flex-row-reverse">
                      <RadioGroupItem value="option3" id="r3" />
                      <Label htmlFor="r3">{rg.options.anotherEnabled}</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={disabledCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Controlled */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{rg.examples.controlled}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <RadioGroup value={value} onValueChange={setValue}>
                      <div className="flex items-center gap-2 rtl:flex-row-reverse">
                        <RadioGroupItem value="option1" id="c1" />
                        <Label htmlFor="c1">{rg.options.option1}</Label>
                      </div>
                      <div className="flex items-center gap-2 rtl:flex-row-reverse">
                        <RadioGroupItem value="option2" id="c2" />
                        <Label htmlFor="c2">{rg.options.option2}</Label>
                      </div>
                      <div className="flex items-center gap-2 rtl:flex-row-reverse">
                        <RadioGroupItem value="option3" id="c3" />
                        <Label htmlFor="c3">{rg.options.option3}</Label>
                      </div>
                    </RadioGroup>
                    <p className="text-sm text-muted-foreground">{rg.labels.selected}: {value}</p>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => setValue('option1')}>
                        {rg.buttons.selectOption1}
                      </Button>
                      <Button size="sm" onClick={() => setValue('option2')}>
                        {rg.buttons.selectOption2}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={controlledCode} language="tsx" collapsible />
              </div>
            </div>

            {/* In Forms */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{rg.examples.inForms}</h3>
              <Card>
                <CardContent className="p-6">
                  <form
                    className="space-y-6"
                    onSubmit={(e) => {
                      e.preventDefault()
                      alert('Form submitted!')
                    }}
                  >
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">{rg.labels.selectYourPlan}</Label>
                      <RadioGroup defaultValue="pro" name="plan">
                        <div className="flex items-center gap-2 rtl:flex-row-reverse">
                          <RadioGroupItem value="free" id="free" />
                          <Label htmlFor="free">{rg.options.free}</Label>
                        </div>
                        <div className="flex items-center gap-2 rtl:flex-row-reverse">
                          <RadioGroupItem value="pro" id="form-pro" />
                          <Label htmlFor="form-pro">{rg.options.pro}</Label>
                        </div>
                        <div className="flex items-center gap-2 rtl:flex-row-reverse">
                          <RadioGroupItem value="enterprise" id="form-enterprise" />
                          <Label htmlFor="form-enterprise">{rg.options.enterprise}</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <Button type="submit">{rg.buttons.continue}</Button>
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.props}</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">RadioGroup</h3>
              <PropsTable props={getRadioGroupProps(locale)} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">RadioGroupItem</h3>
              <PropsTable props={getRadioGroupItemProps(locale)} />
            </div>
          </div>
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{rg.accessibility.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{rg.accessibility.keyboardNavigation}</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">Tab</kbd>: {rg.accessibility.keyboardTab}
                  </li>
                  <li>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">Arrow Keys</kbd>: {rg.accessibility.keyboardArrows}
                  </li>
                  <li>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">Space</kbd>: {rg.accessibility.keyboardSpace}
                  </li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{rg.accessibility.alwaysUseLabels}</h3>
                <p className="text-muted-foreground">
                  {rg.accessibility.alwaysUseLabelsDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{rg.accessibility.groupLabeling}</h3>
                <p className="text-muted-foreground">
                  {rg.accessibility.groupLabelingDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{rg.accessibility.screenReaders}</h3>
                <p className="text-muted-foreground">
                  {rg.accessibility.screenReadersDesc}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Considerations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{rg.rtl.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                {rg.rtl.description}
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{rg.rtl.ltr}</h4>
                  <div dir="ltr">
                    <div className="p-4 border rounded-lg">
                      <RadioGroup defaultValue="option1">
                        <div className="flex items-center gap-2 rtl:flex-row-reverse">
                          <RadioGroupItem value="option1" id="ltr-r1" />
                          <Label htmlFor="ltr-r1">{rg.options.option1}</Label>
                        </div>
                        <div className="flex items-center gap-2 rtl:flex-row-reverse">
                          <RadioGroupItem value="option2" id="ltr-r2" />
                          <Label htmlFor="ltr-r2">{rg.options.option2}</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{rg.rtl.rtlLabel}</h4>
                  <div dir="rtl">
                    <div className="p-4 border rounded-lg">
                      <RadioGroup defaultValue="option1">
                        <div className="flex items-center gap-2 rtl:flex-row-reverse">
                          <RadioGroupItem value="option1" id="rtl-r1" />
                          <Label htmlFor="rtl-r1">{rg.rtl.option1Ar}</Label>
                        </div>
                        <div className="flex items-center gap-2 rtl:flex-row-reverse">
                          <RadioGroupItem value="option2" id="rtl-r2" />
                          <Label htmlFor="rtl-r2">{rg.rtl.option2Ar}</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{rg.related.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/checkbox">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{rg.related.checkbox}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{rg.related.checkboxDesc}</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/label">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{rg.related.label}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{rg.related.labelDesc}</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/select">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{rg.related.select}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{rg.related.selectDesc}</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
