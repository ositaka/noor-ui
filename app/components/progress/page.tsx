'use client'

import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { useState, useEffect } from 'react'

export default function ProgressPage() {
  const [progress, setProgress] = useState(13)
  const [uploadProgress, setUploadProgress] = useState(0)

  // Auto-incrementing progress
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

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

  // Example code strings
  const basicCode = `import { Progress } from '@/components/ui/progress'

<Progress value={33} />`

  const withLabelCode = `import { Progress } from '@/components/ui/progress'

<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>Progress</span>
    <span>60%</span>
  </div>
  <Progress value={60} />
</div>`

  const animatedCode = `import { Progress } from '@/components/ui/progress'
import { useState, useEffect } from 'react'

function AnimatedProgress() {
  const [progress, setProgress] = useState(13)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return <Progress value={progress} />
}`

  const sizesCode = `import { Progress } from '@/components/ui/progress'

<div className="space-y-4">
  <Progress value={50} className="h-1" />
  <Progress value={50} className="h-2" />
  <Progress value={50} className="h-3" />
  <Progress value={50} className="h-4" />
</div>`

  const colorsCode = `import { Progress } from '@/components/ui/progress'

<div className="space-y-4">
  <Progress value={50} className="[&>div]:bg-blue-500" />
  <Progress value={50} className="[&>div]:bg-green-500" />
  <Progress value={50} className="[&>div]:bg-yellow-500" />
  <Progress value={50} className="[&>div]:bg-red-500" />
</div>`

  const uploadCode = `import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

function UploadExample() {
  const [uploadProgress, setUploadProgress] = useState(0)

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
    <div className="space-y-4">
      <Button onClick={startUpload}>Start Upload</Button>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Uploading...</span>
          <span>{uploadProgress}%</span>
        </div>
        <Progress value={uploadProgress} />
      </div>
    </div>
  )
}`

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Progress</h1>
        <p className="text-lg text-muted-foreground">
          Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.
        </p>
      </div>

      {/* Preview */}
      <ComponentShowcase
      >
        <Progress value={progress} className="w-[60%]" />
      </ComponentShowcase>

      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <div className="bg-muted p-4 rounded-lg">
          <code className="text-sm">npx shadcn-ui@latest add progress</code>
        </div>
      </div>

      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
          <pre className="text-sm">
            <code>{basicCode}</code>
          </pre>
        </div>
      </div>

      {/* Examples */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Examples</h2>

        {/* Basic */}
        <ComponentShowcase
          title="Basic"
          description="A simple progress bar."
          code={basicCode}
        >
          <Progress value={33} className="w-[60%]" />
        </ComponentShowcase>

        {/* With Label */}
        <ComponentShowcase
          title="With Label"
          description="Add labels to show the progress value."
          code={withLabelCode}
        >
          <div className="space-y-2 w-[60%]">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>60%</span>
            </div>
            <Progress value={60} />
          </div>
        </ComponentShowcase>

        {/* Animated */}
        <ComponentShowcase
          title="Animated"
          description="Progress bar with smooth transitions."
          code={animatedCode}
        >
          <Progress value={progress} className="w-[60%]" />
        </ComponentShowcase>

        {/* Different Sizes */}
        <ComponentShowcase
          title="Different Sizes"
          description="Control the height of the progress bar."
          code={sizesCode}
        >
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
        </ComponentShowcase>

        {/* Different Colors */}
        <ComponentShowcase
          title="Different Colors"
          description="Customize the progress bar color."
          code={colorsCode}
        >
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
              <p className="text-xs text-muted-foreground">Yellow</p>
              <Progress value={50} className="[&>div]:bg-yellow-500" />
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Red</p>
              <Progress value={50} className="[&>div]:bg-red-500" />
            </div>
          </div>
        </ComponentShowcase>

        {/* Upload Example */}
        <ComponentShowcase
          title="Upload Progress"
          description="Simulated file upload with progress indicator."
          code={uploadCode}
        >
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
        </ComponentShowcase>
      </div>

      {/* API Reference */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>

        <div className="space-y-6">
          {/* Progress Props */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Progress</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-2 text-start font-semibold">Prop</th>
                    <th className="px-4 py-2 text-start font-semibold">Type</th>
                    <th className="px-4 py-2 text-start font-semibold">Default</th>
                    <th className="px-4 py-2 text-start font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-4 py-2 font-mono">value</td>
                    <td className="px-4 py-2 font-mono text-xs">number</td>
                    <td className="px-4 py-2 font-mono">0</td>
                    <td className="px-4 py-2">The progress value (0-100)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono">max</td>
                    <td className="px-4 py-2 font-mono text-xs">number</td>
                    <td className="px-4 py-2 font-mono">100</td>
                    <td className="px-4 py-2">The maximum progress value</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono">getValueLabel</td>
                    <td className="px-4 py-2 font-mono text-xs">
                      (value: number, max: number) =&gt; string
                    </td>
                    <td className="px-4 py-2 font-mono">-</td>
                    <td className="px-4 py-2">Function to format the value label for screen readers</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Accessibility</h2>
        <div className="space-y-2 text-muted-foreground">
          <p>
            <strong>ARIA Roles:</strong> Uses <code>role=&quot;progressbar&quot;</code> with <code>aria-valuenow</code>,{' '}
            <code>aria-valuemin</code>, and <code>aria-valuemax</code>.
          </p>
          <p>
            <strong>Screen Readers:</strong> Progress value is announced automatically to screen reader users.
          </p>
          <p>
            <strong>Labels:</strong> Use <code>aria-label</code> or <code>aria-labelledby</code> to describe what the progress represents.
          </p>
          <p>
            <strong>Indeterminate State:</strong> For unknown progress, consider using a loading spinner instead.
          </p>
        </div>
      </div>

      {/* RTL Support */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">RTL Support</h2>
        <p className="text-muted-foreground mb-4">
          The Progress component is fully RTL-compatible using logical properties:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* LTR */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">LTR (Left-to-Right)</h3>
            <div dir="ltr" className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Loading</span>
                <span>75%</span>
              </div>
              <Progress value={75} />
            </div>
          </div>

          {/* RTL */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">RTL (Right-to-Left)</h3>
            <div dir="rtl" className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>جار التحميل</span>
                <span>75%</span>
              </div>
              <Progress value={75} />
            </div>
          </div>
        </div>

        <div className="bg-muted p-4 rounded-lg mt-4">
          <p className="text-sm">
            <strong>Key RTL Features:</strong>
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
            <li>Progress bar fills from the correct direction (start to end)</li>
            <li>Labels align naturally with text direction</li>
            <li>Animations work correctly in both directions</li>
          </ul>
        </div>
      </div>

      {/* Related Components */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Related Components</h2>
        <div className="flex gap-2">
          <a
            href="/components/spinner"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Spinner
          </a>
        </div>
      </div>
    </div>
  )
}
