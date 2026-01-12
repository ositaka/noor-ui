import type { Meta, StoryObj } from '@storybook/react';
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
    step: 1
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
