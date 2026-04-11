'use client'

import { usePathname } from 'next/navigation'
import { useDirection } from '@/components/providers/direction-provider'
import { Button } from '@/components/ui/button'

const STORYBOOK_BASE = 'https://storybook.noorui.com'

/** Maps docs slug (e.g. "button") to Storybook docs ID (e.g. "core-button") */
const SLUG_TO_STORYBOOK_ID: Record<string, string> = {
  'accordion': 'overlays-layout-accordion',
  'alert': 'feedback-alert',
  'arabic-number': 'regional-islamic-arabic-number',
  'avatar': 'core-avatar',
  'badge': 'core-badge',
  'blockquote': 'data-display-blockquote',
  'breadcrumb': 'navigation-breadcrumb',
  'button': 'core-button',
  'button-arrow': 'core-button-arrow',
  'calendar': 'regional-islamic-calendar',
  'callout': 'feedback-callout',
  'card': 'core-card',
  'carousel': 'user-interface-carousel',
  'chart': 'data-display-chart',
  'chat-message': 'ai-llm-shell-chat-message',
  'checkbox': 'forms-checkbox',
  'collapsible': 'overlays-layout-collapsible',
  'command': 'data-display-command',
  'content-renderer': 'data-display-content-renderer',
  'context-menu': 'navigation-context-menu',
  'conversation-history': 'ai-llm-shell-conversation-history',
  'dashboard-shell': 'layout-shell-dashboard-shell',
  'data-table': 'data-display-datatable',
  'date-picker': 'advanced-forms-inputs-date-picker',
  'dialog': 'feedback-dialog',
  'dropdown-menu': 'navigation-dropdown-menu',
  'empty-state': 'feedback-empty-state',
  'feature-card': 'core-feature-card',
  'file-upload': 'advanced-forms-inputs-file-upload',
  'form': 'forms-form',
  'hijri-date': 'regional-islamic-hijri-date',
  'input': 'core-input',
  'kbd': 'user-interface-kbd',
  'label': 'core-label',
  'listing-card': 'data-display-listingcard',
  'message-actions': 'ai-llm-shell-message-actions',
  'model-selector': 'ai-llm-shell-model-selector',
  'notification-center': 'user-interface-notification-center',
  'number-input': 'advanced-forms-inputs-number-input',
  'pagination': 'navigation-pagination',
  'parameter-slider': 'ai-llm-shell-parameter-slider',
  'popover': 'overlays-layout-popover',
  'prayer-times': 'regional-islamic-prayer-times',
  'progress': 'feedback-progress',
  'prompt-input': 'ai-llm-shell-prompt-input',
  'pull-quote': 'data-display-pull-quote',
  'radio-group': 'forms-radiogroup',
  'range-slider': 'forms-range-slider',
  'reaction-picker': 'user-interface-reaction-picker',
  'rich-text-editor': 'advanced-forms-inputs-rich-text-editor',
  'select': 'forms-select',
  'separator': 'core-separator',
  'sheet': 'overlays-layout-sheet',
  'skeleton': 'feedback-skeleton',
  'slider': 'forms-slider',
  'stats-card': 'data-display-statscard',
  'stepper': 'user-interface-stepper',
  'switch': 'forms-switch',
  'table': 'data-display-table',
  'tabs': 'navigation-tabs',
  'textarea': 'forms-textarea',
  'thinking-indicator': 'ai-llm-shell-thinking-indicator',
  'time-picker': 'advanced-forms-inputs-time-picker',
  'timeline': 'user-interface-timeline',
  'toast': 'feedback-toast',
  'token-counter': 'ai-llm-shell-token-counter',
  'tooltip': 'feedback-tooltip',
  'user-badge': 'data-display-user-badge',
  'user-menu': 'user-interface-user-menu',
  'zakat-calculator': 'regional-islamic-zakat-calculator',
}

export function StorybookLink() {
  const pathname = usePathname()
  const { direction } = useDirection()
  const isRTL = direction === 'rtl'

  const slug = pathname.split('/').pop() || ''
  const storybookId = SLUG_TO_STORYBOOK_ID[slug]
  if (!storybookId) return null

  const url = `${STORYBOOK_BASE}/?path=/docs/${storybookId}--docs`

  return (
    <Button variant="outline" size="sm" className="gap-1.5 my-auto" asChild>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <svg className="h-3.5 w-3.5" viewBox="0 0 256 256" fill="currentColor">
          <path d="M224,104a8,8,0,0,1-16,0V59.32l-66.33,66.34a8,8,0,0,1-11.32-11.32L196.68,48H152a8,8,0,0,1,0-16h64a8,8,0,0,1,8,8Zm-40,24a8,8,0,0,0-8,8v72H48V80h72a8,8,0,0,0,0-16H48A16,16,0,0,0,32,80V208a16,16,0,0,0,16,16H176a16,16,0,0,0,16-16V136A8,8,0,0,0,184,128Z" />
        </svg>
        <span className="hidden sm:inline">{isRTL ? 'عرض في Storybook' : 'View on Storybook'}</span>
        <span className="sm:hidden">Storybook</span>
      </a>
    </Button>
  )
}
