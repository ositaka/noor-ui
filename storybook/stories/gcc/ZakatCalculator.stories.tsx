import type { Meta, StoryObj } from '@storybook/react';
import { ZakatCalculator } from '../../../components/ui/zakat-calculator';

/**
 * Zakat Calculator Component Stories
 *
 * All examples are taken from /app/(docs)/components/zakat-calculator/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Zakat Calculator helps calculate Islamic wealth tax (Zakat).
 * Features: Multi-asset input, nisab calculation, bilingual support, RTL-ready.
 */

const meta = {
  title: 'GCC/Zakat Calculator',
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  render: (args) => (
    <div className="max-w-2xl w-full">
      <ZakatCalculator {...args} />
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Empty calculator ready for user input.'
      }
    }
  }
};

// RTL Default
export const RTLDefault: Story = {
  render: () => (
    <div className="max-w-2xl w-full">
      <ZakatCalculator goldPricePerGram={250} silverPricePerGram={3} />
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
        story: 'Zakat calculator in RTL with Arabic labels.'
      }
    }
  }
};

// RTL With Values
export const RTLWithValues: Story = {
  render: () => (
    <div className="max-w-2xl w-full">
      <ZakatCalculator
        goldPricePerGram={250}
        silverPricePerGram={3}
        defaultValues={{
          cash: 75000,
          gold: 150,
          business: 20000
        }}
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
        story: 'Calculator in RTL with pre-filled values and Arabic numerals.'
      }
    }
  }
};

// RTL Complete
export const RTLComplete: Story = {
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
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Complete calculator in RTL with all assets.'
      }
    }
  }
};
