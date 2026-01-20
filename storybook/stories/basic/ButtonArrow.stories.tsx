import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ButtonArrow } from '../../../components/ui/button-arrow';
import { Card, CardContent } from '../../../components/ui/card';

/**
 * Button Arrow Component Stories
 *
 * All examples are taken from /app/(docs)/components/button-arrow/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: ButtonArrow is a button with directional arrow that auto-flips in RTL.
 * Features: Forward/back directions, chevron/arrow icons, all button variants, auto RTL.
 */

const meta = {
  title: 'Basic/Button Arrow',
  component: ButtonArrow,
  parameters: {
    layout: 'centered'
  },
  tags: ['!autodocs'],
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['forward', 'back', 'external']
    },
    icon: {
      control: { type: 'select' },
      options: ['chevron', 'arrow']
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['start', 'end', 'auto']
    },
    iconSize: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    },
    hideIcon: { control: 'boolean' },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost']
    }
  }
} satisfies Meta<typeof ButtonArrow>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground
export const Default: Story = {
  args: {
    direction: 'forward',
    children: 'Continue',
    onClick: fn()
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    docs: {
      story: {
        inline: false
      }
    }
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /continue/i });

    await step('Button renders with forward direction', async () => {
      await expect(button).toBeInTheDocument();
      await expect(button).toBeVisible();
    });

    await step('Contains arrow icon', async () => {
      const icon = button.querySelector('svg');
      await expect(icon).toBeInTheDocument();
    });

    await step('Handles click interaction', async () => {
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  }
};

// Directions - from component page lines 166-168
export const Directions: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-3">
          <ButtonArrow direction="forward" onClick={fn()}>Next Step</ButtonArrow>
          <ButtonArrow direction="back" onClick={fn()}>Previous Step</ButtonArrow>
          <ButtonArrow direction="external" asChild>
            <a href="https://storybook.noorui.com" target="_blank" rel="noopener noreferrer">
              View in Storybook
            </a>
          </ButtonArrow>
        </div>
    </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Forward, back, and external directional buttons.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('All directional buttons render', async () => {
      await expect(canvas.getByRole('button', { name: /next step/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /previous step/i })).toBeInTheDocument();
      await expect(canvas.getByRole('link', { name: /view in storybook/i })).toBeInTheDocument();
    });

    await step('All buttons contain arrow icons', async () => {
      const icons = canvasElement.querySelectorAll('svg');
      await expect(icons.length).toBeGreaterThanOrEqual(3);
    });

    await step('Forward button has arrow at end', async () => {
      const forwardBtn = canvas.getByRole('button', { name: /next step/i });
      const lastChild = forwardBtn.lastChild;
      await expect(lastChild?.nodeName).toBe('svg');
    });

    await step('Back button has arrow at start', async () => {
      const backBtn = canvas.getByRole('button', { name: /previous step/i });
      const firstChild = backBtn.firstChild;
      await expect(firstChild?.nodeName).toBe('svg');
    });
  }
};

// Icon Styles - from component page lines 207-228
export const IconStyles: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-3">
          <ButtonArrow direction="forward" icon="chevron" onClick={fn()}>Continue</ButtonArrow>
          <ButtonArrow direction="forward" icon="arrow" onClick={fn()}>Learn More</ButtonArrow>
          <ButtonArrow direction="back" icon="chevron" onClick={fn()}>Go Back</ButtonArrow>
          <ButtonArrow direction="back" icon="arrow" onClick={fn()}>Go Back</ButtonArrow>
          <ButtonArrow direction="external" asChild>
            <a href="https://example.com" target="_blank" rel="noopener noreferrer">
              External Link
            </a>
          </ButtonArrow>
        </div>
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Chevron, arrow, and external diagonal arrow icon styles.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('All icon style buttons render', async () => {
      await expect(canvas.getByRole('button', { name: /continue/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /learn more/i })).toBeInTheDocument();
      const goBackButtons = canvas.getAllByRole('button', { name: /go back/i });
      await expect(goBackButtons).toHaveLength(2);
      await expect(canvas.getByRole('link', { name: /external link/i })).toBeInTheDocument();
    });

    await step('All buttons contain icons', async () => {
      const icons = canvasElement.querySelectorAll('svg');
      await expect(icons.length).toBeGreaterThanOrEqual(5);
    });
  }
};

// With Variants - from component page lines 230-251
export const WithVariants: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-3">
          <ButtonArrow variant="primary" direction="forward" onClick={fn()}>Primary</ButtonArrow>
          <ButtonArrow variant="secondary" direction="back" onClick={fn()}>Secondary</ButtonArrow>
          <ButtonArrow variant="outline" direction="forward" onClick={fn()}>Outline</ButtonArrow>
          <ButtonArrow variant="ghost" direction="back" onClick={fn()}>Ghost</ButtonArrow>
          <ButtonArrow variant="link" direction="external" className="h-auto p-0" asChild>
            <a href="https://example.com" target="_blank" rel="noopener noreferrer">
              Link Style
            </a>
          </ButtonArrow>
        </div>
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'ButtonArrow with all button variants including link variant.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('All variant buttons render', async () => {
      await expect(canvas.getByRole('button', { name: /^primary$/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /secondary/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /outline/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /ghost/i })).toBeInTheDocument();
      await expect(canvas.getByRole('link', { name: /link style/i })).toBeInTheDocument();
    });

    await step('Primary button has correct variant class', async () => {
      const primaryBtn = canvas.getByRole('button', { name: /^primary$/i });
      await expect(primaryBtn).toHaveClass('bg-primary');
    });

    await step('Outline button has correct variant class', async () => {
      const outlineBtn = canvas.getByRole('button', { name: /outline/i });
      await expect(outlineBtn).toHaveClass('border');
    });
  }
};

// Forward Only
export const ForwardOnly: Story = {
  render: () => (
    <div className="flex gap-3">
      <ButtonArrow direction="forward" onClick={fn()}>Continue</ButtonArrow>
      <ButtonArrow direction="forward" icon="arrow" onClick={fn()}>Next</ButtonArrow>
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
        story: 'Forward direction buttons only.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Forward buttons render', async () => {
      await expect(canvas.getByRole('button', { name: /continue/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /next/i })).toBeInTheDocument();
    });

    await step('Both have arrows at end position', async () => {
      const continueBtn = canvas.getByRole('button', { name: /continue/i });
      const nextBtn = canvas.getByRole('button', { name: /next/i });

      await expect(continueBtn.lastChild?.nodeName).toBe('svg');
      await expect(nextBtn.lastChild?.nodeName).toBe('svg');
    });
  }
};

// External Links
export const ExternalLinks: Story = {
  render: () => (
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-3">
            <ButtonArrow direction="external" asChild>
              <a href="https://storybook.noorui.com" target="_blank" rel="noopener noreferrer">
                View Storybook
              </a>
            </ButtonArrow>
            <ButtonArrow variant="outline" direction="external" asChild>
              <a href="https://github.com/ositaka/noor-ui" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </ButtonArrow>
            <ButtonArrow variant="link" direction="external" className="h-auto p-0" asChild>
              <a href="https://noorui.com" target="_blank" rel="noopener noreferrer">
                Documentation
              </a>
            </ButtonArrow>
          </div>
        </CardContent>
      </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'External link buttons with diagonal arrows that auto-mirror in RTL.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('All external links render', async () => {
      await expect(canvas.getByRole('link', { name: /view storybook/i })).toBeInTheDocument();
      await expect(canvas.getByRole('link', { name: /github/i })).toBeInTheDocument();
      await expect(canvas.getByRole('link', { name: /documentation/i })).toBeInTheDocument();
    });

    await step('External links have proper target and rel attributes', async () => {
      const links = canvas.getAllByRole('link');
      for (const link of links) {
        await expect(link).toHaveAttribute('target', '_blank');
        await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      }
    });

    await step('All external links contain diagonal arrow icon', async () => {
      const icons = canvasElement.querySelectorAll('svg');
      await expect(icons.length).toBeGreaterThanOrEqual(3);
    });
  }
};

// Back Only
export const BackOnly: Story = {
  render: () => (
    <div className="flex gap-3">
      <ButtonArrow direction="back" onClick={fn()}>Go Back</ButtonArrow>
      <ButtonArrow direction="back" icon="arrow" onClick={fn()}>Previous</ButtonArrow>
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
        story: 'Back direction buttons only.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Back buttons render', async () => {
      await expect(canvas.getByRole('button', { name: /go back/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /previous/i })).toBeInTheDocument();
    });

    await step('Both have arrows at start position', async () => {
      const goBackBtn = canvas.getByRole('button', { name: /go back/i });
      const previousBtn = canvas.getByRole('button', { name: /previous/i });

      await expect(goBackBtn.firstChild?.nodeName).toBe('svg');
      await expect(previousBtn.firstChild?.nodeName).toBe('svg');
    });
  }
};

// RTL Forward
export const RTLForward: Story = {
  render: () => (
    <div className="flex gap-3">
      <ButtonArrow direction="forward" onClick={fn()}>متابعة</ButtonArrow>
      <ButtonArrow direction="forward" icon="arrow" onClick={fn()}>التالي</ButtonArrow>
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
        story: 'Forward buttons in RTL - arrows auto-flip.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('RTL forward buttons render', async () => {
      await expect(canvas.getByRole('button', { name: /متابعة/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /التالي/i })).toBeInTheDocument();
    });

    await step('Buttons contain arrow icons', async () => {
      const icons = canvasElement.querySelectorAll('svg');
      await expect(icons.length).toBeGreaterThanOrEqual(2);
    });

    await step('Arrow icons have RTL rotation class', async () => {
      const icons = canvasElement.querySelectorAll('svg');
      for (const icon of icons) {
        await expect(icon).toHaveClass('rtl:rotate-180');
      }
    });

    await step('Handles click interaction in RTL', async () => {
      const button = canvas.getByRole('button', { name: /متابعة/i });
      await userEvent.click(button);
    });
  }
};

// RTL Back
export const RTLBack: Story = {
  render: () => (
    <div className="flex gap-3">
      <ButtonArrow direction="back" onClick={fn()}>رجوع</ButtonArrow>
      <ButtonArrow direction="back" icon="arrow" onClick={fn()}>السابق</ButtonArrow>
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
        story: 'Back buttons in RTL - arrows auto-flip.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('RTL back buttons render', async () => {
      await expect(canvas.getByRole('button', { name: /رجوع/i })).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /السابق/i })).toBeInTheDocument();
    });

    await step('Buttons contain arrow icons', async () => {
      const icons = canvasElement.querySelectorAll('svg');
      await expect(icons.length).toBeGreaterThanOrEqual(2);
    });

    await step('Arrow icons have RTL rotation class', async () => {
      const icons = canvasElement.querySelectorAll('svg');
      for (const icon of icons) {
        await expect(icon).toHaveClass('rtl:rotate-180');
      }
    });

    await step('Handles click interaction in RTL', async () => {
      const button = canvas.getByRole('button', { name: /رجوع/i });
      await userEvent.click(button);
    });
  }
};

// RTL External Links
export const RTLExternalLinks: Story = {
  render: () => (
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-3">
            <ButtonArrow direction="external" asChild>
              <a href="https://storybook.noorui.com" target="_blank" rel="noopener noreferrer">
                عرض ستوريبوك
              </a>
            </ButtonArrow>
            <ButtonArrow variant="outline" direction="external" asChild>
              <a href="https://github.com/ositaka/noor-ui" target="_blank" rel="noopener noreferrer">
                جِت هَب
              </a>
            </ButtonArrow>
            <ButtonArrow variant="link" direction="external" className="h-auto p-0" asChild>
              <a href="https://noorui.com" target="_blank" rel="noopener noreferrer">
                التوثيق
              </a>
            </ButtonArrow>
          </div>
        </CardContent>
      </Card>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'External links in RTL - diagonal arrows auto-mirror (↗ becomes ↖).'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('RTL external links render', async () => {
      await expect(canvas.getByRole('link', { name: /عرض ستوريبوك/i })).toBeInTheDocument();
      await expect(canvas.getByRole('link', { name: /جِت هَب/i })).toBeInTheDocument();
      await expect(canvas.getByRole('link', { name: /التوثيق/i })).toBeInTheDocument();
    });

    await step('External links have proper attributes in RTL', async () => {
      const links = canvas.getAllByRole('link');
      for (const link of links) {
        await expect(link).toHaveAttribute('target', '_blank');
        await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      }
    });

    await step('Diagonal arrow icons have RTL scale-x class', async () => {
      const icons = canvasElement.querySelectorAll('svg');
      for (const icon of icons) {
        await expect(icon).toHaveClass('rtl:scale-x-[-1]');
      }
    });
  }
};

// Icon Position Tests
export const IconPositionStart: Story = {
  args: {
    direction: 'forward',
    iconPosition: 'start',
    children: 'Icon at Start',
    onClick: fn()
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /icon at start/i });

    await step('Button renders with icon at start', async () => {
      await expect(button).toBeInTheDocument();
    });

    await step('Icon is positioned at start', async () => {
      const firstChild = button.firstChild;
      await expect(firstChild?.nodeName).toBe('svg');
    });

    await step('Handles click interaction', async () => {
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  }
};

export const IconPositionEnd: Story = {
  args: {
    direction: 'back',
    iconPosition: 'end',
    children: 'Icon at End',
    onClick: fn()
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /icon at end/i });

    await step('Button renders with icon at end', async () => {
      await expect(button).toBeInTheDocument();
    });

    await step('Icon is positioned at end', async () => {
      const lastChild = button.lastChild;
      await expect(lastChild?.nodeName).toBe('svg');
    });

    await step('Handles click interaction', async () => {
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  }
};

// Hidden Icon Test
export const HiddenIcon: Story = {
  args: {
    direction: 'forward',
    hideIcon: true,
    children: 'No Icon',
    onClick: fn()
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /no icon/i });

    await step('Button renders without icon', async () => {
      await expect(button).toBeInTheDocument();
    });

    await step('No icon is present', async () => {
      const icon = button.querySelector('svg');
      await expect(icon).not.toBeInTheDocument();
    });

    await step('Still handles click interaction', async () => {
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  }
};

// Keyboard Navigation
export const KeyboardNavigation: Story = {
  args: {
    direction: 'forward',
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

// Disabled State
export const DisabledState: Story = {
  args: {
    direction: 'forward',
    children: 'Disabled Button',
    disabled: true,
    onClick: fn()
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /disabled button/i });

    await step('Disabled button renders', async () => {
      await expect(button).toBeInTheDocument();
      await expect(button).toBeDisabled();
    });

    await step('Click blocked by pointer-events: none', async () => {
      await expect(button).toHaveClass('disabled:pointer-events-none');
      await expect(args.onClick).not.toHaveBeenCalled();
    });
  }
};
