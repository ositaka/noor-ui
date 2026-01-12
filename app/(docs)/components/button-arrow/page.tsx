'use client'

import * as React from 'react'
import Link from 'next/link'
import { ButtonArrow } from '@/components/ui/button-arrow'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getButtonArrowProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'direction',
    type: "'forward' | 'back' | 'external'",
    default: "'forward'",
    required: false,
    description: t.buttonArrowComponent.props.direction,
  },
  {
    name: 'icon',
    type: "'chevron' | 'arrow'",
    default: "'chevron'",
    required: false,
    description: t.buttonArrowComponent.props.icon,
  },
  {
    name: 'iconPosition',
    type: "'start' | 'end' | 'auto'",
    default: "'auto'",
    required: false,
    description: t.buttonArrowComponent.props.iconPosition,
  },
  {
    name: 'iconSize',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    required: false,
    description: t.buttonArrowComponent.props.iconSize,
  },
  {
    name: 'hideIcon',
    type: 'boolean',
    default: 'false',
    required: false,
    description: t.buttonArrowComponent.props.hideIcon,
  },
]

const installCode = `npm install noorui-rtl`

const basicUsageCode = `import { ButtonArrow } from 'noorui-rtl'

// Forward button - arrow appears at the end
<ButtonArrow direction="forward">
  Continue
</ButtonArrow>

// Back button - arrow appears at the start
<ButtonArrow direction="back">
  Back to Blog
</ButtonArrow>`

const directionsCode = `// Forward: progresses the user flow
<ButtonArrow direction="forward">Next Step</ButtonArrow>

// Back: returns to previous state
<ButtonArrow direction="back">Previous Step</ButtonArrow>

// External: for external links (diagonal arrow)
<ButtonArrow direction="external" asChild>
  <a href="https://example.com" target="_blank" rel="noopener noreferrer">
    External Link
  </a>
</ButtonArrow>`

const iconStylesCode = `// Chevron style (default)
<ButtonArrow direction="forward" icon="chevron">
  Continue
</ButtonArrow>

// Arrow style
<ButtonArrow direction="forward" icon="arrow">
  Learn More
</ButtonArrow>

// External uses diagonal arrow (different icon type)
<ButtonArrow direction="external" asChild>
  <a href="https://example.com" target="_blank" rel="noopener noreferrer">
    External Link
  </a>
</ButtonArrow>`

const variantsCode = `<ButtonArrow variant="primary" direction="forward">Primary</ButtonArrow>
<ButtonArrow variant="secondary" direction="back">Secondary</ButtonArrow>
<ButtonArrow variant="outline" direction="forward">Outline</ButtonArrow>
<ButtonArrow variant="ghost" direction="back">Ghost</ButtonArrow>

// Link variant (text link style with external direction)
<ButtonArrow variant="link" direction="external" className="h-auto p-0" asChild>
  <a href="https://example.com" target="_blank" rel="noopener noreferrer">
    Link Style
  </a>
</ButtonArrow>`

const rtlCode = `// Works automatically in RTL contexts!
// In LTR: "Back" arrow points left
// In RTL: "Back" arrow points right (mirrored)

<ButtonArrow direction="back">
  Back to Blog
</ButtonArrow>`

export default function ButtonArrowPage() {
  const { locale } = useDirection()
  const t = content[locale]
  const buttonArrowProps = getButtonArrowProps(t)

  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-12">
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
            <li className="text-foreground font-medium">{t.buttonArrowComponent.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.buttonArrowComponent.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.buttonArrowComponent.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="flex flex-wrap gap-4">
                <ButtonArrow direction="forward">{t.buttonArrowComponent.continue}</ButtonArrow>
                <ButtonArrow direction="back">{t.buttonArrowComponent.backToBlog}</ButtonArrow>
                <ButtonArrow direction="external" asChild>
                  <a href="https://storybook.noorui.com" target="_blank" rel="noopener noreferrer">
                    {t.storybook.viewInStorybook}
                  </a>
                </ButtonArrow>
              </div>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.installation}</h2>
          <CodeBlock code={installCode} language="bash" title="Terminal" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.examples}</h2>

          <div className="space-y-8">
            {/* Directions */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.buttonArrowComponent.examples.directions}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-3">
                    <ButtonArrow direction="forward">{t.buttonArrowComponent.nextStep}</ButtonArrow>
                    <ButtonArrow direction="back">{t.buttonArrowComponent.previousStep}</ButtonArrow>
                    <ButtonArrow direction="external" asChild>
                      <a href="https://example.com" target="_blank" rel="noopener noreferrer">
                        External Link
                      </a>
                    </ButtonArrow>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={directionsCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Icon Styles */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.buttonArrowComponent.examples.iconStyles}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-3">
                    <ButtonArrow direction="forward" icon="chevron">{t.buttonArrowComponent.continue}</ButtonArrow>
                    <ButtonArrow direction="forward" icon="arrow">{t.buttonArrowComponent.learnMore}</ButtonArrow>
                    <ButtonArrow direction="back" icon="chevron">{t.buttonArrowComponent.goBack}</ButtonArrow>
                    <ButtonArrow direction="back" icon="arrow">{t.buttonArrowComponent.goBack}</ButtonArrow>
                    <ButtonArrow direction="external" asChild>
                      <a href="https://example.com" target="_blank" rel="noopener noreferrer">
                        External Link
                      </a>
                    </ButtonArrow>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={iconStylesCode} language="tsx" collapsible />
              </div>
            </div>

            {/* With Variants */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.buttonArrowComponent.examples.withVariants}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-3">
                    <ButtonArrow variant="primary" direction="forward">{t.buttonComponent.primary}</ButtonArrow>
                    <ButtonArrow variant="secondary" direction="back">{t.buttonComponent.secondary}</ButtonArrow>
                    <ButtonArrow variant="outline" direction="forward">{t.buttonComponent.outline}</ButtonArrow>
                    <ButtonArrow variant="ghost" direction="back">{t.buttonComponent.ghost}</ButtonArrow>
                    <ButtonArrow variant="link" direction="external" className="h-auto p-0" asChild>
                      <a href="https://example.com" target="_blank" rel="noopener noreferrer">
                        Link Style
                      </a>
                    </ButtonArrow>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={variantsCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Icon Sizes */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.buttonArrowComponent.examples.iconSizes}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <ButtonArrow direction="forward" iconSize="sm" size="sm">{t.buttonComponent.small}</ButtonArrow>
                    <ButtonArrow direction="forward" iconSize="md">{t.buttonComponent.medium}</ButtonArrow>
                    <ButtonArrow direction="forward" iconSize="lg" size="lg">{t.buttonComponent.large}</ButtonArrow>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.props}</h2>
          <PropsTable props={buttonArrowProps} />
          <p className="text-sm text-muted-foreground mt-4">
            ButtonArrow also inherits all props from the Button component including variant, size, loading, disabled, and asChild.
          </p>
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.accessibility}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t.componentDocs.keyboardNavigation}</h3>
                <p className="text-muted-foreground">{t.buttonArrowComponent.accessibility.keyboardDesc}</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.componentDocs.screenReader}</h3>
                <p className="text-muted-foreground">{t.buttonArrowComponent.accessibility.screenReaderDesc}</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.componentDocs.rtlConsiderations}</h3>
                <p className="text-muted-foreground">{t.buttonArrowComponent.accessibility.rtlDesc}</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Considerations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.rtlConsiderations}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                {t.buttonArrowComponent.rtl.description}
              </p>
              <div>
                <h4 className="font-semibold mb-2">{t.buttonArrowComponent.rtl.semanticDirections}</h4>
                <p className="text-muted-foreground mb-4">
                  {t.buttonArrowComponent.rtl.semanticDesc}
                </p>
              </div>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{t.componentDocs.ltr}</h4>
                  <div dir="ltr" className="flex gap-2">
                    <ButtonArrow direction="back">{t.buttonArrowComponent.backToBlog}</ButtonArrow>
                    <ButtonArrow direction="forward">{t.buttonArrowComponent.continue}</ButtonArrow>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{t.componentDocs.rtl}</h4>
                  <div dir="rtl" className="flex gap-2">
                    <ButtonArrow direction="back">{t.buttonArrowComponent.backToBlog}</ButtonArrow>
                    <ButtonArrow direction="forward">{t.buttonArrowComponent.continue}</ButtonArrow>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

      </main>
    </div>
  )
}
