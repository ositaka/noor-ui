'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { CodeBlock } from '@/components/docs/code-block'
import { Code2, Check } from 'lucide-react'

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
  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link href="/documentation" className="hover:text-foreground transition-colors">Documentation</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">Props Documentation</li>
          </ol>
        </nav>

        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Code2 className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">Props Documentation</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Comprehensive prop definitions for all components in the design system. All components extend their native HTML element props for maximum flexibility.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">General Principles</h2>
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <strong>Native HTML Props:</strong> All components extend their native HTML element props
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <strong>Type Safety:</strong> Full TypeScript support with autocomplete and type checking
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <strong>RTL-Aware:</strong> Direction-sensitive props automatically adjust for RTL layouts
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <strong>Accessibility:</strong> ARIA attributes and roles are built-in where applicable
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Button Props</h2>
          <p className="text-muted-foreground mb-4">
            Button component with variant and size customization:
          </p>
          <CodeBlock code={buttonPropsExample} language="tsx" />

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-start p-3">Prop</th>
                  <th className="text-start p-3">Type</th>
                  <th className="text-start p-3">Default</th>
                  <th className="text-start p-3">Description</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b">
                  <td className="p-3"><code>variant</code></td>
                  <td className="p-3 text-muted-foreground">string</td>
                  <td className="p-3 text-muted-foreground">&apos;default&apos;</td>
                  <td className="p-3 text-muted-foreground">Visual style variant</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3"><code>size</code></td>
                  <td className="p-3 text-muted-foreground">string</td>
                  <td className="p-3 text-muted-foreground">&apos;default&apos;</td>
                  <td className="p-3 text-muted-foreground">Button size</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3"><code>asChild</code></td>
                  <td className="p-3 text-muted-foreground">boolean</td>
                  <td className="p-3 text-muted-foreground">false</td>
                  <td className="p-3 text-muted-foreground">Render as child element</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Card Props</h2>
          <p className="text-muted-foreground mb-4">
            Card components for grouping content:
          </p>
          <CodeBlock code={cardPropsExample} language="tsx" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Input Props</h2>
          <p className="text-muted-foreground mb-4">
            Input component extending native input element:
          </p>
          <CodeBlock code={inputPropsExample} language="tsx" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Finding More Props</h2>
          <p className="text-muted-foreground mb-4">
            Each component page includes detailed props documentation. Visit individual component pages for complete prop definitions:
          </p>
          <Link href="/components">
            <Card className="hover:border-primary transition-colors">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Browse Components</h3>
                <p className="text-sm text-muted-foreground">
                  Explore all components with their complete prop definitions and examples
                </p>
              </CardContent>
            </Card>
          </Link>
        </section>
      </main>
    </div>
  )
}
