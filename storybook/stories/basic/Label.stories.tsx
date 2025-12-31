import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';

/**
 * Label Component Stories
 *
 * All examples are taken from /app/(docs)/components/label/page.tsx
 * Uses exact same text and data as the component documentation.
 */

const meta = {
  title: 'Basic/Label',
  component: Label,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls
export const Default: Story = {
  args: {
    children: 'Email Address',
    htmlFor: 'preview-input'
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  render: (args) => (
    <div className="w-full max-w-sm space-y-2">
      <Label {...args} />
      <Input id="preview-input" type="email" placeholder="name@example.com" />
    </div>
  )
};

// With Input - from component page lines 224-227
export const WithInput: Story = {
  render: () => (
    <div className="max-w-sm space-y-2">
      <Label htmlFor="username">Username</Label>
      <Input id="username" placeholder="Enter your username" />
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

// Required Field - from component page lines 240-245
export const RequiredField: Story = {
  render: () => (
    <div className="max-w-sm space-y-2">
      <Label htmlFor="required-email">
        Email Address <span className="text-destructive">*</span>
      </Label>
      <Input id="required-email" type="email" required />
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

// With Helper Text - from component page lines 258-263
export const WithHelperText: Story = {
  render: () => (
    <div className="max-w-sm space-y-2">
      <Label htmlFor="password-helper">Password</Label>
      <Input id="password-helper" type="password" />
      <p className="text-sm text-muted-foreground">
        Must be at least 8 characters long
      </p>
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

// Disabled State - from component page lines 277-283
export const DisabledState: Story = {
  render: () => (
    <div className="max-w-sm space-y-2">
      <Label htmlFor="disabled-input">Disabled Field</Label>
      <Input id="disabled-input" disabled placeholder="Can't edit this" />
      <p className="text-sm text-muted-foreground">
        Note how the label automatically becomes dimmed when the input is disabled
      </p>
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

// Horizontal Layout - from component page lines 296-309
export const HorizontalLayout: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Label htmlFor="inline-first" className="w-32 text-end">
          First Name
        </Label>
        <Input id="inline-first" className="flex-1" />
      </div>
      <div className="flex items-center gap-4">
        <Label htmlFor="inline-last" className="w-32 text-end">
          Last Name
        </Label>
        <Input id="inline-last" className="flex-1" />
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

// Complete Form - from component page lines 322-346
export const CompleteForm: Story = {
  render: () => (
    <form
      className="max-w-sm space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        alert('Form submitted!');
      }}
    >
      <div className="space-y-2">
        <Label htmlFor="first-name">First Name</Label>
        <Input id="first-name" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="last-name">Last Name</Label>
        <Input id="last-name" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="form-email">Email</Label>
        <Input id="form-email" type="email" required />
      </div>

      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// Custom Styling - from component page lines 360-373
export const CustomStyling: Story = {
  render: () => (
    <div className="max-w-sm space-y-4">
      <div className="space-y-2">
        <Label htmlFor="styled-1" className="text-lg font-bold text-primary">
          Custom Styled Label
        </Label>
        <Input id="styled-1" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="styled-2" className="text-xs uppercase tracking-wider">
          Small Uppercase Label
        </Label>
        <Input id="styled-2" />
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

// RTL Example - from component page lines 460-465 and 470-475
export const RTLExample: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-2">
      <Label htmlFor="rtl-name">الاسم الكامل</Label>
      <Input id="rtl-name" placeholder="أدخل اسمك الكامل" />
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
        story: 'Label with Arabic text demonstrating RTL support. Automatically switches to RTL mode.'
      }
    }
  }
};

// RTL With Helper Text
export const RTLWithHelperText: Story = {
  render: () => (
    <div className="max-w-sm space-y-2">
      <Label htmlFor="password-ar">كلمة المرور</Label>
      <Input id="password-ar" type="password" />
      <p className="text-sm text-muted-foreground">
        يجب أن تكون 8 أحرف على الأقل
      </p>
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
        story: 'Password field with Arabic label and helper text in RTL mode.'
      }
    }
  }
};

// RTL Form
export const RTLForm: Story = {
  render: () => (
    <form
      className="max-w-sm space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        alert('تم إرسال النموذج!');
      }}
    >
      <div className="space-y-2">
        <Label htmlFor="first-name-ar">الاسم الأول</Label>
        <Input id="first-name-ar" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="last-name-ar">الاسم الأخير</Label>
        <Input id="last-name-ar" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email-ar">البريد الإلكتروني</Label>
        <Input id="email-ar" type="email" required />
      </div>

      <Button type="submit" className="w-full">
        إرسال
      </Button>
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
        story: 'Complete form with Arabic labels in RTL mode.'
      }
    }
  }
};
