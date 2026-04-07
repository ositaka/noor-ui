import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/ui/popover';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Gear } from '@phosphor-icons/react';
import * as React from 'react';

/**
 * Popover Component Stories
 *
 * All examples are taken from /app/(docs)/components/popover/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Popover displays rich content in a portal with flexible positioning.
 * Features: Four sides (top, right, bottom, left), alignment, RTL support, accessibility.
 */

const meta = {
  title: 'Overlays & Layout/Popover',
  component: Popover,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: { type: 'boolean' }
    },
    defaultOpen: {
      control: { type: 'boolean' }
    },
    onOpenChange: {
      control: false
    }
  }
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls
export const Default: Story = {
  args: {
    defaultOpen: false
  },
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Popover Title</h4>
          <p className="text-sm text-muted-foreground">
            This is a popover with some example content.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

// Basic Usage - from component page lines 177-189
export const BasicUsage: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Popover Title</h4>
          <p className="text-sm text-muted-foreground">
            This is a popover with some example content.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Basic popover with title and description. Click the button to open.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Renders and opens on interaction', async () => {
      const trigger = canvas.getByRole('button', { name: /open popover/i });
      await expect(trigger).toBeInTheDocument();

      await userEvent.click(trigger);
      const popoverTitle = await body.findByText('Popover Title');
      await expect(popoverTitle).toBeVisible();
    });
  }
};

// Position Top - from component page lines 218-225
export const PositionTop: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Top</Button>
      </PopoverTrigger>
      <PopoverContent side="top">
        <p className="text-sm">Content positioned on top</p>
      </PopoverContent>
    </Popover>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Popover positioned above the trigger button.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Opens with top positioning', async () => {
      const trigger = canvas.getByRole('button', { name: /top/i });
      await userEvent.click(trigger);

      const content = await body.findByText('Content positioned on top');
      await expect(content).toBeVisible();
    });
  }
};

// Position Right - from component page lines 227-234
export const PositionRight: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Right</Button>
      </PopoverTrigger>
      <PopoverContent side="right">
        <p className="text-sm">Content positioned on right</p>
      </PopoverContent>
    </Popover>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Popover positioned to the right of the trigger button.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Opens with right positioning', async () => {
      const trigger = canvas.getByRole('button', { name: /right/i });
      await userEvent.click(trigger);

      const content = await body.findByText('Content positioned on right');
      await expect(content).toBeVisible();
    });
  }
};

// Position Bottom - from component page lines 236-243
export const PositionBottom: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Bottom</Button>
      </PopoverTrigger>
      <PopoverContent side="bottom">
        <p className="text-sm">Content positioned on bottom</p>
      </PopoverContent>
    </Popover>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Popover positioned below the trigger button (default).'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Opens with bottom positioning', async () => {
      const trigger = canvas.getByRole('button', { name: /bottom/i });
      await userEvent.click(trigger);

      const content = await body.findByText('Content positioned on bottom');
      await expect(content).toBeVisible();
    });
  }
};

// Position Left - from component page lines 245-252
export const PositionLeft: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Left</Button>
      </PopoverTrigger>
      <PopoverContent side="left">
        <p className="text-sm">Content positioned on left</p>
      </PopoverContent>
    </Popover>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Popover positioned to the left of the trigger button.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Opens with left positioning', async () => {
      const trigger = canvas.getByRole('button', { name: /left/i });
      await userEvent.click(trigger);

      const content = await body.findByText('Content positioned on left');
      await expect(content).toBeVisible();
    });
  }
};

// All Positions - from component page lines 217-253
export const AllPositions: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Top</Button>
        </PopoverTrigger>
        <PopoverContent side="top">
          <p className="text-sm">Content positioned on top</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Right</Button>
        </PopoverTrigger>
        <PopoverContent side="right">
          <p className="text-sm">Content positioned on right</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </PopoverTrigger>
        <PopoverContent side="bottom">
          <p className="text-sm">Content positioned on bottom</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Left</Button>
        </PopoverTrigger>
        <PopoverContent side="left">
          <p className="text-sm">Content positioned on left</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'All four positioning options: top, right, bottom, and left.'
      }
    }
  }
};

// With Form - from component page lines 263-289
export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Gear className="me-2 h-4 w-4" />
          Gear
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="width">Width</Label>
            <Input id="width" defaultValue="100%" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Height</Label>
            <Input id="height" defaultValue="25px" />
          </div>
          <Button className="w-full">Save changes</Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Popover with form inputs for settings. Shows width 320px and form controls.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Opens popover with form', async () => {
      const trigger = canvas.getByRole('button', { name: /gear/i });
      await userEvent.click(trigger);

      await expect(body.getByText('Dimensions')).toBeVisible();
      await expect(body.getByText('Set the dimensions for the layer.')).toBeVisible();
    });

    await step('Form inputs are accessible and functional', async () => {
      const widthInput = body.getByLabelText(/width/i);
      const heightInput = body.getByLabelText(/height/i);

      await expect(widthInput).toBeVisible();
      await expect(widthInput).toHaveValue('100%');
      await expect(heightInput).toBeVisible();
      await expect(heightInput).toHaveValue('25px');

      // Test form interaction
      await userEvent.clear(widthInput);
      await userEvent.type(widthInput, '200px');
      await expect(widthInput).toHaveValue('200px');
    });

    await step('Save button is present', async () => {
      const saveButton = body.getByRole('button', { name: /save changes/i });
      await expect(saveButton).toBeVisible();
      await expect(saveButton).toBeEnabled();
    });
  }
};

