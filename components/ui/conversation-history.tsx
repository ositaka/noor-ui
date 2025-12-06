import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { Button } from './button'
import { Input } from './input'
import { ScrollArea } from './scroll-area'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu'
import {
  Plus,
  Search,
  MessageSquare,
  MoreVertical,
  Pencil,
  Trash2,
  Share2,
  Clock,
} from 'lucide-react'
import { useDirection } from '../providers/direction-provider'
import { content } from '../../lib/i18n'

const conversationHistoryVariants = cva(
  'flex flex-col h-full bg-background',
  {
    variants: {
      variant: {
        default: 'border-e',
        floating: 'rounded-lg border shadow-lg',
      },
      size: {
        sm: 'w-64',
        default: 'w-80',
        lg: 'w-96',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

interface Conversation {
  id: string
  title: string
  titleAr?: string
  preview?: string
  previewAr?: string
  timestamp: Date
  messageCount?: number
  isActive?: boolean
}

export interface ConversationHistoryProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>,
    VariantProps<typeof conversationHistoryVariants> {
  /**
   * List of conversations
   */
  conversations: Conversation[]
  /**
   * Currently active conversation ID
   */
  activeId?: string
  /**
   * Callback when conversation is selected
   */
  onSelect?: (id: string) => void
  /**
   * Callback when new conversation is created
   */
  onCreate?: () => void
  /**
   * Callback when conversation is renamed
   */
  onRename?: (id: string, newTitle: string) => void
  /**
   * Callback when conversation is deleted
   */
  onDelete?: (id: string) => void
  /**
   * Callback when conversation is shared
   */
  onShare?: (id: string) => void
  /**
   * Show search input
   */
  showSearch?: boolean
  /**
   * Whether text direction is RTL
   */
  isRTL?: boolean
  /**
   * Header title
   */
  title?: string
  /**
   * Header title in Arabic
   */
  titleAr?: string
}

const ConversationHistory = React.forwardRef<HTMLDivElement, ConversationHistoryProps>(
  (
    {
      className,
      variant,
      size,
      conversations = [],
      activeId,
      onSelect,
      onCreate,
      onRename,
      onDelete,
      onShare,
      showSearch = true,
      isRTL = false,
      title,
      titleAr,
      ...props
    },
    ref
  ) => {
    const { locale, direction } = useDirection()
    const t = content[locale]
    const [searchQuery, setSearchQuery] = React.useState('')

    // Filter conversations based on search
    const filteredConversations = conversations.filter((conv) => {
      if (!searchQuery) return true
      const searchLower = searchQuery.toLowerCase()
      const convTitle = isRTL ? (conv.titleAr || conv.title) : conv.title
      const convPreview = isRTL ? (conv.previewAr || conv.preview) : conv.preview
      return (
        convTitle.toLowerCase().includes(searchLower) ||
        convPreview?.toLowerCase().includes(searchLower)
      )
    })

    // Group conversations by time period
    const groupConversations = () => {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      const last7Days = new Date(today)
      last7Days.setDate(last7Days.getDate() - 7)
      const last30Days = new Date(today)
      last30Days.setDate(last30Days.getDate() - 30)

      const groups: {
        label: string
        labelAr: string
        conversations: Conversation[]
      }[] = [
        { label: 'Today', labelAr: 'اليوم', conversations: [] },
        { label: 'Yesterday', labelAr: 'الأمس', conversations: [] },
        { label: 'Last 7 days', labelAr: 'آخر 7 أيام', conversations: [] },
        { label: 'Last 30 days', labelAr: 'آخر 30 يوماً', conversations: [] },
        { label: 'Older', labelAr: 'أقدم', conversations: [] },
      ]

      filteredConversations.forEach((conv) => {
        const convDate = new Date(conv.timestamp)
        if (convDate >= today) {
          groups[0].conversations.push(conv)
        } else if (convDate >= yesterday) {
          groups[1].conversations.push(conv)
        } else if (convDate >= last7Days) {
          groups[2].conversations.push(conv)
        } else if (convDate >= last30Days) {
          groups[3].conversations.push(conv)
        } else {
          groups[4].conversations.push(conv)
        }
      })

      return groups.filter((group) => group.conversations.length > 0)
    }

    const conversationGroups = groupConversations()

    const formatTime = (date: Date) => {
      return new Intl.DateTimeFormat(isRTL ? 'ar-SA' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }).format(date)
    }

    const displayTitle = isRTL ? (titleAr || title || 'المحادثات') : (title || 'Conversations')

    return (
      <div
        ref={ref}
        className={cn(conversationHistoryVariants({ variant, size }), className)}
        {...props}
      >
        {/* Header */}
        <div className="p-4 border-b space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{displayTitle}</h2>
            <Button
              size="sm"
              onClick={onCreate}
              className="shrink-0"
            >
              <Plus className={cn('h-4 w-4', isRTL ? 'ms-1' : 'me-1')} />
              {t.ui.components.new}
            </Button>
          </div>

          {/* Search */}
          {showSearch && (
            <div className="relative">
              <Search
                className={cn(
                  'absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground',
                  isRTL ? 'right-3' : 'left-3'
                )}
              />
              <Input
                type="search"
                placeholder={t.ui.components.searchConversations}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn('h-9', isRTL ? 'pe-3 ps-9' : 'ps-9 pe-3')}
                dir={isRTL ? 'rtl' : 'ltr'}
              />
            </div>
          )}
        </div>

        {/* Conversation List */}
        <ScrollArea className="flex-1" dir={direction}>
          <div className="p-2 space-y-6">
            {conversationGroups.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground/50 mb-3" />
                <p className="text-sm text-muted-foreground">
                  {searchQuery
                    ? t.ui.components.noConversationsFound
                    : t.ui.components.noConversationsYet}
                </p>
                {!searchQuery && onCreate && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onCreate}
                    className="mt-4"
                  >
                    <Plus className={cn('h-4 w-4', isRTL ? 'ms-1' : 'me-1')} />
                    {t.ui.components.startConversation}
                  </Button>
                )}
              </div>
            ) : (
              conversationGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="space-y-1">
                  <div className="px-2 py-1">
                    <span className="text-xs font-medium text-muted-foreground">
                      {isRTL ? group.labelAr : group.label}
                    </span>
                  </div>
                  {group.conversations.map((conversation) => {
                    const isActive = conversation.id === activeId || conversation.isActive
                    const convTitle = isRTL
                      ? (conversation.titleAr || conversation.title)
                      : conversation.title
                    const convPreview = isRTL
                      ? (conversation.previewAr || conversation.preview)
                      : conversation.preview

                    return (
                      <div
                        key={conversation.id}
                        className={cn(
                          'group relative rounded-lg transition-colors',
                          isActive
                            ? 'bg-primary/10'
                            : 'hover:bg-muted'
                        )}
                      >
                        <button
                          type="button"
                          onClick={() => onSelect?.(conversation.id)}
                          className={cn(
                            'w-full text-start p-3 pe-10',
                            isRTL && 'text-end ps-10 pe-3'
                          )}
                        >
                          <div className="flex items-start gap-2">
                            <MessageSquare
                              className={cn(
                                'h-4 w-4 shrink-0 mt-0.5',
                                isActive ? 'text-primary' : 'text-muted-foreground'
                              )}
                            />
                            <div className="flex-1 min-w-0 space-y-1">
                              <div
                                className={cn(
                                  'font-medium text-sm truncate',
                                  isActive && 'text-primary'
                                )}
                              >
                                {convTitle}
                              </div>
                              {convPreview && (
                                <div className="text-xs text-muted-foreground truncate">
                                  {convPreview}
                                </div>
                              )}
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>{formatTime(conversation.timestamp)}</span>
                                {conversation.messageCount && (
                                  <>
                                    <span>•</span>
                                    <span>
                                      {conversation.messageCount}{' '}
                                      {t.ui.components.messages}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </button>

                        {/* Actions Menu */}
                        <div
                          className={cn(
                            'absolute top-2 opacity-0 group-hover:opacity-100 transition-opacity',
                            isRTL ? 'left-2' : 'right-2'
                          )}
                        >
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                              >
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">
                                  {t.ui.components.actions}
                                </span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align={isRTL ? 'start' : 'end'}>
                              {onRename && (
                                <DropdownMenuItem
                                  onClick={() => {
                                    const newTitle = prompt(
                                      t.ui.components.enterNewTitle,
                                      convTitle
                                    )
                                    if (newTitle) onRename(conversation.id, newTitle)
                                  }}
                                >
                                  <Pencil className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                                  {t.ui.components.rename}
                                </DropdownMenuItem>
                              )}
                              {onShare && (
                                <DropdownMenuItem onClick={() => onShare(conversation.id)}>
                                  <Share2 className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                                  {t.ui.components.share}
                                </DropdownMenuItem>
                              )}
                              {(onRename || onShare) && onDelete && <DropdownMenuSeparator />}
                              {onDelete && (
                                <DropdownMenuItem
                                  onClick={() => {
                                    if (
                                      confirm(
                                        t.ui.components.confirmDeleteConversation
                                      )
                                    ) {
                                      onDelete(conversation.id)
                                    }
                                  }}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                                  {t.ui.components.delete}
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="border-t p-3">
          <div className="text-xs text-muted-foreground text-center">
            {filteredConversations.length}{' '}
            {filteredConversations.length === 1
              ? t.ui.components.conversation
              : t.ui.components.conversationsPlural}
          </div>
        </div>
      </div>
    )
  }
)

ConversationHistory.displayName = 'ConversationHistory'

export { ConversationHistory, conversationHistoryVariants }
export type { Conversation }
