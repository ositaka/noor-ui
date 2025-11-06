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
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DirectionToggle } from '@/components/docs/direction-toggle'
import { ThemeToggle } from '@/components/docs/theme-toggle'
import { Sparkles } from 'lucide-react'

export default function FormPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">RTL Design</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <DirectionToggle />
          </div>
        </div>
      </header>

      <main id="main-content" className="container py-12">
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
            <li className="text-foreground font-medium">Form</li>
          </ol>
        </nav>

        <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Form</h1>
        <p className="text-lg text-muted-foreground">
          Form state management with validation, error handling, and bilingual support.
        </p>
      </div>

      {/* Preview Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Preview</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center p-8">
              <div className="w-full max-w-md">
                <Form
                  initialValues={{ email: '', password: '' }}
                  validators={{
                    email: composeValidators(
                      validators.required('البريد الإلكتروني مطلوب'),
                      validators.email('الرجاء إدخال بريد إلكتروني صحيح')
                    ),
                    password: validators.minLength(8, 'يجب أن تكون كلمة المرور 8 أحرف على الأقل'),
                  }}
                  onSubmit={async (values) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000))
                    alert('تم تسجيل الدخول بنجاح!')
                  }}
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

                  <FormField name="password">
                    {({ field, error, touched }) => (
                      <FormItem>
                        <FormLabel required>كلمة المرور</FormLabel>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                          onBlur={field.onBlur}
                        />
                        {touched && <FormMessage error={error} />}
                        <FormDescription>يجب أن تكون 8 أحرف على الأقل</FormDescription>
                      </FormItem>
                    )}
                  </FormField>

                  <Button type="submit" className="w-full">
                    دخول
                  </Button>
                </Form>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Installation Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
        <Tabs defaultValue="cli" dir="ltr">
          <TabsList>
            <TabsTrigger value="cli">CLI</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
          </TabsList>
          <TabsContent value="cli" className="space-y-4">
            <p className="text-muted-foreground">
              Install the component using our CLI tool:
            </p>
            <div className="rounded-lg bg-muted p-4">
              <code className="text-sm">npx rtl-design-system add form</code>
            </div>
          </TabsContent>
          <TabsContent value="manual" className="space-y-4">
            <p className="text-muted-foreground">
              Copy and paste the component code into your project:
            </p>
            <div className="rounded-lg bg-muted p-4 overflow-x-auto">
              <code className="text-sm whitespace-pre">
{`// components/ui/form.tsx
// See full implementation in the repository
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'`}
              </code>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Usage Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
        <div className="rounded-lg bg-muted p-4 overflow-x-auto">
          <code className="text-sm whitespace-pre">
{`import { Form, FormField, FormItem, FormLabel, FormMessage, validators } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

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
            <Input {...field} />
            {touched && <FormMessage error={error} />}
          </FormItem>
        )}
      </FormField>
      <Button type="submit">Submit</Button>
    </Form>
  )
}`}
          </code>
        </div>
      </section>

      {/* Examples Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>

        {/* Example 1: Simple Contact Form */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Simple Contact Form</h3>
          <Card>
            <CardContent className="pt-6">
              <div className="max-w-md mx-auto">
                <Form
                  initialValues={{ name: '', email: '', message: '' }}
                  validators={{
                    name: validators.required('الاسم مطلوب'),
                    email: composeValidators(
                      validators.required('البريد الإلكتروني مطلوب'),
                      validators.email('الرجاء إدخال بريد إلكتروني صحيح')
                    ),
                    message: validators.minLength(10, 'يجب أن تكون الرسالة 10 أحرف على الأقل'),
                  }}
                  onSubmit={async (values) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000))
                    alert('تم إرسال رسالتك بنجاح!')
                  }}
                >
                  <FormField name="name">
                    {({ field, error, touched }) => (
                      <FormItem>
                        <FormLabel required>الاسم</FormLabel>
                        <Input
                          placeholder="أدخل اسمك"
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

                  <FormField name="message">
                    {({ field, error, touched }) => (
                      <FormItem>
                        <FormLabel required>الرسالة</FormLabel>
                        <Textarea
                          placeholder="اكتب رسالتك هنا..."
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                          onBlur={field.onBlur}
                          rows={4}
                        />
                        {touched && <FormMessage error={error} />}
                      </FormItem>
                    )}
                  </FormField>

                  <Button type="submit" className="w-full">
                    إرسال الرسالة
                  </Button>
                </Form>
              </div>
            </CardContent>
          </Card>
          <div className="rounded-lg bg-muted p-4 overflow-x-auto">
            <code className="text-sm whitespace-pre">
{`<Form
  initialValues={{ name: '', email: '', message: '' }}
  validators={{
    name: validators.required('الاسم مطلوب'),
    email: composeValidators(
      validators.required('البريد الإلكتروني مطلوب'),
      validators.email('الرجاء إدخال بريد إلكتروني صحيح')
    ),
    message: validators.minLength(10, 'يجب أن تكون الرسالة 10 أحرف على الأقل'),
  }}
  onSubmit={async (values) => {
    // Handle submission
  }}
>
  <FormField name="name">
    {({ field, error, touched }) => (
      <FormItem>
        <FormLabel required>الاسم</FormLabel>
        <Input {...field} />
        {touched && <FormMessage error={error} />}
      </FormItem>
    )}
  </FormField>
  {/* More fields... */}
</Form>`}
            </code>
          </div>
        </div>

        {/* Example 2: Form with Select */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Form with Select Fields</h3>
          <Card>
            <CardContent className="pt-6">
              <div className="max-w-md mx-auto">
                <Form
                  initialValues={{ country: '', city: '' }}
                  validators={{
                    country: validators.required('الدولة مطلوبة'),
                    city: validators.required('المدينة مطلوبة'),
                  }}
                  onSubmit={async (values) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000))
                    alert(`الدولة: ${values.country}, المدينة: ${values.city}`)
                  }}
                >
                  <FormField name="country">
                    {({ field, error, touched }) => (
                      <FormItem>
                        <FormLabel required>الدولة</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger onBlur={field.onBlur}>
                            <SelectValue placeholder="اختر الدولة" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sa">المملكة العربية السعودية</SelectItem>
                            <SelectItem value="ae">الإمارات العربية المتحدة</SelectItem>
                            <SelectItem value="kw">الكويت</SelectItem>
                            <SelectItem value="qa">قطر</SelectItem>
                            <SelectItem value="bh">البحرين</SelectItem>
                            <SelectItem value="om">عمان</SelectItem>
                          </SelectContent>
                        </Select>
                        {touched && <FormMessage error={error} />}
                      </FormItem>
                    )}
                  </FormField>

                  <FormField name="city">
                    {({ field, error, touched }) => (
                      <FormItem>
                        <FormLabel required>المدينة</FormLabel>
                        <Input
                          placeholder="أدخل اسم المدينة"
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                          onBlur={field.onBlur}
                        />
                        {touched && <FormMessage error={error} />}
                      </FormItem>
                    )}
                  </FormField>

                  <Button type="submit" className="w-full">
                    حفظ
                  </Button>
                </Form>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Example 3: Form with Checkbox */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Form with Checkbox</h3>
          <Card>
            <CardContent className="pt-6">
              <div className="max-w-md mx-auto">
                <Form
                  initialValues={{ terms: false, newsletter: false }}
                  validators={{
                    terms: (value) => (!value ? 'يجب الموافقة على الشروط والأحكام' : undefined),
                  }}
                  onSubmit={async (values) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000))
                    alert('تم التسجيل بنجاح!')
                  }}
                >
                  <FormField name="terms">
                    {({ field, error, touched }) => (
                      <FormItem>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Checkbox
                            id="terms"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            onBlur={field.onBlur}
                          />
                          <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            أوافق على الشروط والأحكام
                          </label>
                        </div>
                        {touched && <FormMessage error={error} />}
                      </FormItem>
                    )}
                  </FormField>

                  <FormField name="newsletter">
                    {({ field }) => (
                      <FormItem>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Checkbox
                            id="newsletter"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            onBlur={field.onBlur}
                          />
                          <label
                            htmlFor="newsletter"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            أرغب في تلقي النشرة الإخبارية
                          </label>
                        </div>
                        <FormDescription>يمكنك إلغاء الاشتراك في أي وقت</FormDescription>
                      </FormItem>
                    )}
                  </FormField>

                  <Button type="submit" className="w-full">
                    التسجيل
                  </Button>
                </Form>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Built-in Validators */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Built-in Validators</h2>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-start p-2 font-semibold">Validator</th>
                    <th className="text-start p-2 font-semibold">Usage</th>
                    <th className="text-start p-2 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2 font-mono text-xs">required</td>
                    <td className="p-2 font-mono text-xs">validators.required(&apos;Message&apos;)</td>
                    <td className="p-2">Ensures field is not empty</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-mono text-xs">email</td>
                    <td className="p-2 font-mono text-xs">validators.email(&apos;Message&apos;)</td>
                    <td className="p-2">Validates email format</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-mono text-xs">minLength</td>
                    <td className="p-2 font-mono text-xs">validators.minLength(8, &apos;Message&apos;)</td>
                    <td className="p-2">Minimum character length</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-mono text-xs">maxLength</td>
                    <td className="p-2 font-mono text-xs">validators.maxLength(100, &apos;Message&apos;)</td>
                    <td className="p-2">Maximum character length</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-mono text-xs">pattern</td>
                    <td className="p-2 font-mono text-xs">validators.pattern(/regex/, &apos;Message&apos;)</td>
                    <td className="p-2">Custom regex validation</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-mono text-xs">composeValidators</td>
                    <td className="p-2 font-mono text-xs">composeValidators(v1, v2, v3)</td>
                    <td className="p-2">Combine multiple validators</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Props Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Props</h2>

        <div className="space-y-6">
          {/* Form Props */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Form</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-start p-2 font-semibold">Prop</th>
                    <th className="text-start p-2 font-semibold">Type</th>
                    <th className="text-start p-2 font-semibold">Required</th>
                    <th className="text-start p-2 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2 font-mono text-xs">initialValues</td>
                    <td className="p-2 font-mono text-xs">Record&lt;string, any&gt;</td>
                    <td className="p-2">No</td>
                    <td className="p-2">Initial form values</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-mono text-xs">validators</td>
                    <td className="p-2 font-mono text-xs">Record&lt;string, Function&gt;</td>
                    <td className="p-2">No</td>
                    <td className="p-2">Field validators</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-mono text-xs">onSubmit</td>
                    <td className="p-2 font-mono text-xs">(values) =&gt; void | Promise</td>
                    <td className="p-2">Yes</td>
                    <td className="p-2">Submit handler</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* FormField Props */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">FormField</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-start p-2 font-semibold">Prop</th>
                    <th className="text-start p-2 font-semibold">Type</th>
                    <th className="text-start p-2 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2 font-mono text-xs">name</td>
                    <td className="p-2 font-mono text-xs">string</td>
                    <td className="p-2">Field name (must match validator key)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-mono text-xs">children</td>
                    <td className="p-2 font-mono text-xs">Render function</td>
                    <td className="p-2">Render prop with field, error, touched</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Other Components */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">FormItem / FormLabel / FormMessage / FormDescription</h3>
            <p className="text-sm text-muted-foreground">
              All sub-components accept standard HTML attributes and can be styled with className.
            </p>
          </div>
        </div>
      </section>

      {/* Accessibility Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Accessibility</h2>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Form Accessibility</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ms-4">
                <li>All form fields must have associated labels</li>
                <li>Use FormLabel component for proper label association</li>
                <li>Error messages are announced to screen readers</li>
                <li>Required fields are marked with asterisk (*)</li>
                <li>Form validation happens on blur and submit</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Keyboard Navigation</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ms-4">
                <li><kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">Tab</kbd> - Navigate between fields</li>
                <li><kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">Enter</kbd> - Submit form</li>
                <li><kbd className="px-2 py-1 text-xs font-semibold bg-muted rounded">Escape</kbd> - Blur current field</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* RTL Considerations */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">RTL Considerations</h2>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <p className="text-sm text-muted-foreground">
              The Form component is fully RTL-compatible with bilingual error message support.
            </p>
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">RTL Features:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ms-4">
                <li>Error messages and labels align correctly in RTL</li>
                <li>Required asterisk (*) positioned after label text (using ms-1)</li>
                <li>Form layout automatically mirrors in RTL mode</li>
                <li>Validation messages support Arabic and English</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Bilingual Validation:</h3>
              <div className="rounded-lg bg-muted p-4">
                <code className="text-sm whitespace-pre">
{`// Arabic validation messages
validators: {
  email: validators.required('البريد الإلكتروني مطلوب'),
  password: validators.minLength(8, 'يجب أن تكون كلمة المرور 8 أحرف على الأقل')
}

// English validation messages
validators: {
  email: validators.required('Email is required'),
  password: validators.minLength(8, 'Password must be at least 8 characters')
}`}
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Related Components */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Related Components</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:bg-accent transition-colors">
            <CardContent className="pt-6">
              <a href="/components/input" className="space-y-2 block">
                <h3 className="font-semibold">Input</h3>
                <p className="text-sm text-muted-foreground">
                  Text input field component
                </p>
              </a>
            </CardContent>
          </Card>
          <Card className="hover:bg-accent transition-colors">
            <CardContent className="pt-6">
              <a href="/components/textarea" className="space-y-2 block">
                <h3 className="font-semibold">Textarea</h3>
                <p className="text-sm text-muted-foreground">
                  Multi-line text input
                </p>
              </a>
            </CardContent>
          </Card>
          <Card className="hover:bg-accent transition-colors">
            <CardContent className="pt-6">
              <a href="/components/select" className="space-y-2 block">
                <h3 className="font-semibold">Select</h3>
                <p className="text-sm text-muted-foreground">
                  Dropdown selection component
                </p>
              </a>
            </CardContent>
          </Card>
          <Card className="hover:bg-accent transition-colors">
            <CardContent className="pt-6">
              <a href="/components/checkbox" className="space-y-2 block">
                <h3 className="font-semibold">Checkbox</h3>
                <p className="text-sm text-muted-foreground">
                  Checkbox input component
                </p>
              </a>
            </CardContent>
          </Card>
          <Card className="hover:bg-accent transition-colors">
            <CardContent className="pt-6">
              <a href="/components/button" className="space-y-2 block">
                <h3 className="font-semibold">Button</h3>
                <p className="text-sm text-muted-foreground">
                  Interactive button component
                </p>
              </a>
            </CardContent>
          </Card>
          <Card className="hover:bg-accent transition-colors">
            <CardContent className="pt-6">
              <a href="/examples/registration" className="space-y-2 block">
                <h3 className="font-semibold">Registration Example</h3>
                <p className="text-sm text-muted-foreground">
                  Multi-step form with Form component
                </p>
              </a>
            </CardContent>
          </Card>
        </div>
      </section>
        </div>
      </main>
    </div>
  )
}
