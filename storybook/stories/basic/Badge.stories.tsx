import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Check, WarningCircle, Star, Clock, Lightning, CheckCircle, XCircle } from '@phosphor-icons/react';

/**
 * Badge Component Stories
 *
 * All examples are taken from /app/(docs)/components/badge/page.tsx
 * Uses exact same text and data as the component documentation.
 */

const meta = {
  title: 'Basic/Badge',
  component: Badge,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
      description: 'Badge style variant'
    }
  }
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    children: 'New',
    variant: 'default'
  },
  parameters: {
    ar: {
      args: {
        children: 'جديد'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders correctly', async () => {
      const badge = canvas.getByText('New');
      await expect(badge).toBeInTheDocument();
      await expect(badge).toBeVisible();
    });
  }
};

// With Icon - users can change variant via controls
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Check className="h-3 w-3 me-1" />
        Verified
      </>
    )
  },
  parameters: {
    ar: {
      args: {
        children: (
          <>
            <Check className="h-3 w-3 me-1" />
            موثّق
          </>
        )
      }
    },
    docs: {
      description: {
        story: 'Badge with icon. Use the Controls panel to try different variants.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders with icon and text', async () => {
      const badge = canvas.getByText('Verified');
      await expect(badge).toBeInTheDocument();
      await expect(badge).toBeVisible();
    });
  }
};

// Status Indicator - users can change variant via controls
export const StatusIndicator: Story = {
  args: {
    variant: 'default',
    role: 'status',
    children: (
      <>
        <CheckCircle className="h-3 w-3 me-1" />
        Active
      </>
    )
  },
  parameters: {
    ar: {
      args: {
        children: (
          <>
            <CheckCircle className="h-3 w-3 me-1" />
            نشط
          </>
        )
      }
    },
    docs: {
      description: {
        story: 'Status indicator with icon and role="status" for screen reader announcements. Use Controls to try different statuses and variants.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders status indicator', async () => {
      const badge = canvas.getByText('Active');
      await expect(badge).toBeInTheDocument();
      await expect(badge).toBeVisible();
    });

    await step('Has role="status" for accessibility', async () => {
      const badge = canvas.getByText('Active');
      await expect(badge).toHaveAttribute('role', 'status');
    });
  }
};

// Notification Count (from component page line 366-382)
export const NotificationCount: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="outline" className="relative">
        Notifications
        <Badge className="absolute -top-2 -end-2 px-2">3</Badge>
      </Button>
      <Button variant="outline" className="relative">
        Messages
        <Badge className="absolute -top-2 -end-2 px-2">12</Badge>
      </Button>
      <Button variant="outline" className="relative">
        Cart
        <Badge variant="secondary" className="absolute -top-2 -end-2 px-2">
          5
        </Badge>
      </Button>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders notification badges on buttons', async () => {
      await expect(canvas.getByText('Notifications')).toBeInTheDocument();
      await expect(canvas.getByText('3')).toBeInTheDocument();
      await expect(canvas.getByText('Messages')).toBeInTheDocument();
      await expect(canvas.getByText('12')).toBeInTheDocument();
      await expect(canvas.getByText('Cart')).toBeInTheDocument();
      await expect(canvas.getByText('5')).toBeInTheDocument();
    });
  }
};

// All Variants Showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  }
};

// All With Icons
export const AllWithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>
        <Check className="h-3 w-3 me-1" />
        Verified
      </Badge>
      <Badge variant="secondary">
        <Star className="h-3 w-3 me-1" />
        Featured
      </Badge>
      <Badge variant="destructive">
        <WarningCircle className="h-3 w-3 me-1" />
        Error
      </Badge>
      <Badge variant="outline">
        <Lightning className="h-3 w-3 me-1" />
        Fast
      </Badge>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  }
};

// All Status Indicators
export const AllStatusIndicators: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default" role="status">
        <CheckCircle className="h-3 w-3 me-1" />
        Active
      </Badge>
      <Badge variant="secondary" role="status">
        <Clock className="h-3 w-3 me-1" />
        Pending
      </Badge>
      <Badge variant="destructive" role="status">
        <XCircle className="h-3 w-3 me-1" />
        Failed
      </Badge>
      <Badge variant="outline" role="status">
        <WarningCircle className="h-3 w-3 me-1" />
        Info
      </Badge>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Status indicators with role="status" for accessibility. Screen readers will announce status changes.'
      }
    }
  }
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge className="text-[10px] px-1.5 py-0">Tiny</Badge>
      <Badge>Normal</Badge>
      <Badge className="text-sm px-3 py-1">Large</Badge>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  }
};

// All Custom Colors
export const AllCustomColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge className="bg-green-500 hover:bg-green-600 border-transparent text-white">
        Success
      </Badge>
      <Badge className="bg-yellow-500 hover:bg-yellow-600 border-transparent text-white">
        Warning
      </Badge>
      <Badge className="bg-blue-500 hover:bg-blue-600 border-transparent text-white">
        Info
      </Badge>
      <Badge className="bg-purple-500 hover:bg-purple-600 border-transparent text-white">
        Custom
      </Badge>
      <Badge className="bg-pink-500 hover:bg-pink-600 border-transparent text-white">
        Special
      </Badge>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  }
};
