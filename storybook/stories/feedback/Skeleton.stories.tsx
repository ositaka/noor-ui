import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '../../../components/ui/skeleton';
import { Card, CardContent } from '../../../components/ui/card';

/**
 * Skeleton Component Stories
 *
 * All examples are taken from /app/(docs)/components/skeleton/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Skeleton provides animated loading placeholders.
 * Features: Pulse animation, customizable dimensions, RTL support.
 */

const meta = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered'
  },
  tags: ['!autodocs'],
  argTypes: {
    className: { control: false }
  }
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground
export const Default: Story = {
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  render: () => (
    <div className="flex items-center space-x-4 space-x-reverse">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-full max-w-sm" />
        <Skeleton className="h-4 w-3/4 max-w-xs" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      story: {
        inline: false
      }
    }
  }
};

// Card Skeleton - from component page lines 150-156
export const CardSkeleton: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-48 w-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
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
        story: 'Card skeleton with image placeholder and text lines.'
      }
    }
  }
};

// Profile Skeleton - from component page lines 169-175
export const ProfileSkeleton: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 space-x-reverse">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
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
        story: 'Profile skeleton with avatar and two text lines.'
      }
    }
  }
};

// List Skeleton - from component page lines 188-197
export const ListSkeleton: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-4 space-x-reverse">
              <Skeleton className="h-10 w-10 rounded" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          ))}
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
        story: 'List skeleton with three items, each with icon and text.'
      }
    }
  }
};

// Text Lines
export const TextLines: Story = {
  render: () => (
    <div className="space-y-2 w-full max-w-md">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
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
        story: 'Multiple text line skeletons with varying widths.'
      }
    }
  }
};

// Avatar Sizes
export const AvatarSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton className="h-8 w-8 rounded-full" />
      <Skeleton className="h-10 w-10 rounded-full" />
      <Skeleton className="h-12 w-12 rounded-full" />
      <Skeleton className="h-16 w-16 rounded-full" />
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
        story: 'Avatar skeletons in different sizes.'
      }
    }
  }
};

// Button Skeleton
export const ButtonSkeleton: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton className="h-9 w-20" />
      <Skeleton className="h-9 w-24" />
      <Skeleton className="h-9 w-28" />
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
        story: 'Button-shaped skeletons in different widths.'
      }
    }
  }
};

// All Patterns
export const AllPatterns: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <div>
        <h4 className="text-sm font-medium mb-2">Text Lines</h4>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Avatar</h4>
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Button</h4>
        <Skeleton className="h-9 w-24" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Image</h4>
        <Skeleton className="h-48 w-full" />
      </div>
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
        story: 'Showcase of common skeleton patterns.'
      }
    }
  }
};

// RTL Card Skeleton
export const RTLCardSkeleton: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-48 w-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
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
        story: 'Card skeleton in RTL mode.'
      }
    }
  }
};

// RTL Profile Skeleton
export const RTLProfileSkeleton: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 space-x-reverse">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
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
        story: 'Profile skeleton in RTL with space-x-reverse for proper spacing.'
      }
    }
  }
};

// RTL List Skeleton
export const RTLListSkeleton: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-4 space-x-reverse">
              <Skeleton className="h-10 w-10 rounded" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          ))}
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
        story: 'List skeleton in RTL layout with reversed spacing.'
      }
    }
  }
};
