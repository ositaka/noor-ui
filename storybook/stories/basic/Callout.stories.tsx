import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { Callout } from '../../../components/ui/callout';
import { Lightbulb } from '@phosphor-icons/react';

const meta = {
  title: 'Feedback/Callout',
  component: Callout,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: false,
      description: 'Custom icon component (IconComponent) - not controllable via UI'
    }
  }
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls
export const Default: Story = {
  args: {
    type: 'info',
    title: 'Information',
    children: 'This is an informational callout with helpful details.'
  },
  parameters: {
    ar: {
      args: {
        title: 'معلومات',
        children: 'هذا صندوق تنبيه معلوماتي يحتوي على تفاصيل مفيدة.'
      }
    }
  },
  render: (args, { globals }) => {
    return (
    <div className="w-full max-w-2xl">
      <Callout {...args} />
    </div>
    );
  },
};

// Info - from component page lines 77-79
export const Info: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Callout type="info" title="Information">
        This is an informational callout with helpful details.
      </Callout>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders info callout with content', async () => {
      await expect(canvas.getByRole('note')).toBeInTheDocument();
      await expect(canvas.getByText('Information')).toBeInTheDocument();
      await expect(canvas.getByText(/This is an informational callout/i)).toBeInTheDocument();
    });
  }
};

// Warning - from component page lines 81-83
export const Warning: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Callout type="warning" title="Warning">
        Be careful! This action may have consequences.
      </Callout>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders warning callout with content', async () => {
      await expect(canvas.getByRole('note')).toBeInTheDocument();
      await expect(canvas.getByText('Warning')).toBeInTheDocument();
      await expect(canvas.getByText(/Be careful! This action may have consequences/i)).toBeInTheDocument();
    });
  }
};

// Error - from component page lines 85-87
export const Error: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Callout type="error" title="Error">
        Something went wrong. Please try again.
      </Callout>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders error callout with content', async () => {
      await expect(canvas.getByRole('note')).toBeInTheDocument();
      await expect(canvas.getByText('Error')).toBeInTheDocument();
      await expect(canvas.getByText(/Something went wrong. Please try again/i)).toBeInTheDocument();
    });
  }
};

// Success - from component page lines 89-91
export const Success: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Callout type="success" title="Success">
        Your changes have been saved successfully!
      </Callout>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders success callout with content', async () => {
      await expect(canvas.getByRole('note')).toBeInTheDocument();
      await expect(canvas.getByText('Success')).toBeInTheDocument();
      await expect(canvas.getByText(/Your changes have been saved successfully/i)).toBeInTheDocument();
    });
  }
};

// Note - from component page lines 93-95
export const Note: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Callout type="note">
        Quick note without a title.
      </Callout>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders note callout without title', async () => {
      await expect(canvas.getByRole('note')).toBeInTheDocument();
      await expect(canvas.getByText(/Quick note without a title/i)).toBeInTheDocument();
    });
  }
};

// With Custom Icon
export const WithCustomIcon: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Callout type="info" title="Pro Tip" icon={Lightbulb}>
        Use keyboard shortcuts to speed up your workflow!
      </Callout>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Callout with a custom icon. You can pass any Phosphor icon via the icon prop.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders callout with custom icon', async () => {
      await expect(canvas.getByRole('note')).toBeInTheDocument();
      await expect(canvas.getByText('Pro Tip')).toBeInTheDocument();
      await expect(canvas.getByText(/Use keyboard shortcuts to speed up your workflow/i)).toBeInTheDocument();
    });

    await step('Custom icon is present', async () => {
      const callout = canvas.getByRole('note');
      const icon = callout.querySelector('svg');
      await expect(icon).toBeInTheDocument();
    });
  }
};

// All Types - showcase all callout types at once
export const AllTypes: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-2xl">
      <Callout type="info" title="Information">
        This is an informational callout with helpful details.
      </Callout>

      <Callout type="warning" title="Warning">
        Be careful! This action may have consequences.
      </Callout>

      <Callout type="error" title="Error">
        Something went wrong. Please try again.
      </Callout>

      <Callout type="success" title="Success">
        Your changes have been saved successfully!
      </Callout>

      <Callout type="note">
        Quick note without a title.
      </Callout>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  }
};
