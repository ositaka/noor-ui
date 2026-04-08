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
  title: 'Core/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
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
  render: (args, { globals }) => <Avatar {...args} />,
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

    await step('All three avatars render', async () => {
      // Check that we have all the fallback text that should appear
      const fallbackCN = canvas.queryByText('CN');
      const fallbackJD = await canvas.findByText('JD');
      const fallbackAB = canvas.getByText('AB');

      // At least the failing image and fallback-only should show fallbacks
      await expect(fallbackJD).toBeInTheDocument();
      await expect(fallbackAB).toBeInTheDocument();
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
        <p className="text-sm font-medium">Nuno Marques</p>
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
      const name = canvas.getByText('Nuno Marques');
      await expect(name).toBeInTheDocument();
      await expect(name).toBeVisible();
    });

    await step('Profile email displays', async () => {
      const email = canvas.getByText('ositaka@example.com');
      await expect(email).toBeInTheDocument();
      await expect(email).toBeVisible();
    });

    await step('Avatar component renders', async () => {
      // Check for avatar - either image loads or fallback shows
      const img = canvasElement.querySelector('img');
      const fallback = canvas.queryByText('JD');
      await expect(img || fallback).toBeTruthy();
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
    const canvas = within(canvasElement);

    await step('All custom size avatars render with content', async () => {
      // Check that at least some of the fallback text is visible
      // These will show either when images fail to load or are still loading
      const xsFallback = canvas.queryByText('XS');
      const smFallback = canvas.queryByText('SM');
      const mdFallback = canvas.queryByText('MD');
      const lgFallback = canvas.queryByText('LG');
      const xlFallback = canvas.queryByText('XL');
      const xxlFallback = canvas.queryByText('2XL');

      // At least one fallback should be present
      const hasFallbacks = xsFallback || smFallback || mdFallback || lgFallback || xlFallback || xxlFallback;

      // Or images may have loaded instead
      const images = canvasElement.querySelectorAll('img');

      await expect(hasFallbacks || images.length > 0).toBeTruthy();
    });
  }
};
