'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getDialogProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'open',
    type: 'boolean',
    default: 'undefined',
    required: false,
    description: t.dialogComponent.props.open,
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    default: 'undefined',
    required: false,
    description: t.dialogComponent.props.onOpenChange,
  },
  {
    name: 'defaultOpen',
    type: 'boolean',
    default: 'false',
    required: false,
    description: t.dialogComponent.props.defaultOpen,
  },
]

const installCode = `npm install noorui-rtl`

const basicUsageCode = `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>`

const withFormCode = `<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Edit Profile</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" defaultValue="Pedro Duarte" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue="@peduarte" />
      </div>
    </div>
    <DialogFooter>
      <Button type="submit">Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`

const confirmationCode = `<Dialog>
  <DialogTrigger asChild>
    <Button variant="destructive">Delete Account</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete
        your account and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button variant="destructive">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`

export default function DialogPage() {
  const { locale } = useDirection()
  const t = content[locale]
  const dialogProps = getDialogProps(t)

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
            <li className="text-foreground font-medium">{t.dialogComponent.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.dialogComponent.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.dialogComponent.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.dialogComponent.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>{t.dialogComponent.demo.openDialog}</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t.dialogComponent.demo.title}</DialogTitle>
                    <DialogDescription>
                      {t.dialogComponent.demo.description}
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.dialogComponent.installation}</h2>
          <CodeBlock code={installCode} language="bash" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.dialogComponent.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.dialogComponent.examples.title}</h2>

          <div className="space-y-8">
            {/* Basic */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.dialogComponent.examples.basic}</h3>
              <Card>
                <CardContent className="p-6">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>{t.dialogComponent.demo.openDialog}</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{t.dialogComponent.demo.title}</DialogTitle>
                        <DialogDescription>
                          {t.dialogComponent.demo.description}
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={basicUsageCode} language="tsx" collapsible />
              </div>
            </div>

            {/* With Form */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.dialogComponent.examples.withForm}</h3>
              <Card>
                <CardContent className="p-6">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">{t.dialogComponent.demo.editProfile}</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{t.dialogComponent.demo.editTitle}</DialogTitle>
                        <DialogDescription>
                          {t.dialogComponent.demo.editDescription}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">{t.dialogComponent.demo.name}</Label>
                          <Input id="name" defaultValue="Pedro Duarte" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="username">{t.dialogComponent.demo.username}</Label>
                          <Input id="username" defaultValue="@peduarte" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">{t.dialogComponent.demo.saveChanges}</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withFormCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Confirmation */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.dialogComponent.examples.confirmation}</h3>
              <Card>
                <CardContent className="p-6">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive">{t.dialogComponent.demo.deleteAccount}</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{t.dialogComponent.demo.title}</DialogTitle>
                        <DialogDescription>
                          {t.dialogComponent.demo.description}
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">{t.dialogComponent.demo.cancel}</Button>
                        </DialogClose>
                        <Button variant="destructive">{t.dialogComponent.demo.delete}</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={confirmationCode} language="tsx" collapsible />
              </div>
            </div>
          </div>
        </section>

        {/* RTL Support Example */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.dialogComponent.rtl.example}</h2>
          <p className="text-muted-foreground mb-6">
            {t.dialogComponent.rtl.exampleDescription}
          </p>
          <ComponentShowcase.Comparison ltrLabel="LTR (English)" rtlLabel="RTL (العربية)">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">{t.dialogComponent.demo.openSettings}</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t.dialogComponent.demo.accountSettings}</DialogTitle>
                  <DialogDescription>
                    {t.dialogComponent.demo.accountDescription}
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">
                    {t.dialogComponent.demo.settingsContent}
                  </p>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">{t.dialogComponent.demo.cancel}</Button>
                  </DialogClose>
                  <Button>{t.dialogComponent.demo.saveChanges}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </ComponentShowcase.Comparison>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.dialogComponent.props.title}</h2>
          <PropsTable props={dialogProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.dialogComponent.accessibility.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t.dialogComponent.accessibility.ariaRoles}</h3>
                <p className="text-muted-foreground">
                  {t.dialogComponent.accessibility.ariaDescription}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t.dialogComponent.accessibility.keyboard}</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">Escape</kbd>: {t.dialogComponent.accessibility.escapeKey}
                  </li>
                  <li>
                    <kbd className="px-1.5 py-0.5 rounded bg-muted">Tab</kbd>: {t.dialogComponent.accessibility.tabKey}
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t.dialogComponent.accessibility.focusManagement}</h3>
                <p className="text-muted-foreground">
                  {t.dialogComponent.accessibility.focusDescription}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Support */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.dialogComponent.rtl.title}</h2>
          <p className="text-muted-foreground mb-6">
            {t.dialogComponent.rtl.description}
          </p>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-semibold mb-2">{t.dialogComponent.rtl.features}</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>{t.dialogComponent.rtl.closeButton}</li>
                <li>{t.dialogComponent.rtl.contentAlign}</li>
                <li>{t.dialogComponent.rtl.centered}</li>
                <li>{t.dialogComponent.rtl.animations}</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Related */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.dialogComponent.related.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/alert">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t.dialogComponent.related.alert}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.dialogComponent.related.alertDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/toast">
              <Card className="hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t.dialogComponent.related.toast}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.dialogComponent.related.toastDesc}
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
