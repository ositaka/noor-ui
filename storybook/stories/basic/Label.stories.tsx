import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';

/**
 * Label Component Stories
 *
 * All examples are taken from /app/(docs)/components/label/page.tsx
 * Uses exact same text and data as the component documentation.
 */

const meta = {
  title: 'Basic/Label',
  component: Label,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls
export const Default: Story = {
  args: {
    children: 'Email Address',
    htmlFor: 'preview-input'
  },
  parameters: {
    ar: {
      args: {
        children: 'البريد الإلكتروني'
      }
    }
  },
  render: (args) => (
    <div className="w-full max-w-sm space-y-2">
      <Label {...args} />
      <Input id="preview-input" type="email" placeholder="name@example.com" />
    </div>
  ),
};

// With Input - from component page lines 224-227
export const WithInput: Story = {
  render: () => (
    <div className="max-w-sm space-y-2">
      <Label htmlFor="username">Username</Label>
      <Input id="username" placeholder="Enter your username" />
    </div>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Label is properly associated with input', async () => {
      const label = canvas.getByText('Username');
      const input = canvas.getByPlaceholderText('Enter your username');

      await expect(label).toHaveAttribute('for', 'username');
      await expect(input).toHaveAttribute('id', 'username');
    });

    await step('Clicking label focuses input', async () => {
      const label = canvas.getByText('Username');
      const input = canvas.getByPlaceholderText('Enter your username');

      await userEvent.click(label);
      await expect(input).toHaveFocus();
    });
  }
};

// Required Field - from component page lines 240-245
export const RequiredField: Story = {
  render: () => (
    <div className="max-w-sm space-y-2">
      <Label htmlFor="required-email">
        Email Address <span className="text-destructive">*</span>
      </Label>
      <Input id="required-email" type="email" required />
    </div>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Required indicator is visible', async () => {
      const asterisk = canvas.getByText('*');
      await expect(asterisk).toBeInTheDocument();
      await expect(asterisk).toBeVisible();
    });

    await step('Input has required attribute', async () => {
      const input = canvas.getByRole('textbox');
      await expect(input).toBeRequired();
      await expect(input).toHaveAttribute('type', 'email');
    });

    await step('Label is associated with required input', async () => {
      const label = canvas.getByText(/Email Address/);
      await expect(label).toHaveAttribute('for', 'required-email');
    });
  }
};

// With Helper Text - from component page lines 258-263
export const WithHelperText: Story = {
  render: () => (
    <div className="max-w-sm space-y-2">
      <Label htmlFor="password-helper">Password</Label>
      <Input id="password-helper" type="password" />
      <p className="text-sm text-muted-foreground">
        Must be at least 8 characters long
      </p>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Label and helper text are visible', async () => {
      await expect(canvas.getByText('Password')).toBeVisible();
      await expect(canvas.getByText('Must be at least 8 characters long')).toBeVisible();
    });

    await step('Label is associated with password input', async () => {
      const label = canvas.getByText('Password');
      const input = canvas.getByLabelText('Password');

      await expect(label).toHaveAttribute('for', 'password-helper');
      await expect(input).toHaveAttribute('type', 'password');
    });
  }
};

// Disabled State - from component page lines 277-283
export const DisabledState: Story = {
  render: () => (
    <div className="max-w-sm space-y-2">
      <Label htmlFor="disabled-input">Disabled Field</Label>
      <Input id="disabled-input" disabled placeholder="Can't edit this" />
      <p className="text-sm text-muted-foreground">
        Note how the label automatically becomes dimmed when the input is disabled
      </p>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Input is disabled', async () => {
      const input = canvas.getByPlaceholderText("Can't edit this");
      await expect(input).toBeDisabled();
    });

    await step('Label is still associated with disabled input', async () => {
      const label = canvas.getByText('Disabled Field');
      await expect(label).toHaveAttribute('for', 'disabled-input');
    });
  }
};

// Horizontal Layout - from component page lines 296-309
export const HorizontalLayout: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Label htmlFor="inline-first" className="w-32 text-end">
          First Name
        </Label>
        <Input id="inline-first" className="flex-1" />
      </div>
      <div className="flex items-center gap-4">
        <Label htmlFor="inline-last" className="w-32 text-end">
          Last Name
        </Label>
        <Input id="inline-last" className="flex-1" />
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Both labels are properly associated', async () => {
      const firstLabel = canvas.getByText('First Name');
      const lastLabel = canvas.getByText('Last Name');

      await expect(firstLabel).toHaveAttribute('for', 'inline-first');
      await expect(lastLabel).toHaveAttribute('for', 'inline-last');
    });

    await step('Clicking labels focuses respective inputs', async () => {
      const firstLabel = canvas.getByText('First Name');
      const firstInput = canvas.getByLabelText('First Name');

      await userEvent.click(firstLabel);
      await expect(firstInput).toHaveFocus();

      const lastLabel = canvas.getByText('Last Name');
      const lastInput = canvas.getByLabelText('Last Name');

      await userEvent.click(lastLabel);
      await expect(lastInput).toHaveFocus();
    });
  }
};

// Complete Form - from component page lines 322-346
export const CompleteForm: Story = {
  render: () => (
    <form
      className="max-w-sm space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        alert('Form submitted!');
      }}
    >
      <div className="space-y-2">
        <Label htmlFor="first-name">First Name</Label>
        <Input id="first-name" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="last-name">Last Name</Label>
        <Input id="last-name" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="form-email">Email</Label>
        <Input id="form-email" type="email" required />
      </div>

      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Form has proper structure', async () => {
      const form = canvas.getByRole('button', { name: 'Submit' }).closest('form');
      await expect(form).toBeInTheDocument();
    });

    await step('All labels are properly associated', async () => {
      await expect(canvas.getByText('First Name')).toHaveAttribute('for', 'first-name');
      await expect(canvas.getByText('Last Name')).toHaveAttribute('for', 'last-name');
      await expect(canvas.getByText('Email')).toHaveAttribute('for', 'form-email');
    });

    await step('All inputs are required', async () => {
      await expect(canvas.getByLabelText('First Name')).toBeRequired();
      await expect(canvas.getByLabelText('Last Name')).toBeRequired();
      await expect(canvas.getByLabelText('Email')).toBeRequired();
    });

    await step('Form inputs are keyboard accessible', async () => {
      const firstNameInput = canvas.getByLabelText('First Name');
      await userEvent.click(firstNameInput);
      await userEvent.type(firstNameInput, 'John');
      await expect(firstNameInput).toHaveValue('John');

      await userEvent.tab();
      const lastNameInput = canvas.getByLabelText('Last Name');
      await expect(lastNameInput).toHaveFocus();
      await userEvent.type(lastNameInput, 'Doe');
      await expect(lastNameInput).toHaveValue('Doe');
    });
  }
};

// Custom Styling - from component page lines 360-373
export const CustomStyling: Story = {
  render: () => (
    <div className="max-w-sm space-y-4">
      <div className="space-y-2">
        <Label htmlFor="styled-1" className="text-lg font-bold text-primary">
          Custom Styled Label
        </Label>
        <Input id="styled-1" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="styled-2" className="text-xs uppercase tracking-wider">
          Small Uppercase Label
        </Label>
        <Input id="styled-2" />
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Both custom styled labels are visible', async () => {
      await expect(canvas.getByText('Custom Styled Label')).toBeVisible();
      await expect(canvas.getByText('Small Uppercase Label')).toBeVisible();
    });

    await step('Labels are properly associated with inputs', async () => {
      const label1 = canvas.getByText('Custom Styled Label');
      const label2 = canvas.getByText('Small Uppercase Label');

      await expect(label1).toHaveAttribute('for', 'styled-1');
      await expect(label2).toHaveAttribute('for', 'styled-2');

      // Clicking labels focuses inputs
      await userEvent.click(label1);
      await expect(canvas.getByLabelText('Custom Styled Label')).toHaveFocus();
    });
  }
};

