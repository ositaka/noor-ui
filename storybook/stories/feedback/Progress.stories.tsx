import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from '../../../components/ui/progress';
import { Button } from '../../../components/ui/button';
import * as React from 'react';

/**
 * Progress Component Stories
 *
 * All examples are taken from /app/(docs)/components/progress/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Progress displays completion progress with animated shimmer effect.
 * Features: Gradient background, RTL support, customizable sizes and colors.
 */

const meta = {
  title: 'Feedback/Progress',
  component: Progress,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'The progress value (0-100)'
    },
    max: {
      control: { type: 'number' },
      description: 'The maximum progress value'
    },
    className: { control: false },
    indicatorClassName: { control: false }
  }
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls
export const Default: Story = {
  args: {
    value: 66
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  render: (args) => <Progress {...args} className="w-full max-w-md" />,
  parameters: {
    docs: {
      story: {
        inline: false
      }
    }
  }
};

// Basic - from component page line 140
export const Basic: Story = {
  render: () => <Progress value={33} className="w-[60%]" />,
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Basic progress bar showing 33% completion.'
      }
    }
  }
};

// With Label - from component page lines 153-159
export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2 w-[60%]">
      <div className="flex justify-between text-sm">
        <span>Progress</span>
        <span>60%</span>
      </div>
      <Progress value={60} />
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Progress bar with label and percentage display.'
      }
    }
  }
};

// With Shimmer - from component page line 175
export const WithShimmer: Story = {
  render: () => (
    <div className="w-[60%]">
      <p className="text-sm text-muted-foreground mb-4">
        The progress bar includes an animated shimmer effect that continuously slides across,
        giving a "live" feel.
      </p>
      <Progress value={66} />
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Progress bar with animated shimmer effect for a live feel.'
      }
    }
  }
};

// Different Sizes - from component page lines 185-201
export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-4 w-[60%]">
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">Extra Small (h-1)</p>
        <Progress value={50} className="h-1" />
      </div>
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">Small (h-2, default)</p>
        <Progress value={50} className="h-2" />
      </div>
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">Medium (h-3)</p>
        <Progress value={50} className="h-3" />
      </div>
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">Large (h-4)</p>
        <Progress value={50} className="h-4" />
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
      disable: true,
      description: {
        story: 'Progress bars in different sizes from extra small to large.'
      }
    }
  }
};

// Different Colors - from component page lines 215-227
export const DifferentColors: Story = {
  render: () => (
    <div className="space-y-4 w-[60%]">
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">Blue</p>
        <Progress value={50} className="[&>div]:bg-blue-500" />
      </div>
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">Green</p>
        <Progress value={50} className="[&>div]:bg-green-500" />
      </div>
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">Red</p>
        <Progress value={50} className="[&>div]:bg-red-500" />
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
      disable: true,
      description: {
        story: 'Progress bars with custom colors (blue, green, red).'
      }
    }
  }
};

// Upload Progress - from component page lines 241-254
export const UploadProgress: Story = {
  render: () => {
    const [uploadProgress, setUploadProgress] = React.useState(0);

    const startUpload = () => {
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 300);
    };

    return (
      <div className="space-y-4 w-[60%]">
        <Button onClick={startUpload}>Start Upload</Button>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} />
          {uploadProgress === 100 && (
            <p className="text-sm text-green-600 dark:text-green-400">Upload complete!</p>
          )}
        </div>
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
      disable: true,
      description: {
        story: 'Simulated upload progress with start button and completion message.'
      }
    }
  }
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <div>
        <h4 className="text-sm font-medium mb-2">h-1</h4>
        <Progress value={25} className="h-1" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">h-2 (default)</h4>
        <Progress value={50} className="h-2" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">h-3</h4>
        <Progress value={75} className="h-3" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">h-4</h4>
        <Progress value={100} className="h-4" />
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
      disable: true,
      description: {
        story: 'Showcase of all available progress bar sizes.'
      }
    }
  }
};

// RTL Basic
export const RTLBasic: Story = {
  render: () => <Progress value={33} className="w-[60%]" />,
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Progress bar in RTL mode. The fill animates from right to left.'
      }
    }
  }
};

// RTL With Label
export const RTLWithLabel: Story = {
  render: () => (
    <div className="space-y-2 w-[60%]">
      <div className="flex justify-between text-sm">
        <span>التقدم</span>
        <span>60%</span>
      </div>
      <Progress value={60} />
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Progress bar with Arabic label and percentage in RTL layout.'
      }
    }
  }
};

// RTL Upload Progress
export const RTLUploadProgress: Story = {
  render: () => {
    const [uploadProgress, setUploadProgress] = React.useState(0);

    const startUpload = () => {
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 300);
    };

    return (
      <div className="space-y-4 w-[60%]">
        <Button onClick={startUpload}>بدء التحميل</Button>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>جاري التحميل...</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} />
          {uploadProgress === 100 && (
            <p className="text-sm text-green-600 dark:text-green-400">اكتمل التحميل!</p>
          )}
        </div>
      </div>
    );
  },
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Upload progress simulation with Arabic text in RTL layout.'
      }
    }
  }
};
