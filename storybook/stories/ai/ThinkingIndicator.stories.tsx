import type { Meta, StoryObj } from '@storybook/react';
import { ThinkingIndicator } from '../../../components/ui/thinking-indicator';
import { Card, CardContent } from '../../../components/ui/card';
import { Separator } from '../../../components/ui/separator';

/**
 * Thinking Indicator Component Stories
 *
 * All examples are taken from /app/(docs)/components/thinking-indicator/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Thinking Indicator shows AI processing state.
 * Features: 4 variants (dots, pulse, wave, typing), 3 sizes, optional message, RTL-ready.
 */

const meta = {
  title: 'AI/Thinking Indicator',
  component: ThinkingIndicator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['dots', 'pulse', 'wave', 'typing'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
    },
    message: { control: 'text' },
  },
} satisfies Meta<typeof ThinkingIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground
export const Default: Story = {
  args: {
    variant: 'dots',
    message: 'Thinking...',
  },
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    docs: {
      story: {
        inline: false,
      },
    },
  },
};

// All Variants - from component page lines 156-175
export const AllVariants: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <ThinkingIndicator variant="dots" />
            <span className="text-sm text-muted-foreground">Dots (bouncing)</span>
          </div>
          <Separator />
          <div className="flex items-center gap-4">
            <ThinkingIndicator variant="pulse" />
            <span className="text-sm text-muted-foreground">Pulse (fading)</span>
          </div>
          <Separator />
          <div className="flex items-center gap-4">
            <ThinkingIndicator variant="wave" />
            <span className="text-sm text-muted-foreground">Wave (flowing)</span>
          </div>
          <Separator />
          <div className="flex items-center gap-4">
            <ThinkingIndicator variant="typing" />
            <span className="text-sm text-muted-foreground">Typing (bubble)</span>
          </div>
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
        story: 'Showcase of all 4 animation variants.',
      },
    },
  },
};

// With Messages - from component page lines 189-193
export const WithMessages: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <ThinkingIndicator variant="typing" message="Thinking..." />
          <Separator />
          <ThinkingIndicator variant="dots" message="Processing your request..." />
          <Separator />
          <ThinkingIndicator variant="wave" message="Analyzing data..." />
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
        story: 'Indicators with custom messages.',
      },
    },
  },
};

// Size Variants - from component page lines 208-212
export const SizeVariants: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <ThinkingIndicator size="sm" message="Small size" />
          <Separator />
          <ThinkingIndicator size="default" message="Default size" />
          <Separator />
          <ThinkingIndicator size="lg" message="Large size" />
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
        story: 'Indicators in different sizes.',
      },
    },
  },
};

// In Chat Context - from component page lines 227-234
export const InChatContext: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="max-w-2xl space-y-4">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              AI
            </div>
            <div className="flex-1">
              <ThinkingIndicator variant="typing" />
            </div>
          </div>
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
        story: 'Indicator in chat message context with avatar.',
      },
    },
  },
};

// Dots Only
export const DotsOnly: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-3">
          <ThinkingIndicator variant="dots" />
          <p className="text-xs text-muted-foreground">
            Bouncing dots animation - good for general loading states.
          </p>
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
        story: 'Just the dots variant.',
      },
    },
  },
};

// Pulse Only
export const PulseOnly: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-3">
          <ThinkingIndicator variant="pulse" />
          <p className="text-xs text-muted-foreground">
            Pulsing fade animation - subtle and non-distracting.
          </p>
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
        story: 'Just the pulse variant.',
      },
    },
  },
};

// Wave Only
export const WaveOnly: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-3">
          <ThinkingIndicator variant="wave" />
          <p className="text-xs text-muted-foreground">
            Wave animation - flowing motion for processing states.
          </p>
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
        story: 'Just the wave variant.',
      },
    },
  },
};

// Typing Only
export const TypingOnly: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-3">
          <ThinkingIndicator variant="typing" />
          <p className="text-xs text-muted-foreground">
            Typing bubble animation - perfect for chat interfaces.
          </p>
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
        story: 'Just the typing variant.',
      },
    },
  },
};

// RTL With Messages
export const RTLWithMessages: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <ThinkingIndicator variant="typing" message="جارٍ التفكير..." />
          <Separator />
          <ThinkingIndicator variant="dots" message="جارٍ معالجة طلبك..." />
          <Separator />
          <ThinkingIndicator variant="wave" message="جارٍ تحليل البيانات..." />
          <Separator />
          <ThinkingIndicator variant="pulse" message="جارٍ الإنشاء..." />
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
        story: 'Indicators with Arabic messages in RTL.',
      },
    },
  },
};
