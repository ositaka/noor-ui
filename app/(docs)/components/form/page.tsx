'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
  validators,
  composeValidators,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getFormProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'initialValues',
    type: 'Record<string, any>',
    default: '{}',
    required: false,
    description: t.formComponent.props.initialValues,
  },
  {
    name: 'validators',
    type: 'Record<string, (value: any) => string | undefined>',
    default: '{}',
    required: false,
    description: t.formComponent.props.validators,
  },
  {
    name: 'onSubmit',
    type: '(values: Record<string, any>) => void | Promise<void>',
    default: '-',
    required: true,
    description: t.formComponent.props.onSubmit,
  },
]

const installCode = `npm install noorui-rtl`

const basicUsageCode = `import { Form, FormField, FormItem, FormLabel, FormMessage, validators } from 'noorui-rtl'
import { Input } from 'noorui-rtl'
import { Button } from 'noorui-rtl'

export default function MyForm() {
  return (
    <Form
      initialValues={{ email: '' }}
      validators={{
        email: validators.required('Email is required')
      }}
      onSubmit={(values) => console.log(values)}
    >
      <FormField name="email">
        {({ field, error, touched }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <Input
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              onBlur={field.onBlur}
            />
            {touched && <FormMessage error={error} />}
          </FormItem>
        )}
      </FormField>
      <Button type="submit">Submit</Button>
    </Form>
  )
}`

const validationCode = `import { validators, composeValidators } from 'noorui-rtl'

const formValidators = {
  email: composeValidators(
    validators.required('Email is required'),
    validators.email('Please enter a valid email')
  ),
  password: validators.minLength(8, 'Password must be at least 8 characters'),
  name: validators.required('Name is required')
}`

const selectCode = `<FormField name="country">
  {({ field, error, touched }) => (
    <FormItem>
      <FormLabel required>Country</FormLabel>
      <Select value={field.value} onValueChange={field.onChange}>
        <SelectTrigger onBlur={field.onBlur}>
          <SelectValue placeholder="Select country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sa">Saudi Arabia</SelectItem>
          <SelectItem value="ae">UAE</SelectItem>
          <SelectItem value="kw">Kuwait</SelectItem>
        </SelectContent>
      </Select>
      {touched && <FormMessage error={error} />}
    </FormItem>
  )}
</FormField>`

const rtlCode = `// Bilingual validation messages
validators: {
  email: validators.required(
    dir === 'rtl'
      ? 'البريد الإلكتروني مطلوب'
      : 'Email is required'
  )
}`

export default function FormPage() {
  const { locale } = useDirection()
  const t = content[locale]
  const formProps = getFormProps(t)

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
            <li className="text-foreground font-medium">{t.formComponent.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.formComponent.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.formComponent.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.formComponent.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="w-full max-w-md mx-auto">
                <Form
                  initialValues={{ email: '', password: '' }}
                  validators={{
                    email: validators.required('Email is required'),
                    password: validators.minLength(6, 'Password must be at least 6 characters'),
                  }}
                  onSubmit={async (values) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000))
                    alert('Form submitted!')
                  }}
                >
                  <FormField name="email">
                    {({ field, error, touched }) => (
                      <FormItem>
                        <FormLabel required>{t.formComponent.fields.email}</FormLabel>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                          onBlur={field.onBlur}
                        />
                        {touched && <FormMessage error={error} />}
                      </FormItem>
                    )}
                  </FormField>

                  <FormField name="password">
                    {({ field, error, touched }) => (
                      <FormItem>
                        <FormLabel required>{t.formComponent.fields.password}</FormLabel>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                          onBlur={field.onBlur}
                        />
                        {touched && <FormMessage error={error} />}
                        <FormDescription>{t.formComponent.labels.atLeast6Chars}</FormDescription>
                      </FormItem>
                    )}
                  </FormField>

                  <Button type="submit" className="w-full">
                    {t.formComponent.labels.signIn}
                  </Button>
                </Form>
              </div>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.formComponent.installation}</h2>
          <CodeBlock code={installCode} language="bash" title="Terminal" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.formComponent.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.formComponent.examples.title}</h2>

          <div className="space-y-8">
            {/* Validation */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.formComponent.examples.withValidation}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="w-full max-w-md mx-auto">
                    <Form
                      initialValues={{ name: '', email: '' }}
                      validators={{
                        name: validators.required('Name is required'),
                        email: composeValidators(
                          validators.required('Email is required'),
                          validators.email('Please enter a valid email address')
                        ),
                      }}
                      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
                    >
                      <FormField name="name">
                        {({ field, error, touched }) => (
                          <FormItem>
                            <FormLabel required>{t.formComponent.fields.name}</FormLabel>
                            <Input
                              placeholder={t.formComponent.placeholders.enterName}
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                              onBlur={field.onBlur}
                            />
                            {touched && <FormMessage error={error} />}
                          </FormItem>
                        )}
                      </FormField>

                      <FormField name="email">
                        {({ field, error, touched }) => (
                          <FormItem>
                            <FormLabel required>{t.formComponent.fields.email}</FormLabel>
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                              onBlur={field.onBlur}
                            />
                            {touched && <FormMessage error={error} />}
                          </FormItem>
                        )}
                      </FormField>

                      <Button type="submit" className="w-full">
                        {t.formComponent.labels.submit}
                      </Button>
                    </Form>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={validationCode} language="tsx" collapsible />
              </div>
            </div>

            {/* With Select */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.formComponent.examples.withSelect}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="w-full max-w-md mx-auto">
                    <Form
                      initialValues={{ country: '' }}
                      validators={{
                        country: validators.required('Country is required'),
                      }}
                      onSubmit={(values) => alert(`Selected: ${values.country}`)}
                    >
                      <FormField name="country">
                        {({ field, error, touched }) => (
                          <FormItem>
                            <FormLabel required>{t.formComponent.fields.country}</FormLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger onBlur={field.onBlur}>
                                <SelectValue placeholder={t.formComponent.placeholders.selectCountry} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sa">Saudi Arabia</SelectItem>
                                <SelectItem value="ae">United Arab Emirates</SelectItem>
                                <SelectItem value="kw">Kuwait</SelectItem>
                                <SelectItem value="qa">Qatar</SelectItem>
                                <SelectItem value="bh">Bahrain</SelectItem>
                                <SelectItem value="om">Oman</SelectItem>
                              </SelectContent>
                            </Select>
                            {touched && <FormMessage error={error} />}
                          </FormItem>
                        )}
                      </FormField>

                      <Button type="submit" className="w-full">
                        {t.formComponent.labels.save}
                      </Button>
                    </Form>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={selectCode} language="tsx" collapsible />
              </div>
            </div>
          </div>
        </section>

        {/* Built-in Validators */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.formComponent.builtInValidators.title}</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="grid gap-4 text-sm">
                  <div className="grid grid-cols-3 gap-4 font-semibold border-b pb-2">
                    <div>{t.formComponent.builtInValidators.validator}</div>
                    <div>{t.formComponent.builtInValidators.usage}</div>
                    <div>{t.formComponent.builtInValidators.description}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <code className="text-xs">required</code>
                    <code className="text-xs">validators.required(&apos;Message&apos;)</code>
                    <div>{t.formComponent.builtInValidators.required}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <code className="text-xs">email</code>
                    <code className="text-xs">validators.email(&apos;Message&apos;)</code>
                    <div>{t.formComponent.builtInValidators.emailValid}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <code className="text-xs">minLength</code>
                    <code className="text-xs">validators.minLength(8, &apos;Message&apos;)</code>
                    <div>{t.formComponent.builtInValidators.minLength}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <code className="text-xs">maxLength</code>
                    <code className="text-xs">validators.maxLength(100, &apos;Message&apos;)</code>
                    <div>{t.formComponent.builtInValidators.maxLength}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <code className="text-xs">pattern</code>
                    <code className="text-xs">validators.pattern(/regex/, &apos;Message&apos;)</code>
                    <div>{t.formComponent.builtInValidators.pattern}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <code className="text-xs">composeValidators</code>
                    <code className="text-xs">composeValidators(v1, v2)</code>
                    <div>{t.formComponent.builtInValidators.compose}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.formComponent.props.title}</h2>
          <PropsTable props={formProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.formComponent.accessibility.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t.formComponent.accessibility.formLabels}</h3>
                <p className="text-muted-foreground text-sm">
                  {t.formComponent.accessibility.formLabelsDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.formComponent.accessibility.errorMessages}</h3>
                <p className="text-muted-foreground text-sm">
                  {t.formComponent.accessibility.errorMessagesDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.formComponent.accessibility.keyboardNavigation}</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Tab</kbd>: {t.formComponent.accessibility.keyboardTab}</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Enter</kbd>: {t.formComponent.accessibility.keyboardEnter}</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Escape</kbd>: {t.formComponent.accessibility.keyboardEscape}</li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.formComponent.accessibility.requiredFields}</h3>
                <p className="text-muted-foreground text-sm">
                  {t.formComponent.accessibility.requiredFieldsDesc}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Considerations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.formComponent.rtl.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                {t.formComponent.rtl.description}
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{t.formComponent.rtl.ltr}</h4>
                  <div dir="ltr">
                    <Form
                      initialValues={{ email: '' }}
                      validators={{
                        email: validators.required('Email is required'),
                      }}
                      onSubmit={() => {}}
                    >
                      <FormField name="email">
                        {({ field, error, touched }) => (
                          <FormItem>
                            <FormLabel required>Email</FormLabel>
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                              onBlur={field.onBlur}
                            />
                            {touched && <FormMessage error={error} />}
                          </FormItem>
                        )}
                      </FormField>
                    </Form>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{t.formComponent.rtl.rtlLabel}</h4>
                  <div dir="rtl">
                    <Form
                      initialValues={{ email: '' }}
                      validators={{
                        email: validators.required('البريد الإلكتروني مطلوب'),
                      }}
                      onSubmit={() => {}}
                    >
                      <FormField name="email">
                        {({ field, error, touched }) => (
                          <FormItem>
                            <FormLabel required>البريد الإلكتروني</FormLabel>
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                              onBlur={field.onBlur}
                            />
                            {touched && <FormMessage error={error} />}
                          </FormItem>
                        )}
                      </FormField>
                    </Form>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.formComponent.related.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/input">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.formComponent.related.input}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.formComponent.related.inputDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/textarea">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.formComponent.related.textarea}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.formComponent.related.textareaDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/select">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.formComponent.related.select}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.formComponent.related.selectDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/checkbox">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.formComponent.related.checkbox}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.formComponent.related.checkboxDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/button">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.formComponent.related.button}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.formComponent.related.buttonDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/examples/registration">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.formComponent.related.registrationExample}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.formComponent.related.registrationExampleDesc}
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
