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

export default function DashboardPage() {
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
      email: 'ahmed@example.com',
      amount: '1,250',
      status: 'completed',
      date: '2025-11-05',
    },
    {
      id: 'TRX-002',
      customer: 'فاطمة علي',
      email: 'fatima@example.com',
      amount: '890',
      status: 'pending',
      date: '2025-11-05',
    },
    {
      id: 'TRX-003',
      customer: 'محمد الشمري',
      email: 'mohammed@example.com',
      amount: '2,150',
      status: 'completed',
      date: '2025-11-04',
    },
    {
      id: 'TRX-004',
      customer: 'سارة أحمد',
      email: 'sarah@example.com',
      amount: '675',
      status: 'completed',
      date: '2025-11-04',
    },
    {
      id: 'TRX-005',
      customer: 'خالد يوسف',
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
      action: 'أضاف منتج جديد',
      actionEn: 'Added new product',
      time: 'منذ 5 دقائق',
      timeEn: '5 minutes ago',
      avatar: 'AM',
    },
    {
      user: 'فاطمة علي',
      action: 'أكملت طلباً',
      actionEn: 'Completed an order',
      time: 'منذ 12 دقيقة',
      timeEn: '12 minutes ago',
      avatar: 'FA',
    },
    {
      user: 'محمد الشمري',
      action: 'حدّث الملف الشخصي',
      actionEn: 'Updated profile',
      time: 'منذ 23 دقيقة',
      timeEn: '23 minutes ago',
      avatar: 'MS',
    },
    {
      user: 'سارة أحمد',
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
      completed: 'مكتمل',
      pending: 'قيد الانتظار',
      failed: 'فشل',
    }
    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
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
              <h1 className="text-3xl font-bold tracking-tight">لوحة التحكم</h1>
              <p className="text-muted-foreground">
                مرحباً بك، إليك ملخص أعمالك اليوم
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 me-2" />
                آخر 30 يوماً
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 me-2" />
                تصفية
              </Button>
              <Button size="sm">
                <Download className="h-4 w-4 me-2" />
                تصدير
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
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stat.value} {stat.currency}
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
                  <span className="ms-1">عن الشهر الماضي</span>
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
                    <CardTitle>نظرة عامة على الإيرادات</CardTitle>
                    <CardDescription>الإيرادات الشهرية لهذا العام</CardDescription>
                  </div>
                  <Tabs defaultValue="month" dir="ltr">
                    <TabsList>
                      <TabsTrigger value="week">أسبوع</TabsTrigger>
                      <TabsTrigger value="month">شهر</TabsTrigger>
                      <TabsTrigger value="year">سنة</TabsTrigger>
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
                          {(height * 500).toFixed(0)} ر.س
                        </div>
                      </div>
                    )
                  )}
                </div>
                <div className="flex justify-between mt-4 text-xs text-muted-foreground px-4">
                  {['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'].map(
                    (month, index) => (
                      <span key={index} className="hidden md:block">
                        {month}
                      </span>
                    )
                  )}
                  {['ي', 'ف', 'م', 'أ', 'م', 'ي', 'ي', 'أ', 'س', 'أ', 'ن', 'د'].map(
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
                <CardTitle>المعاملات الأخيرة</CardTitle>
                <CardDescription>آخر 5 معاملات في نظامك</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Desktop Table */}
                <div className="hidden md:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>رقم المعاملة</TableHead>
                        <TableHead>العميل</TableHead>
                        <TableHead>المبلغ</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>التاريخ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.id}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{transaction.customer}</div>
                              <div className="text-xs text-muted-foreground">
                                {transaction.email}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{transaction.amount} ر.س</TableCell>
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
                    headers={['رقم المعاملة', 'العميل', 'المبلغ', 'الحالة', 'التاريخ']}
                  >
                    <TableBody>
                      {recentTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.id}</TableCell>
                          <TableCell>{transaction.customer}</TableCell>
                          <TableCell>{transaction.amount} ر.س</TableCell>
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
                <CardTitle>أفضل المنتجات</CardTitle>
                <CardDescription>الأكثر مبيعاً هذا الشهر</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {topProducts.map((product, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{product.name}</span>
                      <span className="text-muted-foreground">{product.sales} قطعة</span>
                    </div>
                    <Progress value={product.progress} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{product.progress}% من الهدف</span>
                      <span>{product.revenue} ر.س</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>النشاط الأخير</CardTitle>
                <CardDescription>آخر التحديثات في النظام</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>{activity.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{activity.user}</p>
                        <p className="text-sm text-muted-foreground">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
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
