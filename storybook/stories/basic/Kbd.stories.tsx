import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { Kbd } from '../../../components/ui/kbd';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Separator } from '../../../components/ui/separator';

const meta = {
  title: 'User Interface/Kbd',
  component: Kbd,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls
export const Default: Story = {
  args: {
    keys: ['mod', 'k'],
    variant: 'default',
    size: 'md'
  },
};

// Single Keys
export const SingleKeys: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Kbd keys={['esc']} />
      <Kbd keys={['enter']} />
      <Kbd keys={['tab']} />
      <Kbd keys={['space']} />
      <Kbd keys={['delete']} />
    </div>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders all single key kbd elements', async () => {
      const kbds = canvasElement.querySelectorAll('kbd');
      await expect(kbds).toHaveLength(5);
    });

    await step('Displays correct key symbols', async () => {
      const kbds = canvasElement.querySelectorAll('kbd');
      // Should display Esc, ↵ (enter), Tab/⇥, Space, and Backspace/Del symbols
      await expect(kbds[0]).toHaveTextContent(/Esc/);
      await expect(kbds[1]).toHaveTextContent(/↵/);
      await expect(kbds[2]).toHaveTextContent(/[⇥Tab]/);
      await expect(kbds[3]).toHaveTextContent(/Space/);
      await expect(kbds[4]).toHaveTextContent(/[⌦Del]/);
    });
  }
};

// Key Combinations - from component page lines 89-101
export const KeyCombinations: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Kbd keys={['mod', 'k']} />
      <Kbd keys={['mod', 'enter']} />
      <Kbd keys={['shift', 'k']} />
      <Kbd keys={['mod', 'shift', 'p']} />
      <Kbd keys={['ctrl', 'alt', 'delete']} />
    </div>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders all key combination kbd elements', async () => {
      const kbds = canvasElement.querySelectorAll('kbd');
      await expect(kbds).toHaveLength(5);
    });

    await step('Displays key combinations with proper separators', async () => {
      const kbds = canvasElement.querySelectorAll('kbd');
      // mod+k
      await expect(kbds[0]).toHaveTextContent(/[⌘Ctrl]/);
      await expect(kbds[0]).toHaveTextContent(/K/);
      // mod+enter
      await expect(kbds[1]).toHaveTextContent(/[⌘Ctrl]/);
      await expect(kbds[1]).toHaveTextContent(/↵/);
      // shift+k
      await expect(kbds[2]).toHaveTextContent(/[⇧Shift]/);
      await expect(kbds[2]).toHaveTextContent(/K/);
      // Three key combination: mod+shift+p
      await expect(kbds[3]).toHaveTextContent(/[⌘Ctrl]/);
      await expect(kbds[3]).toHaveTextContent(/[⇧Shift]/);
      await expect(kbds[3]).toHaveTextContent(/P/);
    });
  }
};

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <div className="space-y-2">
        <p className="text-sm font-medium">Default</p>
        <Kbd keys={['mod', 'k']} variant="default" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Outline</p>
        <Kbd keys={['mod', 'k']} variant="outline" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Ghost</p>
        <Kbd keys={['mod', 'k']} variant="ghost" />
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  }
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <div className="space-y-2">
        <p className="text-sm font-medium">Small</p>
        <Kbd keys={['mod', 'k']} size="sm" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Medium</p>
        <Kbd keys={['mod', 'k']} size="md" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Large</p>
        <Kbd keys={['mod', 'k']} size="lg" />
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  }
};

// Keyboard Shortcuts Panel - from component page lines 80-113
export const KeyboardShortcutsPanel: Story = {
  render: () => (
    <div className="w-full max-w-64">
      <Card>
        <CardHeader>
          <CardTitle>Keyboard Shortcuts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Search</span>
              <Kbd keys={['mod', 'k']} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Submit</span>
              <Kbd keys={['mod', 'enter']} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Close</span>
              <Kbd keys={['esc']} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Previous</span>
              <Kbd keys={['shift', 'k']} />
            </div>
          </div>
          <Separator />
          <div className="space-y-3">
            <p className="text-sm font-medium">In Buttons</p>
            <Button variant="secondary">
              Search <Kbd keys={['mod', 'k']} size="sm" className="ms-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders keyboard shortcuts panel', async () => {
      await expect(canvas.getByText('Keyboard Shortcuts')).toBeInTheDocument();
      const kbds = canvasElement.querySelectorAll('kbd');
      // 4 shortcuts in list + 1 in button = 5 total
      await expect(kbds).toHaveLength(5);
    });

    await step('Displays shortcut labels and kbd elements', async () => {
      await expect(canvas.getAllByText('Search')[0]).toBeVisible();
      await expect(canvas.getByText('Submit')).toBeVisible();
      await expect(canvas.getByText('Close')).toBeVisible();
      await expect(canvas.getByText('Previous')).toBeVisible();
    });

    await step('Displays kbd element inside button', async () => {
      const button = canvas.getByRole('button', { name: /Search/i });
      await expect(button).toBeVisible();
      const kbd = button.querySelector('kbd');
      await expect(kbd).toBeInTheDocument();
    });
  }
};

// In Buttons
export const InButtons: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Button variant="secondary">
        Search <Kbd keys={['mod', 'k']} size="sm" className="ms-2" />
      </Button>
      <Button variant="secondary">
        Submit <Kbd keys={['mod', 'enter']} size="sm" className="ms-2" />
      </Button>
      <Button variant="outline">
        Close <Kbd keys={['esc']} size="sm" className="ms-2" />
      </Button>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders buttons with kbd elements inside', async () => {
      const buttons = canvas.getAllByRole('button');
      await expect(buttons).toHaveLength(3);

      const kbds = canvasElement.querySelectorAll('kbd');
      await expect(kbds).toHaveLength(3);
    });

    await step('Each button contains a kbd element', async () => {
      const searchButton = canvas.getByRole('button', { name: /Search/i });
      const submitButton = canvas.getByRole('button', { name: /Submit/i });
      const closeButton = canvas.getByRole('button', { name: /Close/i });

      await expect(searchButton.querySelector('kbd')).toBeInTheDocument();
      await expect(submitButton.querySelector('kbd')).toBeInTheDocument();
      await expect(closeButton.querySelector('kbd')).toBeInTheDocument();
    });
  }
};

// Arrow Keys
export const ArrowKeys: Story = {
  render: () => (
    <div className="flex gap-2">
      <Kbd keys={['up']} />
      <Kbd keys={['down']} />
      <Kbd keys={['left']} />
      <Kbd keys={['right']} />
    </div>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders all arrow key kbd elements', async () => {
      const kbds = canvasElement.querySelectorAll('kbd');
      await expect(kbds).toHaveLength(4);
    });

    await step('Displays arrow key symbols', async () => {
      const kbds = canvasElement.querySelectorAll('kbd');
      // Should display arrow symbols: ↑ ↓ ← →
      await expect(kbds[0]).toHaveTextContent(/↑/);
      await expect(kbds[1]).toHaveTextContent(/↓/);
      await expect(kbds[2]).toHaveTextContent(/←/);
      await expect(kbds[3]).toHaveTextContent(/→/);
    });
  }
};

