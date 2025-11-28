'use client'

import * as React from 'react'
import { Button } from './button'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'
import { cn } from '@/lib/utils'

export interface Reaction {
  emoji: string
  count: number
  hasReacted: boolean
}

export interface ReactionPickerProps {
  /**
   * Current reactions with counts and user's reaction status
   */
  reactions: Reaction[]

  /**
   * Display variant
   * - compact: LinkedIn-style merged display `[👍❤️💡 20]`
   * - expanded: Discord-style separated `[👍 12] [❤️ 5]`
   */
  variant?: 'compact' | 'expanded'

  /**
   * Available reactions to choose from
   * Default: ['👍', '❤️', '💡', '🚀', '🎉', '👀']
   */
  availableReactions?: string[]

  /**
   * Maximum number of emoji types to show in compact mode
   * Default: 3
   */
  maxVisible?: number

  /**
   * Callback when user reacts/unreacts
   */
  onReact: (emoji: string) => void

  /**
   * Accessibility label
   */
  ariaLabel?: string

  /**
   * Additional class name
   */
  className?: string
}

const DEFAULT_REACTIONS = ['👍', '❤️', '💡', '🚀', '🎉', '👀']

/**
 * ReactionPicker component for emoji reactions
 *
 * Supports two display modes:
 * - Compact (LinkedIn-style): Shows top 3 emojis with total count
 * - Expanded (Discord-style): Shows each reaction separately
 *
 * @example
 * <ReactionPicker
 *   reactions={[
 *     { emoji: '👍', count: 12, hasReacted: false },
 *     { emoji: '❤️', count: 5, hasReacted: true },
 *   ]}
 *   variant="compact"
 *   onReact={(emoji) => console.log('Reacted with', emoji)}
 * />
 */
export function ReactionPicker({
  reactions,
  variant = 'compact',
  availableReactions = DEFAULT_REACTIONS,
  maxVisible = 3,
  onReact,
  ariaLabel = 'React to comment',
  className,
}: ReactionPickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  // Calculate total reactions
  const totalReactions = reactions.reduce((sum, r) => sum + r.count, 0)

  // Get top reactions sorted by count
  const topReactions = [...reactions]
    .sort((a, b) => b.count - a.count)
    .slice(0, maxVisible)

  // Get user's reactions
  const userReactions = reactions.filter((r) => r.hasReacted)

  // Check if user has reacted with specific emoji
  const hasReacted = (emoji: string) => {
    return reactions.find((r) => r.emoji === emoji)?.hasReacted || false
  }

  // Get count for specific emoji
  const getCount = (emoji: string) => {
    return reactions.find((r) => r.emoji === emoji)?.count || 0
  }

  // Generate tooltip text
  const getTooltipText = () => {
    if (reactions.length === 0) return 'Add a reaction'

    const parts = reactions.map((r) => `${r.count} ${r.emoji}`)
    return parts.join(', ')
  }

  // Compact mode (LinkedIn-style)
  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-1', className)}>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <Button
                    variant={userReactions.length > 0 ? 'secondary' : 'ghost'}
                    size="sm"
                    className={cn(
                      'h-8 gap-1.5 px-2',
                      totalReactions === 0 && 'text-muted-foreground'
                    )}
                    aria-label={ariaLabel}
                  >
                    {totalReactions > 0 ? (
                      <>
                        <span className="flex -space-x-0.5">
                          {topReactions.map((r) => (
                            <span key={r.emoji} className="text-base">
                              {r.emoji}
                            </span>
                          ))}
                        </span>
                        <span className="text-xs font-medium">{totalReactions}</span>
                      </>
                    ) : (
                      <span className="text-sm">React</span>
                    )}
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>{getTooltipText()}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <PopoverContent className="w-auto p-2" align="center">
            <div className="grid grid-cols-3 gap-1">
              {availableReactions.map((emoji) => {
                const count = getCount(emoji)
                const isActive = hasReacted(emoji)

                return (
                  <Button
                    key={emoji}
                    variant={isActive ? 'secondary' : 'outline'}
                    size="sm"
                    className="h-10 w-16 gap-1"
                    onClick={() => {
                      onReact(emoji)
                      setIsOpen(false)
                    }}
                  >
                    <span className="text-lg">{emoji}</span>
                    {count > 0 && (
                      <span className="text-xs font-medium">{count}</span>
                    )}
                  </Button>
                )
              })}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    )
  }

  // Expanded mode (Discord-style)
  return (
    <div className={cn('flex flex-wrap items-center gap-1', className)}>
      {reactions.map((reaction) => (
        <Button
          key={reaction.emoji}
          variant={reaction.hasReacted ? 'secondary' : 'outline'}
          size="sm"
          className="h-8 gap-1 px-2"
          onClick={() => onReact(reaction.emoji)}
        >
          <span className="text-base">{reaction.emoji}</span>
          <span className="text-xs font-medium">{reaction.count}</span>
        </Button>
      ))}

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 px-2" aria-label="Add reaction">
            <span className="text-lg">+</span>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-2" align="start">
          <div className="grid grid-cols-3 gap-1">
            {availableReactions.map((emoji) => {
              const isActive = hasReacted(emoji)

              return (
                <Button
                  key={emoji}
                  variant={isActive ? 'secondary' : 'outline'}
                  size="sm"
                  className="h-10 w-16"
                  onClick={() => onReact(emoji)}
                >
                  <span className="text-lg">{emoji}</span>
                </Button>
              )
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
