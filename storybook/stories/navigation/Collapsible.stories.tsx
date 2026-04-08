import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../../components/ui/collapsible';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { CaretDown, CaretRight, CaretUpDown } from '@phosphor-icons/react';
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
  title: 'Overlays & Layout/Collapsible',
  component: Collapsible,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: { type: 'boolean' }
    },
    defaultOpen: {
      control: { type: 'boolean' }
    },
    disabled: {
      control: { type: 'boolean' }
    },
    onOpenChange: {
      control: false
    }
  }
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls (hidden from stories list to avoid ID conflicts)
export const Default: Story = {
  args: {
    defaultOpen: false,
    onOpenChange: fn()
  },
  render: (args, { globals }) => {
    const isRTL = globals?.direction === 'rtl';
    const t = (en: string, ar: string) => isRTL ? ar : en;
    const [isOpen, setIsOpen] = React.useState(args.defaultOpen || false);

    return (
      <div className="w-96 max-w-md">
        <Collapsible {...args} open={isOpen} onOpenChange={(open) => {
          setIsOpen(open);
          args.onOpenChange?.(open);
        }}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span>{t('Can I use this in my project?', 'هل يمكنني استخدامه في مشروعي؟')}</span>
              <CaretDown
                className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-4 border rounded">
            <p className="text-sm text-muted-foreground">
              {t('Yes! This component is free and open source. You can use it in any project, commercial or personal.', 'نعم! هذا المكون مجاني ومفتوح المصدر. يمكنك استخدامه في أي مشروع، تجاري أو شخصي.')}
            </p>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
};

// Basic FAQ - from component page lines 150-167
export const BasicFAQ: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div className="w-96 max-w-md space-y-4">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span>Can I use this in my project?</span>
              <CaretDown
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders FAQ question', async () => {
      const trigger = canvas.getByRole('button', { name: /can i use this in my project/i });
      await expect(trigger).toBeInTheDocument();
      await expect(trigger).toBeVisible();
    });

    await step('Toggle interaction works', async () => {
      const trigger = canvas.getByRole('button', { name: /can i use this in my project/i });

      // Expand
      await userEvent.click(trigger);
      await expect(canvas.getByText(/yes! this component is free/i)).toBeInTheDocument();

      // Collapse
      await userEvent.click(trigger);
      await expect(canvas.queryByText(/yes! this component is free/i)).not.toBeInTheDocument();
    });
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Basic FAQ-style collapsible with a question/answer pattern. Chevron rotates when expanded.'
      }
    }
  }
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
                  <CaretDown
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders open by default', async () => {
      const trigger = canvas.getByRole('button', { name: /hide details/i });
      await expect(trigger).toBeInTheDocument();
      await expect(canvas.getByText(/this collapsible is controlled/i)).toBeInTheDocument();
    });

    await step('Button text changes with state', async () => {
      // Initially shows "Hide" because it's open
      let trigger = canvas.getByRole('button', { name: /hide details/i });
      await expect(trigger).toBeVisible();

      // Click to collapse - button should show "Show"
      await userEvent.click(trigger);
      trigger = canvas.getByRole('button', { name: /show details/i });
      await expect(trigger).toBeVisible();

      // Content should be hidden
      await expect(canvas.queryByText(/this collapsible is controlled/i)).not.toBeInTheDocument();
    });
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Controlled collapsible with animated chevron icon. Button text changes based on state.'
      }
    }
  }
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
                <CaretUpDown className="h-4 w-4" />
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders sidebar with heading', async () => {
      await expect(canvas.getByText('Starred Repositories')).toBeInTheDocument();
      const trigger = canvas.getByRole('button', { name: /toggle/i });
      await expect(trigger).toBeInTheDocument();
    });

    await step('Expands to show list items', async () => {
      const trigger = canvas.getByRole('button', { name: /toggle/i });
      await userEvent.click(trigger);

      // Check all three repository items are visible
      await expect(canvas.getByText('rtl-design-system')).toBeInTheDocument();
      await expect(canvas.getByText('react-components')).toBeInTheDocument();
      await expect(canvas.getByText('typescript-utils')).toBeInTheDocument();
    });
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Sidebar-style collapsible with a list of items. Uses CaretUpDown icon for toggle button.'
      }
    }
  }
};

// FAQ Style - from component page lines 295-324
export const FAQStyle: Story = {
  render: () => {
    return (
      <div className="w-96 max-w-2xl space-y-2">
        {[
          {
            q: 'What is this design system?',
            a: 'An RTL-first design system built for the GCC market with full bilingual support.'
          },
          {
            q: 'How do I install it?',
            a: 'Simply run npm install noorui-rtl and import the components you need.'
          },
          {
            q: 'Is it accessible?',
            a: 'Yes! All components are WCAG AA compliant with full keyboard navigation.'
          },
        ].map((item, index) => (
          <Collapsible key={index}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between p-4 h-auto font-normal"
              >
                <span className="text-start font-medium">{item.q}</span>
                <CaretRight className="h-4 w-4 shrink-0 transition-transform duration-200 data-[state=open]:rotate-90" />
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders all FAQ questions', async () => {
      await expect(canvas.getByRole('button', { name: /what is this design system/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /how do i install it/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /is it accessible/i })).toBeInTheDocument();
    });

    await step('Each collapsible works independently', async () => {
      // Open first question
      const firstQuestion = canvas.getByRole('button', { name: /what is this design system/i });
      await userEvent.click(firstQuestion);
      await expect(canvas.getByText(/an rtl-first design system/i)).toBeInTheDocument();

      // Open second question
      const secondQuestion = canvas.getByRole('button', { name: /how do i install it/i });
      await userEvent.click(secondQuestion);
      await expect(canvas.getByText(/simply run npm install/i)).toBeInTheDocument();

      // First question should still be open
      await expect(canvas.getByText(/an rtl-first design system/i)).toBeInTheDocument();
    });
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'FAQ-style layout with multiple collapsibles. CaretRight rotates 90° when opened.'
      }
    }
  }
};

// Simple Uncontrolled
export const SimpleUncontrolled: Story = {
  render: () => (
    <div className="w-96 max-w-md">
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders uncontrolled collapsible', async () => {
      const trigger = canvas.getByRole('button', { name: /toggle details/i });
      await expect(trigger).toBeInTheDocument();
      await expect(trigger).toBeVisible();
    });

    await step('Uncontrolled state management works', async () => {
      const trigger = canvas.getByRole('button', { name: /toggle details/i });

      // Should be collapsed initially
      await expect(canvas.queryByText(/this is uncontrolled collapsible content/i)).not.toBeInTheDocument();

      // Expand
      await userEvent.click(trigger);
      await expect(canvas.getByText(/this is uncontrolled collapsible content/i)).toBeInTheDocument();

      // Collapse
      await userEvent.click(trigger);
      await expect(canvas.queryByText(/this is uncontrolled collapsible content/i)).not.toBeInTheDocument();
    });
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Uncontrolled collapsible with internal state management. Simplest implementation.'
      }
    }
  }
};

