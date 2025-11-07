'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import {
  Copy,
  Share,
  Download,
  Trash2,
  Edit,
  Star,
  Archive,
} from 'lucide-react'

const contextMenuProps: PropDefinition[] = [
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    default: 'undefined',
    required: false,
    description: 'Callback when open state changes',
  },
]

const installCode = `npm install @rtl-design-system/core`

const basicUsageCode = `import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'

<ContextMenu>
  <ContextMenuTrigger>
    <div className="border rounded p-4">
      Right click me
    </div>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Edit</ContextMenuItem>
    <ContextMenuItem>Copy</ContextMenuItem>
    <ContextMenuItem>Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`

const withIconsCode = `<ContextMenu>
  <ContextMenuTrigger>
    <Card className="w-64 h-32 flex items-center justify-center">
      <p>Right click this card</p>
    </Card>
  </ContextMenuTrigger>
  <ContextMenuContent className="w-56">
    <ContextMenuItem>
      <Edit className="me-2 h-4 w-4" />
      <span>Edit</span>
      <ContextMenuShortcut>⌘E</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem>
      <Copy className="me-2 h-4 w-4" />
      <span>Copy</span>
      <ContextMenuShortcut>⌘C</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem>
      <Share className="me-2 h-4 w-4" />
      <span>Share</span>
    </ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem>
      <Trash2 className="me-2 h-4 w-4" />
      <span>Delete</span>
      <ContextMenuShortcut>⌘D</ContextMenuShortcut>
    </ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`

const withCheckboxesCode = `const [showBookmarks, setShowBookmarks] = useState(true)
const [showReadingList, setShowReadingList] = useState(false)

<ContextMenu>
  <ContextMenuTrigger>
    <div className="border rounded p-8 text-center">
      Right click for view options
    </div>
  </ContextMenuTrigger>
  <ContextMenuContent className="w-56">
    <ContextMenuLabel>View Options</ContextMenuLabel>
    <ContextMenuSeparator />
    <ContextMenuCheckboxItem
      checked={showBookmarks}
      onCheckedChange={setShowBookmarks}
    >
      Show Bookmarks
    </ContextMenuCheckboxItem>
    <ContextMenuCheckboxItem
      checked={showReadingList}
      onCheckedChange={setShowReadingList}
    >
      Show Reading List
    </ContextMenuCheckboxItem>
  </ContextMenuContent>
</ContextMenu>`

const rtlCode = `// RTL support is automatic!
// Context menus flip correctly in RTL mode

<ContextMenu>
  <ContextMenuTrigger>
    <Card className="p-8 text-center">
      انقر بزر الماوس الأيمن
    </Card>
  </ContextMenuTrigger>
  <ContextMenuContent className="w-56">
    <ContextMenuItem>
      <Edit className="me-2 h-4 w-4" />
      <span>تعديل</span>
    </ContextMenuItem>
    <ContextMenuItem>
      <Copy className="me-2 h-4 w-4" />
      <span>نسخ</span>
    </ContextMenuItem>
    <ContextMenuItem>
      <Trash2 className="me-2 h-4 w-4" />
      <span>حذف</span>
    </ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`

export default function ContextMenuPage() {
  const [showBookmarks, setShowBookmarks] = React.useState(true)
  const [showReadingList, setShowReadingList] = React.useState(false)

  return (
    <div className="min-h-screen">

      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/components" className="hover:text-foreground transition-colors">
                Components
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">Context Menu</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Context Menu</h1>
          <p className="text-xl text-muted-foreground">
            A menu component that appears on right-click (or long press on touch devices). Perfect
            for contextual actions with full RTL support and keyboard navigation.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Preview</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <ContextMenu>
                <ContextMenuTrigger>
                  <Card className="w-full max-w-md h-32 flex items-center justify-center border-dashed border-2 cursor-context-menu">
                    <p className="text-muted-foreground">Right click here</p>
                  </Card>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-56">
                  <ContextMenuItem>
                    <Edit className="me-2 h-4 w-4" />
                    <span>Edit</span>
                    <ContextMenuShortcut>⌘E</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <Copy className="me-2 h-4 w-4" />
                    <span>Copy</span>
                    <ContextMenuShortcut>⌘C</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <Share className="me-2 h-4 w-4" />
                    <span>Share</span>
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem>
                    <Download className="me-2 h-4 w-4" />
                    <span>Download</span>
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem className="text-destructive">
                    <Trash2 className="me-2 h-4 w-4" />
                    <span>Delete</span>
                    <ContextMenuShortcut>⌘D</ContextMenuShortcut>
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Installation</h2>
          <CodeBlock code={installCode} language="bash" title="Terminal" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Usage</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Examples</h2>

          <div className="space-y-8">
            {/* With Icons */}
            <div>
              <h3 className="text-lg font-semibold mb-4">With Icons and Shortcuts</h3>
              <Card>
                <CardContent className="p-6 flex items-center justify-center">
                  <ContextMenu>
                    <ContextMenuTrigger>
                      <Card className="w-64 h-32 flex items-center justify-center border-dashed border-2 cursor-context-menu">
                        <p className="text-muted-foreground">Right click me</p>
                      </Card>
                    </ContextMenuTrigger>
                    <ContextMenuContent className="w-56">
                      <ContextMenuItem>
                        <Edit className="me-2 h-4 w-4" />
                        <span>Edit</span>
                        <ContextMenuShortcut>⌘E</ContextMenuShortcut>
                      </ContextMenuItem>
                      <ContextMenuItem>
                        <Copy className="me-2 h-4 w-4" />
                        <span>Copy</span>
                        <ContextMenuShortcut>⌘C</ContextMenuShortcut>
                      </ContextMenuItem>
                      <ContextMenuItem>
                        <Share className="me-2 h-4 w-4" />
                        <span>Share</span>
                      </ContextMenuItem>
                      <ContextMenuSeparator />
                      <ContextMenuItem className="text-destructive">
                        <Trash2 className="me-2 h-4 w-4" />
                        <span>Delete</span>
                        <ContextMenuShortcut>⌘D</ContextMenuShortcut>
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withIconsCode} language="tsx" collapsible />
              </div>
            </div>

            {/* With Checkboxes */}
            <div>
              <h3 className="text-lg font-semibold mb-4">With Checkboxes</h3>
              <Card>
                <CardContent className="p-6 flex items-center justify-center">
                  <ContextMenu>
                    <ContextMenuTrigger>
                      <Card className="w-64 h-32 flex items-center justify-center border-dashed border-2 cursor-context-menu">
                        <p className="text-muted-foreground">Right click for options</p>
                      </Card>
                    </ContextMenuTrigger>
                    <ContextMenuContent className="w-56">
                      <ContextMenuLabel>View Options</ContextMenuLabel>
                      <ContextMenuSeparator />
                      <ContextMenuCheckboxItem
                        checked={showBookmarks}
                        onCheckedChange={setShowBookmarks}
                      >
                        Show Bookmarks
                      </ContextMenuCheckboxItem>
                      <ContextMenuCheckboxItem
                        checked={showReadingList}
                        onCheckedChange={setShowReadingList}
                      >
                        Show Reading List
                      </ContextMenuCheckboxItem>
                    </ContextMenuContent>
                  </ContextMenu>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withCheckboxesCode} language="tsx" collapsible />
              </div>
            </div>

            {/* File Explorer Example */}
            <div>
              <h3 className="text-lg font-semibold mb-4">File Explorer Example</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    {['Document.pdf', 'Image.png', 'Video.mp4'].map((file) => (
                      <ContextMenu key={file}>
                        <ContextMenuTrigger>
                          <div className="flex items-center gap-2 p-3 rounded hover:bg-accent cursor-context-menu">
                            <span className="text-sm">{file}</span>
                          </div>
                        </ContextMenuTrigger>
                        <ContextMenuContent className="w-56">
                          <ContextMenuItem>
                            <Copy className="me-2 h-4 w-4" />
                            <span>Copy</span>
                          </ContextMenuItem>
                          <ContextMenuItem>
                            <Download className="me-2 h-4 w-4" />
                            <span>Download</span>
                          </ContextMenuItem>
                          <ContextMenuItem>
                            <Star className="me-2 h-4 w-4" />
                            <span>Add to Favorites</span>
                          </ContextMenuItem>
                          <ContextMenuSeparator />
                          <ContextMenuItem>
                            <Archive className="me-2 h-4 w-4" />
                            <span>Archive</span>
                          </ContextMenuItem>
                          <ContextMenuItem className="text-destructive">
                            <Trash2 className="me-2 h-4 w-4" />
                            <span>Delete</span>
                          </ContextMenuItem>
                        </ContextMenuContent>
                      </ContextMenu>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Props</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ContextMenu</h3>
              <PropsTable props={contextMenuProps} />
            </div>
          </div>
          <Card className="mt-6">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                This component is built on top of Radix UI&apos;s Context Menu primitive. For a complete
                list of props for each sub-component, refer to the{' '}
                <a
                  href="https://www.radix-ui.com/docs/primitives/components/context-menu"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Radix UI documentation
                </a>
                .
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Accessibility</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Keyboard Navigation</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li className="flex items-start gap-2">
                    <code className="bg-muted px-1.5 py-0.5 rounded">Space</code>
                    <span>Opens the menu when trigger is focused</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <code className="bg-muted px-1.5 py-0.5 rounded">Enter</code>
                    <span>Opens the menu and activates the first item</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <code className="bg-muted px-1.5 py-0.5 rounded">↓</code>
                    <span>Moves focus to next menu item</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <code className="bg-muted px-1.5 py-0.5 rounded">↑</code>
                    <span>Moves focus to previous menu item</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <code className="bg-muted px-1.5 py-0.5 rounded">Esc</code>
                    <span>Closes the menu</span>
                  </li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Touch Devices</h3>
                <p className="text-muted-foreground text-sm">
                  On touch devices, context menus can be triggered with a long press. The component
                  handles this automatically, providing a consistent experience across devices.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">ARIA Attributes</h3>
                <p className="text-muted-foreground text-sm">
                  Radix UI automatically manages all ARIA attributes including roles, aria-expanded,
                  and focus handling for screen reader compatibility.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Considerations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">RTL Considerations</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                Context menus automatically support RTL layout. Icons and shortcuts position
                correctly using logical properties (ms-auto, ps-, pe-).
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">LTR (English)</h4>
                  <div dir="ltr" className="flex justify-center">
                    <ContextMenu>
                      <ContextMenuTrigger>
                        <Card className="w-48 h-24 flex items-center justify-center border-dashed border-2 cursor-context-menu">
                          <p className="text-sm text-muted-foreground">Right click</p>
                        </Card>
                      </ContextMenuTrigger>
                      <ContextMenuContent className="w-48">
                        <ContextMenuItem>
                          <Edit className="me-2 h-4 w-4" />
                          <span>Edit</span>
                        </ContextMenuItem>
                        <ContextMenuItem>
                          <Copy className="me-2 h-4 w-4" />
                          <span>Copy</span>
                        </ContextMenuItem>
                      </ContextMenuContent>
                    </ContextMenu>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">RTL (العربية)</h4>
                  <div dir="rtl" className="flex justify-center">
                    <ContextMenu>
                      <ContextMenuTrigger>
                        <Card className="w-48 h-24 flex items-center justify-center border-dashed border-2 cursor-context-menu">
                          <p className="text-sm text-muted-foreground">انقر بزر الماوس الأيمن</p>
                        </Card>
                      </ContextMenuTrigger>
                      <ContextMenuContent className="w-48">
                        <ContextMenuItem>
                          <Edit className="me-2 h-4 w-4" />
                          <span>تعديل</span>
                        </ContextMenuItem>
                        <ContextMenuItem>
                          <Copy className="me-2 h-4 w-4" />
                          <span>نسخ</span>
                        </ContextMenuItem>
                      </ContextMenuContent>
                    </ContextMenu>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Related Components</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/dropdown-menu">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Dropdown Menu</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Similar component, click-triggered
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/popover">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Popover</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    For richer contextual content
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/dialog">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Dialog</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Modal dialogs for confirmations
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
