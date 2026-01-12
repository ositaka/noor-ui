import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Card, CardContent } from '../../../components/ui/card';
import { User, Bell } from 'lucide-react';
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
  tags: ['!autodocs'],
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
  globals: {
    direction: 'ltr',
    locale: 'en'
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
  }
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Basic tabs with three sections: Account, Password, and Settings.'
      }
    }
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Tabs with icons for visual clarity. Icons are placed before the text.'
      }
    }
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Controlled tabs with external state management. Shows active tab value above.'
      }
    }
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Tabs with two options, using grid-cols-2 for equal width.'
      }
    }
  }
};

// RTL Example - Basic
export const RTLExample: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-96 max-w-md">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="account">الحساب</TabsTrigger>
        <TabsTrigger value="password">كلمة المرور</TabsTrigger>
        <TabsTrigger value="settings">الإعدادات</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="mt-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              قم بإجراء تغييرات على حسابك هنا. انقر على حفظ عند الانتهاء.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password" className="mt-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              قم بتغيير كلمة المرور هنا. بعد الحفظ، سيتم تسجيل خروجك.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="settings" className="mt-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              إدارة إعدادات حسابك وتفضيلاتك.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Tabs with Arabic labels in RTL mode. Tab order and layout adapt automatically.'
      }
    }
  }
};

// RTL With Icons
export const RTLWithIcons: Story = {
  render: () => (
    <Tabs defaultValue="profile" className="w-96 max-w-md">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="profile" className="gap-2">
          <User className="h-4 w-4" />
          الملف الشخصي
        </TabsTrigger>
        <TabsTrigger value="notifications" className="gap-2">
          <Bell className="h-4 w-4" />
          الإشعارات
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile" className="mt-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">معلومات ملفك الشخصي</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="notifications" className="mt-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">إعدادات الإشعارات</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Tabs with icons in RTL mode. Icons and text flow correctly right-to-left.'
      }
    }
  }
};

// RTL Controlled
export const RTLControlled: Story = {
  render: () => {
    const [activeTab, setActiveTab] = React.useState('account');

    return (
      <div className="space-y-4 w-96 max-w-md">
        <p className="text-sm text-muted-foreground">علامة التبويب النشطة: {activeTab}</p>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="account">الحساب</TabsTrigger>
            <TabsTrigger value="password">كلمة المرور</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">محتوى علامة تبويب الحساب</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="password" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">محتوى علامة تبويب كلمة المرور</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">محتوى علامة تبويب الإعدادات</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  },
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Controlled tabs in RTL with Arabic text. State management works the same in both directions.'
      }
    }
  }
};
