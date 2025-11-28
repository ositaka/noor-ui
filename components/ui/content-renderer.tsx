'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ContentRendererProps {
  /**
   * Content to render
   */
  content: string

  /**
   * Content format
   * - markdown: Rendered markdown HTML
   * - html: Raw HTML
   * - text: Plain text
   */
  format?: 'markdown' | 'html' | 'text'

  /**
   * Text direction
   * - auto: Browser detects based on content (recommended)
   * - ltr: Force left-to-right
   * - rtl: Force right-to-left
   */
  dir?: 'auto' | 'ltr' | 'rtl'

  /**
   * Enable syntax highlighting for code blocks
   * Default: true
   */
  enableCodeHighlight?: boolean

  /**
   * Enable GitHub Flavored Markdown
   * Default: true
   */
  enableGFM?: boolean

  /**
   * Additional class name
   */
  className?: string
}

/**
 * ContentRenderer component
 *
 * Renders markdown/HTML content with automatic RTL/LTR detection
 * and proper code block handling.
 *
 * Features:
 * - Automatic bidirectional text support (dir="auto")
 * - Code blocks always LTR
 * - Prose styling for typography
 * - XSS protection (sanitization handled by server)
 *
 * @example
 * <ContentRenderer
 *   content={comment.contentHtml}
 *   format="html"
 *   dir="auto"
 * />
 */
export function ContentRenderer({
  content,
  format = 'html',
  dir = 'auto',
  enableCodeHighlight = true,
  enableGFM = true,
  className,
}: ContentRendererProps) {
  // For plain text, just render as paragraph
  if (format === 'text') {
    return (
      <div
        dir={dir}
        className={cn('prose prose-sm dark:prose-invert max-w-none', className)}
      >
        <p>{content}</p>
      </div>
    )
  }

  // For markdown/html, render with dangerouslySetInnerHTML
  // Note: Content should be sanitized on the server before storing
  return (
    <div
      dir={dir}
      className={cn(
        'prose prose-sm dark:prose-invert max-w-none',
        // Ensure code blocks are always LTR
        '[&_pre]:!dir-ltr [&_pre]:!text-left',
        // Proper spacing
        '[&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0',
        // Links
        '[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary/80',
        // Lists with logical properties
        '[&_ul]:ps-6 [&_ol]:ps-6',
        '[&_ul]:list-disc [&_ol]:list-decimal',
        '[&_li]:my-1',
        // Inline code
        '[&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono',
        // Code blocks (pre > code) - override inline code styles
        '[&_pre_code]:bg-transparent [&_pre_code]:p-0',
        // Blockquotes
        '[&_blockquote]:border-s-4 [&_blockquote]:border-primary/30 [&_blockquote]:ps-4 [&_blockquote]:my-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground',
        // Tables
        '[&_table]:w-full [&_table]:border-collapse [&_table]:my-4',
        '[&_th]:border [&_th]:border-border [&_th]:px-3 [&_th]:py-2 [&_th]:text-start [&_th]:font-semibold [&_th]:bg-muted/50',
        '[&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_td]:text-start',
        // Horizontal rule
        '[&_hr]:my-6 [&_hr]:border-border',
        className
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
