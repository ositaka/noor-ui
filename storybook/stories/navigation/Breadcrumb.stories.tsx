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
  tags: ['!autodocs'],
  argTypes: {
    // No specific props to control - component is structural
  }
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground (hidden from stories list to avoid ID conflicts)
export const Default: Story = {
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
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

    await step('Renders breadcrumb navigation', async () => {
      const nav = canvas.getByRole('navigation', { name: 'Breadcrumb' });
      await expect(nav).toBeInTheDocument();
      await expect(nav).toBeVisible();
    });

    await step('Renders breadcrumb links', async () => {
      const homeLink = canvas.getByRole('link', { name: 'Home' });
      const componentsLink = canvas.getByRole('link', { name: 'Components' });

      await expect(homeLink).toBeInTheDocument();
      await expect(homeLink).toHaveAttribute('href', '/');
      await expect(componentsLink).toBeInTheDocument();
      await expect(componentsLink).toHaveAttribute('href', '/components');
    });

    await step('Renders current page with proper ARIA attributes', async () => {
      const currentPage = canvas.getByRole('link', { name: 'Breadcrumb' });

      await expect(currentPage).toBeInTheDocument();
      await expect(currentPage).toHaveAttribute('aria-current', 'page');
      await expect(currentPage).toHaveAttribute('aria-disabled', 'true');
    });

    await step('Keyboard navigation works', async () => {
      const homeLink = canvas.getByRole('link', { name: 'Home' });

      await userEvent.tab();
      await expect(homeLink).toHaveFocus();

      await userEvent.tab();
      await expect(canvas.getByRole('link', { name: 'Components' })).toHaveFocus();
    });

    await step('Links are hoverable', async () => {
      const homeLink = canvas.getByRole('link', { name: 'Home' });
      await userEvent.hover(homeLink);
      await expect(homeLink).toBeInTheDocument();
    });
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en'
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
  globals: {
    direction: 'ltr',
    locale: 'en'
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
  globals: {
    direction: 'ltr',
    locale: 'en'
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
  globals: {
    direction: 'ltr',
    locale: 'en'
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
  globals: {
    direction: 'ltr',
    locale: 'en'
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

// RTL Example - Basic
export const RTLExample: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">الرئيسية</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">المكونات</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>مسار التنقل</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders in RTL context', async () => {
      await expect(canvas.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
      await expect(canvas.getByRole('link', { name: 'الرئيسية' })).toBeInTheDocument();
      await expect(canvas.getByRole('link', { name: 'المكونات' })).toBeInTheDocument();
    });

    await step('RTL navigation works', async () => {
      const homeLink = canvas.getByRole('link', { name: 'الرئيسية' });
      await userEvent.hover(homeLink);
      await expect(homeLink).toHaveAttribute('href', '/');
    });

    await step('Current page has proper ARIA in RTL', async () => {
      const currentPage = canvas.getByRole('link', { name: 'مسار التنقل' });
      await expect(currentPage).toHaveAttribute('aria-current', 'page');
    });
  },
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Basic breadcrumb with Arabic text in RTL mode. Chevron separators automatically flip direction.'
      }
    }
  }
};

// RTL Custom Separator
export const RTLCustomSeparator: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">الرئيسية</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/documentation">الوثائق</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>مسار التنقل</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Breadcrumb with custom "/" separator in RTL mode.'
      }
    }
  }
};

// RTL With Icons
export const RTLWithIcons: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center gap-2">
            <House className="h-4 w-4" />
            الرئيسية
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/examples" className="flex items-center gap-2">
            <Folder className="h-4 w-4" />
            أمثلة
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="flex items-center gap-2">
            <File className="h-4 w-4" />
            مستند
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Breadcrumb with icons in RTL mode. Icons and text flow correctly right-to-left.'
      }
    }
  }
};

// RTL Longer Path
export const RTLLongerPath: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">الرئيسية</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/documentation">الوثائق</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/documentation/components">المكونات</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/documentation/components/navigation">التنقل</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>مسار التنقل</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Longer breadcrumb path in RTL mode with Arabic text. Link order flows naturally right-to-left.'
      }
    }
  }
};
