import type { Meta, StoryObj } from '@storybook/react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';
import * as React from 'react';

/**
 * Select Component Stories
 *
 * All examples are taken from /app/(docs)/components/select/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Select supports dropdown selection from a list of options with grouped options and keyboard navigation
 */

const meta = {
  title: 'Forms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onValueChange: {
      control: false,
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls (hidden from stories list to avoid ID conflicts)
export const Default: Story = {
  args: {
    defaultValue: 'option1',
  },
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  ),
  parameters: {
    docs: {
      story: {
        inline: false,
      },
    },
  },
};

// With Label - from component page lines 305-320
export const WithLabel: Story = {
  render: () => (
    <div className="max-w-xs space-y-2">
      <Label htmlFor="country">Country</Label>
      <Select>
        <SelectTrigger className="w-[200px]" id="country">
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="us">United States</SelectItem>
          <SelectItem value="uk">United Kingdom</SelectItem>
          <SelectItem value="ca">Canada</SelectItem>
          <SelectItem value="au">Australia</SelectItem>
          <SelectItem value="de">Germany</SelectItem>
          <SelectItem value="fr">France</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: { disable: true },
  },
};

// Grouped Options - from component page lines 333-352
export const GroupedOptions: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Select timezone" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>North America</SelectLabel>
          <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
          <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
          <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
          <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Europe</SelectLabel>
          <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
          <SelectItem value="cet">Central European Time (CET)</SelectItem>
          <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Select with grouped options using SelectGroup and SelectLabel. Perfect for organizing many options into categories.',
      },
    },
  },
};

// Disabled State - from component page lines 365-390
export const DisabledState: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Select with disabled option</Label>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="available">Available option</SelectItem>
            <SelectItem value="disabled" disabled>
              Disabled option
            </SelectItem>
            <SelectItem value="another">Another option</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Disabled select</Label>
        <Select disabled>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Disabled select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: { disable: true },
  },
};

// Controlled - from component page lines 404-421
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('');

    return (
      <div className="space-y-4">
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
            <SelectItem value="grape">Grape</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          Selected: {value || 'None'}
        </p>
        <Button size="sm" onClick={() => setValue('banana')}>
          Select Banana
        </Button>
      </div>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Controlled select with external state management. The selection can be changed programmatically via a button.',
      },
    },
  },
};

// In Form - from component page lines 434-456
export const InForm: Story = {
  render: () => (
    <form
      className="max-w-xs space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        alert('Form submitted!');
      }}
    >
      <div className="space-y-2">
        <Label htmlFor="plan">Select Plan</Label>
        <Select name="plan" required>
          <SelectTrigger className="w-[200px]" id="plan">
            <SelectValue placeholder="Choose a plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="free">Free - $0/month</SelectItem>
            <SelectItem value="starter">Starter - $9/month</SelectItem>
            <SelectItem value="pro">Pro - $29/month</SelectItem>
            <SelectItem value="enterprise">Enterprise - Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Continue</Button>
    </form>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Select in a form with the name attribute for form submission.',
      },
    },
  },
};

// RTL Example
export const RTLExample: Story = {
  render: () => (
    <div className="max-w-xs space-y-2">
      <Label htmlFor="language">اللغة</Label>
      <Select>
        <SelectTrigger className="w-[200px]" id="language">
          <SelectValue placeholder="اختر خياراً" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">الخيار 1</SelectItem>
          <SelectItem value="option2">الخيار 2</SelectItem>
          <SelectItem value="option3">الخيار 3</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Select with Arabic labels demonstrating RTL support. Dropdown position, chevron icon, and check indicator adapt correctly. Automatically switches to RTL mode.',
      },
    },
  },
};

// RTL Grouped Options
export const RTLGroupedOptions: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="اختر منطقة زمنية" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>أمريكا الشمالية</SelectLabel>
          <SelectItem value="est">التوقيت الشرقي القياسي (EST)</SelectItem>
          <SelectItem value="cst">التوقيت المركزي القياسي (CST)</SelectItem>
          <SelectItem value="mst">التوقيت الجبلي القياسي (MST)</SelectItem>
          <SelectItem value="pst">التوقيت الهادئ القياسي (PST)</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>أوروبا</SelectLabel>
          <SelectItem value="gmt">توقيت غرينتش (GMT)</SelectItem>
          <SelectItem value="cet">التوقيت الأوروبي المركزي (CET)</SelectItem>
          <SelectItem value="eet">التوقيت الأوروبي الشرقي (EET)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Grouped options with Arabic text in RTL mode. SelectGroup and SelectLabel work perfectly in RTL.',
      },
    },
  },
};

// RTL Disabled
export const RTLDisabled: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>قائمة منسدلة مع خيار معطل</Label>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="اختر خياراً" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="available">خيار متاح</SelectItem>
            <SelectItem value="disabled" disabled>
              خيار معطل
            </SelectItem>
            <SelectItem value="another">خيار آخر</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>قائمة منسدلة معطلة</Label>
        <Select disabled>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="قائمة منسدلة معطلة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">الخيار 1</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Disabled select and disabled options with Arabic text in RTL mode.',
      },
    },
  },
};

// RTL Controlled
export const RTLControlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('');

    return (
      <div className="space-y-4">
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="اختر فاكهة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">تفاح</SelectItem>
            <SelectItem value="banana">موز</SelectItem>
            <SelectItem value="orange">برتقال</SelectItem>
            <SelectItem value="grape">عنب</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          المحدد: {value || 'لا شيء'}
        </p>
        <Button size="sm" onClick={() => setValue('banana')}>
          اختر موز
        </Button>
      </div>
    );
  },
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Controlled select with Arabic text demonstrating programmatic state management in RTL.',
      },
    },
  },
};

// RTL In Form
export const RTLInForm: Story = {
  render: () => (
    <form
      className="max-w-xs space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        alert('تم إرسال النموذج!');
      }}
    >
      <div className="space-y-2">
        <Label htmlFor="plan-rtl">اختر الخطة</Label>
        <Select name="plan" required>
          <SelectTrigger className="w-[200px]" id="plan-rtl">
            <SelectValue placeholder="اختر خطة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="free">مجاني - $0/شهر</SelectItem>
            <SelectItem value="starter">المبتدئ - $9/شهر</SelectItem>
            <SelectItem value="pro">المحترف - $29/شهر</SelectItem>
            <SelectItem value="enterprise">المؤسسات - مخصص</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">متابعة</Button>
    </form>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Complete form with select in Arabic, demonstrating RTL support in form contexts.',
      },
    },
  },
};
