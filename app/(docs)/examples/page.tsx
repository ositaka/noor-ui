'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  FileText,
  CheckSquare,
  LayoutDashboard,
  ShoppingCart,
  Calendar,
  Sparkles,
} from 'lucide-react'

const examples = [
  {
    title: 'GCC Community Dashboard',
    description: 'Complete GCC dashboard with Prayer Times, Hijri dates, Zakat calculator, and Arabic numbers. Perfect showcase of all GCC components.',
    href: '/examples/gcc-dashboard',
    icon: Sparkles,
    tags: ['GCC', 'Islamic', 'Zakat', 'Prayer', 'RTL'],
    status: 'ready' as const,
    featured: true,
  },
  {
    title: 'Multi-Step Registration Form',
    description: 'A comprehensive 4-step registration form with validation, bilingual error messages, and perfect RTL support.',
    href: '/examples/registration',
    icon: FileText,
    tags: ['Forms', 'Validation', 'Multi-step', 'RTL'],
    status: 'ready' as const,
  },
  {
    title: 'Dashboard',
    description: 'Data visualization dashboard with RTL charts, statistics cards, and responsive layout.',
    href: '/examples/dashboard',
    icon: LayoutDashboard,
    tags: ['Dashboard', 'Charts', 'Data', 'RTL'],
    status: 'ready' as const,
  },
  {
    title: 'E-commerce Product Page',
    description: 'Product page with image gallery, reviews, and shopping cart.',
    href: '/examples/ecommerce',
    icon: ShoppingCart,
    tags: ['E-commerce', 'Product', 'Cart', 'RTL'],
    status: 'ready' as const,
  },
  {
    title: 'Calendar & Date Picker',
    description: 'Calendar interface with Hijri calendar support for GCC markets.',
    href: '/examples/calendar',
    icon: Calendar,
    tags: ['Calendar', 'Hijri', 'GCC', 'RTL'],
    status: 'coming-soon' as const,
  },
]

export default function ExamplesPage() {
  const [isRTL, setIsRTL] = React.useState(false)

  React.useEffect(() => {
    setIsRTL(document.documentElement.dir === 'rtl')

    const observer = new MutationObserver(() => {
      setIsRTL(document.documentElement.dir === 'rtl')
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['dir'],
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {isRTL ? 'الرئيسية' : 'Home'}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">
              {isRTL ? 'الأمثلة' : 'Examples'}
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {isRTL ? 'أمثلة شاملة' : 'Complete Examples'}
          </h1>
          <p className="text-xl text-muted-foreground">
            {isRTL
              ? 'أمثلة واقعية وجاهزة للإنتاج تعرض كيفية استخدام نظام التصميم في تطبيقات حقيقية مع دعم كامل للغة العربية واتجاه النص من اليمين لليسار.'
              : 'Real-world, production-ready examples showcasing how to use the design system in actual applications with full Arabic and RTL support.'}
          </p>
        </div>

        {/* Examples Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {examples.map((example) => (
            <Link
              key={example.href}
              href={example.status === 'ready' ? example.href : '#'}
              className={example.status === 'ready' ? '' : 'pointer-events-none'}
            >
              <Card className={`h-full transition-all hover:shadow-lg ${
                example.status === 'ready'
                  ? 'hover:border-primary/50 cursor-pointer'
                  : 'opacity-60'
              } ${(example as any).featured ? 'border-primary/30 bg-primary/5' : ''}`}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <example.icon className="h-6 w-6 text-primary" />
                    </div>
                    {example.status === 'coming-soon' && (
                      <Badge variant="outline" className="text-xs">
                        {isRTL ? 'قريباً' : 'Coming Soon'}
                      </Badge>
                    )}
                    {example.status === 'ready' && (
                      <Badge className="text-xs">
                        {isRTL ? 'جاهز' : 'Ready'}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{example.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {example.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {example.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-12 max-w-3xl">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-muted rounded-lg">
                  <CheckSquare className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold">
                    {isRTL ? 'المزيد من الأمثلة قريباً' : 'More Examples Coming Soon'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isRTL
                      ? 'نعمل على إضافة المزيد من الأمثلة الواقعية بما في ذلك لوحات المعلومات، متاجر التجارة الإلكترونية، والمزيد. تحقق قريباً للحصول على التحديثات!'
                      : "We're working on adding more real-world examples including dashboards, e-commerce stores, and more. Check back soon for updates!"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Link to Components */}
        <div className="mt-12 max-w-3xl">
          <Card className="border-primary/50">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="font-semibold">
                  {isRTL ? 'هل تبحث عن المكونات الفردية؟' : 'Looking for Individual Components?'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {isRTL
                    ? 'تصفح مكتبة المكونات الكاملة لدينا التي تحتوي على 30 مكوناً موثقاً بالكامل مع أمثلة حية وإرشادات إمكانية الوصول.'
                    : 'Browse our complete component library with 30 fully documented components with live examples and accessibility guidelines.'}
                </p>
                <Link href="/components">
                  <Badge className="cursor-pointer hover:bg-primary/90">
                    {isRTL ? 'عرض جميع المكونات →' : 'View All Components →'}
                  </Badge>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
