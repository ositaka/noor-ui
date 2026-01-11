import type { Meta, StoryObj } from '@storybook/react';
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
  tags: ['!autodocs']
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  render: (args) => (
    <div className="w-full max-w-2xl">
      <Blockquote {...args} />
    </div>
  )
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// RTL Example (Default) - with Arabic quote
export const RTLExample: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Blockquote author="ألبرت أينشتاين" source="عن العلم">
        الشيء المهم هو عدم التوقف عن طرح الأسئلة. للفضول سببه الخاص للوجود.
      </Blockquote>
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
        story: 'Blockquote with Arabic text demonstrating RTL support. Border aligns to the start (right in RTL). Automatically switches to RTL mode.'
      }
    }
  }
};

// RTL Accent
export const RTLAccent: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Blockquote variant="accent" author="ستيف جوبز">
        الابتكار يميز بين القائد والتابع.
      </Blockquote>
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
        story: 'Accent variant with Arabic text in RTL mode. Quote icon aligns correctly to the end (left in RTL).'
      }
    }
  }
};

// RTL Subtle
export const RTLSubtle: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Blockquote variant="subtle" author="مايا أنجيلو">
        نحن نسعد بجمال الفراشة، لكننا نادراً ما نعترف بالتغييرات التي مرت بها لتحقيق هذا الجمال.
      </Blockquote>
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
        story: 'Subtle variant with Arabic text in RTL mode.'
      }
    }
  }
};

// RTL All Variants
export const RTLAllVariants: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-2xl">
      <Blockquote author="ألبرت أينشتاين" source="عن العلم">
        الشيء المهم هو عدم التوقف عن طرح الأسئلة. للفضول سببه الخاص للوجود.
      </Blockquote>

      <Blockquote variant="accent" author="ستيف جوبز">
        الابتكار يميز بين القائد والتابع.
      </Blockquote>

      <Blockquote variant="subtle" author="مايا أنجيلو">
        نحن نسعد بجمال الفراشة، لكننا نادراً ما نعترف بالتغييرات التي مرت بها لتحقيق هذا الجمال.
      </Blockquote>
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
        story: 'All blockquote variants with Arabic text demonstrating complete RTL support.'
      }
    }
  }
};
