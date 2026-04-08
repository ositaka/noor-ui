import type { Meta, StoryObj } from '@storybook/react';
import { Blockquote } from '../../../components/ui/blockquote';

const meta = {
  title: 'Data Display/Blockquote',
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
  render: (args, { globals }) => {
    return (
    <div className="w-full max-w-2xl">
      <Blockquote {...args} />
    </div>
    );
  },
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
