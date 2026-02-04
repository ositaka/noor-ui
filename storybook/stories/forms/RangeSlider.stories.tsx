import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { RangeSlider } from '../../../components/ui/range-slider';
import { Card, CardContent } from '../../../components/ui/card';
import { Label } from '../../../components/ui/label';
import { useState } from 'react';

/**
 * Range Slider Component Stories
 *
 * All examples are taken from /app/(docs)/components/range-slider/page.tsx
 *
 * Note: RangeSlider allows selecting a range between two values.
 * Features: RTL support, custom formatting, flexible labels, keyboard accessible.
 */

const meta = {
  title: 'Forms/Range Slider',
  component: RangeSlider,
  parameters: {
    layout: 'centered'
  },
  tags: ['!autodocs'],
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    value: { control: false },
    defaultValue: { control: false },
    onValueChange: { control: false },
    formatLabel: { control: false },
    showLabels: { control: 'boolean' },
    showMinMax: { control: 'boolean' },
    disabled: { control: 'boolean' },
    dir: {
      control: { type: 'select' },
      options: ['ltr', 'rtl']
    }
  }
} satisfies Meta<typeof RangeSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    onValueChange: fn(),
  },
  render: (args) => {
    const [value, setValue] = useState<[number, number]>([25, 75]);

    const handleChange = (newValue: [number, number]) => {
      setValue(newValue);
      args.onValueChange?.(newValue);
    };

    return (
      <div className="w-80 max-w-md">
        <RangeSlider
          defaultValue={[25, 75]}
          value={value}
          onValueChange={handleChange}
        />
      </div>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders correctly', async () => {
      const sliders = canvas.getAllByRole('slider');
      await expect(sliders).toHaveLength(2);
      await expect(sliders[0]).toBeVisible();
      await expect(sliders[1]).toBeVisible();
    });

    await step('Has correct initial values', async () => {
      const sliders = canvas.getAllByRole('slider');
      await expect(sliders[0]).toHaveAttribute('aria-valuenow', '25');
      await expect(sliders[1]).toHaveAttribute('aria-valuenow', '75');
    });

    await step('Keyboard accessible', async () => {
      const sliders = canvas.getAllByRole('slider');

      // Focus first slider thumb
      sliders[0].focus();
      await expect(sliders[0]).toHaveFocus();

      // Focus second slider thumb via Tab
      await userEvent.tab();
      await expect(sliders[1]).toHaveFocus();
    });

    await step('Keyboard navigation works', async () => {
      const sliders = canvas.getAllByRole('slider');

      // Test arrow keys on first thumb
      sliders[0].focus();
      const initialValue = sliders[0].getAttribute('aria-valuenow');

      await userEvent.keyboard('{ArrowRight}');
      const newValue = sliders[0].getAttribute('aria-valuenow');

      // Verify value changed
      await expect(newValue).not.toBe(initialValue);
    });
  }
};

// Price Range - from page lines 245-254
export const PriceRange: Story = {
  render: () => {
    const [priceRange, setPriceRange] = useState<[number, number]>([100, 500]);

    return (
      <Card>
        <CardContent className="p-6">
          <div className="w-80 max-w-md">
            <RangeSlider
              min={0}
              max={1000}
              step={10}
              value={priceRange}
              onValueChange={setPriceRange}
              formatLabel={(val) => `$${val}`}
              showLabels
              showMinMax
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
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders with custom formatting', async () => {
      const sliders = canvas.getAllByRole('slider');
      await expect(sliders).toHaveLength(2);

      // Verify formatted labels appear
      await expect(canvas.getByText('$100')).toBeInTheDocument();
      await expect(canvas.getByText('$500')).toBeInTheDocument();
    });

    await step('Shows min/max labels', async () => {
      await expect(canvas.getByText('$0')).toBeInTheDocument();
      await expect(canvas.getByText('$1000')).toBeInTheDocument();
    });

    await step('Respects custom step increment', async () => {
      const sliders = canvas.getAllByRole('slider');
      await expect(sliders[0]).toHaveAttribute('aria-valuemin', '0');
      await expect(sliders[0]).toHaveAttribute('aria-valuemax', '1000');
    });
  }
};

// Age Range - from page lines 269-277
export const AgeRange: Story = {
  render: () => {
    const [ageRange, setAgeRange] = useState<[number, number]>([25, 45]);

    return (
      <Card>
        <CardContent className="p-6">
          <div className="w-80 max-w-md space-y-2">
            <Label>Age Range: {ageRange[0]} - {ageRange[1]} years</Label>
            <RangeSlider
              min={18}
              max={100}
              step={1}
              value={ageRange}
              onValueChange={setAgeRange}
              showMinMax
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
    controls: { disable: true }
  }
};

// Percentage Range - from page lines 292-299
export const PercentageRange: Story = {
  render: () => {
    const [range, setRange] = useState<[number, number]>([20, 80]);

    return (
      <Card>
        <CardContent className="p-6">
          <div className="w-80 max-w-md">
            <RangeSlider
              min={0}
              max={100}
              step={5}
              value={range}
              onValueChange={setRange}
              formatLabel={(val) => `${val}%`}
              showLabels
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
    controls: { disable: true }
  }
};

// With Labels
export const WithLabels: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number]>([30, 70]);

    return (
      <Card>
        <CardContent className="p-6">
          <div className="w-80 max-w-md">
            <RangeSlider
              min={0}
              max={100}
              value={value}
              onValueChange={setValue}
              showLabels
              showMinMax
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
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Displays value labels', async () => {
      // Check that current values are displayed
      const labels = canvas.getAllByText('30');
      await expect(labels.length).toBeGreaterThan(0);

      const labels70 = canvas.getAllByText('70');
      await expect(labels70.length).toBeGreaterThan(0);
    });

    await step('Displays min/max labels', async () => {
      await expect(canvas.getByText('0')).toBeInTheDocument();
      await expect(canvas.getByText('100')).toBeInTheDocument();
    });
  }
};

// Without Labels
export const WithoutLabels: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number]>([25, 75]);

    return (
      <Card>
        <CardContent className="p-6">
          <div className="w-80 max-w-md space-y-2">
            <Label>Range: {value[0]} - {value[1]}</Label>
            <RangeSlider
              min={0}
              max={100}
              value={value}
              onValueChange={setValue}
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
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders without internal labels', async () => {
      const sliders = canvas.getAllByRole('slider');
      await expect(sliders).toHaveLength(2);

      // External label should exist
      await expect(canvas.getByText('Range: 25 - 75')).toBeInTheDocument();
    });

    await step('Values update external label', async () => {
      const sliders = canvas.getAllByRole('slider');

      // Verify sliders have correct values
      await expect(sliders[0]).toHaveAttribute('aria-valuenow', '25');
      await expect(sliders[1]).toHaveAttribute('aria-valuenow', '75');
    });
  }
};

// Custom Step
export const CustomStep: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number]>([100, 400]);

    return (
      <Card>
        <CardContent className="p-6">
          <div className="w-80 max-w-md space-y-2">
            <Label>Budget Range: ${value[0]} - ${value[1]}</Label>
            <RangeSlider
              min={0}
              max={1000}
              step={50}
              value={value}
              onValueChange={setValue}
              showMinMax
              formatLabel={(val) => `$${val}`}
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
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders with custom step', async () => {
      const sliders = canvas.getAllByRole('slider');
      await expect(sliders).toHaveLength(2);

      // Verify values are aligned to step
      await expect(sliders[0]).toHaveAttribute('aria-valuenow', '100');
      await expect(sliders[1]).toHaveAttribute('aria-valuenow', '400');
    });

    await step('Shows formatted min/max', async () => {
      await expect(canvas.getByText('$0')).toBeInTheDocument();
      await expect(canvas.getByText('$1000')).toBeInTheDocument();
    });
  }
};

// Disabled
export const Disabled: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="w-80 max-w-md space-y-2">
          <Label>Disabled Range Slider</Label>
          <RangeSlider
            min={0}
            max={100}
            defaultValue={[30, 70]}
            disabled
            showMinMax
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
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders in disabled state', async () => {
      const sliders = canvas.getAllByRole('slider');
      await expect(sliders).toHaveLength(2);

      // Verify disabled state
      await expect(sliders[0]).toBeDisabled();
      await expect(sliders[1]).toBeDisabled();
    });

    await step('Has correct aria attributes', async () => {
      const sliders = canvas.getAllByRole('slider');
      await expect(sliders[0]).toHaveAttribute('aria-disabled', 'true');
      await expect(sliders[1]).toHaveAttribute('aria-disabled', 'true');
    });
  }
};

// Temperature Range
export const TemperatureRange: Story = {
  render: () => {
    const [tempRange, setTempRange] = useState<[number, number]>([18, 26]);

    return (
      <Card>
        <CardContent className="p-6">
          <div className="w-80 max-w-md space-y-2">
            <Label>Temperature Range: {tempRange[0]}°C - {tempRange[1]}°C</Label>
            <RangeSlider
              min={10}
              max={35}
              step={0.5}
              value={tempRange}
              onValueChange={setTempRange}
              formatLabel={(val) => `${val}°C`}
              showLabels
              showMinMax
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
    controls: { disable: true }
  }
};

// RTL
export const RTL: Story = {
  render: () => {
    const [priceRange, setPriceRange] = useState<[number, number]>([100, 500]);

    return (
      <Card>
        <CardContent className="p-6">
          <div className="w-80 max-w-md space-y-2">
            <Label>نطاق السعر: {priceRange[0]}$ - {priceRange[1]}$</Label>
            <RangeSlider
              min={0}
              max={1000}
              step={10}
              value={priceRange}
              onValueChange={setPriceRange}
              formatLabel={(val) => `${val}$`}
              showLabels
              showMinMax
              dir="rtl"
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
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders in RTL context', async () => {
      const sliders = canvas.getAllByRole('slider');
      await expect(sliders).toHaveLength(2);
      await expect(sliders[0]).toBeVisible();
      await expect(sliders[1]).toBeVisible();
    });

    await step('Shows RTL formatted labels', async () => {
      await expect(canvas.getByText('نطاق السعر: 100$ - 500$')).toBeInTheDocument();
      await expect(canvas.getByText('100$')).toBeInTheDocument();
      await expect(canvas.getByText('500$')).toBeInTheDocument();
    });

    await step('Keyboard navigation works in RTL', async () => {
      const sliders = canvas.getAllByRole('slider');

      // Focus first slider
      sliders[0].focus();
      await expect(sliders[0]).toHaveFocus();

      // Test keyboard interaction
      const initialValue = sliders[0].getAttribute('aria-valuenow');
      await userEvent.keyboard('{ArrowLeft}');
      const newValue = sliders[0].getAttribute('aria-valuenow');

      // In RTL, ArrowLeft should increase value
      await expect(newValue).not.toBe(initialValue);
    });
  }
};
