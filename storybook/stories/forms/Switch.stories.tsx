import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
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
  tags: ['!autodocs'],
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
    id: 'default',
    onCheckedChange: fn()
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
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('Renders correctly', async () => {
      const switchElement = canvas.getByRole('switch');
      await expect(switchElement).toBeInTheDocument();
      await expect(switchElement).toBeVisible();
      await expect(switchElement).toHaveAccessibleName('Airplane Mode');
      await expect(switchElement).not.toBeChecked();
    });

    await step('Handles click interaction', async () => {
      const switchElement = canvas.getByRole('switch');
      await userEvent.click(switchElement);
      await expect(args.onCheckedChange).toHaveBeenCalledTimes(1);
      await expect(args.onCheckedChange).toHaveBeenCalledWith(true);
    });

    await step('Keyboard accessible', async () => {
      const switchElement = canvas.getByRole('switch');
      await userEvent.tab();
      await expect(switchElement).toHaveFocus();

      // Toggle with Space key
      await userEvent.keyboard(' ');
      await expect(args.onCheckedChange).toHaveBeenCalledTimes(2);
    });
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
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders multiple switches with labels', async () => {
      const switches = canvas.getAllByRole('switch');
      await expect(switches).toHaveLength(3);
      await expect(canvas.getByLabelText('Enable notifications')).toBeInTheDocument();
      await expect(canvas.getByLabelText('Dark mode')).toBeInTheDocument();
      await expect(canvas.getByLabelText('Auto-play videos')).toBeInTheDocument();
    });

    await step('Default checked state is respected', async () => {
      await expect(canvas.getByLabelText('Dark mode')).toBeChecked();
      await expect(canvas.getByLabelText('Enable notifications')).not.toBeChecked();
    });

    await step('Switch can be toggled', async () => {
      const notificationSwitch = canvas.getByLabelText('Enable notifications');
      await userEvent.click(notificationSwitch);
      await expect(notificationSwitch).toBeChecked();
    });
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
      description: {
        story: 'Switch used in a settings panel with descriptions. Perfect for preference screens.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders settings panel layout', async () => {
      await expect(canvas.getByLabelText('Marketing emails')).toBeInTheDocument();
      await expect(canvas.getByLabelText('Security emails')).toBeInTheDocument();
      await expect(canvas.getByLabelText('Product updates')).toBeInTheDocument();
      await expect(canvas.getByText('Receive emails about new products and features')).toBeInTheDocument();
    });

    await step('Switches are accessible and functional', async () => {
      const securitySwitch = canvas.getByLabelText('Security emails');
      await expect(securitySwitch).toBeChecked();

      const marketingSwitch = canvas.getByLabelText('Marketing emails');
      await userEvent.click(marketingSwitch);
      await expect(marketingSwitch).toBeChecked();
    });
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
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verifies disabled states', async () => {
      const enabledSwitch = canvas.getByLabelText('Enabled switch');
      const disabledSwitch = canvas.getByLabelText('Disabled switch (off)');
      const disabledOnSwitch = canvas.getByLabelText('Disabled switch (on)');

      await expect(enabledSwitch).not.toBeDisabled();
      await expect(disabledSwitch).toBeDisabled();
      await expect(disabledOnSwitch).toBeDisabled();
      await expect(disabledOnSwitch).toBeChecked();
    });
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
      description: {
        story: 'Controlled switch with external state management. The state can be toggled programmatically.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Initial state is off', async () => {
      const switchElement = canvas.getByRole('switch');
      await expect(switchElement).not.toBeChecked();
      await expect(canvas.getByText('Status: Off')).toBeInTheDocument();
    });

    await step('Clicking switch updates state', async () => {
      const switchElement = canvas.getByRole('switch');
      await userEvent.click(switchElement);
      await expect(switchElement).toBeChecked();
      await expect(canvas.getByText('Status: On')).toBeInTheDocument();
    });

    await step('External toggle button works', async () => {
      const toggleButton = canvas.getByRole('button', { name: 'Toggle' });
      await userEvent.click(toggleButton);
      await expect(canvas.getByRole('switch')).not.toBeChecked();
      await expect(canvas.getByText('Status: Off')).toBeInTheDocument();

      await userEvent.click(toggleButton);
      await expect(canvas.getByRole('switch')).toBeChecked();
      await expect(canvas.getByText('Status: On')).toBeInTheDocument();
    });
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
      description: {
        story: 'Switch in a form with the name attribute for form submission.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders form with switches', async () => {
      await expect(canvas.getByRole('heading', { name: 'Privacy Settings' })).toBeInTheDocument();
      await expect(canvas.getByLabelText('Make profile public')).toBeInTheDocument();
      await expect(canvas.getByLabelText('Show email address')).toBeInTheDocument();
      await expect(canvas.getByLabelText('Allow direct messages')).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: 'Save Settings' })).toBeInTheDocument();
    });

    await step('Switches have name attributes for form submission', async () => {
      const profileSwitch = canvas.getByLabelText('Make profile public');
      const emailSwitch = canvas.getByLabelText('Show email address');
      const messagesSwitch = canvas.getByLabelText('Allow direct messages');

      await expect(profileSwitch).toHaveAttribute('name', 'profilePublic');
      await expect(emailSwitch).toHaveAttribute('name', 'showEmail');
      await expect(messagesSwitch).toHaveAttribute('name', 'allowMessages');
    });

    await step('Switches can be toggled within form', async () => {
      const profileSwitch = canvas.getByLabelText('Make profile public');
      await expect(profileSwitch).not.toBeChecked();
      await userEvent.click(profileSwitch);
      await expect(profileSwitch).toBeChecked();
    });
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
      description: {
        story: 'Switch with Arabic labels demonstrating RTL support. The switch thumb animation automatically adapts for RTL direction.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders in RTL context', async () => {
      const switches = canvas.getAllByRole('switch');
      await expect(switches).toHaveLength(3);
      await expect(canvas.getByLabelText('تفعيل الإشعارات')).toBeInTheDocument();
      await expect(canvas.getByLabelText('الوضع الداكن')).toBeChecked();
    });

    await step('Interaction works in RTL', async () => {
      const notificationSwitch = canvas.getByLabelText('تفعيل الإشعارات');
      await userEvent.click(notificationSwitch);
      await expect(notificationSwitch).toBeChecked();
    });
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
      description: {
        story: 'Complete form with switches in Arabic, demonstrating RTL support in form contexts.'
      }
    }
  }
};
