import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ModelSelector, defaultModels, type AIModel } from '../../../components/ui/model-selector';
import { Card, CardContent } from '../../../components/ui/card';
import { useState } from 'react';

/**
 * Model Selector Component Stories
 *
 * All examples are taken from /app/(docs)/components/model-selector/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Model Selector is a dropdown for selecting AI models.
 * Features: Model specs display (speed, context, pricing), provider grouping, recommended badge, custom icons, RTL support.
 */

const meta = {
  title: 'AI-LLM Shell/Model Selector',
  component: ModelSelector,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    models: { control: false },
    value: { control: 'text' },
    onValueChange: { control: false },
    isRTL: { control: 'boolean' },
    placeholder: { control: 'text' },
    placeholderAr: { control: 'text' },
    className: { control: false }
  }
} satisfies Meta<typeof ModelSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground
export const Default: Story = {
  args: {
    models: defaultModels,
    value: 'gpt-4',
    onValueChange: fn()
  },
  render: (args) => {
    const [value, setValue] = useState(args.value || 'gpt-4');
    return (
      <div className="w-full max-w-md space-y-3">
        <ModelSelector
          {...args}
          value={value}
          onValueChange={(v) => {
            setValue(v);
            args.onValueChange?.(v);
          }}
        />
        <p className="text-sm text-muted-foreground">
          Selected: {value}
        </p>
      </div>
    );
  },
};

// With Default Models - from component page lines 214-219
export const WithDefaultModels: Story = {
  render: () => {
    const [selectedModel, setSelectedModel] = useState('gpt-4');
    return (
      <Card>
        <CardContent className="p-6">
          <div className="max-w-md space-y-3">
            <p className="text-sm text-muted-foreground">
              Includes GPT-4, GPT-3.5 Turbo, Claude 3 Opus, Claude 3 Sonnet, and Gemini Pro.
            </p>
            <ModelSelector
              models={defaultModels}
              value={selectedModel}
              onValueChange={setSelectedModel}
            />
          </div>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Model selector with default AI models.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Renders with default models', async () => {
      await expect(canvas.getByRole('combobox')).toBeInTheDocument();
      await expect(canvas.getByText('GPT-4')).toBeInTheDocument();
      await expect(canvas.getByText(/Includes GPT-4/i)).toBeInTheDocument();
    });

    await step('Can select a different model', async () => {
      await userEvent.click(canvas.getByRole('combobox'));
      const turboOption = await body.findByRole('option', { name: /GPT-3.5 Turbo/ });
      await userEvent.click(turboOption);

      await expect(canvas.getByText('GPT-3.5 Turbo')).toBeInTheDocument();
      await expect(canvas.getByText('Fast')).toBeInTheDocument();
    });
  }
};

// Model Specs Display - from component page lines 245-251
export const ModelSpecsDisplay: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Shows detailed model information including speed, context length, and pricing.
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Model name and provider</li>
            <li>Speed indicator (fast/medium/slow)</li>
            <li>Context length in tokens</li>
            <li>Pricing per 1K tokens</li>
            <li>Recommended badge</li>
            <li>Custom icon per model</li>
          </ul>
          <div className="pt-2">
            <ModelSelector
              models={defaultModels}
              value="claude-3-sonnet"
              onValueChange={() => {}}
              placeholder="Try clicking to see all models"
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
        story: 'Model selector showing detailed specifications for each model.'
      }
    }
  }
};

// Custom Models - from component page lines 266-296
export const CustomModels: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="max-w-md space-y-3">
          <p className="text-sm text-muted-foreground">
            Create custom model configurations with your own specifications.
          </p>
          <ModelSelector
            models={[
              {
                id: 'custom-model-1',
                name: 'Custom Fast Model',
                provider: 'Custom Provider',
                description: 'A custom model',
                specs: {
                  speed: 'fast' as const,
                  contextLength: 16000,
                  pricing: '$0.001/1K tokens'
                },
                recommended: true,
                icon: 'zap' as const
              },
              {
                id: 'custom-model-2',
                name: 'Custom Smart Model',
                provider: 'Custom Provider',
                description: 'Another custom model',
                specs: {
                  speed: 'medium' as const,
                  contextLength: 100000,
                  pricing: '$0.01/1K tokens'
                },
                icon: 'brain' as const
              },
            ]}
            value="custom-model-1"
            onValueChange={() => {}}
          />
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Model selector with custom model definitions.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Renders custom models', async () => {
      await expect(canvas.getByText('Custom Fast Model')).toBeInTheDocument();
      await expect(canvas.getByText('Fast')).toBeInTheDocument();
      await expect(canvas.getByText(/16K/i)).toBeInTheDocument();
      await expect(canvas.getByText(/recommended/i)).toBeInTheDocument();
    });

    await step('Shows custom models in dropdown', async () => {
      await userEvent.click(canvas.getByRole('combobox'));

      await expect(await body.findByRole('option', { name: /Custom Fast Model/ })).toBeInTheDocument();
      await expect(body.getByRole('option', { name: /Custom Smart Model/ })).toBeInTheDocument();

      // Verify custom provider grouping
      await expect(body.getByText('Custom Provider')).toBeInTheDocument();
    });
  }
};

// Controlled Component - from component page lines 311-322
export const ControlledComponent: Story = {
  render: () => {
    const [selectedModel, setSelectedModel] = useState('gpt-4');
    return (
      <Card>
        <CardContent className="p-6">
          <div className="max-w-md space-y-4">
            <ModelSelector
              models={defaultModels}
              value={selectedModel}
              onValueChange={(value) => {
                setSelectedModel(value);
                console.log('Model changed to:', value);
              }}
            />
            <div className="text-xs text-muted-foreground">
              <p>Current selection: <code className="bg-muted px-1 rounded">{selectedModel}</code></p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Controlled model selector with state tracking.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Shows current selection', async () => {
      await expect(canvas.getByText('Current selection:')).toBeInTheDocument();
      await expect(canvas.getByText('gpt-4')).toBeInTheDocument();
      await expect(canvas.getByText('GPT-4')).toBeInTheDocument();
    });

    await step('Updates selection and displays new value', async () => {
      await userEvent.click(canvas.getByRole('combobox'));
      const geminiOption = await body.findByRole('option', { name: /Gemini Pro/ });
      await userEvent.click(geminiOption);

      // Verify display updated
      await expect(canvas.getByText('Gemini Pro')).toBeInTheDocument();
      await expect(canvas.getByText('gemini-pro')).toBeInTheDocument();
    });
  }
};

// All Providers
export const AllProviders: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">OpenAI Models</h4>
        <p className="text-xs text-muted-foreground mb-3">GPT-4 (recommended), GPT-3.5 Turbo</p>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Anthropic Models</h4>
        <p className="text-xs text-muted-foreground mb-3">Claude 3 Opus, Claude 3 Sonnet (recommended)</p>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Google Models</h4>
        <p className="text-xs text-muted-foreground mb-3">Gemini Pro</p>
      </div>
      <ModelSelector
        models={defaultModels}
        value="claude-3-opus"
        onValueChange={() => {}}
      />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Showcase of models grouped by provider.'
      }
    }
  }
  // No play function - visual showcase only
};

// Speed Variants
export const SpeedVariants: Story = {
  render: () => {
    const [fast, setFast] = useState('gpt-3.5-turbo');
    const [medium, setMedium] = useState('gpt-4');
    return (
      <div className="max-w-md space-y-6">
        <div>
          <h4 className="text-sm font-medium mb-2 text-green-600 dark:text-green-500">Fast Models</h4>
          <p className="text-xs text-muted-foreground mb-3">GPT-3.5 Turbo, Claude 3 Sonnet, Gemini Pro</p>
          <ModelSelector
            models={defaultModels.filter(m => m.specs.speed === 'fast')}
            value={fast}
            onValueChange={setFast}
          />
        </div>
        <div>
          <h4 className="text-sm font-medium mb-2 text-yellow-600 dark:text-yellow-500">Medium Speed Models</h4>
          <p className="text-xs text-muted-foreground mb-3">GPT-4, Claude 3 Opus</p>
          <ModelSelector
            models={defaultModels.filter(m => m.specs.speed === 'medium')}
            value={medium}
            onValueChange={setMedium}
          />
        </div>
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Models grouped by speed category.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders fast models category', async () => {
      await expect(canvas.getByText('Fast Models')).toBeInTheDocument();
      await expect(canvas.getByText('GPT-3.5 Turbo')).toBeInTheDocument();
      await expect(canvas.getByText('Fast')).toBeInTheDocument();
    });

    await step('Renders medium speed models category', async () => {
      await expect(canvas.getByText('Medium Speed Models')).toBeInTheDocument();
      await expect(canvas.getByText('GPT-4')).toBeInTheDocument();
      await expect(canvas.getByText('Medium')).toBeInTheDocument();
    });

    await step('Both selectors are interactive', async () => {
      const selectors = canvas.getAllByRole('combobox');
      await expect(selectors).toHaveLength(2);

      // Verify both are enabled
      for (const selector of selectors) {
        await expect(selector).toBeEnabled();
      }
    });
  }
};

