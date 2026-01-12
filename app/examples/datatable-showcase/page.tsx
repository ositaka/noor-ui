'use client'

import * as React from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import type { ColumnDef, SortDirection } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

// Lazy load heavy DataTable component
const DataTable = dynamic(
  () => import('@/components/ui/data-table').then(mod => ({ default: mod.DataTable })),
  {
    loading: () => <LoadingSpinner size="lg" text="Loading table..." />,
    ssr: false,
  }
)
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useDirection } from '@/components/providers/direction-provider'
import { DirectionToggle } from '@/components/docs/direction-toggle'
import { content } from '@/lib/i18n'
import { Download, RefreshCw, Users } from 'lucide-react'

// Sample user data
interface User {
  id: string
  name: string
  email: string
  role: 'Admin' | 'Editor' | 'User' | 'Viewer'
  status: 'Active' | 'Inactive' | 'Pending'
  department: string
  departmentAr: string
  joinDate: string
  lastActive: string
}

const generateUsers = (isRTL: boolean): User[] => {
  const names = [
    'Ahmed Al-Mansour', 'Fatima Hassan', 'Mohammed Youssef', 'Sarah Abdullah',
    'Omar Ibrahim', 'Layla Al-Farsi', 'Khalid Rahman', 'Aisha Al-Zahrani',
    'Hassan Al-Tamimi', 'Mariam Al-Qasimi', 'Abdullah Al-Suwaidi', 'Noor Al-Hashimi',
    'Ali Al-Mazrouei', 'Huda Al-Amiri', 'Youssef Al-Ketbi', 'Zahra Al-Muhairi',
    'Ibrahim Al-Dhaheri', 'Amina Al-Shehhi', 'Saeed Al-Rumaithi', 'Mona Al-Kaabi',
    'Rashid Al-Shamsi', 'Latifa Al-Marri', 'Sultan Al-Nuaimi', 'Noura Al-Maktoum',
    'Hamad Al-Thani', 'Reem Al-Fahim', 'Majid Al-Awadhi', 'Salma Al-Blooshi',
    'Tariq Al-Mulla', 'Hessa Al-Falasi', 'Faisal Al-Ghurair', 'Maryam Al-Otaiba',
    'Saif Al-Mazrui', 'Shamma Al-Bastaki', 'Nasser Al-Suwaidi', 'Jawaher Al-Qasim',
    'Khalifa Al-Zaabi', 'Ayesha Al-Mansoori', 'Rashad Al-Ahbabi', 'Maitha Al-Shamsi',
    'Abdulla Al-Madani', 'Sheikha Al-Tunaiji', 'Hamdan Al-Mheiri', 'Nouf Al-Marzouqi',
    'Salem Al-Naqbi', 'Wadha Al-Dhahiri', 'Obaid Al-Ketbi', 'Moza Al-Katheeri',
    'Saif Al-Maamari', 'Shamsa Al-Habsi'
  ]

  const roles: User['role'][] = ['Admin', 'Editor', 'User', 'Viewer']
  const statuses: User['status'][] = ['Active', 'Inactive', 'Pending']
  const departments = [
    { en: 'Engineering', ar: 'هندسة' },
    { en: 'Marketing', ar: 'تسويق' },
    { en: 'Sales', ar: 'مبيعات' },
    { en: 'HR', ar: 'موارد بشرية' },
    { en: 'Finance', ar: 'مالية' },
    { en: 'Operations', ar: 'عمليات' },
    { en: 'Customer Support', ar: 'دعم العملاء' },
    { en: 'Product', ar: 'منتج' },
    { en: 'Design', ar: 'تصميم' },
    { en: 'Legal', ar: 'قانوني' }
  ]

  return names.map((name, index) => {
    // Use deterministic values based on index to avoid hydration errors
    const joinMonth = index % 12
    const joinDay = (index % 27) + 1
    const joinDate = new Date(2024, joinMonth, joinDay)

    const lastActiveDay = (index % 7) + 1
    const lastActive = new Date(2025, 10, lastActiveDay)

    const dept = departments[index % departments.length]

    return {
      id: `user-${index + 1}`,
      name,
      email: name.toLowerCase().replace(/\s+/g, '.').replace(/al-/g, '') + '@company.sa',
      role: roles[index % roles.length],
      status: index < 5 ? 'Pending' : statuses[index % statuses.length],
      department: dept.en,
      departmentAr: dept.ar,
      joinDate: joinDate.toLocaleDateString('en-US'),
      lastActive: lastActive.toLocaleDateString('en-US'),
    }
  })
}

export default function DataTableShowcasePage() {
  const { direction, locale } = useDirection()
  const t = content[locale]
  const isRTL = direction === 'rtl'

  // Role translations
  const getRoleText = React.useCallback((role: User['role']) => {
    const translations = {
      Admin: t.datatableShowcasePage.roles.admin,
      Editor: t.datatableShowcasePage.roles.editor,
      User: t.datatableShowcasePage.roles.user,
      Viewer: t.datatableShowcasePage.roles.viewer,
    }
    return translations[role]
  }, [t])

  // Status translations
  const getStatusText = React.useCallback((status: User['status']) => {
    const translations = {
      Active: t.datatableShowcasePage.status.active,
      Inactive: t.datatableShowcasePage.status.inactive,
      Pending: t.datatableShowcasePage.status.pending,
    }
    return translations[status]
  }, [t])

  // Data state
  const [allUsers] = React.useState<User[]>(generateUsers(isRTL))
  const [displayUsers, setDisplayUsers] = React.useState<User[]>(allUsers)
  const [isLoading, setIsLoading] = React.useState(false)

  // Search state
  const [searchValue, setSearchValue] = React.useState('')

  // Sort state
  const [sortBy, setSortBy] = React.useState<string>()
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(null)

  // Pagination state
  const [currentPage, setCurrentPage] = React.useState(1)
  const pageSize = 10
  const totalPages = Math.ceil(displayUsers.length / pageSize)

  // Filter and sort data
  React.useEffect(() => {
    let filtered = [...allUsers]

    // Search filter
    if (searchValue) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.department.toLowerCase().includes(searchValue.toLowerCase())
      )
    }

    // Sort
    if (sortBy && sortDirection) {
      filtered.sort((a, b) => {
        const aValue = String(a[sortBy as keyof User] || '')
        const bValue = String(b[sortBy as keyof User] || '')

        if (sortDirection === 'asc') {
          return aValue.localeCompare(bValue)
        } else {
          return bValue.localeCompare(aValue)
        }
      })
    }

    setDisplayUsers(filtered)
    setCurrentPage(1) // Reset to first page when filtering/sorting
  }, [searchValue, sortBy, sortDirection, allUsers])

  // Handle sort
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

  // Simulate loading
  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setSearchValue('')
      setSortBy(undefined)
      setSortDirection(null)
      setCurrentPage(1)
    }, 2000)
  }

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Role', 'Status', 'Department', 'Join Date', 'Last Active']
    const rows = displayUsers.map(user => [
      user.name,
      user.email,
      user.role,
      user.status,
      user.department,
      user.joinDate,
      user.lastActive,
    ])

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `users-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Get role color - memoized to prevent recreating on every render
  const getRoleVariant = React.useCallback(
    (role: User['role']): 'default' | 'secondary' | 'outline' => {
      switch (role) {
        case 'Admin':
          return 'default'
        case 'Editor':
          return 'secondary'
        default:
          return 'outline'
      }
    },
    []
  )

  // Get status color - memoized to prevent recreating on every render
  const getStatusVariant = React.useCallback(
    (status: User['status']): 'default' | 'secondary' | 'outline' => {
      switch (status) {
        case 'Active':
          return 'default'
        case 'Pending':
          return 'secondary'
        default:
          return 'outline'
      }
    },
    []
  )

  // Column definitions - memoized to prevent DataTable re-renders
  const columns = React.useMemo<ColumnDef<User>[]>(() => [
    {
      id: 'name',
      header: t.cmsPage.table.title,
      accessorKey: 'name',
      sortable: true,
      cell: (row) => <div className="font-medium">{row.name}</div>,
    },
    {
      id: 'email',
      header: t.ui.form.email,
      accessorKey: 'email',
      sortable: true,
      cell: (row) => <div className="text-muted-foreground text-sm">{row.email}</div>,
    },
    {
      id: 'role',
      header: t.cmsPage.table.status,
      accessorKey: 'role',
      sortable: true,
      cell: (row) => <Badge variant={getRoleVariant(row.role)}>{getRoleText(row.role)}</Badge>,
    },
    {
      id: 'status',
      header: t.cmsPage.table.status,
      accessorKey: 'status',
      sortable: true,
      cell: (row) => <Badge variant={getStatusVariant(row.status)}>{getStatusText(row.status)}</Badge>,
    },
    {
      id: 'department',
      header: t.datatableShowcasePage.table.department,
      accessorKey: 'department',
      sortable: true,
      cell: (row) => <div>{isRTL ? row.departmentAr : row.department}</div>,
    },
    {
      id: 'joinDate',
      header: t.datatableShowcasePage.table.joinDate,
      accessorKey: 'joinDate',
      sortable: true,
      cell: (row) => <div className="text-sm">{row.joinDate}</div>,
    },
  ], [isRTL, getRoleVariant, getStatusVariant, getRoleText, getStatusText, t])

  // Get paginated data
  const paginatedData = displayUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      // Show all pages if there are few enough
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (currentPage > 3) {
        pages.push('ellipsis')
      }

      // Show current page and neighbors
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push('ellipsis')
      }

      // Always show last page
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b bg-background">
        <div className="container py-3">
          <nav aria-label="Breadcrumb">
            <div className="flex items-center justify-between gap-4">
              <ol className="flex items-center gap-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-foreground transition-colors">
                    {t.nav.home}
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/examples" className="hover:text-foreground transition-colors">
                    {t.nav.examples}
                  </Link>
                </li>
                <li>/</li>
                <li className="text-foreground font-medium">
                  {t.datatableShowcasePage.breadcrumb.datatable}
                </li>
              </ol>
              <DirectionToggle />
            </div>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="border-b">
        <div className="container py-8">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">
                    {t.datatableShowcasePage.title}
                  </h1>
                  <p className="text-muted-foreground">
                    {isRTL
                      ? 'عرض كامل لجميع ميزات جدول البيانات المتقدم'
                      : 'Complete demonstration of advanced DataTable features'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 me-2 ${isLoading ? 'animate-spin' : ''}`} />
                {t.datatableShowcasePage.buttons.refresh}
              </Button>
              <Button onClick={handleExportCSV}>
                <Download className="h-4 w-4 me-2" />
                {t.datatableShowcasePage.buttons.exportCSV}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container py-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {t.datatableShowcasePage.stats.totalUsers}
                </p>
                <p className="text-3xl font-bold">{allUsers.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {t.datatableShowcasePage.stats.activeUsers}
                </p>
                <p className="text-3xl font-bold">
                  {allUsers.filter(u => u.status === 'Active').length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {t.datatableShowcasePage.stats.admins}
                </p>
                <p className="text-3xl font-bold">
                  {allUsers.filter(u => u.role === 'Admin').length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {t.datatableShowcasePage.stats.departments}
                </p>
                <p className="text-3xl font-bold">
                  {new Set(allUsers.map(u => u.department)).size}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="container pb-12">
        <Card>
          <CardHeader>
            <CardTitle>{t.datatableShowcasePage.table.title}</CardTitle>
            <CardDescription>
              {isRTL
                ? 'جدول بيانات كامل المزايا مع الفرز والبحث والترقيم والتحميل'
                : 'Full-featured data table with sorting, search, pagination, and loading states'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={paginatedData}
              columns={columns as any}
              isLoading={isLoading}
              sortBy={sortBy}
              sortDirection={sortDirection}
              onSort={handleSort}
              searchable
              searchPlaceholder={
                t.datatableShowcasePage.table.searchPlaceholder
              }
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              emptyMessage={t.datatableShowcasePage.table.noUsersFound}
              striped
              hoverable
            />

            {/* Pagination Controls */}
            {!isLoading && totalPages > 1 && (
              <div className="mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPage > 1) {
                            setCurrentPage(currentPage - 1)
                          }
                        }}
                        className={
                          currentPage === 1
                            ? 'pointer-events-none opacity-50'
                            : 'cursor-pointer'
                        }
                      >
                        {t.ui.button.previous}
                      </PaginationPrevious>
                    </PaginationItem>

                    {getPageNumbers().map((page, index) => (
                      <PaginationItem key={index}>
                        {page === 'ellipsis' ? (
                          <PaginationEllipsis />
                        ) : (
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              setCurrentPage(page)
                            }}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPage < totalPages) {
                            setCurrentPage(currentPage + 1)
                          }
                        }}
                        className={
                          currentPage === totalPages
                            ? 'pointer-events-none opacity-50'
                            : 'cursor-pointer'
                        }
                      >
                        {t.ui.button.next}
                      </PaginationNext>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              {t.datatableShowcasePage.features.title}
            </h2>
            <Separator className="mb-6" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {t.datatableShowcasePage.features.sorting}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {isRTL
                    ? 'انقر على عنوان أي عمود للفرز تصاعديًا أو تنازليًا. مؤشرات الفرز مع دعم RTL.'
                    : 'Click any column header to sort ascending or descending. Sort indicators with RTL support.'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {t.datatableShowcasePage.features.searchFilter}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {isRTL
                    ? 'ابحث في الاسم والبريد الإلكتروني والقسم في الوقت الفعلي مع زر مسح.'
                    : 'Real-time search across name, email, and department with clear button.'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {t.datatableShowcasePage.features.pagination}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {isRTL
                    ? '10 مستخدمين لكل صفحة مع التنقل والعدد الكلي للصفحات.'
                    : '10 users per page with navigation and total page count.'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {t.datatableShowcasePage.features.loadingStates}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {isRTL
                    ? 'انقر على "تحديث" لرؤية حالة التحميل مع رسوم متحركة للهيكل.'
                    : 'Click "Refresh" to see loading state with skeleton animation.'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {t.datatableShowcasePage.features.customCells}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {isRTL
                    ? 'شارات ملونة للأدوار والحالات مع تنسيق مخصص.'
                    : 'Color-coded badges for roles and statuses with custom formatting.'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {t.datatableShowcasePage.features.export}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {isRTL
                    ? 'تصدير البيانات المرئية إلى ملف CSV مع التصفية المطبقة.'
                    : 'Export visible data to CSV file with applied filters.'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {t.datatableShowcasePage.features.mobileResponsive}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {isRTL
                    ? 'يتحول إلى عرض البطاقات على الشاشات الصغيرة للقراءة الأفضل.'
                    : 'Switches to card view on small screens for better readability.'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {t.datatableShowcasePage.features.rtlSupport}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {isRTL
                    ? 'تخطيط كامل من اليمين إلى اليسار مع مؤشرات الفرز والمسافات الصحيحة.'
                    : 'Full right-to-left layout with proper sort indicators and spacing.'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {t.datatableShowcasePage.features.accessibility}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {isRTL
                    ? 'التنقل بلوحة المفاتيح ومؤشرات التركيز ودعم قارئ الشاشة.'
                    : 'Keyboard navigation, focus indicators, and screen reader support.'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
