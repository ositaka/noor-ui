import type { Meta, StoryObj } from '@storybook/react';
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
    initialValues: { email: '' }
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <Form
        {...args}
        validators={{
          email: validators.required('Email is required')
        }}
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
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
  render: () => (
    <div className="w-full max-w-md">
      <Form
        initialValues={{ email: '', password: '' }}
        validators={{
          email: validators.required('Email is required'),
          password: validators.minLength(6, 'Password must be at least 6 characters')
        }}
        onSubmit={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          alert('Form submitted!');
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
        story: 'Basic login form with email and password validation.'
      }
    }
  }
};

// With Validation - from component page lines 239-286
export const WithValidation: Story = {
  render: () => (
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
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
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
        story: 'Form with composed validators. Email field uses both required and email validation.'
      }
    }
  }
};

// With Select - from component page lines 300-332
export const WithSelect: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Form
        initialValues={{ country: '' }}
        validators={{
          country: validators.required('Country is required')
        }}
        onSubmit={(values) => alert(`Selected: ${values.country}`)}
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Form with disabled inputs and submit button.'
      }
    }
  }
};

// RTL Example - from component page lines 476-498
export const RTLExample: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Form
        initialValues={{ email: '' }}
        validators={{
          email: validators.required('البريد الإلكتروني مطلوب')
        }}
        onSubmit={() => {}}
      >
        <FormField name="email">
          {({ field, error, touched }) => (
            <FormItem>
              <FormLabel required>البريد الإلكتروني</FormLabel>
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
      </Form>
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
        story: 'Form with Arabic labels and validation messages in RTL mode.'
      }
    }
  }
};

// RTL Basic Form
export const RTLBasicForm: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Form
        initialValues={{ email: '', password: '' }}
        validators={{
          email: validators.required('البريد الإلكتروني مطلوب'),
          password: validators.minLength(6, 'يجب أن تكون كلمة المرور 6 أحرف على الأقل')
        }}
        onSubmit={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          alert('تم إرسال النموذج!');
        }}
      >
        <FormField name="email">
          {({ field, error, touched }) => (
            <FormItem>
              <FormLabel required>البريد الإلكتروني</FormLabel>
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
              <FormLabel required>كلمة المرور</FormLabel>
              <Input
                type="password"
                placeholder="••••••••"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                onBlur={field.onBlur}
              />
              {touched && <FormMessage error={error} />}
              <FormDescription>على الأقل 6 أحرف</FormDescription>
            </FormItem>
          )}
        </FormField>

        <Button type="submit" className="w-full">
          تسجيل الدخول
        </Button>
      </Form>
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
        story: 'Complete login form in Arabic with RTL support.'
      }
    }
  }
};

// RTL With Validation
export const RTLWithValidation: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Form
        initialValues={{ name: '', email: '' }}
        validators={{
          name: validators.required('الاسم مطلوب'),
          email: composeValidators(
            validators.required('البريد الإلكتروني مطلوب'),
            validators.email('يرجى إدخال بريد إلكتروني صالح')
          )
        }}
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
      >
        <FormField name="name">
          {({ field, error, touched }) => (
            <FormItem>
              <FormLabel required>الاسم</FormLabel>
              <Input
                placeholder="أدخل اسمك"
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
              <FormLabel required>البريد الإلكتروني</FormLabel>
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
          إرسال
        </Button>
      </Form>
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
        story: 'Form with composed validators in Arabic, demonstrating RTL validation messages.'
      }
    }
  }
};

// RTL With Select
export const RTLWithSelect: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Form
        initialValues={{ country: '' }}
        validators={{
          country: validators.required('البلد مطلوب')
        }}
        onSubmit={(values) => alert(`المحدد: ${values.country}`)}
      >
        <FormField name="country">
          {({ field, error, touched }) => (
            <FormItem>
              <FormLabel required>البلد</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger onBlur={field.onBlur}>
                  <SelectValue placeholder="اختر بلدك" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sa">المملكة العربية السعودية</SelectItem>
                  <SelectItem value="ae">الإمارات العربية المتحدة</SelectItem>
                  <SelectItem value="kw">الكويت</SelectItem>
                  <SelectItem value="qa">قطر</SelectItem>
                  <SelectItem value="bh">البحرين</SelectItem>
                  <SelectItem value="om">عمان</SelectItem>
                </SelectContent>
              </Select>
              {touched && <FormMessage error={error} />}
            </FormItem>
          )}
        </FormField>

        <Button type="submit" className="w-full">
          حفظ
        </Button>
      </Form>
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
        story: 'Form with Select component in Arabic, showing proper RTL alignment.'
      }
    }
  }
};
