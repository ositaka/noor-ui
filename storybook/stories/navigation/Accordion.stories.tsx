import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../../components/ui/accordion';
import { Card, CardContent } from '../../../components/ui/card';
import { User, CreditCard, Calendar } from '@phosphor-icons/react';
import * as React from 'react';

/**
 *
 *
 * that each reveal a section of content. Built on Radix UI with full RTL support.
 *
 */

const meta = {
  title: 'Overlays & Layout/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['single', 'multiple']
    },
    collapsible: {
      control: { type: 'boolean' }
    },
    defaultValue: {
      control: false
    },
    value: {
      control: false
    },
    onValueChange: {
      control: false
    }
  }
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls (hidden from stories list to avoid ID conflicts)
export const Default: Story = {
  args: {
    type: 'single',
    collapsible: true
  },
  render: (args, { globals }) => {
    const isRTL = globals?.direction === 'rtl';
    const t = (en: string, ar: string) => isRTL ? ar : en;
    const dir = isRTL ? 'rtl' as const : 'ltr' as const;

    return (
    <Accordion {...args} dir={dir} className="w-96 max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>{t('Is it accessible?', 'هل هو سهل الوصول؟')}</AccordionTrigger>
        <AccordionContent>
          {t('Yes. It adheres to the WAI-ARIA design pattern.', 'نعم. يتبع نمط تصميم WAI-ARIA.')}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>{t('Is it styled?', 'هل يحتوي على تنسيق؟')}</AccordionTrigger>
        <AccordionContent>
          {t('Yes. It comes with default styles that you can customize.', 'نعم. يأتي بتنسيقات افتراضية يمكنك تخصيصها.')}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>{t('Is it animated?', 'هل يحتوي على رسوم متحركة؟')}</AccordionTrigger>
        <AccordionContent>
          {t('Yes. It uses CSS animations for smooth transitions.', 'نعم. يستخدم رسوم CSS المتحركة لانتقالات سلسة.')}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    );
  },
};

// Basic FAQ - from component page lines 199-218
export const BasicFAQ: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-96 max-w-md">
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
    controls: { disable: true },
    docs: {
      description: {
        story: 'Basic FAQ accordion with single item open at a time. Click to expand, click again to collapse.'
      }
    }
  }
};

// Multiple Items Open - from component page lines 245-264
export const MultipleOpen: Story = {
  render: () => (
    <Accordion type="multiple" defaultValue={['item-1', 'item-2']} className="w-96 max-w-md">
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Multiple items can be open simultaneously. Account and Security are open by default.'
      }
    }
  }
};

// With Icons - from component page lines 272-307
export const WithIcons: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-96 max-w-md">
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Accordion with icons for visual clarity. Icons are placed before the text.'
      }
    }
  }
};

// Controlled State
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>('item-1');

    return (
      <div className="space-y-4 w-96 max-w-md">
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Controlled accordion with external state management. Shows active item value above.'
      }
    }
  }
};

// In Card
export const InCard: Story = {
  render: () => (
    <Card className="w-96 max-w-md">
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Accordion placed inside a card component with a title.'
      }
    }
  }
};
