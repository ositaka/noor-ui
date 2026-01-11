import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from '../../../components/ui/separator';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Home, Settings, User, Bell } from 'lucide-react';

/**
 * Separator Component Stories
 *
 * All examples are taken from /app/(docs)/components/separator/page.tsx
 * Uses exact same text and data as the component documentation.
 */

const meta = {
  title: 'Basic/Separator',
  component: Separator,
  parameters: {
    layout: 'centered'
  },
  tags: ['!autodocs']
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls
export const Default: Story = {
  args: {
    orientation: 'horizontal',
    decorative: true
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  render: (args) => (
    <div className="w-full max-w-md space-y-4">
      <div>
        <p className="text-sm">Content above separator</p>
      </div>
      <Separator {...args} />
      <div>
        <p className="text-sm">Content below separator</p>
      </div>
    </div>
  )
};

// Horizontal Sections - from component page lines 229-244
export const HorizontalSections: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold">Section One</h3>
        <p className="text-sm text-muted-foreground">First section content</p>
      </div>
      <Separator />
      <div>
        <h3 className="font-semibold">Section Two</h3>
        <p className="text-sm text-muted-foreground">Second section content</p>
      </div>
      <Separator />
      <div>
        <h3 className="font-semibold">Section Three</h3>
        <p className="text-sm text-muted-foreground">Third section content</p>
      </div>
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

// Vertical in Buttons - from component page lines 257-265
export const VerticalInButtons: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button variant="outline">Home</Button>
      <Separator orientation="vertical" className="h-6" />
      <Button variant="outline">About</Button>
      <Separator orientation="vertical" className="h-6" />
      <Button variant="outline">Services</Button>
      <Separator orientation="vertical" className="h-6" />
      <Button variant="outline">Contact</Button>
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

// In Card - from component page lines 278-304
export const InCard: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardDescription>Manage your profile settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">Personal Information</h4>
          <p className="text-sm text-muted-foreground">Update your personal details</p>
        </div>
        <Separator />
        <div>
          <h4 className="font-semibold mb-2">Account Settings</h4>
          <p className="text-sm text-muted-foreground">Manage your account preferences</p>
        </div>
        <Separator />
        <div>
          <h4 className="font-semibold mb-2">Privacy & Security</h4>
          <p className="text-sm text-muted-foreground">Control your privacy settings</p>
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

// In Navigation - from component page lines 318-334
export const InNavigation: Story = {
  render: () => (
    <nav className="flex items-center gap-2 p-4 border rounded-lg">
      <a href="#home" className="font-medium hover:text-primary">
        Home
      </a>
      <Separator orientation="vertical" className="h-4" />
      <a href="#about" className="font-medium hover:text-primary">
        About
      </a>
      <Separator orientation="vertical" className="h-4" />
      <a href="#services" className="font-medium hover:text-primary">
        Services
      </a>
      <Separator orientation="vertical" className="h-4" />
      <a href="#contact" className="font-medium hover:text-primary">
        Contact
      </a>
    </nav>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// In List - from component page lines 347-367
export const InList: Story = {
  render: () => (
    <ul className="space-y-3">
      <li className="flex items-center gap-3">
        <Home className="h-4 w-4" />
        <span>Dashboard</span>
      </li>
      <Separator />
      <li className="flex items-center gap-3">
        <Settings className="h-4 w-4" />
        <span>Settings</span>
      </li>
      <Separator />
      <li className="flex items-center gap-3">
        <User className="h-4 w-4" />
        <span>Profile</span>
      </li>
      <Separator />
      <li className="flex items-center gap-3">
        <Bell className="h-4 w-4" />
        <span>Notifications</span>
      </li>
    </ul>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// Custom Styling - from component page lines 379-399
export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-medium">Thicker Separator</p>
        <Separator className="h-1" />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Primary Color</p>
        <Separator className="bg-primary" />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Dashed Style</p>
        <Separator className="border-t border-dashed bg-transparent" />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Gradient Style</p>
        <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
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

// RTL Example - from component page lines 477-482
export const RTLExample: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4 p-4 border rounded-lg">
      <div>القسم الأول</div>
      <Separator />
      <div>القسم الثاني</div>
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Separator with Arabic text demonstrating RTL support. Automatically switches to RTL mode.'
      }
    }
  }
};

// RTL In Card
export const RTLInCard: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>ملف المستخدم</CardTitle>
        <CardDescription>إدارة إعدادات ملفك الشخصي</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">المعلومات الشخصية</h4>
          <p className="text-sm text-muted-foreground">تحديث التفاصيل الشخصية الخاصة بك</p>
        </div>
        <Separator />
        <div>
          <h4 className="font-semibold mb-2">إعدادات الحساب</h4>
          <p className="text-sm text-muted-foreground">إدارة تفضيلات حسابك</p>
        </div>
        <Separator />
        <div>
          <h4 className="font-semibold mb-2">الخصوصية والأمان</h4>
          <p className="text-sm text-muted-foreground">التحكم في إعدادات الخصوصية الخاصة بك</p>
        </div>
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Card with Arabic content and separators in RTL mode.'
      }
    }
  }
};

// RTL Navigation
export const RTLNavigation: Story = {
  render: () => (
    <nav className="flex items-center gap-2 p-4 border rounded-lg">
      <a href="#home" className="font-medium hover:text-primary">
        الرئيسية
      </a>
      <Separator orientation="vertical" className="h-4" />
      <a href="#about" className="font-medium hover:text-primary">
        عن
      </a>
      <Separator orientation="vertical" className="h-4" />
      <a href="#services" className="font-medium hover:text-primary">
        الخدمات
      </a>
      <Separator orientation="vertical" className="h-4" />
      <a href="#contact" className="font-medium hover:text-primary">
        اتصل
      </a>
    </nav>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Navigation with vertical separators in RTL mode.'
      }
    }
  }
};
