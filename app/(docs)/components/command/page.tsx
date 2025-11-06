'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { CodeBlock } from '@/components/docs/code-block'
import { Sparkles, Search, FileText, Settings, User } from 'lucide-react'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'

const basicCommandCode = `import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

export function CommandDemo() {
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}`

const dialogCommandCode = `import { useState } from 'react'
import { CommandDialog } from '@/components/ui/command'

export function CommandDialogDemo() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem>New File</CommandItem>
          <CommandItem>New Folder</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}`

export default function CommandPage() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="min-h-screen">

      <main id="main-content" className="container py-12">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link href="/components" className="hover:text-foreground transition-colors">Components</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">Command</li>
          </ol>
        </nav>

        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Command</h1>
          <p className="text-xl text-muted-foreground">
            Fast, composable, command menu for React. Perfect for building search interfaces, command palettes, and quick actions.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Installation</h2>
          <CodeBlock code="npm install cmdk" language="bash" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Basic Command</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <Command className="rounded-lg border shadow-md max-w-md">
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    <CommandItem>
                      <FileText className="me-2 h-4 w-4" />
                      <span>Calendar</span>
                    </CommandItem>
                    <CommandItem>
                      <Search className="me-2 h-4 w-4" />
                      <span>Search Emoji</span>
                    </CommandItem>
                    <CommandItem>
                      <Settings className="me-2 h-4 w-4" />
                      <span>Calculator</span>
                    </CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Settings">
                    <CommandItem>
                      <User className="me-2 h-4 w-4" />
                      <span>Profile</span>
                    </CommandItem>
                    <CommandItem>
                      <Settings className="me-2 h-4 w-4" />
                      <span>Settings</span>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </ComponentShowcase.Demo>
          </ComponentShowcase>

          <CodeBlock code={basicCommandCode} language="tsx" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Command Dialog</h2>
          <p className="text-muted-foreground mb-4">
            Opens in a dialog with keyboard shortcut support (Cmd/Ctrl + K):
          </p>
          <CodeBlock code={dialogCommandCode} language="tsx" />

          <div className="mt-6">
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
            >
              <Search className="h-4 w-4" />
              Open Command Menu
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>

            <CommandDialog open={open} onOpenChange={setOpen}>
              <CommandInput placeholder="Type a command or search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Actions">
                  <CommandItem>
                    <FileText className="me-2 h-4 w-4" />
                    New File
                  </CommandItem>
                  <CommandItem>
                    <Search className="me-2 h-4 w-4" />
                    Search Files
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </CommandDialog>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">RTL Support</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                The Command component automatically adjusts icon positions, text alignment, and keyboard navigation for RTL layouts. Try toggling the direction to see it in action.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Accessibility</h2>
          <Card>
            <CardContent className="p-6 space-y-2 text-sm">
              <p>• Fully keyboard navigable with arrow keys</p>
              <p>• Screen reader friendly with proper ARIA labels</p>
              <p>• Type-ahead search support</p>
              <p>• Focus management in dialog mode</p>
              <p>• Escape key closes the dialog</p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
