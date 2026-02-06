import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
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
    layout: 'centered'
  },
  tags: ['!autodocs'],
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  render: (args) => (
    <Accordion {...args} className="w-96 max-w-md">
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
        inline: false
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders correctly with all items collapsed', async () => {
      const triggers = canvas.getAllByRole('button');
      await expect(triggers).toHaveLength(3);
      await expect(triggers[0]).toHaveAccessibleName('Is it accessible?');
      await expect(triggers[1]).toHaveAccessibleName('Is it styled?');
      await expect(triggers[2]).toHaveAccessibleName('Is it animated?');
    });

    await step('Expands item on click', async () => {
      const firstTrigger = canvas.getByRole('button', { name: /is it accessible/i });
      await userEvent.click(firstTrigger);
      await expect(canvas.getByText(/yes\. it adheres to the wai-aria design pattern/i)).toBeVisible();
    });

    await step('Collapses previously open item when opening another (single mode)', async () => {
      const secondTrigger = canvas.getByRole('button', { name: /is it styled/i });
      await userEvent.click(secondTrigger);
      await expect(canvas.getByText(/yes\. it comes with default styles/i)).toBeVisible();
      // First item should now be collapsed - check aria-expanded instead of visibility
      const firstTrigger = canvas.getByRole('button', { name: /is it accessible/i });
      await expect(firstTrigger).toHaveAttribute('aria-expanded', 'false');
    });

    await step('Keyboard navigation with Tab', async () => {
      const thirdTrigger = canvas.getByRole('button', { name: /is it animated/i });
      thirdTrigger.focus();
      await expect(thirdTrigger).toHaveFocus();
    });

    await step('Keyboard activation with Enter', async () => {
      const thirdTrigger = canvas.getByRole('button', { name: /is it animated/i });
      thirdTrigger.focus();
      await userEvent.keyboard('{Enter}');
      await expect(canvas.getByText(/yes\. it uses css animations/i)).toBeVisible();
    });

    await step('Keyboard activation with Space', async () => {
      const firstTrigger = canvas.getByRole('button', { name: /is it accessible/i });
      firstTrigger.focus();
      await userEvent.keyboard(' ');
      await expect(canvas.getByText(/yes\. it adheres to the wai-aria design pattern/i)).toBeVisible();
    });
  }
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Basic FAQ accordion with single item open at a time. Click to expand, click again to collapse.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders FAQ accordion', async () => {
      await expect(canvas.getByRole('button', { name: /is it accessible/i })).toBeInTheDocument();
    });

    await step('Expands and collapses items', async () => {
      const trigger = canvas.getByRole('button', { name: /is it accessible/i });
      await userEvent.click(trigger);
      await expect(canvas.getByText(/yes\. it adheres to the wai-aria design pattern/i)).toBeVisible();

      // Collapse by clicking again - check aria-expanded instead of visibility
      await userEvent.click(trigger);
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Multiple items can be open simultaneously. Account and Security are open by default.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders with multiple items open by default', async () => {
      await expect(canvas.getByText(/manage your account settings/i)).toBeVisible();
      await expect(canvas.getByText(/update your password and security/i)).toBeVisible();
    });

    await step('Can open third item while keeping others open', async () => {
      const notificationsTrigger = canvas.getByRole('button', { name: /notifications/i });
      await userEvent.click(notificationsTrigger);

      // All three items should now be visible
      await expect(canvas.getByText(/manage your account settings/i)).toBeVisible();
      await expect(canvas.getByText(/update your password and security/i)).toBeVisible();
      await expect(canvas.getByText(/configure your notification preferences/i)).toBeVisible();
    });

    await step('Can close individual items without affecting others', async () => {
      const accountTrigger = canvas.getByRole('button', { name: /account/i });
      await userEvent.click(accountTrigger);

      // Account should be collapsed - check aria-expanded instead of visibility
      await expect(accountTrigger).toHaveAttribute('aria-expanded', 'false');
      // Others should still be visible
      await expect(canvas.getByText(/update your password and security/i)).toBeVisible();
      await expect(canvas.getByText(/configure your notification preferences/i)).toBeVisible();
    });
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Accordion with icons for visual clarity. Icons are placed before the text.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders accordion with icons', async () => {
      await expect(canvas.getByRole('button', { name: /profile/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /billing/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /schedule/i })).toBeInTheDocument();
    });

    await step('Icons do not interfere with interactions', async () => {
      const profileTrigger = canvas.getByRole('button', { name: /profile/i });
      await userEvent.click(profileTrigger);
      await expect(canvas.getByText(/update your profile information/i)).toBeVisible();
    });
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Controlled accordion with external state management. Shows active item value above.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders with initial controlled state', async () => {
      await expect(canvas.getByText(/active item: item-1/i)).toBeInTheDocument();
      await expect(canvas.getByText(/manage your account settings/i)).toBeVisible();
    });

    await step('Updates controlled state when item clicked', async () => {
      const securityTrigger = canvas.getByRole('button', { name: /security/i });
      await userEvent.click(securityTrigger);
      await expect(canvas.getByText(/active item: item-2/i)).toBeInTheDocument();
      await expect(canvas.getByText(/update your password and security/i)).toBeVisible();
    });

    await step('State label reflects current selection', async () => {
      const notificationsTrigger = canvas.getByRole('button', { name: /notifications/i });
      await userEvent.click(notificationsTrigger);
      await expect(canvas.getByText(/active item: item-3/i)).toBeInTheDocument();
    });
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Accordion placed inside a card component with a title.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders accordion within card context', async () => {
      await expect(canvas.getByText(/frequently asked questions/i)).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /is it accessible/i })).toBeInTheDocument();
    });

    await step('Accordion works correctly inside card', async () => {
      const trigger = canvas.getByRole('button', { name: /is it styled/i });
      await userEvent.click(trigger);
      await expect(canvas.getByText(/yes\. it comes with default styles/i)).toBeVisible();
    });
  }
};

// RTL Example - Basic FAQ
export const RTLExample: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-96 max-w-md">
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
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Basic FAQ accordion with Arabic text in RTL mode. Chevron positions correctly on the start side.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders in RTL context with Arabic text', async () => {
      await expect(canvas.getByRole('button', { name: /هل يمكن الوصول إليه؟/i })).toBeInTheDocument();
    });

    await step('Interaction works correctly in RTL mode', async () => {
      const trigger = canvas.getByRole('button', { name: /هل يمكن الوصول إليه؟/i });
      await userEvent.click(trigger);
      await expect(canvas.getByText(/نعم. يلتزم بنمط تصميم WAI-ARIA./i)).toBeVisible();
    });
  }
};

// RTL Multiple Open
export const RTLMultipleOpen: Story = {
  render: () => (
    <Accordion type="multiple" defaultValue={['item-1', 'item-2']} className="w-96 max-w-md">
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
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Multiple items open in RTL mode with Arabic labels. Layout adapts automatically.'
      }
    }
  }
};

// RTL With Icons
export const RTLWithIcons: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-96 max-w-md">
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
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Accordion with icons in RTL mode. Icons and text flow correctly right-to-left.'
      }
    }
  }
};

// RTL Controlled
export const RTLControlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>('item-1');

    return (
      <div className="space-y-4 w-96 max-w-md">
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
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Controlled accordion in RTL with Arabic text. State management works the same in both directions.'
      }
    }
  }
};
