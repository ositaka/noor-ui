'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ButtonArrow } from '@/components/ui/button-arrow'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/docs/code-block'
import { useDirection } from '@/components/providers/direction-provider'
import {
  ShoppingCart,
  Search,
  CreditCard,
  Package,
  Star,
  CheckCircle2,
  ExternalLink,
  ArrowRight
} from 'lucide-react'

export default function EcommercePage() {
  const { locale } = useDirection()

  const content = {
    en: {
      badges: {
        productionReady: 'Production Ready',
        noBackend: 'No Backend',
        bilingual: 'Bilingual',
      },
      title: 'E-commerce Starter',
      subtitle: 'A complete, production-ready online shop with shopping cart, product catalog, and checkout flow. Built with Noor UI components and localStorage - no backend required!',
      viewAllStarters: 'View All Starters',
      viewOnGitHub: 'View on GitHub',
      sections: {
        features: 'Features',
        techStack: 'Technology Stack',
        codeExamples: 'Code Examples',
        whatsIncluded: "What's Included",
        quickSetup: 'Quick Setup',
      },
      features: [
        {
          title: 'Shopping Cart',
          description: 'Full cart functionality with localStorage',
          items: ['Add/remove products', 'Update quantities', 'Persistent cart', 'Real-time totals']
        },
        {
          title: 'Product Catalog',
          description: 'Browse and filter products',
          items: ['Search functionality', 'Category filters', 'Product ratings', 'Sale badges']
        },
        {
          title: 'Product Details',
          description: 'Detailed product pages',
          items: ['High-res images', 'Full descriptions', 'Quantity selector', 'Stock status']
        },
        {
          title: 'Checkout Flow',
          description: 'Complete checkout process',
          items: ['Shipping form', 'Payment options', 'Order summary', 'Confirmation page']
        },
        {
          title: 'Product Reviews',
          description: 'Ratings and review counts',
          items: ['Star ratings', 'Review counts', 'Average scores', 'Visual indicators']
        },
      ],
      techStack: [
        { name: 'Next.js 14', description: 'App Router with Client Components' },
        { name: 'LocalStorage', description: 'Cart persistence without backend' },
        { name: 'React Context', description: 'Global cart state management' },
        { name: 'Noor UI', description: 'All shop components' },
        { name: 'TypeScript', description: 'Fully typed codebase' },
        { name: 'Tailwind CSS', description: 'Styling with RTL support' }
      ],
      codeExamples: {
        addToCart: {
          title: 'Adding Products to Cart',
          description: 'Simple one-line cart integration',
        },
        cartAPI: {
          title: 'Cart Hook API',
          description: 'Access cart state and methods',
        },
      },
      included: {
        pagesFeatures: 'Pages & Features',
        ecommerceFeatures: 'E-commerce Features',
        pages: [
          'Home page with featured products',
          'Products listing with search & filters',
          'Product detail pages',
          'Shopping cart with localStorage',
          'Checkout form and order confirmation',
        ],
        features: [
          '8 sample products with images',
          '5 product categories',
          'Product ratings and reviews',
          'Sale badges and discounts',
          'All bilingual (English/Arabic)',
        ],
      },
      setup: {
        title: 'Copy & Run',
        description: 'No backend setup required - just copy and start!',
      },
      cta: {
        title: 'Ready to build your online shop?',
        description: 'Copy the starter, customize products, and deploy. No backend needed to get started!',
      },
    },
    ar: {
      badges: {
        productionReady: 'جاهز للإنتاج',
        noBackend: 'بدون خادم',
        bilingual: 'ثنائي اللغة',
      },
      title: 'قالب التجارة الإلكترونية',
      subtitle: 'متجر إلكتروني كامل وجاهز للإنتاج مع سلة التسوق وكتالوج المنتجات وعملية الدفع. مبني باستخدام مكونات Noor UI وlocalStorage - لا يتطلب خادمًا!',
      viewAllStarters: 'عرض جميع القوالب',
      viewOnGitHub: 'عرض على GitHub',
      sections: {
        features: 'الميزات',
        techStack: 'التقنيات المستخدمة',
        codeExamples: 'أمثلة الكود',
        whatsIncluded: 'ما تم تضمينه',
        quickSetup: 'الإعداد السريع',
      },
      features: [
        {
          title: 'سلة التسوق',
          description: 'وظائف سلة كاملة مع localStorage',
          items: ['إضافة/إزالة المنتجات', 'تحديث الكميات', 'سلة دائمة', 'إجماليات فورية']
        },
        {
          title: 'كتالوج المنتجات',
          description: 'تصفح وتصنيف المنتجات',
          items: ['وظيفة البحث', 'فلاتر الفئات', 'تقييمات المنتجات', 'شارات التخفيضات']
        },
        {
          title: 'تفاصيل المنتج',
          description: 'صفحات تفاصيل المنتج',
          items: ['صور عالية الدقة', 'أوصاف كاملة', 'محدد الكمية', 'حالة المخزون']
        },
        {
          title: 'عملية الدفع',
          description: 'عملية دفع كاملة',
          items: ['نموذج الشحن', 'خيارات الدفع', 'ملخص الطلب', 'صفحة التأكيد']
        },
        {
          title: 'تقييمات المنتج',
          description: 'التقييمات وعدد المراجعات',
          items: ['تقييمات النجوم', 'عدد المراجعات', 'متوسط الدرجات', 'مؤشرات بصرية']
        },
      ],
      techStack: [
        { name: 'Next.js 14', description: 'App Router مع مكونات العميل' },
        { name: 'LocalStorage', description: 'استمرارية السلة بدون خادم' },
        { name: 'React Context', description: 'إدارة حالة السلة العامة' },
        { name: 'Noor UI', description: 'جميع مكونات المتجر' },
        { name: 'TypeScript', description: 'كود مكتوب بالكامل' },
        { name: 'Tailwind CSS', description: 'التنسيق مع دعم RTL' }
      ],
      codeExamples: {
        addToCart: {
          title: 'إضافة منتجات إلى السلة',
          description: 'تكامل السلة في سطر واحد',
        },
        cartAPI: {
          title: 'API خطاف السلة',
          description: 'الوصول إلى حالة السلة وطرقها',
        },
      },
      included: {
        pagesFeatures: 'الصفحات والميزات',
        ecommerceFeatures: 'ميزات التجارة الإلكترونية',
        pages: [
          'الصفحة الرئيسية مع المنتجات المميزة',
          'قائمة المنتجات مع البحث والفلاتر',
          'صفحات تفاصيل المنتج',
          'سلة التسوق مع localStorage',
          'نموذج الدفع وتأكيد الطلب',
        ],
        features: [
          '8 منتجات عينة مع صور',
          '5 فئات منتجات',
          'تقييمات ومراجعات المنتجات',
          'شارات التخفيضات',
          'جميعها ثنائية اللغة (إنجليزي/عربي)',
        ],
      },
      setup: {
        title: 'انسخ وشغّل',
        description: 'لا يتطلب إعداد خادم - فقط انسخ وابدأ!',
      },
      cta: {
        title: 'هل أنت مستعد لبناء متجرك الإلكتروني؟',
        description: 'انسخ القالب، خصص المنتجات، وانشر. لا يلزم خادم للبدء!',
      },
    },
  }

  const t = content[locale]

  const featureIcons = [ShoppingCart, Search, Package, CreditCard, Star]

  const usageCode = `'use client'

import { useCart } from '@/starters/ecommerce/hooks/use-cart'
import { products } from '@/starters/ecommerce/lib/products'
import { Button } from '@/components/ui/button'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

export default function ProductCard({ product }) {
  const { addItem } = useCart()

  return (
    <div>
      <h3>{product.name}</h3>
      <p>{product.price} SAR</p>
      <Button onClick={() => addItem(product)}>
        Add to Cart
      </Button>
    </div>
  )
}`

  const cartCode = `// Shopping cart hook with localStorage
const {
  items,        // Cart items array
  addItem,      // Add product to cart
  removeItem,   // Remove from cart
  updateQuantity, // Update item quantity
  clearCart,    // Empty cart
  total,        // Total price
  itemCount     // Total items
} = useCart()`

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="default">{t.badges.productionReady}</Badge>
          <Badge variant="secondary">{t.badges.noBackend}</Badge>
          <Badge variant="secondary">{t.badges.bilingual}</Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {t.title}
        </h1>
        <p className="text-xl text-muted-foreground mb-6">
          {t.subtitle}
        </p>
        <div className="flex gap-4">
          <Button size="lg" asChild>
            <Link href="/starters">
              <Package className="h-5 w-5 me-2" />
              {t.viewAllStarters}
              <ExternalLink className="h-4 w-4 ms-2" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a
              href="https://github.com/ositaka/noor-ui/tree/main/starters/ecommerce"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.viewOnGitHub}
              <ExternalLink className="h-4 w-4 ms-2" />
            </a>
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t.sections.features}</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.features.map((feature, index) => {
            const Icon = featureIcons[index]
            return (
              <Card key={index}>
                <CardHeader>
                  <Icon className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t.sections.techStack}</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {t.techStack.map((tech, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-1">{tech.name}</h3>
                <p className="text-sm text-muted-foreground">{tech.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Code Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t.sections.codeExamples}</h2>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.codeExamples.addToCart.title}</CardTitle>
              <CardDescription>{t.codeExamples.addToCart.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock language="tsx" code={usageCode} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.codeExamples.cartAPI.title}</CardTitle>
              <CardDescription>{t.codeExamples.cartAPI.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock language="tsx" code={cartCode} />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What's Included */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t.sections.whatsIncluded}</h2>
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  {t.included.pagesFeatures}
                </h3>
                <ul className="space-y-2 text-sm">
                  {t.included.pages.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-0.5 rtl:rotate-180" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  {t.included.ecommerceFeatures}
                </h3>
                <ul className="space-y-2 text-sm">
                  {t.included.features.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-primary mt-0.5 rtl:rotate-180" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Quick Setup */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t.sections.quickSetup}</h2>
        <Card>
          <CardHeader>
            <CardTitle>{t.setup.title}</CardTitle>
            <CardDescription>{t.setup.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              language="bash"
              code={`# Copy the starter
cp -r starters/ecommerce my-shop

# Install dependencies
cd my-shop
npm install

# Run development server
npm run dev

# Visit http://localhost:3000
# Start shopping! Cart persists in localStorage`}
            />
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section>
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-lg mb-1">{t.cta.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.cta.description}
                </p>
              </div>
              <ButtonArrow direction="forward" size="lg" asChild>
                <Link href="/starters">
                  {t.viewAllStarters}
                </Link>
              </ButtonArrow>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
