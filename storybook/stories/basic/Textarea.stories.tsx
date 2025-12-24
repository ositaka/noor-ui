import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '../../../components/ui/textarea';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';
import * as React from 'react';

/**
 * Textarea Component Stories
 *
 * All examples are taken from /app/(docs)/components/textarea/page.tsx
 * Uses exact same text and data as the component documentation.
 */

const meta = {
  title: 'Basic/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls
export const Default: Story = {
  args: {
    placeholder: 'Enter your message',
    id: 'preview',
  },
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  render: (args) => (
    <div className="w-full max-w-md space-y-2">
      <Label htmlFor="preview">Message</Label>
      <Textarea {...args} />
    </div>
  ),
};

// With Label - from component page lines 314-317
export const WithLabel: Story = {
  render: () => (
    <div className="max-w-md space-y-2">
      <Label htmlFor="bio">Bio</Label>
      <Textarea id="bio" placeholder="Tell us about yourself" />
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
  },
};

// All Height Options - from component page lines 330-345
export const AllHeightOptions: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Fixed Height (3 rows)</Label>
        <Textarea rows={3} placeholder="3 rows" />
      </div>
      <div className="space-y-2">
        <Label>Custom Height</Label>
        <Textarea className="min-h-[150px]" placeholder="Custom height" />
      </div>
      <div className="space-y-2">
        <Label>Vertically Resizable</Label>
        <Textarea className="resize-y" placeholder="Vertically resizable" />
      </div>
      <div className="space-y-2">
        <Label>Non-Resizable</Label>
        <Textarea className="resize-none" placeholder="Non-resizable" />
      </div>
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
  },
};

// Character Count - from component page lines 358-370
export const CharacterCount: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    const maxLength = 200;

    return (
      <div className="max-w-md space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={maxLength}
          placeholder="Enter description"
        />
        <p className="text-xs text-muted-foreground text-end">
          {value.length} / {maxLength}
        </p>
      </div>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
  },
};

// Disabled and Readonly - from component page lines 382-394
export const DisabledAndReadonly: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="disabled">Disabled</Label>
        <Textarea id="disabled" disabled placeholder="Disabled textarea" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="readonly">Read-only</Label>
        <Textarea
          id="readonly"
          readOnly
          value="This text cannot be edited."
        />
      </div>
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
  },
};

// With Validation - from component page lines 407-422
export const WithValidation: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState('');

    const validate = (text: string) => {
      if (text && text.length < 10) {
        setError('Message must be at least 10 characters');
      } else {
        setError('');
      }
    };

    return (
      <div className="max-w-md space-y-2">
        <Label htmlFor="feedback">Feedback</Label>
        <Textarea
          id="feedback"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            validate(e.target.value);
          }}
          className={error ? 'border-destructive' : ''}
          placeholder="Enter your feedback"
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
        {value.length >= 10 && !error && (
          <p className="text-sm text-green-600 dark:text-green-500">
            Looks good!
          </p>
        )}
      </div>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
  },
};

// Auto Expand - from component page lines 437-447
export const AutoExpand: Story = {
  render: () => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    const handleInput = () => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      }
    };

    return (
      <div className="max-w-md space-y-2">
        <Label>Auto-Expanding Textarea</Label>
        <Textarea
          ref={textareaRef}
          onInput={handleInput}
          placeholder="Type to expand..."
          className="resize-none overflow-hidden"
          rows={1}
        />
        <p className="text-xs text-muted-foreground">
          Height adjusts automatically as you type
        </p>
      </div>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
  },
};

// In Form - from component page lines 461-487
export const InForm: Story = {
  render: () => (
    <form
      className="max-w-md space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        alert('Form submitted!');
      }}
    >
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <input
          id="subject"
          required
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          required
          rows={5}
          placeholder="Enter your message"
        />
      </div>

      <Button type="submit">Send Message</Button>
    </form>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
  },
};

// RTL Example - from component page lines 571-591
export const RTLExample: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-2">
      <Label htmlFor="rtl-message">الرسالة</Label>
      <Textarea id="rtl-message" placeholder="اكتب رسالتك هنا" rows={3} />
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Textarea with Arabic text demonstrating RTL support. Automatically switches to RTL mode.',
      },
    },
  },
};

// RTL With Validation
export const RTLWithValidation: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState('');

    const validate = (text: string) => {
      if (text && text.length < 10) {
        setError('يجب أن تكون الرسالة 10 أحرف على الأقل');
      } else {
        setError('');
      }
    };

    return (
      <div className="max-w-md space-y-2">
        <Label htmlFor="feedback-ar">التعليقات</Label>
        <Textarea
          id="feedback-ar"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            validate(e.target.value);
          }}
          className={error ? 'border-destructive' : ''}
          placeholder="أدخل تعليقك (الحد الأدنى 10 أحرف)"
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
        {value.length >= 10 && !error && (
          <p className="text-sm text-green-600 dark:text-green-500">يبدو جيداً!</p>
        )}
      </div>
    );
  },
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Arabic textarea with validation demonstrating RTL support and error messages.',
      },
    },
  },
};

// RTL Form
export const RTLForm: Story = {
  render: () => (
    <form
      className="max-w-md space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        alert('تم إرسال النموذج!');
      }}
    >
      <div className="space-y-2">
        <Label htmlFor="subject-ar">الموضوع</Label>
        <input
          id="subject-ar"
          required
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message-ar">الرسالة</Label>
        <Textarea
          id="message-ar"
          required
          rows={5}
          placeholder="أدخل رسالتك"
        />
      </div>

      <Button type="submit">إرسال الرسالة</Button>
    </form>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Complete form with Arabic labels and textarea in RTL mode.',
      },
    },
  },
};
