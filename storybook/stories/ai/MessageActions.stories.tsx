import type { Meta, StoryObj } from '@storybook/react';
import { within, expect, userEvent, fn } from 'storybook/test';
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
    compact: false,
    onCopy: fn(),
    onRegenerate: fn(),
    onEdit: fn(),
    onShare: fn(),
    onThumbsUp: fn(),
    onThumbsDown: fn(),
    onFlag: fn()
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    docs: {
      story: {
        inline: false
      }
    }
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('Renders copy button', async () => {
      const copyButton = canvas.getByRole('button', { name: /copy/i });
      await expect(copyButton).toBeInTheDocument();
      await expect(copyButton).toBeVisible();
    });

    await step('Handles copy click and shows "Copied" state', async () => {
      const copyButton = canvas.getByRole('button', { name: /copy/i });
      await userEvent.click(copyButton);
      await expect(args.onCopy).toHaveBeenCalledTimes(1);

      // Verify button text changes to "Copied" (wait for state change)
      await expect(await canvas.findByRole('button', { name: /copied/i })).toBeInTheDocument();
    });

    await step('Keyboard accessible', async () => {
      const copyButton = canvas.getByRole('button', { name: /copied/i });
      copyButton.focus();
      await expect(copyButton).toHaveFocus();

      await userEvent.keyboard('{Enter}');
      await expect(args.onCopy).toHaveBeenCalledTimes(2);
    });
  }
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Message actions with all features enabled.'
      }
    }
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('Renders all action buttons', async () => {
      await expect(canvas.getByRole('button', { name: /copy/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /regenerate/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /edit/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /share/i })).toBeInTheDocument();

      // Feedback buttons have sr-only labels - use accessible names
      await expect(canvas.getByRole('button', { name: 'Like' })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: 'Dislike' })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: 'Report' })).toBeInTheDocument();
    });

    await step('Copy button works', async () => {
      await userEvent.click(canvas.getByRole('button', { name: /copy/i }));
      await expect(args.onCopy).toHaveBeenCalledTimes(1);
    });

    await step('Regenerate button works', async () => {
      await userEvent.click(canvas.getByRole('button', { name: /regenerate/i }));
      await expect(args.onRegenerate).toHaveBeenCalledTimes(1);
    });

    await step('Edit button works', async () => {
      await userEvent.click(canvas.getByRole('button', { name: /edit/i }));
      await expect(args.onEdit).toHaveBeenCalledTimes(1);
    });

    await step('Share button works', async () => {
      await userEvent.click(canvas.getByRole('button', { name: /share/i }));
      await expect(args.onShare).toHaveBeenCalledTimes(1);
    });

    await step('Thumbs up feedback toggles state', async () => {
      const thumbsUpButton = canvas.getByRole('button', { name: 'Like' });

      await userEvent.click(thumbsUpButton);
      await expect(args.onThumbsUp).toHaveBeenCalledTimes(1);

      // Click again to toggle off
      await userEvent.click(thumbsUpButton);
      await expect(args.onThumbsUp).toHaveBeenCalledTimes(2);
    });

    await step('Thumbs down feedback works', async () => {
      const thumbsDownButton = canvas.getByRole('button', { name: 'Dislike' });

      await userEvent.click(thumbsDownButton);
      await expect(args.onThumbsDown).toHaveBeenCalledTimes(1);
    });

    await step('Flag/report button works', async () => {
      const flagButton = canvas.getByRole('button', { name: 'Report' });

      await userEvent.click(flagButton);
      await expect(args.onFlag).toHaveBeenCalledTimes(1);
    });
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Message actions for AI assistant messages with copy, regenerate, and feedback.'
      }
    }
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('Renders assistant message actions', async () => {
      await expect(canvas.getByText(/typical actions for ai assistant responses/i)).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /copy/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /regenerate/i })).toBeInTheDocument();
    });

    await step('Copy and regenerate interactions work', async () => {
      await userEvent.click(canvas.getByRole('button', { name: /copy/i }));
      await expect(args.onCopy).toHaveBeenCalledTimes(1);

      await userEvent.click(canvas.getByRole('button', { name: /regenerate/i }));
      await expect(args.onRegenerate).toHaveBeenCalledTimes(1);
    });
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Message actions for user messages with copy and edit.'
      }
    }
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('Renders user message actions', async () => {
      await expect(canvas.getByText(/typical actions for user messages/i)).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /copy/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    });

    await step('Copy and edit interactions work', async () => {
      await userEvent.click(canvas.getByRole('button', { name: /copy/i }));
      await expect(args.onCopy).toHaveBeenCalledTimes(1);

      await userEvent.click(canvas.getByRole('button', { name: /edit/i }));
      await expect(args.onEdit).toHaveBeenCalledTimes(1);
    });
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
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('Renders compact mode buttons (icon-only)', async () => {
      await expect(canvas.getByText(/use compact mode for space-constrained layouts/i)).toBeInTheDocument();

      // In compact mode, buttons are icon-only, so we need to get all buttons
      const buttons = canvas.getAllByRole('button');
      // Should have 3 buttons (copy, regenerate, edit)
      await expect(buttons).toHaveLength(3);
    });

    await step('Compact buttons are interactive', async () => {
      const buttons = canvas.getAllByRole('button');

      // Click each button
      await userEvent.click(buttons[0]);
      await userEvent.click(buttons[1]);
      await userEvent.click(buttons[2]);

      // Verify all callbacks were called
      await expect(args.onCopy).toHaveBeenCalledTimes(1);
      await expect(args.onRegenerate).toHaveBeenCalledTimes(1);
      await expect(args.onEdit).toHaveBeenCalledTimes(1);
    });
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Just the copy action.'
      }
    }
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('Renders only copy button', async () => {
      const copyButton = canvas.getByRole('button', { name: /copy/i });
      await expect(copyButton).toBeInTheDocument();

      // Verify only one button exists
      const buttons = canvas.getAllByRole('button');
      await expect(buttons).toHaveLength(1);
    });

    await step('Copy button works', async () => {
      await userEvent.click(canvas.getByRole('button', { name: /copy/i }));
      await expect(args.onCopy).toHaveBeenCalledTimes(1);
    });
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Message actions with share and flag options.'
      }
    }
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('Renders copy, share, and flag buttons', async () => {
      await expect(canvas.getByRole('button', { name: /copy/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /share/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: 'Report' })).toBeInTheDocument();
    });

    await step('All buttons work', async () => {
      await userEvent.click(canvas.getByRole('button', { name: /copy/i }));
      await expect(args.onCopy).toHaveBeenCalledTimes(1);

      await userEvent.click(canvas.getByRole('button', { name: /share/i }));
      await expect(args.onShare).toHaveBeenCalledTimes(1);

      const flagButton = canvas.getByRole('button', { name: 'Report' });
      await userEvent.click(flagButton);
      await expect(args.onFlag).toHaveBeenCalledTimes(1);
    });
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
      description: {
        story: 'Message actions in RTL layout.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders in RTL context', async () => {
      // In Arabic locale, button labels are in Arabic
      const buttons = canvas.getAllByRole('button');
      await expect(buttons.length).toBeGreaterThan(0);
      await expect(buttons[0]).toBeInTheDocument();
    });

    await step('Interaction works in RTL', async () => {
      const buttons = canvas.getAllByRole('button');
      await userEvent.click(buttons[0]);
      // Just verify it's clickable without errors
    });
  }
};

// RTL With All Features
export const RTLWithAllFeatures: Story = {
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
          isRTL
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
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'All message actions in RTL with Arabic alerts.'
      }
    }
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('Renders all buttons in RTL context', async () => {
      const buttons = canvas.getAllByRole('button');
      // Should have 7 buttons (copy, regenerate, edit, share, thumbs up, thumbs down, flag)
      await expect(buttons).toHaveLength(7);
    });

    await step('All interactions work in RTL', async () => {
      const buttons = canvas.getAllByRole('button');

      // Test first few buttons to verify RTL doesn't break functionality
      await userEvent.click(buttons[0]);
      await userEvent.click(buttons[1]);
      await userEvent.click(buttons[2]);

      // Verify callbacks were invoked
      await expect(args.onCopy).toHaveBeenCalled();
      await expect(args.onRegenerate).toHaveBeenCalled();
    });
  }
};
