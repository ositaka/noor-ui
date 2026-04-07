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
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch {...args} />
      <Label htmlFor="default">Airplane Mode</Label>
    </div>
  ),
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
      // Radix UI Switch stores the name attribute on a hidden input element, not on the visible button
      const form = canvasElement.querySelector('form')!;
      const profileInput = form.querySelector('input[name="profilePublic"]');
      const emailInput = form.querySelector('input[name="showEmail"]');
      const messagesInput = form.querySelector('input[name="allowMessages"]');

      await expect(profileInput).toBeInTheDocument();
      await expect(emailInput).toBeInTheDocument();
      await expect(messagesInput).toBeInTheDocument();
    });

    await step('Switches can be toggled within form', async () => {
      const profileSwitch = canvas.getByLabelText('Make profile public');
      await expect(profileSwitch).not.toBeChecked();
      await userEvent.click(profileSwitch);
      await expect(profileSwitch).toBeChecked();
    });
  }
};

