import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
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
  title: 'AI-LLM Shell/Streaming Text',
  component: StreamingText,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
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
  parameters: {
    ar: {
      args: {
        text: 'مرحباً! هذا نص متدفق...'
      }
    }
  },
};

// Fast Speed
export const FastSpeed: Story = {
  render: () => (
    <Card className="w-96">
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
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders card with fast streaming text', async () => {
      await expect(canvas.getByText('Fast Streaming')).toBeInTheDocument();
      await expect(canvas.getByText('Text streams at 10ms per character')).toBeInTheDocument();
    });

    await step('Text streams quickly and completes', async () => {
      // Fast speed (10ms) - wait long enough for completion
      // 61 characters * 10ms = 610ms, add buffer
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Use findByText to wait for the text content to appear
      const textMatch = await canvas.findByText(/This text appears very quickly/i, {}, { timeout: 2000 });
      await expect(textMatch).toBeInTheDocument();
      await expect(textMatch).toBeVisible();
    });
  }
};

// Slow Speed
export const SlowSpeed: Story = {
  render: () => (
    <Card className="w-96">
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
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders card with slow streaming text', async () => {
      await expect(canvas.getByText('Slow Streaming')).toBeInTheDocument();
    });

    await step('Text streams slowly with partial content visible', async () => {
      // Wait for a few characters to appear
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Find the streaming text by looking for partial content
      const textMatch = await canvas.findByText(/This text/i, {}, { timeout: 1000 });
      const streamingText = textMatch.closest('span');
      const currentText = streamingText?.textContent || '';

      // Should have started but not completed
      await expect(currentText.length).toBeGreaterThan(0);
      await expect(currentText.length).toBeLessThan(57); // Full text is 57 chars
    });
  }
};

// Without Cursor
export const WithoutCursor: Story = {
  render: () => (
      <Card className="w-96">
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
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders card with streaming text', async () => {
      await expect(canvas.getByText('No Cursor')).toBeInTheDocument();
    });

    await step('Cursor is not visible when showCursor is false', async () => {
      // Wait for streaming to start
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Cursor element should NOT be present
      const cursor = canvasElement.querySelector('span.animate-blink');
      await expect(cursor).not.toBeInTheDocument();
    });

    await step('Text still streams without cursor', async () => {
      // Find text by content instead of CSS classes
      const textMatch = await canvas.findByText(/This text streams/i, {}, { timeout: 1000 });
      await expect(textMatch).toBeInTheDocument();

      const currentText = textMatch.textContent || '';
      await expect(currentText.length).toBeGreaterThan(0);
    });
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
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders card with long text content', async () => {
      await expect(canvas.getByText('Long Content')).toBeInTheDocument();
    });

    await step('Long text streams progressively', async () => {
      // Wait for streaming to progress
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Find text by content
      const textMatch = await canvas.findByText(/Artificial intelligence/i, {}, { timeout: 1000 });
      await expect(textMatch).toBeInTheDocument();

      const currentText = textMatch.textContent || '';
      await expect(currentText.length).toBeGreaterThan(0);
    });
  }
};

// Chat Message Simulation
export const ChatMessageSimulation: Story = {
  render: () => {
    const [showResponse, setShowResponse] = useState(false);

    return (
      <Card className="w-96">
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
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders chat simulation interface', async () => {
      await expect(canvas.getByText('Chat Simulation')).toBeInTheDocument();
      await expect(canvas.getByText('You')).toBeInTheDocument();
      await expect(canvas.getByText('What is React?')).toBeInTheDocument();
      await expect(canvas.getByText('AI Assistant')).toBeInTheDocument();
    });

    await step('Shows generate button initially', async () => {
      const button = canvas.getByRole('button', { name: 'Generate Response' });
      await expect(button).toBeInTheDocument();
      await expect(button).toBeVisible();
    });

    await step('Clicking button triggers streaming response', async () => {
      const button = canvas.getByRole('button', { name: 'Generate Response' });
      await userEvent.click(button);

      // Button should be gone
      await expect(canvas.queryByRole('button', { name: 'Generate Response' })).not.toBeInTheDocument();

      // Wait for streaming text to appear
      const streamingText = await canvas.findByText(/React is a popular/i, {}, { timeout: 1000 });
      await expect(streamingText).toBeInTheDocument();

      const currentText = streamingText.textContent || '';
      await expect(currentText.length).toBeGreaterThan(0);
    });
  }
};

// With Completion Callback
export const WithCompletionCallback: Story = {
  render: () => {
    const [completed, setCompleted] = useState(false);

    return (
      <Card className="w-96">
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
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders card with callback text', async () => {
      await expect(canvas.getByText('Completion Callback')).toBeInTheDocument();
    });

    await step('Completion message not visible initially', async () => {
      await expect(canvas.queryByText('✓ Streaming completed!')).not.toBeInTheDocument();
    });

    await step('Completion callback triggers after streaming finishes', async () => {
      // Text is 66 chars * 30ms = 1980ms, add buffer
      await new Promise((resolve) => setTimeout(resolve, 2500));

      // Completion message should now be visible
      await expect(canvas.getByText('✓ Streaming completed!')).toBeInTheDocument();
      await expect(canvas.getByText('✓ Streaming completed!')).toBeVisible();
    });
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
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders card with instant display', async () => {
      await expect(canvas.getByText('Instant Display')).toBeInTheDocument();
    });

    await step('Full text appears immediately without streaming', async () => {
      // Full text should be present immediately
      const fullText = 'This text appears instantly without streaming effect.';
      const streamingText = canvas.getByText(fullText);
      await expect(streamingText).toBeInTheDocument();
      await expect(streamingText.textContent).toBe(fullText);
    });

    await step('No cursor shown when isStreaming is false', async () => {
      // Cursor element should NOT be present
      const cursor = canvasElement.querySelector('span.animate-blink');
      await expect(cursor).not.toBeInTheDocument();
    });
  }
};

