'use client'

import * as React from 'react'
import Link from 'next/link'
import { ListingCard } from '@/components/ui/listing-card'
import { Card } from '@/components/ui/card'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'
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
    description: 'Subtitle or location text',
  },
  {
    name: 'description',
    type: 'string',
    required: false,
    description: 'Short description (truncated to 2 lines)',
  },
  {
    name: 'price',
    type: 'string | React.ReactNode',
    required: false,
    description: 'Price or main value to display',
  },
  {
    name: 'placeholderIcon',
    type: 'LucideIcon',
    required: false,
    description: 'Icon when no image is provided',
  },
  {
    name: 'badges',
    type: 'ListingCardBadge[]',
    required: false,
    description: 'Badges on top left of image',
  },
  {
    name: 'actions',
    type: 'ListingCardAction[]',
    required: false,
    description: 'Action buttons on top right',
  },
  {
    name: 'stats',
    type: 'ListingCardStat[]',
    required: false,
    description: 'Stats/specs to display',
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
    description: 'Max tags before "+N more"',
  },
  {
    name: 'typeBadge',
    type: 'string',
    required: false,
    description: 'Type badge next to title',
  },
  {
    name: 'ctaText',
    type: 'string',
    required: false,
    description: 'Call-to-action button text',
  },
  {
    name: 'featured',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Featured card styling',
  },
  {
    name: 'imageAspect',
    type: "'square' | 'video' | 'wide'",
    default: "'video'",
    required: false,
    description: 'Image aspect ratio',
  },
]

export default function ListingCardPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const t = content[locale]

  const basicUsage = `import { ListingCard } from 'noorui-rtl'
import { Home } from 'lucide-react'

<ListingCard
  title="Modern Apartment"
  subtitle="Downtown Dubai"
  description="Beautiful 2-bedroom apartment with stunning views"
  price="1,200,000 AED"
  placeholderIcon={Home}
/>`

  const realEstateCode = `import { ListingCard } from 'noorui-rtl'
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

  const ecommerceCode = `import { ListingCard } from 'noorui-rtl'
import { Package, Heart, Star } from 'lucide-react'

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
    { icon: Heart, label: 'Wishlist', onClick: () => {} },
  ]}
  stats={[
    { icon: Star, value: '4.8', label: 'Rating' },
    { icon: Package, value: '234', label: 'Sold' },
  ]}
  tags={[
    { label: 'Noise Cancelling' },
    { label: 'Wireless' },
  ]}
  ctaText="Add to Cart"
  onCtaClick={() => {}}
  imageAspect="square"
/>`

  const jobListingCode = `import { ListingCard } from 'noorui-rtl'
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
  ]}
  tags={[
    { label: 'React' },
    { label: 'TypeScript' },
  ]}
  typeBadge="Tech"
  ctaText="Apply Now"
  onCtaClick={() => {}}
/>`

  const typeDefinitions = `interface ListingCardBadge {
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
}`

  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {t.common.home}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/components" className="hover:text-foreground transition-colors">
                {t.nav.components}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">{t.listingCardComponent.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {t.listingCardComponent.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {t.listingCardComponent.description}
          </p>
        </div>

      {/* Basic Usage */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          {t.listingCardComponent.examples.basicUsage}
        </h2>
        <ComponentShowcase code={basicUsage}>
          <ComponentShowcase.Demo>
            <div className="max-w-sm mx-auto">
              <ListingCard
                title={t.listingCardComponent.realEstate.modernApartment}
                subtitle={t.listingCardComponent.realEstate.downtownDubai}
                description={t.listingCardComponent.realEstate.apartmentDesc}
                price={t.listingCardComponentPage.prices.apartment1200k}
                placeholderIcon={Home}
              />
            </div>
          </ComponentShowcase.Demo>
        </ComponentShowcase>
      </section>

      {/* Real Estate Example */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          {t.listingCardComponent.examples.realEstate}
        </h2>
        <ComponentShowcase code={realEstateCode}>
          <ComponentShowcase.Demo>
            <div className="max-w-sm mx-auto">
              <ListingCard
                title={t.listingCardComponent.realEstate.luxuryVilla}
                subtitle={
                  <>
                    <MapPin className="h-3 w-3 inline me-1" />
                    {t.listingCardComponent.realEstate.dubaiHillsEstate}
                  </>
                }
                description={t.listingCardComponent.realEstate.villaDesc}
                price={t.listingCardComponentPage.prices.villa8500k}
                placeholderIcon={Home}
                badges={[
                  { label: t.listingCardComponent.realEstate.forSale, variant: 'default' },
                  { label: t.listingCardComponent.realEstate.featured, variant: 'destructive' },
                ]}
                actions={[
                  { icon: Heart, label: t.listingCardComponent.realEstate.favorite, onClick: () => {} },
                  { icon: Share2, label: t.listingCardComponent.realEstate.share, onClick: () => {} },
                ]}
                stats={[
                  { icon: Bed, value: 5, label: t.listingCardComponent.realEstate.bedrooms },
                  { icon: Bath, value: 6, label: t.listingCardComponent.realEstate.bathrooms },
                  { icon: Square, value: '4,500 sqft', label: t.listingCardComponent.realEstate.area },
                ]}
                tags={[
                  { label: t.listingCardComponent.realEstate.privatePool },
                  { label: t.listingCardComponent.realEstate.garden },
                  { label: t.listingCardComponent.realEstate.smartHome },
                  { label: t.listingCardComponent.realEstate.parking },
                  { label: t.listingCardComponent.realEstate.security },
                ]}
                typeBadge={t.listingCardComponent.realEstate.villa}
                featured={true}
              />
            </div>
          </ComponentShowcase.Demo>
        </ComponentShowcase>
      </section>

      {/* E-commerce Example */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          {t.listingCardComponent.examples.ecommerce}
        </h2>
        <ComponentShowcase code={ecommerceCode}>
          <ComponentShowcase.Demo>
            <div className="max-w-sm mx-auto">
              <ListingCard
                title={t.listingCardComponent.ecommerce.premiumHeadphones}
                subtitle={t.listingCardComponent.ecommerce.brandName}
                description={t.listingCardComponent.ecommerce.headphonesDesc}
                price="$299.99"
                placeholderIcon={Package}
                badges={[
                  { label: t.listingCardComponent.ecommerce.bestSeller, variant: 'default' },
                  { label: t.listingCardComponent.ecommerce.discount20, variant: 'destructive' },
                ]}
                actions={[{ icon: Heart, label: t.listingCardComponent.ecommerce.wishlist, onClick: () => {} }]}
                stats={[
                  { icon: Star, value: '4.8', label: t.listingCardComponent.ecommerce.rating },
                  { icon: Package, value: '234', label: t.listingCardComponent.ecommerce.sold },
                ]}
                tags={[
                  { label: t.listingCardComponent.ecommerce.noiseCancelling },
                  { label: t.listingCardComponent.ecommerce.wireless },
                  { label: t.listingCardComponent.ecommerce.fastCharging },
                ]}
                ctaText={t.listingCardComponent.ecommerce.addToCart}
                onCtaClick={() => {}}
                imageAspect="square"
              />
            </div>
          </ComponentShowcase.Demo>
        </ComponentShowcase>
      </section>

      {/* Job Listing Example */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          {t.listingCardComponent.examples.jobListing}
        </h2>
        <ComponentShowcase code={jobListingCode}>
          <ComponentShowcase.Demo>
            <div className="max-w-sm mx-auto">
              <ListingCard
                title={t.listingCardComponent.jobListing.seniorFrontend}
                subtitle={
                  <>
                    <MapPin className="h-3 w-3 inline me-1" />
                    {t.listingCardComponent.jobListing.dubaiUAE}
                  </>
                }
                description={t.listingCardComponent.jobListing.jobDesc}
                price={t.listingCardComponent.jobListing.salaryRange}
                placeholderIcon={Briefcase}
                badges={[
                  { label: t.listingCardComponent.jobListing.fullTime, variant: 'default' },
                  { label: t.listingCardComponent.jobListing.remoteOK, variant: 'secondary' },
                ]}
                stats={[{ icon: Clock, value: t.listingCardComponent.jobListing.postedDaysAgo }]}
                tags={[
                  { label: 'React' },
                  { label: 'TypeScript' },
                  { label: 'Next.js' },
                ]}
                typeBadge={t.listingCardComponent.jobListing.tech}
                ctaText={t.listingCardComponent.jobListing.applyNow}
                onCtaClick={() => {}}
              />
            </div>
          </ComponentShowcase.Demo>
        </ComponentShowcase>
      </section>

      {/* Use Cases */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{t.componentPage.sections.useCases}</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: '🏠', label: t.listingCardComponent.useCases.realEstate },
            { icon: '🛍️', label: t.listingCardComponent.useCases.ecommerce },
            { icon: '💼', label: t.listingCardComponent.useCases.jobBoards },
            { icon: '📝', label: t.listingCardComponent.useCases.blog },
            { icon: '🏪', label: t.listingCardComponent.useCases.marketplace },
            { icon: '🎨', label: t.listingCardComponent.useCases.portfolio },
          ].map((useCase, idx) => (
            <Card key={idx} className="p-4">
              <div className="text-2xl mb-2">{useCase.icon}</div>
              <p className="font-medium">{useCase.label}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Type Definitions */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{t.componentPage.sections.typeDefinitions}</h2>
        <CodeBlock code={typeDefinitions} language="typescript" />
      </div>

      {/* API Reference */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{t.componentPage.sections.propsApiReference}</h2>
        <PropsTable props={listingCardProps} />
      </div>
      </main>
    </div>
  )
}
