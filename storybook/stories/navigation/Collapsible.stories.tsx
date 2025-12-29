import type { Meta, StoryObj } from '@storybook/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../../components/ui/collapsible';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { ChevronDown, ChevronRight, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

/**
 * Collapsible Component Stories
 *
 * All examples are taken from /app/(docs)/components/collapsible/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Collapsible allows showing and hiding content with smooth animations.
 * Built on Radix UI with full RTL support.
 */

const meta = {
  title: 'Navigation/Collapsible',
  component: Collapsible,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: { type: 'boolean' },
    },
    defaultOpen: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    onOpenChange: {
      control: false,
    },
  },
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls (hidden from stories list to avoid ID conflicts)
export const Default: Story = {
  args: {
    defaultOpen: false,
  },
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(args.defaultOpen || false);

    return (
      <div className="w-full max-w-md">
        <Collapsible {...args} open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span>Can I use this in my project?</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-4 border rounded">
            <p className="text-sm text-muted-foreground">
              Yes! This component is free and open source. You can use it in any project, commercial or personal.
            </p>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
  parameters: {
    docs: {
      story: {
        inline: false,
      },
    },
  },
};

// Basic FAQ - from component page lines 150-167
export const BasicFAQ: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div className="w-full max-w-md space-y-4">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span>Can I use this in my project?</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-4 border rounded">
            <p className="text-sm text-muted-foreground">
              Yes! This component is free and open source. You can use it in any project, commercial or personal.
            </p>
          </CollapsibleContent>
        </Collapsible>
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
        story: 'Basic FAQ-style collapsible with a question/answer pattern. Chevron rotates when expanded.',
      },
    },
  },
};

// Controlled with Icon - from component page lines 227-243
export const ControlledWithIcon: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(true);

    return (
      <Card>
        <CardContent className="p-6">
          <div className="max-w-md">
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <span>{isOpen ? 'Hide' : 'Show'} Details</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 p-4 border rounded">
                <p className="text-sm text-muted-foreground">
                  This collapsible is controlled, meaning you manage the open state. The chevron rotates smoothly when toggled.
                </p>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </CardContent>
      </Card>
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
        story: 'Controlled collapsible with animated chevron icon. Button text changes based on state.',
      },
    },
  },
};

// Sidebar Style - from component page lines 258-281
export const SidebarStyle: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div className="w-72 border rounded-lg p-4">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold">Starred Repositories</h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="mt-2 space-y-2">
            <div className="rounded-md border px-4 py-2 text-sm">
              rtl-design-system
            </div>
            <div className="rounded-md border px-4 py-2 text-sm">
              react-components
            </div>
            <div className="rounded-md border px-4 py-2 text-sm">
              typescript-utils
            </div>
          </CollapsibleContent>
        </Collapsible>
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
        story: 'Sidebar-style collapsible with a list of items. Uses ChevronsUpDown icon for toggle button.',
      },
    },
  },
};

// FAQ Style - from component page lines 295-324
export const FAQStyle: Story = {
  render: () => {
    return (
      <div className="w-full max-w-2xl space-y-2">
        {[
          {
            q: 'What is this design system?',
            a: 'An RTL-first design system built for the GCC market with full bilingual support.',
          },
          {
            q: 'How do I install it?',
            a: 'Simply run npm install noorui-rtl and import the components you need.',
          },
          {
            q: 'Is it accessible?',
            a: 'Yes! All components are WCAG AA compliant with full keyboard navigation.',
          },
        ].map((item, index) => (
          <Collapsible key={index}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between p-4 h-auto font-normal"
              >
                <span className="text-start font-medium">{item.q}</span>
                <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 data-[state=open]:rotate-90" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4">
              <p className="text-sm text-muted-foreground">{item.a}</p>
            </CollapsibleContent>
          </Collapsible>
        ))}
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
        story: 'FAQ-style layout with multiple collapsibles. ChevronRight rotates 90° when opened.',
      },
    },
  },
};

// Simple Uncontrolled
export const SimpleUncontrolled: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="outline">Toggle Details</Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 p-4 border rounded">
          <p className="text-sm text-muted-foreground">
            This is uncontrolled collapsible content. The state is managed internally.
          </p>
        </CollapsibleContent>
      </Collapsible>
    </div>
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
        story: 'Uncontrolled collapsible with internal state management. Simplest implementation.',
      },
    },
  },
};

// RTL Example - Basic FAQ
export const RTLExample: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div className="w-full max-w-md space-y-4">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span>هل يمكنني استخدام هذا في مشروعي؟</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-4 border rounded">
            <p className="text-sm text-muted-foreground">
              نعم! هذا المكون مجاني ومفتوح المصدر. يمكنك استخدامه في أي مشروع، تجاري أو شخصي.
            </p>
          </CollapsibleContent>
        </Collapsible>
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
        story: 'Basic FAQ collapsible with Arabic text in RTL mode. Animations work perfectly in both directions.',
      },
    },
  },
};

// RTL Controlled with Icon
export const RTLControlledWithIcon: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(true);

    return (
      <Card>
        <CardContent className="p-6">
          <div className="max-w-md">
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <span>{isOpen ? 'إخفاء' : 'إظهار'} التفاصيل</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 p-4 border rounded">
                <p className="text-sm text-muted-foreground">
                  هذا القابل للطي متحكم به، مما يعني أنك تدير حالة الفتح. يدور السهم بسلاسة عند التبديل.
                </p>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </CardContent>
      </Card>
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
        story: 'Controlled collapsible in RTL with Arabic text. Button text changes dynamically.',
      },
    },
  },
};

// RTL Sidebar Style
export const RTLSidebarStyle: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div className="w-72 border rounded-lg p-4">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold">المستودعات المميزة</h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">تبديل</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="mt-2 space-y-2">
            <div className="rounded-md border px-4 py-2 text-sm">
              نظام التصميم RTL
            </div>
            <div className="rounded-md border px-4 py-2 text-sm">
              مكونات React
            </div>
            <div className="rounded-md border px-4 py-2 text-sm">
              أدوات TypeScript
            </div>
          </CollapsibleContent>
        </Collapsible>
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
        story: 'Sidebar-style collapsible in RTL with Arabic content. Layout flows right-to-left.',
      },
    },
  },
};

// RTL FAQ Style
export const RTLFAQStyle: Story = {
  render: () => {
    return (
      <div className="w-full max-w-2xl space-y-2">
        {[
          {
            q: 'ما هو نظام التصميم هذا؟',
            a: 'نظام تصميم RTL أولاً مبني لسوق دول مجلس التعاون الخليجي مع دعم ثنائي اللغة بالكامل.',
          },
          {
            q: 'كيف أقوم بتثبيته؟',
            a: 'ببساطة قم بتشغيل npm install noorui-rtl واستورد المكونات التي تحتاجها.',
          },
          {
            q: 'هل يمكن الوصول إليه؟',
            a: 'نعم! جميع المكونات متوافقة مع WCAG AA مع التنقل الكامل بلوحة المفاتيح.',
          },
        ].map((item, index) => (
          <Collapsible key={index}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between p-4 h-auto font-normal"
              >
                <span className="text-start font-medium">{item.q}</span>
                <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 data-[state=open]:rotate-90" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4">
              <p className="text-sm text-muted-foreground">{item.a}</p>
            </CollapsibleContent>
          </Collapsible>
        ))}
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
        story: 'FAQ-style collapsibles in RTL with Arabic questions and answers. Multiple items.',
      },
    },
  },
};
