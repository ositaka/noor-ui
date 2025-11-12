'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
const selectProps: PropDefinition[] = [
  {
    name: 'value',
    type: 'string',
    default: 'undefined',
    required: false,
    description: 'The controlled value of the select',
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
    description: 'Disables the select',
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
    description: 'Marks the select as required',
  },
]

const selectItemProps: PropDefinition[] = [
  {
    name: 'value',
    type: 'string',
    default: 'undefined',
    required: true,
    description: 'The value of the select item',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Disables this specific item',
  },
]

const installCode = `npm install @noorui/components`

const basicUsageCode = `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>`

const withLabelCode = `<div className="space-y-2">
  <Label htmlFor="country">Country</Label>
  <Select>
    <SelectTrigger id="country">
      <SelectValue placeholder="Select a country" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="us">United States</SelectItem>
      <SelectItem value="uk">United Kingdom</SelectItem>
      <SelectItem value="ca">Canada</SelectItem>
      <SelectItem value="au">Australia</SelectItem>
    </SelectContent>
  </Select>
</div>`

const groupedCode = `<Select>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="Select timezone" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>North America</SelectLabel>
      <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
      <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
      <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
      <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
    </SelectGroup>
    <SelectGroup>
      <SelectLabel>Europe</SelectLabel>
      <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
      <SelectItem value="cet">Central European Time (CET)</SelectItem>
      <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`

const disabledCode = `<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="available">Available option</SelectItem>
    <SelectItem value="disabled" disabled>
      Disabled option
    </SelectItem>
    <SelectItem value="another">Another option</SelectItem>
  </SelectContent>
</Select>

// Disabled select
<Select disabled>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Disabled select" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
  </SelectContent>
</Select>`

const controlledCode = `const [value, setValue] = React.useState('')

return (
  <div className="space-y-4">
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
        <SelectItem value="grape">Grape</SelectItem>
      </SelectContent>
    </Select>
    <p className="text-sm text-muted-foreground">
      Selected: {value || 'None'}
    </p>
    <Button size="sm" onClick={() => setValue('banana')}>
      Select Banana
    </Button>
  </div>
)`

const formCode = `<form className="space-y-6">
  <div className="space-y-2">
    <Label htmlFor="plan">Select Plan</Label>
    <Select name="plan" required>
      <SelectTrigger id="plan">
        <SelectValue placeholder="Choose a plan" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="free">Free - $0/month</SelectItem>
        <SelectItem value="starter">Starter - $9/month</SelectItem>
        <SelectItem value="pro">Pro - $29/month</SelectItem>
        <SelectItem value="enterprise">Enterprise - Custom</SelectItem>
      </SelectContent>
    </Select>
  </div>
  <Button type="submit">Continue</Button>
</form>`

const rtlCode = `// RTL support is automatic!
// Dropdown positioning and text flow correctly in RTL

<div className="space-y-2">
  <Label htmlFor="rtl-select">اختر اللغة</Label>
  <Select>
    <SelectTrigger id="rtl-select">
      <SelectValue placeholder="اختر خيار" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="ar">العربية</SelectItem>
      <SelectItem value="en">English</SelectItem>
      <SelectItem value="fr">Français</SelectItem>
    </SelectContent>
  </Select>
</div>`

export default function SelectPage() {
  const [value, setValue] = React.useState('')

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
            <li className="text-foreground font-medium">Select</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Select</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Dropdown selection from a list of options. Supports grouped options, search, and full
            keyboard navigation with RTL support.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Preview</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
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
                <CardContent className="p-6">
                  <div className="max-w-xs space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select>
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                        <SelectItem value="de">Germany</SelectItem>
                        <SelectItem value="fr">France</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withLabelCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Grouped Options */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Grouped Options</h3>
              <Card>
                <CardContent className="p-6">
                  <Select>
                    <SelectTrigger className="w-[250px]">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>North America</SelectLabel>
                        <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                        <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                        <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
                        <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Europe</SelectLabel>
                        <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                        <SelectItem value="cet">Central European Time (CET)</SelectItem>
                        <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={groupedCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Disabled */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Disabled State</h3>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label>Select with disabled option</Label>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available option</SelectItem>
                        <SelectItem value="disabled" disabled>
                          Disabled option
                        </SelectItem>
                        <SelectItem value="another">Another option</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Disabled select</Label>
                    <Select disabled>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Disabled select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Option 1</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Select value={value} onValueChange={setValue}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select a fruit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="orange">Orange</SelectItem>
                        <SelectItem value="grape">Grape</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Selected: {value || 'None'}
                    </p>
                    <Button size="sm" onClick={() => setValue('banana')}>
                      Select Banana
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
                    className="max-w-xs space-y-6"
                    onSubmit={(e) => {
                      e.preventDefault()
                      alert('Form submitted!')
                    }}
                  >
                    <div className="space-y-2">
                      <Label htmlFor="plan">Select Plan</Label>
                      <Select name="plan" required>
                        <SelectTrigger id="plan">
                          <SelectValue placeholder="Choose a plan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="free">Free - $0/month</SelectItem>
                          <SelectItem value="starter">Starter - $9/month</SelectItem>
                          <SelectItem value="pro">Pro - $29/month</SelectItem>
                          <SelectItem value="enterprise">Enterprise - Custom</SelectItem>
                        </SelectContent>
                      </Select>
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
              <h3 className="text-lg font-semibold mb-4">Select</h3>
              <PropsTable props={selectProps} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">SelectItem</h3>
              <PropsTable props={selectItemProps} />
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
                    select
                  </li>
                  <li>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">Enter</kbd> or{' '}
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">Space</kbd>: Open dropdown
                  </li>
                  <li>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">Arrow Keys</kbd>: Navigate
                    options
                  </li>
                  <li>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">Enter</kbd>: Select option
                  </li>
                  <li>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">Esc</kbd>: Close dropdown
                  </li>
                  <li>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">Type</kbd>: Jump to option
                    starting with typed character
                  </li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Always Use Labels</h3>
                <p className="text-muted-foreground">
                  Always pair selects with labels for screen reader users. Clicking the label
                  focuses the select trigger.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Screen Readers</h3>
                <p className="text-muted-foreground">
                  Screen readers announce the combobox role, the label, the selected value, and
                  instructions for opening the dropdown.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Grouped Options</h3>
                <p className="text-muted-foreground">
                  Use SelectGroup and SelectLabel to organize options into categories. Group labels
                  are announced by screen readers.
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
                Select dropdowns automatically support RTL layout. The dropdown position, chevron
                icon, and check indicator all adapt correctly for right-to-left languages.
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">LTR (English)</h4>
                  <div dir="ltr">
                    <div className="space-y-2 p-4 border rounded-lg">
                      <Label htmlFor="ltr-select">Language</Label>
                      <Select>
                        <SelectTrigger id="ltr-select">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="ar">Arabic</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">RTL (العربية)</h4>
                  <div dir="rtl">
                    <div className="space-y-2 p-4 border rounded-lg">
                      <Label htmlFor="rtl-select">اللغة</Label>
                      <Select>
                        <SelectTrigger id="rtl-select">
                          <SelectValue placeholder="اختر اللغة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ar">العربية</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                        </SelectContent>
                      </Select>
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
            <Link href="/components/radio-group">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Radio Group</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    For fewer, visible options
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
    </div>
  )
}
