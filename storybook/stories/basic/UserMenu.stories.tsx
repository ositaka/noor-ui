import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { UserMenu } from '../../../components/ui/user-menu';
import { Card, CardContent } from '../../../components/ui/card';

const meta = {
  title: 'User Interface/User Menu',
  component: UserMenu,
  parameters: {
    layout: 'centered'
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
      options: ['start', 'center', 'end']
    },
    side: {
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left']
    }
  }
} satisfies Meta<typeof UserMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - from page lines 199-210
export const Default: Story = {
  args: {
    user: {
      name: 'Ahmed Al-Rashid',
      email: 'ahmed@example.com'
    },
    onProfileClick: fn(),
    onSettingsClick: fn(),
    onLogout: fn()
  }
};

// With Avatar - from page lines 279-288
export const WithAvatar: Story = {
  render: (args) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-center">
          <UserMenu {...args} />
        </div>
      </CardContent>
    </Card>
  ),
  args: {
    user: {
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
    onProfileClick: fn(),
    onSettingsClick: fn(),
    onLogout: fn()
  },
  parameters: {
    controls: { disable: true }
  }
};

// Minimal - from page lines 303-309
export const Minimal: Story = {
  render: (args) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-center">
          <UserMenu {...args} />
        </div>
      </CardContent>
    </Card>
  ),
  args: {
    user: {
      name: 'Nuno Marques',
      email: 'ositaka@example.com'
    },
    onLogout: fn()
  },
  parameters: {
    controls: { disable: true }
  }
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
              image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima'
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
  parameters: {
    controls: { disable: true }
  }
};

// With Initials
export const WithInitials: Story = {
  render: (args) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-center">
          <UserMenu {...args} />
        </div>
      </CardContent>
    </Card>
  ),
  args: {
    user: {
      name: 'Nuno Marques',
      email: 'john@example.com',
      initials: 'JD'
    },
    onProfileClick: fn(),
    onSettingsClick: fn(),
    onLogout: fn()
  },
  parameters: {
    controls: { disable: true }
  }
};

// Without Image (Auto Initials)
export const WithoutImage: Story = {
  render: (args) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-center">
          <UserMenu {...args} />
        </div>
      </CardContent>
    </Card>
  ),
  args: {
    user: {
      name: 'Alice Smith',
      email: 'alice@example.com'
    },
    onProfileClick: fn(),
    onSettingsClick: fn(),
    onLogout: fn()
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Automatically generates initials from the name when no image is provided.'
      }
    }
  }
};

// In Header Layout - inspired by lines 374-391
export const InHeaderLayout: Story = {
  render: (args) => (
    <div className="w-full border rounded-lg">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4">
          <h1 className="text-lg font-bold">My App</h1>
          <UserMenu {...args} />
        </div>
      </header>
      <div className="p-6">
        <p className="text-sm text-muted-foreground">Page content goes here...</p>
      </div>
    </div>
  ),
  args: {
    user: {
      name: 'Ahmed Al-Rashid',
      email: 'ahmed@example.com',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed'
    },
    onProfileClick: fn(),
    onSettingsClick: fn(),
    onLogout: fn()
  },
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    docs: {
      description: {
        story: 'User menu integrated into a header layout.'
      }
    }
  }
};

// Only Profile and Logout
export const ProfileAndLogout: Story = {
  render: (args) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-center">
          <UserMenu {...args} />
        </div>
      </CardContent>
    </Card>
  ),
  args: {
    user: {
      name: 'Emily Chen',
      email: 'emily@example.com',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily'
    },
    onProfileClick: fn(),
    onLogout: fn()
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Simplified menu with only profile and logout options.'
      }
    }
  }
};
