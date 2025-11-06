'use client'

import * as React from 'react'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  TrendingUp,
  DollarSign,
  Users,
  ShoppingCart,
  Activity,
  Download,
  Filter,
  Calendar,
} from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'

export default function DashboardPage() {
  const { locale } = useDirection()

  // Simulated data
  const stats = [
    {
      title: 'إجمالي الإيرادات',
      titleEn: 'Total Revenue',
      value: '452,300',
      currency: 'ر.س',
      change: '+12.5%',
      trend: 'up' as const,
      icon: DollarSign,
    },
    {
      title: 'عدد العملاء',
      titleEn: 'Total Customers',
      value: '2,845',
      change: '+8.2%',
      trend: 'up' as const,
      icon: Users,
    },
    {
      title: 'إجمالي الطلبات',
      titleEn: 'Total Orders',
      value: '1,234',
      change: '+23.1%',
      trend: 'up' as const,
      icon: ShoppingCart,
    },
    {
      title: 'معدل التحويل',
      titleEn: 'Conversion Rate',
      value: '3.24%',
      change: '-2.4%',
      trend: 'down' as const,
      icon: Activity,
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

  const recentActivity = [
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

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: 'default' as const,
      pending: 'secondary' as const,
      failed: 'destructive' as const,
    }
    const labels = {
      ar: {
        completed: 'مكتمل',
        pending: 'قيد الانتظار',
        failed: 'فشل',
      },
      en: {
        completed: 'Completed',
        pending: 'Pending',
        failed: 'Failed',
      },
    }
    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {labels[locale][status as keyof typeof labels.ar]}
      </Badge>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {locale === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
              </h1>
              <p className="text-muted-foreground">
                {locale === 'ar'
                  ? 'مرحباً بك، إليك ملخص أعمالك اليوم'
                  : 'Welcome back, here\'s your business summary for today'}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 me-2" />
                {locale === 'ar' ? 'آخر 30 يوماً' : 'Last 30 days'}
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 me-2" />
                {locale === 'ar' ? 'تصفية' : 'Filter'}
              </Button>
              <Button size="sm">
                <Download className="h-4 w-4 me-2" />
                {locale === 'ar' ? 'تصدير' : 'Export'}
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
                  {locale === 'ar' ? stat.title : stat.titleEn}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stat.value} {stat.currency || ''}
                </div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  {stat.trend === 'up' ? (
                    <ArrowUp className="h-3 w-3 text-green-500 me-1" />
                  ) : (
                    <ArrowDown className="h-3 w-3 text-red-500 me-1" />
                  )}
                  <span
                    className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}
                  >
                    {stat.change}
                  </span>
                  <span className="ms-1">
                    {locale === 'ar' ? 'عن الشهر الماضي' : 'from last month'}
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
                      {locale === 'ar' ? 'نظرة عامة على الإيرادات' : 'Revenue Overview'}
                    </CardTitle>
                    <CardDescription>
                      {locale === 'ar' ? 'الإيرادات الشهرية لهذا العام' : 'Monthly revenue for this year'}
                    </CardDescription>
                  </div>
                  <Tabs defaultValue="month">
                    <TabsList>
                      <TabsTrigger value="week">
                        {locale === 'ar' ? 'أسبوع' : 'Week'}
                      </TabsTrigger>
                      <TabsTrigger value="month">
                        {locale === 'ar' ? 'شهر' : 'Month'}
                      </TabsTrigger>
                      <TabsTrigger value="year">
                        {locale === 'ar' ? 'سنة' : 'Year'}
                      </TabsTrigger>
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
                          {(height * 500).toFixed(0)} {locale === 'ar' ? 'ر.س' : 'SAR'}
                        </div>
                      </div>
                    )
                  )}
                </div>
                <div className="flex justify-between mt-4 text-xs text-muted-foreground px-4">
                  {locale === 'ar'
                    ? ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'].map(
                        (month, index) => (
                          <span key={index} className="hidden md:block">
                            {month}
                          </span>
                        )
                      )
                    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(
                        (month, index) => (
                          <span key={index} className="hidden md:block">
                            {month}
                          </span>
                        )
                      )}
                  {locale === 'ar'
                    ? ['ي', 'ف', 'م', 'أ', 'م', 'ي', 'ي', 'أ', 'س', 'أ', 'ن', 'د'].map(
                        (month, index) => (
                          <span key={index} className="md:hidden">
                            {month}
                          </span>
                        )
                      )
                    : ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map(
                        (month, index) => (
                          <span key={index} className="md:hidden">
                            {month}
                          </span>
                        )
                      )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {locale === 'ar' ? 'المعاملات الأخيرة' : 'Recent Transactions'}
                </CardTitle>
                <CardDescription>
                  {locale === 'ar' ? 'آخر 5 معاملات في نظامك' : 'Last 5 transactions in your system'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Desktop Table */}
                <div className="hidden md:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          {locale === 'ar' ? 'رقم المعاملة' : 'Transaction ID'}
                        </TableHead>
                        <TableHead>
                          {locale === 'ar' ? 'العميل' : 'Customer'}
                        </TableHead>
                        <TableHead>
                          {locale === 'ar' ? 'المبلغ' : 'Amount'}
                        </TableHead>
                        <TableHead>
                          {locale === 'ar' ? 'الحالة' : 'Status'}
                        </TableHead>
                        <TableHead>
                          {locale === 'ar' ? 'التاريخ' : 'Date'}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.id}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {locale === 'ar' ? transaction.customer : transaction.customerEn}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {transaction.email}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {transaction.amount} {locale === 'ar' ? 'ر.س' : 'SAR'}
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
                    headers={
                      locale === 'ar'
                        ? ['رقم المعاملة', 'العميل', 'المبلغ', 'الحالة', 'التاريخ']
                        : ['Transaction ID', 'Customer', 'Amount', 'Status', 'Date']
                    }
                  >
                    <TableBody>
                      {recentTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.id}</TableCell>
                          <TableCell>
                            {locale === 'ar' ? transaction.customer : transaction.customerEn}
                          </TableCell>
                          <TableCell>
                            {transaction.amount} {locale === 'ar' ? 'ر.س' : 'SAR'}
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
                  {locale === 'ar' ? 'أفضل المنتجات' : 'Top Products'}
                </CardTitle>
                <CardDescription>
                  {locale === 'ar' ? 'الأكثر مبيعاً هذا الشهر' : 'Best sellers this month'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {topProducts.map((product, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">
                        {locale === 'ar' ? product.name : product.nameEn}
                      </span>
                      <span className="text-muted-foreground">
                        {product.sales} {locale === 'ar' ? 'قطعة' : 'units'}
                      </span>
                    </div>
                    <Progress value={product.progress} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        {product.progress}% {locale === 'ar' ? 'من الهدف' : 'of target'}
                      </span>
                      <span>
                        {product.revenue} {locale === 'ar' ? 'ر.س' : 'SAR'}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {locale === 'ar' ? 'النشاط الأخير' : 'Recent Activity'}
                </CardTitle>
                <CardDescription>
                  {locale === 'ar' ? 'آخر التحديثات في النظام' : 'Latest updates in the system'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>{activity.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">
                          {locale === 'ar' ? activity.user : activity.userEn}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {locale === 'ar' ? activity.action : activity.actionEn}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {locale === 'ar' ? activity.time : activity.timeEn}
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
