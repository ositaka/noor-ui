import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { PullQuote } from '../../../components/ui/blockquote';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

/**
 * Pull Quote Component Stories
 *
 * All examples are taken from /app/(docs)/components/pull-quote/page.tsx
 *
 * Note: PullQuote highlights important quotes in content.
 * Features: Center/left/right alignment, with attribution, RTL-ready.
 */

const meta = {
  title: 'Basic/Pull Quote',
  component: PullQuote,
  parameters: {
    layout: 'centered'
  },
  tags: ['!autodocs'],
  argTypes: {
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right']
    },
    children: { control: 'text' }
  }
} satisfies Meta<typeof PullQuote>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    align: 'center',
    children: 'The pen is mightier than the sword.'
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders correctly with proper structure', async () => {
      const aside = canvas.getByRole('complementary');
      await expect(aside).toBeInTheDocument();
      await expect(aside).toBeVisible();
    });

    await step('Contains blockquote with correct content', async () => {
      const blockquote = canvas.getByText(/The pen is mightier than the sword/i);
      await expect(blockquote).toBeInTheDocument();
      await expect(blockquote).toBeVisible();
    });

    await step('Has proper semantic structure', async () => {
      const aside = canvas.getByRole('complementary');
      const blockquote = aside.querySelector('blockquote');
      await expect(blockquote).toBeInTheDocument();
    });

  }
};

// Center Aligned
export const CenterAligned: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Center Aligned</CardTitle>
      </CardHeader>
      <CardContent>
        <PullQuote align="center">
          The pen is mightier than the sword.
        </PullQuote>
      </CardContent>
    </Card>
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

    await step('Renders center-aligned pull quote', async () => {
      const pullQuote = canvas.getByRole('complementary');
      await expect(pullQuote).toBeInTheDocument();
    });

    await step('Contains quote content', async () => {
      const content = canvas.getByText(/The pen is mightier than the sword/i);
      await expect(content).toBeInTheDocument();
      await expect(content).toBeVisible();
    });
  }
};

// Left Aligned
export const LeftAligned: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Left Aligned</CardTitle>
      </CardHeader>
      <CardContent>
        <PullQuote align="left">
          Knowledge is power.
        </PullQuote>
      </CardContent>
    </Card>
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

    await step('Renders left-aligned pull quote', async () => {
      const pullQuote = canvas.getByRole('complementary');
      await expect(pullQuote).toBeInTheDocument();
    });

    await step('Contains quote content', async () => {
      const content = canvas.getByText(/Knowledge is power/i);
      await expect(content).toBeInTheDocument();
      await expect(content).toBeVisible();
    });
  }
};

// Right Aligned
export const RightAligned: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Right Aligned</CardTitle>
      </CardHeader>
      <CardContent>
        <PullQuote align="right">
          Actions speak louder than words.
        </PullQuote>
      </CardContent>
    </Card>
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

    await step('Renders right-aligned pull quote', async () => {
      const pullQuote = canvas.getByRole('complementary');
      await expect(pullQuote).toBeInTheDocument();
    });

    await step('Contains quote content', async () => {
      const content = canvas.getByText(/Actions speak louder than words/i);
      await expect(content).toBeInTheDocument();
      await expect(content).toBeVisible();
    });
  }
};

// All Alignments
export const AllAlignments: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-2xl">
      <PullQuote align="center">Center-aligned quote</PullQuote>
      <PullQuote align="left">Left-aligned quote</PullQuote>
      <PullQuote align="right">Right-aligned quote</PullQuote>
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

// RTL
export const RTL: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-2xl">
      <PullQuote align="center">
        القلم أقوى من السيف.
      </PullQuote>
      <PullQuote align="right">
        المعرفة قوة.
      </PullQuote>
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders in RTL context', async () => {
      const pullQuotes = canvas.getAllByRole('complementary');
      await expect(pullQuotes).toHaveLength(2);
      await expect(pullQuotes[0]).toBeInTheDocument();
      await expect(pullQuotes[1]).toBeInTheDocument();
    });

    await step('Contains Arabic content', async () => {
      const firstQuote = canvas.getByText(/القلم أقوى من السيف/);
      const secondQuote = canvas.getByText(/المعرفة قوة/);
      await expect(firstQuote).toBeInTheDocument();
      await expect(secondQuote).toBeInTheDocument();
    });
  }
};
