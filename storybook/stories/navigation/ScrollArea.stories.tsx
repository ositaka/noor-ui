import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
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
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    children: { control: false }
  }
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Vertical Scroll
export const Default: Story = {
  render: () => (
    <ScrollArea className="h-80 w-48 rounded-md border p-4">
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
        <ScrollArea className="h-80 w-full rounded-md border p-4">
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
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders vertical scroll area with card layout', async () => {
      await expect(canvas.getByText('Vertical Scrolling')).toBeInTheDocument();
      await expect(canvas.getByText('Item #1')).toBeVisible();
      await expect(canvas.getByText('This is a description for item 1')).toBeVisible();
    });

    await step('Contains all items in scrollable area', async () => {
      await expect(canvas.getByText('Item #1')).toBeInTheDocument();
      await expect(canvas.getByText('Item #30')).toBeInTheDocument();
    });
  }
};

// Horizontal Scroll
export const HorizontalScroll: Story = {
  render: () => (
    <Card className='max-w-xl'>
      <CardHeader>
        <CardTitle>Horizontal Scrolling</CardTitle>
        <CardDescription>Scroll horizontally through wide content</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-xl whitespace-nowrap rounded-md border">
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
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders horizontal scroll area', async () => {
      await expect(canvas.getByText('Horizontal Scrolling')).toBeInTheDocument();
      await expect(canvas.getByText('Card 1')).toBeVisible();
      // "Horizontally scrollable content" appears multiple times, so check it exists
      const scrollableContent = canvas.getAllByText('Horizontally scrollable content');
      await expect(scrollableContent.length).toBeGreaterThan(0);
    });

    await step('Contains all horizontal cards', async () => {
      await expect(canvas.getByText('Card 1')).toBeInTheDocument();
      await expect(canvas.getByText('Card 20')).toBeInTheDocument();
    });

    await step('Horizontal scrollbar is present', async () => {
      const scrollArea = canvas.getByText('Card 1').closest('[class*="overflow-hidden"]');
      await expect(scrollArea).toBeInTheDocument();
    });
  }
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
        <ScrollArea className="h-80 w-80 rounded-md border">
          <div className="p-4">
            <div className="space-y-4">
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
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders bidirectional scroll area', async () => {
      await expect(canvas.getByText('Both Scrollbars')).toBeInTheDocument();
      await expect(canvas.getByText('Content scrollable in both directions')).toBeVisible();
    });

    await step('Contains scrollable content in both directions', async () => {
      // Multiple items match the pattern, so use getAllByText
      const longTexts = canvas.getAllByText(/This is a very long line of text.*Item/);
      await expect(longTexts.length).toBeGreaterThanOrEqual(20);
      // Verify first and last items exist
      await expect(canvas.getByText(/Item 1$/)).toBeInTheDocument();
      await expect(canvas.getByText(/Item 20$/)).toBeInTheDocument();
    });
  }
};

// Compact List
export const CompactList: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <ScrollArea className="h-48 w-32 rounded-md border">
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
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders compact list scroll area', async () => {
      await expect(canvas.getByText('Tags')).toBeInTheDocument();
      await expect(canvas.getByText('Tags')).toBeVisible();
    });

    await step('Displays all tags in scrollable list', async () => {
      await expect(canvas.getByText('Tag 1')).toBeVisible();
      await expect(canvas.getByText('Tag 15')).toBeInTheDocument();
    });
  }
};

// Sidebar Content
export const SidebarContent: Story = {
  render: () => (
    <div className="w-80 border rounded-lg">
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
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders sidebar with navigation', async () => {
      await expect(canvas.getByText('Navigation')).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: 'Dashboard' })).toBeVisible();
    });

    await step('Contains all navigation buttons', async () => {
      await expect(canvas.getByRole('button', { name: 'Dashboard' })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: 'Privacy' })).toBeInTheDocument();
    });

    await step('Buttons are interactive and keyboard accessible', async () => {
      const dashboardButton = canvas.getByRole('button', { name: 'Dashboard' });

      await userEvent.click(dashboardButton);
      await expect(dashboardButton).toBeVisible();

      // Test keyboard navigation
      await userEvent.tab();
      const focusedElement = document.activeElement;
      await expect(focusedElement).toHaveAttribute('class', expect.stringContaining('rounded-md'));
    });
  }
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
        <ScrollArea className="h-80 w-full rounded-md border bg-muted/50">
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
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders code viewer', async () => {
      await expect(canvas.getByText('Code Viewer')).toBeInTheDocument();
      await expect(canvas.getByText('Scrollable code block')).toBeVisible();
    });

    await step('Displays code content', async () => {
      await expect(canvas.getByText(/function fibonacci/)).toBeInTheDocument();
      await expect(canvas.getByText(/const numbers/)).toBeVisible();
      await expect(canvas.getByText(/const data/)).toBeInTheDocument();
    });
  }
};

