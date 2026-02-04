import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '../../../components/ui/avatar';

/**
 * Avatar Component Stories
 *
 * All examples are taken from /app/(docs)/components/avatar/page.tsx
 * Uses exact same text and data as the component documentation.
 */

const meta = {
  title: 'Basic/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered'
  },
  tags: ['!autodocs']
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls
export const Default: Story = {
  args: {
    children: (
      <>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </>
    )
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  render: (args) => <Avatar {...args} />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders avatar with image', async () => {
      const img = canvas.getByRole('img', { name: '@shadcn' });
      await expect(img).toBeInTheDocument();
      await expect(img).toBeVisible();
    });

    await step('Has proper accessibility attributes', async () => {
      const img = canvas.getByRole('img', { name: '@shadcn' });
      await expect(img).toHaveAttribute('alt', '@shadcn');
      await expect(img).toHaveAttribute('src', 'https://github.com/shadcn.png');
    });
  }
};

// With Fallback - from component page lines 170-182
export const WithFallback: Story = {
  render: () => (
    <div className="flex gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="Loaded" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="/invalid-url.png" alt="Failed" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Loaded image renders correctly', async () => {
      const loadedImg = canvas.getByRole('img', { name: 'Loaded' });
      await expect(loadedImg).toBeInTheDocument();
      await expect(loadedImg).toBeVisible();
    });

    await step('Failed image shows fallback initials', async () => {
      // Wait for fallback to appear after image fails to load
      const fallback = await canvas.findByText('JD');
      await expect(fallback).toBeInTheDocument();
      await expect(fallback).toBeVisible();
    });

    await step('Fallback-only avatar renders', async () => {
      const fallbackOnly = canvas.getByText('AB');
      await expect(fallbackOnly).toBeInTheDocument();
      await expect(fallbackOnly).toBeVisible();
    });
  }
};

// All Sizes - from component page lines 192-209
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback className="text-xs">CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="h-16 w-16">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback className="text-lg">CN</AvatarFallback>
      </Avatar>
      <Avatar className="h-24 w-24">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback className="text-2xl">CN</AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  }
};

// Avatar Group - from component page lines 219-234
export const AvatarGroup: Story = {
  render: () => (
    <div className="flex -space-x-4">
      <Avatar className="border-2 border-background">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background">
        <AvatarImage src="https://github.com/vercel.png" />
        <AvatarFallback>VC</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background">
        <AvatarFallback>+3</AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('All avatars in group render', async () => {
      const fallbackAB = canvas.getByText('AB');
      await expect(fallbackAB).toBeInTheDocument();
      await expect(fallbackAB).toBeVisible();
    });

    await step('Overflow counter displays correctly', async () => {
      const overflowCounter = canvas.getByText('+3');
      await expect(overflowCounter).toBeInTheDocument();
      await expect(overflowCounter).toBeVisible();
    });
  }
};

// With Profile - from component page RTL example lines 251-260
export const WithProfile: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <p className="text-sm font-medium">John Doe</p>
        <p className="text-sm text-muted-foreground">ositaka@example.com</p>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Avatar renders with profile info', async () => {
      const name = canvas.getByText('John Doe');
      await expect(name).toBeInTheDocument();
      await expect(name).toBeVisible();
    });

    await step('Profile email displays', async () => {
      const email = canvas.getByText('ositaka@example.com');
      await expect(email).toBeInTheDocument();
      await expect(email).toBeVisible();
    });

    await step('Avatar image renders', async () => {
      const img = canvasElement.querySelector('img');
      await expect(img).toBeInTheDocument();
    });
  }
};

// RTL With Profile - from component page lines 251-260 with Arabic text
export const RTLWithProfile: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>جد</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <p className="text-sm font-medium">جون دو</p>
        <p className="text-sm text-muted-foreground">ositaka@example.com</p>
      </div>
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
        story: 'Avatar with profile text demonstrating RTL support. Automatically switches to RTL mode.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders in RTL context', async () => {
      const name = canvas.getByText('جون دو');
      await expect(name).toBeInTheDocument();
      await expect(name).toBeVisible();
    });

    await step('RTL profile has avatar', async () => {
      const img = canvasElement.querySelector('img');
      await expect(img).toBeInTheDocument();
    });
  }
};

// RTL Avatar Group - from component page lines 261-276
export const RTLAvatarGroup: Story = {
  render: () => (
    <div className="flex -space-x-4">
      <Avatar className="border-2 border-background">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background">
        <AvatarImage src="https://github.com/vercel.png" />
        <AvatarFallback>VC</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background">
        <AvatarFallback>+5</AvatarFallback>
      </Avatar>
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
        story: 'Avatar group with proper RTL overlapping. Automatically switches to RTL mode.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders RTL avatar group', async () => {
      const counter = canvas.getByText('+5');
      await expect(counter).toBeInTheDocument();
      await expect(counter).toBeVisible();
    });

    await step('All avatars present in RTL', async () => {
      const fallback = canvas.getByText('AB');
      await expect(fallback).toBeInTheDocument();
    });
  }
};

// Fallback Only
export const FallbackOnly: Story = {
  render: () => (
    <div className="flex gap-4">
      <Avatar>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>+2</AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('All fallback avatars render', async () => {
      await expect(canvas.getByText('CN')).toBeInTheDocument();
      await expect(canvas.getByText('JD')).toBeInTheDocument();
      await expect(canvas.getByText('AB')).toBeInTheDocument();
      await expect(canvas.getByText('+2')).toBeInTheDocument();
    });

    await step('Fallback initials are visible', async () => {
      await expect(canvas.getByText('CN')).toBeVisible();
      await expect(canvas.getByText('JD')).toBeVisible();
      await expect(canvas.getByText('AB')).toBeVisible();
      await expect(canvas.getByText('+2')).toBeVisible();
    });
  }
};

// Custom Sizes
export const CustomSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar className="h-6 w-6">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback className="text-[8px]">XS</AvatarFallback>
      </Avatar>
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback className="text-xs">SM</AvatarFallback>
      </Avatar>
      <Avatar className="h-10 w-10">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback className="text-sm">MD</AvatarFallback>
      </Avatar>
      <Avatar className="h-14 w-14">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
      <Avatar className="h-20 w-20">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback className="text-xl">XL</AvatarFallback>
      </Avatar>
      <Avatar className="h-28 w-28">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback className="text-3xl">2XL</AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    await step('All custom size avatars render', async () => {
      const avatars = canvasElement.querySelectorAll('span[class*="rounded-full"]');
      await expect(avatars.length).toBeGreaterThanOrEqual(6);
    });

    await step('Avatar images load', async () => {
      const images = canvasElement.querySelectorAll('img');
      await expect(images.length).toBeGreaterThanOrEqual(1);
    });
  }
};
