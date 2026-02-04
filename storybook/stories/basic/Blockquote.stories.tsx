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
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders semantic HTML structure', async () => {
      const figure = canvas.getByRole('figure');
      await expect(figure).toBeInTheDocument();
      await expect(figure).toBeVisible();
    });

    await step('Displays quote content', async () => {
      const blockquote = canvas.getByText(/The important thing is not to stop questioning/i);
      await expect(blockquote).toBeInTheDocument();
      await expect(blockquote).toBeVisible();
    });

    await step('Displays author attribution', async () => {
      const author = canvas.getByText(/Albert Einstein/i);
      await expect(author).toBeInTheDocument();
      await expect(author).toBeVisible();
    });

    await step('Displays source attribution', async () => {
      const source = canvas.getByText(/On Science/i);
      await expect(source).toBeInTheDocument();
    });
  }
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
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
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders in RTL context', async () => {
      const figure = canvas.getByRole('figure');
      await expect(figure).toBeInTheDocument();
      await expect(figure).toBeVisible();
    });

    await step('Displays Arabic content', async () => {
      const blockquote = canvas.getByText(/الشيء المهم/i);
      await expect(blockquote).toBeInTheDocument();
    });
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
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders accent variant in RTL', async () => {
      const blockquote = canvas.getByText(/الابتكار يميز/i);
      await expect(blockquote).toBeInTheDocument();
    });

    await step('Quote icon present in RTL', async () => {
      const figure = canvas.getByRole('figure');
      const svg = figure.querySelector('svg');
      await expect(svg).toBeInTheDocument();
    });
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
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders subtle variant in RTL', async () => {
      const blockquote = canvas.getByText(/نحن نسعد بجمال الفراشة/i);
      await expect(blockquote).toBeInTheDocument();
    });
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
