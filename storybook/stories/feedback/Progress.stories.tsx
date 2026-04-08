import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { Progress } from '../../../components/ui/progress';
import { Button } from '../../../components/ui/button';
import * as React from 'react';

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
  render: (args, { globals }) => <Progress {...args} className="w-80 max-w-md" />,
};

// Basic - from component page line 140
export const Basic: Story = {
  render: () => <Progress value={33} className="w-80" />,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Basic progress bar showing 33% completion.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders basic progress bar', async () => {
      const progressBar = canvas.getByRole('progressbar');
      await expect(progressBar).toBeInTheDocument();
      await expect(progressBar).toHaveAttribute('aria-valuenow', '33');
    });
  }
};

// With Label - from component page lines 153-159
export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2 w-80">
      <div className="flex justify-between text-sm">
        <span>Progress</span>
        <span>60%</span>
      </div>
      <Progress value={60} />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Progress bar with label and percentage display.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders progress bar with label', async () => {
      await expect(canvas.getByText('Progress')).toBeInTheDocument();
      await expect(canvas.getByText('60%')).toBeInTheDocument();
      await expect(canvas.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '60');
    });
  }
};

// With Shimmer - from component page line 175
export const WithShimmer: Story = {
  render: () => (
    <div className="w-80">
      <p className="text-sm text-muted-foreground mb-4">
        The progress bar includes an animated shimmer effect that continuously slides across,
        giving a "live" feel.
      </p>
      <Progress value={66} />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Progress bar with animated shimmer effect for a live feel.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders progress bar with shimmer effect', async () => {
      const progressBar = canvas.getByRole('progressbar');
      await expect(progressBar).toBeInTheDocument();
      await expect(canvas.getByText(/animated shimmer effect/i)).toBeInTheDocument();
    });
  }
};

// Different Sizes - from component page lines 185-201
export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Progress bars in different sizes from extra small to large.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders progress bars in different sizes', async () => {
      const progressBars = canvas.getAllByRole('progressbar');
      await expect(progressBars).toHaveLength(4);
      await expect(canvas.getByText(/Extra Small/i)).toBeInTheDocument();
      await expect(canvas.getByText(/Large \(h-4\)/i)).toBeInTheDocument();
    });
  }
};

// Different Colors - from component page lines 215-227
export const DifferentColors: Story = {
  render: () => (
    <div className="space-y-4 w-80">
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Progress bars with custom colors (blue, green, red).'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders progress bars with different colors', async () => {
      const progressBars = canvas.getAllByRole('progressbar');
      await expect(progressBars).toHaveLength(3);
      await expect(canvas.getByText('Blue')).toBeInTheDocument();
      await expect(canvas.getByText('Green')).toBeInTheDocument();
      await expect(canvas.getByText('Red')).toBeInTheDocument();
    });
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
      <div className="space-y-4 w-80">
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Simulated upload progress with start button and completion message.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders upload progress UI', async () => {
      await expect(canvas.getByRole('button', { name: /start upload/i })).toBeInTheDocument();
      await expect(canvas.getByRole('progressbar')).toBeInTheDocument();
      await expect(canvas.getByText('Uploading...')).toBeInTheDocument();
    });

    await step('Initial progress is 0%', async () => {
      const progressBar = canvas.getByRole('progressbar');
      await expect(progressBar).toHaveAttribute('aria-valuenow', '0');
      await expect(canvas.getByText('0%')).toBeInTheDocument();
    });

    await step('Starts upload simulation on button click', async () => {
      const button = canvas.getByRole('button', { name: /start upload/i });
      await userEvent.click(button);

      // Wait for progress to update
      await new Promise(resolve => setTimeout(resolve, 400));

      const progressBar = canvas.getByRole('progressbar');
      const currentValue = parseInt(progressBar.getAttribute('aria-valuenow') || '0');
      await expect(currentValue).toBeGreaterThan(0);
    });

    await step('Shows completion message at 100%', async () => {
      // Wait for upload to complete (100% takes about 3 seconds: 10 intervals * 300ms)
      await new Promise(resolve => setTimeout(resolve, 3500));

      const progressBar = canvas.getByRole('progressbar');
      await expect(progressBar).toHaveAttribute('aria-valuenow', '100');
      await expect(canvas.getByText('Upload complete!')).toBeInTheDocument();
    });
  }
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6 w-80 max-w-md">
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Showcase of all available progress bar sizes.'
      }
    }
  }
};
