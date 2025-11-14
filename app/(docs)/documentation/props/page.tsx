'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { CodeBlock } from '@/components/docs/code-block'
import { Code2, Check } from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const buttonPropsExample = `interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
}

// Usage
<Button variant="outline" size="lg">
  Click me
</Button>`

const cardPropsExample = `interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  // Card inherits all standard div props
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}`

const inputPropsExample = `interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Supports all native input attributes
}

// Usage examples
<Input type="text" placeholder="Enter name" />
<Input type="email" required />
<Input type="number" min={0} max={100} />`

export default function PropsPage() {
  const { locale } = useDirection()
  const t = content[locale].documentationPages.props
  const common = content[locale].documentationPages.common

  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">{common.home}</Link></li>
            <li>/</li>
            <li><Link href="/documentation" className="hover:text-foreground transition-colors">{common.documentation}</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">{t.title}</li>
          </ol>
        </nav>

        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Code2 className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">{t.title}</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            {t.subtitle}
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.generalPrinciples}</h2>
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <strong>{t.nativeProps}</strong> {t.nativePropsDesc}
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <strong>{t.typeSafety}</strong> {t.typeSafetyDesc}
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <strong>{t.rtlAware}</strong> {t.rtlAwareDesc}
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <strong>{t.a11y}</strong> {t.a11yDesc}
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.buttonProps}</h2>
          <p className="text-muted-foreground mb-4">
            {t.buttonPropsDesc}
          </p>
          <CodeBlock code={buttonPropsExample} language="tsx" />

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-start p-3">{t.propName}</th>
                  <th className="text-start p-3">{t.type}</th>
                  <th className="text-start p-3">{t.default}</th>
                  <th className="text-start p-3">{t.description}</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b">
                  <td className="p-3"><code>variant</code></td>
                  <td className="p-3 text-muted-foreground">string</td>
                  <td className="p-3 text-muted-foreground">&apos;default&apos;</td>
                  <td className="p-3 text-muted-foreground">{t.variant}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3"><code>size</code></td>
                  <td className="p-3 text-muted-foreground">string</td>
                  <td className="p-3 text-muted-foreground">&apos;default&apos;</td>
                  <td className="p-3 text-muted-foreground">{t.size}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3"><code>asChild</code></td>
                  <td className="p-3 text-muted-foreground">boolean</td>
                  <td className="p-3 text-muted-foreground">false</td>
                  <td className="p-3 text-muted-foreground">{t.asChild}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.cardProps}</h2>
          <p className="text-muted-foreground mb-4">
            {t.cardPropsDesc}
          </p>
          <CodeBlock code={cardPropsExample} language="tsx" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.inputProps}</h2>
          <p className="text-muted-foreground mb-4">
            {t.inputPropsDesc}
          </p>
          <CodeBlock code={inputPropsExample} language="tsx" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.findingMore}</h2>
          <p className="text-muted-foreground mb-4">
            {t.findingMoreDesc}
          </p>
          <Link href="/components">
            <Card className="hover:border-primary transition-colors">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{t.browseComponents}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.browseComponentsDesc}
                </p>
              </CardContent>
            </Card>
          </Link>
        </section>
      </main>
    </div>
  )
}
