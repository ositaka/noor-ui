import type { Meta, StoryObj } from '@storybook/react';
import { NotificationCenter, type Notification } from '../../../components/ui/notification-center';
import { Card, CardContent } from '../../../components/ui/card';
import { MessageSquare, UserPlus, Heart, Star, Bell, AlertCircle } from 'lucide-react';
import { useState } from 'react';

/**
 * Notification Center Component Stories
 *
 * All examples are taken from /app/(docs)/components/notification-center/page.tsx
 *
 * Note: NotificationCenter displays a list of notifications with actions.
 * Features: Unread badge, relative time, icons/avatars, mark as read, remove notifications, bilingual support.
 */

const meta = {
  title: 'Basic/Notification Center',
  component: NotificationCenter,
  parameters: {
    layout: 'centered'
  },
  tags: ['!autodocs'],
  argTypes: {
    notifications: { control: false },
    onNotificationClick: { control: false },
    onMarkAsRead: { control: false },
    onMarkAllAsRead: { control: false },
    onClearAll: { control: false },
    onRemove: { control: false },
    className: { control: 'text' },
    maxHeight: { control: 'text' }
  }
} satisfies Meta<typeof NotificationCenter>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  render: () => {
    const [notifications, setNotifications] = useState<Notification[]>([
      {
        id: '1',
        title: 'New comment on your post',
        description: 'Sarah commented: "Great article!"',
        time: new Date(Date.now() - 5 * 60000).toISOString(),
        read: false,
        icon: <MessageSquare className="h-5 w-5" />
      },
      {
        id: '2',
        title: 'New follower',
        description: 'Ahmed is now following you',
        time: new Date(Date.now() - 120 * 60000).toISOString(),
        read: false,
        icon: <UserPlus className="h-5 w-5" />
      },
      {
        id: '3',
        title: 'Someone liked your post',
        description: '3 people liked "Getting Started with React"',
        time: new Date(Date.now() - 1440 * 60000).toISOString(),
        read: true,
        icon: <Heart className="h-5 w-5" />
      },
    ]);

    return (
      <NotificationCenter
        notifications={notifications}
        onNotificationClick={(notif) => console.log('Clicked:', notif)}
        onMarkAsRead={(id) => {
          setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
          );
        }}
        onMarkAllAsRead={() => {
          setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        }}
        onClearAll={() => setNotifications([])}
        onRemove={(id) => {
          setNotifications(prev => prev.filter(n => n.id !== id));
        }}
      />
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  }
};

// Basic Usage - from page lines 126-157
export const BasicUsage: Story = {
  render: () => {
    const [notifications, setNotifications] = useState<Notification[]>([
      {
        id: '1',
        title: 'New comment on your post',
        description: 'Sarah commented: "Great article!"',
        time: new Date(Date.now() - 5 * 60000).toISOString(),
        read: false,
        icon: <MessageSquare className="h-5 w-5" />
      },
      {
        id: '2',
        title: 'New follower',
        description: 'Ahmed is now following you',
        time: new Date(Date.now() - 120 * 60000).toISOString(),
        read: false,
        icon: <UserPlus className="h-5 w-5" />
      },
      {
        id: '3',
        title: 'Someone liked your post',
        description: '3 people liked "Getting Started with React"',
        time: new Date(Date.now() - 1440 * 60000).toISOString(),
        read: true,
        icon: <Heart className="h-5 w-5" />
      },
    ]);

    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center">
            <NotificationCenter
              notifications={notifications}
              onMarkAsRead={(id) => {
                setNotifications(prev =>
                  prev.map(n => n.id === id ? { ...n, read: true } : n)
                );
              }}
              onMarkAllAsRead={() => {
                setNotifications(prev => prev.map(n => ({ ...n, read: true })));
              }}
              onClearAll={() => setNotifications([])}
              onRemove={(id) => {
                setNotifications(prev => prev.filter(n => n.id !== id));
              }}
            />
          </div>
        </CardContent>
      </Card>
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

// With Avatars - from page lines 159-171, 350-358
export const WithAvatars: Story = {
  render: () => {
    const [notifications, setNotifications] = useState<Notification[]>([
      {
        id: '1',
        title: 'You have a new review',
        description: '"Excellent service!" - 5 stars',
        time: new Date(Date.now() - 10 * 60000).toISOString(),
        read: false,
        icon: <Star className="h-5 w-5" />,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
      },
    ]);

    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center">
            <NotificationCenter
              notifications={notifications}
              onMarkAsRead={(id) => {
                setNotifications(prev =>
                  prev.map(n => n.id === id ? { ...n, read: true } : n)
                );
              }}
              onMarkAllAsRead={() => {
                setNotifications(prev => prev.map(n => ({ ...n, read: true })));
              }}
              onRemove={(id) => {
                setNotifications(prev => prev.filter(n => n.id !== id));
              }}
            />
          </div>
        </CardContent>
      </Card>
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

// Empty State - from page lines 365-377
export const EmptyState: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-center">
          <NotificationCenter notifications={[]} />
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

// Many Notifications
export const ManyNotifications: Story = {
  render: () => {
    const [notifications, setNotifications] = useState<Notification[]>([
      {
        id: '1',
        title: 'New message',
        description: 'You have a new message from Sarah',
        time: new Date(Date.now() - 2 * 60000).toISOString(),
        read: false,
        icon: <MessageSquare className="h-5 w-5" />
      },
      {
        id: '2',
        title: 'New follower',
        description: 'Ahmed started following you',
        time: new Date(Date.now() - 30 * 60000).toISOString(),
        read: false,
        icon: <UserPlus className="h-5 w-5" />
      },
      {
        id: '3',
        title: 'System update',
        description: 'New features are available',
        time: new Date(Date.now() - 60 * 60000).toISOString(),
        read: false,
        icon: <Bell className="h-5 w-5" />
      },
      {
        id: '4',
        title: 'Like on your post',
        description: '5 people liked your post',
        time: new Date(Date.now() - 180 * 60000).toISOString(),
        read: true,
        icon: <Heart className="h-5 w-5" />
      },
      {
        id: '5',
        title: 'New review',
        description: 'You received a 5-star review',
        time: new Date(Date.now() - 360 * 60000).toISOString(),
        read: true,
        icon: <Star className="h-5 w-5" />
      },
      {
        id: '6',
        title: 'Comment reply',
        description: 'Someone replied to your comment',
        time: new Date(Date.now() - 720 * 60000).toISOString(),
        read: true,
        icon: <MessageSquare className="h-5 w-5" />
      },
    ]);

    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center">
            <NotificationCenter
              notifications={notifications}
              onMarkAsRead={(id) => {
                setNotifications(prev =>
                  prev.map(n => n.id === id ? { ...n, read: true } : n)
                );
              }}
              onMarkAllAsRead={() => {
                setNotifications(prev => prev.map(n => ({ ...n, read: true })));
              }}
              onClearAll={() => setNotifications([])}
              onRemove={(id) => {
                setNotifications(prev => prev.filter(n => n.id !== id));
              }}
              maxHeight="500px"
            />
          </div>
        </CardContent>
      </Card>
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

// All Unread
export const AllUnread: Story = {
  render: () => {
    const [notifications, setNotifications] = useState<Notification[]>([
      {
        id: '1',
        title: 'New comment',
        description: 'Sarah commented on your post',
        time: new Date(Date.now() - 5 * 60000).toISOString(),
        read: false,
        icon: <MessageSquare className="h-5 w-5" />
      },
      {
        id: '2',
        title: 'New follower',
        description: 'Ahmed is following you',
        time: new Date(Date.now() - 15 * 60000).toISOString(),
        read: false,
        icon: <UserPlus className="h-5 w-5" />
      },
      {
        id: '3',
        title: 'Alert',
        description: 'Important update available',
        time: new Date(Date.now() - 30 * 60000).toISOString(),
        read: false,
        icon: <AlertCircle className="h-5 w-5" />
      },
    ]);

    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center">
            <NotificationCenter
              notifications={notifications}
              onMarkAsRead={(id) => {
                setNotifications(prev =>
                  prev.map(n => n.id === id ? { ...n, read: true } : n)
                );
              }}
              onMarkAllAsRead={() => {
                setNotifications(prev => prev.map(n => ({ ...n, read: true })));
              }}
              onRemove={(id) => {
                setNotifications(prev => prev.filter(n => n.id !== id));
              }}
            />
          </div>
        </CardContent>
      </Card>
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

// All Read
export const AllRead: Story = {
  render: () => {
    const [notifications, setNotifications] = useState<Notification[]>([
      {
        id: '1',
        title: 'Comment',
        description: 'Sarah commented on your post',
        time: new Date(Date.now() - 1440 * 60000).toISOString(),
        read: true,
        icon: <MessageSquare className="h-5 w-5" />
      },
      {
        id: '2',
        title: 'Follower',
        description: 'Ahmed is following you',
        time: new Date(Date.now() - 2880 * 60000).toISOString(),
        read: true,
        icon: <UserPlus className="h-5 w-5" />
      },
      {
        id: '3',
        title: 'Like',
        description: 'Someone liked your post',
        time: new Date(Date.now() - 4320 * 60000).toISOString(),
        read: true,
        icon: <Heart className="h-5 w-5" />
      },
    ]);

    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center">
            <NotificationCenter
              notifications={notifications}
              onMarkAsRead={(id) => {
                setNotifications(prev =>
                  prev.map(n => n.id === id ? { ...n, read: true } : n)
                );
              }}
              onClearAll={() => setNotifications([])}
            />
          </div>
        </CardContent>
      </Card>
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

// With Mixed Avatars and Icons
export const MixedAvatarsAndIcons: Story = {
  render: () => {
    const [notifications, setNotifications] = useState<Notification[]>([
      {
        id: '1',
        title: 'New review',
        description: '"Great product!" - 5 stars',
        time: new Date(Date.now() - 10 * 60000).toISOString(),
        read: false,
        icon: <Star className="h-5 w-5" />,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
      },
      {
        id: '2',
        title: 'System notification',
        description: 'Your account was updated',
        time: new Date(Date.now() - 60 * 60000).toISOString(),
        read: false,
        icon: <Bell className="h-5 w-5" />
      },
      {
        id: '3',
        title: 'New follower',
        description: 'Sarah started following you',
        time: new Date(Date.now() - 120 * 60000).toISOString(),
        read: true,
        icon: <UserPlus className="h-5 w-5" />,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
      },
    ]);

    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center">
            <NotificationCenter
              notifications={notifications}
              onMarkAsRead={(id) => {
                setNotifications(prev =>
                  prev.map(n => n.id === id ? { ...n, read: true } : n)
                );
              }}
              onMarkAllAsRead={() => {
                setNotifications(prev => prev.map(n => ({ ...n, read: true })));
              }}
              onRemove={(id) => {
                setNotifications(prev => prev.filter(n => n.id !== id));
              }}
            />
          </div>
        </CardContent>
      </Card>
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
    const [notifications, setNotifications] = useState<Notification[]>([
      {
        id: '1',
        title: 'New comment on your post',
        titleAr: 'تعليق جديد على منشورك',
        description: 'Sarah commented: "Great article!"',
        descriptionAr: 'سارة علقت: "مقال رائع!"',
        time: new Date(Date.now() - 5 * 60000).toISOString(),
        read: false,
        icon: <MessageSquare className="h-5 w-5" />
      },
      {
        id: '2',
        title: 'New follower',
        titleAr: 'متابع جديد',
        description: 'Ahmed is now following you',
        descriptionAr: 'أحمد يتابعك الآن',
        time: new Date(Date.now() - 120 * 60000).toISOString(),
        read: false,
        icon: <UserPlus className="h-5 w-5" />
      },
      {
        id: '3',
        title: 'Someone liked your post',
        titleAr: 'شخص ما أعجبه منشورك',
        description: '3 people liked "Getting Started with React"',
        descriptionAr: '3 أشخاص أعجبهم "البدء مع React"',
        time: new Date(Date.now() - 1440 * 60000).toISOString(),
        read: true,
        icon: <Heart className="h-5 w-5" />
      },
    ]);

    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center">
            <NotificationCenter
              notifications={notifications}
              onNotificationClick={(notif) => console.log('تم النقر:', notif)}
              onMarkAsRead={(id) => {
                setNotifications(prev =>
                  prev.map(n => n.id === id ? { ...n, read: true } : n)
                );
              }}
              onMarkAllAsRead={() => {
                setNotifications(prev => prev.map(n => ({ ...n, read: true })));
              }}
              onClearAll={() => setNotifications([])}
              onRemove={(id) => {
                setNotifications(prev => prev.filter(n => n.id !== id));
              }}
            />
          </div>
        </CardContent>
      </Card>
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
