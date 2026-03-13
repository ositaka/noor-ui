'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Carousel } from '@/components/ui/carousel'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { Slideshow, Star, Quotes, Package, Truck, MapPin, ShoppingCart } from '@phosphor-icons/react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

// ---------------------------------------------------------------------------
// Sample data
// ---------------------------------------------------------------------------

interface FeatureSlide {
  title: string
  titleAr: string
  description: string
  descriptionAr: string
  icon: React.ReactNode
  color: string
}

const featureSlides: FeatureSlide[] = [
  {
    title: 'RTL-First Design',
    titleAr: 'تصميم RTL أولاً',
    description: 'Every component is built with right-to-left support from the ground up, not as an afterthought.',
    descriptionAr: 'كل مكوّن مبني مع دعم الاتجاه من اليمين لليسار من الأساس، وليس كإضافة لاحقة.',
    icon: <Slideshow className="h-8 w-8" weight="duotone" />,
    color: 'bg-primary/10 text-primary',
  },
  {
    title: 'Touch Gestures',
    titleAr: 'إيماءات اللمس',
    description: 'Swipe left and right with natural touch and mouse drag support, direction-aware.',
    descriptionAr: 'اسحب يميناً ويساراً مع دعم طبيعي للمس وسحب الماوس، مع مراعاة الاتجاه.',
    icon: <Star className="h-8 w-8" weight="duotone" />,
    color: 'bg-warning/10 text-warning',
  },
  {
    title: 'Keyboard Accessible',
    titleAr: 'إمكانية الوصول بلوحة المفاتيح',
    description: 'Full keyboard navigation with arrow keys that respect the current text direction.',
    descriptionAr: 'تنقل كامل بلوحة المفاتيح مع مفاتيح الأسهم التي تحترم اتجاه النص الحالي.',
    icon: <Package className="h-8 w-8" weight="duotone" />,
    color: 'bg-success/10 text-success',
  },
  {
    title: 'Auto-Play',
    titleAr: 'التشغيل التلقائي',
    description: 'Automatically cycle through slides with pause on hover and focus for accessibility.',
    descriptionAr: 'التنقل التلقائي بين الشرائح مع التوقف عند التمرير والتركيز لإمكانية الوصول.',
    icon: <Truck className="h-8 w-8" weight="duotone" />,
    color: 'bg-info/10 text-info',
  },
]

interface TestimonialSlide {
  quote: string
  quoteAr: string
  author: string
  authorAr: string
  role: string
  roleAr: string
}

const testimonials: TestimonialSlide[] = [
  {
    quote: 'Noor UI saved us weeks of development time on our government portal project. The RTL support is flawless — we didn\'t have to write a single directional override. Our Arabic-speaking users finally get the same polished experience as everyone else.',
    quoteAr: 'وفّر لنا Noor UI أسابيع من وقت التطوير في مشروع البوابة الحكومية. دعم RTL لا تشوبه شائبة — لم نحتج لكتابة أي تجاوز اتجاهي واحد. مستخدمونا الناطقون بالعربية يحصلون أخيراً على نفس التجربة المصقولة.',
    author: 'Ahmed Al-Rashid',
    authorAr: 'أحمد الراشد',
    role: 'Senior Frontend Engineer, Dubai Smart Gov',
    roleAr: 'مهندس واجهات أمامية أول، حكومة دبي الذكية',
  },
  {
    quote: 'We evaluated five component libraries before choosing Noor UI. It\'s the only one that treats Arabic as a first-class citizen — the calendar, number formatting, and even the gesture directions just work. Our designers stopped filing RTL bugs entirely.',
    quoteAr: 'قيّمنا خمس مكتبات مكوّنات قبل اختيار Noor UI. إنها الوحيدة التي تعامل العربية كمواطن درجة أولى — التقويم وتنسيق الأرقام وحتى اتجاهات الإيماءات تعمل مباشرة. مصممونا توقفوا عن الإبلاغ عن أخطاء RTL تماماً.',
    author: 'Fatima Hassan',
    authorAr: 'فاطمة حسن',
    role: 'Product Designer, Careem',
    roleAr: 'مصممة منتجات، كريم',
  },
  {
    quote: 'The swipe carousel and gesture hooks are game changers for mobile-first apps in the MENA region. We integrated the carousel into our hotel booking flow and saw a 23% increase in photo gallery engagement. The reduced-motion support was a nice bonus for accessibility.',
    quoteAr: 'العرض الدوّار وخطافات الإيماءات غيّرا قواعد اللعبة لتطبيقات الموبايل أولاً في منطقة الشرق الأوسط. دمجنا العرض الدوّار في تدفق حجز الفنادق وشهدنا زيادة ٢٣٪ في تفاعل معرض الصور.',
    author: 'Omar Khalid',
    authorAr: 'عمر خالد',
    role: 'Mobile Lead, Almosafer',
    roleAr: 'رئيس فريق الموبايل، المسافر',
  },
]

interface ProductSlide {
  name: string
  nameAr: string
  price: string
  priceAr: string
  icon: React.ReactNode
}

const products: ProductSlide[] = [
  { name: 'Wireless Headphones', nameAr: 'سماعات لاسلكية', price: '$129', priceAr: '٤٨٤ ر.س', icon: <Star className="h-10 w-10" weight="duotone" /> },
  { name: 'Smart Watch', nameAr: 'ساعة ذكية', price: '$249', priceAr: '٩٣٤ ر.س', icon: <MapPin className="h-10 w-10" weight="duotone" /> },
  { name: 'Laptop Stand', nameAr: 'حامل لابتوب', price: '$79', priceAr: '٢٩٦ ر.س', icon: <Package className="h-10 w-10" weight="duotone" /> },
  { name: 'USB-C Hub', nameAr: 'موزّع USB-C', price: '$59', priceAr: '٢٢١ ر.س', icon: <ShoppingCart className="h-10 w-10" weight="duotone" /> },
  { name: 'Mechanical Keyboard', nameAr: 'لوحة مفاتيح ميكانيكية', price: '$159', priceAr: '٥٩٦ ر.س', icon: <Truck className="h-10 w-10" weight="duotone" /> },
]

// ---------------------------------------------------------------------------
// Props definitions
// ---------------------------------------------------------------------------

const getCarouselProps = (t: typeof content.en | typeof content.ar): PropDefinition[] => [
  {
    name: 'items',
    type: 'T[]',
    required: true,
    description: t.carouselComponent.props.items,
  },
  {
    name: 'renderItem',
    type: '(item: T, index: number) => ReactNode',
    required: true,
    description: t.carouselComponent.props.renderItem,
  },
  {
    name: 'autoPlay',
    type: 'number | false',
    default: 'false',
    description: t.carouselComponent.props.autoPlay,
  },
  {
    name: 'showDots',
    type: 'boolean',
    default: 'true',
    description: t.carouselComponent.props.showDots,
  },
  {
    name: 'showArrows',
    type: 'boolean',
    default: 'true',
    description: t.carouselComponent.props.showArrows,
  },
  {
    name: 'loop',
    type: 'boolean',
    default: 'true',
    description: t.carouselComponent.props.loop,
  },
  {
    name: 'className',
    type: 'string',
    description: t.carouselComponent.props.className,
  },
  {
    name: 'slideClassName',
    type: 'string',
    description: t.carouselComponent.props.slideClassName,
  },
  {
    name: 'dotSize',
    type: "'sm' | 'lg'",
    default: "'sm'",
    description: t.carouselComponent.props.dotSize,
  },
]

// ---------------------------------------------------------------------------
// Code snippets
// ---------------------------------------------------------------------------

const installCode = `npm install noorui-rtl`

const basicUsageCode = `import { Carousel } from 'noorui-rtl'

const slides = [
  { title: "Slide 1", image: "/img1.jpg" },
  { title: "Slide 2", image: "/img2.jpg" },
  { title: "Slide 3", image: "/img3.jpg" },
]

<Carousel
  items={slides}
  renderItem={(slide) => (
    <div className="p-8 text-center">
      <h3>{slide.title}</h3>
    </div>
  )}
/>`

const autoPlayCode = `<Carousel
  items={slides}
  renderItem={(slide) => <SlideCard {...slide} />}
  autoPlay={4000}
/>`

const dotsOnlyCode = `<Carousel
  items={slides}
  renderItem={(slide) => <SlideCard {...slide} />}
  showArrows={false}
  dotSize="lg"
/>`

const customContentCode = `<Carousel
  items={testimonials}
  renderItem={(testimonial) => (
    <div className="p-8 text-center">
      <blockquote className="text-lg italic">
        "{testimonial.quote}"
      </blockquote>
      <p className="mt-4 font-semibold">{testimonial.author}</p>
      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
    </div>
  )}
  showArrows={false}
  autoPlay={5000}
/>`

const noLoopCode = `<Carousel
  items={products}
  renderItem={(product) => <ProductCard {...product} />}
  loop={false}
/>`

const typeCode = `interface CarouselProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  autoPlay?: number | false
  showDots?: boolean
  showArrows?: boolean
  loop?: boolean
  'aria-label'?: string
  className?: string
  slideClassName?: string
}`

// ---------------------------------------------------------------------------
// Reusable slide renderers
// ---------------------------------------------------------------------------

function FeatureSlideCard({ slide, isRTL }: { slide: FeatureSlide; isRTL: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[200px]">
      <div className={`p-4 rounded-xl mb-4 ${slide.color}`} aria-hidden="true">
        {slide.icon}
      </div>
      <h3 className="text-xl font-bold mb-2">
        {isRTL ? slide.titleAr : slide.title}
      </h3>
      <p className="text-muted-foreground text-center max-w-md">
        {isRTL ? slide.descriptionAr : slide.description}
      </p>
    </div>
  )
}

function TestimonialCard({ item, isRTL }: { item: TestimonialSlide; isRTL: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[200px]">
      <Quotes className="h-8 w-8 text-primary/30 mb-4" weight="fill" aria-hidden="true" />
      <blockquote className="text-lg italic text-center max-w-lg mb-4">
        &ldquo;{isRTL ? item.quoteAr : item.quote}&rdquo;
      </blockquote>
      <p className="font-semibold">{isRTL ? item.authorAr : item.author}</p>
      <p className="text-sm text-muted-foreground">{isRTL ? item.roleAr : item.role}</p>
    </div>
  )
}

function ProductCard({ item, isRTL }: { item: ProductSlide; isRTL: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[200px]">
      <div className="p-4 bg-muted rounded-xl mb-4 text-foreground" aria-hidden="true">
        {item.icon}
      </div>
      <h3 className="text-lg font-semibold mb-1">{isRTL ? item.nameAr : item.name}</h3>
      <p className="text-xl font-bold text-primary">{isRTL ? item.priceAr : item.price}</p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function CarouselPage() {
  const { locale } = useDirection()
  const t = content[locale]
  const isRTL = locale === 'ar'
  const carouselProps = getCarouselProps(t)

  return (
    <div className="min-h-screen">
      <div className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-12">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {t.common.home}
              </Link>
            </li>
            <li><span aria-hidden="true">/</span></li>
            <li>
              <Link href="/components" className="hover:text-foreground transition-colors">
                {t.nav.components}
              </Link>
            </li>
            <li><span aria-hidden="true">/</span></li>
            <li className="text-foreground font-medium" aria-current="page">{t.carouselComponent.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-4 bg-primary/10 rounded-xl">
              <Slideshow className="h-10 w-10 text-primary" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold tracking-tight">{t.carouselComponent.title}</h1>
                <Badge variant="secondary">{t.carouselComponent.badge}</Badge>
              </div>
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.carouselComponent.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.carouselComponent.preview}</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo className="block">
              <div className="w-full max-w-2xl mx-auto">
                <Carousel
                  items={featureSlides}
                  renderItem={(slide) => <FeatureSlideCard slide={slide} isRTL={isRTL} />}
                  aria-label={t.carouselComponent.ariaLabels.preview}
                />
              </div>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.carouselComponent.installation}</h2>
          <CodeBlock code={installCode} language="bash" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.carouselComponent.usage}</h2>
          <CodeBlock code={basicUsageCode} language="tsx" />
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">TypeScript</h3>
            <CodeBlock code={typeCode} language="typescript" collapsible />
          </div>
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.carouselComponent.examples.title}</h2>

          <div className="space-y-12">
            {/* Basic Carousel */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.carouselComponent.examples.basic}</h3>
              <p className="text-muted-foreground mb-4">{t.carouselComponent.examples.basicDesc}</p>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-2xl mx-auto">
                    <Carousel
                      items={featureSlides}
                      renderItem={(slide) => <FeatureSlideCard slide={slide} isRTL={isRTL} />}
                      aria-label={t.carouselComponent.ariaLabels.basic}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={basicUsageCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Auto-Play */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.carouselComponent.examples.autoPlay}</h3>
              <p className="text-muted-foreground mb-4">{t.carouselComponent.examples.autoPlayDesc}</p>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-2xl mx-auto">
                    <Carousel
                      items={featureSlides}
                      renderItem={(slide) => <FeatureSlideCard slide={slide} isRTL={isRTL} />}
                      autoPlay={4000}
                      aria-label={t.carouselComponent.ariaLabels.autoPlay}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={autoPlayCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Dots Only */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.carouselComponent.examples.withoutArrows}</h3>
              <p className="text-muted-foreground mb-4">{t.carouselComponent.examples.withoutArrowsDesc}</p>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-2xl mx-auto">
                    <Carousel
                      items={featureSlides}
                      renderItem={(slide) => <FeatureSlideCard slide={slide} isRTL={isRTL} />}
                      showArrows={false}
                      dotSize="lg"
                      aria-label={t.carouselComponent.ariaLabels.dotsOnly}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={dotsOnlyCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Custom Content — Testimonials */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.carouselComponent.examples.customContent}</h3>
              <p className="text-muted-foreground mb-4">{t.carouselComponent.examples.customContentDesc}</p>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-2xl mx-auto">
                    <Carousel
                      items={testimonials}
                      renderItem={(item) => <TestimonialCard item={item} isRTL={isRTL} />}
                      showArrows={false}
                      autoPlay={5000}
                      aria-label={t.carouselComponent.ariaLabels.custom}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={customContentCode} language="tsx" collapsible />
              </div>
            </div>

            {/* No Loop — Products */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.carouselComponent.examples.noLoop}</h3>
              <p className="text-muted-foreground mb-4">{t.carouselComponent.examples.noLoopDesc}</p>
              <Card>
                <CardContent className="p-6">
                  <div className="max-w-2xl mx-auto">
                    <Carousel
                      items={products}
                      renderItem={(item) => <ProductCard item={item} isRTL={isRTL} />}
                      loop={false}
                      aria-label={t.carouselComponent.ariaLabels.noLoop}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={noLoopCode} language="tsx" collapsible />
              </div>
            </div>
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.carouselComponent.propsSection.title}</h2>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.carouselComponent.propsSection.carouselProps}</h3>
            <PropsTable props={carouselProps} />
          </div>
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.carouselComponent.accessibility.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t.carouselComponent.accessibility.region}</h3>
                <p className="text-muted-foreground">{t.carouselComponent.accessibility.regionDesc}</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.carouselComponent.accessibility.keyboard}</h3>
                <p className="text-muted-foreground">{t.carouselComponent.accessibility.keyboardDesc}</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.carouselComponent.accessibility.livePause}</h3>
                <p className="text-muted-foreground">{t.carouselComponent.accessibility.livePauseDesc}</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">{t.carouselComponent.accessibility.dots}</h3>
                <p className="text-muted-foreground">{t.carouselComponent.accessibility.dotsDesc}</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.carouselComponent.rtl.title}</h2>
          <Card>
            <CardContent className="p-6 space-y-6">
              <p className="text-muted-foreground">{t.carouselComponent.rtl.description}</p>

              <div className="grid gap-8 md:grid-cols-2 mt-8">
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm">{t.carouselComponent.rtl.ltr}</h3>
                  <div dir="ltr" lang="en" className="border rounded-lg p-4">
                    <Carousel
                      items={featureSlides}
                      renderItem={(slide) => <FeatureSlideCard slide={slide} isRTL={false} />}
                      aria-label={t.carouselComponent.ariaLabels.rtlLtr}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm">{t.carouselComponent.rtl.rtlLabel}</h3>
                  <div dir="rtl" lang="ar" className="border rounded-lg p-4">
                    <Carousel
                      items={featureSlides}
                      renderItem={(slide) => <FeatureSlideCard slide={slide} isRTL={true} />}
                      aria-label={t.carouselComponent.ariaLabels.rtlAr}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3 mt-4">
                <h3 className="font-semibold">{t.carouselComponent.rtl.features}</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{t.carouselComponent.rtl.swipeFlips}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{t.carouselComponent.rtl.arrowsFlip}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{t.carouselComponent.rtl.animationFlips}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{t.carouselComponent.rtl.keyboardFlips}</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Use Cases */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.carouselComponent.useCases.title}</h2>
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>{t.carouselComponent.useCases.imageGallery}:</strong> {t.carouselComponent.useCases.imageGalleryDesc}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>{t.carouselComponent.useCases.testimonials}:</strong> {t.carouselComponent.useCases.testimonialsDesc}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>{t.carouselComponent.useCases.onboarding}:</strong> {t.carouselComponent.useCases.onboardingDesc}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>{t.carouselComponent.useCases.categories}:</strong> {t.carouselComponent.useCases.categoriesDesc}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Related Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.carouselComponent.related.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/components/tabs">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.carouselComponent.related.tabs}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t.carouselComponent.related.tabsDesc}</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/card">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.carouselComponent.related.card}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t.carouselComponent.related.cardDesc}</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/components/pagination">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{t.carouselComponent.related.pagination}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t.carouselComponent.related.paginationDesc}</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
