import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Button } from '../../../components/ui/button';
import { Heart, Download, Plus, FloppyDisk } from '@phosphor-icons/react';

const meta = {
  title: 'Core/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
      description: 'Button style variant'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'icon'],
      description: 'Button size'
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button'
    }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md'
  },
  parameters: { ar: { children: 'زر' } }
};

// Variants
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
    onClick: fn()
  },
  parameters: { ar: { children: 'زر أساسي' } }
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
    onClick: fn()
  },
  parameters: { ar: { children: 'زر ثانوي' } }
};

export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
    onClick: fn()
  },
  parameters: { ar: { children: 'حذف' } }
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
    onClick: fn()
  },
  parameters: { ar: { children: 'زر مخطط' } }
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
    onClick: fn()
  },
  parameters: { ar: { children: 'زر شفاف' } }
};

export const Link: Story = {
  args: {
    children: 'Link Button',
    variant: 'link',
    onClick: fn()
  },
  parameters: { ar: { children: 'زر رابط' } }
};

// Sizes
export const Small: Story = {
  args: {
    children: 'Small',
    size: 'sm',
    onClick: fn()
  },
  parameters: { ar: { children: 'صغير' } }
};

export const Medium: Story = {
  args: {
    children: 'Medium',
    size: 'md',
    onClick: fn()
  },
  parameters: { ar: { children: 'متوسط' } }
};

export const Large: Story = {
  args: {
    children: 'Large',
    size: 'lg',
    onClick: fn()
  },
  parameters: { ar: { children: 'كبير' } }
};

export const ExtraLarge: Story = {
  args: {
    children: 'Extra Large',
    size: 'xl',
    onClick: fn()
  },
  parameters: { ar: { children: 'كبير جداً' } }
};

// Icon button
export const Icon: Story = {
  args: {
    size: 'icon',
    children: <Heart className="h-4 w-4" />,
    onClick: fn(),
    'aria-label': 'Like'
  }
};

// With icons
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Download className="h-4 w-4" />
        Download
      </>
    ),
    onClick: fn()
  },
  parameters: { ar: { children: (<><Download className="h-4 w-4" />تنزيل</>) } }
};

export const WithIconRight: Story = {
  args: {
    children: (
      <>
        Save Changes
        <FloppyDisk className="h-4 w-4" />
      </>
    ),
    onClick: fn()
  },
  parameters: { ar: { children: (<>حفظ التغييرات<FloppyDisk className="h-4 w-4" /></>) } }
};

// States
export const Loading: Story = {
  args: {
    children: 'Processing...',
    loading: true,
    onClick: fn()
  },
  parameters: { ar: { children: 'جاري المعالجة...' } }
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
    onClick: fn()
  },
  parameters: { ar: { children: 'معطّل' } }
};

// Keyboard Navigation Tests
export const KeyboardNavigation: Story = {
  args: {
    children: 'Press Enter or Space',
    onClick: fn()
  },
  parameters: { ar: { children: 'اضغط على إدخال أو مسافة' } }
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  }
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
      <Button size="icon" aria-label="Icon button">
        <Heart className="h-4 w-4" />
      </Button>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  }
};
