import type { Meta, StoryObj } from '@storybook/react';
import { ContentRenderer } from '../../../components/ui/content-renderer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';

/**
 * Content Renderer Component Stories
 *
 * All examples are taken from /app/(docs)/components/content-renderer/page.tsx
 *
 * Note: ContentRenderer displays content in multiple formats.
 * Features: Markdown/HTML/text rendering, automatic RTL/LTR detection, code highlighting, GFM support.
 */

const meta = {
  title: 'Data Display/Content Renderer',
  component: ContentRenderer,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    format: {
      control: { type: 'select' },
      options: ['markdown', 'html', 'text']
    },
    dir: {
      control: { type: 'select' },
      options: ['auto', 'ltr', 'rtl']
    },
    enableCodeHighlight: { control: 'boolean' },
    enableGFM: { control: 'boolean' },
    className: { control: 'text' }
  }
} satisfies Meta<typeof ContentRenderer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    content: `<h3>Sample Content</h3>
<p>This is <strong>bold</strong> and <em>italic</em> text.</p>
<ul>
  <li>List item 1</li>
  <li>List item 2</li>
</ul>
<pre><code>const example = "code block";</code></pre>`,
    format: 'html',
    dir: 'auto'
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  }
};

// HTML Format - from page lines 112-115
export const HTMLFormat: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Rendered Content</CardTitle>
        <CardDescription>Content with automatic direction detection</CardDescription>
      </CardHeader>
      <CardContent>
        <ContentRenderer
          content={`<h3>Sample Content</h3>
<p>This is <strong>bold</strong> and <em>italic</em> text.</p>
<ul>
  <li>List item 1</li>
  <li>List item 2</li>
</ul>
<pre><code>const example = "code block";</code></pre>`}
          format="html"
          dir="auto"
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

// Markdown Format
export const MarkdownFormat: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Markdown Content</CardTitle>
        <CardDescription>Rendered from Markdown format</CardDescription>
      </CardHeader>
      <CardContent>
        <ContentRenderer
          content={`### Sample Heading

This is **bold** and *italic* text.

- List item 1
- List item 2
- List item 3

\`\`\`javascript
const example = "code block";
console.log(example);
\`\`\``}
          format="markdown"
          dir="auto"
          enableCodeHighlight
          enableGFM
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

// Plain Text Format
export const PlainTextFormat: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Plain Text</CardTitle>
        <CardDescription>Rendered as plain text without parsing</CardDescription>
      </CardHeader>
      <CardContent>
        <ContentRenderer
          content={`This is plain text content.
It preserves line breaks and spacing.

No HTML or Markdown parsing is applied.`}
          format="text"
          dir="auto"
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

// With Code Highlighting
export const WithCodeHighlighting: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Code Highlighting</CardTitle>
        <CardDescription>Syntax highlighting for code blocks</CardDescription>
      </CardHeader>
      <CardContent>
        <ContentRenderer
          content={`### Code Example

Here's a JavaScript function:

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

const message = greet('World');
console.log(message);
\`\`\`

And a CSS example:

\`\`\`css
.button {
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}
\`\`\``}
          format="markdown"
          enableCodeHighlight
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

// GitHub Flavored Markdown
export const GitHubFlavoredMarkdown: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>GFM Features</CardTitle>
        <CardDescription>Tables, task lists, and strikethrough</CardDescription>
      </CardHeader>
      <CardContent>
        <ContentRenderer
          content={`### Task List

- [x] Completed task
- [ ] Pending task
- [ ] Another task

### Table

| Feature | Status |
|---------|--------|
| Tables  | ✓      |
| Lists   | ✓      |
| Code    | ✓      |

### Strikethrough

~~This text is struck through~~`}
          format="markdown"
          enableGFM
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

// Long Content
export const LongContent: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Article Content</CardTitle>
        <CardDescription>Longer form content with multiple sections</CardDescription>
      </CardHeader>
      <CardContent>
        <ContentRenderer
          content={`## Introduction

Welcome to this comprehensive guide. This example demonstrates how the ContentRenderer component handles longer articles with multiple sections.

### Main Section

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

**Key points:**
- Point one with important information
- Point two with additional details
- Point three wrapping up the section

### Code Example

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com'
};
\`\`\`

### Conclusion

This section wraps up the article with final thoughts and recommendations.`}
          format="markdown"
          enableCodeHighlight
          enableGFM
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

// LTR Explicit
export const LTRExplicit: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>LTR Content</CardTitle>
        <CardDescription>Explicitly set to left-to-right</CardDescription>
      </CardHeader>
      <CardContent>
        <ContentRenderer
          content={`### Left-to-Right Content

This content is explicitly set to LTR direction.

- First item
- Second item
- Third item

The text flows from left to right.`}
          format="markdown"
          dir="ltr"
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

// RTL Content - from AR i18n
export const RTLContent: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>محتوى عربي</CardTitle>
        <CardDescription>محتوى مع اكتشاف تلقائي للاتجاه</CardDescription>
      </CardHeader>
      <CardContent>
        <ContentRenderer
          content={`<h3>محتوى عينة</h3>
<p>هذا نص <strong>غامق</strong> و <em>مائل</em>.</p>
<ul>
  <li>عنصر القائمة 1</li>
  <li>عنصر القائمة 2</li>
</ul>`}
          format="html"
          dir="auto"
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

// RTL Markdown
export const RTLMarkdown: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>محتوى Markdown عربي</CardTitle>
        <CardDescription>محتوى Markdown مع دعم RTL</CardDescription>
      </CardHeader>
      <CardContent>
        <ContentRenderer
          content={`### عنوان المقال

هذا مثال على **نص غامق** و *نص مائل* باللغة العربية.

- عنصر القائمة الأول
- عنصر القائمة الثاني
- عنصر القائمة الثالث

#### قائمة مرقمة

1. الخطوة الأولى
2. الخطوة الثانية
3. الخطوة الثالثة`}
          format="markdown"
          dir="rtl"
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
