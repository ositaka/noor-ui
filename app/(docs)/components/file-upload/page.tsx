'use client'

import * as React from 'react'
import Link from 'next/link'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { FileUpload } from '@/components/ui/file-upload'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info } from 'lucide-react'

const propDefinitions = [
  {
    name: 'onUpload',
    type: '(files: File[]) => void',
    description: 'Callback fired when files are successfully uploaded',
  },
  {
    name: 'onChange',
    type: '(files: File[]) => void',
    description: 'Callback fired when the file list changes',
  },
  {
    name: 'maxSize',
    type: 'number',
    defaultValue: '5242880 (5MB)',
    description: 'Maximum file size in bytes',
  },
  {
    name: 'maxFiles',
    type: 'number',
    defaultValue: '1',
    description: 'Maximum number of files allowed',
  },
  {
    name: 'accept',
    type: 'string',
    description: 'Accepted file types (e.g., "image/*", ".pdf,.doc")',
  },
  {
    name: 'multiple',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Allow multiple file uploads',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Disable the file upload',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes',
  },
  {
    name: 'value',
    type: 'File[]',
    defaultValue: '[]',
    description: 'Controlled value for file list',
  },
]

const imagesOnlyCode = `'use client'

import * as React from 'react'
import { FileUpload } from '@/components/ui/file-upload'

export default function Example() {
  const [files, setFiles] = React.useState<File[]>([])

  return (
    <FileUpload
      accept="image/*"
      onChange={setFiles}
      onUpload={(files) => {
        // Upload to your backend
        console.log('Uploading images:', files)
      }}
    />
  )
}`

const multipleFilesCode = `'use client'

import * as React from 'react'
import { FileUpload } from '@/components/ui/file-upload'

export default function Example() {
  const [files, setFiles] = React.useState<File[]>([])

  return (
    <FileUpload
      multiple
      maxFiles={5}
      onChange={setFiles}
      onUpload={(files) => {
        // Upload to your backend
        console.log('Uploading files:', files)
      }}
    />
  )
}`

const customSizeLimitCode = `'use client'

import * as React from 'react'
import { FileUpload } from '@/components/ui/file-upload'

export default function Example() {
  const [files, setFiles] = React.useState<File[]>([])

  return (
    <FileUpload
      maxSize={2 * 1024 * 1024} // 2MB
      onChange={setFiles}
      onUpload={(files) => {
        // Upload to your backend
        console.log('Uploading files:', files)
      }}
    />
  )
}`

const backendUploadCode = `async function uploadFiles(files: File[]) {
  const formData = new FormData()

  files.forEach((file, index) => {
    formData.append(\`file\${index}\`, file)
  })

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Upload failed')
    }

    const data = await response.json()
    console.log('Upload successful:', data)
  } catch (error) {
    console.error('Upload error:', error)
  }
}

// In your component
<FileUpload
  onUpload={uploadFiles}
  accept="image/*"
  maxSize={5 * 1024 * 1024}
/>`

export default function FileUploadPage() {
  const [files1, setFiles1] = React.useState<File[]>([])
  const [files2, setFiles2] = React.useState<File[]>([])
  const [files3, setFiles3] = React.useState<File[]>([])

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
            <li className="text-foreground font-medium">File Upload</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold tracking-tight">File Upload</h1>
            <Badge variant="default">New</Badge>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            A drag-and-drop file upload component with validation, image previews, and full
            accessibility support. Perfect for forms and content management.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Preview</h2>
          <ComponentShowcase
            code={`'use client'

import * as React from 'react'
import { FileUpload } from '@/components/ui/file-upload'

export default function Example() {
  const [files, setFiles] = React.useState<File[]>([])

  return (
    <FileUpload
      onChange={setFiles}
      onUpload={(files) => console.log('Uploaded:', files)}
    />
  )
}`}
          >
            <ComponentShowcase.Demo>
              <div className="w-full max-w-xl">
                <FileUpload
                  onChange={setFiles1}
                  onUpload={(files) => console.log('Uploaded:', files)}
                />
              </div>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Features</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Drag & Drop</h3>
                <p className="text-sm text-muted-foreground">
                  Intuitive drag-and-drop interface with visual feedback
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">File Validation</h3>
                <p className="text-sm text-muted-foreground">
                  Validate file types and sizes with clear error messages
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Image Previews</h3>
                <p className="text-sm text-muted-foreground">
                  Automatic image thumbnails for visual confirmation
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Multiple Files</h3>
                <p className="text-sm text-muted-foreground">
                  Support for single or multiple file uploads
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">File Icons</h3>
                <p className="text-sm text-muted-foreground">
                  Contextual icons for different file types
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Accessible</h3>
                <p className="text-sm text-muted-foreground">
                  Full keyboard navigation and screen reader support
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Examples</h2>

          <div className="space-y-8">
            {/* Images Only */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Images Only</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="w-full max-w-xl">
                    <FileUpload
                      accept="image/*"
                      onChange={setFiles2}
                      onUpload={(files) => console.log('Uploading images:', files)}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={imagesOnlyCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Multiple Files */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Multiple Files</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="w-full max-w-xl">
                    <FileUpload
                      multiple
                      maxFiles={5}
                      onChange={setFiles3}
                      onUpload={(files) => console.log('Uploading files:', files)}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={multipleFilesCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Custom Size Limit */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Custom Size Limit</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="w-full max-w-xl">
                    <FileUpload
                      maxSize={2 * 1024 * 1024}
                      onChange={() => {}}
                      onUpload={(files) => console.log('Uploading files:', files)}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={customSizeLimitCode} language="tsx" collapsible />
              </div>
            </div>
          </div>
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Usage with Backend</h2>
          <Card>
            <CardHeader>
              <CardTitle>Uploading Files to Server</CardTitle>
              <CardDescription>
                Example of uploading files using FormData
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock code={backendUploadCode} />
            </CardContent>
          </Card>
        </section>

        {/* File Type Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Common File Type Patterns</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Images</CardTitle>
              </CardHeader>
              <CardContent>
                <code className="text-sm bg-muted px-2 py-1 rounded">accept="image/*"</code>
                <p className="text-sm text-muted-foreground mt-2">
                  Accepts all image formats (JPEG, PNG, GIF, WebP, etc.)
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <code className="text-sm bg-muted px-2 py-1 rounded">accept=".pdf,.doc,.docx"</code>
                <p className="text-sm text-muted-foreground mt-2">
                  Accepts PDF and Word documents
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Videos</CardTitle>
              </CardHeader>
              <CardContent>
                <code className="text-sm bg-muted px-2 py-1 rounded">accept="video/*"</code>
                <p className="text-sm text-muted-foreground mt-2">
                  Accepts all video formats (MP4, WebM, AVI, etc.)
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Spreadsheets</CardTitle>
              </CardHeader>
              <CardContent>
                <code className="text-sm bg-muted px-2 py-1 rounded">accept=".xlsx,.xls,.csv"</code>
                <p className="text-sm text-muted-foreground mt-2">
                  Accepts Excel and CSV files
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Props</h2>
          <PropsTable props={propDefinitions} />
        </section>

        {/* Best Practices */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Best Practices</h2>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <ul className="space-y-2 mt-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    Always validate files on the server-side as well, client-side validation can be bypassed
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    Set reasonable file size limits to prevent abuse and improve upload performance
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    Provide clear error messages when validation fails
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    Clean up object URLs to prevent memory leaks (automatically handled by this component)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    Consider adding upload progress indicators for large files
                  </span>
                </li>
              </ul>
            </AlertDescription>
          </Alert>
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Accessibility</h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Full keyboard navigation (Tab, Enter, Space)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>ARIA labels for screen readers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Error messages are announced to screen readers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Visual feedback for drag-and-drop state</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Focus management and visible focus indicators</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
