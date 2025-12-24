import type { Meta, StoryObj } from '@storybook/react';
import { Callout } from '../../../components/ui/callout';
import { Lightbulb } from 'lucide-react';

/**
 * Callout Component Stories
 *
 * All examples are taken from /app/(docs)/components/callout/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Callout supports 5 types: info, warning, error, success, note
 */

const meta = {
  title: 'Basic/Callout',
  component: Callout,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: false,
      description: 'Custom icon component (LucideIcon) - not controllable via UI',
    },
  },
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls
export const Default: Story = {
  args: {
    type: 'info',
    title: 'Information',
    children: 'This is an informational callout with helpful details.',
  },
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  render: (args) => (
    <div className="w-full max-w-2xl">
      <Callout {...args} />
    </div>
  ),
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
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Callout with a custom icon. You can pass any Lucide icon via the icon prop.',
      },
    },
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
  },
};

// RTL Info
export const RTLInfo: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Callout type="info" title="معلومات">
        هذا صندوق تنبيه معلوماتي يحتوي على تفاصيل مفيدة.
      </Callout>
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Info callout with Arabic text demonstrating RTL support. Border aligns to the start (right in RTL). Automatically switches to RTL mode.',
      },
    },
  },
};

// RTL Warning
export const RTLWarning: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Callout type="warning" title="تحذير">
        كن حذرًا! قد يكون لهذا الإجراء عواقب.
      </Callout>
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Warning callout with Arabic text in RTL mode.',
      },
    },
  },
};

// RTL Error
export const RTLError: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Callout type="error" title="خطأ">
        حدث خطأ ما. يرجى المحاولة مرة أخرى.
      </Callout>
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Error callout with Arabic text in RTL mode.',
      },
    },
  },
};

// RTL Success
export const RTLSuccess: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Callout type="success" title="نجاح">
        تم حفظ التغييرات بنجاح!
      </Callout>
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Success callout with Arabic text in RTL mode.',
      },
    },
  },
};

// RTL Note
export const RTLNote: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Callout type="note">
        ملاحظة سريعة بدون عنوان.
      </Callout>
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Note callout without title in RTL mode.',
      },
    },
  },
};

// RTL All Types
export const RTLAllTypes: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-2xl">
      <Callout type="info" title="معلومات">
        هذا صندوق تنبيه معلوماتي يحتوي على تفاصيل مفيدة.
      </Callout>

      <Callout type="warning" title="تحذير">
        كن حذرًا! قد يكون لهذا الإجراء عواقب.
      </Callout>

      <Callout type="error" title="خطأ">
        حدث خطأ ما. يرجى المحاولة مرة أخرى.
      </Callout>

      <Callout type="success" title="نجاح">
        تم حفظ التغييرات بنجاح!
      </Callout>

      <Callout type="note">
        ملاحظة سريعة بدون عنوان.
      </Callout>
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'All callout types with Arabic text demonstrating complete RTL support.',
      },
    },
  },
};
