'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getTextareaProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'placeholder',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.textareaComponent.props.placeholder,
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    required: false,
    description: t.textareaComponent.props.disabled,
  },
  {
    name: 'readOnly',
    type: 'boolean',
    default: 'false',
    required: false,
    description: t.textareaComponent.props.readOnly,
  },
  {
    name: 'required',
    type: 'boolean',
    default: 'false',
    required: false,
    description: t.textareaComponent.props.required,
  },
  {
    name: 'rows',
    type: 'number',
    default: 'undefined',
    required: false,
    description: t.textareaComponent.props.rows,
  },
  {
    name: 'maxLength',
    type: 'number',
    default: 'undefined',
    required: false,
    description: t.textareaComponent.props.maxLength,
  },
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.textareaComponent.props.className,
  },
]

const installCode = `npm install noorui-rtl`

const basicUsageCode = `import { Textarea } from 'noorui-rtl'
import { Label } from 'noorui-rtl'

<div className="space-y-2">
  <Label htmlFor="message">Message</Label>
  <Textarea id="message" placeholder="Enter your message" />
</div>`

const withLabelCode = `<div className="space-y-2">
  <Label htmlFor="bio">Bio</Label>
  <Textarea
    id="bio"
    placeholder="Tell us about yourself"
  />
</div>`

const customHeightCode = `// Fixed height with rows
<Textarea rows={3} placeholder="3 rows" />

// Custom height with className
<Textarea
  className="min-h-[150px]"
  placeholder="Custom height"
/>

// Resizable
<Textarea
  className="resize-y"
  placeholder="Vertically resizable"
/>

// Non-resizable
<Textarea
  className="resize-none"
  placeholder="Non-resizable"
/>`

const characterCountCode = `const [value, setValue] = React.useState('')
const maxLength = 200

return (
  <div className="space-y-2">
    <Label htmlFor="description">Description</Label>
    <Textarea
      id="description"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      maxLength={maxLength}
      placeholder="Enter description"
    />
    <p className="text-xs text-muted-foreground text-end">
      {value.length} / {maxLength}
    </p>
  </div>
)`

const disabledCode = `<div className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="disabled">Disabled</Label>
    <Textarea id="disabled" disabled placeholder="Disabled textarea" />
  </div>
  <div className="space-y-2">
    <Label htmlFor="readonly">Read-only</Label>
    <Textarea
      id="readonly"
      readOnly
      value="This text cannot be edited."
    />
  </div>
</div>`

const validationCode = `const [value, setValue] = React.useState('')
const [error, setError] = React.useState('')

const validate = (text: string) => {
  if (text.length < 10) {
    setError('Message must be at least 10 characters')
  } else {
    setError('')
  }
}

return (
  <div className="space-y-2">
    <Label htmlFor="feedback">Feedback</Label>
    <Textarea
      id="feedback"
      value={value}
      onChange={(e) => {
        setValue(e.target.value)
        validate(e.target.value)
      }}
      className={error ? 'border-destructive' : ''}
      placeholder="Enter your feedback"
    />
    {error && <p className="text-sm text-destructive">{error}</p>}
    {value.length >= 10 && !error && (
      <p className="text-sm text-green-600 dark:text-green-500">
        Looks good!
      </p>
    )}
  </div>
)`

const formCode = `<form className="space-y-6">
  <div className="space-y-2">
    <Label htmlFor="subject">Subject</Label>
    <Input id="subject" required />
  </div>

  <div className="space-y-2">
    <Label htmlFor="message">Message</Label>
    <Textarea
      id="message"
      required
      rows={5}
      placeholder="Enter your message"
    />
  </div>

  <Button type="submit">Send Message</Button>
</form>`

const autoExpandCode = `const textareaRef = React.useRef<HTMLTextAreaElement>(null)

const handleInput = () => {
  const textarea = textareaRef.current
  if (textarea) {
    textarea.style.height = 'auto'
    textarea.style.height = textarea.scrollHeight + 'px'
  }
}

return (
  <Textarea
    ref={textareaRef}
    onInput={handleInput}
    placeholder="Type to expand..."
    className="resize-none overflow-hidden"
  />
)`

const rtlCode = `// RTL support is automatic!
// Text alignment and direction adapt automatically

<div className="space-y-2">
  <Label htmlFor="rtl-message">الرسالة</Label>
  <Textarea id="rtl-message" placeholder="أدخل رسالتك هنا" />
</div>`

export default function TextareaPage() {
  const { locale } = useDirection()
  const t = content[locale]
  const textareaProps = getTextareaProps(t)

  const [value, setValue] = React.useState('')
  const [validatedValue, setValidatedValue] = React.useState('')
  const [error, setError] = React.useState('')
  const maxLength = 200

  const validate = (text: string) => {
    if (text && text.length < 10) {
      setError(t.textareaComponent.validation.minCharacters)
    } else {
      setError('')
    }
  }

  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const handleInput = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = textarea.scrollHeight + 'px'
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
            <li className="text-foreground font-medium">{t.textareaComponent.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.textareaComponent.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.textareaComponent.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.textareaComponent.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="w-full max-w-md space-y-2">
                <Label htmlFor="preview">{t.textareaComponent.labels.message}</Label>
                <Textarea id="preview" placeholder={t.textareaComponent.placeholders.enterMessage} />
              </div>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.textareaComponent.installation}</h2>
          <CodeBlock code={installCode} language="bash" title="Terminal" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.textareaComponent.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.textareaComponent.examples.title}</h2>

          <div className="space-y-8">
            {/* With Label */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.textareaComponent.examples.withLabel}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-md space-y-2">
                    <Label htmlFor="bio">{t.textareaComponent.labels.bio}</Label>
                    <Textarea id="bio" placeholder={t.textareaComponent.placeholders.tellAboutYourself} />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withLabelCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Custom Height */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.textareaComponent.examples.customHeight}</h3>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label>{t.textareaComponent.values.fixedHeight}</Label>
                    <Textarea rows={3} placeholder="3 rows" />
                  </div>
                  <div className="space-y-2">
                    <Label>{t.textareaComponent.values.customHeight}</Label>
                    <Textarea className="min-h-[150px]" placeholder={t.textareaComponent.values.customHeight} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t.textareaComponent.values.verticallyResizable}</Label>
                    <Textarea className="resize-y" placeholder={t.textareaComponent.values.verticallyResizable} />
                  </div>
                  <div className="space-y-2">
                    <Label>{t.textareaComponent.values.nonResizable}</Label>
                    <Textarea className="resize-none" placeholder={t.textareaComponent.values.nonResizable} />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={customHeightCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Character Count */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.textareaComponent.examples.characterCount}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-md space-y-2">
                    <Label htmlFor="description">{t.textareaComponent.labels.description}</Label>
                    <Textarea
                      id="description"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      maxLength={maxLength}
                      placeholder={t.textareaComponent.placeholders.enterDescription}
                    />
                    <p className="text-xs text-muted-foreground text-end">
                      {value.length} / {maxLength}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={characterCountCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Disabled and Read-only */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.textareaComponent.examples.disabled}</h3>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="disabled">{t.textareaComponent.labels.disabled}</Label>
                    <Textarea id="disabled" disabled placeholder={t.textareaComponent.placeholders.disabledTextarea} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="readonly">{t.textareaComponent.labels.readonly}</Label>
                    <Textarea
                      id="readonly"
                      readOnly
                      value={t.textareaComponent.values.readonlyText}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={disabledCode} language="tsx" collapsible />
              </div>
            </div>

            {/* With Validation */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.textareaComponent.examples.validation}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-md space-y-2">
                    <Label htmlFor="feedback">{t.textareaComponent.labels.feedback}</Label>
                    <Textarea
                      id="feedback"
                      value={validatedValue}
                      onChange={(e) => {
                        setValidatedValue(e.target.value)
                        validate(e.target.value)
                      }}
                      className={error ? 'border-destructive' : ''}
                      placeholder={t.textareaComponent.placeholders.enterFeedback}
                    />
                    {error && <p className="text-sm text-destructive">{error}</p>}
                    {validatedValue.length >= 10 && !error && (
                      <p className="text-sm text-green-600 dark:text-green-500">{t.textareaComponent.validation.looksGood}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={validationCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Auto-expand */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.textareaComponent.examples.autoExpand}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-md space-y-2">
                    <Label>{t.textareaComponent.labels.autoExpanding}</Label>
                    <Textarea
                      ref={textareaRef}
                      onInput={handleInput}
                      placeholder={t.textareaComponent.placeholders.typeToExpand}
                      className="resize-none overflow-hidden"
                      rows={1}
                    />
                    <p className="text-xs text-muted-foreground">
                      {t.textareaComponent.values.heightAdjusts}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={autoExpandCode} language="tsx" collapsible />
              </div>
            </div>

            {/* In Forms */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.textareaComponent.examples.inForms}</h3>
              <Card>
                <CardContent className="p-6">
                  <form
                    className="max-w-md space-y-6"
                    onSubmit={(e) => {
                      e.preventDefault()
                      alert('Form submitted!')
                    }}
                  >
                    <div className="space-y-2">
                      <Label htmlFor="subject">{t.textareaComponent.labels.subject}</Label>
                      <input
                        id="subject"
                        required
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">{t.textareaComponent.labels.message}</Label>
                      <Textarea
                        id="message"
                        required
                        rows={5}
                        placeholder={t.textareaComponent.placeholders.enterMessage}
                      />
                    </div>

                    <Button type="submit">{t.textareaComponent.buttons.sendMessage}</Button>
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.textareaComponent.props.title}</h2>
          <PropsTable props={textareaProps} />
          <Card className="mt-4">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                {t.textareaComponent.props.note}{' '}
                <code className="bg-muted px-1 rounded">value</code>,{' '}
                <code className="bg-muted px-1 rounded">onChange</code>,{' '}
                <code className="bg-muted px-1 rounded">onBlur</code>, and more.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.textareaComponent.accessibility.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t.textareaComponent.accessibility.alwaysUseLabels}</h3>
                <p className="text-muted-foreground">
                  {t.textareaComponent.accessibility.alwaysUseLabelsDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.textareaComponent.accessibility.placeholderText}</h3>
                <p className="text-muted-foreground">
                  {t.textareaComponent.accessibility.placeholderTextDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.textareaComponent.accessibility.errorMessages}</h3>
                <p className="text-muted-foreground">
                  {t.textareaComponent.accessibility.errorMessagesDesc}
                </p>
                <CodeBlock
                  code={`<Textarea
  id="bio"
  aria-describedby="bio-error"
  aria-invalid={!!error}
/>
{error && <span id="bio-error">{error}</span>}`}
                  language="tsx"
                  collapsible
                />
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.textareaComponent.accessibility.characterLimits}</h3>
                <p className="text-muted-foreground">
                  {t.textareaComponent.accessibility.characterLimitsDesc}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Considerations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.textareaComponent.rtl.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                {t.textareaComponent.rtl.description}
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{t.textareaComponent.rtl.ltr}</h4>
                  <div dir="ltr">
                    <div className="space-y-2">
                      <Label htmlFor="ltr-textarea">{t.textareaComponent.rtl.messageAr}</Label>
                      <Textarea
                        id="ltr-textarea"
                        placeholder={t.textareaComponent.placeholders.typeHere}
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{t.textareaComponent.rtl.rtlLabel}</h4>
                  <div dir="rtl">
                    <div className="space-y-2">
                      <Label htmlFor="rtl-textarea">الرسالة</Label>
                      <Textarea id="rtl-textarea" placeholder="اكتب رسالتك هنا" rows={3} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.textareaComponent.related.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/input">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.textareaComponent.related.input}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t.textareaComponent.related.inputDesc}</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/label">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.textareaComponent.related.label}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t.textareaComponent.related.labelDesc}</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/button">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.textareaComponent.related.button}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t.textareaComponent.related.buttonDesc}</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
