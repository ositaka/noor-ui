import type { Meta, StoryObj } from '@storybook/react';
import { DashboardShell } from '../../../components/ui/dashboard-shell';
import { Card, CardContent } from '../../../components/ui/card';
import {
  Home,
  FileText,
  Settings,
  Users,
  BarChart3,
  MessageSquare,
  Bell
} from 'lucide-react';

/**
 * Dashboard Shell Component Stories
 *
 * All examples are taken from /app/(docs)/components/dashboard-shell/page.tsx
 *
 * Note: DashboardShell provides a complete dashboard layout.
 * Features: Sidebar navigation with bilingual titles, user menu, notifications, badges, RTL-ready.
 */

const meta = {
  title: 'Basic/Dashboard Shell',
  component: DashboardShell,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['!autodocs'],
  argTypes: {
    navItems: { control: false },
    user: { control: false },
    notifications: { control: false },
    logo: { control: false },
    logoHref: { control: 'text' },
    sidebarWidth: { control: 'text' },
    onProfileClick: { control: false },
    onSettingsClick: { control: false },
    onLogout: { control: false },
    relative: { control: 'boolean' }
  }
} satisfies Meta<typeof DashboardShell>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    relative: true
  },
  render: (args) => {
    const navItems = [
      {
        title: 'Dashboard',
        titleAr: 'لوحة التحكم',
        href: '#',
        icon: <Home className="h-5 w-5" />
      },
      {
        title: 'Posts',
        titleAr: 'المقالات',
        href: '#',
        icon: <FileText className="h-5 w-5" />,
        badge: 5
      },
      {
        title: 'Settings',
        titleAr: 'الإعدادات',
        href: '#',
        icon: <Settings className="h-5 w-5" />
      },
    ];

    return (
      <div className="h-[600px] overflow-hidden border rounded-lg">
        <DashboardShell
          {...args}
          navItems={navItems}
          user={{
            name: 'Ahmed Al-Rashid',
            email: 'ahmed@example.com'
          }}
          onLogout={() => console.log('Logout')}
        >
          <div className="container py-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard Content</h1>
            <p className="text-muted-foreground">
              Your main content goes here.
            </p>
          </div>
        </DashboardShell>
      </div>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  }
};

// Basic Usage - from page lines 260-292
export const BasicUsage: Story = {
  render: () => {
    const navItems = [
      {
        title: 'Dashboard',
        titleAr: 'لوحة التحكم',
        href: '#',
        icon: <Home className="h-5 w-5" />
      },
      {
        title: 'Posts',
        titleAr: 'المقالات',
        href: '#',
        icon: <FileText className="h-5 w-5" />,
        badge: 5
      },
      {
        title: 'Team',
        titleAr: 'الفريق',
        href: '#',
        icon: <Users className="h-5 w-5" />
      },
      {
        title: 'Analytics',
        titleAr: 'التحليلات',
        href: '#',
        icon: <BarChart3 className="h-5 w-5" />
      },
      {
        title: 'Settings',
        titleAr: 'الإعدادات',
        href: '#',
        icon: <Settings className="h-5 w-5" />
      },
    ];

    return (
      <div className="h-[600px] overflow-hidden border rounded-lg">
        <DashboardShell
          relative
          navItems={navItems}
          user={{
            name: 'Ahmed Al-Rashid',
            email: 'ahmed@example.com'
          }}
          onLogout={() => console.log('Logout')}
        >
          <div className="container py-6">
            <h2 className="text-2xl font-bold mb-4">Dashboard Content</h2>
            <p className="text-muted-foreground">
              Main content area with sidebar navigation
            </p>
          </div>
        </DashboardShell>
      </div>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// With Notifications - from page lines 444-474
export const WithNotifications: Story = {
  render: () => {
    const navItems = [
      {
        title: 'Dashboard',
        titleAr: 'لوحة التحكم',
        href: '#',
        icon: <Home className="h-5 w-5" />
      },
      {
        title: 'Posts',
        titleAr: 'المقالات',
        href: '#',
        icon: <FileText className="h-5 w-5" />
      },
      {
        title: 'Team',
        titleAr: 'الفريق',
        href: '#',
        icon: <Users className="h-5 w-5" />
      },
    ];

    const notifications = [
      {
        id: '1',
        title: 'New comment',
        description: 'Sarah commented on your post',
        time: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        read: false,
        icon: <MessageSquare className="h-5 w-5" />
      },
      {
        id: '2',
        title: 'Post published',
        description: 'Your post "Getting Started" is now live',
        time: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        read: true,
        icon: <Bell className="h-5 w-5" />
      },
    ];

    return (
      <div className="h-[600px] overflow-hidden border rounded-lg">
        <DashboardShell
          relative
          navItems={navItems}
          user={{
            name: 'Sarah Johnson',
            email: 'sarah@example.com',
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
          }}
          notifications={notifications}
          onProfileClick={() => console.log('Profile clicked')}
          onLogout={() => console.log('Logout')}
          onMarkAsRead={(id) => console.log('Mark as read:', id)}
          onClearAll={() => console.log('Clear all')}
        >
          <div className="container py-6">
            <h2 className="text-2xl font-bold">Dashboard with Notifications</h2>
          </div>
        </DashboardShell>
      </div>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// Full Featured - from page lines 477-513
export const FullFeatured: Story = {
  render: () => {
    const navItems = [
      {
        title: 'Dashboard',
        titleAr: 'لوحة التحكم',
        href: '#',
        icon: <Home className="h-5 w-5" />
      },
      {
        title: 'Posts',
        titleAr: 'المقالات',
        href: '#',
        icon: <FileText className="h-5 w-5" />,
        badge: 5
      },
      {
        title: 'Team',
        titleAr: 'الفريق',
        href: '#',
        icon: <Users className="h-5 w-5" />
      },
      {
        title: 'Analytics',
        titleAr: 'التحليلات',
        href: '#',
        icon: <BarChart3 className="h-5 w-5" />
      },
      {
        title: 'Settings',
        titleAr: 'الإعدادات',
        href: '#',
        icon: <Settings className="h-5 w-5" />
      },
    ];

    const notifications = [
      {
        id: '1',
        title: 'New comment',
        description: 'Sarah commented on your post',
        time: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        read: false,
        icon: <MessageSquare className="h-5 w-5" />
      },
      {
        id: '2',
        title: 'Post published',
        description: 'Your post "Getting Started" is now live',
        time: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        read: true,
        icon: <Bell className="h-5 w-5" />
      },
    ];

    return (
      <div className="h-[600px] overflow-hidden border rounded-lg">
        <DashboardShell
          relative
          navItems={navItems}
          user={{
            name: 'Fatima Al-Zahra',
            email: 'fatima@example.com',
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima'
          }}
          notifications={notifications}
          onProfileClick={() => console.log('Profile')}
          onSettingsClick={() => console.log('Settings')}
          onBillingClick={() => console.log('Billing')}
          onLogout={() => console.log('Logout')}
          onMarkAsRead={(id) => console.log('Mark as read:', id)}
          onMarkAllAsRead={() => console.log('Mark all as read')}
          onClearAll={() => console.log('Clear all')}
        >
          <div className="container py-6">
            <h2 className="text-2xl font-bold mb-4">Full Featured Dashboard</h2>
            <p className="text-muted-foreground">
              Complete dashboard with navigation, user menu, and notification center.
            </p>
          </div>
        </DashboardShell>
      </div>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// With Badges
export const WithBadges: Story = {
  render: () => {
    const navItems = [
      {
        title: 'Dashboard',
        titleAr: 'لوحة التحكم',
        href: '#',
        icon: <Home className="h-5 w-5" />
      },
      {
        title: 'Posts',
        titleAr: 'المقالات',
        href: '#',
        icon: <FileText className="h-5 w-5" />,
        badge: 12
      },
      {
        title: 'Team',
        titleAr: 'الفريق',
        href: '#',
        icon: <Users className="h-5 w-5" />,
        badge: 3
      },
      {
        title: 'Settings',
        titleAr: 'الإعدادات',
        href: '#',
        icon: <Settings className="h-5 w-5" />
      },
    ];

    return (
      <div className="h-[600px] overflow-hidden border rounded-lg">
        <DashboardShell
          relative
          navItems={navItems}
          user={{
            name: 'Nuno Marques',
            email: 'nuno@example.com'
          }}
          onLogout={() => console.log('Logout')}
        >
          <div className="container py-6">
            <h2 className="text-2xl font-bold mb-4">Navigation with Badges</h2>
            <p className="text-muted-foreground">
              Shows badge counts on navigation items.
            </p>
          </div>
        </DashboardShell>
      </div>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// With User Avatar
export const WithUserAvatar: Story = {
  render: () => {
    const navItems = [
      {
        title: 'Dashboard',
        titleAr: 'لوحة التحكم',
        href: '#',
        icon: <Home className="h-5 w-5" />
      },
      {
        title: 'Posts',
        titleAr: 'المقالات',
        href: '#',
        icon: <FileText className="h-5 w-5" />
      },
      {
        title: 'Settings',
        titleAr: 'الإعدادات',
        href: '#',
        icon: <Settings className="h-5 w-5" />
      },
    ];

    return (
      <div className="h-[600px] overflow-hidden border rounded-lg">
        <DashboardShell
          relative
          navItems={navItems}
          user={{
            name: 'Fatima Al-Zahra',
            email: 'fatima@example.com',
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima'
          }}
          onProfileClick={() => console.log('Profile')}
          onSettingsClick={() => console.log('Settings')}
          onLogout={() => console.log('Logout')}
        >
          <div className="container py-6">
            <h2 className="text-2xl font-bold mb-4">With User Avatar</h2>
            <p className="text-muted-foreground">
              User menu with profile image.
            </p>
          </div>
        </DashboardShell>
      </div>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// Without Notifications
export const WithoutNotifications: Story = {
  render: () => {
    const navItems = [
      {
        title: 'Dashboard',
        titleAr: 'لوحة التحكم',
        href: '#',
        icon: <Home className="h-5 w-5" />
      },
      {
        title: 'Posts',
        titleAr: 'المقالات',
        href: '#',
        icon: <FileText className="h-5 w-5" />
      },
      {
        title: 'Analytics',
        titleAr: 'التحليلات',
        href: '#',
        icon: <BarChart3 className="h-5 w-5" />
      },
      {
        title: 'Settings',
        titleAr: 'الإعدادات',
        href: '#',
        icon: <Settings className="h-5 w-5" />
      },
    ];

    return (
      <div className="h-[600px] overflow-hidden border rounded-lg">
        <DashboardShell
          relative
          navItems={navItems}
          user={{
            name: 'Ahmed Al-Rashid',
            email: 'ahmed@example.com'
          }}
          onLogout={() => console.log('Logout')}
        >
          <div className="container py-6">
            <h2 className="text-2xl font-bold mb-4">Simple Dashboard</h2>
            <p className="text-muted-foreground">
              Dashboard without notifications.
            </p>
          </div>
        </DashboardShell>
      </div>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// Minimal Navigation
export const MinimalNavigation: Story = {
  render: () => {
    const navItems = [
      {
        title: 'Dashboard',
        titleAr: 'لوحة التحكم',
        href: '#',
        icon: <Home className="h-5 w-5" />
      },
      {
        title: 'Settings',
        titleAr: 'الإعدادات',
        href: '#',
        icon: <Settings className="h-5 w-5" />
      },
    ];

    return (
      <div className="h-[600px] overflow-hidden border rounded-lg">
        <DashboardShell
          relative
          navItems={navItems}
          user={{
            name: 'User',
            email: 'user@example.com'
          }}
          onLogout={() => console.log('Logout')}
        >
          <div className="container py-6">
            <h2 className="text-2xl font-bold mb-4">Minimal Navigation</h2>
            <p className="text-muted-foreground">
              Dashboard with minimal navigation items.
            </p>
          </div>
        </DashboardShell>
      </div>
    );
  },
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
  render: () => {
    const navItems = [
      {
        title: 'Dashboard',
        titleAr: 'لوحة التحكم',
        href: '#',
        icon: <Home className="h-5 w-5" />
      },
      {
        title: 'Posts',
        titleAr: 'المقالات',
        href: '#',
        icon: <FileText className="h-5 w-5" />,
        badge: 5
      },
      {
        title: 'Team',
        titleAr: 'الفريق',
        href: '#',
        icon: <Users className="h-5 w-5" />
      },
      {
        title: 'Analytics',
        titleAr: 'التحليلات',
        href: '#',
        icon: <BarChart3 className="h-5 w-5" />
      },
      {
        title: 'Settings',
        titleAr: 'الإعدادات',
        href: '#',
        icon: <Settings className="h-5 w-5" />
      },
    ];

    const notifications = [
      {
        id: '1',
        title: 'تعليق جديد',
        description: 'سارة علقت على منشورك',
        time: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        read: false,
        icon: <MessageSquare className="h-5 w-5" />
      },
      {
        id: '2',
        title: 'تم نشر المنشور',
        description: 'منشورك "البداية" متاح الآن',
        time: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        read: true,
        icon: <Bell className="h-5 w-5" />
      },
    ];

    return (
      <div className="h-[600px] overflow-hidden border rounded-lg">
        <DashboardShell
          relative
          navItems={navItems}
          user={{
            name: 'فاطمة الزهراء',
            email: 'fatima@example.com',
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima'
          }}
          notifications={notifications}
          onProfileClick={() => console.log('الملف الشخصي')}
          onSettingsClick={() => console.log('الإعدادات')}
          onLogout={() => console.log('تسجيل الخروج')}
          onMarkAsRead={(id) => console.log('تحديد كمقروء:', id)}
          onMarkAllAsRead={() => console.log('تحديد الكل كمقروء')}
          onClearAll={() => console.log('مسح الكل')}
        >
          <div className="container py-6">
            <h2 className="text-2xl font-bold mb-4">لوحة التحكم الكاملة</h2>
            <p className="text-muted-foreground">
              لوحة تحكم كاملة مع التنقل وقائمة المستخدم ومركز الإشعارات.
            </p>
          </div>
        </DashboardShell>
      </div>
    );
  },
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true }
  }
};
