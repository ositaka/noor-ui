'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  ResponsiveTable,
} from '@/components/ui/table'
import {
  ArrowUp,
  ArrowDown,
  CurrencyDollar,
  Users,
  ShoppingCart,
  Pulse,
  Download,
  Funnel,
  Calendar,
} from '@phosphor-icons/react'
import { useDirection } from '@/components/providers/direction-provider'
import { DirectionToggle } from '@/components/docs/direction-toggle'


export default function DashboardPage() {
  const { locale } = useDirection()
  const isRTL = locale === 'ar'

  const t = isRTL ? {
    home: 'الرئيسية',
    examples: 'الأمثلة',
    dashboard: 'لوحة التحكم',
    welcome: 'مرحباً بك، إليك ملخص أعمالك اليوم',
    last30Days: 'آخر 30 يوماً',
    filter: 'تصفية',
    export: 'تصدير',
    fromLastMonth: 'عن الشهر الماضي',
    revenueOverview: 'نظرة عامة على الإيرادات',
    revenueDesc: 'الإيرادات الشهرية لهذا العام',
    week: 'أسبوع',
    month: 'شهر',
    year: 'سنة',
    currency: 'ر.س',
    recentTransactions: 'المعاملات الأخيرة',
    transactionsDesc: 'آخر 5 معاملات في نظامك',
    transactionId: 'رقم المعاملة',
    customer: 'العميل',
    amount: 'المبلغ',
    status: 'الحالة',
    date: 'التاريخ',
    completed: 'مكتمل',
    pending: 'قيد الانتظار',
    failed: 'فشل',
    topProducts: 'أفضل المنتجات',
    topProductsDesc: 'الأكثر مبيعاً هذا الشهر',
    units: 'قطعة',
    ofTarget: 'من الهدف',
    recentPulse: 'النشاط الأخير',
    recentPulseDesc: 'آخر التحديثات في النظام',
    months: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    monthsShort: ['ي', 'ف', 'م', 'أ', 'م', 'ي', 'ي', 'أ', 'س', 'أ', 'ن', 'د'],
  } : {
    home: 'Home',
    examples: 'Examples',
    dashboard: 'Dashboard',
    welcome: "Welcome back, here's your business summary for today",
    last30Days: 'Last 30 days',
    filter: 'Filter',
    export: 'Export',
    fromLastMonth: 'from last month',
    revenueOverview: 'Revenue Overview',
    revenueDesc: 'Monthly revenue for this year',
    week: 'Week',
    month: 'Month',
    year: 'Year',
    currency: 'SAR',
    recentTransactions: 'Recent Transactions',
    transactionsDesc: 'Last 5 transactions in your system',
    transactionId: 'Transaction ID',
    customer: 'Customer',
    amount: 'Amount',
    status: 'Status',
    date: 'Date',
    completed: 'Completed',
    pending: 'Pending',
    failed: 'Failed',
    topProducts: 'Top Products',
    topProductsDesc: 'Best sellers this month',
    units: 'units',
    ofTarget: 'of target',
    recentPulse: 'Recent Pulse',
    recentPulseDesc: 'Latest updates in the system',
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    monthsShort: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  }

  // Simulated data
  const stats = [
    {
      title: isRTL ? 'إجمالي الإيرادات' : 'Total Revenue',
      value: '452,300',
      currency: t.currency,
      change: '+12.5%',
      trend: 'up' as const,
      icon: CurrencyDollar,
    },
    {
      title: isRTL ? 'عدد العملاء' : 'Total Customers',
      value: '2,845',
      change: '+8.2%',
      trend: 'up' as const,
      icon: Users,
    },
    {
      title: isRTL ? 'إجمالي الطلبات' : 'Total Orders',
      value: '1,234',
      change: '+23.1%',
      trend: 'up' as const,
      icon: ShoppingCart,
    },
    {
      title: isRTL ? 'معدل التحويل' : 'Conversion Rate',
      value: '3.24%',
      change: '-2.4%',
      trend: 'down' as const,
      icon: Pulse,
    },
  ]

  const recentTransactions = [
    {
      id: 'TRX-001',
      customer: 'أحمد محمد',
      customerEn: 'Ahmed Mohammed',
      email: 'ahmed@example.com',
      amount: '1,250',
      status: 'completed',
      date: '2025-11-05',
    },
    {
      id: 'TRX-002',
      customer: 'فاطمة علي',
      customerEn: 'Fatima Ali',
      email: 'fatima@example.com',
      amount: '890',
      status: 'pending',
      date: '2025-11-05',
    },
    {
      id: 'TRX-003',
      customer: 'محمد الشمري',
      customerEn: 'Mohammed Al-Shammari',
      email: 'mohammed@example.com',
      amount: '2,150',
      status: 'completed',
      date: '2025-11-04',
    },
    {
      id: 'TRX-004',
      customer: 'سارة أحمد',
      customerEn: 'Sarah Ahmed',
      email: 'sarah@example.com',
      amount: '675',
      status: 'completed',
      date: '2025-11-04',
    },
    {
      id: 'TRX-005',
      customer: 'خالد يوسف',
      customerEn: 'Khaled Youssef',
      email: 'khaled@example.com',
      amount: '3,200',
      status: 'failed',
      date: '2025-11-03',
    },
  ]

  const topProducts = [
    {
      name: 'هاتف ذكي - طراز X',
      nameEn: 'Smartphone Model X',
      sales: 234,
      revenue: '117,000',
      progress: 85,
    },
    {
      name: 'ساعة ذكية - سلسلة 5',
      nameEn: 'Smart Watch Series 5',
      sales: 189,
      revenue: '94,500',
      progress: 70,
    },
    {
      name: 'سماعات لاسلكية',
      nameEn: 'Wireless Earbuds',
      sales: 156,
      revenue: '46,800',
      progress: 55,
    },
    {
      name: 'حقيبة ظهر ذكية',
      nameEn: 'Smart Backpack',
      sales: 98,
      revenue: '29,400',
      progress: 35,
    },
  ]

  const recentPulse = [
    {
      user: 'أحمد محمد',
      userEn: 'Ahmed Mohammed',
      action: 'أضاف منتج جديد',
      actionEn: 'Added new product',
      time: 'منذ 5 دقائق',
      timeEn: '5 minutes ago',
      avatar: 'AM',
    },
    {
      user: 'فاطمة علي',
      userEn: 'Fatima Ali',
      action: 'أكملت طلباً',
      actionEn: 'Completed an order',
      time: 'منذ 12 دقيقة',
      timeEn: '12 minutes ago',
      avatar: 'FA',
    },
    {
      user: 'محمد الشمري',
      userEn: 'Mohammed Al-Shammari',
      action: 'حدّث الملف الشخصي',
      actionEn: 'Updated profile',
      time: 'منذ 23 دقيقة',
      timeEn: '23 minutes ago',
      avatar: 'MS',
    },
    {
      user: 'سارة أحمد',
      userEn: 'Sarah Ahmed',
      action: 'أضافت تقييماً',
      actionEn: 'Added a review',
      time: 'منذ ساعة',
      timeEn: '1 hour ago',
      avatar: 'SA',
    },
  ]

  const statusLabels: Record<string, string> = {
    completed: t.completed,
    pending: t.pending,
    failed: t.failed,
  }
  const statusVariants: Record<string, 'default' | 'secondary' | 'destructive'> = {
    completed: 'default',
    pending: 'secondary',
    failed: 'destructive',
  }
  const getStatusBadge = (status: string) => (
    <Badge variant={statusVariants[status]}>
      {statusLabels[status]}
    </Badge>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b bg-background">
        <div className="container py-3">
          <nav aria-label={isRTL ? 'مسار التنقل' : 'Breadcrumb'}>
            <div className="flex items-center justify-between gap-4">
              <ol className="flex items-center gap-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-foreground transition-colors">
                    {t.home}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/examples" className="hover:text-foreground transition-colors">
                    {t.examples}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-foreground font-medium">
                  {t.dashboard}
                </li>
              </ol>
              <DirectionToggle />
            </div>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="border-b">
        <div className="container py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {t.dashboard}
              </h1>
              <p className="text-muted-foreground">
                {t.welcome}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 me-2" aria-hidden="true" />
                {t.last30Days}
              </Button>
              <Button variant="outline" size="sm">
                <Funnel className="h-4 w-4 me-2" aria-hidden="true" />
                {t.filter}
              </Button>
              <Button size="sm">
                <Download className="h-4 w-4 me-2" aria-hidden="true" />
                {t.export}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stat.value} {stat.currency || ''}
                </div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  {stat.trend === 'up' ? (
                    <ArrowUp className="h-3 w-3 text-success me-1" aria-hidden="true" />
                  ) : (
                    <ArrowDown className="h-3 w-3 text-destructive me-1" aria-hidden="true" />
                  )}
                  <span
                    className={stat.trend === 'up' ? 'text-success' : 'text-destructive'}
                  >
                    {stat.change}
                  </span>
                  <span className="ms-1">
                    {t.fromLastMonth}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-8">
            {/* Revenue Chart Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>
                      {t.revenueOverview}
                    </CardTitle>
                    <CardDescription>
                      {t.revenueDesc}
                    </CardDescription>
                  </div>
                  <Tabs defaultValue="month">
                    <TabsList>
                      <TabsTrigger value="week">{t.week}</TabsTrigger>
                      <TabsTrigger value="month">{t.month}</TabsTrigger>
                      <TabsTrigger value="year">{t.year}</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                {/* Simulated chart area */}
                <div className="h-[300px] flex items-end justify-between gap-2 px-4">
                  {[40, 60, 45, 80, 55, 75, 90, 70, 85, 65, 95, 88].map(
                    (height, index) => (
                      <div
                        key={index}
                        className="flex-1 bg-primary/20 rounded-t-md hover:bg-primary/30 transition-colors cursor-pointer relative group"
                        style={{ height: `${height}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-popover text-popover-foreground px-2 py-1 rounded text-xs whitespace-nowrap">
                          {(height * 500).toFixed(0)} {t.currency}
                        </div>
                      </div>
                    )
                  )}
                </div>
                <div className="flex justify-between mt-4 text-xs text-muted-foreground px-4" aria-hidden="true">
                  {t.months.map((month, index) => (
                    <span key={index} className="hidden md:block">{month}</span>
                  ))}
                  {t.monthsShort.map((month, index) => (
                    <span key={index} className="md:hidden">{month}</span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {t.recentTransactions}
                </CardTitle>
                <CardDescription>
                  {t.transactionsDesc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Desktop Table */}
                <div className="hidden md:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t.transactionId}</TableHead>
                        <TableHead>{t.customer}</TableHead>
                        <TableHead>{t.amount}</TableHead>
                        <TableHead>{t.status}</TableHead>
                        <TableHead>{t.date}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.id}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {isRTL ? transaction.customer : transaction.customerEn}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {transaction.email}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {transaction.amount} {t.currency}
                          </TableCell>
                          <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                          <TableCell className="text-muted-foreground">
                            {transaction.date}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile Responsive Table */}
                <div className="md:hidden">
                  <ResponsiveTable
                    headers={[t.transactionId, t.customer, t.amount, t.status, t.date]}
                  >
                    <TableBody>
                      {recentTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.id}</TableCell>
                          <TableCell>
                            {isRTL ? transaction.customer : transaction.customerEn}
                          </TableCell>
                          <TableCell>
                            {transaction.amount} {t.currency}
                          </TableCell>
                          <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                          <TableCell>{transaction.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </ResponsiveTable>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-8">
            {/* Top Products */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {t.topProducts}
                </CardTitle>
                <CardDescription>
                  {t.topProductsDesc}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {topProducts.map((product, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">
                        {isRTL ? product.name : product.nameEn}
                      </span>
                      <span className="text-muted-foreground">
                        {product.sales} {t.units}
                      </span>
                    </div>
                    <Progress value={product.progress} className="h-2" aria-label={`${isRTL ? product.name : product.nameEn} — ${product.progress}%`} />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        {product.progress}% {t.ofTarget}
                      </span>
                      <span>
                        {product.revenue} {t.currency}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Pulse */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {t.recentPulse}
                </CardTitle>
                <CardDescription>
                  {t.recentPulseDesc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPulse.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>{activity.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">
                          {isRTL ? activity.user : activity.userEn}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {isRTL ? activity.action : activity.actionEn}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {isRTL ? activity.time : activity.timeEn}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
