'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { DirectionToggle } from '@/components/docs/direction-toggle'
import { ThemeToggle } from '@/components/docs/theme-toggle'
import { CodeBlock } from '@/components/docs/code-block'
import { Sparkles, Keyboard, Info } from 'lucide-react'

const focusManagementCode = `// Auto-focus management in dialogs
<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    {/* Focus automatically moves to dialog when opened */}
    {/* Returns to trigger button when closed */}
    <DialogTitle>Dialog Title</DialogTitle>
    <Input autoFocus />
  </DialogContent>
</Dialog>

// Manual focus management
const inputRef = useRef<HTMLInputElement>(null)

useEffect(() => {
  inputRef.current?.focus()
}, [])

<Input ref={inputRef} />`

const focusVisibleCode = `// Focus indicators are visible by default
<Button>
  I show a focus ring when tabbed to
</Button>

// Custom focus styles
<button className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
  Custom Focus Style
</button>`

const keyboardShortcutsCode = `// Implementing keyboard shortcuts
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    // Cmd/Ctrl + K for search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      openSearch()
    }

    // Escape to close
    if (e.key === 'Escape') {
      closeDialog()
    }
  }

  document.addEventListener('keydown', handleKeyDown)
  return () => document.removeEventListener('keydown', handleKeyDown)
}, [])`

const rovingtabindexCode = `// Roving tabindex for radio groups
<RadioGroup value={value} onValueChange={setValue}>
  <RadioGroupItem value="option1" />  {/* tabindex="0" if selected, "-1" otherwise */}
  <RadioGroupItem value="option2" />  {/* tabindex="-1" */}
  <RadioGroupItem value="option3" />  {/* tabindex="-1" */}
</RadioGroup>

// Arrow keys navigate between options
// Only one item in the group is in tab order`

export default function KeyboardPage() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">RTL Design</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <DirectionToggle />
          </div>
        </div>
      </header>

      <main id="main-content" className="container py-12">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link href="/documentation" className="hover:text-foreground transition-colors">Documentation</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">Keyboard Navigation</li>
          </ol>
        </nav>

        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Keyboard className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">Keyboard Navigation</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Complete guide to keyboard accessibility in RTL Design System. All components are fully operable via keyboard without requiring a mouse.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Standard Keyboard Shortcuts</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <kbd className="px-2 py-1 bg-muted rounded font-mono text-sm">Tab</kbd>
                    <p className="text-sm text-muted-foreground mt-1">Move focus forward</p>
                  </div>
                  <span className="text-sm text-muted-foreground">All components</span>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <kbd className="px-2 py-1 bg-muted rounded font-mono text-sm">Shift</kbd> + <kbd className="px-2 py-1 bg-muted rounded font-mono text-sm">Tab</kbd>
                    <p className="text-sm text-muted-foreground mt-1">Move focus backward</p>
                  </div>
                  <span className="text-sm text-muted-foreground">All components</span>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <kbd className="px-2 py-1 bg-muted rounded font-mono text-sm">Enter</kbd> / <kbd className="px-2 py-1 bg-muted rounded font-mono text-sm">Space</kbd>
                    <p className="text-sm text-muted-foreground mt-1">Activate button or control</p>
                  </div>
                  <span className="text-sm text-muted-foreground">Buttons, checkboxes</span>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <kbd className="px-2 py-1 bg-muted rounded font-mono text-sm">Escape</kbd>
                    <p className="text-sm text-muted-foreground mt-1">Close dialog or menu</p>
                  </div>
                  <span className="text-sm text-muted-foreground">Dialogs, dropdowns</span>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <kbd className="px-2 py-1 bg-muted rounded font-mono text-sm">Arrow Keys</kbd>
                    <p className="text-sm text-muted-foreground mt-1">Navigate within component</p>
                  </div>
                  <span className="text-sm text-muted-foreground">Tabs, menus, radio groups</span>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <kbd className="px-2 py-1 bg-muted rounded font-mono text-sm">Home</kbd> / <kbd className="px-2 py-1 bg-muted rounded font-mono text-sm">End</kbd>
                    <p className="text-sm text-muted-foreground mt-1">Jump to first/last item</p>
                  </div>
                  <span className="text-sm text-muted-foreground">Lists, menus</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Focus Management</h2>
          <p className="text-muted-foreground mb-4">
            Proper focus management ensures users can navigate efficiently:
          </p>
          <CodeBlock code={focusManagementCode} language="tsx" />

          <Card className="mt-6 border-blue-500/50 bg-blue-50 dark:bg-blue-950/20">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Focus Trapping
              </h3>
              <p className="text-sm text-muted-foreground">
                Dialogs and modals automatically trap focus inside them until closed, preventing keyboard users from accidentally tabbing outside the modal.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Focus Indicators</h2>
          <p className="text-muted-foreground mb-4">
            All interactive elements show clear focus indicators:
          </p>
          <CodeBlock code={focusVisibleCode} language="tsx" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Custom Keyboard Shortcuts</h2>
          <p className="text-muted-foreground mb-4">
            Implement custom shortcuts for power users:
          </p>
          <CodeBlock code={keyboardShortcutsCode} language="tsx" />

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Best Practices</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Document all keyboard shortcuts in your app</li>
                <li>• Provide a shortcut help dialog (often Shift + ?)</li>
                <li>• Use platform conventions (Cmd on Mac, Ctrl on Windows/Linux)</li>
                <li>• Avoid conflicting with browser shortcuts</li>
                <li>• Allow users to customize shortcuts if possible</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Roving Tabindex</h2>
          <p className="text-muted-foreground mb-4">
            Complex components use roving tabindex for efficient navigation:
          </p>
          <CodeBlock code={rovingtabindexCode} language="tsx" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Component-Specific Shortcuts</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Dialog</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Escape</kbd> - Close dialog</li>
                  <li>• Focus trapped within dialog when open</li>
                  <li>• Auto-focus first focusable element on open</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Tabs</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">←</kbd> <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">→</kbd> - Navigate between tabs</li>
                  <li>• <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Home</kbd> <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">End</kbd> - Jump to first/last tab</li>
                  <li>• Automatically activates on arrow key press</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Select / Dropdown</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">↑</kbd> <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">↓</kbd> - Navigate options</li>
                  <li>• <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Enter</kbd> - Select option</li>
                  <li>• <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Escape</kbd> - Close without selecting</li>
                  <li>• Type to search options</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Learn More</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/documentation/wcag">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">WCAG Compliance</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete accessibility compliance guide
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/documentation/screen-readers">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Screen Readers</h3>
                  <p className="text-sm text-muted-foreground">
                    Optimizing for screen reader users
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
