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
import { Mail, Lock, Search } from 'lucide-react'

const inputProps: PropDefinition[] = [
  {
    name: 'type',
    type: "'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | ...",
    default: "'text'",
    required: false,
    description: 'HTML input type',
  },
  {
    name: 'placeholder',
    type: 'string',
    default: 'undefined',
    required: false,
    description: 'Placeholder text shown when input is empty',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Disables the input',
  },
  {
    name: 'readOnly',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Makes the input read-only',
  },
  {
    name: 'required',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Marks the input as required',
  },
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: 'Additional CSS classes to apply',
  },
]

const installCode = `npm install @noorui/components`

const basicUsageCode = `import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="Enter your email" />
</div>`

const typesCode = `// Text input
<Input type="text" placeholder="Enter text" />

// Email input
<Input type="email" placeholder="name@example.com" />

// Password input
<Input type="password" placeholder="Enter password" />

// Number input
<Input type="number" placeholder="0" />

// Tel input
<Input type="tel" placeholder="+1 (555) 000-0000" />

// URL input
<Input type="url" placeholder="https://example.com" />

// Search input
<Input type="search" placeholder="Search..." />`

const withLabelCode = `import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

<div className="space-y-2">
  <Label htmlFor="username">Username</Label>
  <Input id="username" placeholder="Enter your username" />
</div>`

const withIconCode = `import { Mail } from 'lucide-react'

<div className="relative">
  <Mail className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
  <Input className="ps-9" placeholder="Email" />
</div>`

const disabledCode = `// Disabled state
<Input disabled placeholder="Disabled input" />

// Read-only state
<Input readOnly value="Read-only value" />`

const validationCode = `const [email, setEmail] = React.useState('')
const [error, setError] = React.useState('')

const validateEmail = (value: string) => {
  if (!value.includes('@')) {
    setError('Please enter a valid email')
  } else {
    setError('')
  }
}

return (
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input
      id="email"
      type="email"
      value={email}
      onChange={(e) => {
        setEmail(e.target.value)
        validateEmail(e.target.value)
      }}
      className={error ? 'border-destructive' : ''}
    />
    {error && <p className="text-sm text-destructive">{error}</p>}
  </div>
)`

const formCode = `<form className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="name">Name</Label>
    <Input id="name" required placeholder="Enter your name" />
  </div>

  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" required placeholder="name@example.com" />
  </div>

  <div className="space-y-2">
    <Label htmlFor="password">Password</Label>
    <Input id="password" type="password" required placeholder="••••••••" />
  </div>

  <Button type="submit">Submit</Button>
</form>`

const rtlCode = `// RTL support is automatic!
// Text alignment and icons flip correctly

<div className="space-y-2">
  <Label htmlFor="email-rtl">البريد الإلكتروني</Label>
  <Input id="email-rtl" type="email" placeholder="أدخل بريدك الإلكتروني" />
</div>`

export default function InputPage() {
  const [email, setEmail] = React.useState('')
  const [error, setError] = React.useState('')

  const validateEmail = (value: string) => {
    if (value && !value.includes('@')) {
      setError('Please enter a valid email')
    } else {
      setError('')
    }
  }

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
            <li className="text-foreground font-medium">Input</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Input</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Text input field for collecting user information. Supports all HTML input types with
            built-in accessibility and RTL support.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Preview</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="w-full max-w-sm space-y-2">
                <Label htmlFor="preview-input">Email</Label>
                <Input id="preview-input" type="email" placeholder="name@example.com" />
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
            {/* Input Types */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Input Types</h3>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="text">Text</Label>
                    <Input id="text" type="text" placeholder="Enter text" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="name@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="number">Number</Label>
                    <Input id="number" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tel">Telephone</Label>
                    <Input id="tel" type="tel" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="url">URL</Label>
                    <Input id="url" type="url" placeholder="https://example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="search">Search</Label>
                    <Input id="search" type="search" placeholder="Search..." />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={typesCode} language="tsx" collapsible />
              </div>
            </div>

            {/* With Label */}
            <div>
              <h3 className="text-lg font-semibold mb-4">With Label</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-sm space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="Enter your username" />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withLabelCode} language="tsx" collapsible />
              </div>
            </div>

            {/* With Icon */}
            <div>
              <h3 className="text-lg font-semibold mb-4">With Icon</h3>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label>Email with Icon</Label>
                    <div className="relative">
                      <Mail className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input className="ps-9" placeholder="Email" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Password with Icon</Label>
                    <div className="relative">
                      <Lock className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type="password" className="ps-9" placeholder="Password" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Search with Icon</Label>
                    <div className="relative">
                      <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type="search" className="ps-9" placeholder="Search..." />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withIconCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Disabled and Read-only */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Disabled and Read-only</h3>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="disabled">Disabled Input</Label>
                    <Input id="disabled" disabled placeholder="Disabled input" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="readonly">Read-only Input</Label>
                    <Input id="readonly" readOnly value="Read-only value" />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={disabledCode} language="tsx" collapsible />
              </div>
            </div>

            {/* With Validation */}
            <div>
              <h3 className="text-lg font-semibold mb-4">With Validation</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-sm space-y-2">
                    <Label htmlFor="validated-email">Email</Label>
                    <Input
                      id="validated-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        validateEmail(e.target.value)
                      }}
                      className={error ? 'border-destructive' : ''}
                      placeholder="name@example.com"
                    />
                    {error && <p className="text-sm text-destructive">{error}</p>}
                    {email && !error && (
                      <p className="text-sm text-green-600 dark:text-green-500">Valid email!</p>
                    )}
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={validationCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Form Example */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Complete Form</h3>
              <Card>
                <CardContent className="p-6">
                  <form
                    className="max-w-sm space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault()
                      alert('Form submitted!')
                    }}
                  >
                    <div className="space-y-2">
                      <Label htmlFor="form-name">Name</Label>
                      <Input id="form-name" required placeholder="Enter your name" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="form-email">Email</Label>
                      <Input
                        id="form-email"
                        type="email"
                        required
                        placeholder="name@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="form-password">Password</Label>
                      <Input
                        id="form-password"
                        type="password"
                        required
                        placeholder="••••••••"
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Submit
                    </Button>
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
          <PropsTable props={inputProps} />
          <Card className="mt-4">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                The Input component extends all standard HTML input attributes including{' '}
                <code className="bg-muted px-1 rounded">value</code>,{' '}
                <code className="bg-muted px-1 rounded">onChange</code>,{' '}
                <code className="bg-muted px-1 rounded">onBlur</code>,{' '}
                <code className="bg-muted px-1 rounded">name</code>, and more.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Accessibility</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Always Use Labels</h3>
                <p className="text-muted-foreground">
                  Always pair inputs with labels using the{' '}
                  <code className="bg-muted px-1 rounded">htmlFor</code> attribute matching the
                  input&apos;s <code className="bg-muted px-1 rounded">id</code>. This is critical for
                  screen readers and improves usability.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Placeholder Text</h3>
                <p className="text-muted-foreground">
                  Don&apos;t rely solely on placeholder text for instructions. Use labels and helper
                  text. Placeholders disappear when typing and may not be read by all screen
                  readers.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Error Messages</h3>
                <p className="text-muted-foreground">
                  Associate error messages with inputs using{' '}
                  <code className="bg-muted px-1 rounded">aria-describedby</code>:
                </p>
                <CodeBlock
                  code={`<Input
  id="email"
  aria-describedby="email-error"
  aria-invalid={!!error}
/>
{error && <span id="email-error">{error}</span>}`}
                  language="tsx"
                  collapsible
                />
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Required Fields</h3>
                <p className="text-muted-foreground">
                  Use the <code className="bg-muted px-1 rounded">required</code> attribute and
                  indicate required fields visually (typically with an asterisk).
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
                Input fields automatically support RTL text direction. Text alignment and cursor
                position adapt based on the text direction.
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">LTR (English)</h4>
                  <div dir="ltr">
                    <div className="space-y-2">
                      <Label htmlFor="ltr-email">Email</Label>
                      <Input id="ltr-email" type="email" placeholder="name@example.com" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">RTL (العربية)</h4>
                  <div dir="rtl">
                    <div className="space-y-2">
                      <Label htmlFor="rtl-email">البريد الإلكتروني</Label>
                      <Input id="rtl-email" type="email" placeholder="أدخل بريدك الإلكتروني" />
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
            <Link href="/components/label">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Label</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Labels for form inputs
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/button">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Button</h3>
                  <p className="text-sm text-muted-foreground mt-1">Form submit buttons</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/textarea">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Textarea</h3>
                  <p className="text-sm text-muted-foreground mt-1">Multi-line text input</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
