'use client'

import * as React from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  ResponsiveTable,
} from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const getTableProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.tableComponent.props.className,
  },
]

const getTableHeaderProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.tableComponent.props.tableHeader,
  },
]

const getTableBodyProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.tableComponent.props.tableBody,
  },
]

const getTableRowProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.tableComponent.props.tableRow,
  },
]

const getTableHeadProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.tableComponent.props.tableHead,
  },
]

const getTableCellProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.tableComponent.props.tableCell,
  },
]

const getTableCaptionProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.tableComponent.props.tableCaption,
  },
]

const installCode = `npm install noorui-rtl`

const basicUsageCode = `import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Ahmed Ali</TableCell>
      <TableCell>Active</TableCell>
      <TableCell>ahmed@example.com</TableCell>
    </TableRow>
  </TableBody>
</Table>`

const withCaptionCode = `<Table>
  <TableCaption>A list of your recent transactions</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV-001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`

const interactiveTableCode = `const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())

<Table>
  <TableHeader>
    <TableRow>
      <TableHead className="w-12">
        <Checkbox />
      </TableHead>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Role</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {users.map((user) => (
      <TableRow key={user.id}>
        <TableCell>
          <Checkbox />
        </TableCell>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.role}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`

const rtlCode = `// RTL support is automatic!
// Text alignment uses 'text-start' for proper RTL display

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>الاسم</TableHead>
      <TableHead>الحالة</TableHead>
      <TableHead>البريد الإلكتروني</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>أحمد علي</TableCell>
      <TableCell>نشط</TableCell>
      <TableCell>ahmed@example.com</TableCell>
    </TableRow>
  </TableBody>
</Table>`

export default function TablePage() {
  const { locale } = useDirection()
  const t = content[locale]

  const users = [
    { id: '1', name: t.tableComponent.demoContent.sampleData.ahmed, email: t.tableComponent.demoContent.emails.ahmed, status: t.tableComponent.demoContent.statuses.active, role: t.tableComponent.demoContent.roles.admin },
    { id: '2', name: t.tableComponent.demoContent.sampleData.fatima, email: t.tableComponent.demoContent.emails.fatima, status: t.tableComponent.demoContent.statuses.active, role: t.tableComponent.demoContent.roles.user },
    { id: '3', name: t.tableComponent.demoContent.sampleData.mohammed, email: t.tableComponent.demoContent.emails.mohammed, status: t.tableComponent.demoContent.statuses.inactive, role: t.tableComponent.demoContent.roles.user },
    { id: '4', name: t.tableComponent.demoContent.sampleData.sarah, email: t.tableComponent.demoContent.emails.sarah, status: t.tableComponent.demoContent.statuses.active, role: t.tableComponent.demoContent.roles.editor },
  ]

  const tableProps = getTableProps(t)
  const tableHeaderProps = getTableHeaderProps(t)
  const tableBodyProps = getTableBodyProps(t)
  const tableRowProps = getTableRowProps(t)
  const tableHeadProps = getTableHeadProps(t)
  const tableCellProps = getTableCellProps(t)
  const tableCaptionProps = getTableCaptionProps(t)

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
            <li className="text-foreground font-medium">{t.tableComponent.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.tableComponent.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.tableComponent.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.tableComponent.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="w-full">
                <Table>
                  <TableCaption>{t.tableComponent.demoContent.caption}</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t.tableComponent.demoContent.headers.name}</TableHead>
                      <TableHead>{t.tableComponent.demoContent.headers.email}</TableHead>
                      <TableHead>{t.tableComponent.demoContent.headers.status}</TableHead>
                      <TableHead>{t.tableComponent.demoContent.headers.role}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === t.tableComponent.demoContent.statuses.active ? 'default' : 'secondary'}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.role}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.tableComponent.installation}</h2>
          <CodeBlock code={installCode} language="bash" title="Terminal" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.tableComponent.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Composition Pattern */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.tableComponent.compositionPattern.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                {t.tableComponent.compositionPattern.description}
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="flex items-center gap-2">
                    <code className="bg-muted px-1 rounded">Table</code> - Main wrapper with overflow handling
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="flex items-center gap-2">
                    <code className="bg-muted px-1 rounded">TableHeader</code> - thead element for column headers
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="flex items-center gap-2">
                    <code className="bg-muted px-1 rounded">TableBody</code> - tbody element for data rows
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="flex items-center gap-2">
                    <code className="bg-muted px-1 rounded">TableFooter</code> - tfoot element for summary rows
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="flex items-center gap-2">
                    <code className="bg-muted px-1 rounded">TableRow</code> - tr element with hover effects
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="flex items-center gap-2">
                    <code className="bg-muted px-1 rounded">TableHead</code> - th element with text-start for RTL
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="flex items-center gap-2">
                    <code className="bg-muted px-1 rounded">TableCell</code> - td element for data cells
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="flex items-center gap-2">
                    <code className="bg-muted px-1 rounded">TableCaption</code> - caption element for table description
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.tableComponent.examples.title}</h2>

          <div className="space-y-8">
            {/* With Caption */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.tableComponent.examples.withCaption}</h3>
              <Card>
                <CardContent className="p-6">
                  <Table>
                    <TableCaption>{t.tableComponent.demoContent.captionTransactions}</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t.tableComponent.demoContent.headers.invoice}</TableHead>
                        <TableHead>{t.tableComponent.demoContent.headers.status}</TableHead>
                        <TableHead>{t.tableComponent.demoContent.headers.method}</TableHead>
                        <TableHead>{t.tableComponent.demoContent.headers.amount}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>{t.tableComponent.demoContent.invoices.inv001}</TableCell>
                        <TableCell><Badge>{t.tableComponent.demoContent.statuses.paid}</Badge></TableCell>
                        <TableCell>{t.tableComponent.demoContent.paymentMethods.creditCard}</TableCell>
                        <TableCell>{t.tableComponent.demoContent.amounts.amount250}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>{t.tableComponent.demoContent.invoices.inv002}</TableCell>
                        <TableCell><Badge variant="secondary">{t.tableComponent.demoContent.statuses.pending}</Badge></TableCell>
                        <TableCell>{t.tableComponent.demoContent.paymentMethods.paypal}</TableCell>
                        <TableCell>{t.tableComponent.demoContent.amounts.amount150}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>{t.tableComponent.demoContent.invoices.inv003}</TableCell>
                        <TableCell><Badge>{t.tableComponent.demoContent.statuses.paid}</Badge></TableCell>
                        <TableCell>{t.tableComponent.demoContent.paymentMethods.bankTransfer}</TableCell>
                        <TableCell>{t.tableComponent.demoContent.amounts.amount350}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withCaptionCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Interactive Table */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Interactive Table with Checkboxes</h3>
              <Card>
                <CardContent className="p-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <Checkbox />
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{user.role}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={interactiveTableCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Mobile Responsive Table */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Mobile Responsive Table</h3>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    This table adapts to mobile screens by showing a 2-column layout (label + value) instead of horizontal scrolling. Resize your browser to see it in action.
                  </p>
                  <ResponsiveTable headers={['Name', 'Email', 'Status', 'Role']}>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.role}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </ResponsiveTable>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock
                  code={`import { ResponsiveTable, TableBody, TableRow, TableCell } from '@/components/ui/table'

<ResponsiveTable headers={['Name', 'Email', 'Status', 'Role']}>
  <TableBody>
    {users.map((user) => (
      <TableRow key={user.id}>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell><Badge>{user.status}</Badge></TableCell>
        <TableCell>{user.role}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</ResponsiveTable>

// On mobile: Shows as stacked cards with labels
// On desktop: Shows as normal table`}
                  language="tsx"
                  collapsible
                />
              </div>
            </div>
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.tableComponent.props.title}</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Table</h3>
              <PropsTable props={tableProps} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">TableHeader</h3>
              <PropsTable props={tableHeaderProps} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">TableBody</h3>
              <PropsTable props={tableBodyProps} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">TableRow</h3>
              <PropsTable props={tableRowProps} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">TableHead</h3>
              <PropsTable props={tableHeadProps} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">TableCell</h3>
              <PropsTable props={tableCellProps} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">TableCaption</h3>
              <PropsTable props={tableCaptionProps} />
            </div>
          </div>
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.tableComponent.accessibility.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t.tableComponent.accessibility.semanticHTML}</h3>
                <p className="text-muted-foreground">
                  {t.tableComponent.accessibility.semanticHTMLDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.tableComponent.accessibility.tableCaption}</h3>
                <p className="text-muted-foreground">
                  {t.tableComponent.accessibility.tableCaptionDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.tableComponent.accessibility.columnHeaders}</h3>
                <p className="text-muted-foreground">
                  {t.tableComponent.accessibility.columnHeadersDesc}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.tableComponent.accessibility.keyboardNavigation}</h3>
                <p className="text-muted-foreground">
                  {t.tableComponent.accessibility.keyboardNavigationDesc}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Considerations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.tableComponent.rtl.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                {t.tableComponent.rtl.description}
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{t.tableComponent.rtl.ltr}</h4>
                  <div dir="ltr">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{content.en.tableComponent.demoContent.headers.name}</TableHead>
                          <TableHead>{content.en.tableComponent.demoContent.headers.status}</TableHead>
                          <TableHead>{content.en.tableComponent.demoContent.headers.email}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>{content.en.tableComponent.demoContent.sampleData.ahmed}</TableCell>
                          <TableCell><Badge variant="outline">{content.en.tableComponent.demoContent.statuses.active}</Badge></TableCell>
                          <TableCell>{content.en.tableComponent.demoContent.emails.ahmed}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{t.tableComponent.rtl.rtlLabel}</h4>
                  <div dir="rtl">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{content.ar.tableComponent.demoContent.headers.name}</TableHead>
                          <TableHead>{content.ar.tableComponent.demoContent.headers.status}</TableHead>
                          <TableHead>{content.ar.tableComponent.demoContent.headers.email}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>{content.ar.tableComponent.demoContent.sampleData.ahmed}</TableCell>
                          <TableCell><Badge variant="outline">{content.ar.tableComponent.demoContent.statuses.active}</Badge></TableCell>
                          <TableCell>{content.ar.tableComponent.demoContent.emails.ahmed}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.tableComponent.related.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/checkbox">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.tableComponent.related.checkbox}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.tableComponent.related.checkboxDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/badge">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.tableComponent.related.badge}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.tableComponent.related.badgeDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/pagination">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.tableComponent.related.pagination}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.tableComponent.related.paginationDesc}
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
