import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from '../../../components/ui/toast';
import { useToast } from '../../../hooks/use-toast';
import { Button } from '../../../components/ui/button';
import * as React from 'react';
import { expect, userEvent, within, fn } from 'storybook/test';

/**
 * Toast Component Stories
 *
 * All examples are taken from /app/(docs)/components/toast/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Toast provides temporary notification messages.
 * Features: 3 variants (default, destructive, success), auto-dismiss, RTL support.
 */

const meta = {
  title: 'Feedback/Toast',
  component: Toast,
  parameters: {
    layout: 'centered'
  },
  tags: ['!autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'success']
    },
    title: { control: false },
    description: { control: false },
    action: { control: false },
    onOpenChange: { control: false }
  }
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls
export const Default: Story = {
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  render: () => {
    const { toast } = useToast();
    return (
      <Button
        onClick={() => {
          toast({
            title: 'Scheduled: Catch up',
            description: 'Friday, February 10, 2023 at 5:57 PM'
          });
        }}
      >
        Show Toast
      </Button>
    );
  },
  parameters: {
    docs: {
      story: {
        inline: false
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders trigger button correctly', async () => {
      const button = canvas.getByRole('button', { name: /show toast/i });
      await expect(button).toBeInTheDocument();
      await expect(button).toBeVisible();
    });

    await step('Shows toast on button click', async () => {
      const button = canvas.getByRole('button', { name: /show toast/i });
      await userEvent.click(button);

      // Wait for toast to appear
      await new Promise(resolve => setTimeout(resolve, 100));

      // Toast renders in a portal (document.body), not in canvasElement
      const bodyCanvas = within(document.body);
      const toast = bodyCanvas.getByText('Scheduled: Catch up');
      await expect(toast).toBeInTheDocument();

      const description = bodyCanvas.getByText('Friday, February 10, 2023 at 5:57 PM');
      await expect(description).toBeInTheDocument();
    });

    await step('Toast has close button', async () => {
      // Toast renders in a portal, so we need to query document.body
      // The close button has no accessible name (just an X icon), so we find it by attribute
      const closeButton = document.querySelector('[toast-close]');
      await expect(closeButton).toBeInTheDocument();
    });

    await step('Keyboard accessible', async () => {
      // Focus the show toast button directly (more reliable than tab with portal elements)
      const button = canvas.getByRole('button', { name: /show toast/i });
      button.focus();
      await expect(button).toHaveFocus();

      // Activate with Enter key
      await userEvent.keyboard('{Enter}');

      // Wait for toast to appear
      await new Promise(resolve => setTimeout(resolve, 100));

      // Toast renders in a portal (document.body)
      const bodyCanvas = within(document.body);
      const toast = bodyCanvas.getByText('Scheduled: Catch up');
      await expect(toast).toBeInTheDocument();
    });
  }
};

// Simple - from component page lines 189-192
export const Simple: Story = {
  render: () => {
    const { toast } = useToast();
    return (
      <Button
        onClick={() => {
          toast({
            description: 'Your message has been sent.'
          });
        }}
      >
        Show Simple Toast
      </Button>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Simple toast with only a description message.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders trigger button', async () => {
      const button = canvas.getByRole('button', { name: /show simple toast/i });
      await expect(button).toBeInTheDocument();
    });

    await step('Shows toast with description only', async () => {
      const button = canvas.getByRole('button', { name: /show simple toast/i });
      await userEvent.click(button);

      // Wait for toast to appear
      await new Promise(resolve => setTimeout(resolve, 100));

      // Toast renders in a portal (document.body)
      const bodyCanvas = within(document.body);
      const description = bodyCanvas.getByText('Your message has been sent.');
      await expect(description).toBeInTheDocument();
    });
  }
};

// With Title - from component page lines 210-214
export const WithTitle: Story = {
  render: () => {
    const { toast } = useToast();
    return (
      <Button
        onClick={() => {
          toast({
            title: 'Scheduled: Catch up',
            description: 'Friday, February 10, 2023 at 5:57 PM'
          });
        }}
      >
        Show Toast
      </Button>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Toast with both title and description.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders trigger button', async () => {
      const button = canvas.getByRole('button', { name: /show toast/i });
      await expect(button).toBeInTheDocument();
    });

    await step('Shows toast with title and description', async () => {
      const button = canvas.getByRole('button', { name: /show toast/i });
      await userEvent.click(button);

      // Wait for toast to appear
      await new Promise(resolve => setTimeout(resolve, 100));

      // Toast renders in a portal (document.body)
      const bodyCanvas = within(document.body);
      const title = bodyCanvas.getByText('Scheduled: Catch up');
      await expect(title).toBeInTheDocument();

      const description = bodyCanvas.getByText('Friday, February 10, 2023 at 5:57 PM');
      await expect(description).toBeInTheDocument();
    });
  }
};

// Destructive - from component page lines 233-238
export const Destructive: Story = {
  render: () => {
    const { toast } = useToast();
    return (
      <Button
        variant="destructive"
        onClick={() => {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: 'There was a problem with your request.'
          });
        }}
      >
        Show Error Toast
      </Button>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Destructive variant for error messages.'
      }
    }
  }
};

// Success - from component page lines 256-261
export const Success: Story = {
  render: () => {
    const { toast } = useToast();
    return (
      <Button
        onClick={() => {
          toast({
            variant: 'success',
            title: 'Success!',
            description: 'Your changes have been saved.'
          });
        }}
      >
        Show Success Toast
      </Button>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Success variant for positive feedback.'
      }
    }
  }
};

// All Variants
export const AllVariants: Story = {
  render: () => {
    const { toast } = useToast();
    return (
      <div className="flex flex-col gap-4">
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: 'Default Toast',
              description: 'This is a default toast notification.'
            });
          }}
        >
          Show Default
        </Button>
        <Button
          variant="destructive"
          onClick={() => {
            toast({
              variant: 'destructive',
              title: 'Error!',
              description: 'Something went wrong.'
            });
          }}
        >
          Show Destructive
        </Button>
        <Button
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={() => {
            toast({
              variant: 'success',
              title: 'Success!',
              description: 'Operation completed successfully.'
            });
          }}
        >
          Show Success
        </Button>
      </div>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Showcase of all toast variants: default, destructive, and success.'
      }
    }
  }
};

// RTL Simple
export const RTLSimple: Story = {
  render: () => {
    const { toast } = useToast();
    return (
      <Button
        onClick={() => {
          toast({
            description: 'تم إرسال رسالتك.'
          });
        }}
      >
        عرض توست بسيط
      </Button>
    );
  },
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Simple toast in RTL with Arabic text.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders in RTL context', async () => {
      const button = canvas.getByRole('button', { name: /عرض توست بسيط/i });
      await expect(button).toBeInTheDocument();
    });

    await step('Shows RTL toast with Arabic text', async () => {
      const button = canvas.getByRole('button', { name: /عرض توست بسيط/i });
      await userEvent.click(button);

      // Wait for toast to appear
      await new Promise(resolve => setTimeout(resolve, 100));

      // Toast renders in a portal (document.body)
      const bodyCanvas = within(document.body);
      const description = bodyCanvas.getByText('تم إرسال رسالتك.');
      await expect(description).toBeInTheDocument();
    });
  }
};

// RTL With Title
export const RTLWithTitle: Story = {
  render: () => {
    const { toast } = useToast();
    return (
      <Button
        onClick={() => {
          toast({
            title: 'مجدول: اللقاء',
            description: 'الجمعة، 10 فبراير 2023 الساعة 5:57 مساءً'
          });
        }}
      >
        عرض التوست
      </Button>
    );
  },
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Toast with title and description in RTL.'
      }
    }
  }
};

// RTL Destructive
export const RTLDestructive: Story = {
  render: () => {
    const { toast } = useToast();
    return (
      <Button
        variant="destructive"
        onClick={() => {
          toast({
            variant: 'destructive',
            title: 'عذراً! حدث خطأ ما.',
            description: 'كان هناك مشكلة في طلبك.'
          });
        }}
      >
        عرض توست خطأ
      </Button>
    );
  },
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Destructive toast in RTL with Arabic error message.'
      }
    }
  }
};

// RTL Success
export const RTLSuccess: Story = {
  render: () => {
    const { toast } = useToast();
    return (
      <Button
        onClick={() => {
          toast({
            variant: 'success',
            title: 'نجح!',
            description: 'تم حفظ تغييراتك.'
          });
        }}
      >
        عرض توست نجاح
      </Button>
    );
  },
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Success toast in RTL with Arabic success message.'
      }
    }
  }
};
