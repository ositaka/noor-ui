import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from 'storybook/test';
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
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['dots', 'pulse', 'wave', 'typing']
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg']
    },
    message: { control: 'text' }
  }
} satisfies Meta<typeof ThinkingIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground
export const Default: Story = {
  args: {
    variant: 'dots',
    message: 'Thinking...'
  },
  parameters: {
    docs: {
      story: {
        inline: false
      }
    },
    ar: {
      args: {
        message: 'جارٍ التفكير...'
      }
    }
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Showcase of all 4 animation variants.'
      }
    }
  }
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Indicators with custom messages.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders all three indicators', async () => {
      const indicators = canvas.getAllByRole('status');
      expect(indicators).toHaveLength(3);
    });

    await step('Displays custom messages', async () => {
      await expect(canvas.getByText('Thinking...')).toBeInTheDocument();
      await expect(canvas.getByText('Processing your request...')).toBeInTheDocument();
      await expect(canvas.getByText('Analyzing data...')).toBeInTheDocument();
    });

    await step('Each indicator has correct aria-label', async () => {
      const indicators = canvas.getAllByRole('status');
      await expect(indicators[0]).toHaveAttribute('aria-label', 'Thinking...');
      await expect(indicators[1]).toHaveAttribute('aria-label', 'Processing your request...');
      await expect(indicators[2]).toHaveAttribute('aria-label', 'Analyzing data...');
    });
  }
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Indicators in different sizes.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders all size variants', async () => {
      const indicators = canvas.getAllByRole('status');
      expect(indicators).toHaveLength(3);
    });

    await step('Displays size-specific messages', async () => {
      await expect(canvas.getByText('Small size')).toBeInTheDocument();
      await expect(canvas.getByText('Default size')).toBeInTheDocument();
      await expect(canvas.getByText('Large size')).toBeInTheDocument();
    });

    await step('All indicators are visible', async () => {
      const indicators = canvas.getAllByRole('status');
      indicators.forEach(indicator => {
        expect(indicator).toBeVisible();
      });
    });
  }
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Indicator in chat message context with avatar.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders in chat context', async () => {
      const indicator = canvas.getByRole('status');
      await expect(indicator).toBeInTheDocument();
      await expect(indicator).toBeVisible();
    });

    await step('Displays with AI avatar', async () => {
      await expect(canvas.getByText('AI')).toBeInTheDocument();
    });
  }
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Just the dots variant.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders dots variant', async () => {
      const indicator = canvas.getByRole('status');
      await expect(indicator).toBeInTheDocument();
      await expect(indicator).toBeVisible();
    });

    await step('Displays description text', async () => {
      await expect(canvas.getByText(/Bouncing dots animation/i)).toBeInTheDocument();
    });
  }
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Just the pulse variant.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders pulse variant', async () => {
      const indicator = canvas.getByRole('status');
      await expect(indicator).toBeInTheDocument();
      await expect(indicator).toBeVisible();
    });

    await step('Displays description text', async () => {
      await expect(canvas.getByText(/Pulsing fade animation/i)).toBeInTheDocument();
    });
  }
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Just the wave variant.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders wave variant', async () => {
      const indicator = canvas.getByRole('status');
      await expect(indicator).toBeInTheDocument();
      await expect(indicator).toBeVisible();
    });

    await step('Displays description text', async () => {
      await expect(canvas.getByText(/Wave animation/i)).toBeInTheDocument();
    });
  }
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Just the typing variant.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders typing variant', async () => {
      const indicator = canvas.getByRole('status');
      await expect(indicator).toBeInTheDocument();
      await expect(indicator).toBeVisible();
    });

    await step('Displays description text', async () => {
      await expect(canvas.getByText(/Typing bubble animation/i)).toBeInTheDocument();
    });
  }
};

