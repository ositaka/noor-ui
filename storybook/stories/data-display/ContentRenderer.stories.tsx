import type { Meta, StoryObj } from '@storybook/react';
import { ContentRenderer } from '../../../components/ui/content-renderer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';

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
  parameters: {
    ar: {
      args: {
        content: `<h3>محتوى عينة</h3>
<p>هذا نص <strong>غامق</strong> و <em>مائل</em>.</p>
<ul>
  <li>عنصر القائمة 1</li>
  <li>عنصر القائمة 2</li>
</ul>
<pre><code>const example = "code block";</code></pre>`
      }
    }
  },
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
          content={`<h3>Sample Heading</h3>
<p>This is <strong>bold</strong> and <em>italic</em> text.</p>
<ul>
  <li>List item 1</li>
  <li>List item 2</li>
  <li>List item 3</li>
</ul>
<pre><code class="language-javascript">const example = "code block";
console.log(example);</code></pre>`}
          format="markdown"
          dir="auto"
          enableCodeHighlight
          enableGFM
        />
      </CardContent>
    </Card>
  ),

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
          content={`<h3>Code Example</h3>
<p>Here's a JavaScript function:</p>
<pre><code class="language-javascript">function greet(name) {
  return \`Hello, \${name}!\`;
}

const message = greet('World');
console.log(message);</code></pre>
<p>And a CSS example:</p>
<pre><code class="language-css">.button {
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}</code></pre>`}
          format="markdown"
          enableCodeHighlight
        />
      </CardContent>
    </Card>
  ),

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
          content={`<h3>Task List</h3>
<ul>
  <li><input type="checkbox" checked disabled /> Completed task</li>
  <li><input type="checkbox" disabled /> Pending task</li>
  <li><input type="checkbox" disabled /> Another task</li>
</ul>
<h3>Table</h3>
<table>
  <thead>
    <tr><th>Feature</th><th>Status</th></tr>
  </thead>
  <tbody>
    <tr><td>Tables</td><td>✓</td></tr>
    <tr><td>Lists</td><td>✓</td></tr>
    <tr><td>Code</td><td>✓</td></tr>
  </tbody>
</table>
<h3>Strikethrough</h3>
<p><del>This text is struck through</del></p>`}
          format="markdown"
          enableGFM
        />
      </CardContent>
    </Card>
  ),

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
          content={`<h2>Introduction</h2>
<p>Welcome to this comprehensive guide. This example demonstrates how the ContentRenderer component handles longer articles with multiple sections.</p>
<h3>Main Section</h3>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
<p><strong>Key points:</strong></p>
<ul>
  <li>Point one with important information</li>
  <li>Point two with additional details</li>
  <li>Point three wrapping up the section</li>
</ul>
<h3>Code Example</h3>
<pre><code class="language-typescript">interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: 'Nuno Marques',
  email: 'john@example.com'
};</code></pre>
<h3>Conclusion</h3>
<p>This section wraps up the article with final thoughts and recommendations.</p>`}
          format="markdown"
          enableCodeHighlight
          enableGFM
        />
      </CardContent>
    </Card>
  ),

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
          content={`<h3>Left-to-Right Content</h3>
<p>This content is explicitly set to LTR direction.</p>
<ul>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
<p>The text flows from left to right.</p>`}
          format="markdown"
          dir="ltr"
        />
      </CardContent>
    </Card>
  ),

  parameters: {
    controls: { disable: true }
  }
};

