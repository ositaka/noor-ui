import type { Meta, StoryObj } from '@storybook/react';
import { Stepper, type Step } from '../../../components/ui/stepper';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { expect, userEvent, within, fn } from 'storybook/test';
import * as React from 'react';

/**
 * Stepper Component Stories
 *
 * All examples are taken from /app/(docs)/components/stepper/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Stepper provides a multi-step progress indicator for forms and wizards.
 * Three variants (default, simple, circles) and two orientations (horizontal, vertical).
 * Full RTL support with bilingual titles and descriptions.
 */

const meta = {
  title: 'User Interface/Stepper',
  component: Stepper,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    steps: {
      control: false
    },
    currentStep: {
      control: { type: 'number', min: 0, max: 4 }
    },
    onStepClick: {
      control: false
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical']
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'simple', 'circles']
    },
    allowSkip: {
      control: { type: 'boolean' }
    }
  }
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default steps data - from component page lines 110-140
const stepsData: Step[] = [
  {
    id: '1',
    title: 'Account Information',
    titleAr: 'معلومات الحساب',
    description: 'Enter your basic details',
    descriptionAr: 'أدخل التفاصيل الأساسية'
  },
  {
    id: '2',
    title: 'Personal Details',
    titleAr: 'التفاصيل الشخصية',
    description: 'Tell us more about yourself',
    descriptionAr: 'أخبرنا المزيد عن نفسك'
  },
  {
    id: '3',
    title: 'Preferences',
    titleAr: 'التفضيلات',
    description: 'Customize your experience',
    descriptionAr: 'خصص تجربتك',
    optional: true
  },
  {
    id: '4',
    title: 'Review',
    titleAr: 'المراجعة',
    description: 'Confirm your information',
    descriptionAr: 'أكد معلوماتك'
  },
  {
    id: '5',
    title: 'Complete',
    titleAr: 'مكتمل',
    description: 'You\'re all set!',
    descriptionAr: 'كل شيء جاهز!'
  },
];

// Default - Interactive playground with controls (hidden from stories list to avoid ID conflicts)
export const Default: Story = {
  args: {
    steps: stepsData,
    currentStep: 1,
    orientation: 'horizontal',
    variant: 'default',
    allowSkip: false,
    onStepClick: fn()
  },
  render: (args) => (
    <div className="w-full max-w-4xl" style={{ minWidth: '800px'}}>
      <Stepper {...args} />
    </div>
  ),
};

// Basic Stepper - from component page lines 184-206
export const BasicStepper: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = React.useState(1);

    return (
      <div className="w-full max-w-4xl space-y-8" style={{ minWidth: '800px'}}>
        <Stepper
          steps={stepsData}
          currentStep={currentStep}
          onStepClick={setCurrentStep}
        />
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentStep(Math.min(stepsData.length - 1, currentStep + 1))}
            disabled={currentStep === stepsData.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Basic stepper with navigation buttons. Click steps to navigate or use Previous/Next buttons.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders with navigation buttons', async () => {
      const previousButton = canvas.getByRole('button', { name: /previous/i });
      const nextButton = canvas.getByRole('button', { name: /next/i });
      await expect(previousButton).toBeInTheDocument();
      await expect(nextButton).toBeInTheDocument();
    });

    await step('Next button advances step', async () => {
      const nextButton = canvas.getByRole('button', { name: /next/i });
      const stepButtons = canvas.getAllByRole('button').filter(btn => !btn.textContent?.match(/previous|next/i));

      await userEvent.click(nextButton);

      // After clicking Next, currentStep should be 2 (index 2)
      await expect(stepButtons[2]).toHaveAttribute('aria-current', 'step');
    });

    await step('Previous button goes back', async () => {
      const previousButton = canvas.getByRole('button', { name: /previous/i });
      const stepButtons = canvas.getAllByRole('button').filter(btn => !btn.textContent?.match(/previous|next/i));

      await userEvent.click(previousButton);

      // Should be back to step 1 (index 1)
      await expect(stepButtons[1]).toHaveAttribute('aria-current', 'step');
    });

    await step('Can click on completed step to navigate', async () => {
      const stepButtons = canvas.getAllByRole('button').filter(btn => !btn.textContent?.match(/previous|next/i));
      const firstStep = stepButtons[0];

      await userEvent.click(firstStep);

      await expect(firstStep).toHaveAttribute('aria-current', 'step');
    });

    await step('Previous button disabled at first step', async () => {
      const previousButton = canvas.getByRole('button', { name: /previous/i });
      await expect(previousButton).toBeDisabled();
    });
  }
};

// Simple Variant - from component page lines 219-245
export const SimpleVariant: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = React.useState(1);

    return (
      <div className="w-full max-w-4xl space-y-8" style={{ minWidth: '900px'}}>
        <Stepper
          steps={stepsData}
          currentStep={currentStep}
          onStepClick={setCurrentStep}
          variant="simple"
        />
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentStep(Math.min(stepsData.length - 1, currentStep + 1))}
            disabled={currentStep === stepsData.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Simple variant with compact style ideal for top navigation. Perfect for limited vertical space.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders simple variant correctly', async () => {
      const stepButtons = canvas.getAllByRole('button').filter(btn => !btn.textContent?.match(/previous|next/i));
      await expect(stepButtons).toHaveLength(5);
    });

    await step('Simple variant navigation works', async () => {
      const nextButton = canvas.getByRole('button', { name: /next/i });
      await userEvent.click(nextButton);

      const stepButtons = canvas.getAllByRole('button').filter(btn => !btn.textContent?.match(/previous|next/i));
      await expect(stepButtons[2]).toHaveAttribute('aria-current', 'step');
    });

    await step('Clicking step in simple variant works', async () => {
      const stepButtons = canvas.getAllByRole('button').filter(btn => !btn.textContent?.match(/previous|next/i));
      await userEvent.click(stepButtons[0]);

      await expect(stepButtons[0]).toHaveAttribute('aria-current', 'step');
    });
  }
};

// Circles Variant - from component page lines 248-274
export const CirclesVariant: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = React.useState(1);

    return (
      <div className="w-full max-w-4xl space-y-8" style={{ minWidth: '800px'}}>
        <Stepper
          steps={stepsData}
          currentStep={currentStep}
          onStepClick={setCurrentStep}
          variant="circles"
        />
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentStep(Math.min(stepsData.length - 1, currentStep + 1))}
            disabled={currentStep === stepsData.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Circles variant with large circles and scale effect. More visual emphasis on each step.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders circles variant correctly', async () => {
      const stepButtons = canvas.getAllByRole('button').filter(btn => !btn.textContent?.match(/previous|next/i));
      await expect(stepButtons).toHaveLength(5);
    });

    await step('Circles variant navigation works', async () => {
      const nextButton = canvas.getByRole('button', { name: /next/i });
      await userEvent.click(nextButton);

      const stepButtons = canvas.getAllByRole('button').filter(btn => !btn.textContent?.match(/previous|next/i));
      await expect(stepButtons[2]).toHaveAttribute('aria-current', 'step');
    });

    await step('Clicking step in circles variant works', async () => {
      const stepButtons = canvas.getAllByRole('button').filter(btn => !btn.textContent?.match(/previous|next/i));
      await userEvent.click(stepButtons[1]);

      await expect(stepButtons[1]).toHaveAttribute('aria-current', 'step');
    });
  }
};

// Vertical Orientation - from component page lines 282-309
export const VerticalOrientation: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = React.useState(1);

    return (
      <div className="flex gap-8">
        <Stepper
          steps={stepsData}
          currentStep={currentStep}
          onStepClick={setCurrentStep}
          orientation="vertical"
        />
        <div className="flex flex-col gap-4">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentStep(Math.min(stepsData.length - 1, currentStep + 1))}
            disabled={currentStep === stepsData.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Vertical orientation for sidebar navigation. Great for multi-step forms with sidebar layout.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders vertical orientation correctly', async () => {
      const stepButtons = canvas.getAllByRole('button').filter(btn => !btn.textContent?.match(/previous|next/i));
      await expect(stepButtons).toHaveLength(5);
      await expect(canvas.getByText('Personal Details')).toBeVisible();
    });

    await step('Vertical orientation navigation works', async () => {
      const nextButton = canvas.getByRole('button', { name: /next/i });
      await userEvent.click(nextButton);

      const stepButtons = canvas.getAllByRole('button').filter(btn => !btn.textContent?.match(/previous|next/i));
      await expect(stepButtons[2]).toHaveAttribute('aria-current', 'step');
    });

    await step('Clicking step in vertical orientation works', async () => {
      const stepButtons = canvas.getAllByRole('button').filter(btn => !btn.textContent?.match(/previous|next/i));
      await userEvent.click(stepButtons[0]);

      await expect(stepButtons[0]).toHaveAttribute('aria-current', 'step');
    });
  }
};

// With Allow Skip
export const WithAllowSkip: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = React.useState(0);

    return (
      <div className="w-full max-w-4xl space-y-8" style={{ minWidth: '800px'}}>
        <Stepper
          steps={stepsData}
          currentStep={currentStep}
          onStepClick={setCurrentStep}
          allowSkip={true}
        />
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentStep(Math.min(stepsData.length - 1, currentStep + 1))}
            disabled={currentStep === stepsData.length - 1}
          >
            Next
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          With allowSkip enabled, you can click any step to jump ahead or back.
        </p>
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Stepper with allowSkip enabled. Users can click any step to navigate freely.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders with allowSkip enabled', async () => {
      const stepButtons = canvas.getAllByRole('button').filter(btn => !btn.textContent?.match(/previous|next/i));
      await expect(stepButtons).toHaveLength(5);
    });

    await step('Can skip to future steps', async () => {
      const stepButtons = canvas.getAllByRole('button').filter(btn => !btn.textContent?.match(/previous|next/i));
      const futureStep = stepButtons[3]; // Step 4

      await userEvent.click(futureStep);

      await expect(futureStep).toHaveAttribute('aria-current', 'step');
    });

    await step('Can skip back to any previous step', async () => {
      const stepButtons = canvas.getAllByRole('button').filter(btn => !btn.textContent?.match(/previous|next/i));
      const firstStep = stepButtons[0];

      await userEvent.click(firstStep);

      await expect(firstStep).toHaveAttribute('aria-current', 'step');
    });

    await step('Can jump to last step directly', async () => {
      const stepButtons = canvas.getAllByRole('button').filter(btn => !btn.textContent?.match(/previous|next/i));
      const lastStep = stepButtons[4];

      await userEvent.click(lastStep);

      await expect(lastStep).toHaveAttribute('aria-current', 'step');
    });
  }
};

// In Card
export const InCard: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = React.useState(2);

    return (
      <Card className="w-full max-w-4xl" style={{ minWidth: '800px'}}>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-6">Registration Progress</h3>
          <Stepper
            steps={stepsData}
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <Button
              onClick={() => setCurrentStep(Math.min(stepsData.length - 1, currentStep + 1))}
              disabled={currentStep === stepsData.length - 1}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Stepper placed inside a card component with title and navigation.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders inside card with title', async () => {
      await expect(canvas.getByText('Registration Progress')).toBeVisible();
      const stepper = canvas.getByRole('navigation', { name: /progress/i });
      await expect(stepper).toBeInTheDocument();
    });

    await step('Stepper functionality works in card context', async () => {
      const nextButton = canvas.getByRole('button', { name: /next/i });
      await userEvent.click(nextButton);

      const stepButtons = canvas.getAllByRole('button').filter(btn => !btn.textContent?.match(/previous|next/i));
      await expect(stepButtons[3]).toHaveAttribute('aria-current', 'step');
    });

    await step('Navigation in card works correctly', async () => {
      const previousButton = canvas.getByRole('button', { name: /previous/i });
      await userEvent.click(previousButton);

      const stepButtons = canvas.getAllByRole('button').filter(btn => !btn.textContent?.match(/previous|next/i));
      await expect(stepButtons[2]).toHaveAttribute('aria-current', 'step');
    });
  }
};

