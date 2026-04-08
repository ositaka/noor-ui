import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
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
  title: 'Data Display/User Badge',
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
  parameters: {
    controls: { disable: true }
  }
};

// Author
export const Author: Story = {
  render: () => <UserBadge variant="author" />,
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders author badge', async () => {
      await expect(canvas.getByText('Author')).toBeInTheDocument();
      await expect(canvas.getByText('Author')).toBeVisible();
    });
  }
};

// Moderator
export const Moderator: Story = {
  render: () => <UserBadge variant="moderator" />,
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders moderator badge', async () => {
      await expect(canvas.getByText('Moderator')).toBeInTheDocument();
      await expect(canvas.getByText('Moderator')).toBeVisible();
    });
  }
};

// Verified
export const Verified: Story = {
  render: () => <UserBadge variant="verified" />,
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders verified badge', async () => {
      await expect(canvas.getByText('Verified')).toBeInTheDocument();
      await expect(canvas.getByText('Verified')).toBeVisible();
    });
  }
};

// Admin
export const Admin: Story = {
  render: () => <UserBadge variant="admin" />,
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders admin badge', async () => {
      await expect(canvas.getByText('Admin')).toBeInTheDocument();
      await expect(canvas.getByText('Admin')).toBeVisible();
    });
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
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders custom badges with labels', async () => {
      await expect(canvas.getByText('VIP')).toBeInTheDocument();
      await expect(canvas.getByText('Pro')).toBeInTheDocument();
      await expect(canvas.getByText('Plus')).toBeInTheDocument();
    });
  }
};
