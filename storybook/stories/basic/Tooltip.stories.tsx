import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '../../../components/ui/tooltip';
import { Button } from '../../../components/ui/button';
import { Info, Plus, Gear, Trash } from '@phosphor-icons/react';

/**
 * Tooltip Component Stories
 *
 * All examples are taken from /app/(docs)/components/tooltip/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: All stories are wrapped with TooltipProvider decorator.
 */

const meta = {
  title: 'Feedback/Tooltip',
  component: Tooltip,
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls
export const Default: Story = {
  args: {
    children: (
      <>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </>
    )
  },
  parameters: {
    ar: {
      args: {
        children: (
          <>
            <TooltipTrigger asChild>
              <Button variant="outline">حوم علي</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>أضف إلى المكتبة</p>
            </TooltipContent>
          </>
        )
      }
    }
  },
  render: (args) => <Tooltip {...args} />,
};

// All Sides - from component page lines 232-268
export const AllSides: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Tooltip on top</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Tooltip on bottom</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Tooltip on left</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Tooltip on right</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  }
};

// With Icon Buttons - from component page lines 281-325
export const WithIconButtons: Story = {
  render: () => (
    <div className="flex gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="More information">
            <Info className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>More information</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Add item">
            <Plus className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add item</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Settings">
            <Gear className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Settings</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Delete">
            <Trash className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders icon buttons', async () => {
      const buttons = canvas.getAllByRole('button');
      await expect(buttons).toHaveLength(4);
      buttons.forEach(button => {
        expect(button).toBeVisible();
      });
    });

    await step('Shows tooltip on icon button hover', async () => {
      const buttons = canvas.getAllByRole('button');
      await userEvent.hover(buttons[0]);

      const tooltip = await canvas.findByRole('tooltip');
      await expect(tooltip).toBeVisible();
      await expect(tooltip).toHaveTextContent('More information');
    });
  }
};

// With Text Buttons - from component page lines 342-365
export const WithTextButtons: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">
            <Info className="me-2 h-4 w-4" />
            Help
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click for more information</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">
            <Gear className="me-2 h-4 w-4" />
            Gear
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Configure your preferences</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders text buttons with icons', async () => {
      const helpButton = canvas.getByRole('button', { name: /help/i });
      const settingsButton = canvas.getByRole('button', { name: /settings/i });
      await expect(helpButton).toBeVisible();
      await expect(settingsButton).toBeVisible();
    });

    await step('Shows tooltip on text button hover', async () => {
      const helpButton = canvas.getByRole('button', { name: /help/i });
      await userEvent.hover(helpButton);

      const tooltip = await canvas.findByRole('tooltip');
      await expect(tooltip).toBeVisible();
      await expect(tooltip).toHaveTextContent('Click for more information');
    });
  }
};
