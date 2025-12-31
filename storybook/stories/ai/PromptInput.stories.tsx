import type { Meta, StoryObj } from '@storybook/react';
import { PromptInput } from '../../../components/ui/prompt-input';
import { Card, CardContent } from '../../../components/ui/card';
import { useState } from 'react';

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
  tags: ['autodocs'],
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
      <div className="max-w-2xl w-full">
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
  }
};

// With Features - from component page lines 249-258
export const WithFeatures: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="max-w-2xl">
          <PromptInput
            onSend={(value) => console.log('Sent:', value)}
            showAttachment
            showVoice
            showCounter
            maxLength={500}
            onAttachment={() => alert('Open file picker')}
            onVoice={() => alert('Start voice recording')}
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
      disable: true,
      description: {
        story: 'Prompt input with attachment, voice, and character counter.'
      }
    }
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
      disable: true,
      description: {
        story: 'Prompt input with loading state while sending.'
      }
    }
  }
};

// Controlled Component - from component page lines 296-303
export const ControlledComponent: Story = {
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
      disable: true,
      description: {
        story: 'Controlled prompt input with external state.'
      }
    }
  }
};

// Basic Input
export const BasicInput: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="max-w-2xl">
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
      disable: true,
      description: {
        story: 'Minimal prompt input without extra features.'
      }
    }
  }
};

// With Counter
export const WithCounter: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Card>
        <CardContent className="p-6">
          <div className="max-w-2xl space-y-3">
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
      disable: true,
      description: {
        story: 'Prompt input with character counter and max length.'
      }
    }
  }
};

// With Attachment
export const WithAttachment: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="max-w-2xl space-y-3">
          <PromptInput
            onSend={(value) => console.log('Sent:', value)}
            showAttachment
            onAttachment={() => console.log('Attachment clicked')}
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
      disable: true,
      description: {
        story: 'Prompt input with attachment button.'
      }
    }
  }
};

// RTL Default - from component page lines 376-381
export const RTLDefault: Story = {
  render: () => (
    <div className="max-w-2xl w-full">
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
      disable: true,
      description: {
        story: 'Prompt input in RTL with Arabic placeholder.'
      }
    }
  }
};

// RTL With Features
export const RTLWithFeatures: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <div className="max-w-2xl">
          <PromptInput
            onSend={(value) => console.log('Sent:', value)}
            showAttachment
            showVoice
            showCounter
            maxLength={500}
            onAttachment={() => alert('فتح منتقي الملفات')}
            onVoice={() => alert('بدء التسجيل الصوتي')}
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
      disable: true,
      description: {
        story: 'Prompt input in RTL with all features enabled.'
      }
    }
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
      disable: true,
      description: {
        story: 'Controlled prompt input in RTL with state display.'
      }
    }
  }
};
