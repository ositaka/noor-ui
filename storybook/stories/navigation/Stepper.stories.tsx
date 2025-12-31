import type { Meta, StoryObj } from '@storybook/react';
import { Stepper, type Step } from '../../../components/ui/stepper';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
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
  title: 'Navigation/Stepper',
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
    allowSkip: false
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  render: (args) => (
    <div className="w-full max-w-4xl">
      <Stepper {...args} />
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

// Basic Stepper - from component page lines 184-206
export const BasicStepper: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = React.useState(1);

    return (
      <div className="w-full max-w-4xl space-y-8">
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Basic stepper with navigation buttons. Click steps to navigate or use Previous/Next buttons.'
      }
    }
  }
};

// Simple Variant - from component page lines 219-245
export const SimpleVariant: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = React.useState(1);

    return (
      <div className="w-full max-w-4xl space-y-8">
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Simple variant with compact style ideal for top navigation. Perfect for limited vertical space.'
      }
    }
  }
};

// Circles Variant - from component page lines 248-274
export const CirclesVariant: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = React.useState(1);

    return (
      <div className="w-full max-w-4xl space-y-8">
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Circles variant with large circles and scale effect. More visual emphasis on each step.'
      }
    }
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Vertical orientation for sidebar navigation. Great for multi-step forms with sidebar layout.'
      }
    }
  }
};

// With Allow Skip
export const WithAllowSkip: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = React.useState(0);

    return (
      <div className="w-full max-w-4xl space-y-8">
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Stepper with allowSkip enabled. Users can click any step to navigate freely.'
      }
    }
  }
};

// In Card
export const InCard: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = React.useState(2);

    return (
      <Card className="w-full max-w-4xl">
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Stepper placed inside a card component with title and navigation.'
      }
    }
  }
};

// RTL Example - Basic
export const RTLExample: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = React.useState(1);

    return (
      <div className="w-full max-w-4xl space-y-8">
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
            السابق
          </Button>
          <Button
            onClick={() => setCurrentStep(Math.min(stepsData.length - 1, currentStep + 1))}
            disabled={currentStep === stepsData.length - 1}
          >
            التالي
          </Button>
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
        story: 'Basic stepper in RTL mode with Arabic titles and descriptions. Connectors flow right-to-left.'
      }
    }
  }
};

// RTL Simple Variant
export const RTLSimpleVariant: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = React.useState(1);

    return (
      <div className="w-full max-w-4xl space-y-8">
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
            السابق
          </Button>
          <Button
            onClick={() => setCurrentStep(Math.min(stepsData.length - 1, currentStep + 1))}
            disabled={currentStep === stepsData.length - 1}
          >
            التالي
          </Button>
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
        story: 'Simple variant in RTL mode. Compact style with Arabic text flowing right-to-left.'
      }
    }
  }
};

// RTL Circles Variant
export const RTLCirclesVariant: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = React.useState(1);

    return (
      <div className="w-full max-w-4xl space-y-8">
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
            السابق
          </Button>
          <Button
            onClick={() => setCurrentStep(Math.min(stepsData.length - 1, currentStep + 1))}
            disabled={currentStep === stepsData.length - 1}
          >
            التالي
          </Button>
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
        story: 'Circles variant in RTL mode. Large circles with Arabic labels flowing naturally.'
      }
    }
  }
};

// RTL Vertical Orientation
export const RTLVerticalOrientation: Story = {
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
            السابق
          </Button>
          <Button
            onClick={() => setCurrentStep(Math.min(stepsData.length - 1, currentStep + 1))}
            disabled={currentStep === stepsData.length - 1}
          >
            التالي
          </Button>
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
        story: 'Vertical orientation in RTL mode. Text aligns correctly for right-to-left reading.'
      }
    }
  }
};
