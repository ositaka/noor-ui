import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Send, Paperclip, Mic, Loader2 } from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

export interface PromptInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Callback when send button is clicked or Enter is pressed
   */
  onSend?: (value: string) => void
  /**
   * Whether the input is in loading state
   */
  isLoading?: boolean
  /**
   * Show file attachment button
   */
  showAttachment?: boolean
  /**
   * Show voice input button
   */
  showVoice?: boolean
  /**
   * Show character/token counter
   */
  showCounter?: boolean
  /**
   * Maximum characters allowed
   */
  maxLength?: number
  /**
   * Callback when attachment button is clicked
   */
  onAttachment?: () => void
  /**
   * Callback when voice button is clicked
   */
  onVoice?: () => void
  /**
   * Whether text direction is RTL
   */
  isRTL?: boolean
  /**
   * Placeholder text
   */
  placeholder?: string
  /**
   * Placeholder text in Arabic
   */
  placeholderAr?: string
}

const PromptInput = React.forwardRef<HTMLTextAreaElement, PromptInputProps>(
  (
    {
      className,
      onSend,
      isLoading = false,
      showAttachment = false,
      showVoice = false,
      showCounter = false,
      maxLength,
      onAttachment,
      onVoice,
      isRTL = false,
      placeholder,
      placeholderAr,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const { locale } = useDirection()
    const t = content[locale]
    const [internalValue, setInternalValue] = React.useState('')
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)

    React.useImperativeHandle(ref, () => textareaRef.current!)

    const displayValue = value !== undefined ? String(value) : internalValue
    const charCount = displayValue.length

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value
      if (maxLength && newValue.length > maxLength) return

      if (value === undefined) {
        setInternalValue(newValue)
      }
      onChange?.(e)

      // Auto-resize textarea
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
        textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // Send on Enter (without Shift)
      if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
        e.preventDefault()
        handleSend()
      }
    }

    const handleSend = () => {
      if (!displayValue.trim() || isLoading) return

      onSend?.(displayValue)

      // Clear input after sending
      if (value === undefined) {
        setInternalValue('')
      }

      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }

    const defaultPlaceholder = t.ui.components.typeMessagePlaceholder

    return (
      <div className="relative">
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          className={cn(
            'flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none',
            isRTL ? 'pe-32' : 'pe-32',
            isRTL ? 'ps-3' : 'ps-3',
            className
          )}
          value={displayValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={isRTL ? (placeholderAr || placeholder || defaultPlaceholder) : (placeholder || defaultPlaceholder)}
          disabled={isLoading}
          dir={isRTL ? 'rtl' : 'ltr'}
          rows={1}
          {...props}
        />

        {/* Action Buttons */}
        <div
          className={cn(
            'absolute bottom-2 flex items-center gap-1',
            isRTL ? 'left-2' : 'right-2'
          )}
        >
          {showAttachment && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onAttachment}
              disabled={isLoading}
            >
              <Paperclip className="h-4 w-4" />
              <span className="sr-only">{t.ui.components.attachFile}</span>
            </Button>
          )}

          {showVoice && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onVoice}
              disabled={isLoading}
            >
              <Mic className="h-4 w-4" />
              <span className="sr-only">{t.ui.components.voiceInput}</span>
            </Button>
          )}

          <Button
            type="button"
            size="icon"
            className="h-8 w-8"
            onClick={handleSend}
            disabled={!displayValue.trim() || isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            <span className="sr-only">{t.ui.components.send}</span>
          </Button>
        </div>

        {/* Character Counter */}
        {showCounter && (
          <div
            className={cn(
              'absolute text-xs text-muted-foreground',
              isRTL ? 'left-2 bottom-[-20px]' : 'right-2 bottom-[-20px]'
            )}
          >
            {charCount}
            {maxLength && ` / ${maxLength}`}
          </div>
        )}
      </div>
    )
  }
)

PromptInput.displayName = 'PromptInput'

export { PromptInput }
