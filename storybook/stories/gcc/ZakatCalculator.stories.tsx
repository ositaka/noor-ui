import type { Meta, StoryObj } from '@storybook/react';
import { within, expect, userEvent } from 'storybook/test';
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
  tags: ['!autodocs'],
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
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders calculator structure', async () => {
      // Verify nisab information card
      await expect(canvas.getByText('Nisab Information')).toBeInTheDocument();
      await expect(canvas.getByText(/Gold Nisab/i)).toBeInTheDocument();
      await expect(canvas.getByText(/Silver Nisab/i)).toBeInTheDocument();

      // Verify asset input section
      await expect(canvas.getByText('Your Assets')).toBeInTheDocument();
      // Use input IDs directly since they are stable
      await expect(canvasElement.querySelector('#cash')).toBeInTheDocument();
      await expect(canvasElement.querySelector('#gold')).toBeInTheDocument();
      await expect(canvasElement.querySelector('#silver')).toBeInTheDocument();
      await expect(canvasElement.querySelector('#business')).toBeInTheDocument();
      await expect(canvasElement.querySelector('#investments')).toBeInTheDocument();
      await expect(canvasElement.querySelector('#other')).toBeInTheDocument();

      // Verify calculation result section
      await expect(canvas.getByText('Calculation Result')).toBeInTheDocument();
      await expect(canvas.getByText(/Total Wealth/i)).toBeInTheDocument();
    });

    await step('Shows "Below Nisab" status for empty calculator', async () => {
      // Initially, with no assets, should show below nisab
      const badge = canvas.getByText('Below Nisab');
      await expect(badge).toBeInTheDocument();

      // Should show info message
      await expect(canvas.getByText(/Your wealth is below the Nisab threshold/i)).toBeInTheDocument();
    });

    await step('Calculates zakat when entering asset values', async () => {
      const cashInput = canvasElement.querySelector('#cash') as HTMLInputElement;
      const goldInput = canvasElement.querySelector('#gold') as HTMLInputElement;
      const businessInput = canvasElement.querySelector('#business') as HTMLInputElement;

      // Enter values that exceed nisab (85g * 250 SAR = 21,250 SAR)
      await userEvent.clear(cashInput);
      await userEvent.type(cashInput, '50000');

      await userEvent.clear(goldInput);
      await userEvent.type(goldInput, '100');

      await userEvent.clear(businessInput);
      await userEvent.type(businessInput, '20000');

      // Should now show "Zakat Due" status
      await expect(canvas.getByText('Zakat Due')).toBeInTheDocument();

      // Should show zakat due amount section
      await expect(canvas.getByText(/Zakat Due \(2\.5%\)/i)).toBeInTheDocument();
    });

    await step('Export buttons are functional', async () => {
      // Verify all export buttons are present
      await expect(canvas.getByRole('button', { name: /Copy/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /Download/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /Print/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /JSON/i })).toBeInTheDocument();
    });
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
      description: {
        story: 'Zakat calculator with pre-filled values.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders with pre-filled values', async () => {
      const cashInput = canvasElement.querySelector('#cash') as HTMLInputElement;
      const goldInput = canvasElement.querySelector('#gold') as HTMLInputElement;

      // Verify default values are populated
      await expect(cashInput).toHaveValue(75000);
      await expect(goldInput).toHaveValue(150);
    });

    await step('Shows zakat due status with pre-filled values', async () => {
      // With cash 75,000 + gold 150g (37,500) = 112,500 SAR, exceeds nisab
      await expect(canvas.getByText('Zakat Due')).toBeInTheDocument();
      await expect(canvas.getByText(/Zakat Due \(2\.5%\)/i)).toBeInTheDocument();
    });

    await step('Calculation updates when modifying values', async () => {
      const cashInput = canvasElement.querySelector('#cash') as HTMLInputElement;

      // Update cash value
      await userEvent.clear(cashInput);
      await userEvent.type(cashInput, '100000');

      // Should still show zakat due with increased amount
      await expect(canvas.getByText('Zakat Due')).toBeInTheDocument();
    });
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
      description: {
        story: 'Full calculator with all asset categories filled.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders with all asset categories filled', async () => {
      const cashInput = canvasElement.querySelector('#cash') as HTMLInputElement;
      const goldInput = canvasElement.querySelector('#gold') as HTMLInputElement;
      const silverInput = canvasElement.querySelector('#silver') as HTMLInputElement;
      const businessInput = canvasElement.querySelector('#business') as HTMLInputElement;
      const investmentsInput = canvasElement.querySelector('#investments') as HTMLInputElement;
      const otherInput = canvasElement.querySelector('#other') as HTMLInputElement;

      // Verify all values are populated
      await expect(cashInput).toHaveValue(50000);
      await expect(goldInput).toHaveValue(100);
      // Silver with value 0 shows as empty due to component's `value={assets.silver || ''}`
      await expect(silverInput).toHaveValue(null);
      await expect(businessInput).toHaveValue(20000);
      await expect(investmentsInput).toHaveValue(30000);
      // Other with value 0 shows as empty due to component's `value={assets.other || ''}`
      await expect(otherInput).toHaveValue(null);
    });

    await step('Shows zakat due for complete asset portfolio', async () => {
      // Total: 50,000 + 25,000 (gold) + 20,000 + 30,000 = 125,000 SAR
      await expect(canvas.getByText('Zakat Due')).toBeInTheDocument();
      await expect(canvas.getByText(/Zakat Due \(2\.5%\)/i)).toBeInTheDocument();
    });

    await step('All input fields are editable', async () => {
      const investmentsInput = canvasElement.querySelector('#investments') as HTMLInputElement;

      // Test editing a field
      await userEvent.clear(investmentsInput);
      await userEvent.type(investmentsInput, '50000');

      // Calculation should update (still shows zakat due)
      await expect(canvas.getByText('Zakat Due')).toBeInTheDocument();
    });
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
      description: {
        story: 'Empty calculator ready for user input.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders empty calculator', async () => {
      await expect(canvas.getByText('Your Assets')).toBeInTheDocument();
      await expect(canvas.getByText('Calculation Result')).toBeInTheDocument();

      // All inputs should be empty (value 0 or null)
      const cashInput = canvasElement.querySelector('#cash') as HTMLInputElement;
      const goldInput = canvasElement.querySelector('#gold') as HTMLInputElement;

      // Empty number inputs show empty string value
      await expect(cashInput.value).toBe('');
      await expect(goldInput.value).toBe('');
    });

    await step('Shows below nisab status', async () => {
      await expect(canvas.getByText('Below Nisab')).toBeInTheDocument();
      await expect(canvas.getByText(/Your wealth is below the Nisab threshold/i)).toBeInTheDocument();
    });

    await step('Can enter values from empty state', async () => {
      const cashInput = canvasElement.querySelector('#cash') as HTMLInputElement;

      // Enter a value
      await userEvent.type(cashInput, '5000');

      // Should still be below nisab (5000 < 21,250)
      await expect(canvas.getByText('Below Nisab')).toBeInTheDocument();
    });
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
      description: {
        story: 'Zakat calculator in RTL with Arabic labels.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders in RTL with Arabic labels', async () => {
      // Check for Arabic text content
      await expect(canvas.getByText('معلومات النصاب')).toBeInTheDocument(); // Nisab Information
      await expect(canvas.getByText('أصولك')).toBeInTheDocument(); // Your Assets
      await expect(canvas.getByText('نتيجة الحساب')).toBeInTheDocument(); // Calculation Result
    });

    await step('Input fields work in RTL', async () => {
      // Get inputs by their id attribute (language-independent)
      const cashInput = canvasElement.querySelector('#cash') as HTMLInputElement;
      const goldInput = canvasElement.querySelector('#gold') as HTMLInputElement;

      await expect(cashInput).toBeInTheDocument();
      await expect(goldInput).toBeInTheDocument();

      // Test entering values in RTL context
      await userEvent.type(cashInput, '50000');
      await expect(cashInput).toHaveValue(50000);
    });
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
      description: {
        story: 'Calculator in RTL with pre-filled values and Arabic numerals.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders with pre-filled values in RTL', async () => {
      const cashInput = canvasElement.querySelector('#cash') as HTMLInputElement;
      const goldInput = canvasElement.querySelector('#gold') as HTMLInputElement;
      const businessInput = canvasElement.querySelector('#business') as HTMLInputElement;

      // Verify default values
      await expect(cashInput).toHaveValue(75000);
      await expect(goldInput).toHaveValue(150);
      await expect(businessInput).toHaveValue(20000);
    });

    await step('Shows zakat status in Arabic', async () => {
      // Check for Arabic "Zakat Due" text
      await expect(canvas.getByText('الزكاة واجبة')).toBeInTheDocument();
    });

    await step('Export buttons work in RTL', async () => {
      // Export buttons should be present
      const buttons = canvas.getAllByRole('button');
      await expect(buttons.length).toBeGreaterThan(0);
    });
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
      description: {
        story: 'Complete calculator in RTL with all assets.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders complete asset portfolio in RTL', async () => {
      const cashInput = canvasElement.querySelector('#cash') as HTMLInputElement;
      const goldInput = canvasElement.querySelector('#gold') as HTMLInputElement;
      const silverInput = canvasElement.querySelector('#silver') as HTMLInputElement;
      const businessInput = canvasElement.querySelector('#business') as HTMLInputElement;
      const investmentsInput = canvasElement.querySelector('#investments') as HTMLInputElement;
      const otherInput = canvasElement.querySelector('#other') as HTMLInputElement;

      // Verify all values
      await expect(cashInput).toHaveValue(50000);
      await expect(goldInput).toHaveValue(100);
      // Silver with value 0 shows as empty due to component's `value={assets.silver || ''}`
      await expect(silverInput).toHaveValue(null);
      await expect(businessInput).toHaveValue(20000);
      await expect(investmentsInput).toHaveValue(30000);
      // Other with value 0 shows as empty due to component's `value={assets.other || ''}`
      await expect(otherInput).toHaveValue(null);
    });

    await step('Shows complete calculation in Arabic', async () => {
      // Verify Arabic text for calculation result
      await expect(canvas.getByText('نتيجة الحساب')).toBeInTheDocument();
      await expect(canvas.getByText('الزكاة واجبة')).toBeInTheDocument();
    });

    await step('Can edit values in RTL context', async () => {
      const investmentsInput = canvasElement.querySelector('#investments') as HTMLInputElement;

      // Clear and update
      await userEvent.clear(investmentsInput);
      await userEvent.type(investmentsInput, '40000');

      await expect(investmentsInput).toHaveValue(40000);
    });
  }
};
