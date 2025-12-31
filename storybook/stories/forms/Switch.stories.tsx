import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../../../components/ui/switch';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';
import { Separator } from '../../../components/ui/separator';
import * as React from 'react';

/**
 * Switch Component Stories
 *
 * All examples are taken from /app/(docs)/components/switch/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Switch is a toggle control for binary states, perfect for settings and preferences
 */

const meta = {
  title: 'Forms/Switch',
  component: Switch,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    onCheckedChange: {
      control: false
    }
  }
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls (hidden from stories list to avoid ID conflicts)
export const Default: Story = {
  args: {
    id: 'default'
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch {...args} />
      <Label htmlFor="default">Airplane Mode</Label>
    </div>
  ),
  parameters: {
    docs: {
      story: {
        inline: false
      }
    }
  }
};

// With Label - from component page lines 250-269
export const WithLabel: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Switch id="notifications" />
        <Label htmlFor="notifications">Enable notifications</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="dark-mode" defaultChecked />
        <Label htmlFor="dark-mode">Dark mode</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="auto-play" />
        <Label htmlFor="auto-play">Auto-play videos</Label>
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

// Settings Panel - from component page lines 271-316
export const SettingsPanel: Story = {
  render: () => (
    <div className="w-[500px] space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="marketing">Marketing emails</Label>
          <p className="text-sm text-muted-foreground">
            Receive emails about new products and features
          </p>
        </div>
        <Switch id="marketing" />
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="security">Security emails</Label>
          <p className="text-sm text-muted-foreground">
            Receive emails about your account security
          </p>
        </div>
        <Switch id="security" defaultChecked />
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="updates">Product updates</Label>
          <p className="text-sm text-muted-foreground">
            Receive emails about product updates and announcements
          </p>
        </div>
        <Switch id="updates" />
      </div>
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Switch used in a settings panel with descriptions. Perfect for preference screens.'
      }
    }
  }
};

// Disabled State - from component page lines 318-340
export const DisabledState: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Switch id="enabled" defaultChecked />
        <Label htmlFor="enabled">Enabled switch</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="disabled" disabled />
        <Label htmlFor="disabled">Disabled switch (off)</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="disabled-on" disabled defaultChecked />
        <Label htmlFor="disabled-on">Disabled switch (on)</Label>
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

// Controlled - from component page lines 342-364
export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Switch
            id="controlled"
            checked={checked}
            onCheckedChange={setChecked}
          />
          <Label htmlFor="controlled">Enable notifications</Label>
        </div>
        <p className="text-sm text-muted-foreground">
          Status: {checked ? 'On' : 'Off'}
        </p>
        <Button size="sm" onClick={() => setChecked(!checked)}>
          Toggle
        </Button>
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
      disable: true,
      description: {
        story: 'Controlled switch with external state management. The state can be toggled programmatically.'
      }
    }
  }
};

// In Form - from component page lines 366-404
export const InForm: Story = {
  render: () => (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        alert('Form submitted!');
      }}
    >
      <div className="space-y-4">
        <h3 className="text-base font-semibold">Privacy Settings</h3>

        <div className="flex items-center gap-2">
          <Switch id="profile-public" name="profilePublic" />
          <Label htmlFor="profile-public">Make profile public</Label>
        </div>

        <div className="flex items-center gap-2">
          <Switch id="show-email" name="showEmail" />
          <Label htmlFor="show-email">Show email address</Label>
        </div>

        <div className="flex items-center gap-2">
          <Switch id="allow-messages" name="allowMessages" defaultChecked />
          <Label htmlFor="allow-messages">Allow direct messages</Label>
        </div>
      </div>

      <Button type="submit">Save Settings</Button>
    </form>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Switch in a form with the name attribute for form submission.'
      }
    }
  }
};

// RTL Example
export const RTLExample: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Switch id="rtl-notifications" />
        <Label htmlFor="rtl-notifications">تفعيل الإشعارات</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="rtl-dark-mode" defaultChecked />
        <Label htmlFor="rtl-dark-mode">الوضع الداكن</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="rtl-auto-play" />
        <Label htmlFor="rtl-auto-play">التشغيل التلقائي للفيديو</Label>
      </div>
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Switch with Arabic labels demonstrating RTL support. The switch thumb animation automatically adapts for RTL direction.'
      }
    }
  }
};

// RTL Settings Panel
export const RTLSettingsPanel: Story = {
  render: () => (
    <div className="w-[500px] space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="marketing-rtl">رسائل التسويق</Label>
          <p className="text-sm text-muted-foreground">
            تلقي رسائل البريد الإلكتروني حول المنتجات والميزات الجديدة
          </p>
        </div>
        <Switch id="marketing-rtl" />
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="security-rtl">رسائل الأمان</Label>
          <p className="text-sm text-muted-foreground">
            تلقي رسائل البريد الإلكتروني حول أمان حسابك
          </p>
        </div>
        <Switch id="security-rtl" defaultChecked />
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="updates-rtl">تحديثات المنتج</Label>
          <p className="text-sm text-muted-foreground">
            تلقي رسائل البريد الإلكتروني حول تحديثات المنتج والإعلانات
          </p>
        </div>
        <Switch id="updates-rtl" />
      </div>
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Settings panel with Arabic text in RTL mode. The justify-between layout naturally adapts to RTL.'
      }
    }
  }
};

// RTL Disabled
export const RTLDisabled: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Switch id="enabled-rtl" defaultChecked />
        <Label htmlFor="enabled-rtl">مفتاح مفعّل</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="disabled-rtl" disabled />
        <Label htmlFor="disabled-rtl">مفتاح معطّل (إيقاف)</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="disabled-on-rtl" disabled defaultChecked />
        <Label htmlFor="disabled-on-rtl">مفتاح معطّل (تشغيل)</Label>
      </div>
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Disabled switches with Arabic text in RTL mode.'
      }
    }
  }
};

// RTL Controlled
export const RTLControlled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Switch
            id="controlled-rtl"
            checked={checked}
            onCheckedChange={setChecked}
          />
          <Label htmlFor="controlled-rtl">تفعيل الإشعارات</Label>
        </div>
        <p className="text-sm text-muted-foreground">
          الحالة: {checked ? 'مفعّل' : 'معطّل'}
        </p>
        <Button size="sm" onClick={() => setChecked(!checked)}>
          تبديل
        </Button>
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
      disable: true,
      description: {
        story: 'Controlled switch with Arabic text demonstrating programmatic state management in RTL.'
      }
    }
  }
};

// RTL In Form
export const RTLInForm: Story = {
  render: () => (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        alert('تم إرسال النموذج!');
      }}
    >
      <div className="space-y-4">
        <h3 className="text-base font-semibold">إعدادات الخصوصية</h3>

        <div className="flex items-center gap-2">
          <Switch id="profile-public-rtl" name="profilePublic" />
          <Label htmlFor="profile-public-rtl">جعل الملف الشخصي عامًا</Label>
        </div>

        <div className="flex items-center gap-2">
          <Switch id="show-email-rtl" name="showEmail" />
          <Label htmlFor="show-email-rtl">إظهار عنوان البريد الإلكتروني</Label>
        </div>

        <div className="flex items-center gap-2">
          <Switch id="allow-messages-rtl" name="allowMessages" defaultChecked />
          <Label htmlFor="allow-messages-rtl">السماح بالرسائل المباشرة</Label>
        </div>
      </div>

      <Button type="submit">حفظ الإعدادات</Button>
    </form>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Complete form with switches in Arabic, demonstrating RTL support in form contexts.'
      }
    }
  }
};
