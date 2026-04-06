import type { Meta, StoryObj } from '@storybook/react';
import { within, expect, userEvent } from 'storybook/test';
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
  title: 'AI-LLM Shell/Token Counter',
  component: TokenCounter,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
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
    },
    ar: {
      args: {
        label: 'استخدام الرموز'
      }
    }
  },
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Token counter with cost calculation based on pricing per 1K tokens.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Displays cost information', async () => {
      await expect(canvas.getByText('Estimated Cost')).toBeInTheDocument();
      await expect(canvas.getByText('$0.0885')).toBeInTheDocument();
    });

    await step('Shows cost breakdown on hover', async () => {
      const costElement = canvas.getByText('$0.0885');
      await userEvent.hover(costElement);

      // Tooltip renders in portal
      const body = within(document.body);
      const tooltip = await body.findByRole('tooltip', {}, { timeout: 3000 });
      await expect(tooltip).toBeVisible();

      // Verify breakdown shows input and output costs
      await expect(tooltip).toHaveTextContent('Input');
      await expect(tooltip).toHaveTextContent('Output');
    });
  }
};

// Warning States - from component page lines 270-291
export const WarningStates: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-12 w-80">
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Token counter with different warning states based on usage percentage.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Safe state displays without warning badge', async () => {
      // 1500 / 4096 = 36.6% (safe)
      await expect(canvas.getByText('1,500')).toBeInTheDocument();
      await expect(canvas.getByText('36.6%')).toBeInTheDocument();
    });

    await step('Warning state displays warning badge', async () => {
      // 3200 / 4096 = 78.1% (warning)
      await expect(canvas.getByText('3,200')).toBeInTheDocument();
      await expect(canvas.getByText('78.1%')).toBeInTheDocument();
      await expect(canvas.getByText('Warning')).toBeInTheDocument();
    });

    await step('Danger state displays near limit badge', async () => {
      // 3800 / 4096 = 92.8% (danger)
      await expect(canvas.getByText('3,800')).toBeInTheDocument();
      await expect(canvas.getByText('92.8%')).toBeInTheDocument();
      await expect(canvas.getByText('Near Limit')).toBeInTheDocument();
    });

    await step('All states show progress bars', async () => {
      const progressBars = canvasElement.querySelectorAll('[role="progressbar"]');
      await expect(progressBars.length).toBe(3);
    });
  }
};

// Different Models - from component page lines 308-327
export const DifferentModels: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-12 w-80">
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
  parameters: {
    controls: { disable: true },
    docs: {
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Compact variant for space-constrained layouts.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders compact variant with all elements', async () => {
      await expect(canvas.getByText('Token Usage')).toBeInTheDocument();
      await expect(canvas.getByText('2,100')).toBeInTheDocument();
      await expect(canvas.getByText('51.3%')).toBeInTheDocument();
    });

    await step('Shows token breakdown in compact mode', async () => {
      await expect(canvas.getByText('Input Tokens')).toBeInTheDocument();
      await expect(canvas.getByText('1,250')).toBeInTheDocument();
      await expect(canvas.getByText('Output Tokens')).toBeInTheDocument();
      await expect(canvas.getByText('850')).toBeInTheDocument();
    });

    await step('Progress bar is visible', async () => {
      const progressBar = canvasElement.querySelector('[role="progressbar"]');
      await expect(progressBar).toBeInTheDocument();
    });
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Token counter with custom warning and danger thresholds.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Displays usage at danger threshold', async () => {
      // 3500 / 4096 = 85.4% (above 75% danger threshold)
      await expect(canvas.getByText('3,500')).toBeInTheDocument();
      await expect(canvas.getByText('85.4%')).toBeInTheDocument();
    });

    await step('Shows danger badge with custom threshold', async () => {
      await expect(canvas.getByText('Near Limit')).toBeInTheDocument();
    });

    await step('Displays description text', async () => {
      await expect(canvas.getByText(/Customize when warnings appear/)).toBeInTheDocument();
    });
  }
};

// Without Cost - from component page lines 383-389
export const WithoutCost: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6 w-80">
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Token counter without cost display.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders token counter without cost section', async () => {
      await expect(canvas.getByText('Token Usage')).toBeInTheDocument();
      await expect(canvas.getByText('2,100')).toBeInTheDocument();
      await expect(canvas.getByText('51.3%')).toBeInTheDocument();
    });

    await step('Shows token breakdown', async () => {
      await expect(canvas.getByText('Input Tokens')).toBeInTheDocument();
      await expect(canvas.getByText('1,250')).toBeInTheDocument();
      await expect(canvas.getByText('Output Tokens')).toBeInTheDocument();
      await expect(canvas.getByText('850')).toBeInTheDocument();
    });

    await step('Cost estimation is not displayed', async () => {
      await expect(canvas.queryByText('Estimated Cost')).not.toBeInTheDocument();
    });
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Token counter in safe state with low usage.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Displays safe usage label and token count', async () => {
      await expect(canvas.getByText('Safe Usage')).toBeInTheDocument();
      // 1000 + 500 = 1500 tokens
      await expect(canvas.getByText('1,500')).toBeInTheDocument();
    });

    await step('Shows safe percentage below threshold', async () => {
      // 1500 / 4096 = 36.6%
      await expect(canvas.getByText('36.6%')).toBeInTheDocument();
    });

    await step('No warning badge is displayed in safe state', async () => {
      await expect(canvas.queryByText('Warning')).not.toBeInTheDocument();
      await expect(canvas.queryByText('Near Limit')).not.toBeInTheDocument();
    });

    await step('Shows cost estimation', async () => {
      await expect(canvas.getByText('Estimated Cost')).toBeInTheDocument();
      // Input: 1000/1000 * 0.03 = 0.03, Output: 500/1000 * 0.06 = 0.03, Total: 0.06
      await expect(canvas.getByText('$0.0600')).toBeInTheDocument();
    });
  }
};

