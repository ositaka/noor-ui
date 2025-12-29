import type { Meta, StoryObj } from '@storybook/react';
import { NumberInput } from '../../../components/ui/number-input';
import { Label } from '../../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import * as React from 'react';

/**
 * Number Input Component Stories
 *
 * All examples are taken from /app/(docs)/components/number-input/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Number Input provides formatted number input with increment/decrement controls,
 * validation, decimal precision, and currency formatting support
 */

const meta = {
  title: 'Forms/Number Input',
  component: NumberInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onChange: {
      control: false,
    },
    onValueChange: {
      control: false,
    },
    formatDisplay: {
      control: false,
    },
    parseValue: {
      control: false,
    },
    value: {
      control: { type: 'number' },
    },
    min: {
      control: { type: 'number' },
    },
    max: {
      control: { type: 'number' },
    },
    step: {
      control: { type: 'number' },
    },
    precision: {
      control: { type: 'number' },
    },
    showControls: {
      control: { type: 'boolean' },
    },
    allowNegative: {
      control: { type: 'boolean' },
    },
    allowDecimal: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls (hidden from stories list to avoid ID conflicts)
export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    showControls: true,
  },
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  render: (args) => {
    const [value, setValue] = React.useState<number | undefined>(42);

    return (
      <div className="w-full max-w-xs space-y-2">
        <Label>Quantity</Label>
        <NumberInput {...args} value={value} onChange={setValue} />
        <p className="text-sm text-muted-foreground">Current value: {value}</p>
      </div>
    );
  },
  parameters: {
    docs: {
      story: {
        inline: false,
      },
    },
  },
};

// Basic Number Input - from component page lines 228-234
export const BasicNumberInput: Story = {
  render: () => {
    const [value, setValue] = React.useState<number | undefined>(42);

    return (
      <div className="w-full max-w-xs mx-auto space-y-2">
        <Label>Quantity</Label>
        <NumberInput value={value} onChange={setValue} min={0} max={100} />
        <p className="text-sm text-muted-foreground">Current value: {value}</p>
      </div>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Basic number input with min/max validation and increment/decrement controls.',
      },
    },
  },
};

// Without Controls - from component page lines 256-266
export const WithoutControls: Story = {
  render: () => {
    const [value, setValue] = React.useState<number | undefined>(undefined);

    return (
      <div className="w-full max-w-xs mx-auto space-y-2">
        <Label>Amount</Label>
        <NumberInput
          value={value}
          onChange={setValue}
          showControls={false}
          placeholder="Enter amount"
        />
        <p className="text-sm text-muted-foreground">
          Value: {value ?? 'undefined'}
        </p>
      </div>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Number input without increment/decrement controls, just a plain input field.',
      },
    },
  },
};

// Decimal Precision - from component page lines 283-287
export const DecimalPrecision: Story = {
  render: () => {
    const [value, setValue] = React.useState<number | undefined>(5.5);

    return (
      <div className="w-full max-w-xs mx-auto space-y-2">
        <Label>Percentage</Label>
        <NumberInput value={value} onChange={setValue} step={0.1} precision={2} min={0} max={100} />
        <p className="text-sm text-muted-foreground">
          Value: {value?.toFixed(2) ?? '0.00'}%
        </p>
      </div>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Number input with decimal precision control, perfect for percentages and fractional values.',
      },
    },
  },
};

// Formatted Display - from component page lines 305-314
export const FormattedDisplay: Story = {
  render: () => {
    const [value, setValue] = React.useState<number | undefined>(1234.56);

    return (
      <div className="w-full max-w-xs mx-auto space-y-2">
        <Label>Amount</Label>
        <NumberInput
          value={value}
          onChange={setValue}
          thousandsSeparator=","
          precision={2}
          step={100}
        />
        <p className="text-sm text-muted-foreground">
          Value: {value?.toLocaleString('en-US') ?? '0'}
        </p>
      </div>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Number input with thousands separator for better readability of large numbers.',
      },
    },
  },
};

// Currency Input - from component page lines 332-342
export const CurrencyInput: Story = {
  render: () => {
    const [price, setPrice] = React.useState<number | undefined>(99.99);

    const formatCurrency = (value: number): string => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value);
    };

    return (
      <div className="w-full max-w-xs mx-auto space-y-2">
        <Label>Price</Label>
        <NumberInput
          value={price}
          onChange={setPrice}
          precision={2}
          formatDisplay={formatCurrency}
          min={0}
          step={0.01}
        />
        <p className="text-sm text-muted-foreground">Raw value: {price}</p>
      </div>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Number input with custom currency formatting using Intl.NumberFormat.',
      },
    },
  },
};

// Product Order - from component page lines 358-395
export const ProductOrder: Story = {
  render: () => {
    const [quantity, setQuantity] = React.useState<number | undefined>(1);

    const formatCurrency = (value: number): string => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value);
    };

    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Product Order</CardTitle>
          <CardDescription>Select quantity to calculate total</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Quantity</Label>
            <NumberInput value={quantity} onChange={setQuantity} min={1} max={99} step={1} />
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <span className="text-sm text-muted-foreground">Unit Price:</span>
            <span className="font-semibold">{formatCurrency(29.99)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-2xl font-bold text-primary">
              {formatCurrency((quantity ?? 0) * 29.99)}
            </span>
          </div>
        </CardContent>
      </Card>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Real-world e-commerce example with quantity selection and automatic price calculation.',
      },
    },
  },
};

// Disabled State
export const DisabledState: Story = {
  render: () => (
    <div className="w-full max-w-xs mx-auto space-y-2">
      <Label>Amount</Label>
      <NumberInput value={100} min={0} max={100} disabled />
      <p className="text-sm text-muted-foreground">This input is disabled</p>
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Number input in disabled state.',
      },
    },
  },
};

// RTL Example - Basic
export const RTLExample: Story = {
  render: () => {
    const [value, setValue] = React.useState<number | undefined>(42);

    return (
      <div className="w-full max-w-xs mx-auto space-y-2">
        <Label>الكمية</Label>
        <NumberInput value={value} onChange={setValue} min={0} max={100} />
        <p className="text-sm text-muted-foreground">القيمة الحالية: {value}</p>
      </div>
    );
  },
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Basic number input with Arabic labels in RTL mode.',
      },
    },
  },
};

// RTL Currency Input
export const RTLCurrencyInput: Story = {
  render: () => {
    const [price, setPrice] = React.useState<number | undefined>(99.99);

    const formatCurrency = (value: number): string => {
      return new Intl.NumberFormat('ar-SA', {
        style: 'currency',
        currency: 'SAR',
      }).format(value);
    };

    return (
      <div className="w-full max-w-xs mx-auto space-y-2">
        <Label>السعر</Label>
        <NumberInput
          value={price}
          onChange={setPrice}
          precision={2}
          formatDisplay={formatCurrency}
          min={0}
          step={0.01}
        />
        <p className="text-sm text-muted-foreground">القيمة الخام: {price}</p>
      </div>
    );
  },
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Currency input with Arabic formatting (SAR) in RTL mode.',
      },
    },
  },
};

// RTL Product Order
export const RTLProductOrder: Story = {
  render: () => {
    const [quantity, setQuantity] = React.useState<number | undefined>(1);

    const formatCurrency = (value: number): string => {
      return new Intl.NumberFormat('ar-SA', {
        style: 'currency',
        currency: 'SAR',
      }).format(value);
    };

    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>طلب منتج</CardTitle>
          <CardDescription>اختر الكمية لحساب السعر الإجمالي</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>الكمية</Label>
            <NumberInput value={quantity} onChange={setQuantity} min={1} max={99} step={1} />
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <span className="text-sm text-muted-foreground">سعر الوحدة:</span>
            <span className="font-semibold">{formatCurrency(29.99)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">الإجمالي:</span>
            <span className="text-2xl font-bold text-primary">
              {formatCurrency((quantity ?? 0) * 29.99)}
            </span>
          </div>
        </CardContent>
      </Card>
    );
  },
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Complete product order example in Arabic with RTL layout and SAR currency.',
      },
    },
  },
};
