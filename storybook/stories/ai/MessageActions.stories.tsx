import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { MessageActions } from '../../../components/ui/message-actions';
import { Card, CardContent } from '../../../components/ui/card';

const meta = {
  title: 'AI-LLM Shell/Message Actions',
  component: MessageActions,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
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
    compact: false,
    onCopy: fn(),
    onRegenerate: fn(),
    onEdit: fn(),
    onShare: fn(),
    onThumbsUp: fn(),
    onThumbsDown: fn(),
    onFlag: fn()
  },
};

// Full Featured - from component page lines 262-276
export const FullFeatured: Story = {
  args: {
    onCopy: fn(),
    onRegenerate: fn(),
    onEdit: fn(),
    onShare: fn(),
    onThumbsUp: fn(),
    onThumbsDown: fn(),
    onFlag: fn()
  },
  render: (args) => (
    <Card>
      <CardContent className="p-6">
        <MessageActions
          showCopy
          showRegenerate
          showEdit
          showShare
          showFeedback
          showFlag
          onCopy={args.onCopy}
          onRegenerate={args.onRegenerate}
          onEdit={args.onEdit}
          onShare={args.onShare}
          onThumbsUp={args.onThumbsUp}
          onThumbsDown={args.onThumbsDown}
          onFlag={args.onFlag}
        />
      </CardContent>
    </Card>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Message actions with all features enabled.'
      }
    }
  }
};

// For Assistant Messages - from component page lines 293-301
export const ForAssistantMessages: Story = {
  args: {
    onCopy: fn(),
    onRegenerate: fn(),
    onThumbsUp: fn(),
    onThumbsDown: fn()
  },
  render: (args) => (
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
            onCopy={args.onCopy}
            onRegenerate={args.onRegenerate}
            onThumbsUp={args.onThumbsUp}
            onThumbsDown={args.onThumbsDown}
          />
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Message actions for AI assistant messages with copy, regenerate, and feedback.'
      }
    }
  }
};

// For User Messages - from component page lines 319-324
export const ForUserMessages: Story = {
  args: {
    onCopy: fn(),
    onEdit: fn()
  },
  render: (args) => (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Typical actions for user messages:
          </p>
          <MessageActions
            showCopy
            showEdit
            onCopy={args.onCopy}
            onEdit={args.onEdit}
          />
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Message actions for user messages with copy and edit.'
      }
    }
  }
};

// Compact Mode - from component page lines 342-350
export const CompactMode: Story = {
  args: {
    onCopy: fn(),
    onRegenerate: fn(),
    onEdit: fn()
  },
  render: (args) => (
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
            onCopy={args.onCopy}
            onRegenerate={args.onRegenerate}
            onEdit={args.onEdit}
          />
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Compact variant for dense layouts.'
      }
    }
  }
};

// Copy Only
export const CopyOnly: Story = {
  args: {
    onCopy: fn()
  },
  render: (args) => (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Minimal actions - just copy:
          </p>
          <MessageActions
            showCopy
            onCopy={args.onCopy}
          />
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Just the copy action.'
      }
    }
  }
};

// With Feedback Only
export const WithFeedbackOnly: Story = {
  args: {
    onThumbsUp: fn(),
    onThumbsDown: fn()
  },
  render: (args) => (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Feedback thumbs up/down only:
          </p>
          <MessageActions
            showFeedback
            onThumbsUp={args.onThumbsUp}
            onThumbsDown={args.onThumbsDown}
          />
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Just thumbs up/down feedback actions.'
      }
    }
  }
};

// With Share and Flag
export const WithShareAndFlag: Story = {
  args: {
    onCopy: fn(),
    onShare: fn(),
    onFlag: fn()
  },
  render: (args) => (
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
            onCopy={args.onCopy}
            onShare={args.onShare}
            onFlag={args.onFlag}
          />
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Message actions with share and flag options.'
      }
    }
  }
};

