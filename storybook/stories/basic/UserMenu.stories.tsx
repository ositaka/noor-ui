import type { Meta, StoryObj } from '@storybook/react';
import { UserMenu } from '../../../components/ui/user-menu';
import { Card, CardContent } from '../../../components/ui/card';

/**
 * User Menu Component Stories
 *
 * All examples are taken from /app/(docs)/components/user-menu/page.tsx
 *
 * Note: UserMenu displays a user dropdown with profile actions.
 * Features: Avatar/initials display, user info, flexible actions, RTL support, keyboard navigation.
 */

const meta = {
  title: 'Basic/User Menu',
  component: UserMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    user: { control: false },
    onProfileClick: { control: false },
    onSettingsClick: { control: false },
    onBillingClick: { control: false },
    onTeamClick: { control: false },
    onSupportClick: { control: false },
    onLogout: { control: false },
    className: { control: 'text' },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end'],
    },
    side: {
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left'],
    },
  },
} satisfies Meta<typeof UserMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - from page lines 199-210
export const Default: Story = {
  render: () => (
    <UserMenu
      user={{
        name: 'Ahmed Al-Rashid',
        email: 'ahmed@example.com',
      }}
      onProfileClick={() => console.log('Profile')}
      onSettingsClick={() => console.log('Settings')}
      onLogout={() => console.log('Logout')}
    />
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
};

// With Avatar - from page lines 279-288
export const WithAvatar: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-center">
          <UserMenu
            user={{
              name: 'Sarah Johnson',
              email: 'sarah@example.com',
              image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
            }}
            onProfileClick={() => console.log('Profile')}
            onSettingsClick={() => console.log('Settings')}
            onLogout={() => console.log('Logout')}
          />
        </div>
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
    },
  },
};

// Minimal - from page lines 303-309
export const Minimal: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-center">
          <UserMenu
            user={{
              name: 'Nuno Marques',
              email: 'ositaka@example.com',
            }}
            onLogout={() => console.log('Logout')}
          />
        </div>
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
    },
  },
};

// All Options - from page lines 324-336
export const AllOptions: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-center">
          <UserMenu
            user={{
              name: 'Fatima Al-Zahra',
              email: 'fatima@example.com',
              image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima',
            }}
            onProfileClick={() => console.log('Profile')}
            onSettingsClick={() => console.log('Settings')}
            onBillingClick={() => console.log('Billing')}
            onTeamClick={() => console.log('Team')}
            onSupportClick={() => console.log('Support')}
            onLogout={() => console.log('Logout')}
          />
        </div>
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
    },
  },
};

// With Initials
export const WithInitials: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-center">
          <UserMenu
            user={{
              name: 'John Doe',
              email: 'john@example.com',
              initials: 'JD',
            }}
            onProfileClick={() => console.log('Profile')}
            onSettingsClick={() => console.log('Settings')}
            onLogout={() => console.log('Logout')}
          />
        </div>
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
    },
  },
};

// Without Image (Auto Initials)
export const WithoutImage: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-center">
          <UserMenu
            user={{
              name: 'Alice Smith',
              email: 'alice@example.com',
            }}
            onProfileClick={() => console.log('Profile')}
            onSettingsClick={() => console.log('Settings')}
            onLogout={() => console.log('Logout')}
          />
        </div>
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Automatically generates initials from the name when no image is provided.',
      },
    },
  },
};

// In Header Layout - inspired by lines 374-391
export const InHeaderLayout: Story = {
  render: () => (
    <div className="w-full border rounded-lg">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4">
          <h1 className="text-lg font-bold">My App</h1>
          <UserMenu
            user={{
              name: 'Ahmed Al-Rashid',
              email: 'ahmed@example.com',
              image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
            }}
            onProfileClick={() => console.log('Profile')}
            onSettingsClick={() => console.log('Settings')}
            onLogout={() => console.log('Logout')}
          />
        </div>
      </header>
      <div className="p-6">
        <p className="text-sm text-muted-foreground">Page content goes here...</p>
      </div>
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'User menu integrated into a header layout.',
      },
    },
  },
};

// Only Profile and Logout
export const ProfileAndLogout: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-center">
          <UserMenu
            user={{
              name: 'Emily Chen',
              email: 'emily@example.com',
              image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
            }}
            onProfileClick={() => console.log('Profile')}
            onLogout={() => console.log('Logout')}
          />
        </div>
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Simplified menu with only profile and logout options.',
      },
    },
  },
};

// RTL
export const RTL: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-center">
          <UserMenu
            user={{
              name: 'فاطمة الزهراء',
              email: 'fatima@example.com',
              image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima',
            }}
            onProfileClick={() => console.log('الملف الشخصي')}
            onSettingsClick={() => console.log('الإعدادات')}
            onBillingClick={() => console.log('الفواتير')}
            onTeamClick={() => console.log('الفريق')}
            onSupportClick={() => console.log('الدعم')}
            onLogout={() => console.log('تسجيل الخروج')}
          />
        </div>
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
    },
  },
};
