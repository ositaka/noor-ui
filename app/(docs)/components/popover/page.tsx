'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getPopoverContentProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'align',
    type: '"start" | "center" | "end"',
    default: '"center"',
    required: false,
    description: t.popoverComponent.props.align,
  },
  {
    name: 'side',
    type: '"top" | "right" | "bottom" | "left"',
    default: '"bottom"',
    required: false,
    description: t.popoverComponent.props.side,
  },
  {
    name: 'sideOffset',
    type: 'number',
    default: '4',
    required: false,
    description: t.popoverComponent.props.sideOffset,
  },
]

const installCode = `npm install noorui-rtl`

const basicUsageCode = `import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <div className="space-y-2">
      <h4 className="font-medium leading-none">Popover Title</h4>
      <p className="text-sm text-muted-foreground">
        Popover content goes here.
      </p>
    </div>
  </PopoverContent>
</Popover>`

const positioningCode = `// Top
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Top</Button>
  </PopoverTrigger>
  <PopoverContent side="top">
    Content positioned on top
  </PopoverContent>
</Popover>

// Right
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Right</Button>
  </PopoverTrigger>
  <PopoverContent side="right">
    Content positioned on right
  </PopoverContent>
</Popover>

// Bottom
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Bottom</Button>
  </PopoverTrigger>
  <PopoverContent side="bottom">
    Content positioned on bottom
  </PopoverContent>
</Popover>

// Left
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Left</Button>
  </PopoverTrigger>
  <PopoverContent side="left">
    Content positioned on left
  </PopoverContent>
</Popover>`

const withFormCode = `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">
      <Settings className="me-2 h-4 w-4" />
      Settings
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Settings</h4>
        <p className="text-sm text-muted-foreground">
          Configure your preferences
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="width">Width</Label>
        <Input id="width" defaultValue="100%" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="height">Height</Label>
        <Input id="height" defaultValue="25px" />
      </div>
      <Button className="w-full">Save</Button>
    </div>
  </PopoverContent>
</Popover>`

export default function PopoverPage() {
  const { locale } = useDirection()
  const t = content[locale]
  const popoverContentProps = getPopoverContentProps(t)

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
            <li className="text-foreground font-medium">{t.popoverComponent.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.popoverComponent.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.popoverComponent.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.popoverComponent.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">{t.popoverComponent.demo.openPopover}</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">{t.popoverComponent.demo.popoverTitle}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t.popoverComponent.demo.popoverContent}
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        <Separator className="my-12" />

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t.popoverComponent.installation}</h2>
          <CodeBlock code={installCode} language="bash" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t.popoverComponent.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.popoverComponent.examples.title}</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.popoverComponent.examples.positioning}</h3>
              <ComponentShowcase>
                <ComponentShowcase.Demo>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">{t.popoverComponent.demo.top}</Button>
                      </PopoverTrigger>
                      <PopoverContent side="top">
                        <p className="text-sm">{t.popoverComponent.demo.positionedTop}</p>
                      </PopoverContent>
                    </Popover>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">{t.popoverComponent.demo.right}</Button>
                      </PopoverTrigger>
                      <PopoverContent side="right">
                        <p className="text-sm">{t.popoverComponent.demo.positionedRight}</p>
                      </PopoverContent>
                    </Popover>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">{t.popoverComponent.demo.bottom}</Button>
                      </PopoverTrigger>
                      <PopoverContent side="bottom">
                        <p className="text-sm">{t.popoverComponent.demo.positionedBottom}</p>
                      </PopoverContent>
                    </Popover>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">{t.popoverComponent.demo.left}</Button>
                      </PopoverTrigger>
                      <PopoverContent side="left">
                        <p className="text-sm">{t.popoverComponent.demo.positionedLeft}</p>
                      </PopoverContent>
                    </Popover>
                  </div>
                </ComponentShowcase.Demo>
              </ComponentShowcase>
              <CodeBlock code={positioningCode} language="tsx" />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{t.popoverComponent.examples.withForm}</h3>
              <ComponentShowcase>
                <ComponentShowcase.Demo>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        <Settings className="me-2 h-4 w-4" />
                        {t.popoverComponent.demo.settings}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">{t.popoverComponent.demo.dimensions}</h4>
                          <p className="text-sm text-muted-foreground">
                            {t.popoverComponent.demo.dimensionsDesc}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="width">{t.popoverComponent.demo.width}</Label>
                          <Input id="width" defaultValue="100%" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="height">{t.popoverComponent.demo.height}</Label>
                          <Input id="height" defaultValue="25px" />
                        </div>
                        <Button className="w-full">{t.popoverComponent.demo.saveChanges}</Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </ComponentShowcase.Demo>
              </ComponentShowcase>
              <CodeBlock code={withFormCode} language="tsx" />
            </div>
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t.popoverComponent.props.title}</h2>
          <PropsTable props={popoverContentProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t.popoverComponent.accessibility.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t.popoverComponent.accessibility.keyboard}</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Space</kbd> - {t.popoverComponent.accessibility.space}</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Enter</kbd> - {t.popoverComponent.accessibility.enter}</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Esc</kbd> - {t.popoverComponent.accessibility.escape}</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Tab</kbd> - {t.popoverComponent.accessibility.tab}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t.popoverComponent.accessibility.aria}</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>{t.popoverComponent.accessibility.ariaExpanded}</li>
                  <li>{t.popoverComponent.accessibility.ariaControls}</li>
                  <li>{t.popoverComponent.accessibility.portal}</li>
                  <li>{t.popoverComponent.accessibility.focusManagement}</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Support */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t.popoverComponent.rtl.title}</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                {t.popoverComponent.rtl.description}
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>{t.popoverComponent.rtl.positioning}</li>
                <li>{t.popoverComponent.rtl.sides}</li>
                <li>{t.popoverComponent.rtl.content}</li>
                <li>{t.popoverComponent.rtl.animations}</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t.popoverComponent.related.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/tooltip">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t.popoverComponent.related.tooltip}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.popoverComponent.related.tooltipDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/dialog">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t.popoverComponent.related.dialog}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.popoverComponent.related.dialogDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/sheet">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t.popoverComponent.related.sheet}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.popoverComponent.related.sheetDesc}
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
