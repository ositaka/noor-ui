import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertDescription, AlertTitle } from '../../../components/ui/alert';
import { Terminal, AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react';

/**
 * Alert Component Stories
 *
 * All examples are taken from /app/(docs)/components/alert/page.tsx
 * Uses exact same text and data as the component documentation.
 */

const meta = {
  title: 'Basic/Alert',
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  render: (args) => (
    <Alert {...args} className="w-full max-w-md" />
  )
};

// Destructive - from component page lines 161-167
export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="w-full max-w-md">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// Success - from component page lines 180-186
export const Success: Story = {
  render: () => (
    <Alert variant="success" className="w-full max-w-md">
      <CheckCircle2 className="h-4 w-4" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>
        Your changes have been saved successfully.
      </AlertDescription>
    </Alert>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// Warning - from component page lines 199-205
export const Warning: Story = {
  render: () => (
    <Alert variant="warning" className="w-full max-w-md">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        Your free trial will expire in 3 days.
      </AlertDescription>
    </Alert>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
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
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Destructive</AlertTitle>
        <AlertDescription>
          This is a destructive alert for errors.
        </AlertDescription>
      </Alert>

      <Alert variant="success">
        <CheckCircle2 className="h-4 w-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          This is a success alert for positive actions.
        </AlertDescription>
      </Alert>

      <Alert variant="warning">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          This is a warning alert for caution.
        </AlertDescription>
      </Alert>
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

// RTL Example - from component page lines 273-279
export const RTLExample: Story = {
  render: () => (
    <Alert className="w-full max-w-md">
      <Terminal className="h-4 w-4" />
      <AlertTitle>تحديث النظام</AlertTitle>
      <AlertDescription>
        تحديث نظام جديد متاح.
      </AlertDescription>
    </Alert>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Alert with Arabic text demonstrating RTL support. Icon aligns correctly to the start. Automatically switches to RTL mode.'
      }
    }
  }
};

// RTL Destructive
export const RTLDestructive: Story = {
  render: () => (
    <Alert variant="destructive" className="w-full max-w-md">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>خطأ</AlertTitle>
      <AlertDescription>
        انتهت صلاحية جلستك. يرجى تسجيل الدخول مرة أخرى.
      </AlertDescription>
    </Alert>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Destructive alert with Arabic text in RTL mode.'
      }
    }
  }
};

// RTL Success
export const RTLSuccess: Story = {
  render: () => (
    <Alert variant="success" className="w-full max-w-md">
      <CheckCircle2 className="h-4 w-4" />
      <AlertTitle>نجاح</AlertTitle>
      <AlertDescription>
        تم حفظ تغييراتك بنجاح.
      </AlertDescription>
    </Alert>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Success alert with Arabic text in RTL mode.'
      }
    }
  }
};

// RTL Warning
export const RTLWarning: Story = {
  render: () => (
    <Alert variant="warning" className="w-full max-w-md">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>تحذير</AlertTitle>
      <AlertDescription>
        ستنتهي صلاحية فترتك التجريبية المجانية خلال ٣ أيام.
      </AlertDescription>
    </Alert>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Warning alert with Arabic text in RTL mode.'
      }
    }
  }
};

// RTL All Variants
export const RTLAllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>انتبه!</AlertTitle>
        <AlertDescription>
          يمكنك إضافة المكونات إلى تطبيقك باستخدام سطر الأوامر.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>خطأ</AlertTitle>
        <AlertDescription>
          انتهت صلاحية جلستك. يرجى تسجيل الدخول مرة أخرى.
        </AlertDescription>
      </Alert>

      <Alert variant="success">
        <CheckCircle2 className="h-4 w-4" />
        <AlertTitle>نجاح</AlertTitle>
        <AlertDescription>
          تم حفظ تغييراتك بنجاح.
        </AlertDescription>
      </Alert>

      <Alert variant="warning">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>تحذير</AlertTitle>
        <AlertDescription>
          ستنتهي صلاحية فترتك التجريبية المجانية خلال ٣ أيام.
        </AlertDescription>
      </Alert>
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
        story: 'All alert variants with Arabic text demonstrating complete RTL support.'
      }
    }
  }
};
