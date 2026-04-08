import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Switch } from '../../../components/ui/switch';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';
import { Separator } from '../../../components/ui/separator';
import * as React from 'react';

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
    id: 'default',
    onCheckedChange: fn()
  },
  render: (args, { globals }) => {
    const isRTL = globals?.direction === 'rtl';
    const t = (en: string, ar: string) => isRTL ? ar : en;

    return (
    <div className="flex items-center gap-2">
      <Switch {...args} />
      <Label htmlFor="default">{t('Airplane Mode', 'وضع الطيران')}</Label>
    </div>
    );
  },
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
  parameters: {
    controls: { disable: true },
    docs: {
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
  parameters: {
    controls: { disable: true },
    docs: {
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Switch in a form with the name attribute for form submission.'
      }
    }
  }
};

