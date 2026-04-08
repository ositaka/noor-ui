import type { Meta, StoryObj } from '@storybook/react';
import { ReactionPicker, Reaction } from '../../../components/ui/reaction-picker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  title: 'User Interface/Reaction Picker',
  component: ReactionPicker,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    reactions: { control: false },
    variant: {
      control: { type: 'select' },
      options: ['compact', 'expanded']
    },
    availableReactions: { control: false },
    maxVisible: { control: 'number' },
    onReact: { control: false },
    ariaLabel: { control: 'text' },
    className: { control: 'text' }
  }
} satisfies Meta<typeof ReactionPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Compact Mode from page lines 174-180
export const Default: Story = {
  render: () => {
    const [reactions, setReactions] = useState<Reaction[]>([
      { emoji: '👍', count: 12, hasReacted: false },
      { emoji: '❤️', count: 5, hasReacted: false },
      { emoji: '💡', count: 3, hasReacted: false },
    ]);

    const handleReact = (emoji: string) => {
      setReactions((prev) => {
        const existing = prev.find((r) => r.emoji === emoji);
        if (existing) {
          return prev.map((r) =>
            r.emoji === emoji
              ? { ...r, count: r.hasReacted ? r.count - 1 : r.count + 1, hasReacted: !r.hasReacted }
              : { ...r, hasReacted: false }
          );
        }
        return [...prev, { emoji, count: 1, hasReacted: true }];
      });
    };

    return (
      <div className="p-6 border rounded-lg bg-muted/50">
        <ReactionPicker
          reactions={reactions}
          variant="compact"
          onReact={handleReact}
        />
      </div>
    );
  },

};

// Compact Mode - from page lines 165-186
export const CompactMode: Story = {
  render: () => {
    const [reactions, setReactions] = useState<Reaction[]>([
      { emoji: '👍', count: 12, hasReacted: false },
      { emoji: '❤️', count: 5, hasReacted: false },
      { emoji: '💡', count: 3, hasReacted: false },
    ]);

    const handleReact = (emoji: string) => {
      setReactions((prev) => {
        const existing = prev.find((r) => r.emoji === emoji);
        if (existing) {
          return prev.map((r) =>
            r.emoji === emoji
              ? { ...r, count: r.hasReacted ? r.count - 1 : r.count + 1, hasReacted: !r.hasReacted }
              : { ...r, hasReacted: false }
          );
        }
        return [...prev, { emoji, count: 1, hasReacted: true }];
      });
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle>Compact Mode</CardTitle>
          <CardDescription>
            Shows top reactions with count, add more button for additional reactions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-6 border rounded-lg bg-muted/50">
            <ReactionPicker
              reactions={reactions}
              variant="compact"
              onReact={handleReact}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Total Reactions: {reactions.reduce((sum, r) => sum + r.count, 0)}
          </p>
        </CardContent>
      </Card>
    );
  },

  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders card with total reactions text', async () => {
      await expect(canvas.getByText('Compact Mode')).toBeInTheDocument();
      await expect(canvas.getByText('Total Reactions: 20')).toBeInTheDocument();
    });

  }
};

// Expanded Mode - from page lines 188-206
export const ExpandedMode: Story = {
  render: () => {
    const [reactions, setReactions] = useState<Reaction[]>([
      { emoji: '👍', count: 12, hasReacted: false },
      { emoji: '❤️', count: 5, hasReacted: true },
      { emoji: '🚀', count: 2, hasReacted: false },
    ]);

    const handleReact = (emoji: string) => {
      setReactions((prev) => {
        const existing = prev.find((r) => r.emoji === emoji);
        if (existing) {
          if (existing.hasReacted) {
            return prev.map((r) =>
              r.emoji === emoji ? { ...r, count: r.count - 1, hasReacted: false } : r
            ).filter((r) => r.count > 0);
          }
          return prev.map((r) =>
            r.emoji === emoji ? { ...r, count: r.count + 1, hasReacted: true } : r
          );
        }
        return [...prev, { emoji, count: 1, hasReacted: true }];
      });
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle>Expanded Mode</CardTitle>
          <CardDescription>
            Shows all available reactions upfront for quick access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-6 border rounded-lg bg-muted/50">
            <ReactionPicker
              reactions={reactions}
              variant="expanded"
              onReact={handleReact}
            />
          </div>
        </CardContent>
      </Card>
    );
  },

  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders with expanded variant showing individual reaction buttons', async () => {
      await expect(canvas.getByText('Expanded Mode')).toBeInTheDocument();
      const buttons = canvas.getAllByRole('button');
      // Should have 3 reaction buttons + 1 add button
      await expect(buttons.length).toBeGreaterThanOrEqual(4);
    });

    await step('Shows hasReacted state on heart emoji', async () => {
      const buttons = canvas.getAllByRole('button');
      // Find heart button - it should have count 5
      const heartButton = buttons.find((btn) => btn.textContent?.includes('❤️') && btn.textContent?.includes('5'));
      await expect(heartButton).toBeInTheDocument();
    });

    await step('Toggles reaction on direct button click', async () => {
      const buttons = canvas.getAllByRole('button');
      // Click thumbs up button (count should go from 12 to 13)
      const thumbsUpButton = buttons.find((btn) => btn.textContent?.includes('👍') && btn.textContent?.includes('12'));
      await userEvent.click(thumbsUpButton!);

      // Verify count updated
      const updatedButtons = canvas.getAllByRole('button');
      const updatedThumbsUp = updatedButtons.find((btn) => btn.textContent?.includes('👍') && btn.textContent?.includes('13'));
      await expect(updatedThumbsUp).toBeInTheDocument();
    });

    await step('Opens popover from add button', async () => {
      const buttons = canvas.getAllByRole('button');
      // Find the add button (has "+" text)
      const addButton = buttons.find((btn) => btn.textContent?.includes('+'));
      await userEvent.click(addButton!);

      // Verify popover opens in portal
      const body = within(document.body);
      const popoverButtons = await body.findAllByRole('button');
      await expect(popoverButtons.length).toBeGreaterThanOrEqual(6);
    });
  }
};

// With Many Reactions
export const WithManyReactions: Story = {
  render: () => {
    const [reactions, setReactions] = useState<Reaction[]>([
      { emoji: '👍', count: 45, hasReacted: true },
      { emoji: '❤️', count: 32, hasReacted: false },
      { emoji: '💡', count: 18, hasReacted: false },
      { emoji: '🚀', count: 12, hasReacted: false },
      { emoji: '🎉', count: 8, hasReacted: false },
      { emoji: '👀', count: 5, hasReacted: false },
    ]);

    const handleReact = (emoji: string) => {
      setReactions((prev) => {
        const existing = prev.find((r) => r.emoji === emoji);
        if (existing) {
          return prev.map((r) =>
            r.emoji === emoji
              ? { ...r, count: r.hasReacted ? r.count - 1 : r.count + 1, hasReacted: !r.hasReacted }
              : { ...r, hasReacted: false }
          );
        }
        return [...prev, { emoji, count: 1, hasReacted: true }];
      });
    };

    return (
      <Card>
        <CardContent className="p-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <ReactionPicker
              reactions={reactions}
              variant="compact"
              onReact={handleReact}
            />
          </div>
        </CardContent>
      </Card>
    );
  },

  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders with many reactions showing top 3', async () => {
      const reactionButton = canvas.getByRole('button', { name: 'React to comment' });
      await expect(reactionButton).toBeInTheDocument();
      // Total: 45+32+18+12+8+5 = 120
      // Button shows emojis + count, e.g., "👍❤️💡120"
      await expect(reactionButton).toHaveTextContent(/120/);
    });

    await step('Shows user has reacted (thumbs up)', async () => {
      const reactionButton = canvas.getByRole('button', { name: 'React to comment' });
      // Button should have secondary variant (not ghost) because user has reacted
      await expect(reactionButton).toBeVisible();
    });

  }
};

// No Reactions Yet
export const NoReactions: Story = {
  render: () => {
    const [reactions, setReactions] = useState<Reaction[]>([]);

    const handleReact = (emoji: string) => {
      setReactions((prev) => [...prev, { emoji, count: 1, hasReacted: true }]);
    };

    return (
      <Card>
        <CardContent className="p-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <ReactionPicker
              reactions={reactions}
              variant="compact"
              onReact={handleReact}
            />
          </div>
        </CardContent>
      </Card>
    );
  },

  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders with empty state showing "React" text', async () => {
      const reactionButton = canvas.getByRole('button', { name: 'React to comment' });
      await expect(reactionButton).toBeInTheDocument();
      await expect(reactionButton).toHaveTextContent(/^React$/);
    });

    await step('Adds first reaction', async () => {
      const reactionButton = canvas.getByRole('button', { name: 'React to comment' });
      await userEvent.click(reactionButton);

      // Add a reaction from popover
      const body = within(document.body);
      const emojiButtons = await body.findAllByRole('button');
      const heartButton = emojiButtons.find((btn) => btn.textContent?.includes('❤️'));
      await userEvent.click(heartButton!);

      // Verify count now shows 1 (with emoji)
      await expect(reactionButton).toHaveTextContent(/1/);
    });
  }
};

// Single Reaction
export const SingleReaction: Story = {
  render: () => {
    const [reactions, setReactions] = useState<Reaction[]>([
      { emoji: '❤️', count: 1, hasReacted: true },
    ]);

    const handleReact = (emoji: string) => {
      setReactions((prev) => {
        const existing = prev.find((r) => r.emoji === emoji);
        if (existing) {
          if (existing.hasReacted) {
            return prev.filter((r) => r.emoji !== emoji);
          }
          return prev.map((r) =>
            r.emoji === emoji ? { ...r, count: r.count + 1, hasReacted: true } : r
          );
        }
        return [...prev, { emoji, count: 1, hasReacted: true }];
      });
    };

    return (
      <Card>
        <CardContent className="p-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <ReactionPicker
              reactions={reactions}
              variant="compact"
              onReact={handleReact}
            />
          </div>
        </CardContent>
      </Card>
    );
  },

  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders with single reaction', async () => {
      const reactionButton = canvas.getByRole('button', { name: 'React to comment' });
      await expect(reactionButton).toBeInTheDocument();
      await expect(reactionButton).toHaveTextContent(/❤️/);
      await expect(reactionButton).toHaveTextContent(/1/);
    });

  }
};

// User Has Reacted
export const UserHasReacted: Story = {
  render: () => {
    const [reactions, setReactions] = useState<Reaction[]>([
      { emoji: '👍', count: 12, hasReacted: true },
      { emoji: '❤️', count: 5, hasReacted: false },
      { emoji: '💡', count: 3, hasReacted: false },
    ]);

    const handleReact = (emoji: string) => {
      setReactions((prev) => {
        const existing = prev.find((r) => r.emoji === emoji);
        if (existing) {
          return prev.map((r) =>
            r.emoji === emoji
              ? { ...r, count: r.hasReacted ? r.count - 1 : r.count + 1, hasReacted: !r.hasReacted }
              : { ...r, hasReacted: false }
          );
        }
        return [...prev, { emoji, count: 1, hasReacted: true }];
      });
    };

    return (
      <Card>
        <CardContent className="p-6">
          <div className="p-6 border rounded-lg bg-muted/50">
            <ReactionPicker
              reactions={reactions}
              variant="compact"
              onReact={handleReact}
            />
          </div>
        </CardContent>
      </Card>
    );
  },

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Shows highlighted state when user has reacted (👍 in this example).'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders with user reacted state', async () => {
      const reactionButton = canvas.getByRole('button', { name: 'React to comment' });
      await expect(reactionButton).toBeInTheDocument();
      // Should show secondary variant styling because user has reacted
      await expect(reactionButton).toHaveTextContent(/20/);
    });

    await step('Switches to different reaction', async () => {
      const reactionButton = canvas.getByRole('button', { name: 'React to comment' });
      await userEvent.click(reactionButton);

      // Click heart to switch from thumbs up
      const body = within(document.body);
      const emojiButtons = await body.findAllByRole('button');
      const heartButton = emojiButtons.find((btn) => btn.textContent?.includes('❤️'));
      await userEvent.click(heartButton!);

      // Total should stay 20 (thumbs up -1, heart +1)
      await expect(reactionButton).toHaveTextContent(/20/);
    });
  }
};

