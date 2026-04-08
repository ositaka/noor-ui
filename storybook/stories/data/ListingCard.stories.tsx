import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ListingCard } from '../../../components/ui/listing-card';
import {
  House,
  Heart,
  ShareNetwork,
  Bed,
  Bathtub,
  Square,
  ShoppingCart,
  Star,
  MapPin,
  CurrencyDollar,
  Briefcase,
  Clock,
  Package
} from '@phosphor-icons/react';
import * as React from 'react';

const meta = {
  title: 'Data Display/ListingCard',
  component: ListingCard,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
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
    placeholderIcon: House,
    imageAspect: 'video',
    featured: false,
    hoverEffect: true,
    onClick: fn()
  },
  render: (args, { globals }) => {
    return (
    <div className="max-w-sm">
      <ListingCard {...args} />
    </div>
    );
  },
  parameters: {
    ar: {
      args: {
        title: 'شقة عصرية',
        subtitle: 'وسط مدينة دبي',
        description: 'شقة جميلة من غرفتي نوم مع إطلالات خلابة',
        price: '١٬٢٠٠٬٠٠٠ د.إ'
      }
    }
  },
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Basic listing with just title, subtitle, description, and price.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders basic listing content', async () => {
      await expect(canvas.getByText('Modern Apartment')).toBeInTheDocument();
      await expect(canvas.getByText('Downtown Dubai')).toBeInTheDocument();
      await expect(canvas.getByText('Beautiful 2-bedroom apartment with stunning views')).toBeInTheDocument();
      await expect(canvas.getByText('1,200,000 AED')).toBeInTheDocument();
    });

    await step('Has placeholder icon', async () => {
      const icon = canvasElement.querySelector('svg');
      await expect(icon).toBeInTheDocument();
    });
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
          { icon: Heart, label: 'Favorite', onClick: fn() },
          { icon: ShareNetwork, label: 'Share', onClick: fn() },
        ]}
        stats={[
          { icon: Bed, value: 5, label: 'Bedrooms' },
          { icon: Bathtub, value: 6, label: 'Bathrooms' },
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Full real estate listing with badges, actions, stats, tags, and featured styling.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders title and description', async () => {
      await expect(canvas.getByText('Luxury Villa in Dubai Hills')).toBeInTheDocument();
      await expect(canvas.getByText('Dubai Hills Estate, Dubai')).toBeInTheDocument();
      await expect(canvas.getByText('Stunning 5-bedroom villa with private pool and garden')).toBeInTheDocument();
      await expect(canvas.getByText('8,500,000 AED')).toBeInTheDocument();
    });

    await step('Displays badges', async () => {
      await expect(canvas.getByText('For Sale')).toBeInTheDocument();
      await expect(canvas.getByText('Featured')).toBeInTheDocument();
    });

    await step('Has action buttons', async () => {
      const favoriteButton = canvas.getByRole('button', { name: /favorite/i });
      const shareButton = canvas.getByRole('button', { name: /share/i });
      await expect(favoriteButton).toBeInTheDocument();
      await expect(shareButton).toBeInTheDocument();
    });

    await step('Action buttons are clickable', async () => {
      const favoriteButton = canvas.getByRole('button', { name: /favorite/i });
      await userEvent.click(favoriteButton);
      await expect(favoriteButton).toBeVisible();
    });

    await step('Displays stats', async () => {
      await expect(canvas.getByText('5')).toBeInTheDocument();
      await expect(canvas.getByText('6')).toBeInTheDocument();
      await expect(canvas.getByText('4,500 sqft')).toBeInTheDocument();
    });

    await step('Displays tags (first 3 by default)', async () => {
      await expect(canvas.getByText('Private Pool')).toBeInTheDocument();
      await expect(canvas.getByText('Garden')).toBeInTheDocument();
      await expect(canvas.getByText('Smart Home')).toBeInTheDocument();
    });

    await step('Shows type badge', async () => {
      await expect(canvas.getByText('Villa')).toBeInTheDocument();
    });
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
        actions={[{ icon: Heart, label: 'Wishlist', onClick: fn() }]}
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
        onCtaClick={fn()}
        imageAspect="square"
      />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'E-commerce product with rating, sold count, and Add to Cart CTA.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders product information', async () => {
      await expect(canvas.getByText('Premium Wireless Headphones')).toBeInTheDocument();
      await expect(canvas.getByText('Brand Name')).toBeInTheDocument();
      await expect(canvas.getByText('High-quality wireless headphones with noise cancellation')).toBeInTheDocument();
      await expect(canvas.getByText('$299.99')).toBeInTheDocument();
    });

    await step('Displays product badges', async () => {
      await expect(canvas.getByText('Best Seller')).toBeInTheDocument();
      await expect(canvas.getByText('20% Off')).toBeInTheDocument();
    });

    await step('Shows product stats', async () => {
      await expect(canvas.getByText('4.8')).toBeInTheDocument();
      await expect(canvas.getByText('234')).toBeInTheDocument();
    });

    await step('Displays product tags', async () => {
      await expect(canvas.getByText('Noise Cancelling')).toBeInTheDocument();
      await expect(canvas.getByText('Wireless')).toBeInTheDocument();
      await expect(canvas.getByText('Fast Charging')).toBeInTheDocument();
    });

    await step('Has Add to Cart CTA button', async () => {
      const ctaButton = canvas.getByRole('button', { name: /add to cart/i });
      await expect(ctaButton).toBeInTheDocument();
      await expect(ctaButton).toBeVisible();
    });

    await step('CTA button is clickable', async () => {
      const ctaButton = canvas.getByRole('button', { name: /add to cart/i });
      await userEvent.click(ctaButton);
      // Button should still be visible after click
      await expect(ctaButton).toBeInTheDocument();
    });

    await step('Has wishlist action button', async () => {
      const wishlistButton = canvas.getByRole('button', { name: /wishlist/i });
      await expect(wishlistButton).toBeInTheDocument();
      await userEvent.click(wishlistButton);
    });
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
        onCtaClick={fn()}
      />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Job listing with employment type, location, tech stack, and Apply Now CTA.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders job listing information', async () => {
      await expect(canvas.getByText('Senior Frontend Developer')).toBeInTheDocument();
      await expect(canvas.getByText('Dubai, UAE')).toBeInTheDocument();
      await expect(canvas.getByText('Join our team to build cutting-edge web applications')).toBeInTheDocument();
      await expect(canvas.getByText('15,000 - 20,000 AED/month')).toBeInTheDocument();
    });

    await step('Displays employment badges', async () => {
      await expect(canvas.getByText('Full Time')).toBeInTheDocument();
      await expect(canvas.getByText('Remote OK')).toBeInTheDocument();
    });

    await step('Shows posting date', async () => {
      await expect(canvas.getByText('Posted 2 days ago')).toBeInTheDocument();
    });

    await step('Displays tech stack tags', async () => {
      await expect(canvas.getByText('React')).toBeInTheDocument();
      await expect(canvas.getByText('TypeScript')).toBeInTheDocument();
      await expect(canvas.getByText('Next.js')).toBeInTheDocument();
    });

    await step('Shows job type badge', async () => {
      await expect(canvas.getByText('Tech')).toBeInTheDocument();
    });

    await step('Has Apply Now CTA button', async () => {
      const applyButton = canvas.getByRole('button', { name: /apply now/i });
      await expect(applyButton).toBeInTheDocument();
      await userEvent.click(applyButton);
    });
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
          { icon: Heart, label: 'Favorite', onClick: fn() },
          { icon: ShareNetwork, label: 'Share', onClick: fn() },
        ]}
        stats={[
          { icon: Bed, value: 6, label: 'Bedrooms' },
          { icon: Bathtub, value: 7, label: 'Bathrooms' },
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
        onCtaClick={fn()}
        featured={true}
      />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Showcasing all features: badges, actions, stats, tags (with truncation), type badge, CTA, and featured styling.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders all content', async () => {
      await expect(canvas.getByText('Premium Property with All Features')).toBeInTheDocument();
      await expect(canvas.getByText('Palm Jumeirah, Dubai')).toBeInTheDocument();
      await expect(canvas.getByText('Showcasing all available features of the Listing Card component')).toBeInTheDocument();
      await expect(canvas.getByText('12,000,000 AED')).toBeInTheDocument();
    });

    await step('Has all badges', async () => {
      await expect(canvas.getByText('New')).toBeInTheDocument();
      await expect(canvas.getByText('Premium')).toBeInTheDocument();
    });

    await step('Has all action buttons', async () => {
      await expect(canvas.getByRole('button', { name: /favorite/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /share/i })).toBeInTheDocument();
    });

    await step('Displays all stats', async () => {
      await expect(canvas.getByText('6')).toBeInTheDocument();
      await expect(canvas.getByText('7')).toBeInTheDocument();
      await expect(canvas.getByText('6,000 sqft')).toBeInTheDocument();
    });

    await step('Shows maxTags=3 with +2 more indicator', async () => {
      await expect(canvas.getByText('Beach Access')).toBeInTheDocument();
      await expect(canvas.getByText('Private Pool')).toBeInTheDocument();
      await expect(canvas.getByText('Smart Home')).toBeInTheDocument();
      await expect(canvas.getByText('+2')).toBeInTheDocument();
    });

    await step('Has type badge and CTA', async () => {
      await expect(canvas.getByText('Penthouse')).toBeInTheDocument();
      const ctaButton = canvas.getByRole('button', { name: /view details/i });
      await expect(ctaButton).toBeInTheDocument();
      await userEvent.click(ctaButton);
    });
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
          { icon: Bathtub, value: 2, label: 'Bathrooms' },
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
          { icon: Bathtub, value: 6, label: 'Bathrooms' },
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
          { icon: Bathtub, value: 5, label: 'Bathrooms' },
        ]}
        ctaText="View"
        onCtaClick={() => {}}
      />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Grid layout with multiple property listings.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders all three cards in grid', async () => {
      await expect(canvas.getByText('Modern Apartment')).toBeInTheDocument();
      await expect(canvas.getByText('Luxury Villa')).toBeInTheDocument();
      await expect(canvas.getByText('Beachfront Penthouse')).toBeInTheDocument();
    });

    await step('All prices are visible', async () => {
      await expect(canvas.getByText('1,200,000 AED')).toBeInTheDocument();
      await expect(canvas.getByText('8,500,000 AED')).toBeInTheDocument();
      await expect(canvas.getByText('15,000,000 AED')).toBeInTheDocument();
    });
  }
};

