import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioGroupItem } from '../../../components/ui/radio-group';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';
import * as React from 'react';

/**
 * Radio Group Component Stories
 *
 * All examples are taken from /app/(docs)/components/radio-group/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Radio Group allows selecting one option from a group of mutually exclusive options
 */

const meta = {
  title: 'Forms/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered'
  },
  tags: ['!autodocs'],
  argTypes: {
    onValueChange: {
      control: false
    }
  }
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls (hidden from stories list to avoid ID conflicts)
export const Default: Story = {
  args: {
    defaultValue: 'option1'
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  render: (args) => (
    <RadioGroup {...args}>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option1" id="default-option1" />
        <Label htmlFor="default-option1">Option 1</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option2" id="default-option2" />
        <Label htmlFor="default-option2">Option 2</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option3" id="default-option3" />
        <Label htmlFor="default-option3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      story: {
        inline: false
      }
    }
  }
};

// Vertical Layout - from component page lines 329-342
export const VerticalLayout: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="default" id="default" />
        <Label htmlFor="default">Default</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="comfortable" id="comfortable" />
        <Label htmlFor="comfortable">Comfortable</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="compact" id="compact" />
        <Label htmlFor="compact">Compact</Label>
      </div>
    </RadioGroup>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// Horizontal Layout - from component page lines 355-368
export const HorizontalLayout: Story = {
  render: () => (
    <RadioGroup defaultValue="card" className="flex gap-4">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="card" id="card" />
        <Label htmlFor="card">Card</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="paypal" id="paypal" />
        <Label htmlFor="paypal">PayPal</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="apple" id="apple" />
        <Label htmlFor="apple">Apple Pay</Label>
      </div>
    </RadioGroup>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// With Description - from component page lines 381-411
export const WithDescription: Story = {
  render: () => (
    <RadioGroup defaultValue="starter" className="w-80">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="starter" id="starter" />
          <Label htmlFor="starter">Starter Plan</Label>
        </div>
        <p className="text-sm text-muted-foreground ps-6">
          Perfect for individuals. $9/month.
        </p>
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="pro" id="pro" />
          <Label htmlFor="pro">Pro Plan</Label>
        </div>
        <p className="text-sm text-muted-foreground ps-6">
          For small teams. $29/month.
        </p>
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="enterprise" id="enterprise" />
          <Label htmlFor="enterprise">Enterprise Plan</Label>
        </div>
        <p className="text-sm text-muted-foreground ps-6">
          Custom solutions. Contact sales.
        </p>
      </div>
    </RadioGroup>
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
        story: 'Radio group with descriptive text under each option. Useful for plans, pricing tiers, or options that need additional context.'
      }
    }
  }
};

// Disabled Options - from component page lines 424-437
export const DisabledOptions: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option1" id="r1" />
        <Label htmlFor="r1">Enabled option</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option2" id="r2" disabled />
        <Label htmlFor="r2">Disabled option</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option3" id="r3" />
        <Label htmlFor="r3">Another enabled option</Label>
      </div>
    </RadioGroup>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// Controlled - from component page lines 451-474
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('option1');

    return (
      <div className="space-y-4">
        <RadioGroup value={value} onValueChange={setValue}>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option1" id="c1" />
            <Label htmlFor="c1">Option 1</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option2" id="c2" />
            <Label htmlFor="c2">Option 2</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option3" id="c3" />
            <Label htmlFor="c3">Option 3</Label>
          </div>
        </RadioGroup>
        <p className="text-sm text-muted-foreground">Selected: {value}</p>
        <div className="flex gap-2">
          <Button size="sm" onClick={() => setValue('option1')}>
            Select Option 1
          </Button>
          <Button size="sm" onClick={() => setValue('option2')}>
            Select Option 2
          </Button>
        </div>
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
        story: 'Controlled radio group with external state management. The selection can be changed programmatically via buttons.'
      }
    }
  }
};

// In Form - from component page lines 494-510
export const InForm: Story = {
  render: () => (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        alert('Form submitted!');
      }}
    >
      <div className="space-y-3">
        <Label className="text-base font-semibold">Select your plan</Label>
        <RadioGroup defaultValue="pro" name="plan">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="free" id="free" />
            <Label htmlFor="free">Free</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="form-pro" id="form-pro" />
            <Label htmlFor="form-pro">Pro</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="form-enterprise" id="form-enterprise" />
            <Label htmlFor="form-enterprise">Enterprise</Label>
          </div>
        </RadioGroup>
      </div>
      <Button type="submit">Continue</Button>
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
        story: 'Radio group in a form with the name attribute for form submission.'
      }
    }
  }
};

// RTL Example
export const RTLExample: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option1" id="rtl1" />
        <Label htmlFor="rtl1">الخيار الأول</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option2" id="rtl2" />
        <Label htmlFor="rtl2">الخيار الثاني</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option3" id="rtl3" />
        <Label htmlFor="rtl3">الخيار الثالث</Label>
      </div>
    </RadioGroup>
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
        story: 'Radio group with Arabic labels demonstrating RTL support. Radio buttons and labels maintain proper spacing and alignment. Automatically switches to RTL mode.'
      }
    }
  }
};

// RTL With Description
export const RTLWithDescription: Story = {
  render: () => (
    <RadioGroup defaultValue="starter" className="w-80">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="starter" id="starter-rtl" />
          <Label htmlFor="starter-rtl">خطة البداية</Label>
        </div>
        <p className="text-sm text-muted-foreground ps-6">
          مثالية للأفراد. 9$ شهرياً.
        </p>
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="pro" id="pro-rtl" />
          <Label htmlFor="pro-rtl">الخطة الاحترافية</Label>
        </div>
        <p className="text-sm text-muted-foreground ps-6">
          للفرق الصغيرة. 29$ شهرياً.
        </p>
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="enterprise" id="enterprise-rtl" />
          <Label htmlFor="enterprise-rtl">الخطة المؤسسية</Label>
        </div>
        <p className="text-sm text-muted-foreground ps-6">
          حلول مخصصة. اتصل بالمبيعات.
        </p>
      </div>
    </RadioGroup>
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
        story: 'Plan selection with descriptions in Arabic. Uses logical properties (ps-6) which automatically adapt for RTL.'
      }
    }
  }
};

// RTL Horizontal
export const RTLHorizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="card" className="flex gap-4">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="card" id="card-rtl" />
        <Label htmlFor="card-rtl">بطاقة</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="paypal" id="paypal-rtl" />
        <Label htmlFor="paypal-rtl">PayPal</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="apple" id="apple-rtl" />
        <Label htmlFor="apple-rtl">Apple Pay</Label>
      </div>
    </RadioGroup>
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
        story: 'Horizontal radio group layout in RTL mode. The flex layout naturally adapts to RTL.'
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
      <div className="space-y-3">
        <Label className="text-base font-semibold">اختر خطتك</Label>
        <RadioGroup defaultValue="pro" name="plan">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="free" id="free-rtl" />
            <Label htmlFor="free-rtl">مجاني</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="pro-rtl-form" id="pro-rtl-form" />
            <Label htmlFor="pro-rtl-form">احترافي</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="enterprise-rtl-form" id="enterprise-rtl-form" />
            <Label htmlFor="enterprise-rtl-form">مؤسسي</Label>
          </div>
        </RadioGroup>
      </div>
      <Button type="submit">متابعة</Button>
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
        story: 'Complete form with radio group in Arabic, demonstrating RTL support in form contexts.'
      }
    }
  }
};
