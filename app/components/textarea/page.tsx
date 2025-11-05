'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { DirectionToggle } from '@/components/docs/direction-toggle'
import { ThemeToggle } from '@/components/docs/theme-toggle'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Sparkles } from 'lucide-react'

const textareaProps: PropDefinition[] = [
  {
    name: 'placeholder',
    type: 'string',
    default: 'undefined',
    required: false,
    description: 'Placeholder text shown when textarea is empty',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Disables the textarea',
  },
  {
    name: 'readOnly',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Makes the textarea read-only',
  },
  {
    name: 'required',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Marks the textarea as required',
  },
  {
    name: 'rows',
    type: 'number',
    default: 'undefined',
    required: false,
    description: 'Number of visible text rows',
  },
  {
    name: 'maxLength',
    type: 'number',
    default: 'undefined',
    required: false,
    description: 'Maximum number of characters allowed',
  },
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: 'Additional CSS classes to apply',
  },
]

const installCode = `npm install @rtl-design-system/core`

const basicUsageCode = `import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

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
  const [value, setValue] = React.useState('')
  const [validatedValue, setValidatedValue] = React.useState('')
  const [error, setError] = React.useState('')
  const maxLength = 200

  const validate = (text: string) => {
    if (text && text.length < 10) {
      setError('Message must be at least 10 characters')
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
            <li className="text-foreground font-medium">Textarea</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Textarea</h1>
          <p className="text-xl text-muted-foreground">
            Multi-line text input for longer content. Supports auto-resize, character counting, and
            full RTL support with proper text alignment.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Preview</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="w-full max-w-md space-y-2">
                <Label htmlFor="preview">Message</Label>
                <Textarea id="preview" placeholder="Enter your message" />
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
            {/* With Label */}
            <div>
              <h3 className="text-lg font-semibold mb-4">With Label</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-md space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" placeholder="Tell us about yourself" />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withLabelCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Custom Height */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Custom Height & Resize</h3>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label>Fixed height (3 rows)</Label>
                    <Textarea rows={3} placeholder="3 rows" />
                  </div>
                  <div className="space-y-2">
                    <Label>Custom height</Label>
                    <Textarea className="min-h-[150px]" placeholder="Custom height" />
                  </div>
                  <div className="space-y-2">
                    <Label>Vertically resizable</Label>
                    <Textarea className="resize-y" placeholder="Vertically resizable" />
                  </div>
                  <div className="space-y-2">
                    <Label>Non-resizable</Label>
                    <Textarea className="resize-none" placeholder="Non-resizable" />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={customHeightCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Character Count */}
            <div>
              <h3 className="text-lg font-semibold mb-4">With Character Count</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-md space-y-2">
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
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={characterCountCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Disabled and Read-only */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Disabled and Read-only</h3>
              <Card>
                <CardContent className="p-6 space-y-4">
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
                  <div className="max-w-md space-y-2">
                    <Label htmlFor="feedback">Feedback</Label>
                    <Textarea
                      id="feedback"
                      value={validatedValue}
                      onChange={(e) => {
                        setValidatedValue(e.target.value)
                        validate(e.target.value)
                      }}
                      className={error ? 'border-destructive' : ''}
                      placeholder="Enter your feedback (min 10 characters)"
                    />
                    {error && <p className="text-sm text-destructive">{error}</p>}
                    {validatedValue.length >= 10 && !error && (
                      <p className="text-sm text-green-600 dark:text-green-500">Looks good!</p>
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
              <h3 className="text-lg font-semibold mb-4">Auto-expanding</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-md space-y-2">
                    <Label>Auto-expanding textarea</Label>
                    <Textarea
                      ref={textareaRef}
                      onInput={handleInput}
                      placeholder="Type to expand..."
                      className="resize-none overflow-hidden"
                      rows={1}
                    />
                    <p className="text-xs text-muted-foreground">
                      Height adjusts automatically as you type
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
              <h3 className="text-lg font-semibold mb-4">In Forms</h3>
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
                      <Label htmlFor="subject">Subject</Label>
                      <input
                        id="subject"
                        required
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                      />
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
          <PropsTable props={textareaProps} />
          <Card className="mt-4">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                The Textarea component extends all standard HTML textarea attributes including{' '}
                <code className="bg-muted px-1 rounded">value</code>,{' '}
                <code className="bg-muted px-1 rounded">onChange</code>,{' '}
                <code className="bg-muted px-1 rounded">onBlur</code>, and more.
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
                  Always pair textareas with labels using the{' '}
                  <code className="bg-muted px-1 rounded">htmlFor</code> attribute. This is
                  essential for screen readers and improves usability.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Placeholder Text</h3>
                <p className="text-muted-foreground">
                  Don&apos;t rely solely on placeholder text for instructions. Use labels and
                  helper text. Placeholders disappear when typing.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Error Messages</h3>
                <p className="text-muted-foreground">
                  Associate error messages with textareas using{' '}
                  <code className="bg-muted px-1 rounded">aria-describedby</code>:
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
                <h3 className="font-semibold mb-2">Character Limits</h3>
                <p className="text-muted-foreground">
                  When using <code className="bg-muted px-1 rounded">maxLength</code>, provide
                  visual feedback about the character count so users know how much space they have.
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
                Textareas automatically support RTL text direction. Text alignment and scrollbar
                position adapt based on the text direction.
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">LTR (English)</h4>
                  <div dir="ltr">
                    <div className="space-y-2">
                      <Label htmlFor="ltr-textarea">Message</Label>
                      <Textarea
                        id="ltr-textarea"
                        placeholder="Type your message here"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">RTL (العربية)</h4>
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">Related Components</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/input">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Input</h3>
                  <p className="text-sm text-muted-foreground mt-1">Single-line text input</p>
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
            <Link href="/components/button">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Button</h3>
                  <p className="text-sm text-muted-foreground mt-1">Form submit buttons</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
