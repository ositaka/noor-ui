'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { CodeBlock } from '@/components/docs/code-block'
import { Keyboard, Info } from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

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
  const { locale } = useDirection()
  const t = content[locale].documentationPages.keyboard
  const common = content[locale].documentationPages.common

  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">{common.home}</Link></li>
            <li>/</li>
            <li><Link href="/documentation" className="hover:text-foreground transition-colors">{common.documentation}</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">{t.title}</li>
          </ol>
        </nav>

        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Keyboard className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">{t.title}</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            {t.subtitle}
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.standardShortcuts}</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <kbd className="px-2 py-1 bg-muted rounded font-mono text-sm">Tab</kbd>
                    <p className="text-sm text-muted-foreground mt-1">{t.tab}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{t.allComponents}</span>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <kbd className="px-2 py-1 bg-muted rounded font-mono text-sm">Shift</kbd> + <kbd className="px-2 py-1 bg-muted rounded font-mono text-sm">Tab</kbd>
                    <p className="text-sm text-muted-foreground mt-1">{t.shiftTab}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{t.allComponents}</span>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <kbd className="px-2 py-1 bg-muted rounded font-mono text-sm">Enter</kbd> / <kbd className="px-2 py-1 bg-muted rounded font-mono text-sm">Space</kbd>
                    <p className="text-sm text-muted-foreground mt-1">{t.enterSpace}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{t.buttonsCheckboxes}</span>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <kbd className="px-2 py-1 bg-muted rounded font-mono text-sm">Escape</kbd>
                    <p className="text-sm text-muted-foreground mt-1">{t.escape}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{t.dialogsDropdowns}</span>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <kbd className="px-2 py-1 bg-muted rounded font-mono text-sm">Arrow Keys</kbd>
                    <p className="text-sm text-muted-foreground mt-1">{t.arrowKeys}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{t.tabsMenusRadio}</span>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <kbd className="px-2 py-1 bg-muted rounded font-mono text-sm">Home</kbd> / <kbd className="px-2 py-1 bg-muted rounded font-mono text-sm">End</kbd>
                    <p className="text-sm text-muted-foreground mt-1">{t.homeEnd}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{t.listsMenus}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.focusManagement}</h2>
          <p className="text-muted-foreground mb-4">
            {t.focusDesc}
          </p>
          <CodeBlock code={focusManagementCode} language="tsx" />

          <Card className="mt-6 border-blue-500/50 bg-blue-50 dark:bg-blue-950/20">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                {t.focusTrapping}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.focusTrappingDesc}
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.focusIndicators}</h2>
          <p className="text-muted-foreground mb-4">
            {t.focusIndicatorsDesc}
          </p>
          <CodeBlock code={focusVisibleCode} language="tsx" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.customShortcuts}</h2>
          <p className="text-muted-foreground mb-4">
            {t.customDesc}
          </p>
          <CodeBlock code={keyboardShortcutsCode} language="tsx" />

          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">{t.bestPractices}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• {t.documentShortcuts}</li>
                <li>• {t.provideHelp}</li>
                <li>• {t.platformConventions}</li>
                <li>• {t.avoidConflicts}</li>
                <li>• {t.allowCustomize}</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.rovingTabindex}</h2>
          <p className="text-muted-foreground mb-4">
            {t.rovingDesc}
          </p>
          <CodeBlock code={rovingtabindexCode} language="tsx" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentShortcuts}</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">{t.dialog}</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Escape</kbd> - {t.closeDialog}</li>
                  <li>• {t.focusTrapped}</li>
                  <li>• {t.autoFocus}</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">{t.tabs}</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">←</kbd> <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">→</kbd> - {t.navigateTabs}</li>
                  <li>• <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Home</kbd> <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">End</kbd> - {t.jumpFirstLast}</li>
                  <li>• {t.autoActivate}</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">{t.selectDropdown}</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">↑</kbd> <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">↓</kbd> - {t.navigateOptions}</li>
                  <li>• <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Enter</kbd> - {t.selectOption}</li>
                  <li>• <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Escape</kbd> - {t.closeWithoutSelect}</li>
                  <li>• {t.typeSearch}</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{common.learnMore}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/documentation/wcag">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t.wcagLink}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.wcagDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/documentation/screen-readers">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t.screenReadersLink}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.screenReadersDesc}
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
