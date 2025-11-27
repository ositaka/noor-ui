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
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getInputProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'type',
    type: "'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | ...",
    default: "'text'",
    required: false,
    description: t.inputComponent.props.type,
  },
  {
    name: 'placeholder',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.inputComponent.props.placeholder,
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    required: false,
    description: t.inputComponent.props.disabled,
  },
  {
    name: 'readOnly',
    type: 'boolean',
    default: 'false',
    required: false,
    description: t.inputComponent.props.readOnly,
  },
  {
    name: 'required',
    type: 'boolean',
    default: 'false',
    required: false,
    description: t.inputComponent.props.required,
  },
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.inputComponent.props.className,
  },
]

const installCode = `npm install noorui-rtl`

const basicUsageCode = `import { Input } from 'noorui-rtl'
import { Label } from 'noorui-rtl'

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

const withLabelCode = `import { Input } from 'noorui-rtl'
import { Label } from 'noorui-rtl'

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
  const { locale } = useDirection()
  const t = content[locale]
  const inputProps = getInputProps(t)

  const [email, setEmail] = React.useState('')
  const [error, setError] = React.useState('')

  const validateEmail = (value: string) => {
    if (value && !value.includes('@')) {
      setError(t.inputComponent.validation.invalidEmail)
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
            <li className="text-foreground font-medium">{t.inputComponent.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.inputComponent.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.inputComponent.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="w-full max-w-sm space-y-2">
                <Label htmlFor="preview-input">{t.inputComponent.labels.email}</Label>
                <Input id="preview-input" type="email" placeholder={t.inputComponent.placeholders.nameExample} />
              </div>
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.examples}</h2>

          <div className="space-y-8">
            {/* Input Types */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.inputComponent.examples.inputTypes}</h3>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="text">{t.inputComponent.labels.text}</Label>
                    <Input id="text" type="text" placeholder={t.inputComponent.placeholders.enterText} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.inputComponent.labels.email}</Label>
                    <Input id="email" type="email" placeholder={t.inputComponent.placeholders.nameExample} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">{t.inputComponent.labels.password}</Label>
                    <Input id="password" type="password" placeholder={t.inputComponent.placeholders.passwordDots} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="number">{t.inputComponent.labels.number}</Label>
                    <Input id="number" type="number" placeholder={t.inputComponent.placeholders.zero} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tel">{t.inputComponent.labels.telephone}</Label>
                    <Input id="tel" type="tel" placeholder={t.inputComponent.placeholders.phoneNumber} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="url">{t.inputComponent.labels.url}</Label>
                    <Input id="url" type="url" placeholder={t.inputComponent.placeholders.httpsExample} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="search">{t.inputComponent.labels.search}</Label>
                    <Input id="search" type="search" placeholder={t.inputComponent.placeholders.searchDots} />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={typesCode} language="tsx" collapsible />
              </div>
            </div>

            {/* With Label */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.inputComponent.examples.withLabel}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-sm space-y-2">
                    <Label htmlFor="username">{t.inputComponent.labels.username}</Label>
                    <Input id="username" placeholder={t.inputComponent.placeholders.enterUsername} />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withLabelCode} language="tsx" collapsible />
              </div>
            </div>

            {/* With Icon */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.inputComponent.examples.withIcon}</h3>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label>{t.inputComponent.labels.emailWithIcon}</Label>
                    <div className="relative">
                      <Mail className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input className="ps-9" placeholder={t.inputComponent.placeholders.emailPlaceholder} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>{t.inputComponent.labels.passwordWithIcon}</Label>
                    <div className="relative">
                      <Lock className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type="password" className="ps-9" placeholder={t.inputComponent.placeholders.passwordPlaceholder} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>{t.inputComponent.labels.searchWithIcon}</Label>
                    <div className="relative">
                      <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type="search" className="ps-9" placeholder={t.inputComponent.placeholders.searchDots} />
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
              <h3 className="text-lg font-semibold mb-4">{t.inputComponent.examples.disabledReadonly}</h3>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="disabled">{t.inputComponent.labels.disabledInput}</Label>
                    <Input id="disabled" disabled placeholder={t.inputComponent.placeholders.disabledInput} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="readonly">{t.inputComponent.labels.readonlyInput}</Label>
                    <Input id="readonly" readOnly value={t.inputComponent.placeholders.readonlyValue} />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={disabledCode} language="tsx" collapsible />
              </div>
            </div>

            {/* With Validation */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.inputComponent.examples.withValidation}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-sm space-y-2">
                    <Label htmlFor="validated-email">{t.inputComponent.labels.email}</Label>
                    <Input
                      id="validated-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        validateEmail(e.target.value)
                      }}
                      className={error ? 'border-destructive' : ''}
                      placeholder={t.inputComponent.placeholders.nameExample}
                    />
                    {error && <p className="text-sm text-destructive">{error}</p>}
                    {email && !error && (
                      <p className="text-sm text-green-600 dark:text-green-500">{t.inputComponent.validation.validEmail}</p>
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
              <h3 className="text-lg font-semibold mb-4">{t.inputComponent.examples.completeForm}</h3>
              <Card>
                <CardContent className="p-6">
                  <form
                    className="max-w-sm space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault()
                      alert(t.inputComponent.form.formSubmitted)
                    }}
                  >
                    <div className="space-y-2">
                      <Label htmlFor="form-name">{t.inputComponent.labels.name}</Label>
                      <Input id="form-name" required placeholder={t.inputComponent.placeholders.enterName} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="form-email">{t.inputComponent.labels.email}</Label>
                      <Input
                        id="form-email"
                        type="email"
                        required
                        placeholder={t.inputComponent.placeholders.nameExample}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="form-password">{t.inputComponent.labels.password}</Label>
                      <Input
                        id="form-password"
                        type="password"
                        required
                        placeholder={t.inputComponent.placeholders.passwordDots}
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      {t.inputComponent.form.submit}
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.props}</h2>
          <PropsTable props={inputProps} />
          <Card className="mt-4">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                {t.inputComponent.props.extendsNote}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.accessibility}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t.inputComponent.accessibility.alwaysUseLabelsTitle}</h3>
                <p className="text-muted-foreground">
                  {t.inputComponent.accessibility.alwaysUseLabelsDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.inputComponent.accessibility.placeholderTitle}</h3>
                <p className="text-muted-foreground">
                  {t.inputComponent.accessibility.placeholderDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.inputComponent.accessibility.errorMessagesTitle}</h3>
                <p className="text-muted-foreground">
                  {t.inputComponent.accessibility.errorMessagesDesc}
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
                <h3 className="font-semibold mb-2">{t.inputComponent.accessibility.requiredFieldsTitle}</h3>
                <p className="text-muted-foreground">
                  {t.inputComponent.accessibility.requiredFieldsDesc}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Considerations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.rtlConsiderations}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                {t.inputComponent.rtl.description}
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{t.componentDocs.ltr}</h4>
                  <div dir="ltr">
                    <div className="space-y-2">
                      <Label htmlFor="ltr-email">Email</Label>
                      <Input id="ltr-email" type="email" placeholder="name@example.com" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{t.componentDocs.rtl}</h4>
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.inputComponent.relatedTitle}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/label">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.inputComponent.related.label}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.inputComponent.related.labelDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/button">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.inputComponent.related.button}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t.inputComponent.related.buttonDesc}</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/textarea">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.inputComponent.related.textarea}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t.inputComponent.related.textareaDesc}</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
