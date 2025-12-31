import type { Meta, StoryObj } from '@storybook/react';
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
    layout: 'centered',
  },
  tags: ['autodocs'],
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
      options: ['ltr', 'rtl'],
    },
  },
} satisfies Meta<typeof RangeSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number]>([25, 75]);

    return (
      <div className="w-full max-w-md">
        <RangeSlider
          defaultValue={[25, 75]}
          value={value}
          onValueChange={setValue}
        />
      </div>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
};

// Price Range - from page lines 245-254
export const PriceRange: Story = {
  render: () => {
    const [priceRange, setPriceRange] = useState<[number, number]>([100, 500]);

    return (
      <Card>
        <CardContent className="p-6">
          <div className="w-full max-w-md">
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
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
    },
  },
};

// Age Range - from page lines 269-277
export const AgeRange: Story = {
  render: () => {
    const [ageRange, setAgeRange] = useState<[number, number]>([25, 45]);

    return (
      <Card>
        <CardContent className="p-6">
          <div className="w-full max-w-md space-y-2">
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
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
    },
  },
};

// Percentage Range - from page lines 292-299
export const PercentageRange: Story = {
  render: () => {
    const [range, setRange] = useState<[number, number]>([20, 80]);

    return (
      <Card>
        <CardContent className="p-6">
          <div className="w-full max-w-md">
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
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
    },
  },
};

// With Labels
export const WithLabels: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number]>([30, 70]);

    return (
      <Card>
        <CardContent className="p-6">
          <div className="w-full max-w-md">
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
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
    },
  },
};

// Without Labels
export const WithoutLabels: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number]>([25, 75]);

    return (
      <Card>
        <CardContent className="p-6">
          <div className="w-full max-w-md space-y-2">
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
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
    },
  },
};

// Custom Step
export const CustomStep: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number]>([100, 400]);

    return (
      <Card>
        <CardContent className="p-6">
          <div className="w-full max-w-md space-y-2">
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
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
    },
  },
};

// Disabled
export const Disabled: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="w-full max-w-md space-y-2">
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
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
    },
  },
};

// Temperature Range
export const TemperatureRange: Story = {
  render: () => {
    const [tempRange, setTempRange] = useState<[number, number]>([18, 26]);

    return (
      <Card>
        <CardContent className="p-6">
          <div className="w-full max-w-md space-y-2">
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
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
    },
  },
};

// RTL
export const RTL: Story = {
  render: () => {
    const [priceRange, setPriceRange] = useState<[number, number]>([100, 500]);

    return (
      <Card>
        <CardContent className="p-6">
          <div className="w-full max-w-md space-y-2">
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
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
    },
  },
};
