import type { Meta, StoryObj } from '@storybook/react';
import { MessageActions } from '../../../components/ui/message-actions';
import { Card, CardContent } from '../../../components/ui/card';

/**
 * Message Actions Component Stories
 *
 * All examples are taken from /app/(docs)/components/message-actions/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Message Actions provides action buttons for chat messages.
 * Features: Copy, regenerate, edit, share, feedback (thumbs up/down), flag, compact mode, RTL support.
 */

const meta = {
  title: 'AI/Message Actions',
  component: MessageActions,
  parameters: {
    layout: 'centered'
  },
  tags: ['!autodocs'],
  argTypes: {
    showCopy: { control: 'boolean' },
    showRegenerate: { control: 'boolean' },
    showEdit: { control: 'boolean' },
    showShare: { control: 'boolean' },
    showFlag: { control: 'boolean' },
    showFeedback: { control: 'boolean' },
    onCopy: { control: false },
    onRegenerate: { control: false },
    onEdit: { control: false },
    onShare: { control: false },
    onFlag: { control: false },
    onThumbsUp: { control: false },
    onThumbsDown: { control: false },
    isRTL: { control: 'boolean' },
    compact: { control: 'boolean' }
  }
} satisfies Meta<typeof MessageActions>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground
export const Default: Story = {
  args: {
    showCopy: true,
    showRegenerate: false,
    showEdit: false,
    showShare: false,
    showFeedback: false,
    showFlag: false,
    compact: false
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  render: (args) => (
    <MessageActions
      {...args}
      onCopy={() => console.log('Copied!')}
      onRegenerate={() => console.log('Regenerating...')}
      onEdit={() => console.log('Editing...')}
      onShare={() => console.log('Sharing...')}
      onThumbsUp={() => console.log('Thumbs up')}
      onThumbsDown={() => console.log('Thumbs down')}
      onFlag={() => console.log('Flagged')}
    />
  ),
  parameters: {
    docs: {
      story: {
        inline: false
      }
    }
  }
};

// Full Featured - from component page lines 262-276
export const FullFeatured: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <MessageActions
          showCopy
          showRegenerate
          showEdit
          showShare
          showFeedback
          showFlag
          onCopy={() => alert('Copied to clipboard')}
          onRegenerate={() => alert('Regenerating response')}
          onEdit={() => alert('Edit mode')}
          onShare={() => alert('Share dialog')}
          onThumbsUp={() => alert('Positive feedback')}
          onThumbsDown={() => alert('Negative feedback')}
          onFlag={() => alert('Report dialog')}
        />
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
      disable: true,
      description: {
        story: 'Message actions with all features enabled.'
      }
    }
  }
};

// For Assistant Messages - from component page lines 293-301
export const ForAssistantMessages: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Typical actions for AI assistant responses:
          </p>
          <MessageActions
            showCopy
            showRegenerate
            showFeedback
            onCopy={() => alert('Copied AI response')}
            onRegenerate={() => alert('Regenerating AI response')}
            onThumbsUp={() => alert('Good response')}
            onThumbsDown={() => alert('Bad response')}
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
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Message actions for AI assistant messages with copy, regenerate, and feedback.'
      }
    }
  }
};

// For User Messages - from component page lines 319-324
export const ForUserMessages: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Typical actions for user messages:
          </p>
          <MessageActions
            showCopy
            showEdit
            onCopy={() => alert('Copied user message')}
            onEdit={() => alert('Edit user message')}
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
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Message actions for user messages with copy and edit.'
      }
    }
  }
};

// Compact Mode - from component page lines 342-350
export const CompactMode: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Use compact mode for space-constrained layouts:
          </p>
          <MessageActions
            showCopy
            showRegenerate
            showEdit
            compact
            onCopy={() => alert('Copied')}
            onRegenerate={() => alert('Regenerating')}
            onEdit={() => alert('Editing')}
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
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Compact variant for dense layouts.'
      }
    }
  }
};

// Copy Only
export const CopyOnly: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Minimal actions - just copy:
          </p>
          <MessageActions
            showCopy
            onCopy={() => alert('Copied to clipboard')}
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
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Just the copy action.'
      }
    }
  }
};

// With Feedback Only
export const WithFeedbackOnly: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Feedback thumbs up/down only:
          </p>
          <MessageActions
            showFeedback
            onThumbsUp={() => alert('Positive feedback')}
            onThumbsDown={() => alert('Negative feedback')}
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
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Just thumbs up/down feedback actions.'
      }
    }
  }
};

// With Share and Flag
export const WithShareAndFlag: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Share and report actions:
          </p>
          <MessageActions
            showCopy
            showShare
            showFlag
            onCopy={() => alert('Copied')}
            onShare={() => alert('Share dialog opened')}
            onFlag={() => alert('Report dialog opened')}
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
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Message actions with share and flag options.'
      }
    }
  }
};

// RTL Default - from component page lines 422-430
export const RTLDefault: Story = {
  render: () => (
    <div dir="rtl">
      <MessageActions
        showCopy
        showRegenerate
        showEdit
        isRTL
        onCopy={() => {}}
        onRegenerate={() => {}}
        onEdit={() => {}}
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
      disable: true,
      description: {
        story: 'Message actions in RTL layout.'
      }
    }
  }
};

// RTL With All Features
export const RTLWithAllFeatures: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <MessageActions
          showCopy
          showRegenerate
          showEdit
          showShare
          showFeedback
          showFlag
          isRTL
          onCopy={() => alert('تم النسخ')}
          onRegenerate={() => alert('جارٍ إعادة الإنشاء')}
          onEdit={() => alert('وضع التحرير')}
          onShare={() => alert('فتح مربع المشاركة')}
          onThumbsUp={() => alert('تقييم إيجابي')}
          onThumbsDown={() => alert('تقييم سلبي')}
          onFlag={() => alert('فتح مربع الإبلاغ')}
        />
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'All message actions in RTL with Arabic alerts.'
      }
    }
  }
};
