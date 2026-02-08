import * as React from 'react'
import { cn } from '../../lib/utils'
import { Button } from './button'
import {
  Copy,
  ArrowClockwise,
  PencilSimple,
  ShareNetwork,
  Flag,
  ThumbsUp,
  ThumbsDown,
  Check,
} from '@phosphor-icons/react'
import { useDirection } from '../providers/direction-provider'
import { content } from '../../lib/i18n'

export interface MessageActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Show copy button
   */
  showCopy?: boolean
  /**
   * Show regenerate button
   */
  showRegenerate?: boolean
  /**
   * Show edit button
   */
  showEdit?: boolean
  /**
   * Show share button
   */
  showShare?: boolean
  /**
   * Show flag/report button
   */
  showFlag?: boolean
  /**
   * Show feedback buttons (thumbs up/down)
   */
  showFeedback?: boolean
  /**
   * Callback when copy is clicked
   */
  onCopy?: () => void
  /**
   * Callback when regenerate is clicked
   */
  onRegenerate?: () => void
  /**
   * Callback when edit is clicked
   */
  onEdit?: () => void
  /**
   * Callback when share is clicked
   */
  onShare?: () => void
  /**
   * Callback when flag is clicked
   */
  onFlag?: () => void
  /**
   * Callback when thumbs up is clicked
   */
  onThumbsUp?: () => void
  /**
   * Callback when thumbs down is clicked
   */
  onThumbsDown?: () => void
  /**
   * Whether text direction is RTL
   */
  isRTL?: boolean
  /**
   * Compact mode (icon only)
   */
  compact?: boolean
}

const MessageActions = React.forwardRef<HTMLDivElement, MessageActionsProps>(
  (
    {
      className,
      showCopy = true,
      showRegenerate = false,
      showEdit = false,
      showShare = false,
      showFlag = false,
      showFeedback = false,
      onCopy,
      onRegenerate,
      onEdit,
      onShare,
      onFlag,
      onThumbsUp,
      onThumbsDown,
      isRTL = false,
      compact = false,
      ...props
    },
    ref
  ) => {
    const { locale } = useDirection()
    const t = content[locale]
    const [copied, setCopied] = React.useState(false)
    const [feedback, setFeedback] = React.useState<'up' | 'down' | null>(null)

    const handleCopy = () => {
      setCopied(true)
      onCopy?.()
      setTimeout(() => setCopied(false), 2000)
    }

    const handleThumbsUp = () => {
      setFeedback(feedback === 'up' ? null : 'up')
      onThumbsUp?.()
    }

    const handleThumbsDown = () => {
      setFeedback(feedback === 'down' ? null : 'down')
      onThumbsDown?.()
    }

    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-1', className)}
        {...props}
      >
        {showCopy && (
          <Button
            variant="ghost"
            size={compact ? 'icon' : 'sm'}
            onClick={handleCopy}
            className={cn('h-7', !compact && 'text-xs')}
          >
            {copied ? (
              <Check className={cn('h-3 w-3', !compact && (isRTL ? 'ms-1' : 'me-1'))} />
            ) : (
              <Copy className={cn('h-3 w-3', !compact && (isRTL ? 'ms-1' : 'me-1'))} />
            )}
            {!compact && (copied ? t.ui.components.copied : t.ui.components.copy)}
          </Button>
        )}

        {showRegenerate && (
          <Button
            variant="ghost"
            size={compact ? 'icon' : 'sm'}
            onClick={onRegenerate}
            className={cn('h-7', !compact && 'text-xs')}
          >
            <ArrowClockwise className={cn('h-3 w-3', !compact && (isRTL ? 'ms-1' : 'me-1'))} />
            {!compact && t.ui.components.regenerate}
          </Button>
        )}

        {showEdit && (
          <Button
            variant="ghost"
            size={compact ? 'icon' : 'sm'}
            onClick={onEdit}
            className={cn('h-7', !compact && 'text-xs')}
          >
            <PencilSimple className={cn('h-3 w-3', !compact && (isRTL ? 'ms-1' : 'me-1'))} />
            {!compact && t.ui.components.edit}
          </Button>
        )}

        {showShare && (
          <Button
            variant="ghost"
            size={compact ? 'icon' : 'sm'}
            onClick={onShare}
            className={cn('h-7', !compact && 'text-xs')}
          >
            <ShareNetwork className={cn('h-3 w-3', !compact && (isRTL ? 'ms-1' : 'me-1'))} />
            {!compact && t.ui.components.share}
          </Button>
        )}

        {showFeedback && (
          <>
            <div className="h-4 w-px bg-border mx-1" />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleThumbsUp}
              className={cn(
                'h-7 w-7',
                feedback === 'up' && 'text-success'
              )}
            >
              <ThumbsUp className="h-3 w-3" />
              <span className="sr-only">{t.ui.components.like}</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleThumbsDown}
              className={cn(
                'h-7 w-7',
                feedback === 'down' && 'text-destructive'
              )}
            >
              <ThumbsDown className="h-3 w-3" />
              <span className="sr-only">{t.ui.components.dislike}</span>
            </Button>
          </>
        )}

        {showFlag && (
          <>
            <div className="h-4 w-px bg-border mx-1" />
            <Button
              variant="ghost"
              size="icon"
              onClick={onFlag}
              className="h-7 w-7"
            >
              <Flag className="h-3 w-3" />
              <span className="sr-only">{t.ui.components.report}</span>
            </Button>
          </>
        )}
      </div>
    )
  }
)

MessageActions.displayName = 'MessageActions'

export { MessageActions }
