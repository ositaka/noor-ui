import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { Alert, AlertDescription, AlertTitle } from '../../../components/ui/alert';
import { Terminal, WarningCircle, CheckCircle, Warning as WarningIcon } from '@phosphor-icons/react';

/**
 * Alert Component Stories
 *
 * All examples are taken from /app/(docs)/components/alert/page.tsx
 * Uses exact same text and data as the component documentation.
 */

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls
export const Default: Story = {
  args: {
    variant: 'default',
    children: (
      <>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </>
    )
  },
  parameters: {
    ar: {
      args: {
        children: (
          <>
            <Terminal className="h-4 w-4" />
            <AlertTitle>انتبه!</AlertTitle>
            <AlertDescription>
              يمكنك إضافة المكونات إلى تطبيقك باستخدام سطر الأوامر.
            </AlertDescription>
          </>
        )
      }
    }
  },
  render: (args) => (
    <Alert {...args} className="w-full max-w-md" />
  ),
};

// Destructive - from component page lines 161-167
export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="w-full max-w-md">
      <WarningCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders destructive variant', async () => {
      const alert = canvas.getByRole('alert');
      await expect(alert).toBeInTheDocument();
      await expect(alert).toBeVisible();
    });

    await step('Displays error content', async () => {
      await expect(canvas.getByText('Error')).toBeInTheDocument();
      await expect(canvas.getByText('Your session has expired. Please log in again.')).toBeInTheDocument();
    });
  }
};

// Success - from component page lines 180-186
export const Success: Story = {
  render: () => (
    <Alert variant="success" className="w-full max-w-md">
      <CheckCircle className="h-4 w-4" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>
        Your changes have been saved successfully.
      </AlertDescription>
    </Alert>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders success variant', async () => {
      const alert = canvas.getByRole('alert');
      await expect(alert).toBeInTheDocument();
      await expect(alert).toBeVisible();
    });

    await step('Displays success content', async () => {
      await expect(canvas.getByText('Success')).toBeInTheDocument();
      await expect(canvas.getByText('Your changes have been saved successfully.')).toBeInTheDocument();
    });
  }
};

// Warning - from component page lines 199-205
export const Warning: Story = {
  render: () => (
    <Alert variant="warning" className="w-full max-w-md">
      <WarningIcon className="h-4 w-4" />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        Your free trial will expire in 3 days.
      </AlertDescription>
    </Alert>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders warning variant', async () => {
      const alert = canvas.getByRole('alert');
      await expect(alert).toBeInTheDocument();
      await expect(alert).toBeVisible();
    });

    await step('Displays warning content', async () => {
      await expect(canvas.getByText('Warning')).toBeInTheDocument();
      await expect(canvas.getByText('Your free trial will expire in 3 days.')).toBeInTheDocument();
    });
  }
};

// Without Icon - from component page lines 218-223
export const WithoutIcon: Story = {
  render: () => (
    <Alert className="w-full max-w-md">
      <AlertTitle>Update Available</AlertTitle>
      <AlertDescription>
        A new version of the application is available.
      </AlertDescription>
    </Alert>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders without icon', async () => {
      const alert = canvas.getByRole('alert');
      await expect(alert).toBeInTheDocument();
      await expect(alert).toBeVisible();
    });

    await step('Displays content without icon', async () => {
      await expect(canvas.getByText('Update Available')).toBeInTheDocument();
      await expect(canvas.getByText('A new version of the application is available.')).toBeInTheDocument();
    });

    await step('Verifies no icon present', async () => {
      const alert = canvas.getByRole('alert');
      const svg = alert.querySelector('svg');
      await expect(svg).not.toBeInTheDocument();
    });
  }
};

// All Variants - showcase all alert types at once
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>
          This is a default alert with Terminal icon.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <WarningCircle className="h-4 w-4" />
        <AlertTitle>Destructive</AlertTitle>
        <AlertDescription>
          This is a destructive alert for errors.
        </AlertDescription>
      </Alert>

      <Alert variant="success">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          This is a success alert for positive actions.
        </AlertDescription>
      </Alert>

      <Alert variant="warning">
        <WarningIcon className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          This is a warning alert for caution.
        </AlertDescription>
      </Alert>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  }
};
