import type { Meta, StoryObj } from '@storybook/react';
import { ConversationHistory, type Conversation } from '../../../components/ui/conversation-history';
import { Card, CardContent } from '../../../components/ui/card';
import { useState } from 'react';
import { expect, userEvent, within, fn } from 'storybook/test';

/**
 * Conversation History Component Stories
 *
 * All examples are taken from /app/(docs)/components/conversation-history/page.tsx
 *
 * Note: ConversationHistory displays a list of chat conversations.
 * Features: Search, rename, delete, share, time-based grouping, different sizes, floating variant, RTL support.
 */

// Sample conversations from page lines 174-220
const sampleConversations: Conversation[] = [
  {
    id: '1',
    title: 'Project Planning Discussion',
    titleAr: 'مناقشة تخطيط المشروع',
    preview: "Let's discuss the roadmap for Q4...",
    previewAr: 'لنناقش خارطة الطريق للربع الرابع...',
    timestamp: new Date(),
    messageCount: 24
  },
  {
    id: '2',
    title: 'Code Review Feedback',
    titleAr: 'ملاحظات مراجعة الكود',
    preview: 'The PR looks good, just a few comments...',
    previewAr: 'طلب السحب يبدو جيداً، بضع ملاحظات فقط...',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    messageCount: 12
  },
  {
    id: '3',
    title: 'Design System Updates',
    titleAr: 'تحديثات نظام التصميم',
    preview: 'We should update the color palette...',
    previewAr: 'يجب تحديث لوحة الألوان...',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    messageCount: 8
  },
  {
    id: '4',
    title: 'API Documentation',
    titleAr: 'توثيق واجهة برمجة التطبيقات',
    preview: 'Help me write docs for the new endpoints...',
    previewAr: 'ساعدني في كتابة الوثائق للنقاط الجديدة...',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    messageCount: 15
  },
  {
    id: '5',
    title: 'Bug Investigation',
    titleAr: 'التحقيق في خلل',
    preview: "There's an issue with the authentication flow...",
    previewAr: 'هناك مشكلة في تدفق المصادقة...',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    messageCount: 32
  },
];

const meta = {
  title: 'AI/Conversation History',
  component: ConversationHistory,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['!autodocs'],
  argTypes: {
    conversations: { control: false },
    activeId: { control: 'text' },
    onSelect: { control: false },
    onCreate: { control: false },
    onRename: { control: false },
    onDelete: { control: false },
    onShare: { control: false },
    showSearch: { control: 'boolean' },
    variant: {
      control: { type: 'select' },
      options: ['default', 'floating']
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg']
    },
    isRTL: { control: 'boolean' },
    title: { control: 'text' },
    titleAr: { control: 'text' }
  }
} satisfies Meta<typeof ConversationHistory>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - from page lines 309-318
export const Default: Story = {
  render: () => {
    const [activeId, setActiveId] = useState('1');
    const [conversations, setConversations] = useState(sampleConversations);

    const handleCreate = () => {
      const newConv: Conversation = {
        id: String(conversations.length + 1),
        title: 'New Conversation',
        preview: '',
        timestamp: new Date(),
        messageCount: 0
      };
      setConversations([newConv, ...conversations]);
      setActiveId(newConv.id);
    };

    const handleDelete = (id: string) => {
      setConversations(conversations.filter((c) => c.id !== id));
      if (activeId === id && conversations.length > 0) {
        setActiveId(conversations[0].id);
      }
    };

    const handleRename = (id: string, newTitle: string) => {
      setConversations(
        conversations.map((c) => (c.id === id ? { ...c, title: newTitle } : c))
      );
    };

    return (
      <div className="flex w-full h-[600px] border rounded-lg overflow-hidden">
        <ConversationHistory
          conversations={conversations}
          activeId={activeId}
          onSelect={setActiveId}
          onCreate={handleCreate}
          onRename={handleRename}
          onDelete={handleDelete}
          onShare={(id) => alert(`Share conversation ${id}`)}
          title="Conversations"
        />
        <div className="flex-1 flex items-center justify-center bg-muted/10">
          <div className="text-center space-y-2">
            <p className="text-lg font-medium">
              Active: {conversations.find((c) => c.id === activeId)?.title}
            </p>
            <p className="text-sm text-muted-foreground">
              Chat content would appear here
            </p>
          </div>
        </div>
      </div>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  }
};

// Full Featured - from page lines 358-368
export const FullFeatured: Story = {
  render: () => {
    const [activeId, setActiveId] = useState('1');
    const [conversations, setConversations] = useState(sampleConversations);

    const handleCreate = () => {
      const newConv: Conversation = {
        id: String(conversations.length + 1),
        title: 'New Conversation',
        preview: '',
        timestamp: new Date(),
        messageCount: 0
      };
      setConversations([newConv, ...conversations]);
      setActiveId(newConv.id);
    };

    const handleDelete = (id: string) => {
      setConversations(conversations.filter((c) => c.id !== id));
    };

    const handleRename = (id: string, newTitle: string) => {
      setConversations(
        conversations.map((c) => (c.id === id ? { ...c, title: newTitle } : c))
      );
    };

    return (
      <Card>
        <CardContent className="p-6">
          <div className="h-[500px] border rounded-lg overflow-hidden">
            <div className="flex h-full">
              <ConversationHistory
                conversations={conversations}
                activeId={activeId}
                onSelect={setActiveId}
                onCreate={handleCreate}
                onRename={handleRename}
                onDelete={handleDelete}
                onShare={(id) => alert(`Share: ${id}`)}
                showSearch
                title="My Conversations"
              />
              <div className="flex-1 flex items-center justify-center bg-muted/10">
                <p className="text-sm text-muted-foreground">Chat content</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders with custom title', async () => {
      await expect(canvas.getByRole('heading', { name: 'My Conversations' })).toBeInTheDocument();
    });

    await step('Shows search input', async () => {
      const searchInput = canvas.getByRole('searchbox');
      await expect(searchInput).toBeInTheDocument();
      await expect(searchInput).toHaveAttribute('placeholder', 'Search conversations...');
    });

    await step('Filters conversations by search query', async () => {
      const searchInput = canvas.getByRole('searchbox');
      await userEvent.type(searchInput, 'design');

      // Only Design System Updates should be visible (use findBy after typing)
      await expect(await canvas.findByText('Design System Updates')).toBeInTheDocument();
      // Other conversations should not be visible
      const projectPlanningButtons = canvas.queryAllByRole('button').filter((btn) =>
        btn.textContent?.includes('Project Planning Discussion')
      );
      await expect(projectPlanningButtons.length).toBe(0);

      // Clear search
      await userEvent.clear(searchInput);
      await expect(await canvas.findByText('Project Planning Discussion')).toBeInTheDocument();
    });

    await step('Shows all conversations after search clear', async () => {
      // Use findBy as count updates after clearing search
      await expect(await canvas.findByText(/5 conversations/i)).toBeInTheDocument();
    });
  }
};

// Small Size - from page lines 411-416
export const SmallSize: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <p className="text-sm font-medium mb-2">Small (256px)</p>
        <div className="h-[300px] border rounded-lg overflow-hidden">
          <ConversationHistory
            conversations={sampleConversations.slice(0, 3)}
            size="sm"
            activeId="1"
          />
        </div>
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders conversations in small size', async () => {
      await expect(canvas.getByRole('heading', { name: 'Conversations' })).toBeInTheDocument();
      await expect(canvas.getByText('Project Planning Discussion')).toBeInTheDocument();
      await expect(canvas.getByText('Code Review Feedback')).toBeInTheDocument();
      await expect(canvas.getByText('Design System Updates')).toBeInTheDocument();
    });

    await step('Shows footer with conversation count', async () => {
      await expect(canvas.getByText(/3 conversations/i)).toBeInTheDocument();
    });
  }
};

// Large Size - from page lines 419-426
export const LargeSize: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <p className="text-sm font-medium mb-2">Large (384px)</p>
        <div className="h-[300px] border rounded-lg overflow-hidden">
          <ConversationHistory
            conversations={sampleConversations.slice(0, 3)}
            size="lg"
            activeId="1"
          />
        </div>
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders conversations in large size', async () => {
      await expect(canvas.getByRole('heading', { name: 'Conversations' })).toBeInTheDocument();
      await expect(canvas.getByText('Project Planning Discussion')).toBeInTheDocument();
      await expect(canvas.getByText(/3 conversations/i)).toBeInTheDocument();
    });
  }
};

// Floating Variant - from page lines 447-452
export const FloatingVariant: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="h-[500px] bg-muted/10 rounded-lg p-4 relative">
          <div className="absolute top-4 left-4">
            <ConversationHistory
              conversations={sampleConversations.slice(0, 3)}
              variant="floating"
              size="sm"
              activeId="1"
            />
          </div>
        </div>
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
        story: 'Floating variant for overlays or modals.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders floating variant', async () => {
      await expect(canvas.getByRole('heading', { name: 'Conversations' })).toBeInTheDocument();
      await expect(canvas.getByText('Project Planning Discussion')).toBeInTheDocument();
    });

    await step('Displays conversations with rounded border style', async () => {
      // Verify conversations are rendered
      await expect(canvas.getByText(/3 conversations/i)).toBeInTheDocument();
    });
  }
};

// With Search
export const WithSearch: Story = {
  render: () => {
    const [activeId, setActiveId] = useState('1');

    return (
      <div className="h-[500px] border rounded-lg overflow-hidden">
        <div className="flex h-full">
          <ConversationHistory
            conversations={sampleConversations}
            activeId={activeId}
            onSelect={setActiveId}
            onCreate={() => console.log('Create new')}
            showSearch
            title="Search Conversations"
          />
          <div className="flex-1 flex items-center justify-center bg-muted/10">
            <p className="text-sm text-muted-foreground">Chat content</p>
          </div>
        </div>
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
        story: 'Conversation history with search enabled.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders with search input', async () => {
      await expect(canvas.getByRole('heading', { name: 'Search Conversations' })).toBeInTheDocument();
      const searchInput = canvas.getByRole('searchbox');
      await expect(searchInput).toBeInTheDocument();
    });

    await step('Filters conversations based on search', async () => {
      const searchInput = canvas.getByRole('searchbox');
      await userEvent.type(searchInput, 'bug');

      // Should show Bug Investigation (use findBy after typing)
      await expect(await canvas.findByText('Bug Investigation')).toBeInTheDocument();

      // Should not show others
      const projectPlanningButtons = canvas.queryAllByRole('button').filter((btn) =>
        btn.textContent?.includes('Project Planning Discussion')
      );
      await expect(projectPlanningButtons.length).toBe(0);
    });

    await step('Shows no results message when no matches', async () => {
      const searchInput = canvas.getByRole('searchbox');
      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, 'xyz123notfound');

      // Use findByText as the content updates after typing
      await expect(await canvas.findByText(/no conversations found/i)).toBeInTheDocument();
    });
  }
};

// Few Conversations
export const FewConversations: Story = {
  render: () => {
    const [activeId, setActiveId] = useState('1');

    return (
      <div className="h-[400px] border rounded-lg overflow-hidden">
        <div className="flex h-full">
          <ConversationHistory
            conversations={sampleConversations.slice(0, 2)}
            activeId={activeId}
            onSelect={setActiveId}
            onCreate={() => console.log('Create new')}
            title="Conversations"
          />
          <div className="flex-1 flex items-center justify-center bg-muted/10">
            <p className="text-sm text-muted-foreground">Chat content</p>
          </div>
        </div>
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
        story: 'Conversation history with fewer items.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders with limited conversations', async () => {
      await expect(canvas.getByText('Project Planning Discussion')).toBeInTheDocument();
      await expect(canvas.getByText('Code Review Feedback')).toBeInTheDocument();
      await expect(canvas.getByText(/2 conversations/i)).toBeInTheDocument();
    });

    await step('Does not render conversations beyond slice', async () => {
      const designSystemText = canvas.queryByText('Design System Updates');
      await expect(designSystemText).not.toBeInTheDocument();
    });
  }
};

// Empty State
export const EmptyState: Story = {
  render: () => (
    <div className="h-[400px] border rounded-lg overflow-hidden">
      <div className="flex h-full">
        <ConversationHistory
          conversations={[]}
          onCreate={() => alert('Create new conversation')}
          title="Conversations"
        />
        <div className="flex-1 flex items-center justify-center bg-muted/10">
          <p className="text-sm text-muted-foreground">No conversations yet</p>
        </div>
      </div>
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
        story: 'Empty state when no conversations exist.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Shows empty state message', async () => {
      // Text appears both in component and in the render's content area
      const emptyMessages = canvas.getAllByText(/no conversations yet/i);
      await expect(emptyMessages.length).toBeGreaterThan(0);
      await expect(emptyMessages[0]).toBeInTheDocument();
    });

    await step('Shows start conversation button in empty state', async () => {
      const startButton = canvas.getByRole('button', { name: /start.*conversation/i });
      await expect(startButton).toBeInTheDocument();
    });

    await step('Shows zero conversations count', async () => {
      await expect(canvas.getByText(/0 conversations/i)).toBeInTheDocument();
    });

    await step('Header new button is accessible', async () => {
      const newButton = canvas.getAllByRole('button', { name: /new/i })[0];
      await expect(newButton).toBeInTheDocument();
    });
  }
};

// RTL
export const RTL: Story = {
  render: () => {
    const [activeId, setActiveId] = useState('1');
    const [conversations, setConversations] = useState(sampleConversations);

    const handleCreate = () => {
      const newConv: Conversation = {
        id: String(conversations.length + 1),
        title: 'New Conversation',
        titleAr: 'محادثة جديدة',
        preview: '',
        previewAr: '',
        timestamp: new Date(),
        messageCount: 0
      };
      setConversations([newConv, ...conversations]);
      setActiveId(newConv.id);
    };

    const handleDelete = (id: string) => {
      setConversations(conversations.filter((c) => c.id !== id));
    };

    const handleRename = (id: string, newTitle: string) => {
      setConversations(
        conversations.map((c) => (c.id === id ? { ...c, titleAr: newTitle } : c))
      );
    };

    return (
      <div className="flex w-full h-[600px] border rounded-lg overflow-hidden">
        <ConversationHistory
          conversations={conversations}
          activeId={activeId}
          onSelect={setActiveId}
          onCreate={handleCreate}
          onRename={handleRename}
          onDelete={handleDelete}
          onShare={(id) => alert(`مشاركة المحادثة ${id}`)}
          isRTL
          title="Conversations"
          titleAr="المحادثات"
        />
        <div className="flex-1 flex items-center justify-center bg-muted/10">
          <div className="text-center space-y-2">
            <p className="text-lg font-medium">
              نشطة: {conversations.find((c) => c.id === activeId)?.titleAr}
            </p>
            <p className="text-sm text-muted-foreground">
              محتوى الدردشة سيظهر هنا
            </p>
          </div>
        </div>
      </div>
    );
  },
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true }
  }
};
