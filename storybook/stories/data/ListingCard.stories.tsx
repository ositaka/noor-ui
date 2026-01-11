import type { Meta, StoryObj } from '@storybook/react';
import { ListingCard } from '../../../components/ui/listing-card';
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
  Package
} from 'lucide-react';
import * as React from 'react';

/**
 * ListingCard Component Stories
 *
 * All examples are taken from /app/(docs)/components/listing-card/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: ListingCard is a flexible component for displaying listings, products, properties, jobs, etc.
 * Features: Images/placeholders, badges, action buttons, stats, tags, price, CTA.
 */

const meta = {
  title: 'Data Display/ListingCard',
  component: ListingCard,
  parameters: {
    layout: 'centered'
  },
  tags: ['!autodocs'],
  argTypes: {
    title: {
      control: { type: 'text' }
    },
    subtitle: {
      control: false
    },
    description: {
      control: { type: 'text' }
    },
    price: {
      control: false
    },
    image: {
      control: false
    },
    placeholderIcon: {
      control: false
    },
    badges: {
      control: false
    },
    actions: {
      control: false
    },
    stats: {
      control: false
    },
    tags: {
      control: false
    },
    maxTags: {
      control: { type: 'number' }
    },
    typeBadge: {
      control: { type: 'text' }
    },
    ctaText: {
      control: { type: 'text' }
    },
    onCtaClick: {
      control: false
    },
    onClick: {
      control: false
    },
    featured: {
      control: { type: 'boolean' }
    },
    imageAspect: {
      control: { type: 'select' },
      options: ['square', 'video', 'wide']
    },
    hoverEffect: {
      control: { type: 'boolean' }
    },
    className: {
      control: { type: 'text' }
    }
  }
} satisfies Meta<typeof ListingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls
export const Default: Story = {
  args: {
    title: 'Modern Apartment',
    subtitle: 'Downtown Dubai',
    description: 'Beautiful 2-bedroom apartment with stunning views',
    price: '1,200,000 AED',
    placeholderIcon: Home,
    imageAspect: 'video',
    featured: false,
    hoverEffect: true
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  render: (args) => (
    <div className="max-w-sm">
      <ListingCard {...args} />
    </div>
  ),
  parameters: {
    docs: {
      story: {
        inline: false
      }
    }
  }
};

// Basic Listing - from component page lines 293-300
export const BasicListing: Story = {
  render: () => (
    <div className="max-w-sm">
      <ListingCard
        title="Modern Apartment"
        subtitle="Downtown Dubai"
        description="Beautiful 2-bedroom apartment with stunning views"
        price="1,200,000 AED"
        placeholderIcon={Home}
      />
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Basic listing with just title, subtitle, description, and price.'
      }
    }
  }
};

// Real Estate Listing - from component page lines 313-347
export const RealEstateListing: Story = {
  render: () => (
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
          { icon: Heart, label: 'Favorite', onClick: () => console.log('Favorited') },
          { icon: Share2, label: 'Share', onClick: () => console.log('Shared') },
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
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Full real estate listing with badges, actions, stats, tags, and featured styling.'
      }
    }
  }
};

// E-commerce Listing - from component page lines 360-384
export const EcommerceListing: Story = {
  render: () => (
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
        actions={[{ icon: Heart, label: 'Wishlist', onClick: () => console.log('Added to wishlist') }]}
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
        onCtaClick={() => console.log('Added to cart')}
        imageAspect="square"
      />
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'E-commerce product with rating, sold count, and Add to Cart CTA.'
      }
    }
  }
};

// Job Listing - from component page lines 397-421
export const JobListing: Story = {
  render: () => (
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
        stats={[{ icon: Clock, value: 'Posted 2 days ago' }]}
        tags={[{ label: 'React' }, { label: 'TypeScript' }, { label: 'Next.js' }]}
        typeBadge="Tech"
        ctaText="Apply Now"
        onCtaClick={() => console.log('Applied')}
      />
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Job listing with employment type, location, tech stack, and Apply Now CTA.'
      }
    }
  }
};

// With All Features
export const WithAllFeatures: Story = {
  render: () => (
    <div className="max-w-sm">
      <ListingCard
        title="Premium Property with All Features"
        subtitle={
          <>
            <MapPin className="h-3 w-3 inline me-1" />
            Palm Jumeirah, Dubai
          </>
        }
        description="Showcasing all available features of the Listing Card component"
        price="12,000,000 AED"
        placeholderIcon={Home}
        badges={[
          { label: 'New', variant: 'default' },
          { label: 'Premium', variant: 'destructive' },
        ]}
        actions={[
          { icon: Heart, label: 'Favorite', onClick: () => {} },
          { icon: Share2, label: 'Share', onClick: () => {} },
        ]}
        stats={[
          { icon: Bed, value: 6, label: 'Bedrooms' },
          { icon: Bath, value: 7, label: 'Bathrooms' },
          { icon: Square, value: '6,000 sqft', label: 'Area' },
        ]}
        tags={[
          { label: 'Beach Access' },
          { label: 'Private Pool' },
          { label: 'Smart Home' },
          { label: 'Gym' },
          { label: 'Concierge' },
        ]}
        maxTags={3}
        typeBadge="Penthouse"
        ctaText="View Details"
        onCtaClick={() => console.log('View details clicked')}
        featured={true}
      />
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Showcasing all features: badges, actions, stats, tags (with truncation), type badge, CTA, and featured styling.'
      }
    }
  }
};

// Grid Layout
export const GridLayout: Story = {
  render: () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl">
      <ListingCard
        title="Modern Apartment"
        subtitle="Downtown Dubai"
        description="Beautiful 2-bedroom apartment with stunning views"
        price="1,200,000 AED"
        placeholderIcon={Home}
        stats={[
          { icon: Bed, value: 2, label: 'Bedrooms' },
          { icon: Bath, value: 2, label: 'Bathrooms' },
        ]}
        ctaText="View"
        onCtaClick={() => {}}
      />
      <ListingCard
        title="Luxury Villa"
        subtitle="Dubai Hills"
        description="Stunning villa with private pool"
        price="8,500,000 AED"
        placeholderIcon={Home}
        badges={[{ label: 'Featured', variant: 'destructive' }]}
        stats={[
          { icon: Bed, value: 5, label: 'Bedrooms' },
          { icon: Bath, value: 6, label: 'Bathrooms' },
        ]}
        featured={true}
        ctaText="View"
        onCtaClick={() => {}}
      />
      <ListingCard
        title="Beachfront Penthouse"
        subtitle="Jumeirah Beach"
        description="Exclusive penthouse with panoramic views"
        price="15,000,000 AED"
        placeholderIcon={Home}
        stats={[
          { icon: Bed, value: 4, label: 'Bedrooms' },
          { icon: Bath, value: 5, label: 'Bathrooms' },
        ]}
        ctaText="View"
        onCtaClick={() => {}}
      />
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Grid layout with multiple property listings.'
      }
    }
  }
};

// RTL Real Estate
export const RTLRealEstate: Story = {
  render: () => (
    <div className="max-w-sm">
      <ListingCard
        title="فيلا فاخرة في دبي هيلز"
        subtitle={
          <>
            <MapPin className="h-3 w-3 inline me-1" />
            دبي هيلز استيت، دبي
          </>
        }
        description="فيلا مذهلة من 5 غرف نوم مع مسبح خاص وحديقة"
        price="8,500,000 د.إ"
        placeholderIcon={Home}
        badges={[
          { label: 'للبيع', variant: 'default' },
          { label: 'مميز', variant: 'destructive' },
        ]}
        actions={[
          { icon: Heart, label: 'مفضلة', onClick: () => {} },
          { icon: Share2, label: 'مشاركة', onClick: () => {} },
        ]}
        stats={[
          { icon: Bed, value: 5, label: 'غرف النوم' },
          { icon: Bath, value: 6, label: 'الحمامات' },
          { icon: Square, value: '4,500 قدم', label: 'المساحة' },
        ]}
        tags={[
          { label: 'مسبح خاص' },
          { label: 'حديقة' },
          { label: 'منزل ذكي' },
          { label: 'موقف سيارات' },
          { label: 'أمن' },
        ]}
        typeBadge="فيلا"
        featured={true}
      />
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Real estate listing in RTL with Arabic text. Layout flows right-to-left.'
      }
    }
  }
};

// RTL E-commerce
export const RTLEcommerce: Story = {
  render: () => (
    <div className="max-w-sm">
      <ListingCard
        title="سماعات لاسلكية متميزة"
        subtitle="اسم العلامة التجارية"
        description="سماعات لاسلكية عالية الجودة مع إلغاء الضوضاء"
        price="$299.99"
        placeholderIcon={Package}
        badges={[
          { label: 'الأكثر مبيعاً', variant: 'default' },
          { label: 'خصم 20%', variant: 'destructive' },
        ]}
        actions={[{ icon: Heart, label: 'مفضلة', onClick: () => {} }]}
        stats={[
          { icon: Star, value: '4.8', label: 'التقييم' },
          { icon: Package, value: '234', label: 'مباع' },
        ]}
        tags={[{ label: 'إلغاء الضوضاء' }, { label: 'لاسلكي' }, { label: 'شحن سريع' }]}
        ctaText="أضف إلى السلة"
        onCtaClick={() => {}}
        imageAspect="square"
      />
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'E-commerce product in RTL with Arabic text and Add to Cart button.'
      }
    }
  }
};

// RTL Job Listing
export const RTLJobListing: Story = {
  render: () => (
    <div className="max-w-sm">
      <ListingCard
        title="مطور واجهة أمامية أول"
        subtitle={
          <>
            <MapPin className="h-3 w-3 inline me-1" />
            دبي، الإمارات
          </>
        }
        description="انضم إلى فريقنا لبناء تطبيقات ويب متطورة"
        price="15,000 - 20,000 د.إ/شهرياً"
        placeholderIcon={Briefcase}
        badges={[
          { label: 'دوام كامل', variant: 'default' },
          { label: 'عن بعد', variant: 'secondary' },
        ]}
        stats={[{ icon: Clock, value: 'نُشر قبل يومين' }]}
        tags={[{ label: 'React' }, { label: 'TypeScript' }, { label: 'Next.js' }]}
        typeBadge="تقني"
        ctaText="تقدم الآن"
        onCtaClick={() => {}}
      />
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Job listing in RTL with Arabic text and Apply Now button.'
      }
    }
  }
};

// RTL Grid Layout
export const RTLGridLayout: Story = {
  render: () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl">
      <ListingCard
        title="شقة عصرية"
        subtitle="وسط مدينة دبي"
        description="شقة جميلة من غرفتي نوم مع إطلالات خلابة"
        price="1,200,000 د.إ"
        placeholderIcon={Home}
        stats={[
          { icon: Bed, value: 2, label: 'غرف نوم' },
          { icon: Bath, value: 2, label: 'حمامات' },
        ]}
        ctaText="عرض"
        onCtaClick={() => {}}
      />
      <ListingCard
        title="فيلا فاخرة"
        subtitle="دبي هيلز"
        description="فيلا مذهلة مع مسبح خاص"
        price="8,500,000 د.إ"
        placeholderIcon={Home}
        badges={[{ label: 'مميز', variant: 'destructive' }]}
        stats={[
          { icon: Bed, value: 5, label: 'غرف نوم' },
          { icon: Bath, value: 6, label: 'حمامات' },
        ]}
        featured={true}
        ctaText="عرض"
        onCtaClick={() => {}}
      />
      <ListingCard
        title="بنتهاوس على الشاطئ"
        subtitle="شاطئ جميرا"
        description="بنتهاوس حصري مع إطلالات بانورامية"
        price="15,000,000 د.إ"
        placeholderIcon={Home}
        stats={[
          { icon: Bed, value: 4, label: 'غرف نوم' },
          { icon: Bath, value: 5, label: 'حمامات' },
        ]}
        ctaText="عرض"
        onCtaClick={() => {}}
      />
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Grid layout in RTL with Arabic property listings.'
      }
    }
  }
};
