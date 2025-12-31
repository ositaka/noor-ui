import type { Meta, StoryObj } from '@storybook/react';
import { ParameterSlider, temperaturePresets } from '../../../components/ui/parameter-slider';
import { Card, CardContent } from '../../../components/ui/card';
import { useState } from 'react';

/**
 * Parameter Slider Component Stories
 *
 * All examples are taken from /app/(docs)/components/parameter-slider/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Parameter Slider is for adjusting AI model parameters.
 * Features: Labeled slider with value display, preset buttons, info tooltips, RTL support.
 */

const meta = {
  title: 'AI/Parameter Slider',
  component: ParameterSlider,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    labelAr: { control: 'text' },
    description: { control: 'text' },
    descriptionAr: { control: 'text' },
    value: { control: 'number' },
    onValueChange: { control: false },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    decimals: { control: 'number' },
    presets: { control: false },
    showValue: { control: 'boolean' },
    isRTL: { control: 'boolean' },
    className: { control: false }
  }
} satisfies Meta<typeof ParameterSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground
export const Default: Story = {
  args: {
    label: 'Temperature',
    description: 'Controls randomness in responses',
    min: 0,
    max: 2,
    step: 0.1,
    value: 0.7
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div className="max-w-md w-full">
        <ParameterSlider {...args} value={value} onValueChange={setValue} />
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

// With Presets - from component page lines 302-314
export const WithPresets: Story = {
  render: () => {
    const [temperature, setTemperature] = useState(0.7);
    return (
      <Card>
        <CardContent className="p-6">
          <div className="max-w-md">
            <ParameterSlider
              label="Temperature"
              description="Controls randomness in responses"
              value={temperature}
              onValueChange={setTemperature}
              min={0}
              max={2}
              step={0.1}
              presets={temperaturePresets}
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
      disable: true,
      description: {
        story: 'Temperature slider with Precise, Balanced, and Creative presets.'
      }
    }
  }
};

// Custom Presets - from component page lines 328-344
export const CustomPresets: Story = {
  render: () => {
    const [maxTokens, setMaxTokens] = useState(1024);
    return (
      <Card>
        <CardContent className="p-6">
          <div className="max-w-md">
            <ParameterSlider
              label="Max Tokens"
              description="Maximum length of response"
              value={maxTokens}
              onValueChange={setMaxTokens}
              min={1}
              max={4096}
              step={1}
              decimals={0}
              presets={[
                { label: 'Short', value: 256, description: 'Brief responses' },
                { label: 'Medium', value: 1024, description: 'Standard responses' },
                { label: 'Long', value: 4096, description: 'Detailed responses' },
              ]}
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
      disable: true,
      description: {
        story: 'Max tokens slider with custom Short/Medium/Long presets.'
      }
    }
  }
};

// Multiple Parameters - from component page lines 359-401
export const MultipleParameters: Story = {
  render: () => {
    const [temperature, setTemperature] = useState(0.7);
    const [topP, setTopP] = useState(0.9);
    const [maxTokens, setMaxTokens] = useState(1024);
    return (
      <Card>
        <CardContent className="p-6">
          <div className="max-w-md space-y-6">
            <ParameterSlider
              label="Temperature"
              description="Controls randomness"
              value={temperature}
              onValueChange={setTemperature}
              min={0}
              max={2}
              step={0.1}
              presets={temperaturePresets}
            />

            <ParameterSlider
              label="Top P"
              description="Controls diversity via nucleus sampling"
              value={topP}
              onValueChange={setTopP}
              min={0}
              max={1}
              step={0.05}
            />

            <ParameterSlider
              label="Max Tokens"
              description="Maximum length of response"
              value={maxTokens}
              onValueChange={setMaxTokens}
              min={1}
              max={4096}
              step={1}
              decimals={0}
            />

            <div className="text-xs text-muted-foreground pt-2 border-t">
              <p>Current settings:</p>
              <p>Temperature: {temperature}, Top P: {topP}, Max Tokens: {maxTokens}</p>
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
      disable: true,
      description: {
        story: 'Multiple AI parameters configured together.'
      }
    }
  }
};

// Without Presets - from component page lines 415-426
export const WithoutPresets: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="max-w-md">
          <ParameterSlider
            label="Frequency Penalty"
            description="Penalizes repeated tokens based on frequency"
            value={0}
            onValueChange={() => {}}
            min={-2}
            max={2}
            step={0.1}
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
        story: 'Slider without preset buttons.'
      }
    }
  }
};

// All Preset States
export const AllPresetStates: Story = {
  render: () => {
    const [value, setValue] = useState(0.7);
    return (
      <div className="max-w-md space-y-6">
        <div>
          <h4 className="text-sm font-medium mb-3">Default Temperature Presets</h4>
          <ParameterSlider
            label="Temperature"
            description="Hover over preset buttons to see descriptions"
            value={value}
            onValueChange={setValue}
            min={0}
            max={2}
            step={0.1}
            presets={temperaturePresets}
          />
          <p className="text-xs text-muted-foreground mt-3">
            Presets: Precise (0.3), Balanced (0.7), Creative (1.0)
          </p>
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
      disable: true,
      description: {
        story: 'Showcase of all temperature preset states.'
      }
    }
  }
};

// Without Value Display
export const WithoutValueDisplay: Story = {
  render: () => {
    const [value, setValue] = useState(0.7);
    return (
      <Card>
        <CardContent className="p-6">
          <div className="max-w-md">
            <ParameterSlider
              label="Temperature"
              description="Value display hidden"
              value={value}
              onValueChange={setValue}
              min={0}
              max={2}
              step={0.1}
              showValue={false}
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
      disable: true,
      description: {
        story: 'Slider with value badge hidden.'
      }
    }
  }
};

// RTL Temperature
export const RTLTemperature: Story = {
  render: () => {
    const [temperature, setTemperature] = useState(0.7);
    return (
      <div className="max-w-md w-full">
        <ParameterSlider
          label="Temperature"
          labelAr="درجة الحرارة"
          description="Controls randomness in responses"
          descriptionAr="يتحكم في العشوائية في الردود"
          value={temperature}
          onValueChange={setTemperature}
          min={0}
          max={2}
          step={0.1}
          presets={temperaturePresets}
          isRTL={true}
        />
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
      disable: true,
      description: {
        story: 'Temperature slider in RTL with Arabic text and presets.'
      }
    }
  }
};

// RTL Multiple Parameters
export const RTLMultipleParameters: Story = {
  render: () => {
    const [temperature, setTemperature] = useState(0.7);
    const [topP, setTopP] = useState(0.9);
    const [maxTokens, setMaxTokens] = useState(1024);
    return (
      <Card>
        <CardContent className="p-6">
          <div className="max-w-md space-y-6">
            <ParameterSlider
              label="Temperature"
              labelAr="درجة الحرارة"
              description="Controls randomness"
              descriptionAr="يتحكم في العشوائية"
              value={temperature}
              onValueChange={setTemperature}
              min={0}
              max={2}
              step={0.1}
              presets={temperaturePresets}
              isRTL={true}
            />

            <ParameterSlider
              label="Top P"
              labelAr="توب بي"
              description="Controls diversity via nucleus sampling"
              descriptionAr="يتحكم في التنوع عبر أخذ عينات النواة"
              value={topP}
              onValueChange={setTopP}
              min={0}
              max={1}
              step={0.05}
              isRTL={true}
            />

            <ParameterSlider
              label="Max Tokens"
              labelAr="الحد الأقصى للرموز"
              description="Maximum length of response"
              descriptionAr="الحد الأقصى لطول الرد"
              value={maxTokens}
              onValueChange={setMaxTokens}
              min={1}
              max={4096}
              step={1}
              decimals={0}
              isRTL={true}
            />

            <div className="text-xs text-muted-foreground pt-2 border-t">
              <p>الإعدادات الحالية:</p>
              <p>درجة الحرارة: {temperature}، توب بي: {topP}، الحد الأقصى: {maxTokens}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  },
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Multiple parameters in RTL with full Arabic translations.'
      }
    }
  }
};

// RTL With Custom Presets
export const RTLWithCustomPresets: Story = {
  render: () => {
    const [maxTokens, setMaxTokens] = useState(1024);
    return (
      <Card>
        <CardContent className="p-6">
          <div className="max-w-md">
            <ParameterSlider
              label="Max Tokens"
              labelAr="الحد الأقصى للرموز"
              description="Maximum length of response"
              descriptionAr="الحد الأقصى لطول الرد"
              value={maxTokens}
              onValueChange={setMaxTokens}
              min={1}
              max={4096}
              step={1}
              decimals={0}
              presets={[
                {
                  label: 'Short',
                  labelAr: 'قصير',
                  value: 256,
                  description: 'Brief responses',
                  descriptionAr: 'ردود مختصرة'
                },
                {
                  label: 'Medium',
                  labelAr: 'متوسط',
                  value: 1024,
                  description: 'Standard responses',
                  descriptionAr: 'ردود قياسية'
                },
                {
                  label: 'Long',
                  labelAr: 'طويل',
                  value: 4096,
                  description: 'Detailed responses',
                  descriptionAr: 'ردود مفصلة'
                },
              ]}
              isRTL={true}
            />
          </div>
        </CardContent>
      </Card>
    );
  },
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Custom presets with full Arabic translations in RTL.'
      }
    }
  }
};
