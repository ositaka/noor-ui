import type { Meta, StoryObj } from '@storybook/react';
import { ReactionPicker, Reaction } from '../../../components/ui/reaction-picker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { useState } from 'react';

/**
 * Reaction Picker Component Stories
 *
 * All examples are taken from /app/(docs)/components/reaction-picker/page.tsx
 *
 * Note: ReactionPicker allows users to react with emojis.
 * Features: Compact/expanded variants, multiple reactions, count display, RTL-ready.
 */

const meta = {
  title: 'Data Display/Reaction Picker',
  component: ReactionPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    reactions: { control: false },
    variant: {
      control: { type: 'select' },
      options: ['compact', 'expanded'],
    },
    availableReactions: { control: false },
    maxVisible: { control: 'number' },
    onReact: { control: false },
    ariaLabel: { control: 'text' },
    className: { control: 'text' },
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en',
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
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
    },
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
    },
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
    },
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
    },
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
    },
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Shows highlighted state when user has reacted (👍 in this example).',
      },
    },
  },
};

// RTL
export const RTL: Story = {
  render: () => {
    const [reactions, setReactions] = useState<Reaction[]>([
      { emoji: '👍', count: 12, hasReacted: false },
      { emoji: '❤️', count: 5, hasReacted: true },
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
          <CardTitle>التفاعلات</CardTitle>
          <CardDescription>
            اختر تفاعلك مع المنشور
          </CardDescription>
        </CardHeader>
        <CardContent>
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
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
    },
  },
};
