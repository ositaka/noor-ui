import type { Meta, StoryObj } from '@storybook/react';
import { StreamingText } from '../../../components/ui/streaming-text';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { useState } from 'react';

/**
 * Streaming Text Component Stories
 *
 * Note: StreamingText provides a typewriter/streaming text effect.
 * Features: Configurable speed, optional cursor, auto-start, completion callback, RTL support.
 * Commonly used in AI chat interfaces to simulate real-time generation.
 */

const meta = {
  title: 'AI/Streaming Text',
  component: StreamingText,
  parameters: {
    layout: 'centered'
  },
  tags: ['!autodocs'],
  argTypes: {
    text: { control: 'text' },
    speed: { control: { type: 'number', min: 10, max: 200, step: 10 } },
    showCursor: { control: 'boolean' },
    isStreaming: { control: 'boolean' },
    autoStart: { control: 'boolean' },
    onComplete: { control: false },
    className: { control: 'text' }
  }
} satisfies Meta<typeof StreamingText>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    text: 'Hello! This is streaming text...',
    speed: 30,
    showCursor: true,
    isStreaming: true,
    autoStart: true
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  }
};

// Fast Speed
export const FastSpeed: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Fast Streaming</CardTitle>
        <CardDescription>Text streams at 10ms per character</CardDescription>
      </CardHeader>
      <CardContent>
        <StreamingText
          text="This text appears very quickly with fast streaming speed!"
          speed={10}
        />
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// Slow Speed
export const SlowSpeed: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Slow Streaming</CardTitle>
        <CardDescription>Text streams at 100ms per character</CardDescription>
      </CardHeader>
      <CardContent>
        <StreamingText
          text="This text appears slowly, one character at a time..."
          speed={100}
        />
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// Without Cursor
export const WithoutCursor: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>No Cursor</CardTitle>
        <CardDescription>Streaming text without blinking cursor</CardDescription>
      </CardHeader>
      <CardContent>
        <StreamingText
          text="This text streams without showing the cursor indicator."
          speed={30}
          showCursor={false}
        />
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// Long Text
export const LongText: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Long Content</CardTitle>
        <CardDescription>Streaming longer paragraphs of text</CardDescription>
      </CardHeader>
      <CardContent className="max-w-2xl">
        <StreamingText
          text="Artificial intelligence has transformed how we interact with technology. From natural language processing to computer vision, AI systems are becoming increasingly sophisticated. This streaming text component simulates the experience of real-time text generation, commonly seen in modern AI chat interfaces."
          speed={20}
        />
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// Chat Message Simulation
export const ChatMessageSimulation: Story = {
  render: () => {
    const [showResponse, setShowResponse] = useState(false);

    return (
      <Card>
        <CardHeader>
          <CardTitle>Chat Simulation</CardTitle>
          <CardDescription>Simulated AI chat response</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="text-sm font-medium mb-1">You</p>
            <p className="text-sm">What is React?</p>
          </div>
          <div className="rounded-lg bg-primary/10 p-3">
            <p className="text-sm font-medium mb-1">AI Assistant</p>
            <div className="text-sm">
              {!showResponse && (
                <button
                  onClick={() => setShowResponse(true)}
                  className="text-xs px-3 py-1 rounded-md bg-primary text-primary-foreground"
                >
                  Generate Response
                </button>
              )}
              {showResponse && (
                <StreamingText
                  text="React is a popular JavaScript library for building user interfaces. It allows developers to create reusable UI components and efficiently update the view when data changes using a virtual DOM."
                  speed={25}
                />
              )}
            </div>
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
    controls: { disable: true }
  }
};

// With Completion Callback
export const WithCompletionCallback: Story = {
  render: () => {
    const [completed, setCompleted] = useState(false);

    return (
      <Card>
        <CardHeader>
          <CardTitle>Completion Callback</CardTitle>
          <CardDescription>Triggers action when streaming completes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <StreamingText
              text="This text will trigger a callback when streaming is complete."
              speed={30}
              onComplete={() => setCompleted(true)}
            />
          </div>
          {completed && (
            <div className="text-sm text-green-600 dark:text-green-400">
              ✓ Streaming completed!
            </div>
          )}
        </CardContent>
      </Card>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// Not Streaming (Instant)
export const NotStreaming: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Instant Display</CardTitle>
        <CardDescription>All text appears immediately</CardDescription>
      </CardHeader>
      <CardContent>
        <StreamingText
          text="This text appears instantly without streaming effect."
          isStreaming={false}
        />
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// RTL
export const RTL: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>نص متدفق</CardTitle>
        <CardDescription>نص عربي مع تأثير الكتابة المباشرة</CardDescription>
      </CardHeader>
      <CardContent className="text-right">
        <StreamingText
          text="الذكاء الاصطناعي يغير طريقة تفاعلنا مع التكنولوجيا. من معالجة اللغة الطبيعية إلى رؤية الكمبيوتر، أصبحت أنظمة الذكاء الاصطناعي أكثر تطوراً."
          speed={30}
        />
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true }
  }
};
