'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { AlertCircle } from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getLabelProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'htmlFor',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.labelComponent.props.htmlFor,
  },
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.labelComponent.props.className,
  },
]

const installCode = `npm install @noorui/components`

const basicUsageCode = `import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

<div className="space-y-2">
  <Label htmlFor="email">Email Address</Label>
  <Input id="email" type="email" />
</div>`

const withInputCode = `<div className="space-y-2">
  <Label htmlFor="username">Username</Label>
  <Input id="username" placeholder="Enter your username" />
</div>`

const requiredCode = `<div className="space-y-2">
  <Label htmlFor="email">
    Email Address <span className="text-destructive">*</span>
  </Label>
  <Input id="email" type="email" required />
</div>`

const withHelperCode = `<div className="space-y-2">
  <Label htmlFor="password">Password</Label>
  <Input id="password" type="password" />
  <p className="text-sm text-muted-foreground">
    Must be at least 8 characters long
  </p>
</div>`

const disabledCode = `<div className="space-y-2">
  <Label htmlFor="disabled-input">Disabled Field</Label>
  <Input id="disabled-input" disabled placeholder="Can't edit this" />
</div>`

const horizontalCode = `<div className="flex items-center gap-4">
  <Label htmlFor="inline-input" className="w-32 text-end">
    Full Name
  </Label>
  <Input id="inline-input" className="flex-1" />
</div>`

const formGroupCode = `<form className="space-y-6">
  <div className="space-y-2">
    <Label htmlFor="first-name">First Name</Label>
    <Input id="first-name" required />
  </div>

  <div className="space-y-2">
    <Label htmlFor="last-name">Last Name</Label>
    <Input id="last-name" required />
  </div>

  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" required />
  </div>

  <Button type="submit">Submit</Button>
</form>`

const customStyleCode = `<div className="space-y-2">
  <Label htmlFor="styled" className="text-lg font-bold text-primary">
    Custom Styled Label
  </Label>
  <Input id="styled" />
</div>`

const rtlCode = `// RTL support is automatic!
// Labels align correctly in RTL layouts

<div className="space-y-2">
  <Label htmlFor="name-ar">الاسم الكامل</Label>
  <Input id="name-ar" placeholder="أدخل اسمك الكامل" />
</div>`

export default function LabelPage() {
  const { locale } = useDirection()
  const t = content[locale]
  const labelProps = getLabelProps(t)

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
            <li className="text-foreground font-medium">{t.labelComponent.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.labelComponent.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.labelComponent.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.labelComponent.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="w-full max-w-sm space-y-2">
                <Label htmlFor="preview-input">Email Address</Label>
                <Input id="preview-input" type="email" placeholder="name@example.com" />
              </div>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.labelComponent.installation}</h2>
          <CodeBlock code={installCode} language="bash" title="Terminal" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.labelComponent.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Why Use Label */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.labelComponent.whyUse}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <p className="font-semibold">Labels are critical for accessibility</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Screen Readers:</strong> Labels are announced by screen readers,
                        telling users what each field is for
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Click Target:</strong> Clicking a label focuses its associated
                        input, improving usability on mobile
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Form Validation:</strong> Browsers use labels to provide better
                        validation messages
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>WCAG Compliance:</strong> WCAG 2.1 requires all form inputs to have
                        associated labels
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.labelComponent.examples.title}</h2>

          <div className="space-y-8">
            {/* With Input */}
            <div>
              <h3 className="text-lg font-semibold mb-4">With Input</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-sm space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="Enter your username" />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withInputCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Required Field */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Required Field</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-sm space-y-2">
                    <Label htmlFor="required-email">
                      Email Address <span className="text-destructive">*</span>
                    </Label>
                    <Input id="required-email" type="email" required />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={requiredCode} language="tsx" collapsible />
              </div>
            </div>

            {/* With Helper Text */}
            <div>
              <h3 className="text-lg font-semibold mb-4">With Helper Text</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-sm space-y-2">
                    <Label htmlFor="password-helper">Password</Label>
                    <Input id="password-helper" type="password" />
                    <p className="text-sm text-muted-foreground">
                      Must be at least 8 characters long
                    </p>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withHelperCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Disabled State */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Disabled State</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-sm space-y-2">
                    <Label htmlFor="disabled-input">Disabled Field</Label>
                    <Input id="disabled-input" disabled placeholder="Can't edit this" />
                    <p className="text-sm text-muted-foreground">
                      Notice how the label automatically becomes muted when the input is disabled
                    </p>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={disabledCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Horizontal Layout */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Horizontal Layout</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Label htmlFor="inline-first" className="w-32 text-end">
                        First Name
                      </Label>
                      <Input id="inline-first" className="flex-1" />
                    </div>
                    <div className="flex items-center gap-4">
                      <Label htmlFor="inline-last" className="w-32 text-end">
                        Last Name
                      </Label>
                      <Input id="inline-last" className="flex-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={horizontalCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Form Group */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Complete Form</h3>
              <Card>
                <CardContent className="p-6">
                  <form
                    className="max-w-sm space-y-6"
                    onSubmit={(e) => {
                      e.preventDefault()
                      alert('Form submitted!')
                    }}
                  >
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="form-email">Email</Label>
                      <Input id="form-email" type="email" required />
                    </div>

                    <Button type="submit" className="w-full">
                      Submit
                    </Button>
                  </form>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={formGroupCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Custom Styling */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Custom Styling</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-sm space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="styled-1" className="text-lg font-bold text-primary">
                        Custom Styled Label
                      </Label>
                      <Input id="styled-1" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="styled-2" className="text-xs uppercase tracking-wider">
                        Small Uppercase Label
                      </Label>
                      <Input id="styled-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={customStyleCode} language="tsx" collapsible />
              </div>
            </div>
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.labelComponent.props.title}</h2>
          <PropsTable props={labelProps} />
          <Card className="mt-4">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                The Label component extends Radix UI&apos;s Label primitive and accepts all standard HTML
                label attributes.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.labelComponent.accessibility.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Always Link Labels to Inputs</h3>
                <p className="text-muted-foreground mb-2">
                  Use the <code className="bg-muted px-1 rounded">htmlFor</code> prop with the
                  input&apos;s <code className="bg-muted px-1 rounded">id</code>:
                </p>
                <CodeBlock
                  code={`<Label htmlFor="email">Email</Label>
<Input id="email" />`}
                  language="tsx"
                />
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Don&apos;t Use Placeholder Instead of Label</h3>
                <p className="text-muted-foreground">
                  ❌ Bad: Using only placeholder text (not accessible)
                </p>
                <CodeBlock code={`<Input placeholder="Email Address" />`} language="tsx" />
                <p className="text-muted-foreground mt-2">
                  ✓ Good: Using label with placeholder
                </p>
                <CodeBlock
                  code={`<Label htmlFor="email">Email Address</Label>
<Input id="email" placeholder="name@example.com" />`}
                  language="tsx"
                />
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Automatic Disabled Styling</h3>
                <p className="text-muted-foreground">
                  Labels automatically style themselves when their associated input is disabled using
                  the <code className="bg-muted px-1 rounded">peer-disabled:</code> utility classes.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Keyboard Navigation</h3>
                <p className="text-muted-foreground">
                  Clicking a label focuses its associated input, improving keyboard workflow and
                  mobile usability.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Considerations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.labelComponent.rtl.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                Labels automatically support RTL layout. Text alignment adapts based on the text
                direction.
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">LTR (English)</h4>
                  <div dir="ltr">
                    <div className="space-y-2">
                      <Label htmlFor="ltr-name">Full Name</Label>
                      <Input id="ltr-name" placeholder="John Doe" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">RTL (العربية)</h4>
                  <div dir="rtl">
                    <div className="space-y-2">
                      <Label htmlFor="rtl-name">الاسم الكامل</Label>
                      <Input id="rtl-name" placeholder="أدخل اسمك الكامل" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Best Practices */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Best Practices</h2>
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Always pair inputs with labels using the htmlFor and id attributes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Use clear, descriptive label text that explains what the input is for</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>
                    Indicate required fields with an asterisk (*) or &quot;required&quot; text
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Place labels above inputs for better scannability (except horizontal forms)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">✗</span>
                  <span>Don&apos;t rely solely on placeholder text for instructions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">✗</span>
                  <span>Don&apos;t use labels for decorative purposes - they should describe the input</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">✗</span>
                  <span>Don&apos;t hide labels visually unless you provide alternative text for screen readers</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Related Components</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/input">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Input</h3>
                  <p className="text-sm text-muted-foreground mt-1">Text input fields</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/checkbox">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Checkbox</h3>
                  <p className="text-sm text-muted-foreground mt-1">Checkbox with label</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/radio-group">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Radio Group</h3>
                  <p className="text-sm text-muted-foreground mt-1">Radio options with labels</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
