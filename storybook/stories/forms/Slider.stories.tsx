import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Slider } from '../../../components/ui/slider';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import * as React from 'react';

/**
 * Slider Component Stories
 *
 * All examples are taken from /app/(docs)/components/slider/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Slider allows selecting a numeric value from a range with RTL support
 */

const meta = {
  title: 'Forms/Slider',
  component: Slider,
  parameters: {
    layout: 'centered'
  },
  tags: ['!autodocs'],
  argTypes: {
    onValueChange: {
      control: false
    }
  }
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls (hidden from stories list to avoid ID conflicts)
export const Default: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
    onValueChange: fn()
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  render: (args) => (
    <div className="w-80">
      <Slider {...args} />
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

    await step('Renders correctly', async () => {
      const slider = canvas.getByRole('slider');
      await expect(slider).toBeInTheDocument();
      await expect(slider).toBeVisible();
    });

    await step('Has correct initial value', async () => {
      const slider = canvas.getByRole('slider');
      await expect(slider).toHaveAttribute('aria-valuenow', '50');
      await expect(slider).toHaveAttribute('aria-valuemin', '0');
      await expect(slider).toHaveAttribute('aria-valuemax', '100');
    });

    await step('Keyboard navigation - Arrow keys work', async () => {
      const slider = canvas.getByRole('slider');
      await userEvent.click(slider); // Focus the slider
      await expect(slider).toHaveFocus();

      // Arrow Right should increase value
      await userEvent.keyboard('{ArrowRight}');
      await expect(slider).toHaveAttribute('aria-valuenow', '51');

      // Arrow Left should decrease value
      await userEvent.keyboard('{ArrowLeft}');
      await expect(slider).toHaveAttribute('aria-valuenow', '50');
    });

    await step('Keyboard navigation - Home and End keys', async () => {
      const slider = canvas.getByRole('slider');

      // End key should jump to max
      await userEvent.keyboard('{End}');
      await expect(slider).toHaveAttribute('aria-valuenow', '100');

      // Home key should jump to min
      await userEvent.keyboard('{Home}');
      await expect(slider).toHaveAttribute('aria-valuenow', '0');
    });
  }
};

// With Label - from component page lines 268-283
export const WithLabel: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="volume">Volume</Label>
        <span className="text-sm text-muted-foreground">50%</span>
      </div>
      <Slider id="volume" defaultValue={[50]} max={100} step={1} />
    </div>
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

    await step('Renders with label', async () => {
      const label = canvas.getByText('Volume');
      await expect(label).toBeInTheDocument();
      await expect(canvas.getByText('50%')).toBeInTheDocument();
    });

    await step('Slider is accessible via label', async () => {
      const slider = canvas.getByRole('slider');
      await expect(slider).toHaveAttribute('id', 'volume');
      await expect(slider).toBeInTheDocument();
    });
  }
};

// Different Ranges - from component page lines 286-302
export const DifferentRanges: Story = {
  render: () => {
    const [value, setValue] = React.useState([50]);

    return (
      <div className="w-80 space-y-2">
        <div className="flex items-center justify-between">
          <Label>Temperature: {value[0]}°C</Label>
        </div>
        <Slider value={value} onValueChange={setValue} min={-10} max={40} step={1} />
        <p className="text-xs text-muted-foreground">Range: -10°C to 40°C</p>
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
        story: 'Slider with custom min and max values. Shows temperature from -10°C to 40°C.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders with custom range', async () => {
      const slider = canvas.getByRole('slider');
      await expect(slider).toHaveAttribute('aria-valuemin', '-10');
      await expect(slider).toHaveAttribute('aria-valuemax', '40');
      await expect(slider).toHaveAttribute('aria-valuenow', '50');
    });

    await step('Displays current temperature value', async () => {
      await expect(canvas.getByText('Temperature: 50°C')).toBeInTheDocument();
    });

    await step('Value updates on keyboard interaction', async () => {
      const slider = canvas.getByRole('slider');
      await userEvent.click(slider);
      await userEvent.keyboard('{ArrowRight}');

      // Value should increment to 51
      await expect(slider).toHaveAttribute('aria-valuenow', '51');
      await expect(canvas.getByText('Temperature: 51°C')).toBeInTheDocument();
    });
  }
};

// Different Step Sizes - from component page lines 304-333
export const DifferentSteps: Story = {
  render: () => (
    <div className="w-80 space-y-6">
      <div className="space-y-2">
        <Label>Fine control (step: 1)</Label>
        <Slider defaultValue={[50]} max={100} step={1} />
      </div>

      <div className="space-y-2">
        <Label>Medium control (step: 5)</Label>
        <Slider defaultValue={[50]} max={100} step={5} />
      </div>

      <div className="space-y-2">
        <Label>Coarse control (step: 10)</Label>
        <Slider defaultValue={[50]} max={100} step={10} />
      </div>

      <div className="space-y-2">
        <Label>Quarters (step: 25)</Label>
        <Slider defaultValue={[50]} max={100} step={25} />
      </div>
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
        story: 'Sliders with different step sizes. Step determines the increment for value changes.'
      }
    }
  }
};

// Disabled State - from component page lines 335-354
export const DisabledState: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div className="space-y-2">
        <Label>Enabled slider</Label>
        <Slider defaultValue={[50]} max={100} step={1} />
      </div>

      <div className="space-y-2">
        <Label>Disabled slider</Label>
        <Slider defaultValue={[75]} max={100} step={1} disabled />
      </div>
    </div>
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

    await step('Renders both sliders', async () => {
      const sliders = canvas.getAllByRole('slider');
      await expect(sliders).toHaveLength(2);
    });

    await step('First slider is enabled', async () => {
      const sliders = canvas.getAllByRole('slider');
      await expect(sliders[0]).toBeEnabled();
      await expect(sliders[0]).toHaveAttribute('aria-valuenow', '50');
    });

    await step('Second slider is disabled', async () => {
      const sliders = canvas.getAllByRole('slider');
      await expect(sliders[1]).toBeDisabled();
      await expect(sliders[1]).toHaveAttribute('aria-valuenow', '75');
    });
  }
};

// Volume Control - from component page lines 356-391
export const VolumeControl: Story = {
  render: () => {
    const [volume, setVolume] = React.useState([80]);
    const isMuted = volume[0] === 0;

    return (
      <div className="w-80 space-y-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setVolume(isMuted ? [80] : [0])}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            className="flex-1"
          />
          <span className="text-sm text-muted-foreground w-12 text-end">
            {volume[0]}%
          </span>
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
        story: 'Interactive volume control with mute button and value display.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders volume control with initial state', async () => {
      const slider = canvas.getByRole('slider');
      await expect(slider).toHaveAttribute('aria-valuenow', '80');
      await expect(canvas.getByText('80%')).toBeInTheDocument();

      // Volume2 icon should be visible (not muted)
      const button = canvas.getByRole('button');
      await expect(button).toBeInTheDocument();
    });

    await step('Mute button toggles to zero', async () => {
      const button = canvas.getByRole('button');
      await userEvent.click(button);

      const slider = canvas.getByRole('slider');
      await expect(slider).toHaveAttribute('aria-valuenow', '0');
      await expect(canvas.getByText('0%')).toBeInTheDocument();
    });

    await step('Unmute button restores volume', async () => {
      const button = canvas.getByRole('button');
      await userEvent.click(button);

      const slider = canvas.getByRole('slider');
      await expect(slider).toHaveAttribute('aria-valuenow', '80');
      await expect(canvas.getByText('80%')).toBeInTheDocument();
    });

    await step('Slider value updates display', async () => {
      const slider = canvas.getByRole('slider');
      await userEvent.click(slider);
      await userEvent.keyboard('{ArrowRight}');

      await expect(slider).toHaveAttribute('aria-valuenow', '81');
      await expect(canvas.getByText('81%')).toBeInTheDocument();
    });
  }
};

// Price Range - from component page lines 393-416
export const PriceRange: Story = {
  render: () => {
    const [priceRange, setPriceRange] = React.useState([20, 80]);

    return (
      <div className="w-80 space-y-4">
        <div className="flex items-center justify-between">
          <Label>Price Range</Label>
          <span className="text-sm text-muted-foreground">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
        <Slider value={priceRange} onValueChange={setPriceRange} max={100} step={1} />
        <p className="text-xs text-muted-foreground">
          Drag the handles to adjust the price range
        </p>
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
        story: 'Range slider with two thumbs for selecting a price range.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders multi-thumb slider with both values', async () => {
      const sliders = canvas.getAllByRole('slider');
      await expect(sliders).toHaveLength(2);

      // First thumb (min value)
      await expect(sliders[0]).toHaveAttribute('aria-valuenow', '20');

      // Second thumb (max value)
      await expect(sliders[1]).toHaveAttribute('aria-valuenow', '80');
    });

    await step('Displays price range text', async () => {
      await expect(canvas.getByText('$20 - $80')).toBeInTheDocument();
      await expect(canvas.getByText('Price Range')).toBeInTheDocument();
    });

    await step('First thumb can be adjusted', async () => {
      const sliders = canvas.getAllByRole('slider');
      await userEvent.click(sliders[0]);
      await userEvent.keyboard('{ArrowRight}');

      await expect(sliders[0]).toHaveAttribute('aria-valuenow', '21');
      await expect(canvas.getByText('$21 - $80')).toBeInTheDocument();
    });

    await step('Second thumb can be adjusted', async () => {
      const sliders = canvas.getAllByRole('slider');
      await userEvent.click(sliders[1]);
      await userEvent.keyboard('{ArrowLeft}');

      await expect(sliders[1]).toHaveAttribute('aria-valuenow', '79');
      await expect(canvas.getByText('$21 - $79')).toBeInTheDocument();
    });
  }
};

// RTL Example
export const RTLExample: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Label htmlFor="rtl-volume">مستوى الصوت</Label>
      <Slider id="rtl-volume" defaultValue={[50]} max={100} step={1} />
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
        story: 'Slider with Arabic label demonstrating RTL support. The slider direction automatically mirrors for RTL.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders in RTL context', async () => {
      const slider = canvas.getByRole('slider');
      await expect(slider).toBeInTheDocument();
      await expect(canvas.getByText('مستوى الصوت')).toBeInTheDocument();
    });

    await step('Slider has RTL direction attribute', async () => {
      const slider = canvas.getByRole('slider');
      const sliderRoot = slider.closest('[dir]');
      await expect(sliderRoot).toHaveAttribute('dir', 'rtl');
    });

    await step('Keyboard navigation works in RTL', async () => {
      const slider = canvas.getByRole('slider');
      await userEvent.click(slider);

      // In RTL, Arrow Left increases value (opposite of LTR)
      await userEvent.keyboard('{ArrowLeft}');
      await expect(slider).toHaveAttribute('aria-valuenow', '51');

      // Arrow Right decreases value in RTL
      await userEvent.keyboard('{ArrowRight}');
      await expect(slider).toHaveAttribute('aria-valuenow', '50');
    });
  }
};

// RTL With Label and Value
export const RTLWithLabel: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="volume-rtl">مستوى الصوت</Label>
        <span className="text-sm text-muted-foreground">50%</span>
      </div>
      <Slider id="volume-rtl" defaultValue={[50]} max={100} step={1} />
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true }
  }
};

// RTL Different Ranges
export const RTLDifferentRanges: Story = {
  render: () => {
    const [value, setValue] = React.useState([50]);

    return (
      <div className="w-80 space-y-2">
        <div className="flex items-center justify-between">
          <Label>درجة الحرارة: {value[0]}°C</Label>
        </div>
        <Slider value={value} onValueChange={setValue} min={-10} max={40} step={1} />
        <p className="text-xs text-muted-foreground">النطاق: -10°C إلى 40°C</p>
      </div>
    );
  },
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true }
  }
};

// RTL Different Steps
export const RTLDifferentSteps: Story = {
  render: () => (
    <div className="w-80 space-y-6">
      <div className="space-y-2">
        <Label>تحكم دقيق (الخطوة: 1)</Label>
        <Slider defaultValue={[50]} max={100} step={1} />
      </div>

      <div className="space-y-2">
        <Label>تحكم متوسط (الخطوة: 5)</Label>
        <Slider defaultValue={[50]} max={100} step={5} />
      </div>

      <div className="space-y-2">
        <Label>تحكم خشن (الخطوة: 10)</Label>
        <Slider defaultValue={[50]} max={100} step={10} />
      </div>
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true }
  }
};

// RTL Volume Control
export const RTLVolumeControl: Story = {
  render: () => {
    const [volume, setVolume] = React.useState([80]);
    const isMuted = volume[0] === 0;

    return (
      <div className="w-80 space-y-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setVolume(isMuted ? [80] : [0])}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            className="flex-1"
          />
          <span className="text-sm text-muted-foreground w-12 text-start">
            {volume[0]}%
          </span>
        </div>
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
        story: 'Volume control in RTL mode with proper text alignment.'
      }
    }
  }
};

// RTL Price Range
export const RTLPriceRange: Story = {
  render: () => {
    const [priceRange, setPriceRange] = React.useState([20, 80]);

    return (
      <div className="w-80 space-y-4">
        <div className="flex items-center justify-between">
          <Label>نطاق السعر</Label>
          <span className="text-sm text-muted-foreground">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
        <Slider value={priceRange} onValueChange={setPriceRange} max={100} step={1} />
        <p className="text-xs text-muted-foreground">
          اسحب المقابض لتعديل نطاق السعر
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
        story: 'Range slider with two thumbs in RTL mode, demonstrating proper handle positioning.'
      }
    }
  }
};
