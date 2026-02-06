import type { Meta, StoryObj } from '@storybook/react';
import { within, expect, userEvent, fn } from 'storybook/test';
import { ChatMessage } from '../../../components/ui/chat-message';

/**
 * Chat Message Component Stories
 *
 * All examples are taken from /app/(docs)/components/chat-message/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Chat Message displays AI chat messages with different roles.
 * Features: User/assistant/system roles, copy/regenerate actions, streaming state, RTL support.
 */

const meta = {
  title: 'AI/Chat Message',
  component: ChatMessage,
  parameters: {
    layout: 'centered'
  },
  tags: ['!autodocs'],
  argTypes: {
    role: {
      control: { type: 'select' },
      options: ['user', 'assistant', 'system']
    },
    content: { control: 'text' },
    variant: {
      control: { type: 'select' },
      options: ['default', 'compact']
    },
    state: {
      control: { type: 'select' },
      options: ['complete', 'streaming', 'error']
    },
    timestamp: { control: 'text' },
    avatar: { control: 'text' },
    name: { control: 'text' },
    showCopy: { control: 'boolean' },
    showRegenerate: { control: 'boolean' },
    isRTL: { control: 'boolean' },
    onCopy: { control: false },
    onRegenerate: { control: false }
  }
} satisfies Meta<typeof ChatMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground
export const Default: Story = {
  args: {
    role: 'assistant',
    content: 'Hello! How can I help you today?',
    timestamp: '2:30 PM'
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  render: (args) => (
    <div className="w-full max-w-2xl">
      <ChatMessage {...args} />
    </div>
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

    await step('Renders assistant message correctly', async () => {
      await expect(canvas.getByText('Hello! How can I help you today?')).toBeInTheDocument();
      await expect(canvas.getByText('2:30 PM')).toBeInTheDocument();
    });

    await step('Shows avatar with assistant icon', async () => {
      // Avatar uses img role when AvatarImage is present, or fallback content
      const message = canvasElement.querySelector('div[class*="group"]');
      await expect(message).toBeInTheDocument();
      // Check for Bot icon in fallback
      const svg = canvasElement.querySelector('svg');
      await expect(svg).toBeInTheDocument();
    });

    await step('Message content is visible', async () => {
      const content = canvas.getByText('Hello! How can I help you today?');
      await expect(content).toBeVisible();
    });
  }
};

// Assistant Message - from code lines 97-103
export const AssistantMessage: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <ChatMessage
        role="assistant"
        content="Hello! How can I help you today?"
        timestamp="2:30 PM"
      />
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
        story: 'Assistant message with timestamp.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders assistant message', async () => {
      await expect(canvas.getByText('Hello! How can I help you today?')).toBeInTheDocument();
      await expect(canvas.getByText('2:30 PM')).toBeInTheDocument();
    });
  }
};

// User Message - from code lines 105-109
export const UserMessage: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <ChatMessage
        role="user"
        content="What's the weather like today?"
        timestamp="2:29 PM"
      />
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
        story: 'User message with timestamp.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders user message', async () => {
      await expect(canvas.getByText(/weather like today/)).toBeInTheDocument();
      await expect(canvas.getByText('2:29 PM')).toBeInTheDocument();
    });
  }
};

// System Message - from code lines 111-115
export const SystemMessage: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <ChatMessage
        role="system"
        content="Chat session started. Messages are end-to-end encrypted."
        timestamp="2:25 PM"
      />
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
        story: 'System message for notifications.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders system message', async () => {
      await expect(canvas.getByText(/Chat session started/)).toBeInTheDocument();
      await expect(canvas.getByText('2:25 PM')).toBeInTheDocument();
    });
  }
};

// With Actions - from code lines 117-125
export const WithActions: Story = {
  render: (args) => (
    <div className="w-full max-w-2xl">
      <ChatMessage
        role="assistant"
        content="Here's the code you requested..."
        timestamp="2:31 PM"
        showCopy={true}
        showRegenerate={true}
        onCopy={args.onCopy}
        onRegenerate={args.onRegenerate}
      />
    </div>
  ),
  args: {
    onCopy: fn(),
    onRegenerate: fn()
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Assistant message with copy and regenerate actions.'
      }
    }
  }
};

// Compact Variant - from code lines 127-131
export const CompactVariant: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <ChatMessage
        role="assistant"
        content="Quick response"
        variant="compact"
      />
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
        story: 'Compact variant for dense layouts.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders compact variant', async () => {
      await expect(canvas.getByText('Quick response')).toBeInTheDocument();
    });

    await step('Compact message is visible', async () => {
      const content = canvas.getByText('Quick response');
      await expect(content).toBeVisible();
    });
  }
};

// Conversation
export const Conversation: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-4">
      <ChatMessage
        role="user"
        content="What's the weather like today?"
        timestamp="2:29 PM"
      />
      <ChatMessage
        role="assistant"
        content="I'll check the weather for you. Could you tell me your location?"
        timestamp="2:30 PM"
        showCopy={true}
      />
      <ChatMessage
        role="user"
        content="I'm in Dubai."
        timestamp="2:31 PM"
      />
      <ChatMessage
        role="assistant"
        content="In Dubai, it's currently sunny with a temperature of 28°C (82°F). Perfect weather for outdoor activities!"
        timestamp="2:32 PM"
        showCopy={true}
        showRegenerate={true}
      />
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
        story: 'Complete conversation with alternating messages.'
      }
    }
  }
};

// RTL Assistant - from code lines 133-138
export const RTLAssistant: Story = {
  render: () => (
    <div className="w-96 max-w-2xl">
      <ChatMessage
        role="assistant"
        content="مرحباً! كيف يمكنني مساعدتك اليوم؟"
        timestamp="٢:٣٠ م"
        isRTL={true}
      />
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Assistant message in RTL with Arabic text.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders in RTL context', async () => {
      await expect(canvas.getByText(/مرحباً/)).toBeInTheDocument();
      await expect(canvas.getByText(/٢:٣٠ م/)).toBeInTheDocument();
    });

    await step('Arabic content is visible', async () => {
      const content = canvas.getByText(/مرحباً/);
      await expect(content).toBeVisible();
    });
  }
};

// RTL User
export const RTLUser: Story = {
  render: () => (
    <div className="w-96 max-w-2xl">
      <ChatMessage
        role="user"
        content="ما هو الطقس اليوم؟"
        timestamp="٢:٢٩ م"
        isRTL={true}
      />
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'User message in RTL with Arabic text.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders user message in RTL', async () => {
      await expect(canvas.getByText(/ما هو الطقس/)).toBeInTheDocument();
      await expect(canvas.getByText(/٢:٢٩ م/)).toBeInTheDocument();
    });
  }
};

// RTL Conversation
export const RTLConversation: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-4">
      <ChatMessage
        role="user"
        content="ما هو الطقس اليوم؟"
        timestamp="٢:٢٩ م"
        isRTL={true}
      />
      <ChatMessage
        role="assistant"
        content="سأتحقق من الطقس لك. هل يمكنك إخباري بموقعك؟"
        timestamp="٢:٣٠ م"
        isRTL={true}
        showCopy={true}
      />
      <ChatMessage
        role="user"
        content="أنا في دبي."
        timestamp="٢:٣١ م"
        isRTL={true}
      />
      <ChatMessage
        role="assistant"
        content="في دبي، الطقس مشمس حالياً بدرجة حرارة ٢٨ درجة مئوية. طقس مثالي للأنشطة الخارجية!"
        timestamp="٢:٣٢ م"
        isRTL={true}
        showCopy={true}
        showRegenerate={true}
      />
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Complete Arabic conversation in RTL.'
      }
    }
  }
};
