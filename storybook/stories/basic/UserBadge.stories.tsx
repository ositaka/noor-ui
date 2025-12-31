import type { Meta, StoryObj } from '@storybook/react';
import { UserBadge } from '../../../components/ui/user-badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';

/**
 * User Badge Component Stories
 *
 * All examples are taken from /app/(docs)/components/user-badge/page.tsx
 *
 * Note: UserBadge displays user roles and statuses.
 * Features: Author, moderator, verified, admin variants, custom badges, RTL-ready.
 */

const meta = {
  title: 'Basic/User Badge',
  component: UserBadge,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['author', 'moderator', 'verified', 'admin', 'custom']
    },
    label: { control: 'text' },
    icon: { control: false },
    className: { control: false }
  }
} satisfies Meta<typeof UserBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    variant: 'author'
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  }
};

// All Variants - from page lines 97-102
export const AllVariants: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>All Variants</CardTitle>
        <CardDescription>Built-in badge variants for different user roles.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <UserBadge variant="author" />
          <UserBadge variant="moderator" />
          <UserBadge variant="verified" />
          <UserBadge variant="admin" />
          <UserBadge variant="custom" label="VIP" />
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
  }
};

// Author
export const Author: Story = {
  render: () => <UserBadge variant="author" />,
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// Moderator
export const Moderator: Story = {
  render: () => <UserBadge variant="moderator" />,
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// Verified
export const Verified: Story = {
  render: () => <UserBadge variant="verified" />,
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// Admin
export const Admin: Story = {
  render: () => <UserBadge variant="admin" />,
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// Custom
export const Custom: Story = {
  render: () => (
    <div className="flex gap-3">
      <UserBadge variant="custom" label="VIP" />
      <UserBadge variant="custom" label="Pro" />
      <UserBadge variant="custom" label="Plus" />
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

// RTL
export const RTL: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <UserBadge variant="author" />
      <UserBadge variant="moderator" />
      <UserBadge variant="verified" />
      <UserBadge variant="admin" />
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
