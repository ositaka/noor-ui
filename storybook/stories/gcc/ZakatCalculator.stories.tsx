import type { Meta, StoryObj } from '@storybook/react';
import { ZakatCalculator } from '../../../components/ui/zakat-calculator';

const meta = {
  title: 'GCC-Specific/Zakat Calculator',
  component: ZakatCalculator,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    goldPricePerGram: { control: 'number' },
    silverPricePerGram: { control: 'number' },
    defaultValues: { control: false },
    onCalculate: { control: false },
    className: { control: false }
  }
} satisfies Meta<typeof ZakatCalculator>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground
export const Default: Story = {
  args: {
    goldPricePerGram: 250,
    silverPricePerGram: 3
  },
  render: (args, { globals }) => {
    return (
    <div className="max-w-2xl w-full">
      <ZakatCalculator {...args} />
    </div>
    );
  },
};

// With Default Values - from component page lines 124-131
export const WithDefaultValues: Story = {
  render: () => (
    <div className="max-w-2xl w-full">
      <ZakatCalculator
        goldPricePerGram={250}
        silverPricePerGram={3}
        defaultValues={{
          cash: 75000,
          gold: 150
        }}
      />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Zakat calculator with pre-filled values.'
      }
    }
  }
};

// Complete Example - from component page lines 54-65
export const CompleteExample: Story = {
  render: () => (
    <div className="max-w-2xl w-full">
      <ZakatCalculator
        goldPricePerGram={250}
        silverPricePerGram={3}
        defaultValues={{
          cash: 50000,
          gold: 100,
          silver: 0,
          business: 20000,
          investments: 30000,
          other: 0
        }}
      />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Full calculator with all asset categories filled.'
      }
    }
  }
};

// Empty Calculator
export const EmptyCalculator: Story = {
  render: () => (
    <div className="max-w-2xl w-full">
      <ZakatCalculator goldPricePerGram={250} silverPricePerGram={3} />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Empty calculator ready for user input.'
      }
    }
  }
};
