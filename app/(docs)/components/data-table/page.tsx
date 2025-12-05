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
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

interface User {
  id: string
  name: string
  email: string
  status: string
  role: string
  joinDate: string
}

// Move prop definitions inside component to access translations
export default function DataTablePage() {
  const { locale } = useDirection()
  const t = content[locale]

  const dataTableProps: PropDefinition[] = [
  {
    name: 'data',
    type: 'T[]',
    default: '-',
    required: true,
    description: t.dataTableComponent.propDescriptions.dataTable.data,
  },
  {
    name: 'columns',
    type: 'ColumnDef<T>[]',
    default: '-',
    required: true,
    description: t.dataTableComponent.propDescriptions.dataTable.columns,
  },
  {
    name: 'isLoading',
    type: 'boolean',
    default: 'false',
    required: false,
    description: t.dataTableComponent.propDescriptions.dataTable.isLoading,
  },
  {
    name: 'sortBy',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.dataTableComponent.propDescriptions.dataTable.sortBy,
  },
  {
    name: 'sortDirection',
    type: "'asc' | 'desc' | null",
    default: 'null',
    required: false,
    description: t.dataTableComponent.propDescriptions.dataTable.sortDirection,
  },
  {
    name: 'onSort',
    type: '(columnId: string) => void',
    default: 'undefined',
    required: false,
    description: t.dataTableComponent.propDescriptions.dataTable.onSort,
  },
  {
    name: 'enableSorting',
    type: 'boolean',
    default: 'false',
    required: false,
    description: t.dataTableComponent.propDescriptions.dataTable.enableSorting,
  },
  {
    name: 'defaultSortBy',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.dataTableComponent.propDescriptions.dataTable.defaultSortBy,
  },
  {
    name: 'defaultSortDirection',
    type: "'asc' | 'desc' | null",
    default: "'asc'",
    required: false,
    description: t.dataTableComponent.propDescriptions.dataTable.defaultSortDirection,
  },
  {
    name: 'searchable',
    type: 'boolean',
    default: 'false',
    required: false,
    description: t.dataTableComponent.propDescriptions.dataTable.searchable,
  },
  {
    name: 'searchPlaceholder',
    type: 'string',
    default: "'Search...'",
    required: false,
    description: t.dataTableComponent.propDescriptions.dataTable.searchPlaceholder,
  },
  {
    name: 'searchValue',
    type: 'string',
    default: "''",
    required: false,
    description: t.dataTableComponent.propDescriptions.dataTable.searchValue,
  },
  {
    name: 'onSearchChange',
    type: '(value: string) => void',
    default: 'undefined',
    required: false,
    description: t.dataTableComponent.propDescriptions.dataTable.onSearchChange,
  },
  {
    name: 'pagination',
    type: 'boolean',
    default: 'false',
    required: false,
    description: t.dataTableComponent.propDescriptions.dataTable.pagination,
  },
  {
    name: 'currentPage',
    type: 'number',
    default: '1',
    required: false,
    description: t.dataTableComponent.propDescriptions.dataTable.currentPage,
  },
  {
    name: 'totalPages',
    type: 'number',
    default: '1',
    required: false,
    description: t.dataTableComponent.propDescriptions.dataTable.totalPages,
  },
  {
    name: 'pageSize',
    type: 'number',
    default: '10',
    required: false,
    description: t.dataTableComponent.propDescriptions.dataTable.pageSize,
  },
  {
    name: 'onPageChange',
    type: '(page: number) => void',
    default: 'undefined',
    required: false,
    description: t.dataTableComponent.propDescriptions.dataTable.onPageChange,
  },
  {
    name: 'mobileView',
    type: "'table' | 'cards'",
    default: "'cards'",
    required: false,
    description: t.dataTableComponent.propDescriptions.dataTable.mobileView,
  },
  {
    name: 'mobileSorting',
    type: 'boolean',
    default: 'true',
    required: false,
    description: t.dataTableComponent.propDescriptions.dataTable.mobileSorting,
  },
  {
    name: 'emptyMessage',
    type: 'string',
    default: "'No results found'",
    required: false,
    description: t.dataTableComponent.propDescriptions.dataTable.emptyMessage,
  },
  {
    name: 'striped',
    type: 'boolean',
    default: 'false',
    required: false,
    description: t.dataTableComponent.propDescriptions.dataTable.striped,
  },
  {
    name: 'hoverable',
    type: 'boolean',
    default: 'true',
    required: false,
    description: t.dataTableComponent.propDescriptions.dataTable.hoverable,
  },
  {
    name: 'compact',
    type: 'boolean',
    default: 'false',
    required: false,
    description: t.dataTableComponent.propDescriptions.dataTable.compact,
  },
]

const columnDefProps: PropDefinition[] = [
  {
    name: 'id',
    type: 'string',
    default: '-',
    required: true,
    description: t.dataTableComponent.propDescriptions.columnDef.id,
  },
  {
    name: 'header',
    type: 'string',
    default: '-',
    required: true,
    description: t.dataTableComponent.propDescriptions.columnDef.header,
  },
  {
    name: 'headerAr',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.dataTableComponent.propDescriptions.columnDef.headerAr,
  },
  {
    name: 'accessorKey',
    type: 'keyof T',
    default: '-',
    required: true,
    description: t.dataTableComponent.propDescriptions.columnDef.accessorKey,
  },
  {
    name: 'cell',
    type: '(row: T) => React.ReactNode',
    default: 'undefined',
    required: false,
    description: t.dataTableComponent.propDescriptions.columnDef.cell,
  },
  {
    name: 'sortable',
    type: 'boolean',
    default: 'false',
    required: false,
    description: t.dataTableComponent.propDescriptions.columnDef.sortable,
  },
  {
    name: 'align',
    type: "'start' | 'center' | 'end'",
    default: "'start'",
    required: false,
    description: t.dataTableComponent.propDescriptions.columnDef.align,
  },
  {
    name: 'width',
    type: 'string',
    default: 'undefined',
    required: false,
    description: t.dataTableComponent.propDescriptions.columnDef.width,
  },
]

const installCode = `npm install noorui-rtl`

const basicUsageCode = `import { DataTable, type ColumnDef } from 'noorui-rtl'

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

const internalSortingCode = `// Simple sorting - no state management needed!
const columns: ColumnDef<User>[] = [
  {
    id: 'name',
    header: 'Name',
    accessorKey: 'name',
    sortable: true, // Enable sorting for this column
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

<DataTable
  data={users}
  columns={columns}
  enableSorting // Automatically manages sort state
  defaultSortBy="name" // Optional: start sorted by name
  defaultSortDirection="asc" // Optional: default direction
/>`

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

  const sampleUsers: User[] = [
    {
      id: '1',
      name: t.tableComponent.demoContent.sampleData.ahmed,
      email: t.tableComponent.demoContent.emails.ahmed,
      status: t.tableComponent.demoContent.statuses.active,
      role: t.tableComponent.demoContent.roles.admin,
      joinDate: '2024-01-15'
    },
    {
      id: '2',
      name: t.tableComponent.demoContent.sampleData.fatima,
      email: t.tableComponent.demoContent.emails.fatima,
      status: t.tableComponent.demoContent.statuses.active,
      role: t.tableComponent.demoContent.roles.editor,
      joinDate: '2024-02-20'
    },
    {
      id: '3',
      name: t.tableComponent.demoContent.sampleData.mohammed,
      email: t.tableComponent.demoContent.emails.mohammed,
      status: t.tableComponent.demoContent.statuses.inactive,
      role: t.tableComponent.demoContent.roles.user,
      joinDate: '2024-03-10'
    },
    {
      id: '4',
      name: t.tableComponent.demoContent.sampleData.sarah,
      email: t.tableComponent.demoContent.emails.sarah,
      status: t.tableComponent.demoContent.statuses.active,
      role: t.tableComponent.demoContent.roles.editor,
      joinDate: '2024-03-25'
    },
    {
      id: '5',
      name: t.tableComponent.demoContent.sampleData.omar,
      email: t.tableComponent.demoContent.emails.omar,
      status: t.tableComponent.demoContent.statuses.active,
      role: t.tableComponent.demoContent.roles.user,
      joinDate: '2024-04-05'
    },
  ]
  // Basic example state
  const basicColumns: ColumnDef<User>[] = React.useMemo(() => [
    { id: 'name', header: t.tableComponent.demoContent.headers.name, accessorKey: 'name' },
    { id: 'email', header: t.tableComponent.demoContent.headers.email, accessorKey: 'email' },
    { id: 'role', header: t.tableComponent.demoContent.headers.role, accessorKey: 'role' },
  ], [t])

  // Sortable example state
  const [sortBy, setSortBy] = React.useState<string>()
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(null)

  const sortableColumns: ColumnDef<User>[] = React.useMemo(() => [
    { id: 'name', header: t.tableComponent.demoContent.headers.name, accessorKey: 'name', sortable: true },
    { id: 'email', header: t.tableComponent.demoContent.headers.email, accessorKey: 'email', sortable: true },
    { id: 'role', header: t.tableComponent.demoContent.headers.role, accessorKey: 'role', sortable: true },
    { id: 'joinDate', header: t.tableComponent.demoContent.headers.joinDate, accessorKey: 'joinDate', sortable: true },
  ], [t])

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

  // Get paginated data
  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return sampleUsers.slice(startIndex, endIndex)
  }, [currentPage, pageSize])

  // Complete example pagination state (separate from basic pagination)
  const [completePage, setCompletePage] = React.useState(1)
  const completePageSize = 3

  // Reset pagination when search changes
  React.useEffect(() => {
    setCompletePage(1)
  }, [searchValue])

  // Get paginated filtered data for complete example
  const paginatedFilteredData = React.useMemo(() => {
    const startIndex = (completePage - 1) * completePageSize
    const endIndex = startIndex + completePageSize
    return filteredUsers.slice(startIndex, endIndex)
  }, [filteredUsers, completePage, completePageSize])

  // Custom cells example
  const customColumns = React.useMemo<ColumnDef<User>[]>(() => [
    {
      id: 'name',
      header: t.tableComponent.demoContent.headers.name,
      accessorKey: 'name',
      cell: (row) => <div className="font-medium">{row.name}</div>,
    },
    {
      id: 'email',
      header: t.tableComponent.demoContent.headers.email,
      accessorKey: 'email',
      cell: (row) => <div className="text-muted-foreground">{row.email}</div>,
    },
    {
      id: 'status',
      header: t.tableComponent.demoContent.headers.status,
      accessorKey: 'status',
      cell: (row) => (
        <Badge variant={row.status === t.tableComponent.demoContent.statuses.active ? 'default' : 'secondary'}>
          {row.status}
        </Badge>
      ),
    },
    {
      id: 'actions',
      header: t.tableComponent.demoContent.headers.actions,
      accessorKey: 'id',
      align: 'end',
      cell: (row) => (
        <div className="flex gap-2 justify-end">
          <Button size="sm" variant="outline">{t.ui.button.view}</Button>
          <Button size="sm" variant="ghost">{t.ui.button.edit}</Button>
        </div>
      ),
    },
  ], [t])

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
            <li className="text-foreground font-medium">{t.dataTableComponent.breadcrumb}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold tracking-tight">{t.dataTableComponent.title}</h1>
            <Badge variant="outline" className="gap-1">
              <Sparkles className="h-3 w-3" />
              {t.dataTableComponent.badge}
            </Badge>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.dataTableComponent.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.preview}</h2>
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.installation}</h2>
          <CodeBlock code={installCode} language="bash" title="Terminal" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.dataTableComponent.sections.basicUsage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.dataTableComponent.sections.features}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{t.dataTableComponent.features.sortableColumns.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.dataTableComponent.features.sortableColumns.description}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{t.dataTableComponent.features.searchFilter.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.dataTableComponent.features.searchFilter.description}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{t.dataTableComponent.features.pagination.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.dataTableComponent.features.pagination.description}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{t.dataTableComponent.features.loadingStates.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.dataTableComponent.features.loadingStates.description}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{t.dataTableComponent.features.mobileResponsive.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.dataTableComponent.features.mobileResponsive.description}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{t.dataTableComponent.features.customCells.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.dataTableComponent.features.customCells.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.examples}</h2>

          <div className="space-y-12">
            {/* Internal Sorting (Simple) */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Simple Sorting
                <Badge variant="outline" className="ms-2 text-xs">New</Badge>
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Use <code className="px-1.5 py-0.5 bg-muted rounded text-xs">enableSorting</code> for automatic sorting without managing state yourself. Perfect for simple tables.
              </p>
              <Card>
                <CardContent className="p-6">
                  <DataTable
                    data={sampleUsers}
                    columns={sortableColumns}
                    enableSorting
                    defaultSortBy="name"
                    defaultSortDirection="asc"
                  />
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={internalSortingCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Sortable (External State) */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.dataTableComponent.examples.sortableColumns}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                For advanced use cases where you need to control the sort state externally (e.g., URL sync, API integration).
              </p>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    {t.dataTableComponent.examples.sortableDescription}
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
              <h3 className="text-lg font-semibold mb-4">{t.dataTableComponent.examples.searchableTable}</h3>
              <Card>
                <CardContent className="p-6">
                  <DataTable
                    data={filteredUsers}
                    columns={basicColumns}
                    searchable
                    searchPlaceholder={t.dataTableComponent.placeholders.searchByNameEmailRole}
                    searchValue={searchValue}
                    onSearchChange={setSearchValue}
                    emptyMessage={t.dataTableComponent.messages.noUsersFound}
                  />
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={searchableCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Paginated */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.dataTableComponent.examples.paginatedTable}</h3>
              <Card>
                <CardContent className="p-6">
                  <DataTable
                    data={paginatedData}
                    columns={basicColumns}
                    pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    pageSize={pageSize}
                    onPageChange={setCurrentPage}
                    nextLabel={t.dataTableComponent.pagination.next}
                    previousLabel={t.dataTableComponent.pagination.previous}
                    pageLabel={t.dataTableComponent.pagination.pageOfTotal(currentPage, totalPages)}
                  />
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={paginatedCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Custom Cells */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.dataTableComponent.examples.customCellRendering}</h3>
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
              <h3 className="text-lg font-semibold mb-4">{t.dataTableComponent.examples.loadingState}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Button onClick={toggleLoading} disabled={isLoading}>
                      {isLoading ? t.dataTableComponent.buttons.loading : t.dataTableComponent.buttons.triggerLoadingState}
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
              <h3 className="text-lg font-semibold mb-4">{t.dataTableComponent.examples.completeExample}</h3>
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    {t.dataTableComponent.examples.completeDescription}
                  </p>
                  <DataTable
                    data={paginatedFilteredData}
                    columns={sortableColumns}
                    searchable
                    searchPlaceholder={t.dataTableComponent.placeholders.searchUsers}
                    searchValue={searchValue}
                    onSearchChange={setSearchValue}
                    sortBy={sortBy}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                    pagination
                    currentPage={completePage}
                    totalPages={Math.ceil(filteredUsers.length / completePageSize)}
                    pageSize={completePageSize}
                    onPageChange={setCompletePage}
                    nextLabel={t.dataTableComponent.pagination.next}
                    previousLabel={t.dataTableComponent.pagination.previous}
                    pageLabel={t.dataTableComponent.pagination.pageOfTotal(completePage, Math.ceil(filteredUsers.length / completePageSize))}
                    striped
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.props}</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.dataTableComponent.props.dataTableProps}</h3>
              <PropsTable props={dataTableProps} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{t.dataTableComponent.props.columnDefProps}</h3>
              <PropsTable props={columnDefProps} />
            </div>
          </div>
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentDocs.accessibility}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t.dataTableComponent.accessibility.semanticHtml.title}</h3>
                <p className="text-muted-foreground">
                  {t.dataTableComponent.accessibility.semanticHtml.description}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.dataTableComponent.accessibility.keyboardNavigation.title}</h3>
                <p className="text-muted-foreground">
                  {t.dataTableComponent.accessibility.keyboardNavigation.description}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.dataTableComponent.accessibility.screenReaders.title}</h3>
                <p className="text-muted-foreground">
                  {t.dataTableComponent.accessibility.screenReaders.description}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.dataTableComponent.accessibility.loadingStates.title}</h3>
                <p className="text-muted-foreground">
                  {t.dataTableComponent.accessibility.loadingStates.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Considerations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.dataTableComponent.sections.rtlConsiderations}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t.dataTableComponent.rtl.automaticSupport.title}</h3>
                <p className="text-muted-foreground">
                  {t.dataTableComponent.rtl.automaticSupport.description}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.dataTableComponent.rtl.sortIndicators.title}</h3>
                <p className="text-muted-foreground">
                  {t.dataTableComponent.rtl.sortIndicators.description}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.dataTableComponent.rtl.searchInput.title}</h3>
                <p className="text-muted-foreground">
                  {t.dataTableComponent.rtl.searchInput.description}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.dataTableComponent.rtl.mobileCards.title}</h3>
                <p className="text-muted-foreground">
                  {t.dataTableComponent.rtl.mobileCards.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.dataTableComponent.sections.relatedComponents}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/table">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.dataTableComponent.related.table.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.dataTableComponent.related.table.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/pagination">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.dataTableComponent.related.pagination.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.dataTableComponent.related.pagination.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/skeleton">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.dataTableComponent.related.skeleton.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.dataTableComponent.related.skeleton.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/input">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.dataTableComponent.related.input.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.dataTableComponent.related.input.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/badge">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.dataTableComponent.related.badge.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.dataTableComponent.related.badge.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/button">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.dataTableComponent.related.button.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.dataTableComponent.related.button.description}
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
