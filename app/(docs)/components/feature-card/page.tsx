'use client'

import * as React from 'react'
import Link from 'next/link'
import { FeatureCard } from '@/components/ui/feature-card'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Sparkles, Rocket, Zap, Shield, Package, Settings } from 'lucide-react'

const featureCardProps: PropDefinition[] = [
  {
    name: 'title',
    type: 'string',
    required: true,
    description: 'The title/heading of the feature card',
  },
  {
    name: 'description',
    type: 'string',
    required: true,
    description: 'The description text explaining the feature',
  },
  {
    name: 'icon',
    type: 'LucideIcon',
    required: true,
    description: 'Lucide icon component to display',
  },
  {
    name: 'href',
    type: 'string',
    required: false,
    description: 'Optional link URL. When provided, the card becomes clickable',
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    description: 'Additional CSS classes to apply',
  },
]

const installCode = `npm install @noorui/components`

const basicUsageCode = `import { FeatureCard } from '@/components/ui/feature-card'
import { Sparkles } from 'lucide-react'

<FeatureCard
  icon={Sparkles}
  title="Amazing Feature"
  description="This feature will change your life"
/>`

const clickableCode = `import { FeatureCard } from '@/components/ui/feature-card'
import { Rocket } from 'lucide-react'

// Card becomes clickable when href is provided
<FeatureCard
  icon={Rocket}
  title="Get Started"
  description="Click to learn how to begin"
  href="/getting-started"
/>`

const gridLayoutCode = `import { FeatureCard } from '@/components/ui/feature-card'
import { Zap, Shield, Package } from 'lucide-react'

<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  <FeatureCard
    icon={Zap}
    title="Lightning Fast"
    description="Optimized for performance"
    href="/features/performance"
  />
  <FeatureCard
    icon={Shield}
    title="Secure by Default"
    description="Built with security in mind"
    href="/features/security"
  />
  <FeatureCard
    icon={Package}
    title="Easy to Use"
    description="Simple API, powerful results"
    href="/features/dx"
  />
</div>`

const rtlCode = `// RTL support is automatic!
// The icon and text layout adjusts based on direction

<FeatureCard
  icon={Sparkles}
  title="ميزة رائعة"
  description="هذه الميزة ستغير حياتك"
  href="/features"
/>
// In RTL: Layout mirrors automatically`

export default function FeatureCardPage() {
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
            <li className="text-foreground font-medium">FeatureCard</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">FeatureCard</h1>
          <p className="text-xl text-muted-foreground">
            A specialized card component for showcasing features with an icon, title, and description.
            Optionally clickable with hover effects. Perfect for landing pages and feature grids.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Preview</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="max-w-sm">
                <FeatureCard
                  icon={Sparkles}
                  title="RTL-First Design"
                  description="Built from the ground up to support both LTR and RTL layouts seamlessly"
                  href="/rtl-guide"
                />
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

          {/* Static Card */}
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Static Card</h3>
              <ComponentShowcase>
                <ComponentShowcase.Demo>
                  <div className="max-w-sm">
                    <FeatureCard
                      icon={Sparkles}
                      title="Amazing Feature"
                      description="This is a static card without a link. Great for non-interactive displays."
                    />
                  </div>
                </ComponentShowcase.Demo>
                <ComponentShowcase.Code code={basicUsageCode} />
              </ComponentShowcase>
            </div>

            {/* Clickable Card */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Clickable Card</h3>
              <ComponentShowcase>
                <ComponentShowcase.Demo>
                  <div className="max-w-sm">
                    <FeatureCard
                      icon={Rocket}
                      title="Get Started"
                      description="Click to learn how to begin using our components"
                      href="/getting-started"
                    />
                  </div>
                </ComponentShowcase.Demo>
                <ComponentShowcase.Code code={clickableCode} />
              </ComponentShowcase>
            </div>

            {/* Grid Layout */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Grid Layout</h3>
              <ComponentShowcase>
                <ComponentShowcase.Demo>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <FeatureCard
                      icon={Zap}
                      title="Lightning Fast"
                      description="Optimized for performance"
                      href="/features/performance"
                    />
                    <FeatureCard
                      icon={Shield}
                      title="Secure by Default"
                      description="Built with security in mind"
                      href="/features/security"
                    />
                    <FeatureCard
                      icon={Package}
                      title="Easy to Use"
                      description="Simple API, powerful results"
                      href="/features/dx"
                    />
                  </div>
                </ComponentShowcase.Demo>
                <ComponentShowcase.Code code={gridLayoutCode} />
              </ComponentShowcase>
            </div>
          </div>
        </section>

        {/* RTL Support */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">RTL Support</h2>
          <p className="text-muted-foreground mb-6">
            FeatureCard automatically adapts to RTL layouts. The icon and text alignment
            mirror based on the current direction.
          </p>
          <CodeBlock code={rtlCode} language="tsx" title="React" />
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Props</h2>
          <PropsTable props={featureCardProps} />
        </section>

        {/* Best Practices */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Best Practices</h2>
          <div className="space-y-4 text-muted-foreground">
            <div>
              <h3 className="text-foreground font-semibold mb-2">✅ Do</h3>
              <ul className="list-disc list-inside space-y-2 ms-4">
                <li>Use meaningful icons that represent the feature</li>
                <li>Keep titles short and descriptive (2-5 words)</li>
                <li>Keep descriptions concise (1-2 sentences)</li>
                <li>Use in grid layouts for feature showcases</li>
                <li>Add href when the card should navigate somewhere</li>
              </ul>
            </div>
            <div>
              <h3 className="text-foreground font-semibold mb-2">❌ Don&apos;t</h3>
              <ul className="list-disc list-inside space-y-2 ms-4">
                <li>Don&apos;t use for long-form content (use regular Card instead)</li>
                <li>Don&apos;t mix clickable and non-clickable cards in the same grid</li>
                <li>Don&apos;t use tiny icons or oversized icons</li>
                <li>Don&apos;t make the description too long (breaks visual balance)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Related Components</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={Package}
              title="Card"
              description="The base card component for general content"
              href="/components/card"
            />
            <FeatureCard
              icon={Settings}
              title="Stats Card"
              description="Specialized card for displaying statistics"
              href="/components/stats-card"
            />
          </div>
        </section>
      </main>
    </div>
  )
}
