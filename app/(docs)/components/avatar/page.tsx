'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getAvatarProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'src',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.avatarComponent.props.src,
  },
  {
    name: 'alt',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.avatarComponent.props.alt,
  },
]

const installCode = `npm install noorui-rtl`

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
  const { locale } = useDirection()
  const t = content[locale]
  const avatarImageProps = getAvatarProps(t)

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
            <li className="text-foreground font-medium">{t.avatarComponent.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.avatarComponent.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.avatarComponent.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.avatarComponent.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        <Separator className="my-12" />

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t.avatarComponent.installation}</h2>
          <CodeBlock code={installCode} language="bash" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t.avatarComponent.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.avatarComponent.examples.title}</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.avatarComponent.examples.withFallback}</h3>
              <ComponentShowcase>
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt={t.avatarComponent.examples.loaded} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarImage src="/invalid-url.png" alt={t.avatarComponent.examples.failed} />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                </div>
              </ComponentShowcase>
              <div className="mt-4">
                <CodeBlock code={fallbackCode} language="tsx" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{t.avatarComponent.examples.differentSizes}</h3>
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
              <div className="mt-4">
                <CodeBlock code={sizesCode} language="tsx" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{t.avatarComponent.examples.avatarGroup}</h3>
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
              <div className="mt-4">
                <CodeBlock code={groupCode} language="tsx" />
              </div>
            </div>
          </div>
        </section>

        {/* RTL Support Example */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.avatarComponent.labels.rtlSupportExample}</h2>
          <p className="text-muted-foreground mb-6">
            {t.avatarComponent.labels.rtlDescription}
          </p>
          <ComponentShowcase.Comparison ltrLabel="LTR (English)" rtlLabel="RTL (العربية)">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium">{t.avatarComponent.labels.johnDoe}</p>
                  <p className="text-sm text-muted-foreground">{t.avatarComponent.labels.emailExample}</p>
                </div>
              </div>
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
                  <AvatarFallback>+5</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </ComponentShowcase.Comparison>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t.avatarComponent.props.title}</h2>
          <PropsTable props={avatarImageProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t.avatarComponent.accessibility.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t.avatarComponent.accessibility.imageAltText}</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {t.avatarComponent.accessibility.imageAltTextItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t.avatarComponent.accessibility.ariaAttributes}</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {t.avatarComponent.accessibility.ariaAttributesItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Support */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t.avatarComponent.rtl.title}</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                {t.avatarComponent.rtl.rtlDescription}
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                {t.avatarComponent.rtl.rtlItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t.avatarComponent.related.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/badge">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t.avatarComponent.related.badge}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.avatarComponent.related.badgeDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/card">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t.avatarComponent.related.card}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.avatarComponent.related.cardDesc}
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
