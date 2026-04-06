import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from 'storybook/test';
import { ArabicNumber } from '../../../components/ui/arabic-number';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';

/**
 * Arabic Number Component Stories
 *
 * All examples are taken from /app/(docs)/components/arabic-number/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Arabic Number formats numbers with proper locale support and Arabic-Indic numerals.
 * Features: Currency, percentage, compact formatting, Arabic numerals (٠-٩), RTL-ready.
 */

const meta = {
  title: 'GCC-Specific/Arabic Number',
  component: ArabicNumber,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'number' },
    format: {
      control: { type: 'select' },
      options: ['number', 'currency', 'percentage', 'compact']
    },
    decimals: { control: 'number' },
    locale: {
      control: { type: 'select' },
      options: ['en', 'ar']
    },
    useArabicNumerals: { control: 'boolean' },
    className: { control: false }
  }
} satisfies Meta<typeof ArabicNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls
export const Default: Story = {
  args: {
    value: 1234567.89,
    decimals: 2
  },
  parameters: {
    docs: {
      story: {
        inline: false
      }
    }
  },
};

// Western Numerals - from component page lines 60-80
export const WesternNumerals: Story = {
  render: () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Western Numerals</CardTitle>
        <CardDescription>Standard format (0-9)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Number</p>
          <ArabicNumber value={1234567.89} decimals={2} className="text-2xl" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Currency</p>
          <ArabicNumber value={9999.99} format="currency" className="text-2xl" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Percentage</p>
          <ArabicNumber value={0.7545} format="percentage" className="text-2xl" />
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Numbers formatted with Western numerals (0-9).'
      }
    }
  }
};

// Arabic Indic Numerals - from component page lines 82-118
export const ArabicIndicNumerals: Story = {
  render: () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Arabic-Indic Numerals</CardTitle>
        <CardDescription>٠١٢٣٤٥٦٧٨٩</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Number</p>
          <ArabicNumber
            value={1234567.89}
            decimals={2}
            useArabicNumerals
            className="text-2xl"
          />
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Currency</p>
          <ArabicNumber
            value={9999.99}
            format="currency"
            locale="ar"
            useArabicNumerals
            className="text-2xl"
          />
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Percentage</p>
          <ArabicNumber
            value={0.7545}
            format="percentage"
            locale="ar"
            useArabicNumerals
            className="text-2xl"
          />
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Numbers formatted with Arabic-Indic numerals (٠-٩).'
      }
    }
  }
};

// Currency Format
export const CurrencyFormat: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-muted-foreground mb-2">English - SAR 9,999.99</p>
        <ArabicNumber value={9999.99} format="currency" className="text-2xl" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Arabic - ٩٬٩٩٩٫٩٩ ر.س.</p>
        <ArabicNumber
          value={9999.99}
          format="currency"
          locale="ar"
          useArabicNumerals
          className="text-2xl"
        />
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Currency formatting in both Western and Arabic numerals.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders English currency format', async () => {
      const numbers = canvasElement.querySelectorAll('span.text-2xl');
      // English format: 9,999.99 SAR
      await expect(numbers[0]).toHaveTextContent('9,999.99 SAR');
    });

    await step('Renders Arabic currency format', async () => {
      const numbers = canvasElement.querySelectorAll('span.text-2xl');
      // Arabic format with Arabic-Indic numerals: ٩٬٩٩٩٫٩٩ ر.س
      await expect(numbers[1]).toHaveTextContent('٩٬٩٩٩٫٩٩ ر.س');
    });

    await step('Displays descriptive labels', async () => {
      // Check for label text containing key identifiers
      await expect(canvas.getByText(/English.*SAR/)).toBeVisible();
      await expect(canvas.getByText(/Arabic/)).toBeVisible();
    });
  }
};

// Percentage Format
export const PercentageFormat: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-muted-foreground mb-2">0.7545 → 75.45%</p>
        <ArabicNumber value={0.7545} format="percentage" className="text-2xl" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">0.7545 → ٪٧٥٫٤٥</p>
        <ArabicNumber
          value={0.7545}
          format="percentage"
          locale="ar"
          useArabicNumerals
          className="text-2xl"
        />
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Percentage formatting with Western and Arabic numerals.'
      }
    }
  }
};

// Compact Format
export const CompactFormat: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-muted-foreground mb-2">1,234,567 → 1.2M</p>
        <ArabicNumber value={1234567} format="compact" className="text-2xl" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">1,234,567 → ١٫٢ مليون</p>
        <ArabicNumber
          value={1234567}
          format="compact"
          locale="ar"
          useArabicNumerals
          className="text-2xl"
        />
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Compact notation for large numbers (1.2M, 3.4K, etc.).'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders English compact format', async () => {
      const numbers = canvasElement.querySelectorAll('span.text-2xl');
      // English compact format: 1.2M
      await expect(numbers[0]).toHaveTextContent('1.2M');
    });

    await step('Renders Arabic compact format', async () => {
      const numbers = canvasElement.querySelectorAll('span.text-2xl');
      // Arabic compact format with Arabic-Indic numerals: ١٫٢ مليون
      await expect(numbers[1]).toHaveTextContent('١٫٢ مليون');
    });

    await step('Displays compact notation description', async () => {
      // Labels show the conversion examples
      await expect(canvas.getByText('1,234,567 → 1.2M')).toBeVisible();
      await expect(canvas.getByText('1,234,567 → ١٫٢ مليون')).toBeVisible();
    });
  }
};

// All Formats
export const AllFormats: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <div>
        <h4 className="text-sm font-medium mb-2">Number</h4>
        <ArabicNumber value={1234567.89} decimals={2} className="text-xl" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Currency</h4>
        <ArabicNumber value={9999.99} format="currency" className="text-xl" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Percentage</h4>
        <ArabicNumber value={0.7545} format="percentage" className="text-xl" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Compact</h4>
        <ArabicNumber value={1234567} format="compact" className="text-xl" />
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Showcase of all number formatting options.'
      }
    }
  }
};
