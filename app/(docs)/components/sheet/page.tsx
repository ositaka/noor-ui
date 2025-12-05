'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getSheetContentProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'side',
    type: '"top" | "bottom" | "start" | "end"',
    default: '"end"',
    required: false,
    description: t.sheetComponent.props.side,
  },
]

const installCode = `npm install noorui-rtl`

const basicUsageCode = `import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open Sheet</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Sheet Title</SheetTitle>
      <SheetDescription>
        Sheet description or additional context goes here.
      </SheetDescription>
    </SheetHeader>
    <div className="py-4">
      Sheet content goes here
    </div>
  </SheetContent>
</Sheet>`

const sidesCode = `// Sheet from start (left in LTR, right in RTL)
<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open Start</Button>
  </SheetTrigger>
  <SheetContent side="start">
    <SheetHeader>
      <SheetTitle>Start Sheet</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>

// Sheet from end (right in LTR, left in RTL)
<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open End</Button>
  </SheetTrigger>
  <SheetContent side="end">
    <SheetHeader>
      <SheetTitle>End Sheet</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>

// Sheet from top
<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open Top</Button>
  </SheetTrigger>
  <SheetContent side="top">
    <SheetHeader>
      <SheetTitle>Top Sheet</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>

// Sheet from bottom
<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open Bottom</Button>
  </SheetTrigger>
  <SheetContent side="bottom">
    <SheetHeader>
      <SheetTitle>Bottom Sheet</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>`

const withFormCode = `<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Edit Profile</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Edit Profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here. Click save when you're done.
      </SheetDescription>
    </SheetHeader>
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Enter your name" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="Enter your email" />
      </div>
    </div>
    <SheetFooter>
      <SheetClose asChild>
        <Button type="submit">Save changes</Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>`

export default function SheetPage() {
  const { locale } = useDirection()
  const t = content[locale]
  const sheetContentProps = getSheetContentProps(t)

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
            <li className="text-foreground font-medium">{t.sheetComponent.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.sheetComponent.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.sheetComponent.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.sheetComponent.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">{t.sheetComponent.demo.openSheet}</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>{t.sheetComponent.demo.sheetTitle}</SheetTitle>
                    <SheetDescription>
                      {t.sheetComponent.demo.sheetDescription}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <p className="text-sm text-muted-foreground">
                      {t.sheetComponent.demo.sheetContent}
                    </p>
                  </div>
                </SheetContent>
              </Sheet>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        <Separator className="my-12" />

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.sheetComponent.installation}</h2>
          <CodeBlock code={installCode} language="bash" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.sheetComponent.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.sheetComponent.examples.title}</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.sheetComponent.examples.differentSides}</h3>
              <ComponentShowcase>
                <ComponentShowcase.Demo>
                  <div className="flex flex-wrap gap-4">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline">{t.sheetComponent.demo.openStart}</Button>
                      </SheetTrigger>
                      <SheetContent side="start">
                        <SheetHeader>
                          <SheetTitle>{t.sheetComponent.demo.startSheet}</SheetTitle>
                          <SheetDescription>
                            {t.sheetComponent.demo.startDescription}
                          </SheetDescription>
                        </SheetHeader>
                      </SheetContent>
                    </Sheet>

                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline">{t.sheetComponent.demo.openEnd}</Button>
                      </SheetTrigger>
                      <SheetContent side="end">
                        <SheetHeader>
                          <SheetTitle>{t.sheetComponent.demo.endSheet}</SheetTitle>
                          <SheetDescription>
                            {t.sheetComponent.demo.endDescription}
                          </SheetDescription>
                        </SheetHeader>
                      </SheetContent>
                    </Sheet>

                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline">{t.sheetComponent.demo.openTop}</Button>
                      </SheetTrigger>
                      <SheetContent side="top">
                        <SheetHeader>
                          <SheetTitle>{t.sheetComponent.demo.topSheet}</SheetTitle>
                          <SheetDescription>
                            {t.sheetComponent.demo.topDescription}
                          </SheetDescription>
                        </SheetHeader>
                      </SheetContent>
                    </Sheet>

                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline">{t.sheetComponent.demo.openBottom}</Button>
                      </SheetTrigger>
                      <SheetContent side="bottom">
                        <SheetHeader>
                          <SheetTitle>{t.sheetComponent.demo.bottomSheet}</SheetTitle>
                          <SheetDescription>
                            {t.sheetComponent.demo.bottomDescription}
                          </SheetDescription>
                        </SheetHeader>
                      </SheetContent>
                    </Sheet>
                  </div>
                </ComponentShowcase.Demo>
              </ComponentShowcase>
              <CodeBlock code={sidesCode} language="tsx" />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{t.sheetComponent.examples.withForm}</h3>
              <ComponentShowcase>
                <ComponentShowcase.Demo>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">{t.sheetComponent.demo.editProfile}</Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>{t.sheetComponent.demo.editProfile}</SheetTitle>
                        <SheetDescription>
                          {t.sheetComponent.demo.editDescription}
                        </SheetDescription>
                      </SheetHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">{t.sheetComponent.demo.name}</Label>
                          <Input id="name" placeholder={t.sheetComponent.demo.enterName} defaultValue="Nuno Marques" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="email">{t.sheetComponent.demo.email}</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder={t.sheetComponent.demo.enterEmail}
                            defaultValue="ositaka@example.com"
                          />
                        </div>
                      </div>
                      <SheetFooter>
                        <SheetClose asChild>
                          <Button type="submit">{t.sheetComponent.demo.saveChanges}</Button>
                        </SheetClose>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                </ComponentShowcase.Demo>
              </ComponentShowcase>
              <CodeBlock code={withFormCode} language="tsx" />
            </div>
          </div>
        </section>

        {/* RTL Support Example */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.sheetComponent.rtl.example}</h2>
          <p className="text-muted-foreground mb-6">
            {t.sheetComponent.rtl.exampleDescription}
          </p>
          <ComponentShowcase.Comparison ltrLabel="LTR (English)" rtlLabel="RTL (العربية)">
            <div className="flex gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">{t.sheetComponent.demo.openFromStart}</Button>
                </SheetTrigger>
                <SheetContent side="start">
                  <SheetHeader>
                    <SheetTitle>{t.sheetComponent.demo.navigationMenu}</SheetTitle>
                    <SheetDescription>
                      {t.sheetComponent.demo.navigationDescription}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <p className="text-sm text-muted-foreground">
                      {t.sheetComponent.demo.slidesFromStart}
                    </p>
                  </div>
                </SheetContent>
              </Sheet>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">{t.sheetComponent.demo.openFromEnd}</Button>
                </SheetTrigger>
                <SheetContent side="end">
                  <SheetHeader>
                    <SheetTitle>{t.sheetComponent.demo.settingsPanel}</SheetTitle>
                    <SheetDescription>
                      {t.sheetComponent.demo.settingsDescription}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <p className="text-sm text-muted-foreground">
                      {t.sheetComponent.demo.slidesFromEnd}
                    </p>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </ComponentShowcase.Comparison>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t.sheetComponent.props.title}</h2>
          <PropsTable props={sheetContentProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t.sheetComponent.accessibility.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t.sheetComponent.accessibility.keyboard}</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Esc</kbd> - {t.sheetComponent.accessibility.escape}</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Tab</kbd> - {t.sheetComponent.accessibility.tab}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t.sheetComponent.accessibility.aria}</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>{t.sheetComponent.accessibility.roleDialog}</li>
                  <li>{t.sheetComponent.accessibility.ariaDescribedby}</li>
                  <li>{t.sheetComponent.accessibility.ariaLabelledby}</li>
                  <li>{t.sheetComponent.accessibility.focusTrap}</li>
                  <li>{t.sheetComponent.accessibility.focusReturn}</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Support */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t.sheetComponent.rtl.title}</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                {t.sheetComponent.rtl.description}
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>{t.sheetComponent.rtl.sideStart}</li>
                <li>{t.sheetComponent.rtl.sideEnd}</li>
                <li>{t.sheetComponent.rtl.slideAnimations}</li>
                <li>{t.sheetComponent.rtl.closeButton}</li>
                <li>{t.sheetComponent.rtl.contentLayout}</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4">{t.sheetComponent.related.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/dialog">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t.sheetComponent.related.dialog}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.sheetComponent.related.dialogDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/popover">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t.sheetComponent.related.popover}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.sheetComponent.related.popoverDesc}
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
