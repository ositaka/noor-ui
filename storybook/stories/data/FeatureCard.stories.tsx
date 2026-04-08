import type { Meta, StoryObj } from '@storybook/react';
import { FeatureCard } from '../../../components/ui/feature-card';
import { Card, CardContent } from '../../../components/ui/card';
import { Sparkle, Rocket, Lightning, Shield, Package, Gear, Heart, Star, Globe, Lock } from '@phosphor-icons/react';
import * as React from 'react';

const meta = {
  title: 'Core/Feature Card',
  component: FeatureCard,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: false
    },
    title: {
      control: { type: 'text' }
    },
    description: {
      control: { type: 'text' }
    },
    href: {
      control: { type: 'text' }
    },
    className: {
      control: { type: 'text' }
    }
  }
} satisfies Meta<typeof FeatureCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls
export const Default: Story = {
  args: {
    icon: Sparkle,
    title: 'RTL-First Design',
    description: 'Built from the ground up to support both LTR and RTL layouts seamlessly',
    href: '/rtl-guide'
  },
  render: (args, { globals }) => {
    const isRTL = globals?.direction === 'rtl';
    const t = (en: string, ar: string) => isRTL ? ar : en;

    return (
    <div className="max-w-sm">
      <FeatureCard {...args} title={t(args.title as string, 'تصميم يدعم الاتجاهين')} description={t(args.description as string, 'مبني من الأساس لدعم تخطيطات LTR و RTL بسلاسة')} />
    </div>
    );
  },
  parameters: {
    ar: {
      args: {
        title: 'تصميم يدعم الكتابة من اليمين إلى اليسار',
        description: 'مبني من الأساس لدعم التخطيطات من اليسار إلى اليمين ومن اليمين إلى اليسار بسلاسة'
      }
    }
  },
};

// Static Card - from component page lines 181-186
export const StaticCard: Story = {
  render: () => (
    <div className="max-w-sm">
      <FeatureCard
        icon={Sparkle}
        title="Amazing Feature"
        description="This is a static card without a link. Great for non-interactive displays."
      />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Static feature card without href. Non-interactive display.'
      }
    }
  }
};

// Clickable Card - from component page lines 198-203
export const ClickableCard: Story = {
  render: () => (
    <div className="max-w-sm">
      <FeatureCard
        icon={Rocket}
        title="Get Started"
        description="Click to learn how to begin using our components"
        href="/getting-started"
      />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Clickable feature card with href. Shows hover effect.'
      }
    }
  }
};

// Grid Layout - from component page lines 215-234
export const GridLayout: Story = {
  render: () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <FeatureCard
        icon={Lightning}
        title="Lightning Fast"
        description="Optimized for performance"
        href="/components"
      />
      <FeatureCard
        icon={Shield}
        title="Secure by Default"
        description="Built with security in mind"
        href="/documentation"
      />
      <FeatureCard
        icon={Package}
        title="Easy to Use"
        description="Simple API, powerful results"
        href="/examples"
      />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Grid layout with 3 feature cards. All cards are clickable.'
      }
    }
  }
};

// All Icons - showcase different icons
export const AllIcons: Story = {
  render: () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <FeatureCard
        icon={Sparkle}
        title="Amazing Feature"
        description="This feature will change your life"
      />
      <FeatureCard
        icon={Rocket}
        title="Get Started"
        description="Click to learn how to begin"
        href="/getting-started"
      />
      <FeatureCard
        icon={Lightning}
        title="Lightning Fast"
        description="Optimized for performance"
      />
      <FeatureCard
        icon={Shield}
        title="Secure"
        description="Built with security in mind"
      />
      <FeatureCard
        icon={Package}
        title="Easy to Use"
        description="Simple API, powerful results"
      />
      <FeatureCard
        icon={Gear}
        title="Customizable"
        description="Tailor to your needs"
      />
      <FeatureCard
        icon={Heart}
        title="User Friendly"
        description="Designed with users in mind"
      />
      <FeatureCard
        icon={Star}
        title="Premium Quality"
        description="Top-notch components"
      />
      <FeatureCard
        icon={Globe}
        title="Global Reach"
        description="Support for multiple languages"
      />
      <FeatureCard
        icon={Lock}
        title="Privacy First"
        description="Your data stays private"
      />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Showcase of different icons and use cases. Mix of static and clickable cards.'
      }
    }
  }
};

// In Card Container
export const InCardContainer: Story = {
  render: () => (
    <Card className="w-full max-w-4xl">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Key Features</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={Lightning}
            title="Lightning Fast"
            description="Optimized for performance"
            href="/components"
          />
          <FeatureCard
            icon={Shield}
            title="Secure by Default"
            description="Built with security in mind"
            href="/documentation"
          />
          <FeatureCard
            icon={Package}
            title="Easy to Use"
            description="Simple API, powerful results"
            href="/examples"
          />
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Feature cards grouped inside a card container with a title.'
      }
    }
  }
};

