import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
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
  tags: ['!autodocs'],
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
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders HTML structure correctly', async () => {
      const heading = canvasElement.querySelector('h3');
      await expect(heading).toBeInTheDocument();
      await expect(heading).toHaveTextContent('Sample Content');
    });

    await step('Renders formatted text', async () => {
      await expect(canvas.getByText('bold')).toBeInTheDocument();
      await expect(canvas.getByText('italic')).toBeInTheDocument();
    });

    await step('Renders list items', async () => {
      await expect(canvas.getByText('List item 1')).toBeInTheDocument();
      await expect(canvas.getByText('List item 2')).toBeInTheDocument();
      const ul = canvasElement.querySelector('ul');
      await expect(ul).toBeInTheDocument();
    });

    await step('Renders code block', async () => {
      const codeBlock = canvasElement.querySelector('pre code');
      await expect(codeBlock).toBeInTheDocument();
      await expect(codeBlock).toHaveTextContent('const example = "code block";');
    });

    await step('Has correct direction attribute', async () => {
      const container = canvasElement.querySelector('[dir="auto"]');
      await expect(container).toBeInTheDocument();
    });
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
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders in Card wrapper', async () => {
      await expect(canvas.getByText('Rendered Content')).toBeInTheDocument();
      await expect(canvas.getByText('Content with automatic direction detection')).toBeInTheDocument();
    });

    await step('Renders HTML content', async () => {
      // CardTitle is first h3, content h3 is second
      const headings = canvasElement.querySelectorAll('h3');
      await expect(headings.length).toBeGreaterThanOrEqual(2);
      await expect(headings[1]).toHaveTextContent('Sample Content');
      await expect(canvas.getByText('bold')).toBeInTheDocument();
    });
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders markdown content', async () => {
      // CardTitle is first h3, content h3 is second
      const headings = canvasElement.querySelectorAll('h3');
      await expect(headings.length).toBeGreaterThanOrEqual(2);
      await expect(headings[1]).toHaveTextContent('Sample Heading');
    });

    await step('Renders list with 3 items', async () => {
      await expect(canvas.getByText('List item 1')).toBeInTheDocument();
      await expect(canvas.getByText('List item 2')).toBeInTheDocument();
      await expect(canvas.getByText('List item 3')).toBeInTheDocument();
    });

    await step('Renders code block with language class', async () => {
      const codeBlock = canvasElement.querySelector('pre code');
      await expect(codeBlock).toBeInTheDocument();
      await expect(codeBlock).toHaveTextContent('const example = "code block";');
      await expect(codeBlock).toHaveTextContent('console.log(example);');
    });
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
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders plain text in paragraph', async () => {
      // First p is CardDescription, content paragraphs follow
      const paragraphs = canvasElement.querySelectorAll('p');
      await expect(paragraphs.length).toBeGreaterThanOrEqual(2);
      // Content is in a single <p> with the full text, use regex for partial match
      await expect(canvas.getByText(/This is plain text content/)).toBeInTheDocument();
    });

    await step('Preserves text without HTML parsing', async () => {
      await expect(canvas.getByText(/No HTML or Markdown parsing is applied/)).toBeInTheDocument();
    });

    await step('Does not render HTML elements from text', async () => {
      // ContentRenderer output should not have any h3 (only CardTitle has h3)
      const contentDiv = canvasElement.querySelector('[dir="auto"]');
      const heading = contentDiv?.querySelector('h3');
      await expect(heading).toBeNull();
    });
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders heading and description text', async () => {
      // CardTitle is first h3, content h3 is second
      const headings = canvasElement.querySelectorAll('h3');
      await expect(headings.length).toBeGreaterThanOrEqual(2);
      await expect(headings[1]).toHaveTextContent('Code Example');
      await expect(canvas.getByText("Here's a JavaScript function:")).toBeInTheDocument();
      await expect(canvas.getByText('And a CSS example:')).toBeInTheDocument();
    });

    await step('Renders JavaScript code block', async () => {
      const codeBlocks = canvasElement.querySelectorAll('pre code');
      await expect(codeBlocks.length).toBe(2);
      const jsCode = codeBlocks[0];
      await expect(jsCode).toHaveTextContent('function greet(name)');
      await expect(jsCode).toHaveTextContent('console.log(message);');
    });

    await step('Renders CSS code block', async () => {
      const codeBlocks = canvasElement.querySelectorAll('pre code');
      const cssCode = codeBlocks[1];
      await expect(cssCode).toHaveTextContent('.button');
      await expect(cssCode).toHaveTextContent('background-color: #007bff;');
    });
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders task list with checkboxes', async () => {
      const checkboxes = canvasElement.querySelectorAll('input[type="checkbox"]');
      await expect(checkboxes.length).toBe(3);
      await expect(checkboxes[0]).toBeChecked();
      await expect(checkboxes[1]).not.toBeChecked();
      await expect(canvas.getByText('Completed task')).toBeInTheDocument();
      await expect(canvas.getByText('Pending task')).toBeInTheDocument();
    });

    await step('Renders table with headers and rows', async () => {
      const table = canvasElement.querySelector('table');
      await expect(table).toBeInTheDocument();
      const headers = canvasElement.querySelectorAll('th');
      await expect(headers.length).toBe(2);
      await expect(canvas.getByText('Feature')).toBeInTheDocument();
      await expect(canvas.getByText('Status')).toBeInTheDocument();
    });

    await step('Renders table data cells', async () => {
      await expect(canvas.getByText('Tables')).toBeInTheDocument();
      await expect(canvas.getByText('Lists')).toBeInTheDocument();
      await expect(canvas.getByText('Code')).toBeInTheDocument();
    });

    await step('Renders strikethrough text', async () => {
      const del = canvasElement.querySelector('del');
      await expect(del).toBeInTheDocument();
      await expect(del).toHaveTextContent('This text is struck through');
    });
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
  name: 'John Doe',
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders multiple heading levels', async () => {
      const h2 = canvasElement.querySelector('h2');
      await expect(h2).toHaveTextContent('Introduction');
      // CardTitle is also an h3, so total is 4 (CardTitle + 3 content h3s)
      const h3Elements = canvasElement.querySelectorAll('h3');
      await expect(h3Elements.length).toBe(4);
      await expect(canvas.getByText('Main Section')).toBeInTheDocument();
      await expect(canvas.getByText('Code Example')).toBeInTheDocument();
      await expect(canvas.getByText('Conclusion')).toBeInTheDocument();
    });

    await step('Renders multi-section content', async () => {
      await expect(canvas.getByText(/Welcome to this comprehensive guide/)).toBeInTheDocument();
      await expect(canvas.getByText(/Lorem ipsum dolor sit amet/)).toBeInTheDocument();
    });

    await step('Renders list items', async () => {
      await expect(canvas.getByText('Point one with important information')).toBeInTheDocument();
      await expect(canvas.getByText('Point two with additional details')).toBeInTheDocument();
      await expect(canvas.getByText('Point three wrapping up the section')).toBeInTheDocument();
    });

    await step('Renders TypeScript code block', async () => {
      const codeBlock = canvasElement.querySelector('pre code');
      await expect(codeBlock).toBeInTheDocument();
      await expect(codeBlock).toHaveTextContent('interface User');
      await expect(codeBlock).toHaveTextContent("name: 'John Doe'");
    });
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Has explicit LTR direction', async () => {
      const container = canvasElement.querySelector('[dir="ltr"]');
      await expect(container).toBeInTheDocument();
    });

    await step('Renders LTR content', async () => {
      // CardTitle is first h3, content h3 is second
      const headings = canvasElement.querySelectorAll('h3');
      await expect(headings.length).toBeGreaterThanOrEqual(2);
      await expect(headings[1]).toHaveTextContent('Left-to-Right Content');
      await expect(canvas.getByText('This content is explicitly set to LTR direction.')).toBeInTheDocument();
    });

    await step('Renders list items', async () => {
      await expect(canvas.getByText('First item')).toBeInTheDocument();
      await expect(canvas.getByText('Second item')).toBeInTheDocument();
      await expect(canvas.getByText('Third item')).toBeInTheDocument();
    });
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
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders in RTL context', async () => {
      const container = canvasElement.querySelector('[dir="auto"]');
      await expect(container).toBeInTheDocument();
    });

    await step('Renders Arabic content', async () => {
      // CardTitle is first h3, content h3 is second
      const headings = canvasElement.querySelectorAll('h3');
      await expect(headings.length).toBeGreaterThanOrEqual(2);
      await expect(headings[1]).toHaveTextContent('محتوى عينة');
      await expect(canvas.getByText('غامق')).toBeInTheDocument();
      await expect(canvas.getByText('مائل')).toBeInTheDocument();
    });

    await step('Renders Arabic list items', async () => {
      await expect(canvas.getByText('عنصر القائمة 1')).toBeInTheDocument();
      await expect(canvas.getByText('عنصر القائمة 2')).toBeInTheDocument();
    });
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
          content={`<h3>عنوان المقال</h3>
<p>هذا مثال على <strong>نص غامق</strong> و <em>نص مائل</em> باللغة العربية.</p>
<ul>
  <li>عنصر القائمة الأول</li>
  <li>عنصر القائمة الثاني</li>
  <li>عنصر القائمة الثالث</li>
</ul>
<h4>قائمة مرقمة</h4>
<ol>
  <li>الخطوة الأولى</li>
  <li>الخطوة الثانية</li>
  <li>الخطوة الثالثة</li>
</ol>`}
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
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Has explicit RTL direction', async () => {
      const container = canvasElement.querySelector('[dir="rtl"]');
      await expect(container).toBeInTheDocument();
    });

    await step('Renders Arabic markdown content', async () => {
      // CardTitle is first h3, content h3 is second
      const headings = canvasElement.querySelectorAll('h3');
      await expect(headings.length).toBeGreaterThanOrEqual(2);
      await expect(headings[1]).toHaveTextContent('عنوان المقال');
      await expect(canvas.getByText('نص غامق')).toBeInTheDocument();
      await expect(canvas.getByText('نص مائل')).toBeInTheDocument();
    });

    await step('Renders unordered list items', async () => {
      await expect(canvas.getByText('عنصر القائمة الأول')).toBeInTheDocument();
      await expect(canvas.getByText('عنصر القائمة الثاني')).toBeInTheDocument();
      await expect(canvas.getByText('عنصر القائمة الثالث')).toBeInTheDocument();
    });

    await step('Renders ordered list with heading', async () => {
      const h4 = canvasElement.querySelector('h4');
      await expect(h4).toHaveTextContent('قائمة مرقمة');
      await expect(canvas.getByText('الخطوة الأولى')).toBeInTheDocument();
      await expect(canvas.getByText('الخطوة الثانية')).toBeInTheDocument();
      await expect(canvas.getByText('الخطوة الثالثة')).toBeInTheDocument();
      const ol = canvasElement.querySelector('ol');
      await expect(ol).toBeInTheDocument();
    });
  }
};
