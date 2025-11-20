import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import { Button } from './button'
import { Copy, RotateCw, User, Bot, Settings } from 'lucide-react'
import { useDirection } from '../providers/direction-provider'
import { content as i18nContent } from '../../lib/i18n'

const chatMessageVariants = cva(
  'group relative flex gap-3 rounded-lg p-4 transition-colors',
  {
    variants: {
      role: {
        user: 'bg-primary/5 ms-auto max-w-[80%]',
        assistant: 'bg-muted max-w-[85%]',
        system: 'bg-accent/50 border border-accent mx-auto max-w-[90%]',
      },
      variant: {
        default: '',
        compact: 'p-3 text-sm',
      },
      state: {
        complete: '',
        streaming: 'animate-pulse',
        error: 'border-2 border-destructive',
      },
    },
    defaultVariants: {
      role: 'assistant',
      variant: 'default',
      state: 'complete',
    },
  }
)

export interface ChatMessageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chatMessageVariants> {
  /**
   * The role/sender of the message
   */
  role: 'user' | 'assistant' | 'system'
  /**
   * The message content (supports markdown)
   */
  content: string
  /**
   * Optional timestamp
   */
  timestamp?: string
  /**
   * Optional avatar URL
   */
  avatar?: string
  /**
   * Optional name/label
   */
  name?: string
  /**
   * Show copy button
   */
  showCopy?: boolean
  /**
   * Show regenerate button (assistant only)
   */
  showRegenerate?: boolean
  /**
   * Callback when copy is clicked
   */
  onCopy?: () => void
  /**
   * Callback when regenerate is clicked
   */
  onRegenerate?: () => void
  /**
   * Whether text direction is RTL
   */
  isRTL?: boolean
}

const ChatMessage = React.forwardRef<HTMLDivElement, ChatMessageProps>(
  (
    {
      className,
      role,
      variant,
      state,
      content,
      timestamp,
      avatar,
      name,
      showCopy = true,
      showRegenerate = false,
      onCopy,
      onRegenerate,
      isRTL = false,
      ...domProps
    },
    ref
  ) => {
    const { locale } = useDirection()
    const t = i18nContent[locale]
    const [copied, setCopied] = React.useState(false)

    const handleCopy = () => {
      navigator.clipboard.writeText(content)
      setCopied(true)
      onCopy?.()
      setTimeout(() => setCopied(false), 2000)
    }

    const getAvatarIcon = () => {
      switch (role) {
        case 'user':
          return <User className="h-4 w-4" />
        case 'assistant':
          return <Bot className="h-4 w-4" />
        case 'system':
          return <Settings className="h-4 w-4" />
      }
    }

    const getDefaultName = () => {
      switch (role) {
        case 'user':
          return t.ui.components.you
        case 'assistant':
          return t.ui.components.assistant
        case 'system':
          return t.ui.components.system
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          chatMessageVariants({ role, variant, state }),
          role === 'user' && 'flex-row-reverse',
          className
        )}
        {...domProps}
      >
        {/* Avatar */}
        <Avatar className={cn('shrink-0', variant === 'compact' ? 'h-8 w-8' : 'h-10 w-10')}>
          <AvatarImage src={avatar} alt={name || getDefaultName()} />
          <AvatarFallback>{getAvatarIcon()}</AvatarFallback>
        </Avatar>

        {/* Content */}
        <div className={cn('flex-1 min-w-0', role === 'user' && 'text-end')}>
          {/* Header */}
          {(name || timestamp) && (
            <div
              className={cn(
                'flex items-center gap-2 mb-2',
                role === 'user' && 'flex-row-reverse justify-start'
              )}
            >
              {name && (
                <span className="font-semibold text-sm">{name || getDefaultName()}</span>
              )}
              {timestamp && (
                <span className="text-xs text-muted-foreground">{timestamp}</span>
              )}
            </div>
          )}

          {/* Message Content */}
          <div
            className={cn(
              'prose prose-sm dark:prose-invert max-w-none',
              role === 'user' && 'text-start'
            )}
          >
            {/* For now, render as plain text. In production, use react-markdown */}
            <p className="whitespace-pre-wrap break-words m-0">{content}</p>
          </div>

          {/* Actions */}
          {(showCopy || (showRegenerate && role === 'assistant')) && state === 'complete' && (
            <div
              className={cn(
                'flex items-center gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity',
                role === 'user' && 'justify-end'
              )}
            >
              {showCopy && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="h-7 text-xs"
                >
                  <Copy className={cn('h-3 w-3', isRTL ? 'ms-1' : 'me-1')} />
                  {copied ? t.ui.components.copied : t.ui.components.copy}
                </Button>
              )}
              {showRegenerate && role === 'assistant' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onRegenerate}
                  className="h-7 text-xs"
                >
                  <RotateCw className={cn('h-3 w-3', isRTL ? 'ms-1' : 'me-1')} />
                  {t.ui.components.regenerate}
                </Button>
              )}
            </div>
          )}

          {/* Error State */}
          {state === 'error' && (
            <div className="mt-2 text-xs text-destructive">
              {t.ui.components.errorGeneratingResponse}
            </div>
          )}
        </div>
      </div>
    )
  }
)

ChatMessage.displayName = 'ChatMessage'

export { ChatMessage, chatMessageVariants }
