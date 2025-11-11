'use client'

import * as React from 'react'
import Link from 'next/link'
import { ListingCard } from '@/components/ui/listing-card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import {
  Home,
  Heart,
  Share2,
  Bed,
  Bath,
  Square,
  ShoppingCart,
  Star,
  MapPin,
  DollarSign,
  Briefcase,
  Clock,
  Package,
} from 'lucide-react'

const listingCardProps: PropDefinition[] = [
  {
    name: 'title',
    type: 'string',
    required: true,
    description: 'Main title of the listing',
  },
  {
    name: 'subtitle',
    type: 'string | React.ReactNode',
    required: false,
    description: 'Subtitle or location text displayed below title',
  },
  {
    name: 'description',
    type: 'string',
    required: false,
    description: 'Short description text (automatically truncated to 2 lines)',
  },
  {
    name: 'price',
    type: 'string | React.ReactNode',
    required: false,
    description: 'Price or main value to display in footer',
  },
  {
    name: 'image',
    type: 'string | React.ReactNode',
    required: false,
    description: 'Image URL or custom image component',
  },
  {
    name: 'placeholderIcon',
    type: 'LucideIcon',
    required: false,
    description: 'Icon to show when no image is provided',
  },
  {
    name: 'badges',
    type: 'ListingCardBadge[]',
    required: false,
    description: 'Array of badges to show on top left of image',
  },
  {
    name: 'actions',
    type: 'ListingCardAction[]',
    required: false,
    description: 'Action buttons on top right (favorite, share, etc)',
  },
  {
    name: 'stats',
    type: 'ListingCardStat[]',
    required: false,
    description: 'Stats/specs to display (bedrooms, ratings, etc)',
  },
  {
    name: 'tags',
    type: 'ListingCardTag[]',
    required: false,
    description: 'Tags/amenities to display',
  },
  {
    name: 'maxTags',
    type: 'number',
    default: '3',
    required: false,
    description: 'Maximum number of tags to show before "+N more"',
  },
  {
    name: 'typeBadge',
    type: 'string',
    required: false,
    description: 'Type badge displayed next to title',
  },
  {
    name: 'ctaText',
    type: 'string',
    required: false,
    description: 'Text for call-to-action button',
  },
  {
    name: 'onCtaClick',
    type: '() => void',
    required: false,
    description: 'Click handler for CTA button',
  },
  {
    name: 'onClick',
    type: '() => void',
    required: false,
    description: 'Click handler for entire card',
  },
  {
    name: 'featured',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Whether card is featured (highlighted style)',
  },
  {
    name: 'imageAspect',
    type: "'square' | 'video' | 'wide'",
    default: "'video'",
    required: false,
    description: 'Image aspect ratio preset',
  },
  {
    name: 'hoverEffect',
    type: 'boolean',
    default: 'true',
    required: false,
    description: 'Whether to show shadow on hover',
  },
]

const installCode = `npm install @noorui/components`

const basicUsageCode = `import { ListingCard } from '@/components/ui/listing-card'
import { Home, Heart, Share2 } from 'lucide-react'

<ListingCard
  title="Modern Apartment"
  subtitle="Downtown Dubai"
  description="Beautiful 2-bedroom apartment with stunning views"
  price="1,200,000 AED"
  placeholderIcon={Home}
/>`

const realEstateCode = `import { ListingCard } from '@/components/ui/listing-card'
import { Home, Heart, Share2, Bed, Bath, Square, MapPin } from 'lucide-react'

<ListingCard
  title="Luxury Villa in Dubai Hills"
  subtitle={
    <>
      <MapPin className="h-3 w-3 inline me-1" />
      Dubai Hills Estate, Dubai
    </>
  }
  description="Stunning 5-bedroom villa with private pool and garden"
  price="8,500,000 AED"
  placeholderIcon={Home}
  badges={[
    { label: 'For Sale', variant: 'default' },
    { label: 'Featured', variant: 'destructive' },
  ]}
  actions={[
    { icon: Heart, label: 'Favorite', onClick: () => {} },
    { icon: Share2, label: 'Share', onClick: () => {} },
  ]}
  stats={[
    { icon: Bed, value: 5, label: 'Bedrooms' },
    { icon: Bath, value: 6, label: 'Bathrooms' },
    { icon: Square, value: '4,500 sqft', label: 'Area' },
  ]}
  tags={[
    { label: 'Private Pool' },
    { label: 'Garden' },
    { label: 'Smart Home' },
  ]}
  typeBadge="Villa"
  featured={true}
/>`

const ecommerceCode = `import { ListingCard } from '@/components/ui/listing-card'
import { Package, ShoppingCart, Heart, Star } from 'lucide-react'

<ListingCard
  title="Premium Wireless Headphones"
  subtitle="Brand Name"
  description="High-quality wireless headphones with noise cancellation"
  price="$299.99"
  placeholderIcon={Package}
  badges={[
    { label: 'Best Seller', variant: 'default' },
    { label: '20% Off', variant: 'destructive' },
  ]}
  actions={[
    { icon: Heart, label: 'Add to wishlist', onClick: () => {} },
  ]}
  stats={[
    { icon: Star, value: '4.8', label: 'Rating' },
    { icon: Package, value: '234', label: 'Sold' },
  ]}
  tags={[
    { label: 'Noise Cancelling' },
    { label: 'Wireless' },
    { label: 'Fast Charging' },
  ]}
  ctaText="Add to Cart"
  onCtaClick={() => {}}
  imageAspect="square"
/>`

const jobListingCode = `import { ListingCard } from '@/components/ui/listing-card'
import { Briefcase, Clock, MapPin, DollarSign } from 'lucide-react'

<ListingCard
  title="Senior Frontend Developer"
  subtitle={
    <>
      <MapPin className="h-3 w-3 inline me-1" />
      Dubai, UAE
    </>
  }
  description="Join our team to build cutting-edge web applications"
  price="15,000 - 20,000 AED/month"
  placeholderIcon={Briefcase}
  badges={[
    { label: 'Full Time', variant: 'default' },
    { label: 'Remote OK', variant: 'secondary' },
  ]}
  stats={[
    { icon: Clock, value: 'Posted 2 days ago' },
    { icon: DollarSign, value: 'Competitive' },
  ]}
  tags={[
    { label: 'React' },
    { label: 'TypeScript' },
    { label: 'Next.js' },
  ]}
  typeBadge="Tech"
  ctaText="Apply Now"
  onCtaClick={() => {}}
/>`

export default function ListingCardPage() {
  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12 max-w-6xl">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/components" className="hover:text-foreground transition-colors">
                Components
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">Listing Card</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Listing Card</h1>
          <p className="text-xl text-muted-foreground">
            A flexible card component for displaying listings, products, properties, jobs, and more.
            Supports badges, actions, stats, tags, and custom layouts.
          </p>
        </div>

        {/* Installation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Installation</h2>
          <CodeBlock code={installCode} language="bash" />
        </section>

        <Separator className="my-12" />

        {/* Basic Usage */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Basic Usage</h2>
          <ComponentShowcase
            code={basicUsageCode}
            preview={
              <div className="max-w-sm">
                <ListingCard
                  title="Modern Apartment"
                  subtitle="Downtown Dubai"
                  description="Beautiful 2-bedroom apartment with stunning views"
                  price="1,200,000 AED"
                  placeholderIcon={Home}
                />
              </div>
            }
          />
        </section>

        <Separator className="my-12" />

        {/* Real Estate Example */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Real Estate Listing</h2>
          <p className="text-muted-foreground mb-6">
            Perfect for property listings with location, stats (bedrooms, bathrooms), amenities, and
            action buttons.
          </p>
          <ComponentShowcase
            code={realEstateCode}
            preview={
              <div className="max-w-sm">
                <ListingCard
                  title="Luxury Villa in Dubai Hills"
                  subtitle={
                    <>
                      <MapPin className="h-3 w-3 inline me-1" />
                      Dubai Hills Estate, Dubai
                    </>
                  }
                  description="Stunning 5-bedroom villa with private pool and garden"
                  price="8,500,000 AED"
                  placeholderIcon={Home}
                  badges={[
                    { label: 'For Sale', variant: 'default' },
                    { label: 'Featured', variant: 'destructive' },
                  ]}
                  actions={[
                    { icon: Heart, label: 'Favorite', onClick: () => {} },
                    { icon: Share2, label: 'Share', onClick: () => {} },
                  ]}
                  stats={[
                    { icon: Bed, value: 5, label: 'Bedrooms' },
                    { icon: Bath, value: 6, label: 'Bathrooms' },
                    { icon: Square, value: '4,500 sqft', label: 'Area' },
                  ]}
                  tags={[
                    { label: 'Private Pool' },
                    { label: 'Garden' },
                    { label: 'Smart Home' },
                    { label: 'Parking' },
                    { label: 'Security' },
                  ]}
                  typeBadge="Villa"
                  featured={true}
                />
              </div>
            }
          />
        </section>

        <Separator className="my-12" />

        {/* E-commerce Example */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">E-commerce Product</h2>
          <p className="text-muted-foreground mb-6">
            Great for product cards with ratings, sale badges, and add-to-cart functionality.
          </p>
          <ComponentShowcase
            code={ecommerceCode}
            preview={
              <div className="max-w-sm">
                <ListingCard
                  title="Premium Wireless Headphones"
                  subtitle="Brand Name"
                  description="High-quality wireless headphones with noise cancellation"
                  price="$299.99"
                  placeholderIcon={Package}
                  badges={[
                    { label: 'Best Seller', variant: 'default' },
                    { label: '20% Off', variant: 'destructive' },
                  ]}
                  actions={[{ icon: Heart, label: 'Add to wishlist', onClick: () => {} }]}
                  stats={[
                    { icon: Star, value: '4.8', label: 'Rating' },
                    { icon: Package, value: '234', label: 'Sold' },
                  ]}
                  tags={[
                    { label: 'Noise Cancelling' },
                    { label: 'Wireless' },
                    { label: 'Fast Charging' },
                  ]}
                  ctaText="Add to Cart"
                  onCtaClick={() => {}}
                  imageAspect="square"
                />
              </div>
            }
          />
        </section>

        <Separator className="my-12" />

        {/* Job Listing Example */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Job Listing</h2>
          <p className="text-muted-foreground mb-6">
            Ideal for job boards with position details, salary range, and required skills.
          </p>
          <ComponentShowcase
            code={jobListingCode}
            preview={
              <div className="max-w-sm">
                <ListingCard
                  title="Senior Frontend Developer"
                  subtitle={
                    <>
                      <MapPin className="h-3 w-3 inline me-1" />
                      Dubai, UAE
                    </>
                  }
                  description="Join our team to build cutting-edge web applications"
                  price="15,000 - 20,000 AED/month"
                  placeholderIcon={Briefcase}
                  badges={[
                    { label: 'Full Time', variant: 'default' },
                    { label: 'Remote OK', variant: 'secondary' },
                  ]}
                  stats={[
                    { icon: Clock, value: 'Posted 2 days ago' },
                    { icon: DollarSign, value: 'Competitive' },
                  ]}
                  tags={[
                    { label: 'React' },
                    { label: 'TypeScript' },
                    { label: 'Next.js' },
                  ]}
                  typeBadge="Tech"
                  ctaText="Apply Now"
                  onCtaClick={() => {}}
                />
              </div>
            }
          />
        </section>

        <Separator className="my-12" />

        {/* API Reference */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">API Reference</h2>
          <h3 className="text-lg font-semibold mb-4">ListingCard Props</h3>
          <PropsTable props={listingCardProps} />
        </section>

        <Separator className="my-12" />

        {/* Type Definitions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Type Definitions</h2>
          <CodeBlock
            code={`interface ListingCardBadge {
  label: string
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  className?: string
}

interface ListingCardAction {
  icon: LucideIcon
  label: string
  onClick?: () => void
}

interface ListingCardStat {
  icon: LucideIcon
  value: string | number
  label?: string
}

interface ListingCardTag {
  label: string
  variant?: 'default' | 'secondary' | 'outline'
}`}
            language="typescript"
          />
        </section>

        <Separator className="my-12" />

        {/* Use Cases */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Common Use Cases</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">🏠 Real Estate</h3>
              <p className="text-sm text-muted-foreground">
                Property listings with bedrooms, bathrooms, area, amenities, and contact actions.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">🛍️ E-commerce</h3>
              <p className="text-sm text-muted-foreground">
                Product cards with ratings, reviews, sale badges, and add-to-cart buttons.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">💼 Job Boards</h3>
              <p className="text-sm text-muted-foreground">
                Job postings with salary, location, work type, and required skills.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">📝 Blog</h3>
              <p className="text-sm text-muted-foreground">
                Article previews with author, publish date, read time, and categories.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">🏪 Marketplace</h3>
              <p className="text-sm text-muted-foreground">
                Item listings with seller info, condition, price, and shipping details.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">🎨 Portfolio</h3>
              <p className="text-sm text-muted-foreground">
                Project showcases with tech stack, client info, and project details.
              </p>
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Accessibility */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Accessibility</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>All action buttons include proper aria-labels</li>
            <li>Card is keyboard navigable when onClick is provided</li>
            <li>Stats include title attributes for screen readers</li>
            <li>Proper color contrast for all text elements</li>
            <li>Focus states for interactive elements</li>
            <li>RTL support for all text and layouts</li>
          </ul>
        </section>
      </main>
    </div>
  )
}
