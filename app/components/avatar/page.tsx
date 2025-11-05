'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { DirectionToggle } from '@/components/docs/direction-toggle'
import { ThemeToggle } from '@/components/docs/theme-toggle'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Sparkles } from 'lucide-react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'

const avatarImageProps: PropDefinition[] = [
  {
    name: 'src',
    type: 'string',
    default: 'undefined',
    required: false,
    description: 'The source URL of the avatar image',
  },
  {
    name: 'alt',
    type: 'string',
    default: 'undefined',
    required: false,
    description: 'Alt text for the avatar image',
  },
]

const installCode = `npm install @rtl-design-system/core`

const basicUsageCode = `import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'

<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`

const fallbackCode = `<Avatar>
  <AvatarImage src="/invalid-url.png" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

// The fallback will be displayed when:
// - The image fails to load
// - The image is still loading
// - No src is provided`

const sizesCode = `// Small
<Avatar className="h-8 w-8">
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback className="text-xs">CN</AvatarFallback>
</Avatar>

// Default
<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

// Large
<Avatar className="h-16 w-16">
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback className="text-lg">CN</AvatarFallback>
</Avatar>

// Extra Large
<Avatar className="h-24 w-24">
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback className="text-2xl">CN</AvatarFallback>
</Avatar>`

const groupCode = `<div className="flex -space-x-4">
  <Avatar className="border-2 border-background">
    <AvatarImage src="https://github.com/shadcn.png" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  <Avatar className="border-2 border-background">
    <AvatarImage src="https://github.com/vercel.png" />
    <AvatarFallback>VC</AvatarFallback>
  </Avatar>
  <Avatar className="border-2 border-background">
    <AvatarFallback>AB</AvatarFallback>
  </Avatar>
  <Avatar className="border-2 border-background">
    <AvatarFallback>+3</AvatarFallback>
  </Avatar>
</div>`

export default function AvatarPage() {
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
            <li className="text-foreground font-medium">Avatar</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Avatar</h1>
          <p className="text-lg text-muted-foreground">
            An image element with a fallback for representing a user or entity.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Preview</h2>
          <ComponentShowcase>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </ComponentShowcase>
        </section>

        <Separator className="my-12" />

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Installation</h2>
          <CodeBlock code={installCode} language="bash" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Usage</h2>
          <CodeBlock code={basicUsageCode} language="tsx" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Examples</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">With Fallback</h3>
              <ComponentShowcase>
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="Loaded" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarImage src="/invalid-url.png" alt="Failed" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                </div>
              </ComponentShowcase>
              <CodeBlock code={fallbackCode} language="tsx" />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Different Sizes</h3>
              <ComponentShowcase>
                <div className="flex items-center gap-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className="text-xs">CN</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className="text-lg">CN</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className="text-2xl">CN</AvatarFallback>
                  </Avatar>
                </div>
              </ComponentShowcase>
              <CodeBlock code={sizesCode} language="tsx" />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Avatar Group</h3>
              <ComponentShowcase>
                <div className="flex -space-x-4">
                  <Avatar className="border-2 border-background">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-background">
                    <AvatarImage src="https://github.com/vercel.png" />
                    <AvatarFallback>VC</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-background">
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-background">
                    <AvatarFallback>+3</AvatarFallback>
                  </Avatar>
                </div>
              </ComponentShowcase>
              <CodeBlock code={groupCode} language="tsx" />
            </div>
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Props</h2>
          <PropsTable props={avatarImageProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Accessibility</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Image Alt Text</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Always provide descriptive alt text for avatar images</li>
                  <li>Use user names or entity identifiers in alt text</li>
                  <li>Fallback content is automatically accessible</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">ARIA Attributes</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Image has alt attribute for screen readers</li>
                  <li>Fallback is rendered as text content</li>
                  <li>Avatar is treated as decorative in most contexts</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Support */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">RTL Support</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                The Avatar component is fully RTL-compatible with proper layout handling.
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Avatar groups respect reading direction</li>
                <li>Overlapping order follows text direction in groups</li>
                <li>Fallback text displays correctly in all directions</li>
                <li>Image positioning remains centered</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Related Components</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/badge">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Badge</h3>
                  <p className="text-sm text-muted-foreground">
                    Display status indicators
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/card">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Card</h3>
                  <p className="text-sm text-muted-foreground">
                    Container for user profiles
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
