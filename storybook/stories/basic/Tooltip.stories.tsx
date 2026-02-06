import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '../../../components/ui/tooltip';
import { Button } from '../../../components/ui/button';
import { Info, Plus, Settings, Trash2 } from 'lucide-react';

/**
 * Tooltip Component Stories
 *
 * All examples are taken from /app/(docs)/components/tooltip/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: All stories are wrapped with TooltipProvider decorator.
 */

const meta = {
  title: 'Basic/Tooltip',
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
  tags: ['!autodocs']
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  render: (args) => <Tooltip {...args} />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders trigger button correctly', async () => {
      const trigger = canvas.getByRole('button', { name: /hover me/i });
      await expect(trigger).toBeInTheDocument();
      await expect(trigger).toBeVisible();
    });

    await step('Shows tooltip on hover', async () => {
      const trigger = canvas.getByRole('button', { name: /hover me/i });
      await userEvent.hover(trigger);

      // Wait for tooltip to appear
      const tooltip = await canvas.findByRole('tooltip');
      await expect(tooltip).toBeInTheDocument();
      await expect(tooltip).toBeVisible();
    });

    await step('Displays correct tooltip content', async () => {
      const tooltip = canvas.getByRole('tooltip');
      await expect(tooltip).toHaveTextContent('Add to library');
    });

    await step('Hides tooltip on unhover', async () => {
      const trigger = canvas.getByRole('button', { name: /hover me/i });
      await userEvent.unhover(trigger);

      // Tooltip should disappear
      await expect(canvas.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    await step('Keyboard accessible', async () => {
      await userEvent.tab();
      const trigger = canvas.getByRole('button', { name: /hover me/i });
      await expect(trigger).toHaveFocus();

      // Tooltip should appear when focused
      const tooltip = await canvas.findByRole('tooltip');
      await expect(tooltip).toBeVisible();
    });
  }
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
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
            <Settings className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Settings</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Delete">
            <Trash2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete</p>
        </TooltipContent>
      </Tooltip>
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
            <Settings className="me-2 h-4 w-4" />
            Settings
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Configure your preferences</p>
        </TooltipContent>
      </Tooltip>
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

// RTL Example
export const RTLExample: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">حوم علي</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>أضف إلى المكتبة</p>
      </TooltipContent>
    </Tooltip>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Tooltip with Arabic text demonstrating RTL support. Automatically switches to RTL mode.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders in RTL context', async () => {
      const trigger = canvas.getByRole('button', { name: /حوم علي/i });
      await expect(trigger).toBeInTheDocument();
      await expect(trigger).toBeVisible();
    });

    await step('Tooltip works in RTL', async () => {
      const trigger = canvas.getByRole('button', { name: /حوم علي/i });
      await userEvent.hover(trigger);

      const tooltip = await canvas.findByRole('tooltip');
      await expect(tooltip).toBeVisible();
      await expect(tooltip).toHaveTextContent('أضف إلى المكتبة');
    });
  }
};

// RTL All Sides
export const RTLAllSides: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">أعلى</Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>تلميح في الأعلى</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">أسفل</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>تلميح في الأسفل</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">يسار</Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>تلميح على اليسار</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">يمين</Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>تلميح على اليمين</p>
        </TooltipContent>
      </Tooltip>
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
        story: 'Tooltips on all sides with Arabic text in RTL mode. Position correctly mirrors for RTL.'
      }
    }
  }
};

// RTL With Icon Buttons
export const RTLWithIconButtons: Story = {
  render: () => (
    <div className="flex gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="مزيد من المعلومات">
            <Info className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>مزيد من المعلومات</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="إضافة عنصر">
            <Plus className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>إضافة عنصر</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="إعدادات">
            <Settings className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>إعدادات</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="حذف">
            <Trash2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>حذف</p>
        </TooltipContent>
      </Tooltip>
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
        story: 'Icon buttons with Arabic tooltips in RTL mode.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders RTL icon buttons', async () => {
      const buttons = canvas.getAllByRole('button');
      await expect(buttons).toHaveLength(4);
    });

    await step('Arabic tooltip appears on hover', async () => {
      const buttons = canvas.getAllByRole('button');
      await userEvent.hover(buttons[0]);

      const tooltip = await canvas.findByRole('tooltip');
      await expect(tooltip).toBeVisible();
      await expect(tooltip).toHaveTextContent('مزيد من المعلومات');
    });
  }
};

// RTL With Text Buttons
export const RTLWithTextButtons: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">
            <Info className="me-2 h-4 w-4" />
            مساعدة
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>انقر هنا للمزيد من المعلومات</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">
            <Settings className="me-2 h-4 w-4" />
            إعدادات
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>قم بتكوين تفضيلاتك</p>
        </TooltipContent>
      </Tooltip>
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
        story: 'Text buttons with Arabic tooltips demonstrating complete RTL support.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders RTL text buttons', async () => {
      const helpButton = canvas.getByRole('button', { name: /مساعدة/i });
      const settingsButton = canvas.getByRole('button', { name: /إعدادات/i });
      await expect(helpButton).toBeVisible();
      await expect(settingsButton).toBeVisible();
    });

    await step('Arabic tooltip appears on text button hover', async () => {
      const helpButton = canvas.getByRole('button', { name: /مساعدة/i });
      await userEvent.hover(helpButton);

      const tooltip = await canvas.findByRole('tooltip');
      await expect(tooltip).toBeVisible();
      await expect(tooltip).toHaveTextContent('انقر هنا للمزيد من المعلومات');
    });
  }
};
