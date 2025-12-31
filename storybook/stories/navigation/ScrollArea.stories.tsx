import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea, ScrollBar } from '../../../components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Separator } from '../../../components/ui/separator';

/**
 * Scroll Area Component Stories
 *
 * Note: ScrollArea provides a customizable scrollable container with styled scrollbars.
 * Features: Vertical and horizontal scrolling, custom scrollbar styling, RTL support.
 * Built with Radix UI primitives.
 */

const meta = {
  title: 'Navigation & Layout/Scroll Area',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    children: { control: false },
  },
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Vertical Scroll
export const Default: Story = {
  render: () => (
    <ScrollArea className="h-[200px] w-[300px] rounded-md border p-4">
      <div className="space-y-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i}>
            <p className="text-sm">Item {i + 1}</p>
            {i < 19 && <Separator className="my-2" />}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
};

// Vertical Scroll
export const VerticalScroll: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Vertical Scrolling</CardTitle>
        <CardDescription>Scroll through a long list of items</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          <div className="space-y-4">
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i}>
                <h4 className="text-sm font-medium">Item #{i + 1}</h4>
                <p className="text-sm text-muted-foreground">
                  This is a description for item {i + 1}
                </p>
                {i < 29 && <Separator className="my-2" />}
              </div>
            ))}
          </div>
        </ScrollArea>
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
    },
  },
};

// Horizontal Scroll
export const HorizontalScroll: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Horizontal Scrolling</CardTitle>
        <CardDescription>Scroll horizontally through wide content</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <div className="flex w-max space-x-4 p-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="h-[150px] w-[200px] shrink-0 rounded-md border bg-muted/50 p-4"
              >
                <p className="text-sm font-medium">Card {i + 1}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Horizontally scrollable content
                </p>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
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
    },
  },
};

// With Both Scrollbars
export const BothScrollbars: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Both Scrollbars</CardTitle>
        <CardDescription>Content scrollable in both directions</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full rounded-md border">
          <div className="p-4">
            <div className="w-[800px] space-y-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i}>
                  <p className="text-sm">
                    This is a very long line of text that extends beyond the container width to demonstrate horizontal scrolling - Item {i + 1}
                  </p>
                  {i < 19 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
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
    },
  },
};

// Compact List
export const CompactList: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <ScrollArea className="h-[150px] w-[250px] rounded-md border">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="text-sm py-1">
                Tag {i + 1}
              </div>
            ))}
          </div>
        </ScrollArea>
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
    },
  },
};

// Sidebar Content
export const SidebarContent: Story = {
  render: () => (
    <div className="w-[280px] border rounded-lg">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Navigation</h3>
      </div>
      <ScrollArea className="h-[400px]">
        <div className="p-4 space-y-2">
          {[
            'Dashboard',
            'Analytics',
            'Reports',
            'Settings',
            'Users',
            'Products',
            'Orders',
            'Customers',
            'Inventory',
            'Shipping',
            'Payments',
            'Integrations',
            'API Keys',
            'Webhooks',
            'Notifications',
            'Support',
            'Billing',
            'Account',
            'Security',
            'Privacy',
          ].map((item) => (
            <button
              key={item}
              className="w-full text-start px-3 py-2 rounded-md hover:bg-muted text-sm"
            >
              {item}
            </button>
          ))}
        </div>
      </ScrollArea>
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
    },
  },
};

// Code Viewer
export const CodeViewer: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Code Viewer</CardTitle>
        <CardDescription>Scrollable code block</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] w-full rounded-md border bg-muted/50">
          <div className="p-4 font-mono text-sm">
            <pre>{`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const numbers = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34];

for (let i = 0; i < 10; i++) {
  console.log(\`Fibonacci(\${i}) = \${fibonacci(i)}\`);
}

// More code to demonstrate scrolling
const data = {
  name: "Example",
  value: 42,
  items: [1, 2, 3, 4, 5],
  nested: {
    deep: {
      property: "value"
    }
  }
};`}</pre>
          </div>
        </ScrollArea>
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
    },
  },
};

// RTL
export const RTL: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>منطقة التمرير</CardTitle>
        <CardDescription>قائمة طويلة قابلة للتمرير</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          <div className="space-y-4">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i}>
                <h4 className="text-sm font-medium">العنصر رقم {i + 1}</h4>
                <p className="text-sm text-muted-foreground">
                  هذا وصف للعنصر رقم {i + 1} في القائمة
                </p>
                {i < 24 && <Separator className="my-2" />}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
    },
  },
};
