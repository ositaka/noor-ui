import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
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
    layout: 'centered'
  },
  tags: ['!autodocs'],
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
    icon: Sparkles,
    title: 'RTL-First Design',
    description: 'Built from the ground up to support both LTR and RTL layouts seamlessly',
    href: '/rtl-guide'
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  render: (args) => (
    <div className="max-w-sm">
      <FeatureCard {...args} />
    </div>
  ),
  parameters: {
    docs: {
      story: {
        inline: false
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders correctly', async () => {
      await expect(canvas.getByText('RTL-First Design')).toBeInTheDocument();
      await expect(canvas.getByText('Built from the ground up to support both LTR and RTL layouts seamlessly')).toBeInTheDocument();
    });

    await step('Contains icon SVG element', async () => {
      const svg = canvasElement.querySelector('svg');
      await expect(svg).toBeInTheDocument();
      await expect(svg).toBeVisible();
    });

    await step('Renders as clickable link when href provided', async () => {
      const link = canvasElement.querySelector('a[href="/rtl-guide"]');
      await expect(link).toBeInTheDocument();
    });
  }
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
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Static feature card without href. Non-interactive display.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders static card content', async () => {
      await expect(canvas.getByText('Amazing Feature')).toBeInTheDocument();
      await expect(canvas.getByText('This is a static card without a link. Great for non-interactive displays.')).toBeInTheDocument();
    });

    await step('Contains icon SVG element', async () => {
      const svg = canvasElement.querySelector('svg');
      await expect(svg).toBeInTheDocument();
    });

    await step('Verifies no link element when href not provided', async () => {
      const link = canvasElement.querySelector('a');
      await expect(link).not.toBeInTheDocument();
    });
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Clickable feature card with href. Shows hover effect.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders clickable card content', async () => {
      await expect(canvas.getByText('Get Started')).toBeInTheDocument();
      await expect(canvas.getByText('Click to learn how to begin using our components')).toBeInTheDocument();
    });

    await step('Contains icon SVG element', async () => {
      const svg = canvasElement.querySelector('svg');
      await expect(svg).toBeInTheDocument();
    });

    await step('Renders as clickable link', async () => {
      const link = canvasElement.querySelector('a[href="/getting-started"]');
      await expect(link).toBeInTheDocument();
    });
  }
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
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Grid layout with 3 feature cards. All cards are clickable.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders all three cards', async () => {
      await expect(canvas.getByText('Lightning Fast')).toBeInTheDocument();
      await expect(canvas.getByText('Secure by Default')).toBeInTheDocument();
      await expect(canvas.getByText('Easy to Use')).toBeInTheDocument();
    });

    await step('All cards have links', async () => {
      await expect(canvasElement.querySelector('a[href="/components"]')).toBeInTheDocument();
      await expect(canvasElement.querySelector('a[href="/documentation"]')).toBeInTheDocument();
      await expect(canvasElement.querySelector('a[href="/examples"]')).toBeInTheDocument();
    });

    await step('Contains multiple icon SVG elements', async () => {
      const svgs = canvasElement.querySelectorAll('svg');
      await expect(svgs.length).toBe(3);
    });
  }
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
    locale: 'en'
  },
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
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Feature cards grouped inside a card container with a title.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders container heading', async () => {
      await expect(canvas.getByText('Key Features')).toBeInTheDocument();
    });

    await step('Renders all feature cards inside container', async () => {
      await expect(canvas.getByText('Lightning Fast')).toBeInTheDocument();
      await expect(canvas.getByText('Secure by Default')).toBeInTheDocument();
      await expect(canvas.getByText('Easy to Use')).toBeInTheDocument();
    });

    await step('All cards are clickable', async () => {
      await expect(canvasElement.querySelector('a[href="/components"]')).toBeInTheDocument();
      await expect(canvasElement.querySelector('a[href="/documentation"]')).toBeInTheDocument();
      await expect(canvasElement.querySelector('a[href="/examples"]')).toBeInTheDocument();
    });
  }
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
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Feature card in RTL mode with Arabic text. Layout flows right-to-left.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders in RTL context', async () => {
      await expect(canvas.getByText('تصميم يدعم الكتابة من اليمين إلى اليسار')).toBeInTheDocument();
      await expect(canvas.getByText('مبني من الأساس لدعم التخطيطات من اليسار إلى اليمين ومن اليمين إلى اليسار بسلاسة')).toBeInTheDocument();
    });

    await step('Link works in RTL', async () => {
      const link = canvasElement.querySelector('a[href="/rtl-guide"]');
      await expect(link).toBeInTheDocument();
    });
  }
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
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Static feature card in RTL without href. Non-interactive display in Arabic.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders static RTL card', async () => {
      await expect(canvas.getByText('ميزة رائعة')).toBeInTheDocument();
      await expect(canvas.getByText('هذه بطاقة ثابتة بدون رابط. رائعة للعروض غير التفاعلية.')).toBeInTheDocument();
    });

    await step('Verifies no link in static RTL card', async () => {
      const link = canvasElement.querySelector('a');
      await expect(link).not.toBeInTheDocument();
    });
  }
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
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Clickable feature card in RTL with hover effect in Arabic.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders clickable RTL card', async () => {
      await expect(canvas.getByText('ابدأ الآن')).toBeInTheDocument();
      await expect(canvas.getByText('انقر لتتعلم كيفية البدء في استخدام مكوناتنا')).toBeInTheDocument();
    });

    await step('Link works in RTL', async () => {
      const link = canvasElement.querySelector('a[href="/getting-started"]');
      await expect(link).toBeInTheDocument();
    });
  }
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
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Grid layout in RTL mode with Arabic text. All cards are clickable.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders all RTL cards in grid', async () => {
      await expect(canvas.getByText('سريع كالبرق')).toBeInTheDocument();
      await expect(canvas.getByText('آمن افتراضياً')).toBeInTheDocument();
      await expect(canvas.getByText('سهل الاستخدام')).toBeInTheDocument();
    });

    await step('All RTL cards have links', async () => {
      await expect(canvasElement.querySelector('a[href="/components"]')).toBeInTheDocument();
      await expect(canvasElement.querySelector('a[href="/documentation"]')).toBeInTheDocument();
      await expect(canvasElement.querySelector('a[href="/examples"]')).toBeInTheDocument();
    });
  }
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
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Feature cards in RTL inside a card container. All content flows right-to-left.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders RTL container heading', async () => {
      await expect(canvas.getByText('الميزات الرئيسية')).toBeInTheDocument();
    });

    await step('Renders all RTL feature cards inside container', async () => {
      await expect(canvas.getByText('سريع كالبرق')).toBeInTheDocument();
      await expect(canvas.getByText('آمن افتراضياً')).toBeInTheDocument();
      await expect(canvas.getByText('سهل الاستخدام')).toBeInTheDocument();
    });

    await step('All RTL cards are clickable', async () => {
      await expect(canvasElement.querySelector('a[href="/components"]')).toBeInTheDocument();
      await expect(canvasElement.querySelector('a[href="/documentation"]')).toBeInTheDocument();
      await expect(canvasElement.querySelector('a[href="/examples"]')).toBeInTheDocument();
    });
  }
};
