import type { Meta, StoryObj } from '@storybook/react';
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
  title: 'AI/Model Selector',
  component: ModelSelector,
  parameters: {
    layout: 'centered'
  },
  tags: ['!autodocs'],
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
    value: 'gpt-4'
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  render: (args) => {
    const [value, setValue] = useState(args.value || 'gpt-4');
    return (
      <div className="w-full max-w-md space-y-3">
        <ModelSelector {...args} value={value} onValueChange={setValue} />
        <p className="text-sm text-muted-foreground">
          Selected: {value}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      story: {
        inline: false
      }
    }
  }
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Model selector with default AI models.'
      }
    }
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Model selector with custom model definitions.'
      }
    }
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Controlled model selector with state tracking.'
      }
    }
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Showcase of models grouped by provider.'
      }
    }
  }
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Models grouped by speed category.'
      }
    }
  }
};

// RTL Default
export const RTLDefault: Story = {
  render: () => {
    const [selectedModel, setSelectedModel] = useState('gpt-4');
    return (
      <div className="w-full max-w-md space-y-3">
        <ModelSelector
          models={defaultModels}
          value={selectedModel}
          onValueChange={setSelectedModel}
          isRTL={true}
        />
        <p className="text-sm text-muted-foreground">
          المحدد: {selectedModel}
        </p>
      </div>
    );
  },
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Model selector in RTL with Arabic text.'
      }
    }
  }
};

// RTL With Selection
export const RTLWithSelection: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="max-w-md space-y-3">
          <p className="text-sm text-muted-foreground">
            يتضمن جميع النماذج الافتراضية مع النصوص العربية الكاملة.
          </p>
          <ModelSelector
            models={defaultModels}
            value="claude-3-sonnet"
            onValueChange={() => {}}
            isRTL={true}
            placeholderAr="اختر نموذج الذكاء الاصطناعي"
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
        story: 'Model selector in RTL with a model selected.'
      }
    }
  }
};

// RTL Custom Models
export const RTLCustomModels: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="max-w-md space-y-3">
          <p className="text-sm text-muted-foreground">
            نماذج مخصصة بالنصوص العربية.
          </p>
          <ModelSelector
            models={[
              {
                id: 'custom-ar-1',
                name: 'Custom Model',
                nameAr: 'نموذج مخصص سريع',
                provider: 'Custom',
                providerAr: 'مخصص',
                description: 'Fast model',
                descriptionAr: 'نموذج سريع',
                specs: {
                  speed: 'fast' as const,
                  speedLabel: 'Fast',
                  speedLabelAr: 'سريع',
                  contextLength: 16000,
                  pricing: '$0.001/1K',
                  pricingAr: '٠٫٠٠١$ / ١٠٠٠ رمز'
                },
                recommended: true,
                icon: 'zap' as const
              },
              {
                id: 'custom-ar-2',
                name: 'Smart Model',
                nameAr: 'نموذج ذكي',
                provider: 'Custom',
                providerAr: 'مخصص',
                description: 'Advanced model',
                descriptionAr: 'نموذج متقدم',
                specs: {
                  speed: 'medium' as const,
                  speedLabel: 'Medium',
                  speedLabelAr: 'متوسط',
                  contextLength: 100000,
                  pricing: '$0.01/1K',
                  pricingAr: '٠٫٠١$ / ١٠٠٠ رمز'
                },
                icon: 'brain' as const
              },
            ]}
            value="custom-ar-1"
            onValueChange={() => {}}
            isRTL={true}
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
        story: 'Custom models with full Arabic translations in RTL.'
      }
    }
  }
};
