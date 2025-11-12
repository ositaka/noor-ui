'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Home,
  ArrowLeft,
  ExternalLink,
  Calendar,
  Users,
  Code,
  Palette,
  CheckCircle2,
  Star,
  Globe,
  Github,
  Award,
  TrendingUp,
  Target,
  Layers,
} from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'

interface Project {
  id: string
  title: string
  titleAr: string
  shortDescription: string
  shortDescriptionAr: string
  fullDescription: string
  fullDescriptionAr: string
  challenge: string
  challengeAr: string
  solution: string
  solutionAr: string
  results: string[]
  resultsAr: string[]
  category: 'web' | 'mobile' | 'design' | 'branding'
  year: number
  duration: string
  durationAr: string
  client: string
  clientAr: string
  clientIndustry: string
  clientIndustryAr: string
  imageUrl: string
  images: string[]
  technologies: string[]
  technologiesAr: string[]
  tags: string[]
  tagsAr: string[]
  projectUrl?: string
  githubUrl?: string
  testimonial?: {
    text: string
    textAr: string
    author: string
    authorAr: string
    position: string
    positionAr: string
  }
}

// Mock data - in real app, this would be fetched based on ID
const getAllProjects = (): Project[] => {
  return [
    {
      id: 'project-1',
      title: 'E-Commerce Platform Redesign',
      titleAr: 'إعادة تصميم منصة التجارة الإلكترونية',
      shortDescription: 'Complete redesign of a major e-commerce platform',
      shortDescriptionAr: 'إعادة تصميم كاملة لمنصة تجارة إلكترونية رئيسية',
      fullDescription:
        'Led the complete redesign of a major e-commerce platform serving over 500,000 monthly users. The project involved extensive user research, prototyping, and iterative design improvements to enhance the shopping experience and increase conversion rates. We implemented a modern design system, improved mobile responsiveness, and streamlined the checkout process.',
      fullDescriptionAr:
        'قادت إعادة التصميم الكاملة لمنصة تجارة إلكترونية رئيسية تخدم أكثر من 500،000 مستخدم شهرياً. شمل المشروع بحثاً مكثفاً للمستخدمين، وإنشاء نماذج أولية، وتحسينات تصميم متكررة لتعزيز تجربة التسوق وزيادة معدلات التحويل. قمنا بتطبيق نظام تصميم حديث، وتحسين الاستجابة للموبايل، وتبسيط عملية الدفع.',
      challenge:
        'The existing platform had an outdated interface, poor mobile experience, and a complex checkout process that resulted in high cart abandonment rates (78%). Users struggled to find products and complete purchases efficiently.',
      challengeAr:
        'كانت المنصة الحالية تحتوي على واجهة قديمة، وتجربة موبايل ضعيفة، وعملية دفع معقدة أدت إلى معدلات عالية من التخلي عن سلة التسوق (78٪). واجه المستخدمون صعوبة في العثور على المنتجات وإتمام عمليات الشراء بكفاءة.',
      solution:
        'We conducted extensive user research, created detailed user personas, and redesigned the entire user journey. Key improvements included: simplified navigation, improved search and filtering, one-page checkout, mobile-first responsive design, and implementation of a comprehensive design system using React and Next.js.',
      solutionAr:
        'أجرينا بحثاً مكثفاً للمستخدمين، وأنشأنا شخصيات مستخدم مفصلة، وأعدنا تصميم رحلة المستخدم بالكامل. شملت التحسينات الرئيسية: تنقل مبسط، وبحث وتصفية محسّنة، ودفع من صفحة واحدة، وتصميم متجاوب يعطي الأولوية للموبايل، وتنفيذ نظام تصميم شامل باستخدام React و Next.js.',
      results: [
        '45% increase in conversion rate',
        '62% reduction in cart abandonment',
        '3.2x improvement in mobile engagement',
        '4.8/5.0 average user satisfaction score',
        '28% increase in average order value',
      ],
      resultsAr: [
        'زيادة بنسبة 45٪ في معدل التحويل',
        'انخفاض بنسبة 62٪ في التخلي عن سلة التسوق',
        'تحسين بمقدار 3.2 مرة في تفاعل الموبايل',
        'متوسط درجة رضا المستخدم 4.8 / 5.0',
        'زيادة بنسبة 28٪ في متوسط قيمة الطلب',
      ],
      category: 'web',
      year: 2024,
      duration: '6 months',
      durationAr: '6 أشهر',
      client: 'RetailCo',
      clientAr: 'ريتيل كو',
      clientIndustry: 'E-Commerce / Retail',
      clientIndustryAr: 'التجارة الإلكترونية / التجزئة',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      ],
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'PostgreSQL'],
      technologiesAr: ['ريأكت', 'نكست.جي إس', 'تايب سكريبت', 'تيل ويند CSS', 'سترايب', 'PostgreSQL'],
      tags: ['UI/UX', 'React', 'Next.js', 'E-Commerce', 'Design System'],
      tagsAr: ['واجهة المستخدم', 'ريأكت', 'نكست.جي إس', 'تجارة إلكترونية', 'نظام التصميم'],
      projectUrl: 'https://example.com',
      testimonial: {
        text: "The redesign exceeded our expectations. The new platform is not only beautiful but also significantly improved our conversion rates. Ahmed's attention to detail and understanding of e-commerce best practices made this project a huge success.",
        textAr:
          'تجاوزت إعادة التصميم توقعاتنا. المنصة الجديدة ليست جميلة فحسب، بل حسّنت أيضاً معدلات التحويل لدينا بشكل كبير. اهتمام أحمد بالتفاصيل وفهمه لأفضل ممارسات التجارة الإلكترونية جعل هذا المشروع نجاحاً كبيراً.',
        author: 'Sarah Johnson',
        authorAr: 'سارة جونسون',
        position: 'CEO, RetailCo',
        positionAr: 'الرئيس التنفيذي، ريتيل كو',
      },
    },
    // Add more projects as needed (shortened for brevity)
  ]
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'

  const projects = getAllProjects()
  const project = projects.find((p) => p.id === params.id) || projects[0]

  const relatedProjects = projects.filter((p) => p.id !== project.id).slice(0, 3)

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
              <Link href="/examples/portfolio">
                <ArrowLeft className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                {isRTL ? 'العودة للمعرض' : 'Back to Portfolio'}
              </Link>
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
              <li>
                <Link href="/examples/portfolio" className="hover:text-foreground transition-colors">
                  {isRTL ? 'المعرض' : 'Portfolio'}
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground font-medium">
                {isRTL ? project.titleAr : project.title}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="container py-8">
        {/* Hero Image */}
        <div className="mb-8">
          <div
            className="w-full h-[400px] md:h-[600px] rounded-2xl bg-cover bg-center"
            style={{ backgroundImage: `url(${project.imageUrl})` }}
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Header */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant="secondary">{project.category}</Badge>
                <Badge variant="outline">{project.year}</Badge>
                {project.projectUrl && (
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={project.projectUrl} target="_blank">
                      <Globe className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                      {isRTL ? 'زيارة الموقع' : 'Visit Site'}
                    </Link>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={project.githubUrl} target="_blank">
                      <Github className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                      {isRTL ? 'كود المصدر' : 'Source Code'}
                    </Link>
                  </Button>
                )}
              </div>

              <h1 className="text-4xl font-bold tracking-tight mb-4">
                {isRTL ? project.titleAr : project.title}
              </h1>
              <p className="text-xl text-muted-foreground">
                {isRTL ? project.shortDescriptionAr : project.shortDescription}
              </p>
            </div>

            <Separator />

            {/* Overview */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
                <Layers className="h-6 w-6" />
                {isRTL ? 'نظرة عامة' : 'Overview'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isRTL ? project.fullDescriptionAr : project.fullDescription}
              </p>
            </div>

            {/* Challenge & Solution */}
            <Tabs defaultValue="challenge" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="challenge">
                  <Target className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                  {isRTL ? 'التحدي' : 'Challenge'}
                </TabsTrigger>
                <TabsTrigger value="solution">
                  <CheckCircle2 className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                  {isRTL ? 'الحل' : 'Solution'}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="challenge" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{isRTL ? 'التحدي' : 'The Challenge'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {isRTL ? project.challengeAr : project.challenge}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="solution" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{isRTL ? 'الحل' : 'The Solution'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {isRTL ? project.solutionAr : project.solution}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Results */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
                <TrendingUp className="h-6 w-6" />
                {isRTL ? 'النتائج' : 'Results & Impact'}
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    {(isRTL ? project.resultsAr : project.results).map((result, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{result}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Gallery */}
            {project.images && project.images.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-4">
                  {isRTL ? 'معرض الصور' : 'Project Gallery'}
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {project.images.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-video rounded-lg bg-cover bg-center"
                      style={{ backgroundImage: `url(${image})` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Testimonial */}
            {project.testimonial && (
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Star className="h-8 w-8 text-primary shrink-0" />
                    <div>
                      <p className="text-lg italic mb-4">
                        &quot;{isRTL ? project.testimonial.textAr : project.testimonial.text}&quot;
                      </p>
                      <div>
                        <p className="font-semibold">
                          {isRTL ? project.testimonial.authorAr : project.testimonial.author}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {isRTL ? project.testimonial.positionAr : project.testimonial.position}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? 'معلومات المشروع' : 'Project Info'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {isRTL ? 'العميل' : 'Client'}
                  </p>
                  <p className="font-medium">{isRTL ? project.clientAr : project.client}</p>
                  <p className="text-sm text-muted-foreground">
                    {isRTL ? project.clientIndustryAr : project.clientIndustry}
                  </p>
                </div>

                <Separator />

                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {isRTL ? 'المدة' : 'Duration'}
                  </p>
                  <p className="font-medium">{isRTL ? project.durationAr : project.duration}</p>
                </div>

                <Separator />

                <div>
                  <p className="text-sm text-muted-foreground mb-1">{isRTL ? 'السنة' : 'Year'}</p>
                  <p className="font-medium">{project.year}</p>
                </div>

                <Separator />

                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {isRTL ? 'التقنيات' : 'Technologies'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(isRTL ? project.technologiesAr : project.technologies).map((tech, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">
                  {isRTL ? 'هل لديك مشروع مماثل؟' : 'Have a Similar Project?'}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {isRTL
                    ? 'دعنا نتحدث عن كيف يمكنني مساعدتك في تحقيق أهدافك.'
                    : "Let's talk about how I can help you achieve your goals."}
                </p>
                <Button className="w-full" asChild>
                  <Link href="/examples/portfolio#contact">
                    {isRTL ? 'تواصل معي' : 'Get In Touch'}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="mt-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight mb-2">
                {isRTL ? 'مشاريع ذات صلة' : 'Related Projects'}
              </h2>
              <p className="text-muted-foreground">
                {isRTL ? 'مشاريع أخرى قد تعجبك' : 'Other projects you might like'}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {relatedProjects.map((relatedProject) => (
                <Link key={relatedProject.id} href={`/examples/portfolio/${relatedProject.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <div
                      className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${relatedProject.imageUrl})` }}
                    />
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {isRTL ? relatedProject.titleAr : relatedProject.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {isRTL ? relatedProject.shortDescriptionAr : relatedProject.shortDescription}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ')
}
