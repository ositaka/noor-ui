'use client'

import * as React from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { DataTable, type ColumnDef, type SortDirection } from '@/components/ui/data-table'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Sparkles } from 'lucide-react'

const dataTableProps: PropDefinition[] = [
  {
    name: 'data',
    type: 'T[]',
    default: '-',
    required: true,
    description: 'Array of data to display in the table',
  },
  {
    name: 'columns',
    type: 'ColumnDef<T>[]',
    default: '-',
    required: true,
    description: 'Column definitions including headers, accessors, and cell renderers',
  },
  {
    name: 'isLoading',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Show skeleton loading state',
  },
  {
    name: 'sortBy',
    type: 'string',
    default: 'undefined',
    required: false,
    description: 'Currently sorted column ID',
  },
  {
    name: 'sortDirection',
    type: "'asc' | 'desc' | null",
    default: 'null',
    required: false,
    description: 'Current sort direction',
  },
  {
    name: 'onSort',
    type: '(columnId: string) => void',
    default: 'undefined',
    required: false,
    description: 'Callback when column header is clicked for sorting',
  },
  {
    name: 'searchable',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Enable search input above table',
  },
  {
    name: 'searchPlaceholder',
    type: 'string',
    default: "'Search...'",
    required: false,
    description: 'Placeholder text for search input (English)',
  },
  {
    name: 'searchValue',
    type: 'string',
    default: "''",
    required: false,
    description: 'Controlled search value',
  },
  {
    name: 'onSearchChange',
    type: '(value: string) => void',
    default: 'undefined',
    required: false,
    description: 'Callback when search value changes',
  },
  {
    name: 'pagination',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Enable pagination controls',
  },
  {
    name: 'currentPage',
    type: 'number',
    default: '1',
    required: false,
    description: 'Current page number',
  },
  {
    name: 'totalPages',
    type: 'number',
    default: '1',
    required: false,
    description: 'Total number of pages',
  },
  {
    name: 'pageSize',
    type: 'number',
    default: '10',
    required: false,
    description: 'Number of rows per page',
  },
  {
    name: 'onPageChange',
    type: '(page: number) => void',
    default: 'undefined',
    required: false,
    description: 'Callback when page changes',
  },
  {
    name: 'mobileView',
    type: "'table' | 'cards'",
    default: "'cards'",
    required: false,
    description: 'Mobile view type: stacked cards or horizontal scroll table',
  },
  {
    name: 'emptyMessage',
    type: 'string',
    default: "'No results found'",
    required: false,
    description: 'Message to show when no data',
  },
  {
    name: 'striped',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Alternate row background colors',
  },
  {
    name: 'hoverable',
    type: 'boolean',
    default: 'true',
    required: false,
    description: 'Show hover effect on rows',
  },
  {
    name: 'compact',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Reduced padding for denser layout',
  },
]

const columnDefProps: PropDefinition[] = [
  {
    name: 'id',
    type: 'string',
    default: '-',
    required: true,
    description: 'Unique column identifier',
  },
  {
    name: 'header',
    type: 'string',
    default: '-',
    required: true,
    description: 'Column header text (English)',
  },
  {
    name: 'headerAr',
    type: 'string',
    default: 'undefined',
    required: false,
    description: 'Column header text (Arabic)',
  },
  {
    name: 'accessorKey',
    type: 'keyof T',
    default: '-',
    required: true,
    description: 'Key in data object to access for this column',
  },
  {
    name: 'cell',
    type: '(row: T) => React.ReactNode',
    default: 'undefined',
    required: false,
    description: 'Custom cell renderer function',
  },
  {
    name: 'sortable',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Enable sorting for this column',
  },
  {
    name: 'align',
    type: "'start' | 'center' | 'end'",
    default: "'start'",
    required: false,
    description: 'Text alignment in cells',
  },
  {
    name: 'width',
    type: 'string',
    default: 'undefined',
    required: false,
    description: 'Column width (CSS value)',
  },
]

const installCode = `npm install @noorui/components`

const basicUsageCode = `import { DataTable, type ColumnDef } from '@/components/ui/data-table'

interface User {
  id: string
  name: string
  email: string
  role: string
}

const columns: ColumnDef<User>[] = [
  {
    id: 'name',
    header: 'Name',
    accessorKey: 'name',
  },
  {
    id: 'email',
    header: 'Email',
    accessorKey: 'email',
  },
  {
    id: 'role',
    header: 'Role',
    accessorKey: 'role',
  },
]

const users: User[] = [
  { id: '1', name: 'Ahmed Ali', email: 'ahmed@example.com', role: 'Admin' },
  { id: '2', name: 'Fatima Hassan', email: 'fatima@example.com', role: 'User' },
]

<DataTable data={users} columns={columns} />`

const sortableCode = `const [sortBy, setSortBy] = useState<string | undefined>()
const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null)

const columns: ColumnDef<User>[] = [
  {
    id: 'name',
    header: 'Name',
    accessorKey: 'name',
    sortable: true, // Enable sorting
  },
  {
    id: 'email',
    header: 'Email',
    accessorKey: 'email',
    sortable: true,
  },
  {
    id: 'role',
    header: 'Role',
    accessorKey: 'role',
    sortable: true,
  },
]

const handleSort = (columnId: string) => {
  if (sortBy === columnId) {
    // Cycle through: asc -> desc -> null
    setSortDirection(prev =>
      prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc'
    )
  } else {
    setSortBy(columnId)
    setSortDirection('asc')
  }
}

<DataTable
  data={sortedUsers}
  columns={columns}
  sortBy={sortBy}
  sortDirection={sortDirection}
  onSort={handleSort}
/>`

const searchableCode = `const [searchValue, setSearchValue] = useState('')

// Filter data based on search
const filteredUsers = users.filter(user =>
  user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
  user.email.toLowerCase().includes(searchValue.toLowerCase())
)

<DataTable
  data={filteredUsers}
  columns={columns}
  searchable
  searchPlaceholder="Search users..."
  searchValue={searchValue}
  onSearchChange={setSearchValue}
/>`

const paginatedCode = `const [currentPage, setCurrentPage] = useState(1)
const pageSize = 10
const totalPages = Math.ceil(users.length / pageSize)

// Get current page data
const paginatedData = users.slice(
  (currentPage - 1) * pageSize,
  currentPage * pageSize
)

<DataTable
  data={paginatedData}
  columns={columns}
  pagination
  currentPage={currentPage}
  totalPages={totalPages}
  pageSize={pageSize}
  onPageChange={setCurrentPage}
/>`

const customCellCode = `const columns: ColumnDef<User>[] = [
  {
    id: 'name',
    header: 'Name',
    accessorKey: 'name',
    cell: (row) => (
      <div className="font-medium">{row.name}</div>
    ),
  },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'Active' ? 'default' : 'secondary'}>
        {row.status}
      </Badge>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    accessorKey: 'id',
    cell: (row) => (
      <div className="flex gap-2">
        <Button size="sm" variant="outline">Edit</Button>
        <Button size="sm" variant="destructive">Delete</Button>
      </div>
    ),
  },
]`

interface User {
  id: string
  name: string
  email: string
  status: string
  role: string
  joinDate: string
  nameAr?: string
}

const sampleUsers: User[] = [
  {
    id: '1',
    name: 'Ahmed Ali',
    nameAr: 'أحمد علي',
    email: 'ahmed@example.com',
    status: 'Active',
    role: 'Admin',
    joinDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'Fatima Hassan',
    nameAr: 'فاطمة حسن',
    email: 'fatima@example.com',
    status: 'Active',
    role: 'Editor',
    joinDate: '2024-02-20'
  },
  {
    id: '3',
    name: 'Mohammed Youssef',
    nameAr: 'محمد يوسف',
    email: 'mohammed@example.com',
    status: 'Inactive',
    role: 'User',
    joinDate: '2024-03-10'
  },
  {
    id: '4',
    name: 'Sarah Abdullah',
    nameAr: 'سارة عبدالله',
    email: 'sarah@example.com',
    status: 'Active',
    role: 'Editor',
    joinDate: '2024-03-25'
  },
  {
    id: '5',
    name: 'Omar Ibrahim',
    nameAr: 'عمر إبراهيم',
    email: 'omar@example.com',
    status: 'Active',
    role: 'User',
    joinDate: '2024-04-05'
  },
]

export default function DataTablePage() {
  // Basic example state
  const [basicColumns] = React.useState<ColumnDef<User>[]>([
    { id: 'name', header: 'Name', headerAr: 'الاسم', accessorKey: 'name' },
    { id: 'email', header: 'Email', headerAr: 'البريد', accessorKey: 'email' },
    { id: 'role', header: 'Role', headerAr: 'الدور', accessorKey: 'role' },
  ])

  // Sortable example state
  const [sortBy, setSortBy] = React.useState<string>()
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(null)

  const sortableColumns: ColumnDef<User>[] = [
    { id: 'name', header: 'Name', accessorKey: 'name', sortable: true },
    { id: 'email', header: 'Email', accessorKey: 'email', sortable: true },
    { id: 'role', header: 'Role', accessorKey: 'role', sortable: true },
    { id: 'joinDate', header: 'Join Date', accessorKey: 'joinDate', sortable: true },
  ]

  const handleSort = (columnId: string) => {
    if (sortBy === columnId) {
      if (sortDirection === 'asc') {
        setSortDirection('desc')
      } else if (sortDirection === 'desc') {
        setSortBy(undefined)
        setSortDirection(null)
      }
    } else {
      setSortBy(columnId)
      setSortDirection('asc')
    }
  }

  const sortedUsers = React.useMemo(() => {
    if (!sortBy || !sortDirection) return sampleUsers

    return [...sampleUsers].sort((a, b) => {
      const aValue = String(a[sortBy as keyof User] || '')
      const bValue = String(b[sortBy as keyof User] || '')

      if (sortDirection === 'asc') {
        return aValue.localeCompare(bValue)
      } else {
        return bValue.localeCompare(aValue)
      }
    })
  }, [sortBy, sortDirection])

  // Searchable example state
  const [searchValue, setSearchValue] = React.useState('')

  const filteredUsers = React.useMemo(() => {
    if (!searchValue) return sampleUsers

    return sampleUsers.filter(user =>
      user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.role.toLowerCase().includes(searchValue.toLowerCase())
    )
  }, [searchValue])

  // Paginated example state
  const [currentPage, setCurrentPage] = React.useState(1)
  const pageSize = 3
  const totalPages = Math.ceil(sampleUsers.length / pageSize)

  // Custom cells example
  const customColumns: ColumnDef<User>[] = [
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
      cell: (row) => <div className="font-medium">{row.name}</div>,
    },
    {
      id: 'email',
      header: 'Email',
      accessorKey: 'email',
      cell: (row) => <div className="text-muted-foreground">{row.email}</div>,
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => (
        <Badge variant={row.status === 'Active' ? 'default' : 'secondary'}>
          {row.status}
        </Badge>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      accessorKey: 'id',
      align: 'end',
      cell: (row) => (
        <div className="flex gap-2 justify-end">
          <Button size="sm" variant="outline">View</Button>
          <Button size="sm" variant="ghost">Edit</Button>
        </div>
      ),
    },
  ]

  // Loading state
  const [isLoading, setIsLoading] = React.useState(false)

  const toggleLoading = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

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
            <li className="text-foreground font-medium">DataTable</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold tracking-tight">DataTable</h1>
            <Badge variant="outline" className="gap-1">
              <Sparkles className="h-3 w-3" />
              Enhanced
            </Badge>
          </div>
          <p className="text-xl text-muted-foreground">
            A powerful, feature-rich data table with sorting, filtering, pagination, and mobile responsiveness.
            Perfect for displaying complex datasets with full RTL support.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Preview</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <DataTable
                data={sampleUsers}
                columns={basicColumns}
                hoverable
              />
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">Basic Usage</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Features</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Sortable Columns</h3>
                <p className="text-sm text-muted-foreground">
                  Click column headers to sort with RTL-aware indicators
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Search & Filter</h3>
                <p className="text-sm text-muted-foreground">
                  Built-in search with clear button and custom filtering
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Pagination</h3>
                <p className="text-sm text-muted-foreground">
                  Integrated pagination for large datasets
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Loading States</h3>
                <p className="text-sm text-muted-foreground">
                  Skeleton loading animation while fetching data
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Mobile Responsive</h3>
                <p className="text-sm text-muted-foreground">
                  Cards or horizontal scroll view on small screens
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Custom Cells</h3>
                <p className="text-sm text-muted-foreground">
                  Render custom components in any cell
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Examples</h2>

          <div className="space-y-12">
            {/* Sortable */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Sortable Columns</h3>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Click any column header to sort. Click again to reverse, and once more to clear sorting.
                  </p>
                  <DataTable
                    data={sortedUsers}
                    columns={sortableColumns}
                    sortBy={sortBy}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                  />
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={sortableCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Searchable */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Searchable Table</h3>
              <Card>
                <CardContent className="p-6">
                  <DataTable
                    data={filteredUsers}
                    columns={basicColumns}
                    searchable
                    searchPlaceholder="Search by name, email, or role..."
                    searchValue={searchValue}
                    onSearchChange={setSearchValue}
                    emptyMessage="No users found matching your search"
                  />
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={searchableCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Paginated */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Paginated Table</h3>
              <Card>
                <CardContent className="p-6">
                  <DataTable
                    data={sampleUsers}
                    columns={basicColumns}
                    pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    pageSize={pageSize}
                    onPageChange={setCurrentPage}
                  />
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={paginatedCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Custom Cells */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Custom Cell Rendering</h3>
              <Card>
                <CardContent className="p-6">
                  <DataTable
                    data={sampleUsers}
                    columns={customColumns}
                  />
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={customCellCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Loading State */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Loading State</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Button onClick={toggleLoading} disabled={isLoading}>
                      {isLoading ? 'Loading...' : 'Trigger Loading State'}
                    </Button>
                  </div>
                  <DataTable
                    data={sampleUsers}
                    columns={basicColumns}
                    isLoading={isLoading}
                  />
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock
                  code={`const [isLoading, setIsLoading] = useState(true)

// Simulate data fetch
useEffect(() => {
  setTimeout(() => setIsLoading(false), 2000)
}, [])

<DataTable
  data={users}
  columns={columns}
  isLoading={isLoading}
/>`}
                  language="tsx"
                  collapsible
                />
              </div>
            </div>

            {/* Complete Example */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Complete Example</h3>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    All features combined: sorting, searching, pagination, and custom cells.
                  </p>
                  <DataTable
                    data={filteredUsers}
                    columns={sortableColumns}
                    searchable
                    searchPlaceholder="Search users..."
                    searchValue={searchValue}
                    onSearchChange={setSearchValue}
                    sortBy={sortBy}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                    pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(filteredUsers.length / pageSize)}
                    pageSize={pageSize}
                    onPageChange={setCurrentPage}
                    striped
                  />
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
              <h3 className="text-lg font-semibold mb-4">DataTable Props</h3>
              <PropsTable props={dataTableProps} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">ColumnDef Props</h3>
              <PropsTable props={columnDefProps} />
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
                  Built on top of the semantic Table component with proper thead, tbody, th, and td elements.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Keyboard Navigation</h3>
                <p className="text-muted-foreground">
                  Sortable column headers are buttons that can be activated with Enter or Space keys.
                  Search input is fully keyboard accessible.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Screen Readers</h3>
                <p className="text-muted-foreground">
                  Sort indicators provide visual feedback, and the table structure is properly announced
                  to screen readers with column headers associated to their cells.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Loading States</h3>
                <p className="text-muted-foreground">
                  Skeleton loading states provide visual feedback while maintaining layout stability.
                  Interactive elements are disabled during loading.
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
              <div>
                <h3 className="font-semibold mb-2">Automatic RTL Support</h3>
                <p className="text-muted-foreground">
                  DataTable inherits RTL support from the base Table component. Sort indicators,
                  search input, and all spacing use logical properties for proper RTL layout.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Sort Indicators</h3>
                <p className="text-muted-foreground">
                  Chevron icons automatically position correctly in both LTR and RTL contexts.
                  The sorting button layout adapts to text direction.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Search Input</h3>
                <p className="text-muted-foreground">
                  Search icon and clear button position correctly using margin-inline-start (ms-) and
                  margin-inline-end (me-) utilities, ensuring proper placement in both directions.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Mobile Cards</h3>
                <p className="text-muted-foreground">
                  On mobile, the cards view uses a grid layout that automatically adapts to RTL,
                  with labels on the start side and values on the end side.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Related Components</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/table">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Table</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Base table component
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/pagination">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Pagination</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Page navigation control
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/skeleton">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Skeleton</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Loading placeholder
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/input">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Input</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Used for search functionality
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/badge">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Badge</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Status indicators
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/button">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Button</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Sort headers and actions
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
