'use client'

import * as React from 'react'
import Link from 'next/link'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import {
  User,
  Settings,
  CreditCard,
  LogOut,
  UserPlus,
  Mail,
  MessageSquare,
  PlusCircle,
  MoreHorizontal
} from 'lucide-react'

const getDropdownMenuProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'open',
    type: 'boolean',
    default: 'undefined',
    required: false,
    description: t.dropdownMenuComponent.props.open,
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    default: 'undefined',
    required: false,
    description: t.dropdownMenuComponent.props.onOpenChange,
  },
]

const installCode = `npm install @noorui/components`

const basicUsageCode = `import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`

const withIconsCode = `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">
      <User className="me-2 h-4 w-4" />
      Account
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <User className="me-2 h-4 w-4" />
      <span>Profile</span>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Settings className="me-2 h-4 w-4" />
      <span>Settings</span>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <LogOut className="me-2 h-4 w-4" />
      <span>Logout</span>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`

const withCheckboxesCode = `const [showPanel, setShowPanel] = useState(true)
const [showSidebar, setShowSidebar] = useState(false)

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">View Options</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>Toggle View</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuCheckboxItem
      checked={showPanel}
      onCheckedChange={setShowPanel}
    >
      Show Panel
    </DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem
      checked={showSidebar}
      onCheckedChange={setShowSidebar}
    >
      Show Sidebar
    </DropdownMenuCheckboxItem>
  </DropdownMenuContent>
</DropdownMenu>`

const withRadioGroupCode = `const [position, setPosition] = useState('bottom')

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Position</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
      <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  </DropdownMenuContent>
</DropdownMenu>`

const rtlCode = `// RTL support is automatic!
// Icons and shortcuts flip correctly in RTL mode

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">الحساب</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>حسابي</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <User className="me-2 h-4 w-4" />
      <span>الملف الشخصي</span>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Settings className="me-2 h-4 w-4" />
      <span>الإعدادات</span>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`

export default function DropdownMenuPage() {
  const { locale } = useDirection()
  const t = content[locale]
  const dropdownMenuProps = getDropdownMenuProps(t)

  const [showPanel, setShowPanel] = React.useState(true)
  const [showSidebar, setShowSidebar] = React.useState(false)
  const [position, setPosition] = React.useState('bottom')

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
            <li className="text-foreground font-medium">{t.dropdownMenuComponent.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.dropdownMenuComponent.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.dropdownMenuComponent.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.dropdownMenuComponent.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <User className="me-2 h-4 w-4" />
                    {t.dropdownMenuComponent.demo.myAccount}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>{t.dropdownMenuComponent.demo.myAccount}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="me-2 h-4 w-4" />
                    <span>{t.dropdownMenuComponent.demo.profile}</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="me-2 h-4 w-4" />
                    <span>{t.dropdownMenuComponent.demo.billing}</span>
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="me-2 h-4 w-4" />
                    <span>{t.dropdownMenuComponent.demo.settings}</span>
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="me-2 h-4 w-4" />
                    <span>{t.dropdownMenuComponent.demo.logout}</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.dropdownMenuComponent.installation}</h2>
          <CodeBlock code={installCode} language="bash" title="Terminal" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.dropdownMenuComponent.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.dropdownMenuComponent.examples.title}</h2>

          <div className="space-y-8">
            {/* With Icons */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.dropdownMenuComponent.examples.withIcons}</h3>
              <Card>
                <CardContent className="p-6 flex items-center justify-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <User className="me-2 h-4 w-4" />
                        {t.dropdownMenuComponent.demo.account}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>{t.dropdownMenuComponent.demo.myAccount}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <User className="me-2 h-4 w-4" />
                        <span>{t.dropdownMenuComponent.demo.profile}</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="me-2 h-4 w-4" />
                        <span>{t.dropdownMenuComponent.demo.settings}</span>
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <LogOut className="me-2 h-4 w-4" />
                        <span>{t.dropdownMenuComponent.demo.logout}</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withIconsCode} language="tsx" collapsible />
              </div>
            </div>

            {/* With Checkboxes */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.dropdownMenuComponent.examples.withCheckboxes}</h3>
              <Card>
                <CardContent className="p-6 flex items-center justify-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">{t.dropdownMenuComponent.demo.viewOptions}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>{t.dropdownMenuComponent.demo.toggleView}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem
                        checked={showPanel}
                        onCheckedChange={setShowPanel}
                      >
                        {t.dropdownMenuComponent.demo.showPanel}
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={showSidebar}
                        onCheckedChange={setShowSidebar}
                      >
                        {t.dropdownMenuComponent.demo.showSidebar}
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withCheckboxesCode} language="tsx" collapsible />
              </div>
            </div>

            {/* With Radio Group */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.dropdownMenuComponent.examples.withRadio}</h3>
              <Card>
                <CardContent className="p-6 flex items-center justify-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        {t.dropdownMenuComponent.demo.position}: {position}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>{t.dropdownMenuComponent.demo.panelPosition}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                        <DropdownMenuRadioItem value="top">{t.dropdownMenuComponent.demo.top}</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="bottom">{t.dropdownMenuComponent.demo.bottom}</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="right">{t.dropdownMenuComponent.demo.right}</DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withRadioGroupCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Sub Menus */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.dropdownMenuComponent.examples.subMenus}</h3>
              <Card>
                <CardContent className="p-6 flex items-center justify-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>{t.dropdownMenuComponent.demo.actions}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <User className="me-2 h-4 w-4" />
                          <span>{t.dropdownMenuComponent.demo.profile}</span>
                        </DropdownMenuItem>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <UserPlus className="me-2 h-4 w-4" />
                            <span>{t.dropdownMenuComponent.demo.inviteUsers}</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem>
                              <Mail className="me-2 h-4 w-4" />
                              <span>{t.dropdownMenuComponent.demo.email}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageSquare className="me-2 h-4 w-4" />
                              <span>{t.dropdownMenuComponent.demo.message}</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <PlusCircle className="me-2 h-4 w-4" />
                              <span>{t.dropdownMenuComponent.demo.more}</span>
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.dropdownMenuComponent.props.title}</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">DropdownMenu</h3>
              <PropsTable props={dropdownMenuProps} />
            </div>
          </div>
          <Card className="mt-6">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                {t.dropdownMenuComponent.props.radixNote}{' '}
                <a
                  href="https://www.radix-ui.com/docs/primitives/components/dropdown-menu"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.dropdownMenuComponent.props.radixDocs}
                </a>
                .
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.dropdownMenuComponent.accessibility.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t.dropdownMenuComponent.accessibility.keyboard}</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li className="flex items-start gap-2">
                    <code className="bg-muted px-1.5 py-0.5 rounded">Space</code>
                    <span>{t.dropdownMenuComponent.accessibility.space}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <code className="bg-muted px-1.5 py-0.5 rounded">Enter</code>
                    <span>{t.dropdownMenuComponent.accessibility.enter}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <code className="bg-muted px-1.5 py-0.5 rounded">↓</code>
                    <span>{t.dropdownMenuComponent.accessibility.arrowDown}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <code className="bg-muted px-1.5 py-0.5 rounded">↑</code>
                    <span>{t.dropdownMenuComponent.accessibility.arrowUp}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <code className="bg-muted px-1.5 py-0.5 rounded">→</code>
                    <span>{t.dropdownMenuComponent.accessibility.arrowRight}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <code className="bg-muted px-1.5 py-0.5 rounded">←</code>
                    <span>{t.dropdownMenuComponent.accessibility.arrowLeft}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <code className="bg-muted px-1.5 py-0.5 rounded">Esc</code>
                    <span>{t.dropdownMenuComponent.accessibility.escape}</span>
                  </li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.dropdownMenuComponent.accessibility.aria}</h3>
                <p className="text-muted-foreground text-sm">
                  {t.dropdownMenuComponent.accessibility.ariaDescription}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.dropdownMenuComponent.accessibility.focus}</h3>
                <p className="text-muted-foreground text-sm">
                  {t.dropdownMenuComponent.accessibility.focusDescription}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Considerations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.dropdownMenuComponent.rtl.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                {t.dropdownMenuComponent.rtl.description}
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">LTR (English)</h4>
                  <div dir="ltr" className="flex justify-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">Account</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <User className="me-2 h-4 w-4" />
                          <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="me-2 h-4 w-4" />
                          <span>Settings</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">RTL (العربية)</h4>
                  <div dir="rtl" className="flex justify-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">الحساب</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>حسابي</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <User className="me-2 h-4 w-4" />
                          <span>الملف الشخصي</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="me-2 h-4 w-4" />
                          <span>الإعدادات</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
            <Link href="/components/button">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Button</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Common trigger for dropdown menus
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/popover">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Popover</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Alternative for richer content
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/checkbox">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Checkbox</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Used in checkbox menu items
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
