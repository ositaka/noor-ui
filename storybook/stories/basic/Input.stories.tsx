import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Search, Mail, Lock, User } from 'lucide-react';

const meta = {
  title: 'Basic/Input',
  component: Input,
  parameters: {
    layout: 'centered'
  },
  tags: ['!autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'Input type'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable input'
    }
  }
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    placeholder: 'Enter text...'
  }
};

// Types
export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Email address'
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders with email type', async () => {
      const input = canvas.getByPlaceholderText('Email address');
      await expect(input).toBeInTheDocument();
      await expect(input).toHaveAttribute('type', 'email');
    });

    await step('Accepts email input', async () => {
      const input = canvas.getByPlaceholderText('Email address');
      await userEvent.type(input, 'test@example.com');
      await expect(input).toHaveValue('test@example.com');
    });
  }
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Password'
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders with password type', async () => {
      const input = canvas.getByPlaceholderText('Password');
      await expect(input).toBeInTheDocument();
      await expect(input).toHaveAttribute('type', 'password');
    });

    await step('Accepts password input', async () => {
      const input = canvas.getByPlaceholderText('Password');
      await userEvent.type(input, 'SecurePass123');
      await expect(input).toHaveValue('SecurePass123');
    });
  }
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: '0'
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders with number type', async () => {
      const input = canvas.getByPlaceholderText('0');
      await expect(input).toBeInTheDocument();
      await expect(input).toHaveAttribute('type', 'number');
    });

    await step('Accepts numeric input', async () => {
      const input = canvas.getByPlaceholderText('0');
      await userEvent.type(input, '12345');
      await expect(input).toHaveValue(12345);
    });
  }
};

export const SearchInput: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...'
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders with search type', async () => {
      const input = canvas.getByPlaceholderText('Search...');
      await expect(input).toBeInTheDocument();
      await expect(input).toHaveAttribute('type', 'search');
    });

    await step('Accepts search input', async () => {
      const input = canvas.getByPlaceholderText('Search...');
      await userEvent.type(input, 'query text');
      await expect(input).toHaveValue('query text');
    });
  }
};

// States
export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
    value: 'Cannot edit this'
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Verifies disabled state', async () => {
      const input = canvas.getByDisplayValue('Cannot edit this');
      await expect(input).toBeInTheDocument();
      await expect(input).toBeDisabled();
    });
  }
};

export const WithValue: Story = {
  args: {
    value: 'Filled input'
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders with pre-filled value', async () => {
      const input = canvas.getByDisplayValue('Filled input');
      await expect(input).toBeInTheDocument();
      await expect(input).toHaveValue('Filled input');
    });
  }
};

// With Label
export const WithLabel: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" {...args} />
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders with associated label', async () => {
      const input = canvas.getByLabelText('Email');
      await expect(input).toBeInTheDocument();
      await expect(input).toHaveAttribute('id', 'email');
    });

    await step('Label click focuses input', async () => {
      const label = canvas.getByText('Email');
      await userEvent.click(label);
      const input = canvas.getByLabelText('Email');
      await expect(input).toHaveFocus();
    });

    await step('Accepts input when focused via label', async () => {
      const input = canvas.getByLabelText('Email');
      await userEvent.type(input, 'user@test.com');
      await expect(input).toHaveValue('user@test.com');
    });
  }
};

// With Icon
export const WithIconInside: Story = {
  render: () => (
    <div className="relative w-full max-w-sm">
      <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input placeholder="Search..." className="ps-9" />
    </div>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders input with icon', async () => {
      const input = canvas.getByPlaceholderText('Search...');
      await expect(input).toBeInTheDocument();
    });

    await step('Input works with icon present', async () => {
      const input = canvas.getByPlaceholderText('Search...');
      await userEvent.click(input);
      await userEvent.type(input, 'search query');
      await expect(input).toHaveValue('search query');
    });
  }
};

// Form Examples
export const LoginForm: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="email-login">
          <Mail className="inline h-4 w-4 me-2" />
          Email
        </Label>
        <Input type="email" id="email-login" placeholder="name@example.com" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="password-login">
          <Lock className="inline h-4 w-4 me-2" />
          Password
        </Label>
        <Input type="password" id="password-login" placeholder="••••••••" />
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Both form fields render', async () => {
      const emailInput = canvas.getByLabelText(/Email/i);
      const passwordInput = canvas.getByLabelText(/Password/i);
      await expect(emailInput).toBeInTheDocument();
      await expect(passwordInput).toBeInTheDocument();
    });

    await step('Tab navigation between fields', async () => {
      const emailInput = canvas.getByLabelText(/Email/i);
      const passwordInput = canvas.getByLabelText(/Password/i);

      emailInput.focus();
      await expect(emailInput).toHaveFocus();

      await userEvent.tab();
      await expect(passwordInput).toHaveFocus();
    });

    await step('Can fill form fields', async () => {
      const emailInput = canvas.getByLabelText(/Email/i);
      const passwordInput = canvas.getByLabelText(/Password/i);

      await userEvent.clear(emailInput);
      await userEvent.type(emailInput, 'test@example.com');
      await expect(emailInput).toHaveValue('test@example.com');

      await userEvent.clear(passwordInput);
      await userEvent.type(passwordInput, 'password123');
      await expect(passwordInput).toHaveValue('password123');
    });
  }
};

// RTL Examples
export const RTLPlaceholder: Story = {
  args: {
    placeholder: 'أدخل النص هنا...'
  },
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with Arabic placeholder demonstrating RTL support. Automatically switches to RTL mode.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders in RTL context', async () => {
      const input = canvas.getByPlaceholderText('أدخل النص هنا...');
      await expect(input).toBeInTheDocument();
    });

    await step('Accepts RTL text input', async () => {
      const input = canvas.getByPlaceholderText('أدخل النص هنا...');
      await userEvent.type(input, 'مرحبا');
      await expect(input).toHaveValue('مرحبا');
    });
  }
};

export const RTLWithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="name">الاسم الكامل</Label>
      <Input type="text" id="name" placeholder="أدخل اسمك" />
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Input with Arabic label showing proper RTL layout. Automatically switches to RTL mode.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders with RTL label', async () => {
      const input = canvas.getByLabelText('الاسم الكامل');
      await expect(input).toBeInTheDocument();
    });

    await step('Label association works in RTL', async () => {
      const input = canvas.getByLabelText('الاسم الكامل');
      await userEvent.type(input, 'محمد');
      await expect(input).toHaveValue('محمد');
    });
  }
};

export const RTLSearchWithIcon: Story = {
  render: () => (
    <div className="relative w-full max-w-sm">
      <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input placeholder="ابحث..." className="ps-9" />
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Search input with icon properly positioned in RTL mode using logical properties (start/end).'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders RTL search with icon', async () => {
      const input = canvas.getByPlaceholderText('ابحث...');
      await expect(input).toBeInTheDocument();
    });

    await step('Search input works in RTL with icon', async () => {
      const input = canvas.getByPlaceholderText('ابحث...');
      await userEvent.type(input, 'بحث');
      await expect(input).toHaveValue('بحث');
    });
  }
};

// Complete Registration Form
export const RegistrationForm: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="fullname">
          <User className="inline h-4 w-4 me-2" />
          Full Name
        </Label>
        <Input type="text" id="fullname" placeholder="John Doe" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="email-reg">
          <Mail className="inline h-4 w-4 me-2" />
          Email
        </Label>
        <Input type="email" id="email-reg" placeholder="john@example.com" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="password-reg">
          <Lock className="inline h-4 w-4 me-2" />
          Password
        </Label>
        <Input type="password" id="password-reg" placeholder="Min 8 characters" />
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('All registration fields render', async () => {
      const nameInput = canvas.getByLabelText(/Full Name/i);
      const emailInput = canvas.getByLabelText(/Email/i);
      const passwordInput = canvas.getByLabelText(/Password/i);

      await expect(nameInput).toBeInTheDocument();
      await expect(emailInput).toBeInTheDocument();
      await expect(passwordInput).toBeInTheDocument();
    });

    await step('Tab navigation through registration form', async () => {
      const nameInput = canvas.getByLabelText(/Full Name/i);
      const emailInput = canvas.getByLabelText(/Email/i);
      const passwordInput = canvas.getByLabelText(/Password/i);

      nameInput.focus();
      await expect(nameInput).toHaveFocus();

      await userEvent.tab();
      await expect(emailInput).toHaveFocus();

      await userEvent.tab();
      await expect(passwordInput).toHaveFocus();
    });

    await step('Can fill complete registration form', async () => {
      const nameInput = canvas.getByLabelText(/Full Name/i);
      const emailInput = canvas.getByLabelText(/Email/i);
      const passwordInput = canvas.getByLabelText(/Password/i);

      await userEvent.clear(nameInput);
      await userEvent.type(nameInput, 'John Doe');
      await expect(nameInput).toHaveValue('John Doe');

      await userEvent.clear(emailInput);
      await userEvent.type(emailInput, 'john@example.com');
      await expect(emailInput).toHaveValue('john@example.com');

      await userEvent.clear(passwordInput);
      await userEvent.type(passwordInput, 'SecurePass123');
      await expect(passwordInput).toHaveValue('SecurePass123');
    });
  }
};
