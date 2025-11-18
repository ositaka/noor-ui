'use client'

import * as React from 'react'
import Link from 'next/link'
import { FeatureCard } from '@/components/ui/feature-card'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { BestPractices } from '@/components/docs/best-practices'
import { Sparkles, Rocket, Zap, Shield, Package, Settings } from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

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

const installCode = `npm install noorui-rtl`

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
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  <FeatureCard
    icon={Zap}
    title="Lightning Fast"
    description="Optimized for performance"
    href="/components"
  />
  <FeatureCard
    icon={Shield}
    title="Secure by Default"
    description="Built with security in mind"
    href="/documentation"
  />
  <FeatureCard
    icon={Package}
    title="Easy to Use"
    description="Simple API, powerful results"
    href="/examples"
  />
</div>`

const rtlCode = `// RTL support is automatic!
// The icon and text layout adjusts based on direction

<FeatureCard
  icon={Sparkles}
  title="ميزة رائعة"
  description="هذه الميزة ستغير حياتك"
  href="/components"
/>
// In RTL: Layout mirrors automatically`

export default function FeatureCardPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const t = content[locale]

  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-12">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {t.nav.home}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/components" className="hover:text-foreground transition-colors">
                {t.nav.components}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">{t.componentNames['feature-card']}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.componentNames['feature-card']}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.featureCardComponent.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="max-w-sm">
                <FeatureCard
                  icon={Sparkles}
                  title={t.featureCardComponent.examples.rtlFirstDesign}
                  description={t.featureCardComponent.examples.rtlFirstDesc}
                  href="/rtl-guide"
                />
              </div>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.installation}</h2>
          <CodeBlock code={installCode} language="bash" title="Terminal" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.examples}</h2>

          {/* Static Card */}
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.componentPage.examples.static}</h3>
              <ComponentShowcase>
                <ComponentShowcase.Demo>
                  <div className="max-w-sm">
                    <FeatureCard
                      icon={Sparkles}
                      title={t.featureCardComponent.examples.amazingFeature}
                      description={t.featureCardComponent.examples.amazingFeatureDesc}
                    />
                  </div>
                </ComponentShowcase.Demo>
                <ComponentShowcase.Code code={basicUsageCode} />
              </ComponentShowcase>
            </div>

            {/* Clickable Card */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.componentPage.examples.clickable}</h3>
              <ComponentShowcase>
                <ComponentShowcase.Demo>
                  <div className="max-w-sm">
                    <FeatureCard
                      icon={Rocket}
                      title={t.featureCardComponent.examples.getStarted}
                      description={t.featureCardComponent.examples.getStartedDesc}
                      href="/getting-started"
                    />
                  </div>
                </ComponentShowcase.Demo>
                <ComponentShowcase.Code code={clickableCode} />
              </ComponentShowcase>
            </div>

            {/* Grid Layout */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.componentPage.examples.gridLayout}</h3>
              <ComponentShowcase>
                <ComponentShowcase.Demo>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <FeatureCard
                      icon={Zap}
                      title={t.featureCardComponent.examples.lightningFast}
                      description={t.featureCardComponent.examples.lightningFastDesc}
                      href="/components"
                    />
                    <FeatureCard
                      icon={Shield}
                      title={t.featureCardComponent.examples.secureByDefault}
                      description={t.featureCardComponent.examples.secureByDefaultDesc}
                      href="/documentation"
                    />
                    <FeatureCard
                      icon={Package}
                      title={t.featureCardComponent.examples.easyToUse}
                      description={t.featureCardComponent.examples.easyToUseDesc}
                      href="/examples"
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.rtlSupport}</h2>
          <p className="text-muted-foreground mb-6">
            {t.featureCardComponent.rtlSupport.autoAdapts}
          </p>
          <CodeBlock code={rtlCode} language="tsx" title="React" />
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.props}</h2>
          <PropsTable props={featureCardProps} />
        </section>

        {/* Best Practices */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.bestPractices}</h2>
          <BestPractices
            dos={t.featureCardComponent.bestPractices.doList}
            donts={t.featureCardComponent.bestPractices.dontList}
          />
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.relatedComponents}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={Package}
              title={t.componentNames['card']}
              description={t.featureCardComponent.relatedComponents.baseCard}
              href="/components/card"
            />
            <FeatureCard
              icon={Settings}
              title={t.componentNames['stats-card']}
              description={t.featureCardComponent.relatedComponents.statsCardDesc}
              href="/components/stats-card"
            />
          </div>
        </section>
      </main>
    </div>
  )
}
