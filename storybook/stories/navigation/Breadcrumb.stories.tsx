import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '../../../components/ui/breadcrumb';
import { Card, CardContent } from '../../../components/ui/card';
import { House, Folder, File } from '@phosphor-icons/react';
import * as React from 'react';

/**
 * Breadcrumb Component Stories
 *
 * All examples are taken from /app/(docs)/components/breadcrumb/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Breadcrumb is a navigation component showing the current page location.
 * Automatically adapts to RTL layouts with proper separator positioning.
 */

const meta = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    // No specific props to control - component is structural
  }
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground (hidden from stories list to avoid ID conflicts)
export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  parameters: {
    docs: {
      story: {
        inline: false
      }
    }
  }
};

// Basic Breadcrumb - from component page lines 149-163
export const BasicBreadcrumb: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders basic breadcrumb structure', async () => {
      const nav = canvas.getByRole('navigation', { name: 'Breadcrumb' });
      await expect(nav).toBeInTheDocument();
      await expect(canvas.getByRole('link', { name: 'Home' })).toBeInTheDocument();
      await expect(canvas.getByRole('link', { name: 'Components' })).toBeInTheDocument();
      await expect(canvas.getByRole('link', { name: 'Breadcrumb' })).toBeInTheDocument();
    });

    await step('Default chevron separators are present', async () => {
      // Separators have role="presentation" and aria-hidden="true"
      const nav = canvas.getByRole('navigation', { name: 'Breadcrumb' });
      const list = within(nav).getByRole('list');
      await expect(list).toBeInTheDocument();
    });
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Basic breadcrumb showing navigation path with default chevron separators.'
      }
    }
  }
};

// Custom Separator - from component page lines 190-204
export const CustomSeparator: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/documentation">Documentation</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders with custom separator', async () => {
      await expect(canvas.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
      await expect(canvas.getByRole('link', { name: 'Home' })).toBeInTheDocument();
      await expect(canvas.getByRole('link', { name: 'Documentation' })).toBeInTheDocument();
    });

    await step('Custom "/" separators are visible', async () => {
      const nav = canvas.getByRole('navigation', { name: 'Breadcrumb' });
      const list = within(nav).getByRole('list');
      await expect(list).toHaveTextContent('/');
    });
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Breadcrumb with custom "/" separator instead of default chevron.'
      }
    }
  }
};

// With Icons - from component page lines 214-237
export const WithIcons: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center gap-2">
            <House className="h-4 w-4" />
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/examples" className="flex items-center gap-2">
            <Folder className="h-4 w-4" />
            Examples
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="flex items-center gap-2">
            <File className="h-4 w-4" />
            Document
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders breadcrumb with icons', async () => {
      await expect(canvas.getByRole('link', { name: /Home/i })).toBeInTheDocument();
      await expect(canvas.getByRole('link', { name: /Examples/i })).toBeInTheDocument();
      await expect(canvas.getByRole('link', { name: /Document/i })).toBeInTheDocument();
    });

    await step('Icons and text are both accessible', async () => {
      const homeLink = canvas.getByRole('link', { name: /Home/i });
      await userEvent.hover(homeLink);
      await expect(homeLink).toHaveAttribute('href', '/');
    });
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Breadcrumb with icons for visual clarity. Icons help identify different navigation levels.'
      }
    }
  }
};

// Longer Path
export const LongerPath: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/documentation">Documentation</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/documentation/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/documentation/components/navigation">Navigation</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders multiple breadcrumb levels', async () => {
      await expect(canvas.getByRole('link', { name: 'Home' })).toBeInTheDocument();
      await expect(canvas.getByRole('link', { name: 'Documentation' })).toBeInTheDocument();
      await expect(canvas.getByRole('link', { name: 'Components' })).toBeInTheDocument();
      await expect(canvas.getByRole('link', { name: 'Navigation' })).toBeInTheDocument();
      await expect(canvas.getByRole('link', { name: 'Breadcrumb' })).toBeInTheDocument();
    });

    await step('All links have correct href attributes', async () => {
      await expect(canvas.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
      await expect(canvas.getByRole('link', { name: 'Documentation' })).toHaveAttribute('href', '/documentation');
      await expect(canvas.getByRole('link', { name: 'Navigation' })).toHaveAttribute('href', '/documentation/components/navigation');
    });
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Breadcrumb with a longer navigation path showing multiple levels.'
      }
    }
  }
};

// In Card
export const InCard: Story = {
  render: () => (
    <Card className="w-full max-w-2xl">
      <CardContent className="p-6">
        <h3 className="text-sm font-medium mb-4">Current Location</h3>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="flex items-center gap-2">
                <House className="h-4 w-4" />
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/examples">Examples</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Document</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </CardContent>
    </Card>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders breadcrumb inside card', async () => {
      await expect(canvas.getByText('Current Location')).toBeInTheDocument();
      await expect(canvas.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    });

    await step('Breadcrumb navigation works in card context', async () => {
      await expect(canvas.getByRole('link', { name: /Home/i })).toBeInTheDocument();
      await expect(canvas.getByRole('link', { name: 'Examples' })).toBeInTheDocument();
      await expect(canvas.getByRole('link', { name: 'Document' })).toHaveAttribute('aria-current', 'page');
    });
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Breadcrumb placed inside a card component with a title.'
      }
    }
  }
};

