import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { EmptyState } from '../../../components/ui/empty-state';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import {
  FileText,
  Inbox,
  Search,
  Users,
  Plus,
  ShoppingCart,
  FolderOpen,
  Database,
  MessageSquare,
  Image
} from 'lucide-react';
import * as React from 'react';

/**
 * EmptyState Component Stories
 *
 * All examples are taken from /app/(docs)/components/empty-state/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: EmptyState displays helpful messages when there is no content.
 * Features: Icon, title, description, action button(s), RTL support.
 */

const meta = {
  title: 'Data Display/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered'
  },
  tags: ['!autodocs'],
  argTypes: {
    icon: {
      control: false
    },
    title: {
      control: { type: 'text' }
    },
    description: {
      control: { type: 'text' }
    },
    action: {
      control: false
    },
    className: {
      control: { type: 'text' }
    }
  }
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls
export const Default: Story = {
  args: {
    icon: <FileText />,
    title: 'No articles found',
    description: 'Get started by creating your first article',
    action: (
      <Button>
        <Plus className="me-2 h-4 w-4" />
        Create Article
      </Button>
    )
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  render: (args) => (
    <Card className="p-8 w-[500px]">
      <EmptyState {...args} />
    </Card>
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

    await step('Renders with correct ARIA attributes', async () => {
      const emptyState = canvas.getByRole('status');
      await expect(emptyState).toBeInTheDocument();
      await expect(emptyState).toBeVisible();
      await expect(emptyState).toHaveAttribute('aria-live', 'polite');
    });

    await step('Displays title and description', async () => {
      await expect(canvas.getByText('No articles found')).toBeInTheDocument();
      await expect(canvas.getByText('Get started by creating your first article')).toBeInTheDocument();
    });

    await step('Contains icon element', async () => {
      const svg = canvasElement.querySelector('svg');
      await expect(svg).toBeInTheDocument();
    });

    await step('Displays action button', async () => {
      const button = canvas.getByRole('button', { name: /create article/i });
      await expect(button).toBeInTheDocument();
      await expect(button).toBeVisible();
    });
  }
};

// Basic Usage - from component page lines 90-101
export const BasicUsage: Story = {
  render: () => (
    <Card className="p-8 w-[500px]">
      <EmptyState
        icon={<FileText />}
        title="No articles found"
        description="Get started by creating your first article"
        action={
          <Button>
            <Plus className="me-2 h-4 w-4" />
            Create Article
          </Button>
        }
      />
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
        story: 'Simple empty state with icon, title, description, and action button.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders empty state correctly', async () => {
      const emptyState = canvas.getByRole('status');
      await expect(emptyState).toBeInTheDocument();
      await expect(emptyState).toBeVisible();
    });

    await step('Displays all content elements', async () => {
      await expect(canvas.getByText('No articles found')).toBeInTheDocument();
      await expect(canvas.getByText('Get started by creating your first article')).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /create article/i })).toBeInTheDocument();
      const svg = canvasElement.querySelector('svg');
      await expect(svg).toBeInTheDocument();
    });
  }
};

// Without Action - from component page lines 116-121
export const WithoutAction: Story = {
  render: () => (
    <Card className="p-8 w-[500px]">
      <EmptyState
        icon={<Inbox />}
        title="Inbox is empty"
        description="You're all caught up! No new messages."
      />
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
        story: 'Empty state without action button. Used when no action is needed.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders empty state correctly', async () => {
      const emptyState = canvas.getByRole('status');
      await expect(emptyState).toBeInTheDocument();
      await expect(emptyState).toBeVisible();
    });

    await step('Displays title and description', async () => {
      await expect(canvas.getByText('Inbox is empty')).toBeInTheDocument();
      await expect(canvas.getByText("You're all caught up! No new messages.")).toBeInTheDocument();
    });

    await step('Contains icon but no action button', async () => {
      const svg = canvasElement.querySelector('svg');
      await expect(svg).toBeInTheDocument();

      const buttons = canvas.queryAllByRole('button');
      await expect(buttons).toHaveLength(0);
    });
  }
};

// Search Results - from component page lines 132-141
export const SearchResults: Story = {
  render: () => (
    <Card className="p-8 w-[500px]">
      <EmptyState
        icon={<Search />}
        title="No results found"
        description="Try adjusting your search or filter to find what you're looking for."
        action={<Button variant="outline">Clear Filters</Button>}
      />
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
        story: 'Empty state for search results with clear filters action.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders search results empty state', async () => {
      const emptyState = canvas.getByRole('status');
      await expect(emptyState).toBeInTheDocument();
      await expect(emptyState).toBeVisible();
    });

    await step('Displays search-specific content', async () => {
      await expect(canvas.getByText('No results found')).toBeInTheDocument();
      await expect(canvas.getByText("Try adjusting your search or filter to find what you're looking for.")).toBeInTheDocument();
    });

    await step('Displays outline button', async () => {
      const button = canvas.getByRole('button', { name: /clear filters/i });
      await expect(button).toBeInTheDocument();
      await expect(button).toBeVisible();
    });
  }
};

// Multiple Actions - from component page lines 153-168
export const MultipleActions: Story = {
  render: () => (
    <Card className="p-8 w-[500px]">
      <EmptyState
        icon={<Users />}
        title="No team members yet"
        description="Invite your team to start collaborating"
        action={
          <>
            <Button>
              <Plus className="me-2 h-4 w-4" />
              Invite Members
            </Button>
            <Button variant="outline">Learn More</Button>
          </>
        }
      />
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
        story: 'Empty state with multiple action buttons.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders empty state correctly', async () => {
      const emptyState = canvas.getByRole('status');
      await expect(emptyState).toBeInTheDocument();
      await expect(emptyState).toBeVisible();
    });

    await step('Displays team-specific content', async () => {
      await expect(canvas.getByText('No team members yet')).toBeInTheDocument();
      await expect(canvas.getByText('Invite your team to start collaborating')).toBeInTheDocument();
    });

    await step('Displays multiple action buttons', async () => {
      const buttons = canvas.getAllByRole('button');
      await expect(buttons).toHaveLength(2);
      await expect(canvas.getByRole('button', { name: /invite members/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /learn more/i })).toBeInTheDocument();
    });
  }
};

// All Use Cases
export const AllUseCases: Story = {
  render: () => (
    <div className="grid gap-6 md:grid-cols-2 max-w-6xl">
      <Card className="p-8">
        <EmptyState
          icon={<ShoppingCart />}
          title="Your cart is empty"
          description="Add items to get started"
          action={<Button>Browse Products</Button>}
        />
      </Card>
      <Card className="p-8">
        <EmptyState
          icon={<FolderOpen />}
          title="No files yet"
          description="Upload your first file to get started"
          action={<Button>Upload File</Button>}
        />
      </Card>
      <Card className="p-8">
        <EmptyState
          icon={<Database />}
          title="No data available"
          description="Data will appear here once you start collecting"
        />
      </Card>
      <Card className="p-8">
        <EmptyState
          icon={<MessageSquare />}
          title="No comments yet"
          description="Be the first to share your thoughts"
          action={<Button variant="outline">Add Comment</Button>}
        />
      </Card>
      <Card className="p-8">
        <EmptyState
          icon={<Image />}
          title="No images"
          description="Upload images to build your gallery"
          action={
            <>
              <Button>Upload Images</Button>
              <Button variant="outline">Use Stock Photos</Button>
            </>
          }
        />
      </Card>
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Different use cases: empty cart, no files, no data, no comments, no images.'
      }
    }
  }
};

// Minimal Layout
export const MinimalLayout: Story = {
  render: () => (
    <Card className="p-8 w-[400px]">
      <EmptyState title="No items" description="Your list is currently empty" />
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
        story: 'Minimal empty state with just title and description, no icon or action.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders minimal empty state', async () => {
      const emptyState = canvas.getByRole('status');
      await expect(emptyState).toBeInTheDocument();
      await expect(emptyState).toBeVisible();
    });

    await step('Displays only title and description', async () => {
      await expect(canvas.getByText('No items')).toBeInTheDocument();
      await expect(canvas.getByText('Your list is currently empty')).toBeInTheDocument();
    });

    await step('Verifies no icon or action button', async () => {
      const svg = canvasElement.querySelector('svg');
      await expect(svg).not.toBeInTheDocument();

      const buttons = canvas.queryAllByRole('button');
      await expect(buttons).toHaveLength(0);
    });
  }
};

// RTL Basic
export const RTLBasic: Story = {
  render: () => (
    <Card className="p-8 w-[500px]">
      <EmptyState
        icon={<FileText />}
        title="لم يتم العثور على مقالات"
        description="ابدأ بإنشاء مقالتك الأولى"
        action={
          <Button>
            <Plus className="me-2 h-4 w-4" />
            إنشاء مقالة
          </Button>
        }
      />
    </Card>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Empty state in RTL with Arabic text. Layout flows right-to-left.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders in RTL context', async () => {
      const emptyState = canvas.getByRole('status');
      await expect(emptyState).toBeInTheDocument();
      await expect(emptyState).toBeVisible();
    });

    await step('Displays Arabic content', async () => {
      await expect(canvas.getByText('لم يتم العثور على مقالات')).toBeInTheDocument();
      await expect(canvas.getByText('ابدأ بإنشاء مقالتك الأولى')).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /إنشاء مقالة/i })).toBeInTheDocument();
    });
  }
};

// RTL Without Action
export const RTLWithoutAction: Story = {
  render: () => (
    <Card className="p-8 w-[500px]">
      <EmptyState
        icon={<Inbox />}
        title="البريد الوارد فارغ"
        description="أنت على اطلاع! لا توجد رسائل جديدة."
      />
    </Card>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Empty inbox state in RTL without action button.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders in RTL context', async () => {
      const emptyState = canvas.getByRole('status');
      await expect(emptyState).toBeInTheDocument();
      await expect(emptyState).toBeVisible();
    });

    await step('Displays Arabic content without action', async () => {
      await expect(canvas.getByText('البريد الوارد فارغ')).toBeInTheDocument();
      await expect(canvas.getByText('أنت على اطلاع! لا توجد رسائل جديدة.')).toBeInTheDocument();

      const buttons = canvas.queryAllByRole('button');
      await expect(buttons).toHaveLength(0);
    });
  }
};

// RTL Search Results
export const RTLSearchResults: Story = {
  render: () => (
    <Card className="p-8 w-[500px]">
      <EmptyState
        icon={<Search />}
        title="لم يتم العثور على نتائج"
        description="حاول تعديل البحث أو الفلتر للعثور على ما تبحث عنه."
        action={<Button variant="outline">مسح الفلاتر</Button>}
      />
    </Card>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Search results empty state in RTL with clear filters button.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders in RTL context', async () => {
      const emptyState = canvas.getByRole('status');
      await expect(emptyState).toBeInTheDocument();
      await expect(emptyState).toBeVisible();
    });

    await step('Displays Arabic search content', async () => {
      await expect(canvas.getByText('لم يتم العثور على نتائج')).toBeInTheDocument();
      await expect(canvas.getByText('حاول تعديل البحث أو الفلتر للعثور على ما تبحث عنه.')).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /مسح الفلاتر/i })).toBeInTheDocument();
    });
  }
};

// RTL Multiple Actions
export const RTLMultipleActions: Story = {
  render: () => (
    <Card className="p-8 w-[500px]">
      <EmptyState
        icon={<Users />}
        title="لا يوجد أعضاء فريق بعد"
        description="ادع فريقك لبدء التعاون"
        action={
          <>
            <Button>
              <Plus className="me-2 h-4 w-4" />
              دعوة أعضاء
            </Button>
            <Button variant="outline">معرفة المزيد</Button>
          </>
        }
      />
    </Card>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Empty state in RTL with multiple action buttons in Arabic.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders in RTL context', async () => {
      const emptyState = canvas.getByRole('status');
      await expect(emptyState).toBeInTheDocument();
      await expect(emptyState).toBeVisible();
    });

    await step('Displays Arabic content with multiple actions', async () => {
      await expect(canvas.getByText('لا يوجد أعضاء فريق بعد')).toBeInTheDocument();
      await expect(canvas.getByText('ادع فريقك لبدء التعاون')).toBeInTheDocument();

      const buttons = canvas.getAllByRole('button');
      await expect(buttons).toHaveLength(2);
      await expect(canvas.getByRole('button', { name: /دعوة أعضاء/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /معرفة المزيد/i })).toBeInTheDocument();
    });
  }
};
