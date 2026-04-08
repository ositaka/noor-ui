import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Slider } from '../../../components/ui/slider';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';
import { SpeakerHigh, SpeakerSlash } from '@phosphor-icons/react';
import * as React from 'react';

const meta = {
  title: 'Forms/Slider',
  component: Slider,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
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
  render: (args, { globals }) => {
    return (
    <div className="w-80">
      <Slider {...args} />
    </div>
    );
  },
};

// With Label - from component page lines 268-283
export const WithLabel: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <div className="flex items-center justify-between">
        <Label id="volume-label">Volume</Label>
        <span className="text-sm text-muted-foreground">50%</span>
      </div>
      <Slider aria-labelledby="volume-label" defaultValue={[50]} max={100} step={1} />
    </div>
  ),
  parameters: {
    controls: { disable: true }
  }
};

// Different Ranges - from component page lines 286-302
export const DifferentRanges: Story = {
  render: () => {
    const [value, setValue] = React.useState([20]);

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
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <SpeakerSlash className="h-4 w-4" />
            ) : (
              <SpeakerHigh className="h-4 w-4" />
            )}
          </Button>
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            className="flex-1"
            aria-label="Volume"
          />
          <span className="text-sm text-muted-foreground w-12 text-end">
            {volume[0]}%
          </span>
        </div>
      </div>
    );
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Range slider with two thumbs for selecting a price range.'
      }
    }
  }
};

