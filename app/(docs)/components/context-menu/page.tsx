'use client'

import * as React from 'react'
import Link from 'next/link'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'
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

const getContextMenuProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    default: 'undefined',
    required: false,
    description: t.contextMenuComponent.props.onOpenChange,
  },
]

const installCode = `npm install @noorui/components`

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
  const { locale } = useDirection()
  const t = content[locale]
  const contextMenuProps = getContextMenuProps(t)

  const [showBookmarks, setShowBookmarks] = React.useState(true)
  const [showReadingList, setShowReadingList] = React.useState(false)

  return (
    <div className="min-h-screen">

      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-12">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {t.nav.home}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/components" className="hover:text-foreground transition-colors">
                {t.nav.components}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">{t.contextMenuComponent.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.contextMenuComponent.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.contextMenuComponent.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.contextMenuComponent.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <ContextMenu>
                <ContextMenuTrigger>
                  <Card className="w-full max-w-md h-32 flex items-center justify-center border-dashed border-2 cursor-context-menu">
                    <p className="text-muted-foreground">{t.contextMenuComponent.demo.rightClick}</p>
                  </Card>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-56">
                  <ContextMenuItem>
                    <Edit className="me-2 h-4 w-4" />
                    <span>{t.contextMenuComponent.demo.edit}</span>
                    <ContextMenuShortcut>⌘E</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <Copy className="me-2 h-4 w-4" />
                    <span>{t.contextMenuComponent.demo.copy}</span>
                    <ContextMenuShortcut>⌘C</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <Share className="me-2 h-4 w-4" />
                    <span>{t.contextMenuComponent.demo.share}</span>
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem>
                    <Download className="me-2 h-4 w-4" />
                    <span>{t.contextMenuComponent.demo.download}</span>
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem className="text-destructive">
                    <Trash2 className="me-2 h-4 w-4" />
                    <span>{t.contextMenuComponent.demo.delete}</span>
                    <ContextMenuShortcut>⌘D</ContextMenuShortcut>
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.contextMenuComponent.installation}</h2>
          <CodeBlock code={installCode} language="bash" title="Terminal" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.contextMenuComponent.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.contextMenuComponent.examples.title}</h2>

          <div className="space-y-8">
            {/* With Icons */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.contextMenuComponent.examples.withIcons}</h3>
              <Card>
                <CardContent className="p-6 flex items-center justify-center">
                  <ContextMenu>
                    <ContextMenuTrigger>
                      <Card className="w-64 h-32 flex items-center justify-center border-dashed border-2 cursor-context-menu">
                        <p className="text-muted-foreground">{t.contextMenuComponent.demo.rightClickMe}</p>
                      </Card>
                    </ContextMenuTrigger>
                    <ContextMenuContent className="w-56">
                      <ContextMenuItem>
                        <Edit className="me-2 h-4 w-4" />
                        <span>{t.contextMenuComponent.demo.edit}</span>
                        <ContextMenuShortcut>⌘E</ContextMenuShortcut>
                      </ContextMenuItem>
                      <ContextMenuItem>
                        <Copy className="me-2 h-4 w-4" />
                        <span>{t.contextMenuComponent.demo.copy}</span>
                        <ContextMenuShortcut>⌘C</ContextMenuShortcut>
                      </ContextMenuItem>
                      <ContextMenuItem>
                        <Share className="me-2 h-4 w-4" />
                        <span>{t.contextMenuComponent.demo.share}</span>
                      </ContextMenuItem>
                      <ContextMenuSeparator />
                      <ContextMenuItem className="text-destructive">
                        <Trash2 className="me-2 h-4 w-4" />
                        <span>{t.contextMenuComponent.demo.delete}</span>
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
              <h3 className="text-lg font-semibold mb-4">{t.contextMenuComponent.examples.withCheckboxes}</h3>
              <Card>
                <CardContent className="p-6 flex items-center justify-center">
                  <ContextMenu>
                    <ContextMenuTrigger>
                      <Card className="w-64 h-32 flex items-center justify-center border-dashed border-2 cursor-context-menu">
                        <p className="text-muted-foreground">{t.contextMenuComponent.demo.rightClickOptions}</p>
                      </Card>
                    </ContextMenuTrigger>
                    <ContextMenuContent className="w-56">
                      <ContextMenuLabel>{t.contextMenuComponent.demo.viewOptions}</ContextMenuLabel>
                      <ContextMenuSeparator />
                      <ContextMenuCheckboxItem
                        checked={showBookmarks}
                        onCheckedChange={setShowBookmarks}
                      >
                        {t.contextMenuComponent.demo.showBookmarks}
                      </ContextMenuCheckboxItem>
                      <ContextMenuCheckboxItem
                        checked={showReadingList}
                        onCheckedChange={setShowReadingList}
                      >
                        {t.contextMenuComponent.demo.showReadingList}
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
              <h3 className="text-lg font-semibold mb-4">{t.contextMenuComponent.examples.fileExplorer}</h3>
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
                            <span>{t.contextMenuComponent.demo.copy}</span>
                          </ContextMenuItem>
                          <ContextMenuItem>
                            <Download className="me-2 h-4 w-4" />
                            <span>{t.contextMenuComponent.demo.download}</span>
                          </ContextMenuItem>
                          <ContextMenuItem>
                            <Star className="me-2 h-4 w-4" />
                            <span>{t.contextMenuComponent.demo.addToFavorites}</span>
                          </ContextMenuItem>
                          <ContextMenuSeparator />
                          <ContextMenuItem>
                            <Archive className="me-2 h-4 w-4" />
                            <span>{t.contextMenuComponent.demo.archive}</span>
                          </ContextMenuItem>
                          <ContextMenuItem className="text-destructive">
                            <Trash2 className="me-2 h-4 w-4" />
                            <span>{t.contextMenuComponent.demo.delete}</span>
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.contextMenuComponent.props.title}</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ContextMenu</h3>
              <PropsTable props={contextMenuProps} />
            </div>
          </div>
          <Card className="mt-6">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                {t.contextMenuComponent.props.radixNote}{' '}
                <a
                  href="https://www.radix-ui.com/docs/primitives/components/context-menu"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.contextMenuComponent.props.radixDocs}
                </a>
                .
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.contextMenuComponent.accessibility.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t.contextMenuComponent.accessibility.keyboard}</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li className="flex items-start gap-2">
                    <code className="bg-muted px-1.5 py-0.5 rounded">Space</code>
                    <span>{t.contextMenuComponent.accessibility.space}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <code className="bg-muted px-1.5 py-0.5 rounded">Enter</code>
                    <span>{t.contextMenuComponent.accessibility.enter}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <code className="bg-muted px-1.5 py-0.5 rounded">↓</code>
                    <span>{t.contextMenuComponent.accessibility.arrowDown}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <code className="bg-muted px-1.5 py-0.5 rounded">↑</code>
                    <span>{t.contextMenuComponent.accessibility.arrowUp}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <code className="bg-muted px-1.5 py-0.5 rounded">Esc</code>
                    <span>{t.contextMenuComponent.accessibility.escape}</span>
                  </li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.contextMenuComponent.accessibility.touch}</h3>
                <p className="text-muted-foreground text-sm">
                  {t.contextMenuComponent.accessibility.touchDescription}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.contextMenuComponent.accessibility.aria}</h3>
                <p className="text-muted-foreground text-sm">
                  {t.contextMenuComponent.accessibility.ariaDescription}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Considerations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.contextMenuComponent.rtl.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                {t.contextMenuComponent.rtl.description}
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
