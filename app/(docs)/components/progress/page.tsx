'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
const progressProps: PropDefinition[] = [
  {
    name: 'value',
    type: 'number',
    default: '0',
    required: false,
    description: 'The progress value (0-100)',
  },
  {
    name: 'max',
    type: 'number',
    default: '100',
    required: false,
    description: 'The maximum progress value',
  },
]

const installCode = `npm install @noorui/components`

const basicUsageCode = `import { Progress } from '@/components/ui/progress'

<Progress value={33} />`

const withLabelCode = `<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>Progress</span>
    <span>60%</span>
  </div>
  <Progress value={60} />
</div>`

const sizesCode = `<div className="space-y-4">
  <Progress value={50} className="h-1" />
  <Progress value={50} className="h-2" />
  <Progress value={50} className="h-3" />
  <Progress value={50} className="h-4" />
</div>`

const colorsCode = `<div className="space-y-4">
  <Progress value={50} className="[&>div]:bg-blue-500" />
  <Progress value={50} className="[&>div]:bg-green-500" />
  <Progress value={50} className="[&>div]:bg-red-500" />
</div>`

export default function ProgressPage() {
  const [uploadProgress, setUploadProgress] = React.useState(0)

  // Simulated upload
  const startUpload = () => {
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  return (
    <div className="min-h-screen">

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
            <li className="text-foreground font-medium">Progress</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Progress</h1>
          <p className="text-xl text-muted-foreground">
            Displays an indicator showing the completion progress of a task. Perfect for uploads, downloads, and loading states.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Preview</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <Progress value={66} className="w-full max-w-md" />
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Installation</h2>
          <CodeBlock code={installCode} language="bash" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Usage</h2>
          <CodeBlock code={basicUsageCode} language="tsx" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Examples</h2>

          <div className="space-y-8">
            {/* Basic */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic</h3>
              <Card>
                <CardContent className="p-6">
                  <Progress value={33} className="w-[60%]" />
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={basicUsageCode} language="tsx" collapsible />
              </div>
            </div>

            {/* With Label */}
            <div>
              <h3 className="text-lg font-semibold mb-4">With Label</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-2 w-[60%]">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>60%</span>
                    </div>
                    <Progress value={60} />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withLabelCode} language="tsx" collapsible />
              </div>
            </div>

            {/* With Shimmer */}
            <div>
              <h3 className="text-lg font-semibold mb-4">With Shimmer Effect</h3>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    The progress bar includes an animated shimmer effect that continuously slides across, giving a &quot;live&quot; feel.
                  </p>
                  <Progress value={66} className="w-[60%]" />
                </CardContent>
              </Card>
            </div>

            {/* Different Sizes */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Different Sizes</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4 w-[60%]">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Extra Small (h-1)</p>
                      <Progress value={50} className="h-1" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Small (h-2, default)</p>
                      <Progress value={50} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Medium (h-3)</p>
                      <Progress value={50} className="h-3" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Large (h-4)</p>
                      <Progress value={50} className="h-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={sizesCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Different Colors */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Different Colors</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4 w-[60%]">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Blue</p>
                      <Progress value={50} className="[&>div]:bg-blue-500" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Green</p>
                      <Progress value={50} className="[&>div]:bg-green-500" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Red</p>
                      <Progress value={50} className="[&>div]:bg-red-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={colorsCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Upload Example */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Upload Progress</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4 w-[60%]">
                    <Button onClick={startUpload}>Start Upload</Button>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} />
                      {uploadProgress === 100 && (
                        <p className="text-sm text-green-600 dark:text-green-400">
                          Upload complete!
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Props</h2>
          <PropsTable props={progressProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Accessibility</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">ARIA Roles</h3>
                <p className="text-muted-foreground">
                  Uses <code className="px-1.5 py-0.5 rounded bg-muted">role=&quot;progressbar&quot;</code> with <code className="px-1.5 py-0.5 rounded bg-muted">aria-valuenow</code>, <code className="px-1.5 py-0.5 rounded bg-muted">aria-valuemin</code>, and <code className="px-1.5 py-0.5 rounded bg-muted">aria-valuemax</code>.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Screen Readers</h3>
                <p className="text-muted-foreground">
                  Progress value is automatically announced to screen reader users.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Labels</h3>
                <p className="text-muted-foreground">
                  Use <code className="px-1.5 py-0.5 rounded bg-muted">aria-label</code> or <code className="px-1.5 py-0.5 rounded bg-muted">aria-labelledby</code> to describe what the progress represents.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Support */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">RTL Support</h2>
          <p className="text-muted-foreground mb-6">
            The Progress component is fully RTL-compatible using logical properties.
          </p>
          <ComponentShowcase.Comparison ltrLabel="LTR (English)" rtlLabel="RTL (العربية)">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Loading</span>
                <span>75%</span>
              </div>
              <Progress value={75} />
            </div>
          </ComponentShowcase.Comparison>
        </section>

        {/* Related */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Related Components</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/button">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Button</h3>
                  <p className="text-sm text-muted-foreground">
                    Interactive buttons
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
