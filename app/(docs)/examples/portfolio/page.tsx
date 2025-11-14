'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Home,
  Briefcase,
  Code,
  Palette,
  Smartphone,
  Globe,
  Mail,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  Calendar,
  Award,
  Users,
  ArrowRight,
} from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

interface Project {
  id: string
  title: string
  titleAr: string
  description: string
  descriptionAr: string
  category: 'web' | 'mobile' | 'design' | 'branding'
  year: number
  client: string
  clientAr: string
  imageUrl: string
  tags: string[]
  tagsAr: string[]
  featured: boolean
}

// Mock projects data
const generateProjects = (): Project[] => {
  const projects: Project[] = [
    {
      id: 'project-1',
      title: 'E-Commerce Platform Redesign',
      titleAr: 'إعادة تصميم منصة التجارة الإلكترونية',
      description: 'Complete redesign of a major e-commerce platform with focus on UX and conversion optimization',
      descriptionAr: 'إعادة تصميم كاملة لمنصة تجارة إلكترونية رئيسية مع التركيز على تجربة المستخدم وتحسين التحويل',
      category: 'web',
      year: 2024,
      client: 'RetailCo',
      clientAr: 'ريتيل كو',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      tags: ['UI/UX', 'React', 'Next.js', 'E-Commerce'],
      tagsAr: ['واجهة المستخدم', 'ريأكت', 'نكست.جي إس', 'تجارة إلكترونية'],
      featured: true,
    },
    {
      id: 'project-2',
      title: 'Financial Dashboard App',
      titleAr: 'تطبيق لوحة المعلومات المالية',
      description: 'Mobile-first dashboard for personal finance management with real-time analytics',
      descriptionAr: 'لوحة معلومات متوافقة مع الجوال لإدارة الشؤون المالية الشخصية مع تحليلات في الوقت الفعلي',
      category: 'mobile',
      year: 2024,
      client: 'FinTech Solutions',
      clientAr: 'حلول التكنولوجيا المالية',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      tags: ['Mobile', 'React Native', 'Finance', 'Analytics'],
      tagsAr: ['موبايل', 'ريأكت نيتيف', 'مالية', 'تحليلات'],
      featured: true,
    },
    {
      id: 'project-3',
      title: 'Brand Identity for Startup',
      titleAr: 'هوية العلامة التجارية للشركة الناشئة',
      description: 'Complete brand identity including logo, color palette, and design system',
      descriptionAr: 'هوية علامة تجارية كاملة تشمل الشعار ولوحة الألوان ونظام التصميم',
      category: 'branding',
      year: 2024,
      client: 'TechStart',
      clientAr: 'تيك ستارت',
      imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
      tags: ['Branding', 'Logo Design', 'Design System'],
      tagsAr: ['العلامة التجارية', 'تصميم الشعار', 'نظام التصميم'],
      featured: false,
    },
    {
      id: 'project-4',
      title: 'Healthcare Portal',
      titleAr: 'بوابة الرعاية الصحية',
      description: 'Patient management system with appointment scheduling and telemedicine features',
      descriptionAr: 'نظام إدارة المرضى مع جدولة المواعيد وميزات الطب عن بعد',
      category: 'web',
      year: 2023,
      client: 'HealthCare Plus',
      clientAr: 'هيلث كير بلس',
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
      tags: ['Healthcare', 'Web App', 'Telemedicine'],
      tagsAr: ['رعاية صحية', 'تطبيق ويب', 'طب عن بعد'],
      featured: true,
    },
    {
      id: 'project-5',
      title: 'Food Delivery App',
      titleAr: 'تطبيق توصيل الطعام',
      description: 'Full-stack mobile app for restaurant ordering and delivery tracking',
      descriptionAr: 'تطبيق موبايل متكامل لطلب الطعام من المطاعم وتتبع التوصيل',
      category: 'mobile',
      year: 2023,
      client: 'QuickBite',
      clientAr: 'كويك بايت',
      imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop',
      tags: ['Mobile', 'Food Tech', 'Real-time'],
      tagsAr: ['موبايل', 'تكنولوجيا الطعام', 'الوقت الفعلي'],
      featured: false,
    },
    {
      id: 'project-6',
      title: 'UI/UX for SaaS Platform',
      titleAr: 'واجهة المستخدم لمنصة SaaS',
      description: 'Modern interface design for B2B project management software',
      descriptionAr: 'تصميم واجهة عصرية لبرنامج إدارة المشاريع للشركات',
      category: 'design',
      year: 2023,
      client: 'ProjectFlow',
      clientAr: 'بروجكت فلو',
      imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
      tags: ['UI/UX', 'SaaS', 'B2B'],
      tagsAr: ['واجهة المستخدم', 'ساس', 'شركات'],
      featured: false,
    },
    {
      id: 'project-7',
      title: 'Real Estate Website',
      titleAr: 'موقع العقارات',
      description: 'Property listing platform with virtual tours and 3D visualization',
      descriptionAr: 'منصة قوائم العقارات مع جولات افتراضية وتصور ثلاثي الأبعاد',
      category: 'web',
      year: 2023,
      client: 'RealEstate Pro',
      clientAr: 'ريل استيت برو',
      imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
      tags: ['Real Estate', '3D', 'Virtual Tour'],
      tagsAr: ['عقارات', 'ثلاثي الأبعاد', 'جولة افتراضية'],
      featured: true,
    },
    {
      id: 'project-8',
      title: 'Fitness Tracking App',
      titleAr: 'تطبيق تتبع اللياقة',
      description: 'Comprehensive fitness app with workout plans and nutrition tracking',
      descriptionAr: 'تطبيق لياقة شامل مع خطط التمرين وتتبع التغذية',
      category: 'mobile',
      year: 2023,
      client: 'FitLife',
      clientAr: 'فيت لايف',
      imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
      tags: ['Health', 'Fitness', 'Mobile'],
      tagsAr: ['صحة', 'لياقة', 'موبايل'],
      featured: false,
    },
  ]

  return projects
}

export default function PortfolioPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all')
  const [searchQuery, setSearchQuery] = React.useState('')

  const projects = React.useMemo(() => generateProjects(), [])

  const filteredProjects = React.useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
      const matchesSearch =
        searchQuery === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.titleAr.includes(searchQuery)
      return matchesCategory && matchesSearch
    })
  }, [projects, selectedCategory, searchQuery])

  const featuredProjects = projects.filter((p) => p.featured)

  const stats = [
    { label: isRTL ? 'المشاريع المنجزة' : 'Projects Completed', value: '50+', icon: Briefcase },
    { label: isRTL ? 'العملاء السعداء' : 'Happy Clients', value: '30+', icon: Users },
    { label: isRTL ? 'سنوات الخبرة' : 'Years Experience', value: '8+', icon: Calendar },
    { label: isRTL ? 'الجوائز المكتسبة' : 'Awards Won', value: '12', icon: Award },
  ]

  const categories = [
    { value: 'all', label: isRTL ? 'الكل' : 'All', labelAr: 'الكل' },
    { value: 'web', label: isRTL ? 'الويب' : 'Web', labelAr: 'الويب' },
    { value: 'mobile', label: isRTL ? 'الموبايل' : 'Mobile', labelAr: 'الموبايل' },
    { value: 'design', label: isRTL ? 'التصميم' : 'Design', labelAr: 'التصميم' },
    { value: 'branding', label: isRTL ? 'العلامة التجارية' : 'Branding', labelAr: 'العلامة التجارية' },
  ]

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Home className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl hidden sm:inline">
                {isRTL ? 'أحمد الكريم' : 'Ahmed Al-Kareem'}
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/examples">{isRTL ? 'الأمثلة' : 'Examples'}</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="border-b bg-background">
        <div className="container py-3">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  {isRTL ? 'الرئيسية' : 'Home'}
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/examples" className="hover:text-foreground transition-colors">
                  {isRTL ? 'الأمثلة' : 'Examples'}
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground font-medium">
                {isRTL ? 'المعرض الشخصي' : 'Portfolio'}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="container py-8">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                {isRTL ? 'متاح للمشاريع الجديدة' : 'Available for New Projects'}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                {isRTL ? 'مصمم و مطور إبداعي' : 'Creative Designer & Developer'}
              </h1>
              <p className="text-xl text-muted-foreground mb-6 max-w-2xl">
                {isRTL
                  ? 'متخصص في إنشاء تجارب رقمية جميلة وعملية للويب والموبايل. أحول الأفكار إلى منتجات رقمية مذهلة.'
                  : 'Specializing in creating beautiful and functional digital experiences for web and mobile. I turn ideas into stunning digital products.'}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="lg" asChild>
                  <Link href="#contact">
                    {isRTL ? 'تواصل معي' : 'Get In Touch'}
                    <ArrowRight className={cn('h-4 w-4', isRTL ? 'me-2' : 'ms-2')} />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#projects">{isRTL ? 'عرض الأعمال' : 'View Work'}</Link>
                </Button>
              </div>

              <div className="flex items-center gap-4 mt-8">
                <Button variant="ghost" size="icon" asChild>
                  <Link href="https://github.com" target="_blank">
                    <Github className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="https://linkedin.com" target="_blank">
                    <Linkedin className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="https://twitter.com" target="_blank">
                    <Twitter className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-8 flex items-center justify-center">
                <div className="text-center">
                  <Palette className="h-24 w-24 mx-auto mb-4 text-primary" />
                  <p className="text-lg font-medium">
                    {isRTL ? 'التصميم يلتقي بالوظيفة' : 'Design Meets Function'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-16">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Projects */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              {isRTL ? 'المشاريع المميزة' : 'Featured Projects'}
            </h2>
            <p className="text-muted-foreground">
              {isRTL ? 'أحدث أعمالي والأكثر تأثيراً' : 'My latest and most impactful work'}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <Link key={project.id} href={`/examples/portfolio/${project.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div
                    className="h-64 bg-cover bg-center"
                    style={{ backgroundImage: `url(${project.imageUrl})` }}
                  >
                    <div className="h-full bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                      <Badge variant="secondary">{project.year}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl">
                        {isRTL ? project.titleAr : project.title}
                      </CardTitle>
                      <ExternalLink className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <CardDescription>
                      {isRTL ? project.descriptionAr : project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {(isRTL ? project.tagsAr : project.tags).slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* All Projects */}
        <section id="projects" className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              {isRTL ? 'جميع المشاريع' : 'All Projects'}
            </h2>
            <p className="text-muted-foreground">
              {isRTL ? 'استكشف محفظتي الكاملة' : 'Explore my complete portfolio'}
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <Input
                type="search"
                placeholder={isRTL ? 'ابحث في المشاريع...' : 'Search projects...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder={isRTL ? 'اختر الفئة' : 'Select category'} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <Link key={project.id} href={`/examples/portfolio/${project.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${project.imageUrl})` }}
                  />
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {project.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{project.year}</span>
                    </div>
                    <CardTitle className="text-lg">
                      {isRTL ? project.titleAr : project.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {isRTL ? project.descriptionAr : project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {(isRTL ? project.tagsAr : project.tags).slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {isRTL ? 'لم يتم العثور على مشاريع' : 'No projects found'}
              </p>
            </div>
          )}
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                {isRTL ? 'هل لديك مشروع؟' : "Have a Project in Mind?"}
              </CardTitle>
              <CardDescription>
                {isRTL
                  ? 'أود أن أسمع عن مشروعك. املأ النموذج أدناه وسأتواصل معك قريباً.'
                  : "I'd love to hear about your project. Fill out the form below and I'll get back to you soon."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">{isRTL ? 'الاسم' : 'Name'}</Label>
                    <Input id="name" placeholder={isRTL ? 'اسمك' : 'Your name'} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{isRTL ? 'البريد الإلكتروني' : 'Email'}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={isRTL ? 'بريدك الإلكتروني' : 'your@email.com'}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project-type">{isRTL ? 'نوع المشروع' : 'Project Type'}</Label>
                  <Select>
                    <SelectTrigger id="project-type">
                      <SelectValue
                        placeholder={isRTL ? 'اختر نوع المشروع' : 'Select project type'}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">{isRTL ? 'تطوير الويب' : 'Web Development'}</SelectItem>
                      <SelectItem value="mobile">{isRTL ? 'تطوير الموبايل' : 'Mobile Development'}</SelectItem>
                      <SelectItem value="design">{isRTL ? 'تصميم UI/UX' : 'UI/UX Design'}</SelectItem>
                      <SelectItem value="branding">{isRTL ? 'العلامة التجارية' : 'Branding'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{isRTL ? 'الرسالة' : 'Message'}</Label>
                  <Textarea
                    id="message"
                    placeholder={isRTL ? 'أخبرني عن مشروعك...' : 'Tell me about your project...'}
                    rows={6}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  <Mail className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                  {isRTL ? 'إرسال الرسالة' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ')
}
