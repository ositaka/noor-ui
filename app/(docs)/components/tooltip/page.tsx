'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Info, Plus, Settings, Trash2 } from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getTooltipProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'side',
    type: '"top" | "right" | "bottom" | "left"',
    default: '"top"',
    required: false,
    description: t.tooltipComponent.props.side,
  },
  {
    name: 'sideOffset',
    type: 'number',
    default: '4',
    required: false,
    description: t.tooltipComponent.props.sideOffset,
  },
  {
    name: 'align',
    type: '"start" | "center" | "end"',
    default: '"center"',
    required: false,
    description: t.tooltipComponent.props.align,
  },
  {
    name: 'delayDuration',
    type: 'number',
    default: '700',
    required: false,
    description: t.tooltipComponent.props.delayDuration,
  },
]

const installCode = `npm install @noorui/components`

const setupCode = `// app/layout.tsx
import { TooltipProvider } from '@/components/ui/tooltip'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  )
}`

const basicUsageCode = `import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'

// TooltipProvider is already set up globally in your layout
<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline">Hover me</Button>
  </TooltipTrigger>
  <TooltipContent>
    <p>Add to library</p>
  </TooltipContent>
</Tooltip>`

const sidesCode = `<div className="flex gap-4">
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Top</Button>
    </TooltipTrigger>
    <TooltipContent side="top">
      <p>Tooltip on top</p>
    </TooltipContent>
  </Tooltip>

  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Bottom</Button>
    </TooltipTrigger>
    <TooltipContent side="bottom">
      <p>Tooltip on bottom</p>
    </TooltipContent>
  </Tooltip>
</div>`

const iconCode = `<div className="flex gap-2">
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon">
        <Info className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>More information</p>
    </TooltipContent>
  </Tooltip>

  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon">
        <Plus className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Add item</p>
    </TooltipContent>
  </Tooltip>
</div>`

export default function TooltipPage() {
  const { locale } = useDirection()
  const t = content[locale]
  const tooltipProps = getTooltipProps(t)

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
            <li className="text-foreground font-medium">{t.tooltipComponent.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.tooltipComponent.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.tooltipComponent.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.tooltipComponent.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">{t.tooltipComponent.buttons.hoverMe}</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t.tooltipComponent.messages.addToLibrary}</p>
                </TooltipContent>
              </Tooltip>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.tooltipComponent.installation}</h2>
          <CodeBlock code={installCode} language="bash" />
        </section>

        {/* Setup */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.tooltipComponent.setup}</h2>
          <p className="text-muted-foreground mb-4">
            {t.tooltipComponent.setupDesc}
          </p>
          <CodeBlock code={setupCode} language="tsx" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.tooltipComponent.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.tooltipComponent.examples.title}</h2>

          <div className="space-y-8">
            {/* Basic */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.tooltipComponent.examples.basic}</h3>
              <Card>
                <CardContent className="p-6">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline">{t.tooltipComponent.buttons.hoverMe}</Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t.tooltipComponent.messages.addToLibrary}</p>
                      </TooltipContent>
                    </Tooltip>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={basicUsageCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Different Sides */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.tooltipComponent.examples.differentSides}</h3>
              <Card>
                <CardContent className="p-6">
                    <div className="flex gap-4 flex-wrap">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline">{t.tooltipComponent.buttons.top}</Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p>{t.tooltipComponent.messages.tooltipOnTop}</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline">{t.tooltipComponent.buttons.bottom}</Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          <p>{t.tooltipComponent.messages.tooltipOnBottom}</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline">{t.tooltipComponent.buttons.left}</Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                          <p>{t.tooltipComponent.messages.tooltipOnLeft}</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline">{t.tooltipComponent.buttons.right}</Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>{t.tooltipComponent.messages.tooltipOnRight}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={sidesCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Icon Buttons */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.tooltipComponent.examples.withIconButtons}</h3>
              <Card>
                <CardContent className="p-6">
                    <div className="flex gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Info className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{t.tooltipComponent.messages.moreInformation}</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{t.tooltipComponent.messages.addItem}</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{t.tooltipComponent.messages.settingsTooltip}</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{t.tooltipComponent.messages.delete}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={iconCode} language="tsx" collapsible />
              </div>
            </div>
          </div>
        </section>

        {/* RTL Support Example */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.tooltipComponent.rtl.exampleTitle}</h2>
          <p className="text-muted-foreground mb-6">
            {t.tooltipComponent.rtl.exampleDesc}
          </p>
          <ComponentShowcase.Comparison ltrLabel={t.tooltipComponent.rtl.ltr} rtlLabel={t.tooltipComponent.rtl.rtlLabel}>
            <div className="flex gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">
                    <Info className="me-2 h-4 w-4" />
                    {t.tooltipComponent.buttons.help}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t.tooltipComponent.messages.clickForInfo}</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">
                    <Settings className="me-2 h-4 w-4" />
                    {t.tooltipComponent.buttons.settings}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t.tooltipComponent.messages.configurePreferences}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </ComponentShowcase.Comparison>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.props}</h2>
          <PropsTable props={tooltipProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.tooltipComponent.accessibility.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t.tooltipComponent.accessibility.keyboardNavigation}</h3>
                <p className="text-muted-foreground">
                  {t.tooltipComponent.accessibility.keyboardNavigationDesc}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t.tooltipComponent.accessibility.screenReaders}</h3>
                <p className="text-muted-foreground">
                  {t.tooltipComponent.accessibility.screenReadersDesc}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t.tooltipComponent.accessibility.bestPractice}</h3>
                <p className="text-muted-foreground">
                  {t.tooltipComponent.accessibility.bestPracticeDesc}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Support */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.tooltipComponent.rtl.title}</h2>
          <p className="text-muted-foreground mb-6">
            {t.tooltipComponent.rtl.description}
          </p>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-semibold mb-2">{t.tooltipComponent.rtl.features.title}</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>{t.tooltipComponent.rtl.features.positioning}</li>
                <li>{t.tooltipComponent.rtl.features.textAlignment}</li>
                <li>{t.tooltipComponent.rtl.features.animations}</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Related */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.tooltipComponent.related.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/button">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t.tooltipComponent.related.button}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.tooltipComponent.related.buttonDesc}
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
