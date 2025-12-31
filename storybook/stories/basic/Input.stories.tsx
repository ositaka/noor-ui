import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Search, Mail, Lock, User } from 'lucide-react';

const meta = {
  title: 'Basic/Input',
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
  }
};

// Types
export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Email address'
  }
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Password'
  }
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: '0'
  }
};

export const SearchInput: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...'
  }
};

// States
export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
    value: 'Cannot edit this'
  }
};

export const WithValue: Story = {
  args: {
    value: 'Filled input'
  }
};

// With Label
export const WithLabel: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" {...args} />
    </div>
  )
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
  }
};
