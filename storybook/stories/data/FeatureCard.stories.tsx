import type { Meta, StoryObj } from '@storybook/react';
import { FeatureCard } from '../../../components/ui/feature-card';
import { Card, CardContent } from '../../../components/ui/card';
import { Sparkles, Rocket, Zap, Shield, Package, Settings, Heart, Star, Globe, Lock } from 'lucide-react';
import * as React from 'react';

/**
 * FeatureCard Component Stories
 *
 * All examples are taken from /app/(docs)/components/feature-card/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: FeatureCard displays features with icon, title, and description.
 * Features: Optional href for clickable cards, icon display, RTL support.
 */

const meta = {
  title: 'Data Display/FeatureCard',
  component: FeatureCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: false,
    },
    title: {
      control: { type: 'text' },
    },
    description: {
      control: { type: 'text' },
    },
    href: {
      control: { type: 'text' },
    },
    className: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof FeatureCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls
export const Default: Story = {
  args: {
    icon: Sparkles,
    title: 'RTL-First Design',
    description: 'Built from the ground up to support both LTR and RTL layouts seamlessly',
    href: '/rtl-guide',
  },
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  render: (args) => (
    <div className="max-w-sm">
      <FeatureCard {...args} />
    </div>
  ),
  parameters: {
    docs: {
      story: {
        inline: false,
      },
    },
  },
};

// Static Card - from component page lines 181-186
export const StaticCard: Story = {
  render: () => (
    <div className="max-w-sm">
      <FeatureCard
        icon={Sparkles}
        title="Amazing Feature"
        description="This is a static card without a link. Great for non-interactive displays."
      />
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Static feature card without href. Non-interactive display.',
      },
    },
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Clickable feature card with href. Shows hover effect.',
      },
    },
  },
};

// Grid Layout - from component page lines 215-234
export const GridLayout: Story = {
  render: () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <FeatureCard
        icon={Zap}
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
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Grid layout with 3 feature cards. All cards are clickable.',
      },
    },
  },
};

// All Icons - showcase different icons
export const AllIcons: Story = {
  render: () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <FeatureCard
        icon={Sparkles}
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
        icon={Zap}
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
        icon={Settings}
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
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Showcase of different icons and use cases. Mix of static and clickable cards.',
      },
    },
  },
};

// In Card Container
export const InCardContainer: Story = {
  render: () => (
    <Card className="w-full max-w-4xl">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Key Features</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={Zap}
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
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Feature cards grouped inside a card container with a title.',
      },
    },
  },
};

// RTL Example - Basic
export const RTLExample: Story = {
  render: () => (
    <div className="max-w-sm">
      <FeatureCard
        icon={Sparkles}
        title="تصميم يدعم الكتابة من اليمين إلى اليسار"
        description="مبني من الأساس لدعم التخطيطات من اليسار إلى اليمين ومن اليمين إلى اليسار بسلاسة"
        href="/rtl-guide"
      />
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Feature card in RTL mode with Arabic text. Layout flows right-to-left.',
      },
    },
  },
};

// RTL Static Card
export const RTLStaticCard: Story = {
  render: () => (
    <div className="max-w-sm">
      <FeatureCard
        icon={Sparkles}
        title="ميزة رائعة"
        description="هذه بطاقة ثابتة بدون رابط. رائعة للعروض غير التفاعلية."
      />
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Static feature card in RTL without href. Non-interactive display in Arabic.',
      },
    },
  },
};

// RTL Clickable Card
export const RTLClickableCard: Story = {
  render: () => (
    <div className="max-w-sm">
      <FeatureCard
        icon={Rocket}
        title="ابدأ الآن"
        description="انقر لتتعلم كيفية البدء في استخدام مكوناتنا"
        href="/getting-started"
      />
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Clickable feature card in RTL with hover effect in Arabic.',
      },
    },
  },
};

// RTL Grid Layout
export const RTLGridLayout: Story = {
  render: () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <FeatureCard
        icon={Zap}
        title="سريع كالبرق"
        description="محسّن للأداء"
        href="/components"
      />
      <FeatureCard
        icon={Shield}
        title="آمن افتراضياً"
        description="مبني مع وضع الأمان في الاعتبار"
        href="/documentation"
      />
      <FeatureCard
        icon={Package}
        title="سهل الاستخدام"
        description="واجهة برمجية بسيطة، نتائج قوية"
        href="/examples"
      />
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Grid layout in RTL mode with Arabic text. All cards are clickable.',
      },
    },
  },
};

// RTL In Card Container
export const RTLInCardContainer: Story = {
  render: () => (
    <Card className="w-full max-w-4xl">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">الميزات الرئيسية</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={Zap}
            title="سريع كالبرق"
            description="محسّن للأداء"
            href="/components"
          />
          <FeatureCard
            icon={Shield}
            title="آمن افتراضياً"
            description="مبني مع وضع الأمان في الاعتبار"
            href="/documentation"
          />
          <FeatureCard
            icon={Package}
            title="سهل الاستخدام"
            description="واجهة برمجية بسيطة، نتائج قوية"
            href="/examples"
          />
        </div>
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Feature cards in RTL inside a card container. All content flows right-to-left.',
      },
    },
  },
};
