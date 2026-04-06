import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Card, CardContent } from '../../../components/ui/card';
import { User, Bell } from '@phosphor-icons/react';
import * as React from 'react';

/**
 * Tabs Component Stories
 *
 * All examples are taken from /app/(docs)/components/tabs/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Tabs organize content into separate views with smooth animations,
 * keyboard navigation, and full RTL support. Built on Radix UI.
 */

const meta = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: { type: 'text' }
    },
    value: {
      control: { type: 'text' }
    },
    onValueChange: {
      control: false
    }
  }
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls (hidden from stories list to avoid ID conflicts)
export const Default: Story = {
  args: {
    defaultValue: 'account'
  },
  render: (args) => (
    <Tabs {...args} className="w-96 max-w-md">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="mt-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              Make changes to your account here. Click save when you're done.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password" className="mt-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              Change your password here. After saving, you'll be logged out.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="settings" className="mt-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              Manage your account settings and preferences.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      story: {
        inline: false
      }
    }
  },
};

// Basic Tabs - from component page lines 128-161
export const BasicTabs: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-96 max-w-md">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="mt-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              Make changes to your account here. Click save when you're done.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password" className="mt-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              Change your password here. After saving, you'll be logged out.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="settings" className="mt-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              Manage your account settings and preferences.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Basic tabs with three sections: Account, Password, and Settings.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders all three tabs', async () => {
      await expect(canvas.getByRole('tab', { name: /account/i })).toBeVisible();
      await expect(canvas.getByRole('tab', { name: /password/i })).toBeVisible();
      await expect(canvas.getByRole('tab', { name: /settings/i })).toBeVisible();
    });

    await step('Switches between tabs', async () => {
      await userEvent.click(canvas.getByRole('tab', { name: /password/i }));
      await expect(canvas.getByText(/change your password here/i)).toBeVisible();

      await userEvent.click(canvas.getByRole('tab', { name: /settings/i }));
      await expect(canvas.getByText(/manage your account settings/i)).toBeVisible();
    });
  }
};

// With Icons - from component page lines 188-213
export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="profile" className="w-96 max-w-md">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="profile" className="gap-2">
          <User className="h-4 w-4" />
          Profile
        </TabsTrigger>
        <TabsTrigger value="notifications" className="gap-2">
          <Bell className="h-4 w-4" />
          Notifications
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile" className="mt-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Your profile information</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="notifications" className="mt-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Your notifications settings</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Tabs with icons for visual clarity. Icons are placed before the text.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders tabs with icons', async () => {
      const profileTab = canvas.getByRole('tab', { name: /profile/i });
      const notificationsTab = canvas.getByRole('tab', { name: /notifications/i });

      await expect(profileTab).toBeVisible();
      await expect(notificationsTab).toBeVisible();

      // Verify default tab is active
      await expect(profileTab).toHaveAttribute('data-state', 'active');
    });

    await step('Switches between icon tabs', async () => {
      const notificationsTab = canvas.getByRole('tab', { name: /notifications/i });

      await userEvent.click(notificationsTab);

      await expect(notificationsTab).toHaveAttribute('data-state', 'active');
      await expect(canvas.getByText(/your notifications settings/i)).toBeVisible();
    });
  }
};

// Controlled - from component page lines 223-252
export const Controlled: Story = {
  render: () => {
    const [activeTab, setActiveTab] = React.useState('account');

    return (
      <div className="space-y-4 w-96 max-w-md">
        <p className="text-sm text-muted-foreground">Active tab: {activeTab}</p>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Account tab content</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="password" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Password tab content</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Settings tab content</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Controlled tabs with external state management. Shows active tab value above.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Shows initial state value', async () => {
      await expect(canvas.getByText('Active tab: account')).toBeVisible();
      await expect(canvas.getByRole('tab', { name: /account/i })).toHaveAttribute('data-state', 'active');
    });

    await step('Updates state when tab is clicked', async () => {
      await userEvent.click(canvas.getByRole('tab', { name: /password/i }));

      await expect(canvas.getByText('Active tab: password')).toBeVisible();
      await expect(canvas.getByRole('tab', { name: /password/i })).toHaveAttribute('data-state', 'active');
      await expect(canvas.getByText(/password tab content/i)).toBeVisible();
    });

    await step('Updates state for third tab', async () => {
      await userEvent.click(canvas.getByRole('tab', { name: /settings/i }));

      await expect(canvas.getByText('Active tab: settings')).toBeVisible();
      await expect(canvas.getByRole('tab', { name: /settings/i })).toHaveAttribute('data-state', 'active');
    });
  }
};

// Two Tabs
export const TwoTabs: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-96 max-w-md">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="mt-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              View your account overview and summary information.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="analytics" className="mt-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              Analyze your usage patterns and trends.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Tabs with two options, using grid-cols-2 for equal width.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders two-tab layout', async () => {
      await expect(canvas.getByRole('tab', { name: /overview/i })).toBeVisible();
      await expect(canvas.getByRole('tab', { name: /analytics/i })).toBeVisible();
      await expect(canvas.getByRole('tab', { name: /overview/i })).toHaveAttribute('data-state', 'active');
    });

    await step('Switches between two tabs', async () => {
      await userEvent.click(canvas.getByRole('tab', { name: /analytics/i }));

      await expect(canvas.getByText(/analyze your usage patterns/i)).toBeVisible();
      await expect(canvas.getByRole('tab', { name: /analytics/i })).toHaveAttribute('data-state', 'active');
    });
  }
};

