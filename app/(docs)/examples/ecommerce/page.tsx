import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/docs/code-block'
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

export const metadata: Metadata = {
  title: 'E-commerce Starter - Noor UI',
  description: 'Full-featured bilingual online shop with shopping cart, product catalog, and checkout flow',
}

export default function EcommercePage() {
  const features = [
    {
      icon: ShoppingCart,
      title: 'Shopping Cart',
      titleAr: 'سلة التسوق',
      description: 'Full cart functionality with localStorage',
      descriptionAr: 'وظائف سلة كاملة مع localStorage',
      items: ['Add/remove products', 'Update quantities', 'Persistent cart', 'Real-time totals']
    },
    {
      icon: Search,
      title: 'Product Catalog',
      titleAr: 'كتالوج المنتجات',
      description: 'Browse and filter products',
      descriptionAr: 'تصفح وتصنيف المنتجات',
      items: ['Search functionality', 'Category filters', 'Product ratings', 'Sale badges']
    },
    {
      icon: Package,
      title: 'Product Details',
      titleAr: 'تفاصيل المنتج',
      description: 'Detailed product pages',
      descriptionAr: 'صفحات تفاصيل المنتج',
      items: ['High-res images', 'Full descriptions', 'Quantity selector', 'Stock status']
    },
    {
      icon: CreditCard,
      title: 'Checkout Flow',
      titleAr: 'عملية الدفع',
      description: 'Complete checkout process',
      descriptionAr: 'عملية دفع كاملة',
      items: ['Shipping form', 'Payment options', 'Order summary', 'Confirmation page']
    },
    {
      icon: Star,
      title: 'Product Reviews',
      titleAr: 'تقييمات المنتج',
      description: 'Ratings and review counts',
      descriptionAr: 'التقييمات وعدد المراجعات',
      items: ['Star ratings', 'Review counts', 'Average scores', 'Visual indicators']
    },
  ]

  const techStack = [
    { name: 'Next.js 14', description: 'App Router with Client Components' },
    { name: 'LocalStorage', description: 'Cart persistence without backend' },
    { name: 'React Context', description: 'Global cart state management' },
    { name: 'Noor UI', description: 'All shop components' },
    { name: 'TypeScript', description: 'Fully typed codebase' },
    { name: 'Tailwind CSS', description: 'Styling with RTL support' }
  ]

  const usageCode = `'use client'

import { useCart } from '@/starters/ecommerce/hooks/use-cart'
import { products } from '@/starters/ecommerce/lib/products'
import { Button } from '@/components/ui/button'

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
          <Badge variant="default">Production Ready</Badge>
          <Badge variant="secondary">No Backend</Badge>
          <Badge variant="secondary">Bilingual</Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          E-commerce Starter
        </h1>
        <p className="text-xl text-muted-foreground mb-6">
          A complete, production-ready online shop with shopping cart, product catalog, and checkout flow.
          Built with Noor UI components and localStorage - no backend required!
        </p>
        <div className="flex gap-4">
          <Button size="lg" asChild>
            <Link href="/starters/ecommerce">
              <Package className="h-5 w-5 me-2" />
              View Documentation
              <ExternalLink className="h-4 w-4 ms-2" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a
              href="https://github.com/yourusername/noor-ui/tree/main/starters/ecommerce"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
              <ExternalLink className="h-4 w-4 ms-2" />
            </a>
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Features</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="h-8 w-8 mb-2 text-primary" />
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
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Technology Stack</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {techStack.map((tech, index) => (
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
        <h2 className="text-2xl font-bold mb-6">Code Examples</h2>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Adding Products to Cart</CardTitle>
              <CardDescription>Simple one-line cart integration</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock language="tsx" code={usageCode} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cart Hook API</CardTitle>
              <CardDescription>Access cart state and methods</CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock language="tsx" code={cartCode} />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What's Included */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">What&apos;s Included</h2>
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Pages & Features
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                    Home page with featured products
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                    Products listing with search & filters
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                    Product detail pages
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                    Shopping cart with localStorage
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                    Checkout form and order confirmation
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  E-commerce Features
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                    8 sample products with images
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                    5 product categories
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                    Product ratings and reviews
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                    Sale badges and discounts
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                    All bilingual (English/Arabic)
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Quick Setup */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Quick Setup</h2>
        <Card>
          <CardHeader>
            <CardTitle>Copy & Run</CardTitle>
            <CardDescription>No backend setup required - just copy and start!</CardDescription>
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
                <h3 className="font-semibold text-lg mb-1">Ready to build your online shop?</h3>
                <p className="text-sm text-muted-foreground">
                  Copy the starter, customize products, and deploy. No backend needed to get started!
                </p>
              </div>
              <Button size="lg" asChild>
                <Link href="/starters/ecommerce">
                  Complete Documentation
                  <ArrowRight className="h-4 w-4 ms-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
