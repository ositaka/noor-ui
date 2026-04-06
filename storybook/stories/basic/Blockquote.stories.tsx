import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { Blockquote } from '../../../components/ui/blockquote';

/**
 * Blockquote Component Stories
 *
 * All examples are taken from /app/(docs)/components/blockquote/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Blockquote supports 3 variants: default, accent, and subtle
 */

const meta = {
  title: 'Basic/Blockquote',
  component: Blockquote,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Blockquote>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls
export const Default: Story = {
  args: {
    children: 'The important thing is not to stop questioning. Curiosity has its own reason for existing.',
    author: 'Albert Einstein',
    source: 'On Science',
    variant: 'default'
  },
  parameters: {
    ar: {
      args: {
        children: 'الشيء المهم هو عدم التوقف عن طرح الأسئلة. للفضول سببه الخاص للوجود.',
        author: 'ألبرت أينشتاين',
        source: 'عن العلم'
      }
    }
  },
  render: (args) => (
    <div className="w-full max-w-2xl">
      <Blockquote {...args} />
    </div>
  ),
};

// Accent Variant - from component page lines 118-121
export const AccentVariant: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Blockquote variant="accent" author="Steve Jobs">
        Innovation distinguishes between a leader and a follower.
      </Blockquote>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders accent variant', async () => {
      const blockquote = canvas.getByText(/Innovation distinguishes between a leader/i);
      await expect(blockquote).toBeInTheDocument();
    });

    await step('Shows quote icon for accent variant', async () => {
      const figure = canvas.getByRole('figure');
      const svg = figure.querySelector('svg');
      await expect(svg).toBeInTheDocument();
    });
  }
};

// Subtle Variant - from component page lines 129-132
export const SubtleVariant: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Blockquote variant="subtle" author="Maya Angelou">
        We delight in the beauty of the butterfly, but rarely admit the changes it has gone through to achieve that beauty.
      </Blockquote>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders subtle variant', async () => {
      const blockquote = canvas.getByText(/We delight in the beauty of the butterfly/i);
      await expect(blockquote).toBeInTheDocument();
    });

    await step('Displays author', async () => {
      const author = canvas.getByText(/Maya Angelou/i);
      await expect(author).toBeVisible();
    });
  }
};

// Without Attribution
export const WithoutAttribution: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Blockquote>
        The only way to do great work is to love what you do.
      </Blockquote>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders quote without attribution', async () => {
      const blockquote = canvas.getByText(/The only way to do great work/i);
      await expect(blockquote).toBeInTheDocument();
    });

    await step('No figcaption when no author or source', async () => {
      const figure = canvas.getByRole('figure');
      const figcaption = figure.querySelector('figcaption');
      await expect(figcaption).not.toBeInTheDocument();
    });
  }
};

// With Citation Link
export const WithCitationLink: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Blockquote
        variant="accent"
        author="Marie Curie"
        source="Scientific Papers"
        cite="https://example.com/marie-curie"
      >
        Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.
      </Blockquote>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Blockquote with clickable citation link. The source becomes a clickable link when cite prop is provided.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders quote with citation', async () => {
      const blockquote = canvas.getByText(/Nothing in life is to be feared/i);
      await expect(blockquote).toBeInTheDocument();
    });

    await step('Source is a clickable link', async () => {
      const link = canvas.getByRole('link', { name: /Scientific Papers/i });
      await expect(link).toBeInTheDocument();
      await expect(link).toHaveAttribute('href', 'https://example.com/marie-curie');
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    await step('Displays author', async () => {
      const author = canvas.getByText(/Marie Curie/i);
      await expect(author).toBeVisible();
    });
  }
};

// All Variants - showcase all blockquote types at once
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-2xl">
      <Blockquote author="Albert Einstein" source="On Science">
        The important thing is not to stop questioning. Curiosity has its own reason for existing.
      </Blockquote>

      <Blockquote variant="accent" author="Steve Jobs">
        Innovation distinguishes between a leader and a follower.
      </Blockquote>

      <Blockquote variant="subtle" author="Maya Angelou">
        We delight in the beauty of the butterfly, but rarely admit the changes it has gone through to achieve that beauty.
      </Blockquote>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  }
};
