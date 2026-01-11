import type { Meta, StoryObj } from '@storybook/react';
import { TokenCounter } from '../../../components/ui/token-counter';
import { Card, CardContent } from '../../../components/ui/card';

/**
 * Token Counter Component Stories
 *
 * All examples are taken from /app/(docs)/components/token-counter/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Token Counter displays AI usage statistics.
 * Features: Input/output tokens, cost estimation, usage percentage, warning states, RTL support.
 */

const meta = {
  title: 'AI/Token Counter',
  component: TokenCounter,
  parameters: {
    layout: 'centered'
  },
  tags: ['!autodocs'],
  argTypes: {
    inputTokens: { control: 'number' },
    outputTokens: { control: 'number' },
    maxTokens: { control: 'number' },
    inputCostPer1K: { control: 'number' },
    outputCostPer1K: { control: 'number' },
    showCost: { control: 'boolean' },
    showBreakdown: { control: 'boolean' },
    variant: {
      control: { type: 'select' },
      options: ['default', 'compact']
    },
    warningThreshold: { control: 'number' },
    dangerThreshold: { control: 'number' },
    isRTL: { control: 'boolean' },
    label: { control: 'text' },
    labelAr: { control: 'text' }
  }
} satisfies Meta<typeof TokenCounter>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground
export const Default: Story = {
  args: {
    inputTokens: 1250,
    outputTokens: 850,
    maxTokens: 4096,
    inputCostPer1K: 0.03,
    outputCostPer1K: 0.06,
    label: 'Token Usage'
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  render: (args) => (
    <div className="max-w-md w-full">
      <TokenCounter {...args} />
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

// With Cost Estimation - from component page lines 246-253
export const WithCostEstimation: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="max-w-md">
          <TokenCounter
            inputTokens={1250}
            outputTokens={850}
            maxTokens={4096}
            inputCostPer1K={0.03}
            outputCostPer1K={0.06}
            showCost={true}
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
      disable: true,
      description: {
        story: 'Token counter with cost calculation based on pricing per 1K tokens.'
      }
    }
  }
};

// Warning States - from component page lines 270-291
export const WarningStates: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Safe (&lt; 70%)</p>
            <TokenCounter
              inputTokens={1000}
              outputTokens={500}
              maxTokens={4096}
            />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Warning (70-90%)</p>
            <TokenCounter
              inputTokens={2000}
              outputTokens={1200}
              maxTokens={4096}
            />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Danger (&gt; 90%)</p>
            <TokenCounter
              inputTokens={3000}
              outputTokens={800}
              maxTokens={4096}
            />
          </div>
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
      disable: true,
      description: {
        story: 'Token counter with different warning states based on usage percentage.'
      }
    }
  }
};

// Different Models - from component page lines 308-327
export const DifferentModels: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">GPT-4 (expensive)</p>
            <TokenCounter
              inputTokens={1500}
              outputTokens={1000}
              maxTokens={8000}
              inputCostPer1K={0.03}
              outputCostPer1K={0.06}
              label="GPT-4 Token Usage"
            />
          </div>
          <div>
            <p className="text-sm font-medium mb-2">GPT-3.5 Turbo (affordable)</p>
            <TokenCounter
              inputTokens={1500}
              outputTokens={1000}
              maxTokens={4096}
              inputCostPer1K={0.0015}
              outputCostPer1K={0.002}
              label="GPT-3.5 Token Usage"
            />
          </div>
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
      disable: true,
      description: {
        story: 'Token counter comparing different AI models with different pricing.'
      }
    }
  }
};

// Compact Variant - from component page lines 339-344
export const CompactVariant: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="max-w-md">
          <TokenCounter
            inputTokens={1250}
            outputTokens={850}
            maxTokens={4096}
            variant="compact"
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
      disable: true,
      description: {
        story: 'Compact variant for space-constrained layouts.'
      }
    }
  }
};

// Custom Thresholds - from component page lines 362-368
export const CustomThresholds: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="max-w-md space-y-3">
          <p className="text-sm text-muted-foreground">
            Customize when warnings appear (50% warning, 75% danger):
          </p>
          <TokenCounter
            inputTokens={2500}
            outputTokens={1000}
            maxTokens={4096}
            warningThreshold={50}
            dangerThreshold={75}
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
      disable: true,
      description: {
        story: 'Token counter with custom warning and danger thresholds.'
      }
    }
  }
};

// Without Cost - from component page lines 383-389
export const WithoutCost: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="max-w-md">
          <TokenCounter
            inputTokens={1250}
            outputTokens={850}
            maxTokens={4096}
            showCost={false}
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
      disable: true,
      description: {
        story: 'Token counter without cost display.'
      }
    }
  }
};

// Safe State
export const SafeState: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="max-w-md space-y-3">
          <p className="text-sm text-muted-foreground">
            Usage at 37% - well within safe limits.
          </p>
          <TokenCounter
            inputTokens={1000}
            outputTokens={500}
            maxTokens={4096}
            inputCostPer1K={0.03}
            outputCostPer1K={0.06}
            label="Safe Usage"
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
      disable: true,
      description: {
        story: 'Token counter in safe state with low usage.'
      }
    }
  }
};

// RTL With Cost
export const RTLWithCost: Story = {
  render: () => (
    <div className="max-w-md w-full">
      <TokenCounter
        inputTokens={1250}
        outputTokens={850}
        maxTokens={4096}
        inputCostPer1K={0.03}
        outputCostPer1K={0.06}
        isRTL={true}
        labelAr="استخدام الرموز"
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
      disable: true,
      description: {
        story: 'Token counter in RTL with Arabic label and cost display.'
      }
    }
  }
};

// RTL Warning States
export const RTLWarningStates: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">آمن (&lt; ٧٠٪)</p>
            <TokenCounter
              inputTokens={1000}
              outputTokens={500}
              maxTokens={4096}
              isRTL={true}
              labelAr="استخدام آمن"
            />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">تحذير (٧٠-٩٠٪)</p>
            <TokenCounter
              inputTokens={2000}
              outputTokens={1200}
              maxTokens={4096}
              isRTL={true}
              labelAr="تحذير"
            />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">خطر (&gt; ٩٠٪)</p>
            <TokenCounter
              inputTokens={3000}
              outputTokens={800}
              maxTokens={4096}
              isRTL={true}
              labelAr="خطر"
            />
          </div>
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
      disable: true,
      description: {
        story: 'All warning states in RTL with Arabic labels.'
      }
    }
  }
};
