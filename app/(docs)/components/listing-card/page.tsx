'use client'

import * as React from 'react'
import { ListingCard } from '@/components/ui/listing-card'
import { Card } from '@/components/ui/card'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { useDirection } from '@/components/providers/direction-provider'
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

  const basicUsage = `import { ListingCard } from '@/components/ui/listing-card'
import { Home } from 'lucide-react'

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
    <div className="container mx-auto py-8 space-y-12" dir={direction}>
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-4xl font-bold">
          {isRTL ? 'بطاقة القائمة' : 'Listing Card'}
        </h1>
        <p className="text-lg text-muted-foreground">
          {isRTL
            ? 'مكون بطاقة مرن لعرض القوائم والمنتجات والعقارات والوظائف والمزيد'
            : 'A flexible card component for displaying listings, products, properties, jobs, and more'}
        </p>
      </div>

      {/* Basic Usage */}
      <ComponentShowcase
        title={isRTL ? 'الاستخدام الأساسي' : 'Basic Usage'}
        description={
          isRTL
            ? 'بطاقة قائمة بسيطة مع عنوان وعنوان فرعي ووصف وسعر'
            : 'Simple listing card with title, subtitle, description, and price'
        }
      >
        <div className="max-w-sm mx-auto">
          <ListingCard
            title={isRTL ? 'شقة عصرية' : 'Modern Apartment'}
            subtitle={isRTL ? 'وسط مدينة دبي' : 'Downtown Dubai'}
            description={
              isRTL
                ? 'شقة جميلة من غرفتي نوم مع إطلالات خلابة'
                : 'Beautiful 2-bedroom apartment with stunning views'
            }
            price={isRTL ? '1,200,000 د.إ' : '1,200,000 AED'}
            placeholderIcon={Home}
          />
        </div>
      </ComponentShowcase>

      <CodeBlock code={basicUsage} language="tsx" title={isRTL ? 'الكود' : 'Code'} />

      {/* Real Estate Example */}
      <ComponentShowcase
        title={isRTL ? 'قائمة عقارية' : 'Real Estate Listing'}
        description={
          isRTL
            ? 'مثالية للقوائم العقارية مع الموقع والإحصائيات والمرافق'
            : 'Perfect for property listings with location, stats, and amenities'
        }
      >
        <div className="max-w-sm mx-auto">
          <ListingCard
            title={isRTL ? 'فيلا فاخرة في دبي هيلز' : 'Luxury Villa in Dubai Hills'}
            subtitle={
              <>
                <MapPin className="h-3 w-3 inline me-1" />
                {isRTL ? 'دبي هيلز استيت، دبي' : 'Dubai Hills Estate, Dubai'}
              </>
            }
            description={
              isRTL
                ? 'فيلا مذهلة من 5 غرف نوم مع مسبح خاص وحديقة'
                : 'Stunning 5-bedroom villa with private pool and garden'
            }
            price={isRTL ? '8,500,000 د.إ' : '8,500,000 AED'}
            placeholderIcon={Home}
            badges={[
              { label: isRTL ? 'للبيع' : 'For Sale', variant: 'default' },
              { label: isRTL ? 'مميز' : 'Featured', variant: 'destructive' },
            ]}
            actions={[
              { icon: Heart, label: isRTL ? 'مفضلة' : 'Favorite', onClick: () => {} },
              { icon: Share2, label: isRTL ? 'مشاركة' : 'Share', onClick: () => {} },
            ]}
            stats={[
              { icon: Bed, value: 5, label: isRTL ? 'غرف النوم' : 'Bedrooms' },
              { icon: Bath, value: 6, label: isRTL ? 'الحمامات' : 'Bathrooms' },
              { icon: Square, value: '4,500 sqft', label: isRTL ? 'المساحة' : 'Area' },
            ]}
            tags={[
              { label: isRTL ? 'مسبح خاص' : 'Private Pool' },
              { label: isRTL ? 'حديقة' : 'Garden' },
              { label: isRTL ? 'منزل ذكي' : 'Smart Home' },
              { label: isRTL ? 'موقف سيارات' : 'Parking' },
              { label: isRTL ? 'أمن' : 'Security' },
            ]}
            typeBadge={isRTL ? 'فيلا' : 'Villa'}
            featured={true}
          />
        </div>
      </ComponentShowcase>

      <CodeBlock code={realEstateCode} language="tsx" />

      {/* E-commerce Example */}
      <ComponentShowcase
        title={isRTL ? 'منتج تجارة إلكترونية' : 'E-commerce Product'}
        description={
          isRTL
            ? 'رائع لبطاقات المنتجات مع التقييمات وشارات التخفيض'
            : 'Great for product cards with ratings and sale badges'
        }
      >
        <div className="max-w-sm mx-auto">
          <ListingCard
            title={isRTL ? 'سماعات لاسلكية متميزة' : 'Premium Wireless Headphones'}
            subtitle={isRTL ? 'اسم العلامة التجارية' : 'Brand Name'}
            description={
              isRTL
                ? 'سماعات لاسلكية عالية الجودة مع إلغاء الضوضاء'
                : 'High-quality wireless headphones with noise cancellation'
            }
            price="$299.99"
            placeholderIcon={Package}
            badges={[
              { label: isRTL ? 'الأكثر مبيعاً' : 'Best Seller', variant: 'default' },
              { label: isRTL ? 'خصم 20%' : '20% Off', variant: 'destructive' },
            ]}
            actions={[{ icon: Heart, label: isRTL ? 'مفضلة' : 'Wishlist', onClick: () => {} }]}
            stats={[
              { icon: Star, value: '4.8', label: isRTL ? 'التقييم' : 'Rating' },
              { icon: Package, value: '234', label: isRTL ? 'مباع' : 'Sold' },
            ]}
            tags={[
              { label: isRTL ? 'إلغاء الضوضاء' : 'Noise Cancelling' },
              { label: isRTL ? 'لاسلكي' : 'Wireless' },
              { label: isRTL ? 'شحن سريع' : 'Fast Charging' },
            ]}
            ctaText={isRTL ? 'أضف إلى السلة' : 'Add to Cart'}
            onCtaClick={() => {}}
            imageAspect="square"
          />
        </div>
      </ComponentShowcase>

      <CodeBlock code={ecommerceCode} language="tsx" />

      {/* Job Listing Example */}
      <ComponentShowcase
        title={isRTL ? 'قائمة وظائف' : 'Job Listing'}
        description={
          isRTL
            ? 'مثالي للوحات الوظائف مع تفاصيل المنصب ونطاق الراتب'
            : 'Ideal for job boards with position details and salary range'
        }
      >
        <div className="max-w-sm mx-auto">
          <ListingCard
            title={isRTL ? 'مطور واجهة أمامية أول' : 'Senior Frontend Developer'}
            subtitle={
              <>
                <MapPin className="h-3 w-3 inline me-1" />
                {isRTL ? 'دبي، الإمارات' : 'Dubai, UAE'}
              </>
            }
            description={
              isRTL
                ? 'انضم إلى فريقنا لبناء تطبيقات ويب متطورة'
                : 'Join our team to build cutting-edge web applications'
            }
            price={isRTL ? '15,000 - 20,000 د.إ/شهرياً' : '15,000 - 20,000 AED/month'}
            placeholderIcon={Briefcase}
            badges={[
              { label: isRTL ? 'دوام كامل' : 'Full Time', variant: 'default' },
              { label: isRTL ? 'عن بعد' : 'Remote OK', variant: 'secondary' },
            ]}
            stats={[{ icon: Clock, value: isRTL ? 'نُشر قبل يومين' : 'Posted 2 days ago' }]}
            tags={[
              { label: 'React' },
              { label: 'TypeScript' },
              { label: 'Next.js' },
            ]}
            typeBadge={isRTL ? 'تقني' : 'Tech'}
            ctaText={isRTL ? 'تقدم الآن' : 'Apply Now'}
            onCtaClick={() => {}}
          />
        </div>
      </ComponentShowcase>

      <CodeBlock code={jobListingCode} language="tsx" />

      {/* Use Cases */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{isRTL ? 'حالات الاستخدام' : 'Use Cases'}</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: '🏠', label: isRTL ? 'العقارات' : 'Real Estate' },
            { icon: '🛍️', label: isRTL ? 'التجارة الإلكترونية' : 'E-commerce' },
            { icon: '💼', label: isRTL ? 'لوحات الوظائف' : 'Job Boards' },
            { icon: '📝', label: isRTL ? 'المدونات' : 'Blog' },
            { icon: '🏪', label: isRTL ? 'السوق' : 'Marketplace' },
            { icon: '🎨', label: isRTL ? 'المحفظة' : 'Portfolio' },
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
        <h2 className="text-2xl font-bold">{isRTL ? 'تعريفات الأنواع' : 'Type Definitions'}</h2>
        <CodeBlock code={typeDefinitions} language="typescript" />
      </div>

      {/* API Reference */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{isRTL ? 'مرجع API' : 'API Reference'}</h2>
        <PropsTable props={listingCardProps} />
      </div>
    </div>
  )
}
