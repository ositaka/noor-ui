'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  PenTool,
  ShoppingCart,
  Rocket,
  FileCode,
  BarChart3,
  Download,
  Github,
  ExternalLink,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

interface Starter {
  title: string
  description: string
  longDescription: string
  href: string
  demoHref?: string
  icon: LucideIcon
  tags: string[]
  features: string[]
  stack: string[]
  status: 'ready' | 'coming-soon'
  featured?: boolean
}

const starters: Starter[] = [
  {
    title: 'Blog Dashboard',
    description: 'Complete blogging platform with authentication, rich text editor, and Supabase backend.',
    longDescription: 'A full-featured bilingual blog platform with user authentication, post management, image uploads, and rich content editing. Perfect for content creators who need a production-ready CMS.',
    href: '/starters/blog-dashboard',
    demoHref: '/dashboard',
    icon: PenTool,
    tags: ['Full Stack', 'CMS', 'Authentication'],
    features: [
      'User authentication with Supabase',
      'Rich text editor (TipTap)',
      'Image upload and management',
      'Complete bilingual support',
      'Row-level security',
      'Dark mode support',
    ],
    stack: ['Next.js 14', 'Supabase', 'TipTap', 'TypeScript'],
    status: 'ready' as const,
    featured: true,
  },
  {
    title: 'E-commerce Shop',
    description: 'Complete online shop with product catalog, shopping cart, and checkout flow.',
    longDescription: 'A production-ready e-commerce solution with product browsing, cart management, and checkout. Uses localStorage for state - no backend needed! Perfect for learning or quickly launching an online store.',
    href: '/starters/ecommerce',
    demoHref: '/shop',
    icon: ShoppingCart,
    tags: ['E-commerce', 'Client-Side', 'No Backend'],
    features: [
      'Product catalog with search & filters',
      'Shopping cart with persistence',
      'Complete checkout flow',
      'Product ratings and reviews',
      'Order confirmation system',
      'Fully responsive design',
    ],
    stack: ['Next.js 14', 'React Context', 'LocalStorage', 'TypeScript'],
    status: 'ready' as const,
    featured: true,
  },
  {
    title: 'SaaS Starter',
    description: 'Multi-tenant SaaS application with billing, team management, and admin dashboard.',
    longDescription: 'Complete SaaS boilerplate with subscription billing, team collaboration, usage tracking, and admin controls. Everything you need to launch a SaaS product.',
    href: '/starters/saas',
    icon: Rocket,
    tags: ['Full Stack', 'Billing', 'Multi-tenant'],
    features: [
      'Stripe subscription billing',
      'Team and user management',
      'Usage tracking and limits',
      'Admin dashboard',
      'Email notifications',
      'API key management',
    ],
    stack: ['Next.js 14', 'Supabase', 'Stripe', 'TypeScript'],
    status: 'coming-soon' as const,
  },
  {
    title: 'Landing Page',
    description: 'Marketing site with hero sections, pricing tables, testimonials, and contact forms.',
    longDescription: 'A modern marketing website template with all the essential sections for product launches, lead generation, and conversions. Optimized for SEO and performance.',
    href: '/starters/landing',
    icon: FileCode,
    tags: ['Marketing', 'Static', 'SEO'],
    features: [
      'Hero section with CTA',
      'Pricing tables',
      'Testimonials showcase',
      'Contact form integration',
      'SEO optimization',
      'Analytics ready',
    ],
    stack: ['Next.js 14', 'Static Export', 'Tailwind CSS'],
    status: 'coming-soon' as const,
  },
  {
    title: 'Analytics Dashboard',
    description: 'Data visualization and reporting platform with real-time metrics and charts.',
    longDescription: 'A comprehensive analytics platform with interactive charts, custom reports, data export, and real-time updates. Perfect for building internal tools or client dashboards.',
    href: '/starters/analytics',
    icon: BarChart3,
    tags: ['Data Viz', 'Charts', 'Real-time'],
    features: [
      'Interactive charts and graphs',
      'Real-time data updates',
      'Custom report builder',
      'Data export (CSV, PDF)',
      'User permissions',
      'API integration',
    ],
    stack: ['Next.js 14', 'Recharts', 'Supabase', 'TypeScript'],
    status: 'coming-soon' as const,
  },
]

export default function StartersPage() {
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

  const readyStarters = starters.filter((s) => s.status === 'ready')
  const comingSoonStarters = starters.filter((s) => s.status === 'coming-soon')

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
              {isRTL ? 'نماذج البدء' : 'Starters'}
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-4">
            <h1 className="text-4xl font-bold tracking-tight">
              {isRTL ? 'نماذج البدء الجاهزة' : 'Production-Ready Starters'}
            </h1>
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <p className="text-xl text-muted-foreground mb-6">
            {isRTL
              ? 'تطبيقات كاملة جاهزة للإنتاج يمكنك نسخها وتخصيصها ونشرها. كل نموذج يحتوي على مصادقة، قاعدة بيانات، ودعم كامل للغتين.'
              : 'Complete, production-ready applications you can copy, customize, and deploy. Each starter includes authentication, database setup, and full bilingual support.'}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="#ready-starters">
              <Button>
                <Download className="h-4 w-4 me-2" />
                {isRTL ? 'استعراض النماذج الجاهزة' : 'Browse Ready Starters'}
              </Button>
            </Link>
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                <Github className="h-4 w-4 me-2" />
                {isRTL ? 'عرض على GitHub' : 'View on GitHub'}
              </Button>
            </Link>
          </div>
        </div>

        {/* What are Starters? */}
        <div className="mb-12">
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <FileCode className="h-5 w-5 text-primary" />
                    {isRTL ? 'جاهزة للإنتاج' : 'Production Ready'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isRTL
                      ? 'كود كامل مع قواعد بيانات، مصادقة، وأفضل الممارسات. جاهزة للنشر.'
                      : 'Complete code with database, auth, and best practices. Ready to deploy.'}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Download className="h-5 w-5 text-primary" />
                    {isRTL ? 'انسخ وخصص' : 'Copy & Customize'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isRTL
                      ? 'انسخ المجلد، قم بتخصيصه حسب احتياجاتك، وانشر في دقائق.'
                      : 'Copy the folder, customize to your needs, and deploy in minutes.'}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    {isRTL ? 'تعلم الأنماط' : 'Learn Patterns'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isRTL
                      ? 'شاهد كيفية بناء تطبيقات حقيقية باستخدام أفضل الممارسات.'
                      : 'See how to build real apps with best practices and patterns.'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ready Starters */}
        <div id="ready-starters" className="mb-16">
          <div className="mb-6">
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              {isRTL ? 'جاهزة الآن' : 'Ready Now'}
            </h2>
            <p className="text-muted-foreground">
              {isRTL
                ? 'نماذج كاملة جاهزة للنسخ والاستخدام'
                : 'Complete starters ready to copy and use'}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {readyStarters.map((starter) => (
              <Card
                key={starter.href}
                className="flex flex-col border-primary/30 bg-primary/5 hover:shadow-lg transition-all"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <starter.icon className="h-8 w-8 text-primary" />
                    </div>
                    <Badge className="text-xs">
                      {isRTL ? 'جاهز' : 'Ready'}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl mb-2">{starter.title}</CardTitle>
                  <CardDescription className="text-base mb-4">
                    {starter.longDescription}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {starter.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-sm mb-3">
                      {isRTL ? 'المميزات:' : 'Features:'}
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                      {starter.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-1">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stack */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-sm mb-2">
                      {isRTL ? 'التقنيات المستخدمة:' : 'Tech Stack:'}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {starter.stack.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 mt-auto">
                    <Link href={starter.href} className="flex-1">
                      <Button className="w-full">
                        <FileCode className="h-4 w-4 me-2" />
                        {isRTL ? 'عرض الكود' : 'View Code'}
                      </Button>
                    </Link>
                    {starter.demoHref && (
                      <Link href={starter.demoHref}>
                        <Button variant="outline">
                          <ExternalLink className="h-4 w-4 me-2" />
                          {isRTL ? 'تجربة مباشرة' : 'Live Demo'}
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Coming Soon Starters */}
        {comingSoonStarters.length > 0 && (
          <div className="mb-12">
            <div className="mb-6">
              <h2 className="text-3xl font-bold tracking-tight mb-2">
                {isRTL ? 'قريباً' : 'Coming Soon'}
              </h2>
              <p className="text-muted-foreground">
                {isRTL
                  ? 'نماذج جديدة قيد التطوير'
                  : 'New starters currently in development'}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {comingSoonStarters.map((starter) => (
                <Card key={starter.href} className="opacity-60">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="p-2 bg-muted rounded-lg">
                        <starter.icon className="h-6 w-6" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {isRTL ? 'قريباً' : 'Coming Soon'}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{starter.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {starter.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {starter.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* How to Use */}
        <div className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>
                {isRTL ? 'كيفية استخدام النماذج' : 'How to Use Starters'}
              </CardTitle>
              <CardDescription>
                {isRTL
                  ? 'دليل سريع للبدء مع أي نموذج'
                  : 'Quick guide to get started with any starter'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">
                    {isRTL ? 'الطريقة 1: نسخ للمشروع الجديد' : 'Method 1: Copy for New Project'}
                  </h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>1. {isRTL ? 'انسخ مجلد النموذج' : 'Copy the starter folder'}</p>
                    <code className="block bg-muted p-2 rounded text-xs">
                      cp -r starters/blog-dashboard my-app
                    </code>
                    <p>2. {isRTL ? 'قم بتثبيت الاعتماديات' : 'Install dependencies'}</p>
                    <code className="block bg-muted p-2 rounded text-xs">
                      cd my-app && npm install
                    </code>
                    <p>3. {isRTL ? 'اتبع دليل الإعداد في README' : 'Follow setup guide in README'}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">
                    {isRTL ? 'الطريقة 2: التشغيل من المستودع' : 'Method 2: Run from Monorepo'}
                  </h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>{isRTL ? 'جميع النماذج تشترك في نفس المكونات' : 'All starters share the same components'}</p>
                    <code className="block bg-muted p-2 rounded text-xs">
                      npm run dev
                    </code>
                    <p>{isRTL ? 'انتقل إلى مسار النموذج' : 'Navigate to starter route'}</p>
                    <p className="text-xs">
                      {isRTL
                        ? 'مثالي للتطوير والاختبار'
                        : 'Perfect for development and testing'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Link to Examples */}
        <div className="max-w-3xl">
          <Card className="border-primary/50">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="font-semibold">
                  {isRTL ? 'هل تبحث عن أمثلة بسيطة؟' : 'Looking for Simple Examples?'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {isRTL
                    ? 'تصفح أمثلة UI الخفيفة التي توضح كيفية استخدام المكونات والأنماط مع بيانات تجريبية - مثالية للتعلم السريع.'
                    : 'Browse lightweight UI examples that show how to use components and patterns with mock data - perfect for quick learning.'}
                </p>
                <Link href="/examples">
                  <Badge className="cursor-pointer hover:bg-primary/90">
                    {isRTL ? 'عرض الأمثلة البسيطة →' : 'View Simple Examples →'}
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
