'use client'

import * as React from 'react'
import { DataTable, type ColumnDef, type SortDirection } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useDirection } from '@/components/providers/direction-provider'
import { Download, RefreshCw, Users } from 'lucide-react'

// Sample user data
interface User {
  id: string
  name: string
  email: string
  role: 'Admin' | 'Editor' | 'User' | 'Viewer'
  status: 'Active' | 'Inactive' | 'Pending'
  department: string
  joinDate: string
  lastActive: string
}

const generateUsers = (): User[] => {
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
    'Engineering', 'Marketing', 'Sales', 'HR', 'Finance',
    'Operations', 'Customer Support', 'Product', 'Design', 'Legal'
  ]

  return names.map((name, index) => {
    const joinDate = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
    const lastActive = new Date(2025, 10, Math.floor(Math.random() * 7) + 1)

    return {
      id: `user-${index + 1}`,
      name,
      email: name.toLowerCase().replace(/\s+/g, '.').replace(/al-/g, '') + '@company.sa',
      role: roles[Math.floor(Math.random() * roles.length)],
      status: index < 5 ? 'Pending' : statuses[Math.floor(Math.random() * 2)], // More active users
      department: departments[Math.floor(Math.random() * departments.length)],
      joinDate: joinDate.toLocaleDateString('en-US'),
      lastActive: lastActive.toLocaleDateString('en-US'),
    }
  })
}

export default function DataTableShowcasePage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'

  // Data state
  const [allUsers] = React.useState<User[]>(generateUsers())
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

  // Get role color
  const getRoleVariant = (role: User['role']): 'default' | 'secondary' | 'outline' => {
    switch (role) {
      case 'Admin':
        return 'default'
      case 'Editor':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  // Get status color
  const getStatusVariant = (status: User['status']): 'default' | 'secondary' | 'outline' => {
    switch (status) {
      case 'Active':
        return 'default'
      case 'Pending':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  // Column definitions
  const columns: ColumnDef<User>[] = [
    {
      id: 'name',
      header: isRTL ? 'الاسم' : 'Name',
      accessorKey: 'name',
      sortable: true,
      cell: (row) => <div className="font-medium">{row.name}</div>,
    },
    {
      id: 'email',
      header: isRTL ? 'البريد الإلكتروني' : 'Email',
      accessorKey: 'email',
      sortable: true,
      cell: (row) => <div className="text-muted-foreground text-sm">{row.email}</div>,
    },
    {
      id: 'role',
      header: isRTL ? 'الدور' : 'Role',
      accessorKey: 'role',
      sortable: true,
      cell: (row) => <Badge variant={getRoleVariant(row.role)}>{row.role}</Badge>,
    },
    {
      id: 'status',
      header: isRTL ? 'الحالة' : 'Status',
      accessorKey: 'status',
      sortable: true,
      cell: (row) => <Badge variant={getStatusVariant(row.status)}>{row.status}</Badge>,
    },
    {
      id: 'department',
      header: isRTL ? 'القسم' : 'Department',
      accessorKey: 'department',
      sortable: true,
    },
    {
      id: 'joinDate',
      header: isRTL ? 'تاريخ الانضمام' : 'Join Date',
      accessorKey: 'joinDate',
      sortable: true,
      cell: (row) => <div className="text-sm">{row.joinDate}</div>,
    },
  ]

  // Get paginated data
  const paginatedData = displayUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  return (
    <div className="min-h-screen bg-background">
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
                    {isRTL ? 'عرض جدول البيانات' : 'DataTable Showcase'}
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
                {isRTL ? 'تحديث' : 'Refresh'}
              </Button>
              <Button onClick={handleExportCSV}>
                <Download className="h-4 w-4 me-2" />
                {isRTL ? 'تصدير CSV' : 'Export CSV'}
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
                  {isRTL ? 'إجمالي المستخدمين' : 'Total Users'}
                </p>
                <p className="text-3xl font-bold">{allUsers.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {isRTL ? 'المستخدمون النشطون' : 'Active Users'}
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
                  {isRTL ? 'المسؤولون' : 'Admins'}
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
                  {isRTL ? 'الأقسام' : 'Departments'}
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
            <CardTitle>{isRTL ? 'إدارة المستخدمين' : 'User Management'}</CardTitle>
            <CardDescription>
              {isRTL
                ? 'جدول بيانات كامل المزايا مع الفرز والبحث والترقيم والتحميل'
                : 'Full-featured data table with sorting, search, pagination, and loading states'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={paginatedData}
              columns={columns}
              isLoading={isLoading}
              sortBy={sortBy}
              sortDirection={sortDirection}
              onSort={handleSort}
              searchable
              searchPlaceholder={
                isRTL ? 'البحث عن المستخدمين...' : 'Search users...'
              }
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              emptyMessage={isRTL ? 'لم يتم العثور على مستخدمين' : 'No users found'}
              striped
              hoverable
            />
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              {isRTL ? 'الميزات المعروضة' : 'Features Demonstrated'}
            </h2>
            <Separator className="mb-6" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {isRTL ? 'الفرز' : 'Sorting'}
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
                  {isRTL ? 'البحث والتصفية' : 'Search & Filtering'}
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
                  {isRTL ? 'الترقيم' : 'Pagination'}
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
                  {isRTL ? 'حالات التحميل' : 'Loading States'}
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
                  {isRTL ? 'الخلايا المخصصة' : 'Custom Cells'}
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
                  {isRTL ? 'التصدير' : 'Export'}
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
                  {isRTL ? 'متجاوب مع الجوال' : 'Mobile Responsive'}
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
                  {isRTL ? 'دعم RTL' : 'RTL Support'}
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
                  {isRTL ? 'إمكانية الوصول' : 'Accessibility'}
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
