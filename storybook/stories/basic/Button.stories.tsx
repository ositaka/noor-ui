import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../../components/ui/button';
import { Heart, Download, Plus, Save } from 'lucide-react';

const meta = {
  title: 'Basic/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
      description: 'Button style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'icon'],
      description: 'Button size',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
};

// Variants
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
  },
};

export const Link: Story = {
  args: {
    children: 'Link Button',
    variant: 'link',
  },
};

// Sizes
export const Small: Story = {
  args: {
    children: 'Small',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: 'Large',
    size: 'lg',
  },
};

export const ExtraLarge: Story = {
  args: {
    children: 'Extra Large',
    size: 'xl',
  },
};

// Icon button
export const Icon: Story = {
  args: {
    size: 'icon',
    children: <Heart className="h-4 w-4" />,
  },
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
  },
};

export const WithIconRight: Story = {
  args: {
    children: (
      <>
        Save Changes
        <Save className="h-4 w-4" />
      </>
    ),
  },
};

// States
export const Loading: Story = {
  args: {
    children: 'Processing...',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

// RTL Examples
export const RTLPrimary: Story = {
  args: {
    children: 'زر أساسي',
    variant: 'primary',
  },
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with Arabic text demonstrating RTL support. Automatically switches to RTL mode.',
      },
    },
  },
};

export const RTLWithIcon: Story = {
  args: {
    children: (
      <>
        <Plus className="h-4 w-4" />
        إضافة عنصر جديد
      </>
    ),
  },
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with Arabic text and icon showing proper RTL layout. Icon automatically positions correctly.',
      },
    },
  },
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
    controls: { disable: true },
  },
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
      <Button size="icon">
        <Heart className="h-4 w-4" />
      </Button>
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
};
