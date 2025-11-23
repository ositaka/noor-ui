'use client'

import * as React from 'react'
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  linkPlugin,
  linkDialogPlugin,
  tablePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CreateLink,
  ListsToggle,
  InsertTable,
  InsertThematicBreak,
  CodeToggle,
  type MDXEditorMethods,
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import { cn } from '../../lib/utils'
import { useDirection } from '../providers/direction-provider'

export interface MarkdownEditorProps {
  /** The markdown content */
  content?: string
  /** Callback fired when content changes */
  onChange?: (content: string) => void
  /** Placeholder text shown when editor is empty */
  placeholder?: string
  /** Additional CSS classes */
  className?: string
  /** Whether the editor is editable */
  editable?: boolean
  /** Minimum height of the editor */
  minHeight?: string
  /** Override the direction from context */
  dir?: 'ltr' | 'rtl'
}

/**
 * MarkdownEditor - A WYSIWYG markdown editor component
 *
 * Uses MDXEditor for native markdown editing. Unlike RichTextEditor (which outputs HTML),
 * this component outputs clean markdown, making it ideal for blogs, documentation, and MDX content.
 *
 * Features:
 * - Native markdown WYSIWYG editing
 * - Syntax highlighting for code blocks
 * - Tables, lists, links, and blockquotes
 * - RTL support
 * - Keyboard shortcuts
 * - Theme support (uses CSS variables)
 *
 * @example
 * ```tsx
 * <MarkdownEditor
 *   content={markdown}
 *   onChange={setMarkdown}
 *   placeholder="Start writing..."
 * />
 * ```
 */
export const MarkdownEditor = React.forwardRef<HTMLDivElement, MarkdownEditorProps>(
  ({
    content = '',
    onChange,
    placeholder = 'Start writing...',
    className,
    editable = true,
    minHeight = '300px',
    dir: dirProp
  }, ref) => {
    const editorRef = React.useRef<MDXEditorMethods>(null)
    const { direction: contextDirection } = useDirection()
    const direction = dirProp || contextDirection

    // Update editor content when content prop changes externally
    React.useEffect(() => {
      if (editorRef.current) {
        const currentContent = editorRef.current.getMarkdown()
        if (currentContent !== content) {
          editorRef.current.setMarkdown(content)
        }
      }
    }, [content])

    const handleChange = React.useCallback((markdown: string) => {
      onChange?.(markdown)
    }, [onChange])

    // CSS custom properties for theming
    const cssVars = {
      '--mdx-min-height': minHeight,
    } as React.CSSProperties

    return (
      <div
        ref={ref}
        className={cn(
          'markdown-editor-container rounded-md border border-input bg-background overflow-hidden',
          'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
          className
        )}
        dir={direction}
        style={cssVars}
      >
        <MDXEditor
          ref={editorRef}
          markdown={content}
          onChange={handleChange}
          placeholder={placeholder}
          readOnly={!editable}
          contentEditableClassName={cn(
            'prose prose-sm dark:prose-invert max-w-none p-4 focus:outline-none',
            direction === 'rtl' && 'text-right'
          )}
          plugins={[
            // Core plugins
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
            markdownShortcutPlugin(),
            linkPlugin(),
            linkDialogPlugin(),
            tablePlugin(),
            codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
            codeMirrorPlugin({
              codeBlockLanguages: {
                js: 'JavaScript',
                ts: 'TypeScript',
                tsx: 'TypeScript (React)',
                jsx: 'JavaScript (React)',
                css: 'CSS',
                html: 'HTML',
                json: 'JSON',
                bash: 'Bash',
                shell: 'Shell',
                python: 'Python',
                sql: 'SQL',
                md: 'Markdown',
                go: 'Go',
                rust: 'Rust',
                java: 'Java',
                php: 'PHP',
                ruby: 'Ruby',
                yaml: 'YAML',
                xml: 'XML',
              },
            }),
            // Toolbar (only if editable)
            ...(editable ? [
              toolbarPlugin({
                toolbarContents: () => (
                  <>
                    <UndoRedo />
                    <BlockTypeSelect />
                    <BoldItalicUnderlineToggles />
                    <CodeToggle />
                    <CreateLink />
                    <ListsToggle />
                    <InsertTable />
                    <InsertThematicBreak />
                  </>
                ),
              }),
            ] : []),
          ]}
        />
        <style dangerouslySetInnerHTML={{ __html: `
          /* CSS Custom Properties for MDXEditor - All values use CSS variables for theming */
          .markdown-editor-container {
            --mdx-font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            --mdx-spacing-xs: 0.25rem;
            --mdx-spacing-sm: 0.5rem;
            --mdx-spacing-md: 1rem;
            --mdx-spacing-lg: 1.5rem;
            --mdx-radius-sm: var(--radius, 0.25rem);
            --mdx-radius-md: calc(var(--radius, 0.5rem) * 1.5);
          }

          .markdown-editor-container [class*="_editorRoot"] {
            font-family: inherit;
            min-height: var(--mdx-min-height, 300px);
          }

          .markdown-editor-container [class*="_toolbarRoot"] {
            background: hsl(var(--muted));
            border-bottom: 1px solid hsl(var(--border));
            padding: var(--mdx-spacing-xs) var(--mdx-spacing-sm);
            gap: var(--mdx-spacing-xs);
            flex-wrap: wrap;
          }

          .markdown-editor-container [class*="_toolbarRoot"] button,
          .markdown-editor-container [class*="_toolbarRoot"] select {
            background: transparent;
            border: 1px solid transparent;
            border-radius: var(--mdx-radius-sm);
            padding: var(--mdx-spacing-xs) var(--mdx-spacing-sm);
            font-size: 0.75rem;
            color: hsl(var(--foreground));
            cursor: pointer;
            transition: all 0.2s;
          }

          .markdown-editor-container [class*="_toolbarRoot"] button:hover,
          .markdown-editor-container [class*="_toolbarRoot"] select:hover {
            background: hsl(var(--accent));
          }

          .markdown-editor-container [class*="_toolbarRoot"] button[data-state="on"],
          .markdown-editor-container [class*="_toolbarRoot"] button:active {
            background: hsl(var(--accent));
            color: hsl(var(--accent-foreground));
          }

          .markdown-editor-container [class*="_contentEditable"] {
            padding: var(--mdx-spacing-md);
            min-height: var(--mdx-min-height, 300px);
          }

          .markdown-editor-container [class*="_contentEditable"]:focus {
            outline: none;
          }

          /* Code blocks */
          .markdown-editor-container pre {
            background: hsl(var(--muted));
            border: 1px solid hsl(var(--border));
            border-radius: var(--mdx-radius-md);
            padding: var(--mdx-spacing-md);
            overflow-x: auto;
            font-family: var(--mdx-font-mono);
          }

          .markdown-editor-container code {
            font-family: var(--mdx-font-mono);
            font-size: 0.875em;
          }

          /* Inline code */
          .markdown-editor-container :not(pre) > code {
            background: hsl(var(--muted));
            padding: 0.125em 0.25em;
            border-radius: var(--mdx-radius-sm);
          }

          /* Tables */
          .markdown-editor-container table {
            border-collapse: collapse;
            width: 100%;
            margin-block: var(--mdx-spacing-md);
          }

          .markdown-editor-container th,
          .markdown-editor-container td {
            border: 1px solid hsl(var(--border));
            padding: var(--mdx-spacing-sm) var(--mdx-spacing-md);
            text-align: start;
          }

          .markdown-editor-container th {
            background: hsl(var(--muted));
            font-weight: 600;
          }

          /* Blockquotes */
          .markdown-editor-container blockquote {
            border-inline-start: 4px solid hsl(var(--primary) / 0.3);
            padding-inline-start: var(--mdx-spacing-md);
            margin-block: var(--mdx-spacing-md);
            font-style: italic;
            color: hsl(var(--muted-foreground));
          }

          /* Links */
          .markdown-editor-container a {
            color: hsl(var(--primary));
            text-decoration: underline;
          }

          /* Lists - using logical properties for RTL */
          .markdown-editor-container ul,
          .markdown-editor-container ol {
            padding-inline-start: var(--mdx-spacing-lg);
            margin-block: var(--mdx-spacing-md);
          }

          /* Popover/dialog styles */
          .markdown-editor-container [class*="_dialogContent"],
          .markdown-editor-container [class*="_popoverContent"] {
            background: hsl(var(--popover));
            border: 1px solid hsl(var(--border));
            border-radius: var(--mdx-radius-md);
            box-shadow: 0 4px 12px hsl(var(--foreground) / 0.1);
            padding: var(--mdx-spacing-md);
          }

          .markdown-editor-container [class*="_dialogContent"] input,
          .markdown-editor-container [class*="_popoverContent"] input {
            background: hsl(var(--background));
            border: 1px solid hsl(var(--input));
            border-radius: var(--mdx-radius-sm);
            padding: var(--mdx-spacing-sm);
            font-size: 0.875rem;
            width: 100%;
            color: hsl(var(--foreground));
          }

          .markdown-editor-container [class*="_dialogContent"] button[type="submit"],
          .markdown-editor-container [class*="_primaryButton"] {
            background: hsl(var(--primary));
            color: hsl(var(--primary-foreground));
            border: none;
            border-radius: var(--mdx-radius-sm);
            padding: var(--mdx-spacing-sm) var(--mdx-spacing-md);
            cursor: pointer;
          }

          /* Placeholder */
          .markdown-editor-container [data-placeholder]::before {
            color: hsl(var(--muted-foreground));
          }

          /* Headings */
          .markdown-editor-container h1 {
            font-size: 2em;
            font-weight: bold;
            margin-block: 0.67em;
          }

          .markdown-editor-container h2 {
            font-size: 1.5em;
            font-weight: bold;
            margin-block: 0.75em;
          }

          .markdown-editor-container h3 {
            font-size: 1.17em;
            font-weight: bold;
            margin-block: 0.83em;
          }
        ` }} />
      </div>
    )
  }
)

MarkdownEditor.displayName = 'MarkdownEditor'
