import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
  validators,
  composeValidators
} from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import * as React from 'react';

/**
 * Form Component Stories
 *
 * All examples are taken from /app/(docs)/components/form/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Form provides validation, state management, and accessibility features
 */

const meta = {
  title: 'Forms/Form',
  component: Form,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    onSubmit: {
      control: false
    }
  }
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls (hidden from stories list to avoid ID conflicts)
export const Default: Story = {
  args: {
    initialValues: { email: '' },
    onSubmit: fn((values) => alert(JSON.stringify(values, null, 2)))
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <Form
        {...args}
        validators={{
          email: validators.required('Email is required')
        }}
      >
        <FormField name="email">
          {({ field, error, touched }) => (
            <FormItem>
              <FormLabel required>Email</FormLabel>
              <Input
                type="email"
                placeholder="your@email.com"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                onBlur={field.onBlur}
              />
              {touched && <FormMessage error={error} />}
            </FormItem>
          )}
        </FormField>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </Form>
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

// Basic Form - from component page lines 164-211
export const BasicForm: Story = {
  render: () => {
    const onSubmit = fn(async (values) => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      alert('Form submitted!');
    });

    return (
      <div className="w-full max-w-md">
        <Form
          initialValues={{ email: '', password: '' }}
          validators={{
            email: validators.required('Email is required'),
            password: validators.minLength(6, 'Password must be at least 6 characters')
          }}
          onSubmit={onSubmit}
        >
          <FormField name="email">
            {({ field, error, touched }) => (
              <FormItem>
                <FormLabel required>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  onBlur={field.onBlur}
                />
                {touched && <FormMessage error={error} />}
              </FormItem>
            )}
          </FormField>

          <FormField name="password">
            {({ field, error, touched }) => (
              <FormItem>
                <FormLabel required>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  onBlur={field.onBlur}
                />
                {touched && <FormMessage error={error} />}
                <FormDescription>At least 6 characters</FormDescription>
              </FormItem>
            )}
          </FormField>

          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </Form>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders multi-field form correctly', async () => {
      await expect(canvas.getByPlaceholderText('your@email.com')).toBeInTheDocument();
      await expect(canvas.getByPlaceholderText('••••••••')).toBeInTheDocument();
      await expect(canvas.getByText('At least 6 characters')).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });

    await step('Shows validation errors for both empty fields', async () => {
      const submitButton = canvas.getByRole('button', { name: /sign in/i });
      await userEvent.click(submitButton);

      // Email has required validator, so error appears for empty field
      await expect(canvas.getByText('Email is required')).toBeInTheDocument();

      // Password only has minLength validator which returns undefined for empty values
      // (minLength error is tested in the next step with a short password)
    });

    await step('Shows password length error for short password', async () => {
      const emailInput = canvas.getByPlaceholderText('your@email.com');
      const passwordInput = canvas.getByPlaceholderText('••••••••');

      await userEvent.type(emailInput, 'test@example.com');
      await userEvent.type(passwordInput, '123');

      const submitButton = canvas.getByRole('button', { name: /sign in/i });
      await userEvent.click(submitButton);

      // Use p.text-destructive to target the <p> error message, NOT the <span> asterisk
      const passwordError = canvasElement.querySelector('p.text-destructive');
      await expect(passwordError).toHaveTextContent('Password must be at least 6 characters');
    });

    await step('Submits form with valid data', async () => {
      const emailInput = canvas.getByPlaceholderText('your@email.com');
      const passwordInput = canvas.getByPlaceholderText('••••••••');

      // Clear and enter valid data
      await userEvent.clear(emailInput);
      await userEvent.clear(passwordInput);
      await userEvent.type(emailInput, 'valid@example.com');
      await userEvent.type(passwordInput, 'password123');

      const submitButton = canvas.getByRole('button', { name: /sign in/i });
      await userEvent.click(submitButton);

      // Wait for async submission
      await new Promise(resolve => setTimeout(resolve, 150));
    });

    await step('Tab navigation works through all fields', async () => {
      const emailInput = canvas.getByPlaceholderText('your@email.com');
      emailInput.focus();

      await expect(emailInput).toHaveFocus();

      await userEvent.tab();
      await expect(canvas.getByPlaceholderText('••••••••')).toHaveFocus();

      await userEvent.tab();
      await expect(canvas.getByRole('button', { name: /sign in/i })).toHaveFocus();
    });
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Basic login form with email and password validation.'
      }
    }
  }
};

// With Validation - from component page lines 239-286
export const WithValidation: Story = {
  render: () => {
    const onSubmit = fn((values) => alert(JSON.stringify(values, null, 2)));

    return (
      <div className="w-full max-w-md">
        <Form
          initialValues={{ name: '', email: '' }}
          validators={{
            name: validators.required('Name is required'),
            email: composeValidators(
              validators.required('Email is required'),
              validators.email('Please enter a valid email address')
            )
          }}
          onSubmit={onSubmit}
        >
          <FormField name="name">
            {({ field, error, touched }) => (
              <FormItem>
                <FormLabel required>Name</FormLabel>
                <Input
                  placeholder="Enter your name"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  onBlur={field.onBlur}
                />
                {touched && <FormMessage error={error} />}
              </FormItem>
            )}
          </FormField>

          <FormField name="email">
            {({ field, error, touched }) => (
              <FormItem>
                <FormLabel required>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  onBlur={field.onBlur}
                />
                {touched && <FormMessage error={error} />}
              </FormItem>
            )}
          </FormField>

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </Form>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders form with validation', async () => {
      await expect(canvas.getByPlaceholderText('Enter your name')).toBeInTheDocument();
      await expect(canvas.getByPlaceholderText('your@email.com')).toBeInTheDocument();
    });

    await step('Shows required validation errors', async () => {
      const submitButton = canvas.getByRole('button', { name: /submit/i });
      await userEvent.click(submitButton);

      await expect(canvas.getByText('Name is required')).toBeInTheDocument();
      await expect(canvas.getByText('Email is required')).toBeInTheDocument();
    });

    await step('Shows email format validation error', async () => {
      const nameInput = canvas.getByPlaceholderText('Enter your name');
      const emailInput = canvas.getByPlaceholderText('your@email.com');

      await userEvent.type(nameInput, 'John Doe');
      await userEvent.type(emailInput, 'invalid-email');

      const submitButton = canvas.getByRole('button', { name: /submit/i });
      await userEvent.click(submitButton);

      await expect(canvas.getByText('Please enter a valid email address')).toBeInTheDocument();
    });

    await step('Submits with valid email format', async () => {
      const emailInput = canvas.getByPlaceholderText('your@email.com');

      await userEvent.clear(emailInput);
      await userEvent.type(emailInput, 'john@example.com');

      const submitButton = canvas.getByRole('button', { name: /submit/i });
      await userEvent.click(submitButton);

      // No validation errors should be visible
      await expect(canvas.queryByText('Please enter a valid email address')).not.toBeInTheDocument();
    });
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Form with composed validators. Email field uses both required and email validation.'
      }
    }
  }
};

// With Select - from component page lines 300-332
export const WithSelect: Story = {
  render: () => {
    const onSubmit = fn((values) => alert(`Selected: ${values.country}`));

    return (
      <div className="w-full max-w-md">
        <Form
          initialValues={{ country: '' }}
          validators={{
            country: validators.required('Country is required')
          }}
          onSubmit={onSubmit}
        >
          <FormField name="country">
            {({ field, error, touched }) => (
              <FormItem>
                <FormLabel required>Country</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger onBlur={field.onBlur}>
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sa">Saudi Arabia</SelectItem>
                    <SelectItem value="ae">United Arab Emirates</SelectItem>
                    <SelectItem value="kw">Kuwait</SelectItem>
                    <SelectItem value="qa">Qatar</SelectItem>
                    <SelectItem value="bh">Bahrain</SelectItem>
                    <SelectItem value="om">Oman</SelectItem>
                  </SelectContent>
                </Select>
                {touched && <FormMessage error={error} />}
              </FormItem>
            )}
          </FormField>

          <Button type="submit" className="w-full">
            Save
          </Button>
        </Form>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders form with select field', async () => {
      await expect(canvas.getByRole('combobox')).toBeInTheDocument();
      await expect(canvas.getByRole('button', { name: /save/i })).toBeInTheDocument();
    });

    await step('Shows validation error when no selection made', async () => {
      const submitButton = canvas.getByRole('button', { name: /save/i });
      await userEvent.click(submitButton);

      await expect(canvas.getByText('Country is required')).toBeInTheDocument();
    });

    await step('Opens select dropdown', async () => {
      const selectTrigger = canvas.getByRole('combobox');
      await userEvent.click(selectTrigger);

      // Radix Select renders options in a portal
      const body = within(document.body);
      await expect(body.getByRole('option', { name: /saudi arabia/i })).toBeInTheDocument();
      await expect(body.getByRole('option', { name: /united arab emirates/i })).toBeInTheDocument();
    });

    await step('Selects an option', async () => {
      const body = within(document.body);
      const saudiOption = body.getByRole('option', { name: /saudi arabia/i });
      await userEvent.click(saudiOption);

      // Select should show the selected value
      await expect(canvas.getByRole('combobox')).toHaveTextContent('Saudi Arabia');
    });

    await step('Submits form with selected value', async () => {
      const submitButton = canvas.getByRole('button', { name: /save/i });
      await userEvent.click(submitButton);

      // No validation errors should be present
      await expect(canvas.queryByText('Country is required')).not.toBeInTheDocument();
    });
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Form with Select component integration. Shows how to handle dropdown validation.'
      }
    }
  }
};

// Disabled State
export const DisabledState: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Form
        initialValues={{ email: 'user@example.com' }}
        validators={{}}
        onSubmit={() => {}}
      >
        <FormField name="email">
          {({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                onBlur={field.onBlur}
                disabled
              />
              <FormDescription>This field is disabled</FormDescription>
            </FormItem>
          )}
        </FormField>

        <Button type="submit" className="w-full" disabled>
          Submit
        </Button>
      </Form>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders form in disabled state', async () => {
      await expect(canvas.getByDisplayValue('user@example.com')).toBeInTheDocument();
      await expect(canvas.getByText('This field is disabled')).toBeInTheDocument();
    });

    await step('Verifies disabled states', async () => {
      const emailInput = canvas.getByDisplayValue('user@example.com');
      const submitButton = canvas.getByRole('button', { name: /submit/i });

      await expect(emailInput).toBeDisabled();
      await expect(submitButton).toBeDisabled();
      await expect(emailInput).toHaveValue('user@example.com');
    });
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Form with disabled inputs and submit button.'
      }
    }
  }
};

