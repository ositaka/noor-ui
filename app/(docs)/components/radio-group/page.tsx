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
const radioGroupProps: PropDefinition[] = [
  {
    name: 'value',
    type: 'string',
    default: 'undefined',
    required: false,
    description: 'The controlled value of the selected radio item',
  },
  {
    name: 'defaultValue',
    type: 'string',
    default: 'undefined',
    required: false,
    description: 'The default selected value (uncontrolled)',
  },
  {
    name: 'onValueChange',
    type: '(value: string) => void',
    default: 'undefined',
    required: false,
    description: 'Event handler called when the value changes',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Disables all radio items in the group',
  },
  {
    name: 'name',
    type: 'string',
    default: 'undefined',
    required: false,
    description: 'The name for form submission',
  },
  {
    name: 'required',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Marks the radio group as required',
  },
]

const radioGroupItemProps: PropDefinition[] = [
  {
    name: 'value',
    type: 'string',
    default: 'undefined',
    required: true,
    description: 'The value of the radio item',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Disables this specific radio item',
  },
]

const installCode = `npm install @noorui/components`

const basicUsageCode = `import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

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
  const [value, setValue] = React.useState('option1')

  return (
    <div className="min-h-screen">

      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-12">
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
            <li className="text-foreground font-medium">Radio Group</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Radio Group</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Mutually exclusive selection from a set of options. Only one radio button can be
            selected at a time with full keyboard navigation and RTL support.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Preview</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <RadioGroup defaultValue="option1">
                <div className="flex items-center gap-2 rtl:flex-row-reverse">
                  <RadioGroupItem value="option1" id="preview1" />
                  <Label htmlFor="preview1">Option 1</Label>
                </div>
                <div className="flex items-center gap-2 rtl:flex-row-reverse">
                  <RadioGroupItem value="option2" id="preview2" />
                  <Label htmlFor="preview2">Option 2</Label>
                </div>
                <div className="flex items-center gap-2 rtl:flex-row-reverse">
                  <RadioGroupItem value="option3" id="preview3" />
                  <Label htmlFor="preview3">Option 3</Label>
                </div>
              </RadioGroup>
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
            {/* Vertical Layout */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Vertical Layout (Default)</h3>
              <Card>
                <CardContent className="p-6">
                  <RadioGroup defaultValue="comfortable">
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
                  </RadioGroup>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={verticalCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Horizontal Layout */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Horizontal Layout</h3>
              <Card>
                <CardContent className="p-6">
                  <RadioGroup defaultValue="card" className="flex gap-4">
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
                  </RadioGroup>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={horizontalCode} language="tsx" collapsible />
              </div>
            </div>

            {/* With Description */}
            <div>
              <h3 className="text-lg font-semibold mb-4">With Description Text</h3>
              <Card>
                <CardContent className="p-6">
                  <RadioGroup defaultValue="starter">
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
                  </RadioGroup>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withDescriptionCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Disabled Options */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Disabled Options</h3>
              <Card>
                <CardContent className="p-6">
                  <RadioGroup defaultValue="option1">
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
                  </RadioGroup>
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
                    <p className="text-sm text-muted-foreground">Selected: {value}</p>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => setValue('option1')}>
                        Select Option 1
                      </Button>
                      <Button size="sm" onClick={() => setValue('option2')}>
                        Select Option 2
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
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">Select your plan</Label>
                      <RadioGroup defaultValue="pro" name="plan">
                        <div className="flex items-center gap-2 rtl:flex-row-reverse">
                          <RadioGroupItem value="free" id="free" />
                          <Label htmlFor="free">Free</Label>
                        </div>
                        <div className="flex items-center gap-2 rtl:flex-row-reverse">
                          <RadioGroupItem value="pro" id="form-pro" />
                          <Label htmlFor="form-pro">Pro</Label>
                        </div>
                        <div className="flex items-center gap-2 rtl:flex-row-reverse">
                          <RadioGroupItem value="enterprise" id="form-enterprise" />
                          <Label htmlFor="form-enterprise">Enterprise</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <Button type="submit">Continue</Button>
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

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">RadioGroup</h3>
              <PropsTable props={radioGroupProps} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">RadioGroupItem</h3>
              <PropsTable props={radioGroupItemProps} />
            </div>
          </div>
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
                    radio group
                  </li>
                  <li>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">Arrow Keys</kbd>: Navigate
                    between radio options
                  </li>
                  <li>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">Space</kbd>: Select focused
                    radio option
                  </li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Always Use Labels</h3>
                <p className="text-muted-foreground">
                  Always pair radio items with labels. Clicking the label selects the radio button,
                  improving usability.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Group Labeling</h3>
                <p className="text-muted-foreground">
                  Use a heading or label to describe what the radio group is for. This helps screen
                  reader users understand the context.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Screen Readers</h3>
                <p className="text-muted-foreground">
                  Screen readers announce the radio role, the label, whether it&apos;s selected,
                  and the group position (e.g., &quot;2 of 3&quot;).
                </p>
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
                Radio groups automatically support RTL layout. Radio buttons and labels maintain
                proper spacing and alignment in both directions.
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">LTR (English)</h4>
                  <div dir="ltr">
                    <div className="p-4 border rounded-lg">
                      <RadioGroup defaultValue="option1">
                        <div className="flex items-center gap-2 rtl:flex-row-reverse">
                          <RadioGroupItem value="option1" id="ltr-r1" />
                          <Label htmlFor="ltr-r1">Option 1</Label>
                        </div>
                        <div className="flex items-center gap-2 rtl:flex-row-reverse">
                          <RadioGroupItem value="option2" id="ltr-r2" />
                          <Label htmlFor="ltr-r2">Option 2</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">RTL (العربية)</h4>
                  <div dir="rtl">
                    <div className="p-4 border rounded-lg">
                      <RadioGroup defaultValue="option1">
                        <div className="flex items-center gap-2 rtl:flex-row-reverse">
                          <RadioGroupItem value="option1" id="rtl-r1" />
                          <Label htmlFor="rtl-r1">الخيار الأول</Label>
                        </div>
                        <div className="flex items-center gap-2 rtl:flex-row-reverse">
                          <RadioGroupItem value="option2" id="rtl-r2" />
                          <Label htmlFor="rtl-r2">الخيار الثاني</Label>
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">Related Components</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/checkbox">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Checkbox</h3>
                  <p className="text-sm text-muted-foreground mt-1">Multiple selections</p>
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
            <Link href="/components/select">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Select</h3>
                  <p className="text-sm text-muted-foreground mt-1">Dropdown selection</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
