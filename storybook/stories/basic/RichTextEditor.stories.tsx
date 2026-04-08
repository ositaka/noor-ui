import type { Meta, StoryObj } from '@storybook/react';
import { RichTextEditor } from '../../../components/ui/rich-text-editor';
import { Card, CardContent } from '../../../components/ui/card';
import { useState } from 'react';

const meta = {
  title: 'Advanced Forms & Inputs/Rich Text Editor',
  component: RichTextEditor,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    onChange: { control: false },
    placeholder: { control: 'text' },
    className: { control: 'text' },
    editable: { control: 'boolean' },
    minHeight: { control: 'text' }
  }
} satisfies Meta<typeof RichTextEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - from page lines 185-190
export const Default: Story = {
  render: () => {
    const [content, setContent] = useState('');

    return (
      <div className="w-full max-w-3xl">
        <RichTextEditor
          content={content}
          onChange={setContent}
          placeholder="Start writing your content..."
        />
      </div>
    );
  }
};

// With Content - from page lines 143-144, code 74-77
export const WithContent: Story = {
  render: () => {
    const [content, setContent] = useState(
      '<h2>Welcome to Noor UI</h2><p>This is a <strong>rich text editor</strong> with full <em>RTL support</em>.</p>'
    );

    return (
      <Card>
        <CardContent className="p-6">
          <RichTextEditor
            content={content}
            onChange={setContent}
          />
        </CardContent>
      </Card>
    );
  },
  parameters: {
    controls: { disable: true }
  }
};

// Arabic Content - from page lines 145, code 93-95
export const ArabicContent: Story = {
  render: () => {
    const [content, setContent] = useState(
      '<h2>مرحباً بك في نور</h2><p>هذا <strong>محرر نصوص غني</strong> مع دعم كامل للغة العربية.</p>'
    );

    return (
      <Card>
        <CardContent className="p-6">
          <RichTextEditor
            content={content}
            onChange={setContent}
            placeholder="ابدأ الكتابة..."
          />
        </CardContent>
      </Card>
    );
  },
  parameters: {
    controls: { disable: true }
  }
};

// Read Only - from code lines 113-117
export const ReadOnly: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <RichTextEditor
          content="<h2>Read-Only Editor</h2><p>This editor is <strong>not editable</strong>.</p>"
          editable={false}
        />
      </CardContent>
    </Card>
  ),
  parameters: {
    controls: { disable: true }
  }
};

// Custom Height - from code lines 125-135
export const CustomHeight: Story = {
  render: () => {
    const [content, setContent] = useState('');

    return (
      <Card>
        <CardContent className="p-6">
          <RichTextEditor
            content={content}
            onChange={setContent}
            minHeight="150px"
            placeholder="Compact editor..."
          />
        </CardContent>
      </Card>
    );
  },
  parameters: {
    controls: { disable: true }
  }
};

// Empty State
export const EmptyState: Story = {
  render: () => {
    const [content, setContent] = useState('');

    return (
      <Card>
        <CardContent className="p-6">
          <RichTextEditor
            content={content}
            onChange={setContent}
            placeholder="Click here to start writing..."
          />
        </CardContent>
      </Card>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Editor with empty content showing placeholder text.'
      }
    }
  }
};

// With Lists and Formatting
export const WithListsAndFormatting: Story = {
  render: () => {
    const [content, setContent] = useState(
      '<h2>Features</h2>' +
      '<ul><li><strong>Bold</strong> and <em>italic</em> text</li>' +
      '<li>Bulleted and numbered lists</li>' +
      '<li>Headings and paragraphs</li></ul>' +
      '<p>Try editing this content!</p>'
    );

    return (
      <Card>
        <CardContent className="p-6">
          <RichTextEditor
            content={content}
            onChange={setContent}
          />
        </CardContent>
      </Card>
    );
  },
  parameters: {
    controls: { disable: true }
  }
};
