import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { MagnifyingGlass, Envelope, Lock, User } from '@phosphor-icons/react';

const meta = {
  title: 'Core/Input',
  component: Input,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
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
  },
  parameters: {
    ar: {
      args: {
        placeholder: 'أدخل النص...'
      }
    }
  }
};

// Types
export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Email address'
  },
  parameters: {
    ar: {
      args: {
        placeholder: 'البريد الإلكتروني'
      }
    }
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
  parameters: {
    ar: {
      args: {
        placeholder: 'كلمة المرور'
      }
    }
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
  parameters: {
    ar: {
      args: {
        placeholder: 'ابحث...'
      }
    }
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
  parameters: {
    ar: {
      args: {
        placeholder: 'حقل معطل',
        value: 'لا يمكن التعديل'
      }
    }
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
  parameters: {
    ar: {
      args: {
        value: 'حقل مملوء'
      }
    }
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
      <MagnifyingGlass className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
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
          <Envelope className="inline h-4 w-4 me-2" />
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
          <Envelope className="inline h-4 w-4 me-2" />
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
