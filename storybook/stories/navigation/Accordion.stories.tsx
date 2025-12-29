import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../../components/ui/accordion';
import { Card, CardContent } from '../../../components/ui/card';
import { User, CreditCard, Calendar } from 'lucide-react';
import * as React from 'react';

/**
 * Accordion Component Stories
 *
 * All examples are taken from /app/(docs)/components/accordion/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Accordion is a vertically stacked set of interactive headings
 * that each reveal a section of content. Built on Radix UI with full RTL support.
 */

const meta = {
  title: 'Navigation/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['single', 'multiple'],
    },
    collapsible: {
      control: { type: 'boolean' },
    },
    defaultValue: {
      control: false,
    },
    value: {
      control: false,
    },
    onValueChange: {
      control: false,
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls (hidden from stories list to avoid ID conflicts)
export const Default: Story = {
  args: {
    type: 'single',
    collapsible: true,
  },
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  render: (args) => (
    <Accordion {...args} className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that you can customize.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It uses CSS animations for smooth transitions.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    docs: {
      story: {
        inline: false,
      },
    },
  },
};

// Basic FAQ - from component page lines 199-218
export const BasicFAQ: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that you can customize.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It uses CSS animations for smooth transitions.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
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
        story: 'Basic FAQ accordion with single item open at a time. Click to expand, click again to collapse.',
      },
    },
  },
};

// Multiple Items Open - from component page lines 245-264
export const MultipleOpen: Story = {
  render: () => (
    <Accordion type="multiple" defaultValue={['item-1', 'item-2']} className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>Account</AccordionTrigger>
        <AccordionContent>
          Manage your account settings and preferences.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Security</AccordionTrigger>
        <AccordionContent>
          Update your password and security settings.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Notifications</AccordionTrigger>
        <AccordionContent>
          Configure your notification preferences.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
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
        story: 'Multiple items can be open simultaneously. Account and Security are open by default.',
      },
    },
  },
};

// With Icons - from component page lines 272-307
export const WithIcons: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          Update your profile information and photo.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span>Billing</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          Manage your billing information and subscriptions.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Schedule</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          View and manage your scheduled events.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
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
        story: 'Accordion with icons for visual clarity. Icons are placed before the text.',
      },
    },
  },
};

// Controlled State
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>('item-1');

    return (
      <div className="space-y-4 w-full max-w-md">
        <p className="text-sm text-muted-foreground">Active item: {value || 'none'}</p>
        <Accordion type="single" value={value} onValueChange={setValue}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Account</AccordionTrigger>
            <AccordionContent>
              Manage your account settings and preferences.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Security</AccordionTrigger>
            <AccordionContent>
              Update your password and security settings.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Notifications</AccordionTrigger>
            <AccordionContent>
              Configure your notification preferences.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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
        story: 'Controlled accordion with external state management. Shows active item value above.',
      },
    },
  },
};

// In Card
export const InCard: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardContent className="p-6">
        <h3 className="font-semibold mb-4">Frequently Asked Questions</h3>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that you can customize.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It uses CSS animations for smooth transitions.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
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
        story: 'Accordion placed inside a card component with a title.',
      },
    },
  },
};

// RTL Example - Basic FAQ
export const RTLExample: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>هل يمكن الوصول إليه؟</AccordionTrigger>
        <AccordionContent>
          نعم. يلتزم بنمط تصميم WAI-ARIA.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>هل له أنماط؟</AccordionTrigger>
        <AccordionContent>
          نعم. يأتي مع أنماط افتراضية يمكنك تخصيصها.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>هل هو متحرك؟</AccordionTrigger>
        <AccordionContent>
          نعم. يستخدم حركات CSS للانتقالات السلسة.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
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
        story: 'Basic FAQ accordion with Arabic text in RTL mode. Chevron positions correctly on the start side.',
      },
    },
  },
};

// RTL Multiple Open
export const RTLMultipleOpen: Story = {
  render: () => (
    <Accordion type="multiple" defaultValue={['item-1', 'item-2']} className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>الحساب</AccordionTrigger>
        <AccordionContent>
          إدارة إعدادات وتفضيلات حسابك.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>الأمان</AccordionTrigger>
        <AccordionContent>
          تحديث كلمة المرور وإعدادات الأمان.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>الإشعارات</AccordionTrigger>
        <AccordionContent>
          تكوين تفضيلات الإشعارات الخاصة بك.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
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
        story: 'Multiple items open in RTL mode with Arabic labels. Layout adapts automatically.',
      },
    },
  },
};

// RTL With Icons
export const RTLWithIcons: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>الملف الشخصي</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          تحديث معلومات ملفك الشخصي وصورتك.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span>الفواتير</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          إدارة معلومات الفواتير والاشتراكات الخاصة بك.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>الجدول</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          عرض وإدارة الأحداث المجدولة الخاصة بك.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
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
        story: 'Accordion with icons in RTL mode. Icons and text flow correctly right-to-left.',
      },
    },
  },
};

// RTL Controlled
export const RTLControlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>('item-1');

    return (
      <div className="space-y-4 w-full max-w-md">
        <p className="text-sm text-muted-foreground">العنصر النشط: {value || 'لا شيء'}</p>
        <Accordion type="single" value={value} onValueChange={setValue}>
          <AccordionItem value="item-1">
            <AccordionTrigger>الحساب</AccordionTrigger>
            <AccordionContent>
              إدارة إعدادات وتفضيلات حسابك.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>الأمان</AccordionTrigger>
            <AccordionContent>
              تحديث كلمة المرور وإعدادات الأمان.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>الإشعارات</AccordionTrigger>
            <AccordionContent>
              تكوين تفضيلات الإشعارات الخاصة بك.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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
        story: 'Controlled accordion in RTL with Arabic text. State management works the same in both directions.',
      },
    },
  },
};
