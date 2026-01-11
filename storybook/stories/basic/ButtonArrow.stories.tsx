import type { Meta, StoryObj } from '@storybook/react';
import { ButtonArrow } from '../../../components/ui/button-arrow';
import { Card, CardContent } from '../../../components/ui/card';

/**
 * Button Arrow Component Stories
 *
 * All examples are taken from /app/(docs)/components/button-arrow/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: ButtonArrow is a button with directional arrow that auto-flips in RTL.
 * Features: Forward/back directions, chevron/arrow icons, all button variants, auto RTL.
 */

const meta = {
  title: 'Basic/Button Arrow',
  component: ButtonArrow,
  parameters: {
    layout: 'centered'
  },
  tags: ['!autodocs'],
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['forward', 'back']
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
    children: 'Continue'
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    docs: {
      story: {
        inline: false
      }
    }
  }
};

// Directions - from component page lines 166-168
export const Directions: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-3">
          <ButtonArrow direction="forward">Next Step</ButtonArrow>
          <ButtonArrow direction="back">Previous Step</ButtonArrow>
        </div>
    </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Forward and back directional buttons.'
      }
    }
  }
};

// Icon Styles - from component page lines 182-186
export const IconStyles: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-3">
          <ButtonArrow direction="forward" icon="chevron">Continue</ButtonArrow>
          <ButtonArrow direction="forward" icon="arrow">Learn More</ButtonArrow>
          <ButtonArrow direction="back" icon="chevron">Go Back</ButtonArrow>
          <ButtonArrow direction="back" icon="arrow">Go Back</ButtonArrow>
        </div>
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Chevron and arrow icon styles.'
      }
    }
  }
};

// With Variants
export const WithVariants: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-3">
          <ButtonArrow variant="primary" direction="forward">Primary</ButtonArrow>
          <ButtonArrow variant="secondary" direction="back">Secondary</ButtonArrow>
          <ButtonArrow variant="outline" direction="forward">Outline</ButtonArrow>
          <ButtonArrow variant="ghost" direction="back">Ghost</ButtonArrow>
        </div>
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'ButtonArrow with all button variants.'
      }
    }
  }
};

// Forward Only
export const ForwardOnly: Story = {
  render: () => (
    <div className="flex gap-3">
      <ButtonArrow direction="forward">Continue</ButtonArrow>
      <ButtonArrow direction="forward" icon="arrow">Next</ButtonArrow>
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
        story: 'Forward direction buttons only.'
      }
    }
  }
};

// Back Only
export const BackOnly: Story = {
  render: () => (
    <div className="flex gap-3">
      <ButtonArrow direction="back">Go Back</ButtonArrow>
      <ButtonArrow direction="back" icon="arrow">Previous</ButtonArrow>
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
        story: 'Back direction buttons only.'
      }
    }
  }
};

// RTL Forward
export const RTLForward: Story = {
  render: () => (
    <div className="flex gap-3">
      <ButtonArrow direction="forward">متابعة</ButtonArrow>
      <ButtonArrow direction="forward" icon="arrow">التالي</ButtonArrow>
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
        story: 'Forward buttons in RTL - arrows auto-flip.'
      }
    }
  }
};

// RTL Back
export const RTLBack: Story = {
  render: () => (
    <div className="flex gap-3">
      <ButtonArrow direction="back">رجوع</ButtonArrow>
      <ButtonArrow direction="back" icon="arrow">السابق</ButtonArrow>
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
        story: 'Back buttons in RTL - arrows auto-flip.'
      }
    }
  }
};
