'use client'

import { Button } from '@/components/ui/button'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { useState } from 'react'

export default function DialogPage() {
  const [open, setOpen] = useState(false)

  // Example code strings
  const basicCode = `import {
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
        This action cannot be undone. This will permanently delete your
        account and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>`

  const withFormCode = `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Edit Profile</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when you&apos;re done.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-end">
          Name
        </Label>
        <Input id="name" value="Pedro Duarte" className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="text-end">
          Username
        </Label>
        <Input id="username" value="@peduarte" className="col-span-3" />
      </div>
    </div>
    <DialogFooter>
      <Button type="submit">Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`

  const controlledCode = `import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

function ControlledDialog() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Controlled Dialog</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Controlled Dialog</DialogTitle>
            <DialogDescription>
              This dialog's open state is controlled by React state.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </>
  )
}`

  const confirmationCode = `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

<Dialog>
  <DialogTrigger asChild>
    <Button variant="destructive">Delete Account</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your
        account and remove your data from our servers.
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Dialog</h1>
        <p className="text-lg text-muted-foreground">
          A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.
        </p>
      </div>

      {/* Preview */}
      <ComponentShowcase
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </ComponentShowcase>

      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <div className="bg-muted p-4 rounded-lg">
          <code className="text-sm">npx shadcn-ui@latest add dialog</code>
        </div>
      </div>

      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <div className="bg-muted p-4 rounded-lg overflow-x-auto">
          <pre className="text-sm">
            <code>{basicCode}</code>
          </pre>
        </div>
      </div>

      {/* Examples */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Examples</h2>

        {/* Basic */}
        <ComponentShowcase
          title="Basic Dialog"
          description="A simple dialog with a title and description."
          code={basicCode}
        >
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your
                  account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </ComponentShowcase>

        {/* With Form */}
        <ComponentShowcase
          title="Dialog with Form"
          description="A dialog containing a form with inputs."
          code={withFormCode}
        >
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-end">
                    Name
                  </Label>
                  <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-end">
                    Username
                  </Label>
                  <Input id="username" defaultValue="@peduarte" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </ComponentShowcase>

        {/* Controlled */}
        <ComponentShowcase
          title="Controlled Dialog"
          description="Control the dialog's open state with React state."
          code={controlledCode}
        >
          <>
            <Button onClick={() => setOpen(true)}>Open Controlled Dialog</Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Controlled Dialog</DialogTitle>
                  <DialogDescription>
                    This dialog&apos;s open state is controlled by React state.
                  </DialogDescription>
                </DialogHeader>
                <Button onClick={() => setOpen(false)}>Close</Button>
              </DialogContent>
            </Dialog>
          </>
        </ComponentShowcase>

        {/* Confirmation */}
        <ComponentShowcase
          title="Confirmation Dialog"
          description="A dialog for confirming destructive actions."
          code={confirmationCode}
        >
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your
                  account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button variant="destructive">Delete</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </ComponentShowcase>
      </div>

      {/* API Reference */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>

        <div className="space-y-6">
          {/* Dialog Props */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Dialog</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-2 text-start font-semibold">Prop</th>
                    <th className="px-4 py-2 text-start font-semibold">Type</th>
                    <th className="px-4 py-2 text-start font-semibold">Default</th>
                    <th className="px-4 py-2 text-start font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-4 py-2 font-mono">open</td>
                    <td className="px-4 py-2 font-mono text-xs">boolean</td>
                    <td className="px-4 py-2 font-mono">-</td>
                    <td className="px-4 py-2">Controlled open state</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono">onOpenChange</td>
                    <td className="px-4 py-2 font-mono text-xs">(open: boolean) =&gt; void</td>
                    <td className="px-4 py-2 font-mono">-</td>
                    <td className="px-4 py-2">Callback when open state changes</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono">defaultOpen</td>
                    <td className="px-4 py-2 font-mono text-xs">boolean</td>
                    <td className="px-4 py-2 font-mono">false</td>
                    <td className="px-4 py-2">Default open state (uncontrolled)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Accessibility</h2>
        <div className="space-y-2 text-muted-foreground">
          <p>
            <strong>ARIA Roles:</strong> Uses <code>role=&quot;dialog&quot;</code> and <code>aria-modal=&quot;true&quot;</code>.
          </p>
          <p>
            <strong>Keyboard Navigation:</strong> Escape closes the dialog. Tab traps focus within the dialog.
          </p>
          <p>
            <strong>Focus Management:</strong> Focus is automatically moved to the dialog when opened and returned to the trigger when closed.
          </p>
          <p>
            <strong>Backdrop Dismiss:</strong> Clicking outside the dialog closes it (can be disabled).
          </p>
        </div>
      </div>

      {/* RTL Support */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">RTL Support</h2>
        <p className="text-muted-foreground mb-4">
          The Dialog component is fully RTL-compatible using logical properties:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* LTR */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">LTR (Left-to-Right)</h3>
            <div dir="ltr">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* RTL */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">RTL (Right-to-Left)</h3>
            <div dir="rtl">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>فتح مربع الحوار</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>تحرير الملف الشخصي</DialogTitle>
                    <DialogDescription>
                      قم بإجراء تغييرات على ملفك الشخصي هنا.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="bg-muted p-4 rounded-lg mt-4">
          <p className="text-sm">
            <strong>Key RTL Features:</strong>
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
            <li>Close button positions on the correct side (end)</li>
            <li>Content aligns naturally (text-start)</li>
            <li>Dialog centered properly in both directions</li>
            <li>Animations work correctly in RTL</li>
          </ul>
        </div>
      </div>

      {/* Related Components */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Related Components</h2>
        <div className="flex gap-2">
          <a
            href="/components/alert"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Alert
          </a>
          <a
            href="/components/toast"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Toast
          </a>
        </div>
      </div>
    </div>
  )
}
