import type { Meta, StoryObj } from '@storybook/react';
import { MarkdownEditor } from '../../../components/ui/markdown-editor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { useState } from 'react';

/**
 * Markdown Editor Component Stories
 *
 * Note: MarkdownEditor provides a WYSIWYG markdown editing experience.
 * Features: Native markdown output (unlike RichTextEditor which outputs HTML), syntax highlighting,
 * tables, lists, links, blockquotes, code blocks, RTL support, keyboard shortcuts.
 * Built with MDXEditor.
 */

const meta = {
  title: 'Basic/Markdown Editor',
  component: MarkdownEditor,
  parameters: {
    layout: 'centered'
  },
  tags: ['!autodocs'],
  argTypes: {
    content: { control: 'text' },
    onChange: { control: false },
    placeholder: { control: 'text' },
    className: { control: 'text' },
    editable: { control: 'boolean' },
    minHeight: { control: 'text' },
    dir: {
      control: { type: 'select' },
      options: ['ltr', 'rtl']
    }
  }
} satisfies Meta<typeof MarkdownEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  render: () => {
    const [content, setContent] = useState('');

    return (
      <div className="w-full max-w-3xl">
        <MarkdownEditor
          content={content}
          onChange={setContent}
          placeholder="Start writing your markdown..."
        />
      </div>
    );
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  }
};

// With Content
export const WithContent: Story = {
  render: () => {
    const [content, setContent] = useState(`# Welcome to Markdown Editor

This is a **WYSIWYG** markdown editor that outputs _clean markdown_.

## Features

- Native markdown editing
- Syntax highlighting for code
- Tables, lists, and blockquotes
- RTL support

Try editing this content!`);

    return (
      <Card>
        <CardHeader>
          <CardTitle>Markdown Editor</CardTitle>
          <CardDescription>Edit markdown with a visual interface</CardDescription>
        </CardHeader>
        <CardContent>
          <MarkdownEditor
            content={content}
            onChange={setContent}
          />
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

// With Code Blocks
export const WithCodeBlocks: Story = {
  render: () => {
    const [content, setContent] = useState(`# Code Example

Here's a JavaScript function:

\`\`\`javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
\`\`\`

Inline code: \`const x = 42\``);

    return (
      <Card>
        <CardContent className="p-6">
          <MarkdownEditor
            content={content}
            onChange={setContent}
          />
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

// With Table
export const WithTable: Story = {
  render: () => {
    const [content, setContent] = useState(`# Data Table

| Name | Role | Status |
|------|------|--------|
| Alice | Developer | Active |
| Bob | Designer | Active |
| Carol | Manager | Away |

Use the toolbar to insert and edit tables.`);

    return (
      <Card>
        <CardContent className="p-6">
          <MarkdownEditor
            content={content}
            onChange={setContent}
          />
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

// Read Only
export const ReadOnly: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Read-Only Mode</CardTitle>
        <CardDescription>View markdown without editing</CardDescription>
      </CardHeader>
      <CardContent>
        <MarkdownEditor
          content={`# Read-Only Document

This content **cannot be edited**.

> Use read-only mode to display markdown content.`}
          editable={false}
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

// Custom Height
export const CustomHeight: Story = {
  render: () => {
    const [content, setContent] = useState('');

    return (
      <Card>
        <CardHeader>
          <CardTitle>Compact Editor</CardTitle>
          <CardDescription>Custom minimum height</CardDescription>
        </CardHeader>
        <CardContent>
          <MarkdownEditor
            content={content}
            onChange={setContent}
            minHeight="150px"
            placeholder="Compact editor..."
          />
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

// Blog Post Example
export const BlogPostExample: Story = {
  render: () => {
    const [content, setContent] = useState(`# My First Blog Post

Published on January 1, 2024

## Introduction

Welcome to my blog! This is my first post written in **markdown**.

## What I'll Cover

1. Getting started
2. Best practices
3. Advanced techniques

> "Markdown is a lightweight markup language" - John Gruber

## Code Example

\`\`\`typescript
const greeting: string = "Hello, World!";
console.log(greeting);
\`\`\`

---

Thanks for reading!`);

    return (
      <Card>
        <CardContent className="p-6">
          <MarkdownEditor
            content={content}
            onChange={setContent}
          />
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

// RTL
export const RTL: Story = {
  render: () => {
    const [content, setContent] = useState(`# مرحباً بك في محرر Markdown

هذا **محرر نصوص** يدعم اللغة العربية بشكل كامل.

## المميزات

- تحرير مباشر
- دعم الأكواد
- دعم الجداول

جرب تحرير هذا المحتوى!`);

    return (
      <Card>
        <CardHeader>
          <CardTitle>محرر Markdown</CardTitle>
          <CardDescription>تحرير ملفات markdown مع دعم RTL</CardDescription>
        </CardHeader>
        <CardContent>
          <MarkdownEditor
            content={content}
            onChange={setContent}
            dir="rtl"
          />
        </CardContent>
      </Card>
    );
  },
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true }
  }
};
