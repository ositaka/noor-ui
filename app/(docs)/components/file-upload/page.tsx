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
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getFileUploadProps = (t: typeof content.en | typeof content.ar) => [
  {
    name: 'onUpload',
    type: '(files: File[]) => void',
    description: t.fileUploadComponent.props.onUpload,
  },
  {
    name: 'onChange',
    type: '(files: File[]) => void',
    description: t.fileUploadComponent.props.onChange,
  },
  {
    name: 'maxSize',
    type: 'number',
    defaultValue: '5242880 (5MB)',
    description: t.fileUploadComponent.props.maxSize,
  },
  {
    name: 'maxFiles',
    type: 'number',
    defaultValue: '1',
    description: t.fileUploadComponent.props.maxFiles,
  },
  {
    name: 'accept',
    type: 'string',
    description: t.fileUploadComponent.props.accept,
  },
  {
    name: 'multiple',
    type: 'boolean',
    defaultValue: 'false',
    description: t.fileUploadComponent.props.multiple,
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: t.fileUploadComponent.props.disabled,
  },
  {
    name: 'className',
    type: 'string',
    description: t.fileUploadComponent.props.className,
  },
  {
    name: 'value',
    type: 'File[]',
    defaultValue: '[]',
    description: t.fileUploadComponent.props.value,
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
  const { locale } = useDirection()
  const t = content[locale]
  const propDefinitions = getFileUploadProps(t)

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
            <li className="text-foreground font-medium">{t.fileUploadComponent.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold tracking-tight">{t.fileUploadComponent.title}</h1>
            <Badge variant="default">New</Badge>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.fileUploadComponent.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.fileUploadComponent.preview}</h2>
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.fileUploadComponent.features.title}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{t.fileUploadComponent.features.dragDrop}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.fileUploadComponent.features.dragDropDesc}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{t.fileUploadComponent.features.fileValidation}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.fileUploadComponent.features.fileValidationDesc}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{t.fileUploadComponent.features.imagePreviews}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.fileUploadComponent.features.imagePreviewsDesc}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{t.fileUploadComponent.features.multipleFiles}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.fileUploadComponent.features.multipleFilesDesc}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{t.fileUploadComponent.features.fileIcons}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.fileUploadComponent.features.fileIconsDesc}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{t.fileUploadComponent.features.accessible}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.fileUploadComponent.features.accessibleDesc}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.fileUploadComponent.examples.title}</h2>

          <div className="space-y-8">
            {/* Images Only */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.fileUploadComponent.examples.imagesOnly}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-center">
                    <div className="w-full max-w-xl">
                      <FileUpload
                        accept="image/*"
                        onChange={setFiles2}
                        onUpload={(files) => console.log('Uploading images:', files)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={imagesOnlyCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Multiple Files */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.fileUploadComponent.examples.multipleFiles}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-center">
                    <div className="w-full max-w-xl">
                      <FileUpload
                        multiple
                        maxFiles={5}
                        onChange={setFiles3}
                        onUpload={(files) => console.log('Uploading files:', files)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={multipleFilesCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Custom Size Limit */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.fileUploadComponent.examples.customSizeLimit}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-center">
                    <div className="w-full max-w-xl">
                      <FileUpload
                        maxSize={2 * 1024 * 1024}
                        onChange={() => {}}
                        onUpload={(files) => console.log('Uploading files:', files)}
                      />
                    </div>
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.fileUploadComponent.usage}</h2>
          <Card>
            <CardHeader>
              <CardTitle>{t.fileUploadComponent.usageBackend.title}</CardTitle>
              <CardDescription>
                {t.fileUploadComponent.usageBackend.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock code={backendUploadCode} />
            </CardContent>
          </Card>
        </section>

        {/* File Type Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.fileUploadComponent.fileTypes.title}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.fileUploadComponent.fileTypes.images}</CardTitle>
              </CardHeader>
              <CardContent>
                <code className="text-sm bg-muted px-2 py-1 rounded">accept=&quot;image/*&quot;</code>
                <p className="text-sm text-muted-foreground mt-2">
                  {t.fileUploadComponent.fileTypes.imagesDesc}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.fileUploadComponent.fileTypes.documents}</CardTitle>
              </CardHeader>
              <CardContent>
                <code className="text-sm bg-muted px-2 py-1 rounded">accept=&quot;.pdf,.doc,.docx&quot;</code>
                <p className="text-sm text-muted-foreground mt-2">
                  {t.fileUploadComponent.fileTypes.documentsDesc}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.fileUploadComponent.fileTypes.videos}</CardTitle>
              </CardHeader>
              <CardContent>
                <code className="text-sm bg-muted px-2 py-1 rounded">accept=&quot;video/*&quot;</code>
                <p className="text-sm text-muted-foreground mt-2">
                  {t.fileUploadComponent.fileTypes.videosDesc}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.fileUploadComponent.fileTypes.spreadsheets}</CardTitle>
              </CardHeader>
              <CardContent>
                <code className="text-sm bg-muted px-2 py-1 rounded">accept=&quot;.xlsx,.xls,.csv&quot;</code>
                <p className="text-sm text-muted-foreground mt-2">
                  {t.fileUploadComponent.fileTypes.spreadsheetsDesc}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.props}</h2>
          <PropsTable props={propDefinitions} />
        </section>

        {/* Best Practices */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.fileUploadComponent.bestPractices.title}</h2>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <ul className="space-y-2 mt-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    {t.fileUploadComponent.bestPractices.serverValidation}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    {t.fileUploadComponent.bestPractices.sizeLimit}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    {t.fileUploadComponent.bestPractices.clearErrors}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    {t.fileUploadComponent.bestPractices.cleanupUrls}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    {t.fileUploadComponent.bestPractices.progressIndicators}
                  </span>
                </li>
              </ul>
            </AlertDescription>
          </Alert>
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.fileUploadComponent.accessibility.title}</h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>{t.fileUploadComponent.accessibility.keyboardNavigation}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>{t.fileUploadComponent.accessibility.ariaLabels}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>{t.fileUploadComponent.accessibility.errorAnnouncements}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>{t.fileUploadComponent.accessibility.visualFeedback}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>{t.fileUploadComponent.accessibility.focusManagement}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
