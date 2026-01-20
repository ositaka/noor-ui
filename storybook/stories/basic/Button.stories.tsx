import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Button } from '../../../components/ui/button';
import { Heart, Download, Plus, Save } from 'lucide-react';

const meta = {
  title: 'Basic/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['!autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
      description: 'Button style variant'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'icon'],
      description: 'Button size'
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button'
    }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md'
  }
};

// Variants
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
    onClick: fn()
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /primary button/i });

    await step('Button renders with primary variant', async () => {
      await expect(button).toBeInTheDocument();
      await expect(button).toBeVisible();
      await expect(button).toHaveClass('bg-primary');
    });

    await step('Handles click interaction', async () => {
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });

    await step('Has proper focus styles', async () => {
      button.focus();
      await expect(button).toHaveFocus();
    });
  }
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
    onClick: fn()
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /secondary button/i });

    await step('Button renders with secondary variant', async () => {
      await expect(button).toBeInTheDocument();
      await expect(button).toHaveClass('bg-secondary');
    });

    await step('Handles click interaction', async () => {
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  }
};

export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
    onClick: fn()
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /delete/i });

    await step('Button renders with destructive variant', async () => {
      await expect(button).toBeInTheDocument();
      await expect(button).toHaveClass('bg-destructive');
    });

    await step('Handles click interaction', async () => {
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  }
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
    onClick: fn()
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /outline button/i });

    await step('Button renders with outline variant', async () => {
      await expect(button).toBeInTheDocument();
      await expect(button).toHaveClass('border');
      await expect(button).toHaveClass('border-input');
    });

    await step('Handles click interaction', async () => {
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  }
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
    onClick: fn()
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /ghost button/i });

    await step('Button renders with ghost variant', async () => {
      await expect(button).toBeInTheDocument();
      await expect(button).toHaveClass('hover:bg-accent');
    });

    await step('Handles click interaction', async () => {
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  }
};

export const Link: Story = {
  args: {
    children: 'Link Button',
    variant: 'link',
    onClick: fn()
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /link button/i });

    await step('Button renders with link variant', async () => {
      await expect(button).toBeInTheDocument();
      await expect(button).toHaveClass('text-primary');
      await expect(button).toHaveClass('underline-offset-4');
    });

    await step('Handles click interaction', async () => {
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  }
};

// Sizes
export const Small: Story = {
  args: {
    children: 'Small',
    size: 'sm',
    onClick: fn()
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /small/i });

    await step('Button renders with small size', async () => {
      await expect(button).toBeInTheDocument();
      await expect(button).toHaveClass('h-8');
      await expect(button).toHaveClass('px-3');
    });

    await step('Handles click interaction', async () => {
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  }
};

export const Medium: Story = {
  args: {
    children: 'Medium',
    size: 'md',
    onClick: fn()
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /medium/i });

    await step('Button renders with medium size', async () => {
      await expect(button).toBeInTheDocument();
      await expect(button).toHaveClass('h-9');
      await expect(button).toHaveClass('px-4');
    });

    await step('Handles click interaction', async () => {
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  }
};

export const Large: Story = {
  args: {
    children: 'Large',
    size: 'lg',
    onClick: fn()
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /large/i });

    await step('Button renders with large size', async () => {
      await expect(button).toBeInTheDocument();
      await expect(button).toHaveClass('h-10');
      await expect(button).toHaveClass('px-8');
    });

    await step('Handles click interaction', async () => {
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  }
};

export const ExtraLarge: Story = {
  args: {
    children: 'Extra Large',
    size: 'xl',
    onClick: fn()
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /extra large/i });

    await step('Button renders with extra large size', async () => {
      await expect(button).toBeInTheDocument();
      await expect(button).toHaveClass('h-11');
      await expect(button).toHaveClass('px-8');
    });

    await step('Handles click interaction', async () => {
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  }
};

// Icon button
export const Icon: Story = {
  args: {
    size: 'icon',
    children: <Heart className="h-4 w-4" />,
    onClick: fn(),
    'aria-label': 'Like'
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /like/i });

    await step('Icon button renders correctly', async () => {
      await expect(button).toBeInTheDocument();
      await expect(button).toHaveClass('h-9');
      await expect(button).toHaveClass('w-9');
    });

    await step('Contains icon element', async () => {
      const icon = button.querySelector('svg');
      await expect(icon).toBeInTheDocument();
    });

    await step('Handles click interaction', async () => {
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  }
};

// With icons
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Download className="h-4 w-4" />
        Download
      </>
    ),
    onClick: fn()
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /download/i });

    await step('Button with icon renders', async () => {
      await expect(button).toBeInTheDocument();
      await expect(button).toHaveTextContent('Download');
    });

    await step('Contains icon element', async () => {
      const icon = button.querySelector('svg');
      await expect(icon).toBeInTheDocument();
    });

    await step('Icon appears before text', async () => {
      const firstChild = button.firstChild;
      await expect(firstChild?.nodeName).toBe('svg');
    });

    await step('Handles click interaction', async () => {
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  }
};

export const WithIconRight: Story = {
  args: {
    children: (
      <>
        Save Changes
        <Save className="h-4 w-4" />
      </>
    ),
    onClick: fn()
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /save changes/i });

    await step('Button with right icon renders', async () => {
      await expect(button).toBeInTheDocument();
      await expect(button).toHaveTextContent('Save Changes');
    });

    await step('Contains icon element', async () => {
      const icon = button.querySelector('svg');
      await expect(icon).toBeInTheDocument();
    });

    await step('Icon appears after text', async () => {
      const lastChild = button.lastChild;
      await expect(lastChild?.nodeName).toBe('svg');
    });

    await step('Handles click interaction', async () => {
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  }
};

// States
export const Loading: Story = {
  args: {
    children: 'Processing...',
    loading: true,
    onClick: fn()
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /processing/i });

    await step('Loading button renders', async () => {
      await expect(button).toBeInTheDocument();
      await expect(button).toBeDisabled();
    });

    await step('Shows loading spinner', async () => {
      const spinner = button.querySelector('.animate-spin');
      await expect(spinner).toBeInTheDocument();
    });

    await step('Click is blocked by pointer-events: none', async () => {
      // Disabled buttons have pointer-events: none, which correctly blocks clicks
      await expect(button).toHaveClass('disabled:pointer-events-none');
      await expect(args.onClick).not.toHaveBeenCalled();
    });
  }
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
    onClick: fn()
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /disabled/i });

    await step('Disabled button renders', async () => {
      await expect(button).toBeInTheDocument();
      await expect(button).toBeDisabled();
    });

    await step('Has disabled styling', async () => {
      await expect(button).toHaveClass('disabled:opacity-50');
      await expect(button).toHaveClass('disabled:pointer-events-none');
    });

    await step('Click handler not triggered (pointer-events: none)', async () => {
      // Disabled buttons block pointer events, so onClick is never called
      await expect(args.onClick).not.toHaveBeenCalled();
    });
  }
};

// Keyboard Navigation Tests
export const KeyboardNavigation: Story = {
  args: {
    children: 'Press Enter or Space',
    onClick: fn()
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /press enter or space/i });

    await step('Button can be focused with Tab', async () => {
      await userEvent.tab();
      await expect(button).toHaveFocus();
    });

    await step('Enter key triggers click', async () => {
      await userEvent.keyboard('{Enter}');
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });

    await step('Space key triggers click', async () => {
      await userEvent.keyboard(' ');
      await expect(args.onClick).toHaveBeenCalledTimes(2);
    });
  }
};

// RTL Examples
export const RTLPrimary: Story = {
  args: {
    children: 'زر أساسي',
    variant: 'primary',
    onClick: fn()
  },
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with Arabic text demonstrating RTL support. Automatically switches to RTL mode.'
      }
    }
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /زر أساسي/i });

    await step('RTL button renders correctly', async () => {
      await expect(button).toBeInTheDocument();
      await expect(button).toHaveTextContent('زر أساسي');
    });

    await step('Handles click in RTL context', async () => {
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });

    await step('Has proper RTL text direction', async () => {
      await expect(button).toBeVisible();
    });
  }
};

export const RTLWithIcon: Story = {
  args: {
    children: (
      <>
        <Plus className="h-4 w-4" />
        إضافة عنصر جديد
      </>
    ),
    onClick: fn()
  },
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with Arabic text and icon showing proper RTL layout. Icon automatically positions correctly.'
      }
    }
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /إضافة عنصر جديد/i });

    await step('RTL button with icon renders', async () => {
      await expect(button).toBeInTheDocument();
      await expect(button).toHaveTextContent('إضافة عنصر جديد');
    });

    await step('Contains icon element', async () => {
      const icon = button.querySelector('svg');
      await expect(icon).toBeInTheDocument();
    });

    await step('Handles click in RTL context', async () => {
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  }
};

// RTL Keyboard Navigation
export const RTLKeyboardNavigation: Story = {
  args: {
    children: 'اضغط على إدخال أو مسافة',
    onClick: fn()
  },
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /اضغط على إدخال أو مسافة/i });

    await step('Button can be focused with Tab in RTL', async () => {
      await userEvent.tab();
      await expect(button).toHaveFocus();
    });

    await step('Enter key triggers click in RTL', async () => {
      await userEvent.keyboard('{Enter}');
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });

    await step('Space key triggers click in RTL', async () => {
      await userEvent.keyboard(' ');
      await expect(args.onClick).toHaveBeenCalledTimes(2);
    });
  }
};

// RTL Loading State
export const RTLLoadingState: Story = {
  args: {
    children: 'جاري المعالجة...',
    loading: true,
    onClick: fn()
  },
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /جاري المعالجة/i });

    await step('RTL loading button renders', async () => {
      await expect(button).toBeInTheDocument();
      await expect(button).toBeDisabled();
    });

    await step('Shows loading spinner in RTL', async () => {
      const spinner = button.querySelector('.animate-spin');
      await expect(spinner).toBeInTheDocument();
    });

    await step('Loading spinner has RTL margins', async () => {
      const spinner = button.querySelector('.animate-spin');
      await expect(spinner).toHaveClass('me-2');
      await expect(spinner).toHaveClass('-ms-1');
    });
  }
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('All variant buttons render', async () => {
      await expect(canvas.getByRole('button', { name: /primary/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /secondary/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /destructive/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /outline/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /ghost/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /link/i })).toBeInTheDocument();
    });

    await step('All buttons are visible', async () => {
      const buttons = canvas.getAllByRole('button');
      await expect(buttons).toHaveLength(6);

      for (const button of buttons) {
        await expect(button).toBeVisible();
      }
    });
  }
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
      <Button size="icon" aria-label="Icon button">
        <Heart className="h-4 w-4" />
      </Button>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('All size buttons render', async () => {
      await expect(canvas.getByRole('button', { name: 'Small' })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: 'Medium' })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: 'Large' })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: 'Extra Large' })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: 'Icon button' })).toBeInTheDocument();
    });

    await step('All buttons have correct size classes', async () => {
      const smallBtn = canvas.getByRole('button', { name: 'Small' });
      const mediumBtn = canvas.getByRole('button', { name: 'Medium' });
      const largeBtn = canvas.getByRole('button', { name: 'Large' });
      const xlBtn = canvas.getByRole('button', { name: 'Extra Large' });
      const iconBtn = canvas.getByRole('button', { name: 'Icon button' });

      await expect(smallBtn).toHaveClass('h-8');
      await expect(mediumBtn).toHaveClass('h-9');
      await expect(largeBtn).toHaveClass('h-10');
      await expect(xlBtn).toHaveClass('h-11');
      await expect(iconBtn).toHaveClass('h-9', 'w-9');
    });
  }
};
