'use client'

import * as React from 'react'
import dynamic from 'next/dynamic'
import { cn, copyToClipboard } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Copy, Check, ChevronDown, ChevronUp } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

// Lazy load the heavy syntax highlighter (saves ~200-300KB from initial bundle)
const SyntaxHighlighter = dynamic(
  () =>
    import('react-syntax-highlighter').then((mod) => ({
      default: mod.Prism,
    })),
  {
    loading: () => <Skeleton className="h-32 w-full rounded-none" />,
    ssr: false,
  }
)

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
  showLineNumbers?: boolean
  highlightLines?: number[]
  className?: string
  collapsible?: boolean
  defaultCollapsed?: boolean
}

export function CodeBlock({
  code,
  language = 'tsx',
  title,
  showLineNumbers = true,
  highlightLines = [],
  className,
  collapsible = false,
  defaultCollapsed = false,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed)

  const handleCopy = async () => {
    const success = await copyToClipboard(code)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Card className={cn('overflow-hidden', className)}>
      {(title || collapsible) && (
        <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-muted/30 px-4 py-2">
          <div className="flex items-center gap-2">
            {title && (
              <span className="text-sm font-medium text-muted-foreground">
                {title}
              </span>
            )}
            {language && (
              <span className="rounded bg-muted px-2 py-0.5 text-xs font-mono text-muted-foreground">
                {language}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {collapsible && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCollapsed(!collapsed)}
                aria-label={collapsed ? 'Expand code' : 'Collapse code'}
                className="h-7 px-2"
              >
                {collapsed ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronUp className="h-4 w-4" />
                )}
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              aria-label="Copy code to clipboard"
              className="h-7 px-2"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-green-600 me-1" />
                  <span className="text-xs">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 me-1" />
                  <span className="text-xs">Copy</span>
                </>
              )}
            </Button>
          </div>
        </CardHeader>
      )}
      {!collapsed && (
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <SyntaxHighlighter
              language={language}
              style={vscDarkPlus}
              showLineNumbers={showLineNumbers}
              wrapLines={highlightLines.length > 0}
              lineProps={(lineNumber) => {
                const style: React.CSSProperties = { display: 'block' }
                if (highlightLines.includes(lineNumber)) {
                  style.backgroundColor = 'rgba(255, 255, 0, 0.1)'
                  style.borderLeft = '3px solid #fbbf24'
                  style.paddingLeft = '0.5rem'
                }
                return { style }
              }}
              customStyle={{
                margin: 0,
                borderRadius: 0,
                fontSize: '0.875rem',
                lineHeight: '1.5',
              }}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
