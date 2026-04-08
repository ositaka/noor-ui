import type { Meta, StoryObj } from '@storybook/react';
import { ParameterSlider, temperaturePresets } from '../../../components/ui/parameter-slider';
import { Card, CardContent } from '../../../components/ui/card';
import { useState } from 'react';

const meta = {
  title: 'AI-LLM Shell/Parameter Slider',
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
  render: (args, { globals }) => {
    const [value, setValue] = useState(args.value);
    return (
      <div className="max-w-md w-full">
        <ParameterSlider {...args} value={value} onValueChange={setValue} />
      </div>
    );
  },
  parameters: {
    ar: {
      args: {
        label: 'درجة الحرارة',
        description: 'يتحكم في العشوائية في الردود'
      }
    }
  },
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
  parameters: {
    controls: { disable: true },
    docs: {
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
  parameters: {
    controls: { disable: true },
    docs: {
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
  parameters: {
    controls: { disable: true },
    docs: {
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
  parameters: {
    controls: { disable: true },
    docs: {
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
  parameters: {
    controls: { disable: true },
    docs: {
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Slider with value badge hidden.'
      }
    }
  }
};

