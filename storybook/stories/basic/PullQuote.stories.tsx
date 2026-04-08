import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { PullQuote } from '../../../components/ui/blockquote';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

const meta = {
  title: 'Data Display/Pull Quote',
  component: PullQuote,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
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
  parameters: {
    ar: {
      args: {
        children: 'القلم أقوى من السيف.'
      }
    }
  },
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
  parameters: {
    controls: { disable: true }
  }
};
