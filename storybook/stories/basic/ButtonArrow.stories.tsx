import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { ButtonArrow } from '../../../components/ui/button-arrow';
import { Card, CardContent } from '../../../components/ui/card';

const meta = {
  title: 'Core/Button Arrow',
  component: ButtonArrow,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['forward', 'back', 'external']
    },
    icon: {
      control: { type: 'select' },
      options: ['chevron', 'arrow']
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['start', 'end', 'auto']
    },
    iconSize: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    },
    hideIcon: { control: 'boolean' },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost']
    }
  }
} satisfies Meta<typeof ButtonArrow>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground
export const Default: Story = {
  args: {
    direction: 'forward',
    children: 'Continue',
    onClick: fn()
  },
  parameters: {
    ar: {
      args: {
        children: 'متابعة'
      }
    }
  },
};

// Directions - from component page lines 166-168
export const Directions: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-3">
          <ButtonArrow direction="forward" onClick={fn()}>Next Step</ButtonArrow>
          <ButtonArrow direction="back" onClick={fn()}>Previous Step</ButtonArrow>
          <ButtonArrow direction="external" asChild>
            <a href="https://storybook.noorui.com" target="_blank" rel="noopener noreferrer">
              View in Storybook
            </a>
          </ButtonArrow>
        </div>
    </CardContent>
    </Card>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Forward, back, and external directional buttons.'
      }
    }
  }
};

// Icon Styles - from component page lines 207-228
export const IconStyles: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-3">
          <ButtonArrow direction="forward" icon="chevron" onClick={fn()}>Continue</ButtonArrow>
          <ButtonArrow direction="forward" icon="arrow" onClick={fn()}>Learn More</ButtonArrow>
          <ButtonArrow direction="back" icon="chevron" onClick={fn()}>Go Back</ButtonArrow>
          <ButtonArrow direction="back" icon="arrow" onClick={fn()}>Go Back</ButtonArrow>
          <ButtonArrow direction="external" asChild>
            <a href="https://example.com" target="_blank" rel="noopener noreferrer">
              External Link
            </a>
          </ButtonArrow>
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Chevron, arrow, and external diagonal arrow icon styles.'
      }
    }
  }
};

// With Variants - from component page lines 230-251
export const WithVariants: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-3">
          <ButtonArrow variant="primary" direction="forward" onClick={fn()}>Primary</ButtonArrow>
          <ButtonArrow variant="secondary" direction="back" onClick={fn()}>Secondary</ButtonArrow>
          <ButtonArrow variant="outline" direction="forward" onClick={fn()}>Outline</ButtonArrow>
          <ButtonArrow variant="ghost" direction="back" onClick={fn()}>Ghost</ButtonArrow>
          <ButtonArrow variant="link" direction="external" className="h-auto p-0" asChild>
            <a href="https://example.com" target="_blank" rel="noopener noreferrer">
              Link Style
            </a>
          </ButtonArrow>
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'ButtonArrow with all button variants including link variant.'
      }
    }
  }
};

// Forward Only
export const ForwardOnly: Story = {
  render: () => (
    <div className="flex gap-3">
      <ButtonArrow direction="forward" onClick={fn()}>Continue</ButtonArrow>
      <ButtonArrow direction="forward" icon="arrow" onClick={fn()}>Next</ButtonArrow>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Forward direction buttons only.'
      }
    }
  }
};

// External Links
export const ExternalLinks: Story = {
  render: () => (
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-3">
            <ButtonArrow direction="external" asChild>
              <a href="https://storybook.noorui.com" target="_blank" rel="noopener noreferrer">
                View Storybook
              </a>
            </ButtonArrow>
            <ButtonArrow variant="outline" direction="external" asChild>
              <a href="https://github.com/ositaka/noor-ui" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </ButtonArrow>
            <ButtonArrow variant="link" direction="external" className="h-auto p-0" asChild>
              <a href="https://noorui.com" target="_blank" rel="noopener noreferrer">
                Documentation
              </a>
            </ButtonArrow>
          </div>
        </CardContent>
      </Card>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'External link buttons with diagonal arrows that auto-mirror in RTL.'
      }
    }
  }
};

// Back Only
export const BackOnly: Story = {
  render: () => (
    <div className="flex gap-3">
      <ButtonArrow direction="back" onClick={fn()}>Go Back</ButtonArrow>
      <ButtonArrow direction="back" icon="arrow" onClick={fn()}>Previous</ButtonArrow>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Back direction buttons only.'
      }
    }
  }
};

// Icon Position Tests
export const IconPositionStart: Story = {
  args: {
    direction: 'forward',
    iconPosition: 'start',
    children: 'Icon at Start',
    onClick: fn()
  },
  parameters: {
    ar: {
      args: {
        children: 'الأيقونة في البداية'
      }
    }
  }
};

export const IconPositionEnd: Story = {
  args: {
    direction: 'back',
    iconPosition: 'end',
    children: 'Icon at End',
    onClick: fn()
  },
  parameters: {
    ar: {
      args: {
        children: 'الأيقونة في النهاية'
      }
    }
  }
};

// Hidden Icon Test
export const HiddenIcon: Story = {
  args: {
    direction: 'forward',
    hideIcon: true,
    children: 'No Icon',
    onClick: fn()
  },
  parameters: {
    ar: {
      args: {
        children: 'بدون أيقونة'
      }
    }
  }
};

// Keyboard Navigation
export const KeyboardNavigation: Story = {
  args: {
    direction: 'forward',
    children: 'Press Enter or Space',
    onClick: fn()
  },
  parameters: {
    ar: {
      args: {
        children: 'اضغط Enter أو Space'
      }
    }
  }
};

// Disabled State
export const DisabledState: Story = {
  args: {
    direction: 'forward',
    children: 'Disabled Button',
    disabled: true,
    onClick: fn()
  },
  parameters: {
    ar: {
      args: {
        children: 'زر معطّل'
      }
    }
  }
};
