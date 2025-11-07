import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Table | RTL Design System',
  description: 'Semantic HTML table component with header, body, footer, and caption. Responsive design with RTL text alignment.',
  keywords: ['table', 'data table', 'grid', 'rows', 'columns', 'rtl', 'react', 'nextjs', 'accessibility'],
}

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

const tableProps: PropDefinition[] = [
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: 'Additional CSS classes to apply to the table',
  },
]

const tableHeaderProps: PropDefinition[] = [
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: 'Additional CSS classes to apply to thead',
  },
]

const tableBodyProps: PropDefinition[] = [
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: 'Additional CSS classes to apply to tbody',
  },
]

const tableRowProps: PropDefinition[] = [
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: 'Additional CSS classes to apply to tr',
  },
]

const tableHeadProps: PropDefinition[] = [
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: 'Additional CSS classes to apply to th (uses text-start for RTL support)',
  },
]

const tableCellProps: PropDefinition[] = [
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: 'Additional CSS classes to apply to td',
  },
]

const tableCaptionProps: PropDefinition[] = [
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    required: false,
    description: 'Additional CSS classes to apply to caption',
  },
]

const installCode = `npm install @rtl-design-system/core`

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

const users = [
  { id: '1', name: 'Ahmed Ali', email: 'ahmed@example.com', status: 'Active', role: 'Admin' },
  { id: '2', name: 'Fatima Hassan', email: 'fatima@example.com', status: 'Active', role: 'User' },
  { id: '3', name: 'Mohammed Youssef', email: 'mohammed@example.com', status: 'Inactive', role: 'User' },
  { id: '4', name: 'Sarah Abdullah', email: 'sarah@example.com', status: 'Active', role: 'Editor' },
]

export default function TablePage() {
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
            <li className="text-foreground font-medium">Table</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Table</h1>
          <p className="text-xl text-muted-foreground">
            A responsive table component for displaying structured data with full RTL support.
            Uses semantic HTML with proper text alignment for bidirectional content.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Preview</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="w-full">
                <Table>
                  <TableCaption>A list of recent users</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Role</TableHead>
                    </TableRow>
                  </TableHeader>
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
                </Table>
              </div>
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

        {/* Composition Pattern */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Composition Pattern</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                The Table component follows a composition pattern with seven sub-components:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <code className="bg-muted px-1 rounded">Table</code> - Main wrapper with overflow handling
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <code className="bg-muted px-1 rounded">TableHeader</code> - thead element for column headers
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <code className="bg-muted px-1 rounded">TableBody</code> - tbody element for data rows
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <code className="bg-muted px-1 rounded">TableFooter</code> - tfoot element for summary rows
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <code className="bg-muted px-1 rounded">TableRow</code> - tr element with hover effects
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <code className="bg-muted px-1 rounded">TableHead</code> - th element with text-start for RTL
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <code className="bg-muted px-1 rounded">TableCell</code> - td element for data cells
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <code className="bg-muted px-1 rounded">TableCaption</code> - caption element for table description
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Examples</h2>

          <div className="space-y-8">
            {/* With Caption */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Table with Caption</h3>
              <Card>
                <CardContent className="p-6">
                  <Table>
                    <TableCaption>A list of your recent transactions</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>INV-001</TableCell>
                        <TableCell><Badge>Paid</Badge></TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell>$250.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>INV-002</TableCell>
                        <TableCell><Badge variant="secondary">Pending</Badge></TableCell>
                        <TableCell>PayPal</TableCell>
                        <TableCell>$150.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>INV-003</TableCell>
                        <TableCell><Badge>Paid</Badge></TableCell>
                        <TableCell>Bank Transfer</TableCell>
                        <TableCell>$350.00</TableCell>
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">Props</h2>

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
          <h2 className="text-2xl font-bold tracking-tight mb-6">Accessibility</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Semantic HTML</h3>
                <p className="text-muted-foreground">
                  Uses proper semantic table elements (table, thead, tbody, tfoot, th, td) for
                  screen reader compatibility and accessibility.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Table Caption</h3>
                <p className="text-muted-foreground">
                  Always include a TableCaption to describe the table&apos;s purpose for screen reader users.
                  The caption can be visually hidden if needed while remaining accessible.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Column Headers</h3>
                <p className="text-muted-foreground">
                  TableHead components render as th elements, which are automatically associated with
                  their column&apos;s cells by assistive technologies.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Keyboard Navigation</h3>
                <p className="text-muted-foreground">
                  For interactive tables, ensure all interactive elements (buttons, checkboxes) are
                  keyboard accessible with proper tab order and focus indicators.
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
                Tables automatically support RTL layout with proper text alignment. The TableHead
                component uses <code className="bg-muted px-1 rounded">text-start</code> to ensure
                headers align correctly in both LTR and RTL contexts.
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">LTR (English)</h4>
                  <div dir="ltr">
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
                          <TableCell><Badge variant="outline">Active</Badge></TableCell>
                          <TableCell>ahmed@example.com</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">RTL (العربية)</h4>
                  <div dir="rtl">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>الاسم</TableHead>
                          <TableHead>الحالة</TableHead>
                          <TableHead>البريد</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>أحمد علي</TableCell>
                          <TableCell><Badge variant="outline">نشط</Badge></TableCell>
                          <TableCell>ahmed@example.com</TableCell>
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">Related Components</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/checkbox">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Checkbox</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Row selection in tables
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/badge">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Badge</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Status indicators in cells
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/pagination">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Pagination</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Navigate large datasets
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
