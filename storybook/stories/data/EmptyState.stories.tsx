import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from '../../../components/ui/empty-state';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import {
  FileText,
  Tray,
  MagnifyingGlass,
  Users,
  Plus,
  ShoppingCart,
  FolderOpen,
  Database,
  ChatCentered,
  Image
} from '@phosphor-icons/react';
import * as React from 'react';

const meta = {
  title: 'Feedback/Empty State',
  component: EmptyState,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
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
  render: (args, { globals }) => {
    return (
    <Card className="p-8 w-[500px]">
      <EmptyState {...args} />
    </Card>
    );
  },
  parameters: {
    ar: {
      args: {
        title: 'لم يتم العثور على مقالات',
        description: 'ابدأ بإنشاء مقالتك الأولى',
        action: (
          <Button>
            <Plus className="me-2 h-4 w-4" />
            إنشاء مقالة
          </Button>
        )
      }
    }
  },
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Simple empty state with icon, title, description, and action button.'
      }
    }
  }
};

// Without Action - from component page lines 116-121
export const WithoutAction: Story = {
  render: () => (
    <Card className="p-8 w-[500px]">
      <EmptyState
        icon={<Tray />}
        title="Tray is empty"
        description="You're all caught up! No new messages."
      />
    </Card>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Empty state without action button. Used when no action is needed.'
      }
    }
  }
};

// Search Results - from component page lines 132-141
export const SearchResults: Story = {
  render: () => (
    <Card className="p-8 w-[500px]">
      <EmptyState
        icon={<MagnifyingGlass />}
        title="No results found"
        description="Try adjusting your search or filter to find what you're looking for."
        action={<Button variant="outline">Clear Filters</Button>}
      />
    </Card>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Empty state for search results with clear filters action.'
      }
    }
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Empty state with multiple action buttons.'
      }
    }
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
          icon={<ChatCentered />}
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Minimal empty state with just title and description, no icon or action.'
      }
    }
  }
};

