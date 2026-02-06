import type { Meta, StoryObj } from '@storybook/react';
import { PromptInput } from '../../../components/ui/prompt-input';
import { Card, CardContent } from '../../../components/ui/card';
import { useState } from 'react';
import { expect, userEvent, within, fn } from 'storybook/test';

/**
 * Prompt Input Component Stories
 *
 * All examples are taken from /app/(docs)/components/prompt-input/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Prompt Input is a textarea for AI chat with send button.
 * Features: Auto-resize, attachment/voice buttons, character counter, loading state, RTL support.
 */

const meta = {
  title: 'AI/Prompt Input',
  component: PromptInput,
  parameters: {
    layout: 'centered'
  },
  tags: ['!autodocs'],
  argTypes: {
    onSend: { control: false },
    isLoading: { control: 'boolean' },
    showAttachment: { control: 'boolean' },
    showVoice: { control: 'boolean' },
    showCounter: { control: 'boolean' },
    maxLength: { control: 'number' },
    onAttachment: { control: false },
    onVoice: { control: false },
    isRTL: { control: 'boolean' },
    placeholder: { control: 'text' },
    placeholderAr: { control: 'text' },
    value: { control: 'text' },
    onChange: { control: false }
  }
} satisfies Meta<typeof PromptInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground
export const Default: Story = {
  args: {
    placeholder: 'Type your message... (Shift+Enter for new line)'
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div className="max-w-2xl w-96">
        <PromptInput
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onSend={(val) => {
            console.log('Sent:', val);
            setValue('');
          }}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      story: {
        inline: false
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders textarea with placeholder', async () => {
      const textarea = canvas.getByPlaceholderText('Type your message... (Shift+Enter for new line)');
      await expect(textarea).toBeInTheDocument();
      await expect(textarea).toBeVisible();
    });

    await step('Renders send button', async () => {
      const sendButton = canvas.getByRole('button', { name: /send/i });
      await expect(sendButton).toBeInTheDocument();
      await expect(sendButton).toBeDisabled(); // Disabled when empty
    });

    await step('Typing enables send button', async () => {
      const textarea = canvas.getByPlaceholderText('Type your message... (Shift+Enter for new line)');
      await userEvent.type(textarea, 'Hello world');
      await expect(textarea).toHaveValue('Hello world');

      const sendButton = canvas.getByRole('button', { name: /send/i });
      await expect(sendButton).toBeEnabled();
    });

    await step('Send button clears input', async () => {
      const sendButton = canvas.getByRole('button', { name: /send/i });
      await userEvent.click(sendButton);

      const textarea = canvas.getByPlaceholderText('Type your message... (Shift+Enter for new line)');
      await expect(textarea).toHaveValue('');
      await expect(sendButton).toBeDisabled(); // Disabled again after sending
    });

    await step('Enter key sends message', async () => {
      const textarea = canvas.getByPlaceholderText('Type your message... (Shift+Enter for new line)');
      await userEvent.type(textarea, 'Testing Enter key');
      await expect(textarea).toHaveValue('Testing Enter key');

      await userEvent.keyboard('{Enter}');
      await expect(textarea).toHaveValue('');
    });

    await step('Shift+Enter adds new line without sending', async () => {
      const textarea = canvas.getByPlaceholderText('Type your message... (Shift+Enter for new line)');
      await userEvent.type(textarea, 'Line 1{Shift>}{Enter}{/Shift}Line 2');
      await expect(textarea).toHaveValue('Line 1\nLine 2');
    });

    await step('Textarea is keyboard accessible', async () => {
      const textarea = canvas.getByPlaceholderText('Type your message... (Shift+Enter for new line)');
      textarea.focus();
      await expect(textarea).toHaveFocus();
    });
  }
};

// With Features - from component page lines 249-258
export const WithFeatures: Story = {
  args: {
    onAttachment: fn(),
    onVoice: fn()
  },
  render: (args) => (
    <Card>
      <CardContent className="p-6">
        <div className="max-w-2xl w-96">
          <PromptInput
            onSend={(value) => console.log('Sent:', value)}
            showAttachment
            showVoice
            showCounter
            maxLength={500}
            onAttachment={args.onAttachment}
            onVoice={args.onVoice}
          />
        </div>
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
            description: {
        story: 'Prompt input with attachment, voice, and character counter.'
      }
    }
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('Renders all feature buttons', async () => {
      const attachButton = canvas.getByRole('button', { name: /attach file/i });
      const voiceButton = canvas.getByRole('button', { name: /voice input/i });
      const sendButton = canvas.getByRole('button', { name: /send/i });

      await expect(attachButton).toBeInTheDocument();
      await expect(voiceButton).toBeInTheDocument();
      await expect(sendButton).toBeInTheDocument();
    });

    await step('Character counter shows 0/500', async () => {
      const counter = canvasElement.querySelector('.text-xs.text-muted-foreground');
      await expect(counter).toBeInTheDocument();
      await expect(counter).toHaveTextContent('0 / 500');
    });

    await step('Attachment button is clickable', async () => {
      const attachButton = canvas.getByRole('button', { name: /attach file/i });
      await userEvent.click(attachButton);
      await expect(args.onAttachment).toHaveBeenCalledTimes(1);
    });

    await step('Voice button is clickable', async () => {
      const voiceButton = canvas.getByRole('button', { name: /voice input/i });
      await userEvent.click(voiceButton);
      await expect(args.onVoice).toHaveBeenCalledTimes(1);
    });

    await step('Character counter updates as user types', async () => {
      const textarea = canvas.getByRole('textbox');
      await userEvent.type(textarea, 'Hello');

      const counter = canvasElement.querySelector('.text-xs.text-muted-foreground');
      await expect(counter).toHaveTextContent('5 / 500');
    });

    await step('Max length prevents typing beyond limit', async () => {
      const textarea = canvas.getByRole('textbox');
      await userEvent.clear(textarea);

      // Type exactly 500 characters
      const longText = 'a'.repeat(500);
      await userEvent.type(textarea, longText);
      await expect(textarea).toHaveValue(longText);

      // Try to type one more character
      await userEvent.type(textarea, 'b');
      await expect(textarea).toHaveValue(longText); // Should still be 500 chars
    });
  }
};

// Loading State - from component page lines 272-278
export const LoadingState: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false);
    return (
      <Card>
        <CardContent className="p-6">
          <div className="max-w-2xl space-y-4">
            <PromptInput
              isLoading={isLoading}
              onSend={(value) => {
                setIsLoading(true);
                setTimeout(() => setIsLoading(false), 2000);
              }}
            />
            <p className="text-sm text-muted-foreground">
              Try sending a message to see the loading state for 2 seconds.
            </p>
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
            description: {
        story: 'Prompt input with loading state while sending.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders in idle state', async () => {
      const textarea = canvas.getByRole('textbox');
      const sendButton = canvas.getByRole('button', { name: /send/i });

      await expect(textarea).toBeEnabled();
      await expect(sendButton).toBeDisabled(); // Disabled when empty
    });

    await step('Type message to enable send button', async () => {
      const textarea = canvas.getByRole('textbox');
      await userEvent.type(textarea, 'Test loading state');

      const sendButton = canvas.getByRole('button', { name: /send/i });
      await expect(sendButton).toBeEnabled();
    });

    await step('Clicking send triggers loading state', async () => {
      const sendButton = canvas.getByRole('button', { name: /send/i });
      await userEvent.click(sendButton);

      // Button should show loading spinner (Loader2 icon replaces Send icon)
      const textarea = canvas.getByRole('textbox');
      await expect(textarea).toBeDisabled(); // Textarea disabled during loading
    });

    await step('Loading state description is visible', async () => {
      await expect(canvas.getByText(/try sending a message to see the loading state/i)).toBeInTheDocument();
    });
  }
};

// Controlled Component - from component page lines 296-303
export const ControlledComponent: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Card>
        <CardContent className="p-6">
          <div className="max-w-2xl w-96 space-y-4">
            <PromptInput
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onSend={(val) => {
                console.log('Sent:', val);
                setValue('');
              }}
            />
            <p className="text-xs text-muted-foreground">
              Current value: {value || '(empty)'}
            </p>
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
            description: {
        story: 'Controlled prompt input with external state.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Initial state shows empty', async () => {
      await expect(canvas.getByText('Current value: (empty)')).toBeInTheDocument();
    });

    await step('Typing updates controlled value display', async () => {
      const textarea = canvas.getByRole('textbox');
      await userEvent.type(textarea, 'Controlled input');

      await expect(canvas.getByText('Current value: Controlled input')).toBeInTheDocument();
    });

    await step('Sending message clears controlled state', async () => {
      const sendButton = canvas.getByRole('button', { name: /send/i });
      await userEvent.click(sendButton);

      await expect(canvas.getByText('Current value: (empty)')).toBeInTheDocument();
      const textarea = canvas.getByRole('textbox');
      await expect(textarea).toHaveValue('');
    });
  }
};

// Basic Input
export const BasicInput: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="max-w-2xl w-96">
          <PromptInput
            onSend={(value) => console.log('Sent:', value)}
            placeholder="Type your message..."
          />
        </div>
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Minimal prompt input without extra features.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders basic input without extra features', async () => {
      const textarea = canvas.getByPlaceholderText('Type your message...');
      await expect(textarea).toBeInTheDocument();

      // Should only have send button, no attachment or voice buttons
      const buttons = canvas.getAllByRole('button');
      await expect(buttons).toHaveLength(1);
      await expect(canvas.getByRole('button', { name: /send/i })).toBeInTheDocument();
    });

    await step('No character counter visible', async () => {
      const counter = canvasElement.querySelector('.text-xs.text-muted-foreground');
      await expect(counter).not.toBeInTheDocument();
    });

    await step('Basic typing works', async () => {
      const textarea = canvas.getByPlaceholderText('Type your message...');
      await userEvent.type(textarea, 'Simple message');
      await expect(textarea).toHaveValue('Simple message');
    });
  }
};

// With Counter
export const WithCounter: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Card>
        <CardContent className="p-6">
          <div className="max-w-2xl space-y-3 w-96">
            <PromptInput
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onSend={(val) => {
                console.log('Sent:', val);
                setValue('');
              }}
              showCounter
              maxLength={200}
              placeholder="Max 200 characters"
            />
            <p className="text-xs text-muted-foreground">
              Character counter helps users stay within limits.
            </p>
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
      description: {
        story: 'Prompt input with character counter and max length.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Character counter shows 0/200', async () => {
      const counter = canvasElement.querySelector('.text-xs.text-muted-foreground');
      await expect(counter).toHaveTextContent('0 / 200');
    });

    await step('Counter updates as user types', async () => {
      const textarea = canvas.getByPlaceholderText('Max 200 characters');
      await userEvent.type(textarea, 'Testing counter');

      const counter = canvasElement.querySelector('.text-xs.text-muted-foreground');
      await expect(counter).toHaveTextContent('15 / 200');
    });

    await step('Prevents typing beyond max length', async () => {
      const textarea = canvas.getByPlaceholderText('Max 200 characters');
      await userEvent.clear(textarea);

      const text200 = 'a'.repeat(200);
      await userEvent.type(textarea, text200);
      await expect(textarea).toHaveValue(text200);

      // Try to type more
      await userEvent.type(textarea, 'extra');
      await expect(textarea).toHaveValue(text200); // Should still be 200
    });

    await step('Counter resets after sending', async () => {
      const textarea = canvas.getByPlaceholderText('Max 200 characters');
      await userEvent.clear(textarea);
      await userEvent.type(textarea, 'Message to send');

      const sendButton = canvas.getByRole('button', { name: /send/i });
      await userEvent.click(sendButton);

      const counter = canvasElement.querySelector('.text-xs.text-muted-foreground');
      await expect(counter).toHaveTextContent('0 / 200');
    });
  }
};

// With Attachment
export const WithAttachment: Story = {
  args: {
    onAttachment: fn()
  },
  render: (args) => (
    <Card>
      <CardContent className="p-6">
        <div className="max-w-2xl space-y-3">
          <PromptInput
            onSend={(value) => console.log('Sent:', value)}
            showAttachment
            onAttachment={args.onAttachment}
            placeholder="Type or attach files..."
          />
          <p className="text-xs text-muted-foreground">
            Click the paperclip icon to attach files.
          </p>
        </div>
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Prompt input with attachment button.'
      }
    }
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('Renders attachment button', async () => {
      const attachButton = canvas.getByRole('button', { name: /attach file/i });
      await expect(attachButton).toBeInTheDocument();
      await expect(attachButton).toBeEnabled();
    });

    await step('Attachment button is clickable', async () => {
      const attachButton = canvas.getByRole('button', { name: /attach file/i });
      await userEvent.click(attachButton);
      await expect(args.onAttachment).toHaveBeenCalledTimes(1);
    });

    await step('Help text is visible', async () => {
      await expect(canvas.getByText(/click the paperclip icon to attach files/i)).toBeInTheDocument();
    });
  }
};

// RTL Default - from component page lines 376-381
export const RTLDefault: Story = {
  render: () => (
    <div className="max-w-2xl w-96">
      <PromptInput
        onSend={(value) => console.log('Sent:', value)}
        isRTL
        placeholderAr="اكتب رسالتك هنا..."
      />
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
        story: 'Prompt input in RTL with Arabic placeholder.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders in RTL mode', async () => {
      const textarea = canvas.getByPlaceholderText('اكتب رسالتك هنا...');
      await expect(textarea).toBeInTheDocument();
      await expect(textarea).toHaveAttribute('dir', 'rtl');
    });

    await step('Send button renders with Arabic label', async () => {
      // Arabic translation for "Send" is "إرسال"
      const sendButton = canvas.getByRole('button', { name: /إرسال/i });
      await expect(sendButton).toBeInTheDocument();
    });

    await step('Typing works in RTL', async () => {
      const textarea = canvas.getByPlaceholderText('اكتب رسالتك هنا...');
      await userEvent.type(textarea, 'مرحبا');
      await expect(textarea).toHaveValue('مرحبا');
    });
  }
};

// RTL With Features
export const RTLWithFeatures: Story = {
  args: {
    onAttachment: fn(),
    onVoice: fn()
  },
  render: (args) => (
    <Card>
      <CardContent className="p-6">
        <div className="max-w-2xl w-96">
          <PromptInput
            onSend={(value) => console.log('Sent:', value)}
            showAttachment
            showVoice
            showCounter
            maxLength={500}
            onAttachment={args.onAttachment}
            onVoice={args.onVoice}
            isRTL
            placeholderAr="اكتب رسالتك... (Shift+Enter لسطر جديد)"
          />
        </div>
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Prompt input in RTL with all features enabled.'
      }
    }
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('Renders all buttons with Arabic labels', async () => {
      // Arabic translations: "إرفاق ملف" (Attach file), "إدخال صوتي" (Voice input), "إرسال" (Send)
      const attachButton = canvas.getByRole('button', { name: /إرفاق ملف/i });
      const voiceButton = canvas.getByRole('button', { name: /إدخال صوتي/i });
      const sendButton = canvas.getByRole('button', { name: /إرسال/i });

      await expect(attachButton).toBeInTheDocument();
      await expect(voiceButton).toBeInTheDocument();
      await expect(sendButton).toBeInTheDocument();
    });

    await step('Character counter displays in RTL', async () => {
      const counter = canvasElement.querySelector('.text-xs.text-muted-foreground');
      await expect(counter).toHaveTextContent('0 / 500');
    });

    await step('All buttons are functional in RTL', async () => {
      const attachButton = canvas.getByRole('button', { name: /إرفاق ملف/i });
      const voiceButton = canvas.getByRole('button', { name: /إدخال صوتي/i });

      await userEvent.click(attachButton);
      await expect(args.onAttachment).toHaveBeenCalledTimes(1);

      await userEvent.click(voiceButton);
      await expect(args.onVoice).toHaveBeenCalledTimes(1);
    });
  }
};

// RTL Controlled
export const RTLControlled: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Card>
        <CardContent className="p-6">
          <div className="max-w-2xl space-y-4">
            <PromptInput
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onSend={(val) => {
                console.log('Sent:', val);
                setValue('');
              }}
              isRTL
              placeholderAr="اكتب رسالتك هنا..."
            />
            <p className="text-xs text-muted-foreground">
              القيمة الحالية: {value || '(فارغ)'}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  },
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Controlled prompt input in RTL with state display.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Initial state shows empty in Arabic', async () => {
      await expect(canvas.getByText(/القيمة الحالية: \(فارغ\)/)).toBeInTheDocument();
    });

    await step('Typing updates state display', async () => {
      const textarea = canvas.getByPlaceholderText('اكتب رسالتك هنا...');
      await userEvent.type(textarea, 'مرحبا بك');

      await expect(canvas.getByText(/القيمة الحالية: مرحبا بك/)).toBeInTheDocument();
    });

    await step('Sending clears state in RTL', async () => {
      const sendButton = canvas.getByRole('button', { name: /إرسال/i });
      await userEvent.click(sendButton);

      await expect(canvas.getByText(/القيمة الحالية: \(فارغ\)/)).toBeInTheDocument();
    });
  }
};
