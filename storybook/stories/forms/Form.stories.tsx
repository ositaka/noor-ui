import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
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
  render: (args, { globals }) => {
    const isRTL = globals?.direction === 'rtl';
    const t = (en: string, ar: string) => isRTL ? ar : en;

    return (
    <div className="w-full max-w-md">
      <Form
        {...args}
        validators={{
          email: validators.required(t('Email is required', 'البريد الإلكتروني مطلوب'))
        }}
      >
        <FormField name="email">
          {({ field, error, touched }) => (
            <FormItem>
              <FormLabel required>{t('Email', 'البريد الإلكتروني')}</FormLabel>
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
          {t('Submit', 'إرسال')}
        </Button>
      </Form>
    </div>
    );
  },
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Form with disabled inputs and submit button.'
      }
    }
  }
};

