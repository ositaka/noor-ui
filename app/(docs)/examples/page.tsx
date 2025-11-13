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
  Table,
  Landmark,
  PenTool,
  Home,
  Store,
  FileEdit,
  TrendingUp,
  MessageSquare,
  Code2,
  BookOpen,
  Users,
  Bot,
  GitBranch,
  Workflow,
  type LucideIcon,
} from 'lucide-react'

interface Example {
  title: string
  description: string
  href: string
  icon: LucideIcon
  tags: string[]
  status: 'ready' | 'coming-soon'
  featured?: boolean
}

const examples: Example[] = [
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
    title: 'Islamic Finance Dashboard',
    description: 'Comprehensive Islamic finance management with Zakat calculator, investment tracking, Hijri calendar, prayer times, and transaction history.',
    href: '/examples/islamic-finance-dashboard',
    icon: Landmark,
    tags: ['GCC', 'Islamic', 'Finance', 'Zakat', 'DataTable', 'RTL'],
    status: 'ready' as const,
    featured: true,
  },
  {
    title: 'DataTable Showcase',
    description: 'Advanced data table with sorting, filtering, pagination, and export. Demonstrates all DataTable features with 50 sample users.',
    href: '/examples/datatable-showcase',
    icon: Table,
    tags: ['DataTable', 'Sorting', 'Filtering', 'Export', 'RTL'],
    status: 'ready' as const,
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
    description: 'Data visualization dashboard with RTL charts, statistics cards, and responsive layout with mock data.',
    href: '/examples/dashboard',
    icon: LayoutDashboard,
    tags: ['Dashboard', 'Charts', 'Data', 'RTL'],
    status: 'ready' as const,
  },
  {
    title: 'Calendar & Date Picker',
    description: 'Calendar interface with Hijri calendar support for GCC markets.',
    href: '/examples/calendar',
    icon: Calendar,
    tags: ['Calendar', 'Hijri', 'GCC', 'RTL'],
    status: 'ready' as const,
    featured: true,
  },
  {
    title: 'Real Estate Dashboard',
    description: 'Property listings platform with bilingual descriptions, search filters, and property cards with mock data.',
    href: '/examples/real-estate',
    icon: Home,
    tags: ['Real Estate', 'Listings', 'Search', 'GCC', 'RTL'],
    status: 'ready' as const,
    featured: true,
  },
  {
    title: 'Portfolio Site',
    description: 'Creative professional portfolio with project showcase, case studies, and contact forms. Perfect for designers and developers.',
    href: '/examples/portfolio',
    icon: LayoutDashboard,
    tags: ['Portfolio', 'Showcase', 'Creative', 'RTL'],
    status: 'ready' as const,
    featured: true,
  },
  {
    title: 'Marketplace',
    description: 'Multi-vendor marketplace with product listings, seller dashboards, and order management. Full e-commerce solution.',
    href: '/examples/marketplace',
    icon: Store,
    tags: ['Marketplace', 'E-commerce', 'Multi-vendor', 'Orders', 'RTL'],
    status: 'ready' as const,
    featured: true,
  },
  {
    title: 'B2B Marketplace',
    description: 'Business-to-business marketplace with bulk ordering, volume pricing, RFQ system, and credit terms. Perfect for wholesale operations.',
    href: '/examples/b2b-marketplace',
    icon: ShoppingCart,
    tags: ['B2B', 'Wholesale', 'Bulk Orders', 'RFQ', 'Credit Terms', 'RTL'],
    status: 'ready' as const,
    featured: true,
  },
  {
    title: 'CMS / Content Management',
    description: 'Full-featured content management system with rich text editor, file uploads, posts management, and bilingual content support.',
    href: '/examples/cms',
    icon: FileEdit,
    tags: ['CMS', 'Content', 'Editor', 'Dashboard Shell', 'RTL'],
    status: 'ready' as const,
    featured: true,
  },
  {
    title: 'Simple AI Chat',
    description: 'Clean AI chat interface with streaming responses, message history, and bilingual support. Perfect starting point for chat applications.',
    href: '/examples/ai-chat-simple',
    icon: MessageSquare,
    tags: ['AI', 'Chat', 'Streaming', 'LLM', 'RTL'],
    status: 'ready' as const,
    featured: true,
  },
  {
    title: 'Advanced AI Playground',
    description: 'Full-featured AI playground with model selection, parameter controls, token tracking, conversation history, and settings panel.',
    href: '/examples/ai-playground',
    icon: Bot,
    tags: ['AI', 'LLM', 'Parameters', 'Models', 'Tokens', 'RTL'],
    status: 'ready' as const,
    featured: true,
  },
  {
    title: 'AI Code Assistant',
    description: 'Specialized AI assistant for code with explain, improve, fix, and generate modes. Includes syntax highlighting and code examples.',
    href: '/examples/ai-code-assistant',
    icon: Code2,
    tags: ['AI', 'Code', 'Programming', 'LLM', 'RTL'],
    status: 'ready' as const,
    featured: true,
  },
  {
    title: 'Document Q&A',
    description: 'AI-powered document analysis with question answering, source citations, and document management. Perfect for knowledge bases.',
    href: '/examples/ai-document-qa',
    icon: BookOpen,
    tags: ['AI', 'Documents', 'Q&A', 'Search', 'LLM', 'RTL'],
    status: 'ready' as const,
    featured: true,
  },
  {
    title: 'Multi-Agent Chat',
    description: 'Advanced multi-agent system with specialized AI assistants (Code Expert, Creative Writer, Data Analyst) collaborating in conversations.',
    href: '/examples/ai-multi-agent',
    icon: Users,
    tags: ['AI', 'Multi-Agent', 'Collaboration', 'LLM', 'RTL'],
    status: 'ready' as const,
    featured: true,
  },
  {
    title: 'Basic Workflow',
    description: 'Simple workflow builder with drag-and-drop nodes and connections. Perfect starting point for understanding workflow automation.',
    href: '/examples/workflow-basic',
    icon: GitBranch,
    tags: ['Workflow', 'Drag & Drop', 'Automation', 'RTL'],
    status: 'ready' as const,
    featured: true,
  },
  {
    title: 'AI Workflow',
    description: 'AI-powered workflow builder with LLM integration, model selection, token tracking, and cost estimation. Build intelligent automation pipelines.',
    href: '/examples/ai-workflow',
    icon: Workflow,
    tags: ['Workflow', 'AI', 'LLM', 'Automation', 'Tokens', 'RTL'],
    status: 'ready' as const,
    featured: true,
  },
  {
    title: 'Analytics Dashboard',
    description: 'Real-time analytics with charts, metrics, and data visualization. Track user behavior and business KPIs with RTL-ready charts.',
    href: '/examples/analytics',
    icon: TrendingUp,
    tags: ['Analytics', 'Charts', 'Metrics', 'Data', 'RTL'],
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
            {isRTL ? 'أمثلة المكونات' : 'Component Examples'}
          </h1>
          <p className="text-xl text-muted-foreground">
            {isRTL
              ? 'أمثلة خفيفة توضح كيفية استخدام المكونات والأنماط مع بيانات تجريبية. مثالية للتعلم السريع ورؤية كيف تبدو الأشياء.'
              : 'Lightweight examples showing how to use components and patterns with mock data. Perfect for quick learning and seeing how things look.'}
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
              } ${example.featured ? 'border-primary/30 bg-primary/5' : ''}`}>
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

        {/* Link to Starters */}
        <div className="mt-12 max-w-3xl space-y-4">
          <Card className="border-primary/50 bg-primary/5">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="font-semibold">
                  {isRTL ? 'هل تبحث عن تطبيقات كاملة؟' : 'Looking for Complete Applications?'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {isRTL
                    ? 'تصفح نماذج البدء الجاهزة للإنتاج - تطبيقات كاملة مع مصادقة، قاعدة بيانات، وكل ما تحتاجه للبدء.'
                    : 'Browse production-ready starters - complete applications with authentication, database, and everything you need to get started.'}
                </p>
                <Link href="/starters">
                  <Badge className="cursor-pointer hover:bg-primary/90">
                    {isRTL ? 'عرض النماذج الجاهزة →' : 'View Production Starters →'}
                  </Badge>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/50">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="font-semibold">
                  {isRTL ? 'هل تبحث عن المكونات الفردية؟' : 'Looking for Individual Components?'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {isRTL
                    ? 'تصفح مكتبة المكونات الكاملة لدينا التي تحتوي على 64 مكوناً موثقاً بالكامل مع أمثلة حية وإرشادات إمكانية الوصول.'
                    : 'Browse our complete component library with 64 fully documented components (including 10 experimental AI/LLM components) with live examples and accessibility guidelines.'}
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
